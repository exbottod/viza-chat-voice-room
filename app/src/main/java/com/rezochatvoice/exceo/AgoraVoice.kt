package com.rezochatvoice.exceo

import android.Manifest
import android.app.Activity
import android.content.Context
import android.content.ContextWrapper
import android.content.pm.PackageManager
import android.media.AudioManager
import android.media.MediaPlayer
import android.util.Log
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.platform.LocalContext
import androidx.core.content.ContextCompat
import com.google.firebase.auth.FirebaseAuth
import io.agora.rtc2.ChannelMediaOptions
import io.agora.rtc2.Constants
import io.agora.rtc2.IRtcEngineEventHandler
import io.agora.rtc2.RtcEngine
import io.agora.rtc2.RtcEngineConfig
import io.agora.rtc2.UserInfo
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.coroutines.tasks.await
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL

/**
 * Suara room lewat Agora (bukan VPS sendiri), jadi beban server Viza hanya untuk
 * dompet, gift, dan berkas aset.
 *
 * Nama objek tetap AgoraVoice supaya layar yang memakainya tidak perlu diubah.
 * Satu room = satu channel Agora (nama channel = roomId). App ID dan token
 * diambil dari server dompet (/agora-token); App Certificate tidak pernah ada
 * di HP, dan ganti akun Agora cukup ganti isian di server tanpa rilis APK.
 */
object AgoraVoice {
    private const val TAG = "AgoraVoice"
    private const val TOKEN_URL = "https://viza.43-156-99-4.sslip.io/agora-token"

    var onProblem: ((String) -> Unit)? = null

    var lastStatus by androidx.compose.runtime.mutableStateOf("")

    /** Tingkat suara tiap peserta (uid Firebase -> 0..1) untuk gelombang di kursi mic. */
    var levels by androidx.compose.runtime.mutableStateOf<Map<String, Float>>(emptyMap())
        private set

    /** UID yang benar-benar sedang bersuara menurut Agora. */
    var bicara by androidx.compose.runtime.mutableStateOf<Set<String>>(emptySet())
        private set

    private val scope = CoroutineScope(SupervisorJob() + Dispatchers.IO)
    private val mainScope = CoroutineScope(SupervisorJob() + Dispatchers.Main)

    @Volatile private var engine: RtcEngine? = null
    // Kode terakhir dari Agora dan dari server, supaya tulisan status di room
    // menyebut sebabnya (bukan hanya "belum tersambung") dan mudah dilaporkan.
    @Volatile private var errTerakhir = 0
    @Volatile private var alasanTerakhir = 0
    @Volatile private var kodeServerTerakhir = 0

    /** Teks status saat gagal, lengkap dengan kode sebabnya. */
    private fun gagalTeks(): String {
        val sebab = when {
            errTerakhir != 0 -> "err $errTerakhir"
            kodeServerTerakhir != 0 -> "server $kodeServerTerakhir"
            alasanTerakhir != 0 -> "alasan $alasanTerakhir"
            else -> "tanpa balasan"
        }
        return "Suara: belum tersambung ($sebab), ketuk untuk coba"
    }

    /** Rincian untuk dialog: dipakai saat status suara ditekan lama. */
    fun diagnostikTeks(): String = buildString {
        append("Room: ").append(roomId ?: "-")
        append("\nAkun Agora: ").append(akunSaya.ifBlank { "-" })
        append("\nToken: ").append(if (tokSimpan != null) "ada" else "belum ada")
        append("\nKode server: ").append(if (kodeServerTerakhir != 0) kodeServerTerakhir.toString() else "200")
        append("\nGalat Agora: ").append(if (errTerakhir != 0) errTerakhir.toString() else "-")
        append("\nAlasan putus: ").append(if (alasanTerakhir != 0) alasanTerakhir.toString() else "-")
        append("\nTersambung: ").append(if (joined) "ya" else "tidak")
        append("\nStatus: ").append(lastStatus.ifBlank { "-" })
    }
    @Volatile private var appCtx: Context? = null
    @Volatile private var roomId: String? = null
    @Volatile private var joined = false
    @Volatile private var wantSpeaking = false
    @Volatile private var muteRemote = false
    @Volatile private var sengajaKeluar = false
    @Volatile private var akunSaya = ""
    @Volatile private var percobaan = 0

    // Agora memberi uid angka; peta ini mengembalikannya ke uid Firebase.
    private val uidAkun = HashMap<Int, String>()

    private var joinJob: Job? = null
    private val joinLock = Mutex()

    // ---------- audio route (volume panggilan, bukan volume notifikasi) ----------
    private var audioMgr: AudioManager? = null
    private var prevVolumeStream: Int? = null
    private var prevSpeaker: Boolean? = null
    private var prevMode: Int? = null
    @Volatile private var routed = false
    @Volatile private var actAktif: Activity? = null
    @Volatile private var streamTerpasang = false

    private fun findActivity(c: Context?): Activity? {
        var x: Context? = c
        while (x is ContextWrapper) {
            if (x is Activity) return x
            x = x.baseContext
        }
        return x as? Activity
    }

    /** Arahkan tombol volume ke suara room dan pastikan keluar dari speaker. */
    fun tuneAudioRoute(ctx: Context) {
        try {
            val mgr = (ctx.applicationContext.getSystemService(Context.AUDIO_SERVICE) as? AudioManager) ?: return
            if (!routed) {
                audioMgr = mgr
                prevMode = try { mgr.mode } catch (e: Exception) { null }
                prevSpeaker = try { mgr.isSpeakerphoneOn } catch (e: Exception) { null }
                val act = actAktif ?: findActivity(ctx)
                actAktif = act
                act?.let {
                    if (!streamTerpasang) {
                        prevVolumeStream = it.volumeControlStream
                        streamTerpasang = true
                    }
                    // Tombol volume mengatur volume MEDIA, bukan volume panggilan.
                    it.volumeControlStream = AudioManager.STREAM_MUSIC
                }
                val max = try { mgr.getStreamMaxVolume(AudioManager.STREAM_MUSIC) } catch (e: Exception) { 0 }
                val cur = try { mgr.getStreamVolume(AudioManager.STREAM_MUSIC) } catch (e: Exception) { 0 }
                if (max > 0 && cur < (max * 0.7f).toInt()) {
                    try { mgr.setStreamVolume(AudioManager.STREAM_MUSIC, (max * 0.8f).toInt(), 0) } catch (e: Exception) { }
                }
                routed = true
            }
            // MODE_IN_COMMUNICATION sengaja tidak dipaksa: mode itu membuat kunci
            // volume mengatur suara panggilan. Dengan mode normal, suara room
            // keluar lewat jalur media sehingga volume media yang berlaku.
            try { mgr.isSpeakerphoneOn = true } catch (e: Exception) { }
            try { engine?.setEnableSpeakerphone(true) } catch (e: Exception) { }
        } catch (e: Exception) {
            Log.e(TAG, "tuneAudioRoute: ${e.message}")
        }
    }

    /** Arahkan tombol volume ke volume panggilan sejak user masuk room. */
    fun pasangVolumeStream(ctx: Context) {
        try {
            findActivity(ctx)?.let { actAktif = it }
            val act = actAktif ?: return
            if (!streamTerpasang) {
                prevVolumeStream = act.volumeControlStream
                act.volumeControlStream = AudioManager.STREAM_MUSIC
                streamTerpasang = true
            }
        } catch (e: Exception) {
            Log.e(TAG, "pasangVolumeStream: ${e.message}")
        }
    }

    fun restoreAudioRoute() {
        if (!routed && !streamTerpasang) return
        routed = false
        streamTerpasang = false
        try {
            val mgr = audioMgr
            if (mgr != null) {
                prevSpeaker?.let { try { mgr.isSpeakerphoneOn = it } catch (e: Exception) { } }
                prevMode?.let { m -> try { mgr.mode = m } catch (e: Exception) { } }
            }
            (actAktif ?: appCtx?.let { c -> findActivity(c) })?.let { act ->
                prevVolumeStream?.let { act.volumeControlStream = it }
            }
        } catch (e: Exception) {
            Log.e(TAG, "restoreAudioRoute: ${e.message}")
        } finally {
            prevVolumeStream = null
            prevSpeaker = null
            prevMode = null
        }
    }

    private fun problem(msg: String) {
        lastStatus = msg
        Log.e(TAG, msg)
        try { onProblem?.invoke(msg) } catch (e: Exception) { }
    }

    // ---------- token ----------
    private data class Tok(val appId: String, val token: String, val channel: String, val account: String)

    private var tokSimpan: Tok? = null
    private var tokRoom: String? = null
    private var tokWaktu = 0L
    private const val TOK_UMUR = 30 * 60_000L
    private const val TOK_DISK_UMUR = 20 * 60_000L
    private val kunciToken = Mutex()

    /**
     * Token yang masih berlaku disimpan juga di HP. Jadi saat aplikasi dibuka lagi
     * dan masuk room yang sama, suara langsung menyambung tanpa menunggu permintaan
     * token ke server (seperti di aplikasi pembanding).
     */
    private fun bacaTokenDisk(id: String): Tok? = try {
        val ctx = appCtx ?: return null
        val o = org.json.JSONObject(ctx.getSharedPreferences("agora_tok", Context.MODE_PRIVATE).getString(id, null) ?: "")
        val umur = System.currentTimeMillis() - o.optLong("waktu")
        val akun = o.optString("account")
        val uidSaya = try { FirebaseAuth.getInstance().currentUser?.uid ?: "" } catch (e: Exception) { "" }
        val t = Tok(o.optString("appId"), o.optString("token"), o.optString("channel"), akun)
        if (umur in 0..TOK_DISK_UMUR && t.appId.isNotBlank() && t.token.isNotBlank() &&
            t.channel == id && (uidSaya.isBlank() || akun.isBlank() || akun == uidSaya)
        ) t else null
    } catch (e: Exception) { null }

    private fun simpanTokenDisk(id: String, t: Tok) {
        try {
            val ctx = appCtx ?: return
            ctx.getSharedPreferences("agora_tok", Context.MODE_PRIVATE).edit().putString(
                id,
                org.json.JSONObject().put("appId", t.appId).put("token", t.token)
                    .put("channel", t.channel).put("account", t.account)
                    .put("waktu", System.currentTimeMillis()).toString(),
            ).apply()
        } catch (e: Exception) { }
    }

    private suspend fun tokenUntuk(id: String, diam: Boolean = false): Tok? = kunciToken.withLock {
        val t = tokSimpan
        if (t != null && tokRoom == id && System.currentTimeMillis() - tokWaktu < TOK_UMUR) return@withLock t
        // Token tersimpan dari sesi sebelumnya: langsung pakai, tanpa jaringan.
        bacaTokenDisk(id)?.let { d ->
            tokSimpan = d
            tokRoom = id
            tokWaktu = System.currentTimeMillis()
            return@withLock d
        }
        val baru = fetchToken(id, diam) ?: return@withLock null
        tokSimpan = baru
        tokRoom = id
        tokWaktu = System.currentTimeMillis()
        simpanTokenDisk(id, baru)
        baru
    }

    /** Panaskan token di latar belakang begitu user masuk room. */
    fun siapkanToken(ctx: Context, id: String) {
        appCtx = ctx.applicationContext
        if (tokSimpan != null && tokRoom == id && System.currentTimeMillis() - tokWaktu < TOK_UMUR) return
        scope.launch {
            try {
                tokenUntuk(id, diam = true)
            } catch (e: kotlinx.coroutines.CancellationException) {
                throw e
            } catch (e: Exception) { }
        }
    }

    private suspend fun fetchToken(channel: String, diam: Boolean = false): Tok? {
        for (attempt in 1..4) {
            try {
                val idToken = SesiToken.ambil(paksa = attempt > 1)
                if (idToken == null) { if (!diam) problem("Suara mati: belum login"); return null }
                val c = (URL(TOKEN_URL).openConnection() as HttpURLConnection).apply {
                    requestMethod = "POST"
                    connectTimeout = 10_000
                    readTimeout = 15_000
                    doOutput = true
                    setRequestProperty("Authorization", "Bearer $idToken")
                    setRequestProperty("Content-Type", "application/json")
                }
                c.outputStream.use {
                    it.write(JSONObject().put("room", channel).put("channel", channel).toString().toByteArray())
                }
                if (c.responseCode == 200) {
                    val o = JSONObject(c.inputStream.bufferedReader().readText())
                    val appId = o.optString("appId")
                    val token = o.optString("token")
                    val ch = o.optString("channel").ifBlank { channel }
                    val akun = o.optString("account")
                    if (appId.isNotBlank() && token.isNotBlank() && akun.isNotBlank()) {
                        return Tok(appId, token, ch, akun)
                    }
                    if (!diam) problem("Suara: token tidak lengkap dari server")
                    return null
                }
                if (c.responseCode == 401 || c.responseCode == 403) {
                    // Token login basi: buang, paksa token baru, lalu coba lagi.
                    tokSimpan = null
                    tokWaktu = 0L
                    SesiToken.lupakan()
                    delay(400L * attempt)
                    continue
                }
                if (c.responseCode in 400..499 && c.responseCode != 408 && c.responseCode != 429) {
                    kodeServerTerakhir = c.responseCode
                    if (!diam) problem("Suara: server menolak sesi (${c.responseCode})")
                    return null
                }
                kodeServerTerakhir = c.responseCode
            } catch (e: kotlinx.coroutines.CancellationException) {
                throw e
            } catch (e: Exception) {
                Log.e(TAG, "token: ${e.message}")
            }
            lastStatus = ""
            delay(900L * attempt)
        }
        if (!diam) lastStatus = gagalTeks()
        return null
    }

    // ---------- event handler ----------
    private val handler = object : IRtcEngineEventHandler() {
        override fun onJoinChannelSuccess(channel: String?, uid: Int, elapsed: Int) {
            joined = true
            percobaan = 0
            akunSaya = akunSaya.ifBlank { FirebaseAuth.getInstance().currentUser?.uid ?: "" }
            uidAkun[uid] = akunSaya
            lastStatus = "OK tersambung"
            appCtx?.let { c -> mainScope.launch { tuneAudioRoute(c) } }
            applyMute()
            applyRole()
        }

        override fun onUserJoined(uid: Int, elapsed: Int) {
            try {
                val info = UserInfo()
                val akun = if (engine?.getUserInfoByUid(uid, info) == 0) (info.userAccount ?: "") else ""
                if (akun.isNotBlank()) uidAkun[uid] = akun
            } catch (e: Exception) {
                Log.e(TAG, "userInfo: ${e.message}")
            }
        }

        override fun onUserOffline(uid: Int, reason: Int) {
            val akun = uidAkun.remove(uid) ?: return
            levels = levels - akun
            bicara = bicara - akun
        }

        override fun onUserInfoUpdated(uid: Int, info: UserInfo?) {
            val akun = info?.userAccount ?: return
            if (akun.isNotBlank()) uidAkun[uid] = akun
        }

        override fun onAudioVolumeIndication(
            speakers: Array<out IRtcEngineEventHandler.AudioVolumeInfo>?,
            totalVolume: Int,
        ) {
            if (speakers == null) return
            val m = HashMap<String, Float>()
            val aktif = HashSet<String>()
            for (sp in speakers) {
                val akun = if (sp.uid == 0) akunSaya else (uidAkun[sp.uid] ?: "")
                if (akun.isBlank()) continue
                val lv = (sp.volume / 255f).coerceIn(0f, 1f)
                if (lv > 0.01f) m[akun] = lv
                if (lv > 0.12f) aktif.add(akun)
            }
            levels = m
            bicara = aktif
        }

        override fun onConnectionStateChanged(state: Int, reason: Int) {
            when (state) {
                Constants.CONNECTION_STATE_RECONNECTING -> lastStatus = ""
                Constants.CONNECTION_STATE_CONNECTED -> { joined = true; lastStatus = "OK tersambung" }
                Constants.CONNECTION_STATE_FAILED -> {
                    joined = false
                    alasanTerakhir = reason
                    lastStatus = gagalTeks()
                }
            }
        }

        override fun onError(err: Int) {
            Log.e(TAG, "onError: $err")
            errTerakhir = err
            if (err == Constants.ERR_JOIN_CHANNEL_REJECTED || err == Constants.ERR_INVALID_TOKEN) {
                tokSimpan = null
                lastStatus = "Suara: token kadaluarsa, ketuk untuk coba"
            }
        }
    }

    private fun buatEngine(app: Context, appId: String): RtcEngine {
        val cfg = RtcEngineConfig().apply {
            mContext = app
            mAppId = appId
            mEventHandler = handler
            mChannelProfile = Constants.CHANNEL_PROFILE_LIVE_BROADCASTING
            // Skenario CHATROOM menyalakan peredam gema (AEC), penekan bising, dan
            // penguat suara. Skenario GAME_STREAMING dulu mematikan ketiganya, jadi
            // suara peserta memantul kembali ke peserta lain (gema).
            mAudioScenario = Constants.AUDIO_SCENARIO_CHATROOM
        }
        val e = RtcEngine.create(cfg)
        try { e.setChannelProfile(Constants.CHANNEL_PROFILE_LIVE_BROADCASTING) } catch (x: Exception) { }
        // Profil ucapan (32 kHz mono) dipakai supaya suara tidak putus-putus saat
        // banyak orang bicara bersamaan: tiap peserta hanya butuh sekitar 18 kbps,
        // bukan 64 kbps seperti profil musik. Tetap dengan skenario CHATROOM agar
        // peredam gema aktif.
        try { e.setAudioProfile(Constants.AUDIO_PROFILE_SPEECH_STANDARD, Constants.AUDIO_SCENARIO_CHATROOM) } catch (x: Exception) { }
        try { e.setParameters("{\"che.audio.enable.aec\":true}") } catch (x: Exception) { }
        try { e.setParameters("{\"che.audio.enable.agc\":true}") } catch (x: Exception) { }
        try { e.setParameters("{\"che.audio.enable.ns\":true}") } catch (x: Exception) { }
        try { e.setClientRole(if (wantSpeaking) Constants.CLIENT_ROLE_BROADCASTER else Constants.CLIENT_ROLE_AUDIENCE) } catch (x: Exception) { }
        try { e.enableAudioVolumeIndication(300, 3, true) } catch (x: Exception) { }
        try { e.setEnableSpeakerphone(true) } catch (x: Exception) { }
        try { e.muteAllRemoteAudioStreams(muteRemote) } catch (x: Exception) { }
        return e
    }

    /** Masuk room (awalnya hanya mendengar; mic dibuka lewat setSpeaking). */
    fun join(ctx: Context, id: String) {
        sengajaKeluar = false
        findActivity(ctx)?.let { actAktif = it }
        val app = ctx.applicationContext
        appCtx = app
        joinJob?.cancel()
        roomId = id
        joinJob = scope.launch {
            joinLock.withLock {
                if (roomId != id) return@withLock
                errTerakhir = 0
                alasanTerakhir = 0
                // Dua percobaan: kalau yang pertama tidak mendapat balasan dari
                // Agora, token dibuang lalu dicoba lagi dengan token baru.
                for (coba in 1..2) {
                    if (roomId != id || sengajaKeluar) return@withLock
                    val t = tokenUntuk(id) ?: return@withLock
                    if (roomId != id) return@withLock
                    try {
                        tutupEngine()
                        lastStatus = ""
                        akunSaya = t.account
                        val e = buatEngine(app, t.appId)
                        engine = e
                        val opt = ChannelMediaOptions().apply {
                            channelProfile = Constants.CHANNEL_PROFILE_LIVE_BROADCASTING
                            clientRoleType = if (wantSpeaking) Constants.CLIENT_ROLE_BROADCASTER else Constants.CLIENT_ROLE_AUDIENCE
                            autoSubscribeAudio = true
                            publishMicrophoneTrack = wantSpeaking
                        }
                        val kode = e.joinChannelWithUserAccount(t.token, t.channel, t.account, opt)
                        if (kode != 0) {
                            tutupEngine()
                            errTerakhir = kode
                            if (coba < 2) {
                                tokSimpan = null
                                delay(400)
                                continue
                            }
                            problem("Suara: gagal masuk room ($kode)")
                            return@withLock
                        }
                        val selesai = kotlinx.coroutines.withTimeoutOrNull(20_000L) {
                            while (!joined && !sengajaKeluar) delay(200)
                            joined
                        }
                        if (selesai != true) {
                            tutupEngine()
                            if (coba < 2 && !sengajaKeluar) {
                                tokSimpan = null
                                delay(600)
                                continue
                            }
                            lastStatus = gagalTeks()
                            return@withLock
                        }
                        try { tuneAudioRoute(app) } catch (x: Exception) { }
                        lastStatus = "OK tersambung"
                        applyMute()
                        applyRole()
                        return@withLock
                    } catch (e: kotlinx.coroutines.CancellationException) {
                        throw e
                    } catch (e: Exception) {
                        tutupEngine()
                        problem("Suara: gagal (${(e.message ?: "?").take(60)})")
                        return@withLock
                    }
                }
            }
        }
    }

    private fun tutupEngine() {
        joined = false
        val e = engine ?: return
        engine = null
        uidAkun.clear()
        levels = emptyMap()
        bicara = emptySet()
        try { e.leaveChannel() } catch (x: Exception) { }
        try { RtcEngine.destroy() } catch (x: Exception) { }
    }

    private fun applyMute() {
        try { engine?.muteAllRemoteAudioStreams(muteRemote) } catch (e: Exception) {
            Log.e(TAG, "applyMute: ${e.message}")
        }
    }

    private fun applyRole() {
        val e = engine ?: return
        val on = wantSpeaking
        mainScope.launch {
            try {
                e.setClientRole(if (on) Constants.CLIENT_ROLE_BROADCASTER else Constants.CLIENT_ROLE_AUDIENCE)
                e.enableLocalAudio(on)
                e.muteLocalAudioStream(!on)
            } catch (x: Exception) {
                Log.e(TAG, "mic: ${x.message}")
                if (on) problem("Mic gagal: ${(x.message ?: "?").take(80)}")
            }
        }
    }

    /** true = mic menyala (di kursi); false = hanya mendengar. Aman dipanggil sebelum join selesai. */
    fun setSpeaking(on: Boolean) {
        wantSpeaking = on
        applyRole()
    }

    fun muteRoom(mute: Boolean) {
        muteRemote = mute
        applyMute()
    }

    /** Coba sambung ulang manual saat pengguna mengetuk status suara. */
    fun sambungUlang(ctx: Context, id: String) {
        percobaan = 0
        sengajaKeluar = false
        joined = false
        tokSimpan = null
        join(ctx, id)
    }

    fun leave() {
        sengajaKeluar = true
        percobaan = 0
        try { restoreAudioRoute() } catch (e: Exception) { }
        joinJob?.cancel()
        joined = false
        roomId = null
        wantSpeaking = false
        muteRemote = false
        stopMusic()
        scope.launch { joinLock.withLock { tutupEngine() } }
    }

    // ---------- Musik room ----------
    // Musik diputar lokal di perangkat DJ (MediaPlayer). Suara speaker ikut
    // tertangkap mic saat DJ di kursi dan mic menyala.
    private var player: MediaPlayer? = null
    private var musicVol = 100

    fun startMusic(path: String, loop: Boolean): Boolean {
        return try {
            stopMusic()
            val mp = MediaPlayer()
            mp.setAudioAttributes(
                android.media.AudioAttributes.Builder()
                    .setUsage(android.media.AudioAttributes.USAGE_MEDIA)
                    .setContentType(android.media.AudioAttributes.CONTENT_TYPE_MUSIC)
                    .build(),
            )
            mp.setDataSource(path)
            mp.isLooping = loop
            mp.setVolume(musicVol / 100f, musicVol / 100f)
            mp.prepare()
            mp.start()
            player = mp
            wantSpeaking = true
            applyRole()
            true
        } catch (e: Exception) {
            Log.e(TAG, "musik gagal: ${e.message}")
            false
        }
    }

    fun stopMusic() { try { player?.stop(); player?.release() } catch (e: Exception) { }; player = null }
    fun pauseMusic() { try { player?.pause() } catch (e: Exception) { } }
    fun resumeMusic() { try { player?.start() } catch (e: Exception) { } }
    fun seekMusic(ms: Long) { try { player?.seekTo(ms.toInt()) } catch (e: Exception) { } }
    fun musicDurationMs(): Int = try {
        player?.duration ?: RoomMusicShare.durasiMs()
    } catch (e: Exception) { -1 }
    fun musicPositionMs(): Int = try {
        player?.currentPosition ?: RoomMusicShare.posisiMs()
    } catch (e: Exception) { 0 }
    fun setMusicVolume(v: Int) {
        musicVol = v.coerceIn(0, 100)
        try { player?.setVolume(musicVol / 100f, musicVol / 100f) } catch (e: Exception) { }
    }
}

/** Aktif selama user di room (termasuk saat diminimalkan). */
@Composable
fun AgoraRoomBridge(roomId: String, myUid: String) {
    val ctx = LocalContext.current
    var members by remember { mutableStateOf<Set<String>>(emptySet()) }
    var mySeat by remember { mutableStateOf<Seat?>(null) }
    var granted by remember {
        mutableStateOf(ContextCompat.checkSelfPermission(ctx, Manifest.permission.RECORD_AUDIO) == PackageManager.PERMISSION_GRANTED)
    }
    val launcher = rememberLauncherForActivityResult(ActivityResultContracts.RequestPermission()) { granted = it }

    DisposableEffect(roomId) {
        val main = android.os.Handler(android.os.Looper.getMainLooper())
        AgoraVoice.onProblem = { m -> main.post { android.widget.Toast.makeText(ctx, m, android.widget.Toast.LENGTH_LONG).show() } }
        AgoraVoice.siapkanToken(ctx, roomId)
        AgoraVoice.pasangVolumeStream(ctx)
        AgoraVoice.join(ctx, roomId)
        val a = RoomRepo.observeMembers(roomId) { members = it }
        val b = RoomRepo.observeSeats(roomId) { seats ->
            mySeat = seats.values.firstOrNull { it.uid == myUid }
        }
        onDispose {
            a.remove()
            b.remove()
            AgoraVoice.onProblem = null
            AgoraVoice.leave()
        }
    }

    val onSeat = mySeat != null
    LaunchedEffect(onSeat) { if (onSeat && !granted) launcher.launch(Manifest.permission.RECORD_AUDIO) }
    LaunchedEffect(onSeat, mySeat?.muted, granted) {
        AgoraVoice.setSpeaking(onSeat && granted && mySeat?.muted == false)
    }
}

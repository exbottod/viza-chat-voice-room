package com.rezochatvoice.exceo

import android.Manifest
import android.app.Activity
import android.content.Context
import android.content.ContextWrapper
import android.media.AudioManager
import android.content.pm.PackageManager
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
import io.livekit.android.LiveKit
import io.livekit.android.events.RoomEvent
import io.livekit.android.room.Room
import io.livekit.android.room.track.RemoteAudioTrack
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
 * Suara room lewat LiveKit di VPS sendiri (tanpa Agora, tanpa kuota menit).
 * Nama objek dipertahankan (AgoraVoice) supaya layar yang memakainya tidak berubah.
 * Satu room = satu room LiveKit (nama = roomId). Token dari VPS, diverifikasi dengan login Firebase.
 */
object AgoraVoice {
    private const val TAG = "LiveKitVoice"
    private const val TOKEN_URL = "https://viza.43-156-99-4.sslip.io/lktoken"

    /**
     * Penyetelan suara: peredam derau (noise suppression) dan filter nada
     * rendah dimatikan, karena keduanya memotong musik yang diputar user di
     * room sehingga terdengar gepeng dan tidak jelas. Peredam gema tetap
     * hidup supaya tidak terjadi lengkingan.
     */
    private val ROOM_OPSI = io.livekit.android.RoomOptions(
        adaptiveStream = true,
        dynacast = true,
        audioTrackCaptureDefaults = io.livekit.android.room.track.LocalAudioTrackOptions(
            echoCancellation = true,
            noiseSuppression = false,
            autoGainControl = true,
            highPassFilter = false,
            typingNoiseDetection = false,
        ),
    )
    private val scope = CoroutineScope(SupervisorJob() + Dispatchers.IO)
    private val mainScope = CoroutineScope(SupervisorJob() + Dispatchers.Main)

    private var room: Room? = null
    private var appCtx: Context? = null
    private var joinJob: Job? = null
    private var pantauSambung: Job? = null
    private var eventJob: Job? = null
    private val joinLock = Mutex()

    @Volatile private var roomId: String? = null
    @Volatile private var joined = false
    @Volatile private var wantSpeaking = false
    @Volatile private var muteRemote = false
    @Volatile private var sengajaKeluar = false
    @Volatile private var percobaan = 0
    @Volatile private var konekSejak = 0L
    // Berapa kali sambungan putus dalam hitungan detik setelah tersambung. Kalau
    // media tidak bisa terbangun (UDP/TCP media tertutup, jaringan seluler aneh),
    // LiveKit akan connect lalu putus berulang. Dulu aplikasi menyambung ulang
    // tanpa batas sehingga status "menyambung ulang" tidak pernah berhenti dan
    // aplikasi jadi berat.
    @Volatile private var gagalCepat = 0
    private var pantauReconnect: Job? = null

    var lastStatus by androidx.compose.runtime.mutableStateOf("")

    /**
     * Tingkat suara tiap peserta (uid -> 0..1), dipakai untuk gelombang suara
     * di belakang kursi mic supaya terlihat siapa yang sedang bicara.
     */
    var levels by androidx.compose.runtime.mutableStateOf<Map<String, Float>>(emptyMap())
        private set

    /**
     * UID yang benar-benar sedang bersuara menurut LiveKit. Dipakai untuk
     * gelembung/gelombang di kursi mic, karena level suara peserta lain
     * tidak selalu dikirim lewat angka.
     */
    var bicara by androidx.compose.runtime.mutableStateOf<Set<String>>(emptySet())
        private set

    private var levelJob: Job? = null

    private fun mulaiPantauLevel() {
        levelJob?.cancel()
        levelJob = mainScope.launch {
            while (joined) {
                val r = room
                if (r == null) { delay(300); continue }
                val m = HashMap<String, Float>()
                val deteksi = HashSet<String>()
                try {
                    val uidSaya = r.localParticipant.identity?.value
                    if (uidSaya != null) {
                        val lvSaya = r.localParticipant.audioLevel
                        m[uidSaya] = lvSaya
                        if (lvSaya > 0.02f) deteksi.add(uidSaya)
                    }
                    // Peserta lain: ambil dari daftar pembicara aktif LiveKit,
                    // angkanya punya nilai bawaan supaya gelombang tetap muncul.
                    val aktif = bicara
                    for ((_, p) in r.remoteParticipants) {
                        val id = p.identity?.value ?: continue
                        val lv = p.audioLevel
                        if (lv > 0.02f) deteksi.add(id)
                        m[id] = if (lv > 0.01f) lv else if (aktif.contains(id)) 0.55f else 0f
                    }
                } catch (e: Exception) { }
                levels = m
                // Kalau event pembicara dari server tidak datang (sering terjadi
                // di jaringan lambat), pakai hasil deteksi level suara sendiri.
                if (bicara.isEmpty() && deteksi.isNotEmpty()) bicara = deteksi
                delay(130)
            }
            levels = emptyMap()
        }
    }

    private fun hentikanPantauLevel() {
        levelJob?.cancel(); levelJob = null
        levels = emptyMap()
        bicara = emptySet()
    }

    @Volatile var onProblem: ((String) -> Unit)? = null

    // ===== Volume & rute suara =====
    // Sebelumnya app tidak pernah memberi tahu Android stream mana yang dipakai,
    // jadi tombol volume malah mengatur "Nada dering" dan suara room tetap pelan.
    // Sekarang selama di room, tombol volume mengatur volume panggilan (suara room).
    private var audioMgr: AudioManager? = null
    private var prevVolumeStream: Int? = null
    private var prevSpeaker: Boolean? = null
    private var prevMode: Int? = null
    @Volatile private var routed = false
    // Activity yang sedang dipakai. Dulu tuneAudioRoute hanya menerima application
    // context, dan dari situ Activity tidak pernah ketemu, sehingga tombol volume
    // tetap mengatur volume notifikasi, bukan volume suara room.
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
                    // Jangan timpa nilai asli kalau sudah dipasang saat masuk room.
                    if (!streamTerpasang) {
                        prevVolumeStream = it.volumeControlStream
                        streamTerpasang = true
                    }
                    it.volumeControlStream = AudioManager.STREAM_VOICE_CALL
                }
                val max = try { mgr.getStreamMaxVolume(AudioManager.STREAM_VOICE_CALL) } catch (e: Exception) { 0 }
                val cur = try { mgr.getStreamVolume(AudioManager.STREAM_VOICE_CALL) } catch (e: Exception) { 0 }
                // Suara room tidak boleh mulai dari keadaan nyaris bisu.
                if (max > 0 && cur < (max * 0.7f).toInt()) {
                    try { mgr.setStreamVolume(AudioManager.STREAM_VOICE_CALL, (max * 0.8f).toInt(), 0) } catch (e: Exception) { }
                }
                routed = true
            }
            try { mgr.mode = AudioManager.MODE_IN_COMMUNICATION } catch (e: Exception) { }
            try { mgr.isSpeakerphoneOn = true } catch (e: Exception) { }
        } catch (e: Exception) {
            Log.e(TAG, "tuneAudioRoute: ${e.message}")
        }
    }

    /**
     * Arahkan tombol volume ke volume panggilan (suara room) sejak user masuk room.
     * Tanpa ini tombol volume mengatur volume notifikasi karena tidak ada stream
     * media yang aktif, dan pengguna merasa tidak punya akses volume.
     */
    fun pasangVolumeStream(ctx: Context) {
        try {
            findActivity(ctx)?.let { actAktif = it }
            val act = actAktif ?: return
            if (!streamTerpasang) {
                prevVolumeStream = act.volumeControlStream
                act.volumeControlStream = AudioManager.STREAM_VOICE_CALL
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

    // Token disiapkan LEBIH DULU (saat masuk room), bukan saat menekan mic.
    // Endpoint token di VPS pernah butuh 10-18 detik, dan karena dulu token
    // selalu diambil tepat saat mau nyambung, suara terasa menunggu lama.
    private var tokSimpan: Tok? = null
    private var tokRoom: String? = null
    private var tokWaktu = 0L
    private const val TOK_UMUR = 10 * 60_000L

    // Satu permintaan token saja walau pemanasan dan tombol mic berjalan bersamaan.
    private val kunciToken = Mutex()

    /** Ambil token siap pakai: dari simpanan kalau masih segar, kalau tidak ambil baru. */
    private suspend fun tokenUntuk(id: String, diam: Boolean = false): Tok? = kunciToken.withLock {
        val t = tokSimpan
        if (t != null && tokRoom == id && System.currentTimeMillis() - tokWaktu < TOK_UMUR) return@withLock t
        val baru = fetchToken(id, diam) ?: return@withLock null
        tokSimpan = baru
        tokRoom = id
        tokWaktu = System.currentTimeMillis()
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

    private data class Tok(val token: String, val url: String)

    private suspend fun fetchToken(channel: String, diam: Boolean = false): Tok? {
        var lastErr = ""
        for (attempt in 1..5) {
            try {
                val idToken = FirebaseAuth.getInstance().currentUser
                    ?.getIdToken(attempt > 1)?.await()?.token
                if (idToken == null) { if (!diam) problem("Suara mati: belum login"); return null }
                val c = (URL(TOKEN_URL).openConnection() as HttpURLConnection).apply {
                    requestMethod = "POST"
                    connectTimeout = 12_000
                    readTimeout = 25_000
                    doOutput = true
                    setRequestProperty("Authorization", "Bearer $idToken")
                    setRequestProperty("Content-Type", "application/json")
                }
                // Server membaca "room" (versi baru) dan "channel" (versi lama).
                // Dikirim dua-duanya supaya room tidak pernah jatuh ke room umum.
                c.outputStream.use {
                    it.write(
                        JSONObject().put("room", channel).put("channel", channel).toString().toByteArray(),
                    )
                }
                if (c.responseCode == 200) {
                    val o = JSONObject(c.inputStream.bufferedReader().readText())
                    return Tok(o.getString("token"), o.getString("url"))
                }
                val body = c.errorStream?.bufferedReader()?.readText().orEmpty()
                lastErr = "token gagal ${c.responseCode} $body"
                if (c.responseCode in 400..499 && c.responseCode != 408 && c.responseCode != 429) break
            } catch (e: kotlinx.coroutines.CancellationException) {
                throw e
            } catch (e: Exception) {
                lastErr = "token error ${e.message}"
            }
            // 502/503/timeout biasanya sesaat (VPS tersendat). Jeda dinaikkan dan
            // percobaan ditambah supaya suara tidak mati hanya karena satu kedipan.
            lastStatus = "Suara: menyambung…"
            delay(1200L * attempt)
        }
        // Tanpa toast: status tenang yang bisa diketuk untuk mencoba lagi.
        if (!diam) lastStatus = "Suara: belum tersambung, ketuk untuk coba"
        return null
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
                val t = tokenUntuk(id) ?: return@withLock
                if (roomId != id) return@withLock
                try {
                    closeRoom()
                    lastStatus = "Suara: menyambung…"
                    // Penghitung detik: dulu status hanya "menyambung…" tanpa
                    // batas waktu sehingga tidak jelas apakah sambungan macet.
                    // Tanpa hitungan detik: status cukup satu baris tenang, dan
                    // kalau macet pengguna bisa mengetuknya untuk mencoba lagi.
                    pantauSambung?.cancel()
                    pantauSambung = mainScope.launch {
                        // Negosiasi ICE di seluler/wifi lambat bisa lebih dari 10 detik.
                        // Dulu status menyerah di detik ke-10 padahal masih berjalan
                        // wajar, lalu room dibongkar dan dibangun ulang (makin lambat).
                        delay(25_000L)
                        if (!joined && roomId == id && !sengajaKeluar) {
                            lastStatus = "Suara: belum tersambung, ketuk untuk coba"
                        }
                    }
                    val r = LiveKit.create(app, ROOM_OPSI)
                    room = r
                    eventJob = mainScope.launch {
                        r.events.events.collect { ev ->
                            when (ev) {
                                is RoomEvent.Connected -> {
                                    joined = true
                                    // Dulu penghitung langsung direset di sini, jadi
                                    // sambungan yang nyambung-putus berulang terus
                                    // membuat room LiveKit baru: aplikasi jadi berat.
                                    // Sekarang direset hanya kalau sudah stabil 60 detik.
                                    konekSejak = System.currentTimeMillis()
                                    mainScope.launch {
                                        delay(60_000L)
                                        if (joined) { percobaan = 0; gagalCepat = 0 }
                                    }
                                    lastStatus = "OK tersambung"
                                    mulaiPantauLevel()
                                    appCtx?.let { c -> mainScope.launch { tuneAudioRoute(c) } }
                                }
                                is RoomEvent.Reconnecting -> {
                                    lastStatus = "Suara: menyambung ulang…"
                                    // Beri tenggang: kalau LiveKit tidak berhasil
                                    // menyambung lagi dalam 8 detik, tutup room lama
                                    // dan coba sekali dengan room baru. Tanpa ini
                                    // LiveKit bisa berputar sendiri terus.
                                    pantauReconnect?.cancel()
                                    pantauReconnect = mainScope.launch {
                                        delay(20_000L)
                                        if (!joined && !sengajaKeluar && roomId == id) {
                                            lastStatus = "Suara: menyambung ulang…"
                                            cobaSambungUlang(id, "media lambat")
                                        }
                                    }
                                }
                                is RoomEvent.Reconnected -> {
                                    joined = true
                                    konekSejak = System.currentTimeMillis()
                                    lastStatus = "OK tersambung"
                                    mulaiPantauLevel()
                                    appCtx?.let { c -> mainScope.launch { tuneAudioRoute(c) } }
                                }
                                is RoomEvent.Disconnected -> {
                                    joined = false
                                    pantauReconnect?.cancel(); pantauReconnect = null
                                    // Sambungan yang putus beberapa detik setelah
                                    // tersambung hampir selalu berarti media tidak
                                    // terbangun, bukan jaringan goyang sebentar.
                                    if (konekSejak > 0L &&
                                        System.currentTimeMillis() - konekSejak < 6_000L
                                    ) gagalCepat += 1
                                    cobaSambungUlang(id, ev.error?.message)
                                }
                                is RoomEvent.FailedToConnect -> {
                                    // Jangan munculkan toast tiap gagal: cukup status
                                    // tenang yang bisa diketuk untuk mencoba lagi.
                                    lastStatus = "Suara: belum tersambung, ketuk untuk coba"
                                }
                                is RoomEvent.ActiveSpeakersChanged -> {
                                    val ids = HashSet<String>()
                                    for (p in ev.speakers) p.identity?.value?.let { ids.add(it) }
                                    bicara = ids
                                }
                                is RoomEvent.TrackSubscribed -> applyMute()
                                else -> {}
                            }
                        }
                    }
                    // Server suara kadang tidak menjawab sama sekali, dan dulu
                    // connect() menunggu tanpa batas sehingga status tertahan di
                    // "Suara: menyambung…". Sekarang dibatasi 15 detik lalu coba lagi.
                    val selesai = kotlinx.coroutines.withTimeoutOrNull(25_000L) {
                        r.connect(t.url, t.token)
                        true
                    }
                    pantauSambung?.cancel(); pantauSambung = null
                    if (selesai == null) {
                        joined = false
                        // closeRoom() memanggil release(). Dulu cabang ini hanya
                        // disconnect lalu lupa release(), jadi PeerConnection dan
                        // audio device tetap hidup di tiap percobaan gagal dan
                        // aplikasi makin berat serta lambat memuat.
                        closeRoom()
                        cobaSambungUlang(id, "server tidak menjawab")
                        return@withLock
                    }
                    pantauSambung?.cancel(); pantauSambung = null
                    joined = true
                    try { tuneAudioRoute(app) } catch (e: Exception) { }
                    lastStatus = "OK tersambung"
                    applyMute()
                    applyRole()
                } catch (e: kotlinx.coroutines.CancellationException) {
                    throw e
                } catch (e: Exception) {
                    pantauSambung?.cancel(); pantauSambung = null
                    joined = false
                    // Tanpa toast berulang: cukup status tenang yang bisa diketuk,
                    // dan sambung ulang tetap dibatasi.
                    try { closeRoom() } catch (x: Exception) { }
                    cobaSambungUlang(id, e.message)
                }
            }
        }
    }

    /**
     * Sambung ulang dengan batas tegas.
     *
     * Sambungan yang putus berkali-kali dalam hitungan detik berarti media tidak
     * bisa terbangun. Menyambung ulang terus hanya membuat aplikasi berat dan
     * status berputar di "menyambung ulang". Setelah dua kali gagal cepat,
     * berhenti dan biarkan pengguna mengetuk status untuk mencoba lagi.
     */
    private fun cobaSambungUlang(id: String, alasan: String?) {
        if (sengajaKeluar || roomId != id) return
        val terlaluSering = gagalCepat >= 2
        val habis = percobaan >= 4
        if (terlaluSering || habis) {
            lastStatus = if (terlaluSering) {
                "Suara: media tidak tersambung, ketuk untuk coba"
            } else {
                "Suara: belum tersambung, ketuk untuk coba"
            }
            percobaan = 0
            gagalCepat = 0
            // Room lama ditutup supaya PeerConnection dan audio tidak menumpuk.
            mainScope.launch { closeRoom() }
            return
        }
        percobaan += 1
        lastStatus = "Suara: menyambung ulang (${percobaan}/4)…"
        mainScope.launch {
            delay(1500L * percobaan)
            val c = appCtx
            if (!sengajaKeluar && roomId == id && c != null) join(c, id)
        }
    }

    private suspend fun closeRoom() {
        eventJob?.cancel(); eventJob = null
        hentikanPantauLevel()
        val r = room ?: return
        room = null
        try { r.disconnect() } catch (e: Exception) { }
        try { r.release() } catch (e: Exception) { }
    }

    private fun applyMute() {
        val r = room ?: return
        try {
            for ((_, p) in r.remoteParticipants) {
                for (pub in p.audioTrackPublications) {
                    (pub.second as? RemoteAudioTrack)?.setVolume(if (muteRemote) 0.0 else 1.0)
                }
            }
        } catch (e: Exception) {
            Log.e(TAG, "applyMute: ${e.message}")
        }
    }

    private fun applyRole() {
        val r = room ?: return
        val on = wantSpeaking
        mainScope.launch {
            try { r.localParticipant.setMicrophoneEnabled(on) } catch (e: Exception) {
                Log.e(TAG, "mic: ${e.message}")
                if (on) problem("Mic gagal: ${e.message}".take(100))
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
        // Ketukan pengguna selalu memulai dari nol. Dulu hitungan gagal cepat tidak
        // ikut direset, jadi setelah dua kali gagal setiap ketukan langsung
        // menyerah lagi tanpa benar-benar mencoba menyambung.
        percobaan = 0
        gagalCepat = 0
        konekSejak = 0L
        sengajaKeluar = false
        joined = false
        pantauReconnect?.cancel(); pantauReconnect = null
        join(ctx, id)
    }

    fun leave() {
        sengajaKeluar = true
        pantauReconnect?.cancel(); pantauReconnect = null
        percobaan = 0
        try { restoreAudioRoute() } catch (e: Exception) { }
        joinJob?.cancel()
        joined = false
        roomId = null
        wantSpeaking = false
        muteRemote = false
        stopMusic()
        scope.launch { joinLock.withLock { closeRoom() } }
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
            // Sifat audio musik supaya jelas dan tidak ikut jalur suara panggilan.
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
        // Tombol volume langsung mengatur suara room sejak layar room terbuka,
        // bukan volume notifikasi.
        AgoraVoice.pasangVolumeStream(ctx)
        AgoraVoice.join(ctx, roomId)
        val a = RoomRepo.observeMembers(roomId) { members = it }
        val b = RoomRepo.observeSeats(roomId) { seats ->
            // Pindah kursi kini satu tulisan atomik, jadi tidak ada kursi ganda.
            // Pembersihan otomatis di sini dihapus: dulu ia bisa membuang kursi
            // yang baru dinaiki sehingga user turun sendiri.
            mySeat = seats.values.firstOrNull { it.uid == myUid }
        }
        onDispose {
            a.remove()
            b.remove()
            AgoraVoice.onProblem = null
            AgoraVoice.leave()
        }
    }

    // Mic ditentukan oleh KURSI saja. Sebelumnya juga butuh myUid di members, padahal
    // user dengan "Invisible in rooms" (SVIP7) / join gagal tidak masuk members,
    // sehingga suaranya tidak pernah terkirim.
    val onSeat = mySeat != null
    LaunchedEffect(onSeat) { if (onSeat && !granted) launcher.launch(Manifest.permission.RECORD_AUDIO) }
    LaunchedEffect(onSeat, mySeat?.muted, granted) {
        AgoraVoice.setSpeaking(onSeat && granted && mySeat?.muted == false)
    }
}

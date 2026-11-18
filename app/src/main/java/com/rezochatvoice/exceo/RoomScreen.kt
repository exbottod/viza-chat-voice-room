package com.rezochatvoice.exceo

import com.google.firebase.auth.FirebaseAuth
import android.content.Intent
import android.net.Uri
import android.widget.Toast
import androidx.activity.compose.BackHandler
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.PickVisualMediaRequest
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.detectDragGestures
import androidx.compose.foundation.gestures.detectHorizontalDragGestures
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.KeyboardArrowDown
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.Switch
import androidx.compose.material3.SwitchDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.mutableLongStateOf
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateMapOf
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.foundation.layout.only
import androidx.compose.foundation.layout.displayCutout
import androidx.compose.foundation.layout.WindowInsetsSides
import androidx.compose.ui.zIndex
import androidx.compose.ui.graphics.ImageBitmap
import androidx.compose.ui.input.pointer.pointerInput
import coil.compose.AsyncImage
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.layout.onGloballyPositioned
import androidx.compose.ui.layout.positionInRoot
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import androidx.core.content.FileProvider
import java.io.File
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.tasks.await
import kotlin.math.abs
import kotlin.math.roundToInt
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.navigationBars
import androidx.compose.foundation.layout.statusBars

private const val P_NONE = 0

private const val P_POWER = 1

private const val P_TOOLS = 2

private const val P_MODE = 3

private const val P_SETTINGS = 4

private const val P_LOCK = 5

private const val P_CLEAR = 6

private const val P_MUSIC = 7

private const val P_BLACKLIST = 8

private const val P_MEMBERS = 9

private const val P_EFEK = 10

private const val P_KALK = 11

private const val P_BICARA = 12

private val Teal = Color(0xFF2BD9C4)

@OptIn(androidx.compose.foundation.layout.ExperimentalLayoutApi::class)
@Composable
fun RoomScreen(
    roomId: String,
    myUid: String,
    myName: String,
    myAvatarB64: String?,
    onExit: () -> Unit,
    onMinimize: () -> Unit,
    // Data room yang sudah ada dari kartu yang diketuk: layar langsung tampil
    // tanpa menunggu jaringan, data segar menimpa begitu datang.
    initialRoom: RoomInfo? = null,
) {
    // Waktu (ms) dompet terakhir disegarkan karena gift masuk.
    var segarGift by remember { mutableLongStateOf(0L) }

    val context = LocalContext.current
    var myFam by remember(myUid) { mutableStateOf("") }
    LaunchedEffect(myUid) {
        myFam = try { UserDirectory.findByUid(myUid)?.fam ?: "" } catch (e: kotlinx.coroutines.CancellationException) { throw e } catch (e: Exception) { "" }
    }
    val scope = rememberCoroutineScope()

    var room by remember { mutableStateOf<RoomInfo?>(initialRoom) }
    // --- Owner bisa mengeluarkan user: kalau keanggotaan kita hilang, keluar dari room.
    var joinedOnce by remember { mutableStateOf(false) }
    var kickedOut by remember { mutableStateOf(false) }
    // Loading singkat saat masuk room, sampai kursi dan chat tampil.
    var siapRoom by remember { mutableStateOf(false) }
    LaunchedEffect(roomId, myUid) {
        val reg = Rtdb.listen(Rtdb.ref("members/" + roomId + "/" + myUid)) { snap ->
            if (snap.exists()) {
                joinedOnce = true
            } else if (joinedOnce && !kickedOut) {
                // Keanggotaan bisa hilang sendiri (jaringan putus-nyambung, login di dua
                // HP). Itu BUKAN kick. Kick hanya sah kalau kita benar-benar ada di daftar
                // hitam; kalau tidak, cukup tulis ulang keanggotaan kita.
                scope.launch {
                    val ban = try { RoomRepo.banOf(roomId, myUid) } catch (e: kotlinx.coroutines.CancellationException) { throw e } catch (e: Exception) { null }
                    if (ban != null && room?.let { it.ownerUid != myUid && !it.isAdminRoom(myUid) } != false) {
                        kickedOut = true
                    } else {
                        try { Rtdb.ref("members/" + roomId + "/" + myUid).setValue(true) } catch (e: Exception) { }
                    }
                }
            }
        }
        kotlinx.coroutines.delay(600000)
        reg.remove()
    }

    val appActions = LocalActions.current

    var members by remember { mutableStateOf<Set<String>>(emptySet()) }
    var locks by remember { mutableStateOf<Set<Int>>(emptySet()) }
    var rawSeats by remember { mutableStateOf<Map<Int, Seat>>(emptyMap()) }
    androidx.compose.runtime.LaunchedEffect(roomId) {
        siapRoom = false
        // Begitu kursi room terbaca, loading langsung dilepas supaya room cepat
        // normal; kalau jaringan lambat, paling lambat 1,2 detik tetap dibuka.
        kotlinx.coroutines.withTimeoutOrNull(1200L) {
            while (rawSeats.isEmpty()) kotlinx.coroutines.delay(80)
        }
        kotlinx.coroutines.delay(120)
        siapRoom = true
    }
    var micPoints by remember { mutableStateOf<Map<Int, Long>>(emptyMap()) }
    // Poin kamar (RTDB): dipakai untuk menampilkan level room di sebelah ID room.
    var poinKamar by remember { mutableStateOf(0L) }
    androidx.compose.runtime.DisposableEffect(roomId) {
        val regPoin = Rtdb.listen(Rtdb.ref("roomPoin/" + roomId + "/total")) { snap ->
            poinKamar = snap.getValue(Long::class.java) ?: 0L
        }
        onDispose { regPoin.remove() }
    }
    // Pengaturan room (RTDB roomCfg): mic bebas, kalkulator poin, bicara publik.
    var cfgMicBebas by remember { mutableStateOf(true) }
    var cfgPoin by remember { mutableStateOf(true) }
    var cfgBicaraAdmin by remember { mutableStateOf(false) }
    // Permintaan naik mic (mode minta mic): kursi -> (uid -> nama).
    var micReq by remember { mutableStateOf<Map<Int, Map<String, String>>>(emptyMap()) }
    // Tab awal saat Pengaturan dibuka dari Alat dasar (2 = Tema kamar).
    var subAwalSettings by remember { mutableStateOf(0) }
    var followed by remember { mutableStateOf(false) }
    var showRank by remember { mutableStateOf(false) }
    val seats = rawSeats.filterValues { it.uid in members }
    // Posisi avatar tiap kursi (untuk animasi gift terbang ke penerima).
    val seatPoints = remember { mutableStateMapOf<Int, Offset>() }
    // Riwayat chat room disimpan di memori supaya tidak hilang saat aplikasi
    // di-minimize; hanya bersih saat aplikasi ditutup.
    var messages by remember(roomId) { mutableStateOf(RoomChatCache.ambil(roomId)) }
    var panel by remember { mutableStateOf(P_NONE) }
    var seatSheet by remember { mutableStateOf<Int?>(null) }
    var waveOpen by remember { mutableStateOf(false) }
    var seatInvite by remember { mutableStateOf<Int?>(null) }
    var bans by remember { mutableStateOf<List<RoomRepo.RoomBan>>(emptyList()) }
    // Pilihan durasi saat menekan "Kick dari room": uid ke nama user.
    var kickPick by remember { mutableStateOf<Pair<String, String>?>(null) }
    var roomMuted by remember { mutableStateOf(false) }
    // ---- Moderasi room: larangan mic/ketik, jadi admin, laporan ----
    var larangan by remember(roomId) { mutableStateOf<Map<String, LaranganRoom>>(emptyMap()) }
    androidx.compose.runtime.DisposableEffect(roomId) {
        val reg = RoomModerasi.observeLarangan(roomId) { larangan = it }
        onDispose { reg.remove() }
    }
    var adminPick by remember { mutableStateOf<Pair<String, String>?>(null) }
    var laporPick by remember { mutableStateOf<PublicUser?>(null) }
    // ---- Room PK ----
    var pk by remember(roomId) { mutableStateOf<PkState?>(null) }
    var pkBuat by remember { mutableStateOf(false) }
    var pkHasil by remember(roomId) { mutableStateOf(false) }
    androidx.compose.runtime.DisposableEffect(roomId) {
        val reg = RoomPk.observe(roomId) { pk = it }
        onDispose { reg.remove() }
    }
    // Waktu habis: skor dibekukan dan hasil ditampilkan sekali untuk semua orang.
    androidx.compose.runtime.LaunchedEffect(pk?.akhir, pk?.selesai) {
        val p = pk ?: return@LaunchedEffect
        if (!p.aktif || p.selesai || p.akhir <= 0L) return@LaunchedEffect
        val sisa = p.akhir - Rtdb.serverNow()
        if (sisa > 0L) kotlinx.coroutines.delay(sisa + 400L)
        RoomPk.tandaiSelesai(roomId)
    }
    androidx.compose.runtime.LaunchedEffect(pk?.selesai) {
        if (pk?.selesai == true) pkHasil = true
    }
    // Animasi mulai PK (video dari APK rujukan): sekali putar tiap PK dimulai.
    var pkAnim by remember(roomId) { mutableStateOf(false) }
    androidx.compose.runtime.LaunchedEffect(pk?.mulai) {
        val p = pk ?: return@LaunchedEffect
        if (p.aktif && !p.selesai && p.mulai > 0L) pkAnim = true
    }

    // Saklar efek (Kotak 4): matikan efek masuk room dan efek gift kalau ramai.
    // Disimpan per akun di Realtime Database supaya tetap sama saat buka room lain.
    val fxUid = remember { FirebaseAuth.getInstance().currentUser?.uid ?: "" }
    // Pilihan dibaca dulu dari penyimpanan HP (langsung, tanpa menunggu jaringan),
    // lalu disamakan dengan Realtime Database. Jadi setelan yang dimatikan tidak
    // kembali menyala saat keluar room atau keluar aplikasi.
    val fxLocal = remember {
        context.getSharedPreferences("fx_prefs_" + fxUid, android.content.Context.MODE_PRIVATE)
    }
    var fxEntryOn by remember { mutableStateOf(fxLocal.getBoolean("entry", true)) }
    var fxGiftOn by remember { mutableStateOf(fxLocal.getBoolean("gift", true)) }
    // Banner efek gift di atas layar: bisa dimatikan dari room.
    var fxBannerOn by remember { mutableStateOf(fxLocal.getBoolean("banner", true)) }
    // Efek roket (peluncuran + ikon di sisi room) dan efek game (banner menang).
    var fxRocketOn by remember { mutableStateOf(fxLocal.getBoolean("rocket", true)) }
    var fxGameOn by remember { mutableStateOf(fxLocal.getBoolean("game", true)) }
    DisposableEffect(fxUid) {
        if (fxUid.isBlank()) {
            onDispose { }
        } else {
            val reg = Rtdb.listen(Rtdb.ref("fxPrefs/$fxUid")) { snap ->
                // Hanya timpa kalau server memang punya nilainya; kalau belum ada,
                // pakai pilihan terakhir di HP (jangan balik ke "nyala").
                if (snap.hasChild("entry")) snap.child("entry").getValue(Boolean::class.java)?.let { fxEntryOn = it; fxLocal.edit().putBoolean("entry", it).apply() }
                if (snap.hasChild("gift")) snap.child("gift").getValue(Boolean::class.java)?.let { fxGiftOn = it; fxLocal.edit().putBoolean("gift", it).apply() }
                if (snap.hasChild("banner")) snap.child("banner").getValue(Boolean::class.java)?.let { fxBannerOn = it; fxLocal.edit().putBoolean("banner", it).apply() }
                if (snap.hasChild("rocket")) snap.child("rocket").getValue(Boolean::class.java)?.let { fxRocketOn = it; fxLocal.edit().putBoolean("rocket", it).apply() }
                if (snap.hasChild("game")) snap.child("game").getValue(Boolean::class.java)?.let { fxGameOn = it; fxLocal.edit().putBoolean("game", it).apply(); GameBanner.simpanSaklar(context, it) }
            }
            onDispose { reg.remove() }
        }
    }
    var typing by remember { mutableStateOf(false) }
    androidx.compose.runtime.LaunchedEffect(larangan[myUid]?.ketik) {
        if (larangan[myUid]?.ketik == true) typing = false
    }
    var emoteOpen by remember { mutableStateOf(false) }
    var giftOpen by remember { mutableStateOf(false) }
    var rocketOpen by remember { mutableStateOf(false) }
    var giftTarget by remember { mutableStateOf<String?>(null) }
    var emotes by remember { mutableStateOf<Map<String, SeatEmote>>(emptyMap()) }
    // Emot yang sudah tampil sekali ("uid:at"). Disimpan di level room supaya pindah
    // kursi (komponen kursi dibuat ulang) tidak memunculkan emot yang sama lagi.
    val emotSudahTampil = remember { mutableStateListOf<String>() }
    var customEmotes by remember { mutableStateOf<List<RoomEmote>>(emptyList()) }
    LaunchedEffect(roomId) { customEmotes = RoomEmotes.load() }
    // Tambah emot dari dalam room (unggah berkas atau tautan). Hanya developer
    // dan staf panel, sama seperti pengelolaan aset lain.
    var tambahEmotOpen by remember { mutableStateOf(false) }
    var bolehTambahEmot by remember { mutableStateOf(false) }
    LaunchedEffect(Unit) { bolehTambahEmot = EmotTambah.boleh() }
    var draft by remember(roomId) { mutableStateOf(RoomChatCache.ambilDraf(roomId)) }
    LaunchedEffect(roomId, draft) { RoomChatCache.simpanDraf(roomId, draft) }
    var profileUid by remember { mutableStateOf<String?>(null) }
    var clearedAt by remember { mutableStateOf(0L) }
    var sendTick by remember { mutableStateOf(0) }
    val toast = { msg: String -> Toast.makeText(context, msg, Toast.LENGTH_SHORT).show() }

    // Hapus semua draft/state sementara (ketikan chat, panel gift, emot, dll)
    fun resetDrafts() {
        draft = ""
        typing = false
        emoteOpen = false
        giftOpen = false
        giftTarget = null
        seatSheet = null
        seatInvite = null
        profileUid = null
        panel = P_NONE
    }

    DisposableEffect(roomId) {
        resetDrafts()
        // Riwayat chat/gift lama tidak ditampilkan lagi saat masuk room (hanya pesan setelah masuk)
        clearedAt = System.currentTimeMillis()
        // Room dimuat dari Realtime Database (bebas kuota Firestore).
        val a = RoomRepo.observeRoom(roomId) { got -> if (got != null) room = got }
        // Musik room diputar dari tautan bersama: semua orang di room mendengar.
        RoomMusicShare.observe(roomId)
        val b = RoomRepo.observeSeats(roomId) { rawSeats = it }
        // Status follow room (RTDB, hemat kuota Firestore).
        val freg = Rtdb.listen(Rtdb.ref("followRooms/" + myUid + "/" + roomId)) { snap ->
            followed = snap.exists()
        }
        // Poin mic (RTDB): tampil real-time di bawah tiap kursi.
        val mp = Rtdb.listen(Rtdb.ref("micPoints/" + roomId)) { snap ->
            micPoints = snap.children.associate { c ->
                (c.key?.toIntOrNull() ?: -1) to (c.getValue(Long::class.java) ?: 0L)
            }
        }
        val cfgReg = Rtdb.listen(Rtdb.ref("roomCfg/" + roomId)) { snap ->
            cfgMicBebas = snap.child("micBebas").getValue(Boolean::class.java) ?: true
            cfgPoin = snap.child("hitungPoin").getValue(Boolean::class.java) ?: true
            cfgBicaraAdmin = snap.child("bicaraAdmin").getValue(Boolean::class.java) ?: false
        }
        val reqReg = Rtdb.listen(Rtdb.ref("micRequests/" + roomId)) { snap ->
            val m = HashMap<Int, Map<String, String>>()
            for (kursi in snap.children) {
                val idx = kursi.key?.toIntOrNull() ?: continue
                val isi = HashMap<String, String>()
                for (u in kursi.children) {
                    val uid = u.key ?: continue
                    isi[uid] = u.child("name").getValue(String::class.java) ?: uid
                }
                if (isi.isNotEmpty()) m[idx] = isi
            }
            micReq = m
        }
        val c = RoomRepo.observeMessages(roomId) { baru ->
            // Gift masuk: berlian penerima ditambahkan di server, jadi dompet
            // di HP penerima harus langsung disegarkan. Tanpa ini pemain harus
            // menunggu putaran dompet berikutnya dan merasa tidak menerima apa pun.
            val adaGift = baru.any { m ->
                val t = m.text
                (t.startsWith("\uD83C\uDF81") || t.startsWith("\uD83D\uDC8E")) &&
                    t.contains(myName, true)
            }
            messages = RoomChatCache.satukan(roomId, baru)
            if (adaGift) {
                val kini = System.currentTimeMillis()
                if (kini - segarGift > 3000L) {
                    segarGift = kini
                    AppScope.scope.launch {
                        try {
                            SupaRepo.get(myUid).wallet?.let { WalletRepo.emitBackup(myUid, it) }
                        } catch (e: kotlinx.coroutines.CancellationException) {
                            throw e
                        } catch (e: Exception) { }
                    }
                }
            }
        }
        val d = RoomExtras.observeEmotes(roomId) { emotes = it }
        val e1 = RoomRepo.observeMembers(roomId) { members = it }
        val e2 = RoomRepo.observeLocks(roomId) { locks = it }
        val f = RoomRepo.observeBans(roomId) { list ->
            bans = list
            // Owner tidak pernah bisa ter-kick dari room miliknya sendiri.
            if (list.any { it.uid == myUid } && !kickedOut && room?.let { it.ownerUid != myUid && !it.isAdminRoom(myUid) } != false) kickedOut = true
        }
        onDispose {
            resetDrafts()
            MusicEngine.reset()
            a.remove()
            b.remove()
            c.remove()
            d.remove()
            e1.remove()
            e2.remove()
            mp.remove()
            freg.remove()
            f.remove()
        }
    }

    // Penjaga spinner: kalau 2 detik room belum termuat, coba lagi berkali-kali lewat
    // getRoom (Realtime Database dulu, lalu Firestore) sampai dapat.
    LaunchedEffect(roomId) {
        var tries = 0
        while (room == null && tries < 8) {
            kotlinx.coroutines.delay(if (tries == 0) 2000L else 3000L)
            if (room != null) break
            val got = try { RoomRepo.getRoom(roomId) } catch (e: kotlinx.coroutines.CancellationException) { throw e } catch (e: Exception) { null }
            if (got != null && room == null) room = got
            tries++
        }
    }

    BackHandler {
        when {
            giftOpen -> giftOpen = false
            typing -> typing = false
            emoteOpen -> emoteOpen = false
            seatInvite != null -> seatInvite = null
            seatSheet != null -> seatSheet = null
            panel != P_NONE -> panel = P_NONE
            else -> onMinimize()
        }
    }
    val r = room?.copy(online = members.size, lockedSeats = locks.toList())

    Box(Modifier.fillMaxSize().blockTouches()) {
        RoyalBackground()
        if (r == null) {
            Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) { VizaLoading(ukuran = 26.dp) }
            Text(
                tr("Keluar"),
                color = GoldLight,
                modifier = Modifier.align(Alignment.TopStart).statusBarsPadding().padding(16.dp).clickable { onExit() },
            )
            return@Box
        }
        val bg = rememberRoomBg(r)
        if (bg != null) {
            Image(bitmap = bg, contentDescription = null, contentScale = ContentScale.Crop, modifier = Modifier.fillMaxSize())
            Box(Modifier.fillMaxSize().background(Color(0x88000000)))
        }
        val isOwner = r.ownerUid == myUid
        // Pemilik room selalu boleh. Akun developer (pemilik aplikasi) tetap bisa
        // mengatur mic/kick di room mana pun; pengguna lain hanya di room miliknya.
        val isDevAdmin = FirebaseAuth.getInstance().currentUser?.email.equals("owner@email-anda.com", ignoreCase = true)
        val isRoomAdmin = !isOwner && r.isAdminRoom(myUid)
        val canManage = isOwner || isRoomAdmin || isDevAdmin
        val roomIdNow = r.id
        val myUidNow = myUid
        val myNameNow = myName

        // ---- kirim gambar dari galeri ----
    var imgBusy by remember { mutableStateOf(false) }
    var lihatGambar by remember { mutableStateOf<String?>(null) }
    val imgPicker = androidx.activity.compose.rememberLauncherForActivityResult(
        androidx.activity.result.contract.ActivityResultContracts.GetContent(),
    ) { uri ->
        if (uri == null || imgBusy) return@rememberLauncherForActivityResult
        imgBusy = true
        scope.launch {
            val (url, err) = RoomImages.upload(context, uri)
            imgBusy = false
            if (url == null) {
                toast(err ?: "Gagal mengunggah gambar")
            } else {
                val sisa = draft.trim()
                val e = RoomExtras.sendImage(roomIdNow, myUidNow, myNameNow, url, sisa)
                if (e == null) {
                    draft = ""
                    sendTick++
                } else {
                    toast(e)
                }
            }
        }
    }

        var ownerUserId by remember(r.ownerUid) {
            mutableStateOf(
                if (r.ownerUid == myUid) UserDirectory.cachedId(context, myUid) else UserCache.peek(r.ownerUid)?.userId,
            )
        }
        LaunchedEffect(r.ownerUid) {
            if (ownerUserId == null) {
                ownerUserId = (if (r.ownerUid == myUid) UserDirectory.cachedId(context, myUid) else UserCache.byUid(r.ownerUid)?.userId)
                // FIX code room dihapus: ID user TIDAK boleh diganti kode room.
                // Kalau cache ID kosong, ambil ID asli dari profil publik RTDB.
                if (ownerUserId == null) {
                    try {
                        val pid = UserDirectory.officialIdOf(r.ownerUid)
                        if (!pid.isNullOrBlank()) ownerUserId = pid
                    } catch (e: kotlinx.coroutines.CancellationException) {
                        throw e
                    } catch (e: Exception) { }
                }
            }
        }
        val mySeat = seats.values.firstOrNull { it.uid == myUid }
        val roomBmp = rememberRoomPhoto(r)
        val cols = micColumns(r.micCount)
        val rows = (r.micCount + cols - 1) / cols
        val seatSize = if (cols == 4) 54.dp else 48.dp
        val listState = rememberLazyListState()
        // Tab chat: false = Semua (user + gift + sistem), true = Obrolan (hanya ketikan user).
        var onlyChat by remember { mutableStateOf(false) }
        val visible = messages.filter {
            (clearedAt == 0L || it.createdAt > clearedAt) &&
                (!onlyChat || it.uid.isNotEmpty() || it.img.isNotBlank())
        }
        val total = visible.size + (if (r.announcement.isNotBlank() && !onlyChat) 1 else 0)
        val lastMsgId = visible.lastOrNull()?.id
        LaunchedEffect(onlyChat) {
            if (total > 0) listState.scrollToItem(total - 1)
        }
        LaunchedEffect(lastMsgId, sendTick) {
            if (total > 0) {
                val info = listState.layoutInfo
                val lastVisible = info.visibleItemsInfo.lastOrNull()?.index ?: 0
                val nearBottom = lastVisible >= info.totalItemsCount - 3
                val mine = visible.lastOrNull()?.uid == myUid
                if (mine || nearBottom) listState.animateScrollToItem(total - 1)
            }
        }

        Column(Modifier.fillMaxSize().statusBarsPadding().navigationBarsPadding().imePadding()) {
            // Header
            Row(
                Modifier.fillMaxWidth().padding(horizontal = 12.dp, vertical = 8.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Row(
                    Modifier.weight(1f).clip(RoundedCornerShape(50)).background(Color(0x66000000)).padding(5.dp),
                    verticalAlignment = Alignment.CenterVertically,
                ) {
                    RmAvatar(roomBmp, r.name, 38.dp)
                    Spacer(Modifier.width(8.dp))
                    Column(Modifier.weight(1f)) {
                        // Nama room tampil utuh: satu baris, kapsul melebar penuh.
                        Text(
                            r.name, color = Color.White, fontWeight = FontWeight.Bold, fontSize = 15.sp,
                            maxLines = 1, overflow = TextOverflow.Visible, softWrap = false,
                        )
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(
                                tr("ID:") + (ownerUserId ?: "..."),
                                color = Color(0xFFBDBDBD), fontSize = 11.sp,
                                maxLines = 1, overflow = TextOverflow.Visible, softWrap = false,
                            )
                            Spacer(Modifier.width(5.dp))
                            // Logo dan level room di sebelah ID room.
                            RoomLevelIcon(RoomPoin.level(poinKamar), 14.dp)
                            Spacer(Modifier.width(3.dp))
                            Text(
                                "Lv." + RoomPoin.level(poinKamar),
                                color = GoldLight, fontSize = 11.sp,
                                maxLines = 1, softWrap = false,
                            )
                        }
                    }
                    Spacer(Modifier.width(10.dp))
                }
                Spacer(Modifier.width(6.dp))
                // Follow room: simpan di RTDB.
                Box(
                    Modifier
                        .size(32.dp)
                        .clip(CircleShape)
                        .background(Color(0x66000000))
                        .clickable {
                            val nf = !followed
                            followed = nf
                            scope.launch {
                                try {
                                    if (nf) {
                                        Rtdb.ref("followRooms/" + myUid + "/" + roomId).setValue(true)
                                        // Indeks terbalik supaya daftar anggota room bisa dibaca pemilik room.
                                        Rtdb.ref("roomFollowers/" + roomId + "/" + myUid).setValue(true)
                                    } else {
                                        Rtdb.ref("followRooms/" + myUid + "/" + roomId).removeValue()
                                        Rtdb.ref("roomFollowers/" + roomId + "/" + myUid).removeValue()
                                    }
                                } catch (e: kotlinx.coroutines.CancellationException) {
                                    throw e
                                } catch (e: Exception) { }
                            }
                            toast(if (nf) "Room diikuti" else "Batal mengikuti room")
                        },
                    contentAlignment = Alignment.Center,
                ) {
                    Text(
                        if (followed) "✓" else "+",
                        color = if (followed) Teal else Gold,
                        fontSize = 18.sp,
                        fontWeight = FontWeight.Bold,
                    )
                }
                Spacer(Modifier.width(6.dp))
                Text(
                    tr("👤 ${r.online}"),
                    color = Color.White,
                    fontSize = 13.sp,
                    modifier = Modifier.clip(RoundedCornerShape(50)).background(Color(0x66000000)).padding(horizontal = 12.dp, vertical = 6.dp),
                )
                Spacer(Modifier.width(8.dp))
                // Bagikan room: link membuka app langsung ke room ini.
                Box(
                    Modifier
                        .size(40.dp)
                        .clip(CircleShape)
                        .background(Color(0x66000000))
                        .clickable {
                            // Bagikan room lewat LINK room (rezo://room/<id>): penerima
                            // tinggal buka linknya, app otomatis masuk room ini.
                            // Fitur kode room sudah dihapus.
                            // Link https (bisa diklik di WhatsApp) yang meneruskan ke rezo://room/<id>
                            val shareText =
                                "Ayo ngobrol bareng di room " + r.name + " di Rezo Star! \uD83D\uDD25\n" +
                                "Masuk room ini lewat link: https://GANTI-HALAMAN-ANDA/room.html?id=" + r.id
                            val send = Intent(Intent.ACTION_SEND).apply {
                                type = "text/plain"
                                putExtra(Intent.EXTRA_TEXT, shareText)
                            }
                            context.startActivity(Intent.createChooser(send, "Bagikan room"))
                        },
                    contentAlignment = Alignment.Center,
                ) { Text("🔗", fontSize = 16.sp) }
                Spacer(Modifier.width(8.dp))
                Box(
                    Modifier.size(40.dp).clip(CircleShape).background(Color(0x66000000)).clickable { panel = P_POWER },
                    contentAlignment = Alignment.Center,
                ) { PowerIcon(Modifier.size(20.dp)) }
            }

            // Peringkat room: baris kecil di bawah nama room.
            Row(
                Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 12.dp)
                    .clip(RoundedCornerShape(50))
                    .background(Color(0x66000000))
                    .clickable { showRank = true }
                    .padding(horizontal = 12.dp, vertical = 6.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Image(
                    painterResource(R.drawable.ic_glory_medal), null,
                    Modifier.size(16.dp), contentScale = ContentScale.Fit,
                )
                Spacer(Modifier.width(8.dp))
                Text(tr("Peringkat room"), color = GoldLight, fontSize = 12.sp, fontWeight = FontWeight.Bold)
                Spacer(Modifier.weight(1f))
                Text(tr("🏆 Top room ›"), color = Color(0xFFBDBDBD), fontSize = 11.sp)
            }
            Spacer(Modifier.height(6.dp))

            // Kursi mic
            Column(Modifier.fillMaxWidth().padding(horizontal = 6.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                for (row in 0 until rows) {
                    Row(Modifier.fillMaxWidth()) {
                        for (col in 0 until cols) {
                            val i = row * cols + col
                            Box(
                                Modifier.weight(1f).onGloballyPositioned {
                                    // Titik tengah avatar kursi: tujuan gift terbang.
                                    val p = it.positionInRoot()
                                    seatPoints[i] = Offset(p.x + it.size.width / 2f, p.y + it.size.height / 2f)
                                },
                                contentAlignment = Alignment.Center,
                            ) {
                                if (i < r.micCount) {
                                    ProvidePeranRoom(DataPeranRoom(r.ownerUid, r.admins)) {
                                        // Poin dibaca di dalam sel kursi, bukan di sini, supaya
                                        // perubahan poin tidak membuat seluruh layar room dihitung ulang.
                                        RmSeatCell(
                                            i,
                                            seats[i],
                                            seatSize,
                                            locked = r.lockedSeats.contains(i),
                                            emote = seats[i]?.uid?.let { emotes[it] },
                                            emotSudahTampil = emotSudahTampil,
                                            poin = { if (cfgPoin) (micPoints[i] ?: 0L) else 0L },
                                        ) { seatSheet = i }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // Pengumuman dan notifikasi masuk
            // Banner kemenangan game digambar di lapisan paling atas layar utama
            // (GameWinBannerHost di MainScreen), jadi tidak dipasang lagi di sini.

            // Tab "Semua | Obrolan": bisa diklik atau digeser kiri/kanan di daftar chat.
            Row(
                Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 2.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                for ((label, isChatTab) in listOf("Semua" to false, "Obrolan" to true)) {
                    val sel = onlyChat == isChatTab
                    Column(
                        Modifier
                            .clickable(
                                interactionSource = remember { MutableInteractionSource() },
                                indication = null,
                            ) { onlyChat = isChatTab }
                            .padding(end = 22.dp, top = 4.dp, bottom = 2.dp),
                        horizontalAlignment = Alignment.CenterHorizontally,
                    ) {
                        Text(
                            tr(label),
                            color = if (sel) Color.White else Color(0xFF9A9A9A),
                            fontSize = 16.sp,
                            fontWeight = if (sel) FontWeight.Bold else FontWeight.Normal,
                        )
                        Spacer(Modifier.height(3.dp))
                        Box(
                            Modifier.width(22.dp).height(2.dp)
                                .background(if (sel) Color.White else Color.Transparent),
                        )
                    }
                }
            }

            Box(Modifier.weight(1f).fillMaxWidth()) {
            LazyColumn(
                Modifier
                    .fillMaxSize()
                    .pointerInput(onlyChat) {
                        var dx = 0f
                        detectHorizontalDragGestures(
                            onDragStart = { dx = 0f },
                            onDragEnd = {
                                // Geser ke kiri -> Obrolan, geser ke kanan -> Semua.
                                if (dx < -80f) onlyChat = true
                                else if (dx > 80f) onlyChat = false
                            },
                            onDragCancel = { dx = 0f },
                            onHorizontalDrag = { _, amount -> dx += amount },
                        )
                    },
                state = listState,
                contentPadding = PaddingValues(horizontal = 12.dp, vertical = 8.dp),
                verticalArrangement = Arrangement.spacedBy(6.dp),
            ) {
                if (r.announcement.isNotBlank() && !onlyChat) {
                    item { RmMsgBox("Pengumuman kamar: ${r.announcement}", Gold) }
                }
                items(visible, key = { it.id }) { m ->
                    if (m.img.isNotBlank()) {
                        ProvidePeranRoom(DataPeranRoom(r.ownerUid, r.admins)) {
                            RmPhotoRow(m, myUid, onProfile = { uid -> profileUid = uid }, onOpen = { lihatGambar = it })
                        }
                    } else if (m.uid.isNotEmpty()) {
                        ProvidePeranRoom(DataPeranRoom(r.ownerUid, r.admins)) {
                            RmChatRow(m, myUid) { uid -> profileUid = uid }
                        }
                    } else {
                        RmMsgBox(m.text, if (m.text.startsWith("🎁")) Gold else if (m.text.startsWith("🚫")) Color(0xFFFF8A65) else Color.White)
                    }
                }
            }

                // Panel melayang sisi kanan: ikon roket + persen menuju level berikutnya.
                // Ikon digeser masuk dari tepi kanan (aman untuk layar berlekuk /
                // gesture tepi) dan digambar paling atas supaya tidak tertutup
                // daftar chat atau terpotong di HP user lain.
                // Ikon roket di sisi room = jalan masuk ke panel Rocket, bukan hiasan.
                // Dulu ikut saklar "efek roket" milik tiap user: siapa pun yang pernah
                // mematikan efek di menu Efek kehilangan ikon ini selamanya (pilihannya
                // tersimpan di HP dan di server), sehingga terlihat "tidak muncul di
                // user lain". Sekarang ikonnya selalu tampil selama panel mengizinkan;
                // yang mengikuti saklar user hanya animasi meluncurnya.
                Column(
                    modifier = Modifier
                        .align(Alignment.CenterEnd)
                        .zIndex(10f)
                        .windowInsetsPadding(WindowInsets.displayCutout.only(WindowInsetsSides.End))
                        .padding(end = 14.dp, bottom = 10.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                ) {
                    if (ROCKET_ROOM_UI) RocketRail(
                        roomId = r.id,
                        onOpen = { rocketOpen = true },
                        modifier = Modifier,
                    )
                    Spacer(Modifier.height(8.dp))
                    // Ikon reward room (Koin banyak) tepat di bawah tombol roket.
                    RewardRoomRoomIcon(onClick = { RewardRoomOpen.buka() })
                }
            }

            // Bar bawah
            if (emoteOpen) {
                RoomEmoteBar(emotes = customEmotes, onPick = { e ->
                        emoteOpen = false
                        if (mySeat == null) {
                            toast(tr("Naik mic dulu untuk kirim emot"))
                        } else {
                            scope.launch { RoomExtras.sendEmote(r.id, myUid, e)?.let { toast(it) } }
                        }
                },
                    onTambah = if (bolehTambahEmot) ({ tambahEmotOpen = true }) else null,
                )
            }
            if (tambahEmotOpen) {
                DialogTambahEmot(
                    onTutup = { tambahEmotOpen = false },
                    onSelesai = {
                        scope.launch {
                            customEmotes = RoomEmotes.load(force = true)
                            toast(tr("Emot baru sudah ditambahkan"))
                        }
                    },
                )
            }
            if (typing) {
                RoomTypingBar(
                    text = draft,
                    myFam = myFam,
                    onTextChange = { draft = it },
                    onSend = { t ->
                        if (larangan[myUid]?.ketik == true || (cfgBicaraAdmin && !canManage)) {
                            toast(
                                if (larangan[myUid]?.ketik == true) tr("Kamu dilarang mengetik di room ini")
                                else tr("Hanya owner dan admin room yang bisa mengetik"),
                            )
                        } else {
                            sendTick++
                            scope.launch { RoomExtras.sendChat(r.id, myUid, myName, t)?.let { toast(it) } }
                        }
                    },
                    onClose = { typing = false },
                    onPickImage = { if (!imgBusy) imgPicker.launch("image/*") },
                    imgBusy = imgBusy,
                )
            } else {
                Row(
                    Modifier.fillMaxWidth().padding(horizontal = 12.dp, vertical = 8.dp),
                    verticalAlignment = Alignment.CenterVertically,
                ) {
                    RmIkonBtn(R.drawable.rm_chat_umum) {
                        if (larangan[myUid]?.ketik == true) toast(tr("Kamu dilarang mengetik di room ini"))
                        else if (cfgBicaraAdmin && !canManage) toast(tr("Hanya owner dan admin room yang bisa mengetik"))
                        else { typing = true; emoteOpen = false }
                    }
                    Spacer(Modifier.width(10.dp))
                    RmIkonBtn(R.drawable.rm_emoji) { emoteOpen = !emoteOpen }

                    Spacer(Modifier.weight(1f))
                    RmRoundBtn({ giftTarget = null; giftOpen = true; emoteOpen = false }) {
                        Image(painterResource(R.drawable.ic_room_gift), null, Modifier.size(24.dp), contentScale = ContentScale.Fit)
                    }
                    Spacer(Modifier.weight(1f))
                    if (mySeat != null) {
                        RmIkonBtn(if (mySeat.muted) R.drawable.rm_mic_mati else R.drawable.rm_mic_hidup) {
                            scope.launch { RoomRepo.setSeatMuted(r.id, mySeat.index, !mySeat.muted) }
                        }
                        Spacer(Modifier.width(10.dp))
                    }
                    RmIkonBtn(R.drawable.rm_lainnya) { panel = P_TOOLS }
                }
            }
        }

        // Lihat gambar ukuran penuh
        // Foto di chat room: layar penuh, cubit dua jari untuk zoom.
        lihatGambar?.let { url ->
            FotoLayarPenuh(url) { lihatGambar = null }
        }

        // Game milik sendiri (digambar di dalam app, aman untuk Android 8+)
        if (waveOpen) {
            GamesHub(myUid = myUid, roomId = roomId, myName = myName, myAvatarB64 = myAvatarB64 ?: "", onClose = { waveOpen = false })
        }

        // Dialog seat mic
        seatSheet?.let { idx ->
            val s = seats[idx]
            if (s != null) {
                // Mic terisi: langsung tampilkan sheet profil (tap -> profil lengkap)
                UserProfileSheet(
                    uid = s.uid,
                    myUid = myUid,
                    onDismiss = { seatSheet = null },
                    onChat = { u -> seatSheet = null; appActions.openChat(u) },
                    onFollowChanged = { },
                    onOpenFull = { seatSheet = null; appActions.openFullProfile(s.uid) },
                    onTag = { u ->
                        // Tag user: langsung ke tab ketik dengan @nama di depan.
                        seatSheet = null
                        val sebut = "@" + u.name.replace(" ", "") + " "
                        if (!draft.contains(sebut)) draft = sebut + draft
                        typing = true
                        emoteOpen = false
                    },
                    onReport = { u -> seatSheet = null; laporPick = u },
                    bottomActions = if (canManage && s.uid != myUid) {
                        {
                            val dilarang = larangan[s.uid]?.mic == true
                            val adminSudah = r.isAdminRoom(s.uid)
                            AksiAdminSheet(tr("Turun Mic"), "\u2B07") {
                                seatSheet = null
                                scope.launch {
                                    val err = RoomRepo.removeFromSeat(r.id, idx)
                                    if (err != null) toast(err) else toast(tr("${s.name} diturunkan dari mic"))
                                }
                            }
                            AksiAdminSheet(
                                if (dilarang) tr("Buka Larangan") else tr("Larang Mic"),
                                "\uD83D\uDEAB",
                            ) {
                                seatSheet = null
                                scope.launch {
                                    val err = RoomModerasi.larang(r.id, s.uid, !dilarang)
                                    if (err != null) toast(err)
                                    else toast(if (dilarang) tr("Larangan ${s.name} dibuka") else tr("${s.name} dilarang mic dan chat"))
                                }
                            }
                            if (isOwner || isDevAdmin) {
                                AksiAdminSheet(
                                    if (adminSudah) tr("Cabut Admin") else tr("Admin"),
                                    "\uD83D\uDEE1",
                                ) {
                                    seatSheet = null
                                    adminPick = s.uid to s.name
                                }
                            }
                            AksiAdminSheet(tr("Diusir"), "\u2716", Color(0xFFFF6B6B)) {
                                seatSheet = null
                                kickPick = s.uid to s.name
                            }
                        }
                    } else {
                        null
                    },
                    extra = {
                        if (s.uid == myUid) {
                            ProfileSheetAction(tr("Turun Mic"), "down") {
                                seatSheet = null
                                scope.launch { RoomRepo.leaveSeat(r.id, idx) }
                            }
                            ProfileSheetAction(if (s.muted) "Buka mic" else "Matikan mic", if (s.muted) "mic" else "mute") {
                                scope.launch { RoomRepo.setSeatMuted(r.id, idx, !s.muted) }
                            }
                        }
                        ProfileSheetAction(tr("Hadiah"), "gift") {
                            seatSheet = null
                            giftTarget = s.uid
                            giftOpen = true
                        }
                    },
                )
            } else {
                RmPanel(onDismiss = { seatSheet = null }) {
                    Text(tr("Seat mic"), color = GoldLight, fontSize = 20.sp, fontWeight = FontWeight.Bold)
                    Spacer(Modifier.height(14.dp))
                    val seatLocked = r.lockedSeats.contains(idx)
                    Text(if (idx == 0) "Kursi MC masih kosong" else "Kursi No.${idx + 1} masih kosong", color = Color(0xFFBDBDBD))
                    if (seatLocked) {
                        Spacer(Modifier.height(8.dp))
                        Text(tr("🔒 Mic ini dikunci"), color = Gold)
                    }
                    Spacer(Modifier.height(16.dp))
                    if (seatLocked) {
                        if (canManage) {
                            GoldButton(tr("Buka kunci mic")) {
                                seatSheet = null
                                scope.launch { RoomExtras.unlockSeat(r.id, idx)?.let { toast(it) } }
                            }
                        }
                    } else {
                        val minta = micReq[idx] ?: emptyMap()
                        if (canManage && minta.isNotEmpty()) {
                            Text(tr("Permintaan naik mic"), color = GoldLight, fontSize = 13.sp)
                            Spacer(Modifier.height(6.dp))
                            for ((uidMinta, namaMinta) in minta) {
                                Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                                    Text(namaMinta, color = Color.White, fontSize = 14.sp, modifier = Modifier.weight(1f))
                                    OutlineButton(tr("Setujui")) {
                                        seatSheet = null
                                        scope.launch {
                                            val err = RoomRepo.inviteSeat(r.id, idx, uidMinta, namaMinta, null)
                                            try { Rtdb.ref("micRequests/" + r.id + "/" + idx + "/" + uidMinta).removeValue() } catch (e: kotlinx.coroutines.CancellationException) { throw e } catch (e: Exception) { }
                                            toast(err ?: "Disetujui, user langsung naik kursi")
                                        }
                                    }
                                    Spacer(Modifier.width(8.dp))
                                    OutlineButton(tr("Tolak")) {
                                        seatSheet = null
                                        scope.launch {
                                            try { Rtdb.ref("micRequests/" + r.id + "/" + idx + "/" + uidMinta).removeValue() } catch (e: kotlinx.coroutines.CancellationException) { throw e } catch (e: Exception) { }
                                            toast(tr("Permintaan ditolak"))
                                        }
                                    }
                                }
                                Spacer(Modifier.height(8.dp))
                            }
                            Spacer(Modifier.height(6.dp))
                        }
                        if (!cfgMicBebas && !canManage) {
                            Text(
                                tr("Mic bebas dimatikan. Minta izin dulu ke owner atau admin room."),
                                color = Color(0xFFBDBDBD), fontSize = 12.sp,
                            )
                            Spacer(Modifier.height(10.dp))
                            val sudahMinta = minta.containsKey(myUid)
                            GoldButton(if (sudahMinta) tr("Menunggu persetujuan") else tr("Minta mic"), enabled = !sudahMinta) {
                                seatSheet = null
                                scope.launch {
                                    val err = try {
                                        Rtdb.ref("micRequests/" + r.id + "/" + idx + "/" + myUid)
                                            .setValue(hashMapOf<String, Any?>("name" to myName, "at" to System.currentTimeMillis()))
                                            .await()
                                        null
                                    } catch (e: kotlinx.coroutines.CancellationException) {
                                        throw e
                                    } catch (e: Exception) {
                                        e.message ?: "Gagal mengirim permintaan"
                                    }
                                    toast(err ?: "Permintaan terkirim, tunggu persetujuan owner/admin")
                                }
                            }
                        } else {
                            GoldButton(if (mySeat == null) "Naik kursi mic" else "Pindah ke kursi ini") {
                                seatSheet = null
                                scope.launch { RoomRepo.takeSeat(r.id, idx, myUid, myName, myAvatarB64)?.let { toast(it) } }
                            }
                        }
                        if (canManage) {
                            Spacer(Modifier.height(10.dp))
                            OutlineButton(tr("Undang ke mic")) {
                                seatSheet = null
                                seatInvite = idx
                            }
                            Spacer(Modifier.height(10.dp))
                            OutlineButton(tr("Kunci mic")) {
                                seatSheet = null
                                scope.launch { RoomExtras.lockSeat(r.id, idx)?.let { toast(it) } }
                            }
                        }
                    }
                }
            }
        }

        seatInvite?.let { idx ->
            SeatInviteDialog(
                members = members,
                seatedUids = seats.values.map { it.uid }.toSet(),
                index = idx,
                myUid = myUid,
                onDismiss = { seatInvite = null },
                onInvite = { u ->
                    seatInvite = null
                    scope.launch {
                        toast(RoomRepo.inviteSeat(r.id, idx, u.uid, u.name, u.avatarB64) ?: "${u.name} naik ke mic")
                    }
                },
            )
        }

        if (panel == P_MUSIC) {
            MusicSheet(
                roomId = r.id,
                myUid = myUid,
                myName = myName,
                canPlay = mySeat != null,
                onUnmute = { mySeat?.let { s2 -> scope.launch { RoomRepo.setSeatMuted(r.id, s2.index, false) } } },
                onDismiss = { panel = P_NONE },
            )
        }

        profileUid?.let { pu ->
            UserProfileSheet(
                uid = pu,
                myUid = myUid,
                onDismiss = { profileUid = null },
                onChat = { u -> profileUid = null; appActions.openChat(u) },
                onFollowChanged = { },
                onOpenFull = { profileUid = null; appActions.openFullProfile(pu) },
            )
        }

        if (giftOpen) {
            GiftPanel(
                roomId = r.id,
                myUid = myUid,
                myName = myName,
                onDismiss = { giftOpen = false },
                seats = seats.values.sortedBy { it.index },
                initialTarget = giftTarget,
                myAvatarB64 = myAvatarB64,
            )
        }
        // Tombol kombo bulat "Beri terus" sudah dihapus sesuai permintaan pemilik.
        if (rocketOpen) RocketScreen(
            roomId = r.id,
            onDismiss = { rocketOpen = false },
            fxAktif = fxRocketOn,
            onNyalakanFx = {
                fxRocketOn = true
                try { fxLocal.edit().putBoolean("rocket", true).apply() } catch (e: Exception) { }
                try { if (fxUid.isNotBlank()) Rtdb.ref("fxPrefs/$fxUid/rocket").setValue(true) } catch (e: Exception) { }
            },
        )
        // Bar PK tampil di atas kursi selama pertandingan berjalan.
        pk?.takeIf { it.aktif && !it.selesai }?.let { p ->
            if (!waveOpen) {
                PkBar(
                    p,
                    Modifier.align(Alignment.TopCenter).padding(top = 96.dp),
                )
            }
        }
        if (pkAnim) {
            Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                GiftVideo(
                    url = "asset/mp4/pk_start.mp4",
                    modifier = Modifier.fillMaxWidth(0.8f).height(160.dp),
                    onEnd = { pkAnim = false },
                )
            }
        }
        if (pkBuat) {
            PkBuatDialog(
                aNama = myName.ifBlank { "Host" },
                calon = seats.values.sortedBy { it.index }
                    .filter { it.uid.isNotBlank() && it.uid != myUid }
                    .map { it.uid to it.name },
                onMulai = { mode, durasi, bUid, bNama ->
                    pkBuat = false
                    RoomPk.mulai(
                        roomId = r.id,
                        mode = mode,
                        durasiDetik = durasi,
                        aUid = myUid,
                        aNama = myName.ifBlank { "Host" },
                        bUid = bUid,
                        bNama = bNama,
                    )
                },
                onDismiss = { pkBuat = false },
            )
        }
        pk?.takeIf { it.selesai }?.let { p ->
            if (pkHasil) {
                PkHasilDialog(
                    pk = p,
                    namaUser = { uid ->
                        seats.values.firstOrNull { it.uid == uid }?.name ?: uid.takeLast(6)
                    },
                    onDismiss = { pkHasil = false },
                )
            }
        }
        if (fxBannerOn && !waveOpen && !LocalRoomMinimized.current) GiftBanner(r.id)
        // Banner cashback terpisah: hanya saat JP 10.000 ke atas.
        if (fxBannerOn && !waveOpen && !LocalRoomMinimized.current) CashbackBanner(r.id)
        // Penanda status suara: kalau suara gagal, alasannya tampil di sini
        // (bukan hanya toast yang cepat hilang), jadi mudah dilaporkan.
        run {
            val st = AgoraVoice.lastStatus
            if (st.isNotBlank() && !st.startsWith("OK")) {
                Box(
                    Modifier.align(Alignment.TopStart).padding(top = 64.dp, start = 8.dp)
                        .clip(RoundedCornerShape(8.dp))
                        .background(Color(0xCC000000)).padding(horizontal = 6.dp, vertical = 3.dp),
                ) {
                    Text(st, color = Color(0xFFFFD24D), fontSize = 9.sp, maxLines = 2)
                }
            }
        }
        // Loading khas Viza saat room sedang dimuat.
        if (!siapRoom) VizaLoadingLayar()
        // Saat halaman game terbuka, efek room tidak boleh menutupi game.
        val roomTersembunyi = LocalRoomMinimized.current
        if (fxEntryOn && !waveOpen && !roomTersembunyi) VipEntryEffect(r.id)
        if (fxGiftOn && !waveOpen) GiftFxOverlay(r.id)
        // Gift terbang ke avatar penerima lalu pecahan cashback muncul di titik itu.
        if (fxGiftOn && !waveOpen) GiftFlyOverlay(r.id, seatPoints)
        // Peluncuran roket 1..5 berurutan, dengan dialog hadiah bertombol Okey.
        // Build uji: dimatikan sementara untuk mencari penyebab aplikasi macet di room.
        if (ROCKET_ROOM_UI && fxRocketOn && !waveOpen) RocketLaunchOverlay(r.id, myUid)

        // Tombol power: keluar / minimalkan
        if (showRank) {
            TopRankDialog(onDismiss = { showRank = false }, initialTab = 0, onOpenRoom = {})
        }

        // Jalankan kick sesuai durasi yang dipilih owner.
        val doKick: (String, String, Long) -> Unit = { targetUid, targetName, durasiMs ->
            scope.launch {
                val err = RoomRepo.kickFromRoom(r.id, targetUid, targetName, durasiMs)
                if (err != null) {
                    toast(err)
                } else {
                    toast(tr("$targetName dikeluarkan dari room"))
                    val lama = when {
                        durasiMs <= 0L -> "permanen"
                        durasiMs < 3_600_000L -> "${durasiMs / 60_000L} menit"
                        durasiMs < 86_400_000L -> "${durasiMs / 3_600_000L} jam"
                        else -> "${durasiMs / 86_400_000L} hari"
                    }
                    RoomExtras.sendSystemNotice(r.id, "🚫 Sistem: $targetName telah di-kick dari room ($lama)")
                }
            }
        }

        // Konfirmasi jadikan / cabut admin room.
        adminPick?.let { pick ->
            val jadi = !r.isAdminRoom(pick.first)
            Dialog(onDismissRequest = { adminPick = null }) {
                DialogCard {
                    Text(
                        if (jadi) tr("Jadikan admin room?") else tr("Cabut admin room?"),
                        color = GoldLight, fontSize = 20.sp, fontWeight = FontWeight.Bold,
                    )
                    Spacer(Modifier.height(8.dp))
                    Text(
                        if (jadi) pick.second + " " + tr("akan bisa menurunkan mic, melarang mic dan chat, serta mengusir user di room ini.")
                        else pick.second + " " + tr("tidak lagi menjadi admin room."),
                        color = Color(0xFFBDBDBD), fontSize = 13.sp,
                    )
                    Spacer(Modifier.height(14.dp))
                    GoldButton(tr("Konfirmasi")) {
                        val target = pick.first
                        val nama = pick.second
                        adminPick = null
                        scope.launch {
                            val err = RoomRepo.setRoomAdmin(r.id, target, jadi)
                            if (err != null) toast(err)
                            else toast(if (jadi) tr("$nama jadi admin room") else tr("Admin $nama dicabut"))
                        }
                    }
                    Spacer(Modifier.height(8.dp))
                    Text(
                        tr("Batal"), color = Color(0xFFBDBDBD), fontSize = 13.sp,
                        modifier = Modifier.clickable { adminPick = null }.padding(8.dp),
                    )
                }
            }
        }

        // Laporkan user: masuk ke tab Laporan user di panel.
        laporPick?.let { tgt ->
            var alasan by remember(tgt.uid) { mutableStateOf("") }
            var kirim by remember(tgt.uid) { mutableStateOf(false) }
            Dialog(onDismissRequest = { laporPick = null }) {
                DialogCard {
                    Text(tr("Laporkan") + " " + tgt.name, color = Color(0xFFFFB74D), fontSize = 20.sp, fontWeight = FontWeight.Bold)
                    Spacer(Modifier.height(6.dp))
                    Text(tr("ID: ") + tgt.userId, color = Color(0xFFBDBDBD), fontSize = 12.sp)
                    Spacer(Modifier.height(10.dp))
                    listOf("Spam", "Kata kasar", "Penipuan", "Konten tidak pantas").forEach { opsi ->
                        val on = alasan == opsi
                        Text(
                            tr(opsi),
                            color = if (on) Color.Black else Color.White,
                            fontSize = 13.sp,
                            modifier = Modifier.fillMaxWidth().padding(vertical = 2.dp)
                                .clip(RoundedCornerShape(10.dp))
                                .background(if (on) Gold else Color(0x33FFFFFF))
                                .clickable { alasan = opsi }
                                .padding(horizontal = 12.dp, vertical = 9.dp),
                        )
                    }
                    Spacer(Modifier.height(12.dp))
                    GoldButton(tr("Kirim laporan"), enabled = alasan.isNotBlank() && !kirim) {
                        kirim = true
                        scope.launch {
                            val err = RoomModerasi.laporkan(
                                myUid, myName, tgt.uid, tgt.name, tgt.userId, r.id, alasan,
                            )
                            kirim = false
                            if (err != null) toast(err) else {
                                toast(tr("Laporan terkirim"))
                                laporPick = null
                            }
                        }
                    }
                    Spacer(Modifier.height(8.dp))
                    Text(
                        tr("Batal"), color = Color(0xFFBDBDBD), fontSize = 13.sp,
                        modifier = Modifier.clickable { laporPick = null }.padding(8.dp),
                    )
                }
            }
        }

        // Pilih lama kick: 30 menit, 1 hari, atau permanen.
        kickPick?.let { pick ->
            val targetUid = pick.first
            val targetName = pick.second
            Dialog(onDismissRequest = { kickPick = null }) {
                DialogCard {
                    Text(tr("Kick") + " " + targetName, color = Color(0xFFFF8A65), fontSize = 20.sp, fontWeight = FontWeight.Bold)
                    Spacer(Modifier.height(6.dp))
                    Text(
                        tr("User otomatis masuk daftar hitam. Kick sementara berakhir sendiri, kick permanen dibuka manual dari halaman Daftar hitam."),
                        color = Color(0xFFBDBDBD), fontSize = 12.sp,
                    )
                    Spacer(Modifier.height(14.dp))
                    GoldButton(tr("Kick 30 menit")) {
                        kickPick = null
                        doKick(targetUid, targetName, 30L * 60_000L)
                    }
                    Spacer(Modifier.height(8.dp))
                    OutlineButton(tr("Kick 1 hari")) {
                        kickPick = null
                        doKick(targetUid, targetName, 24L * 60L * 60_000L)
                    }
                    Spacer(Modifier.height(8.dp))
                    OutlineButton(tr("Kick permanen")) {
                        kickPick = null
                        doKick(targetUid, targetName, 0L)
                    }
                    Spacer(Modifier.height(8.dp))
                    Text(
                        tr("Batal"), color = Color(0xFFBDBDBD), fontSize = 13.sp,
                        modifier = Modifier.clickable { kickPick = null }.padding(8.dp),
                    )
                }
            }
        }

        // Pemberitahuan untuk user yang dikeluarkan dari room.
        if (kickedOut) {
            Dialog(onDismissRequest = { kickedOut = false; onExit() }) {
                DialogCard {
                    Text(
                        tr("Anda telah di kick dari room ⚠️"),
                        color = Color(0xFFFF7043), fontSize = 19.sp, fontWeight = FontWeight.Bold,
                    )
                    Spacer(Modifier.height(10.dp))
                    Text(
                        tr("Owner membuka kick lewat Daftar hitam kalau Anda boleh masuk lagi."),
                        color = Color(0xFFBDBDBD), fontSize = 12.sp,
                    )
                    Spacer(Modifier.height(14.dp))
                    GoldButton(tr("Oke")) {
                        kickedOut = false
                        onExit()
                    }
                }
            }
        }

        if (panel == P_POWER) {
            Dialog(onDismissRequest = { panel = P_NONE }) {
                DialogCard {
                    Text(tr("Keluar dari room?"), color = GoldLight, fontSize = 20.sp, fontWeight = FontWeight.Bold)
                    Spacer(Modifier.height(18.dp))
                    GoldButton(tr("Keluar")) {
                        // Keluar room berarti riwayat chat dan draf memang harus
                        // dibuang. Hanya minimize yang menyimpannya.
                        RoomChatCache.hapus(roomId)
                        EfekMasukTercatat.reset(roomId)
                        resetDrafts()
                        onExit()
                    }
                    Spacer(Modifier.height(10.dp))
                    OutlineButton(tr("Minimalkan")) { panel = P_NONE; onMinimize() }
                }
            }
        }

        // Kotak 4: alat dasar
        if (panel == P_TOOLS) {
            RmPanel(onDismiss = { panel = P_NONE }) {
                Text(tr("Alat dasar"), color = Color.White, fontSize = 22.sp)
                Spacer(Modifier.height(16.dp))
                androidx.compose.foundation.layout.FlowRow(
                    Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(12.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp),
                ) {
                    RmTool(
                        if (roomMuted) "Aktifkan suara" else "Matikan suara",
                        onClick = {
                            roomMuted = !roomMuted
                            AgoraVoice.muteRoom(roomMuted)
                            toast(if (roomMuted) "Suara room dimatikan" else "Suara room aktif")
                            panel = P_NONE
                        },
                    ) {
                        Image(
                            painterResource(if (roomMuted) R.drawable.rm_suara_mati else R.drawable.rm_suara_hidup),
                            null, Modifier.size(30.dp), contentScale = ContentScale.Fit,
                        )
                    }
                    RmTool("Musik", onClick = { panel = P_MUSIC }) { Text("\uD83C\uDFB5", fontSize = 24.sp) }
                    if (canManage) {
                        RmTool("Mode kamar", onClick = { panel = P_MODE }) { GridIcon(Modifier.size(26.dp)) }
                    }
                    RmTool(tr("Blok Efek"), onClick = { panel = P_EFEK }) { BlokEfekIcon() }
                    if (canManage) {
                        RmTool("Tema kamar", onClick = { panel = P_SETTINGS; subAwalSettings = 2 }) {
                            Text("\uD83D\uDDBC", fontSize = 22.sp)
                        }
                    }
                    if (canManage) {
                        RmTool(if (cfgMicBebas) "Mic bebas" else "Minta mic", onClick = {
                            panel = P_NONE
                            scope.launch {
                                val baru = !cfgMicBebas
                                val err = RoomRepo.setCfgRoom(r.id, "micBebas", baru)
                                toast(err ?: if (baru) "Mic bebas aktif: user bisa naik mic sendiri" else "Minta mic aktif: user menunggu persetujuan")
                            }
                        }) {
                            Text(if (cfgMicBebas) "\uD83C\uDF99" else "\u270B", fontSize = 22.sp)
                        }
                    }
                    if (canManage) {
                        RmTool("Kamar umum", onClick = { panel = P_LOCK }) { Text("\uD83C\uDF10", fontSize = 22.sp) }
                    }
                    if (canManage) {
                        RmTool("Kalkulator", onClick = { panel = P_KALK }) { Text("\uD83E\uDDEE", fontSize = 22.sp) }
                    }
                    if (canManage) {
                        RmTool("Atur bicara\ndi layar publik", onClick = { panel = P_BICARA }) { Text("\uD83D\uDCAC", fontSize = 22.sp) }
                    }
                    if (canManage) {
                        RmTool("Pengaturan", onClick = { panel = P_SETTINGS; subAwalSettings = 0 }) {
                            Image(painterResource(R.drawable.ic_settings), null, Modifier.size(24.dp), contentScale = ContentScale.Fit)
                        }
                    }
                    RmTool("Game", onClick = { panel = P_NONE; waveOpen = true }) {
                        Image(painterResource(R.drawable.ic_room_game), null, Modifier.size(26.dp), contentScale = ContentScale.Fit)
                    }
                    RmTool(
                        "Bersihkan chat",
                        onClick = {
                            clearedAt = messages.maxOfOrNull { it.createdAt } ?: System.currentTimeMillis()
                            panel = P_NONE
                            toast(tr("Chat dibersihkan di layar kamu"))
                        },
                    ) { Text("\uD83E\uDDF9", fontSize = 24.sp) }
                    if (canManage) {
                        RmTool("Hapus chat semua", onClick = { panel = P_CLEAR }) { Text("\uD83D\uDDD1", fontSize = 24.sp) }
                    }
                    if (canManage) {
                        RmTool("Daftar hitam", onClick = { panel = P_BLACKLIST }) { Text("\uD83D\uDEAB", fontSize = 24.sp) }
                    }
                    if (canManage) {
                        RmTool("Anggota", onClick = { panel = P_MEMBERS }) { Text("\uD83D\uDC65", fontSize = 22.sp) }
                    }
                    if (canManage) {
                        RmTool("Clear poin mic", onClick = {
                            panel = P_NONE
                            scope.launch {
                                micPoints = emptyMap()
                                val err = RoomRepo.bersihkanPoinMic(r.id)
                                micPoints = emptyMap()
                                toast(err ?: tr("Poin mic dihapus"))
                            }
                        }) { Text("\uD83D\uDC97", fontSize = 24.sp) }
                    }
                    RmTool("Lucky number", onClick = {
                        panel = P_NONE
                        if (larangan[myUid]?.ketik == true || (cfgBicaraAdmin && !canManage)) {
                            toast(tr("Kamu tidak bisa mengirim chat di room ini"))
                        } else {
                            val angka = (100..999).random()
                            scope.launch { RoomExtras.sendChat(r.id, myUid, myName, "\uD83C\uDFB0LUCKY:" + angka)?.let { toast(it) } }
                        }
                    }) { Text("777", color = Color(0xFFFFC107), fontSize = 17.sp, fontWeight = FontWeight.ExtraBold) }
                    if (canManage) {
                        RmTool(if (pk?.aktif == true && pk?.selesai != true) tr("Stop PK") else "Grup PK", onClick = {
                            if (pk?.aktif == true && pk?.selesai != true) {
                                RoomPk.hentikan(r.id)
                                toast(tr("PK dihentikan"))
                                panel = P_NONE
                            } else {
                                panel = P_NONE
                                pkBuat = true
                            }
                        }) {
                            androidx.compose.foundation.Image(
                                painter = androidx.compose.ui.res.painterResource(R.drawable.pk_tombol),
                                contentDescription = "PK",
                                modifier = Modifier.size(26.dp),
                                contentScale = ContentScale.Fit,
                            )
                        }
                    }
                    if (canManage) {
                        RmTool(if (r.locked) "Buka kunci room" else "Kunci room", onClick = { panel = P_LOCK }) {
                            if (r.locked) Text("\uD83D\uDD13", fontSize = 24.sp)
                            else Icon(Icons.Default.Lock, null, tint = GoldLight)
                        }
                    }
                }
            }
        }

        if (panel == P_MODE) RmPanel(onDismiss = { panel = P_NONE }) { RmMode(r) { panel = P_NONE } }

        // Kalkulator: reset poin mic, atau sembunyikan ikon poin di kursi.
        if (panel == P_KALK) {
            RmPanel(onDismiss = { panel = P_NONE }) {
                Text(tr("Kalkulator"), color = Color.White, fontSize = 22.sp)
                Spacer(Modifier.height(8.dp))
                Text(
                    tr("Poin mic tampil di bawah tiap kursi."),
                    color = Color(0xFF9A9A9A), fontSize = 12.sp,
                )
                Spacer(Modifier.height(16.dp))
                GoldButton(tr("Mengatur ulang kalkulator")) {
                    scope.launch {
                        // Kosongkan dulu di layar, lalu hapus di database.
                        micPoints = emptyMap()
                        val err = RoomRepo.bersihkanPoinMic(r.id)
                        micPoints = emptyMap()
                        toast(err ?: tr("Poin mic di layar publik sudah bersih"))
                    }
                }
                Spacer(Modifier.height(12.dp))
                OutlineButton(if (cfgPoin) tr("Matikan kalkulator") else tr("Aktifkan kalkulator")) {
                    scope.launch {
                        val baru = !cfgPoin
                        val err = RoomRepo.setCfgRoom(r.id, "hitungPoin", baru)
                        toast(err ?: if (baru) "Ikon poin mic aktif lagi" else "Ikon poin mic di kursi disembunyikan")
                    }
                }
                Spacer(Modifier.height(12.dp))
                OutlineButton(tr("Tutup")) { panel = P_NONE }
            }
        }

        // Atur bicara di layar publik: hanya owner/admin yang boleh mengetik,
        // dan bersihkan layar publik untuk semua orang.
        if (panel == P_BICARA) {
            RmPanel(onDismiss = { panel = P_NONE }) {
                Text(tr("Atur bicara di layar publik"), color = Color.White, fontSize = 20.sp)
                Spacer(Modifier.height(16.dp))
                Box(
                    Modifier.fillMaxWidth().clip(RoundedCornerShape(12.dp)).background(Color(0xFF151515))
                        .clickable {
                            scope.launch {
                                val baru = !cfgBicaraAdmin
                                val err = RoomRepo.setCfgRoom(r.id, "bicaraAdmin", baru)
                                toast(
                                    err ?: if (baru) "Hanya owner dan admin room yang bisa mengetik"
                                    else "Semua user bisa mengetik lagi",
                                )
                            }
                        }
                        .padding(horizontal = 14.dp, vertical = 14.dp),
                ) {
                    Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                        Text(
                            tr("Owner room dan admin yg bicara"),
                            color = Color(0xFFEDEDED), fontSize = 15.sp, modifier = Modifier.weight(1f),
                        )
                        Text(
                            if (cfgBicaraAdmin) "AKTIF" else "MATI",
                            color = if (cfgBicaraAdmin) Teal else Color(0xFF9A9A9A),
                            fontSize = 13.sp, fontWeight = FontWeight.Bold,
                        )
                    }
                }
                Spacer(Modifier.height(12.dp))
                GoldButton(tr("Bersihkan layar publik")) {
                    scope.launch {
                        val simpul = Rtdb.ref("messages/" + r.id)
                        val err = try {
                            simpul.removeValue().await()
                            try { Rtdb.ref("gifts/" + r.id).removeValue().await() } catch (e: kotlinx.coroutines.CancellationException) { throw e } catch (e: Exception) { }
                            null
                        } catch (e: kotlinx.coroutines.CancellationException) {
                            throw e
                        } catch (e: Exception) {
                            // Aturan database kadang menolak menghapus satu simpul,
                            // jadi isinya dihapus satu per satu.
                            try {
                                val anak = simpul.get().await()
                                val hapus = HashMap<String, Any?>()
                                for (c in anak.children) {
                                    val k = c.key ?: continue
                                    hapus[k] = null
                                }
                                if (hapus.isNotEmpty()) simpul.updateChildren(hapus).await()
                                null
                            } catch (e2: kotlinx.coroutines.CancellationException) {
                                throw e2
                            } catch (e2: Exception) {
                                e2.message ?: "Gagal membersihkan"
                            }
                        }
                        // Layar langsung bersih tanpa menunggu jaringan.
                        clearedAt = System.currentTimeMillis()
                        panel = P_NONE
                        toast(err ?: "Layar publik dibersihkan untuk semua orang")
                    }
                }
                Spacer(Modifier.height(12.dp))
                OutlineButton(tr("Tutup")) { panel = P_NONE }
            }
        }
        if (panel == P_SETTINGS) RmPanel(onDismiss = { panel = P_NONE }) { RmSettings(r, awalSub = subAwalSettings, onBlacklist = { panel = P_BLACKLIST }) { panel = P_NONE } }
        if (panel == P_LOCK) RmPanel(onDismiss = { panel = P_NONE }) { RmLock(r) { panel = P_NONE } }
        if (panel == P_EFEK) RmPanel(onDismiss = { panel = P_NONE }) {
            RmBlokEfek(
                masuk = fxEntryOn, gift = fxGiftOn, banner = fxBannerOn, roket = fxRocketOn, game = fxGameOn,
                onChange = { kunci, nilai ->
                    when (kunci) {
                        "entry" -> fxEntryOn = nilai
                        "gift" -> fxGiftOn = nilai
                        "banner" -> fxBannerOn = nilai
                        "rocket" -> fxRocketOn = nilai
                        "game" -> {
                            fxGameOn = nilai
                            // Banner pemenang game di luar room ikut mati/nyala.
                            GameBanner.simpanSaklar(context, nilai)
                        }
                    }
                    fxLocal.edit().putBoolean(kunci, nilai).apply()
                    if (fxUid.isNotBlank()) Rtdb.ref("fxPrefs/$fxUid/$kunci").setValue(nilai)
                },
            )
        }
    }
}

/** Satu baris saklar: judul, keterangan, dan tombol geser. */
@Composable
private fun RmEfekBaris(judul: String, ket: String, peringatan: String? = null, on: Boolean, onToggle: (Boolean) -> Unit) {
    Column(Modifier.fillMaxWidth()) {
        Row(Modifier.fillMaxWidth().padding(vertical = 6.dp), verticalAlignment = Alignment.CenterVertically) {
            Text(tr(judul), color = Color.White, fontSize = 16.sp, modifier = Modifier.weight(1f))
            Switch(
                checked = on,
                onCheckedChange = onToggle,
                colors = SwitchDefaults.colors(
                    checkedTrackColor = Teal,
                    checkedThumbColor = Color.White,
                    uncheckedTrackColor = Color(0xFF3A3A3A),
                    uncheckedThumbColor = Color.White,
                    uncheckedBorderColor = Color(0xFF3A3A3A),
                ),
            )
        }
        Column(Modifier.fillMaxWidth().clip(RoundedCornerShape(6.dp)).background(Color(0xFF161616)).padding(12.dp)) {
            Text(ket, color = Color(0xFF9A9A9A), fontSize = 13.sp)
            if (peringatan != null) {
                Spacer(Modifier.height(4.dp))
                Text(peringatan, color = Color(0xFFE06A6A), fontSize = 13.sp)
            }
        }
        Spacer(Modifier.height(10.dp))
    }
}

/**
 * Panel "Blok Efek": satu tempat untuk mematikan tiap jenis efek di layar.
 * Saklar ON = efek tampil, OFF = efek disembunyikan. Disimpan per akun.
 */
@Composable
private fun RmBlokEfek(
    masuk: Boolean, gift: Boolean, banner: Boolean, roket: Boolean, game: Boolean,
    onChange: (String, Boolean) -> Unit,
) {
    Text(tr("Blok Efek"), color = Color.White, fontSize = 20.sp)
    Spacer(Modifier.height(4.dp))
    Text(tr("Hijau berarti efek tampil. Matikan untuk menyembunyikan."), color = Color(0xFF9A9A9A), fontSize = 12.sp)
    Spacer(Modifier.height(12.dp))
    RmEfekBaris(
        tr("Efek masuk room"),
        tr("Jika dimatikan, animasi pemain VIP yang masuk room tidak diputar."),
        on = masuk,
    ) { onChange("entry", it) }
    RmEfekBaris(
        tr("Efek gift"),
        tr("Jika dimatikan, animasi gift dan pecahan cashback di layar tidak diputar."),
        on = gift,
    ) { onChange("gift", it) }
    RmEfekBaris(
        tr("Banner gift"),
        tr("Jika dimatikan, banner gift dan banner cashback di atas layar tidak muncul."),
        on = banner,
    ) { onChange("banner", it) }
    RmEfekBaris(
        tr("Efek roket"),
        tr("Jika dimatikan, ikon roket di sisi room dan animasi peluncuran roket tidak ditampilkan."),
        on = roket,
    ) { onChange("rocket", it) }
    RmEfekBaris(
        tr("Efek game"),
        tr("Jika dimatikan, banner pemenang game tidak muncul, baik di dalam room maupun di halaman lain."),
        peringatan = tr("Ini tidak mengubah hasil game, hanya sembunyikan banner."),
        on = game,
    ) { onChange("game", it) }
    // Diagnosa singkat: dipakai untuk memastikan efek mana yang jalan di HP ini.
    Spacer(Modifier.height(14.dp))
    val diagnosa = VipAssets.diag
    Text(
        "Versi " + com.rezochatvoice.exceo.BuildConfig.VERSION_NAME +
            "\nEfek masuk: " + (diagnosa["entry"] ?: "belum ada") +
            "\nPemutaran: " + (diagnosa["entry_main"] ?: "-"),
        color = Color(0xFF7F7F7F), fontSize = 11.sp,
    )
}

@Composable
private fun RmAvatar(bmp: ImageBitmap?, fallback: String, size: Dp) {
    Box(Modifier.size(size).clip(CircleShape).background(Color(0xFF1E3A34)), contentAlignment = Alignment.Center) {
        if (bmp != null) {
            Image(bitmap = bmp, contentDescription = null, contentScale = ContentScale.Crop, modifier = Modifier.fillMaxSize())
        } else {
            Text(fallback.take(1).uppercase(), color = GoldLight, fontWeight = FontWeight.Bold, fontSize = (size.value * 0.4f).sp)
        }
    }
}

/**
 * Gelombang suara di belakang kursi mic. Ukuran dan tebalnya mengikuti
 * tingkat suara peserta, jadi gerakannya sinkron dengan suara asli.
 */
@Composable
private fun GelombangBicara(level: Float, size: Dp) {
    val l = level.coerceIn(0f, 1f)
    val t = androidx.compose.animation.core.rememberInfiniteTransition(label = "gelombangKursi")
    val fase by t.animateFloat(
        initialValue = 0f,
        targetValue = 1f,
        animationSpec = infiniteRepeatable(animation = tween(1100, easing = androidx.compose.animation.core.LinearEasing)),
        label = "faseGelombang",
    )
    // Kanvas lebih besar dari kursi: cincin menyebar KELUAR dari garis lingkaran kursi,
    // dan tidak pernah menggambar di atas avatar.
    androidx.compose.foundation.Canvas(Modifier.size(size * 1.6f)) {
        val cx = this.size.width / 2f
        val cy = this.size.height / 2f
        val rKursi = this.size.minDimension / 1.6f / 2f
        val maks = this.size.minDimension / 2f
        for (i in 0..2) {
            val f = (fase + i / 3f) % 1f
            val r = rKursi + (maks - rKursi) * f
            val alfa = (1f - f) * (0.35f + 0.55f * l)
            drawCircle(
                color = Color(0xFF3FE08C).copy(alpha = alfa.coerceIn(0f, 0.9f)),
                radius = r,
                center = androidx.compose.ui.geometry.Offset(cx, cy),
                style = androidx.compose.ui.graphics.drawscope.Stroke(width = this.size.minDimension * (0.02f + 0.02f * l)),
            )
        }
    }
}

/**
 * Gelembung suara di atas kursi mic: balon putih kecil dengan tiga batang
 * yang bergerak mengikuti level suara, jadi jelas siapa yang sedang bicara.
 */
@Composable
private fun GelembungSuara(size: Dp, level: Float) {
    val l = level.coerceIn(0f, 1f)
    val t = androidx.compose.animation.core.rememberInfiniteTransition(label = "gelembungSuara")
    val detak by t.animateFloat(
        initialValue = 0f,
        targetValue = 1f,
        animationSpec = infiniteRepeatable(animation = tween(520), repeatMode = RepeatMode.Reverse),
        label = "detakSuara",
    )
    val lebar = (size.value * 0.34f).dp
    val tinggi = (size.value * 0.24f).dp
    Box(
        Modifier
            .size(width = lebar, height = tinggi)
            .clip(RoundedCornerShape(50))
            .background(Color(0xF2FFFFFF))
            .border(1.5.dp, Color(0xFF3FE08C), RoundedCornerShape(50)),
        contentAlignment = Alignment.Center,
    ) {
        androidx.compose.foundation.Canvas(Modifier.size(width = lebar - 7.dp, height = tinggi - 6.dp)) {
            val n = 3
            val w = this.size.width
            val h = this.size.height
            val barW = w * 0.17f
            val gap = (w - barW * n) / (n + 1)
            val rasio = listOf(
                0.40f + 0.35f * l,
                0.50f + 0.45f * l * detak,
                0.35f + 0.50f * l * (1f - detak),
            )
            for (i in 0 until n) {
                val bh = h * rasio[i].coerceIn(0.18f, 1f)
                val x = gap + i * (barW + gap)
                drawRoundRect(
                    color = Color(0xFF1E8E5A),
                    topLeft = androidx.compose.ui.geometry.Offset(x, (h - bh) / 2f),
                    size = androidx.compose.ui.geometry.Size(barW, bh),
                    cornerRadius = androidx.compose.ui.geometry.CornerRadius(barW / 2f),
                )
            }
        }
    }
}

/**
 * Satu kursi mic. Dibuat sebagai komponen sendiri supaya pembaruan poin mic
 * hanya menghitung ulang kursinya, bukan seluruh layar room (penyebab macet).
 */
@Composable
private fun RmSeatCell(
    index: Int,
    seat: Seat?,
    size: Dp,
    locked: Boolean,
    emote: SeatEmote?,
    emotSudahTampil: MutableList<String>,
    poin: () -> Long,
    onClick: () -> Unit,
) {
    RmSeatView(
        index = index,
        seat = seat,
        size = size,
        locked = locked,
        emote = emote,
        emotSudahTampil = emotSudahTampil,
        points = poin(),
        onClick = onClick,
    )
}

@Composable
private fun RmSeatView(index: Int, seat: Seat?, size: Dp, locked: Boolean = false, emote: SeatEmote? = null, emotSudahTampil: MutableList<String> = mutableListOf(), points: Long = 0L, onClick: () -> Unit) {
    val bmp = remember(seat?.avatarB64) { ProfileRepo.decodeB64(seat?.avatarB64) }
    var seatUser by remember(seat?.uid) { mutableStateOf(seat?.uid?.let { UserCache.peek(it) }) }
    LaunchedEffect(seat?.uid) {
        val id = seat?.uid
        if (id != null) {
            // Selalu segarkan (cache 5 menit, tidak menimpa data bagus dengan yang kosong),
            // supaya frame di kursi tidak hilang / telat.
            UserCache.byUid(id)?.let { seatUser = it }
        }
    }
    val seatFrame = if (seat != null) frameAssetOf(seatUser?.frame, seatUser?.vip ?: 0, seatUser?.vipUntil ?: 0L) else null
    // Gelombang & gelembung suara: muncul di kursi mic saat orangnya bicara.
    val bicaraEvent = seat != null && !seat.muted && AgoraVoice.bicara.contains(seat.uid)
    val lvlMentah = if (seat != null && !seat.muted) (AgoraVoice.levels[seat.uid] ?: 0f) else 0f
    // Kalau server suara hanya mengirim daftar pembicara tanpa angka level,
    // pakai nilai dasar supaya gelombang dan gelembung tetap kelihatan.
    val lvlTarget = if (bicaraEvent) kotlin.math.max(lvlMentah.coerceIn(0f, 1f), 0.55f)
                    else lvlMentah.coerceIn(0f, 1f)
    val lvl by androidx.compose.animation.core.animateFloatAsState(
        targetValue = lvlTarget,
        animationSpec = androidx.compose.animation.core.tween(120),
        label = "levelSuara",
    )
    Column(Modifier.clickable(onClick = onClick), horizontalAlignment = Alignment.CenterHorizontally) {
        Box(Modifier.size(size), contentAlignment = Alignment.Center) {
            if (lvl > 0.012f) GelombangBicara(lvl, size)
            Box(
                Modifier.size(size).clip(CircleShape)
                .then(
                    if (seat != null) {
                        if (seatFrame != null) Modifier.background(Color(0xFF0F3D33))
                        else Modifier.background(Color(0xFF0F3D33)).border(2.dp, Teal, CircleShape)
                    } else Modifier
                ),
                contentAlignment = Alignment.Center,
            ) {
                // Avatar sedikit mengecil saat bicara supaya gelembung di belakangnya terlihat.
                val skalaAvatar = 1f
                when {
                    seat != null && bmp != null ->
                    Image(bitmap = bmp, contentDescription = null, contentScale = ContentScale.Crop, modifier = Modifier.fillMaxSize(skalaAvatar))
                    seat != null ->
                    Box(Modifier.fillMaxSize(skalaAvatar).clip(CircleShape).background(Color(0xFF0F3D33)), contentAlignment = Alignment.Center) {
                        Text(seat.name.take(1).uppercase(), color = GoldLight, fontWeight = FontWeight.Bold, fontSize = 22.sp)
                    }
                    seat == null && locked ->
                        Image(painterResource(R.drawable.ic_lock_mic), null, Modifier.fillMaxSize(), contentScale = ContentScale.Fit)
                    index == 0 ->
                        Image(painterResource(R.drawable.ic_seat_mic), null, Modifier.fillMaxSize(), contentScale = ContentScale.Fit)
                    else ->
                        Image(painterResource(R.drawable.ic_seat_mic), null, Modifier.fillMaxSize(), contentScale = ContentScale.Fit)
                }
                if (seat != null && seat.muted) {
                    Box(
                        Modifier.align(Alignment.BottomEnd).size(20.dp).clip(CircleShape).background(Color(0xCC000000)),
                        contentAlignment = Alignment.Center,
                    ) { Image(painterResource(R.drawable.ic_mute_mic), null, Modifier.size(12.dp), contentScale = ContentScale.Fit) }
                }
            }
            seatFrame?.let { FrameOverlay(it, (size.value * 1.3f).dp) }
            // Emote digambar SETELAH bingkai supaya tampil di depan frame,
            // bukan di belakangnya.
            var emoteShow by remember { mutableStateOf(false) }
            LaunchedEffect(emote?.at, seat?.uid) {
                val kunci = if (emote != null && seat != null) "${seat.uid}:${emote.at}" else null
                // Hanya emot yang BARU dikirim dan belum pernah tampil. Kalau kursi
                // dibuat ulang (pindah kursi), emot lama tidak muncul lagi.
                if (emote != null && kunci != null &&
                    !emotSudahTampil.contains(kunci) &&
                    abs(System.currentTimeMillis() - emote.at) < 6000
                ) {
                    emotSudahTampil.add(kunci)
                    emoteShow = true
                    delay(3000)
                    emoteShow = false
                } else {
                    emoteShow = false
                }
            }
            if (emoteShow && emote != null) {
                if (emote.emoji.startsWith("http")) {
                    // Emote kustom (gif/png/jpg): seukuran foto profil di mic.
                    AsyncImage(
                        model = emote.emoji,
                        contentDescription = null,
                        contentScale = ContentScale.Crop,
                        modifier = Modifier.align(Alignment.Center).size(size),
                    )
                } else {
                    Text(emote.emoji, fontSize = (size.value * 0.6f).sp, modifier = Modifier.align(Alignment.Center))
                }
            }
        }
        Row(Modifier.width(size + 8.dp), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.Center) {
            if (seat != null) {
                PeranRoomIcon(seat.uid, ukuran = 12.dp)
                if (LocalPeranRoom.current.peranDari(seat.uid) != PeranRoom.BIASA) Spacer(Modifier.width(3.dp))
            }
            VipNameByUid(
                seat?.name ?: (if (index == 0) "MC" else "No.${index + 1}"),
                seat?.uid,
                color = Color(0xFFBDBDBD),
                fontSize = 12.sp,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis,
                textAlign = TextAlign.Center,
                modifier = Modifier.weight(1f, fill = false),
            )
        }
        // Ikon poin hanya muncul kalau ada poin dan kalkulator menyala.
        if (points > 0L) Text("💗 " + fmtCompact(points), color = Color.White, fontSize = 11.sp)
    }
}

/** Tekan lama pada teks chat room: salin isi pesan ke papan klip (v1.0.808). */
@Composable
private fun IngatSalin(text: String): () -> Unit {
    val ctx = androidx.compose.ui.platform.LocalContext.current
    return {
        try {
            val cm = ctx.getSystemService(android.content.Context.CLIPBOARD_SERVICE) as android.content.ClipboardManager
            cm.setPrimaryClip(android.content.ClipData.newPlainText("REZO", text))
            android.widget.Toast.makeText(ctx, tr("Teks disalin"), android.widget.Toast.LENGTH_SHORT).show()
        } catch (e: Exception) {
            android.widget.Toast.makeText(ctx, tr("Gagal menyalin"), android.widget.Toast.LENGTH_SHORT).show()
        }
    }
}

@Composable
private fun RmMsgBox(text: String, color: Color) {
    val salin = IngatSalin(text)
    Box(
        Modifier.widthIn(max = 320.dp).clip(RoundedCornerShape(12.dp)).background(Color(0x66000000))
            .pointerInput(text) {
                detectTapGestures(onLongPress = { salin() })
            }
            .padding(horizontal = 12.dp, vertical = 8.dp),
    ) {
        Text(tr(text), color = color, fontSize = 14.sp)
    }
}

/** Tombol bar bawah memakai ikon bulat dari aset rujukan (sudah berbingkai emas). */
@Composable
private fun RmIkonBtn(res: Int, onClick: () -> Unit) {
    Image(
        painter = painterResource(res),
        contentDescription = null,
        contentScale = ContentScale.Fit,
        modifier = Modifier.size(46.dp).clip(CircleShape).clickable(onClick = onClick),
    )
}

@Composable
private fun RmRoundBtn(onClick: () -> Unit, content: @Composable () -> Unit) {
    Box(
        Modifier.size(46.dp).clip(CircleShape).background(Color(0x66000000)).border(1.dp, Gold.copy(alpha = 0.4f), CircleShape).clickable(onClick = onClick),
        contentAlignment = Alignment.Center,
    ) { content() }
}

@Composable
private fun RmPanel(onDismiss: () -> Unit, content: @Composable ColumnScope.() -> Unit) {
    Box(
        Modifier.fillMaxSize().background(Color(0x99000000)).clickable(
            interactionSource = remember { MutableInteractionSource() },
            indication = null,
            onClick = onDismiss,
        ),
    ) {
        Column(
            Modifier
            .align(Alignment.BottomCenter)
            .fillMaxWidth()
            .clip(RoundedCornerShape(topStart = 22.dp, topEnd = 22.dp))
            .background(Color(0xFF0B0B0B))
            .blockTouches()
            .navigationBarsPadding()
            .imePadding()
            .verticalScroll(rememberScrollState())
            .padding(20.dp),
            content = content,
        )
    }
}

@Composable
private fun RmTool(label: String, onClick: () -> Unit, icon: @Composable () -> Unit) {
    Column(Modifier.width(80.dp).clickable(onClick = onClick), horizontalAlignment = Alignment.CenterHorizontally) {
        Box(Modifier.size(58.dp).clip(CircleShape).background(Color(0xFF1C1C1C)), contentAlignment = Alignment.Center) { icon() }
        Spacer(Modifier.height(6.dp))
        Text(tr(label), color = Color(0xFFD0D0D0), fontSize = 12.sp, textAlign = TextAlign.Center, maxLines = 2)
    }
}

/** Tombol saklar di Kotak 4: jelas menunjukkan ON atau OFF. */
@Composable
private fun RmToolToggle(label: String, on: Boolean, onClick: () -> Unit, icon: @Composable () -> Unit) {
    Column(Modifier.width(80.dp).clickable(onClick = onClick), horizontalAlignment = Alignment.CenterHorizontally) {
        Box(
            Modifier.size(58.dp).clip(CircleShape)
                .background(if (on) Color(0xFF1C1C1C) else Color(0xFF241414))
                .border(1.5.dp, if (on) Gold.copy(alpha = 0.8f) else Color(0xFF7A3A3A), CircleShape),
            contentAlignment = Alignment.Center,
        ) {
            Box(Modifier.alpha(if (on) 1f else 0.35f)) { icon() }
        }
        Spacer(Modifier.height(6.dp))
        Text(tr(label), color = if (on) Color(0xFFD0D0D0) else Color(0xFF8A8A8A), fontSize = 12.sp, textAlign = TextAlign.Center, maxLines = 2)
        Text(
            if (on) "ON" else "OFF",
            color = if (on) Color(0xFF5BD27A) else Color(0xFFE06A6A),
            fontSize = 10.sp,
            fontWeight = FontWeight.Bold,
        )
    }
}

@Composable
private fun RmAction(label: String, onClick: () -> Unit, icon: @Composable () -> Unit) {
    Column(Modifier.clickable(onClick = onClick), horizontalAlignment = Alignment.CenterHorizontally) {
        Box(
            Modifier.size(52.dp).clip(CircleShape).background(Color(0xFF1C1C1C)).border(1.dp, Gold.copy(alpha = 0.5f), CircleShape),
            contentAlignment = Alignment.Center,
        ) { icon() }
        Spacer(Modifier.height(6.dp))
        Text(tr(label), color = Color(0xFFD0D0D0), fontSize = 12.sp)
    }
}

@Composable
private fun RmStat(value: String, label: String, modifier: Modifier) {
    Column(modifier, horizontalAlignment = Alignment.CenterHorizontally) {
        Text(value, color = GoldLight, fontWeight = FontWeight.Bold, fontSize = 18.sp)
        Text(tr(label), color = Color(0xFF9A9A9A), fontSize = 12.sp)
    }
}

@Composable
private fun RmSeatProfile(
    seat: Seat,
    isMe: Boolean,
    isOwner: Boolean,
    onLeave: () -> Unit,
    onToggleMic: () -> Unit,
    onKick: () -> Unit,
) {
    val bmp = remember(seat.avatarB64) { ProfileRepo.decodeB64(seat.avatarB64) }
    val actions = LocalActions.current
    var counts by remember(seat.uid) { mutableStateOf(0L to 0L) }
    LaunchedEffect(seat.uid) {
        try {
            counts = FollowRepo.counts(seat.uid)
        } catch (e: kotlinx.coroutines.CancellationException) {
            throw e
        } catch (e: Exception) {
        }
    }
    Column(Modifier.fillMaxWidth(), horizontalAlignment = Alignment.CenterHorizontally) {
        Column(Modifier.clickable { actions.openProfile(seat.uid) }, horizontalAlignment = Alignment.CenterHorizontally) {
            var sheetUser by remember(seat.uid) { mutableStateOf(UserCache.peek(seat.uid)) }
            LaunchedEffect(seat.uid) { if (sheetUser == null) sheetUser = UserCache.byUid(seat.uid) }
            val sheetFrame = frameAssetOf(sheetUser?.frame, sheetUser?.vip ?: 0, sheetUser?.vipUntil ?: 0L)
            Box(Modifier.padding(bottom = 8.dp).size(76.dp), contentAlignment = Alignment.Center) {
                RmAvatar(bmp, seat.name, 76.dp)
                sheetFrame?.let { FrameOverlay(it, 104.dp) }
            }
            Spacer(Modifier.height(8.dp))
            VipNameByUid(seat.name, seat.uid, color = Color.White, fontWeight = FontWeight.Bold, fontSize = 18.sp)
            Text(tr("Lihat profil ›"), color = Gold, fontSize = 12.sp)
        }
        Spacer(Modifier.height(14.dp))
        Row(Modifier.fillMaxWidth()) {
            RmStat("${counts.second}", "Followers", Modifier.weight(1f))
            RmStat("${counts.first}", "Follow", Modifier.weight(1f))
            RmStat("0", "Level", Modifier.weight(1f))
        }
        Spacer(Modifier.height(18.dp))
        if (isMe) {
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceEvenly) {
                RmAction(tr("Turun mic"), onLeave) { Icon(Icons.Default.KeyboardArrowDown, null, tint = GoldLight) }
                RmAction(if (seat.muted) "Buka mic" else "Matikan mic", onToggleMic) { MicIcon(!seat.muted) }
            }
        } else if (isOwner) {
            GoldButton(tr("Turunkan dari kursi"), onClick = onKick)
        }
    }
}

@Composable
private fun RmMiniSeats(count: Int, selected: Boolean, modifier: Modifier) {
    val cols = micColumns(count)
    val rows = (count + cols - 1) / cols
    Canvas(modifier) {
        val cw = size.width / cols
        val ch = size.height / rows
        val rad = minOf(cw, ch) * 0.3f
        for (i in 0 until count) {
            drawCircle(
                if (selected) Teal else Color(0xFF6B6B6B),
                rad,
                Offset(cw * (i % cols + 0.5f), ch * (i / cols + 0.5f)),
            )
        }
    }
}

@Composable
private fun RmMode(r: RoomInfo, onClose: () -> Unit) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    var sel by remember { mutableStateOf(r.micCount) }
    Text(tr("Pilih mode party"), color = Color.White, fontSize = 22.sp)
    Spacer(Modifier.height(12.dp))
    Row(horizontalArrangement = Arrangement.spacedBy(20.dp)) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Box(Modifier.size(60.dp).clip(CircleShape).background(Color(0xFF1C1C1C)).border(2.dp, Gold, CircleShape), contentAlignment = Alignment.Center) {
                Text("😎", fontSize = 28.sp)
            }
            Text(tr("Obrolan"), color = Color.White, fontSize = 13.sp)
        }
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Box(Modifier.size(60.dp).clip(CircleShape).background(Color(0xFF1C1C1C)), contentAlignment = Alignment.Center) {
                Text("🛋", fontSize = 28.sp)
            }
            Text(tr("Mode MC acara"), color = Color(0xFF6B6B6B), fontSize = 13.sp)
        }
    }
    Spacer(Modifier.height(16.dp))
    Text(tr("Jumlah mic"), color = Color.White, fontSize = 18.sp)
    Text(tr("Posisi kursi host akan berubah jika mengganti jumlah mic"), color = Color(0xFF8A8A8A), fontSize = 12.sp)
    listOf(8, 10, 12, 15, 16, 20).chunked(3).forEach { rowItems ->
        Row(Modifier.fillMaxWidth().padding(top = 12.dp), horizontalArrangement = Arrangement.spacedBy(10.dp)) {
            rowItems.forEach { n ->
                val on = sel == n
                Column(
                    Modifier.weight(1f).clickable {
                        sel = n
                        scope.launch {
                            RoomRepo.setMicCount(r.id, n)?.let { Toast.makeText(context, it, Toast.LENGTH_SHORT).show() }
                        }
                    },
                    horizontalAlignment = Alignment.CenterHorizontally,
                ) {
                    RmMiniSeats(
                        n,
                        on,
                        Modifier.fillMaxWidth().height(70.dp).clip(RoundedCornerShape(10.dp)).background(Color(0xFF1C1C1C))
                        .border(2.dp, if (on) Teal else Color(0xFF333333), RoundedCornerShape(10.dp)).padding(8.dp),
                    )
                    Spacer(Modifier.height(6.dp))
                    Text(
                        "$n",
                        color = if (on) Color.Black else Color.White,
                        fontWeight = FontWeight.Bold,
                        modifier = Modifier.clip(RoundedCornerShape(50)).background(if (on) Teal else Color(0xFF222222)).padding(horizontal = 16.dp, vertical = 3.dp),
                    )
                }
            }
        }
    }
    Spacer(Modifier.height(18.dp))
    Box(
        Modifier.fillMaxWidth().height(48.dp).clip(RoundedCornerShape(50)).background(Color(0xFF00D1B2)).clickable(onClick = onClose),
        contentAlignment = Alignment.Center,
    ) { Text(tr("Konfirmasi"), color = Color.Black, fontWeight = FontWeight.Bold, fontSize = 16.sp) }
}

@Composable
private fun RmSettings(r: RoomInfo, awalSub: Int = 0, onBlacklist: () -> Unit, onClose: () -> Unit) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    var name by remember { mutableStateOf(r.name) }
    var ann by remember { mutableStateOf(r.announcement) }
    var busy by remember { mutableStateOf(false) }
    // 0 = Info Kamar, 1 = daftar anggota (pengikut room), 2 = tema kamar
    var sub by remember { mutableStateOf(awalSub) }
    var editNama by remember { mutableStateOf(false) }
    var editAnn by remember { mutableStateOf(false) }
    var bans by remember { mutableStateOf<List<RoomRepo.RoomBan>>(emptyList()) }
    var pengikut by remember { mutableStateOf<Set<String>>(emptySet()) }
    var fUsers by remember { mutableStateOf<Map<String, PublicUser?>>(emptyMap()) }
    // Poin kamar (level kamar) dan daftar peringkat.
    var poinTotal by remember { mutableStateOf(0L) }
    var periode by remember { mutableStateOf(2) } // 0 harian, 1 bulanan, 2 keseluruhan
    var peringkat by remember { mutableStateOf<List<RoomPoin.Baris>>(emptyList()) }
    var kontribusi by remember { mutableStateOf<List<Pair<String, Long>>>(emptyList()) }
    var muatPoin by remember { mutableStateOf(false) }
    DisposableEffect(r.id) {
        val b = RoomRepo.observeBans(r.id) { bans = it }
        val f = Rtdb.listen(Rtdb.ref("roomFollowers/" + r.id)) { snap ->
            pengikut = snap.children.mapNotNull { it.key }.toSet()
        }
        onDispose { b.remove(); f.remove() }
    }
    LaunchedEffect(kontribusi) {
        val m = HashMap<String, PublicUser?>()
        for ((u, _) in kontribusi) {
            if (fUsers.containsKey(u)) continue
            m[u] = try {
                UserCache.byUid(u)
            } catch (e: kotlinx.coroutines.CancellationException) {
                throw e
            } catch (e: Exception) {
                null
            }
        }
        if (m.isNotEmpty()) fUsers = fUsers + m
    }
    LaunchedEffect(pengikut) {
        val m = HashMap<String, PublicUser?>()
        for (u in pengikut) {
            m[u] = try {
                UserCache.byUid(u)
            } catch (e: kotlinx.coroutines.CancellationException) {
                throw e
            } catch (e: Exception) {
                null
            }
        }
        fUsers = m
    }
    LaunchedEffect(r.id) { RoomImg.muat(r.id) }
    LaunchedEffect(r.id) {
        poinTotal = try {
            Rtdb.ref("roomPoin/" + r.id + "/total").get().await().getValue(Long::class.java) ?: 0L
        } catch (e: kotlinx.coroutines.CancellationException) {
            throw e
        } catch (e: Exception) {
            0L
        }
    }
    LaunchedEffect(sub, periode) {
        if (sub != 3 && sub != 4) return@LaunchedEffect
        muatPoin = true
        peringkat = RoomPoin.peringkat(if (periode == 0) "harian" else if (periode == 1) "bulanan" else "total")
        if (sub == 4) kontribusi = RoomPoin.kontribusi(r.id)
        muatPoin = false
    }
    val photoBmp = remember(RoomImg.foto[r.id], r.photoB64) { ProfileRepo.decodeB64Scaled(RoomImg.foto[r.id] ?: r.photoB64, 256) }
    val bgBmp = remember(RoomImg.latar[r.id], r.backgroundB64) { ProfileRepo.decodeB64Scaled(RoomImg.latar[r.id] ?: r.backgroundB64, 360) }

    // Simpan langsung ke server: tidak perlu menekan Konfirmasi lagi.
    fun simpan(fotoBaru: String?, latarBaru: String?, namaBaru: String?, annBaru: String?) {
        if (busy) return
        scope.launch {
            busy = true
            var selesai = false
            val hasil = try {
                kotlinx.coroutines.withTimeoutOrNull(40_000L) {
                    val e = RoomRepo.updateSettings(
                        r.id,
                        (namaBaru ?: name).trim().ifBlank { r.name },
                        fotoBaru,
                        latarBaru,
                        (annBaru ?: ann).trim(),
                    )
                    selesai = true
                    e
                }
            } catch (e: kotlinx.coroutines.CancellationException) {
                throw e
            } catch (e: Exception) {
                selesai = true
                e.message ?: "Gagal menyimpan"
            }
            busy = false
            Toast.makeText(
                context,
                if (!selesai) "Koneksi lambat, coba lagi" else (hasil ?: "Tersimpan"),
                Toast.LENGTH_SHORT,
            ).show()
        }
    }

    // Foto yang sedang dipotong: bitmap + tujuan (1 = sampul, 2 = tema).
    var potongBmp by remember { mutableStateOf<android.graphics.Bitmap?>(null) }
    var potongUntuk by remember { mutableStateOf(0) }
    // Hasil potong yang sedang dipratinjau sebelum benar-benar disimpan.
    var pratinjau by remember { mutableStateOf<String?>(null) }
    var pratinjauUntuk by remember { mutableStateOf(0) }
    fun mulaiPotong(uri: Uri, untuk: Int) {
        scope.launch {
            busy = true
            val bmp = muatFotoPotong(context, uri)
            busy = false
            if (bmp == null) {
                Toast.makeText(context, "Foto tidak bisa dibaca", Toast.LENGTH_SHORT).show()
            } else {
                potongUntuk = untuk
                potongBmp = bmp
            }
        }
    }
    val photoPicker = rememberLauncherForActivityResult(ActivityResultContracts.PickVisualMedia()) { uri ->
        if (uri != null) mulaiPotong(uri, 1)
    }
    val bgPicker = rememberLauncherForActivityResult(ActivityResultContracts.PickVisualMedia()) { uri ->
        if (uri != null) mulaiPotong(uri, 2)
    }
    val imageOnly = PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.ImageOnly)

    // Pilihan sumber foto: 0 = tidak ada, 1 = sampul kamar, 2 = tema kamar.
    var sumberUntuk by remember { mutableStateOf(0) }
    var izinUntuk by remember { mutableStateOf(0) }
    var fotoUri by remember { mutableStateOf<Uri?>(null) }
    // Peluncur kamera disimpan di variabel supaya bisa dipakai dari fungsi di atasnya.
    var luncurKamera by remember { mutableStateOf<(Uri) -> Unit>({ }) }
    fun bukaKamera(untuk: Int) {
        try {
            sumberUntuk = untuk
            val dir = File(context.cacheDir, "roomfoto").apply { mkdirs() }
            val f = File(dir, "room_" + System.currentTimeMillis() + ".jpg")
            val u = FileProvider.getUriForFile(context, context.packageName + ".fotoprovider", f)
            fotoUri = u
            luncurKamera(u)
        } catch (e: Exception) {
            Toast.makeText(context, "Kamera tidak bisa dibuka", Toast.LENGTH_SHORT).show()
        }
    }
    val kameraPicker = rememberLauncherForActivityResult(ActivityResultContracts.TakePicture()) { jadi ->
        val u = fotoUri
        val untuk = sumberUntuk
        if (jadi && u != null && untuk != 0) mulaiPotong(u, untuk)
    }
    luncurKamera = { u -> kameraPicker.launch(u) }
    val izinKamera = rememberLauncherForActivityResult(ActivityResultContracts.RequestPermission()) { boleh ->
        if (boleh) bukaKamera(izinUntuk)
        else Toast.makeText(context, "Izin kamera ditolak, pakai album saja", Toast.LENGTH_SHORT).show()
    }
    val bmpPotong = potongBmp
    if (bmpPotong != null) {
        val dm = context.resources.displayMetrics
        val rasioLayar = dm.widthPixels.toFloat() / dm.heightPixels.toFloat()
        val sampul = potongUntuk == 1
        LayarPotongFoto(
            bitmap = bmpPotong,
            rasio = if (sampul) 1f else rasioLayar,
            bulat = sampul,
            sisiMaks = if (sampul) 512 else 1600,
            kualitas = if (sampul) 88 else 75,
            onBatal = { potongBmp = null },
            onSelesai = { b ->
                potongBmp = null
                if (b == null) {
                    Toast.makeText(context, "Gagal memotong foto", Toast.LENGTH_SHORT).show()
                } else {
                    pratinjauUntuk = potongUntuk
                    pratinjau = b
                }
            },
        )
    }
    val hasilPratinjau = pratinjau
    if (hasilPratinjau != null) {
        val sampulPratinjau = pratinjauUntuk == 1
        PratinjauFotoRoom(
            b64 = hasilPratinjau,
            judul = if (sampulPratinjau) "sampul kamar" else "background kustom",
            untukTema = !sampulPratinjau,
            onUnggahLagi = {
                // Unggah lagi: tutup pratinjau lalu buka pilihan sumber foto lagi.
                val untuk = pratinjauUntuk
                pratinjau = null
                sumberUntuk = untuk
            },
            onKonfirmasi = {
                pratinjau = null
                if (sampulPratinjau) simpan(hasilPratinjau, null, null, null)
                else simpan(null, hasilPratinjau, null, null)
            },
            onTutup = { pratinjau = null },
        )
    }
    if (sumberUntuk != 0) {
        SumberFotoDialog(
            onTutup = { sumberUntuk = 0 },
            onKamera = {
                val untuk = sumberUntuk
                sumberUntuk = 0
                val sudah = androidx.core.content.ContextCompat.checkSelfPermission(
                    context, android.Manifest.permission.CAMERA,
                ) == android.content.pm.PackageManager.PERMISSION_GRANTED
                if (sudah) bukaKamera(untuk) else {
                    izinUntuk = untuk
                    izinKamera.launch(android.Manifest.permission.CAMERA)
                }
            },
            onAlbum = {
                val untuk = sumberUntuk
                sumberUntuk = 0
                if (untuk == 1) photoPicker.launch(imageOnly) else bgPicker.launch(imageOnly)
            },
        )
    }

    if (sub == 1) {
        Text("Daftar anggota", color = GoldLight, fontSize = 20.sp, fontWeight = FontWeight.Bold)
        Spacer(Modifier.height(6.dp))
        Text("User yang sudah mengikuti room ini", color = Color(0xFF9A9A9A), fontSize = 12.sp)
        Spacer(Modifier.height(12.dp))
        if (pengikut.isEmpty()) {
            Text("Belum ada user yang mengikuti room ini", color = Color(0xFFBDBDBD), fontSize = 14.sp)
        } else {
            LazyColumn(Modifier.heightIn(max = 360.dp)) {
                items(pengikut.toList()) { u ->
                    val pu = fUsers[u]
                    Row(Modifier.fillMaxWidth().padding(vertical = 8.dp), verticalAlignment = Alignment.CenterVertically) {
                        InvAvatar(pu, u)
                        Spacer(Modifier.width(10.dp))
                        Column(Modifier.weight(1f)) {
                            Text(pu?.name ?: ("UID " + u), color = Color.White, fontSize = 15.sp, maxLines = 1)
                            val idu = pu?.userId
                            if (!idu.isNullOrBlank()) Text("ID: " + idu, color = Color(0xFF9A9A9A), fontSize = 12.sp)
                        }
                    }
                }
            }
        }
        Spacer(Modifier.height(14.dp))
        OutlineButton("Kembali") { sub = 0 }
        return
    }

    if (sub == 2) {
        var tabTema by remember { mutableStateOf(0) }
        Text("Tema kamar", color = Color.White, fontSize = 20.sp, fontWeight = FontWeight.Bold)
        Spacer(Modifier.height(12.dp))
        Row(horizontalArrangement = Arrangement.spacedBy(20.dp)) {
            Text(
                "Tema",
                color = if (tabTema == 0) GoldLight else Color(0xFF9A9A9A),
                fontSize = 15.sp,
                fontWeight = if (tabTema == 0) FontWeight.Bold else FontWeight.Normal,
                modifier = Modifier.clickable { tabTema = 0 },
            )
            Text(
                "Border sampul",
                color = if (tabTema == 1) GoldLight else Color(0xFF9A9A9A),
                fontSize = 15.sp,
                fontWeight = if (tabTema == 1) FontWeight.Bold else FontWeight.Normal,
                modifier = Modifier.clickable { tabTema = 1 },
            )
        }
        Spacer(Modifier.height(14.dp))
        if (tabTema == 1) {
            Text(
                "Belum ada border sampul untuk room ini.",
                color = Color(0xFFBDBDBD), fontSize = 13.sp,
            )
        } else {
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                TemaTile(
                    modifier = Modifier.weight(1f),
                    label = "background kustom",
                    ket = if (bgBmp != null) "dipakai" else "ketuk untuk unggah",
                    aktif = bgBmp != null,
                    bitmap = bgBmp,
                    plus = bgBmp == null,
                    onClick = { if (!busy) sumberUntuk = 2 },
                )
                TemaTile(
                    modifier = Modifier.weight(1f),
                    label = "Tema default",
                    ket = "bawaan aplikasi",
                    aktif = bgBmp == null,
                    bitmap = null,
                    onClick = {
                        if (!busy) {
                            if (bgBmp == null) {
                                Toast.makeText(context, "Tema default sudah dipakai", Toast.LENGTH_SHORT).show()
                            } else {
                                // Menghapus latar kustom: room kembali memakai tema default.
                                simpan(null, "", null, null)
                            }
                        }
                    },
                )
            }
            Spacer(Modifier.height(12.dp))
            Text(
                "Tema berlevel (LV.2 dan seterusnya) saya tambahkan setelah gambar tema default kamu kirim.",
                color = Color(0xFF8A8A8A), fontSize = 12.sp,
            )
        }
        Spacer(Modifier.height(16.dp))
        OutlineButton("Kembali") { sub = 0 }
        return
    }

    if (sub == 5) {
        var terbuka by remember { mutableStateOf(-1) }
        Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
            Text(
                "\u2039",
                color = Color.White, fontSize = 26.sp,
                modifier = Modifier.clickable { sub = 3 }.padding(horizontal = 6.dp),
            )
            Text("Keanggotaan", color = Color.White, fontSize = 19.sp, modifier = Modifier.weight(1f))
        }
        Spacer(Modifier.height(10.dp))
        // Tabel level kamar: (level, admin, anggota). Sesuai referensi owner.
        val tabelLevel = listOf(
            Triple(1, 10, 30), Triple(2, 10, 35), Triple(3, 10, 40), Triple(4, 11, 45), Triple(5, 11, 50),
            Triple(6, 12, 60), Triple(7, 12, 65), Triple(8, 13, 70), Triple(9, 13, 75), Triple(10, 14, 80),
            Triple(11, 14, 90), Triple(12, 15, 100), Triple(13, 16, 110), Triple(14, 17, 120), Triple(15, 18, 130),
            Triple(16, 19, 150), Triple(17, 20, 170), Triple(18, 21, 190), Triple(19, 22, 210), Triple(20, 23, 230),
            Triple(21, 25, 260), Triple(22, 27, 290), Triple(23, 29, 320), Triple(24, 31, 350), Triple(25, 33, 380),
            Triple(26, 35, 420), Triple(27, 37, 460), Triple(28, 39, 500), Triple(29, 42, 550), Triple(30, 45, 600),
        )
        val aturan = listOf(
            "1. Apa Itu Grup Keanggotaan Kamar?" to
                "Grup keanggotaan kamar adalah grup khusus yang dimiliki oleh setiap kamar. Satu pengguna dapat menjadi anggota dari beberapa kamar, dan bekerja keras dengan anggota yang berpikiran sama untuk meningkatkan grup keanggotaan, mendapatkan kamar hadiah yang kaya dan hak istimewa serta hadiah pribadi",
            "2. Apa Hak Istimewa & Hadiah Yang Didapatkan di Kamar?" to "#TABEL",
            "3. Apa Keistimewaan & Hadiah Yang Dapat Diperoleh Anggota Kamar?" to
                "Lebih banyak hadiah dan hak istimewa anggota sedang diperbarui terus menerus..",
            "4.Metode Poin" to "#POIN",
            "5. Bergabung/Keluar dari keanggotaan kamar" to
                "Gabung\n1. Pengguna dapat mengklik gabung untuk bergabung dengan grup keanggotaan di bilah informasi di bagian bawah kamar\n2. Pemilik kamar dapat menetapkan ketentuan yang harus diikuti oleh grup keanggotaan: bergabung secara langsung, bergabung setelah disetujui oleh pemilik rumah atau admin, dan melarang bergabung\n\nLog out\n1. Pengguna dapat keluar dari grup keanggotaan saat ini di kamar yang sesuai\n2. Setelah keluar dari grup keanggotaan, semua poin dan manfaat pengguna saat ini akan dihapus, dan akan dihitung ulang saat bergabung kembali dengan grup keanggotaan.",
        )
        LazyColumn(Modifier.fillMaxWidth().heightIn(max = 460.dp)) {
            items(aturan.size) { i ->
                val (tanya, jawab) = aturan[i]
                Column(
                    Modifier.fillMaxWidth().clickable { terbuka = if (terbuka == i) -1 else i }.padding(vertical = 12.dp),
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(tanya, color = Color(0xFFEDEDED), fontSize = 16.sp, modifier = Modifier.weight(1f))
                        Text(if (terbuka == i) "\u2303" else "\u2304", color = Color(0xFF9A9A9A), fontSize = 18.sp)
                    }
                    if (terbuka == i) {
                        Spacer(Modifier.height(8.dp))
                        if (jawab == "#TABEL") {
                            Text("Hadiah Peningkatan Kamar:", color = Color(0xFFBDBDBD), fontSize = 13.sp)
                            Spacer(Modifier.height(6.dp))
                            Column(Modifier.fillMaxWidth().clip(RoundedCornerShape(12.dp)).background(Color(0xFFEFEAFB))) {
                                Row(Modifier.fillMaxWidth().background(Color(0xFFF2B72B)).padding(vertical = 8.dp)) {
                                    for (h in listOf("Level", "Admin", "Anggota")) {
                                        Text(h, color = Color.White, fontSize = 12.sp, fontWeight = FontWeight.Bold, textAlign = TextAlign.Center, modifier = Modifier.weight(1f))
                                    }
                                }
                                for ((lv, ad, ang) in tabelLevel) {
                                    Row(Modifier.fillMaxWidth().padding(vertical = 5.dp)) {
                                        Text(lv.toString(), color = Color(0xFF6A3FD0), fontSize = 12.sp, textAlign = TextAlign.Center, modifier = Modifier.weight(1f))
                                        Text(ad.toString(), color = Color(0xFF6A3FD0), fontSize = 12.sp, textAlign = TextAlign.Center, modifier = Modifier.weight(1f))
                                        Text(ang.toString(), color = Color(0xFF6A3FD0), fontSize = 12.sp, textAlign = TextAlign.Center, modifier = Modifier.weight(1f))
                                    }
                                }
                            }
                            Spacer(Modifier.height(8.dp))
                            Text(
                                "Note: Jumlah admin dan jumlah anggota akan bertambah setiap kali naik satu tingkat, dan logo tingkat kamar serta tema ruang akan ditingkatkan setiap lima tingkat.\n\nHadiah daftar poin kamar bulanan\nTOP1: Border Sampul Kamar (15 hari), Background Kamar (15 hari), Ubah Label (3 kali)\nTOP2: Border Sampul Kamar (15 hari), Background Kamar (15 hari), Ubah Label (2 kali)\nTOP3: Border Sampul Kamar (15 hari), Background Kamar (15 hari), Ubah Label (1 kali)\nTOP4-10: Ubah Label (1 kali)\n\nLebih banyak hadiah kamar dan hak istimewa sedang diperbarui terus menerus..",
                                color = Color(0xFFBDBDBD), fontSize = 12.sp, lineHeight = 18.sp,
                            )
                        } else if (jawab == "#POIN") {
                            Column(Modifier.fillMaxWidth().clip(RoundedCornerShape(12.dp)).background(Color(0xFFEFEAFB))) {
                                Row(Modifier.fillMaxWidth().background(Color(0xFFF2B72B)).padding(vertical = 8.dp)) {
                                    for (h in listOf("Metode", "Batas harian", "Non-anggota", "Anggota")) {
                                        Text(h, color = Color.White, fontSize = 11.sp, fontWeight = FontWeight.Bold, textAlign = TextAlign.Center, modifier = Modifier.weight(1f))
                                    }
                                }
                                val baris = listOf(
                                    listOf("Kamar aktif", "10 menit", "81000 poin/menit", "162000 poin/menit"),
                                    listOf("Naik Mic Kamar", "10 menit", "81000 poin/menit", "162000 poin/menit"),
                                    listOf("Konsumsi Kamar", "Tak terbatas", "1 poin/koin emas", "2 poin/koin emas"),
                                )
                                for (b in baris) {
                                    Row(Modifier.fillMaxWidth().padding(vertical = 10.dp)) {
                                        for (c in b) {
                                            Text(c, color = Color(0xFF6A3FD0), fontSize = 11.sp, textAlign = TextAlign.Center, modifier = Modifier.weight(1f))
                                        }
                                    }
                                }
                            }
                            Spacer(Modifier.height(8.dp))
                            Text(
                                "Note\n0. Level kamar naik dari poin gift dan poin menit naik mic. Lv.1 butuh 10.000.000 poin, lalu naik bertahap sampai Lv.55 butuh 10.000.000.000.000.000 poin.\n1. Level keanggotaan pengguna perlu ditingkatkan dari level 1 setelah bergabung dengan anggota kamar.\n2. Koin emas yang dikonsumsi di kamar perlu diubah menjadi aliran Host untuk menghitung poin secara proporsional. (Contoh: hadiah cashback 10 koin emas = 1 aliran koin)",
                                color = Color(0xFFBDBDBD), fontSize = 12.sp, lineHeight = 18.sp,
                            )
                        } else {
                            Text(jawab, color = Color(0xFFBDBDBD), fontSize = 13.sp, lineHeight = 19.sp)
                        }
                    }
                }
            }
        }
        Spacer(Modifier.height(12.dp))
        OutlineButton("Kembali") { sub = 3 }
        return
    }

    if (sub == 3 || sub == 4) {
        val judulHalaman = if (sub == 4) "Daftar Kontribusi Anggota" else "Daftar Poin Kamar"
        Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
            Text(
                "\u2039",
                color = Color.White, fontSize = 26.sp,
                modifier = Modifier.clickable { sub = if (sub == 4) 3 else 0 }.padding(horizontal = 6.dp),
            )
            Text(judulHalaman, color = Color.White, fontSize = 19.sp, modifier = Modifier.weight(1f))
            RoomLevelIcon(RoomPoin.level(poinTotal), 22.dp)
            Spacer(Modifier.width(4.dp))
            Text(
                "Lv." + RoomPoin.level(poinTotal),
                color = GoldLight, fontSize = 14.sp, fontWeight = FontWeight.Bold,
            )
            if (sub == 3) {
                Spacer(Modifier.width(10.dp))
                Box(
                    Modifier.size(26.dp).clip(CircleShape).border(1.5.dp, Color(0xFFBDBDBD), CircleShape)
                        .clickable { sub = 5 },
                    contentAlignment = Alignment.Center,
                ) { Text("?", color = Color(0xFFEDEDED), fontSize = 14.sp, fontWeight = FontWeight.Bold) }
            }
        }
        Spacer(Modifier.height(12.dp))

        if (sub == 3) {
            Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                val namaPeriode = listOf("Daftar harian", "Daftar bulanan", "Daftar Keseluruhan")
                namaPeriode.forEachIndexed { i, teks ->
                    val on = periode == i
                    Box(
                        Modifier
                            .clip(RoundedCornerShape(20.dp))
                            .background(if (on) Gold else Color(0xFF1B1B1B))
                            .clickable { periode = i }
                            .padding(horizontal = 12.dp, vertical = 8.dp),
                    ) {
                        Text(
                            teks,
                            color = if (on) Color.Black else Color(0xFFBDBDBD),
                            fontSize = 12.sp, fontWeight = if (on) FontWeight.Bold else FontWeight.Normal,
                        )
                    }
                }
            }
            Spacer(Modifier.height(14.dp))
            // Kartu room sendiri
            Box(
                Modifier.fillMaxWidth().clip(RoundedCornerShape(14.dp)).background(Color(0xFF1B1B1B)).padding(14.dp),
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    RoomLevelIcon(RoomPoin.level(poinTotal), 34.dp)
                    Spacer(Modifier.width(10.dp))
                    Column(Modifier.weight(1f)) {
                        Text(r.name, color = Color.White, fontSize = 15.sp, fontWeight = FontWeight.Bold, maxLines = 1)
                        Text(
                            "ID " + r.roomNo + "  \u00B7  Lv." + RoomPoin.level(poinTotal),
                            color = Color(0xFF9A9A9A), fontSize = 11.sp,
                        )
                        Text(
                            if (RoomPoin.level(poinTotal) >= RoomPoin.LEVEL_MAKS) {
                                "Level kamar sudah maksimal"
                            } else {
                                RoomPoin.format(RoomPoin.sisaKeLevelBerikut(poinTotal)) + " poin lagi ke Lv." +
                                    (RoomPoin.level(poinTotal) + 1)
                            },
                            color = Color(0xFF8A8A8A), fontSize = 10.sp,
                        )
                    }
                    Text(poinTotal.toString(), color = GoldLight, fontSize = 17.sp, fontWeight = FontWeight.Bold)
                }
            }
            Spacer(Modifier.height(12.dp))
            Box(
                Modifier.fillMaxWidth().clip(RoundedCornerShape(12.dp)).background(Color(0xFF151515))
                    .clickable { sub = 4 }.padding(horizontal = 14.dp, vertical = 13.dp),
            ) {
                Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                    Text("Daftar Kontribusi Anggota", color = Color(0xFFEDEDED), fontSize = 15.sp, modifier = Modifier.weight(1f))
                    Text("\u203A", color = Color(0xFF9A9A9A), fontSize = 20.sp)
                }
            }
            Spacer(Modifier.height(14.dp))
            if (muatPoin) {
                Text("Memuat peringkat...", color = Color(0xFF9A9A9A), fontSize = 13.sp)
            } else if (peringkat.isEmpty()) {
                Text("Belum ada poin kamar. Poin didapat dari gift yang dikirim di dalam room.", color = Color(0xFFBDBDBD), fontSize = 13.sp)
            } else {
                LazyColumn(Modifier.fillMaxWidth().heightIn(max = 340.dp)) {
                    items(peringkat.size) { i ->
                        val b = peringkat[i]
                        Row(Modifier.fillMaxWidth().padding(vertical = 9.dp), verticalAlignment = Alignment.CenterVertically) {
                            Text(
                                (i + 1).toString(),
                                color = if (b.roomId == r.id) GoldLight else Color(0xFF9A9A9A),
                                fontSize = 14.sp, fontWeight = FontWeight.Bold,
                                modifier = Modifier.width(30.dp),
                            )
                            RoomLevelIcon(RoomPoin.level(b.poin), 18.dp)
                            Spacer(Modifier.width(6.dp))
                            Text(
                                b.nama,
                                color = if (b.roomId == r.id) GoldLight else Color.White,
                                fontSize = 14.sp, maxLines = 1,
                                modifier = Modifier.weight(1f),
                            )
                            Text("\uD83D\uDC8E", fontSize = 12.sp)
                            Spacer(Modifier.width(4.dp))
                            Text(b.poin.toString(), color = Color(0xFFEDEDED), fontSize = 13.sp)
                        }
                    }
                }
            }
            Spacer(Modifier.height(14.dp))
            OutlineButton("Kembali") { sub = 0 }
            return
        }

        // Kontribusi anggota room ini
        if (muatPoin) {
            Text("Memuat kontribusi...", color = Color(0xFF9A9A9A), fontSize = 13.sp)
        } else if (kontribusi.isEmpty()) {
            Text("Belum ada kontribusi anggota di room ini.", color = Color(0xFFBDBDBD), fontSize = 13.sp)
        } else {
            LazyColumn(Modifier.fillMaxWidth().heightIn(max = 380.dp)) {
                items(kontribusi.size) { i ->
                    val (uid, poin) = kontribusi[i]
                    val pu = fUsers[uid]
                    Row(Modifier.fillMaxWidth().padding(vertical = 8.dp), verticalAlignment = Alignment.CenterVertically) {
                        Text((i + 1).toString(), color = Color(0xFF9A9A9A), fontSize = 13.sp, modifier = Modifier.width(26.dp))
                        Column(Modifier.weight(1f)) {
                            Text(pu?.name ?: ("UID " + uid), color = Color.White, fontSize = 14.sp, maxLines = 1)
                            val idu = pu?.userId
                            if (!idu.isNullOrBlank()) Text("ID: " + idu, color = Color(0xFF9A9A9A), fontSize = 11.sp)
                        }
                        Text(poin.toString(), color = GoldLight, fontSize = 13.sp, fontWeight = FontWeight.Bold)
                    }
                }
            }
        }
        Spacer(Modifier.height(14.dp))
        OutlineButton("Kembali") { sub = 3 }
        return
    }

    Text("Info Kamar", color = Color.White, fontSize = 22.sp)
    Spacer(Modifier.height(12.dp))
    Column(Modifier.fillMaxWidth(), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        InfoRow(
            label = "Sampul kamar",
            value = if (busy) "Mengunggah..." else "",
            onClick = { if (!busy) sumberUntuk = 1 },
            trailing = {
                if (photoBmp != null) {
                    Image(bitmap = photoBmp, contentDescription = null, modifier = Modifier.size(34.dp).clip(CircleShape), contentScale = ContentScale.Crop)
                } else {
                    Box(
                        Modifier.size(34.dp).clip(CircleShape).background(Color(0xFF2A2A2A)),
                        contentAlignment = Alignment.Center,
                    ) { Text("📷", fontSize = 14.sp) }
                }
            },
        )
        InfoRow(label = "ID Kamar", value = r.roomNo)
        InfoRow(
            label = "Nama kamar",
            value = name,
            onClick = { editNama = !editNama },
        )
        InfoRow(
            label = "Pengumuman kamar",
            value = if (ann.isBlank()) "-" else ann.take(18) + if (ann.length > 18) "..." else "",
            onClick = { editAnn = !editAnn },
        )
        InfoRow(
            label = "Tema kamar",
            value = if (busy) "Mengunggah..." else "",
            onClick = { if (!busy) sub = 2 },
            trailing = {
                if (bgBmp != null) {
                    Image(bitmap = bgBmp, contentDescription = null, modifier = Modifier.size(width = 58.dp, height = 34.dp).clip(RoundedCornerShape(6.dp)), contentScale = ContentScale.Crop)
                } else {
                    Box(
                        Modifier.size(width = 58.dp, height = 34.dp).clip(RoundedCornerShape(6.dp)).background(Color(0xFF2A2A2A)),
                        contentAlignment = Alignment.Center,
                    ) { Text("🖼", fontSize = 14.sp) }
                }
            },
        )
        InfoRow(
            label = "Level kamar",
            value = "Lv." + RoomPoin.level(poinTotal),
            onClick = { sub = 3 },
            trailing = { RoomLevelIcon(RoomPoin.level(poinTotal), 22.dp) },
        )
        InfoRow(label = "Daftar anggota", value = pengikut.size.toString() + " orang", onClick = { sub = 1 })
        InfoRow(label = "Daftar blokir", value = bans.size.toString() + " orang", onClick = { onBlacklist() })
    }

    if (editNama) {
        Spacer(Modifier.height(12.dp))
        OutlinedTextField(
            value = name,
            onValueChange = { if (it.length <= 30) name = it },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            placeholder = { Text(tr("Nama room")) },
            shape = RoundedCornerShape(12.dp),
            colors = goldFieldColors(),
        )
        Spacer(Modifier.height(8.dp))
        GoldButton(tr("Simpan nama"), enabled = name.isNotBlank() && !busy) {
            editNama = false
            simpan(null, null, name, null)
        }
    }
    if (editAnn) {
        Spacer(Modifier.height(12.dp))
        OutlinedTextField(
            value = ann,
            onValueChange = { if (it.length <= 200) ann = it },
            modifier = Modifier.fillMaxWidth(),
            minLines = 3,
            placeholder = { Text(tr("Pengumuman room")) },
            shape = RoundedCornerShape(12.dp),
            colors = goldFieldColors(),
        )
        Spacer(Modifier.height(8.dp))
        GoldButton(tr("Simpan pengumuman"), enabled = !busy) {
            editAnn = false
            simpan(null, null, null, ann)
        }
    }
    Spacer(Modifier.height(16.dp))
    OutlineButton(tr("Tutup")) { onClose() }
}

/** Pilihan sumber foto room: kamera atau album HP. */
@Composable
private fun SumberFotoDialog(onTutup: () -> Unit, onKamera: () -> Unit, onAlbum: () -> Unit) {
    Dialog(onDismissRequest = onTutup) {
        Column(
            Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(14.dp))
                .background(Color.White)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp),
        ) {
            Box(
                Modifier.fillMaxWidth().clip(RoundedCornerShape(10.dp)).background(Color(0xFFFF8A00))
                    .clickable { onKamera() }.padding(vertical = 14.dp),
                contentAlignment = Alignment.Center,
            ) { Text("Ambil foto", color = Color.White, fontSize = 16.sp, fontWeight = FontWeight.Bold) }
            Box(
                Modifier.fillMaxWidth().clip(RoundedCornerShape(10.dp)).background(Color(0xFFFF8A00))
                    .clickable { onAlbum() }.padding(vertical = 14.dp),
                contentAlignment = Alignment.Center,
            ) { Text("Pilih dari album hp", color = Color.White, fontSize = 16.sp, fontWeight = FontWeight.Bold) }
        }
    }
}

/** Kartu tema pada halaman Tema kamar. */
@Composable
private fun TemaTile(
    modifier: Modifier = Modifier,
    label: String,
    ket: String,
    aktif: Boolean,
    bitmap: ImageBitmap?,
    plus: Boolean = false,
    onClick: () -> Unit,
) {
    Column(modifier) {
        Box(
            Modifier
                .fillMaxWidth()
                .height(104.dp)
                .clip(RoundedCornerShape(12.dp))
                .background(Color(0xFF1B1B1B))
                .border(
                    if (aktif) 2.dp else 1.dp,
                    if (aktif) Gold else Color(0xFF2E2E2E),
                    RoundedCornerShape(12.dp),
                )
                .clickable { onClick() },
            contentAlignment = Alignment.Center,
        ) {
            if (bitmap != null) {
                Image(bitmap = bitmap, contentDescription = null, modifier = Modifier.fillMaxSize(), contentScale = ContentScale.Crop)
            } else if (plus) {
                Text("+", color = Color(0xFFBDBDBD), fontSize = 32.sp)
            }
            if (aktif) {
                Box(
                    Modifier.align(Alignment.BottomEnd).padding(6.dp).size(20.dp).clip(CircleShape).background(Gold),
                    contentAlignment = Alignment.Center,
                ) { Text("\u2713", color = Color.Black, fontSize = 12.sp) }
            }
        }
        Spacer(Modifier.height(5.dp))
        Text(label, color = Color(0xFFEDEDED), fontSize = 12.sp, maxLines = 1)
        Text(ket, color = Color(0xFF9A9A9A), fontSize = 11.sp, maxLines = 1)
    }
}

/** Ikon Blok Efek digambar sendiri (gaya CSS): kotak gradasi dengan kilau. */
@Composable
private fun BlokEfekIcon() {
    Box(
        Modifier
            .size(30.dp)
            .clip(RoundedCornerShape(8.dp))
            .background(
                androidx.compose.ui.graphics.Brush.linearGradient(
                    listOf(Color(0xFF6A5BFF), Color(0xFF2BD9C4)),
                ),
            ),
        contentAlignment = Alignment.Center,
    ) {
        Text("\u2726", color = Color.White, fontSize = 17.sp)
    }
}

/** Satu baris gaya "Info Kamar": label di kiri, nilai dan panah di kanan. */
@Composable
private fun InfoRow(
    label: String,
    value: String = "",
    onClick: (() -> Unit)? = null,
    trailing: (@Composable () -> Unit)? = null,
) {
    Row(
        Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(12.dp))
            .background(Color(0xFF151515))
            .then(if (onClick != null) Modifier.clickable { onClick() } else Modifier)
            .padding(horizontal = 14.dp, vertical = 10.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Text(label, color = Color(0xFFEDEDED), fontSize = 15.sp, modifier = Modifier.weight(1f))
        if (value.isNotBlank()) {
            Text(value, color = Color(0xFF9A9A9A), fontSize = 14.sp, maxLines = 1)
        }
        if (trailing != null) {
            Spacer(Modifier.width(8.dp))
            trailing()
        }
        if (onClick != null) {
            Text("\u203A", color = Color(0xFF9A9A9A), fontSize = 20.sp, modifier = Modifier.padding(start = 8.dp))
        }
    }
}

@Composable
private fun RmLock(r: RoomInfo, onClose: () -> Unit) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    var pw by remember { mutableStateOf("") }
    Text(if (r.locked) "Kamar terkunci" else "Kunci kamar dengan password", color = Color.White, fontSize = 20.sp)
    Spacer(Modifier.height(12.dp))
    if (r.locked) {
        Text(tr("Pengguna lain harus memasukkan password untuk masuk."), color = Color(0xFF9A9A9A), fontSize = 13.sp)
        Spacer(Modifier.height(16.dp))
        // Owner bisa membuka kunci room kapan saja dari dalam room.
        GoldButton(tr("Buka kunci room")) {
            scope.launch {
                val e = RoomRepo.setLock(r.id, null)
                Toast.makeText(context, e ?: "Kunci room dibuka, room kembali publik", Toast.LENGTH_SHORT).show()
                if (e == null) onClose()
            }
        }
        Spacer(Modifier.height(18.dp))
        Text(tr("Ganti password"), color = Color.White, fontSize = 15.sp)
        Spacer(Modifier.height(8.dp))
        OutlinedTextField(
            value = pw,
            onValueChange = { pw = it },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            placeholder = { Text(tr("Password baru (min. 4 karakter)")) },
            visualTransformation = PasswordVisualTransformation(),
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
            shape = RoundedCornerShape(12.dp),
            colors = goldFieldColors(),
        )
        Spacer(Modifier.height(12.dp))
        GoldButton(tr("Simpan password baru"), enabled = pw.length >= 4) {
            scope.launch {
                val e = RoomRepo.setLock(r.id, pw)
                Toast.makeText(context, e ?: "Password room diperbarui", Toast.LENGTH_SHORT).show()
                if (e == null) onClose()
            }
        }
    } else {
        OutlinedTextField(
            value = pw,
            onValueChange = { pw = it },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            placeholder = { Text(tr("Password (min. 4 karakter)")) },
            visualTransformation = PasswordVisualTransformation(),
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
            shape = RoundedCornerShape(12.dp),
            colors = goldFieldColors(),
        )
        Spacer(Modifier.height(16.dp))
        GoldButton(tr("Kunci kamar"), enabled = pw.length >= 4) {
            scope.launch {
                val e = RoomRepo.setLock(r.id, pw)
                Toast.makeText(context, e ?: "Kamar dikunci", Toast.LENGTH_SHORT).show()
                if (e == null) onClose()
            }
        }
    }
}

/** Bulatan kecil mengambang saat room diminimalkan. Bisa digeser, klik untuk masuk lagi. */
@Composable
fun FloatingRoomBubble(room: RoomInfo, onClick: () -> Unit) {
    // Batas geser dihitung dari UKURAN CONTAINER sebenarnya (BoxWithConstraints),
    // bukan screenWidthDp dari Configuration yang bisa beda dengan ruang nyata.
    // Ukuran ikon ikut mengecil di HP sempit dan selalu diberi jarak tepi,
    // jadi tidak ada bagian yang terpotong di device mana pun.
    BoxWithConstraints(Modifier.fillMaxSize()) {
        val density = LocalDensity.current
        val layarSempit = maxWidth < 340.dp
        val ukuran = if (layarSempit) 46.dp else 52.dp
        val tepi = 10.dp

        val ukuranPx = with(density) { ukuran.toPx() }
        val tepiPx = with(density) { tepi.toPx() }
        val lebarPx = with(density) { maxWidth.toPx() }
        val tinggiPx = with(density) { maxHeight.toPx() }
        val atasPx = WindowInsets.statusBars.getTop(density).toFloat()
        val bawahPx = WindowInsets.navigationBars.getBottom(density).toFloat()

        val batasKanan = (lebarPx - ukuranPx - tepiPx).coerceAtLeast(tepiPx)
        val batasBawah = (tinggiPx - bawahPx - ukuranPx - tepiPx).coerceAtLeast(atasPx + tepiPx)
        val batasAtas = atasPx + tepiPx

        // null = belum digeser, jadi posisi awal selalu mengikuti layar terkini.
        var geserX by remember { mutableStateOf<Float?>(null) }
        var geserY by remember { mutableStateOf<Float?>(null) }
        val x = (geserX ?: (batasKanan - tepiPx * 2f)).coerceIn(tepiPx, batasKanan)
        val y = (geserY ?: (batasAtas + (batasBawah - batasAtas) * 0.55f)).coerceIn(batasAtas, batasBawah)

        val bmp = rememberRoomPhoto(room)
        Box(
            Modifier
                .offset { IntOffset(x.roundToInt(), y.roundToInt()) }
                .size(ukuran)
                .clip(CircleShape)
                .background(Color(0xFF1E1E1E))
                .border(2.dp, Gold, CircleShape)
                .pointerInput(batasKanan, batasAtas, batasBawah) {
                    detectDragGestures { change, drag ->
                        change.consume()
                        geserX = (x + drag.x).coerceIn(tepiPx, batasKanan)
                        geserY = (y + drag.y).coerceIn(batasAtas, batasBawah)
                    }
                }
                .clickable(onClick = onClick),
            contentAlignment = Alignment.Center,
        ) {
            if (bmp != null) {
                Image(
                    bitmap = bmp,
                    contentDescription = null,
                    contentScale = ContentScale.Crop,
                    modifier = Modifier.fillMaxSize(),
                )
            } else {
                Text("🎙", fontSize = if (layarSempit) 20.sp else 24.sp)
            }
        }
    }
}

/** Baris chat publik: avatar, nama, level, lalu isi pesan. Klik avatar/nama untuk buka profil. */
@Composable
@OptIn(androidx.compose.foundation.layout.ExperimentalLayoutApi::class)
private fun RmChatRow(m: RoomMsg, myUid: String, onProfile: (String) -> Unit) {
    // FIX avatar kosong di chat room: pesan SENDIRI langsung pakai profil lokal
    // (foto, nama, frame, level) tanpa nunggu jaringan; orang lain dari cache.
    var u by remember(m.uid) {
        mutableStateOf(UserCache.peek(m.uid) ?: if (m.uid == myUid) UserCache.meLocal(m.uid) else null)
    }
    LaunchedEffect(m.uid) { if (u == null || u?.avatarB64 == null) u = UserCache.byUid(m.uid) ?: u }
    val shownName = u?.name?.takeIf { it.isNotBlank() } ?: m.name
    Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.Top) {
        PublicAvatarFramed(u, 38.dp, fallback = shownName, modifier = Modifier.clickable { onProfile(m.uid) })
        Spacer(Modifier.width(8.dp))
        Column(Modifier.weight(1f, fill = false)) {
            Row(Modifier.clickable { onProfile(m.uid) }, verticalAlignment = Alignment.CenterVertically) {
                PeranRoomIcon(m.uid, ukuran = 14.dp)
                if (LocalPeranRoom.current.peranDari(m.uid) != PeranRoom.BIASA) Spacer(Modifier.width(4.dp))
                VipNameText(
                    shownName,
                    u?.vip ?: 0,
                    u?.vipUntil ?: 0L,
                    color = GoldLight,
                    fontWeight = FontWeight.Bold,
                    fontSize = 13.sp,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                    modifier = Modifier.widthIn(max = 160.dp),
                )
                Spacer(Modifier.width(6.dp))
                LevelBadge(userLevel(u))
                u?.let {
                    if (vipActive(it.vip, it.vipUntil)) {
                        Spacer(Modifier.width(4.dp))
                        VipTag(it.vip)
                    }
                    // ID unik (termasuk kiriman panel): gambarnya ikut tampil di
                    // baris nama chat, sama seperti di sheet dan profil.
                    val asetId = runCatching { StoreCatalog.find(it.uidItem.ifBlank { null })?.asset }.getOrNull()
                    if (asetId != null) {
                        Spacer(Modifier.width(4.dp))
                        UidUnikId(asetId, 13.dp)
                    }
                }
            }
            // Lencana ditaruh di baris sendiri dan membungkus ke bawah, jadi
            // saat lencana banyak (atau layar sempit) tidak ada yang terpotong.
            if (LENCANA_AKTIF) {
                val lencana = medalIdList(u?.badge.orEmpty()).mapNotNull { findItem(it) }
                if (lencana.isNotEmpty()) {
                    Spacer(Modifier.height(2.dp))
                    androidx.compose.foundation.layout.FlowRow(
                        Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(4.dp, Alignment.Start),
                        verticalArrangement = Arrangement.spacedBy(3.dp),
                    ) {
                        lencana.forEach { StoreBadgeIcon(it, 24.dp) }
                    }
                }
            }
            u?.let {
                if (it.medals.isNotBlank()) {
                    Spacer(Modifier.height(2.dp))
                    UserMedals(it.medals, 18.dp, Modifier.fillMaxWidth(), rataKiri = true)
                }
            }
            Spacer(Modifier.height(3.dp))
            val bTier = vipBubbleTier(u?.bubble, u?.vip ?: 0, u?.vipUntil ?: 0L)
            val bAsset = if (bTier in 1..9) VipAssets.get(bTier, "bubble") else null
            Box(
                Modifier.widthIn(max = 280.dp).clip(RoundedCornerShape(12.dp))
                .then(if (bAsset == null) Modifier.background(bubbleColor(u?.bubble)) else Modifier),
            ) {
                if (bAsset != null) {
                    androidx.compose.runtime.key(bTier) {
                        VipMedia(bAsset, Modifier.matchParentSize(), contentScale = androidx.compose.ui.layout.ContentScale.FillBounds)
                    }
                }
                val salinTeks = IngatSalin(m.text)
                if (m.text.startsWith("\uD83C\uDFB0LUCKY:")) {
                    val angka = m.text.removePrefix("\uD83C\uDFB0LUCKY:").trim()
                    Row(
                        Modifier
                            .clip(RoundedCornerShape(12.dp))
                            .background(
                                androidx.compose.ui.graphics.Brush.verticalGradient(
                                    listOf(Color(0xFF9B4A22), Color(0xFF5A2410)),
                                ),
                            )
                            .border(1.5.dp, Color(0xFFE8A04A), RoundedCornerShape(12.dp))
                            .padding(horizontal = 14.dp, vertical = 8.dp),
                        verticalAlignment = Alignment.CenterVertically,
                    ) {
                        Text("Lucky number", color = Color(0xFFFFE9C7), fontSize = 15.sp, fontWeight = FontWeight.Bold)
                        Spacer(Modifier.width(8.dp))
                        Text(angka, color = Color(0xFFFFC857), fontSize = 24.sp, fontWeight = FontWeight.ExtraBold)
                    }
                } else Text(
                    m.text, color = Color.White, fontSize = 14.sp,
                    modifier = Modifier.pointerInput(m.text) {
                        detectTapGestures(onLongPress = { salinTeks() })
                    }
                        .padding(horizontal = 12.dp, vertical = 8.dp),
                )
            }
        }
    }
}

/** Pesan chat berisi gambar. Ketuk gambar untuk melihat ukuran penuh. */
@Composable
private fun RmPhotoRow(m: RoomMsg, myUid: String, onProfile: (String) -> Unit, onOpen: (String) -> Unit) {
    var u by remember(m.uid) {
        mutableStateOf(UserCache.peek(m.uid) ?: if (m.uid == myUid) UserCache.meLocal(m.uid) else null)
    }
    LaunchedEffect(m.uid) { if (u == null || u?.avatarB64 == null) u = UserCache.byUid(m.uid) ?: u }
    val shownName = u?.name?.takeIf { it.isNotBlank() } ?: m.name
    Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.Top) {
        PublicAvatarFramed(u, 38.dp, fallback = shownName, modifier = Modifier.clickable { onProfile(m.uid) })
        Spacer(Modifier.width(8.dp))
        Column(Modifier.weight(1f, fill = false)) {
            Row(Modifier.clickable { onProfile(m.uid) }, verticalAlignment = Alignment.CenterVertically) {
                PeranRoomIcon(m.uid, ukuran = 14.dp)
                if (LocalPeranRoom.current.peranDari(m.uid) != PeranRoom.BIASA) Spacer(Modifier.width(4.dp))
                VipNameText(
                    shownName,
                    u?.vip ?: 0,
                    u?.vipUntil ?: 0L,
                    color = GoldLight,
                    fontWeight = FontWeight.Bold,
                    fontSize = 13.sp,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                    modifier = Modifier.widthIn(max = 160.dp),
                )
                Spacer(Modifier.width(6.dp))
                LevelBadge(userLevel(u))
            }
            Spacer(Modifier.height(3.dp))
            Box(
                Modifier
                    .widthIn(max = 220.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .background(Color(0xFF1E1E1E))
                    .border(1.dp, Gold.copy(alpha = 0.35f), RoundedCornerShape(12.dp))
                    .clickable { onOpen(m.img) },
            ) {
                AsyncImage(
                    model = m.img,
                    contentDescription = tr("Gambar dari $shownName"),
                    modifier = Modifier.widthIn(max = 220.dp).heightIn(max = 260.dp),
                    contentScale = ContentScale.FillWidth,
                )
            }
            if (m.text.isNotBlank()) {
                Spacer(Modifier.height(3.dp))
                Text(m.text, color = Color.White, fontSize = 13.sp)
            }
        }
    }
}

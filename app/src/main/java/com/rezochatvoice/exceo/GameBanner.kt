package com.rezochatvoice.exceo

import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import kotlinx.coroutines.delay

/**
 * Banner pemenang game (Greedy King & Crazy Fruit).
 *
 * Server VPS menulis setiap kemenangan Top 1/2/3 ke Realtime Database
 * (gameWinFeed). Semua orang yang online mendengarkan simpul itu, jadi banner
 * terbang muncul sama di dalam room maupun di luar room (tab Party, Moment,
 * Family, Pesan, Saya, dan halaman lain).
 *
 * Animasi: masuk dari kanan, berhenti di tengah 3 detik, lalu keluar ke kiri.
 * Kalau ada beberapa pemenang, banner tampil bergantian lewat antrean.
 */
object GameBanner {
    private const val NODE = "gameWinFeed"

    /** Gambar pelat banner dari panel (betCfg/gameWinBanner). Kosong = pakai bawaan. */
    @Volatile var bannerUrl: String = ""

    class Item(
        val id: String,
        val name: String,
        val av: String,
        val amount: Long,
        val game: String,
        val pos: Int,
        val ts: Long,
    )

    private val antre = mutableStateListOf<Item>()
    private val pernah = mutableSetOf<String>()
    private var mulai = false
    private var pollMulai = false
    private var regBanner: Reg? = null

    /** Alamat server VPS sendiri (jalur cadangan banner). */
    private const val VPS = "https://viza.43-156-99-4.sslip.io"

    private fun tandai(id: String) {
        pernah.add(id)
        if (pernah.size > 300) {
            val buang = pernah.toList().take(150)
            pernah.removeAll(buang.toSet())
        }
    }

    /** Saklar efek game di blok efek room. Kalau dimatikan, banner tidak muncul. */
    @Volatile var aktif: Boolean = true

    /** Simpan saklar dari blok efek room supaya berlaku juga di luar room. */
    fun simpanSaklar(ctx: android.content.Context, aktifkan: Boolean) {
        aktif = aktifkan
        try {
            ctx.getSharedPreferences("fx_global", android.content.Context.MODE_PRIVATE)
                .edit().putBoolean("game", aktifkan).apply()
        } catch (e: Exception) {
        }
    }

    /** Baca saklar terakhir yang dipilih di blok efek. */
    fun muatSaklar(ctx: android.content.Context) {
        try {
            aktif = ctx.getSharedPreferences("fx_global", android.content.Context.MODE_PRIVATE)
                .getBoolean("game", true)
        } catch (e: Exception) {
            aktif = true
        }
    }

    /** Buang antrean (dipakai saat efek game dimatikan). */
    fun kosongkan() {
        antre.clear()
    }

    /** Mulai mendengar kemenangan game dari server. */
    fun dengarkan() {
        if (mulai) return
        mulai = true
        val baca: (com.google.firebase.database.DataSnapshot) -> Unit = { snap ->
            val baru = ArrayList<Item>()
            for (c in snap.children) {
                val id = c.key
                if (id == null) {
                    continue
                }
                if (pernah.contains(id)) {
                    continue
                }
                val ts = (c.child("ts").value as? Number)?.toLong() ?: 0L
                tandai(id)
                val basi = ts > 0L && System.currentTimeMillis() - ts > 30_000L
                val amount = (c.child("amount").value as? Number)?.toLong() ?: 0L
                if (basi) {
                    continue
                }
                if (amount <= 0L) {
                    continue
                }
                baru.add(
                    Item(
                        id = id,
                        name = c.child("name").getValue(String::class.java) ?: "Player",
                        av = c.child("av").getValue(String::class.java) ?: "",
                        amount = amount,
                        game = (c.child("game").getValue(String::class.java) ?: "").lowercase(),
                        pos = (c.child("pos").value as? Number)?.toInt() ?: 0,
                        ts = ts,
                    ),
                )
            }
            baru.sortBy { it.ts }
            for (x in baru) {
                antre.add(x)
            }
        }
        try {
            Rtdb.listen(Rtdb.ref(NODE).limitToLast(15), null, baca)
        } catch (e: Exception) {
        }
        // Jalur kedua lewat server VPS: tetap jalan walau aturan RTDB menolak.
        mulaiPoll()
    }

    /** Masukkan satu kejadian ke antrean (dipakai RTDB dan jalur cadangan VPS). */
    private fun masukAntre(
        id: String,
        nama: String,
        foto: String,
        jumlah: Long,
        game: String,
        pos: Int,
        ts: Long,
    ) {
        if (id.isBlank()) return
        if (pernah.contains(id)) return
        tandai(id)
        if (jumlah <= 0L) return
        // Ronde game hanya sebentar: kejadian lebih tua dari 25 detik dibuang
        // supaya banner tidak memutar pemenang ronde yang sudah lewat.
        if (ts > 0L && System.currentTimeMillis() - ts > 25_000L) return
        antre.add(
            Item(
                id = id,
                name = nama.ifBlank { "Player" },
                av = foto,
                amount = jumlah,
                game = game.lowercase(),
                pos = pos,
                ts = ts,
            ),
        )
    }

    /**
     * Jalur cadangan: tanya server VPS kalau aturan baca RTDB belum diperbarui,
     * supaya banner pemenang game tetap terbawa ke HP.
     */
    fun mulaiPoll() {
        if (pollMulai) return
        pollMulai = true
        val t = Thread {
            var sejak = 0L
            while (pollMulai) {
                try {
                    val uid = com.google.firebase.auth.FirebaseAuth.getInstance().currentUser?.uid
                    if (uid.isNullOrBlank()) {
                        Thread.sleep(3000L)
                        continue
                    }
                    var token = ""
                    try {
                        token = com.google.firebase.auth.FirebaseAuth.getInstance()
                            .currentUser?.getIdToken(false)?.getResult()?.token.orEmpty()
                    } catch (e: Exception) {
                        token = ""
                    }
                    if (token.isBlank()) {
                        Thread.sleep(3000L)
                        continue
                    }
                    if (sejak <= 0L) sejak = System.currentTimeMillis() - 20_000L
                    val alamat = VPS + "/gamewin?t=" + java.net.URLEncoder.encode(token, "UTF-8") +
                        "&sejak=" + sejak
                    val conn = (java.net.URL(alamat).openConnection() as java.net.HttpURLConnection).apply {
                        connectTimeout = 8000
                        readTimeout = 8000
                        setRequestProperty("Cache-Control", "no-cache")
                    }
                    val kode = conn.responseCode
                    val teks = if (kode in 200..299) {
                        conn.inputStream.bufferedReader().use { it.readText() }
                    } else {
                        conn.errorStream?.bufferedReader()?.use { it.readText() }.orEmpty()
                    }
                    if (kode in 200..299) {
                        val o = org.json.JSONObject(teks)
                        val arr = o.optJSONArray("items")
                        if (arr != null) {
                            for (i in 0 until arr.length()) {
                                val it = arr.optJSONObject(i) ?: continue
                                val ts = it.optLong("ts", 0L)
                                if (ts > sejak) sejak = ts
                                masukAntre(
                                    id = it.optString("id"),
                                    nama = it.optString("name"),
                                    foto = it.optString("av"),
                                    jumlah = it.optLong("amount", 0L),
                                    game = it.optString("game"),
                                    pos = it.optInt("pos", 0),
                                    ts = ts,
                                )
                            }
                        }
                    }
                } catch (e: InterruptedException) {
                    pollMulai = false
                } catch (e: Exception) {
                    // Server belum menjawab: coba lagi nanti, diam saja.
                }
                try {
                    Thread.sleep(3000L)
                } catch (e: InterruptedException) {
                    pollMulai = false
                }
            }
        }
        t.isDaemon = true
        t.start()
    }

    /** Ambil satu banner dari antrean. */
    fun ambil(): Item? = if (antre.isEmpty()) null else antre.removeAt(0)

    /** Baca gambar pelat banner yang diunggah lewat panel. */
    fun muatBanner() {
        if (regBanner != null) return
        try {
            regBanner = Rtdb.listen(Rtdb.ref("betCfg/gameWinBanner")) { snap ->
                bannerUrl = snap.getValue(String::class.java)?.trim().orEmpty()
            }
        } catch (e: Exception) {
        }
    }

}

/** Angka penuh bergaya 1.200.000.000. */
private fun fmtPenuh(n: Long): String {
    val s = Math.abs(n).toString()
    val out = StringBuilder()
    for ((i, c) in s.withIndex()) {
        if (i > 0 && (s.length - i) % 3 == 0) out.append('.')
        out.append(c)
    }
    return (if (n < 0) "-" else "") + out.toString()
}

/**
 * Tuan rumah banner: taruh sekali di lapisan paling atas layar utama supaya
 * banner terlihat dari halaman mana pun, termasuk di dalam room.
 */
@Composable
fun GameWinBannerHost(modifier: Modifier = Modifier) {
    val ctx = androidx.compose.ui.platform.LocalContext.current
    LaunchedEffect(Unit) {
        GameBanner.muatSaklar(ctx)
        GameBanner.dengarkan()
        GameBanner.muatBanner()
    }
    var item by remember { mutableStateOf<GameBanner.Item?>(null) }
    val geser = remember { Animatable(1f) }

    LaunchedEffect(Unit) {
        while (true) {
            if (!GameBanner.aktif) {
                // Efek game dimatikan di blok efek: banner tidak ditampilkan.
                GameBanner.kosongkan()
                item = null
                delay(400)
                continue
            }
            if (item != null) {
                delay(200)
                continue
            }
            var berikut = GameBanner.ambil()
            // Buang kejadian ronde yang sudah lewat (lebih dari 25 detik): banner
            // hanya untuk permainan yang sedang berjalan, bukan riwayat.
            while (berikut != null && berikut.ts > 0L &&
                System.currentTimeMillis() - berikut.ts > 25_000L
            ) {
                berikut = GameBanner.ambil()
            }
            if (berikut == null) {
                delay(350)
                continue
            }
            item = berikut
            geser.snapTo(1f)
            geser.animateTo(0f, tween(durationMillis = 360))
            delay(3000)
            geser.animateTo(-1f, tween(durationMillis = 400))
            item = null
        }
    }

    val e = item ?: return
    val layar = with(LocalConfiguration.current) { screenWidthDp }.dp

    Box(
        modifier
            .fillMaxWidth()
            .statusBarsPadding()
            .padding(horizontal = 10.dp, vertical = 6.dp),
        contentAlignment = Alignment.TopCenter,
    ) {
        val pelat = GameBanner.bannerUrl.isNotBlank()
        Box(
            Modifier
                .fillMaxWidth()
                .offset(x = layar * geser.value)
                .height(78.dp)
                .then(
                    if (pelat) Modifier
                    else Modifier
                        .clip(RoundedCornerShape(16.dp))
                        .background(
                            Brush.horizontalGradient(
                                listOf(Color(0xFF4A1370), Color(0xFF7B1E8B), Color(0xFF3A0B5C)),
                            ),
                        )
                        .border(1.5.dp, Color(0xFFFFC94D), RoundedCornerShape(16.dp)),
                ),
        ) {
            // Pelat emas dari panel dipakai apa adanya sebagai latar banner.
            if (pelat) {
                AsyncImage(
                    model = GameBanner.bannerUrl,
                    contentDescription = null,
                    contentScale = ContentScale.FillBounds,
                    modifier = Modifier.matchParentSize(),
                )
            }
            // Isi banner diletakkan dengan ukuran proporsional terhadap lebar pelat,
            // jadi foto pas di lingkaran kiri dan nama tidak menimpa tepi pelat pada
            // ukuran layar apa pun.
            BoxWithConstraints(Modifier.matchParentSize()) {
                val lebar = maxWidth
                val tinggi = maxHeight
                // Pelat emas punya ujung berhias di kiri/kanan dan mahkota di tengah atas.
                // Isi dipasang di "badan" pelat (sekitar 14% sampai 90% lebar, 24% sampai 82% tinggi).
                val foto = (tinggi.value * 0.60f).dp
                val kiriFoto = (lebar.value * 0.075f).dp
                val tengahY = (tinggi.value * 0.05f).dp
                val mulaiNama = kiriFoto + foto + (lebar.value * 0.025f).dp
                val kananIsi = (lebar.value * 0.095f).dp
                val lebarKanan = (lebar.value * 0.42f).dp
                // Kiri: foto pemenang, masuk ke tengah pelat.
                Box(
                    Modifier
                        .align(Alignment.CenterStart)
                        .padding(start = kiriFoto, top = tengahY)
                        .size(foto),
                ) {
                    Box(
                        Modifier
                            .fillMaxSize()
                            .clip(CircleShape)
                            .background(Color(0x55000000))
                            .border(2.dp, Color(0xFFFFF1B8), CircleShape),
                        contentAlignment = Alignment.Center,
                    ) {
                        if (e.av.isNotBlank() && e.av.startsWith("http")) {
                            AsyncImage(
                                model = e.av,
                                contentDescription = e.name,
                                contentScale = ContentScale.Crop,
                                modifier = Modifier.fillMaxSize().clip(CircleShape),
                            )
                        } else {
                            Text(
                                e.name.take(1).uppercase(),
                                color = Color.White, fontWeight = FontWeight.Bold, fontSize = 18.sp,
                            )
                        }
                    }
                }
                // Tengah: nama dan peringkat di badan pelat, turun dari mahkota atas.
                Column(
                    Modifier
                        .align(Alignment.CenterStart)
                        .padding(start = mulaiNama, top = tengahY)
                        .width(lebar * 0.30f),
                    verticalArrangement = Arrangement.Center,
                ) {
                    Text(
                        e.name,
                        color = Color(0xFF4A2400),
                        fontWeight = FontWeight.ExtraBold,
                        fontSize = 14.sp,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis,
                    )
                    Text(
                        "TOP ${if (e.pos in 1..3) e.pos else 1}",
                        color = Color(0xFF7A3F00),
                        fontWeight = FontWeight.Bold,
                        fontSize = 12.sp,
                    )
                }
                // Kanan: ikon koin + coin menang besar, ikon game kecil di bawahnya.
                Column(
                    Modifier
                        .align(Alignment.CenterEnd)
                        .padding(end = kananIsi, top = tengahY)
                        .width(lebarKanan),
                    horizontalAlignment = Alignment.End,
                    verticalArrangement = Arrangement.Center,
                ) {
                    val angkanya = fmtPenuh(e.amount)
                    Row(
                        Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.End,
                        verticalAlignment = Alignment.CenterVertically,
                    ) {
                        Text(
                            angkanya,
                            color = Color(0xFF4A2400),
                            fontWeight = FontWeight.ExtraBold,
                            fontSize = if (angkanya.length > 14) 13.sp else if (angkanya.length > 11) 15.sp else 17.sp,
                            textAlign = TextAlign.End,
                            maxLines = 1,
                            overflow = TextOverflow.Clip,
                            modifier = Modifier.weight(1f, fill = false),
                        )
                        Spacer(Modifier.width(4.dp))
                        // Ikon koin di sebelah angka.
                        Box(
                            Modifier
                                .size(18.dp)
                                .clip(CircleShape)
                                .background(
                                    Brush.verticalGradient(
                                        listOf(Color(0xFFFFE680), Color(0xFFE09A00)),
                                    ),
                                )
                                .border(1.5.dp, Color(0xFFB86E00), CircleShape),
                            contentAlignment = Alignment.Center,
                        ) {
                            Text("$", color = Color(0xFF7A3F00), fontWeight = FontWeight.ExtraBold, fontSize = 11.sp)
                        }
                    }
                    Box(
                        Modifier.size((tinggi.value * 0.22f).dp).clip(CircleShape),
                        contentAlignment = Alignment.Center,
                    ) {
                        val ikon = if (e.game.contains("fruit")) {
                            R.drawable.ic_game_fruit
                        } else {
                            R.drawable.ic_game_greedy
                        }
                        Image(
                            painter = painterResource(ikon),
                            contentDescription = e.game,
                            contentScale = ContentScale.Crop,
                            modifier = Modifier.fillMaxSize().clip(CircleShape),
                        )
                    }
                }
            }
        }
    }
}

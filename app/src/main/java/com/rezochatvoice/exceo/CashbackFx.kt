package com.rezochatvoice.exceo

import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.foundation.border
import androidx.compose.ui.layout.onGloballyPositioned
import androidx.compose.ui.layout.positionInRoot
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.IntSize
import androidx.compose.ui.draw.clip
import androidx.compose.foundation.layout.padding
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.delay
import kotlin.math.PI
import kotlin.math.sin

/**
 * Satu kiriman gift yang terbang ke avatar penerima.
 * Diambil dari "giftFly/{roomId}" di Realtime Database.
 */
data class GiftFly(
    val from: String,
    val toUid: String,
    val toName: String,
    val seat: Int,
    val emoji: String,
    val price: Long,
    val cb: Long,
    val pecahan: Long,
    val parts: List<Long> = emptyList(),
    val asset: String,
    val mediaUrl: String = "",
    val mediaType: String = "",
    val mult: Int = 0,
    val combo: Int = 0,
    val gname: String = "",
    /** true hanya untuk gift yang ditandai Cashback di panel. */
    val cbOn: Boolean = false,
    val jp: Boolean,
    val ts: Long,
    /** Harga satu gift (untuk teks "N x harga koin"). */
    val unit: Long = 0L,
    /** Jumlah gift yang dikirim. */
    val cnt: Int = 0,
    /** Total nilai gift = harga x jumlah. */
    val total: Long = 0L,
    /** Kelipatan menang terhadap harga satuan (badge "x100"). */
    val kelipatan: Int = 0,
    /** Tingkat pemenang dari server: Rookie / Pro / Highest. */
    val tingkat: String = "",
)

/**
 * Efek gift terbang: gift meluncur dari sisi pengirim menuju kursi mic penerima
 * (atau ikon user online kalau penerima tidak di mic), lalu pecahan cashback
 * muncul di titik itu. Kalau nilainya besar, banner JP tampil di atas.
 */
@Composable
fun GiftFlyOverlay(roomId: String, seatPoints: Map<Int, Offset>) {
    val flights = remember { mutableStateListOf<GiftFly>() }
    var lastKey by remember { mutableStateOf<String?>(null) }
    var origin by remember { mutableStateOf(Offset.Zero) }
    var box by remember { mutableStateOf(IntSize.Zero) }

    DisposableEffect(roomId) {
        var isInit = true
        val reg = Rtdb.listen(Rtdb.ref("giftFly/$roomId").limitToLast(1)) { snap ->
            val c = snap.children.lastOrNull()
            val ts = c?.child("ts")?.getValue(Long::class.java) ?: 0L
            val key = c?.key
            if (isInit) {
                isInit = false
                // Saat baru masuk room: gift lama (lebih dari 6 detik) tidak diputar.
                lastKey = if (ts > System.currentTimeMillis() - 6000L) null else key
                return@listen
            }
            if (c != null && key != null && key != lastKey) {
                lastKey = key
                flights.add(
                    GiftFly(
                    from = c.child("from").getValue(String::class.java) ?: "",
                    toUid = c.child("toUid").getValue(String::class.java) ?: "",
                    toName = c.child("toName").getValue(String::class.java) ?: "",
                    seat = (c.child("seat").getValue(Long::class.java) ?: -1L).toInt(),
                    emoji = c.child("emoji").getValue(String::class.java) ?: "🎁",
                    price = c.child("price").getValue(Long::class.java) ?: 0L,
                    cb = c.child("cb").getValue(Long::class.java) ?: 0L,
                    pecahan = c.child("pecahan").getValue(Long::class.java) ?: 0L,
                    parts = (c.child("parts").getValue(String::class.java) ?: "")
                        .split(",").mapNotNull { it.trim().toLongOrNull() }.filter { it > 0L },
                    asset = c.child("asset").getValue(String::class.java) ?: "",
                    mediaUrl = c.child("mediaUrl").getValue(String::class.java) ?: "",
                    mediaType = c.child("mediaType").getValue(String::class.java) ?: "",
                    mult = (c.child("mult").getValue(Long::class.java) ?: 0L).toInt(),
                    combo = (c.child("combo").getValue(Long::class.java) ?: 0L).toInt(),
                    gname = c.child("gname").getValue(String::class.java)
                        ?: c.child("gift").getValue(String::class.java) ?: "",
                    jp = c.child("jp").getValue(Boolean::class.java) ?: false,
                    cbOn = c.child("cbOn").getValue(Boolean::class.java) ?: false,
                    ts = ts,
                    unit = c.child("unit").getValue(Long::class.java) ?: 0L,
                    cnt = (c.child("cnt").getValue(Long::class.java) ?: 0L).toInt(),
                    total = c.child("total").getValue(Long::class.java) ?: 0L,
                    kelipatan = (c.child("kl").getValue(Long::class.java) ?: 0L).toInt(),
                    tingkat = c.child("tkt").getValue(String::class.java) ?: "",
                    ),
                )
            }
        }
        onDispose { reg.remove() }
    }

    Box(
        Modifier
            .fillMaxSize()
            .onGloballyPositioned {
                origin = it.positionInRoot()
                box = it.size
            },
    ) {
        if (box.width > 0) {
            flights.toList().forEach { f ->
                key(f.ts, f.seat, f.toUid) {
                    GiftFlyOnce(f, seatPoints, origin, box) { flights.remove(f) }
                }
            }
            // Banner "Selamat" untuk cashback: nominal yang didapat pengirim,
            // dan berubah jadi JACKPOT kalau pengalinya 5x lipat ke atas
            // (sama seperti aturan global_jackpot_banner di server contoh).
            val terakhir = flights.lastOrNull()
            // ZONK (cashback 0) juga ditampilkan, sama seperti contoh pemilik.
            // Gift biasa tidak boleh memunculkan dialog cashback/zonk.
            if (terakhir != null && terakhir.cbOn) {
                key(terakhir.ts) { SelamatCashback(terakhir) }
            }
        }
    }
}

@Composable
private fun GiftFlyOnce(
    f: GiftFly,
    seatPoints: Map<Int, Offset>,
    origin: Offset,
    box: IntSize,
    onDone: () -> Unit,
) {
    val prog = remember(f.ts) { Animatable(0f) }
    var landed by remember(f.ts) { mutableStateOf(false) }

    // Titik tujuan: avatar kursi mic penerima. Kalau tidak di mic, ikon user online.
    val target = remember(f.ts, seatPoints, origin, box) {
        val abs = if (f.seat >= 0) seatPoints[f.seat] else null
        val p = abs ?: Offset(box.width * 0.74f, box.height * 0.40f)
        Offset(p.x - origin.x, p.y - origin.y)
    }
    val start = Offset(box.width * 0.14f, box.height * 0.88f)
    // Aset pecahan sudah ikut di dalam aplikasi: cashback/wois_gift_number_<nilai>.svga
    val ctx = androidx.compose.ui.platform.LocalContext.current
    val localAsset = remember(f.ts, f.pecahan, ctx) {
        val path = "cashback/wois_gift_number_${f.pecahan}.svga"
        try {
            if (f.pecahan <= 0L) "" else {
                ctx.assets.open(path).close()
                "asset/$path"
            }
        } catch (e: Exception) { "" }
    }
    val playSrc = localAsset.ifBlank { f.asset }

    // Gift yang mendarat memudar lalu hilang, tidak berhenti menempel di layar.
    val giftAlpha = remember(f.ts) { Animatable(1f) }

    LaunchedEffect(f.ts) {
        prog.animateTo(1f, tween(durationMillis = 750, easing = FastOutSlowInEasing))
        landed = true
        delay(650L)
        giftAlpha.animateTo(0f, tween(320))
        // Tunggu pecahan selesai diputar sebelum efektor dilepas. Pecahan CSS
        // butuh sekitar 2 detik, jadi jangan dipotong terlalu cepat.
        delay(if (f.cbOn && f.cb > 0L) 4200L else 700L + f.parts.size * 260L)
        onDone()
    }

    if (!landed) {
        val t = prog.value
        val x = start.x + (target.x - start.x) * t
        val y = start.y + (target.y - start.y) * t - 110f * sin(PI * t).toFloat()
        Box(
            Modifier
                .offset { IntOffset(x.toInt(), y.toInt()) }
                .size(78.dp),
            contentAlignment = Alignment.Center,
        ) {
            FlyMedia(f)
        }
        return
    }

    // Sampai di avatar penerima: pecahan cashback pecah di titik itu.
    Box(
        Modifier
            .offset { IntOffset((target.x - 140f).toInt(), (target.y - 140f).toInt()) }
            .size(280.dp),
        contentAlignment = Alignment.Center,
    ) {
        // Gift dan pecahan diputar terpisah: gift tetap di sini, lalu angka pecahan
        // (hasil harga gift x pengali) muncul satu per satu di sekitar titik ini.
        Box(
            Modifier
                .size(64.dp)
                .graphicsLayer { alpha = giftAlpha.value },
            contentAlignment = Alignment.Center,
        ) {
            FlyMedia(f)
        }
        if (f.mult > 0 && f.cb > 0) MultBall(f.mult, f.cb, target)
    }
    // Efek tengah layar (CSS): pengali berputar, nominal naik, konfeti, lalu
    // koin pecahan disebar. Nilainya tetap dari server.
    if (f.cbOn && f.cb > 0L) {
        val hargaSatu = if (f.unit > 0L) f.unit else if (f.cnt > 0) f.price / f.cnt else f.price
        val kaliTampil = if (f.kelipatan > 0) f.kelipatan.toDouble()
        else if (hargaSatu > 0L) f.cb.toDouble() / hargaSatu else 1.0
        PecahanCss(
            nilai = f.parts,
            total = f.cb,
            kali = kaliTampil,
            emoji = f.emoji,
            label = "",
        )
    }
    // Tampilan lama (pil "+angka" di bawah avatar dan banner "JP nama +angka" ungu)
    // dihapus. Yang tersisa: gift terbang, pecahan angka (SVGA), dan bola pengali.
}


/**
 * Banner pemenang cashback gaya "Lucky Gift".
 *
 * Pemilik minta kotak/kartu bawaan dihapus: yang dipakai hanya banner dari aset
 * acuan, dan letaknya di atas room seperti banner publik yang terbang. Isinya
 * tetap: total menang, pengiriman (jumlah x harga satuan), kelipatan, tingkat
 * (Rookie / Pro / Highest), dan tujuan gift.
 */
@Composable
private fun SelamatCashback(f: GiftFly) {
    var tampil by remember(f.ts) { mutableStateOf(false) }
    val geser = remember(f.ts) { Animatable(1f) }
    val dapat = f.cb > 0L
    LaunchedEffect(f.ts) {
        delay(420L)
        tampil = true
        // Banner terbang dari kanan ke kiri seperti banner publik di atas room.
        geser.animateTo(-1f, tween(5400, easing = LinearEasing))
        tampil = false
    }
    if (!tampil) return

    // Kelipatan: dari server; kalau kosong dihitung dari nominal / harga satuan.
    val harga = if (f.unit > 0L) f.unit else if (f.cnt > 0) f.price / f.cnt else f.price
    val kali = if (f.kelipatan > 0) f.kelipatan else {
        if (dapat && harga > 0L) maxOf(1, Math.round(f.cb.toDouble() / harga).toInt()) else 0
    }
    val jumlah = if (f.cnt > 0) f.cnt else 1
    val tingkat = f.tingkat.ifBlank {
        when {
            kali >= 100 -> "Highest"
            kali >= 5 -> "Pro"
            kali > 0 -> "Rookie"
            else -> ""
        }
    }
    val layar = LocalConfiguration.current.screenWidthDp.dp

    Box(Modifier.fillMaxSize(), contentAlignment = Alignment.TopCenter) {
        // Kemenangan besar: animasi hadiah VAP (aset acuan) satu layar penuh.
        if (dapat && kali >= 5) LuckyVap(Modifier.matchParentSize())

        // Banner pemenang: tidak pakai kotak/kartu sendiri, latarnya animasi SVGA
        // dari aset acuan, lalu terbang melewati atas room.
        Box(
            Modifier
                .offset { IntOffset((geser.value * layar.toPx()).toInt(), 0) }
                .padding(top = 148.dp, start = 10.dp, end = 10.dp)
                .fillMaxWidth()
                .height(76.dp),
        ) {
            if (dapat) LuckyMarqueeBg(Modifier.matchParentSize())
            Row(
                Modifier.fillMaxSize().padding(horizontal = 18.dp, vertical = 8.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Column(Modifier.weight(1f)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(if (dapat) "👑" else "🎁", fontSize = 15.sp)
                        Spacer(Modifier.width(6.dp))
                        Text(
                            "Gift Cashback",
                            color = Color(0xFFFFF3D6),
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold,
                            maxLines = 1,
                        )
                        if (dapat && kali > 0) {
                            Spacer(Modifier.width(6.dp))
                            Box(
                                Modifier
                                    .background(Color(0xFFFFD24D), RoundedCornerShape(6.dp))
                                    .padding(horizontal = 6.dp, vertical = 1.dp),
                            ) {
                                Text(
                                    "x$kali",
                                    color = Color(0xFF3B2200),
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Black,
                                )
                            }
                        }
                        if (tingkat.isNotBlank()) {
                            Spacer(Modifier.width(6.dp))
                            Text(
                                tingkat,
                                color = Color(0xFFFFE082),
                                fontSize = 10.sp,
                                fontWeight = FontWeight.Bold,
                                maxLines = 1,
                            )
                        }
                    }
                    Text(
                        if (dapat) {
                            "${fmtNum(f.cb)} koin · pengiriman $jumlah x ${fmtNum(harga)}"
                        } else {
                            "belum dapat · pengiriman $jumlah x ${fmtNum(harga)}"
                        },
                        color = if (dapat) Color(0xFFFFD24D) else Color(0xFFBDBDBD),
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Black,
                        maxLines = 1,
                    )
                }
                Text(
                    "ke ${f.toName.ifBlank { "penerima" }}",
                    color = Color(0xFFCBB6E8),
                    fontSize = 10.sp,
                    maxLines = 1,
                    modifier = Modifier.padding(start = 8.dp),
                )
            }
        }
    }
}

/**
 * Latar animasi kartu pemenang (aset SVGA marquee). Kalau aset tidak ada,
 * kartu tetap tampil dengan latar gradasi biasa.
 */
@Composable
private fun LuckyMarqueeBg(modifier: Modifier = Modifier) {
    val ctx = androidx.compose.ui.platform.LocalContext.current
    val ada = remember {
        try {
            ctx.assets.open("cashback/lucky_gift_marquee_bg.svga").close()
            true
        } catch (e: Exception) {
            false
        }
    }
    if (!ada) return
    androidx.compose.ui.viewinterop.AndroidView(
        modifier = modifier.graphicsLayer { alpha = 0.5f },
        factory = { c ->
            com.opensource.svgaplayer.SVGAImageView(c).apply {
                loops = 1
                clearsAfterStop = false
                isClickable = false
                scaleType = android.widget.ImageView.ScaleType.CENTER_CROP
                val parser = com.opensource.svgaplayer.SVGAParser(c)
                try {
                    parser.decodeFromInputStream(
                        c.assets.open("cashback/lucky_gift_marquee_bg.svga"),
                        "lucky_gift_marquee_bg.svga",
                        object : com.opensource.svgaplayer.SVGAParser.ParseCompletion {
                            override fun onComplete(videoItem: com.opensource.svgaplayer.SVGAVideoEntity) {
                                setVideoItem(videoItem)
                                startAnimation()
                            }

                            override fun onError() {}
                        },
                        true,
                    )
                } catch (e: Exception) { }
            }
        },
    )
}

/**
 * Satu pecahan cashback: angka besar (SVGA dari aset aplikasi) muncul bergantian
 * di sekitar avatar penerima. Nilai pecahan = harga gift x pengali undian.
 */
@Composable
private fun PartPop(value: Long, index: Int, box: IntSize) {
    val scale = remember { Animatable(0.6f) }
    LaunchedEffect(value, index) {
        kotlinx.coroutines.delay(index * 220L)
        scale.animateTo(1.12f, tween(200))
        scale.animateTo(1f, tween(110))
    }
    // Semua pecahan tampil DI TENGAH layar, menggerombol rapat di tengah seperti
    // di aplikasi acuan: satu di tengah, sisanya mengelilingi titik tengah.
    val spots = listOf(
        Pair(0f, 0f), Pair(-86f, -78f), Pair(86f, -78f),
        Pair(-86f, 74f), Pair(86f, 74f), Pair(0f, -150f),
        Pair(0f, 148f), Pair(0f, 0f),
    )
    val spot = spots[index % spots.size]
    val size = 156f
    // Angka pecahan bisa jauh lebih besar dari aset yang ada (aset maksimal
    // 10.000). Supaya animasi SVGA tetap muncul, dipakai aset terbesar yang
    // tidak melebihi nilai pecahan, lalu nilai sebenarnya ditulis di bawahnya.
    val aset = assetPecahan(value)
    val cx = box.width / 2f
    val cy = box.height * 0.46f
    Box(
        Modifier
            .offset {
                IntOffset(
                    (cx + spot.first - size / 2f).toInt(),
                    (cy + spot.second - size / 2f).toInt(),
                )
            }
            .size(156.dp)
            .graphicsLayer { scaleX = scale.value; scaleY = scale.value },
        contentAlignment = Alignment.Center,
    ) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Box(Modifier.size(112.dp), contentAlignment = Alignment.Center) {
                GiftSvga("asset/cashback/wois_gift_number_" + aset + ".svga", "🪙", Modifier.fillMaxSize(), onEnd = { })
            }
            // Nilai pecahan yang sebenarnya, supaya jumlahnya tetap terbaca.
            Text(
                fmtCompact(value),
                color = Color(0xFFFFD24D),
                fontSize = 20.sp,
                fontWeight = androidx.compose.ui.text.font.FontWeight.Black,
                maxLines = 1,
                softWrap = false,
                modifier = Modifier
                    .offset { IntOffset(0, (-6f).toInt()) }
                    .clip(RoundedCornerShape(50))
                    .background(Color(0x88000000))
                    .padding(horizontal = 8.dp, vertical = 1.dp),
            )
        }
    }
}

/**
 * Aset angka yang tersedia di aplikasi: 10, 20, 30, 50, 66, 88, 100, 200, 300,
 * 400, 500, 666, 888, 1000, 2000, 3000, 4000, 6000, 8000, 9000, 10000.
 * Dipilih yang paling besar tetapi tidak melebihi nilai pecahan.
 */
private val ASET_PECAHAN = longArrayOf(
    10, 20, 30, 50, 66, 88, 100, 200, 300, 400, 500, 666, 888,
    1000, 2000, 3000, 4000, 6000, 8000, 9000, 10000,
)

private fun assetPecahan(v: Long): Long {
    var pilih = ASET_PECAHAN[0]
    for (a in ASET_PECAHAN) if (a <= v) pilih = a
    return pilih
}


/** Media gift apa adanya (gambar/svga) untuk animasi terbang; emoji kalau kosong. */
@Composable
private fun FlyMedia(f: GiftFly) {
    val url = f.mediaUrl
    when {
        url.isBlank() -> Text(f.emoji.ifBlank { "🎁" }, fontSize = 34.sp)
        isVideoMedia(url, f.mediaType) ->
            Text(f.emoji.ifBlank { "🎁" }, fontSize = 34.sp)
        url.substringBefore('?').lowercase().endsWith(".svga") ||
            f.mediaType.lowercase().startsWith("svga") ->
            GiftSvga(url, f.emoji, Modifier.fillMaxSize(), onEnd = { })
        else -> coil.compose.AsyncImage(
            model = url,
            contentDescription = f.emoji,
            modifier = Modifier.fillMaxSize(),
            contentScale = androidx.compose.ui.layout.ContentScale.Fit,
        )
    }
}

/** Bola kemenangan: "win {total}" dan "{mult} Times", muncul di avatar penerima. */
@Composable
private fun MultBall(mult: Int, total: Long, center: Offset) {
    val pop = remember { Animatable(0.4f) }
    LaunchedEffect(mult, total) {
        pop.animateTo(1.06f, tween(260))
        pop.animateTo(1f, tween(120))
    }
    Box(
        Modifier
            .offset { IntOffset((center.x - 78f).toInt(), (center.y + 26f).toInt()) }
            .size(156.dp)
            .graphicsLayer { scaleX = pop.value; scaleY = pop.value }
            .background(
                androidx.compose.ui.graphics.Brush.radialGradient(
                    listOf(Color(0xFFFFE082), Color(0xFFFF9800)),
                ),
                androidx.compose.foundation.shape.CircleShape,
            )
            .border(3.dp, Color(0xFFFFF8E1), androidx.compose.foundation.shape.CircleShape),
        contentAlignment = Alignment.Center,
    ) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Box(
                Modifier
                    .size(38.dp)
                    .background(Color(0x66FFFFFF), androidx.compose.foundation.shape.CircleShape),
                contentAlignment = Alignment.Center,
            ) {
                Text("🪙", fontSize = 18.sp)
            }
            Spacer(Modifier.height(3.dp))
            Text(
                tr("win ${fmtNum(total)}"),
                color = Color(0xFF4A2600),
                fontSize = 13.sp,
                fontWeight = FontWeight.Black,
            )
            Text(
                tr("$mult Times"),
                color = Color(0xFF7A3E00),
                fontSize = 11.sp,
                fontWeight = FontWeight.Bold,
            )
        }
    }
}

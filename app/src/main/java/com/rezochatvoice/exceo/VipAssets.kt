package com.rezochatvoice.exceo

import android.graphics.BitmapFactory
import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.FastOutLinearInEasing
import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.tween
import android.net.Uri
import android.os.Build
import android.util.Base64
import android.widget.VideoView
import androidx.compose.foundation.Image
import androidx.compose.foundation.border
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.*
import androidx.compose.ui.draw.clipToBounds
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.unit.*
import androidx.compose.ui.unit.DpSize
import androidx.compose.ui.draw.*
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.Shadow
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.viewinterop.AndroidView
import coil.ImageLoader
import coil.compose.AsyncImage
import coil.decode.GifDecoder
import coil.decode.ImageDecoderDecoder
import coil.request.ImageRequest
import com.google.firebase.FirebaseApp
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.ListenerRegistration
import com.opensource.svgaplayer.SVGAImageView
import com.opensource.svgaplayer.SVGAParser
import com.opensource.svgaplayer.SVGAVideoEntity
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.suspendCancellableCoroutine
import kotlinx.coroutines.withContext
import kotlinx.coroutines.tasks.await
import java.io.ByteArrayInputStream
import java.io.File
import java.nio.ByteBuffer
import kotlin.coroutines.resume

/**
 * Jenis aset yang sebenarnya dipakai pemutar.
 *
 * Panel sering menyimpan kind "image" padahal berkasnya .svga atau .mp4 (mis. saat
 * aset diunggah lewat jalur lama atau namanya tanpa akhiran). Akibatnya aplikasi
 * hanya menggambar sampul PNG dan animasinya tidak pernah diputar. Jenis ditebak
 * ulang dari isi berkas lebih dulu, lalu dari akhiran alamatnya.
 */
fun kindAset(kind: String, url: String, data: ByteArray? = null): String {
    if (data != null && data.size > 12) {
        // SVGA 1.x/2.x: arsip zip (PK) atau aliran zlib.
        val p = data[0].toInt() and 0xFF
        val q = data[1].toInt() and 0xFF
        if (p == 0x50 && q == 0x4B) return "svga"
        if (p == 0x78 && (q == 0x01 || q == 0x5E || q == 0x9C || q == 0xDA)) return "svga"
        // MP4/MOV: kotak "ftyp" di byte 4..7.
        if (data[4].toInt() == 0x66 && data[5].toInt() == 0x74 &&
            data[6].toInt() == 0x79 && data[7].toInt() == 0x70
        ) return "mp4"
    }
    val u = url.lowercase().substringBefore('?').substringBefore('#')
    if (u.endsWith(".svga")) return "svga"
    if (u.endsWith(".mp4") || u.endsWith(".webm") || u.endsWith(".mov")) return "mp4"
    return kind.ifBlank { "image" }
}

/** Aset VIP yang diatur dari panel developer: slot = title | frame | entry, kind = image | svga | mp4. */
data class VipAsset(
    val n: Int,
    val slot: String,
    val kind: String,
    val url: String,
    val hasData: Boolean,
    val updatedAt: Long,
    val chunks: Int = 0,
    /** Gambar sampul PNG (frame diam) dibuat panel dari SVGA/MP4. Dipakai untuk
     *  tampilan kartu di luar; preview dan saat dipasang tetap berkas aslinya. */
    val poster: String = "",
)

object VipAssets {
    /** Ringkasan diagnosa: berapa aset terbaca dan alasan gagal muat gambar (untuk akun developer). */
    val diag = mutableStateMapOf<String, String>()
    fun jumlah(): Int = cfg.size
    private val cfg = mutableStateMapOf<String, VipAsset>()
    private val blobs = HashMap<String, ByteArray>()
    private var reg: ListenerRegistration? = null
    // UTAMA: aset VIP kini dari Realtime Database (vipCfg) supaya upload panel
    // developer tetap tersimpan walau kuota Firestore habis. Firestore jadi cadangan.
    private var rtdbReg: Reg? = null
    private val fsMap = HashMap<String, VipAsset>()
    private val rtdbMap = HashMap<String, VipAsset>()

    /** Pesan error terakhir saat memuat aset (mis. rules Firestore menolak). null = lancar. */
    var lastError by mutableStateOf<String?>(null)
        private set

    fun get(n: Int, slot: String): VipAsset? = cfg["${n}_$slot"]

    private fun apply() {
        val merged = HashMap<String, VipAsset>()
        merged.putAll(fsMap)
        merged.putAll(rtdbMap) // RTDB selalu menang
        cfg.clear()
        cfg.putAll(merged)
    }

    /** Dengarkan aset VIP secara langsung: upload dari panel developer langsung tampil tanpa buka ulang app. */
    fun start(force: Boolean = false) {
        if (reg != null && !force) return
        reg?.remove()
        rtdbReg?.remove()
        // REALTIME DATABASE (utama): node vipCfg/{vipN_slot}.
        rtdbReg = Rtdb.listen(Rtdb.ref("vipCfg")) { snap ->
            rtdbMap.clear()
            for (c in snap.children) {
                val n = (c.child("n").getValue(Long::class.java) ?: 0L).toInt()
                val slot = c.child("slot").getValue(String::class.java) ?: continue
                if (n !in 1..9) continue
                val urlRtdb = c.child("url").getValue(String::class.java) ?: ""
                rtdbMap["${n}_$slot"] = VipAsset(
                    n, slot,
                    kindAset(c.child("kind").getValue(String::class.java) ?: "image", urlRtdb),
                    urlRtdb,
                    c.child("hasData").getValue(Boolean::class.java) ?: false,
                    c.child("updatedAt").getValue(Long::class.java) ?: 0L,
                    (c.child("chunks").getValue(Long::class.java) ?: 0L).toInt(),
                    c.child("poster").getValue(String::class.java) ?: "",
                )
            }
            apply()
            lastError = null
        }
        // FIRESTORE (warisan lama): dimuat SEKALI per buka app, bukan listener
        // realtime, supaya hemat kuota baca harian Firestore.
        kotlinx.coroutines.GlobalScope.launch {
            try {
                val snap = kotlinx.coroutines.withTimeoutOrNull(6000L) {
                    FirebaseFirestore.getInstance().collection("vipConfig")
                        .whereEqualTo("meta", true).get().await()
                }
                if (snap != null) {
                    val fresh = HashMap<String, VipAsset>()
                    for (d in snap.documents) {
                        val n = (d.getLong("n") ?: 0L).toInt()
                        val slot = d.getString("slot") ?: continue
                        if (n !in 1..9) continue
                        val urlFs = d.getString("url") ?: ""
                        fresh["${n}_$slot"] = VipAsset(
                            n, slot,
                            kindAset(d.getString("kind") ?: "image", urlFs),
                            urlFs,
                            d.getBoolean("hasData") ?: false,
                            d.getLong("updatedAt") ?: 0L,
                            (d.getLong("chunks") ?: 0L).toInt(),
                            d.getString("poster") ?: "",
                        )
                    }
                    fsMap.clear()
                    fsMap.putAll(fresh)
                    apply()
                    lastError = null
                }
            } catch (e: kotlinx.coroutines.CancellationException) {
            } catch (e: Exception) {
                QuotaGuard.handle(e)
            }
        }
    }

    /** Unduh isi berkas dari tautan (dipakai untuk memeriksa jenis aset). */
    suspend fun ambildariUrl(url: String): ByteArray? = withContext(Dispatchers.IO) {
        try {
            val kon = (java.net.URL(url).openConnection() as java.net.HttpURLConnection).apply {
                connectTimeout = 10000
                readTimeout = 20000
                instanceFollowRedirects = true
            }
            val isi = if (kon.responseCode in 200..299) kon.inputStream.use { it.readBytes() } else null
            kon.disconnect()
            isi
        } catch (e: Exception) {
            null
        }
    }

    suspend fun load(force: Boolean = false) {
        start(force)
    }

    /** Ambil isi file yang di-upload dari HP (disimpan base64 di Firestore). Di-cache di memori. */
    suspend fun bytes(a: VipAsset): ByteArray? {
        val key = "${a.n}_${a.slot}_${a.updatedAt}"
        blobs[key]?.let { return it }
        return try {
            val ctx = FirebaseApp.getInstance().applicationContext
            val cache = File(ctx.cacheDir, "vipasset_$key.bin")
            if (cache.exists() && cache.length() > 0) {
                val cached = cache.readBytes()
                blobs[key] = cached
                return cached
            }
            val col = FirebaseFirestore.getInstance().collection("vipConfig")
            val sb = StringBuilder()
            val base = if (a.n == 0) "data_store_${a.slot.removePrefix("st_")}" else "data_vip${a.n}_${a.slot}"
            if (a.chunks > 0) {
                for (i in 0 until a.chunks) {
                    sb.append(col.document("${base}_$i").get().await().getString("data") ?: return null)
                }
            } else {
                sb.append(col.document(base).get().await().getString("data") ?: return null)
            }
            val s = sb.toString()
            val b = Base64.decode(s.substringAfter("base64,", s), Base64.DEFAULT)
            try {
                cache.writeBytes(b)
            } catch (e: Exception) {
            }
            blobs[key] = b
            b
        } catch (e: kotlinx.coroutines.CancellationException) {
            throw e
        } catch (e: Exception) {
            QuotaGuard.handle(e)
            null
        }
    }
}

fun vipFrameTier(frameId: String?, vip: Int, until: Long): Int {
    if (!frameId.isNullOrBlank()) {
        if (frameId.startsWith("vipf_")) return frameId.removePrefix("vipf_").toIntOrNull() ?: 0
        // Bingkai SVIP (svf_N) memakai aset VIP N.
        if (frameId.startsWith("svf_")) return frameId.removePrefix("svf_").toIntOrNull() ?: 0
        return 0
    }
    return if (vipActive(vip, until)) vip else 0
}

fun hasVipFrame(tier: Int): Boolean = tier in 1..9 && VipAssets.get(tier, "frame") != null

/** Latar kartu profil untuk tingkat SVIP tertentu (slot "cardbg", diunggah dari panel).
 *  Kalau tingkat itu belum diunggah, pakai tingkat di bawahnya supaya kartu tetap berhias. */
fun kartuProfil(tier: Int): VipAsset? {
    val t = tier.coerceIn(1, 9)
    for (n in t downTo 1) VipAssets.get(n, "cardbg")?.let { return it }
    return null
}

/** Tingkat VIP untuk gelembung obrolan: pakai vipb_N yang dipakai, atau otomatis mengikuti VIP aktif. */
fun vipBubbleTier(bubbleId: String?, vip: Int, until: Long): Int {
    if (!bubbleId.isNullOrBlank()) {
        if (bubbleId.startsWith("vipb_")) return bubbleId.removePrefix("vipb_").toIntOrNull() ?: 0
        // Gelembung SVIP (svb_N) memakai aset VIP N.
        if (bubbleId.startsWith("svb_")) return bubbleId.removePrefix("svb_").toIntOrNull() ?: 0
        return 0
    }
    return if (vipActive(vip, until)) vip else 0
}

/**
 * Ukur rasio lebar:tinggi aset supaya lencana/gelar panjang tidak digencet jadi kotak.
 * Bisa: gambar (png/jpg/webp/gif) dan svga. Return null kalau tidak terukur.
 */
internal suspend fun measureAssetRatio(ctx: android.content.Context, a: VipAsset): Float? {
    return when (a.kind) {
        "svga" -> {
            // Ambil bytes DULU (suspend), karena blok suspendCancellableCoroutine bukan suspend.
            val data: ByteArray? = if (a.url.isBlank()) VipAssets.bytes(a) else null
            if (a.url.isBlank() && data == null) {
                null
            } else {
                suspendCancellableCoroutine<Float?> { cont ->
                    val parser = SVGAParser(ctx)
                    val done = object : SVGAParser.ParseCompletion {
                        override fun onComplete(videoItem: SVGAVideoEntity) {
                            if (cont.isActive) {
                                val w = videoItem.videoSize.width
                                val h = videoItem.videoSize.height
                                cont.resume(if (h > 0.0) (w / h).toFloat() else null)
                            }
                        }

                        override fun onError() {
                            if (cont.isActive) cont.resume(null)
                        }
                    }
                    if (a.url.isNotBlank()) {
                        parser.decodeFromURL(java.net.URL(a.url), done)
                    } else {
                        parser.decodeFromInputStream(
                            ByteArrayInputStream(data!!),
                            "ratio_${a.n}_${a.slot}_${a.updatedAt}",
                            done,
                            true,
                        )
                    }
                }
            }
        }
        "mp4" -> null
        else -> {
            if (a.url.isNotBlank()) {
                val res = coil.Coil.imageLoader(ctx).execute(
                    ImageRequest.Builder(ctx).data(a.url).allowHardware(false).build(),
                )
                val d = res.drawable
                if (d != null && d.intrinsicWidth > 0 && d.intrinsicHeight > 0) {
                    d.intrinsicWidth.toFloat() / d.intrinsicHeight
                } else {
                    null
                }
            } else {
                val data = VipAssets.bytes(a)
                if (data == null) {
                    null
                } else {
                    val o = BitmapFactory.Options().apply { inJustDecodeBounds = true }
                    BitmapFactory.decodeByteArray(data, 0, data.size, o)
                    if (o.outWidth > 0 && o.outHeight > 0) o.outWidth.toFloat() / o.outHeight else null
                }
            }
        }
    }
}

@Composable
private fun rememberVipLoader(): ImageLoader {
    val ctx = LocalContext.current
    return remember {
        ImageLoader.Builder(ctx).components {
            if (Build.VERSION.SDK_INT >= 28) add(ImageDecoderDecoder.Factory()) else add(GifDecoder.Factory())
        }.build()
    }
}

@Composable
private fun VipVideo(
    a: VipAsset, data: ByteArray?, modifier: Modifier, loop: Boolean, onEnd: () -> Unit, sound: Boolean,
    onMulai: () -> Unit = {},
) {
    val ctx = LocalContext.current
    val uri: Uri? = remember(a.n, a.slot, a.updatedAt, data) {
        if (a.url.isNotBlank()) {
            Uri.parse(a.url)
        } else if (data != null) {
            val f = File(ctx.cacheDir, "vip_${a.n}_${a.slot}_${a.updatedAt}.mp4")
            if (!f.exists()) f.writeBytes(data)
            Uri.fromFile(f)
        } else {
            null
        }
    }
    if (uri == null) return
    AndroidView(
        modifier = modifier,
        factory = { c ->
            VideoView(c).apply {
                setVideoURI(uri)
                setOnPreparedListener { mp ->
                    mp.isLooping = loop
                    // Efek masuk bisa bersuara; aset lain (bingkai/gelar) tetap diam.
                    val vol = if (sound) 1f else 0f
                    mp.setVolume(vol, vol)
                    start()
                    // Sampul PNG disembunyikan begitu video benar-benar tampil.
                    mp.setOnInfoListener { _, what, _ ->
                        if (what == android.media.MediaPlayer.MEDIA_INFO_VIDEO_RENDERING_START) onMulai()
                        false
                    }
                    postDelayed({ onMulai() }, 600L)
                }
                setOnCompletionListener { onEnd() }
                setOnErrorListener { _, _, _ -> onEnd(); true }
            }
        },
    )
}

@Composable
private fun VipSvga(
    a: VipAsset,
    data: ByteArray?,
    modifier: Modifier,
    loop: Boolean,
    contentScale: ContentScale,
    onEnd: () -> Unit,
    onSiap: (SVGAVideoEntity) -> Unit = {},
    onLangkah: (Float) -> Unit = {},
    onMulai: () -> Unit = {},
) {
    AndroidView(
        modifier = modifier,
        factory = { c ->
            SVGAImageView(c).apply {
                loops = if (loop) 0 else 1
                clearsAfterStop = true
                // Sudah ada frame berjalan? Dipakai supaya startAnimation tidak
                // dipanggil ulang saat animasi masih/main lagi. Dulu panggilan ulang
                // ini membuat banner terbang 2-3 kali padahal durasinya sudah selesai.
                var sudahJalan = false
                scaleType = when (contentScale) {
                    ContentScale.Crop -> android.widget.ImageView.ScaleType.CENTER_CROP
                    ContentScale.FillBounds -> android.widget.ImageView.ScaleType.FIT_XY
                    else -> android.widget.ImageView.ScaleType.FIT_CENTER
                }
                // Callback dipasang selalu: onStep dipakai untuk menggerakkan foto
                // dan nama mengikuti animasi banner.
                callback = object : com.opensource.svgaplayer.SVGACallback {
                    override fun onPause() {}
                    override fun onFinished() {
                        if (!loop) onEnd()
                    }

                    override fun onRepeat() {}
                    override fun onStep(frame: Int, percentage: Double) {
                        sudahJalan = true
                        // Animasi sudah berjalan: sampul PNG boleh disembunyikan.
                        if (frame >= 1) onMulai()
                        onLangkah(percentage.toFloat())
                    }
                }
                val parser = SVGAParser(c)
                var sudahSiap = false
                var sudahCobaLagi = false
                // Diisi setelah objek "done" dibuat; dipakai oleh cobaLagi.
                var doneObj: SVGAParser.ParseCompletion? = null
                // Kalau percobaan pertama gagal, berkasnya dicoba ulang (jaringan
                // lambat / berkas belum siap di CDN) supaya efeknya tidak berhenti
                // sebagai sampul PNG.
                val cobaLagi: () -> Unit = {
                    if (!sudahSiap && !sudahCobaLagi && a.url.isNotBlank()) {
                        sudahCobaLagi = true
                        postDelayed({
                            if (!sudahSiap) {
                                try {
                                    val d = doneObj
                                    if (d != null) {
                                        parser.decodeFromURL(
                                            java.net.URL(a.url + (if (a.url.contains('?')) "&" else "?") + "ulang=" + System.currentTimeMillis()),
                                            d,
                                        )
                                    }
                                } catch (e: Exception) { }
                            }
                        }, 1200L)
                    }
                }
                val done = object : SVGAParser.ParseCompletion {
                    override fun onComplete(videoItem: SVGAVideoEntity) {
                        sudahSiap = true
                        VipAssets.diag.remove("${a.n}_${a.slot}")
                        setVideoItem(videoItem)
                        loops = if (loop) 0 else 1
                        onSiap(videoItem)
                        startAnimation()
                        // Sebagian HP mengabaikan startAnimation kalau view belum
                        // benar-benar terpasang, akibatnya yang tampil hanya frame
                        // pertama (terlihat seperti gambar diam). Coba ulang HANYA
                        // kalau animasi belum berjalan, supaya tidak terbang berulang.
                        postDelayed({ if (!sudahJalan) try { startAnimation() } catch (e: Exception) { } }, 250L)
                        postDelayed({ if (!sudahJalan) try { startAnimation() } catch (e: Exception) { } }, 900L)
                    }

                    override fun onError() {
                        VipAssets.diag["${a.n}_${a.slot}"] = "SVGA gagal dibaca, coba ulang"
                        cobaLagi()
                    }
                }
                doneObj = done
                if (a.url.isNotBlank()) {
                    // Unduh sendiri lewat HTTP lalu decode dari byte: decodeFromURL
                    // bawaan sering gagal diam-diam di jaringan lambat, akibatnya
                    // kotak preview tinggal kosong.
                    val alamat = a.url
                    val kunciSvga = "vip_${a.n}_${a.slot}_${a.updatedAt}"
                    Thread {
                        var isi: ByteArray? = null
                        for (percobaan in 1..2) {
                            try {
                                val kon = (java.net.URL(alamat).openConnection() as java.net.HttpURLConnection).apply {
                                    connectTimeout = 10000
                                    readTimeout = 20000
                                    instanceFollowRedirects = true
                                }
                                if (kon.responseCode in 200..299) {
                                    isi = kon.inputStream.use { it.readBytes() }
                                }
                                kon.disconnect()
                                if (isi != null && isi!!.isNotEmpty()) break
                            } catch (e: Exception) {
                                isi = null
                            }
                        }
                        val hasil = isi
                        post {
                            if (hasil != null && hasil.isNotEmpty()) {
                                parser.decodeFromInputStream(ByteArrayInputStream(hasil), kunciSvga, done, true)
                            } else {
                                try { parser.decodeFromURL(java.net.URL(alamat), done) } catch (e: Exception) { }
                            }
                        }
                    }.start()
                } else if (data != null) {
                    parser.decodeFromInputStream(
                        ByteArrayInputStream(data), "vip_${a.n}_${a.slot}_${a.updatedAt}", done, true,
                    )
                }
            }
        },
        onRelease = { v ->
            // Dulu animasi tetap jalan walau view sudah dilepas: memori naik terus
            // sampai aplikasi tertutup sendiri saat berada di room.
            try { v.stopAnimation() } catch (e: Exception) { }
            try { v.clear() } catch (e: Exception) { }
        },
    )
}

/** Slot yang isinya seharusnya animasi, bukan gambar diam. */
private val kotakAnimasi = setOf("entry", "banner", "cardbg")

/** Tampilkan satu aset VIP (gambar/gif/webp, svga, atau mp4). */
@Composable
fun VipMedia(
    a: VipAsset,
    modifier: Modifier = Modifier,
    loop: Boolean = true,
    contentScale: ContentScale = ContentScale.Fit,
    onEnd: () -> Unit = {},
    sound: Boolean = false,
    onSiap: (SVGAVideoEntity) -> Unit = {},
    onLangkah: (Float) -> Unit = {},
    onMulai: () -> Unit = {},
) {
    val data by produceState<ByteArray?>(null, a.n, a.slot, a.updatedAt) {
        value = if (a.hasData) {
            VipAssets.bytes(a)
        } else if (a.url.isNotBlank() && kotakAnimasi.contains(a.slot) &&
            kindAset(a.kind, a.url) == "image"
        ) {
            // Panel kadang menyimpan berkas SVGA/MP4 dengan jenis "gambar"
            // (mis. tautan tanpa akhiran). Isi berkasnya diperiksa dulu supaya
            // efek masuk tetap diputar sebagai animasi, bukan sebagai foto.
            VipAssets.ambildariUrl(a.url)
        } else null
    }
    val remote = a.url.isNotBlank()
    if (!remote && data == null) return
    // Jenis dipakai dari isi berkas/akhiran, bukan hanya catatan panel, supaya
    // SVGA tetap diputar walau panel menandainya sebagai gambar.
    when (kindAset(a.kind, a.url, data)) {
        "mp4" -> VipVideo(a, data, modifier, loop, onEnd, sound, onMulai)
        "svga" -> VipSvga(a, data, modifier, loop, contentScale, onEnd, onSiap, onLangkah, onMulai)
        else -> AsyncImage(
            model = if (remote) a.url else ByteBuffer.wrap(data!!),
            contentDescription = null,
            imageLoader = rememberVipLoader(),
            modifier = modifier,
            contentScale = contentScale,
            onError = { r ->
                VipAssets.diag["${a.n}_${a.slot}"] =
                    (if (remote) a.url.substringAfter("//").take(60) else "data") + " -> " +
                        (r.result.throwable.message ?: r.result.throwable.javaClass.simpleName).take(60)
            },
            onSuccess = { VipAssets.diag.remove("${a.n}_${a.slot}") },
        )
    }
}

/**
 * Batas jumlah animasi berat (SVGA/MP4) yang boleh jalan bersamaan.
 *
 * Di halaman Item VIP ada puluhan pratinjau sekaligus; kalau semuanya memutar
 * animasi, HP kehabisan memori lalu aplikasi tertutup sendiri. Hanya beberapa
 * pratinjau pertama yang memutar, sisanya pakai cadangan diam.
 */
object MediaSlot {
    private const val MAKS = 3
    private val aktif = java.util.concurrent.atomic.AtomicInteger(0)

    /** Ambil satu jatah putar. Panggil lepas() saat pratinjau hilang. */
    fun ambil(): Boolean = aktif.getAndIncrement() < MAKS

    fun lepas() {
        if (aktif.get() > 0) aktif.decrementAndGet()
    }
}

/**
 * VipMedia dengan cadangan: kalau aset tidak bisa dipakai (link mati atau data di
 * database tidak terbaca), yang tampil adalah cadangan bawaan, bukan kotak kosong.
 * Ini yang dulu membuat medal, gelar, bingkai, dan efek masuk jadi tidak terlihat.
 */
@Composable
fun VipMediaSafe(
    a: VipAsset?,
    modifier: Modifier = Modifier,
    loop: Boolean = true,
    contentScale: ContentScale = ContentScale.Fit,
    fallback: @Composable () -> Unit = {},
    batas: Boolean = false,
    diam: Boolean = false,
) {
    if (a == null || (a.url.isBlank() && !a.hasData)) {
        fallback()
        return
    }
    // Daftar/ransel: animasi tidak diputar sama sekali. Yang bergerak hanya
    // saat pratinjau dibuka, jadi HP tidak berat walau itemnya banyak.
    if (diam && (a.kind == "mp4" || a.kind == "svga")) {
        if (a.poster.isNotBlank()) {
            coil.compose.AsyncImage(
                model = a.poster,
                contentDescription = null,
                modifier = modifier,
                contentScale = contentScale,
            )
        } else {
            fallback()
        }
        return
    }
    // Pratinjau di daftar: batasi jumlah animasi yang jalan bersamaan.
    if (batas && (a.kind == "mp4" || a.kind == "svga")) {
        var dapat by remember(a.n, a.slot, a.updatedAt) { mutableStateOf(false) }
        DisposableEffect(a.n, a.slot, a.updatedAt) {
            dapat = MediaSlot.ambil()
            onDispose { if (dapat) MediaSlot.lepas() }
        }
        if (!dapat) {
            fallback()
            return
        }
    }
    if (a.url.isNotBlank()) {
        if (a.kind == "mp4" || a.kind == "svga") {
            VipMedia(a, modifier, loop, contentScale)
            return
        }
        var gagal by remember(a.n, a.slot, a.updatedAt) { mutableStateOf(false) }
        if (gagal) {
            fallback()
            return
        }
        AsyncImage(
            model = a.url,
            contentDescription = null,
            imageLoader = rememberVipLoader(),
            modifier = modifier,
            contentScale = contentScale,
            onError = { gagal = true },
        )
        return
    }
    // Isi file tersimpan di database. 0 = memuat, 1 = siap, 2 = gagal.
    val st by produceState(0, a.n, a.slot, a.updatedAt) {
        value = if (VipAssets.bytes(a) != null) 1 else 2
    }
    when (st) {
        1 -> VipMedia(a, modifier, loop, contentScale)
        2 -> fallback()
        else -> Unit
    }
}

/** Gelar VIP (medal). Pakai gambar dari panel developer kalau ada, kalau tidak pakai lencana teks. */
@Composable
fun VipTag(n: Int, modifier: Modifier = Modifier) {
    val a = VipAssets.get(n, "title")
    if (a == null) {
        VipTagText(n, modifier)
        return
    }
    // Gelar custom: tinggi tetap 24.dp, lebar otomatis mengikuti rasio file asli.
    var ratio by remember(a.n, a.slot, a.updatedAt) { mutableStateOf(2.5f) }
    val ctx = LocalContext.current
    LaunchedEffect(a.n, a.slot, a.updatedAt) {
        ratio = runCatching { measureAssetRatio(ctx, a) }.getOrNull() ?: 2.5f
    }
    VipMediaSafe(
        a,
        modifier.height(24.dp).width((24f * ratio).dp),
        loop = true,
        fallback = { VipTagText(n, modifier) },
    )
}

/** Bingkai eksklusif VIP ditumpuk di atas avatar (tidak menangkap sentuhan). */
@Composable
fun VipFrame(tier: Int, size: Dp, diam: Boolean = false) {
    if (tier !in 1..9) return
    // Kalau gambar bingkai tidak bisa dipakai, tidak ada yang digambar (avatar tetap terlihat).
    VipMediaSafe(VipAssets.get(tier, "frame"), Modifier.requiredSize(size), loop = true, diam = diam)
}

/**
 * Rasio lebar/tinggi banner dari berkas yang dipasang di panel. Dipakai supaya banner
 * tampil PERSIS seperti file aslinya (tidak ada ruang kosong kiri-kanan dan tidak
 * terpotong). 0 = rasio tidak diketahui (svga/mp4), pemanggil pakai rasio bawaan.
 */
suspend fun ratioOf(a: VipAsset): Float {
    if (a.kind == "mp4" || a.kind == "svga") return 0f
    return try {
        val d = VipAssets.bytes(a) ?: return 0f
        val o = android.graphics.BitmapFactory.Options().apply { inJustDecodeBounds = true }
        android.graphics.BitmapFactory.decodeByteArray(d, 0, d.size, o)
        if (o.outWidth <= 0 || o.outHeight <= 0) 0f else o.outWidth.toFloat() / o.outHeight.toFloat()
    } catch (e: Exception) { 0f }
}

/** Kanvas banner SVGA dari panel developer: 750x1624 dan gambarnya hanya di bagian
 *  tengah (52% sampai 67% tinggi kanvas). Dipakai supaya banner tampil besar dan pas,
 *  bukan mengecil karena seluruh kanvas yang tinggi ikut dikecilkan. */
private const val SVGA_KANVAS_TINGGI = 2.1653f   // 1624 / 750
// Diukur dari frame asli banner (kanvas 750x1624): pita gambarnya ada di
// y 848..1070 dan x 44..733. Jadi bagian atas yang harus digeser 848/1624,
// dan tinggi pita = 223/750 dari lebar kanvas.
// Diukur LANGSUNG dari file banner (frame demi frame), kanvas 750x1624:
// pita di y 918..1025 (tinggi 107), lebar 568. Foto (layer "head") dan nama
// (layer "Text1") bergerak bersama pita dari kanan ke kiri, jadi posisinya
// diambil per frame dari tabel di bawah, bukan satu titik tetap.
private const val SVGA_BAND_ATAS = 0.5652f       // 918 / 1624
private const val SVGA_BAND_RASIO = 0.1429f      // 107 / 750
private const val SVGA_BAND_LEBAR = 0.7575f      // 568 / 750
private const val SVGA_FOTO_D = 0.134f           // 100,5 / 750, diameter lingkaran foto (kanvas)
private const val SVGA_PITA_Y0 = 917.8f
private const val SVGA_PITA_TINGGI = 107.2f
private const val SVGA_TEKS_Y = 972.7f           // tengah vertikal nama
// Pusat foto (x) per frame, 90 frame @30fps, satuan piksel kanvas 750.
private val SVGA_FOTO_CX = floatArrayOf(830.0f, 793.4f, 755.5f, 717.2f, 678.7f, 640.3f, 601.9f, 563.8f, 525.9f, 488.3f, 451.1f, 414.4f, 378.4f, 343.1f, 308.8f, 275.9f, 245.1f, 217.6f, 197.4f, 186.9f, 179.1f, 172.8f, 167.7f, 163.3f, 159.5f, 156.2f, 153.4f, 150.8f, 148.6f, 146.5f, 144.7f, 143.1f, 141.6f, 140.3f, 139.1f, 138.1f, 137.1f, 136.2f, 135.4f, 134.7f, 134.0f, 133.4f, 132.9f, 132.4f, 131.9f, 131.5f, 131.1f, 130.7f, 130.3f, 129.9f, 129.6f, 129.2f, 128.9f, 128.5f, 128.1f, 127.7f, 127.3f, 126.9f, 126.4f, 125.8f, 125.3f, 124.6f, 123.9f, 123.1f, 122.2f, 121.2f, 120.0f, 118.8f, 117.3f, 115.7f, 113.9f, 111.7f, 109.3f, 106.4f, 103.1f, 99.0f, 94.0f, 83.8f, 64.7f, 37.2f, 1.7f, -41.4f, -91.5f, -148.1f, -210.6f, -278.1f, -349.6f, -423.1f, -495.1f, -557.0f)
// Awal teks nama (x kiri) per frame.
private val SVGA_TEKS_X = floatArrayOf(899.0f, 862.4f, 824.5f, 786.2f, 747.7f, 709.3f, 671.0f, 632.8f, 594.9f, 557.3f, 520.1f, 483.4f, 447.4f, 412.1f, 377.8f, 344.9f, 314.1f, 286.6f, 266.4f, 255.9f, 248.1f, 241.8f, 236.7f, 232.3f, 228.5f, 225.3f, 222.4f, 219.8f, 217.6f, 215.5f, 213.7f, 212.1f, 210.7f, 209.3f, 208.2f, 207.1f, 206.1f, 205.2f, 204.4f, 203.7f, 203.0f, 202.4f, 201.9f, 201.4f, 200.9f, 200.5f, 200.1f, 199.7f, 199.3f, 199.0f, 198.6f, 198.2f, 197.9f, 197.5f, 197.2f, 196.8f, 196.3f, 195.9f, 195.4f, 194.8f, 194.3f, 193.6f, 192.9f, 192.1f, 191.2f, 190.2f, 189.1f, 187.8f, 186.4f, 184.7f, 182.9f, 180.8f, 178.3f, 175.4f, 172.1f, 168.0f, 163.0f, 152.8f, 133.7f, 106.2f, 70.7f, 27.6f, -22.5f, -79.1f, -141.6f, -209.1f, -280.6f, -354.1f, -426.1f, -488.0f)
private fun svgaAmbil(t: FloatArray, p: Float): Float {
    val f = (p.coerceIn(0f, 1f) * (t.size - 1))
    val i = f.toInt().coerceIn(0, t.size - 1)
    val j = (i + 1).coerceAtMost(t.size - 1)
    return t[i] + (t[j] - t[i]) * (f - i)
}

/** Efek masuk cadangan: kalau aset untuk tingkat tertentu belum diisi di panel,
 *  pakai aset efek masuk lain yang tersedia supaya efeknya tetap terlihat
 *  (bukan diam tanpa penjelasan). Tingkat tertinggi dipilih lebih dulu. */
fun entryAssetCadangan(kecuali: Int = 0): VipAsset? {
    for (t in 9 downTo 1) {
        if (t == kecuali) continue
        val a = VipAssets.get(t, "entry")
        if (a != null && (a.url.isNotBlank() || a.hasData)) return a
    }
    // Efek masuk buatan panel (item katalog) juga dipakai sebagai cadangan.
    // Tanpa ini, user yang efek masuknya item kiriman panel tidak melihat apa pun
    // ketika catatan item di dompet belum sinkron.
    return StoreCatalog.firstAsset("entry")
}

/** Banner efek masuk VIP1-9 diambil dari panel developer (bukan lagi dari APK). */
fun vipBannerAsset(n: Int): VipAsset? = if (n in 1..9) VipAssets.get(n, "banner") else null

/** Banner efek masuk dari pesan "masuk kamar":
 *  item store custom (sx_) MENANG, lalu item banner VIP (vipbn_, drawable di APK),
 *  terakhir otomatis sesuai level VIP user. */
/** Aset pertama yang tersedia untuk satu slot dari katalog panel (dipakai sebagai cadangan). */
fun bannerCadangan(): VipAsset? = StoreCatalog.firstAsset("banner")

fun bannerAssetOf(m: RoomMsg): VipAsset? =
    if (m.banner.startsWith("sx_")) StoreCatalog.find(m.banner)?.asset
    else if (m.banner.startsWith("vipbn_")) vipBannerAsset(m.banner.removePrefix("vipbn_").toIntOrNull() ?: 0)
    // Banner SVIP (svbn_N) memakai banner VIP N.
    else if (m.banner.startsWith("svbn_")) vipBannerAsset(m.banner.removePrefix("svbn_").toIntOrNull() ?: 0)
    else if (m.vip in 1..9) vipBannerAsset(m.vip)
    else null

/** Efek masuk VIP di room: mp4 atau gif/webp/svga, diputar sebentar di bagian atas layar.
 *  Banner efek masuk (kalau dipakai) tampil DI DEPAN efek masuk. */
/** Mencatat room yang efek masuknya sudah diputar, supaya tidak berulang. */
object EfekMasukTercatat {
    private val sudah = HashSet<String>()
    fun perluTampil(roomId: String): Boolean = sudah.add(roomId)
    /** Room ini sudah menampilkan efek masuk? Pencegah banner tampil berkali-kali. */
    fun sudahTampil(roomId: String): Boolean = roomId in sudah
    /** Dipanggil saat benar-benar keluar room, supaya masuk berikutnya tampil lagi. */
    fun reset(roomId: String) { sudah.remove(roomId) }
}

@Composable
fun VipEntryEffect(roomId: String) {
    var playing by remember { mutableStateOf<VipAsset?>(null) }
    // Animasi benar-benar mulai berjalan (frame pertama SVGA/MP4 tampil)?
    var mulaiAnim by remember { mutableStateOf(false) }
    var banner by remember { mutableStateOf<VipAsset?>(null) }
    var bannerName by remember { mutableStateOf<String?>(null) }
    var bannerUid by remember { mutableStateOf<String?>(null) }
    var first by remember { mutableStateOf(true) }
    var lastId by remember { mutableStateOf<String?>(null) }
    var pending by remember { mutableStateOf<RoomMsg?>(null) }
    // Jeda sebentar setelah masuk room: efek berat (SVGA) baru diputar setelah
    // room dan suara siap, jadi tidak berebut tenaga dengan sambungan suara.
    var bolehMain by remember { mutableStateOf(false) }
    LaunchedEffect(roomId) {
        bolehMain = false
        delay(1400)
        bolehMain = true
    }
    // Pesan masuk yang datang sebelum jeda selesai disimpan dulu. Dulu efeknya
    // langsung dibuang, akibatnya efek masuk tidak pernah terlihat saat masuk room.
    var tungguMain by remember { mutableStateOf<RoomMsg?>(null) }
    val myUid = remember { FirebaseAuth.getInstance().currentUser?.uid ?: "" }

    LaunchedEffect(Unit) {
        VipAssets.load()
        // Pastikan katalog store termuat: efek masuk sx_ butuh data ini.
        StoreCatalog.start()
    }

    // Pesan masuk dengan item sx_ yang belum ketemu di katalog (katalog masih
    // termuat / offline): coba lagi sampai ketemu supaya efeknya konsisten.
    // Nama user untuk banner: dari pesan, atau dari cache profil bila pesan tanpa nama.
    fun msgName(m: RoomMsg): String {
        if (m.name.isNotBlank()) return m.name
        val n = UserCache.peek(m.vipUid)?.name
        return if (!n.isNullOrBlank()) n else ""
    }

    /**
     * Pasang efek masuk dan banner SEKALIGUS. Dulu, kalau banner masuk terpasang
     * tetapi aset efek masuk belum termuat, yang tampil hanya banner dan efek
     * masuk SVGA tidak pernah muncul. Sekarang efek masuk selalu diisi: aset
     * tingkat user, kalau kosong pakai aset efek masuk lain yang tersedia.
     */
    fun pasangEfek(m: RoomMsg) {
        if (!bolehMain) {
            tungguMain = m
            return
        }
        // Sekali saja per masuk room. Dulu pesan "masuk kamar", percobaan ulang,
        // dan efek paksa sama-sama menampilkan banner sehingga terlihat 3 kali.
        if (playing != null || banner != null) return
        if (!EfekMasukTercatat.perluTampil(roomId)) return
        // Yang dipakai adalah efek masuk yang DIPASANG user. Dulu id dari pesan
        // "masuk kamar" bisa ketinggalan (masih id lama), jadi yang tampil efek
        // lama. Dompet (yang baru disimpan saat menekan Pakai) didahulukan.
        val wPasang = runCatching { WalletCache.load(myUid) }.getOrNull()
        val idEntry = if (wPasang != null) fallbackEquip(wPasang, "entry") else ""
        val idBanner = if (wPasang != null) fallbackEquip(wPasang, "banner") else ""
        val mPakai = if (wPasang != null) {
            m.copy(
                entry = idEntry.ifBlank { m.entry },
                banner = idBanner.ifBlank { m.banner },
                vip = if (m.vip in 1..9) m.vip else if (vipActive(wPasang.vip, wPasang.vipUntil)) wPasang.vip else 0,
            )
        } else m
        val a = entryAssetOf(mPakai) ?: entryAssetCadangan()
        val b = bannerAssetOf(mPakai)
        playing = a
        banner = b
        bannerName = msgName(m).takeIf { it.isNotBlank() }
        bannerUid = m.vipUid.takeIf { it.isNotBlank() }
    }

    LaunchedEffect(bolehMain) {
        if (!bolehMain) return@LaunchedEffect
        val m = tungguMain ?: return@LaunchedEffect
        tungguMain = null
        pasangEfek(m)
    }

    /**
     * Efek masuk DIPAKSA tampil setiap kali masuk room, seperti versi awal.
     * Tidak lagi bergantung pada pesan "masuk kamar" atau katalog yang sudah
     * termuat: aset diambil dari item yang dipakai (kalau kosong: item tertinggi
     * yang dimiliki, lalu aset efek masuk lain yang tersedia).
     */
    LaunchedEffect(roomId) {
        if (myUid.isBlank()) return@LaunchedEffect
        // Tunggu sebentar supaya room dan suara siap dulu.
        delay(1500)
        if (playing != null || banner != null) return@LaunchedEffect
        // Dompet boleh belum tersedia: cadangan katalog tetap dipakai supaya efek
        // masuk tidak hilang hanya karena cache dompet kosong.
        val w = runCatching { WalletCache.load(myUid) }.getOrNull()
        val vipNow = if (w != null && vipActive(w.vip, w.vipUntil)) w.vip else 0
        val eId = w?.let { fallbackEquip(it, "entry") }.orEmpty()
        val bId = w?.let { fallbackEquip(it, "banner") }.orEmpty()
        val aAwal = runCatching {
            when {
                eId.startsWith("sx_") -> StoreCatalog.find(eId)?.asset
                eId.startsWith("sve_") -> VipAssets.get(eId.removePrefix("sve_").toIntOrNull() ?: 0, "entry")
                eId.isNotBlank() -> StoreCatalog.find(eId)?.asset
                else -> null
            }
        }.getOrNull()
            ?: VipAssets.get(vipNow, "entry")
            ?: entryAssetCadangan()
        val bAwal = runCatching {
            when {
                bId.startsWith("sx_") -> StoreCatalog.find(bId)?.asset
                bId.startsWith("svbn_") -> vipBannerAsset(bId.removePrefix("svbn_").toIntOrNull() ?: 0)
                bId.startsWith("vipbn_") -> vipBannerAsset(bId.removePrefix("vipbn_").toIntOrNull() ?: 0)
                bId.isNotBlank() -> StoreCatalog.find(bId)?.asset
                else -> null
            }
        }.getOrNull()
            ?: vipBannerAsset(vipNow)
            ?: bannerCadangan()
        // Kalau aset yang menempel di id item hanya gambar diam (sampul lama),
        // sedangkan tier VIP punya berkas animasi dari halaman Aset & VIP, pakai
        // berkas tier itu supaya SVGA benar-benar diputar.
        val aTier = VipAssets.get(vipNow, "entry")
        val a = if (
            aTier != null && kindAset(aTier.kind, aTier.url) != "image" &&
            (aAwal == null || kindAset(aAwal.kind, aAwal.url) == "image")
        ) aTier else aAwal
        // Sama untuk banner masuk: berkas animasi tier dipakai kalau yang menempel
        // di id item hanya gambar diam.
        val bTier = vipBannerAsset(vipNow)
        val b = if (
            bTier != null && kindAset(bTier.kind, bTier.url) != "image" &&
            (bAwal == null || kindAset(bAwal.kind, bAwal.url) == "image")
        ) bTier else bAwal
        if (a == null && b == null) return@LaunchedEffect
        // Sekali per masuk room: setelah minimize lalu kembali, efek tidak diulang.
        if (playing != null || banner != null) return@LaunchedEffect
        if (!EfekMasukTercatat.perluTampil(roomId)) return@LaunchedEffect
        playing = a
        banner = b
        mulaiAnim = false
        // Catatan diagnosa (dibaca di menu Blok Efek) supaya kelihatan apakah
        // asetnya benar SVGA dan apakah animasinya benar-benar mulai.
        VipAssets.diag["entry"] = a?.let {
            "jenis=" + kindAset(it.kind, it.url, VipAssets.bytes(it)) + " berkas=" + it.url.substringAfterLast('/').take(28)
        } ?: "efek masuk kosong"
        VipAssets.diag["entry_main"] = "belum"
        val namaSaya = UserCache.peek(myUid)?.name.orEmpty()
        bannerName = namaSaya.takeIf { it.isNotBlank() }
        bannerUid = myUid
    }

    LaunchedEffect(pending) {
        val m = pending ?: return@LaunchedEffect
        repeat(10) {
            val a = entryAssetOf(m)
            val b = bannerAssetOf(m)
            if (a != null || b != null) {
                pasangEfek(m)
                return@LaunchedEffect
            }
            delay(400)
        }
        // Aset untuk tingkat user ini memang belum ada di panel. Pakai efek masuk
        // yang tersedia supaya pemain tetap melihat efek, tidak layar diam.
        if (entryAssetCadangan() != null) {
            pasangEfek(m)
        } else {
            VipAssets.diag["entry_kosong"] = "Efek masuk belum ada di panel untuk tingkat ini"
        }
        pending = null
    }

    // Aset VIP dimuat dari database. Kalau pesan masuk sebelum aset siap, efek
    // masuk dan banner jadi kosong. Untuk item VIP/store, coba ulang sebentar
    // supaya efeknya tetap tampil (dulu hanya item sx_ yang dicoba ulang).
    fun perluUlang(m: RoomMsg): Boolean =
        m.entry.startsWith("sx_") || m.banner.startsWith("sx_") ||
            m.vip in 1..9 || m.entry.isNotBlank() || m.banner.isNotBlank()

    DisposableEffect(roomId) {
        val reg = RoomRepo.observeMessages(roomId, 1) { list ->
            val last = list.lastOrNull()
            if (first) {
                first = false
                lastId = last?.id
                val fresh = last != null && System.currentTimeMillis() - last.createdAt < 8000
                if (last != null && fresh && last.vipUid == myUid) {
                    val a = entryAssetOf(last)
                    val b = bannerAssetOf(last)
                    if (a != null || b != null) {
                        pasangEfek(last)
                    } else if (perluUlang(last)) pending = last
                }
            } else if (last != null && last.id != lastId) {
                lastId = last.id
                val a = entryAssetOf(last)
                val b = bannerAssetOf(last)
                if (a != null || b != null) {
                    pasangEfek(last)
                } else if (perluUlang(last)) pending = last
            }
        }
        onDispose { reg.remove() }
    }

    val p = playing
    val b = banner
    // Banner tidak lagi digeser manual dari kanan ke kiri: animasi bawaan file
    // SVGA sudah menggerakkan pitanya sendiri. Di sini hanya fade masuk/keluar.
    val fade = remember { Animatable(0f) }
    if (p != null || b != null) {
        if (p != null) {
            LaunchedEffect(p) {
                val jenisP = kindAset(p.kind, p.url)
                val berat = jenisP == "mp4" || jenisP == "svga"
                if (!berat) {
                    delay(5000L)
                    playing = null
                    return@LaunchedEffect
                }
                // Selama berkas diunduh, yang tampil hanya sampul PNG. Dulu efek
                // ditutup setelah 8 detik walau unduhan belum selesai, sehingga
                // animasi SVGA efek masuk VIP tidak pernah terlihat. Sekarang efek
                // ditutup saat animasinya selesai; kalau berkasnya memang gagal
                // diputar, ditutup setelah 30 detik supaya layar tidak tertahan.
                var tunggu = 0L
                while (tunggu < 30000L && playing != null && !mulaiAnim) {
                    delay(300L)
                    tunggu += 300L
                }
                if (!mulaiAnim) {
                    VipAssets.diag["entry_main"] = "berkas tidak bisa diputar"
                    playing = null
                    return@LaunchedEffect
                }
                // Sudah berjalan: tunggu sampai animasi selesai (onEnd menutupnya),
                // dengan jaring pengaman 30 detik.
                var jalan = 0L
                while (jalan < 30000L && playing != null) {
                    delay(300L)
                    jalan += 300L
                }
                if (playing != null) playing = null
            }
        }
        if (b != null) {
            // Durasi tampil mengikuti panjang animasi SVGA (90 frame @30fps = 3 detik)
            // ditambah jeda sebentar, lalu memudar.
            LaunchedEffect(b) {
                fade.snapTo(0f)
                val jenisB = kindAset(b.kind, b.url)
                fade.animateTo(1f, tween(if (jenisB == "svga") 220 else 400))
                // Durasi mengikuti file: SVGA memanggil onEnd saat animasinya habis,
                // dan di situ banner langsung ditutup. Angka di bawah hanya jaring
                // pengaman kalau file gagal diputar.
                // Jaring pengaman saja. Penutupan normal memakai akhir animasi,
                // tetapi tidak boleh kurang dari durasi minimum di bawah.
                delay(if (jenisB == "svga") 6000L else 2600L)
                fade.animateTo(0f, tween(300))
                banner = null
                bannerName = null
                bannerUid = null
            }
        }
        Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            if (p != null) {
                // Sampul PNG TIDAK dipakai di room. Sampul itu hanya ikon kartu di
                // Item VIP/Store. Di room yang tampil harus berkas aslinya (SVGA/MP4),
                // jadi kalau animasinya belum siap layar dibiarkan kosong, bukan
                // menampilkan foto sampul.
                var animJalan by remember(p.n, p.slot, p.updatedAt) { mutableStateOf(false) }
                VipMedia(
                    p,
                    Modifier.fillMaxSize(),
                    loop = false,
                    contentScale = ContentScale.Crop,
                    onEnd = {
                        VipAssets.diag["entry_main"] =
                            (VipAssets.diag["entry_main"] ?: "") + " · selesai"
                        playing = null
                    },
                    sound = true,
                    onMulai = {
                        animJalan = true
                        mulaiAnim = true
                        VipAssets.diag["entry_main"] = "animasi jalan"
                    },
                )
            }
            // Banner efek masuk: di ATAS layar, digambar SETELAH efek jadi tampil di depannya.
            // Ukuran banner TETAP sesuai file aslinya (tidak diperbesar selebar layar).
            if (b != null) {
                // Lebar:tinggi banner dibaca dari file yang dipasang di panel, jadi tidak
                // lagi dipaksa 280x79 (dulu file dengan rasio lain jadi kecil/berongga).
                var rasioBanner by remember(b.n, b.updatedAt) { mutableStateOf(280f / 79f) }
                LaunchedEffect(b.n, b.updatedAt) {
                    val r = try { ratioOf(b) } catch (e: Exception) { 0f }
                    if (r > 0.4f) rasioBanner = r
                }
                BoxWithConstraints(
                    Modifier.align(Alignment.TopCenter).fillMaxWidth()
                        .statusBarsPadding().padding(top = 4.dp)
                        // Geser ke atas untuk menutup banner sebelum selesai terbang.
                        .geserTutup(b) {
                            banner = null
                            bannerName = null
                            bannerUid = null
                        },
                    contentAlignment = Alignment.Center,
                ) {
                    // Banner dibuat kecil saja (maksimal 70% layar / 280.dp) supaya tidak
                    // menutupi room; tinggi mengikuti rasio file dan dibatasi 130.dp.
                    // Untuk SVGA, lebar yang dihitung adalah lebar PITA (70% layar); kanvas
                    // penuh 750 dipasang lebih lebar supaya pita 568 tepat selebar itu.
                    // Pita dibentangkan selebar layar supaya penutupnya tidak terpotong:
                    // animasi masuk dan keluar berjalan dari tepi kanan ke tepi kiri layar.
                    val lebarBanner = maxWidth
                    val skala = lebarBanner.value / 750f                      // dp per piksel kanvas
                    // b adalah properti delegasi, jadi disalin dulu supaya bisa dipakai.
                    val asetBanner = b!!
                    val svgaBanner = kindAset(asetBanner.kind, asetBanner.url) == "svga"
                    // Waktu banner mulai tampil dan tanda "animasi sudah selesai".
                    // Dulu banner langsung ditutup begitu pemutar SVGA melapor
                    // selesai, dan sebagian HP melapor selesai di frame awal,
                    // akibatnya banner hilang dalam 1 detik.
                    val mulaiBanner = remember(asetBanner.n, asetBanner.updatedAt, bannerUid) {
                        System.currentTimeMillis()
                    }
                    var mintaTutup by remember(asetBanner.n, asetBanner.updatedAt, bannerUid) {
                        mutableStateOf(false)
                    }
                    val DURASI_MIN_BANNER = 3000L
                    LaunchedEffect(mintaTutup, asetBanner.updatedAt, bannerUid) {
                        if (!mintaTutup) return@LaunchedEffect
                        val sisa = DURASI_MIN_BANNER - (System.currentTimeMillis() - mulaiBanner)
                        if (sisa > 0L) delay(sisa)
                        bannerName = null
                        bannerUid = null
                        banner = null
                    }
                    // Progres animasi 0..1 dari pemutar SVGA, dipakai menggerakkan foto dan nama.
                    var progres by remember(asetBanner.n, asetBanner.updatedAt, bannerUid) { mutableStateOf(0f) }
                    val tinggiBanner = if (svgaBanner) {
                        (SVGA_PITA_TINGGI * skala).dp
                    } else {
                        (lebarBanner.value / rasioBanner).dp.coerceIn(48.dp, 130.dp)
                    }
                    val bSize = DpSize(lebarBanner, tinggiBanner)
                    Box(
                        Modifier.size(bSize).clipToBounds().graphicsLayer { alpha = fade.value },
                    ) {
                        // Sampul PNG banner di belakang animasi: kalau SVGA gagal
                        // diputar, bannernya tetap kelihatan.
                        var bannerJalan by remember(asetBanner.n, asetBanner.updatedAt) { mutableStateOf(false) }
                        if (asetBanner.poster.isNotBlank() && !bannerJalan) {
                            coil.compose.AsyncImage(
                                model = asetBanner.poster,
                                contentDescription = null,
                                modifier = Modifier.fillMaxSize(),
                                contentScale = ContentScale.Crop,
                            )
                        }
                        if (svgaBanner) {
                            // Kanvas SVGA 750x1624 tapi gambarnya hanya pita di tengah. View
                            // dibuat sebesar kanvas penuh lalu digambar lewat graphicsLayer
                            // (translasi + clip) supaya SVGAImageView tetap berada di dalam
                            // layar dan benar-benar ikut digambar oleh Android.
                            val lebarKanvas = (750f * skala).dp
                            val isiTinggi = (1624f * skala).dp
                            val gesekAtas = (SVGA_PITA_Y0 * skala).dp
                            Box(
                                Modifier.fillMaxSize().clipToBounds(),
                                contentAlignment = Alignment.TopStart,
                            ) {
                                Box(
                                    Modifier
                                        .wrapContentSize(align = Alignment.TopStart, unbounded = true)
                                        .requiredSize(lebarKanvas, isiTinggi)
                                        .graphicsLayer {
                                            translationY = -gesekAtas.toPx()
                                        },
                                ) {
                                    VipMedia(
                                        asetBanner,
                                        Modifier.fillMaxSize(),
                                        loop = false,
                                        contentScale = ContentScale.FillBounds,
                                        onLangkah = { progres = it },
                                        onEnd = {
                                            // Animasi banner habis. Penutupan ditunda
                                            // sampai durasi minimum tercapai supaya
                                            // banner tidak sekelip lalu hilang.
                                            mintaTutup = true
                                        },
                                    )
                                }
                            }
                        } else {
                            VipMedia(asetBanner, Modifier.fillMaxSize(), loop = true, contentScale = ContentScale.Fit)
                        }
                    // Foto dan nama menempel di pita dan IKUT BERGERAK: posisinya dibaca
                    // per frame dari jalur layer "head" dan "Text1" di file SVGA.
                    val bu = bannerUid?.let { UserCache.peek(it) }
                    val fotoCx = svgaAmbil(SVGA_FOTO_CX, progres)
                    val teksX = svgaAmbil(SVGA_TEKS_X, progres)
                    val pitaTengahY = (SVGA_TEKS_Y - SVGA_PITA_Y0) * skala     // titik tengah pita (dp)
                    if (bu != null) {
                        val av = (SVGA_FOTO_D * 750f * skala).dp
                        Box(
                            Modifier
                                .offset(x = (fotoCx * skala).dp - av / 2, y = pitaTengahY.dp - av / 2)
                                .size(av)
                                .clip(CircleShape),
                            contentAlignment = Alignment.Center,
                        ) { PublicAvatar(bu, av) }
                    }
                    val nm = bannerName
                    if (!nm.isNullOrBlank()) {
                        // Nama dibesarkan sedikit dan digeser ke kanan agar ada jarak
                        // dari foto profil.
                        val tinggiTeks = (SVGA_PITA_TINGGI * skala * 0.42f).coerceIn(12f, 26f)
                        val geserNama = (SVGA_PITA_TINGGI * skala * 0.34f)
                        Box(
                            Modifier
                                .offset(
                                    x = (teksX * skala).dp + geserNama.dp,
                                    y = (pitaTengahY - tinggiTeks * 0.62f).dp,
                                )
                                .width((330f * skala).dp),
                            contentAlignment = Alignment.CenterStart,
                        ) {
                            Text(
                                nm,
                                color = Color(0xFFFFE9A0),
                                fontSize = tinggiTeks.sp,
                                fontWeight = FontWeight.ExtraBold,
                                textAlign = TextAlign.Start,
                                maxLines = 1,
                                style = androidx.compose.ui.text.TextStyle(
                                    shadow = Shadow(Color(0xCC000000), blurRadius = 10f),
                                ),
                            )
                        }
                    }
                    }
                }
            }
        }
    }
}

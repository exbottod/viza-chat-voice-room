package com.rezochatvoice.exceo

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.withContext
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

/**
 * Reward Room (Koin banyak) mingguan.
 *
 * Semua angka dihitung server VPS: aliran koin per room per minggu, tingkat
 * yang tercapai, pemilik kamar, dan Top kontributor. Aplikasi hanya menampilkan
 * hasilnya, jadi tidak ada hadiah yang bisa diakali dari HP. Halaman ini dibuka
 * dari ikon di bawah tombol roket (dalam room) dan dari banner di atas tab Party.
 */
object RewardRoomApi {
    private const val VPS = "https://viza.43-156-99-4.sslip.io"

    data class Tier(val aliran: Long, val pemilik: Long, val top: Int, val perOrang: Long)
    data class Kontributor(val uid: String, val coin: Long, val pos: Int, val hadiah: Long)
    data class Kamar(
        val roomId: String,
        val nama: String,
        val aliran: Long,
        val level: Int,
        val pemilik: Boolean,
        val hadiahPemilik: Long,
        val hadiahKontributor: Long,
        val posisiSaya: Int,
        val dalamHadiah: Boolean,
        val kontributor: List<Kontributor>,
    )
    data class Menang(val name: String, val room: String, val pos: String, val coin: Long, val level: Int)
    data class Info(
        val aktif: Boolean,
        val banner: String,
        val ikon: String,
        val aturan: String,
        val tiers: List<Tier>,
        val mulai: Long,
        val selesai: Long,
        val kamarSaya: List<Kamar>,
        val peringkat: List<Pair<String, Long>>,
        val menangLalu: List<Menang>,
    )

    @Volatile private var cacheInfo: Info? = null
    @Volatile private var cacheAt: Long = 0L

    private fun post(body: JSONObject): JSONObject? = try {
        val koneksi = URL("$VPS/rewardroom").openConnection() as HttpURLConnection
        koneksi.requestMethod = "POST"
        koneksi.connectTimeout = 15000
        koneksi.readTimeout = 20000
        koneksi.doOutput = true
        koneksi.setRequestProperty("content-type", "application/json")
        koneksi.outputStream.use { it.write(body.toString().toByteArray()) }
        val teks = koneksi.inputStream.bufferedReader().readText()
        JSONObject(teks)
    } catch (e: Exception) {
        null
    }

    private fun urai(d: JSONObject): Info {
        val tiers = mutableListOf<Tier>()
        d.optJSONArray("tiers")?.let { a ->
            for (i in 0 until a.length()) {
                val o = a.optJSONObject(i) ?: continue
                tiers.add(
                    Tier(
                        aliran = o.optLong("aliran"),
                        pemilik = o.optLong("pemilik"),
                        top = o.optInt("top"),
                        perOrang = o.optLong("perOrang"),
                    ),
                )
            }
        }
        val kamar = mutableListOf<Kamar>()
        d.optJSONArray("kamarSaya")?.let { a ->
            for (i in 0 until a.length()) {
                val o = a.optJSONObject(i) ?: continue
                val ks = mutableListOf<Kontributor>()
                o.optJSONArray("kontributor")?.let { ka ->
                    for (j in 0 until ka.length()) {
                        val k = ka.optJSONObject(j) ?: continue
                        ks.add(
                            Kontributor(
                                uid = k.optString("uid"),
                                coin = k.optLong("coin"),
                                pos = k.optInt("pos"),
                                hadiah = k.optLong("hadiah"),
                            ),
                        )
                    }
                }
                kamar.add(
                    Kamar(
                        roomId = o.optString("roomId"),
                        nama = o.optString("nama"),
                        aliran = o.optLong("aliran"),
                        level = o.optInt("level"),
                        pemilik = o.optBoolean("pemilik"),
                        hadiahPemilik = o.optLong("hadiahPemilik"),
                        hadiahKontributor = o.optLong("hadiahKontributor"),
                        posisiSaya = o.optInt("posisiSaya"),
                        dalamHadiah = o.optBoolean("dalamHadiah"),
                        kontributor = ks,
                    ),
                )
            }
        }
        val peringkat = mutableListOf<Pair<String, Long>>()
        d.optJSONArray("peringkat")?.let { a ->
            for (i in 0 until a.length()) {
                val o = a.optJSONObject(i) ?: continue
                peringkat.add(o.optString("nama") to o.optLong("aliran"))
            }
        }
        val menang = mutableListOf<Menang>()
        (d.optJSONObject("lalu")?.optJSONArray("pemenang"))?.let { a ->
            for (i in 0 until a.length()) {
                val o = a.optJSONObject(i) ?: continue
                menang.add(
                    Menang(
                        name = o.optString("name"),
                        room = o.optString("room"),
                        pos = o.optString("pos"),
                        coin = o.optLong("coin"),
                        level = o.optInt("level"),
                    ),
                )
            }
        }
        val p = d.optJSONObject("periode")
        return Info(
            aktif = d.optInt("aktif", 1) != 0,
            banner = d.optString("banner"),
            ikon = d.optString("ikon"),
            aturan = d.optString("aturan"),
            tiers = tiers,
            mulai = p?.optLong("mulai") ?: 0L,
            selesai = p?.optLong("selesai") ?: 0L,
            kamarSaya = kamar,
            peringkat = peringkat,
            menangLalu = menang,
        )
    }

    @Volatile private var cacheLalu: Info? = null
    @Volatile private var cacheLaluAt: Long = 0L

    /** [mode] "lalu" mengambil data periode minggu sebelumnya. */
    suspend fun info(uid: String, paksa: Boolean = false, mode: String = "kini"): Info? = withContext(Dispatchers.IO) {
        val lalu = mode == "lalu"
        val c = if (lalu) cacheLalu else cacheInfo
        val at = if (lalu) cacheLaluAt else cacheAt
        if (!paksa && c != null && System.currentTimeMillis() - at < 30_000L) return@withContext c
        val body = JSONObject().put("do", "info").put("uid", uid)
        if (lalu) body.put("mode", "lalu")
        val d = post(body) ?: return@withContext c
        if (d.optInt("ok", 0) != 1) return@withContext c
        val hasil = urai(d)
        if (lalu) { cacheLalu = hasil; cacheLaluAt = System.currentTimeMillis() }
        else { cacheInfo = hasil; cacheAt = System.currentTimeMillis() }
        hasil
    }

    /** URL banner/ikon dari panel (kosong = pakai gambar bawaan APK). */
    @Volatile var bannerUrl: String = ""
        private set
    @Volatile var ikonUrl: String = ""
        private set

    suspend fun muatTampilan() {
        val i = info("") ?: return
        bannerUrl = i.banner
        ikonUrl = i.ikon
    }
}

/** Jalan masuk halaman reward room dari room maupun tab Party. */
object RewardRoomOpen {
    var terbuka by mutableStateOf(false)
    fun buka() { terbuka = true }
}

private val WarnaBg = Color(0xFF0B0D12)
private val WarnaKartu = Color(0xFF161A22)
private val WarnaGaris = Color(0xFF232A36)
private val WarnaEmas = Color(0xFFFFC94D)
private val WarnaHijau = Color(0xFF31C48D)
private val WarnaAbu = Color(0xFF9AA4B2)

/** Ikon kecil di dalam room, tepat di bawah tombol roket. */
@Composable
fun RewardRoomRoomIcon(onClick: () -> Unit, modifier: Modifier = Modifier) {
    LaunchedEffect(Unit) { RewardRoomApi.muatTampilan() }
    val url = RewardRoomApi.ikonUrl
    Box(
        modifier
            .size(46.dp)
            .clip(RoundedCornerShape(12.dp))
            .clickable { onClick() },
    ) {
        if (url.isNotBlank()) {
            AsyncImage(
                model = url,
                contentDescription = tr("Reward room"),
                contentScale = ContentScale.Crop,
                modifier = Modifier.fillMaxSize(),
            )
        } else {
            Image(
                painter = painterResource(R.drawable.reward_room_icon),
                contentDescription = tr("Reward room"),
                contentScale = ContentScale.Crop,
                modifier = Modifier.fillMaxSize(),
            )
        }
    }
}

/** Banner di atas tab Party: diketuk membuka halaman reward room. */
@Composable
fun RewardRoomPartyBanner(onClick: () -> Unit, modifier: Modifier = Modifier) {
    LaunchedEffect(Unit) { RewardRoomApi.muatTampilan() }
    val url = RewardRoomApi.bannerUrl
    Box(
        // Banner memakai rasio 3:1 sesuai gambar yang diunggah owner.
        modifier
            .fillMaxWidth()
            .aspectRatio(3f)
            .clip(RoundedCornerShape(14.dp))
            .clickable { onClick() },
    ) {
        if (url.isNotBlank()) {
            AsyncImage(
                model = url,
                contentDescription = tr("Koin banyak"),
                contentScale = ContentScale.Crop,
                modifier = Modifier.fillMaxSize(),
            )
        } else {
            Image(
                painter = painterResource(R.drawable.reward_room_banner),
                contentDescription = tr("Koin banyak"),
                contentScale = ContentScale.Crop,
                modifier = Modifier.fillMaxSize(),
            )
        }
        Row(
            Modifier
                .align(Alignment.BottomStart)
                .padding(8.dp)
                .clip(RoundedCornerShape(8.dp))
                .background(Color(0xB3000000))
                .padding(horizontal = 8.dp, vertical = 3.dp),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Text(tr("Aturan & hadiah"), color = Color.White, fontSize = 11.sp)
        }
    }
}

private fun jamTersisa(sampai: Long): String {
    val sisa = (sampai - System.currentTimeMillis()).coerceAtLeast(0L)
    val hari = sisa / 86_400_000L
    val jam = (sisa % 86_400_000L) / 3_600_000L
    val menit = (sisa % 3_600_000L) / 60_000L
    return if (hari > 0) tr("%d hari %d jam lagi").format(hari, jam)
    else tr("%d jam %d menit lagi").format(jam, menit)
}

/** Halaman reward room bergaya Koin banyak: emas di atas ungu tua. */
@Composable
fun RewardRoomScreen(myUid: String, onClose: () -> Unit) {
    var tab by remember { mutableStateOf(0) }
    var infoKini by remember { mutableStateOf<RewardRoomApi.Info?>(null) }
    var infoLalu by remember { mutableStateOf<RewardRoomApi.Info?>(null) }
    var memuat by remember { mutableStateOf(true) }
    val listState = rememberLazyListState()
    val i = if (tab == 0) infoKini else infoLalu

    LaunchedEffect(tab, myUid) {
        if ((tab == 0 && infoKini != null) || (tab == 1 && infoLalu != null)) {
            memuat = false
            return@LaunchedEffect
        }
        memuat = true
        val hasil = RewardRoomApi.info(myUid, true, if (tab == 0) "kini" else "lalu")
        if (tab == 0) infoKini = hasil else infoLalu = hasil
        memuat = false
    }

    // Detak tiap detik supaya hitung mundur berjalan.
    var sekarang by remember { mutableStateOf(System.currentTimeMillis()) }
    LaunchedEffect(Unit) {
        while (true) {
            sekarang = System.currentTimeMillis()
            delay(1000L)
        }
    }

    Box(
        Modifier
            .fillMaxSize()
            .background(
                Brush.verticalGradient(
                    listOf(Color(0xFF3B0B5F), Color(0xFF26063F), Color(0xFF160128)),
                ),
            ),
    ) {
        Column(Modifier.fillMaxSize().statusBarsPadding()) {
            Row(
                Modifier.fillMaxWidth().padding(horizontal = 6.dp, vertical = 4.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                IconButton(onClick = onClose) {
                    Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = tr("Kembali"), tint = Color.White)
                }
                Column(Modifier.weight(1f)) {
                    Text(tr("Koin banyak"), color = EmasMuda, fontWeight = FontWeight.Bold, fontSize = 17.sp)
                    Text(
                        when {
                            i == null -> tr("Reward room mingguan")
                            tab == 1 -> tr("Hasil minggu lalu")
                            else -> tr("Manfaat waktu terbatas untuk pemilik room")
                        },
                        color = Color(0xFFD8C4F2), fontSize = 11.sp,
                    )
                }
            }

            LazyColumn(
                state = listState,
                modifier = Modifier.fillMaxSize().padding(horizontal = 12.dp),
                contentPadding = PaddingValues(top = 6.dp, bottom = 28.dp),
            ) {
                item {
                    BannerKoin(i?.banner ?: RewardRoomApi.bannerUrl)
                    Spacer(Modifier.height(10.dp))
                }
                item {
                    TabPeriode(tab) { tab = it }
                    Spacer(Modifier.height(8.dp))
                }
                if (tab == 0 && i != null && i.selesai > 0L) {
                    item {
                        HitungMundur(i.selesai - sekarang)
                        Spacer(Modifier.height(6.dp))
                    }
                }
                if (memuat) {
                    item {
                        Box(Modifier.fillMaxWidth().height(200.dp), contentAlignment = Alignment.Center) { VizaLoading() }
                    }
                } else if (i == null) {
                    item {
                        Text(
                            tr("Gagal memuat data reward. Periksa koneksi lalu coba lagi."),
                            color = Color(0xFFD8C4F2), fontSize = 12.sp,
                            modifier = Modifier.padding(vertical = 24.dp),
                        )
                    }
                } else {
                    item {
                        PanelEmas(tr("Kamar saya")) { IsiKamarSaya(i) }
                        Spacer(Modifier.height(8.dp))
                    }
                    item {
                        CatatanHadiah(i)
                        Spacer(Modifier.height(4.dp))
                    }
                    item {
                        PanelEmas(tr("Hadiah aliran room")) { IsiTabelHadiah(i.tiers) }
                        Spacer(Modifier.height(8.dp))
                    }
                    if (tab == 1) {
                        item {
                            PanelEmas(tr("Hadiah dibagikan")) { IsiPemenang(i.menangLalu) }
                            Spacer(Modifier.height(8.dp))
                        }
                    }
                    item {
                        TeksAturan(i.aturan)
                        Spacer(Modifier.height(10.dp))
                    }
                }
            }
        }
    }
}

private val EmasMuda = Color(0xFFFFD98A)
private val Emas = Color(0xFFE0A63C)
private val EmasGelap = Color(0xFF8A5A17)
private val UnguPanel = Color(0x88300C52)
private val TeksPutih = Color(0xFFF4ECFF)

/** Angka hadiah dua desimal: 7.20M, 836.00K. */
private fun fmt2(n: Long): String {
    fun f(x: Double, s: String): String = String.format(Locale.US, "%.2f", x) + s
    return when {
        n >= 1_000_000_000L -> f(n / 1e9, "B")
        n >= 1_000_000L -> f(n / 1e6, "M")
        n >= 1_000L -> f(n / 1e3, "K")
        else -> n.toString()
    }
}

@Composable
private fun BannerKoin(url: String) {
    val bentuk = RoundedCornerShape(14.dp)
    Box(
        Modifier
            .fillMaxWidth()
            .aspectRatio(3f)
            .clip(bentuk)
            .border(2.dp, Brush.linearGradient(listOf(EmasGelap, EmasMuda, EmasGelap)), bentuk),
    ) {
        if (url.isNotBlank()) {
            AsyncImage(
                model = url, contentDescription = tr("Koin banyak"),
                contentScale = ContentScale.Crop, modifier = Modifier.fillMaxSize(),
            )
        } else {
            Image(
                painter = painterResource(R.drawable.reward_room_banner),
                contentDescription = tr("Koin banyak"),
                contentScale = ContentScale.Crop, modifier = Modifier.fillMaxSize(),
            )
        }
    }
}

@Composable
private fun TabPeriode(tab: Int, onPilih: (Int) -> Unit) {
    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(10.dp)) {
        listOf(tr("Periode ini"), tr("Periode lalu")).forEachIndexed { idx, label ->
            val aktif = tab == idx
            Box(
                Modifier
                    .weight(1f)
                    .height(44.dp)
                    .clip(RoundedCornerShape(8.dp))
                    .background(
                        if (aktif) Brush.horizontalGradient(listOf(Color(0xFFF9DC8A), Color(0xFFC8892B)))
                        else Brush.horizontalGradient(listOf(Color(0xFF3F1468), Color(0xFF2A0C4A))),
                    )
                    .border(1.5.dp, if (aktif) EmasMuda else EmasGelap, RoundedCornerShape(8.dp))
                    .clickable { onPilih(idx) },
                contentAlignment = Alignment.Center,
            ) {
                Text(
                    label,
                    color = if (aktif) Color(0xFF3A1B00) else Color(0xFFEADCFA),
                    fontWeight = FontWeight.Bold, fontSize = 14.sp,
                )
            }
        }
    }
}

@Composable
private fun HitungMundur(sisaMs: Long) {
    val s = (sisaMs / 1000L).coerceAtLeast(0L)
    val bagian = listOf(
        String.format(Locale.US, "%02d", s / 86400L) to tr("Hari"),
        String.format(Locale.US, "%02d", (s % 86400L) / 3600L) to tr("Jam"),
        String.format(Locale.US, "%02d", (s % 3600L) / 60L) to tr("Menit"),
        String.format(Locale.US, "%02d", s % 60L) to tr("Detik"),
    )
    Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
        Text(tr("Hitung undur"), color = Color(0xFFD8C4F2), fontSize = 11.sp)
        Spacer(Modifier.width(8.dp))
        bagian.forEach { (angka, label) ->
            Box(
                Modifier
                    .size(30.dp)
                    .clip(RoundedCornerShape(6.dp))
                    .background(Color(0x33000000))
                    .border(1.dp, EmasGelap, RoundedCornerShape(6.dp)),
                contentAlignment = Alignment.Center,
            ) {
                Text(angka, color = EmasMuda, fontSize = 13.sp, fontWeight = FontWeight.Bold)
            }
            Spacer(Modifier.width(3.dp))
            Text(label, color = Color(0xFFD8C4F2), fontSize = 10.sp)
            Spacer(Modifier.width(6.dp))
        }
    }
}

@Composable
private fun PanelEmas(judul: String, isi: @Composable ColumnScope.() -> Unit) {
    Column(Modifier.fillMaxWidth()) {
        Box(Modifier.fillMaxWidth(), contentAlignment = Alignment.Center) {
            Box(
                Modifier
                    .fillMaxWidth()
                    .height(32.dp)
                    .padding(horizontal = 24.dp)
                    .clip(RoundedCornerShape(8.dp))
                    .background(Brush.horizontalGradient(listOf(Color(0xFF2B0B4E), Color(0xFF54197F), Color(0xFF2B0B4E))))
                    .border(1.dp, Emas, RoundedCornerShape(8.dp)),
            )
            Text(judul, color = EmasMuda, fontWeight = FontWeight.Bold, fontSize = 15.sp)
        }
        Column(
            Modifier
                .fillMaxWidth()
                .padding(top = 4.dp)
                .clip(RoundedCornerShape(10.dp))
                .background(UnguPanel)
                .border(1.5.dp, EmasGelap, RoundedCornerShape(10.dp))
                .padding(horizontal = 10.dp, vertical = 10.dp),
            content = isi,
        )
    }
}

@Composable
private fun IsiKamarSaya(i: RewardRoomApi.Info) {
    val k = i.kamarSaya.firstOrNull()
    val header = listOf(
        tr("Aliran Kamar"),
        tr("Mencapai Level"),
        tr("Hadiah Pemilik Kamar (koin)"),
    )
    val nilai = listOf(
        fmt2(k?.aliran ?: 0L),
        (k?.level ?: 0).toString(),
        fmt2(k?.hadiahPemilik ?: 0L),
    )
    Row(Modifier.fillMaxWidth()) {
        header.forEachIndexed { idx, label ->
            Column(
                Modifier.weight(1f).padding(horizontal = 3.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
            ) {
                Text(
                    label, color = TeksPutih, fontSize = 10.sp, fontWeight = FontWeight.Bold,
                    textAlign = TextAlign.Center, lineHeight = 13.sp,
                )
                Spacer(Modifier.height(8.dp))
                Text(nilai[idx], color = EmasMuda, fontSize = 13.sp, fontWeight = FontWeight.Bold)
            }
        }
    }
}

@Composable
private fun CatatanHadiah(i: RewardRoomApi.Info) {
    val dapat = i.kamarSaya.any { k -> (k.pemilik && k.hadiahPemilik > 0L) || k.dalamHadiah }
    val teks = tr("Setiap pengguna hanya dapat menerima satu hadiah per minggu, berdasarkan hadiah tunggal level tertinggi.") +
        " " + if (dapat) {
            tr("Hadiah Anda akan masuk otomatis ke dompet saat periode berakhir.")
        } else {
            tr("Sayangnya, Anda tidak memiliki hadiah koin yang bisa diterima saat ini.")
        }
    Text(teks, color = TeksPutih, fontSize = 11.sp, lineHeight = 16.sp)
}

@Composable
private fun IsiTabelHadiah(tiers: List<RewardRoomApi.Tier>) {
    val judul = listOf(
        tr("Aliran mg room"),
        tr("Hadiah Pemilik kamar (koin)"),
        tr("Peringkat kontributor"),
        tr("Hadiah kontributor (koin emas/orang)"),
    )
    Row(Modifier.fillMaxWidth()) {
        judul.forEach { t ->
            Text(
                t, color = TeksPutih, fontSize = 9.sp, fontWeight = FontWeight.Bold,
                textAlign = TextAlign.Center, lineHeight = 12.sp,
                modifier = Modifier.weight(1f).padding(horizontal = 2.dp),
            )
        }
    }
    Spacer(Modifier.height(6.dp))
    Box(Modifier.fillMaxWidth().height(1.dp).background(Color(0x55E0A63C)))
    tiers.forEach { t ->
        Row(Modifier.fillMaxWidth().padding(vertical = 7.dp), verticalAlignment = Alignment.CenterVertically) {
            listOf(
                fmt2(t.aliran),
                fmt2(t.pemilik),
                "Top1-${t.top}",
                fmt2(t.perOrang),
            ).forEach { v ->
                Text(
                    v, color = if (v.startsWith("Top")) Color(0xFFFFB4E6) else EmasMuda,
                    fontSize = 11.sp, fontWeight = FontWeight.SemiBold,
                    textAlign = TextAlign.Center,
                    modifier = Modifier.weight(1f).padding(horizontal = 2.dp),
                )
            }
        }
        Box(Modifier.fillMaxWidth().height(1.dp).background(Color(0x33FFFFFF)))
    }
}

@Composable
private fun IsiPemenang(menang: List<RewardRoomApi.Menang>) {
    if (menang.isEmpty()) {
        Text(
            tr("Belum ada hadiah yang dibagikan untuk periode ini."),
            color = TeksPutih, fontSize = 11.sp, lineHeight = 16.sp,
        )
        return
    }
    menang.forEach { m ->
        Row(Modifier.fillMaxWidth().padding(vertical = 4.dp), verticalAlignment = Alignment.CenterVertically) {
            Column(Modifier.weight(1f)) {
                Text(m.name, color = TeksPutih, fontSize = 12.sp, fontWeight = FontWeight.SemiBold)
                Text("${m.pos} · ${m.room} · ${tr("tingkat")} ${m.level}", color = Color(0xFFD8C4F2), fontSize = 10.sp)
            }
            Text("+${fmt2(m.coin)}", color = Color(0xFF6BE3A5), fontSize = 12.sp, fontWeight = FontWeight.Bold)
        }
    }
}

@Composable
private fun TeksAturan(aturan: String) {
    Column(Modifier.fillMaxWidth().padding(horizontal = 4.dp)) {
        aturan.split("\n").filter { it.isNotBlank() }.forEachIndexed { idx, baris ->
            val bersih = baris.trim().removePrefix("*").trim()
            Text(
                if (bersih.firstOrNull()?.isDigit() == true || bersih.startsWith("*")) bersih else "${idx + 1}. $bersih",
                color = TeksPutih, fontSize = 11.sp, lineHeight = 17.sp,
                modifier = Modifier.padding(bottom = 5.dp),
            )
        }
    }
}

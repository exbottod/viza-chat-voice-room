package com.rezochatvoice.exceo

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
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
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
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

    suspend fun info(uid: String, paksa: Boolean = false): Info? = withContext(Dispatchers.IO) {
        val c = cacheInfo
        if (!paksa && c != null && System.currentTimeMillis() - cacheAt < 30_000L) return@withContext c
        val body = JSONObject().put("do", "info").put("uid", uid)
        val d = post(body) ?: return@withContext c
        if (d.optInt("ok", 0) != 1) return@withContext c
        val hasil = urai(d)
        cacheInfo = hasil
        cacheAt = System.currentTimeMillis()
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
        modifier
            .fillMaxWidth()
            .height(70.dp)
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

/** Halaman reward room: periode ini, Kamar saya, tabel hadiah, periode lalu. */
@Composable
fun RewardRoomScreen(myUid: String, onClose: () -> Unit) {
    var info by remember { mutableStateOf<RewardRoomApi.Info?>(null) }
    var memuat by remember { mutableStateOf(true) }
    var tab by remember { mutableStateOf(0) }
    var detak by remember { mutableStateOf(0L) }
    val listState = rememberLazyListState()

    LaunchedEffect(myUid) {
        info = RewardRoomApi.info(myUid, paksa = true)
        memuat = false
    }
    LaunchedEffect(Unit) {
        while (true) {
            delay(30_000L)
            info = RewardRoomApi.info(myUid)
            detak = System.currentTimeMillis()
        }
    }

    val i = info
    Box(Modifier.fillMaxSize().background(WarnaBg)) {
        // Latar banner diunggah owner lewat panel, disajikan dari server.
        val latar = i?.banner.orEmpty()
        if (latar.isNotBlank()) {
            AsyncImage(
                model = latar,
                contentDescription = null,
                contentScale = ContentScale.Crop,
                modifier = Modifier.fillMaxWidth().height(230.dp).align(Alignment.TopCenter),
            )
            Box(
                Modifier
                    .fillMaxWidth()
                    .height(230.dp)
                    .align(Alignment.TopCenter)
                    .background(Brush.verticalGradient(listOf(Color(0x66000000), WarnaBg))),
            )
        }

        Column(Modifier.fillMaxSize().statusBarsPadding()) {
            Row(
                Modifier.fillMaxWidth().padding(horizontal = 6.dp, vertical = 4.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                IconButton(onClick = onClose) {
                    Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = tr("Kembali"), tint = Color.White)
                }
                Column(Modifier.weight(1f)) {
                    Text(tr("Koin banyak"), color = WarnaEmas, fontWeight = FontWeight.Bold, fontSize = 17.sp)
                    Text(
                        if (i == null || i.selesai <= 0L) tr("Reward room mingguan")
                        else jamTersisa(i.selesai),
                        color = WarnaAbu, fontSize = 11.sp,
                    )
                }
            }

            Row(Modifier.fillMaxWidth().padding(horizontal = 14.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                TabKecil(tr("Periode ini"), tab == 0) { tab = 0 }
                TabKecil(tr("Periode lalu"), tab == 1) { tab = 1 }
            }

            if (memuat) {
                Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) { VizaLoading() }
                return@Column
            }
            if (i == null) {
                Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                    Text(tr("Gagal memuat data reward. Coba lagi."), color = WarnaAbu, fontSize = 13.sp)
                }
                return@Column
            }
            if (!i.aktif) {
                Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                    Text(tr("Acara reward room sedang tidak aktif."), color = WarnaAbu, fontSize = 13.sp)
                }
                return@Column
            }

            LazyColumn(
                state = listState,
                modifier = Modifier.fillMaxSize().padding(horizontal = 14.dp),
                contentPadding = PaddingValues(top = 10.dp, bottom = 28.dp),
            ) {
                if (tab == 0) {
                    item {
                        KartuKamarSaya(i)
                        Spacer(Modifier.height(10.dp))
                    }
                    if (i.kamarSaya.isNotEmpty()) {
                        items(i.kamarSaya) { k -> KontributorKartu(k); Spacer(Modifier.height(8.dp)) }
                    }
                    item {
                        Spacer(Modifier.height(4.dp))
                        Text(tr("Peringkat room"), color = Color.White, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                        Spacer(Modifier.height(6.dp))
                    }
                    if (i.peringkat.isEmpty()) {
                        item {
                            Text(tr("Belum ada aliran koin minggu ini."), color = WarnaAbu, fontSize = 12.sp)
                            Spacer(Modifier.height(10.dp))
                        }
                    }
                    items(i.peringkat.withIndex().toList()) { (idx, rk) ->
                        Row(
                            Modifier
                                .fillMaxWidth()
                                .clip(RoundedCornerShape(10.dp))
                                .background(WarnaKartu)
                                .padding(horizontal = 12.dp, vertical = 8.dp),
                            verticalAlignment = Alignment.CenterVertically,
                        ) {
                            Text("${idx + 1}", color = WarnaEmas, fontSize = 12.sp, modifier = Modifier.width(26.dp))
                            Text(rk.first, color = Color.White, fontSize = 12.sp, modifier = Modifier.weight(1f))
                            Text(fmtKoin(rk.second), color = WarnaHijau, fontSize = 12.sp)
                        }
                        Spacer(Modifier.height(6.dp))
                    }
                    item {
                        Spacer(Modifier.height(6.dp))
                        Text(tr("Tabel hadiah"), color = Color.White, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                        Spacer(Modifier.height(6.dp))
                        BarisTabel(true, tr("Aliran koin"), tr("Pemilik"), tr("Kontributor"), tr("Hadiah/orang"))
                    }
                    items(i.tiers) { t ->
                        BarisTabel(
                            false,
                            fmtKoin(t.aliran),
                            fmtKoin(t.pemilik),
                            "Top 1-${t.top}",
                            fmtKoin(t.perOrang),
                        )
                    }
                    item {
                        Spacer(Modifier.height(12.dp))
                        Text(tr("Aturan"), color = Color.White, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                        Spacer(Modifier.height(6.dp))
                        Text(i.aturan, color = WarnaAbu, fontSize = 12.sp, lineHeight = 18.sp)
                        Spacer(Modifier.height(10.dp))
                        Text(
                            tr("Hadiah dibagikan otomatis setiap Senin 00:05 WIB dan pemberitahuan dikirim ke chat Customer Service."),
                            color = WarnaAbu, fontSize = 11.sp, lineHeight = 16.sp,
                        )
                    }
                } else {
                    item {
                        Text(tr("Periode lalu"), color = Color.White, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                        Spacer(Modifier.height(8.dp))
                    }
                    if (i.menangLalu.isEmpty()) {
                        item { Text(tr("Belum ada hadiah yang dibagikan."), color = WarnaAbu, fontSize = 12.sp) }
                    }
                    items(i.menangLalu) { m ->
                        Row(
                            Modifier
                                .fillMaxWidth()
                                .clip(RoundedCornerShape(10.dp))
                                .background(WarnaKartu)
                                .padding(horizontal = 12.dp, vertical = 9.dp),
                            verticalAlignment = Alignment.CenterVertically,
                        ) {
                            Column(Modifier.weight(1f)) {
                                Text(m.name, color = Color.White, fontSize = 12.sp, fontWeight = FontWeight.SemiBold)
                                Text("${m.pos} · ${m.room} · ${tr("tingkat")} ${m.level}", color = WarnaAbu, fontSize = 10.sp)
                            }
                            Text("+${fmtKoin(m.coin)}", color = WarnaHijau, fontSize = 12.sp, fontWeight = FontWeight.Bold)
                        }
                        Spacer(Modifier.height(6.dp))
                    }
                }
            }
        }
    }
}

@Composable
private fun TabKecil(label: String, aktif: Boolean, onClick: () -> Unit) {
    Box(
        Modifier
            .clip(RoundedCornerShape(20.dp))
            .background(if (aktif) WarnaEmas else WarnaKartu)
            .clickable { onClick() }
            .padding(horizontal = 14.dp, vertical = 6.dp),
    ) {
        Text(label, color = if (aktif) Color(0xFF141414) else WarnaAbu, fontSize = 12.sp, fontWeight = FontWeight.SemiBold)
    }
}

@Composable
private fun KartuKamarSaya(i: RewardRoomApi.Info) {
    val k = i.kamarSaya.firstOrNull()
    Column(
        Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(14.dp))
            .background(WarnaKartu)
            .padding(14.dp),
    ) {
        Text(tr("Kamar saya"), color = WarnaEmas, fontWeight = FontWeight.Bold, fontSize = 13.sp)
        Spacer(Modifier.height(8.dp))
        if (k == null) {
            Text(
                tr("Belum ada aliran koin dari room Anda minggu ini. Kirim gift di room untuk menaikkan tingkat."),
                color = WarnaAbu, fontSize = 12.sp, lineHeight = 17.sp,
            )
            return@Column
        }
        Text(k.nama, color = Color.White, fontSize = 13.sp, fontWeight = FontWeight.SemiBold)
        Spacer(Modifier.height(6.dp))
        BarisInfo(tr("Aliran koin"), fmtKoin(k.aliran))
        BarisInfo(tr("Mencapai tingkat"), "${k.level} / ${i.tiers.size}")
        if (k.pemilik) BarisInfo(tr("Hadiah pemilik"), fmtKoin(k.hadiahPemilik))
        BarisInfo(tr("Hadiah kontributor"), "${fmtKoin(k.hadiahKontributor)} / ${tr("orang")}")
        if (!k.pemilik) {
            BarisInfo(
                tr("Posisi saya"),
                if (k.posisiSaya > 0) "#${k.posisiSaya}${if (k.dalamHadiah) " (${tr("dapat hadiah")})" else ""}" else "-",
            )
        }
    }
}

@Composable
private fun BarisInfo(kiri: String, kanan: String) {
    Row(Modifier.fillMaxWidth().padding(vertical = 3.dp), verticalAlignment = Alignment.CenterVertically) {
        Text(kiri, color = WarnaAbu, fontSize = 12.sp, modifier = Modifier.weight(1f))
        Text(kanan, color = Color.White, fontSize = 12.sp, fontWeight = FontWeight.SemiBold)
    }
}

@Composable
private fun KontributorKartu(k: RewardRoomApi.Kamar) {
    Column(
        Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(12.dp))
            .background(WarnaKartu)
            .padding(12.dp),
    ) {
        Text("${tr("Top kontributor")} · ${k.nama}", color = WarnaEmas, fontSize = 12.sp, fontWeight = FontWeight.Bold)
        Spacer(Modifier.height(6.dp))
        if (k.kontributor.isEmpty()) {
            Text(tr("Belum ada kontributor minggu ini."), color = WarnaAbu, fontSize = 11.sp)
            return@Column
        }
        k.kontributor.forEach { c ->
            Row(Modifier.fillMaxWidth().padding(vertical = 2.dp), verticalAlignment = Alignment.CenterVertically) {
                Text("#${c.pos}", color = WarnaEmas, fontSize = 11.sp, modifier = Modifier.width(28.dp))
                Text(c.uid.take(10), color = WarnaAbu, fontSize = 11.sp, modifier = Modifier.weight(1f))
                Text(fmtKoin(c.coin), color = Color.White, fontSize = 11.sp, modifier = Modifier.width(86.dp))
                Text(
                    if (c.hadiah > 0) "+${fmtKoin(c.hadiah)}" else "-",
                    color = if (c.hadiah > 0) WarnaHijau else WarnaAbu, fontSize = 11.sp,
                )
            }
        }
    }
}

@Composable
private fun BarisTabel(judul: Boolean, a: String, b: String, c: String, d: String) {
    Row(
        Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(8.dp))
            .background(if (judul) WarnaGaris else WarnaKartu)
            .padding(horizontal = 8.dp, vertical = 7.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        val warna = if (judul) WarnaEmas else Color.White
        val ukuran = if (judul) 10.sp else 11.sp
        Text(a, color = warna, fontSize = ukuran, modifier = Modifier.weight(1.2f))
        Text(b, color = warna, fontSize = ukuran, modifier = Modifier.weight(1f))
        Text(c, color = warna, fontSize = ukuran, modifier = Modifier.weight(0.9f))
        Text(d, color = warna, fontSize = ukuran, modifier = Modifier.weight(1f))
    }
    Spacer(Modifier.height(4.dp))
}

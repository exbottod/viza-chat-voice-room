package com.rezochatvoice.exceo

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableLongStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.FirebaseDatabase
import kotlinx.coroutines.delay

/**
 * Room PK: dua kubu bertanding mengumpulkan nilai gift selama durasi tertentu.
 *
 * Alurnya sama seperti aplikasi rujukan:
 * 1. Pemilik room menekan PK, memilih mode (1v1 atau tim) dan durasi.
 * 2. Status PK ditulis ke Realtime Database (roomsPub/{roomId}/pk) supaya semua
 *    orang di room melihat bar PK dan hitungan waktu yang sama.
 * 3. Setiap gift yang masuk menambah skor kubu penerimanya.
 * 4. Saat waktu habis, skor dibekukan dan muncul dialog hasil.
 */
data class PkState(
    val aktif: Boolean = false,
    val mode: String = "1v1",
    val durasiDetik: Int = 300,
    val mulai: Long = 0L,
    val akhir: Long = 0L,
    val aUid: String = "",
    val aNama: String = "",
    val bUid: String = "",
    val bNama: String = "",
    val aSkor: Long = 0L,
    val bSkor: Long = 0L,
    val aAnggota: Map<String, Long> = emptyMap(),
    val bAnggota: Map<String, Long> = emptyMap(),
    val selesai: Boolean = false,
) {
    fun sisaDetik(now: Long): Int = (((akhir - now) / 1000L).toInt()).coerceAtLeast(0)
    val pemenang: String
        get() = when {
            aSkor > bSkor -> "a"
            bSkor > aSkor -> "b"
            else -> "seri"
        }
}

object RoomPk {
    private fun db() = FirebaseDatabase.getInstance()
    private fun ref(roomId: String) = Rtdb.ref("roomsPub/$roomId/pk")

    private fun kePk(s: DataSnapshot): PkState {
        fun long(k: String): Long = (s.child(k).value as? Number)?.toLong() ?: 0L
        fun teks(k: String): String = s.child(k).value as? String ?: ""
        fun anggota(k: String): Map<String, Long> =
            (s.child(k).value as? Map<*, *>)?.mapNotNull { (u, v) ->
                val uid = u as? String ?: return@mapNotNull null
                uid to ((v as? Number)?.toLong() ?: 0L)
            }?.toMap().orEmpty()
        return PkState(
            aktif = s.child("aktif").value.keBool(),
            mode = teks("mode").ifBlank { "1v1" },
            durasiDetik = long("durasi").toInt().let { if (it <= 0) 300 else it },
            mulai = long("mulai"),
            akhir = long("akhir"),
            aUid = teks("aUid"),
            aNama = teks("aNama"),
            bUid = teks("bUid"),
            bNama = teks("bNama"),
            aSkor = long("aSkor"),
            bSkor = long("bSkor"),
            aAnggota = anggota("aAnggota"),
            bAnggota = anggota("bAnggota"),
            selesai = s.child("selesai").value.keBool(),
        )
    }

    fun observe(roomId: String, onChange: (PkState?) -> Unit): Reg =
        Rtdb.listen(ref(roomId)) { snap -> onChange(if (snap.exists()) kePk(snap) else null) }

    /** Mulai PK. Pemilik room memilih mode, durasi, dan lawan. */
    fun mulai(
        roomId: String,
        mode: String,
        durasiDetik: Int,
        aUid: String,
        aNama: String,
        bUid: String,
        bNama: String,
    ) {
        val now = Rtdb.serverNow()
        val data = mutableMapOf<String, Any>(
            "aktif" to true,
            "mode" to mode,
            "durasi" to durasiDetik,
            "mulai" to now,
            "akhir" to now + durasiDetik * 1000L,
            "aUid" to aUid,
            "aNama" to aNama,
            "bUid" to bUid,
            "bNama" to bNama,
            "aSkor" to 0L,
            "bSkor" to 0L,
            "selesai" to false,
        )
        ref(roomId).setValue(data)
    }

    /** Hentikan PK lebih awal (pemilik room). */
    fun hentikan(roomId: String) {
        ref(roomId).removeValue()
    }

    /**
     * Tambah skor dari gift yang baru masuk. Nilai dihitung ke kubu penerima gift,
     * jadi pendukung memberi hadiah ke host yang dia dukung.
     */
    fun tambahSkor(roomId: String, total: Long, ke: List<String>) {
        if (roomId.isBlank() || total <= 0L || ke.isEmpty()) return
        val r = ref(roomId)
        // Baca status PK sekali, lalu tambahkan hanya kalau PK sedang berjalan.
        r.get().addOnSuccessListener { snap ->
            if (!snap.exists() || !snap.child("aktif").value.keBool() || snap.child("selesai").value.keBool()) return@addOnSuccessListener
            val aUid = snap.child("aUid").value as? String ?: ""
            val bUid = snap.child("bUid").value as? String ?: ""
            fun skor(k: String): Long = (snap.child(k).value as? Number)?.toLong() ?: 0L
            val perOrang = total / ke.size.coerceAtLeast(1)
            val ubah = mutableMapOf<String, Any>()
            var nilaiA = 0L
            var nilaiB = 0L
            ke.forEach { penerima ->
                if (penerima.isBlank()) return@forEach
                val kubu = when {
                    penerima == aUid -> "a"
                    penerima == bUid -> "b"
                    snap.child("aAnggota").hasChild(penerima) -> "a"
                    snap.child("bAnggota").hasChild(penerima) -> "b"
                    else -> ""
                }
                if (kubu == "a") {
                    nilaiA += perOrang
                    val lama = (snap.child("aAnggota").child(penerima).value as? Number)?.toLong() ?: 0L
                    ubah["aAnggota/" + penerima] = lama + perOrang
                } else if (kubu == "b") {
                    nilaiB += perOrang
                    val lama = (snap.child("bAnggota").child(penerima).value as? Number)?.toLong() ?: 0L
                    ubah["bAnggota/" + penerima] = lama + perOrang
                }
            }
            if (nilaiA > 0L) ubah["aSkor"] = skor("aSkor") + nilaiA
            if (nilaiB > 0L) ubah["bSkor"] = skor("bSkor") + nilaiB
            if (ubah.isNotEmpty()) r.updateChildren(ubah)
        }
    }

    /** Tandai PK selesai (dipanggil sekali oleh host saat waktu habis). */
    fun tandaiSelesai(roomId: String) {
        ref(roomId).child("selesai").setValue(true)
    }
}

/** Bar PK di atas layar room: nama, skor, waktu, dan pita perbandingan. */
@Composable
fun PkBar(pk: PkState, modifier: Modifier = Modifier) {
    var now by remember(pk.akhir) { mutableLongStateOf(Rtdb.serverNow()) }
    LaunchedEffect(pk.akhir, pk.selesai) {
        while (!pk.selesai) {
            now = Rtdb.serverNow()
            if (pk.akhir > 0L && now >= pk.akhir) break
            delay(500)
        }
    }
    val sisa = if (pk.selesai) 0 else pk.sisaDetik(now)
    val menit = sisa / 60
    val detik = sisa % 60
    val total = (pk.aSkor + pk.bSkor).coerceAtLeast(1L)
    val bagianA = (pk.aSkor.toFloat() / total.toFloat()).coerceIn(0.04f, 0.96f)
    Box(modifier.fillMaxWidth().padding(horizontal = 12.dp)) {
        // Plat skor dari aset panel (bg_mic_pk_team_score).
        Image(
            painter = painterResource(R.drawable.pk_latar_skor),
            contentDescription = null,
            contentScale = ContentScale.FillBounds,
            modifier = Modifier.matchParentSize(),
        )
        Column(Modifier.fillMaxWidth().padding(horizontal = 12.dp, vertical = 10.dp)) {
            Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                Column(Modifier.weight(1f)) {
                    Text(pk.aNama.ifBlank { "Host" }, color = GoldLight, fontSize = 12.sp, fontWeight = FontWeight.Bold, maxLines = 1)
                    Text(pk.aSkor.toString(), color = Color.White, fontSize = 17.sp, fontWeight = FontWeight.Bold)
                }
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Image(
                        painter = painterResource(R.drawable.pk_waktu),
                        contentDescription = null,
                        modifier = Modifier.size(13.dp),
                    )
                    Spacer(Modifier.width(4.dp))
                    Text(
                        if (pk.selesai) tr("Selesai") else String.format("%d:%02d", menit, detik),
                        color = Gold,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold,
                    )
                }
                Column(Modifier.weight(1f), horizontalAlignment = Alignment.End) {
                    Text(pk.bNama.ifBlank { tr("Lawan") }, color = GoldLight, fontSize = 12.sp, fontWeight = FontWeight.Bold, maxLines = 1)
                    Text(pk.bSkor.toString(), color = Color.White, fontSize = 17.sp, fontWeight = FontWeight.Bold)
                }
            }
            Spacer(Modifier.height(6.dp))
            // Pita perbandingan: kiri kubu A, kanan kubu B, penanda di tengah.
            BoxWithConstraints(Modifier.fillMaxWidth().height(12.dp)) {
                val lebar = maxWidth
                Row(
                    Modifier.fillMaxWidth().height(12.dp).clip(RoundedCornerShape(6.dp))
                        .background(Color(0xFF3A1414)),
                ) {
                    Box(
                        Modifier.fillMaxWidth(bagianA).height(12.dp)
                            .background(Brush.horizontalGradient(listOf(Gold, GoldLight))),
                    )
                    Box(
                        Modifier.weight(1f).height(12.dp)
                            .background(Brush.horizontalGradient(listOf(Color(0xFF6E1B1B), Color(0xFFB33A3A)))),
                    )
                }
                Image(
                    painter = painterResource(R.drawable.pk_progres),
                    contentDescription = null,
                    modifier = Modifier.align(Alignment.CenterStart)
                        .offset(x = (lebar * bagianA) - 13.dp)
                        .size(26.dp),
                )
            }
        }
    }
}

/** Dialog membuat PK: mode, durasi, dan lawan. */
@Composable
fun PkBuatDialog(
    aNama: String,
    calon: List<Pair<String, String>>,
    onMulai: (mode: String, durasiDetik: Int, bUid: String, bNama: String) -> Unit,
    onDismiss: () -> Unit,
) {
    var mode by remember { mutableStateOf("1v1") }
    var durasi by remember { mutableStateOf(300) }
    var lawan by remember { mutableStateOf<Pair<String, String>?>(null) }
    val shape = RoundedCornerShape(22.dp)
    Box(Modifier.fillMaxSize().background(Color(0xAA000000)).clickable { onDismiss() }, contentAlignment = Alignment.Center) {
        Box(Modifier.fillMaxWidth(0.94f).clip(shape)) {
            // Latar dialog dari aset panel (bg_mic_pk_create).
            Image(
                painter = painterResource(R.drawable.pk_latar_buat),
                contentDescription = null,
                contentScale = ContentScale.FillBounds,
                modifier = Modifier.matchParentSize(),
            )
            Column(Modifier.fillMaxWidth().padding(18.dp)) {
                Image(
                    painter = painterResource(R.drawable.pk_judul),
                    contentDescription = tr("Mulai PK"),
                    modifier = Modifier.height(30.dp),
                )
                Spacer(Modifier.height(12.dp))
                Text(tr("Mode"), color = Color(0xFFD9D0C0), fontSize = 12.sp)
                Row(Modifier.fillMaxWidth().padding(top = 6.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    listOf("1v1" to "1v1", "tim" to tr("Tim")).forEach { (nilai, label) ->
                        val on = mode == nilai
                        Text(
                            label,
                            color = if (on) Color.Black else Color.White,
                            fontSize = 13.sp,
                            modifier = Modifier
                                .clip(RoundedCornerShape(10.dp))
                                .background(if (on) Gold else Color(0x66000000))
                                .clickable { mode = nilai }
                                .padding(horizontal = 16.dp, vertical = 8.dp),
                        )
                    }
                }
                Spacer(Modifier.height(10.dp))
                Text(tr("Durasi"), color = Color(0xFFD9D0C0), fontSize = 12.sp)
                Row(Modifier.fillMaxWidth().padding(top = 6.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    listOf(180 to "3 mnt", 300 to "5 mnt", 600 to "10 mnt").forEach { (nilai, label) ->
                        val on = durasi == nilai
                        Text(
                            label,
                            color = if (on) Color.Black else Color.White,
                            fontSize = 13.sp,
                            modifier = Modifier
                                .clip(RoundedCornerShape(10.dp))
                                .background(if (on) Gold else Color(0x66000000))
                                .clickable { durasi = nilai }
                                .padding(horizontal = 12.dp, vertical = 8.dp),
                        )
                    }
                }
                Spacer(Modifier.height(10.dp))
                Text(tr("Pilih lawan"), color = Color(0xFFD9D0C0), fontSize = 12.sp)
                Spacer(Modifier.height(4.dp))
                if (calon.isEmpty()) {
                    Text(tr("Belum ada user lain di mic"), color = Color(0xFFB0A99C), fontSize = 12.sp)
                } else {
                    calon.take(6).forEach { c ->
                        val on = lawan?.first == c.first
                        Row(
                            Modifier.fillMaxWidth().padding(vertical = 2.dp)
                                .clip(RoundedCornerShape(10.dp))
                                .background(if (on) Color(0x99D4AF37) else Color(0x66000000))
                                .clickable { lawan = c }
                                .padding(horizontal = 10.dp, vertical = 8.dp),
                            verticalAlignment = Alignment.CenterVertically,
                        ) {
                            Box(Modifier.size(8.dp).clip(CircleShape).background(if (on) Color.Black else Gold))
                            Spacer(Modifier.width(8.dp))
                            Text(c.second, color = if (on) Color.Black else Color.White, fontSize = 13.sp, maxLines = 1)
                        }
                    }
                }
                Spacer(Modifier.height(14.dp))
                Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                    Text(
                        tr("Batal"),
                        color = Color(0xFFE0E0E0),
                        fontSize = 14.sp,
                        textAlign = TextAlign.Center,
                        modifier = Modifier.weight(1f).clip(RoundedCornerShape(12.dp))
                            .background(Color(0x66000000)).clickable { onDismiss() }
                            .padding(vertical = 11.dp),
                    )
                    Text(
                        tr("Mulai"),
                        color = Color.Black,
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold,
                        textAlign = TextAlign.Center,
                        modifier = Modifier.weight(1f).clip(RoundedCornerShape(12.dp))
                            .background(GoldBrush)
                            .clickable(enabled = lawan != null) {
                                val l = lawan ?: return@clickable
                                onMulai(mode, durasi, l.first, l.second)
                            }
                            .padding(vertical = 11.dp),
                    )
                }
                Spacer(Modifier.height(6.dp))
                Text(tr("Host: ") + aNama, color = Color(0xFFB0A99C), fontSize = 11.sp)
            }
        }
    }
}

/** Dialog hasil PK: pemenang, skor akhir, dan penyumbang teratas tiap kubu. */
@Composable
fun PkHasilDialog(pk: PkState, namaUser: (String) -> String, onDismiss: () -> Unit) {
    val shape = RoundedCornerShape(22.dp)
    val pemenang = pk.pemenang
    Box(Modifier.fillMaxSize().background(Color(0xAA000000)).clickable { onDismiss() }, contentAlignment = Alignment.Center) {
        Box(Modifier.fillMaxWidth(0.92f).clip(shape)) {
            // Latar dialog hasil (bg_mic_pk_result).
            Image(
                painter = painterResource(R.drawable.pk_latar_hasil),
                contentDescription = null,
                contentScale = ContentScale.FillBounds,
                modifier = Modifier.matchParentSize(),
            )
            Column(Modifier.fillMaxWidth().padding(18.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                Image(
                    painter = painterResource(R.drawable.pk_header_hasil),
                    contentDescription = tr("Hasil PK"),
                    modifier = Modifier.height(34.dp),
                )
                Spacer(Modifier.height(10.dp))
                Text(
                    when (pemenang) {
                        "a" -> pk.aNama.ifBlank { tr("Kubu kiri") } + " " + tr("menang")
                        "b" -> pk.bNama.ifBlank { tr("Kubu kanan") } + " " + tr("menang")
                        else -> tr("Seri")
                    },
                    color = Gold,
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Bold,
                    textAlign = TextAlign.Center,
                )
                if (pemenang != "seri") {
                    Spacer(Modifier.height(6.dp))
                    Image(
                        painter = painterResource(R.drawable.pk_menang),
                        contentDescription = null,
                        modifier = Modifier.height(48.dp),
                    )
                }
                Spacer(Modifier.height(10.dp))
                Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                    Column(Modifier.weight(1f), horizontalAlignment = Alignment.CenterHorizontally) {
                        Text(pk.aNama.ifBlank { "Host" }, color = GoldLight, fontSize = 13.sp, maxLines = 1)
                        Text(pk.aSkor.toString(), color = Color.White, fontSize = 24.sp, fontWeight = FontWeight.Bold)
                        pk.aAnggota.entries.sortedByDescending { it.value }.take(3).forEach {
                            Text(namaUser(it.key) + " · " + it.value, color = Color(0xFFD9D0C0), fontSize = 10.sp, maxLines = 1)
                        }
                    }
                    Image(
                        painter = painterResource(R.drawable.pk_vs),
                        contentDescription = null,
                        modifier = Modifier.size(38.dp),
                    )
                    Column(Modifier.weight(1f), horizontalAlignment = Alignment.CenterHorizontally) {
                        Text(pk.bNama.ifBlank { tr("Lawan") }, color = GoldLight, fontSize = 13.sp, maxLines = 1)
                        Text(pk.bSkor.toString(), color = Color.White, fontSize = 24.sp, fontWeight = FontWeight.Bold)
                        pk.bAnggota.entries.sortedByDescending { it.value }.take(3).forEach {
                            Text(namaUser(it.key) + " · " + it.value, color = Color(0xFFD9D0C0), fontSize = 10.sp, maxLines = 1)
                        }
                    }
                }
                Spacer(Modifier.height(16.dp))
                Text(
                    tr("Tutup"),
                    color = Color.Black,
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold,
                    textAlign = TextAlign.Center,
                    modifier = Modifier.fillMaxWidth().clip(RoundedCornerShape(12.dp))
                        .background(GoldBrush).clickable { onDismiss() }
                        .padding(vertical = 11.dp),
                )
            }
        }
    }
}

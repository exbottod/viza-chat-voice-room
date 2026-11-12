package com.rezochatvoice.exceo

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.DialogProperties
import com.google.firebase.firestore.SetOptions
import kotlinx.coroutines.launch
import kotlinx.coroutines.tasks.await

private val PMGold = Color(0xFFFFD54F)
private val PMCard = Color(0xFF1C2330)
private val PMInk = Color(0xFFE9EEF7)
private val PMMuted = Color(0xFF9AA6BB)

/**
 * Panel manager dan staf di dalam aplikasi (Viza).
 * Peran dibaca dari Firestore panelAdmins, bukan dari server dompet, supaya
 * panel tetap bisa dipakai walau server dompet belum siap.
 * Kirim coin tetap lewat server dompet karena saldo ada di sana.
 */
object PanelMgrViza {
    private fun db() = com.google.firebase.firestore.FirebaseFirestore.getInstance()

    /** Peran akun ini: owner, admin, manager, moderator, staf, atau kosong. */
    suspend fun roleOf(email: String): String {
        if (email.isBlank()) return ""
        return try {
            val s = kotlinx.coroutines.withTimeoutOrNull(6000L) {
                db().collection("panelAdmins").document(email.lowercase()).get().await()
            } ?: return ""
            if (!s.exists()) "" else {
                val aktif = s.getBoolean("aktif")
                if (aktif == false) "" else (s.getString("role") ?: "staf")
            }
        } catch (e: Exception) {
            if (e is kotlinx.coroutines.CancellationException) throw e
            ""
        }
    }

    /** Terima ID angka, ID unik, atau UID. */
    suspend fun uidDari(masukan: String): String? {
        val teks = masukan.trim().replace(" ", "")
        if (teks.isBlank()) return null
        if (teks.length > 20) return teks
        try {
            val s = kotlinx.coroutines.withTimeoutOrNull(5000L) {
                db().collection("userIds").document(teks).get().await()
            }
            val u = s?.getString("uid")
            if (!u.isNullOrBlank()) return u
        } catch (e: Exception) { if (e is kotlinx.coroutines.CancellationException) throw e }
        for (medan in listOf("userId", "uid")) {
            try {
                val q = kotlinx.coroutines.withTimeoutOrNull(5000L) {
                    db().collection("userIds").whereEqualTo(medan, teks).limit(1).get().await()
                }
                val d = q?.documents?.firstOrNull()
                val u = d?.getString("uid")
                if (!u.isNullOrBlank()) return u
                if (d != null) return d.id
            } catch (e: Exception) { if (e is kotlinx.coroutines.CancellationException) throw e }
        }
        return null
    }

    suspend fun namaUser(uid: String): String = try {
        kotlinx.coroutines.withTimeoutOrNull(5000L) {
            db().collection("users").document(uid).get().await()
        }?.getString("name")?.takeIf { it.isNotBlank() } ?: uid
    } catch (e: Exception) { uid }

    suspend fun kosongkanNama(uid: String): Boolean {
        var ok = false
        try {
            db().collection("users").document(uid)
                .set(mapOf("name" to "Unknown", "nickname" to "Unknown"), SetOptions.merge()).await()
            ok = true
        } catch (e: Exception) { if (e is kotlinx.coroutines.CancellationException) throw e }
        try {
            Rtdb.ref("pub/$uid").updateChildren(mapOf("name" to "Unknown")).await()
            ok = true
        } catch (e: Exception) { if (e is kotlinx.coroutines.CancellationException) throw e }
        return ok
    }

    suspend fun kosongkanFoto(uid: String): Boolean {
        var ok = false
        try {
            db().collection("users").document(uid)
                .set(mapOf("photoUrl" to "", "photo" to ""), SetOptions.merge()).await()
            ok = true
        } catch (e: Exception) { if (e is kotlinx.coroutines.CancellationException) throw e }
        try {
            Rtdb.ref("pub/$uid").updateChildren(mapOf("photo" to "")).await()
            ok = true
        } catch (e: Exception) { if (e is kotlinx.coroutines.CancellationException) throw e }
        return ok
    }

    suspend fun setBlokir(uid: String, blokir: Boolean, alasan: String): Boolean {
        var ok = false
        try {
            val isi = mutableMapOf<String, Any?>(
                "banned" to blokir,
                "bannedReason" to alasan,
                "bannedAt" to System.currentTimeMillis(),
            )
            db().collection("users").document(uid).set(isi, SetOptions.merge()).await()
            ok = true
        } catch (e: Exception) { if (e is kotlinx.coroutines.CancellationException) throw e }
        try {
            Rtdb.ref("pub/$uid").updateChildren(mapOf("banned" to blokir)).await()
            ok = true
        } catch (e: Exception) { if (e is kotlinx.coroutines.CancellationException) throw e }
        return ok
    }

    /** Kirim item Store (frame, efek, lencana, medali, gelembung, banner, kartu) ke tas user. */
    suspend fun kirimAset(uid: String, itemId: String, hari: Int): Boolean = try {
        val sampai = System.currentTimeMillis() + hari.coerceAtLeast(1) * 86_400_000L
        Rtdb.ref("pub/$uid/svipInv/sx_$itemId").setValue(sampai).await()
        true
    } catch (e: Exception) {
        if (e is kotlinx.coroutines.CancellationException) throw e
        false
    }

    /** Daftar item Store yang bisa dikirim: id, nama, slot. */
    suspend fun itemStore(): List<Triple<String, String, String>> = try {
        kotlinx.coroutines.withTimeoutOrNull(8000L) {
            db().collection("vipConfig").whereEqualTo("store", true).get().await()
        }?.documents?.mapNotNull { d ->
            val id = d.getString("id") ?: d.id
            val slot = d.getString("slot") ?: ""
            if (slot.isBlank()) null else Triple(id, d.getString("name") ?: id, slot)
        } ?: emptyList()
    } catch (e: Exception) {
        if (e is kotlinx.coroutines.CancellationException) throw e
        emptyList()
    }

    /** Stok coin dan item yang diberikan developer ke akun panel ini. */
    suspend fun stok(email: String): Pair<Long, Int> = try {
        val s = kotlinx.coroutines.withTimeoutOrNull(6000L) {
            db().collection("panelStok").document(email.lowercase()).get().await()
        }
        val coin = s?.getLong("coins") ?: 0L
        val aset = (s?.get("aset") as? List<*>)?.size ?: 0
        coin to aset
    } catch (e: Exception) {
        if (e is kotlinx.coroutines.CancellationException) throw e
        0L to 0
    }
}

@Composable
private fun PmField(label: String, value: String, onChange: (String) -> Unit, angka: Boolean = false) {
    OutlinedTextField(
        value = value,
        onValueChange = onChange,
        label = { Text(tr(label), color = PMMuted, fontSize = 12.sp) },
        singleLine = true,
        keyboardOptions = KeyboardOptions(keyboardType = if (angka) KeyboardType.Number else KeyboardType.Text),
        colors = OutlinedTextFieldDefaults.colors(
            focusedTextColor = PMInk,
            unfocusedTextColor = PMInk,
            focusedBorderColor = PMGold,
            unfocusedBorderColor = Color(0xFF39435A),
            cursorColor = PMGold,
        ),
        modifier = Modifier.fillMaxWidth().padding(bottom = 8.dp),
    )
}

@Composable
private fun PmSection(judul: String, isi: @Composable () -> Unit) {
    Column(
        Modifier.fillMaxWidth().padding(bottom = 10.dp)
            .background(PMCard, RoundedCornerShape(14.dp))
            .border(1.dp, Color(0xFF2C3648), RoundedCornerShape(14.dp))
            .padding(12.dp),
    ) {
        Text(tr(judul), color = PMGold, fontSize = 14.sp, fontWeight = FontWeight.Bold)
        Spacer(Modifier.height(8.dp))
        isi()
    }
}

@Composable
private fun PmAction(teks: String, aktif: Boolean = true, onClick: () -> Unit) {
    Box(
        Modifier.fillMaxWidth().height(42.dp)
            .background(if (aktif) PMGold else Color(0xFF38414F), RoundedCornerShape(50))
            .clickable(enabled = aktif, onClick = onClick),
        contentAlignment = Alignment.Center,
    ) {
        Text(tr(teks), color = if (aktif) Color.Black else Color(0xFF8A8A8A), fontWeight = FontWeight.Bold, fontSize = 14.sp)
    }
}

/** Panel manager/staf di dalam aplikasi. */
@Composable
fun PanelManagerDialog(role: String, email: String, onClose: () -> Unit) {
    val scope = rememberCoroutineScope()
    var sibuk by remember { mutableStateOf(false) }
    var pesan by remember { mutableStateOf("") }
    var idUser by remember { mutableStateOf("") }
    var coin by remember { mutableStateOf("") }
    var hari by remember { mutableStateOf("30") }
    var alasan by remember { mutableStateOf("") }
    var itemPilih by remember { mutableStateOf<Triple<String, String, String>?>(null) }
    var daftar by remember { mutableStateOf(listOf<Triple<String, String, String>>()) }
    var stokCoin by remember { mutableStateOf(0L) }
    var stokAset by remember { mutableStateOf(0) }

    LaunchedEffect(Unit) {
        daftar = PanelMgrViza.itemStore()
        val s = PanelMgrViza.stok(email)
        stokCoin = s.first
        stokAset = s.second
    }

    fun jalankan(teks: String, blok: suspend () -> String) {
        if (sibuk) return
        sibuk = true
        pesan = teks
        scope.launch {
            pesan = try { blok() } catch (e: Exception) {
                if (e is kotlinx.coroutines.CancellationException) throw e
                e.message ?: "Gagal"
            }
            sibuk = false
        }
    }

    Dialog(onDismissRequest = onClose, properties = DialogProperties(usePlatformDefaultWidth = false)) {
        Column(
            Modifier.fillMaxSize().background(Color(0xFF111722)).padding(14.dp)
                .verticalScroll(rememberScrollState()),
        ) {
            Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                Text(tr("Panel " + role.replaceFirstChar { it.uppercase() }), color = PMInk, fontSize = 18.sp, fontWeight = FontWeight.Bold)
                Spacer(Modifier.weight(1f))
                Text(tr("Tutup"), color = PMGold, fontSize = 14.sp, modifier = Modifier.clickable { onClose() })
            }
            Text(email, color = PMMuted, fontSize = 11.sp)
            Text(tr("Stok coin: ") + fmtAngka(stokCoin) + tr(" · item: ") + stokAset, color = PMMuted, fontSize = 11.sp)
            Spacer(Modifier.height(10.dp))
            if (pesan.isNotBlank()) {
                Text(pesan, color = Color(0xFF9AE6B4), fontSize = 12.sp, modifier = Modifier.padding(bottom = 8.dp))
            }
            PmField("ID user (ID angka, ID unik, atau UID)", idUser) { idUser = it }

            PmSection("Kirim coin ke user") {
                PmField("Jumlah coin", coin, { coin = it }, angka = true)
                PmAction(if (sibuk) "Memproses..." else "Kirim coin", aktif = !sibuk) {
                    jalankan("Mengirim coin...") {
                        val uid = PanelMgrViza.uidDari(idUser) ?: return@jalankan "ID user tidak ditemukan"
                        val n = coin.toLongOrNull() ?: 0L
                        if (n <= 0) return@jalankan "Isi jumlah coin"
                        if (n > stokCoin && stokCoin > 0) return@jalankan "Melebihi stok coin (" + fmtAngka(stokCoin) + ")"
                        val p = org.json.JSONObject().put("to", uid).put("coins", n)
                        PanelStaffRepo.aksi("send_coin", p, role)
                    }
                }
            }

            PmSection("Blokir / buka blokir user") {
                PmField("Alasan blokir (opsional)", alasan) { alasan = it }
                PmAction(if (sibuk) "Memproses..." else "Blokir user", aktif = !sibuk) {
                    jalankan("Memblokir...") {
                        val uid = PanelMgrViza.uidDari(idUser) ?: return@jalankan "ID user tidak ditemukan"
                        if (PanelMgrViza.setBlokir(uid, true, alasan)) "User diblokir" else "Gagal memblokir"
                    }
                }
                Spacer(Modifier.height(6.dp))
                PmAction(if (sibuk) "Memproses..." else "Buka blokir", aktif = !sibuk) {
                    jalankan("Membuka blokir...") {
                        val uid = PanelMgrViza.uidDari(idUser) ?: return@jalankan "ID user tidak ditemukan"
                        if (PanelMgrViza.setBlokir(uid, false, "")) "Blokir dibuka" else "Gagal membuka blokir"
                    }
                }
            }

            PmSection("Reset nama dan foto profil") {
                PmAction(if (sibuk) "Memproses..." else "Reset nama jadi Unknown", aktif = !sibuk) {
                    jalankan("Mengosongkan nama...") {
                        val uid = PanelMgrViza.uidDari(idUser) ?: return@jalankan "ID user tidak ditemukan"
                        if (PanelMgrViza.kosongkanNama(uid)) "Nama diubah menjadi Unknown" else "Gagal mengubah nama"
                    }
                }
                Spacer(Modifier.height(6.dp))
                PmAction(if (sibuk) "Memproses..." else "Reset foto profil ke bawaan", aktif = !sibuk) {
                    jalankan("Mengosongkan foto...") {
                        val uid = PanelMgrViza.uidDari(idUser) ?: return@jalankan "ID user tidak ditemukan"
                        if (PanelMgrViza.kosongkanFoto(uid)) "Foto profil dikosongkan" else "Gagal mengubah foto"
                    }
                }
            }

            PmSection("Kirim aset Store ke user") {
                if (daftar.isEmpty()) {
                    Text(tr("Belum ada item Store. Tambah dulu di panel developer."), color = PMMuted, fontSize = 12.sp)
                } else {
                    daftar.take(60).forEach { it3 ->
                        val dipilih = itemPilih == it3
                        Text(
                            (if (dipilih) "● " else "○ ") + it3.second + "  ·  " + it3.third,
                            color = if (dipilih) PMGold else PMInk,
                            fontSize = 12.sp,
                            modifier = Modifier.fillMaxWidth()
                                .clickable { itemPilih = it3 }
                                .padding(vertical = 6.dp),
                        )
                    }
                }
                PmField("Durasi hari", hari, { hari = it }, angka = true)
                PmAction(if (sibuk) "Memproses..." else "Kirim item ke user", aktif = !sibuk && itemPilih != null) {
                    val item = itemPilih ?: return@PmAction
                    jalankan("Mengirim item...") {
                        val uid = PanelMgrViza.uidDari(idUser) ?: return@jalankan "ID user tidak ditemukan"
                        val h = hari.toIntOrNull() ?: 30
                        if (PanelMgrViza.kirimAset(uid, item.first, h)) {
                            "Item " + item.second + " terkirim, " + h + " hari"
                        } else "Gagal mengirim item"
                    }
                }
            }

            Spacer(Modifier.height(20.dp))
        }
    }
}

/** Format angka ringkas untuk panel. */
private fun fmtAngka(n: Long): String = when {
    n >= 1_000_000L -> (n / 1_000_000L).toString() + "jt"
    n >= 1_000L -> (n / 1_000L).toString() + "rb"
    else -> n.toString()
}

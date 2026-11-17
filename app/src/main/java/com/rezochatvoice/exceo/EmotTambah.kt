package com.rezochatvoice.exceo

import android.content.Context
import android.net.Uri
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.google.firebase.auth.FirebaseAuth
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.tasks.await
import kotlinx.coroutines.withContext
import java.io.File
import java.net.HttpURLConnection
import java.net.URL

/**
 * Tambah emot dari dalam room.
 *
 * Dua cara: pilih berkas gambar dari HP (diunggah ke server VPS sendiri), atau
 * tempel tautan gambar yang sudah ada. Hasilnya ditulis ke Realtime Database
 * (vipCfg, slot "emote") lewat server memakai akun layanan, jadi emot baru
 * langsung muncul di tab emot room untuk semua orang tanpa perlu build ulang.
 *
 * Hanya developer dan staf panel yang boleh menambah, sama seperti aset lain.
 */
object EmotTambah {
    private const val VPS = "https://viza.43-156-99-4.sslip.io"
    private const val DEV_EMAIL = "owner@email-anda.com"
    private const val MAKS_BYTE = 4L * 1024 * 1024

    private fun emailSaatIni(): String =
        FirebaseAuth.getInstance().currentUser?.email.orEmpty().trim().lowercase()

    private suspend fun token(): String? = try {
        FirebaseAuth.getInstance().currentUser?.getIdToken(false)?.await()?.token
    } catch (e: CancellationException) {
        throw e
    } catch (e: Exception) {
        null
    }

    /** Boleh menambah emot? Developer atau akun yang punya hak panel. */
    suspend fun boleh(): Boolean {
        if (emailSaatIni() == DEV_EMAIL) return true
        return try {
            PanelStaffRepo.me() != null
        } catch (e: CancellationException) {
            throw e
        } catch (e: Exception) {
            false
        }
    }

    /** Unggah gambar emot dari berkas HP. Hasil: (tautan, galat). */
    suspend fun unggah(ctx: Context, uri: Uri): Pair<String?, String?> = withContext(Dispatchers.IO) {
        try {
            val isi = ctx.contentResolver.openInputStream(uri)?.use { it.readBytes() }
                ?: return@withContext null to "Berkas tidak terbaca"
            if (isi.isEmpty()) return@withContext null to "Berkas kosong"
            if (isi.size > MAKS_BYTE) return@withContext null to "Gambar lebih dari 4 MB"
            val mime = ctx.contentResolver.getType(uri).orEmpty().lowercase()
            val ext = when {
                mime.contains("gif") -> "gif"
                mime.contains("webp") -> "webp"
                mime.contains("png") -> "png"
                else -> "jpg"
            }
            val t = token() ?: return@withContext null to "Sesi login habis, coba masuk ulang"
            val alamat = VPS + "/chatimg?t=" + java.net.URLEncoder.encode(t, "UTF-8") + "&ext=" + ext
            val conn = (URL(alamat).openConnection() as HttpURLConnection).apply {
                requestMethod = "POST"
                connectTimeout = 20000
                readTimeout = 120000
                doOutput = true
                setFixedLengthStreamingMode(isi.size)
                setRequestProperty("Content-Type", "application/octet-stream")
            }
            conn.outputStream.use { it.write(isi) }
            val code = conn.responseCode
            val teks = (if (code in 200..299) conn.inputStream else conn.errorStream)
                ?.bufferedReader()?.use { it.readText() }.orEmpty()
            if (code !in 200..299) return@withContext null to "Unggah gagal ($code)"
            val url = org.json.JSONObject(teks).optString("url")
            if (!url.startsWith("http")) return@withContext null to "Server tidak memberi tautan gambar"
            url to null
        } catch (e: CancellationException) {
            throw e
        } catch (e: Exception) {
            null to (e.message ?: "Unggah gagal")
        }
    }

    /** Simpan emot baru ke server supaya muncul di tab emot semua room. */
    suspend fun simpan(nama: String, url: String): String? = withContext(Dispatchers.IO) {
        try {
            val bersih = url.trim()
            if (!bersih.startsWith("http://") && !bersih.startsWith("https://")) {
                return@withContext "Tautan harus http atau https"
            }
            val t = token() ?: return@withContext "Sesi login habis, coba masuk ulang"
            val id = "emote_" + System.currentTimeMillis().toString(36)
            val data = org.json.JSONObject().apply {
                put("id", id)
                put("name", nama.trim().ifBlank { "Emot" }.take(30))
                put("url", bersih)
                put("slot", "emote")
                put("order", 1000 + (System.currentTimeMillis() / 1000L) % 100000L)
                put("oleh", FirebaseAuth.getInstance().currentUser?.uid.orEmpty())
                put("dibuat", System.currentTimeMillis())
            }
            val body = org.json.JSONObject().apply {
                put("t", t)
                put("path", "vipCfg/" + id)
                put("data", data)
            }.toString()
            val conn = (URL(VPS + "/panel-rtdb").openConnection() as HttpURLConnection).apply {
                requestMethod = "POST"
                connectTimeout = 20000
                readTimeout = 60000
                doOutput = true
                setRequestProperty("Content-Type", "application/json; charset=utf-8")
            }
            conn.outputStream.use { it.write(body.toByteArray()) }
            val code = conn.responseCode
            val teks = (if (code in 200..299) conn.inputStream else conn.errorStream)
                ?.bufferedReader()?.use { it.readText() }.orEmpty()
            val o = try { org.json.JSONObject(teks) } catch (e: Exception) { org.json.JSONObject() }
            if (code == 403) return@withContext "Hanya developer dan staf panel yang bisa menambah emot"
            if (code !in 200..299 || o.optInt("ok") != 1) {
                return@withContext (o.optString("e").ifBlank { "Gagal menyimpan ($code)" }).take(120)
            }
            null
        } catch (e: CancellationException) {
            throw e
        } catch (e: Exception) {
            e.message ?: "Gagal menyimpan"
        }
    }

    /** Simpan emot dari tautan langsung tanpa mengunggah berkas. */
    suspend fun simpanDariLink(nama: String, link: String): String? = simpan(nama, link)

    /** Unggah berkas lalu simpan sebagai emot. */
    suspend fun simpanDariBerkas(ctx: Context, nama: String, uri: Uri): String? {
        val (url, galat) = unggah(ctx, uri)
        if (url == null) return galat ?: "Unggah gagal"
        return simpan(nama, url)
    }
}

/**
 * Dialog "Tambah emot": isi nama, pilih berkas dari HP atau tempel tautan.
 * Dipakai dari tab emot di room.
 */
@Composable
fun DialogTambahEmot(onTutup: () -> Unit, onSelesai: () -> Unit) {
    val ctx = LocalContext.current
    val scope = rememberCoroutineScope()
    var nama by remember { mutableStateOf("") }
    var link by remember { mutableStateOf("") }
    var berkas by remember { mutableStateOf<Uri?>(null) }
    var sibuk by remember { mutableStateOf(false) }
    var galat by remember { mutableStateOf("") }

    val pilih = rememberLauncherForActivityResult(ActivityResultContracts.GetContent()) { uri ->
        if (uri != null) {
            berkas = uri
            galat = ""
        }
    }

    AlertDialog(
        onDismissRequest = { if (!sibuk) onTutup() },
        title = { Text("Tambah emot", fontWeight = FontWeight.Bold) },
        text = {
            Column(Modifier.fillMaxWidth()) {
                Text(
                    "Pilih berkas gambar dari HP (PNG, GIF, WEBP, JPG) atau tempel tautan gambar. Emot langsung muncul di tab emot room untuk semua orang.",
                    fontSize = 12.sp,
                    color = Color(0xFF6B6B6B),
                )
                Spacer(Modifier.height(10.dp))
                OutlinedTextField(
                    value = nama,
                    onValueChange = { nama = it.take(30) },
                    label = { Text("Nama emot (boleh kosong)") },
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth(),
                )
                Spacer(Modifier.height(10.dp))
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        Modifier
                            .clip(RoundedCornerShape(10.dp))
                            .background(Color(0xFF16A34A))
                            .clickable(enabled = !sibuk) { pilih.launch("image/*") }
                            .padding(horizontal = 12.dp, vertical = 8.dp),
                    ) {
                        Text("Pilih berkas", color = Color.White, fontSize = 13.sp, fontWeight = FontWeight.Bold)
                    }
                    Spacer(Modifier.size(10.dp))
                    Text(
                        if (berkas == null) "Belum ada berkas" else "Berkas siap diunggah",
                        fontSize = 12.sp,
                        color = Color(0xFF6B6B6B),
                    )
                }
                if (berkas != null) {
                    Spacer(Modifier.height(8.dp))
                    Box(
                        Modifier
                            .size(56.dp)
                            .clip(RoundedCornerShape(10.dp))
                            .border(1.dp, Color(0xFFE3E3E3), RoundedCornerShape(10.dp)),
                        contentAlignment = Alignment.Center,
                    ) {
                        AsyncImage(
                            model = berkas,
                            contentDescription = null,
                            contentScale = ContentScale.Fit,
                            modifier = Modifier.size(48.dp),
                        )
                    }
                }
                Spacer(Modifier.height(12.dp))
                OutlinedTextField(
                    value = link,
                    onValueChange = { link = it.trim().take(500); galat = "" },
                    label = { Text("Atau tautan gambar (https://...)") },
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth(),
                )
                if (galat.isNotBlank()) {
                    Spacer(Modifier.height(8.dp))
                    Text(galat, color = Color(0xFFD32F2F), fontSize = 12.sp)
                }
            }
        },
        confirmButton = {
            TextButton(
                enabled = !sibuk && (berkas != null || link.isNotBlank()),
                onClick = {
                    if (sibuk) return@TextButton
                    sibuk = true
                    galat = ""
                    scope.launch {
                        val hasil = if (berkas != null) {
                            EmotTambah.simpanDariBerkas(ctx, nama, berkas!!)
                        } else {
                            EmotTambah.simpanDariLink(nama, link)
                        }
                        sibuk = false
                        if (hasil == null) {
                            onSelesai()
                            onTutup()
                        } else {
                            galat = hasil
                        }
                    }
                },
            ) { Text(if (sibuk) "Menyimpan..." else "Simpan") }
        },
        dismissButton = {
            TextButton(enabled = !sibuk, onClick = onTutup) { Text("Batal") }
        },
    )
}

/** Berkas gambar sementara dari URI (dipakai kalau perlu nama berkas). */
internal fun namaBerkasDari(ctx: Context, uri: Uri): String = try {
    ctx.contentResolver.query(uri, null, null, null, null)?.use { c ->
        val i = c.getColumnIndex(android.provider.OpenableColumns.DISPLAY_NAME)
        if (i >= 0 && c.moveToFirst()) c.getString(i) else ""
    }.orEmpty()
} catch (e: Exception) {
    ""
}

/** Bersihkan berkas sementara setelah diunggah. */
internal fun hapusSementara(f: File?) {
    try { f?.delete() } catch (e: Exception) { }
}

/** Jarak baris untuk dialog, dipakai supaya tetap rapi di layar kecil. */
internal val jarakDialog = Arrangement.spacedBy(6.dp)

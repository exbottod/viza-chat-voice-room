package com.rezochatvoice.exceo

import android.annotation.SuppressLint
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
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
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import com.google.firebase.auth.FirebaseAuth
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.tasks.await
import kotlinx.coroutines.withContext
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL

/**
 * Tulasi Game: game pihak ketiga dengan dompet menyatu.
 *
 * Alurnya: aplikasi meminta token ke server Viza (/api/tulasi/mulai), lalu
 * membuka tautan game yang sudah berisi token itu di WebView. Saat pemain
 * bertaruh, platform Tulasi memanggil server Viza untuk memotong atau
 * menambah coin, jadi saldo yang dipakai tetap dompet Viza.
 */
object TulasiGame {
    private const val VPS = "https://viza.43-156-99-4.sslip.io"

    data class Item(val kode: String, val id: String, val nama: String)

    val bawaan = listOf(
        Item("kingdoms", "58", "Teen Patti Gold"),
        Item("teenPatti", "1", "Teen Patti"),
        Item("lucky77", "2", "Lucky 77"),
        Item("roulette", "3", "Roulette"),
        Item("dragonTigerBattle", "4", "Dragon Tiger"),
        Item("slots777", "5", "Slots 777"),
    )

    private suspend fun token(): String? = try {
        FirebaseAuth.getInstance().currentUser?.getIdToken(false)?.await()?.token
    } catch (e: CancellationException) {
        throw e
    } catch (e: Exception) {
        null
    }

    private suspend fun pos(jalur: String, isi: JSONObject): JSONObject? = withContext(Dispatchers.IO) {
        try {
            val sambung = (URL(VPS + jalur).openConnection() as HttpURLConnection).apply {
                requestMethod = "POST"
                connectTimeout = 12000
                readTimeout = 15000
                doOutput = true
                setRequestProperty("Content-Type", "application/json")
            }
            sambung.outputStream.use { it.write(isi.toString().toByteArray()) }
            val kode = sambung.responseCode
            val teks = (if (kode in 200..299) sambung.inputStream else sambung.errorStream)
                ?.bufferedReader()?.use { it.readText() }.orEmpty()
            if (teks.isBlank()) null else JSONObject(teks)
        } catch (e: CancellationException) {
            throw e
        } catch (e: Exception) {
            null
        }
    }

    /** Tautan game lengkap dengan token pemain. */
    suspend fun tautan(item: Item): Pair<String?, String> {
        val t = token() ?: return Pair(null, "Sesi login tidak ditemukan")
        val balas = pos("/api/tulasi/mulai", JSONObject().apply {
            put("t", t)
            put("game", item.kode)
            put("gameId", item.id)
        }) ?: return Pair(null, "Server tidak menjawab")
        val url = balas.optString("url")
        if (url.isBlank()) return Pair(null, balas.optString("e").ifBlank { "Gagal membuka game" })
        return Pair(url, "")
    }

    /** Daftar game yang diizinkan platform, kalau server punya daftarnya. */
    suspend fun daftar(): List<Item> {
        val balas = pos("/api/tulasi/games", JSONObject()) ?: return bawaan
        val arr = balas.optJSONArray("games") ?: return bawaan
        val hasil = ArrayList<Item>()
        for (i in 0 until arr.length()) {
            val o = arr.optJSONObject(i) ?: continue
            val kode = o.optString("kode").ifBlank { o.optString("gameType") }
            val nama = o.optString("nama").ifBlank { o.optString("name") }.ifBlank { kode }
            if (kode.isBlank()) continue
            hasil.add(Item(kode, o.optString("id").ifBlank { o.optString("gameId") }, nama))
        }
        return if (hasil.isEmpty()) bawaan else hasil
    }
}

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun TulasiGameScreen(onClose: () -> Unit) {
    val ctx = LocalContext.current
    val scope = rememberCoroutineScope()
    var daftar by remember { mutableStateOf(TulasiGame.bawaan) }
    var tautan by remember { mutableStateOf("") }
    var sibuk by remember { mutableStateOf("") }
    var galat by remember { mutableStateOf("") }

    LaunchedEffect(Unit) { daftar = TulasiGame.daftar() }

    if (tautan.isNotBlank()) {
        Box(Modifier.fillMaxSize().background(Color(0xFF0B0B0B))) {
            AndroidView(
                modifier = Modifier.fillMaxSize(),
                factory = { c ->
                    WebView(c).apply {
                        settings.javaScriptEnabled = true
                        settings.domStorageEnabled = true
                        settings.mediaPlaybackRequiresUserGesture = false
                        settings.loadWithOverviewMode = true
                        settings.useWideViewPort = true
                        webViewClient = object : WebViewClient() {
                            override fun shouldOverrideUrlLoading(v: WebView?, alamat: String?): Boolean {
                                val a = alamat.orEmpty()
                                if (a.startsWith("tulasigame://exit")) { onClose(); return true }
                                if (a.startsWith("tulasigame://recharge")) {
                                    Toast.makeText(c, "Isi coin lewat menu Dompet", Toast.LENGTH_LONG).show()
                                    onClose()
                                    return true
                                }
                                return false
                            }
                        }
                        loadUrl(tautan)
                    }
                },
            )
            Box(
                Modifier.statusBarsPadding().padding(12.dp).align(Alignment.TopEnd)
                    .background(Color(0xCC000000), RoundedCornerShape(50))
                    .clickable { onClose() }.padding(horizontal = 14.dp, vertical = 8.dp),
            ) { Text("Tutup", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 13.sp) }
        }
        return
    }

    Column(Modifier.fillMaxSize().background(Color(0xFF101010)).statusBarsPadding().padding(16.dp)) {
        Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
            Text("Tulasi Game", color = Color(0xFFFFD54F), fontWeight = FontWeight.Bold, fontSize = 20.sp)
            Spacer(Modifier.fillMaxWidth(0.6f))
            Box(
                Modifier.background(Color(0xFF2A2A2A), RoundedCornerShape(50))
                    .clickable { onClose() }.padding(horizontal = 14.dp, vertical = 8.dp),
            ) { Text("Tutup", color = Color.White, fontSize = 13.sp) }
        }
        Spacer(Modifier.height(12.dp))
        if (galat.isNotBlank()) {
            Text(galat, color = Color(0xFFFF8A80), fontSize = 13.sp)
            Spacer(Modifier.height(8.dp))
        }
        LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            items(daftar) { item ->
                Box(
                    Modifier.fillMaxWidth().background(
                        Brush.horizontalGradient(listOf(Color(0xFF1E3B2E), Color(0xFF14301F))),
                        RoundedCornerShape(14.dp),
                    ).clickable(enabled = sibuk.isBlank()) {
                        sibuk = item.nama
                        galat = ""
                        scope.launch {
                            val (url, pesan) = TulasiGame.tautan(item)
                            sibuk = ""
                            if (url == null) galat = pesan else tautan = url
                        }
                    }.padding(horizontal = 14.dp, vertical = 16.dp),
                ) {
                    Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                        Text(item.nama, color = Color.White, fontWeight = FontWeight.Bold, fontSize = 15.sp)
                        Spacer(Modifier.fillMaxWidth(0.5f))
                        Text(
                            if (sibuk == item.nama) "Membuka…" else "Main",
                            color = Color(0xFFFFD54F), fontSize = 13.sp,
                        )
                    }
                }
            }
        }
    }
}

package com.rezochatvoice.exceo

import android.annotation.SuppressLint
import android.graphics.Bitmap
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.compose.BackHandler
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import kotlinx.coroutines.tasks.await

/**
 * Game Greedy (cocos2d-js) dari CDN pihak ketiga, dimainkan di dalam aplikasi.
 *
 * Halaman game memuat seluruh asetnya dari domain yang sama, jadi cukup satu
 * alamat. Diuji: index.html 200, aset main/internal 200, dan mesin cocos
 * memakai bundle versi dari settings.df54a.js.
 */
object GreedyFunni {
    const val NAMA = "Greedy"

    /** Halaman game. Versi ikut di jalur, jadi ganti di sini kalau CDN naik versi. */
    const val URL_GAME = "https://games-api-prod.funni.live/greedy/web/index.html"
    /** Alamat kedua kalau yang utama gagal dimuat. */
    const val URL_CADANGAN = "https://cdn-web.funni.live/game/greedy/v17t1790238158/index.html"
}

/**
 * Game HTML5 milik Viza sendiri: Bikini Wild Rush. Berkasnya ikut repo di
 * docs/game/bikini, jadi tidak bergantung layanan pihak lain.
 * Tanpa parameter api, game memakai koin mainan lokal di HP.
 */
object BikiniRush {
    const val NAMA = "Bikini Wild Rush"

    /** Berkas game milik Viza sendiri. */
    const val GAME = "https://exbottod.github.io/viza-chat-voice-room/game/bikini/index.html"

    /** Dompet Viza di VPS: saldo dan hasil putaran ditentukan server ini. */
    const val DOMPET = "https://viza.43-156-99-4.sslip.io/bikini"

    /**
     * Minta token sesi pendek ke dompet Viza, lalu susun alamat game.
     * Kalau server tidak menjawab, game tetap dibuka dengan koin mainan lokal
     * supaya tidak ada layar kosong.
     */
    suspend fun alamat(): String {
        return try {
            val idToken = com.google.firebase.auth.FirebaseAuth.getInstance()
                .currentUser?.getIdToken(false)?.await()?.token
            if (idToken.isNullOrBlank()) return GAME
            val token = kotlinx.coroutines.withContext(kotlinx.coroutines.Dispatchers.IO) {
                val c = java.net.URL("$DOMPET/token").openConnection() as java.net.HttpURLConnection
                c.requestMethod = "POST"
                c.connectTimeout = 8000
                c.readTimeout = 8000
                c.doOutput = true
                c.setRequestProperty("Authorization", "Bearer $idToken")
                c.setRequestProperty("Content-Type", "application/json")
                c.outputStream.use { it.write("{}".toByteArray()) }
                val isi = c.inputStream.bufferedReader().use { it.readText() }
                org.json.JSONObject(isi).optString("token")
            }
            if (token.isBlank()) GAME else "$GAME?api=$DOMPET/api&token=$token"
        } catch (e: Exception) {
            GAME
        }
    }
}

@Composable
fun BikiniRushScreen(onClose: () -> Unit) {
    var alamat by remember { mutableStateOf("") }
    androidx.compose.runtime.LaunchedEffect(Unit) { alamat = BikiniRush.alamat() }
    if (alamat.isBlank()) {
        Box(Modifier.fillMaxSize().background(Color.Black), contentAlignment = Alignment.Center) {
            Text("Menyiapkan meja...", color = Color.White.copy(alpha = 0.8f), fontSize = 14.sp)
        }
    } else {
        GameWebScreen(alamat, null, onClose)
    }
}

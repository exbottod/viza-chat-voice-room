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

    /**
     * Berkas game ikut di dalam APK (assets/bikini) dan dibaca lewat appassets,
     * jadi tidak bergantung internet dan tidak ada halaman kosong karena host
     * luar tidak terjangkau.
     */
    const val GAME = "https://appassets.androidplatform.net/assets/bikini/index.html"

    /** Alamat kedua kalau aset di APK tidak terbaca. */
    const val GAME_CADANGAN = "https://exbottod.github.io/viza-chat-voice-room/game/bikini/index.html"

    /** Dompet Viza di VPS: saldo dan hasil putaran ditentukan server ini. */
    const val DOMPET = "https://viza.43-156-99-4.sslip.io/bikini"

    /**
     * Minta token sesi pendek ke dompet Viza, lalu susun alamat game.
     * Kalau server diam, game tetap dibuka dengan koin mainan lokal supaya
     * tidak ada layar kosong.
     */
    suspend fun alamat(): Pair<String, String?> {
        // Batas waktu total: apa pun yang macet (token Firebase atau jaringan),
        // game tetap dibuka dengan koin mainan, jangan sampai layar hitam.
        val hasil = kotlinx.coroutines.withTimeoutOrNull(6000L) {
            try {
                val idToken = com.google.firebase.auth.FirebaseAuth.getInstance()
                    .currentUser?.getIdToken(false)?.await()?.token
                if (idToken.isNullOrBlank()) return@withTimeoutOrNull null
                val token = kotlinx.coroutines.withContext(kotlinx.coroutines.Dispatchers.IO) {
                    val c = java.net.URL("$DOMPET/token").openConnection() as java.net.HttpURLConnection
                    c.requestMethod = "POST"
                    c.connectTimeout = 4000
                    c.readTimeout = 4000
                    c.doOutput = true
                    c.setRequestProperty("Authorization", "Bearer $idToken")
                    c.setRequestProperty("Content-Type", "application/json")
                    c.outputStream.use { it.write("{}".toByteArray()) }
                    val isi = c.inputStream.bufferedReader().use { it.readText() }
                    org.json.JSONObject(isi).optString("token")
                }
                if (token.isBlank()) null else "$GAME?api=$DOMPET/api&token=$token"
            } catch (e: Exception) {
                null
            }
        }
        val kueri = hasil?.substringAfter("?", "")
        val cadangan = if (kueri.isNullOrBlank()) GAME_CADANGAN else "$GAME_CADANGAN?$kueri"
        return (hasil ?: GAME) to cadangan
    }
}

@Composable
fun GreedyFunniScreen(onClose: () -> Unit) {
    GameWebScreen(GreedyFunni.URL_GAME, GreedyFunni.URL_CADANGAN, onClose)
}

@Composable
fun BikiniRushScreen(onClose: () -> Unit) {
    var alamat by remember { mutableStateOf("") }
    var cadangan by remember { mutableStateOf<String?>(null) }
    androidx.compose.runtime.LaunchedEffect(Unit) {
        val (utama, lain) = BikiniRush.alamat()
        alamat = utama
        cadangan = lain
    }
    if (alamat.isBlank()) {
        Box(Modifier.fillMaxSize().background(Color.Black), contentAlignment = Alignment.Center) {
            Text("Menyiapkan meja...", color = Color.White.copy(alpha = 0.8f), fontSize = 14.sp)
        }
    } else {
        GameWebScreen(alamat, cadangan, onClose)
    }
}

@SuppressLint("SetJavaScriptEnabled")
@Composable
private fun GameWebScreen(url: String, cadangan: String?, onClose: () -> Unit) {
    val ctx = LocalContext.current
    var web by remember { mutableStateOf<WebView?>(null) }
    var prog by remember { mutableStateOf(0) }
    // Alasan layar kosong: dulu WebView hanya hitam tanpa keterangan, jadi tidak
    // ketahuan apakah gagal memuat atau skrip game berhenti.
    var galat by remember { mutableStateOf("") }
    var ulang by remember { mutableStateOf(0) }

    BackHandler {
        val w = web
        if (w != null && w.canGoBack()) w.goBack() else onClose()
    }

    Box(Modifier.fillMaxSize().background(Color.Black)) {
        androidx.compose.runtime.key(ulang) {
            AndroidView(
                modifier = Modifier.fillMaxSize(),
                factory = { c ->
                    val pemuatAset = androidx.webkit.WebViewAssetLoader.Builder()
                        .addPathHandler("/assets/", androidx.webkit.WebViewAssetLoader.AssetsPathHandler(c))
                        .build()
                    WebView(c).apply {
                        setBackgroundColor(android.graphics.Color.BLACK)
                        WebView.setWebContentsDebuggingEnabled(true)
                        settings.apply {
                            javaScriptEnabled = true
                            domStorageEnabled = true
                            databaseEnabled = true
                            mediaPlaybackRequiresUserGesture = false
                            useWideViewPort = true
                            loadWithOverviewMode = true
                            setSupportZoom(false)
                            builtInZoomControls = false
                            displayZoomControls = false
                            allowFileAccess = true
                            allowContentAccess = true
                            mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
                            cacheMode = WebSettings.LOAD_DEFAULT
                        }
                        webViewClient = object : WebViewClient() {
                            // Berkas game di dalam APK dibaca lewat appassets.
                            override fun shouldInterceptRequest(
                                view: WebView,
                                request: android.webkit.WebResourceRequest,
                            ): android.webkit.WebResourceResponse? = try {
                                pemuatAset.shouldInterceptRequest(request.url)
                            } catch (e: Exception) {
                                null
                            }

                            override fun onPageStarted(view: WebView?, alamat: String?, favicon: Bitmap?) {
                                prog = 0
                            }

                            override fun onPageFinished(view: WebView?, alamat: String?) {
                                prog = 100
                                // Kalau halaman ternyata kosong, sebutkan supaya tidak
                                // berakhir sebagai layar hitam tanpa keterangan.
                                view?.postDelayed({
                                    view.evaluateJavascript(
                                        "(function(){var a=document.getElementById('app');" +
                                            "return (a?a.innerHTML.length:-1)+'|'+(document.body?document.body.innerText.length:-1);})()",
                                    ) { hasil ->
                                        val angka = (hasil ?: "").replace("\"", "").split("|")
                                        val isiApp = angka.getOrNull(0)?.toIntOrNull() ?: -1
                                        if (isiApp == 0 && galat.isBlank()) {
                                            galat = "Halaman game kosong. Coba lagi atau laporkan ke pengembang."
                                        }
                                    }
                                }, 2500)
                            }

                            override fun onReceivedError(
                                view: WebView?,
                                request: android.webkit.WebResourceRequest?,
                                error: android.webkit.WebResourceError?,
                            ) {
                                if (request?.isForMainFrame != true) return
                                val v = view ?: return
                                val lain = cadangan
                                if (lain != null && v.tag != "cadangan") {
                                    v.tag = "cadangan"
                                    v.loadUrl(lain)
                                    return
                                }
                                galat = "Gagal memuat halaman (" + (error?.errorCode ?: -1) + "). Periksa koneksi lalu coba lagi."
                            }
                        }
                        webChromeClient = object : WebChromeClient() {
                            override fun onProgressChanged(view: WebView?, newProgress: Int) {
                                prog = newProgress
                            }

                            // Kesalahan skrip game ikut ditampilkan, supaya tidak
                            // berakhir sebagai layar hitam tanpa penjelasan.
                            override fun onConsoleMessage(m: android.webkit.ConsoleMessage?): Boolean {
                                val pesan = m?.message() ?: return false
                                if (m.messageLevel() == android.webkit.ConsoleMessage.MessageLevel.ERROR) {
                                    galat = "Skrip game berhenti: " + pesan.take(160)
                                }
                                return true
                            }
                        }
                        loadUrl(url)
                    }
                },
                update = { web = it },
            )
        }

        if (prog in 1..99 && galat.isBlank()) {
            LinearProgressIndicator(
                progress = { prog / 100f },
                modifier = Modifier.fillMaxWidth().height(3.dp).align(Alignment.TopCenter),
                color = Color(0xFFFFC107),
                trackColor = Color(0x33FFFFFF),
            )
        }

        if (galat.isNotBlank()) {
            androidx.compose.foundation.layout.Column(
                Modifier
                    .align(Alignment.Center)
                    .padding(horizontal = 28.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = androidx.compose.foundation.layout.Arrangement.spacedBy(12.dp),
            ) {
                Text(galat, color = Color(0xFFE8E8E8), fontSize = 13.sp)
                Box(
                    Modifier
                        .clip(androidx.compose.foundation.shape.RoundedCornerShape(20.dp))
                        .background(Color(0xFFFFC107))
                        .clickable {
                            galat = ""
                            prog = 0
                            ulang++
                        }
                        .padding(horizontal = 22.dp, vertical = 10.dp),
                ) {
                    Text("Coba lagi", color = Color.Black, fontSize = 14.sp)
                }
            }
        }

        // Tombol tutup selalu ada di atas game, jadi tidak pernah terjebak.
        Box(
            Modifier
                .align(Alignment.TopEnd)
                .statusBarsPadding()
                .padding(10.dp)
                .size(34.dp)
                .clip(CircleShape)
                .background(Color(0x66000000))
                .clickable { onClose() },
            contentAlignment = Alignment.Center,
        ) {
            Text("\u2715", color = Color.White, fontSize = 16.sp)
        }
    }
}

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
    const val URL_GAME = "https://exbottod.github.io/viza-chat-voice-room/game/bikini/index.html"
}

@Composable
fun GreedyFunniScreen(onClose: () -> Unit) {
    GameWebScreen(GreedyFunni.URL_GAME, GreedyFunni.URL_CADANGAN, onClose)
}

@Composable
fun BikiniRushScreen(onClose: () -> Unit) {
    GameWebScreen(BikiniRush.URL_GAME, null, onClose)
}

@SuppressLint("SetJavaScriptEnabled")
@Composable
private fun GameWebScreen(url: String, cadangan: String?, onClose: () -> Unit) {
    val ctx = LocalContext.current
    var web by remember { mutableStateOf<WebView?>(null) }
    var prog by remember { mutableStateOf(0) }

    BackHandler {
        val w = web
        if (w != null && w.canGoBack()) w.goBack() else onClose()
    }

    Box(Modifier.fillMaxSize().background(Color.Black)) {
        AndroidView(
            modifier = Modifier.fillMaxSize(),
            factory = { c ->
                WebView(c).apply {
                    setBackgroundColor(android.graphics.Color.BLACK)
                    settings.apply {
                        javaScriptEnabled = true
                        domStorageEnabled = true
                        databaseEnabled = true
                        // Suara dan animasi game boleh jalan tanpa disentuh dulu.
                        mediaPlaybackRequiresUserGesture = false
                        useWideViewPort = true
                        loadWithOverviewMode = true
                        setSupportZoom(false)
                        builtInZoomControls = false
                        displayZoomControls = false
                        allowFileAccess = true
                        allowContentAccess = true
                        // Aset game diambil dari beberapa domain.
                        mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
                        cacheMode = WebSettings.LOAD_DEFAULT
                    }
                    webViewClient = object : WebViewClient() {
                        override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                            prog = 0
                        }

                        override fun onPageFinished(view: WebView?, url: String?) {
                            prog = 100
                        }

                        // Kalau alamat utama gagal (mis. domain prod sedang gangguan),
                        // coba sekali ke alamat cadangan supaya layar tidak kosong.
                        override fun onReceivedError(
                            view: WebView?,
                            request: android.webkit.WebResourceRequest?,
                            error: android.webkit.WebResourceError?,
                        ) {
                            if (request?.isForMainFrame != true) return
                            val v = view ?: return
                            val lain = cadangan ?: return
                            if (v.tag == "cadangan") return
                            v.tag = "cadangan"
                            v.loadUrl(lain)
                        }
                    }
                    webChromeClient = object : WebChromeClient() {
                        override fun onProgressChanged(view: WebView?, newProgress: Int) {
                            prog = newProgress
                        }
                    }
                    loadUrl(url)
                }
            },
            update = { web = it },
        )

        if (prog in 1..99) {
            LinearProgressIndicator(
                progress = { prog / 100f },
                modifier = Modifier.fillMaxWidth().height(3.dp).align(Alignment.TopCenter),
                color = Color(0xFFFFC107),
                trackColor = Color(0x33FFFFFF),
            )
        }

        // Tombol tutup selalu ada di atas game, jadi tidak pernah terjebak.
        Box(
            Modifier
                .align(Alignment.TopEnd)
                .statusBarsPadding()
                .padding(8.dp)
                .size(36.dp)
                .clip(CircleShape)
                .background(Color(0x99000000))
                .clickable { onClose() },
            contentAlignment = Alignment.Center,
        ) {
            Text("✕", color = Color.White, fontSize = 18.sp)
        }
    }
}

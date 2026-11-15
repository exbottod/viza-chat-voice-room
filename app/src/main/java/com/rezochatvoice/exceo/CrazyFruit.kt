package com.rezochatvoice.exceo

import android.annotation.SuppressLint
import android.os.Handler
import android.os.Looper
import android.webkit.JavascriptInterface
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.compose.BackHandler
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
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
import androidx.compose.ui.viewinterop.AndroidView
import com.google.firebase.auth.FirebaseAuth
import kotlinx.coroutines.tasks.await
import android.graphics.Color as AColor

/**
 * Crazy Fruit milik Viza.
 *
 * Halaman game dibundel di dalam APK (assets/crazyfruit), jadi tetap jalan
 * walau jaringan jelek. Uangnya memakai dompet Viza lewat endpoint WaveGames
 * yang sudah ada di server dompet:
 *
 *   GET  /wave/game/userInfo
 *   POST /wave/game/submitFlow   { betAmount, type }  type 1 = bet, 2 = menang
 *
 * Token login Firebase dikirim lewat alamat halaman, dan permintaan dompet
 * dikerjakan app (jembatan RezoBridge) karena di sebagian HP permintaan dari
 * halaman lokal tidak pernah sampai ke server.
 */
@SuppressLint("SetJavaScriptEnabled")
@Composable
fun CrazyFruitScreen(
    myUid: String,
    myName: String,
    onClose: () -> Unit,
) {
    var token by remember { mutableStateOf("") }
    var chips by remember { mutableStateOf(CF_CHIPS) }
    var rtp by remember { mutableStateOf(92) }
    var siap by remember { mutableStateOf(false) }
    val wvPegang = remember { mutableStateOf<WebView?>(null) }

    LaunchedEffect(myUid) {
        token = try {
            FirebaseAuth.getInstance().currentUser?.getIdToken(false)?.await()?.token.orEmpty()
        } catch (e: Exception) {
            ""
        }
        // Chip bet dari panel (Bet game / Crazy Fruit).
        chips = try { BetCfg.load("crazyfruit", CF_CHIPS) } catch (e: Exception) { CF_CHIPS }
        // RTP dari panel (pub/_cfCfg/rtp). Kalau belum diatur, 92%.
        rtp = try {
            val snap = Rtdb.ref("pub/_cfCfg").get().await()
            val v = snap.child("rtp").getValue(Int::class.java)
                ?: snap.child("rtp").getValue(Double::class.java)?.toInt()
            if (v != null && v in 50..120) v else 92
        } catch (e: kotlinx.coroutines.CancellationException) {
            throw e
        } catch (e: Exception) {
            92
        }
        siap = true
    }

    BackHandler(enabled = true) { onClose() }

    androidx.compose.runtime.DisposableEffect(Unit) {
        onDispose {
            try {
                wvPegang.value?.apply {
                    stopLoading()
                    loadUrl("about:blank")
                    destroy()
                }
            } catch (e: Exception) {
            }
            wvPegang.value = null
        }
    }

    Box(
        Modifier.fillMaxSize().clickable(
            indication = null,
            interactionSource = remember { androidx.compose.foundation.interaction.MutableInteractionSource() },
        ) { onClose() },
    ) {
        Column(
            Modifier.align(Alignment.BottomCenter).fillMaxWidth().fillMaxHeight(CF_SHEET)
                .navigationBarsPadding()
                .clip(RoundedCornerShape(topStart = 22.dp, topEnd = 22.dp))
                .background(Color(0xFF0A0F1E))
                .border(1.dp, Color(0xFF2A3550), RoundedCornerShape(topStart = 22.dp, topEnd = 22.dp))
                .clickable(
                    indication = null,
                    interactionSource = remember { androidx.compose.foundation.interaction.MutableInteractionSource() },
                ) { },
        ) {
            Box(Modifier.fillMaxWidth().padding(top = 8.dp, bottom = 6.dp), contentAlignment = Alignment.Center) {
                Box(Modifier.width(44.dp).height(4.dp).clip(RoundedCornerShape(2.dp)).background(Color(0xFF3A4763)))
            }
            if (siap) {
                AndroidView(
                    modifier = Modifier.fillMaxSize(),
                    factory = { c ->
                        val namaAman = myName.ifBlank { "Player" }
                        val pemuatAset = androidx.webkit.WebViewAssetLoader.Builder()
                            .addPathHandler("/assets/", androidx.webkit.WebViewAssetLoader.AssetsPathHandler(c))
                            .build()

                        WebView(c).apply {
                            setBackgroundColor(AColor.parseColor("#0A0F1E"))
                            settings.javaScriptEnabled = true
                            settings.domStorageEnabled = true
                            settings.databaseEnabled = true
                            settings.mediaPlaybackRequiresUserGesture = false
                            settings.useWideViewPort = false
                            settings.loadWithOverviewMode = false
                            settings.setSupportZoom(false)
                            settings.cacheMode = android.webkit.WebSettings.LOAD_NO_CACHE
                            settings.allowFileAccess = true
                            settings.mixedContentMode = android.webkit.WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
                            settings.userAgentString = "Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36 " +
                                "(KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36"

                            addJavascriptInterface(
                                object {
                                    @JavascriptInterface fun tinggi(): Int =
                                        (c.resources.displayMetrics.heightPixels / c.resources.displayMetrics.density).toInt()

                                    @JavascriptInterface fun api() = CF_SERVER
                                    // Chip bet + RTP dari panel, dibaca game saat halaman mulai.
                                    @JavascriptInterface fun chips(): String =
                                        chips.joinToString(",", "[", "]")
                                    @JavascriptInterface fun rtp(): Int = rtp
                                    @JavascriptInterface fun token() = token
                                    @JavascriptInterface fun uid() = myUid
                                    @JavascriptInterface fun nama() = namaAman

                                    // Permintaan dompet dikerjakan app, bukan halaman,
                                    // lalu hasilnya dikirim balik lewat window.__cfBalas.
                                    @JavascriptInterface fun mintaAsync(id: String, metode: String, jalur: String, isi: String) {
                                        val wvAktif = wvPegang.value
                                        Thread {
                                            val hasil = mintaDompetCf(metode, jalur, isi, token)
                                            try {
                                                val kutip = org.json.JSONObject.quote(hasil)
                                                wvAktif?.post {
                                                    wvAktif.evaluateJavascript("window.__cfBalas&&window.__cfBalas('$id',$kutip)", null)
                                                }
                                            } catch (e: Exception) {
                                            }
                                        }.start()
                                    }
                                },
                                "RezoBridge",
                            )

                            webViewClient = object : WebViewClient() {
                                override fun shouldInterceptRequest(
                                    view: WebView,
                                    request: WebResourceRequest,
                                ): WebResourceResponse? = try {
                                    pemuatAset.shouldInterceptRequest(request.url)
                                } catch (e: Exception) {
                                    null
                                }

                                override fun onPageFinished(view: WebView, url: String?) {
                                    super.onPageFinished(view, url)
                                    // Kalau halaman kosong (skrip gagal dimuat), beri
                                    // keterangan supaya layar tidak hitam tanpa pesan.
                                    Handler(Looper.getMainLooper()).postDelayed({
                                        view.evaluateJavascript(
                                            "(function(){var r=document.getElementById('root');" +
                                                "return (r&&r.children.length>0)?'ada':'kosong';})()",
                                        ) { hasil ->
                                            if (hasil?.contains("kosong") == true) {
                                                val skrip = "document.body.insertAdjacentHTML('beforeend','" +
                                                    "<div style=\"position:fixed;left:0;right:0;bottom:0;padding:14px;" +
                                                    "background:#7a1020;color:#fff;font:14px sans-serif;text-align:center\">" +
                                                    "Game belum bisa dimuat di HP ini. Tutup lalu buka lagi Crazy Fruit.</div>');"
                                                view.evaluateJavascript(skrip, null)
                                            }
                                        }
                                    }, 6000L)
                                }
                            }

                            wvPegang.value = this
                            loadUrl(alamatCrazy(token, myUid, namaAman))
                        }
                    },
                )
            }
        }
    }
}

/** Tinggi sheet game dibanding layar: pita tipis di atas tetap memperlihatkan room. */
private const val CF_SHEET = 0.93f

/** Chip bet bawaan kalau panel belum mengatur apa pun. */
private val CF_CHIPS = listOf(1000L, 5000L, 10000L, 50000L, 100000L)

private const val CF_SERVER = "https://viza.43-156-99-4.sslip.io"
private const val CF_LOKAL = "https://appassets.androidplatform.net/assets/crazyfruit/index.html"

/** Tambahkan token, uid, dan nama ke alamat halaman game. */
private fun alamatCrazy(token: String, uid: String, nama: String): String {
    if (token.isBlank()) return CF_LOKAL
    val t = java.net.URLEncoder.encode(token, "UTF-8")
    val u = java.net.URLEncoder.encode(uid, "UTF-8")
    val n = java.net.URLEncoder.encode(nama, "UTF-8")
    return CF_LOKAL + "?token=" + t + "&t=" + t + "&u=" + u + "&n=" + n + "&embed=half&gameId=crazyfruit&appKey=viza"
}

/** Permintaan HTTP dompet, dikerjakan dari sisi app supaya tidak putus di WebView. */
private fun mintaDompetCf(metode: String, jalur: String, isi: String, token: String): String {
    val url = if (jalur.startsWith("http")) jalur else CF_SERVER + jalur
    return try {
        val c = java.net.URL(url).openConnection() as java.net.HttpURLConnection
        c.requestMethod = if (metode.isBlank()) "GET" else metode.uppercase()
        c.connectTimeout = 15000
        c.readTimeout = 15000
        if (token.isNotBlank()) c.setRequestProperty("Authorization", "Bearer $token")
        c.setRequestProperty("Accept", "application/json")
        if (c.requestMethod != "GET" && isi.isNotBlank()) {
            c.doOutput = true
            c.setRequestProperty("Content-Type", "application/json")
            c.outputStream.use { it.write(isi.toByteArray(Charsets.UTF_8)) }
        }
        val kode = c.responseCode
        val teks = (if (kode in 200..299) c.inputStream else c.errorStream)
            ?.bufferedReader()?.use { it.readText() }.orEmpty()
        if (teks.isBlank()) """{"ok":0,"error":"Server menjawab kosong ($kode)"}""" else teks
    } catch (e: Exception) {
        """{"ok":0,"error":"${(e.message ?: "jaringan gagal").replace("\"", "'")}"}"""
    }
}

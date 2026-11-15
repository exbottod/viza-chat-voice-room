package com.rezochatvoice.exceo

import android.annotation.SuppressLint
import android.graphics.Color as AColor
import android.webkit.WebView
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.viewinterop.AndroidView

/**
 * Pecahan cashback ala aplikasi acuan, digambar dengan CSS di dalam WebView.
 *
 * Nilai pecahan disuntik ke halaman sebelum dimuat (tanpa jembatan JS), lalu
 * halaman diputar: koin emas berisi angka muncul di tengah layar, mengambang,
 * lalu memudar. Semua gaya ada di assets/cashback/pecahan.html supaya bisa
 * diubah tanpa menyentuh kode Kotlin.
 */
@SuppressLint("SetJavaScriptEnabled")
@Composable
fun PecahanCss(nilai: List<Long>, modifier: Modifier = Modifier.fillMaxSize()) {
    val ctx = LocalContext.current
    val bersih = nilai.filter { it > 0L }
    if (bersih.isEmpty()) return

    val html = remember(bersih) {
        try {
            val isi = ctx.assets.open("cashback/pecahan.html").use {
                String(it.readBytes(), Charsets.UTF_8)
            }
            val data = bersih.joinToString(prefix = "[", postfix = "]", separator = ",")
            isi.replace("__DATA__", data)
        } catch (e: Exception) {
            ""
        }
    }
    if (html.isBlank()) return

    AndroidView(
        modifier = modifier,
        factory = { c ->
            WebView(c).apply {
                setBackgroundColor(AColor.TRANSPARENT)
                setLayerType(WebView.LAYER_TYPE_HARDWARE, null)
                settings.javaScriptEnabled = true
                settings.allowFileAccess = true
                settings.useWideViewPort = true
                settings.loadWithOverviewMode = false
                settings.setSupportZoom(false)
                settings.mediaPlaybackRequiresUserGesture = false
                isVerticalScrollBarEnabled = false
                isHorizontalScrollBarEnabled = false
                overScrollMode = WebView.OVER_SCROLL_NEVER
                loadDataWithBaseURL(
                    "file:///android_asset/cashback/",
                    html,
                    "text/html",
                    "utf-8",
                    null,
                )
            }
        },
    )
}

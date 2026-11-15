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
 * Efek cashback di tengah layar, digambar dengan CSS di dalam WebView.
 *
 * Urutannya: ikon gift muncul membal, badge jenis hadiah (cashback / lucky /
 * jackpot), pengali berputar lalu berhenti di nilai dari server, nominal naik
 * sampai angka akhir, konfeti untuk lucky dan jackpot, lalu koin pecahan
 * disebar melingkar.
 *
 * Semua gaya ada di assets/cashback/pecahan.html, jadi tampilan bisa diubah
 * tanpa menyentuh kode Kotlin. Nilai uangnya tetap datang dari server.
 */
@SuppressLint("SetJavaScriptEnabled")
@Composable
fun PecahanCss(
    nilai: List<Long>,
    total: Long,
    kali: Double,
    emoji: String = "🎁",
    label: String = "",
    modifier: Modifier = Modifier.fillMaxSize(),
) {
    val ctx = LocalContext.current
    val koin = (if (nilai.any { it > 0L }) nilai else listOf(total)).filter { it > 0L }
    if (koin.isEmpty()) return

    val kaliAman = if (kali > 0) kali else 1.0
    val jenis = when {
        kaliAman >= 5 -> "jp"
        kaliAman >= 2 -> "lucky"
        else -> "cashback"
    }
    val judul = label.ifBlank {
        when (jenis) {
            "jp" -> "Jackpot Match"
            "lucky" -> "Lucky Bonus"
            else -> "Cashback"
        }
    }

    val html = remember(koin, total, kaliAman, judul, emoji) {
        try {
            val isi = ctx.assets.open("cashback/pecahan.html").use {
                String(it.readBytes(), Charsets.UTF_8)
            }
            val json = buildString {
                append("{")
                append("\"nilai\":[").append(koin.joinToString(",")).append("],")
                append("\"total\":").append(total).append(",")
                append("\"kali\":").append(kaliAman).append(",")
                append("\"jenis\":\"").append(jenis).append("\",")
                append("\"label\":\"").append(judul.replace("\"", "")).append("\",")
                append("\"emoji\":\"").append(emoji.ifBlank { "🎁" }).append("\",")
                append("\"satuan\":\" koin\"")
                append("}")
            }
            isi.replace("__DATA__", json)
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

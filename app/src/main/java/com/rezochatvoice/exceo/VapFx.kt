package com.rezochatvoice.exceo

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.offset
import androidx.compose.material3.Text
import androidx.compose.ui.Alignment
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.viewinterop.AndroidView
import kotlinx.coroutines.delay

/**
 * Animasi hadiah besar format VAP (Tencent), dipakai untuk cashback besar.
 *
 * File VAP ikut di dalam aplikasi (assets/cashback). Animasi ini latarnya hitam
 * pekat, jadi di belakangnya dipasang lapisan gelap supaya menyatu dengan room
 * dan tidak terlihat sebagai kotak hitam.
 */
@Composable
fun LuckyVap(
    modifier: Modifier = Modifier,
    /** Pengali dari server, mis. "x100", "x5", "10%". */
    kaliLabel: String = "",
    /** Total coin yang menang, ditulis di bawah pengali. */
    koin: Long = 0L,
) {
    val ctx = LocalContext.current
    val aset = "cashback/ha_lucky_gift_reward.mp4"
    val ada = remember {
        try {
            ctx.assets.open(aset).close()
            true
        } catch (e: Exception) {
            false
        }
    }
    if (!ada) return

    var jalan by remember { mutableStateOf(true) }
    // Durasi berkas 4 detik; dipakai batas aman supaya lapisan tetap dilepas
    // walau callback player tidak terpanggil di sebagian perangkat.
    LaunchedEffect(Unit) {
        delay(4400L)
        jalan = false
    }
    if (!jalan) return

    Box(modifier) {
        Box(Modifier.fillMaxSize().background(Color(0xC4000000)))
        AndroidView(
            modifier = Modifier.fillMaxSize(),
            factory = { c ->
                com.tencent.qgame.animplayer.AnimView(c).apply {
                    setLoop(1)
                    setMute(true)
                    setScaleType(com.tencent.qgame.animplayer.util.ScaleType.FIT_CENTER)
                    try {
                        // startPlay(AssetManager, nama berkas) membaca langsung dari
                        // aset aplikasi, jadi tidak perlu menyalin ke penyimpanan.
                        startPlay(c.assets, aset)
                    } catch (e: Exception) {
                        jalan = false
                    }
                }
            },
            onRelease = { v ->
                try {
                    v.stopPlay()
                } catch (e: Exception) { }
            },
        )
        // Angka hadiah ditulis di dalam lingkaran "WIN": pengali besar dulu,
        // lalu nominal coin-nya. Semua angka dari server.
        if (kaliLabel.isNotBlank() || koin > 0L) {
            Column(
                modifier = Modifier
                    .align(Alignment.Center)
                    .offset(y = 58.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center,
            ) {
                if (kaliLabel.isNotBlank()) {
                    Text(
                        kaliLabel.uppercase(),
                        color = Color(0xFFFFF3C4),
                        fontSize = 44.sp,
                        fontWeight = FontWeight.Black,
                    )
                }
                if (koin > 0L) {
                    Text(
                        "+" + "%,d".format(koin).replace(',', '.') + " koin",
                        color = Color(0xFFFFD24D),
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Black,
                    )
                }
            }
        }
    }
}

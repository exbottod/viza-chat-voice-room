package com.rezochatvoice.exceo

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue

/**
 * Penanda apakah layar aplikasi sedang terlihat oleh pemakai.
 *
 * Dipakai animasi bingkai, efek masuk, dan video: selama aplikasi di latar
 * belakang (pindah ke WhatsApp atau aplikasi lain), pemutarnya dihentikan.
 * Dulu semuanya tetap berputar di belakang layar, jadi CPU dan baterai terus
 * bekerja, HP menghangat, dan begitu pemakai kembali aplikasi terasa berat
 * serta tersendat. Begitu kembali, animasi dinyalakan lagi.
 */
object LayarAktif {
    var hidup by mutableStateOf(true)
}

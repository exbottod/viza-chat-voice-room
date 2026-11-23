package com.rezochatvoice.exceo

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

/**
 * Ikon salin ID: dua kotak bertumpuk bergaris abu muda dengan tanda plus kecil,
 * dipakai di samping teks UID supaya seragam di semua layar. Ukurannya diatur
 * pemanggil agar tetap sejajar dengan teks di sebelahnya.
 */
@Composable
fun IkonSalin(ukuran: Dp = 15.dp, warna: Color = Color(0xFFC9CCD6)) {
    Image(
        painter = painterResource(R.drawable.ic_salin_id),
        contentDescription = "Salin ID",
        colorFilter = androidx.compose.ui.graphics.ColorFilter.tint(warna),
        modifier = Modifier.size(ukuran),
    )
}

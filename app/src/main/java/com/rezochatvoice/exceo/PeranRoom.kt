package com.rezochatvoice.exceo

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.compositionLocalOf
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.drawscope.Fill
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

/** Peran seseorang di sebuah room. */
enum class PeranRoom { OWNER, ADMIN, BIASA }

/**
 * Pemilik room dan daftar admin room yang sedang dibuka. Diisi sekali di
 * RoomScreen supaya kursi mic dan baris chat bisa menampilkan ikon peran
 * tanpa mengubah setiap pemanggilnya.
 */
data class DataPeranRoom(val ownerUid: String = "", val admins: List<String> = emptyList()) {
    fun peranDari(uid: String?): PeranRoom = when {
        uid.isNullOrBlank() -> PeranRoom.BIASA
        uid == ownerUid -> PeranRoom.OWNER
        admins.contains(uid) -> PeranRoom.ADMIN
        else -> PeranRoom.BIASA
    }
}

val LocalPeranRoom = compositionLocalOf { DataPeranRoom() }

@Composable
fun ProvidePeranRoom(data: DataPeranRoom, isi: @Composable () -> Unit) {
    CompositionLocalProvider(LocalPeranRoom provides data, content = isi)
}

/**
 * Ikon kecil di sebelah kiri nama. Owner: rumah merah dengan atap putih.
 * Admin: gambar orang. Selain itu tidak menggambar apa pun.
 * Digambar dengan Canvas, jadi tajam di semua ukuran layar dan tanpa berkas gambar.
 */
@Composable
fun PeranRoomIcon(uid: String?, modifier: Modifier = Modifier, ukuran: Dp = 12.dp) {
    when (LocalPeranRoom.current.peranDari(uid)) {
        PeranRoom.OWNER -> IkonRumah(modifier, ukuran)
        PeranRoom.ADMIN -> IkonOrang(modifier, ukuran)
        PeranRoom.BIASA -> Unit
    }
}

@Composable
private fun IkonRumah(modifier: Modifier, ukuran: Dp) {
    Canvas(modifier.size(ukuran)) {
        val w = size.width
        val h = size.height
        val merah = Color(0xFFE53935)
        val putih = Color.White
        // Badan rumah (merah).
        drawRect(merah, topLeft = Offset(w * 0.18f, h * 0.46f), size = Size(w * 0.64f, h * 0.46f))
        // Atap segitiga (putih) dengan garis tepi merah supaya tetap terbaca di latar terang.
        val atap = Path().apply {
            moveTo(w * 0.5f, h * 0.04f)
            lineTo(w * 0.98f, h * 0.5f)
            lineTo(w * 0.02f, h * 0.5f)
            close()
        }
        drawPath(atap, putih, style = Fill)
        // Pintu (putih).
        drawRect(putih, topLeft = Offset(w * 0.42f, h * 0.62f), size = Size(w * 0.16f, h * 0.30f))
    }
}

@Composable
private fun IkonOrang(modifier: Modifier, ukuran: Dp) {
    Canvas(modifier.size(ukuran)) {
        val w = size.width
        val h = size.height
        val warna = Color(0xFFB9C4CC)
        // Kepala.
        drawCircle(warna, radius = w * 0.2f, center = Offset(w * 0.5f, h * 0.3f))
        // Bahu / badan.
        val badan = Path().apply {
            moveTo(w * 0.1f, h * 0.95f)
            cubicTo(w * 0.1f, h * 0.62f, w * 0.3f, h * 0.55f, w * 0.5f, h * 0.55f)
            cubicTo(w * 0.7f, h * 0.55f, w * 0.9f, h * 0.62f, w * 0.9f, h * 0.95f)
            close()
        }
        drawPath(badan, warna, style = Fill)
    }
}

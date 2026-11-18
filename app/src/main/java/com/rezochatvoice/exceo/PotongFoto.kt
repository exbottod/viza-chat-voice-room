package com.rezochatvoice.exceo

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Canvas
import android.graphics.Matrix
import android.graphics.Paint
import android.net.Uri
import android.util.Base64
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.gestures.detectTransformGestures
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.clickable
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clipToBounds
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.ImageBitmap
import androidx.compose.ui.graphics.asImageBitmap
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.DialogProperties
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.ByteArrayOutputStream
import kotlin.math.max

/** Memuat foto dari galeri/kamera, diperkecil dulu supaya hemat memori saat dipotong. */
suspend fun muatFotoPotong(context: Context, uri: Uri, sisiMaks: Int = 2048): Bitmap? =
    withContext(Dispatchers.IO) {
        try {
            val ukur = BitmapFactory.Options().apply { inJustDecodeBounds = true }
            context.contentResolver.openInputStream(uri)?.use { BitmapFactory.decodeStream(it, null, ukur) }
            if (ukur.outWidth <= 0 || ukur.outHeight <= 0) return@withContext null
            var s = 1
            while (max(ukur.outWidth, ukur.outHeight) / (s * 2) >= sisiMaks) s *= 2
            val opsi = BitmapFactory.Options().apply { inSampleSize = s }
            var bmp = context.contentResolver.openInputStream(uri)?.use { BitmapFactory.decodeStream(it, null, opsi) }
                ?: return@withContext null
            // Putar sesuai EXIF supaya foto kamera tidak miring.
            val derajat = try {
                context.contentResolver.openInputStream(uri)?.use {
                    when (androidx.exifinterface.media.ExifInterface(it).getAttributeInt(
                        androidx.exifinterface.media.ExifInterface.TAG_ORIENTATION, 1,
                    )) {
                        androidx.exifinterface.media.ExifInterface.ORIENTATION_ROTATE_90 -> 90f
                        androidx.exifinterface.media.ExifInterface.ORIENTATION_ROTATE_180 -> 180f
                        androidx.exifinterface.media.ExifInterface.ORIENTATION_ROTATE_270 -> 270f
                        else -> 0f
                    }
                } ?: 0f
            } catch (e: Exception) { 0f }
            if (derajat != 0f) {
                val m = Matrix().apply { postRotate(derajat) }
                bmp = Bitmap.createBitmap(bmp, 0, 0, bmp.width, bmp.height, m, true)
            }
            bmp
        } catch (e: kotlinx.coroutines.CancellationException) {
            throw e
        } catch (e: Exception) {
            null
        }
    }

/**
 * Layar potong foto: gambar bisa digeser dan dicubit untuk zoom di dalam bingkai.
 * [rasio] = lebar / tinggi bingkai (tema room = rasio layar HP, sampul = 1).
 * [bulat] = bingkai berbentuk lingkaran (sampul room).
 * Hasil dipotong sesuai bingkai, diperkecil ke [sisiMaks], lalu dikembalikan sebagai base64 JPEG.
 */
@Composable
fun LayarPotongFoto(
    bitmap: Bitmap,
    rasio: Float,
    bulat: Boolean,
    sisiMaks: Int,
    kualitas: Int,
    onBatal: () -> Unit,
    onSelesai: (String?) -> Unit,
) {
    Dialog(
        onDismissRequest = onBatal,
        properties = DialogProperties(usePlatformDefaultWidth = false, decorFitsSystemWindows = false),
    ) {
        val gambar: ImageBitmap = remember(bitmap) { bitmap.asImageBitmap() }
        var skala by remember { mutableStateOf(1f) }
        var geserX by remember { mutableStateOf(0f) }
        var geserY by remember { mutableStateOf(0f) }
        var sibuk by remember { mutableStateOf(false) }
        val scope = androidx.compose.runtime.rememberCoroutineScope()

        Box(Modifier.fillMaxSize().background(Color.Black)) {
            Row(
                Modifier.fillMaxWidth().padding(horizontal = 14.dp, vertical = 14.dp).align(Alignment.TopCenter),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween,
            ) {
                Text(
                    "\u2039",
                    color = Color.White,
                    fontSize = 34.sp,
                    modifier = Modifier.clickable { if (!sibuk) onBatal() }.padding(horizontal = 8.dp),
                )
                Text("Gambar", color = Color.White, fontSize = 17.sp)
                Box(
                    Modifier
                        .background(Color(0xFFF2B72B), RoundedCornerShape(18.dp))
                        .clickable(enabled = !sibuk) { sibuk = true; /* diproses di bawah */ }
                        .padding(horizontal = 14.dp, vertical = 7.dp),
                ) { Text(if (sibuk) "..." else "Konfirmasi", color = Color.Black, fontSize = 14.sp, fontWeight = FontWeight.Bold) }
            }

            BoxWithConstraints(Modifier.fillMaxSize().padding(top = 64.dp, bottom = 24.dp, start = 12.dp, end = 12.dp)) {
                val wMaks = constraints.maxWidth.toFloat()
                val hMaks = constraints.maxHeight.toFloat()
                // Bingkai seluas mungkin dengan rasio yang diminta.
                var bw = wMaks
                var bh = bw / rasio
                if (bh > hMaks) { bh = hMaks; bw = bh * rasio }
                // Skala dasar: gambar menutupi seluruh bingkai.
                val dasar = max(bw / bitmap.width, bh / bitmap.height)
                val dp = LocalDensity.current

                fun batasi() {
                    val lebar = bitmap.width * dasar * skala
                    val tinggi = bitmap.height * dasar * skala
                    val mx = ((lebar - bw) / 2f).coerceAtLeast(0f)
                    val my = ((tinggi - bh) / 2f).coerceAtLeast(0f)
                    geserX = geserX.coerceIn(-mx, mx)
                    geserY = geserY.coerceIn(-my, my)
                }

                Box(
                    Modifier
                        .align(Alignment.Center)
                        .size(with(dp) { bw.toDp() }, with(dp) { bh.toDp() })
                        .clipToBounds()
                        .then(
                            if (bulat) Modifier.border(2.dp, Color.White, androidx.compose.foundation.shape.CircleShape)
                            else Modifier.border(2.dp, Color.White),
                        )
                        .pointerInput(Unit) {
                            detectTransformGestures { _, pan, zoom, _ ->
                                skala = (skala * zoom).coerceIn(1f, 6f)
                                geserX += pan.x
                                geserY += pan.y
                                batasi()
                            }
                        },
                ) {
                    Image(
                        bitmap = gambar,
                        contentDescription = null,
                        contentScale = ContentScale.Crop,
                        modifier = Modifier
                            .fillMaxSize()
                            .graphicsLayer {
                                scaleX = skala
                                scaleY = skala
                                translationX = geserX
                                translationY = geserY
                            },
                    )
                }

                androidx.compose.runtime.LaunchedEffect(sibuk) {
                    if (!sibuk) return@LaunchedEffect
                    val hasil = withContext(Dispatchers.Default) {
                        try {
                            // Pindahkan area bingkai ke koordinat bitmap asli.
                            val skalaTotal = dasar * skala
                            val lebarTampil = bitmap.width * skalaTotal
                            val tinggiTampil = bitmap.height * skalaTotal
                            val kiri = ((lebarTampil - bw) / 2f - geserX) / skalaTotal
                            val atas = ((tinggiTampil - bh) / 2f - geserY) / skalaTotal
                            val lebarSrc = bw / skalaTotal
                            val tinggiSrc = bh / skalaTotal
                            val x = kiri.toInt().coerceIn(0, bitmap.width - 1)
                            val y = atas.toInt().coerceIn(0, bitmap.height - 1)
                            val w = lebarSrc.toInt().coerceIn(1, bitmap.width - x)
                            val h = tinggiSrc.toInt().coerceIn(1, bitmap.height - y)
                            val potong = Bitmap.createBitmap(bitmap, x, y, w, h)
                            val sisi = max(potong.width, potong.height)
                            val hasilBmp = if (sisi > sisiMaks) {
                                val f = sisiMaks.toFloat() / sisi
                                Bitmap.createScaledBitmap(
                                    potong,
                                    (potong.width * f).toInt().coerceAtLeast(1),
                                    (potong.height * f).toInt().coerceAtLeast(1),
                                    true,
                                )
                            } else potong
                            val out = ByteArrayOutputStream()
                            hasilBmp.compress(Bitmap.CompressFormat.JPEG, kualitas, out)
                            Base64.encodeToString(out.toByteArray(), Base64.NO_WRAP)
                        } catch (e: Exception) {
                            null
                        }
                    }
                    onSelesai(hasil)
                }
            }
        }
    }
}

/**
 * Pratinjau setelah foto dipotong. Foto ditampilkan seperti sudah dipakai di room,
 * lalu user memilih "Unggah lagi" atau "Konfirmasi" untuk menyimpan.
 */
@Composable
fun PratinjauFotoRoom(
    b64: String,
    judul: String,
    untukTema: Boolean,
    onUnggahLagi: () -> Unit,
    onKonfirmasi: () -> Unit,
    onTutup: () -> Unit,
) {
    Dialog(
        onDismissRequest = onTutup,
        properties = DialogProperties(usePlatformDefaultWidth = false, decorFitsSystemWindows = false),
    ) {
        val bmp = remember(b64) { ProfileRepo.decodeB64Scaled(b64, 720) }
        Box(Modifier.fillMaxSize().background(Color.Black)) {
            androidx.compose.foundation.layout.Column(
                Modifier.fillMaxSize().padding(horizontal = 16.dp, vertical = 16.dp),
            ) {
                Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                    androidx.compose.foundation.layout.Column(Modifier.weight(1f)) {
                        Text(judul, color = Color.White, fontSize = 19.sp, fontWeight = FontWeight.Bold)
                        Text(
                            "Jika tidak puas, bisa mengklik untuk unggah lagi",
                            color = Color(0xFFBDBDBD), fontSize = 12.sp,
                        )
                    }
                    Text(
                        "\u00D7",
                        color = Color.White,
                        fontSize = 26.sp,
                        modifier = Modifier.clickable { onTutup() }.padding(horizontal = 6.dp),
                    )
                }
                androidx.compose.foundation.layout.Spacer(Modifier.size(14.dp))
                Box(
                    Modifier
                        .weight(1f)
                        .fillMaxWidth()
                        .clipToBounds()
                        .background(Color(0xFF101010), RoundedCornerShape(14.dp)),
                ) {
                    if (bmp != null) {
                        Image(
                            bitmap = bmp,
                            contentDescription = null,
                            contentScale = if (untukTema) ContentScale.Crop else ContentScale.Fit,
                            modifier = Modifier.fillMaxSize(),
                        )
                    }
                    // Gambaran kecil isi room supaya terlihat seperti saat dipakai.
                    androidx.compose.foundation.layout.Column(
                        Modifier.fillMaxSize().padding(12.dp),
                    ) {
                        Text("Nama room", color = Color.White, fontSize = 15.sp, fontWeight = FontWeight.Bold)
                        Text("Lv.2  \u00B7  ID 123456", color = Color(0xFFEDEDED), fontSize = 11.sp)
                        androidx.compose.foundation.layout.Spacer(Modifier.weight(1f))
                        Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                            repeat(3) {
                                Box(
                                    Modifier
                                        .size(38.dp)
                                        .background(Color(0x55FFFFFF), androidx.compose.foundation.shape.CircleShape),
                                )
                            }
                        }
                        androidx.compose.foundation.layout.Spacer(Modifier.size(8.dp))
                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            repeat(4) {
                                Box(
                                    Modifier
                                        .size(30.dp)
                                        .background(Color(0x44FFFFFF), RoundedCornerShape(8.dp)),
                                )
                            }
                        }
                    }
                }
                androidx.compose.foundation.layout.Spacer(Modifier.size(16.dp))
                Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                    Box(
                        Modifier
                            .weight(1f)
                            .border(1.dp, Color(0xFFEDEDED), RoundedCornerShape(24.dp))
                            .clickable { onUnggahLagi() }
                            .padding(vertical = 13.dp),
                        contentAlignment = Alignment.Center,
                    ) { Text("Unggah lagi", color = Color.White, fontSize = 15.sp) }
                    Box(
                        Modifier
                            .weight(1f)
                            .background(Color(0xFFF2B72B), RoundedCornerShape(24.dp))
                            .clickable { onKonfirmasi() }
                            .padding(vertical = 13.dp),
                        contentAlignment = Alignment.Center,
                    ) { Text("Konfirmasi", color = Color.Black, fontSize = 15.sp, fontWeight = FontWeight.Bold) }
                }
            }
        }
    }
}

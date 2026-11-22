package com.rezochatvoice.exceo

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.produceState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.ImageBitmap
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.DialogProperties
import coil.compose.AsyncImage

/**
 * Foto profil ukuran penuh, rasio 1:1 (persegi), di tengah layar hitam.
 *
 * Dipakai dari profil orang lain: satu ketukan pada foto langsung membuka
 * tampilan ini. Ketuk di mana saja untuk menutup.
 */
@Composable
fun FotoPenuh(u: PublicUser?, tampil: Boolean, onTutup: () -> Unit) {
    if (!tampil) return
    Dialog(
        onDismissRequest = onTutup,
        properties = DialogProperties(usePlatformDefaultWidth = false),
    ) {
        Box(
            Modifier.fillMaxSize().background(Color.Black).clickable { onTutup() },
            contentAlignment = Alignment.Center,
        ) {
            val b64 = u?.avatarB64
            // Foto disimpan dua bentuk: base64 dari aplikasi dan URL dari panel.
            val bmp by produceState<ImageBitmap?>(
                initialValue = ProfileRepo.avatarCached(b64),
                key1 = b64,
            ) { value = ProfileRepo.decodeAvatar(b64) ?: value }
            val gambar = bmp
            val url = u?.photoUrl
            Box(
                Modifier.fillMaxWidth().aspectRatio(1f),
                contentAlignment = Alignment.Center,
            ) {
                when {
                    gambar != null -> Image(
                        gambar, contentDescription = null,
                        modifier = Modifier.fillMaxSize(), contentScale = ContentScale.Crop,
                    )
                    !url.isNullOrBlank() -> AsyncImage(
                        model = url, contentDescription = null,
                        modifier = Modifier.fillMaxSize(), contentScale = ContentScale.Crop,
                    )
                    u?.gender == "F" -> Image(
                        painterResource(R.drawable.ic_default_avatar_female), null,
                        Modifier.fillMaxSize(), contentScale = ContentScale.Crop,
                    )
                    u?.gender == "M" -> Image(
                        painterResource(R.drawable.ic_default_avatar_male), null,
                        Modifier.fillMaxSize(), contentScale = ContentScale.Crop,
                    )
                    else -> Box(Modifier.fillMaxSize().background(Color(0xFF263238)), contentAlignment = Alignment.Center) {
                        Text(
                            (u?.name ?: "?").take(1).uppercase(),
                            color = Color(0xFFFFD54F), fontWeight = FontWeight.Bold, fontSize = 64.sp,
                        )
                    }
                }
            }
            // Petunjuk kecil di bawah, tidak menutupi foto.
            Box(
                Modifier.align(Alignment.BottomCenter).navigationBarsPadding().padding(bottom = 24.dp),
            ) {
                Text("Ketuk untuk menutup", color = Color(0x99FFFFFF), fontSize = 12.sp)
            }
        }
    }
}

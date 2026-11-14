package com.rezochatvoice.exceo

import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.detectTransformGestures
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.DialogProperties
import coil.compose.AsyncImage

/**
 * Pratinjau foto layar penuh dengan cubit (pinch) untuk zoom.
 *
 * Dipakai chat: sekali ketuk foto, gambar langsung memenuhi layar, cubit dua
 * jari untuk memperbesar sampai 5x, geser untuk menggeser, dan tombol X untuk
 * menutup. Dua ketuk juga mengembalikan ukuran ke awal.
 */
@Composable
fun FotoLayarPenuh(uri: String, onTutup: () -> Unit) {
    Dialog(
        onDismissRequest = onTutup,
        properties = DialogProperties(usePlatformDefaultWidth = false),
    ) {
        var skala by remember { mutableStateOf(1f) }
        var geser by remember { mutableStateOf(Offset.Zero) }

        Box(
            Modifier
                .fillMaxSize()
                .background(Color.Black)
                .pointerInput(Unit) {
                    detectTransformGestures { _, pan, zoom, _ ->
                        val baru = (skala * zoom).coerceIn(1f, 5f)
                        skala = baru
                        geser = if (baru > 1.01f) geser + pan else Offset.Zero
                    }
                },
            contentAlignment = Alignment.Center,
        ) {
            AsyncImage(
                model = uri,
                contentDescription = "Foto",
                contentScale = ContentScale.Fit,
                modifier = Modifier
                    .fillMaxWidth()
                    .graphicsLayer(
                        scaleX = skala,
                        scaleY = skala,
                        translationX = geser.x,
                        translationY = geser.y,
                    ),
            )
            IconButton(
                onClick = onTutup,
                modifier = Modifier
                    .align(Alignment.TopEnd)
                    .padding(12.dp),
            ) {
                Icon(Icons.Filled.Close, "Tutup", tint = Color.White)
            }
            if (skala < 1.05f) {
                Text(
                    "Cubit untuk zoom, dua ketuk untuk kembali",
                    color = Color(0x99FFFFFF),
                    fontSize = 12.sp,
                    modifier = Modifier
                        .align(Alignment.BottomCenter)
                        .padding(bottom = 28.dp),
                )
            }
        }
    }
}

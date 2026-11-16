package com.rezochatvoice.exceo

import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.foundation.Canvas
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

/**
 * Loading khas Viza: busur hijau yang berputar dengan lima batang suara di
 * tengahnya. Dipakai saat halaman atau room sedang dimuat.
 */
@Composable
fun VizaLoading(modifier: Modifier = Modifier, ukuran: Dp = 96.dp, latar: Color? = null) {
    val hijau = Color(0xFF2EE59D)
    val putar = rememberInfiniteTransition(label = "vizaLoading")
    val sudut by putar.animateFloat(
        initialValue = 0f,
        targetValue = 360f,
        animationSpec = infiniteRepeatable(tween(1100, easing = LinearEasing), RepeatMode.Restart),
        label = "sudut",
    )
    val denyut by putar.animateFloat(
        initialValue = 0f,
        targetValue = 1f,
        animationSpec = infiniteRepeatable(tween(700, easing = LinearEasing), RepeatMode.Reverse),
        label = "denyut",
    )
    Box(
        modifier
            .then(if (latar != null) Modifier.fillMaxSize().background(latar) else Modifier),
        contentAlignment = Alignment.Center,
    ) {
        Box(Modifier.size(ukuran), contentAlignment = Alignment.Center) {
            Canvas(
                Modifier
                    .size(ukuran)
                    .graphicsLayer { rotationZ = sudut },
            ) {
                val tebal = size.minDimension * 0.075f
                drawArc(
                    color = hijau,
                    startAngle = 0f,
                    sweepAngle = 260f,
                    useCenter = false,
                    topLeft = Offset(tebal / 2f, tebal / 2f),
                    size = Size(size.width - tebal, size.height - tebal),
                    style = Stroke(width = tebal, cap = StrokeCap.Round),
                )
            }
            // Lima batang suara di tengah, tingginya bergantian mengikuti denyut.
            Row(
                horizontalArrangement = Arrangement.spacedBy(ukuran * 0.045f),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                val pola = listOf(0.45f, 0.85f, 1f, 0.7f, 0.4f)
                pola.forEachIndexed { i, dasar ->
                    val tinggi = ukuran * (0.22f * (dasar + 0.25f * denyut))
                    Box(
                        Modifier
                            .width(ukuran * 0.035f)
                            .height(tinggi)
                            .clip(RoundedCornerShape(50))
                            .background(hijau),
                    )
                }
            }
        }
    }
}

/** Loading layar penuh dengan latar gelap transparan. */
@Composable
fun VizaLoadingLayar(modifier: Modifier = Modifier, ukuran: Dp = 96.dp) {
    VizaLoading(modifier = modifier.fillMaxSize(), ukuran = ukuran, latar = Color(0xCC050505))
}

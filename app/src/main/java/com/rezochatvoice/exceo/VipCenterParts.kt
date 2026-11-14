package com.rezochatvoice.exceo

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.foundation.Canvas
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

/**
 * Bagian-bagian layar VIP Center (gaya SVIP): bilah atas dengan gear privilege,
 * baris tingkat, kotak identitas, kisi privilege, aset, dan paket.
 *
 * Semua ikon digambar dengan kode (Canvas) supaya bentuk dan tebal garisnya
 * seragam, tidak bergantung pada gambar unggahan atau emoji yang berbeda-beda
 * tampilannya di tiap perangkat.
 */

/** Angka koin ringkas: 1.2K, 400K, 1.5M. Dipakai chip saldo dan tombol paket. */
fun fmtKoin(n: Long): String {
    fun f(x: Double, s: String): String {
        val t = Math.round(x * 10) / 10.0
        return (if (t == Math.floor(t)) t.toLong().toString() else t.toString()) + s
    }
    return when {
        n >= 1_000_000_000L -> f(n / 1e9, "B")
        n >= 1_000_000L -> f(n / 1e6, "M")
        n >= 1_000L -> f(n / 1e3, "K")
        else -> n.toString()
    }
}

val VC_GOLD = Color(0xFFE6C47A)
val VC_GOLD_SOFT = Color(0xFFFFE9A8)
val VC_LINE = Color(0xFFF2E4C6)
val VC_DIM = Color(0xFFB9A98A)

/** Bilah atas: panah kembali, dua tab, saldo koin, dan gear privilege. */
@Composable
fun VipTopBar(
    tab: Int,
    coins: Long,
    onBack: () -> Unit,
    onTab: (Int) -> Unit,
    onGear: () -> Unit,
) {
    Row(
        Modifier.fillMaxWidth().height(52.dp).padding(start = 6.dp, end = 10.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Text("‹", color = Color.White, fontSize = 34.sp, modifier = Modifier.clickable(onClick = onBack).padding(horizontal = 8.dp))
        Spacer(Modifier.width(2.dp))
        VcTab("SVIP", tab == 0) { onTab(0) }
        Spacer(Modifier.width(14.dp))
        VcTab("Item VIP", tab == 1) { onTab(1) }
        Spacer(Modifier.weight(1f))
        Row(
            Modifier.clip(RoundedCornerShape(50)).background(Color(0x33FFFFFF)).padding(horizontal = 8.dp, vertical = 5.dp),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            CoinDot()
            Spacer(Modifier.width(5.dp))
            Text(fmtKoin(coins), color = Color.White, fontSize = 12.sp, fontWeight = FontWeight.Bold)
        }
        Spacer(Modifier.width(8.dp))
        Box(
            Modifier.size(30.dp).clip(CircleShape).background(Color(0x33FFFFFF)).clickable(onClick = onGear),
            contentAlignment = Alignment.Center,
        ) { GearGlyph(Modifier.size(16.dp), Color.White) }
    }
}

@Composable
private fun VcTab(text: String, on: Boolean, tap: () -> Unit) {
    Column(Modifier.clickable(onClick = tap), horizontalAlignment = Alignment.CenterHorizontally) {
        Text(
            tr(text),
            color = if (on) Color.White else Color(0x99FFFFFF),
            fontSize = if (on) 18.sp else 15.sp,
            fontWeight = if (on) FontWeight.ExtraBold else FontWeight.Normal,
        )
        Spacer(Modifier.height(3.dp))
        Box(
            Modifier.width(if (on) 26.dp else 0.dp).height(3.dp)
                .clip(RoundedCornerShape(50))
                .background(if (on) VC_GOLD else Color.Transparent),
        )
    }
}

@Composable
private fun CoinDot() {
    Canvas(Modifier.size(13.dp)) {
        drawCircle(Color(0xFFF2C14E))
        drawCircle(Color(0xFFB8860B), radius = size.minDimension / 2f - 0.6.dp.toPx(), style = Stroke(1.2.dp.toPx()))
    }
}

@Composable
private fun GearGlyph(mod: Modifier, tint: Color) {
    Canvas(mod) {
        val r = size.minDimension / 2f
        val w = 1.6.dp.toPx()
        drawCircle(tint, radius = r * 0.34f, center = center, style = Stroke(w))
        for (i in 0 until 8) {
            val a = (Math.PI / 4.0) * i
            val inner = r * 0.55f
            val outer = r * 0.95f
            drawLine(
                tint,
                Offset(center.x + (Math.cos(a) * inner).toFloat(), center.y + (Math.sin(a) * inner).toFloat()),
                Offset(center.x + (Math.cos(a) * outer).toFloat(), center.y + (Math.sin(a) * outer).toFloat()),
                strokeWidth = w * 1.6f,
            )
        }
    }
}

/** Baris tingkat SVIP 1..9, gaya kotak seperti di SVIP Center. */
@Composable
fun VipTierChips(sel: Int, onSel: (Int) -> Unit) {
    Row(
        Modifier.fillMaxWidth().horizontalScroll(rememberScrollState()).padding(horizontal = 12.dp, vertical = 6.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        for (n in 1..9) {
            val on = n == sel
            Box(
                Modifier.clip(RoundedCornerShape(50))
                    .background(if (on) Brush.horizontalGradient(listOf(Color(0xFFF7DFA0), Color(0xFFC9A24A))) else Brush.horizontalGradient(listOf(Color(0x22FFFFFF), Color(0x22FFFFFF))))
                    .clickable { onSel(n) }
                    .padding(horizontal = 14.dp, vertical = 6.dp),
            ) {
                Text(
                    tr("SVIP $n"),
                    color = if (on) Color(0xFF3B2405) else Color(0xCCFFFFFF),
                    fontSize = 13.sp,
                    fontWeight = if (on) FontWeight.ExtraBold else FontWeight.Medium,
                )
            }
        }
    }
}

@Composable
fun VipSectionTitle(text: String) {
    Row(
        Modifier.fillMaxWidth().padding(start = 14.dp, end = 14.dp, top = 14.dp, bottom = 8.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Box(
            Modifier.width(3.dp).height(14.dp).clip(RoundedCornerShape(50))
                .background(VC_GOLD),
        )
        Spacer(Modifier.width(8.dp))
        Text(tr(text), color = Color.White, fontSize = 15.sp, fontWeight = FontWeight.Bold)
    }
}

// ---------------- Identitas VIP ----------------

data class VipIdent(val key: String, val label: String, val slot: String, val glyph: String)

val VIP_IDENT = listOf(
    VipIdent("frame", "VIP Frame", "frame", "frame"),
    VipIdent("title", "VIP Title", "title", "title"),
    VipIdent("name", "VIP Name", "banner", "banner"),
    VipIdent("badge", "VIP Badge", "medal", "medal"),
    VipIdent("entry", "Entry Banner", "entry", "spark"),
    VipIdent("card", "Profile Card", "cardbg", "card"),
    VipIdent("bubble", "Chat Bubble", "bubble", "bubble"),
    VipIdent("color", "Chat Color", "bubble", "palette"),
)

/** Kisi "VIP Identity": 8 kotak seragam, ikon digambar dengan kode. */
@Composable
fun VipIdentityGrid(onPick: (VipIdent) -> Unit) {
    Column(Modifier.fillMaxWidth().padding(horizontal = 12.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        VIP_IDENT.chunked(4).forEach { baris ->
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                baris.forEach { it ->
                    Box(Modifier.weight(1f)) { VcTile(it.label) { onPick(it) } { InkGlyph(it.glyph, Modifier.size(26.dp), VC_LINE) } }
                }
                repeat(4 - baris.size) { Spacer(Modifier.weight(1f)) }
            }
        }
    }
}

/** Kisi "Exclusive Privileges" memakai daftar privilege SVIP yang benar-benar aktif di aplikasi. */
@Composable
fun VipPrivGrid(sel: Int, onPick: (SvipPriv) -> Unit) {
    val daftar = SVIP_PRIVS
    Column(Modifier.fillMaxWidth().padding(horizontal = 12.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        daftar.chunked(4).forEach { baris ->
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                baris.forEach { p ->
                    val buka = sel >= p.minVip
                    Box(Modifier.weight(1f)) {
                        VcTile(p.title, buka) { onPick(p) } {
                            InkGlyph(privGlyph(p.key), Modifier.size(26.dp), if (buka) VC_LINE else Color(0x66FFFFFF))
                        }
                    }
                }
                repeat(4 - baris.size) { Spacer(Modifier.weight(1f)) }
            }
        }
    }
}

fun privGlyphPublic(key: String): String = privGlyph(key)

private fun privGlyph(key: String): String = when (key) {
    "muteRingtone" -> "bell"
    "hideGiftBanner" -> "banner"
    "personalAds" -> "card"
    "avoidDisturbing" -> "shield"
    "cantFollow" -> "user"
    "antiGoAfter" -> "mic"
    "antiKick" -> "shieldcheck"
    "hideVisits" -> "eye"
    "hideOnline" -> "eye"
    "hideProfile" -> "user"
    "hideRanking" -> "chart"
    "invisibleRoom" -> "eyeoff"
    else -> "spark"
}

/** Kotak ikon + label yang bentuknya sama untuk semua bagian. */
@Composable
private fun VcTile(label: String, aktif: Boolean = true, tap: () -> Unit, icon: @Composable () -> Unit) {
    Column(
        Modifier.fillMaxWidth().clip(RoundedCornerShape(12.dp))
            .background(if (aktif) Color(0x2EFFFFFF) else Color(0x1A000000))
            .border(1.dp, if (aktif) Color(0x33E6C47A) else Color(0x22FFFFFF), RoundedCornerShape(12.dp))
            .clickable(onClick = tap)
            .padding(vertical = 10.dp, horizontal = 4.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Box(Modifier.size(26.dp), contentAlignment = Alignment.Center) { icon() }
        Spacer(Modifier.height(6.dp))
        Text(
            tr(label),
            color = if (aktif) Color(0xFFF4EAD6) else Color(0x88FFFFFF),
            fontSize = 10.sp,
            maxLines = 2,
            textAlign = TextAlign.Center,
            overflow = TextOverflow.Ellipsis,
            modifier = Modifier.fillMaxWidth(),
        )
    }
}

// ---------------- Aset & paket ----------------

/** Tiga kotak aset milik tingkat ini: medali, lencana, gelar. */
@Composable
fun VipAssetsRow(sel: Int, coin: Color, onPick: (VipIdent) -> Unit = {}) {
    Row(
        Modifier.fillMaxWidth().padding(horizontal = 12.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        Box(Modifier.weight(1f)) {
            VcAsset("SVIP $sel", "medal") { onPick(VIP_IDENT.first { it.key == "badge" }) }
        }
        Box(Modifier.weight(1f)) {
            VcAsset("Vip badge", "badge") { onPick(VIP_IDENT.first { it.key == "badge" }) }
        }
        Box(Modifier.weight(1f)) {
            VcAsset("vip $sel", "title") { onPick(VIP_IDENT.first { it.key == "title" }) }
        }
    }
}

@Composable
private fun VcAsset(label: String, slot: String, tap: () -> Unit = {}) {
    Column(
        Modifier.fillMaxWidth().clip(RoundedCornerShape(12.dp)).background(Color(0x1FFFFFFF)).clickable(onClick = tap)
            .padding(vertical = 10.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Canvas(Modifier.size(44.dp)) {
            val w = 1.8.dp.toPx()
            drawCircle(VC_GOLD.copy(alpha = 0.9f), radius = size.minDimension / 2f - w, style = Stroke(w))
            drawCircle(VC_GOLD.copy(alpha = 0.25f), radius = size.minDimension / 2f - w * 3.5f)
        }
        Spacer(Modifier.height(6.dp))
        Text(tr(label), color = Color(0xFFF4EAD6), fontSize = 11.sp, maxLines = 1, overflow = TextOverflow.Ellipsis)
    }
}

/** Tombol paket bergaya emas panjang: durasi di kiri, harga di kanan. */
@Composable
fun VipPackageButton(hari: Int, harga: Long, aktif: Boolean, onBuy: () -> Unit) {
    Row(
        Modifier.fillMaxWidth().padding(horizontal = 12.dp)
            .clip(RoundedCornerShape(12.dp))
            .background(Brush.horizontalGradient(listOf(Color(0xFFF7DFA0), Color(0xFFE0A94B), Color(0xFFC98A2E))))
            .clickable(onClick = onBuy)
            .padding(horizontal = 14.dp, vertical = 14.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Canvas(Modifier.size(30.dp)) {
            val w = 1.8.dp.toPx()
            drawCircle(Color(0xFF7A4A12), radius = size.minDimension / 2f - w, style = Stroke(w))
            drawCircle(Color(0xFF7A4A12).copy(alpha = 0.25f), radius = size.minDimension / 2f - w * 4f)
        }
        Spacer(Modifier.width(12.dp))
        Column(Modifier.weight(1f)) {
            Text(tr("$hari hari"), color = Color(0xFF3B2405), fontSize = 15.sp, fontWeight = FontWeight.ExtraBold)
            Text(
                if (aktif) tr("Perpanjang masa aktif") else tr("Aktifkan semua fitur premium"),
                color = Color(0xCC3B2405), fontSize = 11.sp,
            )
        }
        Text(fmtKoin(harga), color = Color(0xFF3B2405), fontSize = 15.sp, fontWeight = FontWeight.ExtraBold)
    }
}

/** Daftar item yang didapat pada satu tingkat. */
@Composable
fun VipItemList(sel: Int) {
    val items = vipItems(sel) + svipItems(sel).filter { it.slot != "medal" && it.slot != "badge" }
    Column(Modifier.fillMaxWidth().padding(horizontal = 12.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
        items.distinctBy { it.id }.forEach { it ->
            Row(
                Modifier.fillMaxWidth().clip(RoundedCornerShape(10.dp)).background(Color(0x1FFFFFFF))
                    .padding(horizontal = 12.dp, vertical = 10.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                InkGlyph(if (it.slot == "frame") "frame" else if (it.slot == "bubble") "bubble" else if (it.slot == "entry") "spark" else if (it.slot == "banner") "banner" else "title", Modifier.size(20.dp), VC_GOLD)
                Spacer(Modifier.width(10.dp))
                Text(tr(it.name), color = Color(0xFFF4EAD6), fontSize = 13.sp, modifier = Modifier.weight(1f))
                Text(tr("otomatis"), color = VC_DIM, fontSize = 11.sp)
            }
        }
    }
}

// ---------------- Ikon garis yang digambar dengan kode ----------------

/** Semua ikon memakai satu gaya: garis 1,8dp, tanpa isi, ukuran kotak sama. */
@Composable
fun InkGlyph(kind: String, mod: Modifier = Modifier.size(24.dp), tint: Color = VC_LINE) {
    Canvas(mod) {
        val w = 1.7.dp.toPx()
        val s = size.minDimension
        val l = w / 2f
        fun ln(x1: Float, y1: Float, x2: Float, y2: Float, sw: Float = w) =
            drawLine(tint, Offset(x1, y1), Offset(x2, y2), strokeWidth = sw, cap = androidx.compose.ui.graphics.StrokeCap.Round)

        fun sl() = ln(l, s - l, s - l, l, w * 1.1f) // garis miring "off"

        when (kind) {
            "frame" -> {
                drawCircle(tint, radius = s / 2f - l * 1.5f, center = center, style = Stroke(w))
                drawCircle(tint, radius = s / 4.2f, center = center, style = Stroke(w))
            }
            "title" -> {
                val p = Path().apply {
                    moveTo(s / 2f, l * 2f)
                    lineTo(s * 0.78f, s * 0.7f)
                    lineTo(s * 0.22f, s * 0.7f)
                    close()
                }
                drawPath(p, tint, style = Stroke(w))
                ln(s * 0.22f, s * 0.7f, s * 0.3f, s - l * 2)
                ln(s * 0.78f, s * 0.7f, s * 0.7f, s - l * 2)
            }
            "banner" -> {
                drawRoundRect(
                    tint, topLeft = Offset(l * 2, l * 3), size = Size(s - l * 4, s * 0.42f),
                    cornerRadius = androidx.compose.ui.geometry.CornerRadius(w), style = Stroke(w),
                )
                ln(l * 3, s * 0.72f, l * 3, s - l * 2)
                ln(s - l * 3, s * 0.72f, s - l * 3, s - l * 2)
            }
            "medal" -> {
                drawCircle(tint, radius = s * 0.24f, center = Offset(s / 2f, s * 0.62f), style = Stroke(w))
                ln(s / 2f, l * 2, s * 0.38f, s * 0.42f)
                ln(s / 2f, l * 2, s * 0.62f, s * 0.42f)
            }
            "spark" -> {
                val cx = s / 2f
                val cy = s / 2f
                ln(cx, l * 2, cx, s - l * 2)
                ln(l * 2, cy, s - l * 2, cy)
                ln(l * 3.4f, l * 3.4f, s - l * 3.4f, s - l * 3.4f, w * 0.7f)
                ln(s - l * 3.4f, l * 3.4f, l * 3.4f, s - l * 3.4f, w * 0.7f)
            }
            "card" -> {
                drawRoundRect(
                    tint, topLeft = Offset(l * 1.6f, l * 2.6f), size = Size(s - l * 3.2f, s * 0.6f),
                    cornerRadius = androidx.compose.ui.geometry.CornerRadius(w * 2), style = Stroke(w),
                )
                drawCircle(tint, radius = s * 0.09f, center = Offset(s * 0.34f, s * 0.45f), style = Stroke(w))
                ln(s * 0.5f, s * 0.42f, s * 0.78f, s * 0.42f, w * 0.8f)
                ln(s * 0.5f, s * 0.52f, s * 0.7f, s * 0.52f, w * 0.8f)
            }
            "bubble" -> {
                drawRoundRect(
                    tint, topLeft = Offset(l * 1.6f, l * 2.4f), size = Size(s - l * 3.2f, s * 0.46f),
                    cornerRadius = androidx.compose.ui.geometry.CornerRadius(w * 3), style = Stroke(w),
                )
                val p = Path().apply {
                    moveTo(s * 0.32f, s * 0.7f)
                    lineTo(s * 0.32f, s - l * 2.4f)
                    lineTo(s * 0.5f, s * 0.7f)
                }
                drawPath(p, tint, style = Stroke(w))
            }
            "palette" -> {
                drawCircle(tint, radius = s * 0.32f, center = center, style = Stroke(w))
                drawCircle(tint, radius = s * 0.05f, center = Offset(s * 0.38f, s * 0.42f))
                drawCircle(tint, radius = s * 0.05f, center = Offset(s * 0.6f, s * 0.4f))
                drawCircle(tint, radius = s * 0.05f, center = Offset(s * 0.58f, s * 0.62f))
            }
            "bell" -> {
                val p = Path().apply {
                    moveTo(l * 3.2f, s * 0.66f)
                    quadraticBezierTo(l * 3.2f, l * 2.6f, s / 2f, l * 2.4f)
                    quadraticBezierTo(s - l * 3.2f, l * 2.6f, s - l * 3.2f, s * 0.66f)
                    close()
                }
                drawPath(p, tint, style = Stroke(w))
                drawCircle(tint, radius = s * 0.05f, center = Offset(s / 2f, s * 0.76f))
                sl()
            }
            "shield" -> {
                val p = Path().apply {
                    moveTo(s / 2f, l * 1.8f)
                    lineTo(s * 0.8f, s * 0.3f)
                    lineTo(s * 0.8f, s * 0.55f)
                    quadraticBezierTo(s * 0.8f, s * 0.85f, s / 2f, s - l * 1.6f)
                    quadraticBezierTo(s * 0.2f, s * 0.85f, s * 0.2f, s * 0.55f)
                    lineTo(s * 0.2f, s * 0.3f)
                    close()
                }
                drawPath(p, tint, style = Stroke(w))
            }
            "shieldcheck" -> {
                val p = Path().apply {
                    moveTo(s / 2f, l * 1.8f)
                    lineTo(s * 0.8f, s * 0.3f)
                    lineTo(s * 0.8f, s * 0.55f)
                    quadraticBezierTo(s * 0.8f, s * 0.85f, s / 2f, s - l * 1.6f)
                    quadraticBezierTo(s * 0.2f, s * 0.85f, s * 0.2f, s * 0.55f)
                    lineTo(s * 0.2f, s * 0.3f)
                    close()
                }
                drawPath(p, tint, style = Stroke(w))
                ln(s * 0.36f, s * 0.52f, s * 0.47f, s * 0.63f)
                ln(s * 0.47f, s * 0.63f, s * 0.66f, s * 0.42f)
            }
            "user" -> {
                drawCircle(tint, radius = s * 0.15f, center = Offset(s / 2f, s * 0.34f), style = Stroke(w))
                val p = Path().apply {
                    moveTo(s * 0.24f, s - l * 2)
                    quadraticBezierTo(s / 2f, s * 0.55f, s * 0.76f, s - l * 2)
                }
                drawPath(p, tint, style = Stroke(w))
            }
            "mic" -> {
                drawRoundRect(
                    tint, topLeft = Offset(s * 0.38f, l * 2), size = Size(s * 0.24f, s * 0.42f),
                    cornerRadius = androidx.compose.ui.geometry.CornerRadius(s * 0.12f), style = Stroke(w),
                )
                val p = Path().apply {
                    moveTo(s * 0.26f, s * 0.46f)
                    quadraticBezierTo(s * 0.26f, s * 0.72f, s / 2f, s * 0.72f)
                    quadraticBezierTo(s * 0.74f, s * 0.72f, s * 0.74f, s * 0.46f)
                }
                drawPath(p, tint, style = Stroke(w))
                ln(s / 2f, s * 0.72f, s / 2f, s - l * 2)
            }
            "eye", "eyeoff" -> {
                val p = Path().apply {
                    moveTo(l * 1.6f, s / 2f)
                    quadraticBezierTo(s / 2f, s * 0.22f, s - l * 1.6f, s / 2f)
                    quadraticBezierTo(s / 2f, s * 0.78f, l * 1.6f, s / 2f)
                    close()
                }
                drawPath(p, tint, style = Stroke(w))
                drawCircle(tint, radius = s * 0.11f, center = center, style = Stroke(w))
                if (kind == "eyeoff") sl()
            }
            "chart" -> {
                ln(l * 2.4f, s - l * 2, s - l * 2.4f, s - l * 2)
                ln(s * 0.3f, s * 0.62f, s * 0.3f, s * 0.42f, w * 1.4f)
                ln(s * 0.5f, s * 0.62f, s * 0.5f, s * 0.3f, w * 1.4f)
                ln(s * 0.7f, s * 0.62f, s * 0.7f, s * 0.5f, w * 1.4f)
            }
            else -> {
                drawCircle(tint, radius = s * 0.3f, center = center, style = Stroke(w))
            }
        }
    }
}


/**
 * Dialog pratinjau gaya SVIP Center: judul emas + tombol X, kotak gelap berisi
 * aset, tulisan "Preview", dan tombol OK oranye.
 */
@Composable
fun VipPreviewDialog(title: String, onClose: () -> Unit, isi: @Composable () -> Unit) {
    androidx.compose.ui.window.Dialog(onDismissRequest = onClose) {
        Column(
            Modifier.fillMaxWidth().clip(RoundedCornerShape(22.dp))
                .background(Brush.verticalGradient(listOf(Color(0xFF4A1E1C), Color(0xFF2B100F))))
                .border(1.dp, Color(0x88E6C47A), RoundedCornerShape(22.dp))
                .padding(16.dp),
        ) {
            Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                Text(tr(title), color = VC_GOLD_SOFT, fontSize = 17.sp, fontWeight = FontWeight.ExtraBold, modifier = Modifier.weight(1f))
                Box(
                    Modifier.size(36.dp).clip(CircleShape).background(Color(0x33000000))
                        .border(1.dp, Color(0x55E6C47A), CircleShape).clickable(onClick = onClose),
                    contentAlignment = Alignment.Center,
                ) { Text("✕", color = Color.White, fontSize = 15.sp) }
            }
            Spacer(Modifier.height(12.dp))
            Box(
                Modifier.fillMaxWidth().clip(RoundedCornerShape(16.dp))
                    .border(1.dp, Color(0x44E6C47A), RoundedCornerShape(16.dp))
                    .padding(10.dp),
            ) {
                Box(
                    Modifier.fillMaxWidth().height(280.dp).clip(RoundedCornerShape(12.dp))
                        .background(Color(0xFF1E1004)),
                    contentAlignment = Alignment.Center,
                ) { isi() }
            }
            Spacer(Modifier.height(10.dp))
            Text(tr("Preview"), color = Color(0xFFF4EAD6), fontSize = 12.sp, fontWeight = FontWeight.Bold, modifier = Modifier.fillMaxWidth(), textAlign = TextAlign.Center)
            Spacer(Modifier.height(12.dp))
            Box(
                Modifier.fillMaxWidth().height(46.dp).clip(RoundedCornerShape(50))
                    .background(Brush.horizontalGradient(listOf(Color(0xFFFFD98A), Color(0xFFFF7A4D))))
                    .clickable(onClick = onClose),
                contentAlignment = Alignment.Center,
            ) { Text("OK", color = Color(0xFF2B1204), fontSize = 15.sp, fontWeight = FontWeight.ExtraBold) }
        }
    }
}

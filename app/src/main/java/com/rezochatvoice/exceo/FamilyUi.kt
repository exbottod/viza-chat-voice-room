package com.rezochatvoice.exceo

import android.widget.Toast
import androidx.activity.compose.BackHandler
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.PickVisualMediaRequest
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.DialogProperties
import kotlinx.coroutines.launch

/**
 * Tampilan Family gaya baru (ungu tua ke merah muda). Semua ikon dan ornamen
 * digambar dengan kode (Canvas, gradien) supaya seragam di semua perangkat dan
 * tidak butuh gambar tambahan.
 */

val FM_DARK = Color(0xFF2A0A33)
val FM_MID = Color(0xFF7A1B5E)
val FM_PINK = Color(0xFFFF3D8B)
val FM_BG = Color(0xFFFBF1F8)
val FM_INK = Color(0xFF2B1636)
val FM_SOFT = Color(0xFF8E7B95)
val FM_GOLD = Color(0xFFFFC928)
val FM_BRUSH = Brush.horizontalGradient(listOf(FM_DARK, FM_MID, FM_PINK))
val FM_BRUSH_V = Brush.verticalGradient(listOf(FM_DARK, FM_MID))

// ---------------------------------------------------------------- ikon

@Composable
fun FmIcon(kind: String, size: Dp = 22.dp, tint: Color = Color.White) {
    Canvas(Modifier.size(size)) {
        val w = size.toPx() * 0.09f
        val s = this.size.minDimension
        fun ln(x1: Float, y1: Float, x2: Float, y2: Float) =
            drawLine(tint, Offset(x1, y1), Offset(x2, y2), strokeWidth = w, cap = StrokeCap.Round)
        when (kind) {
            "back" -> { ln(s * .62f, s * .2f, s * .3f, s * .5f); ln(s * .3f, s * .5f, s * .62f, s * .8f) }
            "search" -> {
                drawCircle(tint, radius = s * .27f, center = Offset(s * .43f, s * .43f), style = Stroke(w))
                ln(s * .63f, s * .63f, s * .82f, s * .82f)
            }
            "gear" -> {
                drawCircle(tint, radius = s * .17f, center = center, style = Stroke(w))
                for (i in 0 until 8) {
                    val a = Math.PI / 4.0 * i
                    ln(
                        center.x + (Math.cos(a) * s * .3f).toFloat(), center.y + (Math.sin(a) * s * .3f).toFloat(),
                        center.x + (Math.cos(a) * s * .44f).toFloat(), center.y + (Math.sin(a) * s * .44f).toFloat(),
                    )
                }
                drawCircle(tint, radius = s * .3f, center = center, style = Stroke(w * .8f))
            }
            "pencil" -> { ln(s * .22f, s * .78f, s * .72f, s * .28f); ln(s * .22f, s * .78f, s * .22f, s * .62f); ln(s * .22f, s * .78f, s * .38f, s * .78f) }
            "refresh" -> {
                drawArc(tint, 40f, 270f, false, topLeft = Offset(s * .2f, s * .2f), size = androidx.compose.ui.geometry.Size(s * .6f, s * .6f), style = Stroke(w, cap = StrokeCap.Round))
                ln(s * .74f, s * .16f, s * .78f, s * .36f); ln(s * .78f, s * .36f, s * .58f, s * .34f)
            }
            "adduser" -> {
                drawCircle(tint, radius = s * .14f, center = Offset(s * .4f, s * .32f), style = Stroke(w))
                drawArc(tint, 200f, 140f, false, topLeft = Offset(s * .14f, s * .5f), size = androidx.compose.ui.geometry.Size(s * .52f, s * .5f), style = Stroke(w, cap = StrokeCap.Round))
                ln(s * .78f, s * .3f, s * .78f, s * .54f); ln(s * .66f, s * .42f, s * .9f, s * .42f)
            }
            "info" -> {
                drawCircle(tint, radius = s * .36f, center = center, style = Stroke(w))
                ln(s * .5f, s * .46f, s * .5f, s * .68f); drawCircle(tint, radius = w * .7f, center = Offset(s * .5f, s * .33f))
            }
            "people" -> {
                drawCircle(tint, radius = s * .12f, center = Offset(s * .5f, s * .34f), style = Stroke(w))
                drawArc(tint, 200f, 140f, false, topLeft = Offset(s * .26f, s * .5f), size = androidx.compose.ui.geometry.Size(s * .48f, s * .46f), style = Stroke(w, cap = StrokeCap.Round))
                drawCircle(tint, radius = s * .09f, center = Offset(s * .22f, s * .42f), style = Stroke(w * .8f))
                drawCircle(tint, radius = s * .09f, center = Offset(s * .78f, s * .42f), style = Stroke(w * .8f))
            }
            "coin" -> {
                drawCircle(tint, radius = s * .38f, center = center, style = Stroke(w))
                ln(s * .5f, s * .3f, s * .5f, s * .7f)
                ln(s * .38f, s * .4f, s * .62f, s * .4f); ln(s * .38f, s * .6f, s * .62f, s * .6f)
            }
            "spark" -> {
                ln(s * .5f, s * .12f, s * .5f, s * .88f); ln(s * .12f, s * .5f, s * .88f, s * .5f)
                ln(s * .26f, s * .26f, s * .74f, s * .74f); ln(s * .74f, s * .26f, s * .26f, s * .74f)
            }
            "medal" -> {
                drawCircle(tint, radius = s * .22f, center = Offset(s * .5f, s * .62f), style = Stroke(w))
                ln(s * .5f, s * .1f, s * .4f, s * .4f); ln(s * .5f, s * .1f, s * .6f, s * .4f)
            }
            "home" -> {
                ln(s * .14f, s * .5f, s * .5f, s * .16f); ln(s * .5f, s * .16f, s * .86f, s * .5f)
                ln(s * .24f, s * .46f, s * .24f, s * .84f); ln(s * .76f, s * .46f, s * .76f, s * .84f)
                ln(s * .24f, s * .84f, s * .76f, s * .84f)
            }
            "dots" -> {
                drawCircle(tint, radius = w * .8f, center = Offset(s * .22f, s * .5f))
                drawCircle(tint, radius = w * .8f, center = Offset(s * .5f, s * .5f))
                drawCircle(tint, radius = w * .8f, center = Offset(s * .78f, s * .5f))
            }
            "close" -> { ln(s * .22f, s * .22f, s * .78f, s * .78f); ln(s * .78f, s * .22f, s * .22f, s * .78f) }
            "chev" -> { ln(s * .38f, s * .2f, s * .66f, s * .5f); ln(s * .66f, s * .5f, s * .38f, s * .8f) }
            else -> drawCircle(tint, radius = s * .3f, center = center, style = Stroke(w))
        }
    }
}

// ---------------------------------------------------------------- komponen kecil

@Composable
fun FmPill(text: String, bg: Color = Color(0x33FFFFFF), fg: Color = Color.White, icon: String? = null) {
    Row(
        Modifier.clip(RoundedCornerShape(50)).background(bg).padding(horizontal = 12.dp, vertical = 6.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        if (icon != null) { FmIcon(icon, 14.dp, fg); Spacer(Modifier.width(5.dp)) }
        Text(tr(text), color = fg, fontSize = 12.sp, fontWeight = FontWeight.Bold)
    }
}

/** Pil level emas: judul level dibuat dengan gradien, bukan gambar. */
@Composable
fun FmLevelPill(level: Int) {
    Row(
        Modifier.clip(RoundedCornerShape(50))
            .background(Brush.horizontalGradient(listOf(Color(0xFFFFE680), FM_GOLD, Color(0xFFE0A100))))
            .padding(horizontal = 12.dp, vertical = 6.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        FmIcon("medal", 14.dp, Color(0xFF3D2A00))
        Spacer(Modifier.width(5.dp))
        Text("Lv. $level", color = Color(0xFF3D2A00), fontSize = 12.sp, fontWeight = FontWeight.ExtraBold)
    }
}

@Composable
fun FmAvatar(b64: String?, name: String, size: Dp, ring: Boolean = false) {
    val bmp = remember(b64) { ProfileRepo.decodeB64(b64) }
    Box(
        Modifier.size(size).clip(RoundedCornerShape(size * 0.24f))
            .then(if (ring) Modifier.border(2.dp, Brush.linearGradient(listOf(Color(0xFFFFA726), FM_PINK, Color(0xFF7C4DFF))), RoundedCornerShape(size * 0.24f)) else Modifier)
            .background(Brush.linearGradient(listOf(FM_MID, FM_DARK))),
        contentAlignment = Alignment.Center,
    ) {
        if (bmp != null) Image(bmp, null, Modifier.fillMaxSize(), contentScale = ContentScale.Crop)
        else Text(name.take(1).uppercase(), color = Color.White, fontSize = (size.value * 0.4f).sp, fontWeight = FontWeight.Bold)
    }
}

@Composable
fun FmButton(text: String, modifier: Modifier = Modifier, enabled: Boolean = true, onClick: () -> Unit) {
    Box(
        modifier.height(48.dp).clip(RoundedCornerShape(50))
            .background(if (enabled) FM_BRUSH else Brush.horizontalGradient(listOf(Color(0xFFBBA8C2), Color(0xFFBBA8C2))))
            .clickable(enabled = enabled, onClick = onClick),
        contentAlignment = Alignment.Center,
    ) { Text(tr(text), color = Color.White, fontSize = 15.sp, fontWeight = FontWeight.Bold) }
}

// ---------------------------------------------------------------- Find Family (belum punya family)

@Composable
fun FamilyFindScreen(
    myUid: String, myName: String, myAvatar: String?, myCoins: Long,
    onBack: (() -> Unit)?, onCreate: () -> Unit,
) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    var q by remember { mutableStateOf("") }
    var tab by remember { mutableStateOf(0) }
    var list by remember { mutableStateOf<List<Family>?>(null) }
    var busy by remember { mutableStateOf(false) }
    var harga by remember { mutableStateOf<Long?>(null) }
    var pending by remember { mutableStateOf<Set<String>>(emptySet()) }
    fun toast(s: String) = Toast.makeText(context, s, Toast.LENGTH_SHORT).show()

    fun muat() {
        busy = true
        scope.launch {
            list = try {
                if (q.isNotBlank()) FamilyRepo.search(q)
                else if (tab == 0) FamilyRepo.recommended() else FamilyRepo.topFamilies()
            } catch (e: kotlinx.coroutines.CancellationException) { throw e } catch (e: Exception) { emptyList() }
            busy = false
        }
    }
    LaunchedEffect(tab) { if (q.isBlank()) muat() }
    LaunchedEffect(Unit) { harga = try { SupaRepo.famInfo()?.harga } catch (e: Exception) { null } }
    if (onBack != null) BackHandler(onBack = onBack)

    Box(Modifier.fillMaxSize().background(FM_BG)) {
        Column(Modifier.fillMaxSize().statusBarsPadding()) {
            // Bilah atas
            Row(
                Modifier.fillMaxWidth().padding(12.dp).clip(RoundedCornerShape(26.dp)).background(FM_BRUSH).padding(10.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                if (onBack != null) {
                    Box(Modifier.size(40.dp).clip(RoundedCornerShape(12.dp)).background(Color(0x33FFFFFF)).clickable(onClick = onBack), contentAlignment = Alignment.Center) { FmIcon("back", 22.dp) }
                    Spacer(Modifier.width(12.dp))
                }
                Column(Modifier.weight(1f)) {
                    Text(tr("Find Family"), color = Color.White, fontSize = 17.sp, fontWeight = FontWeight.ExtraBold)
                    Text(tr("Search and join your best family"), color = Color(0xCCFFFFFF), fontSize = 11.sp)
                }
                Box(Modifier.size(40.dp).clip(CircleShape).background(FM_GOLD).clickable { muat() }, contentAlignment = Alignment.Center) { FmIcon("search", 20.dp, Color(0xFF3D2A00)) }
            }
            // Kolom cari
            Row(
                Modifier.fillMaxWidth().padding(horizontal = 12.dp).clip(RoundedCornerShape(24.dp)).background(Color.White)
                    .border(1.dp, Color(0x22000000), RoundedCornerShape(24.dp)).padding(horizontal = 14.dp, vertical = 4.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                FmIcon("search", 18.dp, FM_SOFT)
                Spacer(Modifier.width(8.dp))
                androidx.compose.foundation.text.BasicTextField(
                    value = q, onValueChange = { q = it }, singleLine = true,
                    textStyle = androidx.compose.ui.text.TextStyle(color = FM_INK, fontSize = 14.sp),
                    modifier = Modifier.weight(1f).padding(vertical = 12.dp),
                    decorationBox = { inner ->
                        if (q.isEmpty()) Text(tr("Search family name or ID"), color = FM_SOFT, fontSize = 14.sp)
                        inner()
                    },
                    keyboardActions = androidx.compose.foundation.text.KeyboardActions(onSearch = { muat() }),
                    keyboardOptions = androidx.compose.foundation.text.KeyboardOptions(imeAction = androidx.compose.ui.text.input.ImeAction.Search),
                )
            }
            Spacer(Modifier.height(10.dp))
            // Tab
            Row(
                Modifier.fillMaxWidth().padding(horizontal = 12.dp).clip(RoundedCornerShape(24.dp)).background(Color.White).padding(5.dp),
            ) {
                listOf("Recommended", "Top Ranking").forEachIndexed { i, t ->
                    Box(
                        Modifier.weight(1f).height(40.dp).clip(RoundedCornerShape(20.dp))
                            .background(if (tab == i) FM_BRUSH else Brush.horizontalGradient(listOf(Color.Transparent, Color.Transparent)))
                            .clickable { tab = i; q = "" },
                        contentAlignment = Alignment.Center,
                    ) { Text(tr(t), color = if (tab == i) Color.White else FM_SOFT, fontSize = 14.sp, fontWeight = FontWeight.Bold) }
                }
            }
            Spacer(Modifier.height(6.dp))
            val l = list
            if (l == null || busy) Box(Modifier.fillMaxWidth().padding(30.dp), contentAlignment = Alignment.Center) { Text(tr("Memuat..."), color = FM_SOFT) }
            else if (l.isEmpty()) Box(Modifier.fillMaxWidth().padding(30.dp), contentAlignment = Alignment.Center) { Text(tr("Family tidak ditemukan"), color = FM_SOFT) }
            LazyColumn(Modifier.weight(1f).padding(horizontal = 12.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                items(l ?: emptyList()) { f ->
                    val lv = familyLevel(f.exp)
                    Row(
                        Modifier.fillMaxWidth().clip(RoundedCornerShape(20.dp)).background(Color.White)
                            .border(1.dp, Color(0x14000000), RoundedCornerShape(20.dp)).padding(12.dp),
                        verticalAlignment = Alignment.CenterVertically,
                    ) {
                        FmAvatar(f.logoB64, f.name, 62.dp, ring = true)
                        Spacer(Modifier.width(12.dp))
                        Column(Modifier.weight(1f)) {
                            Text(f.name, color = FM_INK, fontSize = 16.sp, fontWeight = FontWeight.Bold, maxLines = 1, overflow = TextOverflow.Ellipsis)
                            Spacer(Modifier.height(5.dp))
                            Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                                FmPill("Lv. $lv", Color(0xFFF6E8F7), FM_MID, "medal")
                                FmPill("${f.memberCount}/${familyCapacity(lv)}", Color(0xFFF6E8F7), FM_MID, "people")
                            }
                            Spacer(Modifier.height(4.dp))
                            Text(tr("ID ${f.numId}  ·  ${fmtShort(f.exp)} Points"), color = FM_PINK, fontSize = 12.sp, fontWeight = FontWeight.Medium)
                        }
                        val sudah = f.id in pending
                        Box(
                            Modifier.clip(RoundedCornerShape(16.dp))
                                .background(if (sudah) Brush.horizontalGradient(listOf(Color(0xFFBBA8C2), Color(0xFFBBA8C2))) else FM_BRUSH_V)
                                .clickable(enabled = !sudah) {
                                    scope.launch {
                                        when (val err = FamilyRepo.join(f.id, myUid, myName, myAvatar)) {
                                            null -> { toast(tr("Berhasil bergabung")) }
                                            "REQUEST_SENT" -> { pending = pending + f.id; toast(tr("Permintaan dikirim, tunggu persetujuan admin")) }
                                            else -> toast(err)
                                        }
                                    }
                                }.padding(horizontal = 18.dp, vertical = 11.dp),
                        ) { Text(tr(if (sudah) "Pending" else "Apply"), color = Color.White, fontSize = 13.sp, fontWeight = FontWeight.Bold) }
                    }
                }
                item { Spacer(Modifier.height(100.dp)) }
            }
        }
        // Bar Create Family di bawah
        Row(
            Modifier.align(Alignment.BottomCenter).navigationBarsPadding().padding(12.dp).fillMaxWidth()
                .clip(RoundedCornerShape(26.dp)).background(FM_BRUSH).clickable(onClick = onCreate).padding(14.dp),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Box(Modifier.size(48.dp).clip(RoundedCornerShape(14.dp)).background(Color(0x33FFFFFF)), contentAlignment = Alignment.Center) { FmIcon("home", 26.dp) }
            Spacer(Modifier.width(12.dp))
            Column(Modifier.weight(1f)) {
                Text(tr("Create Family"), color = Color.White, fontSize = 17.sp, fontWeight = FontWeight.ExtraBold)
                Text(tr("Your coins: ${fmtShort(myCoins)}"), color = Color(0xCCFFFFFF), fontSize = 11.sp)
            }
            Row(
                Modifier.clip(RoundedCornerShape(50)).background(FM_GOLD).padding(horizontal = 14.dp, vertical = 9.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                FmIcon("coin", 16.dp, Color(0xFF3D2A00)); Spacer(Modifier.width(5.dp))
                Text(harga?.let { fmtNum(it) } ?: "...", color = Color(0xFF3D2A00), fontSize = 14.sp, fontWeight = FontWeight.ExtraBold)
            }
        }
    }
}

fun fmtShort(n: Long): String {
    fun f(x: Double, s: String): String {
        val t = Math.round(x * 100) / 100.0
        return (if (t == Math.floor(t)) t.toLong().toString() else t.toString()) + s
    }
    return when {
        n >= 1_000_000_000L -> f(n / 1e9, "B")
        n >= 1_000_000L -> f(n / 1e6, "M")
        n >= 1_000L -> f(n / 1e3, "K")
        else -> n.toString()
    }
}

// ---------------------------------------------------------------- Create / Edit Family

@Composable
fun FamilyFormScreen(
    existing: Family?, myUid: String, myName: String, myAvatar: String?,
    onBack: () -> Unit, onDone: () -> Unit,
) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    var name by remember { mutableStateOf(existing?.name ?: "") }
    var label by remember { mutableStateOf(existing?.label ?: "") }
    var logo by remember { mutableStateOf(existing?.logoB64) }
    var cover by remember { mutableStateOf(existing?.coverB64) }
    var country by remember { mutableStateOf(existing?.country ?: "") }
    var needApproval by remember { mutableStateOf(existing?.needApproval ?: false) }
    var busy by remember { mutableStateOf(false) }
    var pickCountry by remember { mutableStateOf(false) }
    var harga by remember { mutableStateOf<Long?>(null) }
    fun toast(s: String) = Toast.makeText(context, s, Toast.LENGTH_SHORT).show()
    BackHandler(onBack = onBack)
    LaunchedEffect(Unit) { if (existing == null) harga = try { SupaRepo.famInfo()?.harga } catch (e: Exception) { null } }

    val logoPick = rememberLauncherForActivityResult(ActivityResultContracts.PickVisualMedia()) { uri ->
        if (uri != null) scope.launch {
            busy = true
            val b = ProfileRepo.encodeImage(context, uri, 400, square = true, quality = 85)
            busy = false
            if (b != null) logo = b else toast(tr("Gagal membaca gambar"))
        }
    }
    val coverPick = rememberLauncherForActivityResult(ActivityResultContracts.PickVisualMedia()) { uri ->
        if (uri != null) scope.launch {
            busy = true
            val b = ProfileRepo.encodeImage(context, uri, 900, square = false, quality = 80)
            busy = false
            if (b != null) cover = b else toast(tr("Gagal membaca gambar"))
        }
    }

    Box(Modifier.fillMaxSize().background(FM_BG)) {
        Column(Modifier.fillMaxSize().statusBarsPadding().navigationBarsPadding()) {
            Row(
                Modifier.fillMaxWidth().padding(12.dp).clip(RoundedCornerShape(26.dp)).background(FM_BRUSH).padding(10.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Box(Modifier.size(40.dp).clip(RoundedCornerShape(12.dp)).background(Color(0x33FFFFFF)).clickable(onClick = onBack), contentAlignment = Alignment.Center) { FmIcon("back", 22.dp) }
                Spacer(Modifier.width(12.dp))
                Text(tr(if (existing == null) "Create Family" else "Edit Family"), color = Color.White, fontSize = 17.sp, fontWeight = FontWeight.ExtraBold)
            }
            Column(Modifier.weight(1f).verticalScroll(rememberScrollState()).padding(horizontal = 14.dp)) {
                // Cover
                Text(tr("Family Cover"), color = FM_INK, fontSize = 14.sp, fontWeight = FontWeight.Bold, modifier = Modifier.padding(vertical = 6.dp))
                Box(
                    Modifier.fillMaxWidth().height(150.dp).clip(RoundedCornerShape(18.dp)).background(FM_BRUSH_V)
                        .clickable { coverPick.launch(PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.ImageOnly)) },
                    contentAlignment = Alignment.Center,
                ) {
                    val bmp = remember(cover) { ProfileRepo.decodeB64(cover) }
                    if (bmp != null) Image(bmp, null, Modifier.fillMaxSize(), contentScale = ContentScale.Crop)
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Box(Modifier.clip(RoundedCornerShape(50)).background(Color(0x66000000)).padding(horizontal = 14.dp, vertical = 8.dp)) {
                            Text(tr(if (cover == null) "Upload cover from gallery" else "Change cover"), color = Color.White, fontSize = 12.sp, fontWeight = FontWeight.Bold)
                        }
                    }
                }
                // Logo
                Text(tr("Family Logo"), color = FM_INK, fontSize = 14.sp, fontWeight = FontWeight.Bold, modifier = Modifier.padding(top = 14.dp, bottom = 6.dp))
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(Modifier.clickable { logoPick.launch(PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.ImageOnly)) }) {
                        FmAvatar(logo, name.ifBlank { "F" }, 84.dp, ring = true)
                    }
                    Spacer(Modifier.width(14.dp))
                    Box(
                        Modifier.clip(RoundedCornerShape(50)).background(Color(0xFFF6E8F7))
                            .clickable { logoPick.launch(PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.ImageOnly)) }
                            .padding(horizontal = 16.dp, vertical = 10.dp),
                    ) { Text(tr(if (logo == null) "Upload logo from gallery" else "Change logo"), color = FM_MID, fontSize = 12.sp, fontWeight = FontWeight.Bold) }
                }
                FmField("Family Name", name, 20, onChange = { name = it })
                FmField("Family Label", label, 10, onChange = { label = it })
                // ID family
                Text(tr("Family ID"), color = FM_INK, fontSize = 14.sp, fontWeight = FontWeight.Bold, modifier = Modifier.padding(top = 14.dp, bottom = 6.dp))
                Box(Modifier.fillMaxWidth().clip(RoundedCornerShape(14.dp)).background(Color(0xFFEFE2EE)).padding(14.dp)) {
                    Text(
                        tr(if (existing != null) existing.numId else "Dibuat otomatis (mulai 1000001)"),
                        color = if (existing != null) FM_INK else FM_SOFT, fontSize = 14.sp,
                    )
                }
                // Negara
                Text(tr("Country"), color = FM_INK, fontSize = 14.sp, fontWeight = FontWeight.Bold, modifier = Modifier.padding(top = 14.dp, bottom = 6.dp))
                Row(
                    Modifier.fillMaxWidth().clip(RoundedCornerShape(14.dp)).background(Color.White)
                        .border(1.dp, Color(0x22000000), RoundedCornerShape(14.dp))
                        .clickable { pickCountry = true }.padding(14.dp),
                    verticalAlignment = Alignment.CenterVertically,
                ) {
                    val c = ProfileRepo.countries.firstOrNull { it.code == country }
                    Text(if (c != null) "${c.flag}  ${c.name}" else tr("Tap to choose country"), color = if (c != null) FM_INK else FM_SOFT, fontSize = 14.sp, modifier = Modifier.weight(1f))
                    FmIcon("chev", 18.dp, FM_SOFT)
                }
                // Cara bergabung
                Text(tr("Join type"), color = FM_INK, fontSize = 14.sp, fontWeight = FontWeight.Bold, modifier = Modifier.padding(top = 14.dp, bottom = 6.dp))
                Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    listOf(true to "Approval needed", false to "Join directly").forEach { (v, t) ->
                        Box(
                            Modifier.weight(1f).height(44.dp).clip(RoundedCornerShape(14.dp))
                                .background(if (needApproval == v) FM_BRUSH else Brush.horizontalGradient(listOf(Color.White, Color.White)))
                                .border(1.dp, Color(0x22000000), RoundedCornerShape(14.dp))
                                .clickable { needApproval = v },
                            contentAlignment = Alignment.Center,
                        ) { Text(tr(t), color = if (needApproval == v) Color.White else FM_INK, fontSize = 13.sp, fontWeight = FontWeight.Bold) }
                    }
                }
                Spacer(Modifier.height(20.dp))
                FmButton(
                    if (busy) "Menyimpan..." else if (existing == null) "Create Family${harga?.let { " (${fmtNum(it)} coin)" } ?: ""}" else "Save",
                    Modifier.fillMaxWidth(), enabled = !busy,
                ) {
                    val n = name.trim(); val l = label.trim()
                    if (n.length < 2) return@FmButton toast(tr("Nama family minimal 2 karakter"))
                    if (l.length < 2) return@FmButton toast(tr("Label family minimal 2 karakter"))
                    if (country.isBlank()) return@FmButton toast(tr("Pilih negara dulu"))
                    busy = true
                    scope.launch {
                        val err = if (existing == null) FamilyRepo.create(myUid, myName, myAvatar, n, l, logo, cover, country, needApproval)
                        else FamilyRepo.saveSettings(existing, n, l, logo, cover, country, needApproval)
                        busy = false
                        if (err != null) toast(err) else {
                            toast(if (existing == null) "Family berhasil dibuat" else "Pengaturan disimpan")
                            onDone()
                        }
                    }
                }
                Spacer(Modifier.height(30.dp))
            }
        }
        if (pickCountry) CountryPickerScreen(
            onPilih = { country = it; pickCountry = false },
            onKembali = { pickCountry = false },
        )
    }
}

@Composable
private fun FmField(label: String, value: String, max: Int, onChange: (String) -> Unit) {
    Text(tr(label), color = FM_INK, fontSize = 14.sp, fontWeight = FontWeight.Bold, modifier = Modifier.padding(top = 14.dp, bottom = 6.dp))
    OutlinedTextField(
        value = value, onValueChange = { if (it.length <= max) onChange(it) }, singleLine = true,
        modifier = Modifier.fillMaxWidth(), shape = RoundedCornerShape(14.dp),
        trailingIcon = { Text("${value.length}/$max", color = FM_SOFT, fontSize = 11.sp, modifier = Modifier.padding(end = 12.dp)) },
        colors = OutlinedTextFieldDefaults.colors(
            focusedTextColor = FM_INK, unfocusedTextColor = FM_INK, cursorColor = FM_PINK,
            focusedBorderColor = FM_PINK, unfocusedBorderColor = Color(0x22000000),
            focusedContainerColor = Color.White, unfocusedContainerColor = Color.White,
        ),
    )
}

// ---------------------------------------------------------------- Family Settings (gear kuning)

@Composable
fun FamilySettingsSheet(
    isOwner: Boolean, pending: Int,
    onEdit: () -> Unit, onRequests: () -> Unit, onRefresh: () -> Unit, onDismiss: () -> Unit,
) {
    Dialog(onDismissRequest = onDismiss, properties = DialogProperties(usePlatformDefaultWidth = false)) {
        Box(Modifier.fillMaxSize().background(Color(0x66000000)).clickable(onClick = onDismiss), contentAlignment = Alignment.BottomCenter) {
            Column(
                Modifier.fillMaxWidth().clip(RoundedCornerShape(topStart = 28.dp, topEnd = 28.dp)).background(Color.White)
                    .clickable(enabled = false) {}.navigationBarsPadding().padding(16.dp),
            ) {
                Box(Modifier.align(Alignment.CenterHorizontally).width(46.dp).height(5.dp).clip(RoundedCornerShape(50)).background(Color(0xFFE5D3E5)))
                Spacer(Modifier.height(14.dp))
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(Modifier.size(46.dp).clip(CircleShape).background(FM_BRUSH_V), contentAlignment = Alignment.Center) { FmIcon("gear", 24.dp, FM_GOLD) }
                    Spacer(Modifier.width(14.dp))
                    Text(tr("Family Settings"), color = FM_INK, fontSize = 18.sp, fontWeight = FontWeight.ExtraBold)
                }
                Spacer(Modifier.height(14.dp))
                SheetRow("pencil", Color(0xFFFFE0EC), FM_PINK, "Edit Family", "Update name, cover, logo, country and join type", onEdit)
                SheetRow("adduser", Color(0xFFDDF5E6), Color(0xFF1FA45B), "Manage Requests${if (pending > 0) " ($pending)" else ""}", "Accept or reject pending join requests", onRequests)
                SheetRow("refresh", Color(0xFFE3E8FF), Color(0xFF3F5BFF), "Refresh Family", "Reload latest family data", onRefresh)
                if (isOwner) SheetRow("info", Color(0xFFEFEAF1), FM_SOFT, "Owner cannot leave", "Transfer ownership or delete the family from the menu.", {}, dim = true)
                Spacer(Modifier.height(6.dp))
            }
        }
    }
}

@Composable
private fun SheetRow(icon: String, bg: Color, fg: Color, title: String, desc: String, tap: () -> Unit, dim: Boolean = false) {
    Row(
        Modifier.fillMaxWidth().padding(vertical = 5.dp).clip(RoundedCornerShape(18.dp))
            .background(if (dim) Color(0xFFF2EEF3) else Color(0xFFFFF7FB))
            .border(1.dp, Color(0x14000000), RoundedCornerShape(18.dp))
            .clickable(enabled = !dim, onClick = tap).padding(14.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Box(Modifier.size(46.dp).clip(RoundedCornerShape(14.dp)).background(bg), contentAlignment = Alignment.Center) { FmIcon(icon, 24.dp, fg) }
        Spacer(Modifier.width(14.dp))
        Column(Modifier.weight(1f)) {
            Text(tr(title), color = if (dim) FM_SOFT else FM_INK, fontSize = 15.sp, fontWeight = FontWeight.Bold)
            Text(tr(desc), color = FM_SOFT, fontSize = 12.sp)
        }
        if (!dim) FmIcon("chev", 18.dp, FM_SOFT)
    }
}

// ---------------------------------------------------------------- Manage Requests

@Composable
fun FamilyRequestsScreen(
    fid: String, requests: List<FamilyRequest>, isAdmin: Boolean,
    onBack: () -> Unit, onApprove: (FamilyRequest) -> Unit, onReject: (FamilyRequest) -> Unit,
    onRefresh: () -> Unit,
) {
    BackHandler(onBack = onBack)
    var tab by remember { mutableStateOf(0) }
    Box(Modifier.fillMaxSize().background(FM_BG).clickable(enabled = false) {}) {
        Column(Modifier.fillMaxSize().statusBarsPadding().navigationBarsPadding()) {
            Row(Modifier.fillMaxWidth().padding(horizontal = 8.dp, vertical = 10.dp), verticalAlignment = Alignment.CenterVertically) {
                Box(Modifier.size(44.dp).clickable(onClick = onBack), contentAlignment = Alignment.Center) { FmIcon("back", 24.dp, FM_INK) }
                Text(tr("Family Requests"), color = FM_INK, fontSize = 18.sp, fontWeight = FontWeight.ExtraBold, modifier = Modifier.weight(1f), textAlign = TextAlign.Center)
                Box(Modifier.size(44.dp).clickable(onClick = onRefresh), contentAlignment = Alignment.Center) { FmIcon("refresh", 22.dp, FM_INK) }
            }
            Row(Modifier.fillMaxWidth().padding(horizontal = 12.dp).clip(RoundedCornerShape(18.dp)).background(Color.White)) {
                listOf("Join Requests", "My Requests").forEachIndexed { i, t ->
                    Column(Modifier.weight(1f).clickable { tab = i }.padding(top = 14.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                        Text(tr(t), color = if (tab == i) FM_MID else FM_SOFT, fontSize = 14.sp, fontWeight = FontWeight.Bold)
                        Spacer(Modifier.height(10.dp))
                        Box(Modifier.width(60.dp).height(4.dp).clip(RoundedCornerShape(topStart = 4.dp, topEnd = 4.dp)).background(if (tab == i) FM_MID else Color.Transparent))
                    }
                }
            }
            if (tab == 1 || !isAdmin || requests.isEmpty()) {
                Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                    Text(
                        tr(if (tab == 1) "No requests sent" else if (!isAdmin) "Only admin can see requests" else "No pending request"),
                        color = FM_SOFT, fontSize = 15.sp,
                    )
                }
            } else LazyColumn(Modifier.fillMaxSize().padding(12.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                items(requests) { r ->
                    Row(
                        Modifier.fillMaxWidth().clip(RoundedCornerShape(18.dp)).background(Color.White)
                            .border(1.dp, Color(0x14000000), RoundedCornerShape(18.dp)).padding(12.dp),
                        verticalAlignment = Alignment.CenterVertically,
                    ) {
                        FmAvatar(r.avatarB64, r.name, 52.dp, ring = true)
                        Spacer(Modifier.width(12.dp))
                        Column(Modifier.weight(1f)) {
                            Text(r.name, color = FM_INK, fontSize = 15.sp, fontWeight = FontWeight.Bold, maxLines = 1, overflow = TextOverflow.Ellipsis)
                            Text(timeAgo(r.createdAt), color = FM_SOFT, fontSize = 12.sp)
                        }
                        Box(
                            Modifier.clip(RoundedCornerShape(14.dp)).background(Color(0xFFFFE3E3)).clickable { onReject(r) }.padding(horizontal = 14.dp, vertical = 9.dp),
                        ) { Text(tr("Reject"), color = Color(0xFFD32F2F), fontSize = 13.sp, fontWeight = FontWeight.Bold) }
                        Spacer(Modifier.width(8.dp))
                        Box(
                            Modifier.clip(RoundedCornerShape(14.dp)).background(FM_BRUSH_V).clickable { onApprove(r) }.padding(horizontal = 14.dp, vertical = 9.dp),
                        ) { Text(tr("Approve"), color = Color.White, fontSize = 13.sp, fontWeight = FontWeight.Bold) }
                    }
                }
            }
        }
    }
}

package com.rezochatvoice.exceo

import android.content.Intent
import android.widget.Toast
import androidx.activity.compose.BackHandler
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.PickVisualMediaRequest
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.*
import androidx.compose.foundation.shape.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.*
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.*
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.*
import androidx.compose.ui.unit.*
import androidx.compose.ui.window.Dialog
import kotlinx.coroutines.launch

private val Teal = Color(0xFF14625A)
private val TealLight = Color(0xFF7FE3D6)
private val YellowBtn = Brush.verticalGradient(listOf(Color(0xFFFFE680), Color(0xFFFFC107), Color(0xFFE0A100)))

@Composable
private fun YellowButton(text: String, modifier: Modifier = Modifier, enabled: Boolean = true, onClick: () -> Unit) {
    Box(
        modifier
            .clip(RoundedCornerShape(50))
            .background(if (enabled) YellowBtn else Brush.verticalGradient(listOf(Color(0xFF777777), Color(0xFF555555))))
            .clickable(enabled = enabled, onClick = onClick)
            .padding(horizontal = 36.dp, vertical = 12.dp),
        contentAlignment = Alignment.Center,
    ) { Text(tr(text), color = Color(0xFF4A2F00), fontSize = 20.sp, fontWeight = FontWeight.Bold) }
}

@Composable
fun FamilyLogo(b64: String?, size: Dp, modifier: Modifier = Modifier) {
    val bmp = remember(b64) { ProfileRepo.decodeB64(b64) }
    val shape = RoundedCornerShape(size / 6)
    if (bmp != null) {
        Image(bmp, null, modifier.size(size).clip(shape), contentScale = ContentScale.Crop)
    } else {
        Box(modifier.size(size).clip(shape).background(Brush.verticalGradient(listOf(Color(0xFF1FA89A), Color(0xFF0E7C86)))), contentAlignment = Alignment.Center) {
            Text("🏰", fontSize = (size.value * 0.5f).sp)
        }
    }
}

/* Tab Family: belum punya -> buat / cari. Sudah punya -> halaman */
@Composable
fun FamilyTabScreen(
    myUid: String, myName: String, myAvatar: String?, myId: String, myCoins: Long = 0L,
    onExit: (() -> Unit)? = null, onChat: ((PublicUser) -> Unit)? = null,
) {
    var fam by remember { mutableStateOf<Family?>(null) }
    var loaded by remember { mutableStateOf(false) }
    var showCreate by remember { mutableStateOf(false) }
    var showSearch by remember { mutableStateOf(false) }

    DisposableEffect(myUid) {
        val r = if (myUid.isNotEmpty()) FamilyRepo.observeMy(myUid) { f, sudah ->
            fam = f
            loaded = sudah
            // Nama/foto di catatan anggota disamakan dengan profil terbaru supaya
            // anggota lain juga melihat perubahannya, bukan salinan saat join.
            if (f != null && sudah) {
                AppScope.scope.launch { FamilyRepo.syncProfil(f.id, myUid, myName, myAvatar) }
            }
        } else null
        onDispose { r?.remove() }
    }

    when {
        !loaded -> Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) { Text(tr("Memuat..."), color = Color(0xFF8A8A8A)) }
        fam != null -> FamilyHomeScreen(fam!!, myUid, myName, myAvatar, onExit = onExit, onChat = onChat)
        else -> FamilyFindScreen(
            myUid = myUid, myName = myName, myAvatar = myAvatar, myCoins = myCoins,
            onBack = onExit, onCreate = { showCreate = true },
        )
    }

    if (showCreate) FamilyFormScreen(
        existing = null, myUid = myUid, myName = myName, myAvatar = myAvatar,
        onBack = { showCreate = false }, onDone = { showCreate = false },
    )
}

@Composable
private fun NoFamilyPage(onCreate: () -> Unit, onSearch: () -> Unit) {
    Column(Modifier.fillMaxSize().statusBarsPadding(), horizontalAlignment = Alignment.CenterHorizontally) {
        Text(tr("Family"), color = Gold, fontSize = 24.sp, fontWeight = FontWeight.Bold, modifier = Modifier.padding(16.dp).align(Alignment.Start))
        Spacer(Modifier.height(40.dp))
        Text("🏰", fontSize = 72.sp)
        Spacer(Modifier.height(12.dp))
        Text(tr("Kamu belum bergabung dengan family"), color = Color.White, fontSize = 16.sp)
        Text(tr("Buat family sendiri atau cari family untuk bergabung"), color = Color(0xFF8A8A8A), fontSize = 13.sp, textAlign = TextAlign.Center, modifier = Modifier.padding(horizontal = 32.dp))
        Spacer(Modifier.height(24.dp))
        YellowButton("Buat Family", onClick = onCreate)
        Spacer(Modifier.height(14.dp))
        OutlinedButton(
            onClick = onSearch,
            border = BorderStroke(1.dp, Gold),
            colors = ButtonDefaults.outlinedButtonColors(contentColor = GoldLight),
        ) { Text(tr("Cari / Gabung Family"), modifier = Modifier.padding(horizontal = 14.dp, vertical = 4.dp)) }
    }
}

/* Pengaturan family (buat baru / ubah) */
@Composable
fun FamilySettingsScreen(
    existing: Family?, myUid: String, myName: String, myAvatar: String?,
    onBack: () -> Unit, onDone: () -> Unit,
) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    var name by remember { mutableStateOf(existing?.name ?: "") }
    var label by remember { mutableStateOf(existing?.label ?: "") }
    var logo by remember { mutableStateOf(existing?.logoB64) }
    var needApproval by remember { mutableStateOf(existing?.needApproval ?: false) }
    var busy by remember { mutableStateOf(false) }

    fun toast(s: String) = Toast.makeText(context, s, Toast.LENGTH_SHORT).show()
    BackHandler(onBack = onBack)

    val picker = rememberLauncherForActivityResult(ActivityResultContracts.PickVisualMedia()) { uri ->
        if (uri != null) scope.launch {
            busy = true
            val b64 = ProfileRepo.encodeImage(context, uri, 400, square = true, quality = 85)
            busy = false
            if (b64 != null) logo = b64 else toast(tr("Gagal membaca gambar"))
        }
    }

    Box(Modifier.fillMaxSize().blockTouches().background(Color(0xFF14100C))) {
        Column(Modifier.fillMaxSize().statusBarsPadding().navigationBarsPadding()) {
            Box(Modifier.fillMaxWidth().height(56.dp)) {
                Text("‹", color = Color.White, fontSize = 36.sp, modifier = Modifier.align(Alignment.CenterStart).clickable(onClick = onBack).padding(horizontal = 16.dp))
                Text(if (existing == null) "Buat family" else "Pengaturan family", color = Color.White, fontSize = 20.sp, modifier = Modifier.align(Alignment.Center))
            }
            Column(Modifier.weight(1f).verticalScroll(rememberScrollState()).padding(horizontal = 16.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                Spacer(Modifier.height(12.dp))
                FamilyLogo(logo, 150.dp, Modifier.clickable { picker.launch(PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.ImageOnly)) })
                Spacer(Modifier.height(8.dp))
                Text(tr("Unggah Logo family"), color = Color.White, modifier = Modifier.clickable { picker.launch(PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.ImageOnly)) })
                Spacer(Modifier.height(16.dp))
                Column(Modifier.fillMaxWidth()) {
                    Text(tr("Nama family"), color = Color.White, fontSize = 18.sp)
                    Spacer(Modifier.height(8.dp))
                    FamField(name, 20) { name = it }
                    Text(tr("*Hanya dapat diubah 1 kali per bulan, harap dipikirkan baik-baik."), color = Color(0xFF9A9A9A), fontSize = 13.sp, modifier = Modifier.padding(vertical = 6.dp))
                    Spacer(Modifier.height(8.dp))
                    Text(tr("Label family"), color = Color.White, fontSize = 18.sp)
                    Spacer(Modifier.height(8.dp))
                    FamField(label, 10) { label = it }
                    Text(tr("*Hanya dapat diubah 1 kali per bulan, harap dipikirkan baik-baik."), color = Color(0xFF9A9A9A), fontSize = 13.sp, modifier = Modifier.padding(vertical = 6.dp))
                    Spacer(Modifier.height(10.dp))
                    Text(tr("Pratinjau"), color = Color.White, fontSize = 18.sp)
                    Spacer(Modifier.height(8.dp))
                    FamilyPreviewCard(name.ifBlank { "Nama family" }, label.ifBlank { "Label" }, logo)
                    Spacer(Modifier.height(16.dp))
                    Text(tr("Menerapkan untuk mengatur"), color = Color.White, fontSize = 18.sp)
                    Row(Modifier.fillMaxWidth().clickable { needApproval = true }, verticalAlignment = Alignment.CenterVertically) {
                        RadioButton(needApproval, { needApproval = true }, colors = RadioButtonDefaults.colors(selectedColor = TealLight, unselectedColor = Color.White))
                        Text(tr("Persetujuan diperlukan untuk bergabung dengan family"), color = Color.White, fontSize = 16.sp)
                    }
                    Row(Modifier.fillMaxWidth().clickable { needApproval = false }, verticalAlignment = Alignment.CenterVertically) {
                        RadioButton(!needApproval, { needApproval = false }, colors = RadioButtonDefaults.colors(selectedColor = TealLight, unselectedColor = Color.White))
                        Text(tr("Tidak diperlukan persetujuan, bergabung dengan family secara langsung"), color = Color.White, fontSize = 16.sp)
                    }
                }
                Spacer(Modifier.height(20.dp))
                YellowButton(if (busy) "Menyimpan..." else "Konfirmasi", enabled = !busy) {
                    val n = name.trim()
                    val l = label.trim()
                    if (n.length < 2) return@YellowButton toast(tr("Nama family minimal 2 karakter"))
                    if (l.length < 2) return@YellowButton toast(tr("Label family minimal 2 karakter"))
                    busy = true
                    scope.launch {
                        val err = if (existing == null) FamilyRepo.create(myUid, myName, myAvatar, n, l, logo, null, "", needApproval)
                        else FamilyRepo.saveSettings(existing, n, l, logo, null, existing.country, needApproval)
                        busy = false
                        if (err != null) toast(err) else {
                            toast(if (existing == null) "Family berhasil dibuat" else "Pengaturan disimpan")
                            onDone()
                        }
                    }
                }
                Spacer(Modifier.height(28.dp))
            }
        }
    }
}

@Composable
private fun FamField(value: String, max: Int, onChange: (String) -> Unit) {
    OutlinedTextField(
        value = value,
        onValueChange = { if (it.length <= max) onChange(it) },
        singleLine = true,
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp),
        trailingIcon = { Text(tr("${value.length}/$max"), color = Color(0xFF9A9A9A), modifier = Modifier.padding(end = 12.dp)) },
        colors = OutlinedTextFieldDefaults.colors(
            focusedTextColor = Color.White, unfocusedTextColor = Color.White, cursorColor = TealLight,
            focusedBorderColor = TealLight, unfocusedBorderColor = Color(0xFF2D2822),
            focusedContainerColor = Color(0xFF2A2520), unfocusedContainerColor = Color(0xFF2A2520),
        ),
    )
}

@Composable
private fun FamilyPreviewCard(name: String, label: String, logo: String?) {
    Row(
        Modifier.fillMaxWidth().clip(RoundedCornerShape(10.dp))
            .background(Brush.horizontalGradient(listOf(Color(0xFF0B4D45), Color(0xFF0E2E2B))))
            .border(2.dp, Gold, RoundedCornerShape(10.dp)).padding(14.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        FamilyLogo(logo, 64.dp)
        Spacer(Modifier.width(12.dp))
        Column {
            Text(name, color = Color.White, fontSize = 22.sp, fontWeight = FontWeight.Medium, maxLines = 1, overflow = TextOverflow.Ellipsis)
            Spacer(Modifier.height(4.dp))
            Text(tr("🛡 $label"), color = Color.White, fontSize = 13.sp, modifier = Modifier.clip(RoundedCornerShape(50)).background(Teal).padding(horizontal = 10.dp, vertical = 2.dp))
        }
    }
}

/* Halaman family */
@Composable
fun FamilyHomeScreen(
    f: Family, myUid: String, myName: String, myAvatar: String?,
    onExit: (() -> Unit)? = null, onChat: ((PublicUser) -> Unit)? = null,
) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    var tab by remember { mutableStateOf(0) }
    var members by remember { mutableStateOf<List<FamilyMember>>(emptyList()) }
    var requests by remember { mutableStateOf<List<FamilyRequest>>(emptyList()) }
    var logs by remember { mutableStateOf<List<FamilyLog>>(emptyList()) }
    var famCoins by remember { mutableStateOf(0L) }
    var sheet by remember { mutableStateOf(false) }
    var showEdit by remember { mutableStateOf(false) }
    var showReq by remember { mutableStateOf(false) }
    var showDelete by remember { mutableStateOf(false) }
    var showLeave by remember { mutableStateOf(false) }
    var showSend by remember { mutableStateOf(false) }
    var aksi by remember { mutableStateOf<FamilyMember?>(null) }
    var kirimKe by remember { mutableStateOf<FamilyMember?>(null) }
    var refreshKey by remember { mutableStateOf(0) }
    var profilUid by remember { mutableStateOf<String?>(null) }

    fun toast(s: String) = Toast.makeText(context, s, Toast.LENGTH_SHORT).show()

    val me = members.firstOrNull { it.uid == myUid }
    val isOwner = f.ownerUid == myUid
    val isAdmin = isOwner || me?.role == "admin"
    val level = familyLevel(f.exp)
    val kapasitas = familyCapacity(level)

    DisposableEffect(f.id) {
        val a = FamilyRepo.observeMembers(f.id) { members = it }
        val c = FamilyRepo.observeLog(f.id) { logs = it }
        val d = if (isAdmin) FamilyRepo.observeRequests(f.id) { requests = it } else null
        onDispose { a.remove(); c.remove(); d?.remove() }
    }
    // Coin family dibaca dari server dompet; diperbarui saat exp berubah atau di-refresh.
    LaunchedEffect(f.id, f.exp, refreshKey) { famCoins = try { FamilyRepo.coins(myUid, f.id) } catch (e: Exception) { famCoins } }

    Box(Modifier.fillMaxSize().background(FM_BG)) {
        Column(Modifier.fillMaxSize()) {
            // ---- header: cover + logo + nama + pil ----
            Box(Modifier.fillMaxWidth().height(300.dp).background(FM_BRUSH_V)) {
                val cov = remember(f.coverB64) { ProfileRepo.decodeB64(f.coverB64) }
                if (cov != null) {
                    Image(cov, null, Modifier.fillMaxSize(), contentScale = ContentScale.Crop)
                    Box(Modifier.fillMaxSize().background(Brush.verticalGradient(listOf(Color(0x66000000), Color(0xCC2A0A33)))))
                }
                Row(Modifier.fillMaxWidth().statusBarsPadding().padding(horizontal = 14.dp, vertical = 8.dp), verticalAlignment = Alignment.CenterVertically) {
                    if (onExit != null) {
                        Box(
                            Modifier.size(42.dp).clip(RoundedCornerShape(14.dp)).background(Color(0x44000000))
                                .border(1.dp, Color(0x55FFFFFF), RoundedCornerShape(14.dp)).clickable(onClick = onExit),
                            contentAlignment = Alignment.Center,
                        ) { FmIcon("back", 22.dp) }
                    }
                    Spacer(Modifier.weight(1f))
                    if (isAdmin) Box(
                        Modifier.size(42.dp).clip(RoundedCornerShape(14.dp)).background(Brush.verticalGradient(listOf(Color(0xFFFFE680), FM_GOLD)))
                            .clickable { sheet = true },
                        contentAlignment = Alignment.Center,
                    ) {
                        FmIcon("gear", 24.dp, Color(0xFF3D2A00))
                        if (requests.isNotEmpty()) Box(Modifier.align(Alignment.TopEnd).padding(3.dp).size(10.dp).clip(CircleShape).background(Color(0xFFE53935)))
                    } else Box(Modifier.size(42.dp).clip(RoundedCornerShape(14.dp)).background(Color(0x44000000)).clickable { showLeave = true }, contentAlignment = Alignment.Center) { FmIcon("dots", 22.dp) }
                }
                Column(Modifier.fillMaxWidth().align(Alignment.BottomCenter).padding(bottom = 22.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                    Box(Modifier.size(104.dp).clip(CircleShape).border(4.dp, Color.White, CircleShape)) { FamilyLogo(f.logoB64, 104.dp) }
                    Spacer(Modifier.height(8.dp))
                    Text(f.name, color = Color.White, fontSize = 24.sp, fontWeight = FontWeight.ExtraBold, maxLines = 1, overflow = TextOverflow.Ellipsis)
                    Spacer(Modifier.height(8.dp))
                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalAlignment = Alignment.CenterVertically) {
                        FmLevelPill(level)
                        FmPill("ID: ${f.numId}", icon = null)
                        val c = ProfileRepo.countries.firstOrNull { it.code == f.country }
                        if (c != null) FmPill("${c.flag} ${c.name}")
                    }
                    Spacer(Modifier.height(8.dp))
                    FmPill("${f.memberCount}/$kapasitas", icon = "people")
                }
            }

            // ---- tiga kartu: Points (exp), Members, Coins ----
            Row(Modifier.fillMaxWidth().padding(horizontal = 12.dp).offset(y = (-26).dp), horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                StatCard(Modifier.weight(1f), "spark", fmShort(f.exp), "Points", onClick = null)
                StatCard(Modifier.weight(1f), "people", "${f.memberCount}/$kapasitas", "Members", onClick = null)
                StatCard(Modifier.weight(1f), "coin", fmShort(famCoins), "Coins", onClick = if (isAdmin) ({ showSend = true }) else null)
            }

            // ---- progres level ----
            val perlu = familyLevelNeed(level + 1)
            val awal = familyLevelNeed(level)
            if (level < FAMILY_MAX_LEVEL) {
                Column(Modifier.fillMaxWidth().padding(horizontal = 16.dp).offset(y = (-18).dp)) {
                    Row { Text(tr("Exp to Lv. ${level + 1}"), color = FM_SOFT, fontSize = 11.sp, modifier = Modifier.weight(1f)); Text("${fmShort(f.exp)} / ${fmShort(perlu)}", color = FM_SOFT, fontSize = 11.sp) }
                    Spacer(Modifier.height(4.dp))
                    val pct = ((f.exp - awal).toFloat() / (perlu - awal).toFloat()).coerceIn(0f, 1f)
                    Box(Modifier.fillMaxWidth().height(7.dp).clip(RoundedCornerShape(50)).background(Color(0xFFEBDCEB))) {
                        Box(Modifier.fillMaxWidth(pct.coerceAtLeast(0.02f)).height(7.dp).background(FM_BRUSH))
                    }
                }
            }

            // ---- tab Members / Request / Log ----
            Row(
                Modifier.fillMaxWidth().padding(horizontal = 12.dp).offset(y = (-8).dp).clip(RoundedCornerShape(24.dp)).background(Color.White).padding(5.dp),
            ) {
                listOf("Members", "Request", "Log").forEachIndexed { i, t ->
                    Box(
                        Modifier.weight(1f).height(40.dp).clip(RoundedCornerShape(20.dp))
                            .background(if (tab == i) FM_BRUSH else Brush.horizontalGradient(listOf(Color.Transparent, Color.Transparent)))
                            .clickable { tab = i },
                        contentAlignment = Alignment.Center,
                    ) { Text(tr(t) + if (i == 1 && requests.isNotEmpty()) " (${requests.size})" else "", color = if (tab == i) Color.White else FM_SOFT, fontSize = 14.sp, fontWeight = FontWeight.Bold) }
                }
            }

            Box(Modifier.weight(1f)) {
                when (tab) {
                    0 -> LazyColumn(Modifier.fillMaxSize().padding(horizontal = 12.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        items(members) { m ->
                            val bisaKelola = m.uid != myUid && m.uid != f.ownerUid && (isOwner || (isAdmin && m.role == "member"))
                            Row(
                                Modifier.fillMaxWidth().clip(RoundedCornerShape(18.dp)).background(Color.White)
                                    .border(1.dp, Color(0x14000000), RoundedCornerShape(18.dp)).padding(12.dp),
                                verticalAlignment = Alignment.CenterVertically,
                            ) {
                                val (nmAnggota, avAnggota) = IngatProfil(m.uid, m.name, m.avatarB64)
                                Box(Modifier.clip(CircleShape).clickable { profilUid = m.uid }) { FmAvatar(avAnggota, nmAnggota, 50.dp, ring = true) }
                                Spacer(Modifier.width(12.dp))
                                Column(Modifier.weight(1f).clickable { profilUid = m.uid }) {
                                    Text(nmAnggota, color = FM_INK, fontSize = 15.sp, fontWeight = FontWeight.Bold, maxLines = 1, overflow = TextOverflow.Ellipsis)
                                    Text(
                                        when { m.uid == f.ownerUid -> "Owner"; m.role == "admin" -> "Admin"; else -> "Member" },
                                        color = if (m.uid == f.ownerUid) Color(0xFFE09A00) else if (m.role == "admin") FM_PINK else FM_SOFT,
                                        fontSize = 12.sp, fontWeight = FontWeight.Medium,
                                    )
                                }
                                Box(Modifier.clip(RoundedCornerShape(50)).background(Color(0xFFF1E7F2)).padding(horizontal = 10.dp, vertical = 5.dp)) {
                                    Text(fmShort(m.contribution), color = FM_INK, fontSize = 12.sp, fontWeight = FontWeight.Bold)
                                }
                                if (bisaKelola) Box(Modifier.size(38.dp).clip(CircleShape).clickable { aksi = m }, contentAlignment = Alignment.Center) { FmIcon("dots", 22.dp, FM_SOFT) }
                            }
                        }
                        item { Spacer(Modifier.height(20.dp)) }
                    }
                    1 -> if (!isAdmin || requests.isEmpty()) Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                        Text(tr(if (!isAdmin) "Only admin can see requests" else "No pending request"), color = FM_SOFT)
                    } else LazyColumn(Modifier.fillMaxSize().padding(horizontal = 12.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        items(requests) { r ->
                            Row(Modifier.fillMaxWidth().clip(RoundedCornerShape(18.dp)).background(Color.White).padding(12.dp), verticalAlignment = Alignment.CenterVertically) {
                                val (nmMinta, avMinta) = IngatProfil(r.uid, r.name, r.avatarB64)
                                FmAvatar(avMinta, nmMinta, 46.dp, ring = true)
                                Spacer(Modifier.width(10.dp))
                                Column(Modifier.weight(1f)) {
                                    Text(nmMinta, color = FM_INK, fontSize = 14.sp, fontWeight = FontWeight.Bold, maxLines = 1)
                                    Text(timeAgo(r.createdAt), color = FM_SOFT, fontSize = 11.sp)
                                }
                                Box(Modifier.clip(RoundedCornerShape(12.dp)).background(Color(0xFFFFE3E3)).clickable { scope.launch { FamilyRepo.reject(f.id, r.uid); toast(tr("Permintaan ditolak")) } }.padding(horizontal = 12.dp, vertical = 8.dp)) { Text(tr("Reject"), color = Color(0xFFD32F2F), fontSize = 12.sp, fontWeight = FontWeight.Bold) }
                                Spacer(Modifier.width(6.dp))
                                Box(Modifier.clip(RoundedCornerShape(12.dp)).background(FM_BRUSH_V).clickable { scope.launch { toast(FamilyRepo.approve(f.id, r) ?: "${r.name} diterima") } }.padding(horizontal = 12.dp, vertical = 8.dp)) { Text(tr("Approve"), color = Color.White, fontSize = 12.sp, fontWeight = FontWeight.Bold) }
                            }
                        }
                    }
                    else -> if (logs.isEmpty()) Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) { Text(tr("Belum ada aktivitas"), color = FM_SOFT) }
                    else LazyColumn(Modifier.fillMaxSize().padding(horizontal = 12.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                        items(logs) { l ->
                            Row(Modifier.fillMaxWidth().clip(RoundedCornerShape(14.dp)).background(Color.White).padding(12.dp), verticalAlignment = Alignment.CenterVertically) {
                                Text(l.text, color = FM_INK, fontSize = 13.sp, modifier = Modifier.weight(1f))
                                Text(timeAgo(l.createdAt), color = FM_SOFT, fontSize = 11.sp)
                            }
                        }
                    }
                }
            }
            if (isAdmin) Box(Modifier.fillMaxWidth().navigationBarsPadding().padding(12.dp)) {
                FmButton("Manage Requests${if (requests.isNotEmpty()) " (${requests.size})" else ""}", Modifier.fillMaxWidth()) { showReq = true }
            }
        }
    }

    // Profil member: ketuk foto atau nama di daftar member.
    profilUid?.let { pu ->
        OtherProfileScreen(
            uid = pu,
            myUid = myUid,
            onBack = { profilUid = null },
            onChat = { u -> profilUid = null; onChat?.invoke(u) },
            onFansClick = {},
            onFollowingClick = {},
        )
    }

    // ---------- sheet, layar, dan dialog ----------
    if (sheet) FamilySettingsSheet(
        isOwner = isOwner, pending = requests.size,
        onEdit = { sheet = false; showEdit = true },
        onRequests = { sheet = false; showReq = true },
        onRefresh = { sheet = false; refreshKey++; toast(tr("Family dimuat ulang")) },
        onDismiss = { sheet = false },
    )
    if (showEdit) FamilyFormScreen(existing = f, myUid = myUid, myName = myName, myAvatar = myAvatar, onBack = { showEdit = false }, onDone = { showEdit = false })
    if (showReq) FamilyRequestsScreen(
        fid = f.id, requests = requests, isAdmin = isAdmin, onBack = { showReq = false },
        onApprove = { r -> scope.launch { toast(FamilyRepo.approve(f.id, r) ?: "${r.name} diterima") } },
        onReject = { r -> scope.launch { FamilyRepo.reject(f.id, r.uid); toast(tr("Permintaan ditolak")) } },
        onRefresh = { refreshKey++ },
    )

    aksi?.let { m ->
        Dialog(onDismissRequest = { aksi = null }) {
            Column(Modifier.fillMaxWidth().clip(RoundedCornerShape(22.dp)).background(Color.White).padding(16.dp)) {
                Text(m.name, color = FM_INK, fontSize = 17.sp, fontWeight = FontWeight.ExtraBold)
                Spacer(Modifier.height(10.dp))
                if (isOwner && m.role != "admin") MenuRow("Jadikan admin") { aksi = null; scope.launch { toast(FamilyRepo.setRole(f.id, m.uid, "admin") ?: "${m.name} jadi admin") } }
                if (isOwner && m.role == "admin") MenuRow("Cabut admin") { aksi = null; scope.launch { toast(FamilyRepo.setRole(f.id, m.uid, "member") ?: "Admin ${m.name} dicabut") } }
                if (isAdmin) MenuRow("Kirim coin family") { aksi = null; kirimKe = m }
                MenuRow("Keluarkan dari family", merah = true) { aksi = null; scope.launch { toast(FamilyRepo.kick(f.id, m.uid) ?: "${m.name} dikeluarkan") } }
            }
        }
    }

    if (showSend) {
        Dialog(onDismissRequest = { showSend = false }) {
            Column(Modifier.fillMaxWidth().clip(RoundedCornerShape(22.dp)).background(Color.White).padding(16.dp)) {
                Text(tr("Coin family: ${fmtNum(famCoins)}"), color = FM_INK, fontSize = 17.sp, fontWeight = FontWeight.ExtraBold)
                Text(tr("Pilih member penerima, lalu ketuk titik tiga di daftar member untuk mengirim coin."), color = FM_SOFT, fontSize = 12.sp, modifier = Modifier.padding(vertical = 8.dp))
                Box(Modifier.fillMaxWidth().clip(RoundedCornerShape(50)).background(FM_BRUSH).clickable { showSend = false; tab = 0 }.padding(12.dp), contentAlignment = Alignment.Center) {
                    Text(tr("Lihat daftar member"), color = Color.White, fontWeight = FontWeight.Bold)
                }
            }
        }
    }

    kirimKe?.let { m ->
        var jumlah by remember { mutableStateOf("") }
        var sibuk by remember { mutableStateOf(false) }
        AlertDialog(
            onDismissRequest = { if (!sibuk) kirimKe = null },
            title = { Text(tr("Kirim coin ke ${m.name}")) },
            text = {
                Column {
                    Text(tr("Coin family tersedia: ${fmtNum(famCoins)}"), color = FM_SOFT, fontSize = 12.sp)
                    OutlinedTextField(
                        jumlah, { jumlah = it.filter { c -> c.isDigit() }.take(12) }, singleLine = true,
                        placeholder = { Text(tr("Jumlah coin")) }, modifier = Modifier.fillMaxWidth().padding(top = 8.dp),
                        keyboardOptions = androidx.compose.foundation.text.KeyboardOptions(keyboardType = androidx.compose.ui.text.input.KeyboardType.Number),
                    )
                }
            },
            confirmButton = {
                TextButton(enabled = !sibuk, onClick = {
                    val n = jumlah.toLongOrNull() ?: 0L
                    if (n <= 0L) { toast(tr("Isi jumlah coin")); return@TextButton }
                    sibuk = true
                    scope.launch {
                        val err = SupaRepo.famKirim(myUid, f.id, m.uid, n)
                        sibuk = false
                        if (err == null) {
                            FamilyRepo.catat(f.id, "${myName} mengirim ${fmtNum(n)} coin ke ${m.name}")
                            refreshKey++
                            toast(tr("Coin terkirim ke ${m.name}")); kirimKe = null
                        } else toast(err)
                    }
                }) { Text(tr(if (sibuk) "Mengirim..." else "Kirim")) }
            },
            dismissButton = { TextButton(enabled = !sibuk, onClick = { kirimKe = null }) { Text(tr("Batal")) } },
        )
    }

    if (showDelete) AlertDialog(
        onDismissRequest = { showDelete = false },
        title = { Text(tr("Hapus family?")) },
        text = { Text(tr("Family \"${f.name}\" dan semua datanya akan dihapus permanen, seluruh anggota akan dikeluarkan. Tindakan ini tidak bisa dibatalkan.")) },
        confirmButton = { TextButton(onClick = { showDelete = false; scope.launch { val e = FamilyRepo.delete(f.id); toast(e ?: "Family dihapus") } }) { Text(tr("Hapus"), color = Color(0xFFD9534F)) } },
        dismissButton = { TextButton(onClick = { showDelete = false }) { Text(tr("Batal")) } },
    )
    if (showLeave) AlertDialog(
        onDismissRequest = { showLeave = false },
        title = { Text(tr("Keluar dari family?")) },
        text = { Text(tr("Kontribusimu di family ini akan hilang.")) },
        confirmButton = { TextButton(onClick = { showLeave = false; scope.launch { val e = FamilyRepo.leave(f.id, myUid); toast(e ?: "Kamu keluar dari family") } }) { Text(tr("Keluar"), color = Color(0xFFD9534F)) } },
        dismissButton = { TextButton(onClick = { showLeave = false }) { Text(tr("Batal")) } },
    )
}

@Composable
private fun StatCard(mod: Modifier, icon: String, value: String, label: String, onClick: (() -> Unit)?) {
    Column(
        mod.clip(RoundedCornerShape(22.dp)).background(FM_BRUSH_V)
            .then(if (onClick != null) Modifier.clickable(onClick = onClick) else Modifier)
            .padding(vertical = 14.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Box(Modifier.size(36.dp).clip(CircleShape).background(Color(0x22FFFFFF)), contentAlignment = Alignment.Center) { FmIcon(icon, 20.dp, FM_GOLD) }
        Spacer(Modifier.height(8.dp))
        Text(value, color = Color.White, fontSize = 17.sp, fontWeight = FontWeight.ExtraBold, maxLines = 1)
        Text(tr(label), color = Color(0xCCFFFFFF), fontSize = 11.sp)
    }
}

@Composable
private fun MenuRow(text: String, merah: Boolean = false, tap: () -> Unit) {
    Text(
        tr(text), color = if (merah) Color(0xFFD32F2F) else FM_INK, fontSize = 15.sp, fontWeight = FontWeight.Medium,
        modifier = Modifier.fillMaxWidth().clickable(onClick = tap).padding(vertical = 12.dp),
    )
}

/* Daftar anggota, permintaan, peringkat, cari */
@Composable
private fun SubPage(title: String, onBack: () -> Unit, content: @Composable () -> Unit) {
    BackHandler(onBack = onBack)
    OverlayBox {
        Column(Modifier.fillMaxSize()) {
            GoldTopBar(title, onBack)
            Box(Modifier.weight(1f).navigationBarsPadding()) { content() }
        }
    }
}

@Composable
/**
 * Nama dan foto anggota diambil dari PROFIL TERBARU (RTDB pub) tiap kali daftar
 * tampil, bukan dari salinan saat join family. Dulu salinan itu yang dipakai,
 * jadi nama dan foto yang sudah diganti user tetap tampil versi lama.
 */
@Composable
private fun IngatProfil(uid: String, name: String, avatar: String?): Pair<String, String?> {
    var nilai by remember(uid) { mutableStateOf(name to avatar) }
    LaunchedEffect(uid) {
        if (uid.isBlank()) return@LaunchedEffect
        val u = try {
            kotlinx.coroutines.withTimeoutOrNull(6000L) { UserCache.byUid(uid) }
        } catch (e: kotlinx.coroutines.CancellationException) {
            throw e
        } catch (e: Exception) { null } ?: return@LaunchedEffect
        val nm = u.name.ifBlank { name }
        val av = u.avatarB64?.takeIf { it.isNotBlank() } ?: avatar
        if (nm != nilai.first || av != nilai.second) nilai = nm to av
    }
    return nilai
}

/** Avatar anggota dengan foto terbaru. */
@Composable
private fun AnggotaAvatar(uid: String, name: String, avatar: String?, size: Dp, ring: Boolean = false) {
    val (nm, av) = IngatProfil(uid, name, avatar)
    FmAvatar(av, nm, size, ring = ring)
}

/** Baris nama anggota dengan nama terbaru. */
@Composable
private fun NamaAnggota(uid: String, name: String, avatar: String?, isi: @Composable (String, String?) -> Unit) {
    val (nm, av) = IngatProfil(uid, name, avatar)
    isi(nm, av)
}

@Composable
private fun MemberListScreen(
    members: List<FamilyMember>, ownerUid: String, myUid: String, isAdmin: Boolean, isOwner: Boolean,
    onBack: () -> Unit, onManage: (FamilyMember) -> Unit,
) {
    SubPage("Anggota (${members.size})", onBack) {
        LazyColumn(Modifier.fillMaxSize().padding(horizontal = 12.dp)) {
            items(members) { m ->
                val canManage = m.uid != myUid && m.uid != ownerUid && (isOwner || (isAdmin && m.role == "member"))
                Row(Modifier.fillMaxWidth().padding(vertical = 6.dp), verticalAlignment = Alignment.CenterVertically) {
                    AnggotaAvatar(m.uid, m.name, m.avatarB64, 46.dp)
                    Spacer(Modifier.width(10.dp))
                    Column(Modifier.weight(1f)) {
                        Text(m.name, color = Color.White, fontSize = 16.sp)
                        Text(
                            when { m.uid == ownerUid -> "Pemilik"; m.role == "admin" -> "Admin"; else -> "Anggota" } + " · Kontribusi ${fmtNum(m.contribution)}",
                            color = Color(0xFF9AB5B0), fontSize = 12.sp,
                        )
                    }
                    if (canManage) Text(tr("Kelola"), color = GoldLight, modifier = Modifier.clickable { onManage(m) }.padding(8.dp))
                }
            }
        }
    }
}

@Composable
private fun RequestsScreen(list: List<FamilyRequest>, isAdmin: Boolean, onBack: () -> Unit, onApprove: (FamilyRequest) -> Unit, onReject: (FamilyRequest) -> Unit) {
    SubPage("Permintaan bergabung", onBack) {
        if (!isAdmin || list.isEmpty()) {
            Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                Text(if (isAdmin) "Tidak ada permintaan" else "Hanya admin yang dapat melihat permintaan", color = Color(0xFF8A8A8A))
            }
        } else LazyColumn(Modifier.fillMaxSize().padding(horizontal = 12.dp)) {
            items(list) { r ->
                Row(Modifier.fillMaxWidth().padding(vertical = 6.dp), verticalAlignment = Alignment.CenterVertically) {
                    AnggotaAvatar(r.uid, r.name, r.avatarB64, 46.dp)
                    Spacer(Modifier.width(10.dp))
                    Column(Modifier.weight(1f)) {
                        Text(r.name, color = Color.White, fontSize = 16.sp)
                        Text(timeAgo(r.createdAt), color = Color(0xFF9AB5B0), fontSize = 12.sp)
                    }
                    Text(tr("Tolak"), color = Color(0xFFFF6B6B), modifier = Modifier.clickable { onReject(r) }.padding(8.dp))
                    Text(tr("Terima"), color = Color(0xFF3D2A00), modifier = Modifier.clip(RoundedCornerShape(50)).background(YellowBtn).clickable { onApprove(r) }.padding(horizontal = 14.dp, vertical = 6.dp))
                }
            }
        }
    }
}

/** Ranking family dari tab Party: layar penuh, tidak perlu punya family. */
@Composable
fun FamilyRankDialog(myUid: String, onDismiss: () -> Unit, onOpenFamily: (String) -> Unit = {}) {
    var myFamilyId by remember { mutableStateOf("") }
    DisposableEffect(myUid) {
        val r = if (myUid.isNotEmpty()) FamilyRepo.observeMy(myUid) { f, _ -> myFamilyId = f?.id ?: "" } else null
        onDispose { r?.remove() }
    }
    androidx.compose.ui.window.Dialog(
        onDismissRequest = onDismiss,
        properties = androidx.compose.ui.window.DialogProperties(usePlatformDefaultWidth = false, decorFitsSystemWindows = false),
    ) {
        KecilkanKonten(0.84f) { FamilyRankScreen(myFamilyId = myFamilyId, onBack = onDismiss, onOpenFamily = onOpenFamily) }
    }
}

@Composable
fun FamilyProfileDialog(
    fid: String,
    myUid: String,
    myName: String,
    myAvatar: String?,
    onDismiss: () -> Unit,
) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    var f by remember(fid) { mutableStateOf<Family?>(null) }
    var members by remember(fid) { mutableStateOf<List<FamilyMember>>(emptyList()) }
    var myFid by remember(fid) { mutableStateOf<String?>(null) }
    var busy by remember(fid) { mutableStateOf(false) }

    BackHandler(onBack = onDismiss)
    LaunchedEffect(fid) {
        f = try { FamilyRepo.getFamily(fid) } catch (e: kotlinx.coroutines.CancellationException) { throw e } catch (e: Exception) { null }
        myFid = try { FamilyRepo.myFamilyId(myUid) } catch (e: kotlinx.coroutines.CancellationException) { throw e } catch (e: Exception) { null }
    }
    DisposableEffect(fid) {
        val reg = FamilyRepo.observeMembers(fid) { members = it }
        onDispose { reg.remove() }
    }
    OverlayBox {
        Column(Modifier.fillMaxSize()) {
            GoldTopBar("Profil Family", onDismiss)
            val fam = f
            if (fam == null) {
                Box(Modifier.weight(1f).fillMaxWidth(), contentAlignment = Alignment.Center) { Text(tr("Memuat..."), color = Color(0xFF8A8A8A)) }
            } else {
                LazyColumn(Modifier.weight(1f).fillMaxSize().padding(horizontal = 14.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                    item {
                        Spacer(Modifier.height(16.dp))
                        FamilyLogo(fam.logoB64, 92.dp)
                        Spacer(Modifier.height(10.dp))
                        Text(fam.name, color = GoldLight, fontSize = 24.sp, fontWeight = FontWeight.Bold, maxLines = 1, overflow = TextOverflow.Ellipsis)
                        Text(tr("ID:${fam.numId} · 🛡 ${fam.label}"), color = Color(0xFF9AB5B0), fontSize = 13.sp)
                        Spacer(Modifier.height(8.dp))
                        Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                            Text(tr("Lv ${familyLevel(fam.exp)} · ${familyClassOf(fam.exp).roman}"), color = Color.White, fontSize = 13.sp)
                            Text(tr("${fmtNum(fam.exp)} EXP"), color = Color(0xFFFFD54F), fontSize = 13.sp, fontWeight = FontWeight.Bold)
                            Text(tr("${fam.memberCount} anggota"), color = Color.White, fontSize = 13.sp)
                        }
                        Spacer(Modifier.height(10.dp))
                        if (myFid.isNullOrBlank()) {
                            if (fam.needApproval) OutlineButton(if (busy) "Mengirim..." else "Ajukan Bergabung") { busy = true; scope.launch {
                                val e = FamilyRepo.join(fam.id, myUid, myName, myAvatar); busy = false                               
                                Toast.makeText(context, if (e == null) "Berhasil bergabung" else if (e == "REQUEST_SENT") "Permintaan dikirim" else e, Toast.LENGTH_SHORT).show()
                                if (e == null) onDismiss()
                            } }
                            else YellowButton(if (busy) "..." else "Gabung Family", enabled = !busy) { busy = true; scope.launch {
                                val e = FamilyRepo.join(fam.id, myUid, myName, myAvatar); busy = false
                                Toast.makeText(context, if (e == null) "Berhasil bergabung" else e, Toast.LENGTH_SHORT).show()
                                if (e == null) onDismiss()
                            } }
                        } else {
                            Text(if (myFid == fam.id) "Ini family kamu" else "Kamu sudah tergabung di family lain", color = Color(0xFFBDBDBD), fontSize = 12.sp)
                        }
                        Spacer(Modifier.height(14.dp))
                        Text(tr("Anggota (${members.size})"), color = GoldLight, fontSize = 15.sp, fontWeight = FontWeight.Bold, modifier = Modifier.align(Alignment.Start))
                        Spacer(Modifier.height(8.dp))
                    }
                    items(members.size) { i ->
                        val m = members[i]
                        Row(Modifier.fillMaxWidth().padding(vertical = 4.dp).clip(RoundedCornerShape(10.dp)).background(CardBlack).padding(10.dp), verticalAlignment = Alignment.CenterVertically) {
                            AnggotaAvatar(m.uid, m.name, m.avatarB64, 40.dp)
                            Spacer(Modifier.width(10.dp))
                            Column(Modifier.weight(1f)) {
                                Text(m.name, color = Color.White, fontSize = 15.sp, maxLines = 1, overflow = TextOverflow.Ellipsis)
                                Text(if (m.uid == fam.ownerUid) "Owner" else m.role, color = Color(0xFF9AB5B0), fontSize = 12.sp)
                            }
                        }
                    }
                    item { Spacer(Modifier.height(20.dp)) }
                }
            }
        }
    }
}

@Composable
private fun FamilyRankScreen(myFamilyId: String, onBack: () -> Unit, onOpenFamily: (String) -> Unit = {}) {
    var list by remember { mutableStateOf<List<Family>?>(null) }
    // Nama pemilik tiap family, dibaca sekali untuk baris "Zeeto Alam" di bawah nama family.
    var pemilik by remember { mutableStateOf<Map<String, String>>(emptyMap()) }
    LaunchedEffect(Unit) {
        val l = try { FamilyRepo.topFamilies() } catch (e: kotlinx.coroutines.CancellationException) { throw e } catch (e: Exception) { emptyList() }
        list = l
        val peta = HashMap<String, String>()
        for (f in l) {
            // Nama pemilik dibaca dari profil terbaru; salinan di family bisa basi.
            val n = try {
                kotlinx.coroutines.withTimeoutOrNull(6000L) { UserCache.byUid(f.ownerUid) }?.name
            } catch (e: kotlinx.coroutines.CancellationException) {
                throw e
            } catch (e: Exception) { null }
                ?: try { FamilyRepo.ownerName(f.id, f.ownerUid) } catch (e: Exception) { null }
            if (!n.isNullOrBlank()) { peta[f.id] = n; pemilik = HashMap(peta) }
        }
    }
    BackHandler(onBack = onBack)

    val latar = Brush.verticalGradient(listOf(Color(0xFFFDEFF7), Color(0xFFFFFFFF), Color(0xFFFBF1F8)))
    Box(Modifier.fillMaxSize().background(latar)) {
        Column(Modifier.fillMaxSize().statusBarsPadding()) {
            // ---- header kapsul ----
            Row(
                Modifier.fillMaxWidth().padding(horizontal = 14.dp, vertical = 10.dp).clip(RoundedCornerShape(26.dp))
                    .background(Color.White).border(1.dp, Color(0x14000000), RoundedCornerShape(26.dp)).padding(10.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Box(Modifier.size(46.dp).clip(RoundedCornerShape(16.dp)).background(FM_BRUSH_V).clickable(onClick = onBack), contentAlignment = Alignment.Center) { FmIcon("back", 24.dp) }
                Spacer(Modifier.width(14.dp))
                Column(Modifier.weight(1f)) {
                    Text(tr("Family Ranking"), color = FM_INK, fontSize = 18.sp, fontWeight = FontWeight.ExtraBold)
                    Text(tr("Top family leaderboard"), color = FM_SOFT, fontSize = 12.sp)
                }
                Box(Modifier.size(46.dp).clip(CircleShape).background(Brush.verticalGradient(listOf(Color(0xFFFFE680), FM_GOLD))), contentAlignment = Alignment.Center) {
                    FmIcon("medal", 24.dp, Color(0xFF3D2A00))
                }
            }

            val l = list
            if (l == null) Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) { Text(tr("Memuat..."), color = FM_SOFT) }
            else if (l.isEmpty()) Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) { Text(tr("Belum ada data peringkat"), color = FM_SOFT) }
            else LazyColumn(Modifier.fillMaxSize(), contentPadding = androidx.compose.foundation.layout.PaddingValues(bottom = 24.dp)) {
                // ---- podium: 2 - 1 - 3 ----
                item {
                    Row(
                        Modifier.fillMaxWidth().padding(horizontal = 10.dp).padding(top = 22.dp),
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                        verticalAlignment = Alignment.Bottom,
                    ) {
                        val juara2 = l.getOrNull(1); val juara1 = l.getOrNull(0); val juara3 = l.getOrNull(2)
                        Box(Modifier.weight(1f)) { if (juara2 != null) PodiumCard(2, juara2, pemilik[juara2.id], onOpenFamily) }
                        Box(Modifier.weight(1.22f)) { if (juara1 != null) PodiumCard(1, juara1, pemilik[juara1.id], onOpenFamily) }
                        Box(Modifier.weight(1f)) { if (juara3 != null) PodiumCard(3, juara3, pemilik[juara3.id], onOpenFamily) }
                    }
                    Spacer(Modifier.height(18.dp))
                }
                // ---- peringkat 4 dst ----
                if (l.size > 3) item {
                    Column(
                        Modifier.fillMaxWidth().padding(horizontal = 14.dp).clip(RoundedCornerShape(26.dp)).background(Color.White)
                            .border(1.dp, Color(0x14000000), RoundedCornerShape(26.dp)).padding(horizontal = 14.dp, vertical = 6.dp),
                    ) {
                        for (i in 3 until l.size) {
                            val f = l[i]
                            val sayaIni = f.id == myFamilyId
                            Row(
                                Modifier.fillMaxWidth().clip(RoundedCornerShape(14.dp))
                                    .background(if (sayaIni) Color(0xFFFFF0F7) else Color.Transparent)
                                    .clickable { onOpenFamily(f.id) }.padding(vertical = 12.dp),
                                verticalAlignment = Alignment.CenterVertically,
                            ) {
                                Text("${i + 1}", color = FM_INK, fontSize = 16.sp, fontWeight = FontWeight.ExtraBold, modifier = Modifier.width(34.dp), textAlign = TextAlign.Center)
                                FmAvatar(f.logoB64, f.name, 58.dp, ring = true)
                                Spacer(Modifier.width(12.dp))
                                Column(Modifier.weight(1f)) {
                                    Text(f.name, color = FM_INK, fontSize = 15.sp, fontWeight = FontWeight.Bold, maxLines = 1, overflow = TextOverflow.Ellipsis)
                                    Spacer(Modifier.height(4.dp))
                                    Row(verticalAlignment = Alignment.CenterVertically) {
                                        Text(pemilik[f.id] ?: "", color = FM_SOFT, fontSize = 12.sp, maxLines = 1, overflow = TextOverflow.Ellipsis, modifier = Modifier.weight(1f, fill = false))
                                        Spacer(Modifier.width(8.dp))
                                        Box(Modifier.clip(RoundedCornerShape(50)).background(Color(0xFFFFE9F3)).padding(horizontal = 9.dp, vertical = 3.dp)) {
                                            Text("${f.memberCount}/${familyCapacity(familyLevel(f.exp))}", color = FM_PINK, fontSize = 11.sp, fontWeight = FontWeight.Bold)
                                        }
                                    }
                                }
                                Column(horizontalAlignment = Alignment.End) {
                                    Row(verticalAlignment = Alignment.CenterVertically) {
                                        Box(Modifier.size(18.dp).clip(CircleShape).background(FM_GOLD), contentAlignment = Alignment.Center) { FmIcon("coin", 12.dp, Color(0xFF3D2A00)) }
                                        Spacer(Modifier.width(5.dp))
                                        Text(fmShort(f.exp), color = FM_INK, fontSize = 15.sp, fontWeight = FontWeight.ExtraBold)
                                    }
                                    Text("${fmShort(f.exp)} pts", color = FM_SOFT, fontSize = 11.sp)
                                }
                            }
                            if (i < l.size - 1) Box(Modifier.fillMaxWidth().padding(start = 46.dp).height(1.dp).background(Color(0x14000000)))
                        }
                    }
                }
            }
        }
    }
}

/** Kartu podium juara 1 sampai 3: gradien, logo di bingkai, nama, pemilik, jumlah member, dan poin. */
@Composable
private fun PodiumCard(rank: Int, f: Family, pemilik: String?, onOpen: (String) -> Unit) {
    val (warna, medali) = when (rank) {
        1 -> listOf(Color(0xFF4A0F3F), Color(0xFFB0206A), Color(0xFFFF3D8B)) to Color(0xFFFFC928)
        2 -> listOf(Color(0xFF3F5BFF), Color(0xFF5E7BFF), Color(0xFF9B6BFF)) to Color(0xFF8FA6FF)
        else -> listOf(Color(0xFFFF8A3D), Color(0xFFFF5E7A), Color(0xFFE0388F)) to Color(0xFFFFA25E)
    }
    val tinggi = if (rank == 1) 262.dp else 232.dp
    val logo = if (rank == 1) 112.dp else 88.dp
    Box(Modifier.fillMaxWidth(), contentAlignment = Alignment.TopCenter) {
        // lencana nomor di atas kartu
        Box(
            Modifier.align(Alignment.TopCenter).size(34.dp).clip(RoundedCornerShape(topStart = 12.dp, topEnd = 12.dp, bottomStart = 4.dp, bottomEnd = 4.dp)).background(medali),
            contentAlignment = Alignment.Center,
        ) { Text("$rank", color = Color.White, fontSize = 16.sp, fontWeight = FontWeight.ExtraBold) }
        Column(
            Modifier.padding(top = 22.dp).fillMaxWidth().height(tinggi).clip(RoundedCornerShape(26.dp))
                .background(Brush.verticalGradient(warna)).clickable { onOpen(f.id) }.padding(horizontal = 6.dp, vertical = 12.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
        ) {
            Box(Modifier.size(logo + 8.dp).clip(RoundedCornerShape(logo * 0.26f)).border(3.dp, medali, RoundedCornerShape(logo * 0.26f)).padding(3.dp), contentAlignment = Alignment.Center) {
                FmAvatar(f.logoB64, f.name, logo)
            }
            Spacer(Modifier.height(8.dp))
            Text(f.name, color = Color.White, fontSize = if (rank == 1) 16.sp else 14.sp, fontWeight = FontWeight.ExtraBold, maxLines = 1, overflow = TextOverflow.Ellipsis)
            Text(pemilik ?: "", color = Color(0xD9FFFFFF), fontSize = 11.sp, maxLines = 1, overflow = TextOverflow.Ellipsis)
            Spacer(Modifier.height(6.dp))
            Box(Modifier.clip(RoundedCornerShape(50)).background(Color(0x33FFFFFF)).padding(horizontal = 12.dp, vertical = 4.dp)) {
                Text("${f.memberCount}/${familyCapacity(familyLevel(f.exp))}", color = Color.White, fontSize = 11.sp, fontWeight = FontWeight.Bold)
            }
            Spacer(Modifier.weight(1f))
            Row(
                Modifier.clip(RoundedCornerShape(50)).background(Color(0x40000000)).padding(horizontal = 12.dp, vertical = 7.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Box(Modifier.size(18.dp).clip(CircleShape).background(FM_GOLD), contentAlignment = Alignment.Center) { FmIcon("coin", 12.dp, Color(0xFF3D2A00)) }
                Spacer(Modifier.width(6.dp))
                Text(fmShort(f.exp), color = Color.White, fontSize = 14.sp, fontWeight = FontWeight.ExtraBold)
            }
        }
    }
}

@Composable
private fun FamilySearchScreen(myUid: String, myName: String, myAvatar: String?, onBack: () -> Unit) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    var q by remember { mutableStateOf("") }
    var results by remember { mutableStateOf<List<Family>?>(null) }
    var busy by remember { mutableStateOf(false) }

    fun toast(s: String) = Toast.makeText(context, s, Toast.LENGTH_SHORT).show()

    fun doSearch() {
        busy = true
        scope.launch {
            results = try { FamilyRepo.search(q) } catch (e: kotlinx.coroutines.CancellationException) { throw e } catch (e: Exception) { emptyList() }
            busy = false
        }
    }

    LaunchedEffect(Unit) { results = try { FamilyRepo.topFamilies() } catch (e: kotlinx.coroutines.CancellationException) { throw e } catch (e: Exception) { emptyList() } }

    SubPage("Cari Family", onBack) {
        Column(Modifier.fillMaxSize().padding(horizontal = 12.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                OutlinedTextField(
                    q, { q = it }, singleLine = true, modifier = Modifier.weight(1f),
                    placeholder = { Text(tr("Nama atau ID family")) }, shape = RoundedCornerShape(12.dp),
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedTextColor = Color.White, unfocusedTextColor = Color.White, cursorColor = Gold,
                        focusedBorderColor = Gold, unfocusedBorderColor = Color(0xFF2D2822),
                    ),
                )
                Spacer(Modifier.width(8.dp))
                YellowButton(if (busy) "..." else "Cari", enabled = !busy) { doSearch() }
            }
            Spacer(Modifier.height(8.dp))
            val l = results
            if (l != null && l.isEmpty()) Text(tr("Family tidak ditemukan"), color = Color(0xFF8A8A8A), modifier = Modifier.padding(24.dp))
            LazyColumn(Modifier.fillMaxSize()) {
                items(l ?: emptyList()) { f ->
                    Row(Modifier.fillMaxWidth().padding(vertical = 5.dp).clip(RoundedCornerShape(10.dp)).background(CardBlack).padding(10.dp), verticalAlignment = Alignment.CenterVertically) {
                        FamilyLogo(f.logoB64, 50.dp)
                        Spacer(Modifier.width(10.dp))
                        Column(Modifier.weight(1f)) {
                            Text(f.name, color = Color.White, fontSize = 16.sp, maxLines = 1, overflow = TextOverflow.Ellipsis)
                            Text(tr("ID:${f.numId} · ${f.memberCount} anggota · 🛡 ${f.label}"), color = Color(0xFF9AB5B0), fontSize = 12.sp)
                        }
                        Text(
                            if (f.needApproval) "Ajukan" else "Gabung", color = Color(0xFF3D2A00),
                            modifier = Modifier.clip(RoundedCornerShape(50)).background(YellowBtn).clickable {
                                scope.launch {
                                    val err = FamilyRepo.join(f.id, myUid, myName, myAvatar)
                                    when (err) {
                                        null -> { toast(tr("Berhasil bergabung")); onBack() }
                                        "REQUEST_SENT" -> toast(tr("Permintaan dikirim, tunggu persetujuan admin"))
                                        else -> toast(err.orEmpty())
                                    }
                                }
                            }.padding(horizontal = 16.dp, vertical = 8.dp),
                        )
                    }
                }
            }
        }
    }
}

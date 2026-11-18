package com.rezochatvoice.exceo

import android.Manifest
import android.os.Build
import android.widget.Toast
import androidx.activity.compose.BackHandler
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
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
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.launch

private val Hijau = Color(0xFF1DE9B6)
private val Kuning = Color(0xFFF2B72B)
private val LatarTerang = Color(0xFFF3F5F5)

/** Layar "Daftar putar": daftar lagu tersimpan, cari, hapus, dan tombol Tambah musik. */
@Composable
fun LayarDaftarPutar(
    canPlay: Boolean,
    onUnmute: () -> Unit,
    onMainkan: (Int) -> Unit,
    onTutup: () -> Unit,
) {
    val context = LocalContext.current
    var cari by remember { mutableStateOf("") }
    var modeHapus by remember { mutableStateOf(false) }
    val terpilih = remember { mutableStateListOf<String>() }
    var lokalTerbuka by remember { mutableStateOf(false) }
    BackHandler { if (modeHapus) { modeHapus = false; terpilih.clear() } else onTutup() }

    if (lokalTerbuka) {
        LayarMusikLokal(onTutup = { lokalTerbuka = false })
        return
    }

    Box(Modifier.fillMaxSize().background(LatarTerang)) {
        Column(Modifier.fillMaxSize().statusBarsPadding()) {
            Row(
                Modifier.fillMaxWidth().padding(horizontal = 14.dp, vertical = 12.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Text("\u2039", color = Color.Black, fontSize = 32.sp, modifier = Modifier.clickable { onTutup() }.padding(horizontal = 6.dp))
                Text("Daftar putar", color = Color.Black, fontSize = 19.sp, textAlign = TextAlign.Center, modifier = Modifier.weight(1f))
                Text(
                    if (modeHapus) (if (terpilih.isEmpty()) "Batal" else "Hapus (" + terpilih.size + ")") else "Hapus",
                    color = Hijau,
                    fontSize = 16.sp,
                    modifier = Modifier.clickable {
                        if (!modeHapus) {
                            modeHapus = true
                        } else if (terpilih.isEmpty()) {
                            modeHapus = false
                        } else {
                            MusicEngine.hapusLagu(context, terpilih.toList())
                            terpilih.clear()
                            modeHapus = false
                        }
                    }.padding(6.dp),
                )
            }
            Box(
                Modifier.padding(horizontal = 14.dp).fillMaxWidth().clip(RoundedCornerShape(26.dp)).background(Color.White)
                    .padding(horizontal = 18.dp, vertical = 12.dp),
            ) {
                if (cari.isEmpty()) Text("Cari musik", color = Color(0xFF9A9A9A), fontSize = 15.sp, modifier = Modifier.align(Alignment.Center))
                androidx.compose.foundation.text.BasicTextField(
                    value = cari,
                    onValueChange = { cari = it },
                    singleLine = true,
                    textStyle = androidx.compose.ui.text.TextStyle(color = Color.Black, fontSize = 15.sp),
                    modifier = Modifier.fillMaxWidth(),
                )
            }
            Spacer(Modifier.height(6.dp))
            val daftar = MusicEngine.playlist
            val tampil = daftar.withIndex().filter { cari.isBlank() || it.value.title.contains(cari, ignoreCase = true) }
            if (daftar.isEmpty()) {
                Box(Modifier.weight(1f).fillMaxWidth(), contentAlignment = Alignment.Center) {
                    Text("Daftar putar masih kosong.\nKetuk Tambah musik untuk mengambil musik dari HP.", color = Color(0xFF7A7A7A), fontSize = 14.sp, textAlign = TextAlign.Center)
                }
            } else {
                LazyColumn(Modifier.weight(1f).fillMaxWidth()) {
                    items(tampil, key = { it.value.path }) { iv ->
                        val t = iv.value
                        val aktif = iv.index == MusicEngine.current
                        val dipilih = terpilih.contains(t.path)
                        Row(
                            Modifier.fillMaxWidth().clickable {
                                if (modeHapus) {
                                    if (dipilih) terpilih.remove(t.path) else terpilih.add(t.path)
                                } else if (!canPlay) {
                                    Toast.makeText(context, "Naik mic dulu untuk memutar musik", Toast.LENGTH_SHORT).show()
                                } else {
                                    onUnmute()
                                    onMainkan(iv.index)
                                    onTutup()
                                }
                            }.padding(horizontal = 18.dp, vertical = 17.dp),
                            verticalAlignment = Alignment.CenterVertically,
                        ) {
                            if (modeHapus) {
                                Box(
                                    Modifier.size(22.dp).clip(CircleShape)
                                        .background(if (dipilih) Hijau else Color.Transparent)
                                        .border(2.dp, Hijau, CircleShape),
                                )
                                Spacer(Modifier.width(12.dp))
                            }
                            Text(
                                t.title,
                                color = if (aktif) Hijau else Color(0xFF222222),
                                fontSize = 15.sp,
                                maxLines = 1,
                                overflow = TextOverflow.Ellipsis,
                                modifier = Modifier.weight(1f),
                            )
                        }
                        Box(Modifier.fillMaxWidth().height(1.dp).background(Color(0xFFE6E8E8)))
                    }
                }
            }
            Box(
                Modifier.padding(horizontal = 16.dp, vertical = 12.dp).navigationBarsPadding().fillMaxWidth()
                    .clip(RoundedCornerShape(30.dp)).background(Kuning)
                    .clickable { lokalTerbuka = true }.padding(vertical = 15.dp),
                contentAlignment = Alignment.Center,
            ) { Text("Tambah musik", color = Color(0xFF3A2A00), fontSize = 16.sp) }
        }
    }
}

/**
 * Layar "Musik lokal": memindai musik di HP otomatis, pilih satu atau sekaligus,
 * lalu "Tambah ke daftar putar" menyimpannya di aplikasi.
 */
@Composable
fun LayarMusikLokal(onTutup: () -> Unit) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    var cari by remember { mutableStateOf("") }
    var memindai by remember { mutableStateOf(true) }
    var menyalin by remember { mutableStateOf(false) }
    var izinDitolak by remember { mutableStateOf(false) }
    var semua by remember { mutableStateOf<List<LaguLokal>>(emptyList()) }
    val terpilih = remember { mutableStateListOf<String>() }
    BackHandler { if (!menyalin) onTutup() }

    fun pindaiUlang() {
        scope.launch {
            memindai = true
            semua = MusikLokal.pindai(context)
            memindai = false
        }
    }
    val izin = rememberLauncherForActivityResult(ActivityResultContracts.RequestPermission()) { boleh ->
        if (boleh) { izinDitolak = false; pindaiUlang() } else { izinDitolak = true; memindai = false }
    }
    val perluIzin = if (Build.VERSION.SDK_INT >= 33) Manifest.permission.READ_MEDIA_AUDIO else Manifest.permission.READ_EXTERNAL_STORAGE
    LaunchedEffect(Unit) {
        val sudah = androidx.core.content.ContextCompat.checkSelfPermission(context, perluIzin) ==
            android.content.pm.PackageManager.PERMISSION_GRANTED
        if (sudah) pindaiUlang() else izin.launch(perluIzin)
    }

    val sudahAda = MusicEngine.playlist.map { it.title }.toSet()
    val tampil = semua.filter { cari.isBlank() || it.judul.contains(cari, ignoreCase = true) }
    val semuaDipilih = tampil.isNotEmpty() && tampil.all { terpilih.contains(it.uri) }

    Box(Modifier.fillMaxSize().background(LatarTerang)) {
        Column(Modifier.fillMaxSize().statusBarsPadding()) {
            Row(Modifier.fillMaxWidth().padding(horizontal = 14.dp, vertical = 12.dp), verticalAlignment = Alignment.CenterVertically) {
                Text("\u2039", color = Color.Black, fontSize = 32.sp, modifier = Modifier.clickable { if (!menyalin) onTutup() }.padding(horizontal = 6.dp))
                Text("Musik lokal", color = Color.Black, fontSize = 19.sp, textAlign = TextAlign.Center, modifier = Modifier.weight(1f))
                Text("Pindai otomatis", color = Hijau, fontSize = 15.sp, modifier = Modifier.clickable { if (!memindai) pindaiUlang() }.padding(6.dp))
            }
            Box(
                Modifier.padding(horizontal = 14.dp).fillMaxWidth().clip(RoundedCornerShape(26.dp)).background(Color.White)
                    .padding(horizontal = 18.dp, vertical = 12.dp),
            ) {
                if (cari.isEmpty()) Text("Cari musik lokal", color = Color(0xFF9A9A9A), fontSize = 15.sp, modifier = Modifier.align(Alignment.Center))
                androidx.compose.foundation.text.BasicTextField(
                    value = cari, onValueChange = { cari = it }, singleLine = true,
                    textStyle = androidx.compose.ui.text.TextStyle(color = Color.Black, fontSize = 15.sp),
                    modifier = Modifier.fillMaxWidth(),
                )
            }
            Spacer(Modifier.height(6.dp))
            Box(Modifier.weight(1f).fillMaxWidth()) {
                when {
                    memindai -> Text("Sedang memindai musik lokal untuk Anda...", color = Color(0xFF444444), fontSize = 16.sp, textAlign = TextAlign.Center, modifier = Modifier.align(Alignment.Center).padding(24.dp))
                    izinDitolak -> Text("Izin membaca musik ditolak.\nBuka Pengaturan HP > Aplikasi > Izin, lalu izinkan Musik dan audio.", color = Color(0xFF444444), fontSize = 14.sp, textAlign = TextAlign.Center, modifier = Modifier.align(Alignment.Center).padding(24.dp))
                    tampil.isEmpty() -> Text("Tidak ada musik ditemukan di HP ini.", color = Color(0xFF7A7A7A), fontSize = 14.sp, modifier = Modifier.align(Alignment.Center))
                    else -> LazyColumn(Modifier.fillMaxSize()) {
                        items(tampil, key = { it.uri }) { l ->
                            val dipilih = terpilih.contains(l.uri)
                            Row(
                                Modifier.fillMaxWidth().clickable { if (dipilih) terpilih.remove(l.uri) else terpilih.add(l.uri) }
                                    .padding(horizontal = 18.dp, vertical = 17.dp),
                                verticalAlignment = Alignment.CenterVertically,
                            ) {
                                Box(
                                    Modifier.size(24.dp).clip(CircleShape)
                                        .background(if (dipilih) Hijau else Color.Transparent)
                                        .border(2.dp, Hijau, CircleShape),
                                    contentAlignment = Alignment.Center,
                                ) { if (dipilih) Text("\u2713", color = Color.White, fontSize = 14.sp) }
                                Spacer(Modifier.width(14.dp))
                                Column(Modifier.weight(1f)) {
                                    Text(l.judul, color = Color(0xFF222222), fontSize = 16.sp, maxLines = 1, overflow = TextOverflow.Ellipsis)
                                    if (sudahAda.contains(l.judul)) Text("Sudah ada di daftar putar", color = Color(0xFF8A8A8A), fontSize = 11.sp)
                                }
                                Text(MusikLokal.format(l.durasiMs), color = Color(0xFF666666), fontSize = 14.sp)
                            }
                            Box(Modifier.fillMaxWidth().height(1.dp).background(Color(0xFFE6E8E8)))
                        }
                    }
                }
            }
            Row(
                Modifier.fillMaxWidth().background(Color.White).navigationBarsPadding().padding(horizontal = 16.dp, vertical = 12.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Row(
                    Modifier.clickable {
                        if (semuaDipilih) terpilih.clear() else { terpilih.clear(); terpilih.addAll(tampil.map { it.uri }) }
                    },
                    verticalAlignment = Alignment.CenterVertically,
                ) {
                    Box(
                        Modifier.size(26.dp).clip(CircleShape).background(if (semuaDipilih) Hijau else Color.Transparent).border(2.dp, Hijau, CircleShape),
                        contentAlignment = Alignment.Center,
                    ) { if (semuaDipilih) Text("\u2713", color = Color.White, fontSize = 15.sp) }
                    Spacer(Modifier.width(10.dp))
                    Text("Pilih semua", color = Color(0xFF222222), fontSize = 16.sp)
                }
                Spacer(Modifier.weight(1f))
                val aktif = terpilih.isNotEmpty() && !menyalin
                Box(
                    Modifier.clip(RoundedCornerShape(30.dp)).background(if (aktif) Kuning else Color(0xFFD9D9D9))
                        .clickable(enabled = aktif) {
                            val pilihan = semua.filter { terpilih.contains(it.uri) }
                            scope.launch {
                                menyalin = true
                                val baru = MusikLokal.salin(context, pilihan)
                                MusicEngine.tambahLagu(context, baru)
                                menyalin = false
                                Toast.makeText(
                                    context,
                                    if (baru.isNotEmpty()) baru.size.toString() + " musik ditambahkan ke daftar putar" else "Gagal menyalin musik",
                                    Toast.LENGTH_SHORT,
                                ).show()
                                if (baru.isNotEmpty()) onTutup()
                            }
                        }.padding(horizontal = 28.dp, vertical = 14.dp),
                    contentAlignment = Alignment.Center,
                ) {
                    Text(
                        if (menyalin) "Menyalin..." else if (terpilih.isEmpty()) "Tambah ke daftar putar" else "Tambah ke daftar putar (" + terpilih.size + ")",
                        color = if (aktif) Color(0xFF3A2A00) else Color(0xFF555555),
                        fontSize = 16.sp,
                    )
                }
            }
        }
    }
}

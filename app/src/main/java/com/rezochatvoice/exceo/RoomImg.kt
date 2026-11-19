package com.rezochatvoice.exceo

import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.mutableStateMapOf
import androidx.compose.runtime.remember
import androidx.compose.ui.graphics.ImageBitmap
import androidx.compose.ui.graphics.asAndroidBitmap
import androidx.compose.ui.graphics.asImageBitmap
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.coroutines.tasks.await

/**
 * Foto dan latar room sengaja TIDAK ikut di daftar room Realtime Database.
 *
 * Dulu base64 foto ikut ditulis ke roomsPub. Akibatnya setiap HP mengunduh
 * gambar semua room setiap kali daftar room berubah, dan kuota unduhan
 * database meledak (ratusan GB per bulan). Sekarang yang ada di roomsPub hanya
 * teks ringan, dan gambar diambil sekali per room dari Firestore lalu disimpan
 * di memori selama aplikasi berjalan.
 */
object RoomImg {
    val foto = mutableStateMapOf<String, String?>()
    val latar = mutableStateMapOf<String, String?>()

    private val sudah = HashSet<String>()
    private val sedang = HashSet<String>()

    private fun sp() = com.google.firebase.FirebaseApp.getInstance().applicationContext
        .getSharedPreferences("room_img_cache", android.content.Context.MODE_PRIVATE)

    /** Simpan gambar room di HP supaya tidak diunduh lagi setiap aplikasi dibuka. */
    private fun simpanDisk(id: String) {
        try {
            sp().edit()
                .putString(id + "_foto", foto[id] ?: "")
                .putString(id + "_latar", latar[id] ?: "")
                .apply()
        } catch (e: Exception) {
        }
    }

    /** Ambil gambar room sekali saja. Panggilan berikutnya memakai memori/HP. */
    suspend fun muat(id: String, paksa: Boolean = false) {
        if (id.isBlank()) return
        if (!paksa && (sudah.contains(id) || sedang.contains(id))) return
        // Simpanan di HP dipakai lebih dulu: menghemat kuota internet.
        if (!paksa && !foto.containsKey(id)) {
            try {
                val f = sp().getString(id + "_foto", null)
                val l = sp().getString(id + "_latar", null)
                if (f != null || l != null) {
                    if (!f.isNullOrBlank()) foto[id] = f
                    if (!l.isNullOrBlank()) latar[id] = l
                    sudah.add(id)
                    return
                }
            } catch (e: Exception) {
            }
        }
        sedang.add(id)
        var fotoAda = false
        try {
            // Sumber utama: roomsBg (hanya satu room, bukan seluruh daftar).
            val s = Rtdb.ref("roomsBg/$id").get().await()
            val p = s.child("photo").getValue(String::class.java)
            val b = s.child("bg").getValue(String::class.java)
            if (!p.isNullOrBlank() || !b.isNullOrBlank()) {
                foto[id] = p
                latar[id] = b
                fotoAda = true
                simpanDisk(id)
            }
        } catch (e: kotlinx.coroutines.CancellationException) {
            throw e
        } catch (e: Exception) { }
        try {
            // Cadangan: dokumen room di Firestore (room lama).
            val perluFoto = !fotoAda || foto[id].isNullOrBlank()
            val perluBg = !fotoAda || latar[id].isNullOrBlank()
            if (perluFoto || perluBg) {
                val d = FirebaseFirestore.getInstance().collection("rooms").document(id).get().await()
                if (perluFoto) foto[id] = d.getString("photoB64")
                if (perluBg) latar[id] = d.getString("backgroundB64")
            }
        } catch (e: kotlinx.coroutines.CancellationException) {
            throw e
        } catch (e: Exception) {
            if (!sudah.contains(id)) {
                if (!fotoAda) foto[id] = null
                if (!fotoAda) latar[id] = null
            }
        } finally {
            sedang.remove(id)
            sudah.add(id)
        }
    }

    fun simpan(id: String, photo: String?, background: String?) {
        if (id.isBlank()) return
        if (photo != null) foto[id] = photo
        if (background != null) latar[id] = background
        sudah.add(id)
    }

    fun lupakan(id: String) {
        foto.remove(id)
        latar.remove(id)
        sudah.remove(id)
    }
}

@Composable
fun rememberRoomPhoto(r: RoomInfo): ImageBitmap? {
    LaunchedEffect(r.id) { RoomImg.muat(r.id) }
    val b64 = RoomImg.foto[r.id] ?: r.photoB64
    return remember(b64) { ProfileRepo.decodeB64Scaled(b64, 512) }
}

@Composable
fun rememberRoomBg(r: RoomInfo): ImageBitmap? {
    LaunchedEffect(r.id) { RoomImg.muat(r.id) }
    val b64 = RoomImg.latar[r.id] ?: r.backgroundB64
    return remember(b64) { ProfileRepo.decodeB64Scaled(b64, 1280) }
}

/**
 * Latar room yang sudah disiapkan sekali untuk ukuran layar ini: gambar
 * dipotong sesuai layar dan lapisan gelap ikut dipanggang ke dalam bitmap.
 *
 * Dibuat setengah ukuran layar supaya hemat memori, dan seluruh prosesnya
 * dibungkus supaya kegagalan apa pun (termasuk kehabisan memori) tidak
 * membuat aplikasi tertutup. Kalau gagal, null dikembalikan dan layar
 * memakai gambar biasa.
 */
@androidx.compose.runtime.Composable
fun LatarRoomSiap(bmp: ImageBitmap): ImageBitmap? {
    val context = androidx.compose.ui.platform.LocalContext.current
    return androidx.compose.runtime.remember(bmp) {
        try {
            val dm = context.resources.displayMetrics
            val w = (dm.widthPixels / 2).coerceIn(1, 1080)
            val h = (dm.heightPixels / 2).coerceIn(1, 1200)
            val sumber = bmp.asAndroidBitmap()
            if (sumber.width <= 0 || sumber.height <= 0) return@remember null
            val skala = maxOf(w.toFloat() / sumber.width, h.toFloat() / sumber.height)
            val hasil = android.graphics.Bitmap.createBitmap(w, h, android.graphics.Bitmap.Config.ARGB_8888)
            val kanvas = android.graphics.Canvas(hasil)
            val m = android.graphics.Matrix().apply {
                postScale(skala, skala)
                postTranslate((w - sumber.width * skala) / 2f, (h - sumber.height * skala) / 2f)
            }
            kanvas.drawBitmap(sumber, m, android.graphics.Paint(android.graphics.Paint.FILTER_BITMAP_FLAG))
            kanvas.drawColor(0x88000000)
            hasil.asImageBitmap()
        } catch (t: Throwable) {
            // Termasuk OutOfMemoryError: jangan sampai aplikasi tertutup.
            null
        }
    }
}

package com.rezochatvoice.exceo

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Matrix
import android.net.Uri
import android.util.Base64
import androidx.compose.ui.graphics.ImageBitmap
import androidx.compose.ui.graphics.asImageBitmap
import androidx.exifinterface.media.ExifInterface
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.SetOptions
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.tasks.await
import kotlinx.coroutines.withContext
import java.io.ByteArrayOutputStream
import java.util.Locale
import kotlin.math.max
import kotlin.math.min

/** Data profil yang bisa diedit. gender: "M", "F", atau "" (belum diatur). */
data class ProfileData(
    val nickname: String = "",
    val gender: String = "",
    val countryCode: String = "ID",
    val birthday: String = "",
    val bio: String = "",
    val avatarB64: String? = null,
    val backgroundB64: String? = null,
)

data class Country(val code: String, val name: String) {
    val flag: String get() = flagEmoji(code)
}

fun flagEmoji(code: String): String {
    if (code.length != 2) return "🏳️"
    val up = code.uppercase(Locale.US)
    val a = Character.codePointAt(up, 0) - 'A'.code + 0x1F1E6
    val b = Character.codePointAt(up, 1) - 'A'.code + 0x1F1E6
    return String(Character.toChars(a)) + String(Character.toChars(b))
}

fun userIdFrom(email: String): String {
    val n = (email.lowercase().hashCode().toLong() and 0x7FFFFFFFL) % 90000000L + 10000000L
    return n.toString()
}

object ProfileRepo {
    private const val PREFS = "profile"

    val countries: List<Country> by lazy {
        val id = Locale("id")
        Locale.getISOCountries()
            .map { Country(it, Locale("", it).getDisplayCountry(id)) }
            .filter { it.name.isNotBlank() }
            .sortedBy { it.name }
    }

    fun countryName(code: String): String =
        countries.firstOrNull { it.code == code }?.name ?: code

    // ---------- Penyimpanan lokal (cache) ----------

    fun loadLocal(ctx: Context, email: String): ProfileData {
        val p = ctx.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
        fun k(n: String) = "$email|$n"
        return ProfileData(
            nickname = p.getString(k("nickname"), "") ?: "",
            gender = p.getString(k("gender"), "") ?: "",
            countryCode = p.getString(k("country"), "ID") ?: "ID",
            birthday = p.getString(k("birthday"), "") ?: "",
            bio = p.getString(k("bio"), "") ?: "",
            avatarB64 = p.getString(k("avatar"), null),
            backgroundB64 = p.getString(k("background"), null),
        )
    }

    fun saveLocal(ctx: Context, email: String, d: ProfileData) {
        fun k(n: String) = "$email|$n"
        ctx.getSharedPreferences(PREFS, Context.MODE_PRIVATE).edit()
            .putString(k("nickname"), d.nickname)
            .putString(k("gender"), d.gender)
            .putString(k("country"), d.countryCode)
            .putString(k("birthday"), d.birthday)
            .putString(k("bio"), d.bio)
            .putString(k("avatar"), d.avatarB64)
            .putString(k("background"), d.backgroundB64)
            .apply()
    }

    // ---------- Firestore: users/{uid} ----------

    suspend fun loadRemote(): ProfileData? {
        return try {
            val uid = FirebaseAuth.getInstance().currentUser?.uid ?: return null
            val doc = FirebaseFirestore.getInstance().collection("users").document(uid).get().await()
            if (!doc.exists() || doc.getBoolean("profileSaved") != true) return null
            ProfileData(
                nickname = doc.getString("nickname") ?: "",
                gender = doc.getString("gender") ?: "",
                countryCode = doc.getString("countryCode") ?: "ID",
                birthday = doc.getString("birthday") ?: "",
                bio = doc.getString("bio") ?: "",
                avatarB64 = doc.getString("avatarB64"),
                backgroundB64 = doc.getString("backgroundB64"),
            )
        } catch (e: kotlinx.coroutines.CancellationException) { throw e } catch (e: Exception) {
            null
        }
    }

    /**
     * Apakah akun ini sudah menyelesaikan layar pendaftaran? Dicek di Realtime Database
     * (pub/{uid}/welcomed). Akun lama yang sudah punya jenis kelamin / profil
     * tersimpan dianggap sudah selesai, jadi tidak dipaksa mengulang.
     * Return null kalau tidak bisa dipastikan (jaringan), supaya tidak salah menampilkan.
     */
    suspend fun isWelcomed(uid: String, localHasProfile: Boolean): Boolean? {
        if (localHasProfile) return true
        return try {
            val snap = kotlinx.coroutines.withTimeoutOrNull(6000L) {
                com.google.firebase.database.FirebaseDatabase.getInstance().reference
                    .child("pub").child(uid).get().await()
            } ?: return null
            if (snap.child("welcomed").getValue(Boolean::class.java) == true) return true
            val flag = kotlinx.coroutines.withTimeoutOrNull(4000L) {
                com.google.firebase.database.FirebaseDatabase.getInstance().reference
                    .child("welcomed").child(uid).get().await()
            }
            if (flag?.getValue(Boolean::class.java) == true) return true
            // Akun lama: sudah punya ID/nama/jenis kelamin tersimpan sebelum fitur ini ada.
            val g = snap.child("gender").getValue(String::class.java).orEmpty()
            val n = snap.child("name").getValue(String::class.java).orEmpty()
            if (g.isNotBlank() || n.isNotBlank()) return true
            val remote = loadRemote()
            remote != null && (remote.gender.isNotBlank() || remote.nickname.isNotBlank())
        } catch (e: kotlinx.coroutines.CancellationException) { throw e } catch (e: Exception) {
            null
        }
    }

    suspend fun markWelcomed(uid: String) {
        try {
            val root = com.google.firebase.database.FirebaseDatabase.getInstance().reference
            root.child("welcomed").child(uid).setValue(true).await()
            try { root.child("pub").child(uid).child("welcomed").setValue(true).await() } catch (e: Exception) { }
        } catch (e: kotlinx.coroutines.CancellationException) { throw e } catch (e: Exception) { }
    }

    suspend fun saveRemote(d: ProfileData): Throwable? {
        val uid = FirebaseAuth.getInstance().currentUser?.uid
            ?: return IllegalStateException("Belum login")
        return try {
            val data = hashMapOf<String, Any?>(
                "profileSaved" to true,
                "nickname" to d.nickname,
                "gender" to d.gender,
                "countryCode" to d.countryCode,
                "birthday" to d.birthday,
                "bio" to d.bio,
                "avatarB64" to d.avatarB64,
                "backgroundB64" to d.backgroundB64,
            )
            FirebaseFirestore.getInstance().collection("users").document(uid)
                .set(data, SetOptions.merge()).await()
            null
        } catch (e: kotlinx.coroutines.CancellationException) { throw e } catch (e: Exception) {
            e
        }
    }

    // ---------- Gambar ----------

    /**
     * Sama seperti decodeB64, tetapi diperkecil dulu (inSampleSize).
     * Latar room dan foto room diunggah dari galeri dan bisa berukuran besar;
     * kalau didekode apa adanya, bitmap raksasa itu memakan memori terus-menerus
     * sehingga layar tersendat, suara LiveKit putus-nyambung, dan ikon lencana
     * lambat muncul. Dipakai untuk gambar room saja.
     */
    /**
     * Versi kecil foto base64 untuk ditempel di node kursi mic.
     * Node seats dikirim ulang ke SEMUA penghuni room setiap kali ada yang naik
     * kursi, mute, atau turun. Kalau foto ukuran penuh ikut di sana, masuk room
     * orang lain terasa berat (ratusan KB per muat, dan berulang setiap update).
     * 96 px sudah cukup tajam untuk kursi mic.
     */
    fun avatarKecil(b64: String?, maxSide: Int = 96): String? {
        if (b64.isNullOrBlank()) return null
        return try {
            val bytes = Base64.decode(b64, Base64.NO_WRAP)
            val ukur = BitmapFactory.Options().apply { inJustDecodeBounds = true }
            BitmapFactory.decodeByteArray(bytes, 0, bytes.size, ukur)
            if (ukur.outWidth <= 0 || ukur.outHeight <= 0) return b64
            val sisi = maxOf(ukur.outWidth, ukur.outHeight)
            if (sisi <= maxSide) return b64
            var s = 1
            while (sisi / (s * 2) >= maxSide) s *= 2
            val bmp = BitmapFactory.decodeByteArray(
                bytes, 0, bytes.size, BitmapFactory.Options().apply { inSampleSize = s },
            ) ?: return b64
            val skala = maxSide.toFloat() / maxOf(bmp.width, bmp.height).toFloat()
            val w = (bmp.width * skala).toInt().coerceAtLeast(1)
            val h = (bmp.height * skala).toInt().coerceAtLeast(1)
            val kecil = Bitmap.createScaledBitmap(bmp, w, h, true)
            val out = ByteArrayOutputStream()
            kecil.compress(Bitmap.CompressFormat.JPEG, 70, out)
            if (kecil !== bmp) kecil.recycle()
            bmp.recycle()
            Base64.encodeToString(out.toByteArray(), Base64.NO_WRAP)
        } catch (e: kotlinx.coroutines.CancellationException) {
            throw e
        } catch (e: Exception) {
            b64
        }
    }

    fun decodeB64Scaled(b64: String?, maxSide: Int): ImageBitmap? {
        if (b64.isNullOrBlank()) return null
        return try {
            val bytes = Base64.decode(b64, Base64.NO_WRAP)
            val ukur = BitmapFactory.Options().apply { inJustDecodeBounds = true }
            BitmapFactory.decodeByteArray(bytes, 0, bytes.size, ukur)
            var s = 1
            val sisi = maxOf(ukur.outWidth, ukur.outHeight)
            if (sisi > 0) while (sisi / (s * 2) >= maxSide) s *= 2
            val opsi = BitmapFactory.Options().apply { inSampleSize = s }
            BitmapFactory.decodeByteArray(bytes, 0, bytes.size, opsi)?.asImageBitmap()
        } catch (e: kotlinx.coroutines.CancellationException) {
            throw e
        } catch (e: Exception) {
            null
        }
    }

    fun decodeB64(b64: String?): ImageBitmap? {
        if (b64.isNullOrBlank()) return null
        return try {
            val bytes = Base64.decode(b64, Base64.NO_WRAP)
            BitmapFactory.decodeByteArray(bytes, 0, bytes.size)?.asImageBitmap()
        } catch (e: kotlinx.coroutines.CancellationException) { throw e } catch (e: Exception) {
            null
        }
    }

    /**
     * Cache avatar yang sudah didekode. Dulu setiap sel kursi yang dibangun ulang
     * mendekode base64 lagi di thread UI, jadi pindah kursi terasa tersendat.
     * Sekarang hasil decode disimpan dan dipakai ulang.
     */
    // Batas memakai ukuran memori nyata (KB), bukan jumlah foto. Satu perempat dari
    // memori aplikasi dipakai untuk foto, jadi foto kursi dan chat tidak digusur
    // saat game dibuka lalu ditutup, dan room tidak perlu mendekode ulang.
    private val kuotaFotoKb: Int =
        (Runtime.getRuntime().maxMemory() / 1024L / 4L).coerceIn(16_384L, 96_000L).toInt()
    private val avatarCache = object : android.util.LruCache<String, ImageBitmap>(kuotaFotoKb / 2) {
        override fun sizeOf(key: String, value: ImageBitmap): Int =
            ((value.width.toLong() * value.height.toLong() * 4L) / 1024L).toInt().coerceAtLeast(1)
    }

    private fun kunciAvatar(b64: String): String =
        b64.length.toString() + ":" + b64.hashCode().toString(16)

    /** Baca dari cache saja, tanpa decode. Dipakai untuk bingkai pertama supaya tidak berkedip. */
    fun avatarCached(b64: String?): ImageBitmap? {
        if (b64.isNullOrBlank()) return null
        return avatarCache.get(kunciAvatar(b64))
    }

    /** Decode avatar di thread IO lalu simpan, supaya tidak diulang saat kursi dibuat ulang. */
    suspend fun decodeAvatar(b64: String?): ImageBitmap? {
        if (b64.isNullOrBlank()) return null
        val kunci = kunciAvatar(b64)
        avatarCache.get(kunci)?.let { return it }
        val bmp = kotlinx.coroutines.withContext(kotlinx.coroutines.Dispatchers.IO) { decodeB64(b64) }
        if (bmp != null) avatarCache.put(kunci, bmp)
        return bmp
    }

    /**
     * Avatar versi kecil untuk dipakai DI DALAM room: kursi mic, baris chat,
     * daftar gift, daftar tamu. Ukurannya mengikuti ukuran tampil di layar
     * (mis. kursi mic 64dp -> sekitar 170 px), bukan ukuran foto asli.
     * Tanpa ini, sepuluh kursi plus puluhan baris chat memegang bitmap besar
     * sekaligus dan room terasa berat. Layar profil tetap memakai foto asli.
     */
    private val avatarKecilCache = object : android.util.LruCache<String, ImageBitmap>(kuotaFotoKb / 2) {
        override fun sizeOf(key: String, value: ImageBitmap): Int =
            ((value.width.toLong() * value.height.toLong() * 4L) / 1024L).toInt().coerceAtLeast(1)
    }

    private fun kunciKecil(b64: String, px: Int): String = px.toString() + "|" + kunciAvatar(b64)

    fun avatarKecilCached(b64: String?, px: Int): ImageBitmap? {
        if (b64.isNullOrBlank()) return null
        return avatarKecilCache.get(kunciKecil(b64, px.coerceIn(48, 256)))
    }

    suspend fun decodeAvatarKecil(b64: String?, px: Int): ImageBitmap? {
        if (b64.isNullOrBlank()) return null
        val sisi = px.coerceIn(48, 256)
        val kunci = kunciKecil(b64, sisi)
        avatarKecilCache.get(kunci)?.let { return it }
        val bmp = kotlinx.coroutines.withContext(kotlinx.coroutines.Dispatchers.IO) {
            decodeB64Scaled(b64, sisi)
        }
        if (bmp != null) avatarKecilCache.put(kunci, bmp)
        return bmp
    }

    /**
     * Baca gambar dari galeri, perbaiki rotasi, (opsional) crop persegi,
     * perkecil, lalu jadikan JPEG base64 supaya muat di dokumen Firestore (<1MB).
     */
    suspend fun encodeImage(
        ctx: Context,
        uri: Uri,
        maxSide: Int,
        square: Boolean,
        quality: Int,
    ): String? = withContext(Dispatchers.IO) {
        try {
            val resolver = ctx.contentResolver
            val bounds = BitmapFactory.Options().apply { inJustDecodeBounds = true }
            resolver.openInputStream(uri)?.use { BitmapFactory.decodeStream(it, null, bounds) }
            if (bounds.outWidth <= 0 || bounds.outHeight <= 0) return@withContext null

            var sample = 1
            while (bounds.outWidth / sample > maxSide * 2 || bounds.outHeight / sample > maxSide * 2) sample *= 2
            val opts = BitmapFactory.Options().apply { inSampleSize = sample }
            val src = resolver.openInputStream(uri)?.use { BitmapFactory.decodeStream(it, null, opts) }
                ?: return@withContext null

            val orientation = try {
                resolver.openInputStream(uri)?.use {
                    ExifInterface(it).getAttributeInt(
                        ExifInterface.TAG_ORIENTATION,
                        ExifInterface.ORIENTATION_NORMAL,
                    )
                } ?: ExifInterface.ORIENTATION_NORMAL
            } catch (e: kotlinx.coroutines.CancellationException) { throw e } catch (e: Exception) {
                ExifInterface.ORIENTATION_NORMAL
            }

            val m = Matrix()
            when (orientation) {
                ExifInterface.ORIENTATION_ROTATE_90 -> m.postRotate(90f)
                ExifInterface.ORIENTATION_ROTATE_180 -> m.postRotate(180f)
                ExifInterface.ORIENTATION_ROTATE_270 -> m.postRotate(270f)
            }

            var x = 0
            var y = 0
            var w = src.width
            var h = src.height
            if (square) {
                val side = min(w, h)
                x = (w - side) / 2
                y = (h - side) / 2
                w = side
                h = side
            }
            val scale = maxSide.toFloat() / max(w, h)
            if (scale < 1f) m.postScale(scale, scale)

            val out: Bitmap = Bitmap.createBitmap(src, x, y, w, h, m, true)
            val bos = ByteArrayOutputStream()
            out.compress(Bitmap.CompressFormat.JPEG, quality, bos)
            Base64.encodeToString(bos.toByteArray(), Base64.NO_WRAP)
        } catch (e: kotlinx.coroutines.CancellationException) { throw e } catch (e: Exception) {
            null
        }
    }
}

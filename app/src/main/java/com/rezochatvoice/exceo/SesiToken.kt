package com.rezochatvoice.exceo

import android.util.Base64
import com.google.firebase.auth.FirebaseAuth
import kotlinx.coroutines.tasks.await
import org.json.JSONObject

/**
 * Satu pintu untuk token login Firebase.
 *
 * Firebase hanya memberi token berlaku 1 jam. Kalau token basi terus dipakai,
 * server dompet dan server suara menjawab 401 "token kadaluarsa" dan fitur
 * tampak rusak padahal jaringan sehat. Di sini token diperiksa masa berlakunya
 * sendiri (klaim exp), lalu disegarkan sebelum dipakai kalau sudah mau habis.
 */
object SesiToken {
    private var cache: String? = null
    private var uid: String? = null
    private var at = 0L

    /** Token dipakai ulang paling lama 20 menit, asal sisa umurnya masih cukup. */
    private const val PAKAI_MS = 20 * 60_000L

    /** Sisa umur token dalam detik, 0 kalau tidak terbaca. */
    fun sisaDetik(jwt: String): Long = try {
        val isi = jwt.split(".").getOrNull(1) ?: return 0L
        val mentah = Base64.decode(isi, Base64.URL_SAFE or Base64.NO_WRAP or Base64.NO_PADDING)
        JSONObject(String(mentah, Charsets.UTF_8)).optLong("exp", 0L)
    } catch (e: Exception) { 0L }

    private fun masihSegar(jwt: String): Boolean {
        val exp = sisaDetik(jwt)
        if (exp <= 0L) return false
        val sisa = exp - System.currentTimeMillis() / 1000L
        return sisa > 300L
    }

    fun lupakan() {
        cache = null
        uid = null
        at = 0L
    }

    /**
     * Token siap pakai. [paksa] = true selalu minta token baru ke Google
     * (dipakai setelah server menjawab 401).
     */
    suspend fun ambil(paksa: Boolean = false): String? {
        val u = FirebaseAuth.getInstance().currentUser ?: return null
        val c = cache
        if (!paksa && c != null && uid == u.uid &&
            System.currentTimeMillis() - at < PAKAI_MS && masihSegar(c)
        ) return c
        var t = try { u.getIdToken(false).await()?.token } catch (e: Exception) { null }
        if (t == null || !masihSegar(t)) {
            t = try { u.getIdToken(true).await()?.token } catch (e: Exception) { t }
        }
        if (t.isNullOrBlank()) return null
        if (masihSegar(t)) {
            cache = t
            uid = u.uid
            at = System.currentTimeMillis()
        } else {
            // Google tetap memberi token basi (jam HP meleset). Kirim apa adanya
            // supaya server yang memutuskan, jangan menahan user di layar kosong.
            cache = null
            uid = null
            at = 0L
        }
        return t
    }
}

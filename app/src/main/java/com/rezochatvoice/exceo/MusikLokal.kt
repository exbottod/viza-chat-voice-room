package com.rezochatvoice.exceo

import android.content.ContentUris
import android.content.Context
import android.provider.MediaStore
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.json.JSONArray
import org.json.JSONObject
import java.io.File

/** Satu lagu yang ditemukan di penyimpanan HP. */
data class LaguLokal(val uri: String, val judul: String, val durasiMs: Long)

/**
 * Pindai musik di HP lewat MediaStore (semua folder: Download, Music, WhatsApp, dll)
 * dan simpan daftar putar di berkas supaya tetap ada setelah aplikasi ditutup.
 */
object MusikLokal {
    private const val BERKAS = "daftar_putar.json"

    /** Cari semua musik di HP. Lagu pendek (di bawah 30 detik, biasanya nada dering) dilewati. */
    suspend fun pindai(context: Context): List<LaguLokal> = withContext(Dispatchers.IO) {
        val hasil = ArrayList<LaguLokal>()
        try {
            val koleksi = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI
            val kolom = arrayOf(
                MediaStore.Audio.Media._ID,
                MediaStore.Audio.Media.DISPLAY_NAME,
                MediaStore.Audio.Media.TITLE,
                MediaStore.Audio.Media.DURATION,
                MediaStore.Audio.Media.IS_MUSIC,
            )
            context.contentResolver.query(
                koleksi, kolom,
                MediaStore.Audio.Media.DURATION + " >= 30000", null,
                MediaStore.Audio.Media.DATE_ADDED + " DESC",
            )?.use { c ->
                val iId = c.getColumnIndexOrThrow(MediaStore.Audio.Media._ID)
                val iNama = c.getColumnIndexOrThrow(MediaStore.Audio.Media.DISPLAY_NAME)
                val iJudul = c.getColumnIndexOrThrow(MediaStore.Audio.Media.TITLE)
                val iDur = c.getColumnIndexOrThrow(MediaStore.Audio.Media.DURATION)
                while (c.moveToNext()) {
                    val id = c.getLong(iId)
                    val uri = ContentUris.withAppendedId(koleksi, id).toString()
                    var judul = c.getString(iJudul)?.trim().orEmpty()
                    if (judul.isBlank() || judul.startsWith("<")) {
                        judul = (c.getString(iNama) ?: "Musik").substringBeforeLast('.')
                    }
                    hasil.add(LaguLokal(uri, judul, c.getLong(iDur)))
                }
            }
        } catch (e: kotlinx.coroutines.CancellationException) {
            throw e
        } catch (e: Exception) {
        }
        hasil
    }

    fun format(ms: Long): String {
        val dtk = (ms / 1000).toInt()
        return "%02d:%02d".format(dtk / 60, dtk % 60)
    }

    /** Muat daftar putar yang tersimpan. Lagu yang berkasnya hilang dibuang. */
    fun muatDaftar(context: Context): List<MusicTrack> {
        return try {
            val f = File(context.filesDir, BERKAS)
            if (!f.exists()) return emptyList()
            val arr = JSONArray(f.readText())
            val daftar = ArrayList<MusicTrack>()
            for (i in 0 until arr.length()) {
                val o = arr.getJSONObject(i)
                val path = o.optString("path")
                if (path.isNotBlank() && File(path).exists()) {
                    daftar.add(MusicTrack(o.optString("title", "Musik"), path))
                }
            }
            daftar
        } catch (e: Exception) {
            emptyList()
        }
    }

    fun simpanDaftar(context: Context, daftar: List<MusicTrack>) {
        try {
            val arr = JSONArray()
            for (t in daftar) arr.put(JSONObject().put("title", t.title).put("path", t.path))
            File(context.filesDir, BERKAS).writeText(arr.toString())
        } catch (e: Exception) {
        }
    }

    /** Salin lagu pilihan ke penyimpanan aplikasi (kualitas asli, tanpa kompresi). */
    suspend fun salin(context: Context, pilihan: List<LaguLokal>): List<MusicTrack> =
        withContext(Dispatchers.IO) {
            val dir = File(context.filesDir, "musik").apply { mkdirs() }
            val hasil = ArrayList<MusicTrack>()
            for (l in pilihan) {
                try {
                    val aman = l.judul.replace(Regex("[^a-zA-Z0-9._-]"), "_").take(60)
                    val f = File(dir, System.currentTimeMillis().toString() + "_" + aman + ".mp3")
                    context.contentResolver.openInputStream(android.net.Uri.parse(l.uri))?.use { masuk ->
                        f.outputStream().use { keluar -> masuk.copyTo(keluar) }
                    } ?: continue
                    hasil.add(MusicTrack(l.judul, f.absolutePath))
                } catch (e: kotlinx.coroutines.CancellationException) {
                    throw e
                } catch (e: Exception) {
                }
            }
            hasil
        }
}

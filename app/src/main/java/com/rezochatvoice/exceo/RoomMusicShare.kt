package com.rezochatvoice.exceo

import android.media.MediaPlayer
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch
import kotlinx.coroutines.tasks.await
import java.io.File
import java.net.HttpURLConnection
import java.net.URL

/**
 * Musik room yang terdengar oleh SEMUA orang di room.
 *
 * Dulu musik hanya diputar lewat speaker HP pemutar, jadi user lain tidak
 * mendengarnya sama sekali (suara room lewat LiveKit, bukan speaker).
 *
 * Cara sekarang: lagu diunggah ke Supabase Storage, lalu tautannya ditulis ke
 * Realtime Database (roomMusic/{roomId}) bersama posisi dan waktu mulai.
 * Setiap HP di room memutar tautan yang sama dan menghitung posisinya dari
 * waktu mulai, jadi suara musik terdengar oleh semua dan tetap sejalan.
 */
object RoomMusicShare {
    // Lagu disimpan di VPS sendiri (/musik), bukan di storage pihak lain.
    private const val VPS = "https://viza.43-156-99-4.sslip.io"
    private const val BASE = "https://GANTI-PROJECT-ANDA.supabase.co"
    // Kunci publishable, sama seperti RoomImages/SupaRepo.
    private const val KEY = "GANTI_SUPABASE_KEY"
    private const val BUCKET = "chatimg"

    private val scope = CoroutineScope(SupervisorJob() + Dispatchers.IO)

    private var player: MediaPlayer? = null
    private var urlSekarang = ""
    private var siap = false
    private var roomId = ""
    @Volatile private var pollJob: Job? = null
    private var reg: Reg? = null
    private var stempel = 0L

    /** Posisi musik saat ini (ms) untuk semua HP. */
    fun posisiMs(): Int {
        val p = player ?: return 0
        return try { p.currentPosition } catch (e: Exception) { 0 }
    }

    fun durasiMs(): Int = try { player?.duration ?: -1 } catch (e: Exception) { -1 }

    private var volumeLokal = 100

    /** Volume pemutar bersama (0..100). */
    fun setVolume(v: Int) {
        volumeLokal = v.coerceIn(0, 100)
        val f = volumeLokal / 100f
        try { player?.setVolume(f, f) } catch (e: Exception) { }
    }

    /** Geser posisi lagu bersama; semua HP ikut pindah ke posisi ini. */
    suspend fun geser(room: String, url: String, judul: String, main: Boolean, pos: Long) {
        try { player?.let { if (it.isPlaying) it.seekTo(pos.toInt()) } } catch (e: Exception) { }
        siarkan(room, url, judul, main, pos)
    }

    fun adaLagu(): Boolean = urlSekarang.isNotBlank()

    /** Unggah satu file lagu ke VPS sendiri, hasilnya tautan publik. */
    suspend fun unggah(file: File): Pair<String?, String?> {
        return try {
            com.google.firebase.auth.FirebaseAuth.getInstance().currentUser?.uid
                ?: return null to "Belum login"
            if (!file.exists()) return null to "Berkas lagu tidak ada"
            if (file.length() > 30_000_000) return null to "Lagu terlalu besar (maks 30 MB)"
            val token = com.google.firebase.auth.FirebaseAuth.getInstance()
                .currentUser?.getIdToken(false)?.await()?.token
                ?: return null to "Sesi login habis, coba masuk ulang"
            val ext = (file.name.substringAfterLast('.', "mp3").lowercase().replace(Regex("[^a-z0-9]"), ""))
                .ifBlank { "mp3" }.take(4)
            val alamat = VPS + "/musik?t=" + java.net.URLEncoder.encode(token, "UTF-8") + "&ext=" + ext
            val conn = (URL(alamat).openConnection() as HttpURLConnection).apply {
                requestMethod = "POST"
                connectTimeout = 20000
                readTimeout = 180000
                doOutput = true
                setFixedLengthStreamingMode(file.length().toInt())
                setRequestProperty("Content-Type", "application/octet-stream")
            }
            file.inputStream().use { input ->
                conn.outputStream.use { out -> input.copyTo(out, 64 * 1024) }
            }
            val code = conn.responseCode
            val teks = (if (code in 200..299) conn.inputStream else conn.errorStream)
                ?.bufferedReader()?.use { it.readText() }.orEmpty()
            if (code !in 200..299) return null to "Unggah gagal ($code) " + teks.take(80)
            val url = org.json.JSONObject(teks).optString("url")
            if (!url.startsWith("http")) return null to "Server tidak memberi tautan lagu"
            url to null
        } catch (e: CancellationException) {
            throw e
        } catch (e: Exception) {
            null to (e.message ?: "Unggah gagal")
        }
    }

    /**
     * Simpan keadaan musik room di server VPS supaya semua HP mengikuti.
     * Dulu disimpan di Realtime Database, tetapi aturan tulis di sana sering
     * menolak, sehingga lagu cuma terdengar di HP pemutar. Server VPS selalu
     * menerima, jadi semua orang di room ikut mendengar.
     */
    suspend fun siarkan(room: String, url: String, judul: String, main: Boolean, pos: Long) {
        if (room.isBlank() || url.isBlank()) return
        var terkirim = false
        try {
            val balasan = kirimPost(
                "/musikroom",
                org.json.JSONObject()
                    .put("t", token())
                    .put("room", room)
                    .put("url", url)
                    .put("title", judul)
                    .put("playing", main)
                    .put("pos", pos),
            )
            terkirim = balasan != null
        } catch (e: CancellationException) {
            throw e
        } catch (e: Exception) {
            terkirim = false
        }
        // Cadangan: server bisa belum diperbarui atau sedang sibuk. Tulis juga ke
        // Realtime Database supaya HP lain tetap menerima lagunya.
        if (!terkirim) {
            try {
                Rtdb.ref("roomMusic/$room").updateChildren(
                    hashMapOf<String, Any?>(
                        "url" to url,
                        "title" to judul,
                        "playing" to main,
                        "pos" to pos,
                        "at" to System.currentTimeMillis(),
                    ),
                ).await()
            } catch (e: CancellationException) {
                throw e
            } catch (e: Exception) { }
        }
    }

    suspend fun hentikan(room: String) {
        if (room.isBlank()) return
        var beres = false
        try {
            beres = kirimPost(
                "/musikroom/hentikan",
                org.json.JSONObject().put("t", token()).put("room", room),
            ) != null
        } catch (e: Exception) { beres = false }
        if (!beres) {
            try { Rtdb.ref("roomMusic/$room").removeValue().await() } catch (e: Exception) { }
        }
    }

    private suspend fun token(): String =
        try {
            com.google.firebase.auth.FirebaseAuth.getInstance()
                .currentUser?.getIdToken(false)?.await()?.token.orEmpty()
        } catch (e: Exception) {
            ""
        }

    private suspend fun kirimPost(jalur: String, isi: org.json.JSONObject): String? =
        kotlinx.coroutines.withContext(Dispatchers.IO) {
            val c = (URL(VPS + jalur).openConnection() as HttpURLConnection).apply {
                requestMethod = "POST"
                connectTimeout = 10000
                readTimeout = 15000
                doOutput = true
                setRequestProperty("Content-Type", "application/json")
            }
            c.outputStream.use { it.write(isi.toString().toByteArray()) }
            val kode = c.responseCode
            val teks = (if (kode in 200..299) c.inputStream else c.errorStream)
                ?.bufferedReader()?.use { it.readText() }
            if (kode in 200..299) teks else null
        }

    /** Mulai mengikuti musik room. Dipanggil sekali saat masuk room. */
    fun observe(room: String) {
        if (room.isBlank()) return
        if (room == roomId && (pollJob != null || reg != null)) return
        lepas()
        roomId = room
        pollJob = scope.launch {
            while (true) {
                try { muatSekali(room) } catch (e: CancellationException) {
                    throw e
                } catch (e: Exception) { }
                delay(2000)
            }
        }
        // Jalur cadangan: Realtime Database. Dipakai kalau server belum diperbarui
        // atau lagu disiarkan oleh versi aplikasi yang masih memakai RTDB.
        try {
            reg = Rtdb.listen(Rtdb.ref("roomMusic/$room")) { s ->
                val url = s.child("url").getValue(String::class.java).orEmpty()
                val judul = s.child("title").getValue(String::class.java).orEmpty()
                val main = s.child("playing").getValue(Boolean::class.java) ?: false
                val pos = (s.child("pos").value as? Number)?.toLong() ?: 0L
                val at = (s.child("at").value as? Number)?.toLong() ?: 0L
                if (url.isBlank()) {
                    if (at == 0L) terapkanSumber("", "", false, 0L, 0L)
                } else {
                    terapkanSumber(url, judul, main, pos, at)
                }
            }
        } catch (e: Exception) { }
    }

    /** Pakai keadaan musik yang paling baru dari server maupun RTDB. */
    private fun terapkanSumber(url: String, judul: String, main: Boolean, pos: Long, at: Long) {
        if (at > 0L && at < stempel - 2000L) return
        if (at > 0L) stempel = at
        terapkan(url, judul, main, pos, at)
    }

    /** Ambil keadaan musik room sekali dari server. */
    private suspend fun muatSekali(room: String) {
        val t = token()
        if (t.isBlank()) return
        val teks = kotlinx.coroutines.withContext(Dispatchers.IO) {
            val alamat = VPS + "/musikroom?room=" + java.net.URLEncoder.encode(room, "UTF-8") +
                "&t=" + java.net.URLEncoder.encode(t, "UTF-8")
            val c = (URL(alamat).openConnection() as HttpURLConnection).apply {
                requestMethod = "GET"
                connectTimeout = 10000
                readTimeout = 15000
            }
            if (c.responseCode !in 200..299) return@withContext null
            c.inputStream.bufferedReader().use { it.readText() }
        } ?: return
        val o = org.json.JSONObject(teks)
        if (o.optInt("ada", 0) != 1) {
            terapkanSumber("", "", false, 0L, 0L)
            return
        }
        val url = o.optString("url")
        if (url.isBlank()) {
            terapkanSumber("", "", false, 0L, 0L)
            return
        }
        val main = o.optInt("playing", 0) == 1
        val pos = o.optLong("pos", 0L)
        val lewat = o.optLong("lewat", 0L)
        terapkanSumber(url, o.optString("title"), main, pos, System.currentTimeMillis() - lewat)
    }

    fun lepas() {
        pollJob?.cancel()
        pollJob = null
        try { reg?.remove() } catch (e: Exception) { }
        reg = null
        stempel = 0L
        roomId = ""
        try { player?.release() } catch (e: Exception) { }
        player = null
        urlSekarang = ""
        siap = false
    }

    private fun targetMs(pos: Long, at: Long): Int {
        if (at <= 0L) return pos.toInt()
        val lewat = (System.currentTimeMillis() - at).coerceAtLeast(0L)
        return (pos + lewat).toInt()
    }

    /** Terapkan keadaan dari database ke pemutar HP ini. */
    private fun terapkan(url: String, judul: String, main: Boolean, pos: Long, at: Long) {
        if (url.isBlank()) {
            try { player?.release() } catch (e: Exception) { }
            player = null
            urlSekarang = ""
            siap = false
            return
        }
        if (url != urlSekarang) {
            try { player?.release() } catch (e: Exception) { }
            player = null
            siap = false
            urlSekarang = url
            val mp = MediaPlayer()
            player = mp
            try {
                // Aplikasi sedang dalam mode panggilan suara. Tanpa sifat audio
                // media, lagu ikut jalur suara panggilan sehingga terdengar
                // pelan dan tidak jelas. Dengan USAGE_MEDIA + CONTENT_TYPE_MUSIC
                // lagu keluar lewat jalur musik seperti pemutar biasa.
                mp.setAudioAttributes(
                    android.media.AudioAttributes.Builder()
                        .setUsage(android.media.AudioAttributes.USAGE_MEDIA)
                        .setContentType(android.media.AudioAttributes.CONTENT_TYPE_MUSIC)
                        .build(),
                )
                mp.setDataSource(url)
                mp.setOnPreparedListener { p ->
                    siap = true
                    try { p.setVolume(volumeLokal / 100f, volumeLokal / 100f) } catch (e: Exception) { }
                    try {
                        p.seekTo(targetMs(pos, at))
                        if (main) p.start() else p.pause()
                    } catch (e: Exception) { }
                }
                mp.setOnCompletionListener { p ->
                    // Lagu habis: kabari room supaya semua ikut berhenti.
                    scope.launch { siarkan(roomId, url, judul, false, 0L) }
                    try { p.seekTo(0) } catch (e: Exception) { }
                }
                mp.prepareAsync()
            } catch (e: Exception) {
                player = null
                urlSekarang = ""
            }
            return
        }
        val p = player ?: return
        try {
            if (!siap) return
            if (main) {
                if (!p.isPlaying) {
                    p.seekTo(targetMs(pos, at))
                    p.start()
                }
            } else if (p.isPlaying) {
                p.pause()
                p.seekTo(targetMs(pos, at))
            } else {
                p.seekTo(targetMs(pos, at))
            }
        } catch (e: Exception) { }
    }
}

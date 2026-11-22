package com.rezochatvoice.exceo

import android.content.Context
import org.json.JSONArray
import org.json.JSONObject

/**
 * Simpanan terakhir isi room di HP (bukan di memori saja).
 *
 * Kenapa perlu: saat pemakai pindah ke WhatsApp atau APK lain, Android boleh
 * membuang proses Viza. Begitu kembali, aplikasi mulai dari nol: layar memuat
 * ulang, kursi kosong sesaat, foto dan bingkai diunduh lagi. Dengan simpanan ini
 * room terakhir langsung digambar apa adanya dari HP, lalu data baru menyusul di
 * belakang tanpa terlihat.
 */
object RoomCache {
    private const val NAMA = "room_cache"
    private fun sp(c: Context) = c.applicationContext.getSharedPreferences(NAMA, Context.MODE_PRIVATE)

    fun simpanInfo(c: Context, r: RoomInfo) {
        try {
            val o = JSONObject()
            o.put("id", r.id)
            o.put("roomNo", r.roomNo)
            o.put("name", r.name)
            o.put("ownerUid", r.ownerUid)
            o.put("ownerName", r.ownerName)
            o.put("photoB64", r.photoB64 ?: "")
            o.put("backgroundB64", r.backgroundB64 ?: "")
            o.put("announcement", r.announcement)
            o.put("micCount", r.micCount)
            o.put("lockHash", r.lockHash)
            o.put("online", r.online)
            o.put("lockedSeats", JSONArray(r.lockedSeats))
            o.put("admins", JSONArray(r.admins))
            o.put("pinned", r.pinned)
            o.put("pinnedAt", r.pinnedAt)
            sp(c).edit().putString("info_" + r.id, o.toString()).putString("terakhir", r.id).apply()
        } catch (e: Exception) {
        }
    }

    fun info(c: Context, id: String): RoomInfo? = try {
        val teks = sp(c).getString("info_" + id, null) ?: return null
        val o = JSONObject(teks)
        fun daftarAngka(k: String): List<Int> {
            val a = o.optJSONArray(k) ?: return emptyList()
            return (0 until a.length()).map { a.optInt(it) }
        }
        fun daftarTeks(k: String): List<String> {
            val a = o.optJSONArray(k) ?: return emptyList()
            return (0 until a.length()).map { a.optString(it) }
        }
        RoomInfo(
            id = o.optString("id"),
            roomNo = o.optString("roomNo"),
            name = o.optString("name"),
            ownerUid = o.optString("ownerUid"),
            ownerName = o.optString("ownerName"),
            photoB64 = o.optString("photoB64").ifBlank { null },
            backgroundB64 = o.optString("backgroundB64").ifBlank { null },
            announcement = o.optString("announcement"),
            micCount = o.optInt("micCount", 8),
            lockHash = o.optString("lockHash"),
            online = o.optInt("online", 0),
            lockedSeats = daftarAngka("lockedSeats"),
            pinned = o.optBoolean("pinned"),
            pinnedAt = o.optLong("pinnedAt"),
            admins = daftarTeks("admins"),
        )
    } catch (e: Exception) {
        null
    }

    /** Id room terakhir, dipakai supaya aplikasi kembali ke room yang sama. */
    fun idTerakhir(c: Context): String? = try {
        sp(c).getString("terakhir", null)?.takeIf { it.isNotBlank() }
    } catch (e: Exception) {
        null
    }

    fun lupakan(c: Context) {
        try {
            val id = idTerakhir(c)
            val e = sp(c).edit().remove("terakhir")
            if (id != null) e.remove("info_" + id).remove("kursi_" + id)
            e.apply()
        } catch (e: Exception) {
        }
    }

    /** Kursi terakhir: nama, foto kecil, dan status mute. Cukup untuk gambar ulang. */
    fun simpanKursi(c: Context, roomId: String, seats: Map<Int, Seat>) {
        try {
            val a = JSONArray()
            for (s in seats.values) {
                val o = JSONObject()
                o.put("i", s.index)
                o.put("u", s.uid)
                o.put("n", s.name)
                o.put("a", s.avatarB64 ?: "")
                o.put("m", s.muted)
                a.put(o)
            }
            sp(c).edit().putString("kursi_" + roomId, a.toString()).apply()
        } catch (e: Exception) {
        }
    }

    fun kursi(c: Context, roomId: String): Map<Int, Seat> {
        return try {
            val teks = sp(c).getString("kursi_" + roomId, null) ?: return emptyMap()
            val a = JSONArray(teks)
            val hasil = LinkedHashMap<Int, Seat>()
            for (n in 0 until a.length()) {
                val o = a.optJSONObject(n) ?: continue
                val i = o.optInt("i", -1)
                val u = o.optString("u")
                if (i < 0 || u.isBlank()) continue
                hasil[i] = Seat(
                    index = i,
                    uid = u,
                    name = o.optString("n"),
                    avatarB64 = o.optString("a").ifBlank { null },
                    muted = o.optBoolean("m"),
                )
            }
            hasil
        } catch (e: Exception) {
            emptyMap()
        }
    }
}

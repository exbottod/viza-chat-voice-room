package com.rezochatvoice.exceo

import kotlinx.coroutines.tasks.await
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

/**
 * Poin kamar (level kamar).
 *
 * Poin dikumpulkan dari nilai gift yang dikirim di dalam room, ditulis langsung
 * ke Realtime Database supaya tidak perlu server tambahan:
 *   roomPoin/{roomId}/total
 *   roomPoin/{roomId}/harian/{yyyyMMdd}
 *   roomPoin/{roomId}/bulanan/{yyyyMM}
 *   roomPoin/{roomId}/anggota/{uid}
 */
object RoomPoin {
    private fun hari(): String = SimpleDateFormat("yyyyMMdd", Locale.US).format(Date())
    private fun bulan(): String = SimpleDateFormat("yyyyMM", Locale.US).format(Date())

    /** Level kamar dari total poin: tiap 100.000 poin naik satu level. */
    fun level(total: Long): Int = (1 + total / 100_000L).toInt()

    suspend fun tambah(roomId: String, uid: String, nilai: Long) {
        if (roomId.isBlank() || nilai <= 0L) return
        try {
            val base = Rtdb.ref("roomPoin/$roomId")
            val naik = hashMapOf<String, Any?>(
                "harian/${hari()}" to com.google.firebase.database.ServerValue.increment(nilai),
                "bulanan/${bulan()}" to com.google.firebase.database.ServerValue.increment(nilai),
                "total" to com.google.firebase.database.ServerValue.increment(nilai),
            )
            base.updateChildren(naik).await()
            if (uid.isNotBlank()) {
                base.child("anggota/$uid").run {
                    setValue(com.google.firebase.database.ServerValue.increment(nilai)).await()
                }
            }
        } catch (e: kotlinx.coroutines.CancellationException) {
            throw e
        } catch (e: Exception) {
            // Poin kamar tidak boleh mengganggu pengiriman gift.
        }
    }

    data class Baris(val roomId: String, val nama: String, val poin: Long)

    /** Peringkat semua room untuk periode: "harian", "bulanan", atau "total". */
    suspend fun peringkat(periode: String): List<Baris> {
        return try {
            val akar = Rtdb.ref("roomPoin").get().await()
            val kunci = when (periode) {
                "harian" -> hari()
                "bulanan" -> bulan()
                else -> ""
            }
            val daftar = ArrayList<Baris>()
            for (room in akar.children) {
                val id = room.key ?: continue
                val poin = if (kunci.isBlank()) {
                    room.child("total").getValue(Long::class.java) ?: 0L
                } else {
                    room.child(periode).child(kunci).getValue(Long::class.java) ?: 0L
                }
                if (poin <= 0L) continue
                val nama = try {
                    Rtdb.ref("roomsPub/$id/name").get().await().getValue(String::class.java)
                } catch (e: kotlinx.coroutines.CancellationException) {
                    throw e
                } catch (e: Exception) {
                    null
                } ?: "Room $id"
                daftar.add(Baris(id, nama, poin))
            }
            daftar.sortedByDescending { it.poin }
        } catch (e: kotlinx.coroutines.CancellationException) {
            throw e
        } catch (e: Exception) {
            emptyList()
        }
    }

    /** Kontribusi anggota di satu room (uid ke poin). */
    suspend fun kontribusi(roomId: String): List<Pair<String, Long>> {
        return try {
            val snap = Rtdb.ref("roomPoin/$roomId/anggota").get().await()
            snap.children.mapNotNull { c ->
                val uid = c.key ?: return@mapNotNull null
                val p = c.getValue(Long::class.java) ?: 0L
                if (p <= 0L) null else uid to p
            }.sortedByDescending { it.second }
        } catch (e: kotlinx.coroutines.CancellationException) {
            throw e
        } catch (e: Exception) {
            emptyList()
        }
    }
}

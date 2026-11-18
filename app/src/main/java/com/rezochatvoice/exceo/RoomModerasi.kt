package com.rezochatvoice.exceo

import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.coroutines.tasks.await

/** Larangan di satu room: tidak boleh naik mic dan tidak boleh mengetik chat. */
data class LaranganRoom(val mic: Boolean = false, val ketik: Boolean = false)

object RoomModerasi {
    /** Pantau daftar larangan room. Kunci = uid user yang dilarang. */
    fun observeLarangan(roomId: String, onChange: (Map<String, LaranganRoom>) -> Unit): Reg =
        Rtdb.listen(Rtdb.ref("roomBans/$roomId")) { snap ->
            onChange(
                snap.children.associate {
                    (it.key ?: "") to LaranganRoom(
                        mic = it.child("mic").getValue(Boolean::class.java) ?: false,
                        ketik = it.child("ketik").getValue(Boolean::class.java) ?: false,
                    )
                },
            )
        }

    /** Larang / cabut larangan mic + ketik. Lewat server supaya admin room juga bisa. */
    suspend fun larang(roomId: String, uid: String, aktif: Boolean): String? =
        RoomRepo.aksiKelolaRoom(
            roomId,
            "larang",
            org.json.JSONObject().put("uid", uid).put("aktif", aktif),
        )

    /** Laporkan user. Muncul di tab Laporan user pada panel. */
    suspend fun laporkan(
        pelaporUid: String,
        pelaporNama: String,
        targetUid: String,
        targetNama: String,
        targetIdUser: String,
        roomId: String,
        alasan: String,
    ): String? = try {
        FirebaseFirestore.getInstance().collection("userReports").add(
            hashMapOf<String, Any?>(
                "reporterUid" to pelaporUid,
                "reporterName" to pelaporNama,
                "targetUid" to targetUid,
                "targetName" to targetNama,
                "targetUserId" to targetIdUser,
                "roomId" to roomId,
                "reason" to alasan.take(300),
                "status" to "baru",
                "createdAt" to System.currentTimeMillis(),
            ),
        ).await()
        null
    } catch (e: kotlinx.coroutines.CancellationException) {
        throw e
    } catch (e: Exception) {
        e.message ?: "Gagal mengirim laporan"
    }
}

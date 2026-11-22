package com.rezochatvoice.exceo

import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.MutableData
import com.google.firebase.database.Query
import com.google.firebase.database.Transaction
import com.google.firebase.database.ValueEventListener
import kotlinx.coroutines.suspendCancellableCoroutine
import kotlin.coroutines.resume

const val RTDB_URL = "https://GANTI-PROJECT-ANDA-default-rtdb.asia-southeast1.firebasedatabase.app"

/** Pembungkus sederhana supaya pemanggil cukup memanggil remove(). */
class Reg(private val onRemove: () -> Unit) {
    fun remove() = onRemove()
}

object Rtdb {
    init {
        // Simpanan Realtime Database di HP. Tanpa ini setiap kali aplikasi dibuka
        // atau kembali dari WhatsApp seluruh data (room, kursi, gift, chat,
        // profil) diambil ulang dari jaringan sehingga aplikasi terasa berat.
        // Dengan simpanan ini data terakhir langsung tampil, lalu disegarkan
        // diam-diam di belakang.
        runCatching {
            FirebaseDatabase.getInstance(RTDB_URL).setPersistenceEnabled(true)
        }
    }

    fun root(): DatabaseReference = FirebaseDatabase.getInstance(RTDB_URL).reference

    @Volatile private var clockOffset: Long = 0L
    @Volatile private var clockReady = false

    /** Mulai membaca selisih jam HP dengan jam server Firebase (sekali saja). */
    fun startClockSync() {
        if (clockReady) return
        clockReady = true
        FirebaseDatabase.getInstance(RTDB_URL).getReference(".info/serverTimeOffset")
            .addValueEventListener(object : ValueEventListener {
                override fun onDataChange(snapshot: DataSnapshot) {
                    clockOffset = snapshot.getValue(Long::class.java) ?: 0L
                }
                override fun onCancelled(error: DatabaseError) {
                }
            })
    }

    /** Waktu sekarang menurut server, sama untuk semua pemain. */
    fun serverNow(): Long = System.currentTimeMillis() + clockOffset
    fun ref(path: String): DatabaseReference = root().child(path)

    fun listen(q: Query, onBatal: (() -> Unit)? = null, onData: (DataSnapshot) -> Unit): Reg {
        val l = object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                // Satu data yang bentuknya aneh tidak boleh menjatuhkan aplikasi.
                try {
                    onData(snapshot)
                } catch (t: Throwable) {
                    android.util.Log.w("Rtdb", "gagal baca data: " + t.message)
                }
            }

            override fun onCancelled(error: DatabaseError) {
                // Biasanya terjadi karena app mendengarkan sebelum login: aturan
                // database menolak. Pemanggil boleh memasang ulang listener.
                try { onBatal?.invoke() } catch (t: Throwable) {}
            }
        }
        q.addValueEventListener(l)
        return Reg { q.removeEventListener(l) }
    }

    /** Transaksi pada satu node. Return null kalau sukses, atau pesan error/alasan batal. */
    suspend fun tx(ref: DatabaseReference, update: (MutableData) -> String?): String? {
        // Firebase membatalkan transaksi dengan pesan "The transaction was
        // overridden by a subsequent set" kalau ada tulisan lain ke node yang sama
        // selagi transaksi berjalan (mis. tombol kursi ditekan dua kali, atau
        // leave() ikut menulis seats). Dulu pesan Inggris itu langsung muncul
        // sebagai toast ke pengguna dan kursi gagal dinaiki. Sekarang diulang.
        var hasil: String? = null
        for (coba in 1..4) {
            hasil = txSekali(ref, update)
            if (hasil == null) return null
            val p = hasil.lowercase()
            if (!(p.contains("overridden") || p.contains("subsequent set")) || coba == 4) return hasil
            kotlinx.coroutines.delay(150L * coba)
        }
        return hasil
    }

    private suspend fun txSekali(ref: DatabaseReference, update: (MutableData) -> String?): String? =
        suspendCancellableCoroutine { cont ->
            var abortMsg: String? = null
            ref.runTransaction(object : Transaction.Handler {
                override fun doTransaction(d: MutableData): Transaction.Result {
                    abortMsg = update(d)
                    return if (abortMsg != null) Transaction.abort() else Transaction.success(d)
                }

                override fun onComplete(error: DatabaseError?, committed: Boolean, snapshot: DataSnapshot?) {
                    if (cont.isActive) {
                        cont.resume(
                            when {
                                error != null -> error.message
                                !committed -> abortMsg ?: "Dibatalkan"
                                else -> null
                            },
                        )
                    }
                }
            })
        }
}

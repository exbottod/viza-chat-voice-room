package com.rezochatvoice.exceo

/**
 * Simpanan sementara chat room selama aplikasi masih hidup.
 *
 * Tujuan: saat aplikasi di-minimize, room tidak benar-benar ditinggalkan, jadi
 * riwayat chat dan teks yang sedang diketik tidak boleh hilang. Simpanan ini
 * hanya ada di memori, otomatis bersih saat aplikasi ditutup.
 */
object RoomChatCache {
    private const val BATAS = 300
    private val pesan = HashMap<String, List<RoomMsg>>()
    private val draf = HashMap<String, String>()

    fun ambil(roomId: String): List<RoomMsg> = pesan[roomId] ?: emptyList()

    /** Gabungkan riwayat yang sudah ada dengan kiriman server, tanpa duplikat. */
    fun satukan(roomId: String, baru: List<RoomMsg>): List<RoomMsg> {
        val gabung = LinkedHashMap<String, RoomMsg>()
        (pesan[roomId] ?: emptyList()).forEach { gabung[it.id] = it }
        baru.forEach { gabung[it.id] = it }
        val hasil = gabung.values.sortedBy { it.createdAt }.takeLast(BATAS)
        pesan[roomId] = hasil
        return hasil
    }

    fun ambilDraf(roomId: String): String = draf[roomId] ?: ""

    fun simpanDraf(roomId: String, teks: String) {
        if (teks.isEmpty()) draf.remove(roomId) else draf[roomId] = teks
    }

    /** Dipakai kalau pengguna benar-benar keluar room. */
    fun hapus(roomId: String) {
        pesan.remove(roomId)
        draf.remove(roomId)
    }
}

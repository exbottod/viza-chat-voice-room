package com.rezochatvoice.exceo

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.content.pm.ServiceInfo
import android.os.Build
import android.os.IBinder
import androidx.core.app.NotificationCompat

/**
 * Layanan latar depan selama pemakai berada di room.
 *
 * Kenapa perlu: tanpa ini Android bebas membuang proses Viza begitu pemakai
 * pindah ke WhatsApp atau game lain. Saat kembali, aplikasi mulai dari nol dan
 * room seperti memuat ulang. Dengan layanan ini proses tetap hidup dan bertanda
 * "sedang dipakai", jadi kembali ke Viza langsung menampilkan room apa adanya.
 *
 * Contoh ZEGOCLOUD (ForegroundService.kt) memakai cara yang sama untuk menjaga
 * proses tetap hidup.
 */
class RoomService : Service() {

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        if (intent?.action == AKSI_STOP) {
            stopSelf()
            return START_NOT_STICKY
        }
        val judul = intent?.getStringExtra("judul").orEmpty()
        return try {
            buatSaluran()
            startForeground(ID_NOTIF, notifikasi(judul), jenisLayanan())
            START_STICKY
        } catch (e: Exception) {
            // Kalau sistem menolak (mis. izin mic dicabut), room tetap jalan
            // tanpa layanan; aplikasi tidak boleh mati karena ini.
            stopSelf()
            START_NOT_STICKY
        }
    }

    private fun jenisLayanan(): Int =
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            ServiceInfo.FOREGROUND_SERVICE_TYPE_MICROPHONE
        } else {
            0
        }

    private fun buatSaluran() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val nm = getSystemService(NotificationManager::class.java)
            if (nm.getNotificationChannel(SALURAN) == null) {
                val ch = NotificationChannel(SALURAN, "Room suara", NotificationManager.IMPORTANCE_LOW)
                ch.setShowBadge(false)
                ch.description = "Menjaga room tetap tersambung"
                nm.createNotificationChannel(ch)
            }
        }
    }

    private fun notifikasi(judul: String): Notification {
        val buka = Intent(this, MainActivity::class.java).apply {
            action = Intent.ACTION_MAIN
            addCategory(Intent.CATEGORY_LAUNCHER)
            flags = Intent.FLAG_ACTIVITY_SINGLE_TOP or Intent.FLAG_ACTIVITY_CLEAR_TOP
        }
        val bendera = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
        } else {
            PendingIntent.FLAG_UPDATE_CURRENT
        }
        val pi = PendingIntent.getActivity(this, 0, buka, bendera)
        return NotificationCompat.Builder(this, SALURAN)
            .setContentTitle("Viza")
            .setContentText(judul.ifBlank { "Kamu masih di dalam room" })
            .setSmallIcon(R.drawable.ic_tab_pesan)
            .setOngoing(true)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .setContentIntent(pi)
            .build()
    }

    companion object {
        private const val SALURAN = "room_viza"
        private const val ID_NOTIF = 4711
        const val AKSI_STOP = "com.rezochatvoice.exceo.STOP_ROOM"

        /** Mulai layanan. Aman dipanggil berkali-kali; notifikasi hanya diperbarui. */
        fun mulai(c: Context, judul: String) {
            try {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU &&
                    c.checkSelfPermission(android.Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED
                ) {
                    return
                }
                val i = Intent(c, RoomService::class.java).putExtra("judul", judul)
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    c.startForegroundService(i)
                } else {
                    c.startService(i)
                }
            } catch (e: Exception) {
            }
        }

        fun hentikan(c: Context) {
            try {
                c.stopService(Intent(c, RoomService::class.java))
            } catch (e: Exception) {
            }
        }
    }
}

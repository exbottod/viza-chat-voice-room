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
import androidx.core.app.ServiceCompat

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

    override fun onCreate() {
        super.onCreate()
        berjalan = true
    }

    override fun onDestroy() {
        berjalan = false
        super.onDestroy()
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        if (intent?.action == AKSI_STOP) {
            ServiceCompat.stopForeground(this, ServiceCompat.STOP_FOREGROUND_REMOVE)
            stopSelf()
            return START_NOT_STICKY
        }
        val judul = intent?.getStringExtra("judul").orEmpty()
        return try {
            buatSaluran()
            // Android 14 mewajibkan tipe layanan yang jelas. Tipe diambil dari
            // manifes (dataSync), bukan microphone: suara room sudah diurus Agora
            // di dalam layar, sedangkan layanan ini hanya menjaga proses tetap
            // hidup. Tipe microphone dulu menuntut izin mic aktif saat layanan
            // dimulai dan bisa membuat sistem menganggap aplikasi macet lalu
            // menutupnya saat masuk room.
            ServiceCompat.startForeground(
                this,
                ID_NOTIF,
                notifikasi(judul),
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                    ServiceInfo.FOREGROUND_SERVICE_TYPE_MANIFEST
                } else {
                    0
                },
            )
            START_STICKY
        } catch (e: Throwable) {
            // Apa pun penolakan sistem, room tetap jalan tanpa layanan dan
            // aplikasi tidak boleh macet atau tertutup karena ini.
            runCatching { ServiceCompat.stopForeground(this, ServiceCompat.STOP_FOREGROUND_REMOVE) }
            stopSelf()
            START_NOT_STICKY
        }
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

        /** Apakah layanan sedang jalan. Dipakai supaya tidak dimulai berulang kali. */
        @Volatile
        var berjalan: Boolean = false
            private set

        /**
         * Mulai layanan. Aman dipanggil berkali-kali; notifikasi hanya diperbarui.
         *
         * Android 12 ke atas melarang memulai layanan latar depan dari aplikasi
         * yang sedang di belakang layar, dan Android 14 menuntut izin yang masih
         * berlaku saat layanan dimulai. Karena itu semua syarat diperiksa lebih
         * dulu: kalau tidak terpenuhi, layanan tidak dipanggil sama sekali,
         * sehingga sistem tidak pernah menganggap aplikasi lalai lalu memacetkannya.
         */
        fun mulai(c: Context, judul: String) {
            try {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU &&
                    c.checkSelfPermission(android.Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED
                ) {
                    return
                }
                if (!AppAktif.ya) return
                val i = Intent(c, RoomService::class.java).putExtra("judul", judul)
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    c.startForegroundService(i)
                } else {
                    c.startService(i)
                }
            } catch (e: Throwable) {
                // ForegroundServiceStartNotAllowedException dan sejenisnya:
                // room tetap jalan tanpa layanan.
            }
        }

        fun hentikan(c: Context) {
            try {
                c.stopService(Intent(c, RoomService::class.java))
            } catch (e: Throwable) {
            }
        }
    }
}

# Rezo White-Label (APK kedua, untuk dijual)

Repo ini terpisah dari repo aplikasi Rezo. Isinya sumber Android untuk membangun
APK milik pembeli: nama aplikasi, ikon, nama paket dan Firebase mereka sendiri.

## Alur satu penjualan
1. Pembeli membuat project Firebase sendiri, ikuti firebase/CARA-SETUP-FIREBASE.md.
2. Pembeli mengirim google-services.json, nama aplikasi, dan nama paket.
3. Jalankan:
   tools/build-whitelabel.sh google-services.json "Nama Aplikasi" com.namabrand.app
4. Hasil APK di app/build/outputs/apk/release/ (arm64, armv7, universal).

Skrip menolak paket com.rezochatvoice.exceo dan otomatis mengganti namespace,
applicationId, package_name di google-services.json, serta sisa sebutan paket Rezo
di app/src/main.

## Alamat server yang masih milik Rezo
Sebelum APK ini dijual, alamat di bawah masih menunjuk infrastruktur Rezo dan harus
diganti ke server pembeli. Kalau tidak diganti, saldo dan data pembeli masuk ke
server Rezo.

- app/src/main/java/com/rezochatvoice/exceo/SupaRepo.kt: rezo-wallet.bangexx01.workers.dev, rezo-wallet.pages.dev
- app/src/main/java/com/rezochatvoice/exceo/HiveGames.kt: rezo-wallet.bangexx01.workers.dev, rezo-wallet.pages.dev
- app/src/main/java/com/rezochatvoice/exceo/BackupRepo.kt: rezo-agora-token.bangexx01.workers.dev
- app/src/main/java/com/rezochatvoice/exceo/RoomImages.kt, RoomMusicShare.kt, SupaRepo.kt: Supabase (placeholder GANTI-PROJECT-ANDA)
- app/src/main/java/com/rezochatvoice/exceo/WaveGames.kt: APP_KEY Wave (placeholder GANTI_APPKEY_WAVE)

## Yang belum termasuk
Voice room butuh server token Agora, dompet butuh server dompet sendiri, dan
game Wave butuh appKey dari akun Wave pembeli.

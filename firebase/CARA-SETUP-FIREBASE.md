# Cara menyiapkan Firebase supaya APK bisa login

Dibutuhkan sebelum APK dibangun. Semua langkah di bawah dikerjakan di
https://console.firebase.google.com oleh pemilik project.

## 1. Buat project
Buat project baru, misalnya nama brand pembeli. Google Analytics boleh dimatikan.

## 2. Tambah aplikasi Android
Di Project settings > Your apps > Add app > Android.
- Android package name: nama paket pembeli, MISALNYA com.namabrand.app
  Jangan pakai com.rezochatvoice.exceo.
- App nickname dan SHA-1 boleh diisi sekarang.
- Unduh google-services.json, berkas inilah yang dikirim untuk proses build.

SHA-1 untuk build pertama:
CF:33:A9:BF:9E:3C:B1:05:DC:5B:48:19:20:13:93:6E:8E:BF:02:E2

Kalau nanti ditandatangani dengan keystore milik pembeli, SHA-1 harus diganti
dengan sidik jari keystore baru, lalu google-services.json diunduh ulang.

## 3. Authentication
Menu Authentication > Sign-in method:
- Email/Password: aktifkan. Ini yang dipakai layar daftar dan masuk.
- Google: aktifkan kalau ingin tombol masuk Google. Butuh SHA-1 di atas.
- Phone: hanya perlu kalau ingin login nomor HP, karena itu perlu paket Blaze
  dan verifikasi SMS berbayar.

## 4. Firestore
Menu Firestore Database > Create database. Pilih mode production, lokasi
asia-southeast1 (Jakarta) misalnya.
Lalu buka tab Rules, tempel seluruh isi berkas firestore.rules dari paket ini,
ganti GANTI-EMAIL-ADMIN@gmail.com dengan email admin yang sebenarnya, lalu Publish.

## 5. Realtime Database
Menu Realtime Database > Create database, lokasi asia-southeast1.
Buka tab Rules, tempel isi database.rules.json, ganti juga
GANTI-EMAIL-ADMIN@gmail.com, lalu Publish.
Salin URL database yang muncul (bentuknya
https://nama-project-default-rtdb.asia-southeast1.firebasedatabase.app).
URL ini dipakai saat build.

## 6. Yang dikirim untuk proses build
1. google-services.json
2. Nama paket aplikasi
3. Nama aplikasi yang tampil di HP
4. URL Realtime Database

## Yang belum hidup setelah login berhasil
Fitur yang bergantung pada layanan lain tetap perlu disiapkan sendiri:
voice room (server token Agora), dompet dan top up (server dompet), serta
game pihak ketiga (akun Wave Games). Login, daftar akun, profil dan data dasar
sudah jalan tanpa itu.

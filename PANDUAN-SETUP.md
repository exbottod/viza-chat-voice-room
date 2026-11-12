# Source Code Template (tanpa data REZO)

Paket ini kerangka aplikasi Android (Kotlin + Jetpack Compose). Semua kunci,
alamat server, dan identitas milik REZO sudah dikosongkan. Isi sendiri sebelum dipakai.

## Isi paket
- `app/` : kode aplikasi Android (Kotlin, Compose), termasuk `app/src/main/assets`
- `build.gradle.kts`, `settings.gradle.kts`, `gradle.properties`
- `app/google-services.json` : contoh, wajib diganti

## Yang wajib diganti
1. `app/google-services.json` - unduh dari Firebase Console project milik sendiri,
   ganti seluruh isi berkas ini. Package name saat ini `com.rezochatvoice.exceo`.
2. `app/src/main/java/com/rezochatvoice/exceo/Rtdb.kt` - alamat Realtime Database.
3. `SupaRepo.kt`, `RoomImages.kt`, `RoomMusicShare.kt` - alamat Supabase dan kuncinya.
4. `WaveGames.kt` - appKey Wave Games milik sendiri (lihat `GANTI_APPKEY_WAVE`).
5. `GreedyKing.kt`, `SlotGame.kt` - alamat server dompet sendiri.
6. `strings.xml` - `facebook_app_id` dan nama aplikasi.
7. Nama paket dan logo aplikasi (`applicationId`, `res/`), sesuaikan branding.

## Alat yang perlu disiapkan
- Android Studio (JDK 17)
- Firebase (Authentication + Realtime Database) untuk login dan data
- Supabase atau server sendiri untuk data tambahan
- VPS bila memakai server dompet / halaman unduh sendiri
- Akun Wave Games bila ingin memasang game pihak ketiga

## Cara build
1. Buka folder ini di Android Studio, tunggu Gradle sync.
2. Ganti semua penanda `GANTI_...` sampai tidak ada yang tersisa.
3. `./gradlew assembleDebug` untuk APK uji, atau Build > Generate Signed Bundle/APK.

## Catatan
Paket ini diserahkan apa adanya. Pemasangan, konfigurasi server, dan branding
dikerjakan sendiri oleh pembeli.

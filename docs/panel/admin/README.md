# Viza Panel

Panel developer Viza Chat, berupa web app statis (HTML + JS + Firebase) yang dibuka lewat browser.
Bukan bagian dari APK.

## Halaman
- Dashboard: ringkasan user, room, gift, blokir, versi APK, log terakhir
- Kelola: User (cari, detail, blokir/buka), Room (tutup), Gift (tambah/edit/hapus), Frame & banner
- Game: Katalog game, Pasang game (URL + key production), Bet game
- Data: Database (lihat/ubah/hapus dokumen), Log admin
- Config: Pengaturan (daftar admin panel: nama, email, password, peran)

## Syarat sekali pasang
1. Firebase Console > Authentication > Settings > Authorized domains: tambahkan `exbottod.github.io`
2. Firebase Console > Firestore > Rules: tempel isi `firestore.rules` lalu Publish
3. Login pertama pakai bangexx01@gmail.com (owner), lalu daftarkan admin lain di menu Pengaturan

Project Firebase: my-app-e7f8c

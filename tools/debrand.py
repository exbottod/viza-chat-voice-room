#!/usr/bin/env python3
"""Bersihkan nama Rezo dari sumber white-label, ganti dengan merek pembeli.

Pakai: debrand.py <folder-sumber> "<Nama Merek>" <slug>
Contoh: debrand.py wl "Viza Chat" vizachat

Aturan penting: nama merek boleh mengandung spasi, jadi penggantian dibedakan
antara teks tampil dan nama variabel/fungsi di dalam kode.
- Frasa bermerek (ada spasinya) diganti utuh.
- Kata "Rezo" yang berdiri sendiri diganti nama merek lengkap.
- "Rezo" yang menempel di nama variabel diganti bentuk tanpa spasi.
- Huruf kecil "rezo" diganti slug.
Berkas yang disentuh: .kt, .xml, .html, .js, .css, .json, plus gradle.properties.
Halaman game di assets memanggil jembatan RezoBridge, jadi nama jembatan di
Kotlin dan di halaman harus ikut berubah bersama supaya tetap tersambung.
"""
import sys, pathlib, re

AKAR = pathlib.Path(sys.argv[1])
MEREK = sys.argv[2]
SLUG = sys.argv[3].lower()
CAMEL = "".join(kata.capitalize() for kata in MEREK.split())

FRASA = [
    ("Rezo Chat Voice", MEREK),
    ("REZO CHAT VOICE", MEREK.upper()),
    ("Rezo Star", MEREK),
    ("REZO STAR", MEREK.upper()),
    ("Game Rezo", f"Game {MEREK}"),
    ("Tentang Rezo", f"Tentang {MEREK}"),
    ("About Rezo", f"About {MEREK}"),
    ("rezo-wallet.bangexx01.workers.dev", "GANTI-SERVER-DOMPET"),
    ("rezo-wallet.pages.dev", "GANTI-SERVER-DOMPET-CADANGAN"),
    ("rezo-agora-token.bangexx01.workers.dev", "GANTI-SERVER-AGORA"),
    ("REZO-STAR", SLUG.upper()),
    ("REZO_", SLUG.upper() + "_"),
]

def olah(teks):
    # 1. Domain email akun nomor, ditangani lebih dulu agar tidak terpotong.
    teks = re.sub(r"@phone\.[a-z0-9]+\.app", f"@phone.{SLUG}.app", teks)
    # 2. Frasa bermerek.
    for lama, baru in FRASA:
        teks = teks.replace(lama, baru)
    # 3. Kata Rezo yang berdiri sendiri (teks tampil) -> nama merek lengkap.
    teks = re.sub(r"\bRezo\b", MEREK, teks)
    # 4. Rezo yang menempel di nama variabel/fungsi -> bentuk tanpa spasi.
    teks = re.sub(r"Rezo", CAMEL, teks)
    # 4b. Huruf besar yang berdiri sendiri (nama berkas, pesan izin pemasangan).
    teks = re.sub(r"\bREZO\b", MEREK.upper(), teks)
    # 5. Huruf kecil, di teks tampil maupun nama variabel.
    teks = re.sub(r"rezo", SLUG, teks)
    # 6. Sisa nama merek berspasi yang tidak sengaja masuk nama variabel.
    teks = teks.replace(f"{CAMEL} {MEREK.split()[-1]}Bridge", f"{CAMEL}Bridge")
    return teks

# Nilai milik Rezo yang ikut terkompilasi ke APK lewat gradle.properties.
GRADLE = {
    "googleWebClientId": "GANTI_GOOGLE_WEB_CLIENT_ID",
    "agoraTokenUrl": "GANTI-SERVER-AGORA",
    "agoraAppId": "GANTI_AGORA_APP_ID",
}

def bersihkan_gradle(berkas):
    baris = berkas.read_text(encoding="utf-8", errors="ignore").splitlines()
    keluaran = []
    for b in baris:
        kunci = b.split("=", 1)[0].strip()
        if kunci in GRADLE:
            b = f"{kunci}={GRADLE[kunci]}"
        keluaran.append(b)
    berkas.write_text("\n".join(keluaran) + "\n", encoding="utf-8")

jumlah = 0
gradle = AKAR / "gradle.properties"
if gradle.is_file():
    bersihkan_gradle(gradle)
    jumlah += 1

for f in AKAR.rglob("*"):
    if not f.is_file() or f.suffix not in {".kt", ".xml", ".html", ".js", ".css"}:
        continue
    asal = f.read_text(encoding="utf-8", errors="ignore")
    hasil = olah(asal)
    if hasil != asal:
        f.write_text(hasil, encoding="utf-8")
        jumlah += 1
print(f"de-brand selesai: {jumlah} berkas, merek '{MEREK}', slug '{SLUG}', kode '{CAMEL}'")

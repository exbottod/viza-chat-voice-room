#!/usr/bin/env python3
"""Pembuat unduhan kecil (patch) untuk Viza Chat.

Membuat berkas selisih bsdiff antara APK versi lama dan versi baru, lalu
memperbarui patch-info.json, build-info.json dan update-note.txt yang dibaca
dialog pembaruan di dalam APK (AppUpdate.kt).

Contoh:
  python3 tools/buat-patch.py --lama /tmp/v1.0.9.apk --baru /tmp/v1.0.10.apk \
      --dari 1.0.9 --ke 1.0.10 --kunci arm64 --keluaran keluar-patch

Hasil di folder keluaran: berkas .bsdiff + patch-info.json + build-info.json +
update-note.txt. Unggah semuanya ke repo halaman unduh (viza-chat-unduh).

Berkas patch HARUS dibuat dari APK yang persis sama dengan yang terpasang di
HP pengguna, karena bsdiff bekerja byte per byte.
"""
import argparse
import hashlib
import json
import os
import pathlib
import sys

try:
    import bsdiff4
except ImportError:
    sys.exit("Pasang dulu: pip install bsdiff4")


def sha256(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for blok in iter(lambda: f.read(1 << 20), b""):
            h.update(blok)
    return h.hexdigest()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--lama", required=True, help="APK versi dasar (yang terpasang di pengguna)")
    ap.add_argument("--baru", required=True, help="APK versi tujuan")
    ap.add_argument("--dari", required=True, help="Nomor versi dasar, mis. 1.0.9")
    ap.add_argument("--ke", required=True, help="Nomor versi tujuan, mis. 1.0.10")
    ap.add_argument("--kunci", default="arm64", choices=["arm64", "armv7", "universal"])
    ap.add_argument("--keluaran", default="keluar-patch")
    ap.add_argument("--catatan", default="", help="Teks catatan pembaruan untuk dialog")
    a = ap.parse_args()

    for f in (a.lama, a.baru):
        if not os.path.isfile(f):
            sys.exit(f"Tidak ada berkas: {f}")
    if sha256(a.lama) == sha256(a.baru):
        sys.exit("APK lama dan baru sama persis, tidak perlu patch")

    out = pathlib.Path(a.keluaran)
    (out / "patch").mkdir(parents=True, exist_ok=True)
    nama = f"patch-{a.dari}-{a.ke}-{a.kunci}.bsdiff"
    tujuan = out / "patch" / nama

    bsdiff4.file_diff(a.lama, a.baru, str(tujuan))

    # Uji: gabungkan kembali dan bandingkan sidik jari dengan APK baru.
    uji = out / "uji-gabung.apk"
    bsdiff4.file_patch(a.lama, str(uji), str(tujuan))
    if sha256(uji) != sha256(a.baru):
        sys.exit("Patch gagal diuji: hasil gabungan tidak sama dengan APK baru")
    uji.unlink()

    ukuran = tujuan.stat().st_size
    apk_baru = os.path.getsize(a.baru)

    pik = out / "patch-info.json"
    data = {"patch": []}
    if pik.exists():
        data = json.loads(pik.read_text())
        data.setdefault("patch", [])
    data["patch"] = [e for e in data["patch"]
                     if not (e.get("dari") == a.dari and e.get("ke") == a.ke)]
    data["patch"].append({
        "dari": a.dari,
        "ke": a.ke,
        a.kunci: {"file": nama, "ukuran": ukuran, "sha256": sha256(tujuan)},
    })
    pik.write_text(json.dumps(data, indent=2) + "\n")

    (out / "build-info.json").write_text(json.dumps({
        "versi": a.ke,
        "catatan": a.catatan,
        "ukuran_apk": apk_baru,
        "sha256_apk": sha256(a.baru),
    }, indent=2) + "\n")
    (out / "update-note.txt").write_text((a.catatan or f"Viza Chat {a.ke}") + "\n")

    print(f"patch {a.dari} -> {a.ke} ({a.kunci}): {ukuran/1048576:.2f} MB "
          f"(APK penuh {apk_baru/1048576:.1f} MB, hemat "
          f"{100 - ukuran*100/apk_baru:.0f}%)")
    print(f"berkas: {tujuan}")


if __name__ == "__main__":
    main()

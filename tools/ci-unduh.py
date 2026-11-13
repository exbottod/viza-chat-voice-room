#!/usr/bin/env python3
"""Perbarui halaman unduh Viza (folder docs/unduh) setiap build.

Dipanggil CI sesudah release baru dibuat:
  1. cari rilis dengan versi tertinggi,
  2. ambil ketiga APK (arm64, armv7, universal) dan hitung ukuran serta sha256,
  3. buat patch kecil dari versi sebelumnya (arm64),
  4. tulis docs/unduh/build-info.json, update-note.txt, patch-info.json, patch/,
  5. commit dengan penanda [skip ci] supaya tidak memicu build baru.

Semua di repo yang sama, jadi cukup GH_TOKEN. Tidak perlu repo terpisah.
"""
import hashlib
import json
import os
import subprocess
import sys
import tempfile
import urllib.request
import zipfile

API = "https://api.github.com"
REPO = os.environ.get("GITHUB_REPOSITORY", "exbottod/viza-chat-voice-room")
GH = os.environ.get("GH_TOKEN", "")
JENIS = ("arm64", "armv7", "universal")
TARGET = "docs/unduh"


def panggil(url):
    req = urllib.request.Request(url, headers={
        "Authorization": f"Bearer {GH}", "Accept": "application/vnd.github+json"})
    with urllib.request.urlopen(req, timeout=120) as r:
        return json.loads(r.read())


def unduh(url):
    class TanpaAuth(urllib.request.HTTPRedirectHandler):
        def redirect_request(self, req, fp, code, msg, headers, newurl):
            return urllib.request.Request(newurl, headers={})
    op = urllib.request.build_opener(TanpaAuth)
    req = urllib.request.Request(url, headers={
        "Authorization": f"Bearer {GH}", "Accept": "application/octet-stream"})
    return op.open(req, timeout=600).read()


def nomor(rilis):
    try:
        return tuple(int(i) for i in rilis["tag_name"].replace("viza-", "").split("."))
    except ValueError:
        return (0,)


def ambil_apk(rilis, jenis, tmp):
    aset = [a for a in rilis.get("assets", []) if a["name"] == f"viza-chat-{jenis}.zip"]
    if not aset:
        return None
    zpath = os.path.join(tmp, f"{jenis}.zip")
    open(zpath, "wb").write(unduh(aset[0]["url"]))
    with zipfile.ZipFile(zpath) as z:
        nama = [n for n in z.namelist() if n.endswith(".apk")][0]
        data = z.read(nama)
    apath = os.path.join(tmp, f"{jenis}.apk")
    open(apath, "wb").write(data)
    return apath, data


def main():
    rilis = [r for r in panggil(f"{API}/repos/{REPO}/releases?per_page=30")
             if r["tag_name"].startswith("viza-")]
    if not rilis:
        print("Belum ada rilis"); return 1
    rilis.sort(key=nomor, reverse=True)
    baru = rilis[0]
    lama = rilis[1] if len(rilis) > 1 else None
    v_baru = baru["tag_name"].replace("viza-", "")
    v_lama = lama["tag_name"].replace("viza-", "") if lama else ""
    tmp = tempfile.mkdtemp()

    abis, apk_utama = {}, None
    for jenis in JENIS:
        hasil = ambil_apk(baru, jenis, tmp)
        if not hasil:
            continue
        apath, data = hasil
        abis[jenis] = {"ukuran": len(data), "sha256": hashlib.sha256(data).hexdigest()}
        if jenis == "arm64":
            apk_utama = apath
    if not abis:
        print("Rilis tanpa aset APK"); return 1
    if not apk_utama:
        apk_utama = os.path.join(tmp, "arm64.apk")

    catatan = (baru.get("body") or f"Viza Chat {v_baru}").strip().splitlines()[0][:220]
    # "status": "ok" wajib: APK hanya menampilkan dialog pembaruan kalau kolom ini ada.
    info = {"status": "ok", "versi": v_baru, "catatan": catatan,
            "ukuran_apk": abis.get("arm64", {}).get("ukuran", 0),
            "sha256_apk": abis.get("arm64", {}).get("sha256", ""),
            "abis": abis}
    os.makedirs(TARGET, exist_ok=True)
    open(f"{TARGET}/build-info.json", "w").write(json.dumps(info, indent=2, ensure_ascii=False))
    open(f"{TARGET}/update-note.txt", "w").write(catatan + "\n")

    # rantai patch
    try:
        daftar = json.load(open(f"{TARGET}/patch-info.json"))["patch"]
    except Exception:
        daftar = []
    if lama:
        hasil = ambil_apk(lama, "arm64", tmp)
        if hasil:
            apk_lama = hasil[0]
            keluar = os.path.join(tmp, "keluar")
            rc = subprocess.run([sys.executable, "tools/buat-patch.py", "--lama", apk_lama,
                                 "--baru", apk_utama, "--dari", v_lama, "--ke", v_baru,
                                 "--kunci", "arm64", "--keluaran", keluar]).returncode
            if rc == 0:
                os.makedirs(f"{TARGET}/patch", exist_ok=True)
                nama_patch = f"patch-{v_lama}-{v_baru}-arm64.bsdiff"
                src = os.path.join(keluar, "patch", nama_patch)
                if os.path.exists(src):
                    open(f"{TARGET}/patch/{nama_patch}", "wb").write(open(src, "rb").read())
                    entri = json.load(open(os.path.join(keluar, "patch-info.json")))["patch"]
                    kunci = {(x["dari"], x["ke"]) for x in daftar}
                    daftar += [x for x in entri if (x["dari"], x["ke"]) not in kunci]
                else:
                    print("Berkas patch tidak ditemukan:", src)
            else:
                print("Patch gagal dibuat")

    def angka(v):
        return tuple(int(i) for i in v.split("."))
    daftar = [x for x in daftar if angka(x["ke"]) > angka(x["dari"])]
    daftar.sort(key=lambda x: (angka(x["dari"]), angka(x["ke"])))
    open(f"{TARGET}/patch-info.json", "w").write(json.dumps({"patch": daftar}, indent=2))

    pesan = f"Versi {v_baru} di halaman unduh [skip ci]"
    subprocess.run(["git", "config", "user.email", "ci@viza.local"], check=True)
    subprocess.run(["git", "config", "user.name", "Viza CI"], check=True)
    subprocess.run(["git", "add", TARGET], check=True)
    if subprocess.run(["git", "diff", "--cached", "--quiet"]).returncode == 0:
        print("Tidak ada perubahan halaman unduh")
        return 0
    subprocess.run(["git", "commit", "-m", pesan], check=True)
    # Tarik dulu kalau ada commit lain, lalu coba push beberapa kali.
    for coba in range(4):
        subprocess.run(["git", "pull", "--rebase", "--autostash", "origin",
                        os.environ.get("GITHUB_REF_NAME", "main")], check=False)
        if subprocess.run(["git", "push"]).returncode == 0:
            break
        import time as _t
        _t.sleep(5 * (coba + 1))
    else:
        print("Push halaman unduh tetap gagal")
    print(f"Selesai: halaman unduh {v_baru}, patch {v_lama}->{v_baru}")
    return 0


if __name__ == "__main__":
    sys.exit(main())

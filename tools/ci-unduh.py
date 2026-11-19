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
    # Tanpa token (mis. dijalankan manual) cukup pakai API publik.
    kepala = {"Accept": "application/vnd.github+json"}
    if GH:
        kepala["Authorization"] = f"Bearer {GH}"
    req = urllib.request.Request(url, headers=kepala)
    with urllib.request.urlopen(req, timeout=120) as r:
        return json.loads(r.read())


def unduh(url):
    class TanpaAuth(urllib.request.HTTPRedirectHandler):
        def redirect_request(self, req, fp, code, msg, headers, newurl):
            return urllib.request.Request(newurl, headers={})
    op = urllib.request.build_opener(TanpaAuth)
    kepala = {"Accept": "application/octet-stream"}
    if GH:
        kepala["Authorization"] = f"Bearer {GH}"
    req = urllib.request.Request(url, headers=kepala)
    return op.open(req, timeout=600).read()


def nomor(rilis):
    try:
        return tuple(int(i) for i in rilis["tag_name"].replace("viza-", "").split("."))
    except ValueError:
        return (0,)


def ambil_apk(rilis, jenis, tmp):
    """Ambil APK satu rilis. Nama berkas memuat nomor versi supaya APK rilis
    lama tidak menimpa APK rilis baru di folder sementara. Dulu nama berkasnya
    sama, akibatnya pembuat patch melihat dua berkas yang identik dan tidak
    pernah membuat patch baru."""
    aset = [a for a in rilis.get("assets", []) if a["name"] == f"viza-chat-{jenis}.zip"]
    if not aset:
        return None
    v = rilis["tag_name"].replace("viza-", "")
    zpath = os.path.join(tmp, f"{jenis}-{v}.zip")
    open(zpath, "wb").write(unduh(aset[0]["url"]))
    with zipfile.ZipFile(zpath) as z:
        nama = [n for n in z.namelist() if n.endswith(".apk")][0]
        data = z.read(nama)
    apath = os.path.join(tmp, f"{jenis}-{v}.apk")
    open(apath, "wb").write(data)
    return apath, data


def daftar_rilis(jumlah=6):
    """Rilis terbaru sampai beberapa sebelumnya.

    Daftar /releases tidak selalu memuat rilis baru (1.0.100 ke atas pernah tidak
    muncul walau rilisnya ada), jadi rilis terbaru diambil dari /releases/latest
    dan rilis sebelumnya dicari per nomor versi lewat /releases/tags.
    """
    hasil, terakhir = [], panggil(f"{API}/repos/{REPO}/releases/latest")
    if not terakhir.get("tag_name", "").startswith("viza-"):
        return []
    hasil.append(terakhir)
    angka = list(nomor(terakhir))
    while len(hasil) < jumlah:
        if angka[-1] > 0:
            angka[-1] -= 1
        else:
            break
        tag = "viza-" + ".".join(str(i) for i in angka)
        try:
            hasil.append(panggil(f"{API}/repos/{REPO}/releases/tags/{tag}"))
        except Exception:
            break
    return hasil


def main():
    rilis = daftar_rilis()
    if not rilis:
        print("Belum ada rilis"); return 1
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

    # Dialog pembaruan menampilkan isi catatan rilis. Ambil poin perbaikan
    # (baris berawalan "-") supaya pengguna membaca apa yang berubah, bukan
    # kalimat pembuka saja.
    baris = [b.strip() for b in (baru.get("body") or "").splitlines() if b.strip()]
    poin = [b.lstrip("-*\u2022 ").strip() for b in baris if b[:1] in "-*\u2022"]
    # Kata-kata di dialog diambil dari docs/unduh/catatan-rilis.txt yang ditulis
    # manual setiap rilis. Jadi bahasanya manusiawi dan tiap update kata-katanya
    # berbeda. Kalau berkas itu kosong, baru pakai poin rilis otomatis di bawah.
    manual = ""
    try:
        manual = open(os.path.join(TARGET, "catatan-rilis.txt"), encoding="utf-8").read().strip()
    except Exception:
        manual = ""
    if manual:
        catatan = manual[:420]
    elif poin:
        catatan = "\n".join("\u2022 " + x[:100] for x in poin[:4])[:420]
    else:
        catatan = (baris[0] if baris else f"Viza Chat {v_baru}")[:220]
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
    # Patch dibuat dari beberapa versi dasar sekaligus: rilis tepat sebelumnya
    # plus beberapa rilis terakhir, supaya pengguna yang melewatkan satu dua
    # versi tetap dapat unduhan kecil (aplikasi merangkai rantai patchnya).
    dasar = [r for r in rilis[1:1 + 4]]
    sudah = {(x["dari"], x["ke"]) for x in daftar}
    for r_lama in dasar:
        v_l = r_lama["tag_name"].replace("viza-", "")
        if (v_l, v_baru) in sudah:
            continue
        hasil = ambil_apk(r_lama, "arm64", tmp)
        if not hasil:
            print(f"APK {v_l} tidak ada, lewati")
            continue
        apk_lama = hasil[0]
        keluar = os.path.join(tmp, f"keluar-{v_l}")
        rc = subprocess.run([sys.executable, "tools/buat-patch.py", "--lama", apk_lama,
                             "--baru", apk_utama, "--dari", v_l, "--ke", v_baru,
                             "--kunci", "arm64", "--keluaran", keluar]).returncode
        if rc != 0:
            print(f"Patch {v_l}->{v_baru} gagal")
            continue
        os.makedirs(f"{TARGET}/patch", exist_ok=True)
        nama_patch = f"patch-{v_l}-{v_baru}-arm64.bsdiff"
        src = os.path.join(keluar, "patch", nama_patch)
        if os.path.exists(src):
            open(f"{TARGET}/patch/{nama_patch}", "wb").write(open(src, "rb").read())
            entri = json.load(open(os.path.join(keluar, "patch-info.json")))["patch"]
            daftar += [x for x in entri if (x["dari"], x["ke"]) not in sudah]
            sudah.add((v_l, v_baru))
            print(f"Patch {v_l}->{v_baru} dibuat")
        else:
            print("Berkas patch tidak ditemukan:", src)

    # Setiap rilis WAJIB punya unduhan kecil: patch dari versi tepat sebelumnya.
    # Dulu kegagalan pembuatan patch hanya dicetak lalu build tetap "sukses",
    # akibatnya pengguna terpaksa mengunduh APK penuh 57 MB. Sekarang patch yang
    # hilang atau tidak cukup kecil menggagalkan langkah ini.
    wajib = f"patch-{v_lama}-{v_baru}-arm64.bsdiff" if v_lama else ""
    berkas_wajib = os.path.join(TARGET, "patch", wajib) if wajib else ""
    kurang_patch = False
    if wajib:
        if not os.path.exists(berkas_wajib):
            print(f"Patch wajib {wajib} tidak dibuat", file=sys.stderr)
            kurang_patch = True
        else:
            ukuran_patch = os.path.getsize(berkas_wajib)
            ukuran_apk = abis.get("arm64", {}).get("ukuran", 0)
            if ukuran_apk and ukuran_patch > ukuran_apk * 0.4:
                print(f"Patch {wajib} terlalu besar: {ukuran_patch} dari {ukuran_apk}",
                      file=sys.stderr)
                kurang_patch = True
            else:
                print(f"Patch wajib {wajib} ada: {ukuran_patch} bita "
                      f"({ukuran_patch * 100 // max(ukuran_apk, 1)}% APK)")

    def angka(v):
        return tuple(int(i) for i in v.split("."))
    daftar = [x for x in daftar if angka(x["ke"]) > angka(x["dari"])]
    daftar.sort(key=lambda x: (angka(x["dari"]), angka(x["ke"])))
    # Batas situs GitHub Pages 1 GB dan folder docs sempat 3,75 GB karena 829
    # berkas patch, sehingga deploy gagal terbit. Aturan pemangkasan: simpan patch
    # 30 build terakhir. Pengaman tambahan: kalau 30 build itu melewati 800 MB,
    # versi paling tua dilepas supaya deploy tetap bisa terbit. Pengguna versi
    # yang patchnya sudah dilepas otomatis jatuh ke unduhan APK penuh.
    SIMPAN_VERSI = 30
    BATAS_PATCH = 800 * 1024 * 1024
    pakai, simpan_versi = 0, []
    for v in reversed(sorted({x["ke"] for x in daftar}, key=angka)):
        ukuran_v = sum(x["arm64"]["ukuran"] for x in daftar if x["ke"] == v)
        kalau_lebih = pakai + ukuran_v > BATAS_PATCH
        if len(simpan_versi) >= SIMPAN_VERSI or (simpan_versi and kalau_lebih):
            break
        simpan_versi.append(v)
        pakai += ukuran_v
    simpan_versi = set(simpan_versi)
    daftar = [x for x in daftar if x["ke"] in simpan_versi]
    nama_simpan = {x["arm64"]["file"] for x in daftar}
    folder_patch = os.path.join(TARGET, "patch")
    if os.path.isdir(folder_patch):
        for f in os.listdir(folder_patch):
            if f not in nama_simpan:
                os.remove(os.path.join(folder_patch, f))
    print(f"Patch disimpan {len(daftar)} entri untuk {len(simpan_versi)} build, "
          f"{pakai // (1024 * 1024)} MB")

    open(f"{TARGET}/patch-info.json", "w").write(json.dumps({"patch": daftar}, indent=2))

    pesan = f"Versi {v_baru} di halaman unduh [skip ci]"
    subprocess.run(["git", "config", "user.email", "ci@viza.local"], check=True)
    subprocess.run(["git", "config", "user.name", "Viza CI"], check=True)
    subprocess.run(["git", "add", TARGET], check=True)
    if subprocess.run(["git", "diff", "--cached", "--quiet"]).returncode == 0:
        print("Tidak ada perubahan halaman unduh")
        return 1 if kurang_patch else 0
    # Simpan dulu isi berkas hasil generate. Kalau ada commit lain masuk ke main
    # saaat build berjalan, rebase dulu bentrok di berkas ini (dulu CI gagal dan
    # halaman unduh tertinggal). Jadi: tarik main terbaru, tulis ulang berkas
    # hasil generate, commit, push, ulangi kalau kalah balapan.
    import time as _t
    simpanan = {}
    for akar, _, nama in os.walk(TARGET):
        for f in nama:
            fp = os.path.join(akar, f)
            simpanan[fp] = open(fp, "rb").read()
    cabang = os.environ.get("GITHUB_REF_NAME", "main")

    def tulis_ulang():
        for fp, isi in simpanan.items():
            os.makedirs(os.path.dirname(fp) or ".", exist_ok=True)
            open(fp, "wb").write(isi)

    berhasil = False
    for coba in range(6):
        subprocess.run(["git", "rebase", "--abort"], check=False,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        subprocess.run(["git", "fetch", "origin", cabang], check=False,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        subprocess.run(["git", "reset", "--hard", f"origin/{cabang}"], check=False,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        tulis_ulang()
        subprocess.run(["git", "add", "-A", TARGET], check=True)
        if subprocess.run(["git", "diff", "--cached", "--quiet"]).returncode == 0:
            print("Halaman unduh sudah sama dengan versi terbaru")
            return 1 if kurang_patch else 0
        subprocess.run(["git", "commit", "-m", pesan], check=True)
        if subprocess.run(["git", "push", "origin", f"HEAD:{cabang}"]).returncode == 0:
            berhasil = True
            break
        _t.sleep(3 * (coba + 1))
    if not berhasil:
        # Dulu kegagalan push hanya dicetak lalu langkah CI tetap "sukses",
        # akibatnya halaman unduh tertinggal di versi lama dan dialog pembaruan
        # tidak pernah muncul. Sekarang kegagalan ini menggagalkan build.
        print("Push halaman unduh tetap gagal: halaman unduh TIDAK terbarui", file=sys.stderr)
        return 1
    if kurang_patch:
        print("Rilis tanpa unduhan kecil: patch wajib tidak tersedia", file=sys.stderr)
        return 1
    print(f"Selesai: halaman unduh {v_baru}, patch {v_lama}->{v_baru}")
    return 0


if __name__ == "__main__":
    sys.exit(main())

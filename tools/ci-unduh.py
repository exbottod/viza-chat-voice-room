#!/usr/bin/env python3
"""Perbarui halaman unduh Viza otomatis setelah build.

Dijalankan di CI sesudah rilis baru dibuat di repo aplikasi:
  1. ambil APK hasil build (zip artifact) dan rilis sebelumnya,
  2. buat patch kecil dari versi sebelumnya ke versi baru,
  3. terbitkan rilis di repo halaman unduh (viza-chat-unduh) dengan nama aset
     tetap viza-chat-arm64.apk/.zip supaya tautan "latest" selalu versi baru,
  4. perbarui build-info.json, update-note.txt, dan rantai patch-info.json.

Token: GH_TOKEN (repo aplikasi) dan UNDUH_TOKEN (repo halaman unduh).
"""
import base64
import hashlib
import json
import os
import subprocess
import sys
import tempfile
import urllib.request
import zipfile

API = "https://api.github.com"
APP_REPO = os.environ.get("GITHUB_REPOSITORY", "exbottod/viza-chat-voice-room")
UNDUH_REPO = os.environ.get("UNDUH_REPO", "exbottod/viza-chat-unduh")
GH = os.environ.get("GH_TOKEN", "")
UNDUH = os.environ.get("UNDUH_TOKEN", "")


def panggil(url, token, method="GET", data=None, ctype="application/json"):
    req = urllib.request.Request(url, data=data, method=method, headers={
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github+json",
        "Content-Type": ctype,
    })
    with urllib.request.urlopen(req, timeout=300) as r:
        isi = r.read()
    return json.loads(isi) if isi else {}


def unduh(url, token):
    class TanpaAuth(urllib.request.HTTPRedirectHandler):
        def redirect_request(self, req, fp, code, msg, headers, newurl):
            return urllib.request.Request(newurl, headers={})
    op = urllib.request.build_opener(TanpaAuth)
    req = urllib.request.Request(url, headers={
        "Authorization": f"Bearer {token}", "Accept": "application/octet-stream"})
    return op.open(req, timeout=600).read()


def versi(tag):
    return tag.replace("viza-", "").replace("v", "")


def main():
    if not UNDUH:
        print("UNDUH_TOKEN belum diisi, lompat pembaruan halaman unduh")
        return 0

    rilis = panggil(f"{API}/repos/{APP_REPO}/releases?per_page=10", GH)
    if not rilis:
        print("Belum ada rilis"); return 1
    # Urut menurut nomor versi, bukan tanggal: rilis lama yang diperbarui
    # tidak boleh dianggap paling baru.
    def nomor(r):
        try:
            return tuple(int(i) for i in versi(r["tag_name"]).split("."))
        except ValueError:
            return (0,)
    rilis = sorted([r for r in rilis if r["tag_name"].startswith("viza-")], key=nomor, reverse=True)
    baru = rilis[0]
    lama = rilis[1] if len(rilis) > 1 else None
    v_baru, v_lama = versi(baru["tag_name"]), versi(lama["tag_name"]) if lama else ""

    tmp = tempfile.mkdtemp()
    apk = os.path.join(tmp, "baru.apk")
    zip_artifact = os.path.join(os.environ.get("RUNNER_TEMP", tmp), "viza-chat-arm64.zip")
    if os.path.exists(zip_artifact):
        with zipfile.ZipFile(zip_artifact) as z:
            nama = [n for n in z.namelist() if n.endswith(".apk")][0]
        with zipfile.ZipFile(zip_artifact) as z:
            open(apk, "wb").write(z.read(nama))
    else:
        aset = [a for a in baru["assets"] if a["name"].endswith(".zip")]
        if not aset:
            print("Tidak ada aset zip di rilis"); return 1
        data = unduh(aset[0]["url"], GH)
        open(os.path.join(tmp, "baru.zip"), "wb").write(data)
        with zipfile.ZipFile(os.path.join(tmp, "baru.zip")) as z:
            nama = [n for n in z.namelist() if n.endswith(".apk")][0]
            open(apk, "wb").write(z.read(nama))

    isi_apk = open(apk, "rb").read()
    sha = hashlib.sha256(isi_apk).hexdigest()
    catatan = (baru.get("body") or f"Viza Chat {v_baru}").strip().splitlines()[0][:200]

    # --- patch dari versi sebelumnya ---
    patch_path = None
    if lama:
        aset_lama = [a for a in lama["assets"] if a["name"].endswith(".zip")]
        if aset_lama:
            data = unduh(aset_lama[0]["url"], GH)
            zip_lama = os.path.join(tmp, "lama.zip")
            open(zip_lama, "wb").write(data)
            apk_lama = os.path.join(tmp, "lama.apk")
            with zipfile.ZipFile(zip_lama) as z:
                nm = [n for n in z.namelist() if n.endswith(".apk")][0]
                open(apk_lama, "wb").write(z.read(nm))
            keluaran = os.path.join(tmp, "patch")
            rc = subprocess.run([sys.executable, "tools/buat-patch.py", "--lama", apk_lama,
                                 "--baru", apk, "--dari", v_lama, "--ke", v_baru,
                                 "--kunci", "arm64", "--keluaran", keluaran]).returncode
            if rc == 0:
                berkas = [f for f in os.listdir(os.path.join(keluaran, "patch"))]
                if berkas:
                    patch_path = os.path.join(keluaran, "patch", berkas[0])
            else:
                print("Patch gagal dibuat, lanjut tanpa patch")

    # --- rilis di repo halaman unduh ---
    tag = f"v{v_baru}"
    try:
        rel = panggil(f"{API}/repos/{UNDUH_REPO}/releases/tags/{tag}", UNDUH)
    except Exception:
        rel = panggil(f"{API}/repos/{UNDUH_REPO}/releases", UNDUH, "POST", json.dumps({
            "tag_name": tag, "name": f"Viza Chat {v_baru}", "body": catatan,
            "draft": False, "prerelease": False}).encode())
    sudah = {a["name"] for a in rel.get("assets", [])}
    up = rel["upload_url"].split("{")[0]
    # Ambil ketiga jenis dari rilis aplikasi lalu unggah ke halaman unduh.
    for jenis in ("arm64", "armv7", "universal"):
        asetz = [a for a in baru["assets"] if a["name"] == f"viza-chat-{jenis}.zip"]
        if not asetz:
            continue
        zbytes = unduh(asetz[0]["url"], GH)
        zpath = os.path.join(tmp, f"{jenis}.zip")
        open(zpath, "wb").write(zbytes)
        with zipfile.ZipFile(zpath) as z:
            nm = [n for n in z.namelist() if n.endswith(".apk")][0]
            apk_bytes = z.read(nm)
        for nama, isi in ((f"viza-chat-{jenis}.apk", apk_bytes), (f"viza-chat-{jenis}.zip", zbytes)):
            if nama not in sudah:
                panggil(f"{up}?name={nama}", UNDUH, "POST", isi, "application/octet-stream")

    # --- berkas info di halaman unduh ---
    def tulis(path, isi_bytes, pesan):
        body = {"message": pesan, "content": base64.b64encode(isi_bytes).decode()}
        try:
            cur = panggil(f"{API}/repos/{UNDUH_REPO}/contents/{path}", UNDUH)
            body["sha"] = cur["sha"]
        except Exception:
            pass
        panggil(f"{API}/repos/{UNDUH_REPO}/contents/{path}", UNDUH, "PUT",
                json.dumps(body).encode())

    info = {"versi": v_baru, "catatan": catatan, "ukuran_apk": len(isi_apk), "sha256_apk": sha}
    tulis("build-info.json", json.dumps(info, indent=2, ensure_ascii=False).encode(), f"Versi {v_baru}")
    tulis("update-note.txt", (catatan + "\n").encode(), f"Catatan {v_baru}")

    try:
        lama_patch = panggil(f"{API}/repos/{UNDUH_REPO}/contents/patch-info.json", UNDUH)
        daftar = json.loads(base64.b64decode(lama_patch["content"]))["patch"]
    except Exception:
        daftar = []
    if patch_path:
        entri = json.load(open(os.path.join(os.path.dirname(os.path.dirname(patch_path)), "patch-info.json")))["patch"]
        kunci = {(x["dari"], x["ke"]) for x in daftar}
        daftar += [x for x in entri if (x["dari"], x["ke"]) not in kunci]
        nama_patch = os.path.basename(patch_path)
        tulis(f"patch/{nama_patch}", open(patch_path, "rb").read(), f"Patch {v_lama}-{v_baru}")
    daftar.sort(key=lambda x: (tuple(int(i) for i in x["dari"].split(".")),
                               tuple(int(i) for i in x["ke"].split("."))))
    tulis("patch-info.json", json.dumps({"patch": daftar}, indent=2).encode(),
          f"Rantai patch sampai {v_baru}")
    print(f"Selesai: {v_baru} di halaman unduh, patch {v_lama}->{v_baru}" if patch_path
          else f"Selesai: {v_baru} di halaman unduh (tanpa patch)")
    return 0


if __name__ == "__main__":
    sys.exit(main())

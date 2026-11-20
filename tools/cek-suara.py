#!/usr/bin/env python3
"""Cek suara room Viza langsung dari server LiveKit.

Dijalankan di VPS: sudo python3 cek-suara.py

Membaca kunci dari /etc/livekit/livekit.yaml, membuat token admin sementara,
lalu menanyakan ke LiveKit: room apa yang hidup, siapa saja di dalamnya, dan
apakah track suara mereka benar-benar terkirim (tidak dibisukan).

Tidak mengubah apa pun. Hanya membaca.
"""
import base64
import hashlib
import hmac
import json
import sys
import time
import urllib.error
import urllib.request

YAML = "/etc/livekit/livekit.yaml"
API = "http://127.0.0.1:7890"


def b64(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).decode().rstrip("=")


def baca_kunci(path):
    """Ambil pasangan kunci: rahasia dari blok 'keys:' pada livekit.yaml."""
    kunci = {}
    dalam = False
    with open(path, "r", encoding="utf-8") as f:
        for baris in f:
            if baris.strip().startswith("keys:"):
                dalam = True
                continue
            if dalam:
                if not baris.startswith((" ", "\t")) or not baris.strip():
                    break
                if ":" in baris:
                    k, v = baris.strip().split(":", 1)
                    kunci[k.strip()] = v.strip()
    return kunci


def token_admin(key, secret, umur=600):
    kini = int(time.time())
    isi = {
        "iss": key,
        "sub": "cek-suara",
        "iat": kini,
        "nbf": kini - 10,
        "exp": kini + umur,
        "video": {"roomList": True, "roomAdmin": True, "roomRecord": False},
    }
    kepala = b64(json.dumps({"alg": "HS256", "typ": "JWT"}).encode())
    badan = b64(json.dumps(isi).encode())
    pesan = f"{kepala}.{badan}".encode()
    tanda = b64(hmac.new(secret.encode(), pesan, hashlib.sha256).digest())
    return f"{kepala}.{badan}.{tanda}"


def panggil(metode, data, token):
    req = urllib.request.Request(
        API + metode,
        data=json.dumps(data).encode(),
        headers={
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=10) as r:
        return json.loads(r.read().decode() or "{}")


JENIS = {0: "AUDIO", 1: "VIDEO", 2: "DATA"}


def main():
    try:
        kunci = baca_kunci(YAML)
    except Exception as e:
        print("Gagal membaca", YAML, "->", e)
        return 1
    if not kunci:
        print("Tidak ada kunci di", YAML)
        return 1
    key, secret = list(kunci.items())[0]
    token = token_admin(key, secret)

    try:
        hasil = panggil("/twirp/livekit.RoomService/ListRooms", {}, token)
    except urllib.error.HTTPError as e:
        print("LiveKit menolak permintaan:", e.code, e.read().decode()[:200])
        return 1
    except Exception as e:
        print("LiveKit tidak menjawab di", API, "->", e)
        return 1

    rooms = hasil.get("rooms") or []
    if not rooms:
        print("Tidak ada room yang hidup sekarang.")
        print("Buka room di aplikasi dulu, lalu jalankan lagi.")
        return 0

    for room in rooms:
        sid = room.get("sid", "")
        nama = room.get("name", "")
        print(f"ROOM {nama}  (peserta {room.get('numParticipants', '?')})")
        try:
            p = panggil("/twirp/livekit.RoomService/ListParticipants", {"room": nama}, token)
        except Exception as e:
            print("  gagal membaca peserta:", e)
            continue
        peserta = p.get("participants") or []
        if not peserta:
            print("  kosong")
        for orang in peserta:
            nama_orang = orang.get("name") or orang.get("identity")
            print(f"  - {nama_orang} ({orang.get('identity')}) status={orang.get('state')}")
            tracks = orang.get("tracks") or []
            if not tracks:
                print("      tidak mengirim suara/video")
            for t in tracks:
                jenis = JENIS.get(t.get("type"), t.get("type"))
                bisu = "BISU" if t.get("muted") else "terkirim"
                print(f"      {jenis:6s} {t.get('name') or t.get('sid')} -> {bisu}")
    return 0


if __name__ == "__main__":
    sys.exit(main())

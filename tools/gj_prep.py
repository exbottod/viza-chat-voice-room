#!/usr/bin/env python3
"""Sisakan hanya klien Firebase untuk paket yang dibangun.

google-services.json dari console sering memuat beberapa klien (mis. satu untuk
aplikasi uji, satu untuk aplikasi sebenarnya). Firebase SDK hanya memakai klien
yang paketnya cocok, tapi menyisakan satu klien saja membuat berkasnya bersih dan
tidak membocorkan paket aplikasi lain.

Pakai: gj_prep.py <masuk.json> <keluar.json> <paket>
"""
import json, sys

masuk, keluar, paket = sys.argv[1], sys.argv[2], sys.argv[3]
d = json.load(open(masuk))
klien = d.get("client", [])
cocok = [c for c in klien if c["client_info"]["android_client_info"]["package_name"] == paket]
if not cocok:
    if len(klien) != 1:
        sys.exit(f"Tidak ada klien untuk paket {paket} dan ada {len(klien)} klien, tidak bisa dipilih otomatis.")
    cocok = klien          # satu klien saja: pakai apa adanya, paket diubah nanti
    cocok[0]["client_info"]["android_client_info"]["package_name"] = paket
d["client"] = cocok[:1]
for c in d["client"]:
    c["client_info"]["android_client_info"]["package_name"] = paket
    c.setdefault("services", {})
json.dump(d, open(keluar, "w"), indent=2)
print(f"klien dipakai: {d['client'][0]['client_info']['mobilesdk_app_id']} untuk paket {paket}")

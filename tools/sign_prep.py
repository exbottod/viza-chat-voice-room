#!/usr/bin/env python3
"""Ganti tanda tangan rilis dari kunci debug ke kunci rilis milik sendiri.
Pakai: sign_prep.py <app/build.gradle.kts>   (env: VIZA_STORE_PASS, VIZA_KEY_ALIAS)
"""
import pathlib, sys

p = pathlib.Path(sys.argv[1]); t = p.read_text()
rilis = """        create("rilis") {
            storeFile = file("rilis.keystore")
            storePassword = System.getenv("VIZA_STORE_PASS") ?: ""
            keyAlias = System.getenv("VIZA_KEY_ALIAS") ?: "viza"
            keyPassword = System.getenv("VIZA_STORE_PASS") ?: ""
            enableV1Signing = true
            enableV2Signing = true
            enableV3Signing = true
        }
"""
if 'create("rilis")' not in t:
    awal = t.find("signingConfigs {")
    if awal == -1:
        sys.exit("signingConfigs tidak ditemukan")
    # sisipkan tepat setelah kurung buka signingConfigs
    sisip = t.find("\n", awal) + 1
    t = t[:sisip] + rilis + t[sisip:]
if 'getByName("rilis")' not in t:
    hit = t.find("release {")
    ttd = t.find('signingConfig = signingConfigs.getByName("debug")', hit)
    if hit == -1 or ttd == -1:
        sys.exit("blok release tidak ditemukan")
    t = t[:ttd] + 'signingConfig = signingConfigs.getByName("rilis")' + t[ttd+len('signingConfig = signingConfigs.getByName("debug")'):]
p.write_text(t)
print("tanda tangan rilis disiapkan")

#!/usr/bin/env bash
# Cari peladen mana yang benar-benar melayani port dompet, dan periksa
# baris pemeriksa masa berlaku token di berkas yang dipakai.
set -u
echo "== 1. port 8080 / 8092"
(ss -ltnp 2>/dev/null || netstat -ltnp 2>/dev/null) | grep -E ':(8080|8092)[[:space:]]' || echo "(tidak ada)"
echo "== 2. unit viza"
systemctl list-units --type=service --all --no-legend 2>/dev/null | awk '{print $1}' | grep -i viza || echo "(tidak ada)"
for u in $(systemctl list-units --type=service --all --no-legend 2>/dev/null | awk '{print $1}' | grep -i viza); do
  echo "-- $u"
  systemctl show -p ExecStart -p WorkingDirectory "$u" 2>/dev/null | tr ';' '\n' | grep -E 'path=|WorkingDirectory'
done
echo "== 3. health lokal"
for p in 8080 8092; do echo -n "$p: "; curl -s --max-time 4 "http://127.0.0.1:$p/health" | head -c 240; echo; done
echo "== 4. berkas index.js dan baris cek kadaluarsa"
for f in /opt/viza-api/index.js /opt/viza-dompet/index.js /opt/*/index.js; do
  [ -f "$f" ] || continue
  echo "-- $f"
  grep -o 'v: "viza[^"]*"' "$f" | head -1
  grep -o 'v: "rezo[^"]*"' "$f" | head -1
  grep -n 'token kadaluarsa' -B3 "$f" | head -8
done
echo "== selesai"

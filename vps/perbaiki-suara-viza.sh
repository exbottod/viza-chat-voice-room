#!/usr/bin/env bash
# Suara Viza stabil: LiveKit dipaksa memakai SATU port media UDP (mux) + satu
# port TCP cadangan, jadi firewall cukup dibuka 2 port, bukan 10.000 port.
# Jalankan di VPS: sudo bash perbaiki-suara-viza.sh
# Aman: konfigurasi dicadangkan lebih dulu (livekit.yaml.bak-<waktu>).
set -uo pipefail

echo "== 1. Cari konfigurasi LiveKit"
UNIT=$(systemctl cat livekit 2>/dev/null | tr '\n' ' ')
CFG=""
for cand in $(echo "$UNIT" | grep -oE '\-\-config[= ][^ ]+' | sed 's/--config[= ]//'); do
  [ -f "$cand" ] && CFG="$cand" && break
done
if [ -z "$CFG" ]; then
  for cand in /etc/livekit.yaml /etc/livekit/livekit.yaml /opt/livekit-viza/config.yaml /root/livekit.yaml; do
    [ -f "$cand" ] && CFG="$cand" && break
  done
fi
if [ -z "$CFG" ]; then
  echo "Konfigurasi tidak ditemukan. Kirim keluaran ini:"
  systemctl cat livekit 2>/dev/null | head -20
  exit 1
fi
echo "Konfigurasi: $CFG"
echo "--- sebelum:"
grep -nE '^rtc:|^[[:space:]]+(tcp_port|udp_port|port_range_start|port_range_end|use_external_ip|node_ip)' "$CFG" || echo "(belum ada rtc)"

BAK="$CFG.bak-$(date +%Y%m%d-%H%M%S)"
cp -a "$CFG" "$BAK"
echo "Cadangan: $BAK"

echo
echo "== 2. Tulis ulang blok rtc: udp_port 7882 (mux), tcp_port 7888, tanpa port_range"
python3 - "$CFG" <<'PY'
import sys, re
path = sys.argv[1]
lines = open(path).read().splitlines()
out, di, sudah = [], False, False
for l in lines:
    if re.match(r'^rtc\s*:\s*$', l):
        di = True; sudah = True
        out.append(l)
        out.append('  udp_port: 7882')        # satu port UDP untuk semua peserta
        out.append('  tcp_port: 7888')        # cadangan kalau UDP diblokir
        out.append('  use_external_ip: true')
        out.append('  node_ip: 43.156.99.4')
        continue
    if di and re.match(r'^[^\s#]', l):
        di = False
    if di and re.match(r'^\s+(udp_port|tcp_port|use_external_ip|node_ip|port_range_start|port_range_end)\s*:', l):
        continue                              # baris lama dibuang, diganti di atas
    out.append(l)
if not sudah:
    out += ['rtc:', '  udp_port: 7882', '  tcp_port: 7888', '  use_external_ip: true', '  node_ip: 43.156.99.4']
open(path, 'w').write('\n'.join(out) + '\n')
print('konfigurasi ditulis')
PY

echo "--- sesudah:"
grep -nE '^rtc:|^[[:space:]]+(tcp_port|udp_port|port_range_start|port_range_end|use_external_ip|node_ip)' "$CFG"

echo
echo "== 3. Buka port di firewall VPS (ufw kalau ada)"
if command -v ufw >/dev/null 2>&1; then
  ufw allow 7882/udp >/dev/null 2>&1 || true
  ufw allow 7888/tcp >/dev/null 2>&1 || true
  ufw allow 7890/tcp >/dev/null 2>&1 || true
  ufw allow 443/tcp  >/dev/null 2>&1 || true
  echo "aturan ufw ditambahkan"
  ufw status | head -20
else
  echo "ufw tidak ada, lewati (atur di firewall/security group)"
fi

echo
echo "== 4. Restart LiveKit"
systemctl restart livekit
sleep 5
systemctl is-active livekit

echo
echo "== 5. Periksa port"
ss -lnup 2>/dev/null | grep -E ':7882' || echo "7882 UDP BELUM muncul"
ss -lntp 2>/dev/null | grep -E ':7888' || echo "7888 TCP BELUM muncul"

echo
echo "== 6. Log terakhir"
journalctl -u livekit -n 15 --no-pager 2>/dev/null | tail -15

echo
echo "SELESAI."
echo "PENTING: buka juga 2 port ini di Security Group Tencent Cloud (konsol):"
echo "  7882 UDP  dan  7888 TCP  (arah masuk, 0.0.0.0/0)"
echo "Kalau LiveKit gagal start, kembalikan: sudo cp $BAK $CFG && sudo systemctl restart livekit"

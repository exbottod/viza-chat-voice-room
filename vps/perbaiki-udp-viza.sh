#!/usr/bin/env bash
# Pasang port media UDP untuk LiveKit Viza, lalu restart dan periksa hasilnya.
# Jalankan di VPS: sudo bash perbaiki-udp-viza.sh
# Aman: file konfigurasi dicadangkan lebih dulu (livekit.yaml.bak-<waktu>).
set -uo pipefail

echo "== 1. Mencari berkas konfigurasi LiveKit"
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
echo "--- isi bagian rtc sebelum diubah:"
grep -nE '^rtc:|^[[:space:]]+(tcp_port|udp_port|port_range_start|port_range_end|use_external_ip|node_ip)' "$CFG" || echo "(belum ada bagian rtc)"

BAK="$CFG.bak-$(date +%Y%m%d-%H%M%S)"
cp -a "$CFG" "$BAK"
echo "Cadangan: $BAK"

echo
echo "== 2. Menambahkan rtc.tcp_port, rtc.udp_port, rtc.use_external_ip"
python3 - "$CFG" <<'PY'
import sys, re
path = sys.argv[1]
lines = open(path).read().splitlines()

def punya(k):
    return any(re.match(r'^\s+' + k + r'\s*:', l) for l in lines)

if not any(re.match(r'^rtc\s*:\s*$', l) for l in lines):
    lines.append('rtc:')

out, di = [], False
for l in lines:
    if re.match(r'^rtc\s*:\s*$', l):
        di = True
        out.append(l)
        continue
    if di and re.match(r'^[^\s#]', l):   # keluar dari blok rtc
        di = False
    out.append(l)
    if di and re.match(r'^rtc\s*:\s*$', l):
        # sisipkan setelah baris rtc:
        if not punya('tcp_port'):
            out.append('  tcp_port: 7881')
        if not punya('udp_port'):
            out.append('  udp_port: 7882')
        if not punya('use_external_ip'):
            out.append('  use_external_ip: true')

open(path, 'w').write('\n'.join(out) + '\n')
print('selesai menulis konfigurasi')
PY

echo "--- isi bagian rtc sesudah diubah:"
grep -nE '^rtc:|^[[:space:]]+(tcp_port|udp_port|port_range_start|port_range_end|use_external_ip|node_ip)' "$CFG"

echo
echo "== 3. Restart LiveKit"
systemctl restart livekit
sleep 4
systemctl is-active livekit

echo
echo "== 4. Periksa port media (harus muncul 7882 UDP dan 7881 TCP)"
ss -lnup 2>/dev/null | grep -E ':7882' || echo "7882 UDP BELUM muncul"
ss -lntp 2>/dev/null | grep -E ':7881' || echo "7881 TCP BELUM muncul"

echo
echo "== 5. Log terakhir"
journalctl -u livekit -n 20 --no-pager 2>/dev/null | tail -20

echo
echo "Selesai. Kalau 7882 UDP sudah muncul, tes suara di aplikasi."
echo "Kalau LiveKit gagal start, kembalikan cadangan: sudo cp $BAK $CFG && sudo systemctl restart livekit"

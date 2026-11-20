#!/usr/bin/env bash
# Perbaiki IP yang diiklankan LiveKit untuk suara Viza.
# Jalankan di VPS: sudo bash perbaiki-ip-viza.sh
#
# Kenapa perlu: eth0 VPS memakai IP privat (10.3.12.71), jadi LiveKit harus
# diberi tahu IP publiknya. Kalau tidak, HP diberi alamat yang tidak bisa
# dihubungi dan suara terus menyambung ulang.
set -uo pipefail

CFG=/etc/livekit/livekit.yaml
[ -f "$CFG" ] || CFG=/etc/livekit.yaml

IP_PUB=$(curl -s -m 10 https://ifconfig.me || curl -s -m 10 https://api.ipify.org)
echo "IP publik VPS: ${IP_PUB:-tidak terbaca}"
if [ -z "${IP_PUB:-}" ]; then
  echo "IP publik tidak terbaca. Periksa koneksi keluar VPS lalu jalankan lagi."
  exit 1
fi

echo
echo "== Isi konfigurasi sekarang (60 baris pertama)"
head -60 "$CFG"

BAK="$CFG.bak-$(date +%Y%m%d-%H%M%S)"
cp "$CFG" "$BAK"
echo
echo "Cadangan: $BAK"

python3 - "$CFG" "$IP_PUB" <<'PY'
import re, sys

path, ip = sys.argv[1], sys.argv[2]
lines = open(path).read().split('\n')

# 1) Kalau ada lebih dari satu blok "rtc:" tingkat atas, nonaktifkan yang
#    belakang. Blok ganda membuat pengaturan tambahan diabaikan LiveKit.
idx = [i for i, l in enumerate(lines) if re.match(r'^rtc:\s*$', l)]
for i in idx[1:]:
    lines[i] = '# duplikat diabaikan: ' + lines[i]

# 2) Tentukan batas blok rtc pertama.
if idx:
    start = idx[0]
    end = len(lines)
    for j in range(start + 1, len(lines)):
        if re.match(r'^[A-Za-z_][\w]*:\s*', lines[j]):
            end = j
            break
else:
    lines += ['rtc:']
    start = len(lines) - 1
    end = len(lines)

blok = lines[start + 1:end]

# 3) Nilai yang wajib ada.
wajib = {
    'tcp_port': '7888',
    'port_range_start': '50200',
    'port_range_end': '50300',
    'use_external_ip': 'true',
    'node_ip': ip,
}

ada = {}
for k, l in enumerate(blok):
    m = re.match(r'^\s+([A-Za-z_][\w]*):\s*(\S*)\s*$', l)
    if m and m.group(1) in wajib:
        ada[m.group(1)] = k

for key, val in wajib.items():
    if key in ada:
        blok[ada[key]] = f'  {key}: {val}'
    else:
        blok.append(f'  {key}: {val}')

lines[start + 1:end] = blok
open(path, 'w').write('\n'.join(lines))

print('\n== Bagian rtc sesudah diubah')
for l in blok:
    print(l)
PY

echo
echo "== Restart LiveKit"
systemctl restart livekit
sleep 5
echo "status: $(systemctl is-active livekit)"

echo
echo "== Port yang mendengar"
ss -lntp 2>/dev/null | grep -E '7880|7888' || echo "7880/7888 belum mendengar"

echo
echo "== Log: IP yang diiklankan dan port media"
journalctl -u livekit -n 120 --no-pager 2>/dev/null \
  | grep -iE 'external ip|node ip|ip:|udp|starting|error' | tail -20

echo
echo "== Uji jawaban server lewat HTTPS"
curl -s -o /dev/null -w "health: %{http_code}\n" -m 10 https://viza.43-156-99-4.sslip.io/health

echo
echo "Selesai. Kalau 'node_ip' menampilkan IP publik dan status active, tes suara di aplikasi."
echo "Mengembalikan cadangan: sudo cp $BAK $CFG && sudo systemctl restart livekit"

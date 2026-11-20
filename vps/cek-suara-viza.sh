#!/usr/bin/env bash
# Cek cepat kenapa suara Viza menyambung ulang.
# Jalankan di VPS: sudo bash cek-suara-viza.sh
# Tidak mengubah apa pun. Hanya membaca status, port, aturan firewall, dan log.
set -uo pipefail

echo "== 1. Layanan LiveKit"
systemctl is-active livekit 2>/dev/null || echo "livekit: tidak aktif"
systemctl is-enabled livekit 2>/dev/null || true
ss -lntup 2>/dev/null | grep -E '7880|7881|7882|50000|50001' || echo "tidak ada port LiveKit yang mendengar"

echo
echo "== 2. IP publik VPS (dibandingkan dengan yang diiklankan LiveKit)"
curl -s -m 8 https://ifconfig.me || curl -s -m 8 https://api.ipify.org
echo

echo "== 3. Konfigurasi rtc di livekit.yaml"
for f in /etc/livekit.yaml /etc/livekit/livekit.yaml /opt/livekit-viza/livekit.yaml /root/livekit.yaml; do
  if [ -f "$f" ]; then
    echo "--- $f"
    grep -nE '^\s*(rtc|port|tcp_port|udp_port|use_external_ip|node_ip|ips|turn|enabled|domain|cert_file|key_file|udp_port_range)' "$f" | head -30
  fi
done

echo
echo "== 4. Firewall"
if command -v ufw >/dev/null 2>&1; then ufw status numbered 2>/dev/null | head -25; fi
if command -v firewall-cmd >/dev/null 2>&1; then firewall-cmd --list-all 2>/dev/null | head -25; fi
iptables -S 2>/dev/null | grep -E '7881|7882|50000|DROP|REJECT' | head -20

echo
echo "== 5. Log LiveKit: bagian ICE, UDP, TURN, error (30 baris terakhir)"
journalctl -u livekit -n 400 --no-pager 2>/dev/null \
  | grep -iE 'ice|candidate|turn|udp|nat|no route|error|failed|reconnect' \
  | tail -30

echo
echo "== 6. Uji cepat port media dari VPS sendiri"
timeout 3 bash -c 'cat < /dev/null > /dev/tcp/127.0.0.1/7881' 2>/dev/null && echo "7881 TCP lokal: OK" || echo "7881 TCP lokal: tertutup"
echo
echo "Selesai. Kirim seluruh hasil ini."

#!/usr/bin/env bash
# Pasang LiveKit (suara room Viza) di VPS yang sama, lalu sambungkan ke dompet Viza.
# Aman dijalankan berulang: tidak menyentuh /opt/rezo-api dan tidak mengubah situs Rezo.
set -euo pipefail

DOMAIN="${DOMAIN:-viza.43-156-99-4.sslip.io}"
LK_DOMAIN="${LK_DOMAIN:-livekit.43-156-99-4.sslip.io}"
WALLET_DIR="${WALLET_DIR:-/opt/viza-api}"
UDP_AWAL=50000; UDP_AKHIR=50100

[ "$(id -u)" = "0" ] || { echo "Jalankan dengan sudo."; exit 1; }
say() { echo "== $*"; }

say "0/7 Cek tulis disk"
df -h / /tmp 2>/dev/null | tail -2 || true
TMPDIR="${TMPDIR:-/var/tmp}"; export TMPDIR
PROBE="/var/tmp/.lk-probe.$$"
if dd if=/dev/zero of="$PROBE" bs=1M count=2 status=none 2>/dev/null; then
  echo "   tulis 2 MB ke /var/tmp: OK"; rm -f "$PROBE"
else
  echo "   /var/tmp tidak bisa ditulis, pakai /root"; TMPDIR=/root
fi

say "1/7 Unduh livekit-server (tanpa menyimpan file besar)"
case "$(uname -m)" in
  x86_64|amd64) ARCH=amd64 ;;
  aarch64|arm64) ARCH=arm64 ;;
  *) echo "Arsitektur $(uname -m) tidak didukung"; exit 1 ;;
esac
CADANGAN="https://github.com/livekit/livekit/releases/download/v1.13.11/livekit_1.13.11_linux_amd64.tar.gz"
if [ -n "${LK_URL:-}" ]; then
  URL_ASSET="$LK_URL"; TAG="(dari LK_URL)"
else
  API=https://api.github.com/repos/livekit/livekit/releases/latest
  echo "   menanyakan versi terbaru ke GitHub (maks 25 detik)…"
  JSON=$(curl -fsSL --max-time 25 --retry 1 "$API" 2>/dev/null || true)
  TMP_TAG=$(printf '%s' "$JSON" | grep -m1 '"tag_name"' | cut -d'"' -f4)
  TMP_URL=$(printf '%s' "$JSON" | grep -o '"browser_download_url":[^,]*' | cut -d'"' -f4 | grep "linux_${ARCH}\.tar\.gz" | head -1)
  if [ -n "${TMP_URL:-}" ]; then URL_ASSET="$TMP_URL"; TAG="$TMP_TAG"; else URL_ASSET="$CADANGAN"; TAG="1.13.11 (cadangan)"; fi
fi
: "${TAG:=}"
TAG=$(printf '%s' "$JSON" | grep -m1 '"tag_name"' | cut -d'"' -f4)
VER="${TAG#v}"
URL_ASSET=$(printf '%s' "$JSON" | grep -o '"browser_download_url":[^,]*' | cut -d'"' -f4 | grep "linux_${ARCH}\.tar\.gz" | head -1)
[ -n "${URL_ASSET:-}" ] || URL_ASSET="https://github.com/livekit/livekit/releases/download/${TAG}/livekit_${VER}_linux_${ARCH}.tar.gz"
echo "   versi $TAG"
echo "   aset  $URL_ASSET"
if ! curl -fL --retry 3 --retry-delay 2 "$URL_ASSET" | tar -xz -C /usr/local/bin livekit-server; then
  echo "   aliran gagal, mencoba cara resmi LiveKit"
  curl -fsSL https://get.livekit.io | bash || true
fi
command -v livekit-server >/dev/null 2>&1 || { echo "livekit-server belum terpasang, hentikan."; exit 1; }
chmod +x /usr/local/bin/livekit-server
echo "   $(livekit-server --version 2>&1 | head -1) terpasang"


say "2/7 Kunci API"
mkdir -p /etc/livekit
if [ -f /etc/livekit/kunci.env ]; then
  . /etc/livekit/kunci.env
else
  LK_KEY="vizakey$(head -c4 /dev/urandom | od -An -tx1 | tr -d ' \n')"
  LK_SECRET="$(head -c32 /dev/urandom | base64 | tr -d '=+/' | head -c40)"
  cat > /etc/livekit/kunci.env <<EOF
LK_KEY=$LK_KEY
LK_SECRET=$LK_SECRET
EOF
  chmod 600 /etc/livekit/kunci.env
fi

say "3/7 Konfigurasi LiveKit"
cat > /etc/livekit/livekit.yaml <<EOF
port: 7880
bind_addresses:
  - 127.0.0.1
rtc:
  tcp_port: 7881
  port_range_start: $UDP_AWAL
  port_range_end: $UDP_AKHIR
  use_external_ip: true
keys:
  ${LK_KEY}: ${LK_SECRET}
logging:
  level: info
  json: false
room:
  empty_timeout: 300
  departure_timeout: 20
EOF
chmod 600 /etc/livekit/livekit.yaml

say "4/7 Layanan systemd"
cat > /etc/systemd/system/livekit.service <<'EOF'
[Unit]
Description=LiveKit Server (suara room Viza)
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
ExecStart=/usr/local/bin/livekit-server --config /etc/livekit/livekit.yaml
Restart=always
RestartSec=3
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload
systemctl enable livekit >/dev/null 2>&1 || true
systemctl restart livekit
sleep 2
systemctl is-active --quiet livekit && echo "   livekit aktif" || { journalctl -u livekit -n 20 --no-pager; exit 1; }

say "5/7 Firewall"
if command -v ufw >/dev/null 2>&1 && ufw status | grep -qi active; then
  ufw allow 7881/tcp >/dev/null 2>&1 || true
  ufw allow ${UDP_AWAL}:${UDP_AKHIR}/udp >/dev/null 2>&1 || true
  echo "   ufw: 7881/tcp dan ${UDP_AWAL}-${UDP_AKHIR}/udp dibuka"
else
  echo "   ufw tidak aktif, port tidak perlu dibuka"
fi

say "6/7 Caddy: $LK_DOMAIN -> 127.0.0.1:7880"
CF=/etc/caddy/Caddyfile
if [ ! -f "$CF" ]; then
  CF="$(systemctl cat caddy 2>/dev/null | grep -oE '\-\-config[= ][^ ]+' | awk '{print $2}' | tail -1 || true)"
fi
CF="${CF:-/etc/caddy/Caddyfile}"
if [ -f "$CF" ] && ! grep -q "$LK_DOMAIN" "$CF"; then
  cp "$CF" "${CF}.bak.$(date +%s)"
  cat >> "$CF" <<EOF

$LK_DOMAIN {
	reverse_proxy 127.0.0.1:7880
}
EOF
  if caddy validate --config "$CF" --adapter caddyfile >/dev/null 2>&1; then
    systemctl reload caddy 2>/dev/null || caddy reload --config "$CF" --adapter caddyfile
    echo "   Caddy diperbarui (cadangan ${CF}.bak.*)"
  else
    echo "   Caddyfile tidak valid, perubahan dibatalkan"
    cp "$(ls -t ${CF}.bak.* | head -1)" "$CF"
    exit 1
  fi
elif [ -f "$CF" ]; then
  echo "   blok $LK_DOMAIN sudah ada"
else
  echo "   Caddyfile tidak ditemukan. Tambahkan manual:"
  echo "   $LK_DOMAIN { reverse_proxy 127.0.0.1:7880 }"
fi

say "7/7 Sambungkan dompet Viza"
UNIT=""
for u in viza-api viza-dompet viza; do
  if systemctl list-unit-files 2>/dev/null | grep -q "^${u}\.service"; then UNIT="$u"; break; fi
done
if [ -z "$UNIT" ]; then
  echo "   Layanan dompet tidak ditemukan. Cari dengan: systemctl list-units --type=service | grep viza"
  exit 1
fi
mkdir -p "/etc/systemd/system/${UNIT}.service.d"
cat > "/etc/systemd/system/${UNIT}.service.d/livekit.conf" <<EOF
[Service]
Environment=LIVEKIT_URL=wss://$LK_DOMAIN
Environment=LIVEKIT_API_KEY=$LK_KEY
Environment=LIVEKIT_API_SECRET=$LK_SECRET
EOF
systemctl daemon-reload
systemctl restart "$UNIT"
sleep 3

echo
say "Hasil"
echo "LiveKit      : $(systemctl is-active livekit)  ($LK_DOMAIN)"
echo "Dompet Viza  : $(systemctl is-active "$UNIT")"
curl -fsS --max-time 10 "https://$DOMAIN/health" | head -c 200; echo
curl -fsS --max-time 10 -o /dev/null -w "LiveKit HTTPS: %{http_code}\n" "https://$LK_DOMAIN" || echo "LiveKit HTTPS: belum siap, tunggu 1-2 menit (sertifikat)"
echo
echo "Kunci API tersimpan di /etc/livekit/kunci.env (jangan dibagikan)."
echo "Sekarang pasang APK viza-1.0.51 lalu tekan mic di room."

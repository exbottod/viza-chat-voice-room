#!/usr/bin/env bash
# Pasang LiveKit (suara room Viza) di VPS ini, lalu sambungkan ke dompet Viza.
# Tidak menyentuh /opt/rezo-api dan tidak mengubah situs Rezo.
set -eo pipefail

DOMAIN="${DOMAIN:-viza.43-156-99-4.sslip.io}"
LK_DOMAIN="${LK_DOMAIN:-livekit.43-156-99-4.sslip.io}"
UDP_AWAL=50000
UDP_AKHIR=50100
TCP_PORT=7881
LK_URL_DEFAULT="https://github.com/livekit/livekit/releases/download/v1.13.11/livekit_1.13.11_linux_amd64.tar.gz"

say() { echo "== $*"; }

[ "$(id -u)" = "0" ] || { echo "Jalankan dengan sudo."; exit 1; }

say "0/7 Cek tulis disk"
df -h / | tail -1
if dd if=/dev/zero of=/var/tmp/.lk-probe bs=1M count=2 status=none 2>/dev/null; then
  echo "   tulis 2 MB ke /var/tmp: OK"; rm -f /var/tmp/.lk-probe
else
  echo "   /var/tmp tidak bisa ditulis"
fi

say "1/7 Unduh livekit-server (dialirkan, tanpa file sementara)"
case "$(uname -m)" in
  x86_64|amd64) ARCH=amd64 ;;
  aarch64|arm64) ARCH=arm64 ;;
  *) echo "Arsitektur $(uname -m) tidak didukung"; exit 1 ;;
esac
URL_ASSET="${LK_URL:-$LK_URL_DEFAULT}"
echo "   aset: $URL_ASSET"
if ! curl -fL --retry 2 --progress-bar "$URL_ASSET" | tar -xz -C /usr/local/bin livekit-server; then
  echo "   aliran gagal, mencoba cara resmi LiveKit"
  curl -fsSL https://get.livekit.io | bash || true
fi
if ! command -v livekit-server >/dev/null 2>&1; then
  echo "livekit-server belum terpasang. Hentikan."
  exit 1
fi
chmod +x /usr/local/bin/livekit-server
echo "   terpasang: $(/usr/local/bin/livekit-server --version 2>&1 | head -1)"

say "2/7 Kunci API"
mkdir -p /etc/livekit
if [ -f /etc/livekit/kunci.env ]; then
  LK_KEY=$(grep '^LK_KEY=' /etc/livekit/kunci.env | cut -d= -f2)
  LK_SECRET=$(grep '^LK_SECRET=' /etc/livekit/kunci.env | cut -d= -f2)
  echo "   memakai kunci yang sudah ada"
else
  LK_KEY="vizakey$(head -c4 /dev/urandom | od -An -tx1 | tr -d ' \n')"
  LK_SECRET="$(head -c32 /dev/urandom | base64 | tr -d '=+/' | head -c40)"
  printf 'LK_KEY=%s\nLK_SECRET=%s\n' "$LK_KEY" "$LK_SECRET" > /etc/livekit/kunci.env
  chmod 600 /etc/livekit/kunci.env
  echo "   kunci baru dibuat di /etc/livekit/kunci.env"
fi

say "3/7 Konfigurasi LiveKit"
for kandidat in 7881 7882 7883 7884; do
  if ! ss -lptn 2>/dev/null | grep -q ":${kandidat} "; then TCP_PORT="$kandidat"; break; fi
done
echo "   port TCP media: $TCP_PORT"
ss -lptn 2>/dev/null | grep -q ":${TCP_PORT} " && { echo "   port $TCP_PORT tetap dipakai proses lain"; exit 1; }
cat > /etc/livekit/livekit.yaml <<EOF
port: 7880
bind_addresses:
  - 127.0.0.1
rtc:
  tcp_port: $TCP_PORT
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
sleep 3
if systemctl is-active --quiet livekit; then
  echo "   livekit aktif"
else
  journalctl -u livekit -n 20 --no-pager
  echo "   port yang dipakai:"; ss -lptn | grep -E ":(7880|7881|7882|7883|7884) " || true
  exit 1
fi

say "5/7 Firewall"
if command -v ufw >/dev/null 2>&1 && ufw status | grep -qi active; then
  ufw allow "${TCP_PORT}/tcp" >/dev/null 2>&1 || true
  ufw allow "${UDP_AWAL}:${UDP_AKHIR}/udp" >/dev/null 2>&1 || true
  echo "   ufw dibuka: ${TCP_PORT}/tcp, ${UDP_AWAL}-${UDP_AKHIR}/udp"
else
  echo "   ufw tidak aktif"
fi

say "6/7 Caddy: $LK_DOMAIN -> 127.0.0.1:7880"
CF=/etc/caddy/Caddyfile
if [ ! -f "$CF" ]; then
  CF_PID=$(systemctl show -p MainPID --value caddy 2>/dev/null || true)
  CF_CMD=$(tr '\0' ' ' < "/proc/${CF_PID:-0}/cmdline" 2>/dev/null || true)
  CF_ALT=$(printf '%s' "$CF_CMD" | tr ' ' '\n' | grep -A1 -- '--config' | tail -1 || true)
  [ -n "${CF_ALT:-}" ] && [ -f "$CF_ALT" ] && CF="$CF_ALT"
fi
if [ -f "$CF" ] && grep -q "$LK_DOMAIN" "$CF"; then
  echo "   blok $LK_DOMAIN sudah ada di $CF"
elif [ -f "$CF" ]; then
  cp "$CF" "${CF}.bak.$(date +%s)"
  printf '\n%s {\n\treverse_proxy 127.0.0.1:7880\n}\n' "$LK_DOMAIN" >> "$CF"
  if caddy validate --config "$CF" --adapter caddyfile >/dev/null 2>&1; then
    systemctl reload caddy 2>/dev/null || true
    echo "   Caddy diperbarui ($CF)"
  else
    echo "   Caddyfile tidak valid, perubahan dibatalkan"
    cp "$(ls -t "${CF}".bak.* | head -1)" "$CF"
    exit 1
  fi
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
  echo "   layanan dompet tidak ditemukan. Cek: systemctl list-units --type=service | grep viza"
  exit 1
fi
mkdir -p "/etc/systemd/system/${UNIT}.service.d"
{
  echo "[Service]"
  echo "Environment=LIVEKIT_URL=wss://$LK_DOMAIN"
  echo "Environment=LIVEKIT_API_KEY=$LK_KEY"
  echo "Environment=LIVEKIT_API_SECRET=$LK_SECRET"
} > "/etc/systemd/system/${UNIT}.service.d/livekit.conf"
systemctl daemon-reload
systemctl restart "$UNIT"
sleep 3

echo
say "Hasil"
echo "LiveKit      : $(systemctl is-active livekit) ($LK_DOMAIN)"
echo "Dompet Viza  : $(systemctl is-active "$UNIT")"
curl -fsS --max-time 10 "https://$DOMAIN/health" | head -c 220 || echo "(health dompet belum menjawab)"
echo
curl -s -o /dev/null -w "LiveKit HTTPS: %{http_code}\n" --max-time 15 "https://$LK_DOMAIN" || echo "LiveKit HTTPS: belum siap, tunggu 1-2 menit (sertifikat)"
echo
echo "Kunci API: /etc/livekit/kunci.env (jangan dibagikan)."
echo "Selesai. Pasang APK terbaru, masuk room, tekan mic."

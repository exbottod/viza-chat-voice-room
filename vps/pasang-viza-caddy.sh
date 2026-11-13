#!/usr/bin/env bash
# Pasang dompet Viza di belakang Caddy (bukan nginx).
# Caddy sudah memegang port 80/443 untuk Rezo, jadi Viza cukup ditambahkan
# sebagai situs baru dan sertifikat HTTPS-nya diurus Caddy otomatis.
#
# Pakai: curl -fsSL https://raw.githubusercontent.com/exbottod/viza-chat-voice-room/main/vps/pasang-viza-caddy.sh -o caddy-viza.sh && sudo bash caddy-viza.sh
set -uo pipefail

DIR=/opt/viza-api
DOMAIN=${DOMAIN:-viza.43-156-99-4.sslip.io}
CADDYFILE=${CADDYFILE:-/etc/caddy/Caddyfile}

[ "$(id -u)" = 0 ] || { echo "Jalankan sebagai root (sudo)"; exit 1; }
command -v node >/dev/null || { echo "Node tidak ada"; exit 1; }

echo "== 1/6 Port dompet Viza =="
PORT=$(cat /var/lib/viza-port 2>/dev/null || true)
if [ -z "$PORT" ]; then
  for p in 8091 8092 8093 8095 8096 8097 8098; do
    ss -ltn 2>/dev/null | awk '{print $4}' | grep -qE "[:.]$p\$" || { PORT=$p; break; }
  done
fi
[ -n "$PORT" ] || { echo "Tidak ada port kosong"; exit 1; }
echo "port: $PORT"
echo "$PORT" > /var/lib/viza-port

echo "== 2/6 Layanan dompet =="
mkdir -p "$DIR/data" "$DIR/aset"
cat > /etc/systemd/system/viza-dompet.service <<UNIT
[Unit]
Description=Dompet Viza (terpisah dari Rezo)
After=network-online.target

[Service]
WorkingDirectory=$DIR
Environment=PORT=$PORT
Environment=BATAS_ISI_MB=20
ExecStart=$(command -v node) $DIR/server.js
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
UNIT
systemctl daemon-reload
systemctl enable viza-dompet >/dev/null 2>&1 || true
systemctl restart viza-dompet
for i in $(seq 1 15); do
  sleep 1
  curl -s --max-time 3 "http://127.0.0.1:$PORT/health" | grep -q '"ok":1' && break
done
echo -n "health lokal: "; curl -s --max-time 5 "http://127.0.0.1:$PORT/health"; echo

echo "== 3/6 Bersihkan nginx yang berebut port =="
if systemctl list-unit-files 2>/dev/null | grep -q '^nginx\.service'; then
  systemctl disable --now nginx >/dev/null 2>&1 || true
  rm -f /etc/nginx/sites-enabled/viza-dompet
  echo "nginx dimatikan (Caddy yang melayani 80/443)"
fi

echo "== 4/6 Caddy =="
if ! systemctl list-unit-files 2>/dev/null | grep -q '^caddy\.service'; then
  echo "Caddy bukan layanan systemd. Cek manual: ss -ltnp | grep caddy"
  echo "Kalau Caddy di Docker, tambahkan di Caddyfile container:"
  echo "  $DOMAIN {"; echo "    reverse_proxy 127.0.0.1:$PORT"; echo "  }"
  exit 1
fi
[ -f "$CADDYFILE" ] || { echo "Caddyfile tidak ada di $CADDYFILE"; exit 1; }
cp "$CADDYFILE" "$CADDYFILE.bak-$(date +%s)"
if grep -q "^$DOMAIN" "$CADDYFILE" || grep -q "$DOMAIN {" "$CADDYFILE"; then
  echo "situs $DOMAIN sudah ada di Caddyfile"
else
  printf '\n# Dompet Viza (ditambahkan otomatis)\n%s {\n\treverse_proxy 127.0.0.1:%s\n}\n' "$DOMAIN" "$PORT" >> "$CADDYFILE"
  echo "situs $DOMAIN ditambahkan"
fi
if caddy validate --config "$CADDYFILE" --adapter caddyfile >/tmp/caddy-val.log 2>&1; then
  echo "Caddyfile sah"
else
  echo "Caddyfile ditolak:"; tail -5 /tmp/caddy-val.log
  echo "Kembalikan dari cadangan terbaru kalau perlu: cp $CADDYFILE.bak-* $CADDYFILE"
  exit 1
fi

echo "== 5/6 Muat ulang Caddy =="
systemctl reload caddy || systemctl restart caddy
sleep 4

echo "== 6/6 Uji =="
echo -n "domain https : "; curl -s --max-time 20 "https://$DOMAIN/health" || echo "(gagal)"
echo
echo -n "domain http  : "; curl -s --max-time 12 "http://$DOMAIN/health" || echo "(gagal)"
echo
echo "Selesai."

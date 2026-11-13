#!/usr/bin/env bash
# Dompet VIZA mandiri: layanan, database, port, dan domain sendiri.
# Tidak menyentuh /opt/rezo-api milik Rezo.
# Pakai: sudo bash <(curl -fsSL https://raw.githubusercontent.com/exbottod/viza-chat-voice-room/main/vps/pasang-dompet-viza.sh)
set -euo pipefail
DIR=/opt/viza-api
RAW=https://raw.githubusercontent.com/exbottod/viza-chat-voice-room/main
DOMAIN=${DOMAIN:-viza.43-156-99-4.sslip.io}
PORT=${PORT:-8091}
EMAIL=${EMAIL:-bangexx01@gmail.com}
[ "$(id -u)" = 0 ] || { echo "Jalankan sebagai root"; exit 1; }
command -v node >/dev/null || { echo "Node belum terpasang (butuh Node 22.13+)"; exit 1; }
NODE=$(command -v node)
echo "Node: $($NODE -v)"

# Layanan Rezo tidak boleh ikut tersentuh.
[ -d /opt/rezo-api ] && echo "Dompet Rezo ada di /opt/rezo-api (tidak diubah)."

mkdir -p "$DIR/data" "$DIR/aset"
echo "Mengunduh kode dompet Viza..."
curl -fsSL "$RAW/wallet/index.js" -o "$DIR/index.js"
curl -fsSL "$RAW/wallet/server.js" -o "$DIR/server.js"
"$NODE" --check "$DIR/index.js"
"$NODE" --check "$DIR/server.js"

cat > /etc/systemd/system/viza-dompet.service <<UNIT
[Unit]
Description=Dompet Viza (terpisah dari Rezo)
After=network-online.target

[Service]
WorkingDirectory=$DIR
Environment=PORT=$PORT
Environment=BATAS_ISI_MB=20
ExecStart=$NODE $DIR/server.js
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
UNIT
systemctl daemon-reload
systemctl enable viza-dompet >/dev/null 2>&1 || true
systemctl restart viza-dompet
sleep 2
echo -n "status layanan: "; systemctl is-active viza-dompet

if command -v nginx >/dev/null; then
  cat > /etc/nginx/sites-available/viza-dompet <<NG
server {
  listen 80;
  server_name $DOMAIN;
  client_max_body_size 25m;
  location / {
    proxy_pass http://127.0.0.1:$PORT;
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-Proto \$scheme;
    proxy_read_timeout 120s;
  }
}
NG
  ln -sf /etc/nginx/sites-available/viza-dompet /etc/nginx/sites-enabled/viza-dompet
  nginx -t && systemctl reload nginx
  if command -v certbot >/dev/null; then
    certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "$EMAIL" --redirect || echo "Sertifikat belum berhasil, domain masih http"
  else
    echo "certbot belum ada. Jalankan: apt install -y certbot python3-certbot-nginx lalu ulangi skrip ini"
  fi
else
  echo "nginx tidak ada, dompet hanya bisa diakses lewat port $PORT"
fi

sleep 1
echo
echo -n "health lokal  : "; curl -s --max-time 8 "http://127.0.0.1:$PORT/health" || echo "(gagal)"
echo
echo -n "health publik : "; curl -s --max-time 15 "https://$DOMAIN/health" || echo "(gagal, cek DNS/sertifikat)"
echo
echo "Selesai. Dompet Viza terpisah dari Rezo."

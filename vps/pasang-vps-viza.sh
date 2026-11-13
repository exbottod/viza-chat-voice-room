#!/usr/bin/env bash
# Siapkan VPS BARU khusus Viza dari nol (Ubuntu 22.04 / 24.04).
# Hasil akhir: dompet Viza hidup sendiri di mesin ini, domain otomatis dari IP
# (sslip.io), HTTPS aktif, database SQLite sendiri. Tidak menyentuh VPS Rezo.
#
# Pakai:  sudo bash <(curl -fsSL https://raw.githubusercontent.com/exbottod/viza-chat-voice-room/main/vps/pasang-vps-viza.sh)
set -euo pipefail

RAW=https://raw.githubusercontent.com/exbottod/viza-chat-voice-room/main
DIR=/opt/viza-api
PORT=8091
EMAIL=${EMAIL:-bangexx01@gmail.com}

[ "$(id -u)" = 0 ] || { echo "Jalankan sebagai root (pakai sudo)"; exit 1; }

IP=$(curl -fsS --max-time 20 https://api.ipify.org || true)
[ -n "$IP" ] || { echo "Tidak bisa membaca IP publik server ini"; exit 1; }
DOMAIN=${DOMAIN:-${IP//./-}.sslip.io}
echo "IP server : $IP"
echo "Domain    : $DOMAIN"

echo "== 1/6 Paket dasar =="
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq curl ca-certificates gnupg nginx certbot python3-certbot-nginx >/dev/null

echo "== 2/6 Node 22 =="
if ! node -v 2>/dev/null | grep -qE '^v(2[2-9]|[3-9][0-9])\.'; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash - >/dev/null
  apt-get install -y -qq nodejs >/dev/null
fi
NODE=$(command -v node)
echo "Node: $($NODE -v)"

echo "== 3/6 Kode dompet Viza =="
mkdir -p "$DIR/data" "$DIR/aset"
curl -fsSL "$RAW/wallet/index.js" -o "$DIR/index.js"
curl -fsSL "$RAW/wallet/server.js" -o "$DIR/server.js"
"$NODE" --check "$DIR/index.js"
"$NODE" --check "$DIR/server.js"

echo "== 4/6 Layanan =="
cat > /etc/systemd/system/viza-dompet.service <<UNIT
[Unit]
Description=Dompet Viza (VPS khusus Viza)
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
echo -n "status layanan : "; systemctl is-active viza-dompet

echo "== 5/6 Nginx =="
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
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

echo "== 6/6 Sertifikat HTTPS =="
certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "$EMAIL" --redirect \
  || echo "Sertifikat belum berhasil, sementara masih http://$DOMAIN"

if command -v ufw >/dev/null && ufw status | grep -q "Status: active"; then
  ufw allow OpenSSH >/dev/null || true
  ufw allow 'Nginx Full' >/dev/null || true
fi

sleep 1
echo
echo -n "health lokal  : "; curl -s --max-time 8 "http://127.0.0.1:$PORT/health" || echo "(gagal)"
echo
echo -n "health publik : "; curl -s --max-time 15 "https://$DOMAIN/health" || echo "(gagal)"
echo
echo "==================================================="
echo " VPS Viza siap."
echo " Alamat dompet : https://$DOMAIN"
echo " Panel memakai : https://$DOMAIN/admin"
echo " Kirim alamat di atas ke saya supaya panel dan APK"
echo " diarahkan ke VPS baru ini."
echo "==================================================="

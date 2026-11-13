#!/usr/bin/env bash
# Perbaiki pemasangan dompet Viza yang gagal: port bentrok, certbot belum ada,
# HTTPS belum terbit. Idempoten, boleh dijalankan berkali-kali.
#
# Pakai: curl -fsSL https://raw.githubusercontent.com/exbottod/viza-chat-voice-room/main/vps/perbaiki-dompet-viza.sh -o perbaiki.sh && sudo bash perbaiki.sh
set -uo pipefail

RAW=https://raw.githubusercontent.com/exbottod/viza-chat-voice-room/main
DIR=/opt/viza-api
DOMAIN=${DOMAIN:-viza.43-156-99-4.sslip.io}
EMAIL=${EMAIL:-bangexx01@gmail.com}

[ "$(id -u)" = 0 ] || { echo "Jalankan sebagai root (sudo)"; exit 1; }
NODE=$(command -v node) || { echo "Node belum ada"; exit 1; }

echo "== 1/6 Pastikan kode ada =="
mkdir -p "$DIR/data" "$DIR/aset"
if ! "$NODE" --check "$DIR/index.js" 2>/dev/null || ! "$NODE" --check "$DIR/server.js" 2>/dev/null; then
  curl -fsSL "$RAW/wallet/index.js" -o "$DIR/index.js"
  curl -fsSL "$RAW/wallet/server.js" -o "$DIR/server.js"
fi
"$NODE" --check "$DIR/index.js" && "$NODE" --check "$DIR/server.js" && echo "kode OK"

echo "== 2/6 Cari port kosong =="
terpakai() { ss -ltn 2>/dev/null | awk '{print $4}' | grep -qE "[:.]$1\$"; }
PORT=""
for p in 8091 8092 8093 8095 8096 8097 8098 8101 8102 8103; do
  if ! terpakai "$p"; then PORT=$p; break; fi
done
[ -n "$PORT" ] || { echo "Tidak ada port kosong di daftar"; exit 1; }
echo "Port dompet Viza: $PORT"
[ -f /var/lib/viza-port ] && PORT=$(cat /var/lib/viza-port) && echo "Port tercatat sebelumnya: $PORT"
echo "$PORT" > /var/lib/viza-port

echo "== 3/6 Layanan =="
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

SEHAT=0
for i in $(seq 1 15); do
  sleep 1
  if curl -s --max-time 3 "http://127.0.0.1:$PORT/health" | grep -q '"ok":1'; then SEHAT=1; break; fi
done
if [ "$SEHAT" = 1 ]; then
  echo "layanan SEHAT di port $PORT"
else
  echo "layanan BELUM sehat. 20 baris log terakhir:"
  journalctl -u viza-dompet -n 20 --no-pager || true
  echo "Isi port $PORT sekarang:"; curl -s --max-time 3 "http://127.0.0.1:$PORT/health" || true; echo
fi

echo "== 4/6 Nginx =="
if command -v nginx >/dev/null; then
  cat > /etc/nginx/sites-available/viza-dompet <<NG
server {
  listen 80;
  listen [::]:80;
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
  if nginx -t 2>/tmp/nginxt.log; then
    systemctl reload nginx; echo "nginx OK"
  else
    echo "nginx menolak konfigurasi:"; cat /tmp/nginxt.log
  fi
  echo -n "dengar port 80: "; ss -ltn | grep -qE '[:.]80\s' && echo "ya" || echo "TIDAK"
else
  echo "nginx belum ada"
fi

echo "== 5/6 Certbot =="
if ! command -v certbot >/dev/null; then
  echo "memasang certbot..."
  apt-get update -y
  DEBIAN_FRONTEND=noninteractive apt-get install -y certbot python3-certbot-nginx
fi
if command -v certbot >/dev/null; then
  certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "$EMAIL" --redirect \
    || echo "certbot gagal. Biasanya karena port 80 belum dibuka di firewall penyedia VPS."
else
  echo "certbot masih belum terpasang"
fi

echo "== 6/6 Uji =="
echo -n "lokal  : "; curl -s --max-time 6 "http://127.0.0.1:$PORT/health" || echo "(gagal)"
echo
echo -n "domain : "; curl -s --max-time 12 "https://$DOMAIN/health" || echo "(belum https)"
echo
echo -n "domain http : "; curl -s --max-time 8 "http://$DOMAIN/health" || echo "(port 80 tertutup)"
echo
echo "Selesai. Utamakan baris 'domain :' yang berisi JSON ok:1."

#!/usr/bin/env bash
# Tambahkan dompet Viza ke Caddy yang sudah ada, apa pun cara jalannya
# (systemd atau Docker). Situs Rezo tidak diubah, Caddyfile dicadangkan dulu.
#
# Pakai: curl -fsSL https://raw.githubusercontent.com/exbottod/viza-chat-voice-room/main/vps/pasang-viza-caddy2.sh -o cv2.sh && sudo bash cv2.sh
set -uo pipefail
DIR=/opt/viza-api
DOMAIN=${DOMAIN:-viza.43-156-99-4.sslip.io}
[ "$(id -u)" = 0 ] || { echo "Jalankan sebagai root (sudo)"; exit 1; }

echo "== 1/5 Dompet Viza =="
PORT=$(cat /var/lib/viza-port 2>/dev/null || echo 8092)
if ! curl -s --max-time 3 "http://127.0.0.1:$PORT/health" | grep -q '"ok":1'; then
  for p in 8091 8092 8093 8095 8096 8097; do
    ss -ltn 2>/dev/null | awk '{print $4}' | grep -qE "[:.]$p\$" || { PORT=$p; break; }
  done
  echo "port baru: $PORT"; echo "$PORT" > /var/lib/viza-port
  systemctl stop viza-dompet >/dev/null 2>&1 || true
  sed -i "s/^Environment=PORT=.*/Environment=PORT=$PORT/" /etc/systemd/system/viza-dompet.service 2>/dev/null || true
  grep -q "^Environment=PORT=" /etc/systemd/system/viza-dompet.service 2>/dev/null || \
    sed -i "/^\[Service\]/a Environment=PORT=$PORT" /etc/systemd/system/viza-dompet.service
  systemctl daemon-reload; systemctl restart viza-dompet
  for i in $(seq 1 12); do sleep 1; curl -s --max-time 3 "http://127.0.0.1:$PORT/health" | grep -q '"ok":1' && break; done
fi
echo -n "health lokal: "; curl -s --max-time 5 "http://127.0.0.1:$PORT/health"; echo
curl -s --max-time 5 "http://127.0.0.1:$PORT/health" | grep -q '"ok":1' || { echo "dompet belum sehat, berhenti"; exit 1; }

echo "== 2/5 Cari Caddyfile =="
CF=""; CARA=""; DOCKER_NAMA=""; CF_DALAM=""
PID=$(pgrep -x caddy | head -1 || true)
if [ -n "$PID" ]; then
  CMDL=$(tr '\0' ' ' < "/proc/$PID/cmdline")
  echo "proses caddy: $CMDL"
  CF=$(echo "$CMDL" | grep -oE '\-\-config[= ][^ ]+' | head -1 | sed 's/.*[= ]//')
fi
if command -v docker >/dev/null && docker ps --format '{{.Names}} {{.Image}}' 2>/dev/null | grep -qi caddy; then
  CARA="docker"
  DOCKER_NAMA=$(docker ps --format '{{.Names}} {{.Image}}' | grep -i caddy | awk '{print $1}' | head -1)
  echo "container caddy: $DOCKER_NAMA"
  MOUNTS=$(docker inspect -f '{{range .Mounts}}{{.Source}}|{{.Destination}}{{"\n"}}{{end}}' "$DOCKER_NAMA" 2>/dev/null || true)
  echo "$MOUNTS" | sed 's/^/  mount: /'
  HOST_CF=$(echo "$MOUNTS" | awk -F'|' 'tolower($2) ~ /caddyfile/ {print $1}' | head -1)
  [ -n "$HOST_CF" ] && CF="$HOST_CF" && CF_DALAM=$(echo "$MOUNTS" | awk -F'|' 'tolower($2) ~ /caddyfile/ {print $2}' | head -1)
fi
if [ -z "$CF" ] || [ ! -f "$CF" ]; then
  for c in /etc/caddy/Caddyfile /opt/*/Caddyfile /opt/*/*/Caddyfile /root/Caddyfile /home/*/Caddyfile; do
    [ -f "$c" ] && CF="$c" && break
  done
fi
if [ -z "$CF" ] || [ ! -f "$CF" ]; then
  echo "Caddyfile tidak ditemukan. Kirim keluaran perintah ini ke saya:"
  echo "  sudo docker ps --format '{{.Names}} {{.Image}} {{.Ports}}'"
  echo "  sudo docker inspect -f '{{range .Mounts}}{{.Source}} => {{.Destination}}{{\"\\n\"}}{{end}}' \$(sudo docker ps --format '{{.Names}}' | head -1)"
  echo "  sudo find / -maxdepth 5 -name 'Caddyfile*' 2>/dev/null | head"
  exit 1
fi
echo "Caddyfile: $CF"

echo "== 3/5 Sisipkan situs Viza =="
cp "$CF" "$CF.bak-$(date +%s)"
if grep -q "$DOMAIN" "$CF"; then
  echo "sudah ada, tidak ditambah lagi"
else
  printf '\n# Dompet Viza (otomatis)\n%s {\n\treverse_proxy 127.0.0.1:%s\n}\n' "$DOMAIN" "$PORT" >> "$CF"
  echo "ditambahkan ke $CF"
fi
tail -6 "$CF"

echo "== 4/5 Muat ulang Caddy =="
if [ "$CARA" = "docker" ]; then
  CF_DALAM=${CF_DALAM:-/etc/caddy/Caddyfile}
  docker exec "$DOCKER_NAMA" caddy validate --config "$CF_DALAM" --adapter caddyfile >/tmp/cv.log 2>&1 \
    && docker exec "$DOCKER_NAMA" caddy reload --config "$CF_DALAM" --adapter caddyfile >/tmp/cv2.log 2>&1 \
    || { echo "gagal reload:"; tail -5 /tmp/cv.log /tmp/cv2.log 2>/dev/null; echo "coba: sudo docker restart $DOCKER_NAMA"; exit 1; }
  echo "reload via docker OK"
elif systemctl list-unit-files 2>/dev/null | grep -q '^caddy\.service'; then
  caddy validate --config "$CF" --adapter caddyfile >/tmp/cv.log 2>&1 || { echo "Caddyfile ditolak:"; tail -5 /tmp/cv.log; exit 1; }
  systemctl reload caddy && echo "reload via systemd OK"
else
  if [ -n "$PID" ]; then
    caddy reload --config "$CF" --adapter caddyfile >/tmp/cv.log 2>&1 && echo "reload langsung OK" || { tail -5 /tmp/cv.log; echo "coba: sudo pkill -HUP caddy"; exit 1; }
  else
    echo "Caddy tidak bisa dimuat ulang otomatis"; exit 1
  fi
fi
sleep 5

echo "== 5/5 Uji =="
echo -n "domain https : "; curl -s --max-time 20 "https://$DOMAIN/health" || echo "(gagal)"
echo
echo "Selesai."

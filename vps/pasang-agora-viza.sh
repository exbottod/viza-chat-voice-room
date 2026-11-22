#!/usr/bin/env bash
# Pasang token suara Agora di VPS dompet Viza.
# Jalankan di VPS: sudo bash pasang-agora-viza.sh
# App ID boleh ditulis di sini; App Certificate ditanyakan dan tidak ditampilkan.
set -uo pipefail
[ "$(id -u)" = 0 ] || { echo "Jalankan dengan sudo."; exit 1; }
DIR=/opt/viza-api
RAW=https://raw.githubusercontent.com/exbottod/viza-chat-voice-room/main
APP_ID="${1:-406ff649c0bd49d397b487d22d075493}"

echo "== 1. App ID: $APP_ID"
read -rp "Tempel App Certificate lalu tekan Enter (tidak akan tampil): " -s CERT
echo
[ -n "$CERT" ] || { echo "App Certificate kosong, berhenti."; exit 1; }
if [ ${#CERT} -ne 32 ]; then
  echo "Peringatan: panjang App Certificate ${#CERT} karakter, biasanya 32. Lanjut saja."
fi

echo
echo "== 2. Perbarui kode dompet (ada jalur /agora-token)"
cp -a "$DIR/index.js" "$DIR/index.js.bak-$(date +%Y%m%d-%H%M%S)" 2>/dev/null || true
curl -fsSL "$RAW/wallet/index.js" -o "$DIR/index.js" || { echo "Gagal mengunduh index.js"; exit 1; }
node --check "$DIR/index.js" || { echo "index.js rusak, berhenti"; exit 1; }
echo "index.js terbaru: $(wc -l < "$DIR/index.js") baris"

echo
echo "== 3. Pasang pustaka token Agora"
cd "$DIR" || exit 1
if [ ! -f package.json ]; then
  printf '{\n  "name": "viza-api",\n  "private": true,\n  "type": "module"\n}\n' > package.json
  echo "package.json dibuat (type: module)"
else
  echo "package.json sudah ada, dibiarkan"
fi
if npm install agora-token --silent --no-audit --no-fund 2>&1 | tail -3; then
  echo "pustaka terpasang: $(node -e "const m=require('agora-token');console.log('ok')" 2>/dev/null || echo 'cek nanti')"
else
  echo "npm gagal, coba tanpa --silent"
  npm install agora-token || { echo "Pustaka gagal dipasang. Cek internet VPS."; exit 1; }
fi

echo
echo "== 4. Simpan App ID dan Certificate sebagai lingkungan layanan"
DIRS="/etc/systemd/system/viza-dompet.service.d"
mkdir -p "$DIRS"
cat > "$DIRS/agora.conf" <<EOF
[Service]
Environment=AGORA_APP_ID=$APP_ID
Environment=AGORA_APP_CERTIFICATE=$CERT
EOF
chmod 600 "$DIRS/agora.conf"
echo "ditulis: $DIRS/agora.conf (hanya root yang bisa baca)"
systemctl daemon-reload
systemctl restart viza-dompet
sleep 3
echo "status viza-dompet: $(systemctl is-active viza-dompet)"
systemctl show viza-dompet -p Environment | grep -q "AGORA_APP_ID=$APP_ID" && echo "App ID terbaca layanan: ya" || echo "App ID terbaca layanan: TIDAK"

echo
echo "== 5. Uji jalur /agora-token (tanpa login harus 401)"
PORT=$(cat /var/lib/viza-port 2>/dev/null || echo 8092)
curl -s -o /tmp/ag -w "kode %{http_code}\n" --max-time 8 -X POST -H 'content-type: application/json' \
  -d '{"channel":"uji"}' "http://127.0.0.1:$PORT/agora-token" || true
head -c 160 /tmp/ag 2>/dev/null; echo

echo
echo "== 6. Uji pembuatan token langsung (tanpa HP)"
node -e '
const { RtcTokenBuilder, RtcRole } = require("agora-token");
const t = RtcTokenBuilder.buildTokenWithUid(process.argv[1], process.argv[2], "uji-room", 12345, RtcRole.PUBLISHER, 3600, 3600);
console.log("token dibuat, panjang", t.length, "awalan", t.slice(0,3));
' "$APP_ID" "$CERT" || echo "token gagal dibuat, cek App ID/Certificate"

echo
echo "SELESAI. Kalau langkah 5 membalas 401 dan langkah 6 membuat token, server sudah siap."

#!/usr/bin/env bash
# Pasang App ID + App Certificate Agora di VPS dompet Viza, lalu hidupkan jalur
# /agora-token. Tidak ada isian tersembunyi, jadi tidak terlihat "macet".
#
# Tiga cara mengisi App Certificate:
#   1. sudo bash pasang-agora-viza.sh 406ff649c0bd49d397b487d22d075493 <CERT>
#   2. tulis dulu: echo '<CERT>' > /root/agora-cert.txt lalu jalankan skrip
#   3. ketik/tempel saat diminta (tampil di layar, itu normal)
set -uo pipefail
[ "$(id -u)" = 0 ] || { echo "Jalankan dengan sudo."; exit 1; }
DIR=/opt/viza-api
RAW=https://raw.githubusercontent.com/exbottod/viza-chat-voice-room/main
APP_ID="${1:-406ff649c0bd49d397b487d22d075493}"
CERT="${2:-${AGORA_CERT:-}}"
BERKAS_CERT=/root/agora-cert.txt

if [ -z "$CERT" ] && [ -f "$BERKAS_CERT" ]; then
  CERT=$(tr -d ' \t\r\n' < "$BERKAS_CERT")
  echo "Certificate dibaca dari $BERKAS_CERT"
fi
if [ -z "$CERT" ]; then
  echo "Tempel App Certificate lalu tekan Enter (teks akan tampil di layar, itu wajar):"
  read -r CERT || true
  CERT=$(printf '%s' "$CERT" | tr -d ' \t\r\n')
fi
[ -n "$CERT" ] || { echo "Certificate kosong, berhenti."; exit 1; }
echo "Panjang certificate: ${#CERT} karakter (biasanya 32)"

echo
echo "== 1. Perbarui kode dompet (jalur /agora-token)"
cp -a "$DIR/index.js" "$DIR/index.js.bak-$(date +%Y%m%d-%H%M%S)" 2>/dev/null || true
curl -fsSL --max-time 60 "$RAW/wallet/index.js" -o "$DIR/index.js" || { echo "Gagal unduh index.js"; exit 1; }
node --check "$DIR/index.js" || { echo "index.js rusak, berhenti"; exit 1; }
echo "index.js: $(wc -l < "$DIR/index.js") baris"

echo
echo "== 2. Pustaka token Agora"
cd "$DIR" || exit 1
[ -f package.json ] || printf '{\n  "name": "viza-api",\n  "private": true,\n  "type": "module"\n}\n' > package.json
if node -e "require('agora-token')" >/dev/null 2>&1; then
  echo "pustaka sudah ada"
else
  echo "memasang agora-token (maks 3 menit)…"
  timeout 180 npm install agora-token --no-audit --no-fund || echo "npm gagal, dicoba sekali lagi"
  node -e "require('agora-token')" >/dev/null 2>&1 && echo "pustaka siap" || { echo "Pustaka gagal dipasang."; exit 1; }
fi

echo
echo "== 3. Simpan kunci di layanan"
mkdir -p /etc/systemd/system/viza-dompet.service.d
cat > /etc/systemd/system/viza-dompet.service.d/agora.conf <<EOF
[Service]
Environment=AGORA_APP_ID=$APP_ID
Environment=AGORA_APP_CERTIFICATE=$CERT
EOF
chmod 600 /etc/systemd/system/viza-dompet.service.d/agora.conf
systemctl daemon-reload
systemctl restart viza-dompet
sleep 3
echo "viza-dompet: $(systemctl is-active viza-dompet)"

echo
echo "== 4. Uji jalur token"
PORT=$(cat /var/lib/viza-port 2>/dev/null || echo 8092)
curl -s -o /tmp/ag -w "tanpa login -> kode %{http_code} (harus 401)\n" --max-time 8 \
  -X POST -H 'content-type: application/json' -d '{"channel":"uji"}' "http://127.0.0.1:$PORT/agora-token" || true
node -e '
const { RtcTokenBuilder, RtcRole } = require("agora-token");
const t = RtcTokenBuilder.buildTokenWithUserAccount(process.argv[1], process.argv[2], "uji-room", "ujiakun", RtcRole.PUBLISHER, 3600, 3600);
console.log("token uji dibuat, panjang", t.length);
' "$APP_ID" "$CERT" || echo "token uji GAGAL, cek App ID/Certificate"

rm -f "$BERKAS_CERT" 2>/dev/null || true
echo
echo "SELESAI."

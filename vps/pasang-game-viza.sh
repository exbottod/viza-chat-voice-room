#!/usr/bin/env bash
# Pasang SELURUH berkas game Bikini Wild Rush di VPS supaya aplikasi cukup
# membuka https://DOMAIN/game/html5-game/ - pembaruan game nanti hanya
# mengganti berkas di sini, tanpa APK baru.
#
# Cara kerja: unduh satu paket kecil docs/game/html5-game.tar.gz (2,2 MB) lalu
# ekstrak ke /opt/viza-api/game/html5-game. JANGAN mengunduh paket repo
# (tar.gz repo ~5,8 GB) karena VPS akan menggantung dan kuota trafik habis.
# Versi lama juga hanya mengambil berkas satu tingkat, sehingga folder
# assets/bikini/*.webp tertinggal dan game tampil hitam.
#
# Pakai: curl -fsSL https://raw.githubusercontent.com/exbottod/viza-chat-voice-room/main/vps/pasang-game-viza.sh -o game.sh && sudo bash game.sh
set -uo pipefail
DIR=/opt/viza-api
TUJUAN="$DIR/game/html5-game"
REPO=exbottod/viza-chat-voice-room
DOMAIN=${DOMAIN:-viza.43-156-99-4.sslip.io}
PORT=$(cat /var/lib/viza-port 2>/dev/null || echo 8092)

[ "$(id -u)" = 0 ] || { echo "Jalankan sebagai root (sudo)"; exit 1; }

echo "== 1/4 Unduh paket game (2,2 MB) =="
TMP=$(mktemp -d)
PAKET="$TMP/game.tgz"
if ! curl -fL --retry 3 --max-time 300 \
  "https://raw.githubusercontent.com/$REPO/main/docs/game/html5-game.tar.gz?cb=$(date +%s)" \
  -o "$PAKET"; then
  echo "   unduh gagal"; exit 1
fi
UKUR=$(stat -c %s "$PAKET" 2>/dev/null || echo 0)
echo "   terunduh: $UKUR byte"
[ "$UKUR" -gt 1000000 ] || { echo "   paket tidak lengkap, dibatalkan"; exit 1; }

echo "== 2/4 Siapkan folder =="
mkdir -p "$DIR/game"
if [ -d "$TUJUAN" ]; then
  CADANGAN="$TUJUAN.lama-$(date +%Y%m%d-%H%M%S)"
  mv "$TUJUAN" "$CADANGAN"
  echo "   folder lama disimpan: $CADANGAN"
fi
mkdir -p "$TUJUAN"

echo "== 3/4 Ekstrak =="
tar -xzf "$PAKET" -C "$TUJUAN" || { echo "   ekstrak gagal"; exit 1; }
chmod -R a+rX "$DIR/game"
echo "   berkas: $(find "$TUJUAN" -type f | wc -l) | webp: $(find "$TUJUAN" -name '*.webp' | wc -l) | png: $(find "$TUJUAN" -name '*.png' | wc -l)"
[ -f "$TUJUAN/index.html" ] || { echo "   index.html tidak ada, dibatalkan"; exit 1; }

echo "== 4/4 Nyalakan ulang layanan dompet =="
if [ -f /etc/systemd/system/viza-dompet.service ]; then
  if ! grep -q "GAME_DIR" /etc/systemd/system/viza-dompet.service; then
    sed -i "/^Environment=BATAS_ISI_MB/a Environment=GAME_DIR=$DIR/game" /etc/systemd/system/viza-dompet.service
  fi
  systemctl daemon-reload
  systemctl restart viza-dompet
  sleep 3
  echo -n "   layanan: "; systemctl is-active viza-dompet
else
  echo "   layanan viza-dompet belum ada; jalankan dulu vps/perbarui-dompet-viza.sh"
fi

echo
echo "Cek dari dalam VPS:"
curl -s -o /dev/null -w "   /health              -> %{http_code}\n" --max-time 10 "http://127.0.0.1:$PORT/health"
curl -s -o /dev/null -w "   index.html           -> %{http_code}\n" --max-time 10 "http://127.0.0.1:$PORT/game/html5-game/index.html"
curl -s -o /dev/null -w "   game.js              -> %{http_code}\n" --max-time 20 "http://127.0.0.1:$PORT/game/html5-game/game.js"
curl -s -o /dev/null -w "   images/girl-0       -> %{http_code}\n" --max-time 20 "http://127.0.0.1:$PORT/game/html5-game/images/girl-0.webp"
echo
echo "Keempat baris di atas harus 200. Lalu buka https://$DOMAIN/game/html5-game/index.html"

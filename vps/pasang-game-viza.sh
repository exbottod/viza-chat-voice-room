#!/usr/bin/env bash
# Pasang SELURUH berkas game Bikini Wild Rush di VPS supaya aplikasi cukup
# membuka https://DOMAIN/game/html5-game/ - pembaruan game nanti hanya
# mengganti berkas di sini, tanpa APK baru.
#
# Versi ini mengunduh paket repo (tar.gz) lalu menyalin seluruh folder
# app/src/main/assets/html5-game. Versi lama hanya mengambil berkas satu
# tingkat, sehingga folder bersarang seperti assets/bikini/*.webp tertinggal
# dan game tampil hitam ("Membuka game..." tidak pernah hilang).
#
# Pakai: curl -fsSL https://raw.githubusercontent.com/exbottod/viza-chat-voice-room/main/vps/pasang-game-viza.sh -o game.sh && sudo bash game.sh
set -uo pipefail
DIR=/opt/viza-api
TUJUAN="$DIR/game/html5-game"
REPO=exbottod/viza-chat-voice-room
DOMAIN=${DOMAIN:-viza.43-156-99-4.sslip.io}
PORT=$(cat /var/lib/viza-port 2>/dev/null || echo 8092)

[ "$(id -u)" = 0 ] || { echo "Jalankan sebagai root (sudo)"; exit 1; }

echo "== 1/4 Unduh paket repo =="
TMP=$(mktemp -d)
curl -fsSL "https://codeload.github.com/$REPO/tar.gz/refs/heads/main?cb=$(date +%s)" -o "$TMP/repo.tgz" \
  || { echo "   unduh gagal"; exit 1; }
echo "   ukuran: $(du -h "$TMP/repo.tgz" | cut -f1)"

echo "== 2/4 Ekstrak folder game =="
tar -xzf "$TMP/repo.tgz" -C "$TMP" --wildcards '*/app/src/main/assets/html5-game/*' \
  || { echo "   ekstrak gagal"; exit 1; }
SRC=$(find "$TMP" -type d -path '*/app/src/main/assets/html5-game' | head -1)
[ -n "$SRC" ] || { echo "   folder game tidak ada di paket"; exit 1; }

echo "== 3/4 Pasang ke $TUJUAN =="
mkdir -p "$DIR/game"
if [ -d "$TUJUAN" ]; then
  CADANGAN="$TUJUAN.lama-$(date +%Y%m%d-%H%M%S)"
  mv "$TUJUAN" "$CADANGAN"
  echo "   folder lama disimpan: $CADANGAN"
fi
mkdir -p "$TUJUAN"
cp -a "$SRC/." "$TUJUAN/"
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
curl -s -o /dev/null -w "   assets/bikini/girl-0 -> %{http_code}\n" --max-time 20 "http://127.0.0.1:$PORT/game/html5-game/assets/bikini/girl-0.webp"
echo
echo "Keempat baris di atas harus 200. Lalu buka https://$DOMAIN/game/html5-game/index.html"

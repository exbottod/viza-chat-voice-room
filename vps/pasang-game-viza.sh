#!/usr/bin/env bash
# Pasang berkas game Bikini Wild Rush di VPS supaya aplikasi cukup membuka
# tautan https://DOMAIN/game/bikini/ - pembaruan game nanti hanya mengganti
# berkas di sini, tanpa APK baru.
#
# Pakai: curl -fsSL https://raw.githubusercontent.com/exbottod/viza-chat-voice-room/main/vps/pasang-game-viza.sh -o game.sh && sudo bash game.sh
set -uo pipefail
DIR=/opt/viza-api
TUJUAN="$DIR/game/bikini"
REPO=exbottod/viza-chat-voice-room
DOMAIN=${DOMAIN:-viza.43-156-99-4.sslip.io}

[ "$(id -u)" = 0 ] || { echo "Jalankan sebagai root (sudo)"; exit 1; }

echo "== 1/4 Siapkan folder =="
mkdir -p "$TUJUAN"

echo "== 2/4 Daftar berkas game dari repo =="
DAFTAR=$(curl -fsSL "https://api.github.com/repos/$REPO/contents/app/src/main/assets/bikini?ref=main" \
  | python3 -c "import sys,json;[print(x['path']) for x in json.load(sys.stdin) if x['type']=='file']") || { echo "gagal ambil daftar berkas"; exit 1; }
[ -n "$DAFTAR" ] || { echo "daftar berkas kosong"; exit 1; }

# Folder gambar dan font diunduh terpisah karena isinya banyak.
for sub in images assets; do
  SUB=$(curl -fsSL "https://api.github.com/repos/$REPO/contents/app/src/main/assets/bikini/$sub?ref=main" \
    | python3 -c "import sys,json;[print(x['path']) for x in json.load(sys.stdin) if x['type']=='file']" 2>/dev/null || true)
  DAFTAR="$DAFTAR
$SUB"
done

echo "== 3/4 Unduh berkas =="
GAGAL=0
JUMLAH=0
while IFS= read -r jalur; do
  [ -n "$jalur" ] || continue
  rel=${jalur#app/src/main/assets/bikini/}
  mkdir -p "$TUJUAN/$(dirname "$rel")"
  if curl -fsSL "https://raw.githubusercontent.com/$REPO/main/$jalur" -o "$TUJUAN/$rel"; then
    JUMLAH=$((JUMLAH+1))
  else
    echo "  gagal: $rel"
    GAGAL=$((GAGAL+1))
  fi
done <<< "$DAFTAR"
echo "berkas terunduh: $JUMLAH (gagal $GAGAL)"
[ -f "$TUJUAN/index.html" ] || { echo "index.html tidak ada, dibatalkan"; exit 1; }

echo "== 4/4 Nyalakan ulang layanan dompet =="
if [ -f /etc/systemd/system/viza-dompet.service ]; then
  # GAME_DIR dipakai server untuk menyajikan /game/.
  if ! grep -q "GAME_DIR" /etc/systemd/system/viza-dompet.service; then
    sed -i "/^Environment=BATAS_ISI_MB/a Environment=GAME_DIR=$DIR/game" /etc/systemd/system/viza-dompet.service
  fi
  systemctl daemon-reload
  systemctl restart viza-dompet
  sleep 2
  systemctl is-active viza-dompet
else
  echo "Layanan viza-dompet belum ada; jalankan dulu vps/perbarui-dompet-viza.sh"
fi

echo
echo "Cek: https://$DOMAIN/game/bikini/index.html"
curl -s -o /dev/null -w "index.html -> %{http_code}\n" --max-time 10 "https://$DOMAIN/game/bikini/index.html" || true

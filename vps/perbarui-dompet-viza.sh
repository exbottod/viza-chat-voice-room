#!/usr/bin/env bash
# Perbarui kode dompet Viza di VPS lalu buat tabel panel yang belum ada.
# Ini yang memperbaiki galat "server error" saat menekan Kirim panel manager:
# tabel panel_staf dan panel_stock sebelumnya tidak pernah dibuat di database Viza
# yang baru. Dompet Rezo tidak disentuh, hanya /opt/viza-api.
#
# Pakai: curl -fsSL https://raw.githubusercontent.com/exbottod/viza-chat-voice-room/main/vps/perbarui-dompet-viza.sh -o dompet.sh && sudo bash dompet.sh
set -uo pipefail
DIR=/opt/viza-api
SUMBER=https://raw.githubusercontent.com/exbottod/viza-chat-voice-room/main/wallet/index.js

[ "$(id -u)" = 0 ] || { echo "Jalankan sebagai root (sudo)"; exit 1; }
[ -f "$DIR/index.js" ] || { echo "$DIR/index.js tidak ada, dompet Viza belum terpasang"; exit 1; }

echo "== 1/4 Cadangkan kode lama =="
cp "$DIR/index.js" "$DIR/index.js.bak-$(date +%Y%m%d-%H%M%S)"
ls -1t "$DIR"/index.js.bak-* 2>/dev/null | head -3

echo "== 2/4 Unduh kode baru =="
# Nama berkas sementara harus berakhiran .mjs supaya "node --check" mau memeriksanya
# (Node menolak ekstensi .baru dengan ERR_UNKNOWN_FILE_EXTENSION).
BARU="$DIR/.index-baru-$$.mjs"
curl -fsSL "$SUMBER" -o "$BARU" || { echo "unduh gagal"; rm -f "$BARU"; exit 1; }
node --check "$BARU" || { echo "kode baru tidak sah, dibatalkan"; rm -f "$BARU"; exit 1; }
grep -q "async function siapTabel" "$BARU" || { echo "kode baru tidak memuat siapTabel, dibatalkan"; rm -f "$BARU"; exit 1; }
mv "$BARU" "$DIR/index.js"
echo "kode baru terpasang"

echo "== 3/4 Jalankan ulang layanan =="
systemctl restart viza-dompet
for i in $(seq 1 20); do
  sleep 1
  curl -s --max-time 3 "http://127.0.0.1:$(cat /var/lib/viza-port 2>/dev/null || echo 8092)/health" | grep -q '"ok":1' && break
done
PORT=$(cat /var/lib/viza-port 2>/dev/null || echo 8092)
echo -n "health lokal: "; curl -s --max-time 6 "http://127.0.0.1:$PORT/health"; echo

echo "== 4/4 Pancing pembuatan tabel lalu periksa =="
curl -s -o /dev/null --max-time 8 -X POST -H "content-type: application/json" -d '{}' "http://127.0.0.1:$PORT/admin"
sleep 1
node --experimental-sqlite --input-type=module -e '
import { DatabaseSync } from "node:sqlite";
const db = new DatabaseSync("'"$DIR"'/data/viza.db");
const t = db.prepare("select name from sqlite_master where type=%s order by name").all("table");
const nama = t.map(r => r.name);
const wajib = ["panel_staf", "panel_stock", "panel_ban", "panel_log", "topup_manual", "pay_info"];
const kurang = wajib.filter(w => !nama.includes(w));
console.log("tabel panel:", wajib.map(w => w + (nama.includes(w) ? " ada" : " HILANG")).join(", "));
console.log(kurang.length ? "MASIH KURANG: " + kurang.join(", ") : "SEMUA TABEL PANEL SIAP");
' 2>/dev/null || echo "pemeriksaan tabel dilewati (node --experimental-sqlite tidak tersedia)"

echo
echo "Selesai. Buka panel di https://viza.43-156-99-4.sslip.io/panel/admin/ lalu tekan Kirim panel manager dengan ID 100000."

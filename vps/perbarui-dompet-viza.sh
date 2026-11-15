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
SUMBER_SRV=https://raw.githubusercontent.com/exbottod/viza-chat-voice-room/main/wallet/server.js

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
if [ -f "$DIR/server.js" ]; then
  cp "$DIR/server.js" "$DIR/server.js.bak-$(date +%Y%m%d-%H%M%S)"
  if curl -fsSL "$SUMBER_SRV?cb=$(date +%s)" -o "$DIR/server.js.tmp.js"; then
    if ! command -v node >/dev/null 2>&1 || node --check "$DIR/server.js.tmp.js" 2>/dev/null; then
      mv "$DIR/server.js.tmp.js" "$DIR/server.js"; echo "server.js ikut diperbarui"
    else
      rm -f "$DIR/server.js.tmp.js"; echo "server.js baru tidak valid, dibiarkan"
    fi
  else
    rm -f "$DIR/server.js.tmp.js"; echo "server.js gagal diunduh, dibiarkan"
  fi
fi
echo "kode baru terpasang"

echo "== 2b/4 Perbarui berkas panel =="
# Panel (docs/panel/admin) ikut diperbarui supaya kolom baru seperti "Peluang zonk"
# langsung muncul, tanpa perlu menjalankan pasang-panel-viza.sh terpisah.
PANEL=/opt/viza-panel/admin
if [ -d "$PANEL" ] && command -v python3 >/dev/null; then
  python3 - "$PANEL" <<'AKHIRPANEL'
import json,os,sys,urllib.request
tujuan=sys.argv[1]
repo="exbottod/viza-chat-voice-room"; cabang="main"; n=[0]
def unduh(jalur, ke):
    api=f"https://api.github.com/repos/{repo}/contents/{jalur}?ref={cabang}"
    req=urllib.request.Request(api,headers={"User-Agent":"viza-panel"})
    daftar=json.load(urllib.request.urlopen(req,timeout=30))
    if isinstance(daftar,dict): daftar=[daftar]
    for f in daftar:
        if f["type"]=="dir":
            sub=os.path.join(ke,f["name"]); os.makedirs(sub,exist_ok=True); unduh(f["path"], sub)
        elif f["type"]=="file":
            data=urllib.request.urlopen(f["download_url"],timeout=30).read()
            open(os.path.join(ke,f["name"]),"wb").write(data); n[0]+=1
try:
    unduh("docs/panel/admin", tujuan)
    print(str(n[0])+" berkas panel diperbarui di "+tujuan)
except Exception as e:
    print("panel gagal diperbarui:", e)
AKHIRPANEL
else
  echo "folder panel tidak ada ($PANEL), dilewati"
fi

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
const t = db.prepare("select name from sqlite_master where type = ? order by name").all("table");
const nama = t.map(r => r.name);
const wajib = ["panel_staf", "panel_stock", "panel_ban", "panel_log", "topup_manual", "pay_info"];
const kurang = wajib.filter(w => !nama.includes(w));
console.log("tabel panel:", wajib.map(w => w + (nama.includes(w) ? " ada" : " HILANG")).join(", "));
console.log(kurang.length ? "MASIH KURANG: " + kurang.join(", ") : "SEMUA TABEL PANEL SIAP");
' 2>/dev/null || echo "pemeriksaan tabel dilewati (node --experimental-sqlite tidak tersedia)"

echo
echo "Selesai. Buka panel di https://viza.43-156-99-4.sslip.io/panel/admin/ lalu tekan Kirim panel manager dengan ID 100000."

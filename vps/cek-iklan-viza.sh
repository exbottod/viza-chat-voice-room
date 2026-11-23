#!/usr/bin/env bash
# Cek cepat kenapa tombol "Coin gratis" belum muncul di Dompet Viza.
# Membaca: versi berkas server, dukungan kunci iklan, dan isi app_cfg di database.
set -u
API_DIR=/opt/viza-api
DB=$API_DIR/data/viza.db

echo "== 1. Berkas server =="
ls -l --time-style=+"%d-%m-%Y %H:%M" "$API_DIR/index.js" 2>/dev/null || echo "index.js tidak ada di $API_DIR"
echo "sidik: $(md5sum "$API_DIR/index.js" 2>/dev/null | cut -c1-32)"

echo
echo "== 2. Dukungan kunci iklan di berkas =="
for k in iklanAktif iklanCoin iklanMaxHari iklanCooldown iklanAdUnit iklanUji iklanGameId iklanPlacement iklanBanner; do
  if grep -q "\"$k\"" "$API_DIR/index.js" 2>/dev/null; then echo "  ada   $k"; else echo "  HILANG $k"; fi
done
for op in iklan_info iklan_klaim; do
  if grep -q "\"$op\"" "$API_DIR/index.js" 2>/dev/null; then echo "  ada   op $op"; else echo "  HILANG op $op"; fi
done

echo
echo "== 3. Layanan =="
systemctl is-active viza-dompet 2>/dev/null || echo "unit viza-dompet tidak ada"
curl -s -m 5 -o /dev/null -w "  /health lokal: HTTP %{http_code}\n" http://127.0.0.1:8080/health || echo "  /health lokal gagal"

echo
echo "== 4. Isi pengaturan iklan di database =="
node -e '
const p="'"$DB"'";
(async()=>{
  try{
    const {DatabaseSync}=await import("node:sqlite");
    const db=new DatabaseSync(p);
    const r=db.prepare("select kunci,nilai,updated_at from app_cfg where kunci like ?").all("iklan%");
    if(!r.length){ console.log("  (kosong) belum ada satu pun kunci iklan tersimpan"); }
    for(const x of r) console.log("  "+x.kunci+" = "+x.nilai+"   ("+new Date(Number(x.updated_at)).toLocaleString("id-ID")+")");
    try{
      const n=db.prepare("select count(*) as n from iklan_klaim").get();
      console.log("  klaim iklan tercatat: "+n.n);
    }catch(e){ console.log("  tabel iklan_klaim belum ada (server versi lama)"); }
  }catch(e){ console.log("  gagal baca database: "+e.message); }
})();
' 2>/dev/null || echo "  node tidak bisa membaca database"

echo
echo "== 5. Uji luar =="
curl -s -m 8 https://viza.43-156-99-4.sslip.io/health | head -c 300; echo
echo
echo "Selesai. Kirim seluruh tulisan di layar ini."

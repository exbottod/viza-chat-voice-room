#!/usr/bin/env bash
# Cari data coin seller di semua database sqlite di VPS lalu salin ke database
# Viza (/opt/viza-api/data/viza.db). Berguna bila daftar seller di panel kosong
# padahal dulu pernah diisi (data tertinggal di database lama).
# Skrip hanya menambah baris yang belum ada; tidak menghapus apa pun.
set -u
DB_VIVA=/opt/viza-api/data/viza.db
echo "== 1. Database Viza =="
if [ ! -f "$DB_VIVA" ]; then echo "TIDAK ADA: $DB_VIVA"; exit 1; fi
ls -la "$DB_VIVA"*

cat > /tmp/cari-seller.mjs <<'JS'
import { DatabaseSync } from "node:sqlite";
import { readdirSync, statSync, existsSync } from "node:fs";

const TUJUAN = "/opt/viza-api/data/viza.db";
const KOLOM = ["uid","store","wa","wa_link","photo","stock","active","urut","created_at","updated_at"];
const kandidat = new Set();
const jelajah = (dir, dalam = 0) => {
  if (dalam > 3 || !existsSync(dir)) return;
  let isi = [];
  try { isi = readdirSync(dir); } catch { return; }
  for (const n of isi) {
    const p = dir + "/" + n;
    let st; try { st = statSync(p); } catch { continue; }
    if (st.isDirectory()) { if (!/node_modules|\.git|proc|sys/.test(p)) jelajah(p, dalam + 1); }
    else if (/\.(db|sqlite|sqlite3)$/.test(n) && st.size > 4096) kandidat.add(p);
  }
};
["/opt", "/root", "/var/lib", "/home", "/srv"].forEach((d) => jelajah(d));

const hitung = (db) => {
  try {
    const d = new DatabaseSync(db, { readOnly: true });
    const t = d.prepare("select name from sqlite_master where type='table' and name='coin_seller'").get();
    if (!t) { d.close(); return null; }
    const n = d.prepare("select count(*) as n from coin_seller").get().n;
    const baris = n ? d.prepare("select * from coin_seller").all() : [];
    d.close();
    return { n, baris };
  } catch (e) { return null; }
};

console.log("\n== 2. Database yang punya tabel coin_seller ==");
const sumber = [];
for (const db of [...kandidat].sort()) {
  const h = hitung(db);
  if (h) { console.log(`  ${db}  → ${h.n} seller`); if (h.n) sumber.push({ db, baris: h.baris }); }
}
if (!sumber.length) console.log("  tidak ada satu pun yang berisi data seller");

const tujuan = new DatabaseSync(TUJUAN);
const sebelum = tujuan.prepare("select count(*) as n from coin_seller").get().n;
console.log(`\n== 3. Database Viza sekarang: ${sebelum} seller ==`);

let masuk = 0;
for (const s of sumber) {
  if (s.db === TUJUAN) continue;
  const kol = Object.keys(s.baris[0]);
  const pakai = KOLOM.filter((k) => kol.includes(k));
  const q = `insert or ignore into coin_seller (${pakai.join(",")}) values (${pakai.map(() => "?").join(",")})`;
  const st = tujuan.prepare(q);
  for (const b of s.baris) {
    try { const r = st.run(...pakai.map((k) => b[k] ?? null)); masuk += Number(r.changes || 0); } catch (e) {}
  }
  console.log(`  disalin dari ${s.db}: ${s.baris.length} baris diperiksa`);
}
const sesudah = tujuan.prepare("select count(*) as n from coin_seller").get().n;
tujuan.close();
console.log(`\n== 4. Hasil: ${sebelum} → ${sesudah} seller (${masuk} baris baru) ==`);
JS

node /tmp/cari-seller.mjs || echo "pemeriksaan gagal"
echo
echo "== 5. Restart dompet supaya panel membaca data terbaru =="
systemctl restart viza-dompet 2>/dev/null || echo "restart gagal"
sleep 3
systemctl is-active viza-dompet
curl -s -m 5 http://127.0.0.1:8092/health | head -c 200; echo

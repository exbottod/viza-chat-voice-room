#!/usr/bin/env bash
# Galat dompet Viza: ringkasan per aksi, galat pasang/beli item, dan dompet terakhir.
# Jalankan tepat setelah mencoba memasang bingkai agar baris terbaru terlihat.
set -u
cat > /tmp/galat.mjs <<'JS'
import { DatabaseSync } from "node:sqlite";
import { existsSync } from "node:fs";
const DB = "/opt/viza-api/data/viza.db";
if (!existsSync(DB)) { console.log("database tidak ada: " + DB); process.exit(1); }
const db = new DatabaseSync(DB, { readOnly: true });
const jam = (t) => new Date(Number(t)).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });

console.log("== 1. Ringkasan galat per aksi (semua waktu) ==");
for (const r of db.prepare("select aksi, count(*) n, max(at) akhir from wallet_galat group by aksi order by n desc limit 12").all()) {
  console.log(`  ${String(r.aksi).padEnd(16)} ${String(r.n).padStart(4)}x   terakhir ${jam(r.akhir)}`);
}

console.log("\n== 2. Galat pasang/beli item (20 terakhir) ==");
const it = db.prepare("select uid, aksi, pesan, at from wallet_galat where aksi in ('equip','buy_item','get') order by at desc limit 20").all();
if (!it.length) console.log("  tidak ada galat equip/buy_item tercatat");
for (const r of it) console.log(`  ${jam(r.at)}  ${String(r.aksi).padEnd(9)} ${String(r.uid).padEnd(12)} ${r.pesan}`);

console.log("\n== 3. Galat 3 jam terakhir (semua aksi) ==");
const batas = Date.now() - 3 * 3600 * 1000;
const baru = db.prepare("select uid, aksi, pesan, at from wallet_galat where at >= ? order by at desc limit 20").all(batas);
if (!baru.length) console.log("  tidak ada galat dalam 3 jam terakhir");
for (const r of baru) console.log(`  ${jam(r.at)}  ${String(r.aksi).padEnd(12)} ${String(r.uid).padEnd(12)} ${r.pesan}`);

console.log("\n== 4. Dompet terakhir (coin, jumlah item, isi equip) ==");
for (const r of db.prepare("select uid, coins, inv, equip, updated_at from wallets order by updated_at desc limit 5").all()) {
  let inv = {}; try { inv = JSON.parse(r.inv || "{}"); } catch {}
  console.log(`  ${r.uid}  coin ${r.coins}  item ${Object.keys(inv).length}  diubah ${jam(r.updated_at)}`);
  console.log(`     equip: ${r.equip}`);
}
db.close();
JS
node /tmp/galat.mjs 2>/dev/null

#!/usr/bin/env bash
# Tampilkan galat dompet terakhir dari database Viza. Dipakai saat fitur
# (pasang bingkai, beli item, kirim gift) gagal tapi pesan di HP kurang jelas.
set -u
cat > /tmp/galat.mjs <<'JS'
import { DatabaseSync } from "node:sqlite";
import { existsSync } from "node:fs";
const DB = "/opt/viza-api/data/viza.db";
if (!existsSync(DB)) { console.log("database tidak ada: " + DB); process.exit(1); }
const db = new DatabaseSync(DB, { readOnly: true });
const jam = (t) => new Date(Number(t)).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });
try {
  const rows = db.prepare("select uid, aksi, pesan, at from wallet_galat order by at desc limit 25").all();
  if (!rows.length) console.log("tidak ada galat tercatat");
  for (const r of rows) console.log(`${jam(r.at)}  ${String(r.aksi).padEnd(16)} ${String(r.uid).padEnd(14)} ${r.pesan}`);
} catch (e) { console.log("tabel wallet_galat belum ada: " + e.message); }
try {
  const w = db.prepare("select uid, coins, inv, equip from wallets order by updated_at desc limit 5").all();
  console.log("\n== 5 dompet terakhir ==");
  for (const r of w) {
    let inv = {}; try { inv = JSON.parse(r.inv || "{}"); } catch {}
    console.log(`${r.uid}  coin ${r.coins}  item ${Object.keys(inv).length}  equip ${r.equip}`);
  }
} catch (e) { console.log("gagal baca wallets: " + e.message); }
db.close();
JS
node /tmp/galat.mjs

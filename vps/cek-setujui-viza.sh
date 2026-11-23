#!/usr/bin/env bash
# Ringkas khusus tombol Setujui top-up manual: tanda versi server, daftar
# pengajuan terakhir, dan galat terakhir. Sengaja pendek supaya muat di layar HP.
set -u
DB=/opt/viza-api/data/viza.db

echo "== tanda versi server =="
curl -s -m 8 http://127.0.0.1:8092/health | tr ',' '\n' | grep -E '"v"|"db"' | head -3

echo
echo "== pengajuan top-up manual terakhir =="
node -e '
const { DatabaseSync } = require("node:sqlite");
const db = new DatabaseSync("'"$DB"'", { readOnly: true });
db.exec("pragma busy_timeout=3000");
const kol = db.prepare("pragma table_info(topup_manual)").all().map((x) => x.name);
console.log("  kolom tabel: " + kol.join(", "));
const rows = db.prepare("select id, uid, coins, status from topup_manual order by created_at desc limit 6").all();
for (const r of rows) console.log("  " + String(r.status).padEnd(8) + " coin=" + String(r.coins).padEnd(12) + " uid=" + String(r.uid).slice(0, 10) + " id=" + r.id);
db.close();
' 2>&1

echo
echo "== galat dompet terakhir =="
node -e '
const { DatabaseSync } = require("node:sqlite");
const db = new DatabaseSync("'"$DB"'", { readOnly: true });
const r = db.prepare("select aksi, pesan from wallet_galat order by at desc limit 5").all();
if (!r.length) console.log("  tidak ada galat tercatat");
for (const x of r) console.log("  " + x.aksi + " | " + String(x.pesan).slice(0, 110));
db.close();
' 2>&1
echo
echo "Selesai."

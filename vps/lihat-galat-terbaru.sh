#!/usr/bin/env bash
# Cetak 8 galat dompet terbaru LENGKAP (tanpa dipotong) supaya nilai aud/uid terlihat.
set -u
node -e '
const { DatabaseSync } = require("node:sqlite");
const db = new DatabaseSync("/opt/viza-api/data/viza.db", { readOnly: true });
const jam = (t) => new Date(Number(t)).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });
const rows = db.prepare("select uid, aksi, pesan, at from wallet_galat order by at desc limit 8").all();
for (const r of rows) console.log(jam(r.at) + " | " + r.aksi + " | uid=" + r.uid + " | " + r.pesan);
const n = db.prepare("select count(*) n from wallet_galat").get().n;
console.log("total galat tercatat: " + n);
db.close();
' 2>/dev/null || echo "node:sqlite tidak tersedia, pakai node versi 22.13+"

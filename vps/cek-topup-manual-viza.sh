#!/usr/bin/env bash
# Cek kenapa "Setujui" top-up manual gagal: status pengajuan, saldo pembeli,
# dan log layanan dompet. Aman dijalankan berulang, tidak mengubah data.
set -u
DB=/opt/viza-api/data/viza.db

echo "== 1. Layanan dompet =="
systemctl is-active viza-dompet 2>/dev/null || echo "unit viza-dompet tidak aktif"
systemctl show viza-dompet -p NRestarts -p ActiveEnterTimestamp 2>/dev/null
echo
echo "== 2. Pengajuan top-up manual terbaru =="
node -e '
const { DatabaseSync } = require("node:sqlite");
const db = new DatabaseSync("'"$DB"'", { readOnly: true });
const jam = (t) => t ? new Date(Number(t)).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }) : "-";
db.exec("pragma busy_timeout=3000");
let rows = [];
try {
  rows = db.prepare("select id, uid, coins, amount, method, status, created_at, decided_at from topup_manual order by created_at desc limit 8").all();
} catch (e) { console.log("  tabel topup_manual belum ada: " + e.message); }
for (const r of rows) {
  let saldo = "?";
  try { saldo = String(db.prepare("select coins from wallets where uid = ?").get(r.uid)?.coins ?? "tidak ada dompet"); } catch (e) {}
  console.log("  " + String(r.status).padEnd(8) + " " + String(r.id).padEnd(18) + " coin=" + String(r.coins).padEnd(14) + " rp=" + String(r.amount).padEnd(7) + " dibuat " + jam(r.created_at) + (r.decided_at ? " | diputuskan " + jam(r.decided_at) : "") + " | saldo pembeli=" + saldo);
}
const n = db.prepare("select status, count(*) n from topup_manual group by status").all();
console.log("  ringkas: " + n.map((x) => x.status + "=" + x.n).join(", "));
db.close();
' 2>&1
echo
echo "== 3. Galat dompet 3 jam terakhir =="
node -e '
const { DatabaseSync } = require("node:sqlite");
const db = new DatabaseSync("'"$DB"'", { readOnly: true });
const jam = (t) => new Date(Number(t)).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });
const r = db.prepare("select aksi, pesan, at from wallet_galat where at >= ? order by at desc limit 12").all(Date.now() - 3 * 3600 * 1000);
if (!r.length) console.log("  tidak ada galat tercatat");
for (const x of r) console.log("  " + jam(x.at) + " | " + x.aksi + " | " + String(x.pesan).slice(0, 160));
db.close();
' 2>&1
echo
echo "== 4. Log layanan (30 baris terakhir) =="
journalctl -u viza-dompet -n 30 --no-pager 2>/dev/null | cut -c1-200
echo
echo "Selesai. Kirim seluruh tulisan di layar ini."

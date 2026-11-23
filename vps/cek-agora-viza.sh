#!/usr/bin/env bash
# Ringkas khusus suara room: kesiapan Agora di server + sebab terakhir suara
# gagal tersambung. Pendek supaya muat di layar HP.
set -u
DB=/opt/viza-api/data/viza.db

echo "== kesiapan server =="
curl -s -m 8 http://127.0.0.1:8080/health | tr ',' '\n' | grep -E '"v"|"agora"' | head -3

echo
echo "== sebab suara gagal (laporan HP) =="
node -e '
const { DatabaseSync } = require("node:sqlite");
const db = new DatabaseSync("'"$DB"'", { readOnly: true });
db.exec("pragma busy_timeout=3000");
const r = db.prepare("select pesan, at from wallet_galat where aksi in (\x27agora_app\x27,\x27agora_token\x27) order by at desc limit 8").all();
if (!r.length) console.log("belum ada laporan");
for (const x of r) console.log(new Date(x.at).toISOString().slice(11,19), "|", x.pesan);
' 2>/dev/null

echo
echo "Selesai."

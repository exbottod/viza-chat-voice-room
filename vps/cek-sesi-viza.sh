#!/usr/bin/env bash
# Cek kenapa dompet Viza menolak sesi (401)
set -u
echo "== 1. health dari dalam"
curl -s -m 8 http://127.0.0.1:8080/health; echo
echo "== 2. versi kode di disk"
grep -o 'v: "viza[^"]*"' /opt/viza-api/index.js | head -1
grep -o 'v: "rezo[^"]*"' /opt/viza-api/index.js | head -1
echo "== 3. galat sesi terakhir"
node -e 'try{const {DatabaseSync}=require("node:sqlite");const d=new DatabaseSync("/opt/viza-api/data/viza.db");const r=d.prepare("select at,aksi,pesan from wallet_galat order by at desc limit 8").all();if(!r.length){console.log("(kosong)")}else{for(const x of r)console.log(new Date(Number(x.at)).toISOString(),"|",x.aksi,"|",x.pesan)}}catch(e){console.log("gagal baca db:",e.message)}'
echo "== 4. jaringan ke Google"
curl -s -o /dev/null -w "jwks=%{http_code}\n" -m 10 https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com
echo "== selesai"

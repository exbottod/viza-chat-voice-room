#!/usr/bin/env bash
# Benahi layanan viza-dompet: pastikan modul ESM benar, sintaks sah,
# lalu restart dan laporkan port serta versi yang hidup.
# Pakai: curl -fsSL https://raw.githubusercontent.com/exbottod/viza-chat-voice-room/main/vps/benahi-dompet-viza.sh | sudo bash
set -u
D=/opt/viza-api

echo "== 1. log viza-dompet sebelum dibenahi"
journalctl -u viza-dompet -n 15 --no-pager 2>&1 | tail -15

echo "== 2. package.json (wajib type=module)"
[ -f "$D/package.json" ] || echo '{}' > "$D/package.json"
node -e 'const fs=require("fs");const p="/opt/viza-api/package.json";let j={};try{j=JSON.parse(fs.readFileSync(p,"utf8"))}catch(e){};j.type="module";fs.writeFileSync(p,JSON.stringify(j,null,2))' \
  && echo "   type=module dipasang"
cat "$D/package.json"

echo "== 3. periksa sintaks index.js dan server.js"
cp "$D/index.js" /tmp/idx.mjs 2>/dev/null && (node --check /tmp/idx.mjs && echo "   index.js sah" || echo "   index.js RUSAK")
if [ -f "$D/server.js" ]; then
  cp "$D/server.js" /tmp/srv.mjs && (node --check /tmp/srv.mjs && echo "   server.js sah" || echo "   server.js RUSAK")
fi

echo "== 4. lingkungan unit"
systemctl show -p Environment -p ExecStart viza-dompet | tr ';' '\n' | grep -E 'Environment|path=|argv' | head -6
[ -f /var/lib/viza-port ] && echo "   viza-port: $(cat /var/lib/viza-port)"

echo "== 5. restart lalu periksa port"
systemctl restart viza-dompet
sleep 5
ss -ltnp 2>/dev/null | grep -E ':(8080|8091|8092)[[:space:]]' || echo "   tidak ada port dompet terbuka"
for p in 8091 8092 8080; do
  echo -n "   port $p -> "
  curl -s --max-time 3 "http://127.0.0.1:$p/health" | head -c 170
  echo
done

echo "== 6. log viza-dompet setelah restart"
journalctl -u viza-dompet -n 15 --no-pager 2>&1 | tail -15
echo "== selesai"

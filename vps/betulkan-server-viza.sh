#!/usr/bin/env bash
# Perbaiki dompet Viza yang jatuh karena server.js masih memakai require,
# lalu arahkan domain viza ke port dompet Viza dan pasang ulang panel.
# Pakai: curl -fsSL https://raw.githubusercontent.com/exbottod/viza-chat-voice-room/main/vps/betulkan-server-viza.sh | sudo bash
set -u
D=/opt/viza-api
REPO=https://raw.githubusercontent.com/exbottod/viza-chat-voice-room/main
CF=/etc/caddy/Caddyfile
PORTVIZA=8092

echo "== 1. perbarui server.js (buang require, pakai import)"
cp "$D/server.js" "$D/server.js.bak-$(date +%Y%m%d-%H%M%S)" 2>/dev/null
curl -fsSL "$REPO/wallet/server.js?cb=$(date +%s)" -o /tmp/server-baru.mjs || { echo "   unduh gagal"; exit 1; }
if grep -q 'require(' /tmp/server-baru.mjs; then echo "   berkas baru masih memakai require, dibatalkan"; exit 1; fi
node --check /tmp/server-baru.mjs || { echo "   sintaks tidak sah, dibatalkan"; exit 1; }
mv /tmp/server-baru.mjs "$D/server.js"
echo "   server.js diperbarui (import, tanpa require)"

echo "== 2. hidupkan ulang dompet Viza"
systemctl restart viza-dompet
for i in $(seq 1 20); do sleep 1; curl -s --max-time 2 "http://127.0.0.1:$PORTVIZA/health" | grep -q '"ok":1' && break; done
echo -n "   health 8092: "; curl -s --max-time 5 "http://127.0.0.1:$PORTVIZA/health" | head -c 220; echo
if ! curl -s --max-time 5 "http://127.0.0.1:$PORTVIZA/health" | grep -q '"v":"viza-'; then
  echo "   GAGAL: dompet Viza masih tidak hidup. Log terakhir:"
  journalctl -u viza-dompet -n 12 --no-pager | tail -12
  exit 1
fi

echo "== 3. pasang berkas panel manager/seller"
node -e '
const https=require("https"),fs=require("fs"),path=require("path");
const repo="exbottod/viza-chat-voice-room", tujuan="/opt/viza-panel/admin"; let n=0;
function get(u){return new Promise((res,rej)=>{https.get(u,{headers:{"User-Agent":"viza"}},r=>{if(r.statusCode>=300&&r.statusCode<400&&r.headers.location)return get(r.headers.location).then(res,rej);let d="";r.on("data",c=>d+=c);r.on("end",()=>res(d))}).on("error",rej)})}
(async()=>{
  async function unduh(jalur,ke){
    const j=JSON.parse(await get("https://api.github.com/repos/"+repo+"/contents/"+jalur+"?ref=main"));
    const arr=Array.isArray(j)?j:[j];
    for(const f of arr){
      if(f.type==="dir"){const sub=path.join(ke,f.name);fs.mkdirSync(sub,{recursive:true});await unduh(f.path,sub)}
      else{const b=await get(f.download_url);fs.writeFileSync(path.join(ke,f.name),b);n++}
    }
  }
  try{fs.mkdirSync(tujuan,{recursive:true});await unduh("docs/panel/admin",tujuan);console.log("   panel: "+n+" berkas terpasang")}
  catch(e){console.log("   panel gagal: "+e.message)}
})();'

echo "== 4. arahkan domain viza ke port $PORTVIZA dan pasang aturan /panel/"
cp "$CF" "$CF.bak-$(date +%Y%m%d-%H%M%S)"
curl -fsSL "$REPO/vps/Caddyfile.viza?cb=$(date +%s)" -o /tmp/Caddy.viza || { echo "   unduh Caddyfile gagal"; exit 1; }
awk -v port="$PORTVIZA" '
  /^viza\.43-156-99-4\.sslip\.io \{/ {v=1}
  v && /reverse_proxy 127\.0\.0\.1:[0-9]+/ {sub(/127\.0\.0\.1:[0-9]+/,"127.0.0.1:" port)}
  v && /^\}$/ {v=0}
  {print}' /tmp/Caddy.viza > /tmp/Caddy.viza2
if caddy validate --config /tmp/Caddy.viza2 --adapter caddyfile >/tmp/val.log 2>&1; then
  cp /tmp/Caddy.viza2 "$CF"
  systemctl reload caddy 2>/dev/null || systemctl restart caddy
  echo "   Caddyfile terpasang (viza -> $PORTVIZA)"
else
  echo "   validasi gagal, Caddyfile lama dipakai lagi:"; tail -3 /tmp/val.log
fi

echo "== 5. periksa dari luar"
for u in /health /panel/admin/ /bikini/ /bikini-cfg.json; do
  echo -n "   https://viza.43-156-99-4.sslip.io$u -> "
  curl -s -o /dev/null -w "%{http_code}\n" --max-time 12 "https://viza.43-156-99-4.sslip.io$u"
done
echo -n "   /agora-token tanpa login -> "; curl -s -o /dev/null -w "%{http_code}\n" --max-time 10 -X POST "https://viza.43-156-99-4.sslip.io/agora-token"
echo -n "   versi publik: "; curl -s --max-time 10 "https://viza.43-156-99-4.sslip.io/health" | head -c 200; echo
echo "== selesai"

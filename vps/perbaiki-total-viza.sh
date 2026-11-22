#!/usr/bin/env bash
# Perbaiki menyeluruh: arahkan domain viza ke dompet Viza yang benar,
# pasang ulang panel manager/seller, lalu periksa.
# Pakai: curl -fsSL https://raw.githubusercontent.com/exbottod/viza-chat-voice-room/main/vps/perbaiki-total-viza.sh | sudo bash
set -u
REPO=https://raw.githubusercontent.com/exbottod/viza-chat-voice-room/main
CF=/etc/caddy/Caddyfile

echo "== 1. cari port dompet Viza (yang menjawab versi viza-)"
PORTVIZA=""
for p in 8080 8092 8091 8090; do
  v=$(curl -s --max-time 3 "http://127.0.0.1:$p/health" 2>/dev/null | grep -o '"v":"[^"]*"' | head -1)
  echo "   port $p -> ${v:-tidak menjawab}"
  case "$v" in *'"v":"viza-'*) [ -z "$PORTVIZA" ] && PORTVIZA=$p ;; esac
done

if [ -z "$PORTVIZA" ]; then
  echo "   dompet Viza belum menjawab, mencoba menghidupkan layanan..."
  systemctl restart viza-dompet 2>/dev/null
  for i in $(seq 1 15); do
    sleep 1
    for p in 8092 8080 8091; do
      v=$(curl -s --max-time 2 "http://127.0.0.1:$p/health" 2>/dev/null | grep -o '"v":"viza-[^"]*"')
      [ -n "$v" ] && PORTVIZA=$p && break 2
    done
  done
fi

if [ -z "$PORTVIZA" ]; then
  echo "GAGAL: tidak ada dompet Viza yang hidup. Kirim keluaran ini ke asisten."
  echo "-- status viza-dompet:"; systemctl status viza-dompet --no-pager -l 2>&1 | tail -12
  echo "-- port terbuka:"; (ss -ltnp 2>/dev/null || netstat -ltnp) | grep -E ':(8080|8091|8092)' 
  exit 1
fi
echo "   dompet Viza ada di port $PORTVIZA"

echo "== 2. pasang berkas panel manager/seller"
mkdir -p /opt/viza-panel/admin
if command -v python3 >/dev/null 2>&1; then
  python3 - <<'PY'
import json,os,urllib.request
repo="exbottod/viza-chat-voice-room"; tujuan="/opt/viza-panel/admin"; n=[0]
def unduh(jalur, ke):
    api=f"https://api.github.com/repos/{repo}/contents/{jalur}?ref=main"
    req=urllib.request.Request(api,headers={"User-Agent":"viza"})
    d=json.load(urllib.request.urlopen(req,timeout=30))
    if isinstance(d,dict): d=[d]
    for f in d:
        if f["type"]=="dir":
            sub=os.path.join(ke,f["name"]); os.makedirs(sub,exist_ok=True); unduh(f["path"],sub)
        elif f["type"]=="file":
            open(os.path.join(ke,f["name"]),"wb").write(urllib.request.urlopen(f["download_url"],timeout=30).read()); n[0]+=1
try:
    unduh("docs/panel/admin",tujuan); print("   %d berkas panel terpasang"%n[0])
except Exception as e:
    print("   panel gagal diunduh:",e)
PY
else
  echo "   python3 tidak ada, panel dilewati"
fi
ls /opt/viza-panel/admin 2>/dev/null | head -5 | sed 's/^/   /'

echo "== 3. tulis ulang Caddyfile (domain viza -> port $PORTVIZA + panel)"
cp "$CF" "$CF.bak-$(date +%Y%m%d-%H%M%S)"
curl -fsSL "$REPO/vps/Caddyfile.viza?cb=$(date +%s)" -o /tmp/Caddyfile.viza || { echo "   unduh Caddyfile gagal"; exit 1; }
sed -i "s|reverse_proxy 127.0.0.1:8080|reverse_proxy 127.0.0.1:$PORTVIZA|g" /tmp/Caddyfile.viza
# Domain utama tetap ke dompet Rezo (8080) kalau memang beda port.
if [ "$PORTVIZA" != "8080" ]; then
  awk -v port="$PORTVIZA" '
    /^43-156-99-4\.sslip\.io \{/ {utama=1}
    utama && /reverse_proxy 127\.0\.0\.1:[0-9]+/ && !/agora|lktoken|livekit/ {sub(/127\.0\.0\.1:[0-9]+/,"127.0.0.1:8080")}
    utama && /^\}/ {utama=0}
    {print}
  ' /tmp/Caddyfile.viza > /tmp/Caddyfile.viza2 && mv /tmp/Caddyfile.viza2 /tmp/Caddyfile.viza
fi
if caddy validate --config /tmp/Caddyfile.viza --adapter caddyfile >/tmp/val.log 2>&1; then
  cp /tmp/Caddyfile.viza "$CF"
  systemctl reload caddy 2>/dev/null || systemctl restart caddy
  echo "   Caddyfile terpasang"
else
  echo "   validasi gagal, Caddyfile lama dipakai lagi:"; tail -3 /tmp/val.log
fi

echo "== 4. periksa dari luar"
for u in /health /panel/admin/ /bikini/ /bikini-cfg.json; do
  echo -n "   https://viza.43-156-99-4.sslip.io$u -> "
  curl -s -o /dev/null -w "%{http_code}\n" --max-time 10 "https://viza.43-156-99-4.sslip.io$u"
done
echo -n "   versi: "; curl -s --max-time 8 "https://viza.43-156-99-4.sslip.io/health" | head -c 200; echo
echo "== selesai"

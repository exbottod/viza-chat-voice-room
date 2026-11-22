#!/usr/bin/env bash
# Ganti blok domain viza di Caddyfile dengan versi bersih: panel manager/seller
# dilayani dari /opt/viza-panel, sisanya ke dompet Viza di port 8092.
# Pakai: curl -fsSL https://raw.githubusercontent.com/exbottod/viza-chat-voice-room/main/vps/pasang-blok-viza.sh | sudo bash
set -u
CF=/etc/caddy/Caddyfile
DOMAIN=viza.43-156-99-4.sslip.io
PORTVIZA=8092

[ "$(id -u)" = 0 ] || { echo "Jalankan sebagai root (sudo)"; exit 1; }

echo "== 1. dompet Viza di $PORTVIZA"
echo -n "   health: "; curl -s --max-time 4 "http://127.0.0.1:$PORTVIZA/health" | head -c 200; echo

echo "== 2. susun Caddyfile baru"
awk -v port="$PORTVIZA" -v dom="$DOMAIN" '
  BEGIN { }
  $0 ~ ("^" dom " \\{") {
    ganti = 1
    print dom " {"
    print "\tencode gzip"
    print "\thandle_path /panel/* {"
    print "\t\theader Cache-Control \"no-cache, must-revalidate\""
    print "\t\troot * /opt/viza-panel"
    print "\t\tfile_server"
    print "\t}"
    print "\thandle {"
    print "\t\treverse_proxy 127.0.0.1:" port
    print "\t}"
    print "}"
    next
  }
  ganti == 1 && /^\}$/ { ganti = 0; next }
  ganti == 1 { next }
  { print }
' "$CF" > /tmp/Caddy.new

if ! grep -q "^$DOMAIN {" /tmp/Caddy.new; then
  echo "   blok $DOMAIN tidak ada, ditambahkan"
  {
    echo ""
    echo "$DOMAIN {"
    echo -e "\tencode gzip"
    echo -e "\thandle_path /panel/* {"
    echo -e "\t\theader Cache-Control \"no-cache, must-revalidate\""
    echo -e "\t\troot * /opt/viza-panel"
    echo -e "\t\tfile_server"
    echo -e "\t}"
    echo -e "\thandle {"
    echo -e "\t\treverse_proxy 127.0.0.1:$PORTVIZA"
    echo -e "\t}"
    echo "}"
  } >> /tmp/Caddy.new
fi

echo "== 3. validasi"
if ! caddy validate --config /tmp/Caddy.new --adapter caddyfile >/tmp/val.log 2>&1; then
  echo "   VALIDASI GAGAL, Caddyfile lama tetap dipakai:"; tail -4 /tmp/val.log; exit 1
fi
echo "   valid"

echo "== 4. pasang dan muat ulang"
cp "$CF" "$CF.bak-$(date +%Y%m%d-%H%M%S)"
cp /tmp/Caddy.new "$CF"
systemctl reload caddy 2>/dev/null || systemctl restart caddy
sleep 2

echo "== 5. periksa dari luar"
for u in /health /panel/admin/ /panel/ /bikini/ /bikini-cfg.json; do
  echo -n "   https://$DOMAIN$u -> "
  curl -s -o /dev/null -w "%{http_code}\n" --max-time 12 "https://$DOMAIN$u"
done
echo -n "   versi: "; curl -s --max-time 10 "https://$DOMAIN/health" | head -c 200; echo
echo "== selesai"

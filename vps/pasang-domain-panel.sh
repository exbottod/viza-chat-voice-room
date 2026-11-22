#!/usr/bin/env bash
# Pasang domain khusus untuk panel developer Viza.
# Pakai: sudo bash pasang-domain-panel.sh panel.domainanda.com
# Hasil: https://panel.domainanda.com/admin/  membuka panel Viza,
#        sertifikat HTTPS dibuat otomatis oleh Caddy.
set -uo pipefail

DOMAIN="${1:-}"
if [ -z "$DOMAIN" ]; then
  echo "Pakai: sudo bash pasang-domain-panel.sh panel.domainanda.com"
  exit 1
fi
DOMAIN="${DOMAIN#http://}"; DOMAIN="${DOMAIN#https://}"; DOMAIN="${DOMAIN%%/*}"
if ! echo "$DOMAIN" | grep -qE '^[a-z0-9.-]+\.[a-z]{2,}$'; then
  echo "Domain tidak valid: $DOMAIN"; exit 1
fi
if [ ! -d /opt/viza-panel/admin ]; then
  echo "Panel belum ada di /opt/viza-panel/admin."
  echo "Jalankan dulu: curl -fsSL https://raw.githubusercontent.com/exbottod/viza-chat-voice-room/main/vps/pasang-panel-viza.sh | sudo bash"
  exit 1
fi

CADDY=/etc/caddy/Caddyfile
cp -a "$CADDY" "$CADDY.bak.$(date +%Y%m%d%H%M%S)"
echo "== 1. cadangan Caddyfile dibuat"

python3 - "$CADDY" "$DOMAIN" <<'PY'
import sys, re
jalur, domain = sys.argv[1], sys.argv[2]
isi = open(jalur, encoding='utf-8').read()
blok = (
    "# >>> panel-domain " + domain + "\n"
    + domain + " {\n"
    "\tencode gzip\n"
    "\t@akar path /\n"
    "\tredir @akar /admin/ 302\n"
    "\troot * /opt/viza-panel\n"
    "\ttry_files {path} {path}/ /admin/index.html\n"
    "\tfile_server\n"
    "}\n"
    "# <<< panel-domain " + domain + "\n"
)
isi = re.sub(r"# >>> panel-domain.*?# <<< panel-domain[^\n]*\n", "", isi, flags=re.S)
if not isi.endswith("\n"):
    isi += "\n"
open(jalur, "w", encoding='utf-8').write(isi + "\n" + blok)
print("   blok " + domain + " ditulis ke Caddyfile")
PY

echo "== 2. periksa dan muat ulang Caddy"
if ! caddy validate --config "$CADDY" >/tmp/caddy-cek.log 2>&1; then
  echo "   Caddyfile tidak valid, cadangan dikembalikan:"
  tail -5 /tmp/caddy-cek.log
  ls -t "$CADDY".bak.* | head -1 | xargs -I{} cp -a {} "$CADDY"
  exit 1
fi
systemctl reload caddy 2>/dev/null || systemctl restart caddy
sleep 3

echo "== 3. cek dari server"
IP=$(curl -s -m 8 https://api.ipify.org || echo "IP VPS")
for u in "https://$DOMAIN/admin/" "https://$DOMAIN/admin/styles.css" "https://$DOMAIN/admin/app.js"; do
  printf '   %-42s %s\n' "$u" "$(curl -s -o /dev/null -m 25 -w '%{http_code}' "$u")"
done
echo
echo "Harus 200 semua. Kalau 000 atau sertifikat gagal:"
echo "   1. A record $DOMAIN harus menunjuk ke $IP"
echo "   2. Port TCP 80 dan 443 harus terbuka di Firewall Helipod/Tencent"
echo "   3. Tunggu 1-3 menit, Caddy menerbitkan sertifikat sendiri"

#!/usr/bin/env bash
# Pasang berkas panel manager/seller ke /opt/viza-panel dari satu paket tar.gz
# (tanpa API GitHub, jadi tidak kena batas unduhan).
# Pakai: curl -fsSL https://raw.githubusercontent.com/exbottod/viza-chat-voice-room/main/vps/pasang-panel-viza.sh | sudo bash
set -u
REPO=https://raw.githubusercontent.com/exbottod/viza-chat-voice-room/main
DOMAIN=viza.43-156-99-4.sslip.io

echo "== 1. unduh paket panel"
curl -fsSL "$REPO/docs/panel/admin.tar.gz?cb=$(date +%s)" -o /tmp/panel.tgz || { echo "   unduh gagal"; exit 1; }
echo "   ukuran: $(du -h /tmp/panel.tgz | cut -f1)"

echo "== 2. pasang ke /opt/viza-panel"
mkdir -p /opt/viza-panel
tar -xzf /tmp/panel.tgz -C /opt/viza-panel || { echo "   ekstrak gagal"; exit 1; }
chmod -R a+rX /opt/viza-panel
echo "   berkas: $(find /opt/viza-panel/admin -type f | wc -l)"
ls /opt/viza-panel/admin | head -6 | sed 's/^/   /'

echo "== 3. periksa"
for u in /panel/admin/ /panel/admin/app.js /panel/admin/index.html /health; do
  echo -n "   https://$DOMAIN$u -> "
  curl -s -o /dev/null -w "%{http_code}\n" --max-time 12 "https://$DOMAIN$u"
done
echo -n "   judul halaman: "; curl -s --max-time 10 "https://$DOMAIN/panel/admin/" | grep -o "<title>[^<]*</title>" | head -1; echo
echo "== selesai"

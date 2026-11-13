#!/usr/bin/env bash
# Sambungkan dompet Viza ke LiveKit Viza: suntik LIVEKIT_* ke unit yang benar.
set -eo pipefail
[ "$(id -u)" = "0" ] || { echo "Jalankan dengan sudo."; exit 1; }

[ -f /etc/livekit/kunci.env ] || { echo "/etc/livekit/kunci.env tidak ada. Jalankan pasang-livekit-viza.sh dulu."; exit 1; }
LK_KEY=$(grep '^LK_KEY=' /etc/livekit/kunci.env | cut -d= -f2)
LK_SECRET=$(grep '^LK_SECRET=' /etc/livekit/kunci.env | cut -d= -f2)
LK_URL="wss://livekit.43-156-99-4.sslip.io"
[ -n "$LK_KEY" ] && [ -n "$LK_SECRET" ] || { echo "kunci LiveKit kosong."; exit 1; }
echo "kunci LiveKit terbaca, alamat $LK_URL"

for UNIT in viza-dompet viza-api viza; do
  if systemctl list-unit-files 2>/dev/null | grep -q "^${UNIT}\.service"; then
    DIR="/etc/systemd/system/${UNIT}.service.d"
    mkdir -p "$DIR"
    {
      echo "[Service]"
      echo "Environment=LIVEKIT_URL=$LK_URL"
      echo "Environment=LIVEKIT_API_KEY=$LK_KEY"
      echo "Environment=LIVEKIT_API_SECRET=$LK_SECRET"
    } > "$DIR/livekit.conf"
    echo "ditulis: $DIR/livekit.conf"
    systemctl daemon-reload
    systemctl restart "$UNIT"
    sleep 3
    echo "status $UNIT: $(systemctl is-active "$UNIT")"
    if systemctl show "$UNIT" -p Environment | grep -q LIVEKIT_API_KEY; then
      echo "  kunci LiveKit terbaca oleh $UNIT: ya"
    else
      echo "  kunci LiveKit terbaca oleh $UNIT: TIDAK"
    fi
  fi
done

PORT=$(cat /var/lib/viza-port 2>/dev/null || echo 8092)
echo -n "uji /lktoken tanpa token (harus 401 'Sesi tidak sah'): "
curl -s -o /tmp/lkt -w "%{http_code} " --max-time 8 -X POST -H 'content-type: application/json' -d '{"channel":"uji"}' "http://127.0.0.1:$PORT/lktoken" || true
head -c 120 /tmp/lkt 2>/dev/null; echo
echo "Selesai. Buka room di APK, tekan mic."

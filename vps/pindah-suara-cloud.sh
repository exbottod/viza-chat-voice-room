#!/usr/bin/env bash
# Pindahkan suara Viza dari LiveKit di VPS ke LiveKit Cloud.
# Jalankan di VPS DOMPET (viza): sudo bash pindah-suara-cloud.sh
# Aplikasi tidak perlu build baru: alamat suara dibaca dari jawaban /lktoken.
set -uo pipefail
[ "$(id -u)" = "0" ] || { echo "Jalankan dengan sudo."; exit 1; }

echo "== Isi data proyek LiveKit Cloud (ambil di dashboard Settings > Keys)"
read -rp "Alamat WSS (contoh wss://viza-xxxx.livekit.cloud): " LK_URL
read -rp "API Key: " LK_KEY
read -rsp "API Secret (tidak akan tampil): " LK_SECRET; echo
case "$LK_URL" in wss://*|wss:*) ;; *) echo "Alamat harus diawali wss://"; exit 1;; esac
[ -n "$LK_KEY" ] && [ -n "$LK_SECRET" ] || { echo "Kunci kosong."; exit 1; }

echo
echo "== Tulis pengaturan ke layanan dompet"
ADA=0
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
    chmod 600 "$DIR/livekit.conf"
    echo "ditulis: $DIR/livekit.conf"
    ADA=1
  fi
done
[ "$ADA" = 1 ] || { echo "Layanan dompet tidak ditemukan. Kirim keluaran: systemctl list-units | grep viza"; exit 1; }
systemctl daemon-reload
for UNIT in viza-dompet viza-api viza; do
  systemctl list-unit-files 2>/dev/null | grep -q "^${UNIT}\.service" && systemctl restart "$UNIT" && sleep 2
done

echo
echo "== Periksa terbaca"
for UNIT in viza-dompet viza-api viza; do
  systemctl list-unit-files 2>/dev/null | grep -q "^${UNIT}\.service" || continue
  echo "$UNIT: $(systemctl is-active "$UNIT")"
  if systemctl show "$UNIT" -p Environment | grep -q "LIVEKIT_URL=$LK_URL"; then
    echo "  alamat LiveKit Cloud terbaca: ya"
  else
    echo "  alamat LiveKit Cloud terbaca: TIDAK"
  fi
done

PORT=$(cat /var/lib/viza-port 2>/dev/null || echo 8092)
echo
echo "== Uji /lktoken (harus 401 tanpa login, itu artinya jalur hidup)"
curl -s -o /tmp/lkt -w "kode %{http_code}\n" --max-time 8 -X POST -H 'content-type: application/json' \
  -d '{"channel":"uji"}' "http://127.0.0.1:$PORT/lktoken" || true
head -c 150 /tmp/lkt 2>/dev/null; echo

echo
echo "== Matikan LiveKit lama di VPS ini supaya pipa lega"
if systemctl list-unit-files 2>/dev/null | grep -q '^livekit\.service'; then
  systemctl stop livekit 2>/dev/null
  systemctl disable livekit 2>/dev/null
  echo "livekit lokal: dihentikan dan dimatikan dari boot"
else
  echo "tidak ada layanan livekit lokal"
fi

echo
echo "SELESAI. Buka room di aplikasi lalu tekan mic."
echo "Kalau suara tidak jalan, kembalikan ke server lama: hapus /etc/systemd/system/viza-dompet.service.d/livekit.conf lalu systemctl daemon-reload && systemctl restart viza-dompet"

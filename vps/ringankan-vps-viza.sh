#!/usr/bin/env bash
# Ringankan VPS Viza: cabut layanan Rezo dan LiveKit yang tidak dipakai lagi,
# lalu tampilkan siapa pemakan CPU/memori/bandwidth sebelum dan sesudahnya.
# Tidak menyentuh dompet Viza (viza-dompet), Caddy, atau panel Viza.
set -uo pipefail

say() { echo; echo "== $*"; }
[ "$(id -u)" = "0" ] || { echo "Jalankan dengan sudo."; exit 1; }

pemakan() {
  echo "-- proses pemakan memori (10 teratas)"
  ps -eo pid,comm,%cpu,%mem,rss --sort=-rss | head -11
  echo "-- ringkas memori"
  free -m | head -2
  echo "-- beban"
  uptime
}

say "0/5 Keadaan sebelum"
pemakan
echo "-- koneksi aktif: $(ss -tan state established | tail -n +2 | wc -l)"
echo "-- 10 alamat luar terbanyak:"
ss -tan state established | tail -n +2 | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort -rn | head -10
echo "-- pemakaian folder besar"
du -sh /opt/* 2>/dev/null | sort -h | tail -10

say "1/5 Layanan yang berjalan"
systemctl list-units --type=service --state=running --no-pager --no-legend | awk '{print $1}' | grep -Ei 'rezo|livekit|caddy|viza|node|docker' || true
command -v docker >/dev/null 2>&1 && docker ps --format '{{.Names}} | {{.Image}}' 2>/dev/null | head -20

say "2/5 Cabut layanan Rezo"
REZO_UNITS=$(systemctl list-unit-files --no-pager --no-legend | awk '{print $1}' | grep -Ei '^rezo' || true)
if [ -n "$REZO_UNITS" ]; then
  for u in $REZO_UNITS; do
    echo "   hentikan $u"
    systemctl stop "$u" 2>/dev/null || true
    systemctl disable "$u" 2>/dev/null || true
  done
else
  echo "   tidak ada unit systemd bernama rezo"
fi
if command -v docker >/dev/null 2>&1; then
  for c in $(docker ps -q --filter "name=rezo" 2>/dev/null); do
    echo "   hentikan kontainer $c"
    docker stop "$c" >/dev/null 2>&1 || true
    docker update --restart=no "$c" >/dev/null 2>&1 || true
  done
fi
if [ -d /opt/rezo-api ]; then
  # Tidak dihapus permanen: diganti nama dulu supaya bisa dikembalikan.
  mv /opt/rezo-api "/opt/rezo-api.simpan-$(date +%Y%m%d-%H%M)" 2>/dev/null \
    && echo "   /opt/rezo-api dipindahkan (bisa dikembalikan)" \
    || echo "   /opt/rezo-api tidak bisa dipindahkan"
fi

say "3/5 Cabut LiveKit (suara room sudah lewat Agora)"
LK_UNITS=$(systemctl list-unit-files --no-pager --no-legend | awk '{print $1}' | grep -Ei 'livekit' || true)
if [ -n "$LK_UNITS" ]; then
  for u in $LK_UNITS; do
    echo "   hentikan $u"
    systemctl stop "$u" 2>/dev/null || true
    systemctl disable "$u" 2>/dev/null || true
  done
else
  echo "   tidak ada unit livekit"
fi

say "4/5 Muat ulang Caddy (tanpa menyentuh dompet Viza)"
systemctl restart caddy 2>/dev/null || true
sleep 2

say "5/5 Keadaan sesudah"
pemakan
echo "-- koneksi aktif: $(ss -tan state established | tail -n +2 | wc -l)"
echo "-- cek layanan Viza"
for u in viza-dompet viza-api caddy; do
  printf '   %-12s %s\n' "$u" "$(systemctl is-active "$u" 2>/dev/null || echo tidak-ada)"
done
echo "-- cek jawaban server"
for p in /health /panel/admin/; do
  printf '   %-14s %s\n' "$p" "$(curl -s -o /dev/null -w '%{http_code}' -m 8 "http://127.0.0.1:8080$p" 2>/dev/null)"
done
echo
echo "Selesai. Kalau /health dan panel tetap 200, Viza aman dan VPS lebih ringan."
echo "Bila ada yang perlu dikembalikan: mv /opt/rezo-api.simpan-* /opt/rezo-api lalu systemctl enable --now <unit rezo>."

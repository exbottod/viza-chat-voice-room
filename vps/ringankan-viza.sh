#!/usr/bin/env bash
# Ringankan VPS Viza yang sesak: memori 94%, swap 100%, ribuan koneksi
# menggantung, dan bandwidth keluar hampir menyentuh batas.
#
# Skrip ini:
#   1. mencatat keadaan sekarang (memori, swap, koneksi, IP paling banyak)
#   2. membatasi memori proses dompet supaya tidak menulis ke swap terus
#   3. memasang restart otomatis tiap malam 03:00 (membersihkan sisa memori)
#   4. menurunkan swappiness supaya sistem tidak cepat menukar ke disk
#   5. menyalakan ulang layanan dan memeriksa hasilnya
#
# Tidak menghapus berkas aset, tidak mengubah database.
set -u
LAYANAN="viza-dompet"
PORT="${PORT_DOMPET:-8092}"
DIR_OVERRIDE="/etc/systemd/system/${LAYANAN}.service.d"

echo "== 1. Keadaan sekarang =="
free -h 2>/dev/null | sed -n '1,3p'
echo
echo "Swap:"
swapon --show 2>/dev/null || echo "  (tidak ada swap aktif)"
echo
echo "Beban (load average):"
cat /proc/loadavg 2>/dev/null
echo
echo "Koneksi TCP established: $(ss -tan state established 2>/dev/null | tail -n +2 | wc -l)"
echo "IP paling banyak memegang koneksi:"
ss -tan state established 2>/dev/null | tail -n +2 | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort -rn | head -8
echo
echo "Proses paling banyak memori:"
ps aux --sort=-%mem 2>/dev/null | head -6 | awk '{printf "  %-22s mem %5s%%  rss %6s KB  %s\n", $1, $4, $6, $11}'
echo

echo "== 2. Batasi memori proses dompet =="
mkdir -p "$DIR_OVERRIDE"
cat > "$DIR_OVERRIDE/memori.conf" <<'EOF'
# Ditambahkan oleh vps/ringankan-viza.sh
# Proses dompet tidak boleh menelan seluruh RAM lalu memaksa sistem menulis
# ke swap (gejala: permintaan butuh puluhan detik). Di atas MemoryHigh proses
# diperlambat, di atas MemoryMax layanan dihentikan lalu dinyalakan ulang.
[Service]
MemoryHigh=900M
MemoryMax=1300M
Restart=always
RestartSec=3
Environment=NODE_OPTIONS=--max-old-space-size=768
EOF
echo "Ditulis: $DIR_OVERRIDE/memori.conf"

echo
echo "== 3. Restart otomatis tiap malam 03:00 =="
cat > /etc/systemd/system/viza-dompet-malam.service <<EOF
[Unit]
Description=Restart malam layanan dompet Viza (bersihkan sisa memori)
[Service]
Type=oneshot
ExecStart=/bin/systemctl restart ${LAYANAN}
EOF
cat > /etc/systemd/system/viza-dompet-malam.timer <<'EOF'
[Unit]
Description=Timer restart malam dompet Viza
[Timer]
OnCalendar=*-*-* 03:00:00
Persistent=true
[Install]
WantedBy=timers.target
EOF
systemctl daemon-reload
systemctl enable --now viza-dompet-malam.timer >/dev/null 2>&1 && echo "Timer aktif (03:00 tiap hari)" || echo "Timer gagal dipasang"

echo
echo "== 4. Swappiness 10 (jangan cepat menukar ke disk) =="
sysctl -w vm.swappiness=10 >/dev/null 2>&1 && echo "vm.swappiness=10" || echo "gagal mengubah swappiness"
if ! grep -q '^vm.swappiness' /etc/sysctl.conf 2>/dev/null; then
  echo 'vm.swappiness=10' >> /etc/sysctl.conf
fi

echo
echo "== 5. Kosongkan swap hanya bila RAM cukup =="
# PENTING: swapoff memaksa SEMUA isi swap kembali ke RAM sekaligus. Bila RAM
# belum cukup, kernel membunuh proses siapa saja, dan dulu Caddy ikut mati
# sehingga seluruh domain balas "connection reset". Jadi ukur dulu.
RAM_KOSONG=$(awk '/MemAvailable/ {print int($2/1024)}' /proc/meminfo 2>/dev/null)
SWAP_ISI=$(awk '/SwapTotal/ {t=$2} /SwapFree/ {f=$2} END {print int((t-f)/1024)}' /proc/meminfo 2>/dev/null)
echo "RAM tersedia ${RAM_KOSONG:-0} MB, swap terpakai ${SWAP_ISI:-0} MB"
if [ "${RAM_KOSONG:-0}" -gt $(( ${SWAP_ISI:-0} + 500 )) ]; then
  swapoff -a 2>/dev/null && swapon -a 2>/dev/null && echo "Swap dikosongkan" || echo "Swap gagal dikosongkan (dilewati)"
else
  echo "Dilewati: RAM belum cukup untuk menarik isi swap. Swap akan menyusut sendiri."
fi
systemctl daemon-reload
systemctl restart "$LAYANAN" 2>&1 || echo "restart gagal"
sleep 5
echo "Status dompet: $(systemctl is-active "$LAYANAN" 2>/dev/null)"
# Caddy bisa ikut terbunuh bila memori sempat habis; pastikan hidup lagi.
if ! systemctl is-active --quiet caddy 2>/dev/null; then
  echo "Caddy mati, menyalakan ulang"
  systemctl restart caddy 2>/dev/null || echo "Caddy gagal dinyalakan"
  sleep 3
fi
echo "Status Caddy: $(systemctl is-active caddy 2>/dev/null)"

echo
echo "== 6. Cek /health dari dalam =="
for i in $(seq 1 10); do
  kode=$(curl -s -o /tmp/hv.txt -m 5 -w '%{http_code}' "http://127.0.0.1:${PORT}/health" 2>/dev/null)
  detik=$(curl -s -o /dev/null -m 5 -w '%{time_total}' "http://127.0.0.1:${PORT}/health" 2>/dev/null)
  echo "  coba $i: kode $kode, $detik detik"
  [ "$kode" = "200" ] && break
  sleep 2
done
head -c 200 /tmp/hv.txt 2>/dev/null; echo

echo
echo "== 7. Keadaan sesudah =="
free -h 2>/dev/null | sed -n '1,3p'
echo "Koneksi established: $(ss -tan state established 2>/dev/null | tail -n +2 | wc -l)"
echo
echo "== 8. Cek domain dari dalam =="
for u in "http://127.0.0.1:${PORT}/health" "https://viza.43-156-99-4.sslip.io/health"; do
  printf "  %-46s -> " "$u"
  curl -s -o /dev/null -m 8 -w "%{http_code} %{time_total}s\n" "$u" 2>/dev/null || echo "GAGAL"
done
echo
echo "Selesai. Target: swap turun jauh di bawah 100%, /health di bawah 1 detik."

#!/usr/bin/env bash
# Pulihkan layanan dompet Viza yang mati (gejala: aplikasi menampilkan
# "Server dompet error 502", gift gagal terkirim, game Bikini tidak dapat koin).
# Skrip ini hanya me-restart layanan dan memeriksa hasilnya; tidak mengubah data.
set -u
echo "== 1. Status layanan =="
systemctl is-active viza-dompet 2>/dev/null || echo "tidak aktif"
echo
echo "== 2. Proses yang memakai port 8080 dan 8092 =="
ss -lntp 2>/dev/null | grep -E ':(8080|8092)\b' || echo "tidak ada yang mendengar"
echo
echo "== 3. Restart viza-dompet =="
systemctl restart viza-dompet 2>&1 || echo "restart gagal"
sleep 4
systemctl is-active viza-dompet
echo
echo "== 4. Tunggu /health dari dalam (maks 30 detik) =="
for i in $(seq 1 15); do
  kode=$(curl -s -o /tmp/h.txt -m 3 -w '%{http_code}' http://127.0.0.1:8080/health 2>/dev/null)
  if [ "$kode" = "200" ]; then echo "OK /health 200"; head -c 200 /tmp/h.txt; echo; break; fi
  echo "  coba $i: $kode"; sleep 2
done
echo
echo "== 5. Berkas aset di disk (tidak hilang walau layanan mati) =="
for d in /opt/viza-api/aset /opt/viza-api/berkas /opt/viza-api/gift /opt/viza-api/game; do
  if [ -d "$d" ]; then
    printf "%-26s %s berkas, %s\n" "$d" "$(find "$d" -type f | wc -l)" "$(du -sh "$d" 2>/dev/null | cut -f1)"
  fi
done
echo
echo "== 6. Cek dari luar =="
for p in /health /saldo /token; do
  printf "%-10s " "$p"
  curl -s -o /dev/null -m 12 -w '%{http_code} %{time_total}s\n' "https://viza.43-156-99-4.sslip.io$p"
done
echo
echo "== 7. Bila masih gagal, 25 baris log terakhir =="
journalctl -u viza-dompet -n 25 --no-pager 2>/dev/null | tail -25

#!/usr/bin/env bash
# Sajikan panel Viza dari server dompet sendiri: https://viza.43-156-99-4.sslip.io/panel/admin/
# Dengan begitu panel dan dompet satu asal, jadi tidak ada CORS sama sekali.
# Situs Rezo tidak diubah; Caddyfile dicadangkan dulu.
#
# Pakai: curl -fsSL https://raw.githubusercontent.com/exbottod/viza-chat-voice-room/main/vps/pasang-panel-viza.sh -o panel-viza.sh && sudo bash panel-viza.sh
set -uo pipefail
DOMAIN=${DOMAIN:-viza.43-156-99-4.sslip.io}
TUJUAN=/opt/viza-panel/admin
REPO=exbottod/viza-chat-voice-room
CABANG=main
CADDYFILE=${CADDYFILE:-/etc/caddy/Caddyfile}

[ "$(id -u)" = 0 ] || { echo "Jalankan sebagai root (sudo)"; exit 1; }
command -v python3 >/dev/null || { echo "python3 tidak ada"; exit 1; }

echo "== 1/4 Unduh panel =="
mkdir -p "$TUJUAN"
python3 - "$REPO" "$CABANG" "$TUJUAN" <<'PY'
import json,sys,urllib.request,os
repo,branch,tujuan=sys.argv[1],sys.argv[2],sys.argv[3]
def unduh(jalur, ke, n=[0]):
    api=f"https://api.github.com/repos/{repo}/contents/{jalur}?ref={branch}"
    req=urllib.request.Request(api,headers={"User-Agent":"viza-panel"})
    daftar=json.load(urllib.request.urlopen(req,timeout=30))
    if isinstance(daftar,dict): daftar=[daftar]
    for f in daftar:
        if f["type"]=="dir":
            sub=os.path.join(ke,f["name"]); os.makedirs(sub,exist_ok=True)
            unduh(f["path"], sub)
        elif f["type"]=="file":
            data=urllib.request.urlopen(f["download_url"],timeout=30).read()
            open(os.path.join(ke,f["name"]),"wb").write(data)
            n[0]+=1
    return n[0]
print(f"{unduh('docs/panel/admin', tujuan)} berkas panel tersimpan di {tujuan}")
PY
[ -f "$TUJUAN/index.html" ] || { echo "index.html gagal diunduh"; exit 1; }

echo "== 2/4 Sisipkan jalur panel di Caddy =="
[ -f "$CADDYFILE" ] || { echo "Caddyfile tidak ada"; exit 1; }
cp "$CADDYFILE" "$CADDYFILE.bak-$(date +%s)"
python3 - "$CADDYFILE" "$DOMAIN" <<'PY'
import sys
path,domain=sys.argv[1],sys.argv[2]
baris=open(path).read().split("\n")
isiPanel = [
 "\t\thandle_path /panel/* {",
 "\t\t\troot * /opt/viza-panel",
 "\t\t\t@manif path *.webmanifest",
 "\t\t\theader @manif Content-Type application/manifest+json",
 "\t\t\tfile_server",
 "\t\t}",
]
if any("/panel/*" in b for b in baris):
    # Sudah pernah dipasang: cukup pastikan manifest dikirim dengan tipe yang benar
    # supaya pintasan/PWA di HP memakai logo Viza.
    if any("application/manifest+json" in b for b in baris):
        print("jalur /panel/ sudah ada dan manifest sudah benar")
        sys.exit(0)
    for i,b in enumerate(baris):
        if "handle_path /panel/*" in b:
            baris[i+1:i+1] = [
              "\t\t\t@manif path *.webmanifest",
              "\t\t\theader @manif Content-Type application/manifest+json",
            ]
            break
    open(path,"w").write("\n".join(baris))
    print("manifest panel: tipe MIME ditambahkan")
    sys.exit(0)
awal=None
for i,b in enumerate(baris):
    if b.strip().startswith(domain) and "{" in b:
        awal=i; break
if awal is None:
    print("blok situs",domain,"tidak ditemukan di Caddyfile"); sys.exit(1)
akhir=None
for j in range(awal+1,len(baris)):
    if baris[j].strip()=="}":
        akhir=j; break
if akhir is None:
    print("tanda tutup blok tidak ditemukan"); sys.exit(1)
sisip=[
 "\t# Panel developer, disajikan dari server yang sama (bebas CORS)",
 "\thandle_path /panel/* {",
 "\t\troot * /opt/viza-panel",
 "\t\tfile_server",
 "\t}",
]
baris[akhir:akhir]=sisip
open(path,"w").write("\n".join(baris))
print(f"blok /panel/ disisipkan ke situs {domain}")
PY
tail -c 600 "$CADDYFILE"; echo

echo "== 3/4 Muat ulang Caddy =="
PID=$(pgrep -x caddy | head -1 || true)
if systemctl list-unit-files 2>/dev/null | grep -q '^caddy\.service'; then
  caddy validate --config "$CADDYFILE" --adapter caddyfile >/tmp/cv.log 2>&1 || { echo "Caddyfile ditolak:"; tail -6 /tmp/cv.log; exit 1; }
  systemctl reload caddy && echo "reload systemd OK"
elif [ -n "$PID" ]; then
  caddy reload --config "$CADDYFILE" --adapter caddyfile >/tmp/cv.log 2>&1 && echo "reload OK" || { tail -6 /tmp/cv.log; exit 1; }
else
  echo "Caddy tidak ditemukan"; exit 1
fi
sleep 4

echo "== 4/4 Uji =="
echo -n "panel : "; curl -s -o /dev/null -w "kode=%{http_code}\n" --max-time 15 "https://$DOMAIN/panel/admin/"
echo -n "app.js: "; curl -s -o /dev/null -w "kode=%{http_code}\n" --max-time 15 "https://$DOMAIN/panel/admin/app.js"
echo -n "dompet: "; curl -s --max-time 15 "https://$DOMAIN/health"; echo
echo "Buka https://$DOMAIN/panel/admin/ lalu login dan coba Kirim panel manager."

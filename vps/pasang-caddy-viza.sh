#!/usr/bin/env bash
# Pasang Caddyfile Viza: viza -> dompet 8080, panel, livekit, vender
set -u
CF=/etc/caddy/Caddyfile
BAK=/etc/caddy/Caddyfile.aman.$(date +%Y%m%d-%H%M%S)

echo "== 1. backup konfigurasi lama"
cp "$CF" "$BAK" && echo "tersimpan: $BAK"

echo "== 2. tulis Caddyfile baru"
cat > "$CF" <<'CADDY'
43-156-99-4.sslip.io {
	encode gzip
	handle /lktoken* {
		reverse_proxy 127.0.0.1:8091
	}
	handle_path /livekit* {
		reverse_proxy 127.0.0.1:7880
	}
	handle /agora* {
		reverse_proxy 127.0.0.1:8090
	}
	handle {
		reverse_proxy 127.0.0.1:8080
	}
}

viza.43-156-99-4.sslip.io {
	encode gzip
	root * /opt/viza-panel
	handle_path /panel/* {
		header Cache-Control "no-cache, must-revalidate"
		@manif path *.webmanifest
		header @manif Content-Type application/manifest+json
		file_server
	}
	handle {
		reverse_proxy 127.0.0.1:8080
	}
}

livekit.43-156-99-4.sslip.io {
	reverse_proxy 127.0.0.1:7890
}

vender.43-156-99-4.sslip.io {
	handle /v1/* {
		reverse_proxy 127.0.0.1:8100
	}
	handle /health {
		reverse_proxy 127.0.0.1:8100
	}
	handle /unduh/* {
		root * /opt/venderlive/public
		file_server
	}
}
CADDY

echo "== 3. validasi"
if ! caddy validate --config "$CF" --adapter caddyfile >/tmp/caddyval.log 2>&1; then
	echo "VALIDASI GAGAL. Konfigurasi lama dikembalikan."
	tail -4 /tmp/caddyval.log
	cp "$BAK" "$CF"
	exit 1
fi
echo "valid configuration"

echo "== 4. restart caddy"
systemctl restart caddy
sleep 8

echo "== 5. cek hasil"
echo -n "viza  /health = "; curl -sk -o /dev/null -w "%{http_code}\n" https://viza.43-156-99-4.sslip.io/health
echo -n "viza  /bikini-cfg.json = "; curl -sk -o /dev/null -w "%{http_code}\n" https://viza.43-156-99-4.sslip.io/bikini-cfg.json
echo -n "utama /health = "; curl -sk -o /dev/null -w "%{http_code}\n" https://43-156-99-4.sslip.io/health
echo -n "livekit = "; curl -sk -o /dev/null -w "%{http_code}\n" https://livekit.43-156-99-4.sslip.io/
systemctl disable --now livekit >/dev/null 2>&1 && echo "livekit lama dimatikan" || echo "livekit tidak ada / sudah mati"
echo "== selesai"

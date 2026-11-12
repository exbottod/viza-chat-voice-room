#!/usr/bin/env bash
# Bangun APK white-label untuk pembeli, terpisah penuh dari merek Rezo.
#
#   ./build-whitelabel.sh <google-services.json> "<Nama Aplikasi>" <paket> "<Merek>" [url-rtdb]
#
# Sumber asli tidak pernah diubah: tiap build memakai salinan baru, lalu nama
# Rezo dibersihkan dan diganti merek pembeli.
set -e
AKAR="/app/conversations/6acfa289d02a5b1eed769154"
SUMBER="$AKAR/repo-whitelabel"
PAKET_REZO="com.rezochatvoice.exceo"
GJ="${1:-}"; NAMA="${2:-}"; PAKET="${3:-}"; MEREK="${4:-}"; RTDB="${5:-}"; GOOGLE_ID="${6:-}"

[ -f "$GJ" ] || { echo "google-services.json tidak ditemukan: $GJ"; exit 1; }
[ -n "$PAKET" ] || { echo "Nama paket wajib diisi, contoh com.namabrand.app"; exit 1; }
[ -n "$MEREK" ] || { echo "Nama merek wajib diisi, contoh \"Viza Chat\""; exit 1; }
case "$PAKET" in
  "$PAKET_REZO") echo "Paket tidak boleh sama dengan paket Rezo."; exit 1 ;;
  *.*) : ;;
  *) echo "Nama paket harus berbentuk com.namabrand.app"; exit 1 ;;
esac

SLUG=$(printf '%s' "$MEREK" | tr '[:upper:]' '[:lower:]' | tr -cd 'a-z0-9')
KERJA="$AKAR/build-wl/$SLUG"
echo "1) Menyiapkan salinan bersih di $KERJA"
mkdir -p "$AKAR/build-wl"
if [ -d "$KERJA" ]; then find "$KERJA" -mindepth 1 -delete; else mkdir -p "$KERJA"; fi
tar -C "$SUMBER" --exclude=.git --exclude=build --exclude=.gradle -cf - . | tar -C "$KERJA" -xf -

echo "2) Mengganti paket menjadi $PAKET"
sed -i "s#namespace = \"$PAKET_REZO\"#namespace = \"$PAKET\"#" "$KERJA/app/build.gradle.kts"
sed -i "s#applicationId = \"$PAKET_REZO\"#applicationId = \"$PAKET\"#" "$KERJA/app/build.gradle.kts"
GJ_BERSIH="$KERJA/google-services-bersih.json"
python3 "$AKAR/tools/gj_prep.py" "$GJ" "$GJ_BERSIH" "$PAKET"
GJ="$GJ_BERSIH"
grep -rl "$PAKET_REZO" "$KERJA/app/src/main" 2>/dev/null | while read -r f; do
  sed -i "s#$PAKET_REZO#$PAKET#g" "$f"
done

echo "3) Membersihkan merek Rezo, diganti $MEREK"
python3 "$AKAR/tools/debrand.py" "$KERJA" "$MEREK" "$SLUG"

SISA=$(grep -ril "rezo" "$KERJA/app/src/main" "$KERJA/gradle.properties" 2>/dev/null | head -5)
if [ -n "$SISA" ]; then
  echo "Masih ada jejak Rezo, build dihentikan:"; echo "$SISA"; exit 1
fi
echo "3b) Bersih: tidak ada lagi jejak Rezo di sumber"

# Kunci rilis sendiri: APK ditandatangani dengan kunci ini, bukan kunci debug
# yang ikut tersebar bersama repo.
if [ -n "${VIZA_KEYSTORE:-}" ]; then
  cp "$VIZA_KEYSTORE" "$KERJA/app/rilis.keystore"
  python3 "$AKAR/tools/sign_prep.py" "$KERJA/app/build.gradle.kts"
  echo "3a) Ditandatangani dengan kunci rilis sendiri"
fi

# Ikon: logo Rezo diganti ikon netral supaya pembeli tidak membawa kelinci Rezo Star.
if [ -n "${IKON:-}" ] && [ -f "$IKON" ]; then
  cp "$IKON" "$KERJA/app/src/main/res/drawable/ic_launcher_logo.png"
  echo "3c) Ikon diganti dengan $IKON"
fi

# Versi dimulai dari nol untuk produk baru, bukan ikut nomor build Rezo.
sed -i 's/?: "1015")/?: "0")/' "$KERJA/app/build.gradle.kts"
sed -i 's/"1." + (nomorBuild \/ 1000) + "." + (nomorBuild % 1000)/"1.0." + nomorBuild/' "$KERJA/app/build.gradle.kts"
echo "3d) Versi dimulai dari 1.0.x"

echo "4) Mengatur nama aplikasi dan alamat database"
sed -i "s#<string name=\"app_name\">[^<]*</string>#<string name=\"app_name\">$NAMA</string>#" "$KERJA/app/src/main/res/values/strings.xml"
cp "$GJ" "$KERJA/app/google-services.json"
if [ -n "$RTDB" ]; then
  python3 - "$KERJA" "$RTDB" <<'PY'
import sys, pathlib, re
akar, url = pathlib.Path(sys.argv[1]), sys.argv[2]
for f in akar.rglob("Rtdb.kt"):
    t = f.read_text()
    f.write_text(re.sub(r'const val RTDB_URL = "[^"]*"', f'const val RTDB_URL = "{url}"', t))
PY
fi

if [ -n "$GOOGLE_ID" ]; then
  sed -i "s#^googleWebClientId=.*#googleWebClientId=$GOOGLE_ID#" "$KERJA/gradle.properties"
fi

export JAVA_HOME=/opt/jdk PATH=/opt/jdk/bin:$PATH ANDROID_HOME=/opt/android-sdk ANDROID_SDK_ROOT=/opt/android-sdk
echo "5) Membangun APK"
cd "$KERJA" && /opt/gradle/gradle-8.9/bin/gradle assembleRelease --no-daemon --console=plain | tail -4

APK="$KERJA/app/build/outputs/apk/release/app-arm64-v8a-release.apk"
[ -f "$APK" ] || { echo "APK tidak terbentuk"; exit 1; }
echo "6) Memeriksa hasil"
/opt/android-sdk/cmdline-tools/latest/bin/apkanalyzer manifest application-id "$APK"
echo "APK: $APK"

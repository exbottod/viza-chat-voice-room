#!/usr/bin/env bash
# Bangun APK white-label untuk pembeli.
#
#   ./build-whitelabel.sh <google-services.json> <nama-app> <paket-pembeli>
#
# Contoh:
#   ./build-whitelabel.sh ~/google-services.json "Room Bintang" com.roombintang.app
#
# Paket wajib berbeda dari com.rezochatvoice.exceo, karena applicationId yang
# sama membuat APK pembeli dianggap aplikasi Rezo yang sama: tidak bisa dipasang
# berdampingan, dan pemasangannya menimpa aplikasi Rezo.
set -e
SRC="${SRC:-/app/conversations/6acfa289d02a5b1eed769154/wl}"
PAKET_REZO="com.rezochatvoice.exceo"
GJ="${1:-}"; NAMA="${2:-}"; PAKET="${3:-}"

[ -f "$GJ" ] || { echo "Berkas google-services.json tidak ditemukan: $GJ"; exit 1; }
[ -n "$PAKET" ] || { echo "Nama paket pembeli wajib diisi. Contoh: com.namabrand.app"; exit 1; }
case "$PAKET" in
  "$PAKET_REZO") echo "Paket tidak boleh sama dengan paket Rezo ($PAKET_REZO)."; exit 1 ;;
  *.*) : ;;
  *) echo "Nama paket harus berbentuk domain terbalik, misalnya com.namabrand.app"; exit 1 ;;
esac

echo "1) Menyalin google-services.json pembeli"
cp "$GJ" "$SRC/app/google-services.json"

echo "2) Mengganti paket aplikasi menjadi $PAKET"
sed -i "s#namespace = \"$PAKET_REZO\"#namespace = \"$PAKET\"#" "$SRC/app/build.gradle.kts"
sed -i "s#applicationId = \"$PAKET_REZO\"#applicationId = \"$PAKET\"#" "$SRC/app/build.gradle.kts"
sed -i "s#\"package_name\": *\"[^\"]*\"#\"package_name\": \"$PAKET\"#" "$SRC/app/google-services.json" || true
# Berkas lain yang masih menyebut paket Rezo (provider, deep link, dan sejenisnya)
grep -rl "$PAKET_REZO" "$SRC/app/src/main" 2>/dev/null | while read -r f; do
  sed -i "s#$PAKET_REZO#$PAKET#g" "$f"
done

if [ -n "$NAMA" ]; then
  echo "3) Nama aplikasi menjadi $NAMA"
  sed -i "s#<string name=\"app_name\">[^<]*</string>#<string name=\"app_name\">$NAMA</string>#" "$SRC/app/src/main/res/values/strings.xml" || true
fi

export JAVA_HOME=/opt/jdk PATH=/opt/jdk/bin:$PATH ANDROID_HOME=/opt/android-sdk ANDROID_SDK_ROOT=/opt/android-sdk
echo "4) Membangun APK"
cd "$SRC" && /opt/gradle/gradle-8.9/bin/gradle assembleRelease --no-daemon --console=plain | tail -4

APK="$SRC/app/build/outputs/apk/release/app-arm64-v8a-release.apk"
[ -f "$APK" ] || { echo "APK tidak terbentuk"; exit 1; }
echo "5) Memeriksa paket di dalam APK"
/opt/android-sdk/cmdline-tools/latest/bin/apkanalyzer manifest application-id "$APK" 2>/dev/null || true
echo "Selesai: $APK"

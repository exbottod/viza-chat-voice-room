#!/usr/bin/env bash
# Build APK Viza di GitHub Actions. Dipanggil oleh .github/workflows/build-viza.yml.
# Semua langkah ada di sini supaya berkas workflow-nya cukup pendek.
set -e

AKAR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$AKAR"

NAMA="${NAMA_APP:-Viza Chat}"
PAKET="${PAKET:-com.vizachatvoice.app}"
RTDB="${RTDB_URL:-https://my-app-e7f8c-default-rtdb.asia-southeast1.firebasedatabase.app}"
GOOGLE_ID="${GOOGLE_WEB_ID:-622104139221-bv44lfoephrjvim5qr30qr3ek8klj6qg.apps.googleusercontent.com}"
# Nomor build selalu di atas rilis yang sudah ada supaya versi tidak pernah mundur.
NOMOR="${REZO_BUILD:-}"
if [ -z "$NOMOR" ] && [ -n "${GH_TOKEN:-}" ] && command -v gh > /dev/null 2>&1 && [ -n "${GITHUB_REPOSITORY:-}" ]; then
  NOMOR=$(gh api "repos/$GITHUB_REPOSITORY/releases?per_page=100" \
    --jq '[.[].tag_name | select(test("^viza-1\\.0\\.[0-9]+$")) | sub("viza-1\\.0\\."; "") | tonumber] | max + 1' 2>/dev/null || true)
fi
if [ -z "$NOMOR" ] || [ "$NOMOR" = "null" ]; then NOMOR=$(( ${GITHUB_RUN_NUMBER:-1} + 3 )); fi
TMP="${RUNNER_TEMP:-/tmp}"
KERJA="${KERJA:-$TMP/kerja}"

echo "== Versi 1.0.$NOMOR, paket $PAKET =="

# 1) Android SDK
export ANDROID_HOME="${ANDROID_HOME:-$HOME/android-sdk}"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
if command -v sdkmanager > /dev/null 2>&1; then
  yes | sdkmanager --licenses > /dev/null 2>&1 || true
  sdkmanager --install "platform-tools" "platforms;android-35" "build-tools;34.0.0" > /dev/null || true
fi
echo "ANDROID_HOME=$ANDROID_HOME"

# 2) Gradle 8.9
if [ -n "${GRADLE_BIN:-}" ] && [ -x "${GRADLE_BIN}" ]; then
  :
elif command -v gradle > /dev/null 2>&1; then
  GRADLE_BIN="$(command -v gradle)"
else
  if [ ! -d "$TMP/gradle-8.9" ]; then
    echo "Mengunduh Gradle 8.9"
    curl -sSL -o "$TMP/gradle.zip" https://services.gradle.org/distributions/gradle-8.9-bin.zip
    if command -v unzip > /dev/null 2>&1; then
      unzip -q "$TMP/gradle.zip" -d "$TMP"
    else
      python3 -c "import zipfile,sys; zipfile.ZipFile(sys.argv[1]).extractall(sys.argv[2])" "$TMP/gradle.zip" "$TMP"
    fi
  fi
  chmod +x "$TMP/gradle-8.9/bin/gradle" 2>/dev/null || true
  GRADLE_BIN="$TMP/gradle-8.9/bin/gradle"
fi
[ -x "$GRADLE_BIN" ] || { echo "Gradle tidak ditemukan di $GRADLE_BIN"; exit 1; }
export GRADLE_BIN

# 3) Kunci rilis dari secret
if [ -n "${VIZA_KEYSTORE_BASE64:-}" ] && [ -z "${VIZA_KEYSTORE:-}" ]; then
  VIZA_KEYSTORE="$TMP/viza-release.jks"
  printf '%s' "$VIZA_KEYSTORE_BASE64" | base64 -d > "$VIZA_KEYSTORE"
fi
export VIZA_KEYSTORE VIZA_STORE_PASS VIZA_KEY_ALIAS
[ -f "${VIZA_KEYSTORE:-/nonexistent}" ] || { echo "Kunci rilis tidak ada (secret VIZA_KEYSTORE_BASE64 kosong?)"; exit 1; }

# 4) Build
export IKON="$AKAR/tools/ikon_viza.png"
export REZO_BUILD="$NOMOR"
export KERJA
bash "$AKAR/tools/build-whitelabel.sh" "$AKAR/firebase/google-services.json" "$NAMA" "$PAKET" "$NAMA" "$RTDB" "$GOOGLE_ID"

APK="$(find "$KERJA" -name "app-arm64-v8a-release.apk" -print -quit)"
[ -n "$APK" ] && [ -f "$APK" ] || { echo "APK tidak terbentuk"; exit 1; }
cp "$APK" "$TMP/viza-chat-arm64.apk"
python3 -c "import zipfile,sys; z=zipfile.ZipFile(sys.argv[1],'w',zipfile.ZIP_DEFLATED); z.write(sys.argv[2],'viza-chat-arm64.apk'); z.close()" "$TMP/viza-chat-arm64.zip" "$TMP/viza-chat-arm64.apk"
ls -l "$TMP/viza-chat-arm64.zip"

# 5) Release GitHub (dilewati kalau tidak ada token, mis. saat uji lokal)
if [ -n "${GH_TOKEN:-}" ] && command -v gh > /dev/null 2>&1 && [ -z "${SKIP_RELEASE:-}" ]; then
  TAG="viza-1.0.$NOMOR"
  if gh release view "$TAG" > /dev/null 2>&1; then
    gh release upload "$TAG" "$TMP/viza-chat-arm64.zip" --clobber
  else
    gh release create "$TAG" "$TMP/viza-chat-arm64.zip" \
      --title "Viza Chat 1.0.$NOMOR" \
      --notes "APK arm64 build otomatis. Paket $PAKET, ditandatangani kunci rilis Viza." \
      --latest
  fi
  echo "Release: $TAG"
else
  echo "Release dilewati (tanpa GH_TOKEN)."
fi

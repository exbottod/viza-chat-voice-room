#!/usr/bin/env bash
# Build APK Viza di GitHub Actions. Dipanggil oleh .github/workflows/build-viza.yml.
# Semua langkah ada di sini supaya berkas workflow-nya cukup pendek.
set -e

AKAR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$AKAR"

# Penjaga: APK dari repo ini tidak boleh memuat alamat placeholder milik
# template white-label. Dulu ada rilis yang terbangun dari salinan debrand,
# jadi aplikasi mencari host "ganti-server-dompet" yang tidak ada, token suara
# gagal, dan seluruh room menunggu timeout.
if grep -rqE 'GANTI-SERVER-DOMPET|GANTI-SERVER-TURSO|GANTI-SERVER-AGORA' app/src/main 2>/dev/null; then
  echo "BERHENTI: app/src masih berisi alamat placeholder white-label:" >&2
  grep -rnE 'GANTI-SERVER-DOMPET|GANTI-SERVER-TURSO|GANTI-SERVER-AGORA' app/src/main | head -5 >&2
  exit 1
fi

NAMA="${NAMA_APP:-Viza Chat}"
PAKET="${PAKET:-com.vizachatvoice.app}"
RTDB="${RTDB_URL:-https://my-app-e7f8c-default-rtdb.asia-southeast1.firebasedatabase.app}"
GOOGLE_ID="${GOOGLE_WEB_ID:-622104139221-bv44lfoephrjvim5qr30qr3ek8klj6qg.apps.googleusercontent.com}"
# Nomor build selalu di atas rilis yang sudah ada supaya versi tidak pernah mundur.
NOMOR="${REZO_BUILD:-}"
if [ -z "$NOMOR" ] && [ -n "${GH_TOKEN:-}" ] && command -v gh > /dev/null 2>&1 && [ -n "${GITHUB_REPOSITORY:-}" ]; then
  # Daftar /releases bisa tidak memuat rilis terbaru, sedangkan /releases/latest
  # selalu menunjuk rilis terakhir. Nomor berikutnya dihitung dari situ, lalu
  # dicocokkan dengan daftar tag supaya tidak ada nomor yang terpakai dua kali.
  LATEST=$(gh api "repos/$GITHUB_REPOSITORY/releases/latest" --jq '.tag_name' 2>/dev/null || true)
  NOMOR=$(echo "$LATEST" | sed -n 's/^viza-1\.0\.\([0-9][0-9]*\)$/\1/p')
  TAG_MAKS=$(gh api "repos/$GITHUB_REPOSITORY/tags?per_page=100" \
    --jq '[.[].name | select(test("^viza-1\\.0\\.[0-9]+$")) | sub("viza-1\\.0\\."; "") | tonumber] | max' 2>/dev/null || true)
  if [ -n "$TAG_MAKS" ] && [ "$TAG_MAKS" != "null" ]; then
    if [ -z "$NOMOR" ] || [ "$TAG_MAKS" -gt "$NOMOR" ]; then NOMOR=$TAG_MAKS; fi
  fi
  if [ -n "$NOMOR" ]; then NOMOR=$(( NOMOR + 1 )); fi
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
# app/build.gradle.kts membaca GITHUB_RUN_NUMBER lebih dulu; dibuang supaya versi APK ikut REZO_BUILD.
unset GITHUB_RUN_NUMBER
export KERJA
# Log build disimpan. Kalau gagal, log ikut dikirim ke branch "buildlog" supaya
# penyebab galat compiler bisa dibaca tanpa membuka halaman Actions.
LOG="$TMP/viza-build.log"
set +e
bash "$AKAR/tools/build-whitelabel.sh" "$AKAR/firebase/google-services.json" "$NAMA" "$PAKET" "$NAMA" "$RTDB" "$GOOGLE_ID" 2>&1 | tee "$LOG"
HASIL_BUILD=${PIPESTATUS[0]}
set -e
if [ "$HASIL_BUILD" != "0" ]; then
  echo "== Build gagal, menyimpan log ke branch buildlog =="
  GALAT="$(mktemp -d)"
  {
    grep -E "^e: |error:|Unresolved reference|FAILURE|Execution failed|What went wrong" -A 3 "$LOG" | head -200
    echo "---- 120 baris terakhir ----"
    tail -120 "$LOG"
  } > "$GALAT/galat.txt" 2>/dev/null || true
  if [ -n "${GH_TOKEN:-}" ] && [ -n "${GITHUB_REPOSITORY:-}" ]; then
    (
      cd "$GALAT"
      git init -q .
      git -c user.email=ci@viza -c user.name=ci add galat.txt
      git -c user.email=ci@viza -c user.name=ci commit -qm "log galat build"
      git push -q --force "https://x-access-token:${GH_TOKEN}@github.com/${GITHUB_REPOSITORY}.git" HEAD:buildlog || true
    )
  fi
  exit 1
fi

# Tiga APK: arm64 (HP modern), armv7 (HP lama), universal (cadangan, semua HP).
ambil() {
  local sumber="$1" tujuan="$2"
  local f
  f="$(find "$KERJA" -name "$sumber" -print -quit)"
  [ -n "$f" ] && [ -f "$f" ] || { echo "APK $sumber tidak terbentuk"; exit 1; }
  cp "$f" "$TMP/$tujuan"
}
ambil "app-arm64-v8a-release.apk"   "viza-chat-arm64.apk"
ambil "app-armeabi-v7a-release.apk" "viza-chat-armv7.apk"
ambil "app-universal-release.apk"   "viza-chat-universal.apk"
for k in arm64 armv7 universal; do
  python3 -c "import zipfile,sys; z=zipfile.ZipFile(sys.argv[1],'w',zipfile.ZIP_DEFLATED); z.write(sys.argv[2],sys.argv[3]); z.close()" \
    "$TMP/viza-chat-$k.zip" "$TMP/viza-chat-$k.apk" "viza-chat-$k.apk"
done
ls -l "$TMP"/viza-chat-*.zip

# 5) Release GitHub (dilewati kalau tidak ada token, mis. saat uji lokal)
if [ -n "${GH_TOKEN:-}" ] && command -v gh > /dev/null 2>&1 && [ -z "${SKIP_RELEASE:-}" ]; then
  TAG="viza-1.0.$NOMOR"
  # Catatan rilis dibaca dari judul commit sejak tag terakhir, supaya dialog
  # pembaruan di APK menampilkan daftar perbaikan yang benar-benar berubah.
  TAG_LAMA="$(git tag --list 'viza-1.0.*' --sort=-v:refname | head -1)"
  CATATAN="$TMP/catatan-rilis.txt"
  {
    echo "Perbaikan di versi 1.0.$NOMOR:"
    # Buang baris teknis: penanda skip build, pembaruan halaman unduh, dan catatan rilis.
    bersih() { sed 's/ \[skip ci\]//g' | grep -viE 'halaman unduh|catatan rilis|^ *$' | head -6 || true; }
    # Yang diambil POIN di isi commit (baris berawalan "-"), bukan judul teknis
    # seperti "fix(ui): ...", supaya kalimat di dialog pembaruan bisa dibaca
    # pemain dan benar-benar menyebut perubahan versi itu.
    DAFTAR=""
    if [ -n "$TAG_LAMA" ]; then
      DAFTAR="$(git log --no-merges --pretty=format:"%b" "$TAG_LAMA"..HEAD | grep -E '^- ' | bersih | head -5)"
    fi
    if [ -z "$DAFTAR" ]; then
      DAFTAR="$(git log --no-merges --pretty=format:"%b" -6 | grep -E '^- ' | bersih | head -5)"
    fi
    # Kalau commit memang tidak menulis poin, baru pakai judulnya.
    if [ -z "$DAFTAR" ]; then
      DAFTAR="$(git log --no-merges --pretty=format:"- %s" -3 | bersih)"
    fi
    printf '%s\n' "$DAFTAR"
  } > "$CATATAN"
  sed -i '/^$/d' "$CATATAN"
  [ "$(wc -l < "$CATATAN")" -ge 2 ] || printf '%s\n' "- Perbaikan dan peningkatan aplikasi" >> "$CATATAN"
  if gh release view "$TAG" > /dev/null 2>&1; then
    gh release upload "$TAG" "$TMP"/viza-chat-arm64.apk "$TMP"/viza-chat-armv7.apk "$TMP"/viza-chat-universal.apk "$TMP"/viza-chat-arm64.zip "$TMP"/viza-chat-armv7.zip "$TMP"/viza-chat-universal.zip --clobber
  else
    gh release create "$TAG" "$TMP"/viza-chat-arm64.apk "$TMP"/viza-chat-armv7.apk "$TMP"/viza-chat-universal.apk "$TMP"/viza-chat-arm64.zip "$TMP"/viza-chat-armv7.zip "$TMP"/viza-chat-universal.zip \
      --title "Viza Chat 1.0.$NOMOR" \
      --notes-file "$CATATAN" \
      --latest
  fi
  echo "Release: $TAG"
else
  echo "Release dilewati (tanpa GH_TOKEN)."
fi

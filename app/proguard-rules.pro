# Aturan dari paket Bikini Wild Rush: jembatan saldo game ke aplikasi tidak
# boleh dihapus kalau APK release memakai minify (R8/ProGuard).
-keepclassmembers class * { @android.webkit.JavascriptInterface <methods>; }

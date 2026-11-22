package com.rezochatvoice.exceo

import android.annotation.SuppressLint
import android.graphics.Bitmap
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.compose.BackHandler
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import kotlinx.coroutines.tasks.await

// Dipasang setelah halaman game selesai dimuat. Meja game dipaksa berukuran
// piksel penuh layar karena di sebagian WebView ukuran halaman terbaca 0.
private const val skripUkuran = """(function(){
  // Kartu dialog (scatter/putaran gratis) dipaskan ke layar dengan skala,
  // bukan dengan memotong isinya. Ukuran asli dipakai selama masih muat.
  function pasKartu(){
    var d=document.documentElement;
    var krt=document.querySelectorAll('.fs-card');
    if(!krt.length){
      // Dialog lain (mis. big win) memakai latar yang sama: kembalikan
      // jaraknya supaya ukurannya tetap seperti aslinya.
      var lb=document.querySelectorAll('.prize-backdrop');
      for(var b=0;b<lb.length;b++){ if(lb[b].style.padding) lb[b].style.padding=''; }
      return;
    }
    var wv=window.visualViewport;
    var vw=Math.min(window.innerWidth||1e9,(wv?wv.width:1e9),(d.clientWidth||1e9));
    var vh=Math.min(window.innerHeight||1e9,(wv?wv.height:1e9),(d.clientHeight||1e9));
    if(vw<50||vh<50) return;
    for(var i=0;i<krt.length;i++){
      var c=krt[i];
      c.style.transform='';
      // Ikon scatter menempel 58 piksel di atas kartu, jadi latar kartu
      // diberi ruang atas supaya ikon tidak terpotong tepi layar.
      var latar=c.parentElement;
      if(latar) latar.style.padding='64px 8px 8px';
      var r=c.getBoundingClientRect();
      if(!r.width||!r.height) continue;
      // 88 = ruang ikon scatter (64) + tepi atas/bawah (8+8) + aman 8.
      var kH=(vh-88)/r.height;
      var kW=(vw-16)/r.width;
      var k=Math.min(1,kH,kW);
      if(k<1){
        c.style.transformOrigin='center center';
        c.style.transform='scale('+k+')';
      }
    }
  }
  // Kotak dialog diukur dari isinya sendiri lalu dipasangkan ke layar.
  // Dipakai untuk semua dialog .gd-box (pengaturan, menu, aturan, riwayat).
  function pasDialog(){
    var b=document.querySelector('.gd-box');
    if(!b) return;
    var wv=window.visualViewport;
    var vh=Math.min(window.innerHeight||1e9,(wv?wv.height:1e9));
    if(vh<50) return;
    var cs=getComputedStyle(b);
    var pad=(parseFloat(cs.paddingTop)||0)+(parseFloat(cs.paddingBottom)||0);
    var isi=0, anak=b.children;
    for(var i=0;i<anak.length;i++){
      var r=anak[i].getBoundingClientRect();
      var ka=getComputedStyle(anak[i]);
      isi+=r.height+(parseFloat(ka.marginTop)||0)+(parseFloat(ka.marginBottom)||0);
    }
    if(!isi) isi=b.scrollHeight||0;
    if(!isi) return;
    var total=Math.ceil(isi+pad);
    var batas=Math.max(220,Math.round(vh-24));
    b.style.setProperty('box-sizing','border-box','important');
    b.style.setProperty('max-height','none','important');
    if(total>batas){
      b.style.setProperty('height',batas+'px','important');
      b.style.setProperty('overflow','auto','important');
    } else {
      b.style.setProperty('height',Math.max(total,90)+'px','important');
      b.style.setProperty('overflow','visible','important');
    }
  }
  function fix(){
    var d=document.documentElement;
    var st=document.querySelector('.bw-stage');
    if(!st) return;
    var w=window.innerWidth||d.clientWidth||0;
    var h=window.innerHeight||d.clientHeight||0;
    if(w<50||h<50) return;
    var W=Math.round(Math.min(w,h*941/1672));
    var H=Math.round(W*1672/941);
    st.style.setProperty('max-width','none','important');
    st.style.setProperty('max-height','none','important');
    st.style.setProperty('width',W+'px','important');
    st.style.setProperty('height',H+'px','important');
    st.style.setProperty('--u',(W/941)+'px');
  }
  try{
    var s=document.createElement('style');
    s.textContent='html,body{width:100%;height:100%;margin:0;overflow:hidden}'+
      '#app{position:fixed;left:0;top:0;right:0;bottom:0;width:100%;height:100%}'+
      // Dialog pengaturan/menu dibuat selalu muat di layar. Di WebView, satuan vh
      // bisa lebih besar dari layar yang terlihat sehingga kotaknya terpotong.
      // Latar dialog dibuat pas di layar dan isinya boleh menggulir, TANPA
      // mengecilkan kotak dialog. Ukuran kotak tetap memakai aturan asli game
      // (sama seperti saat dibuka dari zip), jadi tidak terlihat kecil.
      '.gd-backdrop,.prize-backdrop{position:fixed!important;top:0!important;left:0!important;'+
      'right:0!important;bottom:0!important;display:flex!important;align-items:center!important;'+
      'justify-content:center!important;padding:8px!important;box-sizing:border-box!important;'+
      'overflow:auto!important;z-index:99999!important}'+
      // Kotak dialog (pengaturan, menu, riwayat) tidak boleh bergantung pada
      // satuan vh WebView: di sebagian HP nilainya kecil sehingga kotaknya
      // mengempis jadi garis dan isinya terpotong. Tingginya dihitung dari
      // isi sebenarnya oleh pasDialog().
      '.gd-box{max-height:none!important;height:auto!important;min-height:120px!important;box-sizing:border-box!important}'+
      '.gd-scroll{max-height:none!important;overflow:visible!important}'+
      '.prize-art{max-width:none!important;max-height:none!important}'+
      // Kartu "PUTARAN GRATIS" (scatter) tidak boleh dibatasi tingginya:
      // ikon scatter menempel di atas kartu, jadi kalau kotaknya digulir
      // judul tertutup ikon dan tombol MULAI ikut terpotong.
      // Ukuran asli tetap dipakai; hanya dikecilkan bila benar-benar
      // tidak muat di layar (lihat pasKartu).
      '.fs-card{max-height:none!important;overflow:visible!important;'+
      'max-width:calc(100vw - 16px)!important}';
    document.head.appendChild(s);
  }catch(e){}
  fix();
  pasKartu();
  pasDialog();
  [200,600,1200,2000,3000,4500,6000].forEach(function(t){setTimeout(function(){fix();pasKartu();pasDialog();},t);});
  // Dialog bisa muncul kapan saja (scatter, big win), jadi setiap kali
  // isi halaman berubah, kartu dipaskan lagi.
  try{
    new MutationObserver(function(){pasKartu();pasDialog();}).observe(document.body,{childList:true,subtree:true});
  }catch(e){}
  var n=0;
  var iv=setInterval(function(){fix();pasDialog();n++;if(n>40){clearInterval(iv);}},500);
  window.addEventListener('resize',function(){fix();pasKartu();pasDialog();});
  window.addEventListener('orientationchange',function(){fix();pasKartu();pasDialog();});
})();"""

/**
 * Game Greedy (cocos2d-js) dari CDN pihak ketiga, dimainkan di dalam aplikasi.
 *
 * Halaman game memuat seluruh asetnya dari domain yang sama, jadi cukup satu
 * alamat. Diuji: index.html 200, aset main/internal 200, dan mesin cocos
 * memakai bundle versi dari settings.df54a.js.
 */
object GreedyFunni {
    const val NAMA = "Greedy"

    /** Halaman game. Versi ikut di jalur, jadi ganti di sini kalau CDN naik versi. */
    const val URL_GAME = "https://games-api-prod.funni.live/greedy/web/index.html"
    /** Alamat kedua kalau yang utama gagal dimuat. */
    const val URL_CADANGAN = "https://cdn-web.funni.live/game/greedy/v17t1790238158/index.html"
}

/**
 * Game HTML5 milik Viza sendiri: Bikini Wild Rush. Berkasnya ikut repo di
 * docs/game/bikini, jadi tidak bergantung layanan pihak lain.
 * Tanpa parameter api, game memakai koin mainan lokal di HP.
 */
object BikiniRush {
    const val NAMA = "Bikini Wild Rush"

    /** true kalau token dompet gagal diambil saat game dibuka. */
    @Volatile
    var dompetGagal: Boolean = false

    /**
     * Berkas game ikut di dalam APK (assets/bikini) dan dibaca lewat appassets,
     * jadi tidak bergantung internet dan tidak ada halaman kosong karena host
     * luar tidak terjangkau.
     */
    /** Disajikan dari VPS sendiri, satu domain dengan dompet, jadi tanpa CORS. */
    const val GAME_VPS = "https://viza.43-156-99-4.sslip.io/game/html5-game/index.html"

    /** Cadangan: berkas yang ikut di dalam APK. */
    const val GAME = "https://appassets.androidplatform.net/assets/html5-game/index.html"

    /** Berkas yang sama dibaca langsung dari folder aset, tanpa lapisan appassets. */
    const val GAME_FILE = "file:///android_asset/html5-game/index.html"

    /** Alamat internet, cadangan terakhir kalau aset di APK bermasalah. */
    const val GAME_CADANGAN = "https://exbottod.github.io/viza-chat-voice-room/game/bikini/index.html"

    /** Dompet Viza di VPS: saldo dan hasil putaran ditentukan server ini. */
    const val DOMPET = "https://viza.43-156-99-4.sslip.io/bikini"

    /**
     * Minta token sesi pendek ke dompet Viza, lalu susun alamat game.
     * Kalau server diam, game tetap dibuka dengan koin mainan lokal supaya
     * tidak ada layar kosong.
     */
    /** Keadaan dompet terakhir, ditampilkan di sudut layar untuk diagnosa. */
    @Volatile
    var statusDompet = "dompet: belum dicoba"

    /** Panggil dompet dan kembalikan "kode badan". */
    private fun panggilDompet(alamat: String, metode: String, bearer: String, isi: String?): String {
        val c = java.net.URL(alamat).openConnection() as java.net.HttpURLConnection
        c.requestMethod = metode
        c.connectTimeout = 5000
        c.readTimeout = 5000
        c.setRequestProperty("Authorization", "Bearer $bearer")
        if (isi != null) {
            c.doOutput = true
            c.setRequestProperty("Content-Type", "application/json")
            c.outputStream.use { it.write(isi.toByteArray()) }
        }
        val kode = c.responseCode
        val badan = (if (kode in 200..299) c.inputStream else c.errorStream)
            ?.bufferedReader()?.use { it.readText() } ?: ""
        return "$kode $badan"
    }

    suspend fun alamat(): List<String> {
        // Dompet Viza wajib tersambung: koin game = koin Viza. Token diminta sampai
        // 3 kali (token login disegarkan di percobaan kedua) sebelum menyerah.
        var hasil: String? = null
        for (percobaan in 1..3) {
            hasil = kotlinx.coroutines.withTimeoutOrNull(7000L) {
                try {
                    val idToken = SesiToken.ambil(paksa = percobaan > 1)
                    if (idToken.isNullOrBlank()) return@withTimeoutOrNull null
                    val token = kotlinx.coroutines.withContext(kotlinx.coroutines.Dispatchers.IO) {
                        val c = java.net.URL("$DOMPET/token").openConnection() as java.net.HttpURLConnection
                        c.requestMethod = "POST"
                        c.connectTimeout = 5000
                        c.readTimeout = 5000
                        c.doOutput = true
                        c.setRequestProperty("Authorization", "Bearer $idToken")
                        c.setRequestProperty("Content-Type", "application/json")
                        c.outputStream.use { it.write("{}".toByteArray()) }
                        if (c.responseCode != 200) return@withContext ""
                        val isi = c.inputStream.bufferedReader().use { it.readText() }
                        org.json.JSONObject(isi).optString("token")
                    }
                    if (token.isBlank()) null else "$GAME?api=$DOMPET/api&token=$token"
                } catch (e: Exception) {
                    null
                }
            }
            if (hasil != null) break
            kotlinx.coroutines.delay(600L * percobaan)
        }
        // Gagal tersambung: game tetap dibuka supaya user tidak tertahan di layar
        // pesan. Tanpa token, game memakai koin 0 dan tidak bisa bertaruh.
        if (hasil == null) {
            dompetGagal = true
            return listOf("$GAME_FILE", "$GAME", "$GAME_VPS", "$GAME_CADANGAN")
        }
        dompetGagal = false
        // Urutan percobaan: berkas di APK, berkas APK tanpa appassets, lalu internet.
        val kueri = hasil?.substringAfter("?", "") ?: ""
        val akhiran = if (kueri.isBlank()) "" else "?$kueri"
        // Tanpa token dompet, berkas APK langsung (file://) dicoba lebih dulu karena
        // paling sederhana. Dengan token, appassets didahulukan supaya alamat game
        // punya asal https dan panggilan dompet tidak ditolak WebView.
        return if (kueri.isBlank()) {
            listOf("$GAME_FILE$akhiran", "$GAME$akhiran", "$GAME_VPS$akhiran", "$GAME_CADANGAN$akhiran")
        } else {
            listOf("$GAME$akhiran", "$GAME_FILE$akhiran", "$GAME_VPS$akhiran", "$GAME_CADANGAN$akhiran")
        }
    }
}

@Composable
fun GreedyFunniScreen(onClose: () -> Unit) {
    GameWebScreen(listOf(GreedyFunni.URL_GAME, GreedyFunni.URL_CADANGAN), onClose)
}

@Composable
fun BikiniRushScreen(onClose: () -> Unit) {
    val ctx = androidx.compose.ui.platform.LocalContext.current
    var daftar by remember { mutableStateOf<List<String>>(emptyList()) }
    androidx.compose.runtime.LaunchedEffect(Unit) {
        daftar = BikiniRush.alamat()
        if (BikiniRush.dompetGagal) {
            android.widget.Toast.makeText(
                ctx,
                "Koin Viza belum tersambung, buka ulang game sebentar lagi",
                android.widget.Toast.LENGTH_LONG,
            ).show()
        }
    }
    if (daftar.isEmpty()) {
        Box(Modifier.fillMaxSize().background(Color.Black), contentAlignment = Alignment.Center) {
            Text("Membuka game...", color = Color.White.copy(alpha = 0.8f), fontSize = 14.sp)
        }
    } else {
        GameWebScreen(daftar, onClose, BikiniRush.statusDompet)
    }
}

@SuppressLint("SetJavaScriptEnabled")
@Composable
private fun GameWebScreen(daftar: List<String>, onClose: () -> Unit, awal: String = "mulai") {
    var web by remember { mutableStateOf<WebView?>(null) }
    var prog by remember { mutableStateOf(0) }
    var galat by remember { mutableStateOf("") }
    var ulang by remember { mutableStateOf(0) }
    // Tahap ditampilkan terus di sudut, supaya kalau layar kosong tetap ketahuan
    // alamat mana yang dipakai dan sampai mana prosesnya.
    var tahap by remember { mutableStateOf(awal) }
    var ke by remember { mutableStateOf(0) }

    BackHandler {
        val w = web
        if (w != null && w.canGoBack()) w.goBack() else onClose()
    }

    Box(Modifier.fillMaxSize().background(Color.Black)) {
        androidx.compose.runtime.key(ulang) {
            AndroidView(
                modifier = Modifier.fillMaxSize(),
                factory = { c ->
                    val pemuatAset = androidx.webkit.WebViewAssetLoader.Builder()
                        .addPathHandler("/assets/", androidx.webkit.WebViewAssetLoader.AssetsPathHandler(c))
                        .build()
                    WebView(c).apply {
                        setBackgroundColor(android.graphics.Color.BLACK)
                        WebView.setWebContentsDebuggingEnabled(true)
                        settings.apply {
                            javaScriptEnabled = true
                            domStorageEnabled = true
                            databaseEnabled = true
                            mediaPlaybackRequiresUserGesture = false
                            useWideViewPort = true
                            loadWithOverviewMode = false
                            setSupportZoom(false)
                            builtInZoomControls = false
                            displayZoomControls = false
                            allowFileAccess = true
                            allowFileAccessFromFileURLs = true
                            allowUniversalAccessFromFileURLs = true
                            allowContentAccess = true
                            mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
                            cacheMode = WebSettings.LOAD_DEFAULT
                        }
                        webViewClient = object : WebViewClient() {
                            override fun shouldInterceptRequest(
                                view: WebView,
                                request: android.webkit.WebResourceRequest,
                            ): android.webkit.WebResourceResponse? = try {
                                pemuatAset.shouldInterceptRequest(request.url)
                            } catch (e: Exception) {
                                null
                            }

                            override fun onPageStarted(view: WebView?, alamat: String?, favicon: Bitmap?) {
                                prog = 0
                                tahap = "memuat " + (alamat ?: "").substringAfter("//").take(38)
                            }

                            override fun onPageFinished(view: WebView?, alamat: String?) {
                                prog = 100
                                tahap = "selesai " + (alamat ?: "").substringAfter("//").take(30)
                                // Sebagian WebView menghitung ukuran halaman 0 saat game dimuat,
                                // lalu tidak pernah menghitung ulang, sehingga meja game 0x0.
                                // Ukuran meja dipaksa langsung dalam piksel, bukan satuan layar.
                                view?.evaluateJavascript(skripUkuran, null)
                                view?.postDelayed({
                                    view.evaluateJavascript(
                                        "(function(){var a=document.getElementById('app');" +
                                            "var g=document.querySelector('.bw-stage');" +
                                            "var c=g?getComputedStyle(g):null;" +
                                            "var u=g?(g.offsetWidth+'x'+g.offsetHeight+' i='+(g.style.width||'-')+' c='+(c.width+'/'+c.height)+' m='+c.maxHeight):'nostage';" +
                                            "return (a?a.innerHTML.length:-1)+'|'+(document.body?document.body.innerText.length:-1)+'|'+u;})()",
                                    ) { hasil ->
                                        val bagian = (hasil ?: "").replace("\"", "").split("|")
                                        val isiApp = bagian.getOrNull(0)?.toIntOrNull() ?: -1
                                        val judul = bagian.getOrNull(2) ?: ""
                                        tahap = "isi " + isiApp + " teks " + (bagian.getOrNull(1) ?: "?") + " " + judul.take(44)
                                        if (isiApp == 0 && galat.isBlank()) {
                                            galat = "Halaman game kosong. Coba lagi atau laporkan ke pengembang."
                                        }
                                    }
                                }, 2500)
                            }

                            override fun onReceivedError(
                                view: WebView?,
                                request: android.webkit.WebResourceRequest?,
                                error: android.webkit.WebResourceError?,
                            ) {
                                if (request?.isForMainFrame != true) return
                                val v = view ?: return
                                val kode = error?.errorCode ?: -1
                                tahap = "gagal " + kode + " pada " + ke
                                if (ke < daftar.lastIndex) {
                                    ke += 1
                                    v.loadUrl(daftar[ke])
                                    return
                                }
                                galat = "Gagal memuat game (kode " + kode + "). Coba lagi."
                            }
                        }
                        webChromeClient = object : WebChromeClient() {
                            override fun onProgressChanged(view: WebView?, newProgress: Int) {
                                prog = newProgress
                            }

                            override fun onConsoleMessage(m: android.webkit.ConsoleMessage?): Boolean {
                                val pesan = m?.message() ?: return false
                                if (m.messageLevel() == android.webkit.ConsoleMessage.MessageLevel.ERROR) {
                                    galat = "Skrip game berhenti: " + pesan.take(160)
                                }
                                return true
                            }
                        }
                        val mulaiTanpaUkuran = width == 0 || height == 0
                        var sudahUkur = false
                        addOnLayoutChangeListener { v, _, _, _, _, _, _, _, _ ->
                            if (sudahUkur || v.width <= 0 || v.height <= 0) return@addOnLayoutChangeListener
                            sudahUkur = true
                            // Kalau halaman dimuat saat ukuran masih 0, muat ulang sekali
                            // supaya game membaca ukuran layar yang benar sejak awal.
                            if (mulaiTanpaUkuran) {
                                val wv = v as WebView
                                wv.postDelayed({
                                    wv.evaluateJavascript(skripUkuran, null)
                                    wv.reload()
                                }, 300)
                            }
                        }
                        loadUrl(daftar.getOrElse(0) { "about:blank" })
                    }
                },
                update = { web = it },
            )
        }

        if (prog in 1..99 && galat.isBlank()) {
            LinearProgressIndicator(
                progress = { prog / 100f },
                modifier = Modifier.fillMaxWidth().height(3.dp).align(Alignment.TopCenter),
                color = Color(0xFFFFC107),
                trackColor = Color(0x33FFFFFF),
            )
        }

        if (galat.isNotBlank()) {
            androidx.compose.foundation.layout.Column(
                Modifier
                    .align(Alignment.Center)
                    .padding(horizontal = 28.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = androidx.compose.foundation.layout.Arrangement.spacedBy(12.dp),
            ) {
                Text(galat, color = Color(0xFFE8E8E8), fontSize = 13.sp)
                Box(
                    Modifier
                        .clip(androidx.compose.foundation.shape.RoundedCornerShape(20.dp))
                        .background(Color(0xFFFFC107))
                        .clickable {
                            galat = ""
                            prog = 0
                            ke = 0
                            ulang++
                        }
                        .padding(horizontal = 22.dp, vertical = 10.dp),
                ) {
                    Text("Coba lagi", color = Color.Black, fontSize = 14.sp)
                }
            }
        }

        // Keterangan tahap: kecil, di kiri bawah, hanya saat memuat atau galat.
        if (prog < 100 || galat.isNotBlank()) Text(
            tahap,
            color = Color(0x99FFFFFF),
            fontSize = 9.sp,
            modifier = Modifier
                .align(Alignment.BottomStart)
                .padding(start = 6.dp, bottom = 4.dp),
        )

        Box(
            Modifier
                .align(Alignment.TopEnd)
                .statusBarsPadding()
                .padding(10.dp)
                .size(34.dp)
                .clip(CircleShape)
                .background(Color(0x66000000))
                .clickable { onClose() },
            contentAlignment = Alignment.Center,
        ) {
            Text("\u2715", color = Color.White, fontSize = 16.sp)
        }
    }
}

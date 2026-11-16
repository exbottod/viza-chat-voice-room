/* Ronde bareng Crazy Fruit.
   Semua HP memakai jam yang sama: siklus 43 detik (nomor ronde = jam server /
   43 detik). Polanya diambil dari server, jadi saat pola keluar semua pemain
   di ronde itu melihat pola yang sama pada detik yang sama, dan daftar
   pemenangnya juga sama. */
(function () {
  "use strict";
  if (window.__cfSyncSiap) return;
  window.__cfSyncSiap = true;

  var PANJANG = 43000;
  var pola = {}; // nomor ronde -> { cell, rtp }
  var diambil = 0;

  function dasarApi() {
    try {
      var q = new URLSearchParams(window.location.search);
      var a = q.get("api");
      if (a) return String(a).replace(/\/+$/, "");
      if (window.__VIZA_API__) return String(window.__VIZA_API__).replace(/\/+$/, "");
    } catch (e) {}
    return "https://viza.43-156-99-4.sslip.io";
  }

  function token() {
    try {
      var q = new URLSearchParams(window.location.search);
      return q.get("token") || q.get("t") || "";
    } catch (e) {
      return "";
    }
  }

  /* Satu siklus game = taruhan 30 + hitung 5 + hasil 5 + jeda 3 = 43 detik.
     Semua HP memakai siklus yang sama dari jam server, jadi fase dan pola
     serempak. Nomor ronde = jam / 43 detik. */
  var FASE = { bets: 30, calc: 5, result: 5, next: 3 };
  var SIKLUS = FASE.bets + FASE.calc + FASE.result + FASE.next;
  PANJANG = SIKLUS * 1000;

  window.__cfRondeSekarang = function () {
    return Math.floor(Date.now() / PANJANG);
  };

  /* Detik yang sudah lewat di siklus ini (0..42). */
  function posisi() {
    return Math.floor((Date.now() % PANJANG) / 1000);
  }

  /* Sisa detik sampai ronde berganti. */
  window.__cfSisaDetik = function () {
    return Math.max(0, SIKLUS - posisi());
  };

  /* Hitung mundur tiap fase dari jam bersama. Fase taruhan = 30 detik pertama
     siklus. Fase lain tetap berjalan normal, game sendiri yang lanjut ke fase
     berikutnya saat angkanya habis. */
  window.__cfLangkah = function (fase, nilai) {
    if (fase !== "bets") return nilai - 1;
    var sisa = FASE.bets - posisi();
    // Bukan di jendela taruhan: sudah lewat 30 detik di siklus ini, habiskan
    // fase taruhan supaya game lanjut ke putaran, bukan mengulang dari awal.
    if (sisa < 0) return 0;
    return sisa;
  };

  /* Pola ronde sekarang. Kalau belum sempat diambil, kembalikan null supaya
     game memakai pola bawaannya sendiri. */
  window.__cfPolaRonde = function () {
    var n = window.__cfRondeSekarang();
    var p = pola[n];
    if (!p) {
      muat(n);
      return null;
    }
    return p.cell;
  };

  function simpan(list, panjang) {
    if (!Array.isArray(list)) return;
    // panjang siklus dikunci di klien (43 detik), tidak ditimpa dari server
    for (var i = 0; i < list.length; i++) {
      var x = list[i];
      if (!x || !x.cell) continue;
      pola[Number(x.ronde)] = { cell: String(x.cell), rtp: Number(x.rtp || 0) };
    }
    // buang yang sudah lewat, cukup simpan beberapa ronde terakhir
    var kini = window.__cfRondeSekarang();
    for (var k in pola) {
      if (Number(k) < kini - 3) delete pola[k];
    }
  }

  var sibuk = false;
  function muat() {
    if (sibuk) return;
    var n = window.__cfRondeSekarang();
    if (pola[n] && pola[n + 1]) return;
    if (diambil && Date.now() - diambil < 1200) return;
    sibuk = true;
    diambil = Date.now();
    var alamat = dasarApi() + "/wave/game/cfPola?ronde=" + n + "&token=" + encodeURIComponent(token());
    fetch(alamat)
      .then(function (r) {
        return r.json();
      })
      .then(function (j) {
        var d = j && j.data;
        if (d && Array.isArray(d.list)) simpan(d.list, Number(d.panjang || 0));
      })
      .catch(function () {})
      .then(function () {
        sibuk = false;
      });
  }

  muat();
  setInterval(muat, 1500);
})();

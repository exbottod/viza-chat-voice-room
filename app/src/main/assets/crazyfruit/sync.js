/* Ronde bareng Crazy Fruit.
   Semua HP memakai jam yang sama: ronde 30 detik (nomor ronde = jam server /
   30 detik). Polanya diambil dari server, jadi saat pola keluar semua pemain
   di ronde itu melihat pola yang sama pada detik yang sama, dan daftar
   pemenangnya juga sama. */
(function () {
  "use strict";
  if (window.__cfSyncSiap) return;
  window.__cfSyncSiap = true;

  var PANJANG = 30000;
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

  window.__cfRondeSekarang = function () {
    return Math.floor(Date.now() / PANJANG);
  };

  /** Sisa detik sampai ronde berganti, dihitung dari jam (bukan dari HP). */
  window.__cfSisaDetik = function () {
    var sisa = PANJANG - (Date.now() % PANJANG);
    return Math.max(0, Math.ceil(sisa / 1000));
  };

  /* Hitung mundur fase taruhan memakai jam bersama supaya pola keluar bareng. */
  window.__cfLangkah = function (fase, nilai) {
    if (fase !== "bets") return nilai - 1;
    return window.__cfSisaDetik();
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
    if (panjang > 0) PANJANG = panjang;
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

/* Ronde bareng Crazy Fruit, jam real-time dari server.
   Alur game tetap seperti aslinya: taruhan 30 detik, putar, hasil, dialog 3
   detik, lalu ulang. Bedanya, awal fase taruhan dikunci ke jam bersama supaya
   semua HP melihat detik yang sama dan pola yang sama di ronde yang sama.

   Satu siklus = taruhan 30 + putar 5 + hasil 5 + jeda 3 = 43 detik.
   Karena jumlahnya pas 43, fase taruhan yang mulai di detik 0 siklus akan
   selesai di detik 30, hasil selesai di detik 40, dan dialog 3 detik menghabiskan
   sisa siklus, jadi putaran berikutnya kembali mulai di detik 0 (tampil 30 lagi). */
(function () {
  "use strict";
  if (window.__cfSyncSiap) return;
  window.__cfSyncSiap = true;

  var FASE = { bets: 30, calc: 5, result: 5, next: 3 };
  var SIKLUS = FASE.bets + FASE.calc + FASE.result + FASE.next; // 43 detik
  var PANJANG = SIKLUS * 1000;
  var pola = {};
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

  /** Nomor ronde bersama: jam / 43 detik. */
  window.__cfRondeSekarang = function () {
    return Math.floor(Date.now() / PANJANG);
  };

  /** Detik yang sudah lewat di siklus ini, 0..42. */
  function posisi() {
    return Math.floor((Date.now() % PANJANG) / 1000);
  }

  /** Sisa detik sampai ronde berganti (dipakai untuk tampilan/informasi). */
  window.__cfSisaDetik = function () {
    return Math.max(0, SIKLUS - posisi());
  };

  /* Hitung mundur fase taruhan mengikuti jam bersama:
     - di 30 detik pertama siklus, angkanya turun 30..1 lalu 0 (mulai putar)
     - kalau game dibuka di tengah fase putar/hasil, fase taruhan langsung
       dihabiskan (0) supaya tidak mengulang dari awal, lalu siklus berikutnya
       kembali mulai rapi dari 30 detik.
     Fase lain (putar, hasil, jeda) tetap pakai hitungan bawaan game. */
  window.__cfLangkah = function (fase, nilai) {
    if (fase !== "bets") return nilai - 1;
    var pos = posisi();
    if (pos >= FASE.bets) return 0;
    var sisa = FASE.bets - pos;
    if (sisa > FASE.bets) sisa = FASE.bets;
    return sisa;
  };

  /* Pola ronde sekarang, diambil dari server supaya semua HP dapat pola sama. */
  window.__cfPolaRonde = function () {
    var n = window.__cfRondeSekarang();
    var p = pola[n];
    if (!p) {
      muat();
      return null;
    }
    return p.cell;
  };

  function simpan(list) {
    if (!Array.isArray(list)) return;
    for (var i = 0; i < list.length; i++) {
      var x = list[i];
      if (!x || !x.cell) continue;
      pola[Number(x.ronde)] = { cell: String(x.cell), rtp: Number(x.rtp || 0) };
    }
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
    if (diambil && Date.now() - diambil < 900) return;
    sibuk = true;
    diambil = Date.now();
    var alamat = dasarApi() + "/wave/game/cfPola?ronde=" + n + "&token=" + encodeURIComponent(token());
    fetch(alamat)
      .then(function (r) {
        return r.json();
      })
      .then(function (j) {
        var d = j && j.data;
        if (d && Array.isArray(d.list)) simpan(d.list);
      })
      .catch(function () {})
      .then(function () {
        sibuk = false;
      });
  }

  muat();
  setInterval(muat, 1200);
})();

/* Dialog hasil Crazy Fruit.
   1. Dialog kemenangan menutup sendiri setelah 3 detik (tombol OK tetap bisa ditekan).
   2. Di dalam dialog ada TOP 1/2/3 pemenang HARI INI yang diperbarui tiap 2 detik,
      jadi saat main bareng tetap kelihatan siapa yang paling banyak menang.
   Data peringkat dari dompet (/wave/game/cfRank?hari=1), bukan dari HP pemain. */
(function () {
  "use strict";
  if (window.__cfDialogSiap) return;
  window.__cfDialogSiap = true;

  var DETIK = 3;
  var LABEL = "Kemenangan";
  var aktif = null; // { node, jamRangking, jamHitung }

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

  function angka(n) {
    var v = Number(n) || 0;
    var tulis = function (x, satuan) {
      var s = x.toFixed(2).replace(".", ",").replace(/,00$/, "").replace(/(,\d)0$/, "$1");
      return s + " " + satuan;
    };
    if (v >= 1000000000) return tulis(v / 1000000000, "M");
    if (v >= 1000000) return tulis(v / 1000000, "jt");
    return String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function aman(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function dialog() {
    var semua = document.querySelectorAll('[role="dialog"]');
    for (var i = 0; i < semua.length; i++) {
      if (semua[i].getAttribute("aria-label") === LABEL) return semua[i];
    }
    return null;
  }

  function tombolOk(d) {
    if (!d) return null;
    var b = d.querySelectorAll("button");
    for (var i = 0; i < b.length; i++) {
      var t = (b[i].textContent || "").replace(/[^A-Za-z]/g, "").toUpperCase();
      if (t.indexOf("OK") === 0) return b[i];
    }
    return null;
  }

  /* ---------- kotak top 3 ---------- */
  function buatKotak() {
    var el = document.createElement("div");
    el.id = "cf-top3";
    el.setAttribute(
      "style",
      [
        "margin-top:.7rem",
        "border-radius:1rem",
        "border:1px solid rgba(255,215,94,.4)",
        "background:rgba(8,14,32,.72)",
        "padding:.55rem .6rem .5rem",
        "text-align:left",
        "font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif",
      ].join(";"),
    );
    el.innerHTML =
      '<div style="display:flex;align-items:center;gap:.4rem;margin-bottom:.35rem">' +
      '<span style="font-size:.66rem;font-weight:800;letter-spacing:.6px;color:#ffd75e">TOP 3 MENANG HARI INI</span>' +
      '<span style="font-size:.6rem;color:#7fd1a0">live</span>' +
      "</div>" +
      '<div id="cf-top3-isi"><div style="font-size:.68rem;color:#8fa3cc;padding:.25rem 0">Memuat peringkat…</div></div>';
    return el;
  }

  function baris(no, item) {
    var medali = ["#ffd75e", "#d7dee9", "#c98a4b"];
    var foto = item.photo
      ? '<img src="' +
        aman(item.photo) +
        '" alt="" referrerpolicy="no-referrer" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" onerror="this.style.display=\'none\'">'
      : "";
    var nama = String(item.name || "Player");
    return (
      '<div style="display:flex;align-items:center;gap:.45rem;padding:.22rem 0">' +
      '<span style="width:1.15rem;height:1.15rem;border-radius:999px;background:' +
      medali[no - 1] +
      ';color:#0b1020;font-size:.62rem;font-weight:900;display:flex;align-items:center;justify-content:center">' +
      no +
      "</span>" +
      '<span style="position:relative;width:1.5rem;height:1.5rem;border-radius:999px;overflow:hidden;background:#22345c;color:#9fb4dd;font-size:.6rem;font-weight:700;display:flex;align-items:center;justify-content:center;border:1px solid rgba(212,161,42,.55)">' +
      aman(nama.substr(0, 1).toUpperCase()) +
      foto +
      "</span>" +
      '<span style="flex:1;min-width:0;font-size:.74rem;font-weight:700;color:#e7eefc;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' +
      aman(nama) +
      "</span>" +
      '<span style="font-size:.76rem;font-weight:900;color:#ffd75e;font-variant-numeric:tabular-nums">' +
      angka(item.win) +
      "</span>" +
      "</div>"
    );
  }

  function tampil(daftar) {
    var isi = document.getElementById("cf-top3-isi");
    if (!isi) return;
    if (!daftar || !daftar.length) {
      isi.innerHTML =
        '<div style="font-size:.68rem;color:#8fa3cc;padding:.2rem 0">Belum ada pemenang hari ini.</div>';
      return;
    }
    var html = "";
    for (var i = 0; i < daftar.length && i < 3; i++) html += baris(i + 1, daftar[i]);
    isi.innerHTML = html;
  }

  function muatPeringkat() {
    var alamat = dasarApi() + "/wave/game/cfRank?hari=1&limit=3&token=" + encodeURIComponent(token());
    var ctl = typeof AbortController === "function" ? new AbortController() : null;
    var batas = setTimeout(function () {
      try {
        if (ctl) ctl.abort();
      } catch (e) {}
    }, 8000);
    fetch(alamat, ctl ? { signal: ctl.signal } : {})
      .then(function (r) {
        clearTimeout(batas);
        return r.json();
      })
      .then(function (j) {
        var d = j && (j.data || j.w || j);
        if (Array.isArray(d)) tampil(d);
        else if (d && Array.isArray(d.list)) tampil(d.list);
        else tampil([]);
      })
      .catch(function () {
        var isi = document.getElementById("cf-top3-isi");
        if (isi) {
          isi.innerHTML =
            '<div style="font-size:.68rem;color:#ff9aa8;padding:.2rem 0">Peringkat belum bisa dimuat.</div>';
        }
      });
  }

  /* ---------- tempel ke dialog + hitung mundur ---------- */
  function buka(d) {
    var el = buatKotak();
    var ok = tombolOk(d);
    if (ok && ok.parentNode) ok.parentNode.insertBefore(el, ok);
    else if (d.firstElementChild) d.firstElementChild.appendChild(el);
    else d.appendChild(el);
    muatPeringkat();
    var jamRangking = setInterval(function () {
      if (!d.isConnected) return;
      muatPeringkat();
    }, 2000);
    var sisa = DETIK;
    var pegang = ok; // tombol ditahan, teksnya berubah jadi "OK · 2s" dan seterusnya
    if (pegang) pegang.textContent = "OK · " + sisa + "s";
    var jamHitung = setInterval(function () {
      if (!d.isConnected) {
        bersih();
        return;
      }
      if (!pegang || !pegang.isConnected) pegang = tombolOk(d);
      sisa -= 1;
      if (sisa > 0) {
        if (pegang) pegang.textContent = "OK · " + sisa + "s";
        return;
      }
      bersih();
      if (pegang) pegang.click();
    }, 1000);
    aktif = { node: d, jamRangking: jamRangking, jamHitung: jamHitung };
  }

  function bersih() {
    if (!aktif) return;
    clearInterval(aktif.jamRangking);
    clearInterval(aktif.jamHitung);
    aktif = null;
  }

  function periksa() {
    var d = dialog();
    if (!d) {
      if (aktif && !aktif.node.isConnected) bersih();
      return;
    }
    if (aktif && aktif.node === d) return;
    bersih();
    buka(d);
  }

  function mulai() {
    try {
      new MutationObserver(periksa).observe(document.documentElement, {
        childList: true,
        subtree: true,
      });
    } catch (e) {}
    periksa();
    setInterval(periksa, 700);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mulai);
  else mulai();
})();

/* Peringkat pemain Crazy Fruit.
   Tombol ikon orang di bar atas game (aria-label "Players") dibuka menjadi daftar
   peringkat: nomor, foto profil, nama, dan total coin kemenangan.
   Datanya dari dompet (/wave/game/cfRank), bukan dari HP pemain. */
(function () {
  "use strict";
  if (window.__cfRankSiap) return;
  window.__cfRankSiap = true;

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

  function buatPanel() {
    var p = document.getElementById("cf-rank");
    if (p) return p;
    p = document.createElement("div");
    p.id = "cf-rank";
    p.setAttribute(
      "style",
      [
        "position:fixed",
        "left:0",
        "top:0",
        "width:" + (window.innerWidth || 360) + "px",
        "height:" + (window.innerHeight || 640) + "px",
        "z-index:2147483000",
        "display:none",
        "align-items:stretch",
        "justify-content:flex-start",
        "background:rgba(4,8,20,.72)",
        "font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif",
      ].join(";"),
    );
    p.innerHTML =
      '<div id="cf-rank-box" style="position:absolute;left:0;top:0;width:100%;height:100%;overflow:hidden;display:flex;flex-direction:column;background:#0d1830;border:0;border-radius:0;box-shadow:none;opacity:0;transition:opacity .16s ease">' +
      '<div style="display:flex;align-items:center;gap:.5rem;padding:calc(.7rem + env(safe-area-inset-top,0px)) .9rem .7rem;border-bottom:1px solid rgba(212,161,42,.35);background:#122040">' +
      '<div style="font-size:.95rem;font-weight:800;color:#ffd75e;letter-spacing:.3px">PERINGKAT PEMENANG</div>' +
      '<div style="font-size:.62rem;color:#8fa3cc;margin-top:2px">Crazy Fruit · total kemenangan</div>' +
      '<div style="flex:1"></div>' +
      '<button id="cf-rank-tutup" aria-label="Close" style="width:2.4rem;height:2.4rem;border-radius:999px;border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.08);color:#fff;font-size:1rem;line-height:1">×</button>' +
      "</div>" +
      '<div id="cf-rank-isi" style="flex:1;min-height:0;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:.45rem .5rem calc(1rem + env(safe-area-inset-bottom,0px));color:#e7eefc"></div>' +
      "</div>";
    (document.documentElement || document.body).appendChild(p);
    p.addEventListener("click", function (e) {
      if (e.target === p || e.target.id === "cf-rank-tutup") tutup();
    });
    return p;
  }

  function tutup() {
    var p = document.getElementById("cf-rank");
    if (!p) return;
    var box = document.getElementById("cf-rank-box");
    if (box) {
      box.style.opacity = "0";
    }
    setTimeout(function () {
      p.style.display = "none";
    }, 180);
  }

  function barisMuat() {
    return (
      '<div style="padding:1.4rem .6rem;text-align:center;color:#8fa3cc;font-size:.8rem">Memuat peringkat…</div>' +
      '<div style="display:flex;gap:.4rem;padding:0 .4rem .6rem">' + skeleton() + "</div>"
    );
  }

  function skeleton() {
    var s = "";
    for (var i = 0; i < 4; i++) {
      s +=
        '<div style="flex:1;height:3.2rem;border-radius:10px;background:rgba(255,255,255,.05)"></div>';
    }
    return s;
  }

  function baris(no, item) {
    var warna = ["#ffd75e", "#d7dee9", "#c98a4b"];
    var lencana = warna[no - 1] || "#2a3a5f";
    var teks = no <= 3 ? "#0b1020" : "#c9d6f0";
    var foto = item.photo
      ? '<img src="' + aman(item.photo) + '" alt="" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display=\'none\';this.parentNode.setAttribute(\'data-kosong\',\'1\')">'
      : "";
    var awal = aman((item.name || "P").substr(0, 1).toUpperCase());
    return (
      '<div style="display:flex;align-items:center;gap:.55rem;padding:.45rem .5rem;margin:.3rem 0;border-radius:12px;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.06)">' +
      '<div style="width:1.5rem;height:1.5rem;border-radius:999px;background:' +
      lencana +
      ";color:" +
      teks +
      ';font-size:.72rem;font-weight:800;display:flex;align-items:center;justify-content:center">' +
      no +
      "</div>" +
      '<div style="position:relative;width:2.1rem;height:2.1rem;border-radius:999px;overflow:hidden;background:#22345c;color:#9fb4dd;font-size:.8rem;font-weight:700;display:flex;align-items:center;justify-content:center;border:1px solid rgba(212,161,42,.5)">' +
      '<span style="position:absolute">' +
      awal +
      "</span>" +
      foto +
      "</div>" +
      '<div style="min-width:0;flex:1">' +
      '<div style="font-size:.8rem;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' +
      aman(item.name || "Player") +
      "</div>" +
      '<div style="font-size:.6rem;color:#8fa3cc">' +
      (Number(item.times) > 0 ? Number(item.times) + "x menang" : "pemenang") +
      "</div>" +
      "</div>" +
      '<div style="text-align:right">' +
      '<div style="font-size:.82rem;font-weight:800;color:#ffd75e;font-variant-numeric:tabular-nums">' +
      angka(item.win) +
      "</div>" +
      '<div style="font-size:.55rem;color:#8fa3cc">coin</div>' +
      "</div>" +
      "</div>"
    );
  }

  function tampil(daftar) {
    var isi = document.getElementById("cf-rank-isi");
    if (!isi) return;
    if (!daftar || !daftar.length) {
      isi.innerHTML =
        '<div style="padding:2rem .8rem;text-align:center;color:#8fa3cc;font-size:.8rem;line-height:1.5">Belum ada pemenang.<br>Menangkan satu ronde untuk masuk peringkat.</div>';
      return;
    }
    var html = "";
    for (var i = 0; i < daftar.length; i++) html += baris(i + 1, daftar[i]);
    isi.innerHTML = html;
  }

  function buka() {
    var p = buatPanel();
    var box = document.getElementById("cf-rank-box");
    var isi = document.getElementById("cf-rank-isi");
    if (isi) isi.innerHTML = barisMuat();
    p.style.width = (window.innerWidth || 360) + "px";
    p.style.height = (window.innerHeight || 640) + "px";
    p.style.display = "flex";
    if (box) {
      box.style.width = "100%";
      box.style.height = "100%";
      box.style.maxHeight = "none";
    }
    requestAnimationFrame(function () {
      if (box) {
        box.style.opacity = "1";
      }
    });
    var tk = token();
    var alamat = dasarApi() + "/wave/game/cfRank?limit=10&token=" + encodeURIComponent(tk);
    var ctl = typeof AbortController === "function" ? new AbortController() : null;
    var batas = setTimeout(function () { try { if (ctl) ctl.abort(); } catch (e) {} }, 10000);
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
        var el = document.getElementById("cf-rank-isi");
        if (el)
          el.innerHTML =
            '<div style="padding:2rem .8rem;text-align:center;color:#ff9aa8;font-size:.8rem">Peringkat gagal dimuat. Coba lagi.</div>';
      });
  }

  // Tangkap klik pada ikon orang (aria-label "Players") sebelum React membuka
  // panel riwayat, lalu tampilkan peringkat.
  function pasang() {
    document.addEventListener(
      "click",
      function (e) {
        var t = e.target;
        while (t && t !== document.body) {
          if (t.tagName === "BUTTON" && t.getAttribute("aria-label") === "Players") {
            e.preventDefault();
            e.stopPropagation();
            if (e.stopImmediatePropagation) e.stopImmediatePropagation();
            buka();
            return;
          }
          t = t.parentNode;
        }
      },
      true,
    );
  }

  function mulai() {
    if (document.body) {
      buatPanel();
      pasang();
    } else {
      setTimeout(mulai, 60);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mulai);
  else mulai();
})();

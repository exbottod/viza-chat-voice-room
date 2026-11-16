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
      '<span style="font-size:.66rem;font-weight:800;letter-spacing:.6px;color:#ffd75e">PEMENANG RONDE INI</span>' +
      '<span id="cf-top3-jam" style="font-size:.6rem;color:#7fd1a0">live</span>' +
      "</div>" +
      '<div id="cf-top3-isi"><div style="font-size:.68rem;color:#8fa3cc;padding:.25rem 0">Memuat peringkat…</div></div>';
    return el;
  }

  /* Kartu pemenang ronde, tampilannya seperti peringkat ronde di Greedy King:
     foto bulat, mahkota untuk juara, nama di bawah, jumlah menang di bawahnya. */
  function kartu(no, item) {
    var medali = ["#ffd75e", "#d7dee9", "#c98a4b"];
    var warna = medali[no - 1] || "#39507d";
    var nama = String(item.name || "Player");
    var foto = item.photo
      ? '<img src="' +
        aman(item.photo) +
        '" alt="" referrerpolicy="no-referrer" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" onerror="this.style.display=\'none\'">'
      : "";
    return (
      '<div style="flex:1 1 0;min-width:0;display:flex;flex-direction:column;align-items:center;gap:.18rem;padding:.1rem 0">' +
      '<span style="position:relative;display:block;width:3.1rem;height:3.1rem">' +
      '<span style="position:absolute;inset:0;border-radius:999px;overflow:hidden;background:#22345c;color:#9fb4dd;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;border:2px solid ' +
      warna +
      '">' +
      aman(nama.substr(0, 1).toUpperCase()) +
      foto +
      "</span>" +
      '<span style="position:absolute;left:-.2rem;bottom:-.15rem;width:1.15rem;height:1.15rem;border-radius:999px;background:' +
      warna +
      ';color:#0b1020;font-size:.62rem;font-weight:900;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 2px rgba(8,14,32,.85)">' +
      (no === 1 ? "\u265B" : no) +
      "</span>" +
      "</span>" +
      '<span style="font-size:.66rem;font-weight:700;color:#e7eefc;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' +
      aman(nama) +
      "</span>" +
      '<span style="font-size:.72rem;font-weight:900;color:#ffd75e;font-variant-numeric:tabular-nums;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' +
      angka(item.win) +
      "</span>" +
      "</div>"
    );
  }

  /* Hanya pemain yang masih ikut ronde sekarang. Baris lama (pemain yang sudah
     berhenti memasang) dibuang supaya tidak nyangkut di papan pemenang. */
  function masihIkut(x) {
    var at = Number(x && x.at) || 0;
    if (!at) return true;
    return Date.now() - at < 60000;
  }

  function tampil(daftar) {
    var isi = document.getElementById("cf-top3-isi");
    if (!isi) return;
    daftar = (daftar || []).filter(masihIkut);
    if (!daftar.length) {
      isi.innerHTML =
        '<div style="font-size:.68rem;color:#8fa3cc;padding:.35rem 0;text-align:center">Belum ada pemenang di ronde ini.</div>';
      return;
    }
    var html =
      '<div style="display:flex;align-items:flex-start;gap:.35rem;padding:.15rem 0 .1rem">';
    for (var i = 0; i < daftar.length && i < 3; i++) html += kartu(i + 1, daftar[i]);
    html += "</div>";
    isi.innerHTML = html;
  }

  function potong(nama, n) {
    var s = String(nama || "Player");
    return s.length > n ? s.substr(0, n - 1) + "…" : s;
  }

  /* Daftar pemain yang sedang bermain (ronde berjalan), dengan foto profil. */
  function tampilLive(daftar, aku) {
    var isi = document.getElementById("cf-live-isi");
    if (!isi) return;
    var lain = (daftar || []).filter(function (x) {
      if (!masihIkut(x)) return false;
      return !(aku && String(x.id) === String(aku.id));
    });
    if (!lain.length) {
      isi.innerHTML = '<div style="font-size:.66rem;color:#8fa3cc">Belum ada pemain lain di ronde ini.</div>';
      return;
    }
    var html = "";
    for (var i = 0; i < lain.length && i < 6; i++) {
      html +=
        '<div style="display:flex;align-items:center;gap:.4rem;padding:.16rem 0">' +
        '<span style="position:relative;width:1.25rem;height:1.25rem;border-radius:999px;overflow:hidden;background:#22345c;color:#9fb4dd;font-size:.55rem;font-weight:700;display:flex;align-items:center;justify-content:center;border:1px solid rgba(127,209,160,.6)">' +
        aman(String(lain[i].name || "P").substr(0, 1).toUpperCase()) +
        (lain[i].photo
          ? '<img src="' + aman(lain[i].photo) + '" alt="" referrerpolicy="no-referrer" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" onerror="this.style.display=\'none\'">'
          : "") +
        "</span>" +
        '<span style="flex:1;min-width:0;font-size:.7rem;color:#dbe6fb;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' +
        aman(potong(lain[i].name, 14)) +
        "</span>" +
        '<span style="font-size:.68rem;font-weight:800;color:#7fd1a0;font-variant-numeric:tabular-nums">' +
        angka(lain[i].win) +
        "</span></div>";
    }
    isi.innerHTML = html;
  }

  /* Isi foto pada baris pemain di dalam dialog (yang tadinya lingkaran kosong). */
  function pasangFotoSendiri(d, foto) {
    if (!d || !foto) return;
    var kandidat = d.querySelectorAll("div,span");
    for (var i = 0; i < kandidat.length; i++) {
      var e = kandidat[i];
      if (e.children.length) continue;
      if ((e.textContent || "").trim().length > 2) continue;
      var w = e.getBoundingClientRect().width;
      if (w < 20 || w > 70) continue;
      var r = 0;
      try {
        r = parseFloat(getComputedStyle(e).borderTopLeftRadius) || 0;
      } catch (err) {}
      if (r < w / 2 - 2) continue;
      if (getComputedStyle(e).backgroundImage && getComputedStyle(e).backgroundImage !== "none") continue;
      e.style.backgroundImage = 'url("' + String(foto).replace(/"/g, "") + '")';
      e.style.backgroundSize = "cover";
      e.style.backgroundPosition = "center";
      e.textContent = "";
      break;
    }
  }

  function muatPeringkat() {
    var alamat = dasarApi() + "/wave/game/cfLive?token=" + encodeURIComponent(token());
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
        var daftar = [];
        var aku = null;
        var menang = [];
        if (Array.isArray(d)) {
          daftar = d;
          menang = d;
        } else if (d) {
          daftar = Array.isArray(d.list) ? d.list : [];
          menang = Array.isArray(d.pemenang) ? d.pemenang : Array.isArray(d.top) ? d.top : [];
          aku = d.aku || null;
        }
        tampil(menang);
        tampilLive(daftar, aku);
        var jam = document.getElementById("cf-top3-jam");
        if (jam) {
          var rn = d && Number(d.ronde);
          if (rn > 0) {
            var tgl = new Date(rn);
            var jj = ("0" + tgl.getHours()).slice(-2) + ":" + ("0" + tgl.getMinutes()).slice(-2);
            jam.textContent = "live · ronde " + jj;
            jam.style.color = "#7fd1a0";
          }
        }
        if (aku) pasangFotoSendiri(aktif && aktif.node, aku.photo);
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
    aktif = { node: d, jamRangking: 0, jamHitung: 0 };
    muatPeringkat();
    // Hasil ronde dikirim ke server tepat saat pola keluar, kadang mendarat
    // beberapa ratus milidetik setelah dialog tampil. Ambil ulang cepat supaya
    // daftar pemenang langsung real time.
    setTimeout(function () {
      if (d.isConnected) muatPeringkat();
    }, 400);
    setTimeout(function () {
      if (d.isConnected) muatPeringkat();
    }, 1200);
    var jamRangking = setInterval(function () {
      if (!d.isConnected) return;
      muatPeringkat();
    }, 1500);
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

  /* ---------- SEDANG MAIN di halaman game ---------- */
  function buatPanelLive() {
    if (document.getElementById("cf-panel-main")) return;
    var el = document.createElement("div");
    el.id = "cf-panel-main";
    el.setAttribute(
      "style",
      [
        "position:fixed",
        "left:.35rem",
        "bottom:3.4rem",
        "width:8.6rem",
        "max-width:46%",
        "z-index:2147482000",
        "pointer-events:none",
        "border-radius:.7rem",
        "border:1px solid rgba(143,163,204,.3)",
        "background:rgba(8,14,32,.78)",
        "padding:.3rem .38rem .34rem",
        "font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif",
      ].join(";"),
    );
    el.innerHTML =
      '<div style="font-size:.55rem;font-weight:800;letter-spacing:.5px;color:#7fd1a0;margin-bottom:.15rem">SEDANG MAIN</div>' +
      '<div id="cf-panel-main-isi"><div style="font-size:.58rem;color:#8fa3cc">Memuat…</div></div>';
    document.body.appendChild(el);
  }

  function isiPanelLive(daftar, aku) {
    var isi = document.getElementById("cf-panel-main-isi");
    if (!isi) return;
    var lain = (daftar || []).filter(function (x) {
      if (!masihIkut(x)) return false;
      return !(aku && String(x.id) === String(aku.id));
    });
    if (!lain.length) {
      isi.innerHTML = '<div style="font-size:.58rem;color:#8fa3cc">Belum ada pemain lain.</div>';
      return;
    }
    var html = "";
    for (var i = 0; i < lain.length && i < 4; i++) {
      html +=
        '<div style="display:flex;align-items:center;gap:.25rem;padding:.1rem 0">' +
        '<span style="position:relative;width:1rem;height:1rem;border-radius:999px;overflow:hidden;flex:0 0 auto;background:#22345c;color:#9fb4dd;font-size:.5rem;font-weight:700;display:flex;align-items:center;justify-content:center;border:1px solid rgba(127,209,160,.6)">' +
        aman(String(lain[i].name || "P").substr(0, 1).toUpperCase()) +
        (lain[i].photo
          ? '<img src="' + aman(lain[i].photo) + '" alt="" referrerpolicy="no-referrer" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" onerror="this.style.display=\'none\'">'
          : "") +
        "</span>" +
        '<span style="flex:1;min-width:0;font-size:.58rem;color:#dbe6fb;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' +
        aman(potong(lain[i].name, 11)) +
        "</span>" +
        '<span style="font-size:.55rem;font-weight:800;color:#7fd1a0;font-variant-numeric:tabular-nums">' +
        angka(lain[i].win) +
        "</span></div>";
    }
    isi.innerHTML = html;
  }

  function muatPanelLive() {
    var alamat = dasarApi() + "/wave/game/cfLive?token=" + encodeURIComponent(token());
    fetch(alamat)
      .then(function (r) {
        return r.json();
      })
      .then(function (j) {
        var d = j && (j.data || j.w || j);
        if (!d || Array.isArray(d)) return;
        isiPanelLive(Array.isArray(d.list) ? d.list : [], d.aku || null);
      })
      .catch(function () {});
  }

  function mulai() {
    buatPanelLive();
    muatPanelLive();
    setInterval(function () {
      if (document.hidden) return;
      muatPanelLive();
    }, 5000);
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

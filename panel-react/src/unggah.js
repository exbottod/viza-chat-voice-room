// Unggah berkas aset (emote, frame, medal, banner) ke server dompet Viza,
// lalu simpan catatannya ke Firestore + Realtime Database lewat akun layanan.
// Semua lewat server supaya aturan tulis Firebase tidak menghalangi panel.
import { auth } from "./firebase.js";

export const DOMPET = "https://viza.43-156-99-4.sslip.io";

const TIPE = {
  png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp",
  gif: "image/gif", svga: "application/octet-stream", mp4: "video/mp4", json: "application/json",
};

export const kunciVip = (id) => String(id).replace(/[.#$\[\]/]/g, "_");

/**
 * Unggah satu berkas lewat XHR, bukan fetch.
 *
 * Kenapa: fetch tidak memberi kabar kemajuan sama sekali, jadi bilangannya
 * berhenti di 1% walau berkas sedang dikirim. XHR memberi persentase sungguhan,
 * bisa dibatalkan, dan diberi batas waktu supaya tidak menggantung selamanya
 * bila server dompet diam.
 */
export function unggahBerkas(berkas, folder, lapor, opsi = {}) {
  const u = auth.currentUser;
  if (!u) return Promise.reject(new Error("Sesi login tidak ada, muat ulang panel"));
  if (berkas.size > 8 * 1024 * 1024) return Promise.reject(new Error("Berkas lebih dari 8 MB, kecilkan dulu"));
  const namaAman = String(berkas.name || "aset").replace(/[^a-zA-Z0-9._-]/g, "_");
  const ext = (namaAman.split(".").pop() || "png").toLowerCase();
  const dasar = folder + "-" + namaAman.replace(/\.[^.]+$/, "");
  const batas = opsi.batasMs || 120000;
  return u.getIdToken().then((t) => new Promise((selesai, gagal) => {
    const alamat = `${DOMPET}/aset-upload?raw=1&t=${encodeURIComponent(t)}&name=${encodeURIComponent(dasar)}&ext=${encodeURIComponent(ext)}`;
    const xhr = new XMLHttpRequest();
    let mulai = Date.now();
    if (opsi.daftarBatal) opsi.daftarBatal(() => { try { xhr.abort(); } catch (e) {} gagal(new Error("Unggahan dibatalkan")); });
    xhr.open("POST", alamat, true);
    xhr.setRequestHeader("Content-Type", berkas.type || TIPE[ext] || "application/octet-stream");
    xhr.timeout = batas;
    xhr.upload.onprogress = (e) => {
      if (!lapor || !e.lengthComputable) return;
      // 1-90% untuk pengiriman berkas, 90-100% saat server menulis dan menjawab.
      lapor(Math.max(1, Math.round((e.loaded / e.total) * 90)));
    };
    xhr.upload.onload = () => lapor && lapor(92);
    xhr.onload = () => {
      let j = {};
      try { j = xhr.responseText ? JSON.parse(xhr.responseText) : {}; } catch (e) { j = {}; }
      if (xhr.status < 200 || xhr.status >= 300 || j.ok === 0) {
        gagal(new Error(j.e || xhr.responseText.slice(0, 160) || "HTTP " + xhr.status));
        return;
      }
      const url = j.url || j.alamat || j.file || "";
      if (!url) { gagal(new Error("Server tidak mengembalikan alamat berkas")); return; }
      lapor && lapor(100);
      selesai(url);
    };
    xhr.onerror = () => gagal(new Error("Tidak bisa menghubungi server dompet. Cek viza-dompet di VPS (systemctl status viza-dompet)."));
    xhr.ontimeout = () => gagal(new Error("Server tidak menjawab dalam " + Math.round(batas / 1000) + " detik. Berkas mungkin terlalu besar atau dompet Viza sedang sibuk."));
    xhr.onabort = () => gagal(new Error("Unggahan dibatalkan"));
    xhr.send(berkas);
  }));
}

/** Tulis satu cabang RTDB lewat akun layanan (vipCfg/..., banners/..., dst). */
export async function tulisRtdbServer(jalur, data) {
  const u = auth.currentUser;
  if (!u) throw new Error("Belum login");
  const t = await u.getIdToken();
  const res = await fetch(DOMPET + "/panel-rtdb", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ t, path: jalur, data }),
  });
  const teks = await res.text();
  let j = {};
  try { j = teks ? JSON.parse(teks) : {}; } catch (e) { j = {}; }
  if (!res.ok || j.ok === 0) throw new Error(j.e || "RTDB " + res.status);
  return j;
}

/** Hapus satu cabang RTDB. */
export const hapusRtdbServer = (jalur) => tulisRtdbServer(jalur, null);

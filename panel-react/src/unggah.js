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

/** Unggah satu berkas. Mengembalikan alamat berkas di server. */
export async function unggahBerkas(berkas, folder, lapor) {
  const u = auth.currentUser;
  if (!u) throw new Error("Sesi login tidak ada, muat ulang panel");
  if (berkas.size > 8 * 1024 * 1024) throw new Error("Berkas lebih dari 8 MB, kecilkan dulu");
  const namaAman = String(berkas.name || "aset").replace(/[^a-zA-Z0-9._-]/g, "_");
  const ext = (namaAman.split(".").pop() || "png").toLowerCase();
  const dasar = folder + "-" + namaAman.replace(/\.[^.]+$/, "");
  const t = await u.getIdToken();
  const alamat = `${DOMPET}/aset-upload?raw=1&t=${encodeURIComponent(t)}&name=${encodeURIComponent(dasar)}&ext=${encodeURIComponent(ext)}`;
  if (lapor) lapor(1);
  const res = await fetch(alamat, {
    method: "POST",
    headers: { "Content-Type": berkas.type || TIPE[ext] || "application/octet-stream" },
    body: berkas,
  });
  const teks = await res.text();
  let j = {};
  try { j = teks ? JSON.parse(teks) : {}; } catch (e) { j = {}; }
  if (lapor) lapor(100);
  if (!res.ok || j.ok === 0) throw new Error(j.e || teks.slice(0, 140) || "HTTP " + res.status);
  const url = j.url || j.alamat || j.file || "";
  if (!url) throw new Error("Server tidak mengembalikan alamat berkas");
  return url;
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

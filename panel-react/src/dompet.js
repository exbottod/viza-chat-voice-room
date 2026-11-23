// Jalur admin dompet di VPS: dipakai untuk aksi yang tidak boleh ditulis
// langsung oleh akun staf panel (semat room, tag official, dan sejenisnya).
import { auth } from "./firebase.js";

const ALAMAT = "https://viza.43-156-99-4.sslip.io/admin";
const KUNCI = "sb_publishable_4PxD2LedOsBgIJyHLkM47A_bImSQI2W";
const TANPA_UID = ["coin_all", "reset_all", "reset_gem_all", "reset_all_assets", "delete_users",
  "manual_pending", "manual_all", "pay_get", "pay_set", "cfg_get", "cfg_set"];

/**
 * Pembungkus walletAdmin yang mengulang otomatis bila sambungan terputus
 * (server dompet sedang tersendat atau baru restart). Galat dari server sendiri
 * (mis. "Pengajuan sudah diproses") tidak diulang. Aman dipakai untuk aksi yang
 * dijaga di sisi server (manual_decide mengunci baris, jadi tidak menambah coin dua kali).
 */
export async function walletAdminUlang(p, batasMs = 15000, percobaan = 3) {
  let galat;
  for (let i = 0; i < percobaan; i++) {
    try { return await walletAdmin(p, batasMs); }
    catch (e) {
      galat = e;
      const msg = String(e?.message || e);
      const putus = msg.includes("Tidak bisa menghubungi") || msg.includes("tidak menjawab")
        || msg.includes("Server sedang sibuk") || msg.includes("Failed to fetch");
      if (!putus || i === percobaan - 1) break;
      await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
    }
  }
  throw galat;
}

export async function walletAdmin(p, batasMs = 15000) {
  const u = auth.currentUser;
  if (!u) throw new Error("Belum login");
  if (TANPA_UID.includes(p.op) && !p.uid) p = { ...p, uid: "-" };
  const t = await u.getIdToken();
  const kendali = new AbortController();
  const jam = setTimeout(() => kendali.abort(), batasMs);
  try {
    const res = await fetch(ALAMAT, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: KUNCI },
      body: JSON.stringify({ a: "admin", t, p }),
      signal: kendali.signal,
    });
    const teks = await res.text();
    if (!res.ok) throw new Error(teks.slice(0, 160) || "HTTP " + res.status);
    return teks ? JSON.parse(teks) : {};
  } catch (e) {
    if (e && e.name === "AbortError") {
      throw new Error("Server dompet tidak menjawab dalam " + Math.round(batasMs / 1000) + " detik. Coba lagi sebentar lagi.");
    }
    if (e instanceof TypeError) {
      throw new Error("Tidak bisa menghubungi server dompet. Cek koneksi atau layanan viza-dompet di VPS.");
    }
    throw e;
  } finally {
    clearTimeout(jam);
  }
}


/**
 * Aksi panel yang tinggal di jalur /panel (bukan /admin), misalnya reset nama
 * dan reset foto profil. Server menulis ke Realtime Database memakai akun
 * layanan, jadi aturan RTDB tidak menghalangi.
 */
export async function panelAksi(a, p = {}, batasMs = 20000) {
  const u = auth.currentUser;
  if (!u) throw new Error("Belum login");
  const t = await u.getIdToken();
  const kendali = new AbortController();
  const jam = setTimeout(() => kendali.abort(), batasMs);
  try {
    const res = await fetch(ALAMAT.replace(/\/admin$/, "/panel"), {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: KUNCI },
      body: JSON.stringify({ a, t, p }),
      signal: kendali.signal,
    });
    const teks = await res.text();
    if (!res.ok) throw new Error(teks.slice(0, 160) || "HTTP " + res.status);
    const out = teks ? JSON.parse(teks) : {};
    if (out && out.ok === 0) throw new Error(out.e || "Gagal");
    return out;
  } catch (e) {
    if (e && e.name === "AbortError") throw new Error("Server tidak menjawab dalam " + Math.round(batasMs / 1000) + " detik");
    if (e instanceof TypeError) throw new Error("Tidak bisa menghubungi server dompet");
    throw e;
  } finally {
    clearTimeout(jam);
  }
}

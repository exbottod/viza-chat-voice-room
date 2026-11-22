// Jalur admin dompet di VPS: dipakai untuk aksi yang tidak boleh ditulis
// langsung oleh akun staf panel (semat room, tag official, dan sejenisnya).
import { auth } from "./firebase.js";

const ALAMAT = "https://viza.43-156-99-4.sslip.io/admin";
const KUNCI = "sb_publishable_4PxD2LedOsBgIJyHLkM47A_bImSQI2W";
const TANPA_UID = ["coin_all", "reset_all", "reset_gem_all", "reset_all_assets", "delete_users",
  "manual_pending", "manual_all", "pay_get", "pay_set"];

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
  } finally {
    clearTimeout(jam);
  }
}

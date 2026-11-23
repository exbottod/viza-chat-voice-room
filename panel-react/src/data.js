// Lapisan data bergaya React: simpanan di memori + penyegaran di latar belakang.
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, limit, query } from "firebase/firestore";
import { db } from "./firebase.js";

const UMUR = 45000;
const simpanan = new Map();

export async function ambilSemuaMentah(nama, batas) {
  const snap = await getDocs(query(collection(db, nama), limit(batas)));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export function ambilSemua(nama, batas = 500) {
  const kunci = nama + "|" + batas;
  const ada = simpanan.get(kunci);
  if (ada?.janji) return ada.janji;
  if (ada && Date.now() - ada.waktu < UMUR) return Promise.resolve(ada.isi);
  const janji = ambilSemuaMentah(nama, batas)
    .then((isi) => {
      simpanan.set(kunci, { isi, waktu: Date.now(), janji: null });
      return isi;
    })
    .catch(() => (ada ? ada.isi : []));
  simpanan.set(kunci, { isi: ada?.isi || [], waktu: ada?.waktu || 0, janji });
  return janji;
}

/** Hook: data langsung tampil dari simpanan, lalu diperbarui tanpa layar kosong. */
export function useKoleksi(nama, batas = 500) {
  const kunci = nama + "|" + batas;
  const [isi, setIsi] = useState(() => simpanan.get(kunci)?.isi || []);
  const [memuat, setMemuat] = useState(!simpanan.get(kunci));
  useEffect(() => {
    let hidup = true;
    setMemuat(!simpanan.get(kunci)?.waktu);
    ambilSemua(nama, batas).then((d) => {
      if (!hidup) return;
      setIsi(d);
      setMemuat(false);
    });
    return () => { hidup = false; };
  }, [nama, batas]);
  return { isi, memuat, segarkan: () => { simpanan.delete(kunci); return ambilSemua(nama, batas); } };
}

export function useDokumen(koleksi, id) {
  const [isi, setIsi] = useState(null);
  useEffect(() => {
    let hidup = true;
    if (!id) return;
    getDoc(doc(db, koleksi, id))
      .then((d) => { if (hidup) setIsi(d.exists() ? d.data() : null); })
      .catch(() => { if (hidup) setIsi(null); });
    return () => { hidup = false; };
  }, [koleksi, id]);
  return isi;
}

/** Paksa nilai dari database menjadi teks. Nilai berbentuk objek/array (sisa
 *  data panel lama) dijadikan kosong supaya tidak membuat React error dan layar
 *  panel jadi hitam. */
export const teks = (v) => (v === null || v === undefined ? "" : typeof v === "string" ? v : typeof v === "number" || typeof v === "boolean" ? String(v) : "");

export const rupiah = (n) => new Intl.NumberFormat("id-ID").format(Number(n) || 0);
export const waktu = (ts) => {
  if (!ts) return "—";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return isNaN(d) ? "—" : d.toLocaleString("id-ID", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
};

/** Catat aksi admin ke koleksi adminLogs (gagal mencatat tidak membatalkan aksi). */
export async function catatLog(aksi, rincian = "") {
  try {
    const { addDoc, serverTimestamp } = await import("firebase/firestore");
    const { auth } = await import("./firebase.js");
    await addDoc(collection(db, "adminLogs"), {
      admin: auth.currentUser?.email || "?",
      aksi, rincian, waktu: serverTimestamp(),
    });
  } catch (e) { /* diabaikan */ }
}

export async function ambilDokumen(nama, id) {
  const d = await getDoc(doc(db, nama, id)).catch(() => null);
  return d?.exists() ? d.data() : null;
}

export async function hapusDokumen(nama, id) {
  const { deleteDoc } = await import("firebase/firestore");
  await deleteDoc(doc(db, nama, id));
}

export async function tulisDokumen(nama, id, isi) {
  const { setDoc } = await import("firebase/firestore");
  await setDoc(doc(db, nama, id), isi);
}

export async function ambilRtdb(jalur) {
  const { getDatabase, ref, get } = await import("firebase/database");
  const { app } = await import("./firebase.js");
  const s = await get(ref(getDatabase(app), jalur));
  return s.exists() ? s.val() : null;
}

/** Mengubah sebagian isian dokumen tanpa menimpa isian lain. */
export async function ubahDokumen(nama, id, isi) {
  const { updateDoc, doc } = await import("firebase/firestore");
  await updateDoc(doc(db, nama, id), isi);
}

/** Menghapus satu cabang Realtime Database (nilai null = hapus). */
export async function hapusRtdb(jalur) {
  const { getDatabase, ref, set } = await import("firebase/database");
  const { app } = await import("./firebase.js");
  await set(ref(getDatabase(app), jalur), null);
}

export async function tulisRtdb(jalur, nilai) {
  const { getDatabase, ref, set } = await import("firebase/database");
  const { app } = await import("./firebase.js");
  await set(ref(getDatabase(app), jalur), nilai);
}

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

export const rupiah = (n) => new Intl.NumberFormat("id-ID").format(Number(n) || 0);
export const waktu = (ts) => {
  if (!ts) return "—";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return isNaN(d) ? "—" : d.toLocaleString("id-ID", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
};

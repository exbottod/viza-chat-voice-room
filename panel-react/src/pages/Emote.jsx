import { useEffect, useState } from "react";
import { ambilSemuaMentah } from "../data.js";
import { Konfirmasi, Kosong, Rangka, toast } from "../ui.jsx";
import { rtdb, db } from "../firebase.js";
import { ref, get, remove } from "firebase/database";
import { collection, deleteDoc, doc, getDocs, limit, query } from "firebase/firestore";
import { catatLog } from "../data.js";
import TambahAset from "./TambahAset.jsx";

const kunciVip = (id) => String(id).replace(/[.#$\[\]/]/g, "_");

/** Gabungkan aset dari Firestore (vipConfig) dan RTDB (vipCfg) per id. */
async function muatEmote() {
  const peta = new Map();
  const simpan = (o, kunci) => {
    const id = String(o.id || kunci || "");
    if (!id) return;
    peta.set(id, { ...(peta.get(id) || {}), ...o, id });
  };
  try { (await ambilSemuaMentah("vipConfig", 400)).forEach((d) => simpan(d, d.id)); } catch (e) { /* cadangan */ }
  try {
    const sn = await get(ref(rtdb, "vipCfg"));
    if (sn.exists()) sn.forEach((c) => simpan(c.val() || {}, c.key));
  } catch (e) { /* tetap pakai Firestore */ }
  return [...peta.values()]
    .filter((d) => String(d.slot || "") === "emote")
    .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0) || String(a.name || "").localeCompare(String(b.name || "")));
}

async function hapusEmote(id) {
  try { await deleteDoc(doc(db, "vipConfig", id)); } catch (e) { /* lanjut */ }
  try {
    const snap = await getDocs(query(collection(db, "vipConfig"), limit(500)));
    for (const d of snap.docs) {
      if (d.id !== id && (d.data() || {}).id !== id) continue;
      await deleteDoc(d.ref).catch(() => {});
    }
  } catch (e) { /* tanpa izin baca */ }
  try {
    const sn = await get(ref(rtdb, "vipCfg"));
    if (sn.exists()) {
      const tugas = [];
      sn.forEach((c) => {
        if (c.key === kunciVip(id) || (c.val() || {}).id === id) tugas.push(remove(ref(rtdb, "vipCfg/" + c.key)));
      });
      await Promise.all(tugas);
    }
  } catch (e) { /* diabaikan */ }
}

export default function Emote() {
  const [daftar, setDaftar] = useState(null);
  const [hapus, setHapus] = useState(null);
  const [sibuk, setSibuk] = useState(false);
  const [tambah, setTambah] = useState(false);

  const muat = () => muatEmote().then(setDaftar).catch(() => setDaftar([]));
  useEffect(() => { muat(); }, []);

  const jalan = async () => {
    setSibuk(true);
    try {
      await hapusEmote(hapus.id);
      await catatLog("Hapus emote", hapus.id);
      toast("Emote dihapus");
      setHapus(null);
      await muat();
    } catch (e) { toast("Gagal menghapus: " + (e.message || ""), true); }
    finally { setSibuk(false); }
  };

  return (
    <>
      <button className="tombolBaru" onClick={() => setTambah(true)}>
        <span className="material-icons" style={{ fontSize: 20 }}>add</span> Tambah emote
      </button>

      {daftar === null ? <Rangka baris={4} />
        : !daftar.length ? <Kosong>Belum ada emote. Tekan "Tambah emote" di kanan atas.</Kosong>
        : (
          <div className="petakReaksi">
            {daftar.map((x) => (
              <div className="kartuReaksi" key={x.id}>
                <img src={x.url || ""} alt={x.name || x.id} loading="lazy" />
                <b>{x.name || x.id}</b>
                <button className="bulatHapus" title="Hapus" onClick={() => setHapus(x)}>
                  <span className="material-icons">delete</span>
                </button>
              </div>
            ))}
          </div>
        )}

      <Konfirmasi
        buka={!!hapus}
        judul={"Hapus " + (hapus?.name || "emote") + "?"}
        pesan="Emote hilang dari bar emote semua room. Tindakan ini tidak bisa dibatalkan."
        tombol="Hapus"
        sibuk={sibuk}
        onYa={jalan}
        onTidak={() => setHapus(null)}
      />
      <TambahAset buka={tambah} slot="emote" judul="Emote" onTutup={() => setTambah(false)} onSelesai={muat} />
    </>
  );
}

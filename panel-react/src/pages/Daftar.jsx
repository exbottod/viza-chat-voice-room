import { useEffect, useState } from "react";
import { walletAdmin } from "../dompet.js";
import { catatLog, waktu } from "../data.js";
import { Konfirmasi, Panel, Rangka, Tabel, toast } from "../ui.jsx";

/**
 * Penampil koleksi Firestore lewat server dompet (op fs_list / fs_del).
 * Dipakai halaman yang isinya daftar: laporan user, customer service, cek in,
 * frame, background, katalog, database, dan log.
 */
export default function Daftar({ judul, ket, koleksi, kolom }) {
  const [nama, setNama] = useState(koleksi);
  const [isi, setIsi] = useState(null);
  const [galat, setGalat] = useState("");
  const [cari, setCari] = useState("");
  const [tanya, setTanya] = useState(null);
  const [sibuk, setSibuk] = useState(false);

  const muat = async (k = nama) => {
    setIsi(null);
    try {
      const out = await walletAdmin({ op: "fs_list", koleksi: k, batas: 300 });
      setIsi(out.items || []);
      setGalat("");
    } catch (e) { setIsi([]); setGalat(e.message || String(e)); }
  };
  useEffect(() => { muat(koleksi); }, [koleksi]);

  const kunci = (x) => Object.keys(x).filter((k) => k !== "id" && typeof x[k] !== "object").slice(0, 6);

  if (isi === null) return <Rangka baris={6} />;

  const semuaKunci = kolom ? kolom.map((k) => k.k) : kunci(isi[0] || {});
  const tersaring = isi.filter((x) => !cari.trim() || JSON.stringify(x).toLowerCase().includes(cari.toLowerCase().trim()));

  return (
    <>
      <Panel judul={judul} sub={ket}
        aksi={<button className="tombolBaru polos" onClick={() => muat()} disabled={sibuk}>Muat ulang</button>}>
        <div className="barisAksiForm">
          <label className="isianForm" style={{ margin: 0, flex: 1 }}>
            <span>Koleksi Firestore</span>
            <input value={nama} onChange={(e) => setNama(e.target.value.trim())} onBlur={() => nama !== koleksi && muat(nama)} placeholder="mis. reports" />
          </label>
          <input className="cari" value={cari} onChange={(e) => setCari(e.target.value)} placeholder="Cari isi…" />
        </div>
        {galat ? <div className="kosong">Belum bisa dimuat: {galat}</div> : null}
        <Tabel
          kolom={[...semuaKunci.map((k) => ({ k, t: k })), { k: "_hapus", t: "" }]}
          baris={tersaring.map((x) => {
            const b = {};
            semuaKunci.forEach((k) => {
              const v = x[k];
              b[k] = k.toLowerCase().includes("at") && typeof v === "number" && v > 1e12 ? waktu(v) : String(v ?? "-").slice(0, 80);
            });
            b._hapus = <a className="tautanPink" onClick={() => setTanya(x)}>Hapus</a>;
            return b;
          })}
          kosong="Tidak ada data di koleksi ini."
        />
      </Panel>

      <Konfirmasi buka={!!tanya} judul="Hapus data?" pesan={"Dokumen " + (tanya?.id || "") + " di koleksi " + nama + " akan dihapus."}
        tombol="Hapus" sibuk={sibuk}
        onYa={async () => {
          setSibuk(true);
          try {
            await walletAdmin({ op: "fs_del", koleksi: nama, id: tanya.id });
            await catatLog("Hapus " + nama, tanya.id);
            toast("Data dihapus");
            setTanya(null);
            await muat();
          } catch (e) { toast("Gagal: " + (e.message || e), true); }
          finally { setSibuk(false); }
        }}
        onTidak={() => setTanya(null)} />
    </>
  );
}

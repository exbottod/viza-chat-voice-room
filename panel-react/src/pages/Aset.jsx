import { useEffect, useState } from "react";
import { walletAdmin } from "../dompet.js";
import { catatLog, rupiah } from "../data.js";
import { kunciVip, hapusRtdbServer } from "../unggah.js";
import { Konfirmasi, Kosong, Panel, Rangka, Tabel, Tag, toast } from "../ui.jsx";
import TambahAset from "./TambahAset.jsx";

const SLOT = [
  ["frame", "Bingkai"], ["badge", "Lencana"], ["medal", "Medali"],
  ["bubble", "Gelembung"], ["entry", "Efek masuk"], ["banner", "Banner"],
];

/** Aset Store (bingkai, lencana, medali, gelembung, efek masuk, banner). */
export default function Aset({ awal = "frame" }) {
  const [slot, setSlot] = useState(awal);
  const [daftar, setDaftar] = useState(null);
  const [tambah, setTambah] = useState(false);
  const [hapus, setHapus] = useState(null);
  const [sibuk, setSibuk] = useState(false);

  const muat = async () => {
    setDaftar(null);
    try {
      const out = await walletAdmin({ op: "fs_list", koleksi: "vipConfig", batas: 400 });
      setDaftar((out.items || []).filter((x) => String(x.slot || "") === slot));
    } catch (e) { setDaftar([]); }
  };
  useEffect(() => { muat(); }, [slot]);

  const jalanHapus = async () => {
    setSibuk(true);
    try {
      await walletAdmin({ op: "fs_del", koleksi: "vipConfig", id: hapus.id });
      await hapusRtdbServer("vipCfg/" + kunciVip(hapus.id)).catch(() => {});
      await catatLog("Hapus aset", hapus.name || hapus.id);
      toast("Aset dihapus");
      setHapus(null);
      await muat();
    } catch (e) { toast("Gagal: " + (e.message || e), true); }
    finally { setSibuk(false); }
  };

  return (
    <>
      <Panel judul="Aset Store" sub="Unggah dan hapus aset langsung di panel ini. Aplikasi membaca daftar ini tanpa build ulang."
        aksi={<button className="tombolBaru" onClick={() => setTambah(true)}>Tambah {SLOT.find((s) => s[0] === slot)?.[1]}</button>}>
        <div className="filter" style={{ marginBottom: 12 }}>
          {SLOT.map(([k, n]) => (
            <div key={k} className={"pil" + (slot === k ? " on" : "")} onClick={() => setSlot(k)}>{n}</div>
          ))}
        </div>
        {daftar === null ? <Rangka baris={5} />
          : !daftar.length ? <Kosong>Belum ada {SLOT.find((s) => s[0] === slot)?.[1].toLowerCase()}. Tekan tombol tambah di kanan atas.</Kosong>
          : (
            <Tabel
              kolom={[{ k: "name", t: "Nama" }, { k: "kind", t: "Jenis" }, { k: "price", t: "Harga" }, { k: "days", t: "Hari" }, { k: "order", t: "Urut" }, { k: "aksi", t: "" }]}
              baris={daftar.map((x) => ({
                name: x.name || x.id, kind: x.kind || "-",
                price: Number(x.price) ? rupiah(x.price) + " coin" : <Tag jenis="aktif">Gratis</Tag>,
                days: Number(x.days) || "∞", order: Number(x.order) || 0,
                aksi: <span style={{ display: "flex", gap: 10 }}>
                  {x.url ? <a className="tautanPink" href={x.url} target="_blank" rel="noopener">Buka</a> : null}
                  <a className="tautanPink" onClick={() => setHapus(x)}>Hapus</a>
                </span>,
              }))}
            />
          )}
      </Panel>

      <TambahAset buka={tambah} slot={slot} judul={SLOT.find((s) => s[0] === slot)?.[1]}
        onTutup={() => setTambah(false)} onSelesai={muat} />

      <Konfirmasi buka={!!hapus} judul="Hapus aset?" pesan={(hapus?.name || hapus?.id || "") + " akan dihapus dari Store dan room."}
        tombol="Hapus" sibuk={sibuk} onYa={jalanHapus} onTidak={() => setHapus(null)} />
    </>
  );
}

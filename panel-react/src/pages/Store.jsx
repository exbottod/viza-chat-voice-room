import { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { rtdb } from "../firebase.js";
import { walletAdmin } from "../dompet.js";
import { ambilSemuaMentah, catatLog, rupiah } from "../data.js";
import { bacaRtdbServer, kunciVip, hapusRtdbServer } from "../unggah.js";
import { Konfirmasi, Kosong, Panel, Rangka, Tabel, Tag, toast } from "../ui.jsx";
import TambahAset from "./TambahAset.jsx";
import { Pratinjau, Thumb } from "../pratinjau.jsx";

// Isi Store Viza: semua jenis item yang dijual di aplikasi.
// Urutan dan nama sama dengan tab Store di aplikasi.
const JENIS = [
  ["frame", "Frame"],
  ["uid", "ID unik"],
  ["entry", "Efek masuk"],
  ["banner", "Banner masuk"],
  ["badge", "Lencana"],
  ["bubble", "Gelembung"],
  ["medal", "Medali"],
];

const teks = (v) => (typeof v === "string" || typeof v === "number" ? v : "");

/**
 * Halaman Store: unggah dan kelola frame, banner masuk, efek masuk,
 * lencana, ID unik, medali, dan gelembung lengkap dengan harga dan pratinjau.
 * Item ditulis ke vipCfg (RTDB) + vipConfig (Firestore) dengan store:true.
 */
export default function Store() {
  const [jenis, setJenis] = useState("frame");
  const [daftar, setDaftar] = useState(null);
  const [tambah, setTambah] = useState(false);
  const [ganti, setGanti] = useState(null);
  const [hapus, setHapus] = useState(null);
  const [sibuk, setSibuk] = useState(false);
  const [lihat, setLihat] = useState(null);
  const [cari, setCari] = useState("");

  const muat = async () => {
    setDaftar(null);
    const peta = new Map();
    const simpan = (o, kunci) => {
      const id = String(o.id || kunci || "");
      if (!id) return;
      peta.set(id, { ...(peta.get(id) || {}), ...o, id });
    };
    try { (await ambilSemuaMentah("vipConfig", 400)).forEach((d) => simpan(d, d.id)); } catch (e) { /* tanpa izin baca */ }
    let dapat = false;
    try {
      const isi = await bacaRtdbServer("vipCfg");
      if (isi && typeof isi === "object") { Object.entries(isi).forEach(([k, v]) => simpan(v || {}, k)); dapat = true; }
    } catch (e) { /* coba cara kedua */ }
    if (!dapat) {
      try {
        const sn = await get(ref(rtdb, "vipCfg"));
        if (sn.exists()) sn.forEach((c) => simpan(c.val() || {}, c.key));
      } catch (e) { /* tetap pakai Firestore */ }
    }
    const semua = [...peta.values()]
      // Aset VIP tier (meta) dikelola di Aset & VIP, banner Party di menu Banner.
      .filter((x) => x.meta !== true && x.banner !== true && !/^vip_\d+_/.test(String(x.id)))
      .map((x) => ({
        ...x,
        id: String(x.id ?? ""),
        name: teks(x.name),
        kind: teks(x.kind),
        slot: typeof x.slot === "string" ? x.slot : "",
        url: typeof x.url === "string" ? x.url : "",
        customId: teks(x.customId),
      }));
    setDaftar(semua
      .filter((x) => x.slot === jenis)
      .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0)
        || String(a.name || "").localeCompare(String(b.name || ""))));
  };
  useEffect(() => { muat(); }, [jenis]);

  const jalanHapus = async () => {
    setSibuk(true);
    try {
      await walletAdmin({ op: "fs_del", koleksi: "vipConfig", id: hapus.id });
      await hapusRtdbServer("vipCfg/" + kunciVip(hapus.id)).catch(() => {});
      await catatLog("Hapus item Store", hapus.name || hapus.id);
      toast("Item dihapus");
      setHapus(null);
      await muat();
    } catch (e) { toast("Gagal: " + (e.message || e), true); }
    finally { setSibuk(false); }
  };

  const nama = JENIS.find((j) => j[0] === jenis)?.[1] || "";
  // Pencarian: cocokkan nama, nomor ID unik, atau ID aset.
  const kata = cari.trim().toLowerCase();
  const daftarTampil = (daftar || []).filter((x) => !kata
    || String(x.name || "").toLowerCase().includes(kata)
    || String(x.customId || "").toLowerCase().includes(kata)
    || String(x.id || "").toLowerCase().includes(kata));
  const unik = jenis === "uid";

  return (
    <>
      <Panel judul="Store" sub="Semua yang dijual di Store aplikasi Viza. Pilih jenis, lalu unggah berkas dan isi harganya. Aplikasi langsung membacanya tanpa build ulang."
        aksi={<button className="tombolBaru" onClick={() => { setGanti(null); setTambah(true); }}>Tambah {nama}</button>}>
        <div className="filter" style={{ marginBottom: 12 }}>
          {JENIS.map(([k, n]) => (
            <div key={k} className={"pil" + (jenis === k ? " on" : "")} onClick={() => setJenis(k)}>{n}</div>
          ))}
        </div>
        <label className="isianForm" style={{ marginBottom: 12 }}><span>Cari {nama.toLowerCase()} (nama atau nomor ID, mis. 1000)</span>
          <input value={cari} onChange={(e) => setCari(e.target.value)} placeholder="ketik nama atau nomor ID" />
        </label>
        {daftar === null ? <Rangka baris={5} />
          : !daftarTampil.length ? <Kosong>{cari.trim() ? "Tidak ada " + nama.toLowerCase() + " yang cocok dengan \"" + cari.trim() + "\"." : "Belum ada " + nama.toLowerCase() + " di Store. Tekan tombol tambah di kanan atas."}</Kosong>
          : (
            <Tabel
              kolom={[
                { kunci: "mini", label: "Pratinjau", sel: (b) => b.mini },
                { kunci: "name", label: "Nama", sel: (b) => b.name },
                ...(unik ? [{ kunci: "nomor", label: "Nomor ID", sel: (b) => b.nomor }] : []),
                { kunci: "price", label: "Harga", sel: (b) => b.price },
                { kunci: "days", label: "Hari", sel: (b) => b.days },
                { kunci: "tampil", label: "Status", sel: (b) => b.tampil },
                { kunci: "order", label: "Urut", sel: (b) => b.order },
                { kunci: "aksi", label: "", sel: (b) => b.aksi },
              ]}
              baris={daftarTampil.map((x) => ({
                __kunci: x.id,
                mini: <Thumb url={x.url} kind={x.kind} poster={x.poster} nama={x.name || x.id} onKlik={() => setLihat({ ...x, nama: x.name || x.id })} />,
                name: x.name || x.id,
                nomor: x.customId || "-",
                price: Number(x.price) ? rupiah(x.price) + " coin" : <Tag jenis="aktif">Gratis</Tag>,
                days: Number(x.days) || "∞",
                tampil: x.store === false ? <Tag jenis="mati">Tidak dijual</Tag> : <Tag jenis="aktif">Dijual</Tag>,
                order: Number(x.order) || 0,
                aksi: <span style={{ display: "flex", gap: 10 }}>
                  {x.url ? <a className="tautanPink" href={x.url} target="_blank" rel="noopener">Buka</a> : null}
                  <a className="tautanPink" onClick={() => { setGanti(x); setTambah(true); }}>Ganti</a>
                  <a className="tautanPink" onClick={() => setHapus(x)}>Hapus</a>
                </span>,
              }))}
            />
          )}
      </Panel>

      <TambahAset buka={tambah} slot={jenis} judul={nama} ganti={ganti}
        onTutup={() => { setTambah(false); setGanti(null); }} onSelesai={muat} />

      <Pratinjau aset={lihat} onTutup={() => setLihat(null)} />

      <Konfirmasi buka={!!hapus} judul="Hapus item?" pesan={(hapus?.name || hapus?.id || "") + " akan dihapus dari Store."}
        tombol="Hapus" sibuk={sibuk} onYa={jalanHapus} onTidak={() => setHapus(null)} />
    </>
  );
}

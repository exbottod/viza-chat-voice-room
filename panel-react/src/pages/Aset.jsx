import { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { rtdb } from "../firebase.js";
import { walletAdmin } from "../dompet.js";
import { ambilSemuaMentah, catatLog, rupiah } from "../data.js";
import { bacaRtdbServer, kunciVip, hapusRtdbServer } from "../unggah.js";
import { Konfirmasi, Kosong, Panel, Rangka, Tabel, Tag, toast } from "../ui.jsx";
import TambahAset from "./TambahAset.jsx";
import { Pratinjau, Thumb } from "../pratinjau.jsx";

// Lencana sengaja tidak ada di sini: tier VIP tidak punya slot lencana.
// Lencana tetap bisa dikirim ke akun lewat menu Kirim ke user.
const SLOT = [
  ["frame", "Bingkai"], ["medal", "Medali"],
  ["cardbg", "Kartu profil"], ["title", "Gelar VIP"],
  ["bubble", "Gelembung"], ["entry", "Efek masuk"], ["banner", "Banner"],
];

/** Aset Store (bingkai, lencana, medali, gelembung, efek masuk, banner). */
export default function Aset({ awal = "frame" }) {
  const [slot, setSlot] = useState(awal);
  const [daftar, setDaftar] = useState(null);
  const [tambah, setTambah] = useState(false);
  const [tambahVip, setTambahVip] = useState(false);
  const [ganti, setGanti] = useState(null);
  const [hapus, setHapus] = useState(null);
  const [sibuk, setSibuk] = useState(false);
  const [lihat, setLihat] = useState(null);

  /**
   * Daftar aset dibaca dari DUA tempat, sama seperti aplikasi:
   * Firestore vipConfig (warisan panel lama) dan RTDB vipCfg (yang dipakai
   * aplikasi sekarang). Dulu halaman ini hanya membaca Firestore, sehingga
   * aset yang diunggah lewat panel baru tampil kosong walau berkasnya ada.
   */
  const muat = async () => {
    setDaftar(null);
    const peta = new Map();
    const simpan = (o, kunci) => {
      const id = String(o.id || kunci || "");
      if (!id) return;
      peta.set(id, { ...(peta.get(id) || {}), ...o, id });
    };
    try { (await ambilSemuaMentah("vipConfig", 400)).forEach((d) => simpan(d, d.id)); } catch (e) { /* tanpa izin baca */ }
    // Katalog aplikasi ada di RTDB. Aturan RTDB menolak bacaan dari browser,
    // jadi dicoba lewat akun layanan server dulu, baru baca langsung.
    let dapatRtdb = false;
    try {
      const isi = await bacaRtdbServer("vipCfg");
      if (isi && typeof isi === "object") {
        Object.entries(isi).forEach(([k, v]) => simpan(v || {}, k));
        dapatRtdb = true;
      }
    } catch (e) { /* coba cara kedua */ }
    if (!dapatRtdb) {
      try {
        const sn = await get(ref(rtdb, "vipCfg"));
        if (sn.exists()) sn.forEach((c) => simpan(c.val() || {}, c.key));
      } catch (e) { /* tetap pakai Firestore */ }
    }
    // Nilai dari database bisa berbentuk apa saja (objek/array dari panel lama).
    // Paksa kolom yang ditampilkan menjadi teks atau angka supaya tidak crash.
    const teks = (v) => (typeof v === "string" || typeof v === "number" ? v : "");
    const semua = [...peta.values()].map((x) => ({
      ...x,
      id: String(x.id ?? ""),
      name: teks(x.name),
      kind: teks(x.kind),
      url: typeof x.url === "string" ? x.url : "",
      slot: typeof x.slot === "string" ? x.slot : "",
    }));
    setDaftar(semua
      .filter((x) => String(x.slot || "") === slot)
      .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0)
        || String(a.name || "").localeCompare(String(b.name || ""))));
  };
  useEffect(() => { muat(); }, [slot]);

  const jalanHapus = async () => {
    setSibuk(true);
    try {
      await walletAdmin({ op: "fs_del", koleksi: "vipConfig", id: hapus.id });
      await hapusRtdbServer("vipCfg/" + kunciVip(hapus.id)).catch(() => {});
      // Anak RTDB lama bisa tersimpan dengan kunci lain (mis. id tanpa awalan),
      // jadi cari juga yang ber-id sama supaya tidak muncul lagi setelah dihapus.
      try {
        const sn = await get(ref(rtdb, "vipCfg"));
        if (sn.exists()) {
          const tugas = [];
          sn.forEach((c) => {
            const v = c.val() || {};
            if (c.key !== kunciVip(hapus.id) && String(v.id || "") !== String(hapus.id)) return;
            tugas.push(hapusRtdbServer("vipCfg/" + c.key));
          });
          await Promise.all(tugas);
        }
      } catch (e) { /* diabaikan */ }
      await catatLog("Hapus aset", hapus.name || hapus.id);
      toast("Aset dihapus");
      setHapus(null);
      await muat();
    } catch (e) { toast("Gagal: " + (e.message || e), true); }
    finally { setSibuk(false); }
  };

  return (
    <>
      <Panel judul="Aset Store" sub="Tambah ke Store untuk aset yang dijual, + Aset VIP untuk aset yang dipakai otomatis oleh tier VIP. Aplikasi membaca daftar ini tanpa build ulang."
        aksi={<span style={{ display: "flex", gap: 8 }}>
          <button className="pil" onClick={() => { setGanti(null); setTambahVip(true); }}>+ Aset VIP</button>
          <button className="tombolBaru" onClick={() => { setGanti(null); setTambah(true); }}>Tambah ke Store</button>
        </span>}>
        <div className="filter" style={{ marginBottom: 12 }}>
          {SLOT.map(([k, n]) => (
            <div key={k} className={"pil" + (slot === k ? " on" : "")} onClick={() => setSlot(k)}>{n}</div>
          ))}
        </div>
        {daftar === null ? <Rangka baris={5} />
          : !daftar.length ? <Kosong>Belum ada {SLOT.find((s) => s[0] === slot)?.[1].toLowerCase()}. Tekan tombol tambah di kanan atas.</Kosong>
          : (
            <Tabel
              kolom={[
                { kunci: "lihat", label: "Pratinjau", sel: (b) => b.lihat },
                { kunci: "name", label: "Nama", sel: (b) => b.name },
                { kunci: "tier", label: "Tier", sel: (b) => b.tier },
                { kunci: "kind", label: "Jenis", sel: (b) => b.kind },
                { kunci: "price", label: "Harga", sel: (b) => b.price },
                { kunci: "days", label: "Hari", sel: (b) => b.days },
                { kunci: "order", label: "Urut", sel: (b) => b.order },
                { kunci: "aksi", label: "", sel: (b) => b.aksi },
              ]}
              baris={daftar.map((x) => ({
                __kunci: x.id,
                lihat: <Thumb url={x.url} kind={x.kind} poster={x.poster} nama={x.name || x.id}
                  onKlik={() => setLihat({ ...x, nama: x.name || x.id })} />,
                name: x.name || x.id, tier: Number(x.n) ? "VIP " + Number(x.n) : "-", kind: x.kind || "-",
                price: Number(x.price) ? rupiah(x.price) + " coin" : <Tag jenis="aktif">Gratis</Tag>,
                days: Number(x.days) || "∞", order: Number(x.order) || 0,
                aksi: <span style={{ display: "flex", gap: 10 }}>
                  {x.url ? <a className="tautanPink" href={x.url} target="_blank" rel="noopener">Buka</a> : null}
                  <a className="tautanPink" onClick={() => { setGanti(x); setTambahVip(Number(x.n) > 0); setTambah(!Number(x.n)); }}>Ganti</a>
                  <a className="tautanPink" onClick={() => setHapus(x)}>Hapus</a>
                </span>,
              }))}
            />
          )}
      </Panel>

      <TambahAset buka={tambah} slot={slot} judul={SLOT.find((s) => s[0] === slot)?.[1]}
        ganti={ganti && !Number(ganti.n) ? ganti : null}
        onTutup={() => { setTambah(false); setGanti(null); }} onSelesai={muat} />

      <TambahAset buka={tambahVip} vip slot={slot} judul={SLOT.find((s) => s[0] === slot)?.[1]}
        ganti={ganti && Number(ganti.n) ? ganti : null}
        onTutup={() => { setTambahVip(false); setGanti(null); }} onSelesai={muat} />

      <Pratinjau aset={lihat} onTutup={() => setLihat(null)} />

      <Konfirmasi buka={!!hapus} judul="Hapus aset?" pesan={(hapus?.name || hapus?.id || "") + " akan dihapus dari Store dan room."}
        tombol="Hapus" sibuk={sibuk} onYa={jalanHapus} onTidak={() => setHapus(null)} />
    </>
  );
}

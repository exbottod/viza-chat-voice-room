import { useEffect, useState } from "react";
import { walletAdmin } from "../dompet.js";
import { catatLog, rupiah } from "../data.js";
import { Konfirmasi, Laci, Panel, Rangka, Tabel, Tag, toast } from "../ui.jsx";

export default function Staf() {
  const [staf, setStaf] = useState(null);
  const [agency, setAgency] = useState([]);
  const [galat, setGalat] = useState("");
  const [form, setForm] = useState(null);
  const [koin, setKoin] = useState(null);
  const [tanya, setTanya] = useState(null);
  const [sibuk, setSibuk] = useState(false);

  const muat = async () => {
    const hasil = await Promise.allSettled([walletAdmin({ op: "panel_list" }), walletAdmin({ op: "agency_list" })]);
    if (hasil[0].status === "fulfilled") { setStaf(hasil[0].value.list || []); setGalat(""); }
    else { setStaf([]); setGalat(hasil[0].reason?.message || String(hasil[0].reason)); }
    setAgency(hasil[1].status === "fulfilled" ? (hasil[1].value.agency || []) : []);
  };
  useEffect(() => { muat(); }, []);

  const simpanAgency = async () => {
    setSibuk(true);
    try {
      await walletAdmin({ op: "agency_save", id: form.id || "", nama: form.nama.trim(), ownerUid: form.owner_uid || form.ownerUid || "", rate: Number(form.rate) || 0, aktif: form.aktif ? 1 : 0 });
      await catatLog("Simpan agensi", form.nama);
      toast("Agensi disimpan");
      setForm(null);
      await muat();
    } catch (e) { toast("Gagal: " + (e.message || e), true); }
    finally { setSibuk(false); }
  };

  const tambahKoin = async (mode) => {
    setSibuk(true);
    try {
      const n = Math.abs(Number(koin.nilai) || 0);
      await walletAdmin({ op: mode === "set" ? "panel_coin_set" : "panel_coin_add", uid: koin.uid, coins: n });
      await catatLog("Coin staf", mode + " " + n + " · " + koin.uid);
      toast("Saldo staf diperbarui");
      setKoin(null);
      await muat();
    } catch (e) { toast("Gagal: " + (e.message || e), true); }
    finally { setSibuk(false); }
  };

  if (staf === null) return <Rangka baris={6} />;

  return (
    <>
      <Panel judul="Staf panel" sub="Akun yang boleh membuka panel ini. Saldo coin dipakai untuk membeli stok frame dan efek.">
        {galat ? <div className="kosong">Belum bisa dimuat: {galat}</div> : null}
        <Tabel
          kolom={[{ k: "uid", t: "UID" }, { k: "role", t: "Peran" }, { k: "coins", t: "Coin" }, { k: "stok", t: "Item" }, { k: "active", t: "Status" }, { k: "aksi", t: "" }]}
          baris={staf.map((x) => ({
            uid: x.uid, role: x.role + (Number(x.manager) ? " · manager" : ""), coins: rupiah(x.coins),
            stok: rupiah(x.stok), active: <Tag jenis={Number(x.active) ? "aktif" : "mati"}>{Number(x.active) ? "Aktif" : "Nonaktif"}</Tag>,
            aksi: (
              <span style={{ display: "flex", gap: 10 }}>
                <a className="tautanPink" onClick={() => setKoin({ uid: x.uid, nilai: "", mode: "add" })}>Coin</a>
                <a className="tautanPink" onClick={() => setTanya(x)}>Cabut</a>
              </span>
            ),
          }))}
          kosong="Belum ada staf terdaftar."
        />
      </Panel>

      <Panel judul="Host & Agency" sub="Agensi mengumpulkan host dan bagi hasil bulanan."
        aksi={<button className="tombolBaru" onClick={() => setForm({ nama: "", ownerUid: "", rate: 10, aktif: 1 })}>Tambah agensi</button>}>
        <Tabel
          kolom={[{ k: "nama", t: "Agensi" }, { k: "kode", t: "Kode" }, { k: "owner_uid", t: "Pemilik" }, { k: "host", t: "Host" }, { k: "rate", t: "Bagi hasil" }, { k: "bulan_ini", t: "Bulan ini" }, { k: "aksi", t: "" }]}
          baris={agency.map((x) => ({
            nama: x.nama, kode: x.kode || "-", owner_uid: x.owner_uid || "-", host: rupiah(x.host),
            rate: Number(x.rate) + "%", bulan_ini: rupiah(x.bulan_ini),
            aksi: <span style={{ display: "flex", gap: 10 }}>
              <a className="tautanPink" onClick={() => setForm({ ...x, aktif: Number(x.aktif) })}>Edit</a>
              <a className="tautanPink" onClick={() => setTanya({ jenis: "agency", ...x })}>Hapus</a>
            </span>,
          }))}
          kosong="Belum ada agensi."
        />
      </Panel>

      <Laci buka={!!form} judul={form?.id ? "Edit agensi" : "Tambah agensi"} onTutup={() => setForm(null)}
        kaki={<button className="tombolBaru" onClick={simpanAgency} disabled={sibuk || !form?.nama?.trim()}>{sibuk ? "Menyimpan…" : "Simpan"}</button>}>
        {form ? (
          <>
            <label className="isianForm"><span>Nama agensi</span><input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} /></label>
            <label className="isianForm"><span>UID pemilik (opsional)</span><input value={form.owner_uid || form.ownerUid || ""} onChange={(e) => setForm({ ...form, owner_uid: e.target.value })} /></label>
            <label className="isianForm"><span>Bagi hasil (%)</span><input value={form.rate} onChange={(e) => setForm({ ...form, rate: e.target.value })} inputMode="numeric" /></label>
            <div className="barisSaklar"><b>Aktif</b>
              <button type="button" className={"saklar" + (form.aktif ? " nyala" : "")} onClick={() => setForm({ ...form, aktif: form.aktif ? 0 : 1 })}><i /></button>
            </div>
          </>
        ) : null}
      </Laci>

      <Laci buka={!!koin} judul="Saldo coin staf" onTutup={() => setKoin(null)}
        kaki={<span style={{ display: "flex", gap: 10 }}>
          <button className="tombolBaru polos" onClick={() => tambahKoin("set")} disabled={sibuk}>Setel</button>
          <button className="tombolBaru" onClick={() => tambahKoin("add")} disabled={sibuk}>Tambah</button>
        </span>}>
        {koin ? (
          <>
            <div className="catatan" style={{ marginTop: 0 }}>UID {koin.uid}. "Tambah" menambah saldo, "Setel" menjadikan jumlah ini saldo akhir.</div>
            <label className="isianForm"><span>Jumlah coin</span><input value={koin.nilai} onChange={(e) => setKoin({ ...koin, nilai: e.target.value })} inputMode="numeric" /></label>
          </>
        ) : null}
      </Laci>

      <Konfirmasi buka={!!tanya}
        judul={tanya?.jenis === "agency" ? "Hapus agensi?" : "Cabut akses panel?"}
        pesan={tanya?.jenis === "agency" ? "Agensi " + (tanya?.nama || "") + " akan dihapus." : "Akun " + (tanya?.uid || "") + " tidak bisa membuka panel lagi."}
        tombol="Lanjut" sibuk={sibuk}
        onYa={async () => {
          setSibuk(true);
          try {
            if (tanya.jenis === "agency") await walletAdmin({ op: "agency_del", id: tanya.id });
            else await walletAdmin({ op: "panel_revoke", uid: tanya.uid });
            await catatLog(tanya.jenis === "agency" ? "Hapus agensi" : "Cabut akses panel", tanya.nama || tanya.uid);
            toast("Selesai");
            setTanya(null);
            await muat();
          } catch (e) { toast("Gagal: " + (e.message || e), true); }
          finally { setSibuk(false); }
        }}
        onTidak={() => setTanya(null)} />
    </>
  );
}

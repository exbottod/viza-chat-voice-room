import { useEffect, useState } from "react";
import { walletAdmin } from "../dompet.js";
import { catatLog, rupiah } from "../data.js";
import { Konfirmasi, Laci, Panel, Pil, Rangka, Tabel, Tag, toast } from "../ui.jsx";

const kosong = { uid: "", store: "", wa: "", link: "", active: 1, stok: "" };

export default function Seller() {
  const [daftar, setDaftar] = useState(null);
  const [galat, setGalat] = useState("");
  const [form, setForm] = useState(null);
  const [stok, setStok] = useState(null);
  const [tanya, setTanya] = useState(null);
  const [sibuk, setSibuk] = useState(false);
  // Seller lama yang ikut tersalin dari database aplikasi lain (mis. Rezo)
  // disembunyikan dari daftar utama. Server menandai tiap seller dengan viza.
  const [semua, setSemua] = useState(false);
  const [bersih, setBersih] = useState(null);

  const muat = async () => {
    try {
      const out = await walletAdmin({ op: "seller_list" });
      setDaftar(out.seller || []);
      setGalat("");
    } catch (e) { setDaftar([]); setGalat(e.message || String(e)); }
  };
  useEffect(() => { muat(); }, []);

  const simpan = async () => {
    setSibuk(true);
    try {
      await walletAdmin({ op: "seller_save", uid: form.uid.trim(), store: form.store.trim(), wa: form.wa.trim(), link: form.link.trim(), active: form.active ? 1 : 0 });
      const n = Number(form.stok) || 0;
      if (n > 0) await walletAdmin({ op: "seller_stock", uid: form.uid.trim(), mode: "add", coins: n });
      await catatLog("Simpan seller", form.store + (n ? " · stok " + n : ""));
      toast("Seller disimpan" + (n ? ", stok ditambahkan" : ""));
      setForm(null);
      await muat();
    } catch (e) { toast("Gagal: " + (e.message || e), true); }
    finally { setSibuk(false); }
  };

  const ubahStok = async (mode) => {
    setSibuk(true);
    try {
      const n = Math.abs(Number(stok.coins) || 0);
      await walletAdmin({ op: "seller_stock", uid: stok.uid, mode, coins: n });
      await catatLog("Stok seller", mode + " " + n + " · " + stok.uid);
      toast("Stok " + (mode === "add" ? "ditambah" : "dikurangi") + " " + rupiah(n) + " coin");
      setStok(null);
      await muat();
    } catch (e) { toast("Gagal: " + (e.message || e), true); }
    finally { setSibuk(false); }
  };

  if (daftar === null) return <Rangka baris={6} />;

  const bukanViza = daftar.filter((x) => Number(x.viza ?? 1) === 0);
  const tampil = semua ? daftar : daftar.filter((x) => Number(x.viza ?? 1) !== 0);

  return (
    <>
      <Panel judul="Coin Seller" sub="Menambah stok memotong saldo coin akun panel Anda. Mengurangi stok mengembalikan coin ke saldo panel."
        aksi={<span style={{ display: "flex", gap: 8 }}>
          {bukanViza.length ? <button className="pil" onClick={() => setBersih(true)}>Bersihkan bukan Viza ({bukanViza.length})</button> : null}
          <button className="tombolBaru" onClick={() => setForm({ ...kosong })}>Tambah seller</button>
        </span>}>
        {galat ? <div className="kosong">Server dompet belum menjawab: {galat}</div> : null}
        <Tabel
          kolom={[{ k: "store", t: "Toko" }, { k: "uid", t: "UID" }, { k: "wa", t: "WhatsApp" }, { k: "coins", t: "Stok" }, { k: "aktif", t: "Status" }, { k: "aksi", t: "" }]}
          baris={tampil.map((x) => ({
            store: (
              <span>
                {x.store || "-"}
                {Number(x.viza ?? 1) === 0 ? <> <Tag jenis="mati">bukan Viza</Tag></> : null}
              </span>
            ), uid: x.uid, wa: x.wa || "-", coins: rupiah(x.coins ?? x.stock ?? 0),
            aktif: <Tag jenis={Number(x.active) ? "aktif" : "mati"}>{Number(x.active) ? "Aktif" : "Nonaktif"}</Tag>,
            aksi: (
              <span style={{ display: "flex", gap: 10 }}>
                <a className="tautanPink" onClick={() => setStok({ uid: x.uid, coins: "", nama: x.store })}>Stok</a>
                <a className="tautanPink" onClick={() => setForm({ ...kosong, ...x, stok: "" })}>Edit</a>
                <a className="tautanPink" onClick={() => setTanya(x)}>Hapus</a>
              </span>
            ),
          }))}
          kosong="Belum ada coin seller."
        />
        {bukanViza.length ? (
          <div className="filter" style={{ padding: "10px 0 0" }}>
            <Pil on={semua} onClick={() => setSemua(!semua)}>
              {semua ? "Sembunyikan seller bukan Viza" : "Tampilkan seller bukan Viza (" + bukanViza.length + ")"}
            </Pil>
          </div>
        ) : null}
      </Panel>

      <Laci buka={!!form} judul={form?.uid ? "Edit seller" : "Tambah seller"} onTutup={() => setForm(null)}
        kaki={<button className="tombolBaru" onClick={simpan} disabled={sibuk || !form?.uid.trim() || !form?.store.trim() || !form?.wa.trim()}>{sibuk ? "Menyimpan…" : "Simpan"}</button>}>
        {form ? (
          <>
            <label className="isianForm"><span>UID akun seller</span><input value={form.uid} onChange={(e) => setForm({ ...form, uid: e.target.value })} placeholder="UID akun, bukan angka" /></label>
            <label className="isianForm"><span>Nama toko</span><input value={form.store} onChange={(e) => setForm({ ...form, store: e.target.value })} /></label>
            <label className="isianForm"><span>Nomor WhatsApp</span><input value={form.wa} onChange={(e) => setForm({ ...form, wa: e.target.value })} placeholder="62812…" /></label>
            <label className="isianForm"><span>Link toko (opsional)</span><input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} /></label>
            {!form.uid ? null : (
              <label className="isianForm"><span>Tambah stok coin (kosongkan bila tidak perlu)</span><input value={form.stok} onChange={(e) => setForm({ ...form, stok: e.target.value })} inputMode="numeric" /></label>
            )}
            <div className="barisSaklar"><b>Aktif</b>
              <button type="button" className={"saklar" + (form.active ? " nyala" : "")} onClick={() => setForm({ ...form, active: form.active ? 0 : 1 })}><i /></button>
            </div>
          </>
        ) : null}
      </Laci>

      <Laci buka={!!stok} judul={"Stok " + (stok?.nama || "")} onTutup={() => setStok(null)}
        kaki={<span style={{ display: "flex", gap: 10 }}>
          <button className="tombolBaru polos" onClick={() => ubahStok("sub")} disabled={sibuk}>Kurangi stok</button>
          <button className="tombolBaru" onClick={() => ubahStok("add")} disabled={sibuk}>Tambah stok</button>
        </span>}>
        {stok ? (
          <>
            <div className="catatan" style={{ marginTop: 0 }}>Menambah stok memotong saldo coin akun panel Anda. Mengurangi stok mengembalikan coin ke saldo panel.</div>
            <label className="isianForm"><span>Jumlah coin</span><input value={stok.coins} onChange={(e) => setStok({ ...stok, coins: e.target.value })} inputMode="numeric" placeholder="mis. 100000" /></label>
          </>
        ) : null}
      </Laci>

      <Konfirmasi buka={!!bersih} judul="Bersihkan seller bukan Viza?"
        pesan={"Ada " + bukanViza.length + " seller yang UID-nya tidak punya dompet di database Viza, biasanya salinan dari aplikasi lain (Rezo). Semuanya dihapus dari daftar ini, seller Viza tidak disentuh."}
        tombol="Bersihkan" sibuk={sibuk}
        onYa={async () => {
          setSibuk(true);
          try {
            const out = await walletAdmin({ op: "seller_bersih" });
            await catatLog("Bersihkan seller bukan Viza", String(out.hapus || 0) + " seller");
            toast((out.hapus || 0) + " seller bukan Viza dihapus");
            setBersih(null); setSemua(false);
            await muat();
          } catch (e) { toast("Gagal: " + (e.message || e), true); }
          finally { setSibuk(false); }
        }}
        onTidak={() => setBersih(null)} />

      <Konfirmasi buka={!!tanya} judul="Hapus seller?" pesan={"Seller " + (tanya?.store || "") + " tidak akan tampil lagi di aplikasi."}
        tombol="Hapus" sibuk={sibuk}
        onYa={async () => {
          setSibuk(true);
          try {
            await walletAdmin({ op: "seller_del", uid: tanya.uid });
            await catatLog("Hapus seller", tanya.store || tanya.uid);
            toast("Seller dihapus");
            setTanya(null);
            await muat();
          } catch (e) { toast("Gagal: " + (e.message || e), true); }
          finally { setSibuk(false); }
        }}
        onTidak={() => setTanya(null)} />
    </>
  );
}

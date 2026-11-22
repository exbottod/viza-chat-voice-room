import { useEffect, useState } from "react";
import { walletAdmin } from "../dompet.js";
import { catatLog, rupiah, waktu } from "../data.js";
import { Konfirmasi, Panel, Rangka, Tabel, Tag, toast } from "../ui.jsx";

export default function Wallet() {
  const [paket, setPaket] = useState(null);
  const [bayar, setBayar] = useState(null);
  const [manual, setManual] = useState([]);
  const [sibuk, setSibuk] = useState(false);
  const [tanya, setTanya] = useState(null);

  const muat = async () => {
    const hasil = await Promise.allSettled([
      walletAdmin({ op: "paket_get" }),
      walletAdmin({ op: "pay_get" }),
      walletAdmin({ op: "manual_pending" }),
    ]);
    setPaket(hasil[0].status === "fulfilled" ? (hasil[0].value.paket || []).map((x) => ({ ...x, aktif: Number(x.aktif) })) : []);
    setBayar(hasil[1].status === "fulfilled" ? { ...(hasil[1].value.pay || {}) } : { dana: "", name: "", gopay: "", qris: "" });
    setManual(hasil[2].status === "fulfilled" ? (hasil[2].value.list || []) : []);
  };
  useEffect(() => { muat(); }, []);

  const ubahPaket = (i, k, v) => setPaket(paket.map((x, n) => (n === i ? { ...x, [k]: k === "aktif" ? (v ? 1 : 0) : Number(v) || 0 } : x)));

  const simpanPaket = async () => {
    setSibuk(true);
    try {
      await walletAdmin({ op: "paket_set", paket: paket.filter((x) => Number(x.coins) > 0).map((x) => ({ coins: Number(x.coins), harga: Number(x.harga), aktif: Number(x.aktif) })) });
      await catatLog("Ubah paket coin", paket.map((x) => x.coins + "=" + x.harga).join(" | ").slice(0, 180));
      toast("Paket coin disimpan");
      await muat();
    } catch (e) { toast("Gagal: " + (e.message || e), true); }
    finally { setSibuk(false); }
  };

  const simpanBayar = async () => {
    setSibuk(true);
    try {
      await walletAdmin({ op: "pay_set", ...bayar });
      await catatLog("Ubah tujuan top-up", bayar.dana + " / " + bayar.gopay);
      toast("Tujuan top-up disimpan");
      await muat();
    } catch (e) { toast("Gagal: " + (e.message || e), true); }
    finally { setSibuk(false); }
  };

  const putuskan = async (id, ok) => {
    setSibuk(true);
    try {
      await walletAdmin({ op: "manual_decide", id, ok });
      await catatLog(ok ? "Setujui top-up manual" : "Tolak top-up manual", id);
      toast(ok ? "Top-up disetujui" : "Top-up ditolak");
      await muat();
    } catch (e) { toast("Gagal: " + (e.message || e), true); }
    finally { setSibuk(false); setTanya(null); }
  };

  if (paket === null || bayar === null) return <Rangka baris={8} />;

  return (
    <>
      <Panel judul="Paket coin (harga top-up)" sub="Daftar ini yang tampil di halaman top-up aplikasi."
        aksi={<button className="tombolBaru" onClick={simpanPaket} disabled={sibuk}>Simpan paket</button>}>
        <div className="tabelGulir">
          <table className="tabel">
            <thead><tr><th>Coin</th><th>Harga (Rp)</th><th>Rupiah terbaca</th><th>Aktif</th><th /></tr></thead>
            <tbody>
              {paket.map((x, i) => (
                <tr key={i}>
                  <td><input className="isianMini" value={x.coins} inputMode="numeric" onChange={(e) => ubahPaket(i, "coins", e.target.value)} /></td>
                  <td><input className="isianMini" value={x.harga} inputMode="numeric" onChange={(e) => ubahPaket(i, "harga", e.target.value)} /></td>
                  <td>Rp {rupiah(x.harga)}</td>
                  <td><input type="checkbox" checked={!!x.aktif} onChange={(e) => ubahPaket(i, "aktif", e.target.checked)} /></td>
                  <td><a className="tautanPink" onClick={() => setPaket(paket.filter((_, n) => n !== i))}>Hapus</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="barisAksiForm" style={{ marginTop: 12 }}>
          <a className="tautanPink" onClick={() => setPaket([...paket, { coins: 0, harga: 0, aktif: 1 }])}>+ Tambah paket</a>
        </div>
      </Panel>

      <Panel judul="Tujuan top-up manual" sub="Nomor DANA, GoPay, dan QRIS yang ditampilkan ke pembeli."
        aksi={<button className="tombolBaru" onClick={simpanBayar} disabled={sibuk}>Simpan</button>}>
        {[["dana", "Nomor DANA"], ["name", "Nama pemilik"], ["gopay", "Nomor GoPay"], ["qris", "QRIS (link/keterangan)"]].map(([k, label]) => (
          <label className="isianForm" key={k}>
            <span>{label}</span>
            <input value={bayar[k] ?? ""} onChange={(e) => setBayar({ ...bayar, [k]: e.target.value })} />
          </label>
        ))}
      </Panel>

      <Panel judul="Top-up manual menunggu" sub="Setujui setelah dana masuk, coin langsung dikirim ke pembeli.">
        <Tabel
          kolom={[{ k: "uid", t: "UID" }, { k: "coins", t: "Coin" }, { k: "amount", t: "Rupiah" }, { k: "method", t: "Metode" }, { k: "created_at", t: "Waktu" }, { k: "aksi", t: "" }]}
          baris={manual.map((x) => ({
            uid: x.uid, coins: rupiah(x.coins), amount: "Rp " + rupiah(x.amount), method: x.method || "-",
            created_at: waktu(x.created_at),
            aksi: (
              <span style={{ display: "flex", gap: 10 }}>
                <a className="tautanPink" onClick={() => setTanya({ id: x.id, uid: x.uid, ok: true })}>Setujui</a>
                <a className="tautanPink" onClick={() => setTanya({ id: x.id, uid: x.uid, ok: false })}>Tolak</a>
              </span>
            ),
          }))}
          kosong="Tidak ada top-up manual yang menunggu."
        />
      </Panel>

      <Konfirmasi buka={!!tanya} judul={tanya?.ok ? "Setujui top-up?" : "Tolak top-up?"}
        pesan={(tanya?.ok ? "Coin akan dikirim ke " : "Permintaan dari ") + (tanya?.uid || "") + (tanya?.ok ? "." : " akan ditolak.")}
        tombol={tanya?.ok ? "Setujui" : "Tolak"} sibuk={sibuk}
        onYa={() => putuskan(tanya.id, tanya.ok)} onTidak={() => setTanya(null)} />
    </>
  );
}

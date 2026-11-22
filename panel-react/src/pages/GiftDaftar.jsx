import { useEffect, useMemo, useState } from "react";
import { walletAdmin } from "../dompet.js";
import { tulisRtdbServer, unggahBerkas, kunciVip } from "../unggah.js";
import { useKoleksi, rupiah, catatLog } from "../data.js";
import { Konfirmasi, Laci, Rangka, toast } from "../ui.jsx";

/** Gift dari Firestore (lama) digabung dengan RTDB giftCfg (utama). RTDB menang. */
function useGiftGabungan() {
  const fs = useKoleksi("gifts", 400);
  const [rt, setRt] = useState([]);
  const [muatRt, setMuatRt] = useState(true);
  const muatRtdb = async () => {
    try {
      const { ref, get } = await import("firebase/database");
      const { rtdb } = await import("../firebase.js");
      const snap = await get(ref(rtdb, "giftCfg"));
      const arr = [];
      snap.forEach((c) => { const v = c.val(); if (v && v.name) arr.push({ ...v, id: c.key }); });
      setRt(arr);
    } catch (e) { setRt([]); }
    setMuatRt(false);
  };
  useEffect(() => { muatRtdb(); }, []);
  const isi = useMemo(() => {
    const peta = new Map();
    fs.isi.forEach((g) => peta.set(g.id, g));
    rt.forEach((g) => peta.set(g.id, g));
    return [...peta.values()];
  }, [fs.isi, rt]);
  return {
    isi, memuat: fs.memuat && muatRt,
    segarkan: async () => { await Promise.all([fs.segarkan(), muatRtdb()]); },
  };
}

const KOSONG = {
  id: "", nama: "", emoji: "🎁", harga: "100", ikon: "", media: "", tipe: "",
  jenis: "biasa", special: false, rocket: false, cbRate: "0", cbPrice: "0",
  jpRate: "0", jpMult: "0",
};

const jenisDari = (g) => (/svga/i.test(g.mediaType || "") || /\.svga$/i.test(g.mediaUrl || "") ? "SVGA"
  : /mp4|video/i.test(g.mediaType || "") || /\.mp4$/i.test(g.mediaUrl || "") ? "MP4" : "Gambar");

const singkat = (n) => (n >= 1e6 ? (n / 1e6).toFixed(n % 1e6 ? 1 : 0) + "M" : n >= 1e3 ? (n / 1e3).toFixed(n % 1e3 ? 1 : 0) + "k" : String(n));

/**
 * Semua gift dikelompokkan per kategori (Gift biasa, Cashback, Special, Roket),
 * tiap gift tampil sebagai kartu berisi gambar, harga, serta tombol edit dan
 * hapus. Tombol Tambah gift membuka formulir yang sama dengan edit, dan
 * memilih jenis Gift biasa atau Gift cashback.
 */
export default function GiftDaftar() {
  const gifts = useGiftGabungan();
  const [form, setForm] = useState(null);
  const [hapus, setHapus] = useState(null);
  const [sibuk, setSibuk] = useState(false);
  const [progres, setProgres] = useState("");
  const [berkasIkon, setBerkasIkon] = useState(null);
  const [berkasMedia, setBerkasMedia] = useState(null);

  const kelompok = useMemo(() => {
    const k = { Cashback: [], Special: [], Roket: [], "Gift biasa": [] };
    gifts.isi.forEach((g) => {
      const a = {
        id: g.id, nama: g.name || g.id, emoji: g.emoji || "🎁", ikon: g.icon || "",
        harga: Number(g.price || 0), media: g.mediaUrl || "", tipe: g.mediaType || "",
        cashback: !!g.cashback, special: !!g.special, rocket: !!g.rocket,
        cbRate: Number(g.cbRate || 0), cbPrice: Number(g.cbPrice || 0),
        jpRate: Number(g.jpRate || 0), jpMult: Number(g.jpMult || 0), mentah: g,
      };
      const nama = a.cashback ? "Cashback" : a.rocket ? "Roket" : a.special ? "Special" : "Gift biasa";
      k[nama].push(a);
    });
    Object.values(k).forEach((arr) => arr.sort((x, y) => x.harga - y.harga));
    return k;
  }, [gifts.isi]);

  const bukaTambah = () => { setBerkasIkon(null); setBerkasMedia(null); setProgres(""); setForm({ ...KOSONG }); };
  const bukaEdit = (a) => {
    setBerkasIkon(null); setBerkasMedia(null); setProgres("");
    setForm({
      id: a.id, nama: a.nama, emoji: a.emoji, harga: String(a.harga), ikon: a.ikon, media: a.media, tipe: a.tipe,
      jenis: a.cashback ? "cashback" : "biasa", special: a.special, rocket: a.rocket,
      cbRate: String(a.cbRate), cbPrice: String(a.cbPrice), jpRate: String(a.jpRate), jpMult: String(a.jpMult),
    });
  };

  const simpan = async () => {
    const nama = form.nama.trim();
    const harga = Math.max(0, Math.trunc(Number(form.harga) || 0));
    if (!nama) return toast("Nama gift wajib diisi", true);
    if (!harga) return toast("Harga harus lebih dari 0", true);
    setSibuk(true);
    try {
      let ikon = form.ikon.trim();
      let media = form.media.trim();
      let tipe = form.tipe;
      if (berkasIkon) { setProgres("mengunggah ikon…"); ikon = await unggahBerkas(berkasIkon, "gift", (p) => setProgres("ikon " + p + "%")); }
      if (berkasMedia) {
        setProgres("mengunggah animasi…");
        media = await unggahBerkas(berkasMedia, "gift", (p) => setProgres("animasi " + p + "%"));
        const e = (berkasMedia.name.split(".").pop() || "").toLowerCase();
        tipe = e === "svga" ? "svga" : e === "mp4" ? "mp4" : "image";
      }
      const id = form.id || ("g_" + Date.now().toString(36));
      const data = {
        id, name: nama, emoji: form.emoji.trim() || "🎁", icon: ikon, price: harga,
        mediaUrl: media, mediaType: tipe || "",
        cashback: form.jenis === "cashback", special: !!form.special, rocket: !!form.rocket,
        cbRate: Math.max(0, Math.trunc(Number(form.cbRate) || 0)),
        cbPrice: Math.max(0, Math.trunc(Number(form.cbPrice) || 0)),
        jpRate: Math.max(0, Math.trunc(Number(form.jpRate) || 0)),
        jpMult: Math.max(0, Math.trunc(Number(form.jpMult) || 0)),
        updatedAt: Date.now(),
      };
      setProgres("menyimpan…");
      // Aplikasi membaca RTDB giftCfg/{id} lebih dulu (tanpa kuota Firestore),
      // lalu Firestore sebagai cadangan. Dua-duanya diperbarui agar edit langsung terlihat.
      await tulisRtdbServer("giftCfg/" + kunciVip(id), data);
      await walletAdmin({ op: "fs_set", jalur: "gifts/" + id, data }).catch(() => {});
      await catatLog(form.id ? "Edit gift" : "Tambah gift", nama);
      toast(form.id ? "Gift diperbarui" : "Gift ditambahkan");
      setForm(null);
      setProgres("");
      await gifts.segarkan();
    } catch (e) {
      setProgres("");
      toast("Gagal: " + (e.message || e), true);
    } finally { setSibuk(false); }
  };

  const hapusGift = async () => {
    setSibuk(true);
    try {
      await tulisRtdbServer("giftCfg/" + kunciVip(hapus.id), null).catch(() => {});
      await walletAdmin({ op: "fs_del", jalur: "gifts/" + hapus.id }).catch(() => {});
      await catatLog("Hapus gift", hapus.id);
      toast(hapus.nama + " dihapus");
      setHapus(null);
      await gifts.segarkan();
    } catch (e) { toast("Gagal: " + (e.message || e), true); }
    finally { setSibuk(false); }
  };

  const total = gifts.isi.length;

  return (
    <>
      <div className="panel">
        <div className="panelAtas">
          <h3>Gifts <span className="sub">· {rupiah(total)} gift</span></h3>
          <button className="tombolBaru" onClick={bukaTambah}>
            <span className="material-icons" style={{ fontSize: 18, verticalAlign: "middle" }}>add</span> Tambah gift
          </button>
        </div>
        <div className="panelIsi">
          {gifts.memuat && !total ? <Rangka /> : null}
          {!gifts.memuat && !total ? <div className="kosong">Belum ada gift. Tekan Tambah gift.</div> : null}
          {Object.entries(kelompok).filter(([, arr]) => arr.length).map(([nama, arr]) => (
            <div key={nama}>
              <div className="judulKategori">{nama} <span className="sub">· {arr.length}</span></div>
              <div className="kisiGift">
                {arr.map((a) => (
                  <div className="kartuGift" key={a.id}>
                    <div className="gbr">{a.ikon ? <img src={a.ikon} alt="" loading="lazy" /> : a.emoji}</div>
                    <div className="namaGift" title={a.nama}>{a.nama}</div>
                    <div className="hargaGift">Coin: {singkat(a.harga)}</div>
                    <div className="labelGift">
                      <span className="tag">{jenisDari(a.mentah)}</span>
                      {a.cashback ? <span className="tag">cashback</span> : null}
                    </div>
                    <div className="tombolGift">
                      <button className="bulatAksi edit" title="Edit gift" onClick={() => bukaEdit(a)}><span className="material-icons">edit</span></button>
                      <button className="bulatAksi hapus" title="Hapus gift" onClick={() => setHapus(a)}><span className="material-icons">delete</span></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Laci buka={!!form} judul={form?.id ? "Edit gift" : "Tambah gift"} onTutup={() => setForm(null)}
        kaki={<button className="tombolBaru" onClick={simpan} disabled={sibuk}>{sibuk ? (progres || "Menyimpan…") : "Simpan"}</button>}>
        {form ? (
          <>
            <div className="barisSaklar"><b>Jenis gift</b>
              <span style={{ display: "flex", gap: 8 }}>
                <button type="button" className={"pil" + (form.jenis === "biasa" ? " on" : "")} onClick={() => setForm({ ...form, jenis: "biasa" })}>Gift biasa</button>
                <button type="button" className={"pil" + (form.jenis === "cashback" ? " on" : "")} onClick={() => setForm({ ...form, jenis: "cashback" })}>Gift cashback</button>
              </span>
            </div>
            <label className="isianForm"><span>Nama</span>
              <input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} placeholder="mis. Mawar" />
            </label>
            <label className="isianForm"><span>Harga coin</span>
              <input value={form.harga} onChange={(e) => setForm({ ...form, harga: e.target.value })} inputMode="numeric" />
            </label>
            <label className="isianForm"><span>Emoji cadangan</span>
              <input value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })} />
            </label>

            <div className="kotakPratinjau">
              <div className="judulPratinjau">Ikon gift (1:1)</div>
              <div className="isiPratinjau">
                {berkasIkon ? <img src={URL.createObjectURL(berkasIkon)} alt="" /> : form.ikon ? <img src={form.ikon} alt="" /> : <div className="ikonPratinjau"><span style={{ fontSize: 36 }}>{form.emoji}</span></div>}
                <div className="ketPratinjau">
                  <input type="file" accept="image/*" onChange={(e) => setBerkasIkon(e.target.files?.[0] || null)} />
                  <span>Kosongkan bila ikon dibuat otomatis dari animasi.</span>
                </div>
              </div>
            </div>
            <div className="kotakPratinjau">
              <div className="judulPratinjau">Animasi saat dikirim (SVGA atau MP4)</div>
              <div className="isiPratinjau">
                <div className="ketPratinjau">
                  <b>{berkasMedia ? berkasMedia.name : form.media ? form.media.split("/").pop() : "Belum ada animasi"}</b>
                  <input type="file" accept=".svga,video/mp4,image/*" onChange={(e) => setBerkasMedia(e.target.files?.[0] || null)} />
                </div>
              </div>
            </div>

            {form.jenis === "cashback" ? (
              <>
                <label className="isianForm"><span>Peluang cashback (cbRate, persen)</span>
                  <input value={form.cbRate} onChange={(e) => setForm({ ...form, cbRate: e.target.value })} inputMode="numeric" />
                </label>
                <label className="isianForm"><span>Harga dasar cashback (cbPrice)</span>
                  <input value={form.cbPrice} onChange={(e) => setForm({ ...form, cbPrice: e.target.value })} inputMode="numeric" />
                </label>
              </>
            ) : null}
            <label className="isianForm"><span>Peluang jackpot (jpRate)</span>
              <input value={form.jpRate} onChange={(e) => setForm({ ...form, jpRate: e.target.value })} inputMode="numeric" />
            </label>
            <label className="isianForm"><span>Pengali jackpot (jpMult)</span>
              <input value={form.jpMult} onChange={(e) => setForm({ ...form, jpMult: e.target.value })} inputMode="numeric" />
            </label>
            <div className="barisSaklar"><b>Special</b>
              <button type="button" className={"pil" + (form.special ? " on" : "")} onClick={() => setForm({ ...form, special: !form.special })}>{form.special ? "Ya" : "Tidak"}</button>
            </div>
            <div className="barisSaklar"><b>Gift roket</b>
              <button type="button" className={"pil" + (form.rocket ? " on" : "")} onClick={() => setForm({ ...form, rocket: !form.rocket })}>{form.rocket ? "Ya" : "Tidak"}</button>
            </div>
            {progres ? <div className="catatan">{progres}</div> : null}
          </>
        ) : null}
      </Laci>

      <Konfirmasi buka={!!hapus} judul={"Hapus " + (hapus?.nama || "") + "?"}
        pesan="Gift hilang dari katalog dan tidak bisa dikirim lagi. Tindakan ini tidak bisa dibatalkan."
        tombol="Hapus gift" sibuk={sibuk} onYa={hapusGift} onTidak={() => setHapus(null)} />
    </>
  );
}

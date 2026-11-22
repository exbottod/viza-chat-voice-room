import { useEffect, useState } from "react";
import { walletAdmin } from "../dompet.js";
import { unggahBerkas, tulisRtdbServer, kunciVip } from "../unggah.js";
import { catatLog } from "../data.js";
import { Laci, toast } from "../ui.jsx";

const KOSONG = { nama: "", urut: "0", harga: "0", hari: "0", mode: "berkas", url: "", berkas: null };

/**
 * Form tambah aset (emote, frame, medal, lencana, gelembung, efek masuk,
 * banner) langsung di panel React. Berkas diunggah ke server dompet, lalu
 * catatannya ditulis ke Firestore dan RTDB lewat akun layanan, jadi aplikasi
 * langsung membacanya tanpa build ulang.
 */
export default function TambahAset({ buka, slot, judul, onTutup, onSelesai }) {
  const [form, setForm] = useState(KOSONG);
  const [sibuk, setSibuk] = useState(false);
  const [progres, setProgres] = useState("");

  useEffect(() => { if (buka) { setForm(KOSONG); setProgres(""); } }, [buka]);

  const simpan = async () => {
    setSibuk(true);
    try {
      const nama = form.nama.trim();
      if (!nama) throw new Error("Nama wajib diisi");
      let url = form.url.trim();
      if (form.mode === "berkas") {
        if (!form.berkas) throw new Error("Pilih berkas dulu");
        setProgres("mengunggah…");
        url = await unggahBerkas(form.berkas, slot, (p) => setProgres("mengunggah " + p + "%"));
      }
      if (!url) throw new Error("Isi tautan atau pilih berkas");
      const id = slot + "_" + Date.now().toString(36);
      const data = {
        id, slot, name: nama, price: Number(form.harga) || 0, days: Number(form.hari) || 0,
        order: Number(form.urut) || 0, kind: (url.split("?")[0].split(".").pop() || "").toLowerCase(),
        url, hasData: false, updatedAt: Date.now(), chunks: 0, store: false,
      };
      setProgres("menyimpan…");
      await walletAdmin({ op: "fs_set", jalur: "vipConfig/" + id, data });
      await tulisRtdbServer("vipCfg/" + kunciVip(id), data);
      await catatLog("Tambah " + (judul || slot), nama);
      toast((judul || "Aset") + " disimpan");
      setForm(KOSONG);
      setProgres("");
      onSelesai?.();
      onTutup?.();
    } catch (e) {
      setProgres("");
      toast("Gagal: " + (e.message || e), true);
    } finally { setSibuk(false); }
  };

  return (
    <Laci buka={buka} judul={"Tambah " + (judul || slot)} onTutup={onTutup}
      kaki={<button className="tombolBaru" onClick={simpan} disabled={sibuk}>
        {sibuk ? (progres || "Menyimpan…") : "Simpan"}
      </button>}>
      <label className="isianForm"><span>Nama</span>
        <input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} placeholder="mis. Tawa" />
      </label>
      <div className="barisSaklar"><b>Sumber berkas</b>
        <span style={{ display: "flex", gap: 8 }}>
          <button type="button" className={"pil" + (form.mode === "berkas" ? " on" : "")} onClick={() => setForm({ ...form, mode: "berkas" })}>Unggah</button>
          <button type="button" className={"pil" + (form.mode === "tautan" ? " on" : "")} onClick={() => setForm({ ...form, mode: "tautan" })}>Tautan</button>
        </span>
      </div>
      {form.mode === "berkas" ? (
        <label className="isianForm"><span>Berkas (PNG, GIF, WebP, SVGA, MP4 · maks 8 MB)</span>
          <input type="file" accept="image/*,video/mp4,.svga" onChange={(e) => setForm({ ...form, berkas: e.target.files?.[0] || null })} />
        </label>
      ) : (
        <label className="isianForm"><span>Tautan berkas</span>
          <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://…" />
        </label>
      )}
      <label className="isianForm"><span>Urutan tampil</span>
        <input value={form.urut} onChange={(e) => setForm({ ...form, urut: e.target.value })} inputMode="numeric" />
      </label>
      <label className="isianForm"><span>Harga coin (0 = gratis)</span>
        <input value={form.harga} onChange={(e) => setForm({ ...form, harga: e.target.value })} inputMode="numeric" />
      </label>
      <label className="isianForm"><span>Masa pakai hari (0 = selamanya)</span>
        <input value={form.hari} onChange={(e) => setForm({ ...form, hari: e.target.value })} inputMode="numeric" />
      </label>
      {progres ? <div className="catatan">{progres}</div> : null}
    </Laci>
  );
}

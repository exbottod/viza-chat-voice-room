import { useEffect, useRef, useState } from "react";
import { walletAdmin } from "../dompet.js";
import { unggahBerkas, tulisRtdbServer, kunciVip } from "../unggah.js";
import { catatLog } from "../data.js";
import { Laci, toast } from "../ui.jsx";

const KOSONG = { nama: "", urut: "0", harga: "0", hari: "0", mode: "berkas", url: "", berkas: null, tier: "1" };
const TIER = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * Form tambah aset (emote, frame, medal, lencana, gelembung, efek masuk,
 * banner) langsung di panel React. Berkas diunggah ke server dompet, lalu
 * catatannya ditulis ke Firestore dan RTDB lewat akun layanan, jadi aplikasi
 * langsung membacanya tanpa build ulang.
 */
export default function TambahAset({ buka, slot, judul, vip = false, ganti = null, onTutup, onSelesai }) {
  const [form, setForm] = useState(KOSONG);
  const [sibuk, setSibuk] = useState(false);
  const [progres, setProgres] = useState("");
  // Pratinjau berkas yang baru dipilih: langsung tampil di formulir, lalu
  // tinggal dikonfirmasi dengan tombol Simpan.
  const [pratinjau, setPratinjau] = useState("");
  const alamatPratinjau = useRef("");

  const lepasPratinjau = () => {
    if (alamatPratinjau.current) { URL.revokeObjectURL(alamatPratinjau.current); alamatPratinjau.current = ""; }
    setPratinjau("");
  };

  useEffect(() => {
    if (!buka) return;
    setProgres(""); lepasPratinjau();
    if (ganti) {
      setForm({
        ...KOSONG,
        nama: String(ganti.name || ganti.id || ""),
        urut: String(Number(ganti.order) || 0),
        harga: String(Number(ganti.price) || 0),
        hari: String(Number(ganti.days) || 0),
        tier: String(Number(ganti.n) || 1),
        mode: ganti.url ? "tautan" : "berkas",
        url: String(ganti.url || ""),
      });
      return;
    }
    setForm(KOSONG);
  }, [buka, ganti]);
  useEffect(() => () => { if (alamatPratinjau.current) URL.revokeObjectURL(alamatPratinjau.current); }, []);

  /** Berkas dipilih: tampilkan pratinjau saat itu juga. */
  const pilihBerkas = (e) => {
    const f = e.target.files?.[0] || null;
    lepasPratinjau();
    setForm((l) => ({ ...l, berkas: f }));
    if (f) {
      const alamat = URL.createObjectURL(f);
      alamatPratinjau.current = alamat;
      setPratinjau(alamat);
    }
  };

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
      // Aset VIP dipakai otomatis oleh tier VIP 1-9 (bukan item toko), jadi
      // idnya vip_<tier>_<slot> dan ditandai meta. Aset toko memakai id bebas.
      const tier = Math.min(9, Math.max(1, Number(form.tier) || 1));
      const id = ganti?.id
        ? String(ganti.id)
        : vip ? "vip_" + tier + "_" + slot : slot + "_" + Date.now().toString(36);
      const data = {
        id, slot, name: nama, price: Number(form.harga) || 0, days: Number(form.hari) || 0,
        order: Number(form.urut) || 0, kind: (url.split("?")[0].split(".").pop() || "").toLowerCase(),
        url, hasData: false, updatedAt: Date.now(), chunks: 0,
        store: vip ? false : true,
        ...(vip ? { n: tier, meta: true } : {}),
      };
      setProgres("menyimpan…");
      await walletAdmin({ op: "fs_set", jalur: "vipConfig/" + id, data });
      await tulisRtdbServer("vipCfg/" + kunciVip(id), data);
      await catatLog((ganti ? "Ganti " : "Tambah ") + (judul || slot), nama + (vip ? " · VIP " + tier : ""));
      toast((judul || "Aset") + " disimpan" + (vip ? " untuk VIP " + tier : ""));
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
    <Laci buka={buka} judul={(ganti ? "Ganti " : "Tambah ") + (judul || slot) + (vip ? " VIP" : "")} onTutup={onTutup}
      kaki={<button className="tombolBaru" onClick={simpan} disabled={sibuk}>
        {sibuk ? (progres || "Menyimpan…") : "Simpan"}
      </button>}>
      {vip ? (
        <>
          <div className="barisSaklar"><b>Tier VIP</b></div>
          <div className="filter" style={{ marginBottom: 12 }}>
            {TIER.map((n) => (
              <div key={n} className={"pil" + (Number(form.tier) === n ? " on" : "")} onClick={() => setForm({ ...form, tier: String(n) })}>VIP {n}</div>
            ))}
          </div>
          <div className="catatan">Aset ini dipakai otomatis oleh anggota VIP tier {form.tier} untuk {judul || slot}. Tidak dijual di Store.</div>
        </>
      ) : null}
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
          <input type="file" accept="image/*,video/mp4,.svga" onChange={pilihBerkas} />
        </label>
      ) : (
        <label className="isianForm"><span>Tautan berkas</span>
          <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://…" />
        </label>
      )}
      {form.mode === "berkas" && form.berkas ? (
        <div className="kotakPratinjau">
          <div className="judulPratinjau">Pratinjau</div>
          <div className="isiPratinjau">
            {/\.(png|jpe?g|gif|webp)$/i.test(form.berkas.name) ? (
              <img src={pratinjau} alt={form.berkas.name} />
            ) : /\.mp4$/i.test(form.berkas.name) ? (
              <video src={pratinjau} muted loop playsInline autoPlay />
            ) : (
              <div className="ikonPratinjau">
                <span className="material-icons">animation</span>
                <b>{(form.berkas.name.split(".").pop() || "").toUpperCase()}</b>
                <i>Pratinjau bergerak muncul di aplikasi</i>
              </div>
            )}
            <div className="ketPratinjau">
              <b>{form.berkas.name}</b>
              <span>{Math.max(1, Math.round(form.berkas.size / 1024))} KB</span>
            </div>
            <button type="button" className="pil" onClick={() => { lepasPratinjau(); setForm({ ...form, berkas: null }); }}>Ganti berkas</button>
          </div>
          <div className="catatan">Sudah sesuai? Tekan Simpan untuk mengunggah dan menyimpannya.</div>
        </div>
      ) : null}

      <label className="isianForm"><span>Urutan tampil</span>
        <input value={form.urut} onChange={(e) => setForm({ ...form, urut: e.target.value })} inputMode="numeric" />
      </label>
      {vip ? null : (
        <>
          <label className="isianForm"><span>Harga coin (0 = gratis)</span>
            <input value={form.harga} onChange={(e) => setForm({ ...form, harga: e.target.value })} inputMode="numeric" />
          </label>
          <label className="isianForm"><span>Masa pakai hari (0 = selamanya)</span>
            <input value={form.hari} onChange={(e) => setForm({ ...form, hari: e.target.value })} inputMode="numeric" />
          </label>
        </>
      )}
      {progres ? <div className="catatan">{progres}</div> : null}
    </Laci>
  );
}

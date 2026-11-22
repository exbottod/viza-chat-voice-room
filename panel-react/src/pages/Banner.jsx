import { useEffect, useRef, useState } from "react";
import { get, ref } from "firebase/database";
import { rtdb } from "../firebase.js";
import { walletAdmin } from "../dompet.js";
import { ambilSemuaMentah, catatLog } from "../data.js";
import { bacaRtdbServer, tulisRtdbServer, hapusRtdbServer, kunciVip, unggahBerkas } from "../unggah.js";
import { Konfirmasi, Kosong, Laci, Panel, Rangka, Tabel, Tag, toast } from "../ui.jsx";
import { Pratinjau } from "../pratinjau.jsx";

const KOSONG = { judul: "", sub: "", link: "", urut: "0", aktif: true, mode: "berkas", url: "", berkas: null };
const teks = (v) => (typeof v === "string" || typeof v === "number" ? String(v) : "");

/**
 * Banner yang tampil di bagian atas tab Party aplikasi. Aplikasi membaca
 * vipCfg (banner:true) dan memakai imageUrl, title, subtitle, link, order.
 */
export default function Banner() {
  const [daftar, setDaftar] = useState(null);
  const [buka, setBuka] = useState(false);
  const [ganti, setGanti] = useState(null);
  const [form, setForm] = useState(KOSONG);
  const [sibuk, setSibuk] = useState(false);
  const [progres, setProgres] = useState("");
  const [pratinjau, setPratinjau] = useState("");
  const alamat = useRef("");
  const [hapus, setHapus] = useState(null);
  const [lihat, setLihat] = useState(false);

  const lepas = () => {
    if (alamat.current) { URL.revokeObjectURL(alamat.current); alamat.current = ""; }
    setPratinjau("");
  };

  const muat = async () => {
    setDaftar(null);
    const peta = new Map();
    const simpan = (o, kunci) => {
      if (!o || o.banner !== true) return;
      const id = String(o.id || kunci || "");
      if (id) peta.set(id, { ...(peta.get(id) || {}), ...o, id, _kunci: String(kunci || id) });
    };
    let dapat = false;
    try {
      const isi = await bacaRtdbServer("vipCfg");
      if (isi && typeof isi === "object") { Object.entries(isi).forEach(([k, v]) => simpan(v, k)); dapat = true; }
    } catch (e) { /* coba cara kedua */ }
    if (!dapat) {
      try {
        const sn = await get(ref(rtdb, "vipCfg"));
        if (sn.exists()) sn.forEach((c) => simpan(c.val(), c.key));
      } catch (e) { /* lanjut */ }
    }
    // Banner lama yang masih di Firestore ikut ditampilkan supaya bisa dirapikan.
    try {
      (await ambilSemuaMentah("banners", 100)).forEach((d) => {
        if (!peta.has(String(d.id))) peta.set(String(d.id), { ...d, id: String(d.id), lama: true });
      });
    } catch (e) { /* tanpa izin baca */ }
    setDaftar([...peta.values()].sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0)));
  };
  useEffect(() => { muat(); }, []);
  useEffect(() => () => { if (alamat.current) URL.revokeObjectURL(alamat.current); }, []);

  const bukaBaru = () => { setGanti(null); setForm(KOSONG); setProgres(""); lepas(); setBuka(true); };
  const bukaGanti = (x) => {
    setGanti(x); setProgres(""); lepas();
    setForm({
      ...KOSONG,
      judul: teks(x.title), sub: teks(x.subtitle), link: teks(x.link),
      urut: String(Number(x.order) || 0), aktif: x.active !== false,
      mode: "tautan", url: teks(x.imageUrl),
    });
    setBuka(true);
  };

  const pilih = (e) => {
    const f = e.target.files?.[0] || null;
    lepas();
    setForm((l) => ({ ...l, berkas: f }));
    if (f) { const a = URL.createObjectURL(f); alamat.current = a; setPratinjau(a); }
  };

  const simpan = async () => {
    setSibuk(true);
    try {
      let url = form.url.trim();
      if (form.mode === "berkas") {
        if (!form.berkas) throw new Error("Pilih gambar banner dulu");
        setProgres("mengunggah…");
        url = await unggahBerkas(form.berkas, "banner", (p) => setProgres("mengunggah " + p + "%"));
      }
      if (!url) throw new Error("Isi tautan atau pilih gambar");
      const id = ganti && !ganti.lama ? String(ganti.id) : "banner_" + Date.now().toString(36);
      const data = {
        id, banner: true, slot: "partybanner", meta: true, store: false,
        title: form.judul.trim(), subtitle: form.sub.trim(), link: form.link.trim(),
        imageUrl: url, order: Number(form.urut) || 0, active: !!form.aktif,
        name: form.judul.trim() || id, updatedAt: Date.now(),
        // Banner lama di Firestore disembunyikan supaya tidak tampil dobel.
        ...(ganti?.lama ? { hiddenFs: String(ganti.id) } : {}),
      };
      setProgres("menyimpan…");
      await tulisRtdbServer("vipCfg/" + kunciVip(id), data);
      await catatLog(ganti ? "Ubah banner Party" : "Tambah banner Party", data.name);
      toast("Banner disimpan");
      setBuka(false); setProgres(""); lepas();
      await muat();
    } catch (e) {
      setProgres("");
      toast("Gagal: " + (e.message || e), true);
    } finally { setSibuk(false); }
  };

  const jalanHapus = async () => {
    setSibuk(true);
    try {
      if (hapus.lama) {
        // Banner Firestore lama: tandai tersembunyi lewat catatan RTDB baru.
        const id = "sembunyi_" + hapus.id;
        await tulisRtdbServer("vipCfg/" + kunciVip(id), { id, banner: true, slot: "partybanner", meta: true, store: false, active: false, hiddenFs: String(hapus.id), updatedAt: Date.now() });
        await walletAdmin({ op: "fs_del", koleksi: "banners", id: hapus.id }).catch(() => {});
      } else {
        await hapusRtdbServer("vipCfg/" + (hapus._kunci || kunciVip(hapus.id)));
      }
      await catatLog("Hapus banner Party", teks(hapus.title) || hapus.id);
      toast("Banner dihapus");
      setHapus(null);
      await muat();
    } catch (e) { toast("Gagal: " + (e.message || e), true); }
    finally { setSibuk(false); }
  };

  const gambarForm = pratinjau || (form.mode === "tautan" ? form.url : "");

  return (
    <>
      <Panel judul="Banner" sub="Banner yang tampil di atas tab Party aplikasi. Unggah gambar, isi judul dan tautan (opsional), atur urutan."
        aksi={<button className="tombolBaru" onClick={bukaBaru}>Tambah banner</button>}>
        {daftar === null ? <Rangka baris={4} />
          : !daftar.length ? <Kosong>Belum ada banner. Tekan Tambah banner di kanan atas.</Kosong>
          : (
            <Tabel
              kolom={[
                { kunci: "gambar", label: "Pratinjau", sel: (b) => b.gambar },
                { kunci: "judul", label: "Judul", sel: (b) => b.judul },
                { kunci: "link", label: "Tautan", sel: (b) => b.link },
                { kunci: "status", label: "Status", sel: (b) => b.status },
                { kunci: "order", label: "Urut", sel: (b) => b.order },
                { kunci: "aksi", label: "", sel: (b) => b.aksi },
              ]}
              baris={daftar.map((x) => ({
                __kunci: x.id,
                gambar: teks(x.imageUrl) ? <img className="mini lebar" src={teks(x.imageUrl)} alt="" loading="lazy" /> : <span className="mini kosongMini">-</span>,
                judul: teks(x.title) || "-",
                link: teks(x.link) || "-",
                status: x.active === false ? <Tag jenis="mati">Mati</Tag> : <Tag jenis="aktif">Tampil</Tag>,
                order: Number(x.order) || 0,
                aksi: <span style={{ display: "flex", gap: 10 }}>
                  <a className="tautanPink" onClick={() => bukaGanti(x)}>Ubah</a>
                  <a className="tautanPink" onClick={() => setHapus(x)}>Hapus</a>
                </span>,
              }))}
            />
          )}
      </Panel>

      <Laci buka={buka} judul={ganti ? "Ubah banner" : "Tambah banner"} onTutup={() => setBuka(false)}
        kaki={<span style={{ display: "flex", gap: 8, width: "100%", justifyContent: "flex-end" }}>
        {gambarForm ? <button type="button" className="pil" onClick={() => setLihat(true)}>Pratinjau</button> : null}
        <button className="tombolBaru" onClick={simpan} disabled={sibuk}>{sibuk ? (progres || "Menyimpan…") : "Simpan"}</button>
      </span>}>
        <div className="barisSaklar"><b>Sumber gambar</b>
          <span style={{ display: "flex", gap: 8 }}>
            <button type="button" className={"pil" + (form.mode === "berkas" ? " on" : "")} onClick={() => setForm({ ...form, mode: "berkas" })}>Unggah</button>
            <button type="button" className={"pil" + (form.mode === "tautan" ? " on" : "")} onClick={() => setForm({ ...form, mode: "tautan" })}>Tautan</button>
          </span>
        </div>
        {form.mode === "berkas" ? (
          <label className="isianForm"><span>Gambar banner (PNG, JPG, WebP, GIF)</span>
            <input type="file" accept="image/*" onChange={pilih} />
          </label>
        ) : (
          <label className="isianForm"><span>Tautan gambar</span>
            <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://…" />
          </label>
        )}
        {gambarForm ? (
          <div className="kotakPratinjau">
            <div className="judulPratinjau">Pratinjau</div>
            <div className="isiPratinjau">
              <img src={gambarForm} alt="" style={{ maxWidth: "100%", borderRadius: 8 }} />
              {form.berkas && form.mode === "berkas" ? (
                <div className="ketPratinjau">
                  <b>{form.berkas.name}</b>
                  <span>{Math.max(1, Math.round(form.berkas.size / 1024))} KB</span>
                </div>
              ) : null}
              <button type="button" className="pil" onClick={() => setLihat(true)}>Pratinjau</button>
              {form.berkas && form.mode === "berkas"
                ? <button type="button" className="pil" onClick={() => { lepas(); setForm({ ...form, berkas: null }); }}>Ganti berkas</button> : null}
            </div>
          </div>
        ) : null}
        <label className="isianForm"><span>Judul (opsional)</span>
          <input value={form.judul} onChange={(e) => setForm({ ...form, judul: e.target.value })} />
        </label>
        <label className="isianForm"><span>Subjudul (opsional)</span>
          <input value={form.sub} onChange={(e) => setForm({ ...form, sub: e.target.value })} />
        </label>
        <label className="isianForm"><span>Tautan saat banner diketuk (opsional)</span>
          <input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="https://…" />
        </label>
        <label className="isianForm"><span>Urutan tampil</span>
          <input value={form.urut} onChange={(e) => setForm({ ...form, urut: e.target.value })} inputMode="numeric" />
        </label>
        <div className="barisSaklar"><b>Tampilkan di aplikasi</b>
          <button type="button" className={"pil" + (form.aktif ? " on" : "")} onClick={() => setForm({ ...form, aktif: !form.aktif })}>{form.aktif ? "Ya" : "Tidak"}</button>
        </div>
        {progres ? <div className="catatan">{progres}</div> : null}
      </Laci>

      <Pratinjau aset={lihat && gambarForm ? { url: gambarForm, kind: (gambarForm.split("?")[0].split(".").pop() || ""), nama: form.judul || "Banner" } : null}
        onTutup={() => setLihat(false)} />

      <Konfirmasi buka={!!hapus} judul="Hapus banner?" pesan={(teks(hapus?.title) || hapus?.id || "") + " tidak akan tampil lagi di tab Party."}
        tombol="Hapus" sibuk={sibuk} onYa={jalanHapus} onTidak={() => setHapus(null)} />
    </>
  );
}

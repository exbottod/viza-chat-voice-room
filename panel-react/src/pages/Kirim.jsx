import { useEffect, useRef, useState } from "react";
import { walletAdmin } from "../dompet.js";
import { unggahBerkas, tulisRtdbServer, kunciVip } from "../unggah.js";
import { ambilSemuaMentah, catatLog } from "../data.js";
import { bacaRtdbServer } from "../unggah.js";
import { Panel, toast } from "../ui.jsx";
import { Pratinjau, Thumb, ekstensi, jenisMedia } from "../pratinjau.jsx";

const JENIS = [
  ["frame", "Bingkai"], ["badge", "Lencana"], ["medal", "Medali"],
  ["cardbg", "Kartu profil"], ["title", "Gelar VIP"],
  ["bubble", "Gelembung"], ["entry", "Efek masuk"], ["banner", "Banner"],
];
const KOSONG = {
  uid: "", jenis: "frame", sumber: "berkas", nama: "", item: "",
  berkas: null, url: "", hari: "30", pakai: true, nomor: "",
};

/**
 * Kirim aset ke satu akun. Asetnya bisa diunggah dari HP, ditempel sebagai
 * tautan, atau memakai aset yang sudah ada di Store. Bila aset baru, catatannya
 * sekaligus dibuat di Store supaya aplikasi bisa menggambarnya.
 */
export default function Kirim() {
  const [form, setForm] = useState(KOSONG);
  const [sibuk, setSibuk] = useState(false);
  const [progres, setProgres] = useState("");
  const [hasil, setHasil] = useState(null);
  const [pratinjau, setPratinjau] = useState("");
  const [lihat, setLihat] = useState(false);
  const [cari, setCari] = useState("");
  const [katalog, setKatalog] = useState([]);
  const [memuatKatalog, setMemuatKatalog] = useState(false);
  const alamatPratinjau = useRef("");

  const lepas = () => {
    if (alamatPratinjau.current) { URL.revokeObjectURL(alamatPratinjau.current); alamatPratinjau.current = ""; }
    setPratinjau("");
  };
  useEffect(() => () => lepas(), []);

  const ubah = (k, v) => setForm((l) => ({ ...l, [k]: v }));

  /** Katalog Store untuk pencarian: nama, ID aset, dan nomor ID unik (mis. 1000). */
  const muatKatalog = async () => {
    setMemuatKatalog(true);
    const peta = new Map();
    const simpan = (o, kunci) => {
      const id = String(o.id || kunci || "");
      if (!id || o.banner === true || o.store === false) return;
      peta.set(id, {
        id, nama: String(o.name || o.title || id),
        slot: String(o.slot || ""),
        nomor: String(o.customId || ""),
        url: typeof o.url === "string" ? o.url : "",
        kind: String(o.kind || ""),
      });
    };
    try { (await ambilSemuaMentah("vipConfig", 400)).forEach((d) => simpan(d, d.id)); } catch (e) { /* tanpa izin */ }
    try {
      const isi = await bacaRtdbServer("vipCfg");
      if (isi && typeof isi === "object") Object.entries(isi).forEach(([k, v]) => simpan(v || {}, k));
    } catch (e) { /* abaikan */ }
    setKatalog([...peta.values()].sort((a, b) => a.nama.localeCompare(b.nama)));
    setMemuatKatalog(false);
  };
  useEffect(() => { muatKatalog(); }, []);

  const kataCari = cari.trim().toLowerCase();
  const cocok = !kataCari ? [] : katalog.filter((x) => x.nama.toLowerCase().includes(kataCari)
    || x.id.toLowerCase().includes(kataCari) || (x.nomor && x.nomor.includes(kataCari))).slice(0, 20);

  /** Pakai aset dari katalog: jenis, ID, nama, dan nomornya ikut terisi. */
  const pakaiAset = (x) => {
    setForm((l) => ({
      ...l,
      jenis: JENIS.some(([k]) => k === x.slot) ? x.slot : l.jenis,
      sumber: "id",
      item: x.id,
      nama: x.nama,
      url: x.url,
      nomor: x.nomor || l.nomor,
    }));
  };

  const pilihBerkas = (e) => {
    const f = e.target.files?.[0] || null;
    lepas();
    setForm((l) => ({
      ...l, berkas: f,
      nama: l.nama || (f ? f.name.replace(/\.[^.]+$/, "") : ""),
    }));
    if (f) {
      const alamat = URL.createObjectURL(f);
      alamatPratinjau.current = alamat;
      setPratinjau(alamat);
    }
  };

  const idOtomatis = () => form.jenis + "_" + Date.now().toString(36);

  const kirim = async () => {
    setSibuk(true); setHasil(null);
    try {
      const uid = form.uid.trim();
      if (!/^[A-Za-z0-9_-]{4,80}$/.test(uid)) throw new Error("UID penerima belum benar");
      const hari = Math.max(1, Math.min(3650, Number(form.hari) || 30));
      let item = form.item.trim().replace(/[^A-Za-z0-9_-]/g, "");

      // Aset baru: unggah berkas atau pakai tautan, lalu catat ke Store.
      if (form.sumber !== "id") {
        let url = form.url.trim();
        if (form.sumber === "berkas") {
          if (!form.berkas) throw new Error("Pilih berkas dulu atau ganti ke Tautan");
          setProgres("mengunggah 0%");
          url = await unggahBerkas(form.berkas, form.jenis, (p) => setProgres("mengunggah " + p + "%"));
        }
        if (!url) throw new Error("Tempel tautan berkas dulu");
        if (!item) item = idOtomatis();
        const nama = form.nama.trim() || item;
        const nomor = String(form.nomor || "").trim();
        const data = {
          id: item, slot: form.jenis, name: nama, price: 0, days: 0, order: 0,
          kind: (url.split("?")[0].split(".").pop() || "").toLowerCase(),
          url, hasData: false, updatedAt: Date.now(), chunks: 0, store: false,
          // Nomor opsional (mis. 1000) supaya aset bisa dicari dan dipakai
          // sebagai ID unik di profil.
          ...(nomor ? { customId: nomor } : {}),
        };
        setProgres("menyimpan aset…");
        await walletAdmin({ op: "fs_set", jalur: "vipConfig/" + item, data });
        await tulisRtdbServer("vipCfg/" + kunciVip(item), data);
      }
      if (!item) throw new Error("Isi ID aset yang mau dikirim");

      setProgres("mengirim…");
      const out = await walletAdmin({
        op: "kirim_item", uid, item, hari,
        pakai: form.pakai ? form.jenis : "",
        ...(String(form.nomor || "").trim() ? { nomor: String(form.nomor).trim() } : {}),
      }, 30000);
      await catatLog("Kirim " + form.jenis, uid + " · " + item + " · " + hari + " hari");
      setHasil({
        uid, item: out.item || item, hari: out.hari || hari,
        dipasang: out.dipasang || "", idUnik: out.idUnik || "",
      });
      toast("Terkirim ke " + uid);
      setProgres("");
      setCari("");
      muatKatalog();
    } catch (e) {
      setProgres("");
      toast("Gagal: " + (e.message || e), true);
    } finally { setSibuk(false); }
  };

  const siapKirim = form.uid.trim() && (
    form.sumber === "id" ? form.item.trim() : (form.sumber === "berkas" ? !!form.berkas : !!form.url.trim())
  );

  return (
    <Panel judul="Kirim ke user" sub="Kirim bingkai, lencana, medali, gelembung, efek masuk, atau banner ke satu akun. Aset bisa diunggah dari HP atau ditempel sebagai tautan."
      aksi={<button className="tombolBaru" onClick={kirim} disabled={sibuk || !siapKirim}>{sibuk ? (progres || "Mengirim…") : "Kirim"}</button>}>

      <label className="isianForm"><span>UID penerima</span>
        <input value={form.uid} onChange={(e) => ubah("uid", e.target.value)} placeholder="UID akun, bukan nama" />
      </label>

      <div className="barisSaklar"><b>Jenis aset</b></div>
      <div className="filter" style={{ marginBottom: 12 }}>
        {JENIS.map(([k, n]) => (
          <div key={k} className={"pil" + (form.jenis === k ? " on" : "")} onClick={() => ubah("jenis", k)}>{n}</div>
        ))}
      </div>

      <div className="barisSaklar"><b>Sumber aset</b>
        <span style={{ display: "flex", gap: 8 }}>
          <button type="button" className={"pil" + (form.sumber === "berkas" ? " on" : "")} onClick={() => ubah("sumber", "berkas")}>Unggah</button>
          <button type="button" className={"pil" + (form.sumber === "tautan" ? " on" : "")} onClick={() => ubah("sumber", "tautan")}>Tautan</button>
          <button type="button" className={"pil" + (form.sumber === "id" ? " on" : "")} onClick={() => ubah("sumber", "id")}>Aset lama</button>
        </span>
      </div>

      <label className="isianForm"><span>Cari aset dari Store (nama atau nomor ID, mis. 1000)</span>
        <input value={cari} onChange={(e) => setCari(e.target.value)} placeholder="ketik nama aset atau nomor ID" />
      </label>
      {kataCari ? (
        <div className="catatan" style={{ marginBottom: 10 }}>
          {memuatKatalog ? "Memuat katalog…"
            : !cocok.length ? "Tidak ada aset yang cocok."
            : cocok.map((x) => (
              <div key={x.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", borderBottom: "1px solid #2b2b3a" }}>
                <Thumb url={x.url} kind={x.kind} nama={x.nama} lebar={34} onKlik={() => setLihat({ url: x.url, kind: x.kind, nama: x.nama })} />
                <span style={{ flex: "1 1 auto", minWidth: 0 }}>
                  <b>{x.nama}</b><br />
                  <small>{x.id}{x.nomor ? " · nomor " + x.nomor : ""}</small>
                </span>
                <button type="button" className="pil" onClick={() => pakaiAset(x)}>Pakai</button>
              </div>
            ))}
        </div>
      ) : null}

      <label className="isianForm"><span>Nomor ID (opsional, mis. 1000)</span>
        <input value={form.nomor} onChange={(e) => ubah("nomor", e.target.value.replace(/\D/g, ""))} inputMode="numeric" placeholder="mis. 1000" />
      </label>

      {form.sumber === "berkas" ? (
        <label className="isianForm"><span>Berkas (PNG, GIF, WebP, SVGA, MP4 · maks 8 MB)</span>
          <input type="file" accept="image/*,video/mp4,.svga" onChange={pilihBerkas} />
        </label>
      ) : null}

      {form.sumber === "tautan" ? (
        <label className="isianForm"><span>Tautan berkas</span>
          <input value={form.url} onChange={(e) => ubah("url", e.target.value)} placeholder="https://…" />
        </label>
      ) : null}

      {form.sumber !== "id" ? (
        <label className="isianForm"><span>Nama aset (yang tampil di aplikasi)</span>
          <input value={form.nama} onChange={(e) => ubah("nama", e.target.value)} placeholder="mis. Lencana CEO" />
        </label>
      ) : null}

      <label className="isianForm"><span>ID aset {form.sumber === "id" ? "" : "(kosongkan untuk dibuat otomatis)"}</span>
        <input value={form.item} onChange={(e) => ubah("item", e.target.value)} placeholder={form.sumber === "id" ? "mis. frame_lx3k atau id medali" : "otomatis, mis. badge_lx3k"} />
      </label>

      {form.sumber === "berkas" && form.berkas ? (
        <div className="kotakPratinjau">
          <div className="judulPratinjau">Pratinjau</div>
          <div className="isiPratinjau">
            {jenisMedia(form.berkas.name, form.berkas.name) === "gambar" ? (
              <img src={pratinjau} alt={form.berkas.name} />
            ) : jenisMedia(form.berkas.name, form.berkas.name) === "video" ? (
              <video src={pratinjau} muted loop playsInline autoPlay />
            ) : (
              <div className="ikonPratinjau">
                <Thumb url={pratinjau} kind={ekstensi(form.berkas.name)} nama={form.berkas.name} lebar={84} />
                <b>{(form.berkas.name.split(".").pop() || "").toUpperCase()}</b>
                <i>Ketuk Pratinjau untuk memutar animasinya</i>
              </div>
            )}
            <div className="ketPratinjau">
              <b>{form.berkas.name}</b>
              <span>{Math.max(1, Math.round(form.berkas.size / 1024))} KB</span>
            </div>
            <button type="button" className="pil" onClick={() => setLihat(true)}>Pratinjau</button>
          </div>
        </div>
      ) : null}

      <label className="isianForm"><span>Masa berlaku (hari)</span>
        <input value={form.hari} onChange={(e) => ubah("hari", e.target.value.replace(/[^0-9]/g, ""))} inputMode="numeric" />
      </label>

      <label style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6, cursor: "pointer" }}>
        <input type="checkbox" checked={form.pakai} onChange={(e) => ubah("pakai", e.target.checked)} />
        <span>Langsung pasang di akun penerima</span>
      </label>
      <div className="catatan">Lencana ditambahkan ke daftar lencana akun, jenis lain langsung dipakai. Bila tidak dicentang, aset masuk ke tas dan penerima memasangnya sendiri.</div>

      {hasil ? (
        <div className="kosong" style={{ marginTop: 14, textAlign: "left", lineHeight: 1.6 }}>
          <b>Terkirim.</b> UID {hasil.uid} · aset {hasil.item} · {hasil.hari} hari
          {hasil.dipasang ? " · langsung dipasang" : ""}
          {hasil.idUnik ? " · ID unik " + hasil.idUnik : ""}
        </div>
      ) : null}
      <Pratinjau aset={lihat && (pratinjau || form.url.trim()) ? { url: pratinjau || form.url.trim(), kind: ekstensi(form.berkas?.name || form.url), nama: form.nama || form.berkas?.name || "Pratinjau" } : null}
        onTutup={() => setLihat(false)} />

    </Panel>
  );
}

import { useEffect, useState } from "react";
import { walletAdmin } from "../dompet.js";
import { unggahBerkas, tulisRtdbServer, bacaRtdbServer } from "../unggah.js";
import { catatLog } from "../data.js";
import { Panel, Tag, toast } from "../ui.jsx";

/**
 * Background tab: latar tiap tab aplikasi (Party, Moment, Family, Pesan, Saya,
 * dan bilah bawah) plus gambar latar per user.
 *
 * Aplikasi (TabBackground.kt) membaca Firestore `vipConfig/tabbg`, satu medan
 * per tab: { mode, url, c1, c2 }, dengan mode "default" | "image" | "gradient".
 * Realtime Database `tabBg/<tab>` dipakai sebagai cadangan, jadi keduanya
 * ditulis bersamaan. Halaman lama hanya menampilkan koleksi `tabBackgrounds`
 * yang tidak pernah dibaca aplikasi, karena itu unggahan tidak muncul-muncul.
 */
const TAB = [
  { k: "party", nama: "Tab Party" },
  { k: "moment", nama: "Tab Moment" },
  { k: "family", nama: "Tab Family" },
  { k: "pesan", nama: "Tab Pesan" },
  { k: "saya", nama: "Tab Saya" },
  { k: "nav", nama: "Bilah bawah (nav)" },
];

const MODE = [
  { k: "default", nama: "Bawaan" },
  { k: "image", nama: "Gambar" },
  { k: "gradient", nama: "Gradasi" },
];

const kosong = () => Object.fromEntries(TAB.map((t) => [t.k, { mode: "default", url: "", c1: "", c2: "" }]));

export default function Background() {
  const [isi, setIsi] = useState(kosong);
  const [memuat, setMemuat] = useState(true);
  const [sibuk, setSibuk] = useState("");
  const [progres, setProgres] = useState("");

  const muat = async () => {
    setMemuat(true);
    const hasil = kosong();
    const ambil = (o) => {
      for (const t of TAB) {
        const d = o && o[t.k];
        if (d && typeof d === "object") {
          hasil[t.k] = {
            mode: String(d.mode || "default"),
            url: String(d.url || ""),
            c1: String(d.c1 || ""),
            c2: String(d.c2 || ""),
          };
        }
      }
    };
    try {
      const r = await walletAdmin({ op: "fs_get", jalur: "vipConfig/tabbg" });
      if (r && r.data) ambil(r.data);
    } catch (e) { /* coba cadangan RTDB */ }
    try { ambil(await bacaRtdbServer("tabBg")); } catch (e) { /* server cadangan mati */ }
    setIsi(hasil);
    setMemuat(false);
  };
  useEffect(() => { muat(); }, []);

  const ubah = (k, medan, nilai) => setIsi((s) => ({ ...s, [k]: { ...s[k], [medan]: nilai } }));

  const pilihBerkas = async (k, berkas) => {
    if (!berkas) return;
    setSibuk(k);
    setProgres("mengunggah…");
    try {
      const url = await unggahBerkas(berkas, "tabbg-" + k, (p) => setProgres("mengunggah " + p + "%"));
      setIsi((s) => ({ ...s, [k]: { ...s[k], mode: "image", url } }));
      toast("Gambar terpasang, tekan Simpan untuk menerapkan");
    } catch (e) {
      toast("Gagal unggah: " + (e.message || e), true);
    } finally { setProgres(""); setSibuk(""); }
  };

  const simpan = async (k) => {
    const d = isi[k];
    if (d.mode === "image" && !d.url.trim()) { toast("Pilih gambar atau isi tautan dulu", true); return; }
    if (d.mode === "gradient" && (!d.c1.trim() || !d.c2.trim())) { toast("Isi dua warna gradasi (mis. #181821)", true); return; }
    setSibuk(k);
    try {
      const data = { mode: d.mode, url: d.url.trim(), c1: d.c1.trim(), c2: d.c2.trim() };
      await walletAdmin({ op: "fs_set", jalur: "vipConfig/tabbg", data: { [k]: data } });
      await tulisRtdbServer("tabBg/" + k, data);
      await catatLog("Latar tab " + k, MODE.find((m) => m.k === d.mode)?.nama || d.mode);
      toast("Latar " + (TAB.find((t) => t.k === k)?.nama || k) + " tersimpan");
    } catch (e) {
      toast("Gagal menyimpan: " + (e.message || e), true);
    } finally { setSibuk(""); }
  };

  const bawaan = async (k) => {
    setSibuk(k);
    try {
      const data = { mode: "default", url: "", c1: "", c2: "" };
      setIsi((s) => ({ ...s, [k]: data }));
      await walletAdmin({ op: "fs_set", jalur: "vipConfig/tabbg", data: { [k]: data } });
      await tulisRtdbServer("tabBg/" + k, data);
      await catatLog("Latar tab " + k, "kembali bawaan");
      toast("Latar dikembalikan ke bawaan");
    } catch (e) { toast("Gagal: " + (e.message || e), true); }
    finally { setSibuk(""); }
  };

  return (
    <Panel judul="Background tab" sub="Unggah gambar latar untuk tiap tab aplikasi dan bilah bawah. Aplikasi membacanya dari server, jadi tidak perlu build APK baru; latar baru tampil setelah aplikasi dibuka ulang atau paling lambat 5 menit.">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
        {TAB.map((t) => {
          const d = isi[t.k];
          const gambar = d.mode === "image" && d.url ? d.url : "";
          return (
            <div key={t.k} style={{ background: "#1f1f2b", border: "1px solid #2b2b3a", borderRadius: 5, padding: 12 }}>
              <div className="barisSaklar" style={{ marginTop: 0 }}>
                <b style={{ fontSize: 13 }}>{t.nama}</b>
                <Tag jenis={d.mode === "default" ? "mati" : "aktif"}>{MODE.find((m) => m.k === d.mode)?.nama || d.mode}</Tag>
              </div>

              <div style={{
                height: 110, borderRadius: 4, margin: "8px 0 10px", overflow: "hidden",
                border: "1px solid #2b2b3a",
                background: d.mode === "gradient" && d.c1 && d.c2
                  ? "linear-gradient(135deg, " + d.c1 + ", " + d.c2 + ")"
                  : "#181821",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {gambar
                  ? <img src={gambar} alt={t.nama} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <span className="catatan" style={{ padding: 0 }}>{d.mode === "gradient" ? "Gradasi" : "Latar bawaan"}</span>}
              </div>

              <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                {MODE.map((m) => (
                  <button key={m.k} className={d.mode === m.k ? "pil on" : "pil"} onClick={() => ubah(t.k, "mode", m.k)}>{m.nama}</button>
                ))}
              </div>

              {d.mode === "image" ? (
                <>
                  <label className="unggahBerkas" style={{ display: "block", marginBottom: 6 }}>
                    <input type="file" accept="image/*" hidden onChange={(e) => pilihBerkas(t.k, e.target.files?.[0])} />
                    <span className="pil">{sibuk === t.k ? progres || "mengunggah…" : "Pilih gambar"}</span>
                  </label>
                  <input value={d.url} onChange={(e) => ubah(t.k, "url", e.target.value)} placeholder="atau tempel tautan gambar" style={{ width: "100%", marginBottom: 6 }} />
                </>
              ) : null}

              {d.mode === "gradient" ? (
                <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                  <input value={d.c1} onChange={(e) => ubah(t.k, "c1", e.target.value)} placeholder="#181821" style={{ width: "50%" }} />
                  <input value={d.c2} onChange={(e) => ubah(t.k, "c2", e.target.value)} placeholder="#e8538f" style={{ width: "50%" }} />
                </div>
              ) : null}

              <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                <button className="pil on" disabled={sibuk === t.k} onClick={() => simpan(t.k)}>{sibuk === t.k ? "Menyimpan…" : "Simpan"}</button>
                <button className="polos" disabled={sibuk === t.k || d.mode === "default"} onClick={() => bawaan(t.k)}>Bawaan</button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="catatan" style={{ marginTop: 14 }}>
        {memuat ? "Membaca pengaturan latar dari server…" : "Gambar disimpan di server Viza (folder tabbg) dan alamatnya dicatat di vipConfig/tabbg plus tabBg. Latar bawaan berarti memakai tampilan asli aplikasi."}
      </div>
    </Panel>
  );
}

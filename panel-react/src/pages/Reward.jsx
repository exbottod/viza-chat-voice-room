import { useEffect, useState } from "react";
import { auth } from "../firebase.js";
import { walletAdmin } from "../dompet.js";
import { DOMPET } from "../unggah.js";
import { catatLog, rupiah } from "../data.js";
import { Konfirmasi, Panel, Rangka, Tabel, Tag, toast } from "../ui.jsx";

const gayaIsi = {
  width: "100%", padding: "7px 9px", background: "#181821", color: "#fff",
  border: "1px solid #2b2b3a", borderRadius: 5, fontSize: 13, boxSizing: "border-box",
};
const gayaLabel = { fontSize: 11, color: "#9a9cab", marginBottom: 3 };
const angka = (v) => Math.max(0, Math.trunc(Number(String(v).replace(/[^0-9]/g, "")) || 0));
const TIER_KOSONG = { aliran: "0", pemilik: "0", top: "2", perOrang: "0" };

/** Panggil /rewardroom di server dompet dengan sesi admin. */
async function panggil(isi) {
  const u = auth.currentUser;
  if (!u) throw new Error("Belum login");
  const t = await u.getIdToken();
  const kendali = new AbortController();
  const jam = setTimeout(() => kendali.abort(), 30000);
  try {
    const res = await fetch(DOMPET + "/rewardroom", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ t, ...isi }),
      signal: kendali.signal,
    });
    const teks = await res.text();
    let j = {};
    try { j = teks ? JSON.parse(teks) : {}; } catch (e) { j = {}; }
    if (j.ok === 0) throw new Error(j.e || "Ditolak server");
    if (!res.ok) throw new Error("Server " + res.status);
    return j;
  } finally { clearTimeout(jam); }
}

/**
 * Reward room mingguan: room yang aliran koin gift-nya mencapai tingkat tertentu
 * memberi hadiah ke pemilik room dan top kontributor. Server sudah menghitung
 * dan membagikan otomatis; halaman ini mengatur tingkat, banner, ikon, aturan,
 * dan menampilkan room minggu ini.
 */
export default function Reward() {
  const [aktif, setAktif] = useState(true);
  const [banner, setBanner] = useState("");
  const [ikon, setIkon] = useState("");
  const [aturan, setAturan] = useState("");
  const [tiers, setTiers] = useState(null);
  const [periode, setPeriode] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [sibuk, setSibuk] = useState("");
  const [bagi, setBagi] = useState(false);
  const [galat, setGalat] = useState("");

  const muat = async () => {
    setTiers(null); setGalat("");
    try {
      const out = await panggil({ do: "info" });
      setAktif(out.aktif !== false);
      setBanner(out.banner || "");
      setIkon(out.ikon || "");
      setAturan(out.aturan || "");
      setTiers((out.tiers || []).map((t) => ({
        aliran: String(t.aliran || 0), pemilik: String(t.pemilik || 0),
        top: String(t.top || 1), perOrang: String(t.perOrang || 0),
      })));
      setPeriode(out.periode || null);
      setRooms(out.peringkat || []);
    } catch (e) {
      setGalat(e.message || String(e));
      setTiers([]);
    }
  };
  useEffect(() => { muat(); }, []);

  // Banner kemenangan game (alamat gambar) dibaca terpisah: dipakai game Bikini.
  const [bannerGame, setBannerGame] = useState("");
  useEffect(() => {
    walletAdmin({ op: "win_banner_get" }).then((o) => setBannerGame(o.url || "")).catch(() => {});
  }, []);

  const ubahTier = (i, k, v) => {
    const a = tiers.map((t) => ({ ...t }));
    a[i][k] = v.replace(/[^0-9]/g, "");
    setTiers(a);
  };

  const simpan = async () => {
    setSibuk("simpan");
    try {
      const daftar = tiers
        .map((t) => ({ aliran: angka(t.aliran), pemilik: angka(t.pemilik), top: Math.max(1, Math.min(15, angka(t.top) || 1)), perOrang: angka(t.perOrang) }))
        .filter((t) => t.aliran > 0);
      if (!daftar.length) throw new Error("Isi minimal satu tingkat dengan aliran lebih dari 0");
      await panggil({ do: "simpan", aktif: aktif ? 1 : 0, banner: banner.trim(), ikon: ikon.trim(), aturan, tiers: daftar });
      await walletAdmin({ op: "win_banner_set", url: bannerGame.trim() });
      await catatLog("Reward room", daftar.length + " tingkat, " + (aktif ? "aktif" : "nonaktif"));
      toast("Reward room tersimpan");
      await muat();
    } catch (e) {
      toast("Gagal: " + (e.message || e), true);
    } finally { setSibuk(""); }
  };

  const bagikan = async () => {
    setSibuk("bagi");
    try {
      const out = await panggil({ do: "bagikan" });
      await catatLog("Bagikan reward room", periode ? periode.key : "");
      toast("Hadiah dibagikan" + (out.hasil && out.hasil.pemenang !== undefined ? ": " + out.hasil.pemenang + " penerima" : ""));
      setBagi(false);
      await muat();
    } catch (e) {
      toast("Gagal: " + (e.message || e), true);
    } finally { setSibuk(""); }
  };

  return (
    <>
      <Panel judul="Reward room"
        sub="Hadiah mingguan untuk room dengan aliran coin gift tertinggi. Penutupan berjalan otomatis tiap minggu (Senin 00:00 WIB)."
        aksi={<button className="tombolBaru" onClick={simpan} disabled={sibuk === "simpan" || tiers === null}>
          {sibuk === "simpan" ? "Menyimpan…" : "Simpan"}
        </button>}>
        {galat ? <div className="kosong" style={{ marginBottom: 12 }}>Belum bisa memuat dari server: {galat}</div> : null}
        {tiers === null ? <Rangka baris={5} /> : (
          <>
            <label style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, cursor: "pointer" }}>
              <input type="checkbox" checked={aktif} onChange={(e) => setAktif(e.target.checked)} />
              <b>Reward room aktif</b>
              <Tag jenis={aktif ? "aktif" : "mati"}>{aktif ? "Aktif" : "Nonaktif"}</Tag>
            </label>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10, marginBottom: 14 }}>
              <div>
                <div style={gayaLabel}>Banner halaman reward (alamat gambar)</div>
                <input style={gayaIsi} value={banner} onChange={(e) => setBanner(e.target.value)} placeholder="https://…" />
              </div>
              <div>
                <div style={gayaLabel}>Ikon reward (alamat gambar)</div>
                <input style={gayaIsi} value={ikon} onChange={(e) => setIkon(e.target.value)} placeholder="https://…" />
              </div>
              <div>
                <div style={gayaLabel}>Banner kemenangan game di room (alamat gambar)</div>
                <input style={gayaIsi} value={bannerGame} onChange={(e) => setBannerGame(e.target.value)} placeholder="https://…" />
              </div>
            </div>

            <div style={{ fontWeight: 600, margin: "4px 0 4px" }}>Tingkat hadiah</div>
            <div style={{ fontSize: 12, color: "#9a9cab", marginBottom: 8 }}>
              Room yang aliran coin gift-nya mencapai angka tingkat mendapat hadiah. Pemilik room dapat hadiah pemilik, dan Top kontributor masing-masing dapat hadiah per orang.
              Baris dengan aliran 0 dibuang saat disimpan.
            </div>
            {tiers.map((t, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "28px 1.3fr 1.1fr 56px 1fr 30px", gap: 8, alignItems: "end", marginBottom: 8,
              }}>
                <div style={{ fontSize: 12, color: "#cfd0da", paddingBottom: 8 }}>{i + 1}</div>
                <div>
                  <div style={gayaLabel}>Aliran{angka(t.aliran) ? " (" + rupiah(angka(t.aliran)) + ")" : ""}</div>
                  <input style={gayaIsi} inputMode="numeric" value={t.aliran} onChange={(e) => ubahTier(i, "aliran", e.target.value)} />
                </div>
                <div>
                  <div style={gayaLabel}>Hadiah pemilik</div>
                  <input style={gayaIsi} inputMode="numeric" value={t.pemilik} onChange={(e) => ubahTier(i, "pemilik", e.target.value)} />
                </div>
                <div>
                  <div style={gayaLabel}>Top</div>
                  <input style={gayaIsi} inputMode="numeric" value={t.top} onChange={(e) => ubahTier(i, "top", e.target.value)} />
                </div>
                <div>
                  <div style={gayaLabel}>Per orang</div>
                  <input style={gayaIsi} inputMode="numeric" value={t.perOrang} onChange={(e) => ubahTier(i, "perOrang", e.target.value)} />
                </div>
                <button className="pil" style={{ marginBottom: 2 }} title="Hapus tingkat"
                  onClick={() => setTiers(tiers.filter((_, j) => j !== i))}>×</button>
              </div>
            ))}
            <button className="pil" onClick={() => setTiers([...tiers, { ...TIER_KOSONG }])}>+ Tambah tingkat</button>

            <div style={{ fontWeight: 600, margin: "20px 0 6px" }}>Aturan yang tampil di aplikasi</div>
            <textarea value={aturan} onChange={(e) => setAturan(e.target.value)} rows={7}
              style={{ ...gayaIsi, lineHeight: 1.5, resize: "vertical" }} />
          </>
        )}
      </Panel>

      <Panel judul={"Room minggu ini" + (periode ? " (mulai " + periode.key + ")" : "")}
        sub="Peringkat room menurut aliran coin gift. Bagikan hadiah sekarang hanya bila ingin menutup periode lebih awal."
        aksi={<button className="tombolBaru" onClick={() => setBagi(true)} disabled={sibuk === "bagi"}>Bagikan hadiah</button>}>
        {tiers === null ? <Rangka baris={3} /> : (
          <Tabel
            kosong="Belum ada room yang menerima gift minggu ini."
            kolom={[
              { k: "pos", t: "#" }, { k: "nama", t: "Room" }, { k: "level", t: "Level" }, { k: "aliran", t: "Aliran coin" },
            ]}
            baris={rooms.slice(0, 50).map((r) => ({
              __kunci: r.roomId,
              pos: r.pos, nama: r.nama || r.roomId, level: r.level ?? "-", aliran: rupiah(r.aliran),
            }))}
          />
        )}
      </Panel>

      <Konfirmasi buka={bagi} judul="Bagikan hadiah sekarang?"
        pesan="Hadiah periode berjalan dibayarkan ke pemilik dan kontributor sesuai tingkat. Tindakan ini memasukkan coin ke dompet pemenang dan tidak bisa dibatalkan."
        tombol="Bagikan" sibuk={sibuk === "bagi"} onYa={bagikan} onTidak={() => setBagi(false)} />
    </>
  );
}

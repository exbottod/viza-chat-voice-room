import { useEffect, useRef, useState } from "react";
import { walletAdmin } from "../dompet.js";
import { unggahBerkas, bacaRtdbServer, tulisRtdbServer } from "../unggah.js";
import { catatLog } from "../data.js";
import { Panel, Pil, Rangka, Tag, toast } from "../ui.jsx";
import { ALAT } from "../alat.js";
import Alat from "./Alat.jsx";
import Roket from "./Roket.jsx";
import Reward from "./Reward.jsx";

/**
 * Menu Game: semua pengaturan game dikumpulkan di satu tempat dengan sub menu
 * ke bawah. Tiap sub menu memakai server yang sama dengan halaman lamanya,
 * jadi tidak ada perubahan di sisi aplikasi.
 *
 *  - Bet game  : chip bet game (Bikini, Greedy King, Crazy Fruit)
 *  - RTP game  : persentase RTP tiap game, terpisah dari chip bet
 *  - Banner    : banner kemenangan game (betCfg/gameWinBanner)
 *  - Kategori  : saklar tampil kategori "Game Viza" di Game Center
 */
const GAME = [
  { id: "bet", nama: "Bikini Wild Rush" },
  { id: "greedy", nama: "Greedy King" },
  { id: "fruit", nama: "Crazy Fruit" },
];

/** Bet: hanya chip bet. RTP dipisah di sub menu sendiri. */
function BetGame() {
  const [pilih, setPilih] = useState("bet");
  const spec = ALAT[pilih];
  const hanyaBet = { ...spec, medan: spec.medan.filter((m) => !/^rtp$/i.test(m.k)), ket: "Daftar chip bet yang tampil di game. Game membaca nilai ini saat dibuka, tanpa build APK. RTP diatur di sub menu RTP game." };
  return (
    <>
      <div className="filter" style={{ marginBottom: 12 }}>
        {GAME.map((g) => <Pil key={g.id} on={pilih === g.id} onClick={() => setPilih(g.id)}>{g.nama}</Pil>)}
      </div>
      <Alat key={pilih} spec={hanyaBet} judul={"Bet " + GAME.find((g) => g.id === pilih).nama} />
    </>
  );
}

/** RTP: hanya persentase RTP. Chip bet dikirim apa adanya agar tidak hilang. */
function RtpGame() {
  const [pilih, setPilih] = useState("bet");
  const spec = ALAT[pilih];
  const hanyaRtp = { ...spec, medan: spec.medan.filter((m) => /^rtp$/i.test(m.k)), ket: "RTP game. Bikini: 100% membuat scater 5 sering turun, 95% scater 4, 85% standar. Greedy King dan Crazy Fruit memakai persen biasa." };
  return (
    <>
      <div className="filter" style={{ marginBottom: 12 }}>
        {GAME.map((g) => <Pil key={g.id} on={pilih === g.id} onClick={() => setPilih(g.id)}>{g.nama}</Pil>)}
      </div>
      <Alat key={pilih} spec={hanyaRtp} judul={"RTP " + GAME.find((g) => g.id === pilih).nama} />
    </>
  );
}

/** Banner kemenangan game: unggah gambar atau tempel tautan. */
function BannerGame() {
  const [url, setUrl] = useState("");
  const [memuat, setMemuat] = useState(true);
  const [sibuk, setSibuk] = useState(false);
  const [progres, setProgres] = useState("");
  const [lokal, setLokal] = useState("");
  const alamat = useRef("");

  useEffect(() => {
    (async () => {
      try { const r = await walletAdmin({ op: "win_banner_get" }); setUrl(String(r.url || "")); }
      catch (e) { toast("Gagal membaca banner: " + (e.message || e), true); }
      finally { setMemuat(false); }
    })();
    return () => { if (alamat.current) URL.revokeObjectURL(alamat.current); };
  }, []);

  const pilihBerkas = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (alamat.current) URL.revokeObjectURL(alamat.current);
    alamat.current = URL.createObjectURL(f);
    setLokal(alamat.current);
    setSibuk(true); setProgres("mengunggah 0%");
    try {
      const u = await unggahBerkas(f, "game-banner", (p) => setProgres("mengunggah " + p + "%"));
      setUrl(u);
      toast("Gambar terunggah, tekan Simpan untuk menerapkan");
    } catch (er) { toast("Gagal unggah: " + (er.message || er), true); }
    finally { setSibuk(false); setProgres(""); }
  };

  const simpan = async (nilai) => {
    setSibuk(true);
    try {
      await walletAdmin({ op: "win_banner_set", url: nilai.trim() });
      await catatLog("Banner game", nilai.trim() ? nilai.trim().slice(0, 120) : "dikosongkan");
      toast(nilai.trim() ? "Banner game disimpan" : "Banner game dikosongkan");
      if (!nilai.trim()) { setUrl(""); setLokal(""); }
    } catch (e) { toast("Gagal: " + (e.message || e), true); }
    finally { setSibuk(false); }
  };

  const tampil = lokal || url;
  return (
    <Panel judul="Banner game" sub="Banner kemenangan yang tampil di game dan room. Unggah gambar atau tempel tautan, lalu Simpan. Aplikasi membacanya dari server tanpa build APK."
      aksi={<button className="tombolBaru" onClick={() => simpan(url)} disabled={sibuk || memuat}>{sibuk ? (progres || "Menyimpan…") : "Simpan"}</button>}>
      {memuat ? <Rangka baris={3} /> : (
        <>
          <div style={{ height: 150, borderRadius: 5, border: "1px solid #2b2b3a", background: "#181821", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", marginBottom: 12 }}>
            {tampil ? <img src={tampil} alt="Banner game" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
              : <span className="catatan" style={{ padding: 0 }}>Belum ada banner</span>}
          </div>
          <label className="isianForm"><span>Gambar banner (PNG, JPG, WebP, GIF · maks 8 MB)</span>
            <input type="file" accept="image/*" onChange={pilihBerkas} />
          </label>
          <label className="isianForm"><span>Atau tempel tautan gambar</span>
            <input value={url} onChange={(e) => { setUrl(e.target.value); setLokal(""); }} placeholder="https://…" />
          </label>
          {url ? <button className="polos" disabled={sibuk} onClick={() => simpan("")}>Kosongkan banner</button> : null}
        </>
      )}
    </Panel>
  );
}

/**
 * Kategori game. Daftar game di aplikasi tertanam di kode, dan satu-satunya
 * pengaturan kategori yang dibaca aplikasi adalah gameCfg/ownOff (saklar
 * kategori "Game Viza"). Saklar itu yang bisa diubah di sini.
 */
function KategoriGame() {
  const [ownOff, setOwnOff] = useState(null);
  const [sibuk, setSibuk] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const d = await bacaRtdbServer("gameCfg");
        setOwnOff(typeof d?.ownOff === "boolean" ? d.ownOff : true);
      } catch (e) { setOwnOff(true); toast("Gagal membaca kategori: " + (e.message || e), true); }
    })();
  }, []);

  const ubah = async (nilai) => {
    setSibuk(true);
    try {
      await tulisRtdbServer("gameCfg/ownOff", nilai);
      setOwnOff(nilai);
      await catatLog("Kategori game", "Game Viza " + (nilai ? "disembunyikan" : "ditampilkan"));
      toast("Game Viza " + (nilai ? "disembunyikan" : "ditampilkan"));
    } catch (e) { toast("Gagal: " + (e.message || e), true); }
    finally { setSibuk(false); }
  };

  const kategori = [
    { nama: "Game Viza", isi: "Greedy King, Crazy Fruit, Slot Zeus (memakai dompet Viza)", saklar: true },
    { nama: "Game pihak ketiga", isi: "Greedy, Bikini Wild Rush (dibuka di dalam aplikasi)", saklar: false },
  ];

  return (
    <Panel judul="Kategori game" sub="Kategori yang tampil di Game Center aplikasi. Kategori Game Viza bisa ditampilkan atau disembunyikan dari sini; daftar game di dalamnya tertanam di aplikasi.">
      {ownOff === null ? <Rangka baris={3} /> : kategori.map((k) => {
        const tampil = k.saklar ? ownOff === false : true;
        return (
          <div key={k.nama} className="barisSaklar" style={{ alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid #2b2b3a" }}>
            <span style={{ flex: "1 1 auto", minWidth: 0 }}>
              <b style={{ fontSize: 13 }}>{k.nama}</b>
              <div className="catatan" style={{ padding: 0 }}>{k.isi}</div>
            </span>
            <Tag jenis={tampil ? "aktif" : "mati"}>{tampil ? "Tampil" : "Disembunyikan"}</Tag>
            {k.saklar ? (
              <button className="pil on" disabled={sibuk} onClick={() => ubah(!ownOff)}>{ownOff ? "Tampilkan" : "Sembunyikan"}</button>
            ) : null}
          </div>
        );
      })}
    </Panel>
  );
}

export const GAME_HALAMAN = {
  gamebet: BetGame,
  gamertp: RtpGame,
  gamebanner: BannerGame,
  gamekategori: KategoriGame,
  gameroket: () => <Roket />,
  gamereward: () => <Reward />,
};

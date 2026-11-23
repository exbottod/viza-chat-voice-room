import { useEffect, useState } from "react";
import { walletAdmin } from "../dompet.js";
import { catatLog, rupiah } from "../data.js";
import { Kartu, Panel, Rangka, toast } from "../ui.jsx";
import { unggahBerkas } from "../unggah.js";

/**
 * Iklan berhadiah untuk coin gratis. Aplikasi menampilkan iklan Unity Ads
 * (format Rewarded), lalu memanggil server (op iklan_klaim) untuk menambah
 * coin setelah iklan selesai ditonton. Hadiah, batas harian, jeda, Game ID,
 * dan Placement ID diatur di sini supaya bisa diubah tanpa build APK.
 *
 * Catatan penghasilan: pendapatan iklan dihitung dari eCPM per 1.000 tayangan.
 * Hadiah coin harus lebih kecil dari pendapatan per tayangan, kalau tidak
 * pengeluaran coin lebih besar dari uang iklan yang masuk.
 */
export default function Iklan() {
  const [stat, setStat] = useState(null);
  const [galat, setGalat] = useState("");
  const [form, setForm] = useState(null);
  const [sibuk, setSibuk] = useState(false);
  // Gambar banner iklan di tab Party: bisa diganti kapan saja dari sini.
  const [berkasBanner, setBerkasBanner] = useState(null);
  const [alamatBanner, setAlamatBanner] = useState("");
  const [progresBanner, setProgresBanner] = useState("");
  useEffect(() => {
    if (!berkasBanner) { setAlamatBanner(""); return; }
    const u = URL.createObjectURL(berkasBanner);
    setAlamatBanner(u);
    return () => URL.revokeObjectURL(u);
  }, [berkasBanner]);

  const muat = async () => {
    try {
      const out = await walletAdmin({ op: "iklan_stat" });
      setStat(out);
      setForm({
        aktif: Number(out.atur?.aktif ? 1 : 0),
        coin: String(out.atur?.coin ?? 100),
        maxHari: String(out.atur?.maxHari ?? 10),
        jeda: String(out.atur?.jeda ?? 20),
        adUnit: String(out.atur?.adUnit || ""),
        gameId: String(out.atur?.gameId || ""),
        placement: String(out.atur?.placement || ""),
        uji: Number(out.atur?.uji ? 1 : 0),
        banner: String(out.atur?.banner || ""),
      });
      setGalat("");
    } catch (e) { setStat(null); setGalat(e.message || String(e)); }
  };
  useEffect(() => { muat(); }, []);

  const simpan = async () => {
    setSibuk(true);
    try {
      if (berkasBanner) {
        setProgresBanner("mengunggah banner…");
        const url = await unggahBerkas(berkasBanner, "iklan", (p) => setProgresBanner("banner " + p + "%"));
        setForm((f) => ({ ...f, banner: url }));
        setBerkasBanner(null);
        setProgresBanner("");
      }
      const nilai = {
        iklanAktif: form.aktif ? "1" : "0",
        iklanCoin: String(Math.max(0, Math.trunc(Number(form.coin) || 0))),
        iklanMaxHari: String(Math.max(0, Math.trunc(Number(form.maxHari) || 0))),
        iklanCooldown: String(Math.max(10, Math.trunc(Number(form.jeda) || 20))),
        iklanAdUnit: String(form.adUnit || "").trim(),
        iklanGameId: String(form.gameId || "").trim(),
        iklanPlacement: String(form.placement || "").trim(),
        iklanUji: form.uji ? "1" : "0",
        iklanBanner: String(form.banner || "").trim(),
      };
      // Server lama hanya mengenal sebagian kunci. Bila satu kunci ditolak,
      // kunci itu dibuang lalu sisanya dikirim ulang, supaya isian lain tetap
      // tersimpan dan pemilik tahu kunci mana yang belum didukung server.
      const ditolak = [];
      for (let i = 0; i < 6; i++) {
        const out = await walletAdmin({ op: "cfg_set", nilai });
        if (Number(out?.ok) === 1) break;
        const m = /Kunci tidak dikenal: (\w+)/.exec(String(out?.e || ""));
        if (!m || !(m[1] in nilai)) throw new Error(out?.e || "Server menolak pengaturan iklan");
        ditolak.push(m[1]);
        delete nilai[m[1]];
        if (!Object.keys(nilai).length) throw new Error("Server belum mendukung pengaturan iklan");
      }
      if (ditolak.length) {
        toast("Tersimpan sebagian. Server belum mengenal: " + ditolak.join(", ") + ". Jalankan dompet.sh lalu simpan lagi.", true);
      } else {
        toast("Pengaturan iklan disimpan");
      }
      await catatLog("Atur iklan coin gratis", (form.aktif ? "aktif" : "mati") + " · " + form.coin + " coin/iklan · " + form.maxHari + "x/hari");
      await muat();
    } catch (e) { toast("Gagal: " + (e.message || e), true); }
    finally { setSibuk(false); }
  };

  return (
    <>
      <Kartu isi={[
        [rupiah(stat?.hari?.n ?? 0), "Iklan ditonton 24 jam"],
        [rupiah(stat?.hari?.coins ?? 0), "Coin dibagikan 24 jam"],
        [rupiah(stat?.hari?.orang ?? 0), "Penonton 24 jam"],
        [rupiah(stat?.total?.coins ?? 0), "Total coin iklan"],
      ]} />

      <Panel judul="Iklan & coin gratis"
        sub="Coin gratis diberikan setelah user selesai menonton iklan berhadiah (Unity Ads, format Rewarded). Server membatasi jumlah klaim per hari dan memberi jeda antar klaim, jadi coin tidak bisa diambil berulang tanpa menonton. Game ID dan Placement ID di bawah dibaca aplikasi dari server, jadi bisa diganti kapan saja tanpa build APK baru.">
        {galat ? <div className="kosong">Server dompet belum menjawab: {galat}</div> : null}
        {!form ? <Rangka baris={4} /> : (
          <>
            <div className="barisSaklar"><b>Iklan coin gratis aktif</b>
              <button type="button" className={"saklar" + (form.aktif ? " nyala" : "")}
                onClick={() => setForm({ ...form, aktif: form.aktif ? 0 : 1 })}><i /></button>
            </div>
            <div className="barisSaklar"><b>Mode uji (log rinci Unity Ads)</b>
              <button type="button" className={"saklar" + (form.uji ? " nyala" : "")}
                onClick={() => setForm({ ...form, uji: form.uji ? 0 : 1 })}><i /></button>
            </div>
            <label className="isianForm"><span>Coin per iklan selesai</span>
              <input value={form.coin} onChange={(e) => setForm({ ...form, coin: e.target.value })} inputMode="numeric" /></label>
            <label className="isianForm"><span>Batas tonton per hari</span>
              <input value={form.maxHari} onChange={(e) => setForm({ ...form, maxHari: e.target.value })} inputMode="numeric" /></label>
            <label className="isianForm"><span>Jeda antar iklan (detik)</span>
              <input value={form.jeda} onChange={(e) => setForm({ ...form, jeda: e.target.value })} inputMode="numeric" /></label>
            <label className="isianForm"><span>Unity Game ID (Android)</span>
              <input value={form.gameId} placeholder="800448611" inputMode="numeric"
                onChange={(e) => setForm({ ...form, gameId: e.target.value })} /></label>
            <label className="isianForm"><span>Placement ID Rewarded</span>
              <input value={form.placement} placeholder="BP_Rewarded_Android"
                onChange={(e) => setForm({ ...form, placement: e.target.value })} /></label>
            <div className="catatan">
              Kedua nilai ini ada di dashboard Unity: menu Monetization, buka app Viza Chat,
              lalu bagian app key (Game ID) dan daftar Placements (Placement ID Rewarded).
              Selama kolom dibiarkan kosong, aplikasi memakai nilai bawaan di server.
            </div>
            <div className="kotakPratinjau">
              <div className="judulPratinjau">Banner iklan di tab Party (rasio 3:1, mis. 720×240)</div>
              <div className="isiPratinjau">
                {(() => {
                  const src = alamatBanner || form.banner;
                  if (!src) return <div className="ikonPratinjau"><span style={{ fontSize: 32 }}>🖼️</span><i>Belum ada banner, dipakai gambar bawaan APK</i></div>;
                  return <img src={src} alt="Banner iklan" style={{ maxWidth: "100%", borderRadius: 10 }} />;
                })()}
                <div className="ketPratinjau">
                  <b>{berkasBanner ? berkasBanner.name : form.banner ? form.banner.split("/").pop() : "Gambar bawaan APK"}</b>
                  {berkasBanner ? <span>{Math.max(1, Math.round(berkasBanner.size / 1024))} KB</span> : null}
                  <input type="file" accept="image/*" onChange={(e) => setBerkasBanner(e.target.files?.[0] || null)} />
                  <span>PNG, JPG, GIF, atau WebP. Banner ini jadi geseran nomor satu di tab Party.</span>
                </div>
                {form.banner ? (
                  <button type="button" className="pil"
                    onClick={() => { setBerkasBanner(null); setForm({ ...form, banner: "" }); toast("Banner dikosongkan, kembali ke gambar bawaan"); }}>
                    Hapus banner
                  </button>
                ) : null}
              </div>
            </div>
            {progresBanner ? <div className="catatan">{progresBanner}</div> : null}
            <div className="catatan">
              Mode uji menyalakan log rinci SDK Unity Ads di HP dan membuat pesan galat
              menampilkan kode Unity (mis. NO_FILL atau VIDEO_PLAYER_ERROR). Iklan uji
              resmi tetap diatur di dashboard Unity; saklar ini untuk membaca penyebab
              kalau iklan tidak mau tampil.
            </div>
            <div className="catatan">
              Hadiah 100 coin dengan 10 tonton per hari berarti maksimal 1.000 coin gratis per user per hari.
              Bandingkan dengan harga paket coin: hadiah per iklan sebaiknya di bawah pendapatan iklan per tayangan,
              supaya coin gratis tidak melebihi uang iklan yang masuk.
            </div>
            <button className="tombolBaru" onClick={simpan} disabled={sibuk}>{sibuk ? "Menyimpan…" : "Simpan pengaturan iklan"}</button>
          </>
        )}
      </Panel>
    </>
  );
}

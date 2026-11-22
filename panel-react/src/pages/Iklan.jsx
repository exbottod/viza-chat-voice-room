import { useEffect, useState } from "react";
import { walletAdmin } from "../dompet.js";
import { catatLog, rupiah } from "../data.js";
import { Kartu, Panel, Rangka, toast } from "../ui.jsx";

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
      });
      setGalat("");
    } catch (e) { setStat(null); setGalat(e.message || String(e)); }
  };
  useEffect(() => { muat(); }, []);

  const simpan = async () => {
    setSibuk(true);
    try {
      await walletAdmin({ op: "cfg_set", cfg: {
        iklanAktif: form.aktif ? "1" : "0",
        iklanCoin: String(Math.max(0, Math.trunc(Number(form.coin) || 0))),
        iklanMaxHari: String(Math.max(0, Math.trunc(Number(form.maxHari) || 0))),
        iklanCooldown: String(Math.max(10, Math.trunc(Number(form.jeda) || 20))),
        iklanAdUnit: String(form.adUnit || "").trim(),
        iklanGameId: String(form.gameId || "").trim(),
        iklanPlacement: String(form.placement || "").trim(),
      } });
      await catatLog("Atur iklan coin gratis", (form.aktif ? "aktif" : "mati") + " · " + form.coin + " coin/iklan · " + form.maxHari + "x/hari");
      toast("Pengaturan iklan disimpan");
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

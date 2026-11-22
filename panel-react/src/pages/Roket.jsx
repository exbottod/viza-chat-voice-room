import { useEffect, useState } from "react";
import { walletAdmin } from "../dompet.js";
import { catatLog, rupiah } from "../data.js";
import { Panel, Rangka, toast } from "../ui.jsx";

const LEVEL = [1, 2, 3, 4, 5];
const SLOT = [1, 2, 3, 4, 5, 6];
const PERINGKAT = [
  [1, "Top 1"], [2, "Top 2"], [3, "Top 3"], [4, "Top 4 dan seterusnya"],
];
const EXP_BAKU = [100000000, 500000000, 1000000000, 1500000000, 2000000000];

const kosongHadiah = () => ({ coins: "0", vip: "0", days: "30" });
const dariServer = (x) => ({
  coins: String(Number(x?.coins) || 0),
  vip: String(Number(x?.vip) || 0),
  days: String(x?.days === undefined ? 30 : Number(x.days) || 0),
});
const angka = (v) => Math.max(0, Math.floor(Number(String(v).replace(/[^0-9]/g, "")) || 0));

const gayaIsi = {
  width: "100%", padding: "7px 9px", background: "#181821", color: "#fff",
  border: "1px solid #2b2b3a", borderRadius: 5, fontSize: 13, boxSizing: "border-box",
};
const gayaLabel = { fontSize: 11, color: "#9a9cab", marginBottom: 3 };

/** Satu baris hadiah: coin, level VIP (0 = tanpa VIP), lama VIP dalam hari. */
function BarisHadiah({ nama, nilai, onUbah }) {
  const set = (k, v) => onUbah({ ...nilai, [k]: v.replace(/[^0-9]/g, "") });
  return (
    <div style={{ display: "grid", gridTemplateColumns: "64px 1fr 62px 62px", gap: 8, alignItems: "end", marginBottom: 8 }}>
      <div style={{ fontSize: 12, color: "#cfd0da", paddingBottom: 8 }}>{nama}</div>
      <div>
        <div style={gayaLabel}>Coin{angka(nilai.coins) ? " (" + rupiah(angka(nilai.coins)) + ")" : ""}</div>
        <input style={gayaIsi} inputMode="numeric" value={nilai.coins} onChange={(e) => set("coins", e.target.value)} />
      </div>
      <div>
        <div style={gayaLabel}>VIP 0-9</div>
        <input style={gayaIsi} inputMode="numeric" value={nilai.vip} onChange={(e) => set("vip", e.target.value)} />
      </div>
      <div>
        <div style={gayaLabel}>Hari</div>
        <input style={gayaIsi} inputMode="numeric" value={nilai.days} onChange={(e) => set("days", e.target.value)} />
      </div>
    </div>
  );
}

/**
 * Hadiah roket: energi (EXP) tiap level 1-5, enam hadiah yang diundi saat roket
 * level itu diluncurkan, dan hadiah peringkat Top 1-4. Semuanya disimpan lewat
 * server dompet (rocket_cfg_set) ke dua tempat yang dibaca aplikasi dan server.
 */
export default function Roket() {
  const [exp, setExp] = useState(EXP_BAKU.map(String));
  const [lv, setLv] = useState(null);
  const [rank, setRank] = useState(null);
  const [tab, setTab] = useState(1);
  const [sibuk, setSibuk] = useState(false);
  const [galat, setGalat] = useState("");

  const muat = async () => {
    setLv(null); setGalat("");
    try {
      const out = await walletAdmin({ op: "rocket_cfg_get" });
      setExp(LEVEL.map((n) => String(Number(out.exp?.[n - 1]) || EXP_BAKU[n - 1])));
      const l = {};
      LEVEL.forEach((n) => {
        l[n] = {};
        SLOT.forEach((k) => { l[n][k] = dariServer(out.lv?.[n]?.["r" + k]); });
      });
      setLv(l);
      const r = {};
      PERINGKAT.forEach(([k]) => { r[k] = dariServer(out.rank?.[k]); });
      setRank(r);
    } catch (e) {
      setGalat(e.message || String(e));
      const l = {};
      LEVEL.forEach((n) => { l[n] = {}; SLOT.forEach((k) => { l[n][k] = kosongHadiah(); }); });
      setLv(l);
      const r = {};
      PERINGKAT.forEach(([k]) => { r[k] = kosongHadiah(); });
      setRank(r);
    }
  };
  useEffect(() => { muat(); }, []);

  const simpan = async () => {
    setSibuk(true);
    try {
      const keServer = (h) => ({ coins: angka(h.coins), vip: Math.min(9, angka(h.vip)), days: angka(h.days) });
      const lvOut = {};
      LEVEL.forEach((n) => {
        lvOut[n] = {};
        SLOT.forEach((k) => { lvOut[n]["r" + k] = keServer(lv[n][k]); });
      });
      const rankOut = {};
      PERINGKAT.forEach(([k]) => { rankOut[k] = keServer(rank[k]); });
      const expOut = exp.map((x) => angka(x));
      await walletAdmin({ op: "rocket_cfg_set", exp: expOut, lv: lvOut, rank: rankOut }, 30000);
      await catatLog("Hadiah roket", "EXP " + expOut.join(", "));
      toast("Hadiah roket tersimpan");
      await muat();
    } catch (e) {
      toast("Gagal: " + (e.message || e), true);
    } finally { setSibuk(false); }
  };

  return (
    <Panel judul="Hadiah roket"
      sub="Energi tiap level roket, enam hadiah yang diundi saat roket diluncurkan, dan hadiah peringkat. Berlaku tanpa build ulang."
      aksi={<button className="tombolBaru" onClick={simpan} disabled={sibuk || lv === null}>{sibuk ? "Menyimpan…" : "Simpan"}</button>}>
      {galat ? <div className="kosong" style={{ marginBottom: 12 }}>Belum bisa memuat dari server: {galat}</div> : null}
      {lv === null || rank === null ? <Rangka baris={5} /> : (
        <>
          <div style={{ fontWeight: 600, margin: "4px 0 8px" }}>Energi (EXP) tiap level</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 8, marginBottom: 18 }}>
            {LEVEL.map((n) => (
              <div key={n}>
                <div style={gayaLabel}>Roket level {n}{angka(exp[n - 1]) ? " (" + rupiah(angka(exp[n - 1])) + ")" : ""}</div>
                <input style={gayaIsi} inputMode="numeric" value={exp[n - 1]}
                  onChange={(e) => { const a = [...exp]; a[n - 1] = e.target.value.replace(/[^0-9]/g, ""); setExp(a); }} />
              </div>
            ))}
          </div>

          <div style={{ fontWeight: 600, margin: "4px 0 4px" }}>Hadiah saat roket diluncurkan</div>
          <div style={{ fontSize: 12, color: "#9a9cab", marginBottom: 8 }}>
            Tiap level punya 6 hadiah, satu dipilih acak. Isi coin 0 bila slot tidak dipakai. VIP 0 berarti tanpa VIP.
          </div>
          <div className="filter" style={{ marginBottom: 12 }}>
            {LEVEL.map((n) => (
              <div key={n} className={"pil" + (tab === n ? " on" : "")} onClick={() => setTab(n)}>Level {n}</div>
            ))}
          </div>
          {SLOT.map((k) => (
            <BarisHadiah key={tab + "-" + k} nama={"Hadiah " + k} nilai={lv[tab][k]}
              onUbah={(v) => setLv({ ...lv, [tab]: { ...lv[tab], [k]: v } })} />
          ))}

          <div style={{ fontWeight: 600, margin: "20px 0 8px" }}>Hadiah peringkat</div>
          {PERINGKAT.map(([k, nama]) => (
            <BarisHadiah key={k} nama={nama} nilai={rank[k]}
              onUbah={(v) => setRank({ ...rank, [k]: v })} />
          ))}
        </>
      )}
    </Panel>
  );
}

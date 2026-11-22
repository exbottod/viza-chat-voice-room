import { useEffect, useState } from "react";
import { walletAdmin } from "../dompet.js";
import { catatLog } from "../data.js";
import { Panel, Rangka, toast } from "../ui.jsx";

const angkaDaftar = (t) => String(t).split(",").map((x) => Number(x.trim())).filter((x) => Number.isFinite(x));

export default function Alat({ spec, judul }) {
  const [isi, setIsi] = useState(null);
  const [teks, setTeks] = useState({});
  const [json, setJson] = useState("");
  const [galat, setGalat] = useState("");
  const [sibuk, setSibuk] = useState(false);

  const muat = async () => {
    try {
      const out = await walletAdmin({ op: spec.get });
      const data = spec.akar ? (out[spec.akar] || {}) : { ...out };
      delete data.ok;
      setIsi(data);
      setJson(JSON.stringify(data, null, 2));
      const awal = {};
      (spec.medan || []).forEach((m) => {
        const v = data[m.k];
        awal[m.k] = Array.isArray(v) ? v.join(", ") : (v ?? "");
      });
      setTeks(awal);
      setGalat("");
    } catch (e) {
      setGalat(e.message || String(e));
      setIsi({});
    }
  };
  useEffect(() => { muat(); }, [spec.get]);

  const simpan = async () => {
    setSibuk(true);
    try {
      let nilai;
      if (spec.medan) {
        nilai = { ...isi };
        for (const m of spec.medan) {
          const t = teks[m.k];
          nilai[m.k] = m.jenis === "angkaDaftar" ? angkaDaftar(t)
            : m.jenis === "angka" ? Number(t) : m.jenis === "pilih" ? Number(t) : String(t ?? "").trim();
        }
      } else {
        nilai = JSON.parse(json);
      }
      await walletAdmin({ op: spec.set, ...nilai });
      await catatLog("Ubah " + (judul || spec.judul), JSON.stringify(nilai).slice(0, 180));
      toast((judul || spec.judul) + " disimpan");
      await muat();
    } catch (e) {
      toast("Gagal: " + (e.message || e), true);
    } finally { setSibuk(false); }
  };

  if (isi === null) return <Rangka baris={5} />;

  return (
    <Panel judul={judul || spec.judul} sub={spec.ket}
      aksi={<button className="tombolBaru" onClick={simpan} disabled={sibuk}>{sibuk ? "Menyimpan…" : "Simpan"}</button>}>
      {galat ? <div className="kosong">Belum bisa dimuat: {galat}</div> : null}
      {spec.medan ? spec.medan.map((m) => (
        <label className="isianForm" key={m.k}>
          <span>{m.label}</span>
          {m.jenis === "pilih" ? (
            <select value={teks[m.k]} onChange={(e) => setTeks({ ...teks, [m.k]: e.target.value })}>
              {m.opsi.map(([v, t]) => <option key={v} value={v}>{t}</option>)}
            </select>
          ) : (
            <input value={teks[m.k] ?? ""} onChange={(e) => setTeks({ ...teks, [m.k]: e.target.value })}
              inputMode={m.jenis === "angka" || m.jenis === "angkaDaftar" ? "numeric" : "text"} />
          )}
        </label>
      )) : (
        <label className="isianForm">
          <span>Isi pengaturan (JSON)</span>
          <textarea rows={14} value={json} onChange={(e) => setJson(e.target.value)} spellCheck={false} />
        </label>
      )}
    </Panel>
  );
}

// Perangkat tampilan bersama untuk semua halaman panel React.
import { useEffect, useMemo, useState } from "react";

const KANAL = "viza-toast";
export function toast(pesan, gagal = false) {
  window.dispatchEvent(new CustomEvent(KANAL, { detail: { pesan, gagal } }));
}

export function Toast() {
  const [isi, setIsi] = useState(null);
  useEffect(() => {
    let jam;
    const dengar = (e) => {
      setIsi(e.detail);
      clearTimeout(jam);
      jam = setTimeout(() => setIsi(null), 3600);
    };
    window.addEventListener(KANAL, dengar);
    return () => { window.removeEventListener(KANAL, dengar); clearTimeout(jam); };
  }, []);
  if (!isi) return null;
  return <div className={"toast tampil" + (isi.gagal ? " gagal" : "")}>{isi.pesan}</div>;
}

export const Kartu = ({ isi }) => (
  <div className="kartu">
    {isi.map(([angka, label]) => (
      <div className="stat" key={label}><b>{angka}</b><span>{label}</span></div>
    ))}
  </div>
);

export const Panel = ({ judul, sub, aksi, kaki, children }) => (
  <div className="panel">
    <div className="panelAtas">
      <h3>{judul}{sub ? <span className="sub"> {sub}</span> : null}</h3>
      {aksi ? <div className="filter">{aksi}</div> : null}
    </div>
    {children}
    {kaki ? <div className="kaki">{kaki}</div> : null}
  </div>
);

export const Pil = ({ on, onClick, children }) => (
  <div className={"pil" + (on ? " on" : "")} onClick={onClick}>{children}</div>
);

export const Tag = ({ jenis = "aktif", children }) => <span className={"tag " + jenis}>{children}</span>;

export const Kosong = ({ children }) => <div className="kosong">{children}</div>;

/** Kotak cari dengan ikon, dipakai di semua halaman alat. */
export const Cari = ({ nilai, onUbah, placeholder }) => (
  <label className="kotakCari">
    <span>⌕</span>
    <input value={nilai} onChange={(e) => onUbah(e.target.value)} placeholder={placeholder} />
    {nilai ? <button type="button" onClick={() => onUbah("")} title="Bersihkan">×</button> : null}
  </label>
);

/** Laci detail dari kanan: dipakai untuk detail user, room, dan gift. */
export function Laci({ buka, judul, onTutup, children, kaki }) {
  useEffect(() => {
    if (!buka) return;
    const esc = (e) => e.key === "Escape" && onTutup();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [buka, onTutup]);
  if (!buka) return null;
  return (
    <div className="laciLatar" onClick={onTutup}>
      <div className="laci" onClick={(e) => e.stopPropagation()}>
        <div className="laciAtas">
          <h3>{judul}</h3>
          <button onClick={onTutup} title="Tutup">×</button>
        </div>
        <div className="laciIsi">{children}</div>
        {kaki ? <div className="laciKaki">{kaki}</div> : null}
      </div>
    </div>
  );
}

export function Konfirmasi({ buka, judul, pesan, tombol = "Lanjut", onYa, onTidak, sibuk }) {
  if (!buka) return null;
  return (
    <div className="laciLatar" onClick={onTidak}>
      <div className="kotakKonfirmasi" onClick={(e) => e.stopPropagation()}>
        <h3>{judul}</h3>
        <p>{pesan}</p>
        <div className="barisTombol">
          <button className="polos" onClick={onTidak} disabled={sibuk}>Batal</button>
          <button className="utama" onClick={onYa} disabled={sibuk}>{sibuk ? "Memproses…" : tombol}</button>
        </div>
      </div>
    </div>
  );
}

/** Kerangka baris saat data pertama kali diambil. */
export const Rangka = ({ baris = 6 }) => (
  <div style={{ padding: 14 }}>
    {Array.from({ length: baris }).map((_, i) => (
      <div className="rangka" key={i} style={{ width: 100 - (i % 3) * 12 + "%" }} />
    ))}
  </div>
);

/** Tabel dengan kepala melekat saat digulir dan pengurutan lewat klik judul. */
export function Tabel({ kolom, baris, urut, onUrut, kosong = "Tidak ada data." }) {
  const [kunci, arah] = urut || [null, 1];
  const panah = (k) => (kunci === k ? (arah === 1 ? " ▲" : " ▼") : "");
  if (!baris.length) return <Kosong>{kosong}</Kosong>;
  return (
    <div className="bungkusTabel">
      <table>
        <thead>
          <tr>
            {kolom.map((k) => (
              <th key={k.kunci} onClick={k.urut && onUrut ? () => onUrut(k.kunci) : undefined}
                  style={k.urut ? { cursor: "pointer" } : undefined}>
                {k.label}{k.urut ? panah(k.kunci) : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {baris.map((b, i) => (
            <tr key={b.__kunci ?? i}>{kolom.map((k) => <td key={k.kunci}>{k.sel(b)}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Urutkan daftar berdasarkan satu kunci, mendukung angka dan teks. */
export function pakaiUrut(baris, awal = null) {
  const [urut, setUrut] = useState(awal);
  const hasil = useMemo(() => {
    if (!urut) return baris;
    const [kunci, arah] = urut;
    return [...baris].sort((a, b) => {
      const x = a[kunci], y = b[kunci];
      if (typeof x === "number" || typeof y === "number") return ((Number(x) || 0) - (Number(y) || 0)) * arah;
      return String(x ?? "").localeCompare(String(y ?? ""), "id") * arah;
    });
  }, [baris, urut]);
  const klik = (kunci) => setUrut((u) => (u && u[0] === kunci ? [kunci, -u[1]] : [kunci, 1]));
  return [hasil, urut, klik];
}

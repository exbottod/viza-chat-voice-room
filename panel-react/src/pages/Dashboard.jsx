import { useMemo, useState } from "react";
import { useKoleksi, rupiah, waktu } from "../data.js";

/** Grafik batang tanpa pustaka luar, warnanya mengikuti tema panel acuan. */
function Grafik({ sumber, hari, satuan }) {
  const kolom = useMemo(() => {
    const mulai = new Date();
    mulai.setHours(0, 0, 0, 0);
    const hasil = [];
    for (let i = hari - 1; i >= 0; i--) {
      const t = new Date(mulai.getTime() - i * 86400000);
      const besok = new Date(t.getTime() + 86400000);
      hasil.push({
        label: t.getDate() + "/" + (t.getMonth() + 1),
        n: sumber.filter((ms) => ms >= t.getTime() && ms < besok.getTime()).length,
      });
    }
    return hasil;
  }, [sumber, hari]);

  const total = kolom.reduce((a, k) => a + k.n, 0);
  const maks = Math.max(1, ...kolom.map((k) => k.n));
  if (!total) return <div className="kosong">Belum ada data untuk rentang ini.</div>;

  const tinggi = 200;
  const lebar = 100 / kolom.length;
  return (
    <>
      <div style={{ color: "#9a9cab", fontSize: 12, padding: "0 4px 8px" }}>{total} {satuan} · puncak {maks}</div>
      <svg viewBox={"0 0 100 " + (tinggi + 28)} preserveAspectRatio="none" style={{ width: "100%", height: 240, display: "block" }}>
        <defs>
          <linearGradient id="gradBatang" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e8538f" />
            <stop offset="100%" stopColor="#83d8ae" />
          </linearGradient>
        </defs>
        {kolom.map((k, i) => {
          const h = Math.max(2, Math.round((k.n / maks) * tinggi));
          return (
            <g key={k.label + i}>
              <rect x={i * lebar + lebar * 0.18 + "%"} y={tinggi - h} width={lebar * 0.64 + "%"} height={h} rx="2" fill="url(#gradBatang)" />
              <text x={(i + 0.5) * lebar + "%"} y={tinggi + 16} fill="#9a9cab" fontSize="10" textAnchor="middle">{k.label}</text>
              {k.n > 0 && (
                <text x={(i + 0.5) * lebar + "%"} y={tinggi - h - 6} fill="#d1d3e0" fontSize="10" textAnchor="middle">{k.n}</text>
              )}
            </g>
          );
        })}
      </svg>
    </>
  );
}

export default function Dashboard() {
  const [hari, setHari] = useState(7);
  const users = useKoleksi("userIds", 500);
  const rooms = useKoleksi("rooms", 500);
  const gifts = useKoleksi("gifts", 200);
  const banned = useKoleksi("banned", 200);
  const laporan = useKoleksi("userReports", 300);
  const logs = useKoleksi("adminLogs", 400);

  const vip = users.isi.filter((u) => Number(u.vip || 0) > 0).length;
  const diblokir = new Set(banned.isi.map((b) => b.id || b.uid)).size;
  const terkunci = rooms.isi.filter((r) => r.locked).length;

  const kartu = [
    ["people_alt", rupiah(users.isi.length), "Total user"],
    ["workspace_premium", rupiah(vip), "Total user VIP"],
    ["group_off", rupiah(diblokir), "User diblokir"],
    ["mic", rupiah(rooms.isi.length), "Total room"],
    ["lock", rupiah(terkunci), "Room terkunci"],
    ["flag", rupiah(laporan.isi.length), "Laporan user"],
    ["redeem", rupiah(gifts.isi.length), "Gift aktif"],
    ["bolt", String(logs.isi.length), "Catatan admin"],
  ];

  const dariLog = logs.isi.map((l) => Number(l.waktu?.seconds || 0) * 1000).filter((t) => t > 0);
  const dariUser = users.isi.map((u) => Number(u.createdAt || u.dibuat || 0)).filter((t) => t > 0);
  const pakaiLog = dariLog.length >= dariUser.length;
  const sumber = pakaiLog ? dariLog : dariUser;

  const urutLog = [...logs.isi].sort((a, b) => (b.waktu?.seconds || 0) - (a.waktu?.seconds || 0)).slice(0, 12);

  return (
    <>
      <div className="kartu">
        <div className="dasborKartu">
          {kartu.map(([ikon, angka, label]) => (
            <div className="kartuAngka" key={label}>
              <div className="ikonKartu">{ikon}</div>
              <div><b>{angka}</b><span>{label}</span></div>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <div className="panelAtas">
          <h3>{pakaiLog ? "Aktivitas admin " : "Pendaftaran user "}{hari} hari terakhir</h3>
          <div className="filter">
            {[7, 30].map((h) => (
              <div key={h} className={"pil" + (hari === h ? " on" : "")} onClick={() => setHari(h)}>{h} hari</div>
            ))}
          </div>
        </div>
        <div style={{ padding: "6px 4px 0" }}>
          <Grafik sumber={sumber} hari={hari} satuan={pakaiLog ? "catatan" : "user"} />
        </div>
      </div>

      <div className="panel">
        <div className="panelAtas"><h3>Aktivitas admin terakhir</h3><div className="filter"><div className="pil on">{logs.isi.length} catatan</div></div></div>
        {urutLog.length ? (
          <table>
            <thead><tr><th>WAKTU</th><th>ADMIN</th><th>AKSI</th><th>RINCIAN</th></tr></thead>
            <tbody>
              {urutLog.map((l, i) => (
                <tr key={i}><td>{waktu(l.waktu)}</td><td>{l.admin}</td><td>{l.aksi}</td><td>{l.rincian}</td></tr>
              ))}
            </tbody>
          </table>
        ) : <div className="kosong">Belum ada aktivitas tercatat.</div>}
      </div>

      <div className="panel">
        <div className="panelAtas"><h3>Room terbaru</h3><div className="filter"><div className="pil on"><a href="#room">Lihat semua</a></div></div></div>
        {rooms.isi.length ? (
          <table>
            <thead><tr><th>ROOM</th><th>PEMILIK</th><th>KUNCI</th></tr></thead>
            <tbody>
              {rooms.isi.slice(0, 8).map((r) => (
                <tr key={r.id}>
                  <td>{r.name || r.title || r.id}</td>
                  <td>{String(r.ownerUid || "").slice(0, 10)}…</td>
                  <td>{r.locked ? <span className="tag blokir">terkunci</span> : <span className="tag aktif">terbuka</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <div className="kosong">Belum ada room.</div>}
      </div>
    </>
  );
}

import { useEffect, useRef, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase.js";
import { useKoleksi, waktu } from "./data.js";

/** Tutup kotak kecil saat klik di luarnya atau menekan Esc. */
function pakaiTutupLuar(buka, tutup) {
  const ref = useRef(null);
  useEffect(() => {
    if (!buka) return;
    const klik = (e) => { if (ref.current && !ref.current.contains(e.target)) tutup(); };
    const esc = (e) => e.key === "Escape" && tutup();
    document.addEventListener("mousedown", klik);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", klik); document.removeEventListener("keydown", esc); };
  }, [buka, tutup]);
  return ref;
}

function Lonceng() {
  const [buka, setBuka] = useState(false);
  const [dilihat, setDilihat] = useState(() => Number(localStorage.getItem("viza-notif") || 0));
  const logs = useKoleksi("adminLogs", 400);
  const ref = pakaiTutupLuar(buka, () => setBuka(false));

  const urut = [...logs.isi]
    .map((l) => ({ ...l, ms: Number(l.waktu?.seconds || 0) * 1000 }))
    .sort((a, b) => b.ms - a.ms);
  const baru = urut.filter((l) => l.ms > dilihat).length;

  const toggle = () => {
    setBuka((b) => !b);
    if (!buka && urut[0]) {
      localStorage.setItem("viza-notif", String(urut[0].ms));
      setDilihat(urut[0].ms);
    }
  };

  return (
    <div className="kotakTopbar" ref={ref}>
      <button className="tombolLonceng" onClick={toggle} title="Notifikasi">
        <span className="material-icons">notifications_active</span>
        {baru > 0 ? <em>{baru > 99 ? "99+" : baru}</em> : null}
      </button>
      {buka ? (
        <div className="menuTurun lebar">
          <div className="menuTurunAtas">Aktivitas terbaru</div>
          {urut.length ? urut.slice(0, 8).map((l, i) => (
            <div className="barisNotif" key={i}>
              <b>{l.aksi}</b>
              <span>{l.rincian || "—"}</span>
              <small>{l.admin} · {waktu(l.waktu)}</small>
            </div>
          )) : <div className="barisNotif"><span>Belum ada aktivitas.</span></div>}
          <a className="menuTurunKaki" href="#log" onClick={() => setBuka(false)}>Lihat semua log</a>
        </div>
      ) : null}
    </div>
  );
}

function Profil({ admin }) {
  const [buka, setBuka] = useState(false);
  const ref = pakaiTutupLuar(buka, () => setBuka(false));
  const foto = auth.currentUser?.photoURL;
  const awal = (admin.nama || "A")[0].toUpperCase();

  return (
    <div className="kotakTopbar" ref={ref}>
      <button className="tombolFoto" onClick={() => setBuka((b) => !b)} title={admin.email}>
        {foto ? <img src={foto} alt="" referrerPolicy="no-referrer" /> : <span>{awal}</span>}
      </button>
      {buka ? (
        <div className="menuTurun">
          <div className="profilAtas">
            <div className="tombolFoto besar">
              {foto ? <img src={foto} alt="" referrerPolicy="no-referrer" /> : <span>{awal}</span>}
            </div>
            <div>
              <b>{admin.nama}</b>
              <span>{admin.email}</span>
              <em>{admin.peran}</em>
            </div>
          </div>
          <a className="menuTurunItem" href="#profile" onClick={() => setBuka(false)}>
            <span className="material-icons">person_outline</span> Profile
          </a>
          <a className="menuTurunItem" href="#setting" onClick={() => setBuka(false)}>
            <span className="material-icons">settings</span> Setting
          </a>
          <button className="menuTurunItem" onClick={() => signOut(auth)}>
            <span className="material-icons">logout</span> Logout
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default function KananTopbar({ admin }) {
  return (
    <div className="kananTopbar">
      <Lonceng />
      <Profil admin={admin} />
    </div>
  );
}

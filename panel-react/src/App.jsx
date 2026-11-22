import { useEffect, useState } from "react";
import {
  GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword,
  signInWithPopup, signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, PEMILIK } from "./firebase.js";
import { MENU, JUDUL } from "./menu.js";
import Dashboard from "./pages/Dashboard.jsx";
import Belum from "./pages/Belum.jsx";

const KETERANGAN = {
  dashboard: "Ringkasan user, room, gift, dan aktivitas admin",
  user: "Kelola akun, koin, dan blokir user",
  room: "Pantau room aktif, level, dan poin",
};

/** Halaman yang sudah dipindahkan ke React. Sisanya menyusul bertahap. */
const HALAMAN = { dashboard: Dashboard };

async function cekAdmin(user) {
  if (!user) return null;
  const email = (user.email || "").toLowerCase();
  const dasar = { email, nama: user.displayName || email.split("@")[0], peran: email === PEMILIK ? "owner" : "-", aktif: true };
  if (email === PEMILIK) return dasar;
  try {
    const d = await getDoc(doc(db, "panelAdmins", email));
    if (d.exists() && d.data().aktif !== false) {
      return { ...dasar, peran: d.data().peran || "admin", nama: d.data().nama || dasar.nama };
    }
  } catch (e) {
    console.warn("panelAdmins tidak terbaca:", e.code);
  }
  return null;
}

function pakaiHash() {
  const baca = () => (location.hash.replace("#", "") || "dashboard").split("?")[0];
  const [rute, setRute] = useState(baca);
  useEffect(() => {
    const ubah = () => setRute(baca());
    window.addEventListener("hashchange", ubah);
    return () => window.removeEventListener("hashchange", ubah);
  }, []);
  return rute;
}

function Login({ onPesan }) {
  const [email, setEmail] = useState("");
  const [sandi, setSandi] = useState("");
  const [sibuk, setSibuk] = useState(false);

  const masuk = async (e) => {
    e.preventDefault();
    setSibuk(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), sandi);
    } catch (err) {
      onPesan(err.code === "auth/invalid-credential" ? "Email atau sandi salah." : "Gagal masuk: " + err.code);
    } finally {
      setSibuk(false);
    }
  };
  const google = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err) {
      onPesan("Gagal masuk dengan Google: " + err.code);
    }
  };

  return (
    <div className="layarLogin">
      <form className="kotakLogin" onSubmit={masuk}>
        <div className="merekLogin">
          <div className="logoBesar">V</div>
          <div>
            <b>Viza Panel</b>
            <span>Panel developer Viza Chat · React</span>
          </div>
        </div>
        <label>Email admin</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nama@email.com" autoComplete="username" />
        <label>Password</label>
        <input type="password" value={sandi} onChange={(e) => setSandi(e.target.value)} placeholder="••••••••" autoComplete="current-password" />
        <button className="utama" type="submit" disabled={sibuk}>{sibuk ? "Memeriksa…" : "Masuk"}</button>
        <div className="atau"><span>atau</span></div>
        <button className="polos" type="button" onClick={google}>Masuk dengan Google</button>
        <div className="kakiLogin">Hanya akun yang terdaftar yang bisa membuka panel ini.</div>
      </form>
    </div>
  );
}

export default function App() {
  const [admin, setAdmin] = useState(undefined);
  const [pesan, setPesan] = useState("");
  const [menuBuka, setMenuBuka] = useState(false);
  const rute = pakaiHash();

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (!user) { setAdmin(null); return; }
      const a = await cekAdmin(user);
      if (!a) {
        setPesan(`Akun ${user.email} belum terdaftar sebagai admin panel.`);
        await signOut(auth);
        setAdmin(null);
        return;
      }
      setAdmin(a);
    });
  }, []);

  useEffect(() => { setMenuBuka(false); }, [rute]);

  if (admin === undefined) {
    return <div className="kosong" style={{ padding: 40 }}>Memeriksa sesi…</div>;
  }
  if (!admin) return <Login onPesan={setPesan} />;

  const Halaman = HALAMAN[rute] || Belum;
  const judul = JUDUL[rute] || "Dashboard";

  return (
    <div className="aplikasi">
      {menuBuka && <div className="tiraiMenu tampil" onClick={() => setMenuBuka(false)} />}
      <aside className={"sidebar" + (menuBuka ? " buka" : "")}>
        <div className="merek">
          <div className="logo">V</div>
          <div><b>Viza Panel</b><span>{admin.email}</span></div>
        </div>
        {MENU.map((g) => (
          <div key={g.grup}>
            <div className="grup">{g.grup}</div>
            {g.isi.map(([id, ikon, nama]) => (
              <a key={id} className={"menu" + (rute === id ? " aktif" : "")} href={"#" + id}>
                <i>{ikon}</i>{nama}
              </a>
            ))}
          </div>
        ))}
        <div className="bawah">
          <div className="saya">
            <div className="ava">{(admin.nama || "A")[0].toUpperCase()}</div>
            <div><b>{admin.nama}</b><span>{admin.peran}</span></div>
            <button title="Keluar" onClick={() => signOut(auth)}>⎋</button>
          </div>
        </div>
      </aside>
      <main className="isi">
        <div className="topbar">
          <button className="tombolMenu" aria-label="Buka menu" onClick={() => setMenuBuka((v) => !v)}>☰</button>
          <div>
            <h1>{judul}</h1>
            <div className="crumb">{judul}</div>
            <div className="ket">{KETERANGAN[rute] || ""}</div>
          </div>
        </div>
        <div className="isiDalam">
          {pesan && <div className="kosong" style={{ marginBottom: 12 }}>{pesan}</div>}
          <Halaman nama={rute} judul={judul} />
        </div>
      </main>
    </div>
  );
}

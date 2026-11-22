import { useEffect, useState } from "react";
import {
  GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword,
  signInWithPopup, signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, PEMILIK } from "./firebase.js";
import { MENU, JUDUL } from "./menu.js";
import Dashboard from "./pages/Dashboard.jsx";
import User from "./pages/User.jsx";
import Room from "./pages/Room.jsx";
import Gift from "./pages/Gift.jsx";
import Emote from "./pages/Emote.jsx";
import Profile from "./pages/Profile.jsx";
import Setting from "./pages/Setting.jsx";
import Alat from "./pages/Alat.jsx";
import Wallet from "./pages/Wallet.jsx";
import Seller from "./pages/Seller.jsx";
import Staf from "./pages/Staf.jsx";
import Daftar from "./pages/Daftar.jsx";
import Kirim from "./pages/Kirim.jsx";
import Aset from "./pages/Aset.jsx";
import { ALAT } from "./alat.js";
import Belum from "./pages/Belum.jsx";
import { Toast } from "./ui.jsx";
import KananTopbar from "./topbar.jsx";

const KETERANGAN = {
  dashboard: "Ringkasan user, room, gift, dan aktivitas admin",
  user: "Cari user, lihat detail, blokir atau buka blokir",
  room: "Pantau room, sematkan, beri tag official, dan tutup room",
  gift: "Katalog gift: cari, saring, dan hapus item",
  emote: "Emote yang tampil di bar emote semua room",
  profile: "Ubah nama dan password akun developer",
  setting: "Agora, versi & link APK, payment, dan Firebase",
  pengaturan: "Agora, versi & link APK, payment, dan Firebase",
  staf: "Staf panel dan agensi host",
  seller: "Coin seller, stok, dan status toko",
  wallet: "Paket coin, tujuan top-up, dan top-up manual",
  kirim: "Kirim frame, efek, atau medal ke satu akun",
  bet: "Chip bet dan RTP game Bikini Wild Rush",
  greedy: "Chip bet dan RTP Greedy King",
  fruit: "Chip bet dan RTP Crazy Fruit",
  roket: "Energi tiap level roket dan hadiah peringkat",
  family: "Harga membuat family dan rasio exp",
  vipharga: "Harga VIP level 1 sampai 9",
  cashback: "Tingkatan cashback gift",
  reward: "Banner kemenangan room",
};

/** Halaman yang sudah dipindahkan ke React. Sisanya menyusul bertahap. */
// Halaman pengaturan memakai satu komponen (Alat) dengan spesifikasi berbeda.
const alat = (id) => (p) => <Alat spec={ALAT[id]} {...p} />;
// Halaman berisi daftar Firestore memakai satu penampil (Daftar).
const daftar = (judul, koleksi, ket) => () => <Daftar judul={judul} koleksi={koleksi} ket={ket} />;

const HALAMAN = {
  dashboard: Dashboard,
  user: User,
  room: Room,
  staf: Staf,
  seller: Seller,
  wallet: Wallet,
  gift: Gift,
  emote: Emote,
  profile: Profile,
  setting: Setting,
  pengaturan: Setting,
  kirim: Kirim,
  bet: alat("bet"),
  greedy: alat("greedy"),
  fruit: alat("fruit"),
  roket: alat("roket"),
  family: alat("family"),
  vipharga: alat("vipharga"),
  cashback: alat("cashback"),
  reward: alat("reward"),
  cs: daftar("Customer Service", "customerService", "Pesan dan keluhan yang masuk dari aplikasi."),
  laporan: daftar("Laporan user", "reports", "Laporan dari pengguna: saring isinya, hapus bila sudah selesai."),
  cekin: daftar("Plan history (cek in)", "checkIn", "Catatan cek in harian pengguna VIP."),
  frame: () => <Aset awal="frame" />,
  aset: () => <Aset awal="frame" />,
  asetvps: daftar("Aset di VPS", "vpsAssets", "Berkas aset yang tersimpan di server."),
  latar: daftar("Background tab", "tabBackgrounds", "Gambar latar tab room yang dipakai aplikasi."),
  katalog: daftar("Katalog game", "games", "Daftar game yang tampil di aplikasi."),
  pasang: daftar("Pasang game", "games", "Game yang terpasang beserta alamat berkasnya."),
  database: daftar("Database", "users", "Penampil koleksi Firestore. Ganti nama koleksi untuk melihat data lain."),
  log: daftar("Log admin", "adminLog", "Riwayat tindakan admin panel."),
  pengumuman: daftar("Broadcast & pengumuman", "broadcast", "Pesan yang dikirim ke semua pengguna."),
};

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
    // Kalau Firebase tidak menjawab dalam 4 detik, tampilkan layar login saja.
    // Tanpa ini halaman bisa menggantung di "Memeriksa sesi…".
    const jaga = setTimeout(() => setAdmin((a) => (a === undefined ? null : a)), 4000);
    const lepas = onAuthStateChanged(auth, async (user) => {
      clearTimeout(jaga);
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
    return () => { clearTimeout(jaga); lepas(); };
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
          <div key={g.grup || "atas"}>
            {g.grup ? <div className="grup">{g.grup}</div> : null}
            {g.isi.map(([id, ikon, nama]) => (
              <a key={id} className={"menu" + (rute === id ? " aktif" : "")} href={"#" + id}>
                <i className="material-icons">{ikon}</i><span>{nama}</span>
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
          <KananTopbar admin={admin} />
        </div>
        <div className="isiDalam">
          {pesan && <div className="kosong" style={{ marginBottom: 12 }}>{pesan}</div>}
          <Halaman nama={rute} judul={judul} admin={admin} />
        </div>
      </main>
      <Toast />
    </div>
  );
}

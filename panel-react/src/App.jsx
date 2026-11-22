import { useEffect, useState } from "react";
import {
  GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged,
  sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, PEMILIK } from "./firebase.js";
import { MENU, JUDUL } from "./menu.js";
import Dashboard from "./pages/Dashboard.jsx";
import User from "./pages/User.jsx";
import Reset from "./pages/Reset.jsx";
import Cs from "./pages/Cs.jsx";
import Background from "./pages/Background.jsx";
import { GAME_HALAMAN } from "./pages/Game.jsx";
import Room from "./pages/Room.jsx";
import Gift from "./pages/Gift.jsx";
import GiftDaftar from "./pages/GiftDaftar.jsx";
import Emote from "./pages/Emote.jsx";
import Profile from "./pages/Profile.jsx";
import Setting from "./pages/Setting.jsx";
import Alat from "./pages/Alat.jsx";
import Wallet from "./pages/Wallet.jsx";
import Pencairan from "./pages/Pencairan.jsx";
import Iklan from "./pages/Iklan.jsx";
import Seller from "./pages/Seller.jsx";
import StafApp, { StafAppShell } from "./pages/StafApp.jsx";
import Staf from "./pages/Staf.jsx";
import Daftar from "./pages/Daftar.jsx";
import Kirim from "./pages/Kirim.jsx";
import Aset from "./pages/Aset.jsx";
import Banner from "./pages/Banner.jsx";
import Store from "./pages/Store.jsx";
import Vip from "./pages/Vip.jsx";
import Penahan from "./Penahan.jsx";
import Roket from "./pages/Roket.jsx";
import Reward from "./pages/Reward.jsx";
import { ALAT } from "./alat.js";
import Belum from "./pages/Belum.jsx";
import { Toast } from "./ui.jsx";
import KananTopbar from "./topbar.jsx";

const KETERANGAN = {
  dashboard: "Ringkasan user, room, gift, dan aktivitas admin",
  user: "Cari user, lihat detail, blokir atau buka blokir",
  reset: "Reset coin, diamond, VIP, XP, nama, foto, dan aset satu user atau semua user",
  cs: "Tunjuk atau cabut akun Customer Service di aplikasi",
  latar: "Unggah gambar latar untuk tiap tab aplikasi dan bilah bawah",
  room: "Pantau room, sematkan, beri tag official, dan tutup room",
  gift: "Kategori gift: gift biasa, cashback, video MP4, dan SVGA",
  giftdaftar: "Semua gift per kategori: tambah, edit, dan hapus",
  emote: "Emote yang tampil di bar emote semua room",
  profile: "Ubah nama dan password akun developer",
  setting: "Agora, versi & link APK, payment, dan Firebase",
  pengaturan: "Agora, versi & link APK, payment, dan Firebase",
  staf: "Staf panel dan agensi host",
  seller: "Coin seller, stok, dan status toko",
  stafapp: "Staf aplikasi: Coin seller, Manager, dan Admin",
  coinseller: "Coin seller, stok, dan status toko",
  managerapp: "Manager aplikasi: isi stok coin dan stok aset untuk manager",
  adminapp: "Admin aplikasi: isi stok coin dan stok aset untuk admin",
  wallet: "Paket coin, tujuan top-up, dan top-up manual",
  kirim: "Kirim frame, efek, atau medal ke satu akun",
  game: "Bet, RTP, banner, dan kategori game",
  gamebet: "Chip bet tiap game: Bikini Wild Rush, Greedy King, Crazy Fruit",
  gamertp: "Persentase RTP tiap game",
  gamebanner: "Banner kemenangan game: unggah gambar atau tempel tautan",
  gamekategori: "Tampilkan atau sembunyikan kategori Game Viza di Game Center",
  gameroket: "Energi tiap level roket dan hadiah peringkat",
  gamereward: "Banner kemenangan room",
  bet: "Chip bet dan RTP game Bikini Wild Rush",
  greedy: "Chip bet dan RTP Greedy King",
  fruit: "Chip bet dan RTP Crazy Fruit",
  roket: "Energi tiap level roket dan hadiah peringkat",
  family: "Harga membuat family dan rasio exp",
  vipharga: "Harga VIP level 1 sampai 9 dan medali tiap tier",
  vip: "Harga VIP level 1 sampai 9 dan medali tiap tier",
  cashback: "Tingkatan cashback gift",
  reward: "Banner kemenangan room",
};

/** Halaman yang sudah dipindahkan ke React. Sisanya menyusul bertahap. */
// Halaman pengaturan memakai satu komponen (Alat) dengan spesifikasi berbeda.
const alat = (id) => (p) => <Alat spec={ALAT[id]} {...p} />;
// Halaman berisi daftar Firestore memakai satu penampil (Daftar).
const daftar = (judul, koleksi, ket) => () => <Daftar judul={judul} koleksi={koleksi} ket={ket} />;

const HALAMAN = {
  ...GAME_HALAMAN,
  game: GAME_HALAMAN.gamebet,
  dashboard: Dashboard,
  user: User,
  reset: Reset,
  room: Room,
  staf: Staf,
  seller: Seller,
  stafapp: () => <StafAppShell awal="coinseller" />,
  coinseller: () => <StafAppShell awal="coinseller" />,
  managerapp: () => <StafAppShell awal="manager" />,
  adminapp: () => <StafAppShell awal="admin" />,
  wallet: Wallet,
  pencairan: Pencairan,
  iklan: Iklan,
  gift: Gift,
  giftdaftar: GiftDaftar,
  emote: Emote,
  profile: Profile,
  setting: Setting,
  pengaturan: Setting,
  kirim: Kirim,
  bet: alat("bet"),
  greedy: alat("greedy"),
  fruit: alat("fruit"),
  roket: () => <Roket />,
  family: alat("family"),
  vipharga: () => <Vip />,
  vip: () => <Vip />,
  cashback: alat("cashback"),
  reward: () => <Reward />,
  cs: Cs,
  laporan: daftar("Laporan user", "reports", "Laporan dari pengguna: saring isinya, hapus bila sudah selesai."),
  cekin: daftar("Plan history (cek in)", "checkIn", "Catatan cek in harian pengguna VIP."),
  banner: () => <Banner />,
  store: () => <Store />,
  frame: () => <Store />,
  aset: () => <Aset awal="frame" />,
  asetvps: daftar("Aset di VPS", "vpsAssets", "Berkas aset yang tersimpan di server."),
  latar: Background,
  katalog: daftar("Katalog game", "games", "Daftar game yang tampil di aplikasi."),
  pasang: daftar("Pasang game", "games", "Game yang terpasang beserta alamat berkasnya."),
  database: daftar("Database", "users", "Penampil koleksi Firestore. Ganti nama koleksi untuk melihat data lain."),
  log: daftar("Log admin", "adminLog", "Riwayat tindakan admin panel."),
  pengumuman: daftar("Broadcast & pengumuman", "broadcast", "Pesan yang dikirim ke semua pengguna."),
};

async function cekAdmin(user) {
  if (!user) return null;
  const email = (user.email || "").toLowerCase();
  const dasar = { email, nama: user.displayName || email.split("@")[0], peran: "owner", aktif: true };
  if (email === PEMILIK) return dasar;
  // Admin tambahan: pemilik mendaftarkan emailnya di menu Staf panel. Dokumen
  // panelAdmins/<email> dengan aktif selain false boleh membuka panel.
  try {
    const d = await getDoc(doc(db, "panelAdmins", email));
    if (d.exists() && d.data().aktif !== false) {
      const v = d.data();
      return { ...dasar, peran: v.peran || "admin", nama: v.nama || dasar.nama };
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

/** Pesan galat Firebase dalam bahasa yang bisa langsung ditindaklanjuti. */
function pesanGalat(kode) {
  switch (kode) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/invalid-login-credentials":
      return "Email atau sandi salah. Kalau akun ini dibuat lewat Google, pakai tombol Masuk dengan Google.";
    case "auth/user-not-found":
      return "Email ini belum terdaftar. Pilih tab Daftar untuk membuat akun.";
    case "auth/email-already-in-use":
      return "Email ini sudah terdaftar. Pilih tab Masuk, atau pakai Lupa sandi.";
    case "auth/weak-password":
      return "Sandi terlalu pendek. Firebase menuntut minimal 6 huruf.";
    case "auth/invalid-email":
      return "Bentuk email tidak sah.";
    case "auth/operation-not-allowed":
      return "Metode Email/Password belum diaktifkan di Firebase. Buka Firebase Console > Authentication > Sign-in method > Email/Password > Enable, lalu coba lagi.";
    case "auth/too-many-requests":
      return "Terlalu banyak percobaan. Tunggu beberapa menit lalu coba lagi.";
    case "auth/network-request-failed":
      return "Jaringan bermasalah. Periksa koneksi lalu coba lagi.";
    case "auth/unauthorized-domain":
      return "Domain panel ini belum diizinkan di Firebase Authentication > Settings > Authorized domains.";
    case "auth/popup-blocked":
    case "auth/popup-closed-by-user":
      return "Jendela Google tertutup atau diblokir. Coba lagi, atau masuk dengan email dan sandi.";
    default:
      return "Gagal: " + kode;
  }
}

function Login({ onPesan }) {
  const [mode, setMode] = useState("masuk");
  const [email, setEmail] = useState("");
  const [sandi, setSandi] = useState("");
  const [sibuk, setSibuk] = useState(false);

  const masuk = async (e) => {
    e.preventDefault();
    if (!email.trim() || !sandi) return onPesan("Isi email dan sandi dulu.");
    setSibuk(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), sandi);
    } catch (err) {
      onPesan(pesanGalat(err.code));
    } finally {
      setSibuk(false);
    }
  };

  const daftar = async (e) => {
    e.preventDefault();
    if (!email.trim() || !sandi) return onPesan("Isi email dan sandi dulu.");
    setSibuk(true);
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), sandi);
      onPesan("Akun dibuat. Kalau email ini belum didaftarkan pemilik di menu Staf panel, aksesnya masih ditolak.");
    } catch (err) {
      onPesan(pesanGalat(err.code));
    } finally {
      setSibuk(false);
    }
  };

  const lupa = async () => {
    if (!email.trim()) return onPesan("Isi email dulu, lalu tekan Lupa sandi.");
    try {
      await sendPasswordResetEmail(auth, email.trim());
      onPesan("Tautan atur ulang sandi sudah dikirim ke " + email.trim() + ". Cek kotak masuk dan spam.");
    } catch (err) {
      onPesan(pesanGalat(err.code));
    }
  };

  const google = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err) {
      onPesan(pesanGalat(err.code));
    }
  };

  const buatBaru = mode === "daftar";

  return (
    <div className="layarLogin">
      <form className="kotakLogin" onSubmit={buatBaru ? daftar : masuk}>
        <div className="merekLogin">
          <div className="logoBesar">V</div>
          <div>
            <b>Viza Panel</b>
            <span>Panel developer Viza Chat · React</span>
          </div>
        </div>

        <div className="tabLogin">
          <button type="button" className={buatBaru ? "" : "on"} onClick={() => setMode("masuk")}>Masuk</button>
          <button type="button" className={buatBaru ? "on" : ""} onClick={() => setMode("daftar")}>Daftar</button>
        </div>

        <label>Email admin</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nama@email.com" autoComplete="username" inputMode="email" />
        <label>Password</label>
        <input type="password" value={sandi} onChange={(e) => setSandi(e.target.value)} placeholder="minimal 6 huruf" autoComplete={buatBaru ? "new-password" : "current-password"} />

        <button className="utama" type="submit" disabled={sibuk}>
          {sibuk ? "Memeriksa…" : buatBaru ? "Buat akun" : "Masuk"}
        </button>

        {!buatBaru ? <button className="polos kecil" type="button" onClick={lupa}>Lupa sandi</button> : null}

        <div className="atau"><span>atau</span></div>
        <button className="polos" type="button" onClick={google}>Masuk dengan Google</button>

        <div className="kakiLogin">
          {buatBaru
            ? "Buat akun untuk email yang sudah didaftarkan pemilik di menu Staf panel."
            : "Masuk dengan email dan sandi yang diberikan pemilik panel."}
        </div>
      </form>
    </div>
  );
}

export default function App() {
  const [admin, setAdmin] = useState(undefined);
  const [pesan, setPesan] = useState("");
  const [menuBuka, setMenuBuka] = useState(false);
  const [bukaGrup, setBukaGrup] = useState({});
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
        setPesan(`Email ${user.email} belum didaftarkan sebagai admin panel. Minta pemilik menambahkannya di menu Staf panel.`);
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
            {g.isi.map(([id, ikon, nama, anak]) => {
              if (!anak) {
                return (
                  <a key={id} className={"menu" + (rute === id ? " aktif" : "")} href={"#" + id}>
                    <i className="material-icons">{ikon}</i><span>{nama}</span>
                  </a>
                );
              }
              // Menu berjenjang: induk bisa dibuka ke bawah, isinya sub menu.
              const aktifAnak = anak.some(([cid]) => cid === rute);
              const terbuka = bukaGrup[id] ?? aktifAnak;
              return (
                <div key={id}>
                  <a className={"menu induk" + (aktifAnak ? " aktif" : "")}
                    onClick={() => setBukaGrup({ ...bukaGrup, [id]: !terbuka })}>
                    <i className="material-icons">{ikon}</i><span>{nama}</span>
                    <i className="material-icons panahInduk">{terbuka ? "expand_more" : "chevron_right"}</i>
                  </a>
                  {terbuka ? anak.map(([cid, cnama]) => (
                    <a key={cid} className={"menu anak" + (rute === cid ? " aktif" : "")} href={"#" + cid}>
                      <span className="titikAnak" /><span>{cnama}</span>
                    </a>
                  )) : null}
                </div>
              );
            })}
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
          <Penahan kunci={rute}><Halaman nama={rute} judul={judul} admin={admin} /></Penahan>
        </div>
      </main>
      <Toast />
    </div>
  );
}

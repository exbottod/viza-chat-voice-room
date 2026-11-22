import { useState } from "react";
import {
  EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, PEMILIK } from "../firebase.js";
import { catatLog } from "../data.js";
import { toast } from "../ui.jsx";

const Isian = ({ label, ...p }) => (
  <label className="isianForm">
    <span>{label}</span>
    <input {...p} />
  </label>
);

export default function Profile({ admin }) {
  const [nama, setNama] = useState(admin.nama || "");
  const [simpanNama, setSimpanNama] = useState(false);
  const [tampilSandi, setTampilSandi] = useState(false);
  const [lama, setLama] = useState("");
  const [baru, setBaru] = useState("");
  const [ulang, setUlang] = useState("");
  const [sibuk, setSibuk] = useState(false);
  const user = auth.currentUser;
  const lewatEmail = (user?.providerData || []).some((p) => p.providerId === "password");

  const kirimNama = async () => {
    const n = nama.trim();
    if (!n) return toast("Nama tidak boleh kosong", true);
    setSimpanNama(true);
    try {
      await updateProfile(user, { displayName: n });
      // Admin non-owner juga punya catatan nama di panelAdmins.
      if ((user.email || "").toLowerCase() !== PEMILIK) {
        await setDoc(doc(db, "panelAdmins", user.email.toLowerCase()), { nama: n }, { merge: true }).catch(() => {});
      }
      await catatLog("Ubah nama profil", n);
      toast("Nama diperbarui. Muat ulang halaman untuk melihatnya di menu.");
    } catch (e) { toast("Gagal: " + (e.code || e.message), true); }
    finally { setSimpanNama(false); }
  };

  const kirimSandi = async () => {
    if (!lewatEmail) return toast("Akun ini masuk lewat Google, jadi password diatur di akun Google.", true);
    if (baru.length < 6) return toast("Password baru minimal 6 karakter", true);
    if (baru !== ulang) return toast("Ulangi password baru dengan sama persis", true);
    setSibuk(true);
    try {
      await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, lama));
      await updatePassword(user, baru);
      await catatLog("Ubah password", user.email);
      toast("Password berhasil diganti");
      setLama(""); setBaru(""); setUlang(""); setTampilSandi(false);
    } catch (e) {
      const k = e.code || "";
      toast(k.includes("wrong-password") || k.includes("invalid-credential")
        ? "Password lama salah" : "Gagal: " + (k || e.message), true);
    } finally { setSibuk(false); }
  };

  return (
    <>
      <div className="panel">
        <div className="panelAtas"><h3>Admin Information</h3></div>
        <div className="panelIsi">
          <Isian label="Name" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama tampilan" />
          <Isian label="Email (untuk login)" value={admin.email} readOnly />
          <div className="barisAksiForm">
            <a className="tautanPink" onClick={() => setTampilSandi((t) => !t)}>
              {tampilSandi ? "Tutup ubah password" : "Update Password ?"}
            </a>
            <button className="tombolBaru" onClick={kirimNama} disabled={simpanNama}>
              {simpanNama ? "Menyimpan…" : "Submit"}
            </button>
          </div>
          <div className="catatan">Peran: <b>{admin.peran}</b>. Email dipakai untuk masuk dan tidak bisa diubah dari sini.</div>
        </div>
      </div>

      {tampilSandi ? (
        <div className="panel">
          <div className="panelAtas"><h3>Ubah password</h3></div>
          <div className="panelIsi">
            {lewatEmail ? (
              <>
                <Isian label="Password lama" type="password" value={lama} onChange={(e) => setLama(e.target.value)} autoComplete="current-password" />
                <Isian label="Password baru (minimal 6 karakter)" type="password" value={baru} onChange={(e) => setBaru(e.target.value)} autoComplete="new-password" />
                <Isian label="Ulangi password baru" type="password" value={ulang} onChange={(e) => setUlang(e.target.value)} autoComplete="new-password" />
                <div className="barisAksiForm" style={{ justifyContent: "flex-end" }}>
                  <button className="tombolBaru" onClick={kirimSandi} disabled={sibuk}>{sibuk ? "Memproses…" : "Ganti password"}</button>
                </div>
              </>
            ) : (
              <div className="kosong">Akun ini masuk lewat Google. Password diatur di akun Google Anda, bukan di panel.</div>
            )}
          </div>
        </div>
      ) : null}

      <div className="panel">
        <div className="panelAtas"><h3>Update Profile Image</h3></div>
        <div className="panelIsi" style={{ textAlign: "center" }}>
          <div className="fotoProfilBesar">
            {user?.photoURL
              ? <img src={user.photoURL} alt="" referrerPolicy="no-referrer" />
              : <span>{(admin.nama || "A")[0].toUpperCase()}</span>}
          </div>
          <div className="catatan" style={{ textAlign: "center" }}>
            Foto diambil dari akun Google yang dipakai masuk. Ganti fotonya di akun Google Anda.
          </div>
        </div>
      </div>
    </>
  );
}

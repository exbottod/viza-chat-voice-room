import { useState } from "react";
import {
  EmailAuthProvider, linkWithCredential, reauthenticateWithCredential, updatePassword, updateProfile,
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
  // Akun yang masuk lewat Google belum punya sandi. Satu sandi dibuat di sini
  // supaya nanti bisa masuk dengan email + sandi, bukan hanya lewat Google.
  const [sandiPertama, setSandiPertama] = useState("");
  const [buatSandi, setBuatSandi] = useState(false);
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
    if (!lewatEmail) return toast("Akun ini masuk lewat Google. Pakai Buat sandi dulu di bawah.", true);
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

  /** Pasang sandi pada akun yang selama ini masuk lewat Google. */
  const pasangSandi = async () => {
    if (sandiPertama.length < 6) return toast("Sandi minimal 6 karakter", true);
    setSibuk(true);
    try {
      const kredensial = EmailAuthProvider.credential(user.email, sandiPertama);
      await linkWithCredential(user, kredensial);
      await catatLog("Buat sandi login", user.email);
      toast("Sandi tersimpan. Sekarang bisa masuk dengan email dan sandi.");
      setSandiPertama("");
      setBuatSandi(false);
    } catch (e) {
      const k = e.code || "";
      if (k.includes("requires-recent-login")) {
        toast("Keluarlah dulu, masuk lagi dengan Google, lalu ulangi. Sistem minta login ulang sebelum mengubah sandi.", true);
      } else if (k.includes("email-already-in-use") || k.includes("credential-already-in-use")) {
        toast("Email ini sudah punya sandi. Pakai Ubah password.", true);
      } else if (k.includes("provider-already-linked")) {
        toast("Akun ini sudah punya sandi. Pakai Ubah password.", true);
      } else {
        toast("Gagal: " + (k || e.message), true);
      }
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

          {!lewatEmail ? (
            <div style={{ marginTop: 14, borderTop: "1px solid #2a2a38", paddingTop: 12 }}>
              <div className="catatan" style={{ marginBottom: 8 }}>
                Akun ini masuk lewat Google, jadi belum punya sandi. Buat sandi sekali di sini
                agar nanti bisa masuk dengan email dan sandi dari perangkat mana pun.
              </div>
              {!buatSandi ? (
                <a className="tautanPink" onClick={() => setBuatSandi(true)}>Buat sandi login</a>
              ) : (
                <>
                  <Isian label="Sandi baru" type="password" value={sandiPertama}
                    onChange={(e) => setSandiPertama(e.target.value)} placeholder="minimal 6 huruf"
                    autoComplete="new-password" />
                  <div className="barisAksiForm">
                    <a className="tautanPink" onClick={() => { setBuatSandi(false); setSandiPertama(""); }}>Batal</a>
                    <button className="tombolBaru" onClick={pasangSandi} disabled={sibuk}>
                      {sibuk ? "Menyimpan…" : "Simpan sandi"}
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : null}
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

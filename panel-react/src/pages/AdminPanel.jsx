import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { authKedua } from "../firebase.js";
import { walletAdmin } from "../dompet.js";
import { catatLog } from "../data.js";
import { Konfirmasi, Laci, Panel, Rangka, Tabel, Tag, toast } from "../ui.jsx";

const KOSONG = { nama: "", email: "", sandi: "" };

/**
 * Admin panel tambahan. Pemilik membuat akun di sini: nama, email, dan sandi.
 * Akun dibuat lewat aplikasi Firebase kedua supaya sesi pemilik tidak keluar,
 * lalu emailnya dicatat di panelAdmins agar boleh membuka panel ini.
 * Admin itu masuk seperti biasa: email + sandi, dan namanya tampil di panel.
 */
export default function AdminPanel() {
  const [daftar, setDaftar] = useState(null);
  const [form, setForm] = useState(KOSONG);
  const [buka, setBuka] = useState(false);
  const [sibuk, setSibuk] = useState(false);
  const [hapus, setHapus] = useState(null);
  const [galat, setGalat] = useState("");

  const muat = async () => {
    try {
      const r = await walletAdmin({ op: "fs_list", koleksi: "panelAdmins", batas: 200 });
      setDaftar(r.items || []);
      setGalat("");
    } catch (e) { setDaftar([]); setGalat(e.message || String(e)); }
  };
  useEffect(() => { muat(); }, []);

  const simpan = async () => {
    const nama = form.nama.trim();
    const email = form.email.trim().toLowerCase();
    const sandi = form.sandi;
    if (!nama || !email || !sandi) return toast("Nama, email, dan sandi wajib diisi", true);
    if (!email.includes("@")) return toast("Bentuk email tidak sah", true);
    if (sandi.length < 6) return toast("Sandi minimal 6 huruf", true);
    setSibuk(true);
    let akunBaru = false;
    try {
      try {
        const kredensial = await createUserWithEmailAndPassword(authKedua, email, sandi);
        await updateProfile(kredensial.user, { displayName: nama }).catch(() => {});
        await signOut(authKedua).catch(() => {});
        akunBaru = true;
      } catch (e) {
        const k = e.code || "";
        if (k.includes("email-already-in-use")) {
          // Akun sudah ada: cukup didaftarkan sebagai admin, sandinya tetap yang lama.
          toast("Akun email ini sudah ada. Sandinya tetap yang lama, sekarang didaftarkan sebagai admin.");
        } else if (k.includes("operation-not-allowed")) {
          throw new Error("Metode Email/Password belum aktif di Firebase");
        } else if (k.includes("weak-password")) {
          throw new Error("Sandi terlalu lemah, minimal 6 huruf");
        } else {
          throw new Error(k || e.message);
        }
      }
      await walletAdmin({
        op: "fs_set", jalur: "panelAdmins/" + email,
        data: { email, nama, peran: "admin", aktif: true, dibuat: Date.now(), oleh: "panel" },
      });
      await catatLog("Tambah admin panel", nama + " · " + email);
      toast(akunBaru ? "Admin dibuat. Beri tahu email dan sandinya." : "Email didaftarkan sebagai admin.");
      setForm(KOSONG);
      setBuka(false);
      await muat();
    } catch (e) {
      toast("Gagal: " + (e.message || e), true);
    } finally { setSibuk(false); }
  };

  const hapusAdmin = async () => {
    setSibuk(true);
    try {
      const email = String(hapus.email || hapus.id).toLowerCase();
      await walletAdmin({ op: "fs_del", koleksi: "panelAdmins", id: email });
      await catatLog("Hapus admin panel", email);
      toast("Akses admin dicabut");
      setHapus(null);
      await muat();
    } catch (e) { toast("Gagal: " + (e.message || e), true); }
    finally { setSibuk(false); }
  };

  return (
    <>
      <Panel judul="Admin panel" sub="Buat akun admin di sini. Admin masuk dengan email dan sandi, namanya tampil di panel."
        aksi={<button className="tombolBaru" onClick={() => { setForm(KOSONG); setBuka(true); }}>Tambah admin</button>}>
        {galat ? <div className="kosong">Belum bisa dimuat: {galat}</div> : null}
        {daftar === null ? <Rangka baris={3} />
          : !daftar.length ? <div className="kosong">Belum ada admin tambahan. Pemilik selalu bisa masuk.</div>
          : (
            <Tabel
              kolom={[{ k: "nama", t: "Nama" }, { k: "email", t: "Email" }, { k: "peran", t: "Peran" }, { k: "status", t: "Status" }, { k: "aksi", t: "" }]}
              baris={daftar.map((x) => ({
                nama: x.nama || "-", email: x.email || x.id, peran: x.peran || "admin",
                status: <Tag jenis={x.aktif === false ? "mati" : "aktif"}>{x.aktif === false ? "Nonaktif" : "Aktif"}</Tag>,
                aksi: <a className="tautanPink" onClick={() => setHapus(x)}>Cabut akses</a>,
              }))}
            />
          )}
      </Panel>

      <Laci buka={buka} judul="Tambah admin panel" onTutup={() => setBuka(false)}
        kaki={<button className="tombolBaru" onClick={simpan} disabled={sibuk}>{sibuk ? "Menyimpan…" : "Buat admin"}</button>}>
        <label className="isianForm"><span>Nama</span>
          <input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} placeholder="mis. Boy" />
        </label>
        <label className="isianForm"><span>Email untuk masuk</span>
          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="nama@email.com" inputMode="email" />
        </label>
        <label className="isianForm"><span>Sandi</span>
          <input type="password" value={form.sandi} onChange={(e) => setForm({ ...form, sandi: e.target.value })} placeholder="minimal 6 huruf" autoComplete="new-password" />
        </label>
        <div className="catatan">Simpan email dan sandi ini, lalu berikan ke admin tersebut. Sandi bisa diubah sendiri olehnya di menu Profil setelah masuk.</div>
      </Laci>

      <Konfirmasi buka={!!hapus} judul="Cabut akses admin?" pesan={(hapus?.nama || hapus?.email || "") + " tidak akan bisa membuka panel lagi. Akun emailnya tidak dihapus."}
        tombol="Cabut" sibuk={sibuk} onYa={hapusAdmin} onTidak={() => setHapus(null)} />
    </>
  );
}

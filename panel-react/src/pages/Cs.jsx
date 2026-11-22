import { useEffect, useState } from "react";
import { bacaRtdbServer, tulisRtdbServer } from "../unggah.js";
import { catatLog, useKoleksi } from "../data.js";
import { Konfirmasi, Panel, Tag, toast } from "../ui.jsx";

/**
 * Customer Service: menunjuk satu akun sebagai CS resmi dan mencabutnya.
 *
 * Aplikasi membaca Realtime Database `_cs` ({ id, nama, uid, aktif }) lebih dulu
 * sebelum menebak dari pemilik, jadi akun CS bisa dipindah atau dimatikan dari
 * panel tanpa build APK baru. Semua chat user masuk ke akun itu sebagai chat
 * pribadi biasa, jadi tidak ada sistem pesan terpisah.
 */
export default function Cs() {
  const { isi: users } = useKoleksi("userIds", 500);
  const [cs, setCs] = useState(null);
  const [memuat, setMemuat] = useState(true);
  const [cari, setCari] = useState("");
  const [uidManual, setUidManual] = useState("");
  const [sibuk, setSibuk] = useState(false);
  const [tanya, setTanya] = useState(false);

  const muat = async () => {
    setMemuat(true);
    try {
      const isi = await bacaRtdbServer("_cs");
      setCs(isi && typeof isi === "object" ? isi : null);
    } catch (e) {
      toast("Gagal membaca data CS: " + (e.message || e), true);
    } finally { setMemuat(false); }
  };
  useEffect(() => { muat(); }, []);

  const kata = cari.trim().toLowerCase();
  const cocok = !kata ? [] : users.map((u) => ({
    uid: String(u.uid || u.id || ""),
    nama: String(u.name || u.nama || "(tanpa nama)"),
    nomor: String(u.userId || u.id || ""),
    email: String(u.email || ""),
  })).filter((u) => u.uid && (u.nama.toLowerCase().includes(kata)
    || u.uid.toLowerCase().includes(kata) || u.nomor.toLowerCase().includes(kata))).slice(0, 15);

  const aktifkan = async (pilih) => {
    if (sibuk) return;
    const uid = String(pilih.uid || "").trim();
    if (!uid) { toast("UID akun belum dipilih", true); return; }
    setSibuk(true);
    try {
      const data = {
        id: String(pilih.nomor || ""), nama: String(pilih.nama || "Customer Service"),
        uid, aktif: true, at: Date.now(),
      };
      await tulisRtdbServer("_cs", data);
      await catatLog("Aktifkan CS", data.nama + " · " + uid);
      setCs(data);
      setCari(""); setUidManual("");
      toast("CS aktif: " + data.nama);
    } catch (e) { toast("Gagal: " + (e.message || e), true); }
    finally { setSibuk(false); }
  };

  const cabut = async () => {
    setTanya(false);
    if (sibuk) return;
    setSibuk(true);
    try {
      const data = { ...(cs || {}), aktif: false, at: Date.now() };
      await tulisRtdbServer("_cs", data);
      await catatLog("Cabut CS", cs?.nama || cs?.uid || "");
      setCs(data);
      toast("Customer Service dicabut");
    } catch (e) { toast("Gagal: " + (e.message || e), true); }
    finally { setSibuk(false); }
  };

  const aktif = cs && cs.aktif !== false && !!cs.uid;

  return (
    <>
      <Panel judul="Customer Service" sub="Tunjuk satu akun sebagai CS resmi. Chat user langsung masuk ke akun itu tanpa build APK baru, dan bisa dicabut kapan saja."
        aksi={<span style={{ display: "flex", gap: 8 }}>
          <button className="pil" onClick={muat} disabled={memuat}>{memuat ? "Memuat…" : "Muat ulang"}</button>
          {aktif ? <button className="polos" onClick={() => setTanya(true)} disabled={sibuk}>Cabut CS</button> : null}
        </span>}>

        <div style={{ background: "#1f1f2b", border: "1px solid #2b2b3a", borderRadius: 5, padding: 14, marginBottom: 16 }}>
          <div className="barisSaklar" style={{ marginTop: 0 }}>
            <b>CS yang aktif sekarang</b>
            <Tag jenis={aktif ? "aktif" : "mati"}>{aktif ? "Aktif" : "Belum ada"}</Tag>
          </div>
          {aktif ? (
            <div style={{ fontSize: 13, lineHeight: 1.8 }}>
              <div>Nama: <b>{String(cs.nama || "-")}</b></div>
              <div>Nomor ID: <b>{String(cs.id || "-")}</b></div>
              <div>UID: <b>{String(cs.uid || "-")}</b></div>
              <div>Ditetapkan: <b>{cs.at ? new Date(Number(cs.at)).toLocaleString("id-ID") : "-"}</b></div>
            </div>
          ) : (
            <div className="catatan" style={{ padding: 0 }}>
              {cs?.uid ? "Penunjukan sudah dicabut, jadi tombol Customer Service dimatikan dan pesan user tidak masuk ke akun mana pun." : "Belum ada akun yang ditunjuk. Cari akun di bawah lalu tekan Jadikan CS."}
            </div>
          )}
        </div>

        <label className="isianForm"><span>Cari akun (nama, nomor ID, atau UID)</span>
          <input value={cari} onChange={(e) => setCari(e.target.value)} placeholder="mis. nama user atau UID" />
        </label>

        {kata ? (
          <div style={{ marginBottom: 14 }}>
            {!cocok.length ? <div className="catatan">Tidak ada akun yang cocok.</div>
              : cocok.map((u) => (
                <div key={u.uid} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid #2b2b3a" }}>
                  <span style={{ flex: "1 1 auto", minWidth: 0 }}>
                    <b style={{ fontSize: 13 }}>{u.nama}</b>
                    <div className="catatan" style={{ padding: 0 }}>{u.nomor ? "ID " + u.nomor + " · " : ""}{u.uid.slice(0, 16)}…{u.email ? " · " + u.email : ""}</div>
                  </span>
                  <button className="pil" onClick={() => aktifkan(u)} disabled={sibuk || (aktif && String(cs.uid) === u.uid)}>
                    {aktif && String(cs.uid) === u.uid ? "Sudah CS" : "Jadikan CS"}
                  </button>
                </div>
              ))}
          </div>
        ) : null}

        <label className="isianForm"><span>Atau tempel UID akun langsung</span>
          <input value={uidManual} onChange={(e) => setUidManual(e.target.value)} placeholder="UID akun yang mau dijadikan CS" />
        </label>
        <button className="tombolBaru" disabled={sibuk || !uidManual.trim()}
          onClick={() => aktifkan({ uid: uidManual.trim(), nama: "Customer Service", nomor: "" })}>
          {sibuk ? "Menyimpan…" : "Aktifkan CS dengan UID ini"}
        </button>

        <div className="catatan" style={{ marginTop: 14 }}>
          Aktifkan CS: chat Customer Service di aplikasi langsung tersambung ke akun itu. Cabut CS: tombol CS dimatikan dan pesan user tidak lagi masuk ke akun tersebut. Hanya satu akun CS yang bisa aktif, sama seperti sebelumnya.
        </div>
      </Panel>

      <Konfirmasi buka={tanya} judul="Cabut Customer Service?"
        pesan={"Chat CS tidak akan sampai ke akun mana pun sampai CS ditunjuk lagi" + (cs?.nama ? " (" + cs.nama + ")" : "") + "."}
        tombol="Ya, cabut" sibuk={sibuk} onYa={cabut} onTidak={() => setTanya(false)} />
    </>
  );
}

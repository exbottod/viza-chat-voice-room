import { useState } from "react";
import { panelAksi, walletAdmin } from "../dompet.js";
import { ambilSemuaMentah, catatLog } from "../data.js";
import { Konfirmasi, Panel, toast } from "../ui.jsx";

/**
 * Reset lengkap satu user atau semua user: coin, diamond, VIP, XP/level,
 * foto profil, nama tampilan, dan aset My Item (inventaris + yang dipakai).
 *
 * Kenapa halaman sendiri: aksi reset mudah terpencet tanpa sengaja. Di sini
 * sasaran dipilih dulu, apa yang dibersihkan dicentang satu per satu, dan
 * reset semua user tetap menuntut ketikan "HAPUS" seperti aturan server.
 */
const BAGIAN = [
  ["coin", "Coin", "Saldo coin jadi 0"],
  ["diamond", "Diamond", "Saldo diamond jadi 0"],
  ["vip", "VIP", "Tier VIP dicabut, masa aktif dihapus"],
  ["level", "XP & level", "Exp jadi 0, hadiah level bisa diklaim ulang"],
  ["aset", "Aset My Item", "Inventaris dan aset yang dipakai dikosongkan"],
  ["foto", "Foto profil", "Foto kembali ke bawaan"],
  ["nama", "Nama user", "Nama kembali menjadi Unknown"],
];

const AWAL = { coin: false, diamond: false, vip: false, level: false, aset: false, foto: false, nama: false };

export default function Reset() {
  const [semua, setSemua] = useState(false);
  const [uid, setUid] = useState("");
  const [kecuali, setKecuali] = useState("");
  const [pilih, setPilih] = useState(AWAL);
  const [ketik, setKetik] = useState("");
  const [tanya, setTanya] = useState(false);
  const [sibuk, setSibuk] = useState(false);
  const [progres, setProgres] = useState("");
  const [hasil, setHasil] = useState([]);

  const adaPilihan = Object.values(pilih).some(Boolean);
  const daftarKecuali = kecuali.split(/[\s,;]+/).map((x) => x.trim()).filter(Boolean);
  const siap = adaPilihan && (semua ? ketik.trim().toUpperCase() === "HAPUS" : uid.trim().length >= 4);

  const putar = (k) => setPilih((l) => ({ ...l, [k]: !l[k] }));

  const ringkas = () => BAGIAN.filter(([k]) => pilih[k]).map(([, n]) => n).join(", ");

  /** Daftar uid untuk reset nama/foto semua user (server hanya bisa satu uid). */
  const semuaUid = async () => {
    const dok = await ambilSemuaMentah("users", 600);
    const buang = new Set(daftarKecuali.map((x) => x.toLowerCase()));
    const kunci = new Set();
    const out = [];
    dok.forEach((d) => {
      const id = String(d.uid || d.id || "").trim();
      if (!id || buang.has(id.toLowerCase()) || kunci.has(id)) return;
      kunci.add(id);
      out.push(id);
    });
    return out;
  };

  const jalan = async () => {
    setTanya(false);
    setSibuk(true);
    setHasil([]);
    const catat = (nama, pesan, ok) => setHasil((l) => [...l, { nama, pesan, ok }]);
    try {
      const target = uid.trim();
      if (semua) {
        if (pilih.coin) {
          setProgres("Mengosongkan coin semua user…");
          try { await walletAdmin({ op: "reset_all", konfirmasi: "HAPUS" }, 60000); catat("Coin semua user", "Coin semua user jadi 0", true); }
          catch (e) { catat("Coin semua user", String(e.message || e), false); }
        }
        if (pilih.diamond) {
          setProgres("Mengosongkan diamond semua user…");
          try { await walletAdmin({ op: "reset_gem_all", konfirmasi: "HAPUS" }, 60000); catat("Diamond semua user", "Diamond semua user jadi 0", true); }
          catch (e) { catat("Diamond semua user", String(e.message || e), false); }
        }
        if (pilih.vip || pilih.level || pilih.aset) {
          setProgres("Membersihkan VIP, level, dan aset semua user…");
          try {
            await walletAdmin({ op: "reset_all_assets", vip: !!pilih.vip, level: !!pilih.level, assets: !!pilih.aset, kecuali: daftarKecuali, konfirmasi: "HAPUS" }, 120000);
            catat("VIP / level / aset", "Dibersihkan untuk semua user" + (daftarKecuali.length ? " kecuali " + daftarKecuali.join(", ") : ""), true);
          } catch (e) { catat("VIP / level / aset", String(e.message || e), false); }
        }
        if (pilih.nama || pilih.foto) {
          setProgres("Mengambil daftar user…");
          let daftar = [];
          try { daftar = await semuaUid(); }
          catch (e) { catat("Daftar user", "Tidak bisa dibaca: " + String(e.message || e), false); }
          if (daftar.length) {
            let beres = 0, gagal = 0;
            for (const u of daftar) {
              beres++;
              setProgres("Memproses " + beres + "/" + daftar.length + " user…");
              try {
                if (pilih.nama) await panelAksi("reset_nama", { uid: u });
                if (pilih.foto) await panelAksi("reset_foto", { uid: u });
              } catch (e) { gagal++; }
            }
            catat(pilih.nama && pilih.foto ? "Nama & foto profil" : pilih.nama ? "Nama" : "Foto profil",
              daftar.length - gagal + " user beres" + (gagal ? ", " + gagal + " gagal" : ""), gagal === 0);
          }
        }
      } else {
        const f = { coins: !!pilih.coin, gems: !!pilih.diamond, vip: !!pilih.vip, level: !!pilih.level, assets: !!pilih.aset };
        if (Object.values(f).some(Boolean)) {
          setProgres("Meriset saldo dan aset " + target + "…");
          try {
            await walletAdmin({ op: "reset_user", uid: target, ...f }, 60000);
            catat("Saldo, VIP, level, aset", "Direset untuk " + target, true);
          } catch (e) { catat("Saldo, VIP, level, aset", String(e.message || e), false); }
        }
        if (pilih.nama) {
          setProgres("Meriset nama " + target + "…");
          try { await panelAksi("reset_nama", { uid: target }); catat("Nama", "Nama " + target + " kembali Unknown", true); }
          catch (e) { catat("Nama", String(e.message || e), false); }
        }
        if (pilih.foto) {
          setProgres("Meriset foto profil " + target + "…");
          try { await panelAksi("reset_foto", { uid: target }); catat("Foto profil", "Foto " + target + " dikosongkan", true); }
          catch (e) { catat("Foto profil", String(e.message || e), false); }
        }
      }
      await catatLog("Reset " + (semua ? "semua user" : target), ringkas());
      toast("Reset selesai");
    } catch (e) {
      toast("Gagal: " + (e.message || e), true);
    } finally {
      setProgres("");
      setSibuk(false);
    }
  };

  return (
    <>
      <Panel judul="Reset user" sub="Kosongkan coin, diamond, VIP, XP/level, foto profil, nama, atau aset My Item untuk satu akun atau semua akun. Tidak bisa dibatalkan."
        aksi={<button className="tombolBaru" onClick={() => setTanya(true)} disabled={!siap || sibuk}>
          {sibuk ? (progres || "Memproses…") : "Reset sekarang"}
        </button>}>

        <div className="barisSaklar"><b>Sasaran</b>
          <span style={{ display: "flex", gap: 8 }}>
            <button type="button" className={"pil" + (!semua ? " on" : "")} onClick={() => setSemua(false)}>Satu user</button>
            <button type="button" className={"pil" + (semua ? " on" : "")} onClick={() => setSemua(true)}>Semua user</button>
          </span>
        </div>

        {!semua ? (
          <label className="isianForm"><span>UID user yang direset</span>
            <input value={uid} onChange={(e) => setUid(e.target.value)} placeholder="UID akun, bukan nama" />
          </label>
        ) : (
          <>
            <label className="isianForm"><span>Kecuali UID (opsional, pisahkan koma) — akun yang tidak ikut direset</span>
              <input value={kecuali} onChange={(e) => setKecuali(e.target.value)} placeholder="mis. uidOwner, uidAdmin" />
            </label>
            <label className="isianForm"><span>Ketik HAPUS untuk mengizinkan reset semua user</span>
              <input value={ketik} onChange={(e) => setKetik(e.target.value)} placeholder="HAPUS" />
            </label>
          </>
        )}

        <div className="barisSaklar" style={{ marginTop: 12 }}><b>Yang direset</b>
          <span style={{ fontSize: 12, color: "#9a9cab" }}>{adaPilihan ? ringkas() : "belum ada yang dipilih"}</span>
        </div>
        <div style={{ display: "grid", gap: 8, marginBottom: 12 }}>
          {BAGIAN.map(([k, nama, ket]) => (
            <label key={k} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", cursor: "pointer",
              background: pilih[k] ? "#2a2231" : "#1f1f2b", border: "1px solid " + (pilih[k] ? "#e8538f" : "#2b2b3a"), borderRadius: 5,
            }}>
              <input type="checkbox" checked={!!pilih[k]} onChange={() => putar(k)} />
              <span style={{ flex: "1 1 auto" }}>
                <b style={{ fontSize: 13 }}>{nama}</b>
                <div className="catatan" style={{ padding: 0 }}>{ket}</div>
              </span>
            </label>
          ))}
        </div>

        <div className="catatan" style={{ color: "#f0a3a3" }}>
          Reset tidak bisa dibatalkan. Untuk semua user, akun yang ditulis di kolom Kecuali tidak ikut direset. Reset nama dan foto semua user berjalan satu per satu, jadi bisa memakan waktu bila user banyak.
        </div>

        {hasil.length ? (
          <div style={{ marginTop: 14 }}>
            <div className="barisSaklar"><b>Hasil</b></div>
            {hasil.map((h, i) => (
              <div key={i} className="catatan" style={{ padding: "6px 0", borderBottom: "1px solid #2b2b3a", color: h.ok ? "#83d8ae" : "#f0a3a3" }}>
                <b>{h.nama}</b> · {h.pesan}
              </div>
            ))}
          </div>
        ) : null}
      </Panel>

      <Konfirmasi buka={tanya} judul="Reset sekarang?"
        pesan={"Akan direset: " + ringkas() + ". Sasaran: " + (semua ? "SEMUA user" + (daftarKecuali.length ? " kecuali " + daftarKecuali.join(", ") : "") : uid.trim()) + ". Tindakan ini tidak bisa dibatalkan."}
        tombol="Ya, reset" sibuk={sibuk} onYa={jalan} onTidak={() => setTanya(false)} />
    </>
  );
}

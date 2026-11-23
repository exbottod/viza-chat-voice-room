import { useEffect, useMemo, useState } from "react";
import { walletAdmin } from "../dompet.js";
import { useKoleksi, rupiah, waktu, catatLog } from "../data.js";
import { Panel, toast } from "../ui.jsx";

/**
 * Kirim coin, diamond, dan VIP ke satu akun.
 *
 * Pencarian memakai dua koleksi: users/{uid} (nama, email, nomor ID angka) dan
 * userIds/{nomor} (nomor ID angka + VIP). Saldo coin/diamond dibaca dari server
 * dompet (op fs_list wallets) karena aturan Firestore membatasi koleksi itu.
 *
 * Semua perubahan saldo dikerjakan server (op hadiah_user) dan hanya boleh
 * dipanggil developer, lalu dicatat di Log admin supaya bisa ditelusuri.
 */
const NOMINAL = [1000, 10000, 100000, 1000000];
const VIP_TIER = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function SendCoin() {
  const users = useKoleksi("users", 500);
  const ids = useKoleksi("userIds", 500);
  const [dompet, setDompet] = useState({});
  const [kata, setKata] = useState("");
  const [pilih, setPilih] = useState(null);
  const [form, setForm] = useState({ coins: "", diamonds: "", vip: "0", hari: "30", catatan: "", nomor: "" });
  const [semua, setSemua] = useState(false);
  const [ketik, setKetik] = useState("");
  const [sibuk, setSibuk] = useState(false);
  const [hasil, setHasil] = useState(null);
  const [riwayat, setRiwayat] = useState([]);

  // Saldo terbaru dari server (akun layanan), bukan dari Firestore langsung.
  const muatDompet = () => {
    walletAdmin({ op: "fs_list", koleksi: "wallets", batas: 500 })
      .then((r) => {
        const peta = {};
        (r?.items || []).forEach((d) => { peta[String(d.id || "")] = d; });
        setDompet(peta);
      })
      .catch(() => {});
  };
  useEffect(() => { muatDompet(); }, []);

  /** Daftar user: nomor ID angka, nama, email, saldo. */
  const daftar = useMemo(() => {
    const peta = new Map();
    ids.isi.forEach((d) => {
      const nomor = /^\d{3,}$/.test(String(d.id || "")) ? String(d.id) : "";
      const uid = String(d.uid || "");
      if (!uid) return;
      peta.set(uid, { uid, nomor, nama: "", email: "", vip: Number(d.vip || 0) });
    });
    users.isi.forEach((u) => {
      const uid = String(u.id || "");
      if (!uid) return;
      const lama = peta.get(uid) || { uid, nomor: "", nama: "", email: "", vip: 0 };
      peta.set(uid, {
        ...lama,
        nama: String(u.name || u.nama || ""),
        email: String(u.email || ""),
        nomor: lama.nomor || (/^\d{3,}$/.test(String(u.userId || "")) ? String(u.userId) : ""),
      });
    });
    return [...peta.values()].map((x) => ({ ...x, saldo: dompet[x.uid] || {} }));
  }, [ids.isi, users.isi, dompet]);

  const hasilCari = useMemo(() => {
    const k = kata.trim().toLowerCase();
    const dasar = k
      ? daftar.filter((u) =>
          u.nomor.includes(k) ||
          u.uid.toLowerCase().includes(k) ||
          (u.nama || "").toLowerCase().includes(k) ||
          (u.email || "").toLowerCase().includes(k))
      : daftar;
    return dasar.slice(0, 40);
  }, [daftar, kata]);

  const kirim = async () => {
    const nomor = String(form.nomor || "").replace(/[^0-9]/g, "");
    if (!semua && !pilih && !nomor) return toast("Pilih user atau isi nomor ID", true);
    if (semua && ketik.trim().toUpperCase() !== "KIRIM") return toast("Ketik KIRIM untuk mengonfirmasi kirim ke semua user", true);
    const coin = Math.max(0, Math.trunc(Number(form.coins) || 0));
    const gem = Math.max(0, Math.trunc(Number(form.diamonds) || 0));
    const vip = Math.max(0, Math.min(9, Math.trunc(Number(form.vip) || 0)));
    const hari = Math.max(0, Math.trunc(Number(form.hari) || 0));
    if (!coin && !gem && !vip) return toast("Isi coin, diamond, atau VIP dulu", true);
    setSibuk(true);
    setHasil(null);
    try {
      // Nomor ID dicari dulu di daftar yang sudah dimuat panel, jadi tetap
      // jalan walau server sedang tidak bisa membaca Firestore.
      const dariDaftar = !pilih && nomor ? daftar.find((u) => u.nomor === nomor) : null;
      const out = await walletAdmin(semua
        ? { op: "hadiah_user", semua: 1, coins: coin, diamonds: gem, vip, hari }
        : { op: "hadiah_user", uid: pilih?.uid || dariDaftar?.uid || "", id: nomor, coins: coin, diamonds: gem, vip, hari });
      if (Number(out?.ok) !== 1) throw new Error(out?.e || "Server menolak");
      const tujuan = semua ? "SEMUA USER" : (pilih?.nama || ("ID " + (nomor || pilih?.nomor || "")));
      const rincian = [
        coin ? rupiah(coin) + " coin" : "",
        gem ? rupiah(gem) + " diamond" : "",
        vip ? "VIP " + vip + (hari ? " · " + hari + " hari" : "") : "",
      ].filter(Boolean).join(" · ");
      setHasil({ ...out, rincian, tujuan });
      setRiwayat((r) => [{ nama: tujuan, rincian, at: Date.now() }, ...r].slice(0, 10));
      await catatLog("Kirim coin ke user", tujuan + " · " + rincian + (form.catatan ? " · " + form.catatan : ""));
      toast("Terkirim: " + rincian);
      muatDompet();
    } catch (e) {
      toast("Gagal: " + (e.message || e), true);
    } finally {
      setSibuk(false);
    }
  };

  return (
    <>
      <Panel judul="Send coin"
        sub="Kirim coin, diamond, atau VIP ke satu akun. Cari memakai nama, email, nomor ID angka, atau UID. Saldo langsung berubah di aplikasi dan setiap pengiriman tercatat di Log admin.">
        <label className="isianForm"><span>Cari user (nama, nomor ID, email, UID)</span>
          <input value={kata} onChange={(e) => setKata(e.target.value)} placeholder="mis. 1000 atau Nurul" />
        </label>

        <div className="barisSaklar"><b>Kirim ke semua user</b>
          <button type="button" className={"saklar" + (semua ? " nyala" : "")}
            onClick={() => { setSemua(!semua); setPilih(null); }}><i /></button>
        </div>
        {semua ? (
          <label className="isianForm"><span>Ketik KIRIM untuk konfirmasi ke semua user</span>
            <input value={ketik} onChange={(e) => setKetik(e.target.value)} placeholder="KIRIM" />
          </label>
        ) : (
          <label className="isianForm"><span>Atau langsung isi nomor ID user (mis. 1000)</span>
            <input value={form.nomor} inputMode="numeric" placeholder="1000"
              onChange={(e) => { setForm({ ...form, nomor: e.target.value }); setPilih(null); }} />
          </label>
        )}

        <div className="daftarPilih">
          {hasilCari.length ? hasilCari.map((u) => (
            <button type="button" key={u.uid}
              className={"barisPilih" + (pilih?.uid === u.uid ? " on" : "")}
              onClick={() => { setPilih(u); setHasil(null); }}>
              <b>{u.nama || "(tanpa nama)"}</b>
              <span>ID {u.nomor || "-"} · UID {u.uid.slice(0, 10)}…</span>
              <span>Coin {rupiah(u.saldo?.coins ?? 0)} · Diamond {rupiah(u.saldo?.diamonds ?? 0)} · VIP {Number(u.saldo?.vip ?? u.vip ?? 0)}</span>
            </button>
          )) : <div className="kosong">Tidak ada user yang cocok.</div>}
        </div>

        {(pilih || semua || String(form.nomor).trim()) ? (
          <>
            <div className="catatan">
              {semua ? <><b>Dikirim ke SEMUA USER</b> · jumlah user dibaca server</>
                : <><b>Dikirim ke: {pilih?.nama || "(nomor ID)"}</b> · ID {form.nomor || pilih?.nomor || "-"}{pilih ? " · UID " + pilih.uid : ""}</>}
            </div>

            <label className="isianForm"><span>Coin</span>
              <input value={form.coins} inputMode="numeric" placeholder="0"
                onChange={(e) => setForm({ ...form, coins: e.target.value })} />
            </label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
              {NOMINAL.map((n) => (
                <button type="button" key={n} className="pil"
                  onClick={() => setForm({ ...form, coins: String(n) })}>{rupiah(n)}</button>
              ))}
            </div>

            <label className="isianForm"><span>Diamond</span>
              <input value={form.diamonds} inputMode="numeric" placeholder="0"
                onChange={(e) => setForm({ ...form, diamonds: e.target.value })} />
            </label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
              {NOMINAL.map((n) => (
                <button type="button" key={n} className="pil"
                  onClick={() => setForm({ ...form, diamonds: String(n) })}>{rupiah(n)}</button>
              ))}
            </div>

            <label className="isianForm"><span>VIP (0 = tidak diubah)</span>
              <select value={form.vip} onChange={(e) => setForm({ ...form, vip: e.target.value })}>
                <option value="0">Tidak diubah</option>
                {VIP_TIER.map((v) => <option key={v} value={String(v)}>VIP {v}</option>)}
              </select>
            </label>
            <label className="isianForm"><span>Masa aktif VIP (hari)</span>
              <input value={form.hari} inputMode="numeric"
                onChange={(e) => setForm({ ...form, hari: e.target.value })} />
            </label>
            <div className="catatan">Masa aktif ditambahkan dari sisa yang masih berjalan, jadi hari lama tidak hilang.</div>

            <label className="isianForm"><span>Catatan (opsional, masuk Log admin)</span>
              <input value={form.catatan} onChange={(e) => setForm({ ...form, catatan: e.target.value })}
                placeholder="mis. hadiah juara event" />
            </label>

            <button className="tombolBaru" onClick={kirim} disabled={sibuk}>
              {sibuk ? "Mengirim…" : semua ? "Kirim ke semua user" : "Kirim sekarang"}
            </button>

            {hasil ? (
              <div className="catatan">
                Terkirim ke {hasil.tujuan}: {hasil.rincian}.{Number(hasil.jumlah) ? " Jumlah akun: " + rupiah(hasil.jumlah) + "." : ""} Saldo sekarang: coin {rupiah(hasil.coins)} · diamond {rupiah(hasil.diamonds)}
                {Number(hasil.vip) ? " · VIP " + hasil.vip + (Number(hasil.vipUntil) ? " sampai " + waktu(hasil.vipUntil) : "") : ""}
              </div>
            ) : null}
          </>
        ) : null}

        {riwayat.length ? (
          <>
            <div className="judulPratinjau" style={{ marginTop: 14 }}>Pengiriman terakhir (sesi ini)</div>
            {riwayat.map((r, i) => (
              <div key={i} className="catatan">
                <b>{r.nama || "(tanpa nama)"}</b> · ID {r.nomor || "-"} · {r.rincian}
              </div>
            ))}
          </>
        ) : null}
      </Panel>
    </>
  );
}

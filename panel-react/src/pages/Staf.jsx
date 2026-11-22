import { useEffect, useMemo, useState } from "react";
import { walletAdmin } from "../dompet.js";
import { ambilSemuaMentah, catatLog, rupiah, teks } from "../data.js";
import { Konfirmasi, Laci, Panel, Rangka, Tabel, Tag, toast } from "../ui.jsx";
import AdminPanel from "./AdminPanel.jsx";

export default function Staf() {
  const [staf, setStaf] = useState(null);
  const [agency, setAgency] = useState([]);
  const [galat, setGalat] = useState("");
  const [form, setForm] = useState(null);
  const [koin, setKoin] = useState(null);
  const [tanya, setTanya] = useState(null);
  const [sibuk, setSibuk] = useState(false);
  const [cariPemilik, setCariPemilik] = useState("");
  const [users, setUsers] = useState([]);

  // Daftar akun untuk memilih pemilik agensi: nama, nomor ID, UID, foto.
  // Dibaca langsung dan lewat server dompet, karena aturan Firestore menolak
  // pembacaan langsung untuk sebagian akun.
  useEffect(() => {
    let hidup = true;
    const baca = (nama) => Promise.allSettled([
      ambilSemuaMentah(nama, 800),
      walletAdmin({ op: "fs_list", koleksi: nama, batas: 500 }).then((r) => r?.items || []),
    ]).then((h) => h.flatMap((x) => (x.status === "fulfilled" ? x.value : [])));
    (async () => {
      const [ids, us] = await Promise.all([baca("userIds"), baca("users")]);
      const peta = new Map();
      const ambil = (uid) => {
        const u = String(uid || "").trim();
        if (!u || /^\d+$/.test(u)) return null;
        if (!peta.has(u)) peta.set(u, { uid: u, nomor: "", nama: "", foto: "" });
        return peta.get(u);
      };
      ids.forEach((d) => {
        const o = ambil(d.uid); if (!o) return;
        const nomor = /^\d{3,}$/.test(String(d.id || "")) ? String(d.id) : String(d.userId || "");
        if (!o.nomor && nomor) o.nomor = nomor;
        if (!o.nama) o.nama = teks(d.name) || teks(d.nama);
      });
      us.forEach((d) => {
        const o = ambil(d.uid || d.id); if (!o) return;
        if (!o.nomor && d.userId) o.nomor = teks(d.userId);
        o.nama = teks(d.nickname) || teks(d.name) || o.nama;
        o.foto = o.foto || teks(d.photoUrl) || teks(d.photo) || teks(d.avatar);
      });
      if (hidup) setUsers([...peta.values()]);
    })().catch(() => {});
    return () => { hidup = false; };
  }, []);

  const petaUser = useMemo(() => { const p = {}; users.forEach((u) => { p[u.uid] = u; }); return p; }, [users]);
  const kataPemilik = cariPemilik.trim().toLowerCase();
  const cocokPemilik = !kataPemilik ? [] : users.filter((u) => (u.nama || "").toLowerCase().includes(kataPemilik)
    || u.uid.toLowerCase().includes(kataPemilik) || (u.nomor || "").includes(kataPemilik)).slice(0, 8);

  const muat = async () => {
    const hasil = await Promise.allSettled([walletAdmin({ op: "panel_list" }), walletAdmin({ op: "agency_list" })]);
    if (hasil[0].status === "fulfilled") { setStaf(hasil[0].value.list || []); setGalat(""); }
    else { setStaf([]); setGalat(hasil[0].reason?.message || String(hasil[0].reason)); }
    setAgency(hasil[1].status === "fulfilled" ? (hasil[1].value.agency || []) : []);
  };
  useEffect(() => { muat(); }, []);

  const simpanAgency = async () => {
    const pemilik = String(form.owner_uid || form.ownerUid || "").trim();
    if (/^\d+$/.test(pemilik)) { toast("Pemilik harus dipilih dari kotak cari, bukan ID angka", true); return; }
    setSibuk(true);
    try {
      await walletAdmin({ op: "agency_save", id: form.id || "", nama: form.nama.trim(), ownerUid: pemilik, rate: Number(form.rate) || 0, aktif: form.aktif ? 1 : 0 });
      await catatLog("Simpan agensi", form.nama + (pemilik ? " · pemilik " + pemilik : ""));
      toast(pemilik ? "Agensi disimpan, pemilik langsung melihat menu Agensi di aplikasi" : "Agensi disimpan tanpa pemilik");
      setForm(null); setCariPemilik("");
      await muat();
    } catch (e) { toast("Gagal: " + (e.message || e), true); }
    finally { setSibuk(false); }
  };

  const tambahKoin = async (mode) => {
    setSibuk(true);
    try {
      const n = Math.abs(Number(koin.nilai) || 0);
      await walletAdmin({ op: mode === "set" ? "panel_coin_set" : "panel_coin_add", uid: koin.uid, coins: n });
      await catatLog("Coin staf", mode + " " + n + " · " + koin.uid);
      toast("Saldo staf diperbarui");
      setKoin(null);
      await muat();
    } catch (e) { toast("Gagal: " + (e.message || e), true); }
    finally { setSibuk(false); }
  };

  if (staf === null) return <Rangka baris={6} />;

  return (
    <>
      <AdminPanel />

      <Panel judul="Staf panel" sub="Akun yang boleh membuka panel ini. Saldo coin dipakai untuk membeli stok frame dan efek.">
        {galat ? <div className="kosong">Belum bisa dimuat: {galat}</div> : null}
        <Tabel
          kolom={[{ k: "uid", t: "UID" }, { k: "role", t: "Peran" }, { k: "coins", t: "Coin" }, { k: "stok", t: "Item" }, { k: "active", t: "Status" }, { k: "aksi", t: "" }]}
          baris={staf.map((x) => ({
            uid: x.uid, role: x.role + (Number(x.manager) ? " · manager" : ""), coins: rupiah(x.coins),
            stok: rupiah(x.stok), active: <Tag jenis={Number(x.active) ? "aktif" : "mati"}>{Number(x.active) ? "Aktif" : "Nonaktif"}</Tag>,
            aksi: (
              <span style={{ display: "flex", gap: 10 }}>
                <a className="tautanPink" onClick={() => setKoin({ uid: x.uid, nilai: "", mode: "add" })}>Coin</a>
                <a className="tautanPink" onClick={() => setTanya(x)}>Cabut</a>
              </span>
            ),
          }))}
          kosong="Belum ada staf terdaftar."
        />
      </Panel>

      <Panel judul="Host & Agency" sub="Agensi mengumpulkan host dan bagi hasil bulanan."
        aksi={<button className="tombolBaru" onClick={() => setForm({ nama: "", ownerUid: "", rate: 10, aktif: 1 })}>Tambah agensi</button>}>
        <Tabel
          kolom={[{ k: "nama", t: "Agensi" }, { k: "kode", t: "Kode" }, { k: "owner_uid", t: "Pemilik" }, { k: "host", t: "Host" }, { k: "rate", t: "Bagi hasil" }, { k: "bulan_ini", t: "Bulan ini" }, { k: "aksi", t: "" }]}
          baris={agency.map((x) => ({
            nama: x.nama, kode: x.kode || "-",
            owner_uid: x.owner_uid ? (
              <span className="user">
                <span className="mini">{petaUser[x.owner_uid]?.foto ? <img src={petaUser[x.owner_uid].foto} alt="" /> : ((petaUser[x.owner_uid]?.nama || "?")[0] || "?").toUpperCase()}</span>
                <span>
                  {petaUser[x.owner_uid]?.nama || "(tanpa nama)"}<br />
                  <small>{petaUser[x.owner_uid]?.nomor ? "ID " + petaUser[x.owner_uid].nomor : String(x.owner_uid).slice(0, 10) + "…"}</small>
                </span>
              </span>
            ) : <Tag jenis="mati">belum ada pemilik</Tag>,
            host: rupiah(x.host),
            rate: Number(x.rate) + "%", bulan_ini: rupiah(x.bulan_ini),
            aksi: <span style={{ display: "flex", gap: 10 }}>
              <a className="tautanPink" onClick={() => setForm({ ...x, aktif: Number(x.aktif) })}>Edit</a>
              <a className="tautanPink" onClick={() => setTanya({ jenis: "agency", ...x })}>Hapus</a>
            </span>,
          }))}
          kosong="Belum ada agensi."
        />
      </Panel>

      <Laci buka={!!form} judul={form?.id ? "Edit agensi" : "Tambah agensi"} onTutup={() => setForm(null)}
        kaki={<button className="tombolBaru" onClick={simpanAgency} disabled={sibuk || !form?.nama?.trim()}>{sibuk ? "Menyimpan…" : "Simpan"}</button>}>
        {form ? (
          <>
            <label className="isianForm"><span>Nama agensi</span><input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} /></label>
            {(() => {
              const uidP = String(form.owner_uid || form.ownerUid || "").trim();
              const pu = petaUser[uidP];
              return (
                <>
                  <div className="isianForm"><span>Pemilik agensi</span>
                    {uidP ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0" }}>
                        <span className="mini">{pu?.foto ? <img src={pu.foto} alt="" /> : ((pu?.nama || "?")[0] || "?").toUpperCase()}</span>
                        <span style={{ flex: "1 1 auto", minWidth: 0 }}>
                          <b>{pu?.nama || "(tanpa nama)"}</b><br />
                          <small>{pu?.nomor ? "ID " + pu.nomor + " · " : ""}{uidP}</small>
                        </span>
                        <button type="button" className="pil" onClick={() => setForm({ ...form, owner_uid: "", ownerUid: "" })}>Ganti</button>
                      </div>
                    ) : <div className="catatan" style={{ padding: 0 }}>Belum ada pemilik. Cari akunnya di bawah.</div>}
                  </div>
                  {!uidP ? (
                    <label className="isianForm"><span>Cari akun (nama, nomor ID, atau UID)</span>
                      <input value={cariPemilik} onChange={(e) => setCariPemilik(e.target.value)} placeholder="mis. 1000" />
                    </label>
                  ) : null}
                  {!uidP && kataPemilik ? (
                    <div className="catatan" style={{ marginBottom: 10 }}>
                      {!cocokPemilik.length ? "Tidak ada akun yang cocok." : cocokPemilik.map((u) => (
                        <div key={u.uid} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", borderBottom: "1px solid #2b2b3a" }}>
                          <span className="mini" style={{ flex: "0 0 auto" }}>{u.foto ? <img src={u.foto} alt="" /> : ((u.nama || "?")[0] || "?").toUpperCase()}</span>
                          <span style={{ flex: "1 1 auto", minWidth: 0 }}>
                            <b>{u.nama || "(tanpa nama)"}</b><br /><small>{u.nomor ? "ID " + u.nomor + " · " : ""}{u.uid}</small>
                          </span>
                          <button type="button" className="pil" onClick={() => { setForm({ ...form, owner_uid: u.uid, ownerUid: u.uid }); setCariPemilik(""); }}>Pilih</button>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </>
              );
            })()}
            <label className="isianForm"><span>Bagi hasil (%)</span><input value={form.rate} onChange={(e) => setForm({ ...form, rate: e.target.value })} inputMode="numeric" /></label>
            <div className="barisSaklar"><b>Aktif</b>
              <button type="button" className={"saklar" + (form.aktif ? " nyala" : "")} onClick={() => setForm({ ...form, aktif: form.aktif ? 0 : 1 })}><i /></button>
            </div>
          </>
        ) : null}
      </Laci>

      <Laci buka={!!koin} judul="Saldo coin staf" onTutup={() => setKoin(null)}
        kaki={<span style={{ display: "flex", gap: 10 }}>
          <button className="tombolBaru polos" onClick={() => tambahKoin("set")} disabled={sibuk}>Setel</button>
          <button className="tombolBaru" onClick={() => tambahKoin("add")} disabled={sibuk}>Tambah</button>
        </span>}>
        {koin ? (
          <>
            <div className="catatan" style={{ marginTop: 0 }}>UID {koin.uid}. "Tambah" menambah saldo, "Setel" menjadikan jumlah ini saldo akhir.</div>
            <label className="isianForm"><span>Jumlah coin</span><input value={koin.nilai} onChange={(e) => setKoin({ ...koin, nilai: e.target.value })} inputMode="numeric" /></label>
          </>
        ) : null}
      </Laci>

      <Konfirmasi buka={!!tanya}
        judul={tanya?.jenis === "agency" ? "Hapus agensi?" : "Cabut akses panel?"}
        pesan={tanya?.jenis === "agency" ? "Agensi " + (tanya?.nama || "") + " akan dihapus." : "Akun " + (tanya?.uid || "") + " tidak bisa membuka panel lagi."}
        tombol="Lanjut" sibuk={sibuk}
        onYa={async () => {
          setSibuk(true);
          try {
            if (tanya.jenis === "agency") await walletAdmin({ op: "agency_del", id: tanya.id });
            else await walletAdmin({ op: "panel_revoke", uid: tanya.uid });
            await catatLog(tanya.jenis === "agency" ? "Hapus agensi" : "Cabut akses panel", tanya.nama || tanya.uid);
            toast("Selesai");
            setTanya(null);
            await muat();
          } catch (e) { toast("Gagal: " + (e.message || e), true); }
          finally { setSibuk(false); }
        }}
        onTidak={() => setTanya(null)} />
    </>
  );
}

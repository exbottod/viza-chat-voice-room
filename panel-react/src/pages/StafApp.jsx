import { useEffect, useMemo, useState } from "react";
import { walletAdmin } from "../dompet.js";
import { ambilSemuaMentah, catatLog, rupiah, teks, waktu } from "../data.js";
import { bacaRtdbServer } from "../unggah.js";
import { Kartu, Konfirmasi, Laci, Panel, Pil, Tag, Tabel, Rangka, toast } from "../ui.jsx";
import Seller from "./Seller.jsx";

/**
 * Staf aplikasi: manager dan admin yang memakai panel manager/admin DI DALAM
 * aplikasi (bukan staf panel developer). Haknya disimpan di server dompet
 * (tabel panel_staf), stok coin di kolom coins, dan stok aset di panel_stock.
 *
 * Semua aksi memakai operasi server yang sudah ada: panel_list, panel_grant,
 * panel_revoke, panel_coin_add, panel_coin_set, panel_stock_list,
 * panel_stock_add, panel_stock_del. Jadi tidak perlu build APK.
 */
const KET = {
  manager: {
    judul: "Manager aplikasi",
    sub: "Manager memakai panel manager di aplikasi: mengisi stok coin ke seller dan membagikan aset. Isi stok coin dan stok asetnya dari sini.",
  },
  admin: {
    judul: "Admin aplikasi",
    sub: "Admin memakai panel admin di aplikasi dan terikat ke satu manager. Isi stok coin dan stok asetnya dari sini.",
  },
};

/** Angka besar diringkas (jt, M, T) supaya kartu dan kolom tidak melebar. */
const ringkas = (n) => {
  const a = Math.abs(Number(n) || 0);
  if (a >= 1e12) return (n / 1e12).toFixed(a >= 1e14 ? 0 : 1).replace(/\.0$/, "") + " T";
  if (a >= 1e9) return (n / 1e9).toFixed(1).replace(/\.0$/, "") + " M";
  if (a >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + " jt";
  return rupiah(n);
};

/**
 * Daftar user untuk nama, nomor ID, dan foto. Dibaca langsung dari Firestore
 * lebih dulu, lalu dilengkapi lewat server dompet (akun layanan) karena aturan
 * Firestore menolak pembacaan langsung dari browser untuk banyak akun. Tanpa
 * jalur server, nama dan ID staf tampil kosong.
 */
function pakaiDaftarUser() {
  const [daftar, setDaftar] = useState([]);
  useEffect(() => {
    let hidup = true;
    const baca = (nama) => Promise.allSettled([
      ambilSemuaMentah(nama, 800),
      walletAdmin({ op: "fs_list", koleksi: nama, batas: 500 }).then((r) => r?.items || []),
    ]).then((h) => h.flatMap((x) => (x.status === "fulfilled" ? x.value : [])));
    (async () => {
      const [ids, users] = await Promise.all([baca("userIds"), baca("users")]);
      const peta = new Map();
      const ambil = (uid) => {
        const u = String(uid || "").trim();
        if (!u || /^\d+$/.test(u)) return null;
        if (!peta.has(u)) peta.set(u, { uid: u, nomor: "", nama: "", foto: "" });
        return peta.get(u);
      };
      ids.forEach((d) => {
        const o = ambil(d.uid);
        if (!o) return;
        const nomor = /^\d{3,}$/.test(String(d.id || "")) ? String(d.id) : String(d.userId || "");
        if (!o.nomor && nomor) o.nomor = nomor;
        if (!o.nama) o.nama = teks(d.name) || teks(d.nama);
      });
      users.forEach((d) => {
        const o = ambil(d.uid || d.id);
        if (!o) return;
        if (!o.nomor && d.userId) o.nomor = teks(d.userId);
        o.nama = teks(d.nickname) || teks(d.name) || o.nama;
        o.foto = o.foto || teks(d.photoUrl) || teks(d.photo) || teks(d.avatar);
      });
      if (hidup) setDaftar([...peta.values()]);
    })().catch(() => {});
    return () => { hidup = false; };
  }, []);
  return daftar;
}

/**
 * Satu tab "Staf App" dengan pilihan peran seperti sheet: Coin seller,
 * Manager, dan Admin. Semua staf di sini adalah staf DI DALAM aplikasi,
 * bukan staf panel developer.
 */
const PERAN = [
  ["coinseller", "Coin seller", "Menjual coin ke user lewat panel seller di aplikasi"],
  ["manager", "Manager", "Panel manager di aplikasi: isi coin ke seller dan bagikan aset"],
  ["admin", "Admin", "Panel admin di aplikasi, terikat ke satu manager"],
];

export function StafAppShell({ awal = "coinseller" }) {
  const [pilih, setPilih] = useState(awal);
  useEffect(() => { setPilih(awal); }, [awal]);
  const info = PERAN.find(([id]) => id === pilih) || PERAN[0];
  return (
    <>
      <Panel judul="Staf App" sub={info[2]}>
        <div className="filter" style={{ gap: 8 }}>
          {PERAN.map(([id, nama]) => (
            <Pil key={id} on={pilih === id} onClick={() => setPilih(id)}>{nama}</Pil>
          ))}
        </div>
      </Panel>
      {pilih === "coinseller" ? <Seller /> : <StafApp peran={pilih} />}
    </>
  );
}

export default function StafApp({ peran = "manager" }) {
  const ket = KET[peran] || KET.manager;
  const users = pakaiDaftarUser();
  const [baris, setBaris] = useState(null);
  const [galat, setGalat] = useState("");
  const [cari, setCari] = useState("");
  const [sibuk, setSibuk] = useState(false);
  const [coin, setCoin] = useState(null);
  const [aset, setAset] = useState(null);
  const [tanya, setTanya] = useState(null);

  const muat = async () => {
    try {
      const out = await walletAdmin({ op: "panel_list" });
      setBaris(Array.isArray(out.list) ? out.list : []);
      setGalat("");
    } catch (e) { setBaris([]); setGalat(e.message || String(e)); }
  };
  useEffect(() => { muat(); }, [peran]);

  const petaUser = useMemo(() => {
    const p = {};
    users.forEach((u) => { p[u.uid] = u; });
    return p;
  }, [users]);

  const data = useMemo(() => (baris || [])
    .filter((x) => String(x.role || "") === peran)
    .map((x) => {
      const u = petaUser[String(x.uid || "")] || {};
      return {
        __kunci: String(x.uid || "") + "|" + x.role,
        uid: String(x.uid || ""),
        nomor: String(u.nomor || ""),
        nama: String(u.nama || ""),
        foto: String(u.foto || ""),
        manager: String(x.manager || ""),
        coins: Number(x.coins || 0),
        stok: Number(x.stok || 0),
        aktif: Number(x.active ?? 1) !== 0,
        dibuat: Number(x.created_at || 0),
      };
    }), [baris, peran, petaUser]);

  const kata = cari.trim().toLowerCase();
  const cocok = !kata ? [] : users.filter((u) => u.nama.toLowerCase().includes(kata)
    || u.uid.toLowerCase().includes(kata) || u.nomor.includes(kata)).slice(0, 12);

  const beri = async (u) => {
    if (sibuk) return;
    setSibuk(true);
    try {
      await walletAdmin({
        op: "panel_grant", uid: u.uid, role: peran,
        ...(peran === "admin" ? { manager: String(u.manager || "") } : {}),
      });
      await catatLog("Beri akses " + peran, (u.nama || "") + " · " + u.uid);
      toast((u.nama || u.uid) + " sekarang " + peran + " aplikasi");
      setCari("");
      await muat();
    } catch (e) { toast("Gagal: " + (e.message || e), true); }
    finally { setSibuk(false); }
  };

  const cabut = async () => {
    const t = tanya;
    setTanya(null);
    if (!t || sibuk) return;
    setSibuk(true);
    try {
      await walletAdmin({ op: "panel_revoke", uid: t.uid, role: peran });
      await catatLog("Cabut " + peran, (t.nama || "") + " · " + t.uid);
      toast("Akses " + peran + " dicabut");
      await muat();
    } catch (e) { toast("Gagal: " + (e.message || e), true); }
    finally { setSibuk(false); }
  };

  const simpanCoin = async (mode) => {
    if (!coin || sibuk) return;
    const n = Math.trunc(Number(coin.nilai) || 0);
    if (mode !== "set" && !n) { toast("Isi jumlah coin dulu", true); return; }
    setSibuk(true);
    try {
      await walletAdmin({ op: mode === "set" ? "panel_coin_set" : "panel_coin_add", uid: coin.uid, role: peran, coins: n });
      await catatLog("Stok coin " + peran, mode + " " + n + " · " + coin.uid);
      toast(mode === "set" ? "Stok coin diset " + rupiah(n) : "Stok coin ditambah " + rupiah(n));
      setCoin(null);
      await muat();
    } catch (e) { toast("Gagal: " + (e.message || e), true); }
    finally { setSibuk(false); }
  };

  const kolom = [
    {
      kunci: "nama", label: "STAF", urut: true,
      sel: (x) => (
        <div className="user">
          <div className="mini">
            {x.foto ? <img src={x.foto} alt="" /> : (x.nama ? x.nama[0].toUpperCase() : "?")}
          </div>
          <div>
            <div>{x.nama || "(tanpa nama)"}</div>
            <div className="catatan" style={{ padding: 0, marginTop: 2 }}>
              {x.nomor ? "ID " + x.nomor : "ID belum ada"}
            </div>
          </div>
        </div>
      ),
    },
    { kunci: "uid", label: "UID", sel: (x) => <span style={{ fontFamily: "monospace", fontSize: 11 }} title={x.uid}>{x.uid.slice(0, 10)}…</span> },
    { kunci: "coins", label: "STOK COIN", urut: true, sel: (x) => <span title={rupiah(x.coins)}>{ringkas(x.coins)}</span> },
    { kunci: "stok", label: "STOK ASET", urut: true, sel: (x) => rupiah(x.stok) + " item" },
    { kunci: "dibuat", label: "SEJAK", sel: (x) => (x.dibuat ? waktu(x.dibuat) : "—") },
    { kunci: "aktif", label: "STATUS", sel: (x) => (x.aktif ? <Tag>aktif</Tag> : <Tag jenis="blokir">dicabut</Tag>) },
    {
      kunci: "aksi", label: "AKSI",
      sel: (x) => (
        <span className="aksiBaris">
          <button className="aksi" onClick={() => setCoin({ uid: x.uid, nama: x.nama, nilai: "" })}>Stok coin</button>
          <button className="aksi" onClick={() => setAset({ uid: x.uid, nama: x.nama })}>Stok aset</button>
          {x.aktif
            ? <button className="aksi" onClick={() => setTanya(x)}>Cabut</button>
            : <button className="aksi" onClick={() => beri(x)}>Aktifkan</button>}
        </span>
      ),
    },
  ];

  const totalCoin = data.filter((x) => x.aktif).reduce((a, x) => a + x.coins, 0);
  const totalAset = data.filter((x) => x.aktif).reduce((a, x) => a + x.stok, 0);

  return (
    <>
      <Kartu isi={[
        [rupiah(data.filter((x) => x.aktif).length), ket.judul + " aktif"],
        [rupiah(data.filter((x) => !x.aktif).length), "Dicabut"],
        [ringkas(totalCoin), "Total stok coin"],
        [rupiah(totalAset), "Total stok aset"],
      ]} />

      <Panel judul={ket.judul} sub={ket.sub}
        aksi={<span className="catatan" style={{ padding: 0 }}>{sibuk ? "Menyimpan…" : ""}</span>}>
        {galat ? <div className="kosong">Server dompet belum menjawab: {galat}</div> : null}
        {baris === null ? <Rangka baris={5} /> : (
          <Tabel kolom={kolom} baris={data} kosong={"Belum ada " + peran + " aplikasi. Cari akun di bawah lalu beri akses."} />
        )}
      </Panel>

      <Panel judul={"Tambah " + peran} sub={"Ketik nama, nomor ID (mis. 1000), atau UID akun yang mau dijadikan " + peran + " aplikasi."}>
        <label className="isianForm"><span>Cari akun</span>
          <input value={cari} onChange={(e) => setCari(e.target.value)} placeholder="nama, nomor ID, atau UID" />
        </label>
        {kata ? (
          <div className="catatan" style={{ marginBottom: 10 }}>
            {!cocok.length ? "Tidak ada akun yang cocok."
              : cocok.map((u) => (
                <div key={u.uid} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", borderBottom: "1px solid #2b2b3a" }}>
                  <span className="mini" style={{ flex: "0 0 auto" }}>
                    {u.foto ? <img src={u.foto} alt="" /> : (u.nama ? u.nama[0].toUpperCase() : "?")}
                  </span>
                  <span style={{ flex: "1 1 auto", minWidth: 0 }}>
                    <b>{u.nama || "(tanpa nama)"}</b><br />
                    <small>{u.nomor ? "ID " + u.nomor + " · " : ""}{u.uid}</small>
                  </span>
                  <button type="button" className="pil" disabled={sibuk} onClick={() => beri(u)}>Jadikan {peran}</button>
                </div>
              ))}
          </div>
        ) : null}
      </Panel>

      <Laci buka={!!coin} judul={coin ? "Stok coin · " + (coin.nama || coin.uid) : ""} onTutup={() => setCoin(null)}
        kaki={<>
          <button className="polos" disabled={sibuk} onClick={() => simpanCoin("add")}>Tambah</button>
          <button className="utama" disabled={sibuk} onClick={() => simpanCoin("set")}>Set jumlah</button>
        </>}>
        {coin ? (
          <>
            <label className="isianForm"><span>Jumlah coin</span>
              <input value={coin.nilai} inputMode="numeric"
                onChange={(e) => setCoin({ ...coin, nilai: e.target.value.replace(/[^0-9]/g, "") })}
                placeholder="mis. 100000" />
            </label>
            <div className="catatan">
              Tambah menambahkan ke stok yang ada. Set jumlah mengganti stok menjadi angka itu.
              Stok coin dipakai {peran} untuk mengisi coin ke user dari panel di aplikasi.
            </div>
          </>
        ) : null}
      </Laci>

      <LaciAset buka={!!aset} staf={aset} onTutup={() => { setAset(null); muat(); }} />

      <Konfirmasi buka={!!tanya} judul={tanya ? "Cabut akses " + peran + "?" : ""}
        pesan={tanya ? "Akun " + (tanya.nama || tanya.uid) + " tidak bisa lagi membuka panel " + peran + " di aplikasi." : ""}
        tombol="Cabut" sibuk={sibuk} onYa={cabut} onTidak={() => setTanya(null)} />
    </>
  );
}

/** Stok aset: daftar aset yang dipegang staf, tambah dari katalog Store, hapus. */
function LaciAset({ buka, staf, onTutup }) {
  const [isi, setIsi] = useState(null);
  const [katalog, setKatalog] = useState([]);
  const [cari, setCari] = useState("");
  const [hari, setHari] = useState("7");
  const [sibuk, setSibuk] = useState(false);

  const muat = async () => {
    if (!staf?.uid) return;
    try {
      const out = await walletAdmin({ op: "panel_stock_list", uid: staf.uid });
      setIsi(Array.isArray(out.list) ? out.list : []);
    } catch (e) { setIsi([]); toast("Gagal memuat stok aset: " + (e.message || e), true); }
  };

  const muatKatalog = async () => {
    const peta = new Map();
    const simpan = (o, kunci) => {
      const id = String(o.id || kunci || "");
      if (!id || o.banner === true) return;
      peta.set(id, {
        id, nama: String(o.name || o.title || id), slot: String(o.slot || ""),
        nomor: String(o.customId || ""), url: typeof o.url === "string" ? o.url : "",
      });
    };
    try { (await ambilSemuaMentah("vipConfig", 400)).forEach((d) => simpan(d, d.id)); } catch (e) { /* tanpa izin */ }
    try {
      const r = await bacaRtdbServer("vipCfg");
      if (r && typeof r === "object") Object.entries(r).forEach(([k, v]) => simpan(v || {}, k));
    } catch (e) { /* abaikan */ }
    setKatalog([...peta.values()].sort((a, b) => a.nama.localeCompare(b.nama)));
  };

  useEffect(() => {
    if (!buka) return;
    setIsi(null); setCari("");
    muat();
    muatKatalog();
  }, [buka, staf?.uid]);

  const tambah = async (x) => {
    if (sibuk) return;
    setSibuk(true);
    try {
      await walletAdmin({
        op: "panel_stock_add", uid: staf.uid, itemId: x.id,
        kind: x.slot || "", name: x.nama || x.id, days: Math.max(1, Number(hari) || 7),
      });
      await catatLog("Stok aset " + staf.uid, x.id + " " + (x.nama || ""));
      toast("Aset ditambahkan ke stok " + (staf.nama || staf.uid));
      await muat();
    } catch (e) { toast("Gagal: " + (e.message || e), true); }
    finally { setSibuk(false); }
  };

  const hapus = async (itemId) => {
    if (sibuk) return;
    setSibuk(true);
    try {
      await walletAdmin({ op: "panel_stock_del", uid: staf.uid, itemId });
      await catatLog("Hapus stok aset " + staf.uid, itemId);
      toast("Aset dikeluarkan dari stok");
      await muat();
    } catch (e) { toast("Gagal: " + (e.message || e), true); }
    finally { setSibuk(false); }
  };

  const kata = cari.trim().toLowerCase();
  const cocok = !kata ? [] : katalog.filter((x) => x.nama.toLowerCase().includes(kata)
    || x.id.toLowerCase().includes(kata) || (x.nomor && x.nomor.includes(kata))).slice(0, 15);

  return (
    <Laci buka={buka} judul={staf ? "Stok aset · " + (staf.nama || staf.uid) : ""} onTutup={onTutup}>
      <label className="isianForm"><span>Masa pakai aset (hari)</span>
        <input value={hari} inputMode="numeric" onChange={(e) => setHari(e.target.value.replace(/[^0-9]/g, ""))} placeholder="7" />
      </label>
      <label className="isianForm"><span>Cari aset Store (nama, ID, atau nomor ID)</span>
        <input value={cari} onChange={(e) => setCari(e.target.value)} placeholder="mis. bingkai emas atau 1000" />
      </label>
      {kata ? (
        <div className="catatan" style={{ marginBottom: 12 }}>
          {!cocok.length ? "Tidak ada aset yang cocok."
            : cocok.map((x) => (
              <div key={x.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", borderBottom: "1px solid #2b2b3a" }}>
                <span style={{ flex: "1 1 auto", minWidth: 0 }}>
                  <b>{x.nama}</b><br /><small>{x.id}{x.slot ? " · " + x.slot : ""}</small>
                </span>
                <button type="button" className="pil" disabled={sibuk} onClick={() => tambah(x)}>Tambah</button>
              </div>
            ))}
        </div>
      ) : null}

      <div className="barisSaklar"><b>Aset di stok ({isi ? isi.length : 0})</b></div>
      {isi === null ? <Rangka baris={3} /> : !isi.length ? (
        <div className="kosong">Belum ada aset di stok. Cari aset di atas lalu tekan Tambah.</div>
      ) : isi.map((x) => (
        <div key={x.item_id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid #2b2b3a" }}>
          <span style={{ flex: "1 1 auto", minWidth: 0 }}>
            <b>{x.name || x.item_id}</b><br />
            <small>{x.kind ? x.kind + " · " : ""}{x.days} hari · {x.item_id}</small>
          </span>
          <button type="button" className="pil" disabled={sibuk} onClick={() => hapus(x.item_id)}>Hapus</button>
        </div>
      ))}
    </Laci>
  );
}

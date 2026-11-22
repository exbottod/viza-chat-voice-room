import { useEffect, useMemo, useState } from "react";
import { walletAdmin } from "../dompet.js";
import { useKoleksi, rupiah, waktu, catatLog, hapusDokumen, tulisDokumen, ambilDokumen, teks } from "../data.js";
import { Kartu, Panel, Pil, Tag, Kosong, Cari, Laci, Konfirmasi, Tabel, Rangka, toast, pakaiUrut } from "../ui.jsx";
import { auth } from "../firebase.js";

export default function User() {
  // Dua koleksi dibaca sekaligus:
  //  - users/{uid}   : profil asli (nama, photoUrl, email, userId, createdAt)
  //  - userIds/{id}  : nomor ID angka user adalah ID dokumennya, plus vip/exp
  // Halaman lama hanya membaca userIds, yang tidak menyimpan foto dan tidak
  // punya nomor angka di dalam isinya, karena itu foto kosong dan kolom UID
  // menampilkan UID panjang.
  const users = useKoleksi("users", 500);
  const ids = useKoleksi("userIds", 500);
  const banned = useKoleksi("banned", 300);
  const [dompet, setDompet] = useState({});
  // Salinan dari server (akun layanan) dipakai bila aturan Firestore menolak
  // pembacaan langsung dari browser, mis. saat panel dibuka admin non-developer.
  const [serverProfil, setServerProfil] = useState({});
  const [serverNomor, setServerNomor] = useState({});
  const [kata, setKata] = useState("");
  const [saring, setSaring] = useState("semua");
  const [laci, setLaci] = useState(null);
  const [detail, setDetail] = useState(null);
  const [konfirmasi, setKonfirmasi] = useState(null);
  const [sibuk, setSibuk] = useState(false);

  const diblokir = useMemo(() => new Set(banned.isi.map((b) => b.id)), [banned.isi]);

  // Koin dibaca lewat server (akun layanan) supaya tetap terbaca walau aturan
  // Firestore membatasi koleksi wallets untuk email developer saja.
  useEffect(() => {
    let hidup = true;
    walletAdmin({ op: "fs_list", koleksi: "wallets", batas: 500 })
      .then((r) => {
        if (!hidup) return;
        const peta = {};
        (r?.items || []).forEach((d) => { peta[String(d.id || "")] = d; });
        setDompet(peta);
      })
      .catch(() => {});
    return () => { hidup = false; };
  }, []);

  useEffect(() => {
    let hidup = true;
    Promise.all([
      walletAdmin({ op: "fs_list", koleksi: "users", batas: 500 }).catch(() => null),
      walletAdmin({ op: "fs_list", koleksi: "userIds", batas: 500 }).catch(() => null),
    ]).then(([rUsers, rIds]) => {
      if (!hidup) return;
      const p = {};
      (rUsers?.items || []).forEach((d) => { p[String(d.id || "")] = d; });
      setServerProfil(p);
      const n = {};
      (rIds?.items || []).forEach((d) => {
        const uid = String(d.uid || "");
        if (!uid) return;
        n[uid] = { nomor: /^\d{3,}$/.test(String(d.id || "")) ? String(d.id) : "", vip: Number(d.vip || 0), dok: d };
      });
      setServerNomor(n);
    });
    return () => { hidup = false; };
  }, []);

  /** uid -> { nomor (ID angka), vip, ... } dari dokumen userIds/{nomor}. */
  const petaNomor = useMemo(() => {
    const peta = {};
    ids.isi.forEach((d) => {
      const uid = String(d.uid || "");
      if (!uid) return;
      const nomor = /^\d{3,}$/.test(String(d.id || "")) ? String(d.id) : "";
      peta[uid] = { nomor, vip: Number(d.vip || 0), dok: d };
    });
    Object.entries(serverNomor).forEach(([uid, v]) => {
      if (!peta[uid] || (!peta[uid].nomor && v.nomor)) peta[uid] = { ...(peta[uid] || {}), ...v };
    });
    return peta;
  }, [ids.isi, serverNomor]);

  /** uid -> dokumen profil users/{uid}. */
  const petaProfil = useMemo(() => {
    const peta = {};
    users.isi.forEach((d) => { peta[String(d.id || "")] = d; });
    Object.entries(serverProfil).forEach(([uid, d]) => {
      if (!peta[uid]) peta[uid] = d;
      else {
        // Lengkapi medan yang kosong dari salinan server (mis. photoUrl).
        peta[uid] = {
          ...d, ...peta[uid],
          photoUrl: teks(peta[uid].photoUrl) || teks(d.photoUrl),
          name: teks(peta[uid].name) || teks(d.name),
          userId: teks(peta[uid].userId) || teks(d.userId),
        };
      }
    });
    return peta;
  }, [users.isi, serverProfil]);

  const baris = useMemo(() => {
    const k = kata.trim().toLowerCase();
    const semuaUid = new Set([...Object.keys(petaProfil), ...Object.keys(petaNomor)]);
    return [...semuaUid]
      .filter(Boolean)
      .map((uid) => {
        const profil = petaProfil[uid] || {};
        const unik = petaNomor[uid] || {};
        const dom = dompet[uid] || {};
        const nomor = String(unik.nomor || profil.userId || "");
        return {
          __kunci: uid,
          uid,
          nomor,
          nama: teks(profil.nickname) || teks(profil.name) || teks(unik.dok?.name) || "(tanpa nama)",
          foto: teks(profil.photoUrl) || teks(profil.photo) || teks(profil.avatar) || "",
          vip: Number(unik.vip || profil.vip || 0),
          koin: Number(dom.coins ?? unik.dok?.coins ?? profil.coins ?? 0),
          dibuat: Number(profil.createdAt || profil.dibuat || unik.dok?.createdAt || 0),
          blok: diblokir.has(uid),
        };
      })
      .filter((u) => {
        if (k && !u.nama.toLowerCase().includes(k) && !u.uid.toLowerCase().includes(k) && !u.nomor.includes(k)) return false;
        if (saring === "aktif") return !u.blok;
        if (saring === "blokir") return u.blok;
        if (saring === "vip") return u.vip > 0;
        return true;
      });
  }, [petaProfil, petaNomor, dompet, diblokir, kata, saring]);

  const [urutBaris, urut, klikUrut] = pakaiUrut(baris, ["nama", 1]);

  const bukaDetail = async (u) => {
    setLaci(u);
    setDetail(null);
    const [profil, dompet, ban] = await Promise.all([
      ambilDokumen("users", u.uid), ambilDokumen("wallets", u.uid), ambilDokumen("banned", u.uid),
    ]);
    setDetail({ profil, dompet, ban });
  };

  const ubahBlokir = (u) => {
    setKonfirmasi({
      judul: u.blok ? "Buka blokir " + u.nama + "?" : "Blokir " + u.nama + "?",
      pesan: u.blok
        ? "User bisa memakai aplikasi Viza lagi setelah dibuka."
        : "User tidak bisa memakai aplikasi sampai blokirnya dibuka.",
      tombol: u.blok ? "Buka blokir" : "Blokir",
      jalan: async () => {
        setSibuk(true);
        try {
          if (u.blok) {
            await hapusDokumen("banned", u.uid);
            await catatLog("Buka blokir", `${u.nama} · ${u.uid}`);
            toast(`${u.nama} dibuka blokirnya`);
          } else {
            await tulisDokumen("banned", u.uid, {
              uid: u.uid, nama: u.nama, alasan: "diblokir admin panel",
              oleh: auth.currentUser?.email || "?", waktu: new Date(),
            });
            await catatLog("Blokir user", `${u.nama} · ${u.uid}`);
            toast(`${u.nama} diblokir`);
          }
          await banned.segarkan();
          setKonfirmasi(null);
          setLaci(null);
        } catch (e) {
          toast("Gagal: " + (e.code || e.message), true);
        } finally { setSibuk(false); }
      },
    });
  };

  const kolom = [
    {
      kunci: "nama", label: "USER", urut: true,
      sel: (u) => (
        <div className="user">
          <div className="mini">{u.foto ? <img src={u.foto} alt="" /> : (u.nama[0] || "?").toUpperCase()}</div>
          <div>
            <div>{u.nama}</div>
            <div className="catatan" style={{ padding: 0, marginTop: 2 }}>{u.vip ? "VIP " + u.vip : "gratis"}</div>
          </div>
        </div>
      ),
    },
    {
      kunci: "nomor", label: "ID", urut: true,
      sel: (u) => (u.nomor
        ? <b style={{ color: "#83d8ae" }}>{u.nomor}</b>
        : <span className="catatan" style={{ padding: 0 }}>belum ada</span>),
    },
    { kunci: "uid", label: "UID", sel: (u) => <span title={u.uid} style={{ fontFamily: "monospace", fontSize: 11 }}>{u.uid.slice(0, 10)}…</span> },
    { kunci: "koin", label: "KOIN", urut: true, sel: (u) => rupiah(u.koin) },
    { kunci: "dibuat", label: "TERDAFTAR", urut: true, sel: (u) => (u.dibuat ? waktu(u.dibuat) : "—") },
    { kunci: "blok", label: "STATUS", sel: (u) => (u.blok ? <Tag jenis="blokir">diblokir</Tag> : <Tag>aktif</Tag>) },
    {
      kunci: "aksi", label: "AKSI",
      sel: (u) => (
        <span className="aksiBaris">
          <button className="aksi" onClick={() => bukaDetail(u)}>Detail</button>
          <button className="aksi" onClick={() => ubahBlokir(u)}>{u.blok ? "Buka blokir" : "Blokir"}</button>
        </span>
      ),
    },
  ];

  return (
    <>
      <Kartu isi={[
        [rupiah(baris.length), "User terdaftar"],
        [rupiah(baris.filter((b) => !b.blok).length), "Tidak diblokir"],
        [rupiah(diblokir.size), "Diblokir"],
        [rupiah(baris.filter((u) => u.vip > 0).length), "User VIP"],
      ]} />

      <Panel
        judul="Daftar user"
        aksi={<Cari nilai={kata} onUbah={setKata} placeholder="Cari nama, ID angka, atau UID…" />}
        kaki={`${baris.length} user ditampilkan`}
      >
        <div className="filter" style={{ padding: "0 14px 10px" }}>
          {[["semua", "Semua"], ["aktif", "Aktif"], ["vip", "VIP"], ["blokir", "Diblokir"]].map(([id, nama]) => (
            <Pil key={id} on={saring === id} onClick={() => setSaring(id)}>{nama}</Pil>
          ))}
        </div>
        {users.memuat && !users.isi.length
          ? <Rangka />
          : <Tabel kolom={kolom} baris={urutBaris} urut={urut} onUrut={klikUrut} kosong="Tidak ada user yang cocok." />}
      </Panel>

      <Laci
        buka={!!laci}
        judul={laci ? "Detail " + laci.nama : ""}
        onTutup={() => { setLaci(null); setDetail(null); }}
        kaki={laci ? (
          <>
            <button className="polos" onClick={() => ubahBlokir(laci)}>{laci.blok ? "Buka blokir" : "Blokir user"}</button>
          </>
        ) : null}
      >
        {!detail ? <Rangka baris={4} /> : (
          <>
            <div className="petak" style={{ padding: 0, marginBottom: 12 }}>
              <div className="kotakMini"><b>{rupiah(detail.dompet?.coins ?? detail.profil?.coins ?? 0)}</b><span>Koin dompet</span></div>
              <div className="kotakMini"><b>{detail.profil?.vip ? "VIP " + detail.profil.vip : "Gratis"}</b><span>Paket</span></div>
              <div className="kotakMini"><b>{detail.ban ? "Diblokir" : "Aktif"}</b><span>Status</span></div>
              <div className="kotakMini"><b>{detail.profil?.level ?? "—"}</b><span>Level</span></div>
            </div>
            <div className="barisDetail"><span>ID angka</span><b>{laci.nomor || "belum ada"}</b></div>
            <div className="barisDetail"><span>UID</span><b style={{ wordBreak: "break-all", fontSize: 11 }}>{laci.uid}</b></div>
            <div className="barisDetail"><span>Nama</span><b>{detail.profil?.name || laci.nama}</b></div>
            <div className="barisDetail"><span>Email</span><b>{detail.profil?.email || "—"}</b></div>
            <div className="barisDetail"><span>Vip sampai</span><b>{detail.profil?.vipUntil ? waktu(detail.profil.vipUntil) : "—"}</b></div>
            <div className="barisDetail"><span>Fans</span><b>{rupiah(detail.profil?.fans ?? 0)}</b></div>
            <div className="barisDetail"><span>Mengikuti</span><b>{rupiah(detail.profil?.following ?? 0)}</b></div>
            <div className="barisDetail"><span>Dompet terakhir</span><b>{detail.dompet?.updatedAt ? waktu(detail.dompet.updatedAt) : "—"}</b></div>
            {detail.ban ? (
              <div className="barisDetail"><span>Alasan blokir</span><b>{detail.ban.alasan || "—"}</b></div>
            ) : null}
            <div className="catatan" style={{ marginTop: 12 }}>
              Detail dibaca dari users, wallets, dan banned. Untuk mengubah angka, buka menu Database.
            </div>
          </>
        )}
      </Laci>

      <Konfirmasi
        buka={!!konfirmasi}
        judul={konfirmasi?.judul}
        pesan={konfirmasi?.pesan}
        tombol={konfirmasi?.tombol}
        sibuk={sibuk}
        onYa={() => konfirmasi?.jalan()}
        onTidak={() => setKonfirmasi(null)}
      />
    </>
  );
}

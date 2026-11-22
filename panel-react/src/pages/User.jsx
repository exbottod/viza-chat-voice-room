import { useMemo, useState } from "react";
import { useKoleksi, rupiah, waktu, catatLog, hapusDokumen, tulisDokumen, ambilDokumen } from "../data.js";
import { Kartu, Panel, Pil, Tag, Kosong, Cari, Laci, Konfirmasi, Tabel, Rangka, toast, pakaiUrut } from "../ui.jsx";
import { auth } from "../firebase.js";

export default function User() {
  const users = useKoleksi("userIds", 500);
  const banned = useKoleksi("banned", 300);
  const [kata, setKata] = useState("");
  const [saring, setSaring] = useState("semua");
  const [laci, setLaci] = useState(null);
  const [detail, setDetail] = useState(null);
  const [konfirmasi, setKonfirmasi] = useState(null);
  const [sibuk, setSibuk] = useState(false);

  const diblokir = useMemo(() => new Set(banned.isi.map((b) => b.id)), [banned.isi]);

  const baris = useMemo(() => {
    const k = kata.trim().toLowerCase();
    return users.isi
      .map((u) => {
        const uid = u.uid || u.id;
        return {
          __kunci: uid,
          uid,
          nama: u.name || u.nama || "(tanpa nama)",
          foto: u.avatar || u.photo || "",
          vip: Number(u.vip || 0),
          koin: Number(u.coins ?? u.coin ?? 0),
          dibuat: Number(u.createdAt || u.dibuat || 0),
          blok: diblokir.has(u.id) || diblokir.has(uid),
        };
      })
      .filter((u) => {
        if (k && !u.nama.toLowerCase().includes(k) && !u.uid.toLowerCase().includes(k)) return false;
        if (saring === "aktif") return !u.blok;
        if (saring === "blokir") return u.blok;
        if (saring === "vip") return u.vip > 0;
        return true;
      });
  }, [users.isi, diblokir, kata, saring]);

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
    { kunci: "uid", label: "UID", sel: (u) => <span title={u.uid}>{u.uid.slice(0, 14)}…</span> },
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
        [rupiah(users.isi.length), "User terdaftar"],
        [rupiah(users.isi.length - baris.filter((b) => b.blok).length), "Tidak diblokir"],
        [rupiah(diblokir.size), "Diblokir"],
        [rupiah(users.isi.filter((u) => Number(u.vip || 0) > 0).length), "User VIP"],
      ]} />

      <Panel
        judul="Daftar user"
        aksi={<Cari nilai={kata} onUbah={setKata} placeholder="Cari nama atau UID…" />}
        kaki={`${baris.length} user ditampilkan dari ${users.isi.length} terdaftar`}
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
            <div className="barisDetail"><span>UID</span><b>{laci.uid}</b></div>
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

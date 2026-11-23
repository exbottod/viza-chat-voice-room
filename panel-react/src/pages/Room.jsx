import { useEffect, useMemo, useState } from "react";
import { useKoleksi, rupiah, catatLog, ambilRtdb, tulisRtdb, hapusRtdb, hapusDokumen, ubahDokumen, teks } from "../data.js";
import { Kartu, Panel, Tag, Kosong, Cari, Konfirmasi, Tabel, Rangka, toast, pakaiUrut } from "../ui.jsx";
import { walletAdmin } from "../dompet.js";

export default function Room() {
  const rooms = useKoleksi("rooms", 500);
  const [party, setParty] = useState(null);
  const [official, setPetaOfficial] = useState({});
  const [galat, setGalat] = useState("");
  const [kata, setKata] = useState("");
  const [konfirmasi, setKonfirmasi] = useState(null);
  const [sibuk, setSibuk] = useState(false);
  // Isian ganti nama room: { id, nama, pemilik }
  const [ubahNama, setUbahNama] = useState(null);

  const muatParty = async () => {
    try {
      const [p, o] = await Promise.all([
        ambilRtdb("roomsPub"),
        ambilRtdb("officialRooms").catch(() => null),
      ]);
      setParty(p || {});
      setPetaOfficial(o || {});
      setGalat("");
    } catch (e) {
      setGalat(e.message || String(e));
      setParty({});
    }
  };
  useEffect(() => { muatParty(); }, []);

  const daftarParty = useMemo(() => {
    const k = kata.trim().toLowerCase();
    return Object.entries(party || {})
      .map(([id, r]) => ({ __kunci: id, id, ...r }))
      .filter((r) => !k || String(r.name || "").toLowerCase().includes(k) || r.id.toLowerCase().includes(k))
      .sort((a, b) => (Number(b.pinned) || 0) - (Number(a.pinned) || 0) || (Number(b.createdAt) || 0) - (Number(a.createdAt) || 0));
  }, [party, kata]);

  const daftarRoom = useMemo(() => {
    const k = kata.trim().toLowerCase();
    return rooms.isi
      .map((r) => ({ __kunci: r.id, id: r.id, nama: teks(r.name) || teks(r.title) || "(tanpa nama)", pemilik: r.ownerUid || "", locked: !!r.locked }))
      .filter((r) => !k || r.nama.toLowerCase().includes(k) || String(r.id).toLowerCase().includes(k));
  }, [rooms.isi, kata]);

  const [urutParty, urutP, klikP] = pakaiUrut(daftarParty);
  const [urutRoom, urutR, klikR] = pakaiUrut(daftarRoom, ["nama", 1]);

  const setSemat = (r) => {
    const nilai = !r.pinned;
    setKonfirmasi({
      judul: nilai ? "Sematkan " + (r.name || r.id) + "?" : "Lepas semat " + (r.name || r.id) + "?",
      pesan: nilai ? "Room tampil paling atas di daftar room aplikasi." : "Room kembali ke urutan biasa.",
      tombol: nilai ? "Sematkan" : "Lepas",
      jalan: async () => {
        setSibuk(true);
        try {
          try {
            await tulisRtdb(`roomsPub/${r.id}/pinned`, nilai);
            await tulisRtdb(`roomsPub/${r.id}/pinnedAt`, nilai ? Date.now() : 0);
          } catch (e) {
            await walletAdmin({ op: "room_pin", uid: r.id, nilai: nilai ? 1 : 0 });
          }
          await catatLog(nilai ? "Sematkan room" : "Lepas semat room", r.id);
          toast(nilai ? "Room disematkan paling atas" : "Semat dilepas");
          await muatParty();
          setKonfirmasi(null);
        } catch (e) { toast("Gagal: " + (e.message || "tidak diizinkan"), true); }
        finally { setSibuk(false); }
      },
    });
  };

  const tagOfficial = (r) => {
    const nilai = !official[r.id];
    setKonfirmasi({
      judul: nilai ? "Tag official " + (r.name || r.id) + "?" : "Lepas tag official?",
      pesan: nilai ? "Room mendapat tanda resmi di foto room dan daftar room." : "Tanda resmi dilepas.",
      tombol: nilai ? "Pasang" : "Lepas",
      jalan: async () => {
        setSibuk(true);
        try {
          try {
            await tulisRtdb(`officialRooms/${r.id}`, nilai ? true : null);
          } catch (e) {
            await walletAdmin({ op: "room_official", uid: r.id, nilai: nilai ? 1 : 0 });
          }
          await catatLog(nilai ? "Tag official" : "Lepas official", r.id);
          toast(nilai ? "Tag official dipasang" : "Tag official dilepas");
          await muatParty();
          setKonfirmasi(null);
        } catch (e) { toast("Gagal: " + (e.message || "tidak diizinkan"), true); }
        finally { setSibuk(false); }
      },
    });
  };

  const tutupRoom = (r) => setKonfirmasi({
    judul: "Tutup room " + r.nama + "?",
    pesan: "Room dihapus dari daftar dan langsung hilang di aplikasi. Tindakan ini tidak bisa dibatalkan.",
    tombol: "Tutup room",
    jalan: async () => {
      setSibuk(true);
      try {
        await hapusDokumen("rooms", r.id);
        await catatLog("Tutup room", r.id);
        toast("Room ditutup");
        await rooms.segarkan();
        setKonfirmasi(null);
      } catch (e) { toast("Gagal: " + (e.code || e.message), true); }
      finally { setSibuk(false); }
    },
  });

  // Cabang Realtime Database milik satu room. Semua dibersihkan supaya room
  // benar-benar hilang dari aplikasi, bukan hanya dari daftar Firestore.
  const cabangRoom = (id) => [
    "roomsPub/" + id,
    "roomsBg/" + id,
    "officialRooms/" + id,
    "members/" + id,
    "seats/" + id,
    "micPoints/" + id,
    "messages/" + id,
    "locks/" + id,
    "blacklist/" + id,
    "emotes/" + id,
    "roomTags/" + id,
  ];

  // Hapus room: hilang seketika, dan pemiliknya bisa langsung membuat room baru
  // yang muncul lagi di daftar. Room lama tidak boleh tertinggal di Realtime
  // Database, karena aplikasi mencari room lama pemilik di sana lebih dulu.
  const hapusRoom = (r) => setKonfirmasi({
    judul: "Hapus room " + (r.name || r.id) + "?",
    pesan: "Room langsung hilang dari aplikasi dan peserta keluar. Pemilik tetap bisa membuat room baru kapan saja.",
    tombol: "Hapus room",
    jalan: async () => {
      setSibuk(true);
      const gagal = [];
      for (const jalur of cabangRoom(r.id)) {
        try { await hapusRtdb(jalur); } catch (e) { gagal.push(jalur); }
      }
      try { await hapusDokumen("rooms", r.id); } catch (e) { /* room lama hanya di RTDB */ }
      await catatLog("Hapus room", (r.name || "") + " · " + r.id);
      toast(gagal.length ? "Room dihapus, sebagian cabang gagal: " + gagal.join(", ") : "Room dihapus");
      await Promise.all([muatParty(), rooms.segarkan()]);
      setKonfirmasi(null);
      setSibuk(false);
    },
  });

  // Bersihkan room: semua peserta dikeluarkan dan kursi, chat, serta poin mic
  // dikosongkan. Pengeluaran memakai daftar kick 60 detik, jadi peserta benar-
  // benar terpental keluar lalu tetap boleh masuk lagi setelah itu.
  const bersihkanRoom = (r) => setKonfirmasi({
    judul: "Bersihkan room " + (r.name || r.id) + "?",
    pesan: "Semua peserta dikeluarkan sekarang, kursi mic dan chat dikosongkan. Room tetap ada dan bisa dipakai lagi.",
    tombol: "Bersihkan",
    jalan: async () => {
      setSibuk(true);
      try {
        const [pesertaMentah, kursi] = await Promise.all([
          ambilRtdb("members/" + r.id).catch(() => null),
          ambilRtdb("seats/" + r.id).catch(() => null),
        ]);
        const peserta = pesertaMentah || {};
        // Nama peserta diambil dari kursi mic, karena daftar keanggotaan hanya
        // menyimpan waktu hadir.
        const namaKursi = {};
        for (const k of Object.values(kursi || {})) {
          if (k?.uid) namaKursi[k.uid] = k.name || "";
        }
        const kini = Date.now();
        const sampai = kini + 60_000;
        for (const uid of Object.keys(peserta)) {
          try {
            await tulisRtdb(`blacklist/${r.id}/${uid}`, {
              name: String(namaKursi[uid] || peserta[uid]?.name || ""),
              until: sampai,
              at: kini,
              sebab: "room dibersihkan",
            });
          } catch (e) { /* lanjut peserta lain */ }
        }
        await hapusRtdb("seats/" + r.id);
        await hapusRtdb("micPoints/" + r.id);
        await hapusRtdb("messages/" + r.id);
        await hapusRtdb("members/" + r.id);
        await catatLog("Bersihkan room", (r.name || "") + " · " + r.id + " · " + Object.keys(peserta).length + " peserta");
        toast(Object.keys(peserta).length + " peserta dikeluarkan, room bersih");
        await muatParty();
      } catch (e) { toast("Gagal membersihkan: " + (e.message || "tidak diizinkan"), true); }
      setKonfirmasi(null);
      setSibuk(false);
    },
  });

  const simpanNama = async (namaBaru) => {
    const r = ubahNama;
    if (!r) return;
    const nama = String(namaBaru || "").trim();
    if (!nama) { toast("Nama room tidak boleh kosong", true); return; }
    setSibuk(true);
    try {
      await tulisRtdb(`roomsPub/${r.id}/name`, nama);
      try { await ubahDokumen("rooms", r.id, { name: nama }); } catch (e) { /* hanya ada di RTDB */ }
      await catatLog("Ubah nama room", r.id + " → " + nama);
      toast("Nama room diganti");
      setUbahNama(null);
      await muatParty();
      await rooms.segarkan();
    } catch (e) { toast("Gagal: " + (e.message || "tidak diizinkan"), true); }
    setSibuk(false);
  };

  // Nama bawaan saat reset: mengikuti pola pembuatan room di aplikasi.
  const namaBawaan = (r) => "Room " + String(r.ownerName || "baru").trim();

  const kolomParty = [
    {
      kunci: "name", label: "ROOM", urut: true,
      sel: (r) => (
        <div>
          <div>{official[r.id] ? "✅ " : ""}{r.name || "(tanpa nama)"}</div>
          <div className="catatan" style={{ padding: 0, marginTop: 2 }}>{String(r.id).slice(0, 14)}…</div>
        </div>
      ),
    },
    { kunci: "ownerName", label: "PEMILIK", urut: true, sel: (r) => String(r.ownerName || r.ownerUid || "—").slice(0, 14) },
    { kunci: "members", label: "PESERTA", urut: true, sel: (r) => rupiah(r.members || 0) },
    {
      kunci: "pinned", label: "ATURAN", urut: true,
      sel: (r) => (<>{r.pinned ? <Tag>disematkan</Tag> : <Tag jenis="">biasa</Tag>} {official[r.id] ? <Tag>official</Tag> : null}</>),
    },
    {
      kunci: "aksi", label: "AKSI",
      sel: (r) => (
        <span className="aksiBaris">
          <button className="aksi" onClick={() => setSemat(r)}>{r.pinned ? "Lepas semat" : "Sematkan"}</button>
          <button className="aksi" onClick={() => tagOfficial(r)}>{official[r.id] ? "Lepas official" : "Tag official"}</button>
          <button className="aksi" onClick={() => setUbahNama({ id: r.id, nama: r.name || "", pemilik: r.ownerName || "" })}>Ubah nama</button>
          <button className="aksi" onClick={() => bersihkanRoom(r)}>Bersihkan</button>
          <button className="aksi" onClick={() => hapusRoom(r)}>Hapus room</button>
        </span>
      ),
    },
  ];

  const kolomRoom = [
    { kunci: "nama", label: "NAMA", urut: true, sel: (r) => r.nama },
    { kunci: "id", label: "ID ROOM", sel: (r) => String(r.id).slice(0, 12) + "…" },
    { kunci: "pemilik", label: "PEMILIK", sel: (r) => String(r.pemilik || "—").slice(0, 12) },
    { kunci: "locked", label: "KUNCI", sel: (r) => (r.locked ? <Tag jenis="blokir">terkunci</Tag> : <Tag>terbuka</Tag>) },
    { kunci: "aksi", label: "AKSI", sel: (r) => <button className="aksi" onClick={() => tutupRoom(r)}>Tutup room</button> },
  ];

  return (
    <>
      <Kartu isi={[
        [rupiah(daftarParty.length), "Room party (RTDB)"],
        [rupiah(rooms.isi.length), "Room Firestore"],
        [rupiah(rooms.isi.filter((r) => !r.locked).length), "Terbuka"],
        [rupiah(rooms.isi.filter((r) => r.locked).length), "Terkunci"],
      ]} />

      <Panel
        judul="Room party"
        sub="· sematkan dan beri tag official"
        aksi={<Cari nilai={kata} onUbah={setKata} placeholder="Cari nama atau ID room…" />}
      >
        {galat ? <Kosong>Gagal memuat roomsPub: {galat}</Kosong>
          : party === null ? <Rangka />
          : <Tabel kolom={kolomParty} baris={urutParty} urut={urutP} onUrut={klikP} kosong="Belum ada room party di Realtime Database." />}
      </Panel>

      <Panel judul="Daftar room (Firestore)">
        {rooms.memuat && !rooms.isi.length
          ? <Rangka baris={4} />
          : <Tabel kolom={kolomRoom} baris={urutRoom} urut={urutR} onUrut={klikR} kosong="Belum ada room." />}
      </Panel>

      {ubahNama ? (
        <Panel judul="Nama room" sub={"· " + (ubahNama.pemilik || ubahNama.id)}>
          <div className="baris" style={{ gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <input
              className="isian"
              value={ubahNama.nama}
              placeholder="Nama room baru"
              onChange={(e) => setUbahNama({ ...ubahNama, nama: e.target.value })}
              style={{ minWidth: 220 }}
            />
            <button className="aksi" onClick={() => simpanNama(ubahNama.nama)} disabled={sibuk}>Simpan</button>
            <button
              className="aksi"
              onClick={() => { const bawaan = namaBawaan(ubahNama); setUbahNama({ ...ubahNama, nama: bawaan }); }}
              disabled={sibuk}
            >
              Reset nama
            </button>
            <button className="aksi" onClick={() => setUbahNama(null)} disabled={sibuk}>Batal</button>
          </div>
          <div className="catatan">Reset nama memakai nama bawaan “{namaBawaan(ubahNama)}”. Tekan Simpan setelah itu.</div>
        </Panel>
      ) : null}

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

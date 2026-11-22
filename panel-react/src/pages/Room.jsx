import { useEffect, useMemo, useState } from "react";
import { useKoleksi, rupiah, catatLog, ambilRtdb, tulisRtdb, hapusDokumen } from "../data.js";
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
      .map((r) => ({ __kunci: r.id, id: r.id, nama: r.name || r.title || "(tanpa nama)", pemilik: r.ownerUid || "", locked: !!r.locked }))
      .filter((r) => !k || r.nama.toLowerCase().includes(k) || r.id.toLowerCase().includes(k));
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

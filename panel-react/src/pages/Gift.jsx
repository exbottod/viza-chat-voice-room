import { useMemo, useState } from "react";
import { useKoleksi, rupiah, catatLog, hapusDokumen } from "../data.js";
import { Kartu, Panel, Pil, Tag, Kosong, Cari, Konfirmasi, Tabel, Rangka, toast, pakaiUrut } from "../ui.jsx";

export default function Gift() {
  const gifts = useKoleksi("gifts", 300);
  const [kata, setKata] = useState("");
  const [saring, setSaring] = useState("semua");
  const [konfirmasi, setKonfirmasi] = useState(null);
  const [sibuk, setSibuk] = useState(false);

  const baris = useMemo(() => {
    const k = kata.trim().toLowerCase();
    return gifts.isi
      .map((g) => ({
        __kunci: g.id,
        id: g.id,
        nama: g.name || g.id,
        ikon: g.icon || "",
        emoji: g.emoji || "🎁",
        harga: Number(g.price || 0),
        media: g.mediaUrl || "",
        tipe: g.mediaType || "",
        cashback: !!g.cashback,
        special: !!g.special,
        rocket: !!g.rocket,
      }))
      .filter((g) => {
        if (k && !g.nama.toLowerCase().includes(k)) return false;
        if (saring === "video") return /mp4|video/i.test(g.tipe) || /\.mp4$/i.test(g.media);
        if (saring === "svga") return /svga/i.test(g.tipe) || /\.svga$/i.test(g.media);
        if (saring === "cashback") return g.cashback;
        return true;
      });
  }, [gifts.isi, kata, saring]);

  const [urutBaris, urut, klikUrut] = pakaiUrut(baris, ["harga", -1]);

  const hapus = (g) => setKonfirmasi({
    judul: "Hapus " + g.nama + "?",
    pesan: "Gift hilang dari katalog dan tidak bisa dikirim lagi. Tindakan ini tidak bisa dibatalkan.",
    tombol: "Hapus gift",
    jalan: async () => {
      setSibuk(true);
      try {
        await hapusDokumen("gifts", g.id);
        await catatLog("Hapus gift", g.id);
        toast(g.nama + " dihapus");
        await gifts.segarkan();
        setKonfirmasi(null);
      } catch (e) { toast("Gagal: " + (e.code || e.message), true); }
      finally { setSibuk(false); }
    },
  });

  const kolom = [
    {
      kunci: "nama", label: "GIFT", urut: true,
      sel: (g) => (
        <div className="user">
          <div className="mini">
            {g.ikon ? <img src={g.ikon} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} /> : g.emoji}
          </div>
          <div>{g.nama}</div>
        </div>
      ),
    },
    { kunci: "harga", label: "HARGA", urut: true, sel: (g) => rupiah(g.harga) + " koin" },
    {
      kunci: "media", label: "MEDIA",
      sel: (g) => (g.media
        ? <a className="aksi" href={g.media} target="_blank" rel="noopener">{g.tipe || "tautan"}</a>
        : "—"),
    },
    {
      kunci: "tambahan", label: "TAMBAHAN",
      sel: (g) => (
        <>
          {g.special ? <Tag>special</Tag> : null}
          {g.rocket ? <Tag>rocket</Tag> : null}
          {g.cashback ? <Tag>cashback</Tag> : null}
          {!g.special && !g.rocket && !g.cashback ? "—" : null}
        </>
      ),
    },
    { kunci: "aksi", label: "AKSI", sel: (g) => <button className="aksi" onClick={() => hapus(g)}>Hapus</button> },
  ];

  const video = gifts.isi.filter((g) => /mp4|video/i.test(g.mediaType || "") || /\.mp4$/i.test(g.mediaUrl || "")).length;

  return (
    <>
      <Kartu isi={[
        [rupiah(gifts.isi.length), "Item katalog"],
        [rupiah(video), "Gift video MP4"],
        [rupiah(gifts.isi.filter((g) => g.cashback).length), "Gift cashback"],
        [rupiah(Math.max(0, ...gifts.isi.map((g) => Number(g.price || 0)))), "Harga tertinggi"],
      ]} />

      <Panel
        judul="Katalog gift"
        sub="· dibaca aplikasi dari koleksi gifts"
        aksi={<Cari nilai={kata} onUbah={setKata} placeholder="Cari nama gift…" />}
        kaki={`${baris.length} item ditampilkan dari ${gifts.isi.length}`}
      >
        <div className="filter" style={{ padding: "0 14px 10px" }}>
          {[["semua", "Semua"], ["video", "Video MP4"], ["svga", "SVGA"], ["cashback", "Cashback"]].map(([id, nama]) => (
            <Pil key={id} on={saring === id} onClick={() => setSaring(id)}>{nama}</Pil>
          ))}
        </div>
        {gifts.memuat && !gifts.isi.length
          ? <Rangka />
          : <Tabel kolom={kolom} baris={urutBaris} urut={urut} onUrut={klikUrut} kosong="Belum ada gift. Tambah lewat panel lama dulu." />}
        <div className="catatan" style={{ padding: "0 14px 14px" }}>
          Menambah dan mengubah berkas gift masih di panel lama (#gift). Di sini sudah bisa mencari, menyaring, dan menghapus.
        </div>
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

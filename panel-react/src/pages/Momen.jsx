import { useEffect, useMemo, useState } from "react";
import { catatLog, ambilRtdb, hapusRtdb, teks } from "../data.js";
import { Kartu, Panel, Tag, Kosong, Cari, Konfirmasi, Tabel, Rangka, toast, pakaiUrut, Laci } from "../ui.jsx";

// Momen user disimpan di Realtime Database: moments/{id} berisi uid, name, text,
// photoB64, createdAt, likeCount, dan commentCount. Foto disimpan sebagai teks
// base64, jadi pratinjau cukup memakai alamat data: tanpa unggah ke mana pun.
const fotoMomen = (m) => {
  const f = String(m?.photoB64 || "");
  if (!f) return "";
  return f.startsWith("data:") ? f : "data:image/jpeg;base64," + f;
};

const waktu = (ms) => {
  const n = Number(ms) || 0;
  if (!n) return "—";
  const d = new Date(n);
  const dua = (x) => String(x).padStart(2, "0");
  return `${dua(d.getDate())}/${dua(d.getMonth() + 1)}/${d.getFullYear()} ${dua(d.getHours())}:${dua(d.getMinutes())}`;
};

export default function Momen() {
  const [momen, setMomen] = useState(null);
  const [galat, setGalat] = useState("");
  const [kata, setKata] = useState("");
  const [lihat, setLihat] = useState(null);
  const [konfirmasi, setKonfirmasi] = useState(null);
  const [sibuk, setSibuk] = useState(false);

  const muat = async () => {
    try {
      const d = (await ambilRtdb("moments")) || {};
      setMomen(d);
      setGalat("");
    } catch (e) {
      setGalat(e.message || String(e));
      setMomen({});
    }
  };
  useEffect(() => { muat(); }, []);

  const daftar = useMemo(() => {
    const k = kata.trim().toLowerCase();
    return Object.entries(momen || {})
      .map(([id, m]) => ({ __kunci: id, id, ...m }))
      .filter((m) => !k
        || String(m.name || "").toLowerCase().includes(k)
        || String(m.uid || "").toLowerCase().includes(k)
        || String(m.text || "").toLowerCase().includes(k))
      .sort((a, b) => (Number(b.createdAt) || 0) - (Number(a.createdAt) || 0));
  }, [momen, kata]);

  const [urut, klik] = pakaiUrut(daftar, ["createdAt", -1]);

  const hapusSatu = (m) => setKonfirmasi({
    judul: "Hapus momen " + (m.name || "user") + "?",
    pesan: "Momen langsung hilang dari aplikasi, termasuk suka dan komentarnya. Tindakan ini tidak bisa dibatalkan.",
    tombol: "Hapus momen",
    jalan: async () => {
      setSibuk(true);
      try {
        await hapusRtdb("moments/" + m.id);
        await catatLog("Hapus momen", (m.name || "") + " · " + (m.uid || "") + " · " + m.id);
        toast("Momen dihapus");
        setLihat(null);
        await muat();
      } catch (e) { toast("Gagal: " + (e.message || "tidak diizinkan"), true); }
      setKonfirmasi(null);
      setSibuk(false);
    },
  });

  const hapusSemuaUser = (m) => setKonfirmasi({
    judul: "Hapus semua momen " + (m.name || "user") + "?",
    pesan: "Semua momen milik akun ini dihapus sekaligus dari aplikasi.",
    tombol: "Hapus semua",
    jalan: async () => {
      setSibuk(true);
      try {
        const semua = (await ambilRtdb("moments")) || {};
        const milik = Object.entries(semua).filter(([, x]) => x?.uid === m.uid).map(([id]) => id);
        for (const id of milik) await hapusRtdb("moments/" + id);
        await catatLog("Hapus semua momen user", (m.name || "") + " · " + (m.uid || "") + " · " + milik.length + " momen");
        toast(milik.length + " momen dihapus");
        setLihat(null);
        await muat();
      } catch (e) { toast("Gagal: " + (e.message || "tidak diizinkan"), true); }
      setKonfirmasi(null);
      setSibuk(false);
    },
  });

  const kolom = [
    {
      kunci: "foto", label: "MOMEN",
      sel: (m) => (
        <button
          className="aksi"
          style={{ padding: 0, border: 0, background: "transparent", cursor: "zoom-in" }}
          onClick={() => setLihat(m)}
          title="Pratinjau momen"
        >
          {fotoMomen(m) ? (
            <img src={fotoMomen(m)} alt="" style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 8 }} />
          ) : (
            <span className="catatan" style={{ padding: 0 }}>tanpa foto</span>
          )}
        </button>
      ),
    },
    { kunci: "name", label: "USER", urut: true, sel: (m) => <div>{teks(m.name) || "Pengguna"}<div className="catatan" style={{ padding: 0, marginTop: 2 }}>{String(m.uid || "").slice(0, 14)}…</div></div> },
    { kunci: "text", label: "TULISAN", sel: (m) => String(teks(m.text) || "—").slice(0, 60) },
    { kunci: "createdAt", label: "WAKTU", urut: true, sel: (m) => waktu(m.createdAt) },
    { kunci: "likeCount", label: "SUKA", urut: true, sel: (m) => String(Number(m.likeCount) || 0) },
    { kunci: "commentCount", label: "KOMENTAR", urut: true, sel: (m) => String(Number(m.commentCount) || 0) },
    {
      kunci: "aksi", label: "AKSI",
      sel: (m) => (
        <span className="aksiBaris">
          <button className="aksi" onClick={() => setLihat(m)}>Lihat</button>
          <button className="aksi" onClick={() => hapusSatu(m)}>Hapus</button>
        </span>
      ),
    },
  ];

  return (
    <>
      <Kartu isi={[
        [String(daftar.length), "Momen tersimpan"],
        [String(daftar.filter((m) => fotoMomen(m)).length), "Ada foto"],
        [String(new Set(daftar.map((m) => m.uid)).size), "User berbeda"],
      ]} />

      <Panel
        judul="Momen user"
        sub="· pratinjau dan hapus momen"
        aksi={<Cari nilai={kata} onUbah={setKata} placeholder="Cari nama, UID, atau tulisan…" />}
      >
        {galat ? <Kosong>Gagal memuat momen: {galat}</Kosong>
          : momen === null ? <Rangka />
          : <Tabel kolom={kolom} baris={urut} urut={urut} onUrut={klik} kosong="Belum ada momen dari user." />}
      </Panel>

      <Laci
        buka={!!lihat}
        judul={"Momen " + (teks(lihat?.name) || "user")}
        onTutup={() => setLihat(null)}
        kaki={lihat ? (
          <div className="baris" style={{ gap: 8, flexWrap: "wrap" }}>
            <button className="aksi" onClick={() => hapusSatu(lihat)} disabled={sibuk}>Hapus momen ini</button>
            <button className="aksi" onClick={() => hapusSemuaUser(lihat)} disabled={sibuk}>Hapus semua momen user</button>
          </div>
        ) : null}
      >
        {lihat ? (
          <div>
            {fotoMomen(lihat) ? (
              <img
                src={fotoMomen(lihat)}
                alt=""
                style={{ width: "100%", maxHeight: 420, objectFit: "contain", borderRadius: 12, background: "#11111a" }}
              />
            ) : <Kosong>Momen ini tanpa foto.</Kosong>}
            <div style={{ marginTop: 10 }}>{teks(lihat.text) || "(tanpa tulisan)"}</div>
            <div className="catatan" style={{ padding: 0, marginTop: 8 }}>
              {teks(lihat.name) || "Pengguna"} · {String(lihat.uid || "—")} · {waktu(lihat.createdAt)}
            </div>
            <div className="baris" style={{ gap: 8, marginTop: 8 }}>
              <Tag>{Number(lihat.likeCount) || 0} suka</Tag>
              <Tag>{Number(lihat.commentCount) || 0} komentar</Tag>
            </div>
          </div>
        ) : null}
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

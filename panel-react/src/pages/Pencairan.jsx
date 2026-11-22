import { useEffect, useMemo, useState } from "react";
import { walletAdmin } from "../dompet.js";
import { catatLog, rupiah, waktu } from "../data.js";
import { Kartu, Konfirmasi, Panel, Pil, Rangka, Tabel, Tag, toast } from "../ui.jsx";

/**
 * Pencairan komisi agensi. Aplikasi hanya MENGIRIM PENGAJUAN (op agency_request):
 * agensi memilih jumlah komisi, lalu uang dikirim manual oleh pemilik aplikasi
 * lewat Dana/OVO/bank. Halaman ini tempat melihat pengajuan dan menandainya
 * sudah dibayar, yang sekaligus memotong saldo komisi agensi di server.
 *
 * Pembayaran otomatis ke rekening butuh penyedia disbursement (mis. Xendit atau
 * Flip) dengan KYC, jadi tidak dipasang di sini.
 */
export default function Pencairan() {
  const [baris, setBaris] = useState(null);
  const [galat, setGalat] = useState("");
  const [saring, setSaring] = useState("menunggu");
  const [tanya, setTanya] = useState(null);
  const [sibuk, setSibuk] = useState(false);

  const muat = async () => {
    try {
      const out = await walletAdmin({ op: "agency_req_list" });
      setBaris(Array.isArray(out.req) ? out.req : []);
      setGalat("");
    } catch (e) { setBaris([]); setGalat(e.message || String(e)); }
  };
  useEffect(() => { muat(); }, []);

  const data = useMemo(() => (baris || []).map((x) => ({
    __kunci: String(x.id),
    id: Number(x.id || 0),
    agensi: String(x.nama || x.agency_id || "-"),
    coins: Number(x.coins || 0),
    status: String(x.status || "menunggu"),
    at: Number(x.at || 0),
  })), [baris]);

  const tampil = saring === "semua" ? data : data.filter((x) => x.status === saring);
  const menunggu = data.filter((x) => x.status === "menunggu");
  const totalMenunggu = menunggu.reduce((a, x) => a + x.coins, 0);

  const bayar = async () => {
    const t = tanya;
    setTanya(null);
    if (!t || sibuk) return;
    setSibuk(true);
    try {
      await walletAdmin({ op: "agency_req_done", reqId: t.id, oleh: "panel" });
      await catatLog("Pencairan agensi dibayar", t.agensi + " · " + rupiah(t.coins));
      toast("Ditandai dibayar, saldo komisi " + t.agensi + " dipotong " + rupiah(t.coins));
      await muat();
    } catch (e) { toast("Gagal: " + (e.message || e), true); }
    finally { setSibuk(false); }
  };

  return (
    <>
      <Kartu isi={[
        [rupiah(menunggu.length), "Pengajuan menunggu"],
        [rupiah(totalMenunggu), "Coin menunggu dibayar"],
        [rupiah(data.filter((x) => x.status === "dibayar").length), "Sudah dibayar"],
      ]} />

      <Panel judul="Pencairan agency"
        sub="Agensi mengajukan pencairan dari aplikasi (menu Agensi > Ajukan pencairan). Kirim uangnya lewat Dana/OVO/bank, lalu tandai dibayar di sini supaya saldo komisi agensi terpotong dan tidak diajukan dua kali.">
        {galat ? <div className="kosong">Server dompet belum menjawab: {galat}</div> : null}
        <div className="filter" style={{ gap: 8, paddingBottom: 10 }}>
          <Pil on={saring === "menunggu"} onClick={() => setSaring("menunggu")}>Menunggu</Pil>
          <Pil on={saring === "dibayar"} onClick={() => setSaring("dibayar")}>Sudah dibayar</Pil>
          <Pil on={saring === "semua"} onClick={() => setSaring("semua")}>Semua</Pil>
        </div>
        {baris === null ? <Rangka baris={4} /> : (
          <Tabel
            kolom={[
              { k: "agensi", t: "Agensi" },
              { k: "coins", t: "Komisi" },
              { k: "at", t: "Diajukan" },
              { k: "status", t: "Status" },
              { k: "aksi", t: "" },
            ]}
            baris={tampil.map((x) => ({
              agensi: x.agensi,
              coins: rupiah(x.coins),
              at: x.at ? waktu(x.at) : "—",
              status: x.status === "dibayar"
                ? <Tag jenis="aktif">dibayar</Tag>
                : <Tag jenis="mati">menunggu</Tag>,
              aksi: x.status === "menunggu"
                ? <a className="tautanPink" onClick={() => setTanya(x)}>Tandai dibayar</a>
                : <span className="catatan" style={{ padding: 0 }}>selesai</span>,
            }))}
            kosong={saring === "menunggu" ? "Tidak ada pengajuan pencairan yang menunggu." : "Belum ada data pencairan."}
          />
        )}
      </Panel>

      <Konfirmasi buka={!!tanya} judul="Tandai sudah dibayar?"
        pesan={tanya ? "Agensi " + tanya.agensi + " mengajukan " + rupiah(tanya.coins) + " coin. Pastikan uangnya sudah dikirim ke rekening atau e-wallet agensi, karena setelah ditandai saldo komisinya dipotong dan pengajuan tidak bisa dibatalkan." : ""}
        tombol="Sudah dibayar" sibuk={sibuk} onYa={bayar} onTidak={() => setTanya(null)} />
    </>
  );
}

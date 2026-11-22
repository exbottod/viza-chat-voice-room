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
  // Batas pencairan: persen dari coin topup sah bulan ini, supaya uang keluar
  // tidak pernah melebihi uang yang benar-benar masuk.
  const [cair, setCair] = useState(null);
  const [persen, setPersen] = useState("");
  const [batal, setBatal] = useState(null);

  const muat = async () => {
    try {
      const out = await walletAdmin({ op: "agency_req_list" });
      setBaris(Array.isArray(out.req) ? out.req : []);
      setGalat("");
    } catch (e) { setBaris([]); setGalat(e.message || String(e)); }
    try {
      const info = await walletAdmin({ op: "agency_cair_info" });
      setCair(info.cair || null);
      if (info.cair) setPersen(String(info.cair.persen));
    } catch (e) { setCair(null); }
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

  // Pengajuan lama bisa bernilai jauh di atas batas (coin gratis). Ditandai
  // merah dan bisa dibatalkan tanpa memotong saldo komisi agensi.
  const sisaBatas = Number(cair?.sisa ?? 0);
  const lewat = (x) => Number(cair?.batas ?? 0) > 0 ? x.coins > sisaBatas : false;
  const tampil = saring === "semua" ? data : data.filter((x) => x.status === saring);
  const menunggu = data.filter((x) => x.status === "menunggu");
  const totalMenunggu = menunggu.reduce((a, x) => a + x.coins, 0);

  const simpanPersen = async () => {
    setSibuk(true);
    try {
      const out = await walletAdmin({ op: "agency_cair_set", persen: Number(persen) || 0 });
      setCair(out.cair || null);
      if (out.cair) setPersen(String(out.cair.persen));
      toast("Batas pencairan " + (out.cair?.persen ?? persen) + "% dari coin topup sah");
    } catch (e) { toast("Gagal: " + (e.message || e), true); }
    finally { setSibuk(false); }
  };

  const batalkan = async () => {
    const t = batal;
    setBatal(null);
    if (!t || sibuk) return;
    setSibuk(true);
    try {
      await walletAdmin({ op: "agency_req_batal", reqId: t.id, oleh: "panel" });
      await catatLog("Pengajuan pencairan dibatalkan", t.agensi + " · " + rupiah(t.coins));
      toast("Pengajuan dibatalkan, saldo komisi agensi tidak dipotong");
      await muat();
    } catch (e) { toast("Gagal: " + (e.message || e), true); }
    finally { setSibuk(false); }
  };

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

      <Panel judul="Batas pencairan"
        sub="Pengaman kerugian: coin gratis dari game, hadiah level, invite, dan reward room tidak dihitung. Pencairan rupiah hanya boleh sebesar persen di bawah dari coin yang benar-benar dibeli user bulan ini. Bila belum ada topup, pencairan ditolak dan komisi tetap tersimpan.">
        {cair ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "flex-end" }}>
            <div className="isianForm" style={{ maxWidth: 160 }}>
              <span>Batas (% dari topup)</span>
              <input value={persen} onChange={(e) => setPersen(e.target.value)} inputMode="numeric" />
            </div>
            <button className="tombolBaru" onClick={simpanPersen} disabled={sibuk || persen === ""}>Simpan batas</button>
            <div className="catatan" style={{ paddingBottom: 6 }}>
              Bulan {cair.bulan}: coin topup sah {rupiah(cair.topup)} · batas {rupiah(cair.batas)} coin ·
              sudah diajukan {rupiah(cair.dipakai)} · sisa bisa dicairkan {rupiah(cair.sisa)} coin
            </div>
          </div>
        ) : <div className="kosong">Batas pencairan belum bisa dibaca dari server.</div>}
      </Panel>

      <Panel judul="Pencairan agency"
        sub="Agensi mengajukan pencairan dari aplikasi (menu Agensi > Ajukan pencairan). Kirim uangnya lewat Dana/OVO/bank, lalu tandai dibayar di sini supaya saldo komisi agensi terpotong. Pengajuan bertanda lewat batas ditolak server sampai batas dinaikkan atau pengajuannya dibatalkan, jadi uang keluar tidak bisa melebihi porsi dari topup yang benar-benar masuk.">
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
              coins: (
                <span title={lewat(x) ? "Melebihi batas pencairan bulan ini" : ""}>
                  {rupiah(x.coins)}
                  {x.status === "menunggu" && lewat(x) ? <> <Tag jenis="mati">lewat batas</Tag></> : null}
                </span>
              ),
              at: x.at ? waktu(x.at) : "—",
              status: x.status === "dibayar"
                ? <Tag jenis="aktif">dibayar</Tag>
                : <Tag jenis="mati">menunggu</Tag>,
              aksi: x.status === "menunggu"
                ? <span style={{ display: "flex", gap: 10 }}>
                    <a className="tautanPink" onClick={() => setTanya(x)}>Tandai dibayar</a>
                    <a className="tautanPink" onClick={() => setBatal(x)}>Batalkan</a>
                  </span>
                : <span className="catatan" style={{ padding: 0 }}>{x.status === "tolak" ? "dibatalkan" : "selesai"}</span>,
            }))}
            kosong={saring === "menunggu" ? "Tidak ada pengajuan pencairan yang menunggu." : "Belum ada data pencairan."}
          />
        )}
      </Panel>

      <Konfirmasi buka={!!batal} judul="Batalkan pengajuan?"
        pesan={batal ? "Pengajuan " + rupiah(batal.coins) + " coin dari " + batal.agensi + " ditolak. Saldo komisi agensi tidak dipotong, hanya pengajuannya hilang dari daftar menunggu." : ""}
        tombol="Batalkan" sibuk={sibuk} onYa={batalkan} onTidak={() => setBatal(null)} />

      <Konfirmasi buka={!!tanya} judul="Tandai sudah dibayar?"
        pesan={tanya ? "Agensi " + tanya.agensi + " mengajukan " + rupiah(tanya.coins) + " coin. Pastikan uangnya sudah dikirim ke rekening atau e-wallet agensi, karena setelah ditandai saldo komisinya dipotong dan pengajuan tidak bisa dibatalkan." : ""}
        tombol="Sudah dibayar" sibuk={sibuk} onYa={bayar} onTidak={() => setTanya(null)} />
    </>
  );
}

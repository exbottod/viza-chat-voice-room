import { useState } from "react";
import { walletAdmin } from "../dompet.js";
import { catatLog } from "../data.js";
import { Panel, toast } from "../ui.jsx";

export default function Kirim() {
  const [uid, setUid] = useState("");
  const [item, setItem] = useState("");
  const [hari, setHari] = useState("30");
  const [sibuk, setSibuk] = useState(false);

  const kirim = async () => {
    setSibuk(true);
    try {
      await walletAdmin({ op: "kirim_item", uid: uid.trim(), item: item.trim(), hari: Number(hari) || 30 });
      await catatLog("Kirim item", uid.trim() + " · " + item.trim() + " · " + hari + " hari");
      toast("Item dikirim ke " + uid.trim());
    } catch (e) { toast("Gagal: " + (e.message || e), true); }
    finally { setSibuk(false); }
  };

  return (
    <Panel judul="Kirim ke user" sub="Kirim frame, efek, atau medal ke satu akun tanpa menunggu pembelian."
      aksi={<button className="tombolBaru" onClick={kirim} disabled={sibuk || !uid.trim() || !item.trim()}>{sibuk ? "Mengirim…" : "Kirim"}</button>}>
      <label className="isianForm"><span>UID penerima</span><input value={uid} onChange={(e) => setUid(e.target.value)} placeholder="UID akun, bukan nama" /></label>
      <label className="isianForm"><span>ID item</span><input value={item} onChange={(e) => setItem(e.target.value)} placeholder="mis. sx_frame_bulan atau id medal" /></label>
      <label className="isianForm"><span>Masa berlaku (hari)</span><input value={hari} onChange={(e) => setHari(e.target.value)} inputMode="numeric" /></label>
    </Panel>
  );
}

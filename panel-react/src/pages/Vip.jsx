import { useEffect, useRef, useState } from "react";
import { get, ref } from "firebase/database";
import { rtdb } from "../firebase.js";
import { walletAdmin } from "../dompet.js";
import { Pratinjau, Thumb } from "../pratinjau.jsx";
import { unggahBerkas, tulisRtdbServer, kunciVip, hapusRtdbServer, bacaRtdbServer } from "../unggah.js";
import { ambilSemuaMentah, catatLog, rupiah } from "../data.js";
import { Konfirmasi, Panel, Tag, toast } from "../ui.jsx";

const TIER = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * Menu VIP: satu tempat untuk harga VIP level 1-9 dan medali tiap tier.
 *
 * Kenapa dipisah dari Aset Store: aplikasi mencari medali SVIP lewat pasangan
 * nomor tier + slot (vipCfg dengan n = 1..9, slot = "medal"). Halaman Aset
 * biasa tidak punya isian nomor tier, jadi medali yang diunggah di sana tidak
 * pernah tampil sebagai medali VIP. Di sini nomor tier selalu ikut disimpan,
 * dan id-nya svm_N supaya dibaca aplikasi sebagai medali tier N.
 */
export default function Vip() {
  const [harga, setHarga] = useState(Array(9).fill(""));
  const [medali, setMedali] = useState({});
  const [lihat, setLihat] = useState(null);
  const [sibuk, setSibuk] = useState("");
  const [progres, setProgres] = useState("");
  const [hapus, setHapus] = useState(null);
  const berkasRef = useRef({});

  const muatMedali = async () => {
    const peta = {};
    const simpan = (o, kunci) => {
      const n = Number(o.n || 0);
      if (!(n >= 1 && n <= 9)) return;
      if (String(o.slot || "") !== "medal") return;
      peta[n] = { ...(peta[n] || {}), ...o, id: String(o.id || kunci || "svm_" + n), n };
    };
    try { (await ambilSemuaMentah("vipConfig", 400)).forEach((d) => simpan(d, d.id)); } catch (e) { /* tanpa izin baca */ }
    let dapatRtdb = false;
    try {
      const isi = await bacaRtdbServer("vipCfg");
      if (isi && typeof isi === "object") {
        Object.entries(isi).forEach(([k, v]) => simpan(v || {}, k));
        dapatRtdb = true;
      }
    } catch (e) { /* coba cara kedua */ }
    if (!dapatRtdb) {
      try {
        const sn = await get(ref(rtdb, "vipCfg"));
        if (sn.exists()) sn.forEach((c) => simpan(c.val() || {}, c.key));
      } catch (e) { /* tetap pakai Firestore */ }
    }
    setMedali(peta);
  };

  const muatHarga = async () => {
    try {
      const out = await walletAdmin({ op: "vip_harga_get" });
      const h = Array.isArray(out.harga) ? out.harga : [];
      setHarga(TIER.map((n) => String(Number(h[n - 1]) || 0)));
    } catch (e) {
      setHarga(Array(9).fill(""));
    }
  };

  useEffect(() => { muatMedali(); muatHarga(); }, []);

  const unggahMedali = async (tier, berkas) => {
    if (!berkas) return;
    if (berkas.size > 8 * 1024 * 1024) return toast("Berkas lebih dari 8 MB, kecilkan dulu", true);
    setSibuk("medali-" + tier);
    setProgres("mengunggah…");
    try {
      const url = await unggahBerkas(berkas, "vip" + tier + "-medal", (p) => setProgres("mengunggah " + p + "%"));
      if (!url) throw new Error("Server tidak mengembalikan alamat berkas");
      const id = "svm_" + tier;
      const data = {
        id, n: tier, slot: "medal",
        name: "Medali VIP " + tier,
        url, kind: (url.split("?")[0].split(".").pop() || "png").toLowerCase(),
        price: 0, days: 0, order: tier,
        hasData: false, updatedAt: Date.now(), chunks: 0, store: false,
      };
      setProgres("menyimpan…");
      await walletAdmin({ op: "fs_set", jalur: "vipConfig/" + id, data });
      await tulisRtdbServer("vipCfg/" + kunciVip(id), data);
      await catatLog("Medali VIP " + tier, data.name);
      toast("Medali VIP " + tier + " tersimpan");
      await muatMedali();
    } catch (e) {
      toast("Gagal: " + (e.message || e), true);
    } finally {
      setSibuk("");
      setProgres("");
      const el = berkasRef.current[tier];
      if (el) el.value = "";
    }
  };

  const hapusMedali = async (tier) => {
    setSibuk("hapus-" + tier);
    try {
      const id = (medali[tier] && medali[tier].id) || "svm_" + tier;
      await walletAdmin({ op: "fs_del", koleksi: "vipConfig", id });
      await hapusRtdbServer("vipCfg/" + kunciVip(id)).catch(() => {});
      await catatLog("Hapus medali VIP " + tier, id);
      toast("Medali VIP " + tier + " dihapus");
      await muatMedali();
    } catch (e) {
      toast("Gagal: " + (e.message || e), true);
    } finally { setSibuk(""); }
  };

  const simpanHarga = async () => {
    setSibuk("harga");
    try {
      const angka = harga.map((x) => Math.round(Number(String(x).replace(/[^0-9]/g, "")) || 0));
      const out = await walletAdmin({ op: "vip_harga_set", harga: angka });
      const h = Array.isArray(out.harga) ? out.harga : angka;
      setHarga(TIER.map((n) => String(Number(h[n - 1]) || 0)));
      await catatLog("Harga VIP", angka.join(", "));
      toast("Harga VIP tersimpan");
    } catch (e) {
      toast("Gagal: " + (e.message || e), true);
    } finally { setSibuk(""); }
  };

  return (
    <>
      <Panel judul="VIP & Medali" sub="Harga VIP level 1 sampai 9 dan medali tiap tier. Aplikasi membaca keduanya tanpa build ulang."
        aksi={<button className="tombolBaru" onClick={simpanHarga} disabled={sibuk === "harga"}>
          {sibuk === "harga" ? "Menyimpan…" : "Simpan harga"}
        </button>}>
        <div style={{ display: "grid", gap: 10 }}>
          {TIER.map((n) => {
            const m = medali[n];
            const kosong = !m || !m.url;
            return (
              <div key={n} style={{
                display: "flex", alignItems: "center", gap: 12, padding: 10,
                background: "#1f1f2b", borderRadius: 5, border: "1px solid #2b2b3a",
              }}>
                {kosong ? (
                  <div style={{
                    width: 46, height: 46, borderRadius: 8, flex: "0 0 auto",
                    background: "#262635", display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, color: "#9a9cab",
                  }}>kosong</div>
                ) : (
                  <Thumb url={m.url} kind={m.kind} poster={m.poster} nama={"Medali VIP " + n} lebar={46}
                    onKlik={() => setLihat({ ...m, nama: "Medali VIP " + n })} />
                )}
                <div style={{ flex: "1 1 auto", minWidth: 0 }}>
                  <div style={{ fontWeight: 600 }}>VIP {n}</div>
                  <div style={{ fontSize: 12, color: "#9a9cab" }}>
                    {kosong ? "Belum ada medali" : (m.name || "Medali VIP " + n)}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flex: "0 0 auto" }}>
                  <span style={{ fontSize: 12, color: "#9a9cab" }}>Harga</span>
                  <input
                    value={harga[n - 1]}
                    onChange={(e) => { const a = [...harga]; a[n - 1] = e.target.value.replace(/[^0-9]/g, ""); setHarga(a); }}
                    placeholder="0"
                    style={{ width: 120, padding: "6px 8px", background: "#181821", color: "#fff", border: "1px solid #2b2b3a", borderRadius: 5 }}
                  />
                  <span style={{ fontSize: 11, color: "#9a9cab", minWidth: 88 }}>
                    {Number(harga[n - 1]) ? rupiah(harga[n - 1]) + " coin" : "Gratis"}
                  </span>
                </div>
                <label className="pil" style={{ cursor: "pointer", flex: "0 0 auto" }}>
                  {sibuk === "medali-" + n ? (progres || "Mengunggah…") : (kosong ? "Unggah" : "Ganti")}
                  <input
                    ref={(el) => { berkasRef.current[n] = el; }}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    disabled={sibuk === "medali-" + n}
                    onChange={(e) => unggahMedali(n, e.target.files && e.target.files[0])}
                  />
                </label>
                {!kosong && (
                  <button className="pil" onClick={() => setHapus(n)} disabled={sibuk === "hapus-" + n}>
                    Hapus
                  </button>
                )}
                {!kosong && <Tag jenis="aktif">terpasang</Tag>}
              </div>
            );
          })}
        </div>
      </Panel>
      <Konfirmasi
        buka={hapus !== null}
        judul={"Hapus medali VIP " + (hapus || "")}
        pesan="Medali tier ini akan hilang dari aplikasi. Harga VIP tidak berubah."
        tombol="Hapus"
        sibuk={String(sibuk).startsWith("hapus-")}
        onYa={async () => { const n = hapus; setHapus(null); await hapusMedali(n); }}
        onTidak={() => setHapus(null)}
      />
      <Pratinjau aset={lihat} onTutup={() => setLihat(null)} />

    </>
  );
}

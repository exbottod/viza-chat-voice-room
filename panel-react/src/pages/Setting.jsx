import { useEffect, useState } from "react";
import { walletAdmin } from "../dompet.js";
import { catatLog } from "../data.js";
import { Konfirmasi, Rangka, toast } from "../ui.jsx";

const TAB = [
  ["umum", "General"], ["agora", "Agora"], ["versi", "Versi minimum"],
  ["payment", "Payment"], ["firebase", "Firebase"], ["admin", "Admin panel"],
];

const Isian = ({ label, info, ...p }) => (
  <label className="isianForm">
    <span>{label}</span>
    <input {...p} />
    {info ? <small>{info}</small> : null}
  </label>
);

const Saklar = ({ nyala, onUbah, label }) => (
  <div className="barisSaklar">
    <b>{label}</b>
    <button type="button" className={"saklar" + (nyala ? " nyala" : "")} onClick={() => onUbah(!nyala)} aria-pressed={nyala}>
      <i />
    </button>
  </div>
);

const Kartu = ({ judul, children }) => (
  <div className="panel"><div className="panelAtas"><h3>{judul}</h3></div><div className="panelIsi">{children}</div></div>
);

export default function Setting() {
  const [tab, setTab] = useState(() => (location.hash.split("?tab=")[1] || "umum"));
  const [cfg, setCfg] = useState(null);
  const [galat, setGalat] = useState("");
  const [sibuk, setSibuk] = useState(false);
  const [konfirmasi, setKonfirmasi] = useState(null);

  // Isian yang bisa diketik
  const [agoraId, setAgoraId] = useState("");
  const [agoraCert, setAgoraCert] = useState("");
  const [versi, setVersi] = useState({ versiTerbaru: "", versiMin: "", apkUrl: "", apkCatatan: "" });
  const [aset, setAset] = useState({ assetPackage: "", assetSha256: "" });
  const [bayar, setBayar] = useState({ stripeAktif: false, stripePub: "", stripeSecret: "", paystackAktif: false, paystackPub: "", paystackSecret: "" });
  const [fcm, setFcm] = useState("");

  const muat = async () => {
    try {
      const out = await walletAdmin({ op: "cfg_get" });
      const c = out.cfg || {};
      setCfg(c);
      setVersi({ versiTerbaru: c.versiTerbaru || "", versiMin: c.versiMin || "", apkUrl: c.apkUrl || "", apkCatatan: c.apkCatatan || "" });
      setAset({ assetPackage: c.assetPackage || "", assetSha256: c.assetSha256 || "" });
      setBayar((b) => ({
        ...b,
        stripeAktif: c.stripeAktif === "1", stripePub: c.stripePub || "",
        paystackAktif: c.paystackAktif === "1", paystackPub: c.paystackPub || "",
      }));
      setGalat("");
    } catch (e) {
      setGalat(e.message || String(e));
      setCfg({});
    }
  };
  useEffect(() => { muat(); }, []);

  const simpan = async (nilai, ket, sesudah) => {
    setSibuk(true);
    try {
      const out = await walletAdmin({ op: "cfg_set", nilai });
      await catatLog("Ubah pengaturan", ket);
      toast(ket + " disimpan");
      await muat();
      sesudah && sesudah(out);
    } catch (e) { toast("Gagal: " + (e.message || e), true); }
    finally { setSibuk(false); setKonfirmasi(null); }
  };

  if (cfg === null) return <Rangka baris={6} />;

  const rahasiaAda = (k) => cfg[k] && cfg[k].ada ? "Tersimpan: " + cfg[k].samar + " (kosongkan bila tidak diubah)" : "Belum diisi";

  return (
    <>
      <div className="deretTab">
        {TAB.map(([id, nama]) => (
          <button key={id} className={"tabSet" + (tab === id ? " on" : "")} onClick={() => setTab(id)}>{nama}</button>
        ))}
      </div>

      {galat ? (
        <div className="panel"><div className="kosong">
          Pengaturan server belum bisa dibaca: {galat}<br />
          Pastikan server dompet sudah diperbarui (jalankan perbarui-dompet-viza.sh) dan Anda masuk sebagai developer.
        </div></div>
      ) : null}

      {tab === "umum" ? (
        <>
          <div className="panel">
            <div className="panelAtas"><h3>App Setting</h3>
              <span className="infoBulat" title="Versi dan tautan unduh yang dipakai aplikasi Android">i</span>
            </div>
            <div className="panelIsi">
              <Isian label="Android App Version" value={versi.versiTerbaru} onChange={(e) => setVersi({ ...versi, versiTerbaru: e.target.value })} placeholder="mis. 1.0.340" />
              <Isian label="Android App Link" value={versi.apkUrl} onChange={(e) => setVersi({ ...versi, apkUrl: e.target.value })} placeholder="https://exbottod.github.io/viza-chat-voice-room/unduh/" />
              <div className="barisAksiForm" style={{ justifyContent: "flex-end" }}>
                <button className="tombolBaru" disabled={sibuk} onClick={() => simpan({ versiTerbaru: versi.versiTerbaru, apkUrl: versi.apkUrl }, "Versi & link APK")}>Submit</button>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panelAtas"><h3>Android Asset Link</h3>
              <span className="infoBulat" title="Menyambungkan domain dengan aplikasi Android lewat assetlinks.json">i</span>
            </div>
            <div className="panelIsi">
              <div className="catatan" style={{ marginTop: 0, marginBottom: 14 }}>Associate your website with the Android app</div>
              <Isian label="Nama paket Android" value={aset.assetPackage} onChange={(e) => setAset({ ...aset, assetPackage: e.target.value.trim() })} placeholder="mis. com.rezochatvoice.exceo" />
              <Isian label="SHA-256 sidik sertifikat" value={aset.assetSha256} onChange={(e) => setAset({ ...aset, assetSha256: e.target.value.trim() })} placeholder="AA:BB:CC:… 32 pasang, dipisah titik dua" />
              <div className="barisAksiForm" style={{ justifyContent: "flex-end" }}>
                <button className="tombolBaru" disabled={sibuk} onClick={() => simpan(aset, "Android asset link")}>Submit</button>
              </div>
              <div className="catatan">
                Berkasnya langsung disajikan di https://viza.43-156-99-4.sslip.io/.well-known/assetlinks.json
                {cfg.assetPackage ? " (terpasang: " + cfg.assetPackage + ")" : ""}. Sidik sertifikat bisa dilihat dengan
                perintah <code>keytool -list -v -keystore viza.keystore</code>.
              </div>
            </div>
          </div>
        </>
      ) : null}

      {tab === "agora" ? (
        <Kartu judul="Agora">
          <div className="catatan" style={{ marginBottom: 12 }}>
            Ganti akun Agora kapan saja: buat project baru di console.agora.io, tempel App ID dan App Certificate di sini, lalu konfirmasi.
            Server langsung memakainya dan token suara baru dibuat dari kunci itu. Tidak perlu membangun APK lagi.
            Aktif sekarang: <b>{cfg.agoraAppIdAktif || "belum ada"}</b>.
          </div>
          <Isian label="Agora Key (App ID, 32 karakter)" value={agoraId} onChange={(e) => setAgoraId(e.target.value.trim())} placeholder="mis. 406ff649c0bd49d397b487d22d075493" maxLength={32} />
          <Isian label="Agora Certificates (App Certificate, 32 karakter)" value={agoraCert} onChange={(e) => setAgoraCert(e.target.value.trim())} placeholder={cfg.agoraCert?.ada ? "Tersimpan di server: " + cfg.agoraCert.samar : "tempel App Certificate"} maxLength={32} autoComplete="off" />
          <div className="barisAksiForm" style={{ justifyContent: "flex-end" }}>
            <button className="tombolBaru" disabled={sibuk || !/^[0-9a-f]{32}$/i.test(agoraId) || !/^[0-9a-f]{32}$/i.test(agoraCert)}
              onClick={() => setKonfirmasi({
                judul: "Ganti akun Agora?",
                pesan: "Semua room langsung memakai App ID baru (" + agoraId.slice(0, 6) + "…). Suara yang sedang berjalan bisa terputus sebentar lalu tersambung kembali dengan akun baru.",
                tombol: "Konfirmasi & terapkan",
                jalan: () => simpan({ agoraAppId: agoraId, agoraCert: agoraCert }, "Akun Agora", (o) => {
                  setAgoraId(""); setAgoraCert("");
                  toast(o.ujiAgora === 1 ? "Uji token berhasil: suara siap memakai akun baru" : "Tersimpan, tetapi uji token gagal. Periksa App ID dan Certificate.", o.ujiAgora !== 1);
                }),
              })}>
              Submit
            </button>
          </div>
          <div className="catatan">Certificate hanya disimpan di server dan tidak pernah dikirim balik ke browser.</div>
        </Kartu>
      ) : null}

      {tab === "versi" ? (
        <Kartu judul="Versi minimum & catatan pembaruan">
          <Isian label="Versi minimum (di bawah ini wajib update)" value={versi.versiMin} onChange={(e) => setVersi({ ...versi, versiMin: e.target.value })} placeholder="mis. 1.0.330" />
          <label className="isianForm"><span>Catatan pembaruan</span>
            <textarea rows={4} value={versi.apkCatatan} onChange={(e) => setVersi({ ...versi, apkCatatan: e.target.value })} />
          </label>
          <div className="barisAksiForm" style={{ justifyContent: "flex-end" }}>
            <button className="tombolBaru" disabled={sibuk} onClick={() => simpan({ versiMin: versi.versiMin, apkCatatan: versi.apkCatatan }, "Versi minimum")}>Submit</button>
          </div>
          <div className="catatan">Versi dan link unduh ada di tab General. Nilai di sini dibaca dari https://viza.43-156-99-4.sslip.io/app-cfg.json.</div>
        </Kartu>
      ) : null}

      {tab === "payment" ? (
        <>
          <Kartu judul="Stripe Android Switch (aktif/nonaktif pembayaran di aplikasi)">
            <Saklar label="Stripe" nyala={bayar.stripeAktif} onUbah={(v) => setBayar({ ...bayar, stripeAktif: v })} />
            <Isian label="Stripe Publishable Key" value={bayar.stripePub} onChange={(e) => setBayar({ ...bayar, stripePub: e.target.value.trim() })} placeholder="pk_live_..." />
            <Isian label="Stripe Secret Key" type="password" value={bayar.stripeSecret} onChange={(e) => setBayar({ ...bayar, stripeSecret: e.target.value.trim() })} placeholder={rahasiaAda("stripeSecret")} autoComplete="off" />
            <div className="barisAksiForm" style={{ justifyContent: "flex-end" }}>
              <button className="tombolBaru" disabled={sibuk}
                onClick={() => simpan({ stripeAktif: bayar.stripeAktif ? "1" : "0", stripePub: bayar.stripePub, stripeSecret: bayar.stripeSecret }, "Stripe", () => setBayar((b) => ({ ...b, stripeSecret: "" })))}>Submit</button>
            </div>
          </Kartu>
          <Kartu judul="Paystack Android Switch">
            <Saklar label="Paystack" nyala={bayar.paystackAktif} onUbah={(v) => setBayar({ ...bayar, paystackAktif: v })} />
            <Isian label="Paystack Public Key" value={bayar.paystackPub} onChange={(e) => setBayar({ ...bayar, paystackPub: e.target.value.trim() })} placeholder="pk_live_..." />
            <Isian label="Paystack Secret Key" type="password" value={bayar.paystackSecret} onChange={(e) => setBayar({ ...bayar, paystackSecret: e.target.value.trim() })} placeholder={rahasiaAda("paystackSecret")} autoComplete="off" />
            <div className="barisAksiForm" style={{ justifyContent: "flex-end" }}>
              <button className="tombolBaru" disabled={sibuk}
                onClick={() => simpan({ paystackAktif: bayar.paystackAktif ? "1" : "0", paystackPub: bayar.paystackPub, paystackSecret: bayar.paystackSecret }, "Paystack", () => setBayar((b) => ({ ...b, paystackSecret: "" })))}>Submit</button>
            </div>
          </Kartu>
          <div className="catatan" style={{ padding: "0 4px" }}>
            Kunci tersimpan di server. Tujuan top-up manual (DANA, GoPay, QRIS) diatur di menu Currency.
            Saklar dan kunci ini baru berpengaruh setelah jalur bayar kartu di aplikasi dihubungkan.
          </div>
        </>
      ) : null}

      {tab === "firebase" ? (
        <Kartu judul="Private Key JSON (untuk notifikasi push Firebase)">
          <label className="isianForm">
            <span>Tempel isi berkas JSON akun layanan</span>
            <textarea rows={10} value={fcm} onChange={(e) => setFcm(e.target.value)}
              placeholder={cfg.fcmJson?.ada ? "Sudah tersimpan di server (" + cfg.fcmJson.samar + "). Kosongkan bila tidak diubah." : '{ "type": "service_account", ... }'}
              spellCheck={false} />
          </label>
          <div className="barisAksiForm" style={{ justifyContent: "flex-end" }}>
            <button className="tombolBaru" disabled={sibuk || !fcm.trim()} onClick={() => simpan({ fcmJson: fcm }, "Kunci Firebase", () => setFcm(""))}>Submit</button>
          </div>
          <div className="catatan">JSON diperiksa dulu (harus akun layanan) dan disimpan hanya di server. Isinya tidak ditampilkan lagi setelah disimpan.</div>
        </Kartu>
      ) : null}

      {tab === "admin" ? (
        <Kartu judul="Admin panel">
          <div className="catatan">Daftar admin dan manager panel dikelola di menu Host & Agency dan Staf panel.</div>
          <div style={{ marginTop: 12 }}>
            <a className="tombolBaru" href="#staf">Buka Staf panel</a>
          </div>
        </Kartu>
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

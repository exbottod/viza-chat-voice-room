import { useEffect, useRef, useState } from "react";

/**
 * Pratinjau aset untuk panel: gambar (PNG, JPG, WebP, GIF, AVIF), video MP4,
 * dan animasi SVGA. Pemutar SVGA (svgaplayerweb) dimuat hanya saat dibutuhkan,
 * jadi halaman tetap ringan dan tetap jalan walau berkas tidak bisa diputar.
 */

export const ekstensi = (url, kind) => {
  const dariUrl = String(url || "").split("?")[0].split("#")[0].split(".").pop() || "";
  return String(kind || dariUrl).toLowerCase();
};

export const jenisMedia = (url, kind) => {
  const e = ekstensi(url, kind);
  if (["mp4", "webm", "mov", "m4v"].includes(e)) return "video";
  if (e === "svga") return "svga";
  if (["png", "jpg", "jpeg", "webp", "gif", "avif", "svg", "bmp"].includes(e)) return "gambar";
  if (!e) return "lain";
  return "gambar"; // anggap gambar supaya tetap dicoba tampil
};

let janjiSvga = null;
/** Muat pustaka SVGA sekali saja; kembalikan null bila gagal (offline dsb). */
function muatSvga() {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.SVGA) return Promise.resolve(window.SVGA);
  if (!janjiSvga) {
    // Paket SVGA berbentuk UMD: di sebagian pemuat ia menempel di window,
    // di bundel lain ia jadi ekspor modul. Keduanya dicoba.
    janjiSvga = import("svgaplayerweb")
      .then((m) => {
        const calon = [window.SVGA, m?.default?.default, m?.default, m?.s?.default, m?.s, m]
          .find((x) => x && typeof x === "object" && x.Player);
        return calon || null;
      })
      .catch(() => null);
  }
  return janjiSvga;
}

/**
 * Gambar kecil di tabel. Untuk SVGA, bingkai pertama diambil sebagai gambar
 * diam supaya jenis berkasnya langsung terlihat tanpa memutar animasi.
 */
export function Thumb({ url, kind, poster, nama, lebar = 48, onKlik }) {
  const [gagal, setGagal] = useState(false);
  const [svgaGambar, setSvgaGambar] = useState("");
  const jenis = jenisMedia(url, kind);
  const alamat = String(url || "");

  useEffect(() => {
    let batal = false;
    setGagal(false);
    setSvgaGambar("");
    if (jenis !== "svga" || !alamat) return;
    if (poster) { setSvgaGambar(poster); return; }
    (async () => {
      const SVGA = await muatSvga();
      if (!SVGA || batal) return;
      try {
        const kanvas = document.createElement("canvas");
        kanvas.width = 96;
        kanvas.height = 96;
        const pemutar = new SVGA.Player(kanvas);
        const pengurai = new SVGA.Parser();
        await new Promise((ok, tolak) => {
          pengurai.load(alamat, (item) => {
            try {
              pemutar.setVideoItem(item);
              // Bingkai pertama saja: tidak diputar, hemat CPU di daftar panjang.
              pemutar.stepToFrame(0, false);
              setTimeout(() => ok(), 60);
            } catch (e) { tolak(e); }
          }, (e) => tolak(e));
        });
        if (!batal) setSvgaGambar(kanvas.toDataURL("image/png"));
      } catch (e) { /* biarkan ikon */ }
    })();
    return () => { batal = true; };
  }, [jenis, alamat, poster]);

  const gaya = { width: lebar, height: lebar };
  let isi;
  if (!alamat) isi = <span className="thumb kotakIkon">-</span>;
  else if (jenis === "video") isi = <video className="thumb" style={gaya} src={alamat} muted loop playsInline preload="metadata" />;
  else if (jenis === "svga") {
    isi = svgaGambar
      ? <img className="thumb" style={gaya} src={svgaGambar} alt="" />
      : <span className="thumb kotakIkon"><span className="material-icons">animation</span><i>SVGA</i></span>;
  } else if (gagal) isi = <span className="thumb kotakIkon"><span className="material-icons">broken_image</span></span>;
  else isi = <img className="thumb" style={gaya} src={alamat} alt="" loading="lazy" onError={() => setGagal(true)} />;

  return (
    <button type="button" className="tombolThumb" title={nama ? "Lihat " + nama : "Lihat pratinjau"}
      onClick={(e) => { e.stopPropagation(); onKlik?.(); }}>
      {isi}
    </button>
  );
}

/** Jendela pratinjau: memutar SVGA/MP4 atau menampilkan gambar penuh. */
export function Pratinjau({ aset, onTutup }) {
  const buka = !!aset;
  const alamat = String(aset?.url || "");
  const jenis = jenisMedia(alamat, aset?.kind);
  const [siap, setSiap] = useState(false);
  const [galat, setGalat] = useState("");
  const kanvasRef = useRef(null);

  useEffect(() => {
    if (!buka) return;
    setSiap(false);
    setGalat("");
    if (jenis !== "svga" || !alamat) return;
    let batal = false;
    let pemutar = null;
    (async () => {
      const SVGA = await muatSvga();
      if (!SVGA) { setGalat("Pemutar SVGA tidak bisa dimuat. Buka berkasnya lewat tautan di bawah."); return; }
      try {
        pemutar = new SVGA.Player(kanvasRef.current);
        pemutar.loops = 0;
        pemutar.clearsAfterStop = false;
        const pengurai = new SVGA.Parser();
        pengurai.load(alamat, (item) => {
          if (batal) return;
          pemutar.setVideoItem(item);
          pemutar.startAnimation();
          setSiap(true);
        }, () => setGalat("Berkas SVGA tidak bisa dibaca."));
      } catch (e) {
        setGalat("Berkas SVGA tidak bisa dibuka: " + (e?.message || e));
      }
    })();
    return () => { batal = true; try { pemutar?.stopAnimation(); pemutar?.clear(); } catch (e) { /* abaikan */ } };
  }, [buka, jenis, alamat]);

  useEffect(() => {
    if (!buka) return;
    const esc = (e) => { if (e.key === "Escape") onTutup?.(); };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [buka, onTutup]);

  if (!buka) return null;
  return (
    <div className="lapisPratinjau" onClick={onTutup}>
      <div className="kotakPratinjauBesar" onClick={(e) => e.stopPropagation()}>
        <div className="kepalaPratinjau">
          <div>
            <b>{aset?.nama || aset?.name || "Pratinjau"}</b>
            <span>{jenis === "svga" ? "SVGA (animasi)" : jenis === "video" ? "Video MP4" : "Gambar"} · {ekstensi(alamat, aset?.kind).toUpperCase() || "berkas"}</span>
          </div>
          <button type="button" className="pil" onClick={onTutup}>Tutup</button>
        </div>
        <div className="isiPratinjauBesar">
          {!alamat ? <div className="catatan">Aset ini tidak punya berkas.</div>
            : jenis === "svga" ? (
              <>
                <canvas ref={kanvasRef} className="kanvasSvga" width="320" height="320" />
                {!siap && !galat ? <div className="catatan">Memuat animasi…</div> : null}
                {galat ? <div className="catatan">{galat}</div> : null}
              </>
            ) : jenis === "video" ? (
              <video src={alamat} controls autoPlay loop muted playsInline style={{ maxWidth: "100%", maxHeight: "60vh", borderRadius: 8 }} />
            ) : (
              <img src={alamat} alt="" style={{ maxWidth: "100%", maxHeight: "60vh", borderRadius: 8 }}
                onError={() => setGalat("Gambar tidak bisa dimuat.")} />
            )}
          {galat && jenis !== "svga" ? <div className="catatan">{galat}</div> : null}
        </div>
        <div className="kakiPratinjau">
          <a className="tautanPink" href={alamat} target="_blank" rel="noopener">Buka berkas di tab baru</a>
        </div>
      </div>
    </div>
  );
}

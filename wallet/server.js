/**
 * Pembungkus Node untuk dompet VIZA - layanan terpisah dari dompet Rezo.
 *
 * Kode dompet tetap satu sumber: wallet/index.js. Berkas ini hanya menjalankan
 * fungsi fetch yang sama di atas HTTP Node, jadi tidak ada logika uang yang
 * diduplikasi. Database SQLite-nya sendiri di /opt/viza-api/data/viza.db,
 * jadi saldo Viza tidak pernah bercampur dengan saldo Rezo.
 */
import http from "node:http";
import worker from "./index.js";

// Semua variabel lingkungan diteruskan ke kode dompet, supaya kunci seperti
// LIVEKIT_API_KEY, LIVEKIT_API_SECRET, LIVEKIT_URL, WA_OTP_URL ikut terbaca.
// Tanpa ini, kode dompet hanya melihat dua variabel dan fitur baru balas 503.
const env = {
  ...process.env,
  RESEND_KEY: process.env.RESEND_KEY || "",
  RESEND_DARI: process.env.RESEND_DARI || "",
  LIVEKIT_URL: process.env.LIVEKIT_URL || "",
  LIVEKIT_API_KEY: process.env.LIVEKIT_API_KEY || "",
  LIVEKIT_API_SECRET: process.env.LIVEKIT_API_SECRET || "",
};
const PORT = Number(process.env.PORT || 8091);
const HOST = process.env.HOST || "127.0.0.1";
const BATAS = Math.max(1, Number(process.env.BATAS_ISI_MB || 12)) * 1024 * 1024;

function bacaIsi(req) {
  return new Promise((resolve, reject) => {
    const potongan = [];
    let total = 0;
    req.on("data", (c) => {
      total += c.length;
      if (total > BATAS) { reject(new Error("Isi permintaan terlalu besar")); req.destroy(); return; }
      potongan.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(potongan)));
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  try {
    const body = ["GET", "HEAD"].includes(req.method) ? undefined : await bacaIsi(req);
    const alamat = "https://" + (req.headers.host || HOST + ":" + PORT) + (req.url || "/");
    const request = new Request(alamat, { method: req.method, headers: req.headers, body });
    const out = await worker.fetch(request, env, { waitUntil() {} });
    const headers = {};
    out.headers.forEach((v, k) => { headers[k] = v; });
    res.writeHead(out.status, headers);
    res.end(Buffer.from(await out.arrayBuffer()));
  } catch (e) {
    res.writeHead(500, { "content-type": "application/json" });
    res.end(JSON.stringify({ ok: 0, e: "server error" }));
  }
});

server.listen(PORT, HOST, () => console.log("dompet Viza jalan di http://" + HOST + ":" + PORT));

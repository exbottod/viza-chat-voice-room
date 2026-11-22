/**
 * Pembungkus Node untuk dompet VIZA - layanan terpisah dari dompet Rezo.
 *
 * Kode dompet tetap satu sumber: wallet/index.js. Berkas ini hanya menjalankan
 * fungsi fetch yang sama di atas HTTP Node, jadi tidak ada logika uang yang
 * diduplikasi. Database SQLite-nya sendiri di /opt/viza-api/data/viza.db,
 * jadi saldo Viza tidak pernah bercampur dengan saldo Rezo.
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import worker, { hadiahMenitRoom } from "./index.js";

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


// ---------- Berkas game HTML5 (Bikini Wild Rush) ----------
// Game disajikan dari VPS ini juga, jadi alamat game satu domain dengan dompet
// (tanpa CORS) dan pembaruan game cukup ganti berkas di VPS, tanpa APK baru.
const GAME_DIR = process.env.GAME_DIR || "/opt/viza-api/game";
const JENIS = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
};

function sajikanGame(req, res) {
  const jalur = decodeURIComponent((req.url || "/").split("?")[0]);
  let rel = jalur.replace(/^\/game\/?/, "");
  if (!rel || rel.endsWith("/")) rel += "index.html";
  const berkas = path.resolve(GAME_DIR, rel);
  if (!berkas.startsWith(path.resolve(GAME_DIR))) {
    res.writeHead(403);
    return res.end("terlarang");
  }
  fs.stat(berkas, (galat, info) => {
    if (galat || !info.isFile()) {
      res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      return res.end("berkas game tidak ada: " + rel);
    }
    res.writeHead(200, {
      "content-type": JENIS[path.extname(berkas).toLowerCase()] || "application/octet-stream",
      "content-length": info.size,
      "cache-control": rel.endsWith("index.html") ? "no-cache" : "public, max-age=86400",
      "access-control-allow-origin": "*",
    });
    fs.createReadStream(berkas).pipe(res);
  });
}

const server = http.createServer(async (req, res) => {
  // Berkas game tidak perlu lewat dompet.
  if ((req.method === "GET" || req.method === "HEAD") && (req.url || "").startsWith("/game/")) {
    return sajikanGame(req, res);
  }
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

// Poin kamar per menit (level kamar). Dihitung di server supaya tidak bisa
// dinaikkan sendiri dari HP. Dijalankan tiap menit setelah server siap.
setTimeout(() => {
  const jalan = () => {
    hadiahMenitRoom(process.env)
      .then((r) => { if (r && r.ok) console.log("poin menit kamar:", r.room, "room"); })
      .catch(() => {});
  };
  jalan();
  setInterval(jalan, 60_000);
}, 20_000);

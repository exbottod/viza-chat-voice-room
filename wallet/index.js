/**
 * Dompet REZO: SQLite lokal di VPS (juga jalan di Cloudflare).
 *
 * Menggantikan smart-processor Supabase. Bentuk jawabannya sama persis
 * ({"ok":1,"w":{...}} atau {"ok":0,"e":"..."}), jadi aplikasi tidak perlu
 * diubah selain alamat server.
 *
 * Semua operasi uang memakai satu transaksi SQLite (BEGIN IMMEDIATE) dan
 * penanda permintaan, jadi permintaan yang terkirim dua kali tidak
 * memotong coin dua kali.
 */

const PROJ = "my-app-e7f8c";
// Project Firebase lain yang dipercaya (aplikasi white-label Viza memakai project sendiri).
// Jangan pernah menambah project Firebase milik orang lain di sini. "raps-star"
// adalah project buatan orang yang menerima source APK Viza, jadi tokennya tidak
// boleh dipercaya: kalau dipercaya, pemilik project itu bisa memanggil dompet
// dengan akun buatannya sendiri. APK resmi Viza memakai project my-app-e7f8c.
const PROJ_LAIN = [];
const PROJ_SAH = [PROJ, ...PROJ_LAIN];

// ---------- Game Greedy King (satu berkas dengan dompet supaya update VPS
// hanya perlu mengunduh index.js) ----------
/**
 * Game Greedy King milik REZO.
 *
 * Semua uang memakai dompet yang sama (tabel wallets), jadi tidak ada saldo
 * terpisah. Hasil putaran ditentukan nomor putaran (SHA-256), bukan pemanggil,
 * supaya adil untuk semua pemain.
 */

const ROUND_MS = 40000;
const BET_MS = 30000;

const DISHES = [
  { id: "hotdog", group: "meat", odds: 10 },
  { id: "skewer", group: "meat", odds: 15 },
  { id: "drumstick", group: "meat", odds: 25 },
  { id: "steak", group: "meat", odds: 45 },
  { id: "tomato", group: "veg", odds: 5 },
  { id: "corn", group: "veg", odds: 5 },
  { id: "cabbage", group: "veg", odds: 5 },
  { id: "carrot", group: "veg", odds: 5 },
];
const GROUP_ODDS = { veg: 1.25, meat: 4.37 };
const POTS = new Set([...DISHES.map((d) => d.id), "veg", "meat"]);
const WEIGHTS = [
  ["carrot", 19], ["cabbage", 19], ["corn", 19], ["tomato", 19],
  ["hotdog", 9], ["skewer", 6], ["drumstick", 4], ["steak", 2],
  ["salad", 0.4], ["pizza", 0.15],
];
const SALT = "greedy-king-v1-7f3a91c2";
const MAKS_BET = 1000000000000;

const roundOf = (ms) => Math.floor(ms / ROUND_MS);
const sedangPasang = (ms) => ms % ROUND_MS < BET_MS;

function pickResult(r, daftar) {
  const rows = Array.isArray(daftar) && daftar.length ? daftar : WEIGHTS;
  const total = rows.reduce((s, [, w]) => s + w, 0);
  let x = r * total;
  for (const [id, w] of rows) {
    if (x < w) return id;
    x -= w;
  }
  return "carrot";
}

// ---- Pengaturan Greedy dari panel: daftar chip bet dan RTP ----
// RTP 75 = standar (bobot bawaan). Naikkan RTP (mis. 100) maka peluang hasil
// bernilai besar (steak, pizza, salad) ikut naik, jadi JP lebih sering keluar.
const GK_BAWAAN = { bet: [100, 500, 1000, 5000, 50000], rtp: 75 };
async function gkCfg(env) {
  const d = await cfgRtdb("pub/_greedyCfg", env);
  let bet = Array.isArray(d?.bet) ? d.bet.map((x) => Math.floor(Number(x) || 0)).filter((x) => x > 0) : [];
  if (!bet.length) bet = GK_BAWAAN.bet.slice();
  bet = bet.slice(0, 8).sort((a, b) => a - b);
  const rtp = Math.max(40, Math.min(200, Number(d?.rtp ?? GK_BAWAAN.rtp)));
  return { bet, rtp };
}

/** Crazy Fruit: chip bet + RTP. Disimpan di pub/_cfCfg lewat panel. */
const CF_BAWAAN = { bet: [1000, 5000, 10000, 50000, 100000], rtp: 92 };
async function cfCfg(env) {
  const d = await cfgRtdb("pub/_cfCfg", env);
  let bet = Array.isArray(d?.bet) ? d.bet.map((x) => Math.floor(Number(x) || 0)).filter((x) => x > 0) : [];
  if (!bet.length) bet = CF_BAWAAN.bet.slice();
  bet = bet.slice(0, 8).sort((a, b) => a - b);
  const rtp = Math.max(50, Math.min(120, Math.floor(Number(d?.rtp ?? CF_BAWAAN.rtp))));
  return { bet, rtp };
}

/** Bayaran per 1 coin untuk tiap hasil (dipakai menghitung bobot RTP). */
const ODDS_HASIL = (() => {
  const o = {};
  for (const d of DISHES) o[d.id] = d.odds;
  const veg = DISHES.filter((d) => d.group === "veg").reduce((a, d) => a + d.odds, 0) + GROUP_ODDS.veg;
  const meat = DISHES.filter((d) => d.group === "meat").reduce((a, d) => a + d.odds, 0) + GROUP_ODDS.meat;
  o.salad = veg;
  o.pizza = meat;
  return o;
})();

/** Bobot hasil untuk RTP tertentu: makin tinggi RTP, makin sering hasil besar. */
function bobotRtp(rtp) {
  const r = Math.max(40, Math.min(200, Number(rtp) || 75));
  const a = (r - 75) / 75; // 75 -> 0 (bawaan), 100 -> 0.33, 150 -> 1
  if (Math.abs(a) < 1e-6) return WEIGHTS;
  return WEIGHTS.map(([id, w]) => [id, w * Math.pow((ODDS_HASIL[id] || 5) / 5, a)]);
}

async function resultFor(round, rtp) {
  const data = new TextEncoder().encode(`${SALT}:${round}`);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return pickResult(new DataView(buf).getUint32(0) / 2 ** 32, bobotRtp(rtp));
}

function payout(bets, result) {
  const b = (p) => Number(bets[p] ?? 0);
  let win = 0;
  const pay = (group, all) => {
    for (const d of DISHES) if (d.group === group && (all || d.id === result)) win += b(d.id) * d.odds;
    win += b(group) * GROUP_ODDS[group];
  };
  if (result === "salad") pay("veg", true);
  else if (result === "pizza") pay("meat", true);
  else {
    const dish = DISHES.find((d) => d.id === result);
    if (dish) pay(dish.group, false);
  }
  return Math.floor(win);
}

/** Jalur: /greedy/api/... */
async function greedyPlay(req, env, h) {
  const { pipe, pipeTrx, json, gagal, T, I, uidDariToken } = h;
  const url = new URL(req.url);

  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  // Token aplikasi (Firebase) atau token pendek Wave, supaya permainan dan
  // pengujian bisa memakai keduanya.
  let uid = token ? await uidDariToken(token) : "";
  if (!uid && token) {
    try { uid = await waveUidDariToken(env, token); } catch (e) { uid = ""; }
  }
  if (!uid) return json({ ok: 0, error: "Sesi tidak sah" }, 401);

  const siap = async () => {
    await pipe(env, [
      { sql: `create table if not exists greedy_bet (
          uid text not null, nama text not null default '', round integer not null,
          pot text not null, amount integer not null default 0, at integer not null default 0,
          primary key (uid, round, pot))` },
      { sql: `create table if not exists greedy_settle (
          round integer primary key, result text not null, at integer not null default 0)` },
      { sql: `create table if not exists greedy_menang (
          uid text not null, nama text not null default '', round integer not null,
          win integer not null default 0, at integer not null default 0)` },
    ]);
  };

  const saldo = async () => {
    const r = await pipe(env, [{ sql: "select coins from wallets where uid = ?", args: [T(uid)] }]);
    return Math.max(0, Math.trunc(Number(r[0].rows[0]?.coins ?? 0)));
  };

  // ---- daftar pemenang ----
  // Nama dan foto selalu dibaca dari profil TERBARU (pub/{uid} di RTDB), bukan dari
  // nama yang tersimpan saat taruhan. Jadi kalau pemain mengganti nama atau foto,
  // ranking ikut berubah. Nama lama tabel hanya jadi cadangan.
  const profilTerbaru = async (baris) => {
    // Aturan RTDB: pub/{uid} hanya terbaca kalau login. Server memakai token
    // service account (FIREBASE_SA_JSON atau /opt/viza-api/firebase-sa.json).
    let tokenSa = "";
    try { tokenSa = await tokenLayanan(env); } catch { tokenSa = ""; }
    const hasil = await Promise.all(
      baris.map(async (x) => {
        let nama = String(x.display_name || "");
        let foto = "";
        try {
          const r = await fetch(
            `${RTDB}/pub/${encodeURIComponent(String(x.id))}.json` +
              (tokenSa ? `?access_token=${encodeURIComponent(tokenSa)}` : ""),
          );
          if (r.ok) {
            const d = await r.json();
            if (d && typeof d === "object") {
              const n = String(d.name ?? d.nama ?? "").trim();
              if (n) nama = n;
              const av = String(d.av ?? "").trim();
              const url0 = String(d.photo ?? "").trim();
              if (av.startsWith("data:image/") || av.startsWith("http")) foto = av;
              else if (av.length > 100) foto = "data:image/jpeg;base64," + av.replace(/\s+/g, "");
              else foto = url0;
            }
          }
        } catch { /* pakai nama cadangan */ }
        return { id: x.id, display_name: nama || "Player", avatar_url: foto, win: Number(x.win) };
      }),
    );
    return hasil;
  };
  // Konfigurasi game untuk aplikasi: daftar chip bet dan RTP yang berlaku.
  if (url.pathname.endsWith("/cfg")) {
    const c = await gkCfg(env);
    return json({ ok: 1, bet: c.bet, chips: c.bet, rtp: c.rtp });
  }
  if (url.pathname.endsWith("/top-winners") || url.pathname.endsWith("/round-winners")) {
    await siap();
    const batas = Math.min(20, Math.max(1, Number(url.searchParams.get("limit") || 8)));
    if (url.pathname.endsWith("/round-winners")) {
      const round = Math.trunc(Number(url.searchParams.get("round") || 0));
      const r = await pipe(env, [
        { sql: `select uid id, nama display_name, win from greedy_menang
                where round = ? order by win desc limit ?`, args: [I(round), I(batas)] },
      ]);
      return json(await profilTerbaru(r[0].rows));
    }
    const sejak = Number(new Date(url.searchParams.get("since") || 0)) || 0;
    const r = await pipe(env, [
      { sql: `select uid id, nama display_name, sum(win) win from greedy_menang
              where at >= ? group by uid order by win desc limit ?`, args: [I(sejak), I(batas)] },
    ]);
    return json(await profilTerbaru(r[0].rows));
  }

  if (req.method !== "POST") return gagal("Gunakan POST");
  const b = await req.json().catch(() => ({}));
  const aksi = String(b.action || "");
  const sekarang = Date.now();
  const roundKini = roundOf(sekarang);

  if (aksi === "init") {
    await siap();
    const nama = String(b.name || b.nama || "Player").slice(0, 24);
    const riwayat = await pipe(env, [
      { sql: `select s.round, s.result from greedy_settle s
              where exists (select 1 from greedy_bet g where g.round = s.round and g.uid = ?)
              order by s.round desc limit 10`, args: [T(uid)] },
    ]);
    return json({
      serverNow: sekarang,
      name: nama,
      coins: await saldo(),
      history: riwayat[0].rows.map((x) => ({ round: Number(x.round), result: x.result })),
    });
  }

  if (aksi === "bet") {
    await siap();
    const pot = String(b.pot || "");
    const amount = Math.trunc(Number(b.amount || 0));
    if (!POTS.has(pot)) return gagal("Pilihan taruhan tidak dikenal");
    if (!(amount > 0)) return gagal("Jumlah taruhan tidak valid");
    if (amount > MAKS_BET) return gagal("Taruhan melebihi batas");
    if (!sedangPasang(sekarang)) return gagal("Waktu taruhan sudah tutup");
    const round = roundOf(sekarang);
    const nama = String(b.name || b.nama || "Player").slice(0, 24);

    const r = await pipeTrx(env, [
      { sql: "begin immediate" },
      { sql: "insert or ignore into wallets (uid) values (?)", args: [T(uid)] },
      {
        sql: `update wallets set coins = coins - ?, updated_at = ? where uid = ? and coins >= ?`,
        args: [I(amount), I(sekarang), T(uid), I(amount)],
      },
      {
        sql: `insert into greedy_bet (uid, nama, round, pot, amount, at)
              select ?, ?, ?, ?, ?, ? where changes() > 0
              on conflict (uid, round, pot) do update set amount = amount + excluded.amount, nama = excluded.nama`,
        args: [T(uid), T(nama), I(round), T(pot), I(amount), I(sekarang)],
      },
      { sql: "select coins from wallets where uid = ?", args: [T(uid)] },
      { sql: "commit" },
    ]);
    const sisa = Number(r[4].rows[0]?.coins ?? 0);
    if (Number(r[2].affected ?? 0) <= 0) return gagal("Coin tidak cukup");
    return json({ ok: 1, coins: sisa, round });
  }

  if (aksi === "settle") {
    await siap();
    const round = Math.trunc(Number(b.round || 0));
    if (!(round > 0)) return gagal("Nomor putaran tidak valid");
    // Aplikasi meminta hasil saat fase hasil (detik 35-40 pada ronde yang sama),
    // jadi ronde berjalan harus boleh diselesaikan begitu taruhan ditutup.
    // Dulu syaratnya round >= roundKini selalu ditolak, akibatnya dialog
    // kemenangan dan pola hasil tidak pernah muncul.
    const dalamHasil = (sekarang % ROUND_MS) >= 33000;
    if (round > roundKini || (round === roundKini && !dalamHasil)) {
      return gagal("Putaran belum selesai");
    }

    const ada = await pipe(env, [
      { sql: "select result from greedy_settle where round = ?", args: [I(round)] },
    ]);
    let hasil = ada[0].rows[0]?.result;

    if (!hasil) {
      hasil = await resultFor(round, (await gkCfg(env)).rtp);
      const bets = await pipe(env, [
        { sql: "select uid, nama, pot, sum(amount) amount from greedy_bet where round = ? group by uid, pot",
          args: [I(round)] },
      ]);
      const per = new Map();
      for (const row of bets[0].rows) {
        const u = String(row.uid);
        if (!per.has(u)) per.set(u, { nama: String(row.nama || "Player"), bets: {} });
        per.get(u).bets[String(row.pot)] = Number(row.amount);
      }
      const stmt = [
        { sql: "begin immediate" },
        { sql: "insert or ignore into greedy_settle (round, result, at) values (?, ?, ?)",
          args: [I(round), T(hasil), I(sekarang)] },
      ];
      let pertama = true;
      const pemenangGk = [];
      for (const [u, v] of per) {
        const win = payout(v.bets, hasil);
        if (!(win > 0)) continue;
        pemenangGk.push({ uid: String(u), nama: v.nama, win: Math.trunc(win) });
        stmt.push({
          sql: `update wallets set coins = coins + ?, updated_at = ? where uid = ?
                ${pertama ? "and changes() > 0" : "and changes() > 0"}`,
          args: [I(win), I(sekarang), T(u)],
        });
        stmt.push({
          sql: `insert into greedy_menang (uid, nama, round, win, at)
                select ?, ?, ?, ?, ? where changes() > 0`,
          args: [T(u), T(v.nama), I(round), I(win), I(sekarang)],
        });
        pertama = false;
      }
      stmt.push({ sql: "commit" });
      let baruSelesai = false;
      try {
        await pipeTrx(env, stmt);
        baruSelesai = true;
      } catch (e) {
        // Putaran bisa saja sudah diselesaikan permintaan lain; pakai hasil tersimpan.
        const ulang = await pipe(env, [
          { sql: "select result from greedy_settle where round = ?", args: [I(round)] },
        ]);
        hasil = ulang[0].rows[0]?.result || hasil;
      }
      // Banner pemenang Greedy King: Top 1/2/3 ronde ini.
      if (baruSelesai && pemenangGk.length) {
        try {
          pemenangGk.sort((a, b) => b.win - a.win);
          const tiga = pemenangGk.slice(0, 3);
          for (const w of tiga) {
            try {
              const pw = await hivePemain(env, w.uid);
              w.nama = pw.name || w.nama;
              w.foto = String(pw.profilePicture || waveFoto(w.uid, pw.avatar) || "");
            } catch { /* foto opsional */ }
          }
          await kirimBannerRonde(env, "greedy", String(round), tiga);
        } catch { /* banner opsional */ }
      }
    }

    const milik = await pipe(env, [
      { sql: "select sum(amount) bet from greedy_bet where uid = ? and round = ?", args: [T(uid), I(round)] },
      { sql: "select sum(win) win from greedy_menang where uid = ? and round = ?", args: [T(uid), I(round)] },
    ]);
    return json({
      ok: 1,
      round,
      result: hasil,
      bet: Number(milik[0].rows[0]?.bet ?? 0),
      win: Number(milik[1].rows[0]?.win ?? 0),
      coins: await saldo(),
    });
  }

  return gagal("Aksi tidak dikenal");
}
 // project Firebase (aud token)

// ---------- Akses database (SQLite lokal) ----------
const T = (v) => ({ type: "text", value: String(v) });
const I = (v) => ({ type: "integer", value: String(Math.trunc(Number(v) || 0)) });

let siapLog = false;
async function logGalat(env, uid, aksi, pesan) {
  try {
    if (!siapLog) {
      await pipe(env, [{ sql: "create table if not exists wallet_galat (uid text, aksi text, pesan text, at integer)" }]);
      siapLog = true;
    }
    await pipe(env, [{ sql: "insert into wallet_galat (uid, aksi, pesan, at) values (?,?,?,?)",
      args: [T(String(uid || "")), T(String(aksi || "")), T(String(pesan || "").slice(0, 200)), T(Date.now())] }]);
  } catch { /* logging tidak boleh mengganggu transaksi */ }
}

// ---------- Database ----------
// Database tinggal di VPS sendiri sebagai SQLite: tanpa kuota, tanpa layanan
// luar, dan tetap jalan walau internet VPS putus. Satu-satunya syarat adalah
// Node di server mendukung modul bawaan node:sqlite (Node 22.13 ke atas).
const DB_DIR = "/opt/viza-api/data";
const DB_FILE = DB_DIR + "/viza.db";
let dbSiap = null;
let dbGalat = "";

async function bukaDbLokal() {
  const fs = await import("node:fs");
  fs.mkdirSync(DB_DIR, { recursive: true });
  const { DatabaseSync } = await import("node:sqlite");
  const db = new DatabaseSync(DB_FILE);
  db.exec("PRAGMA journal_mode=WAL");
  db.exec("PRAGMA busy_timeout=8000");
  db.exec("PRAGMA synchronous=NORMAL");
  return db;
}

/** Turunkan stok yang sudah terlanjur melewati batas, sekali saat database dibuka. */
function rapikanStokBesar(db) {
  try {
    const a = db.prepare("update coin_seller set stock = ? where stock > ?").run(MAKS_STOK, MAKS_STOK);
    const b = db.prepare("update panel_staf set coins = ? where coins > ?").run(MAKS_STOK, MAKS_STOK);
    const n = Number(a.changes ?? 0) + Number(b.changes ?? 0);
    if (n > 0) console.log("rapikan stok: " + n + " baris diturunkan ke batas " + MAKS_STOK);
  } catch (e) { /* tabel belum ada di instalasi baru: aman diabaikan */ }
}

/**
 * Tabel inti dompet. Dompet Rezo sudah punya tabel ini sejak dulu, tapi dompet
 * Viza dipasang di SQLite kosong, sehingga beli di Store, topup, dan game gagal
 * dengan "no such table: wallets". Dibuat di sini supaya SEMUA rute aman, bukan
 * hanya rute panel. Aman dijalankan berulang di database lama.
 */
function siapkanTabelInti(db) {
  db.exec(`create table if not exists wallets (
    uid text primary key,
    coins integer not null default 0,
    diamonds integer not null default 0,
    exp integer not null default 0,
    vip integer not null default 0,
    vip_until integer not null default 0,
    lv_claimed integer not null default 0,
    inv text not null default '{}',
    equip text not null default '{}',
    updated_at integer not null default 0
  )`);
  db.exec(`create table if not exists money_tx (uid text, kind text, item_id text, amount integer, room_id text, created_at integer)`);
  db.exec(`create table if not exists props (id text primary key, uid text, vip integer, days integer, src text, ts integer, used integer)`);
  db.exec(`create table if not exists gift_req (req_id text primary key, uid text, at integer)`);
  db.exec(`create table if not exists vip_req (req_id text primary key, uid text, at integer)`);
  db.exec(`create table if not exists topup_req (req_id text primary key, uid text, at integer)`);
  db.exec(`create table if not exists exchange_req (req_id text primary key, uid text, at integer)`);
  // Kalau tabel sudah ada tapi kekurangan kolom, tambahkan satu per satu.
  const ada = new Set(db.prepare("pragma table_info(wallets)").all().map((k) => k.name));
  const wajib = {
    coins: "integer not null default 0",
    diamonds: "integer not null default 0",
    exp: "integer not null default 0",
    vip: "integer not null default 0",
    vip_until: "integer not null default 0",
    lv_claimed: "integer not null default 0",
    inv: "text not null default '{}'",
    equip: "text not null default '{}'",
    updated_at: "integer not null default 0",
  };
  for (const [nama, def] of Object.entries(wajib)) {
    if (!ada.has(nama)) db.exec(`alter table wallets add column ${nama} ${def}`);
  }
}

async function dbLokal(env) {
  if (!dbSiap) {
    dbSiap = (async () => {
      const db = await bukaDbLokal();
      siapkanTabelInti(db);
      rapikanStokBesar(db);
      return db;
    })().catch((e) => { dbSiap = null; dbGalat = String(e?.message ?? e); throw e; });
  }
  return dbSiap;
}

/** Batas stok seller dan stok coin staf: 1 kuadriliun, jauh di bawah batas aman JS. */
const MAKS_STOK = 1000000000000000;
/** Batas angka bulat yang masih persis di JavaScript (2^53 - 1). */
const ANGKA_AMAN = Number.MAX_SAFE_INTEGER;
function amankanBaris(r) {
  const o = {};
  for (const k of Object.keys(r)) {
    const v = r[k];
    if (typeof v === "bigint") {
      if (v > BigInt(ANGKA_AMAN)) o[k] = ANGKA_AMAN;
      else if (v < -BigInt(ANGKA_AMAN)) o[k] = -ANGKA_AMAN;
      else o[k] = Number(v);
    } else {
      o[k] = v;
    }
  }
  return o;
}

/** Jalankan sekumpulan statement di SQLite lokal, urut seperti pipeline. */
function pipeDi(db, stmts) {
  const out = [];
  let err = "";
  for (const s of stmts) {
    if (err) { out.push({ rows: [], affected: 0 }); continue; }
    const sql = String(s.sql ?? "");
    const args = (s.args ?? []).map((a) =>
      a && typeof a === "object" && "type" in a
        ? (a.type === "integer" ? Number(a.value) : a.type === "float" ? Number(a.value) : a.value)
        : a,
    );
    try {
      const st = db.prepare(sql);
      if (/^\s*(select|with|pragma|explain)/i.test(sql)) {
        // Bilangan bulat di atas 2^53 tidak bisa dibaca sebagai angka JavaScript
        // biasa: node:sqlite melempar galat "Value is too large to be represented
        // as a JavaScript number", dan satu baris besar saja membuat SELURUH daftar
        // (seller, staf) gagal tampil. Jadi dibaca sebagai BigInt lalu diubah:
        // angka aman tetap number, angka raksasa dibatasi ke batas aman.
        st.setReadBigInts(true);
        out.push({ rows: st.all(...args).map(amankanBaris), affected: 0 });
      } else {
        const r = st.run(...args);
        out.push({ rows: [], affected: Number(r.changes ?? 0) });
      }
    } catch (e) {
      if (!err) err = String(e?.message ?? e);
      out.push({ rows: [], affected: 0 });
    }
  }
  if (err) throw new Error(err);
  return out;
}


// ---------- Pembuatan tabel yang belum ada ----------
// Dompet Rezo sudah punya tabel-tabel ini dari dulu, sedangkan dompet Viza
// dipasang baru di SQLite kosong. Tanpa blok ini setiap aksi panel berakhir
// "server error" karena tabelnya tidak ada. Dibuat sekali per proses.
let tabelSiap = false;
async function siapTabel(env) {
  if (tabelSiap) return;
  await pipe(env, [
    { sql: "create table if not exists panel_staf (uid text not null, role text not null, manager text, active integer not null default 1, created_at integer not null default 0, coins integer not null default 0, primary key (uid, role))" },
    { sql: "create table if not exists panel_stock (owner_uid text not null, item_id text not null, kind text, name text, days integer not null default 0, created_at integer not null default 0, primary key (owner_uid, item_id))" },
    { sql: "create table if not exists panel_ban (uid text primary key, oleh text, manager text, reason text, at integer)" },
    { sql: "create table if not exists panel_log (id text primary key, oleh text, aksi text, target text, jumlah integer, at integer)" },
    { sql: "create table if not exists pay_info (id integer primary key, dana text, nama text, gopay text, qris text, updated_at integer)" },
    // Pengaturan dari panel developer (Agora, Firebase push, Stripe/Paystack, versi aplikasi).
    { sql: "create table if not exists app_cfg (kunci text primary key, nilai text, updated_at integer)" },
    { sql: "create table if not exists topup_manual (id text primary key, uid text, coins integer, amount integer, payer text, method text, status text, created_at integer, decided_at integer)" },
    // Harga paket coin diatur dari panel developer, bukan ditulis mati di kode.
    { sql: "create table if not exists coin_paket (coins integer primary key, harga integer, aktif integer, updated_at integer)" },
    { sql: "create table if not exists money_tx (uid text, kind text, item_id text, amount integer, room_id text, created_at integer)" },
    { sql: "create table if not exists exchange_req (req_id text primary key, uid text, at integer)" },
    { sql: "create table if not exists gift_req (req_id text primary key, uid text, at integer)" },
    // Setiap gift yang sudah dibayar hanya boleh diundi jackpotnya sekali.
    { sql: "create table if not exists jp_claim (req_id text primary key, uid text, at integer)" },
    // Hadiah undangan hanya sekali per akun.
    { sql: "create table if not exists invite_reward (uid text primary key, at integer)" },
    { sql: "create table if not exists vip_req (req_id text primary key, uid text, at integer)" },
    { sql: "create table if not exists topup_req (req_id text primary key, uid text, at integer)" },
    { sql: "create table if not exists hive_order (order_id text primary key, uid text, kind text, amount integer, round_id text, game text, at integer)" },
    { sql: "create table if not exists wave_players (uid text primary key, name text, avatar text, updated_at integer)" },
  ]);
  // Migrasi kolom yang ditambahkan belakangan. ALTER dijalankan terpisah dan
  // galatnya ditelan, karena database lama belum punya kolom ini dan
  // "duplicate column" bukan masalah. Tanpa kolom ini, tombol Setujui pada
  // top-up manual selalu gagal ("no such column: decided_at").
  for (const [tabel, kolom, tipe] of [
    ["topup_manual", "decided_at", "integer"],
    ["coin_paket", "aktif", "integer"],
  ]) {
    try {
      await pipe(env, [{ sql: `alter table ${tabel} add column ${kolom} ${tipe}` }]);
    } catch (e) { /* kolom sudah ada atau tabel belum dibuat */ }
  }
  tabelSiap = true;
}

async function pipe(env, stmts) {
  let db;
  try {
    db = await dbLokal(env);
  } catch (e) {
    throw new Error("Database lokal tidak bisa dibuka: " + String(e?.message ?? e));
  }
  return pipeDi(db, stmts);
}


/**
 * Jalankan transaksi (begin ... commit) dengan percobaan ulang.
 * Kalau "begin immediate" bentrok karena database sedang sibuk, statement
 * berikutnya berjalan tanpa transaksi dan "commit" gagal dengan pesan
 * "cannot commit - no transaction is active". Pesan itu menyesatkan, jadi
 * di sini: bersihkan sisa transaksi, tunggu sebentar, lalu ulangi.
 */
async function pipeTrx(env, stmts, percobaan = 4) {
  let galatTerakhir = null;
  for (let i = 0; i < percobaan; i++) {
    try {
      return await pipe(env, stmts);
    } catch (e) {
      galatTerakhir = e;
      const pesan = String(e?.message ?? e);
      try { await pipe(env, [{ sql: "rollback" }]); } catch (e2) { /* tidak ada transaksi aktif */ }
      const bisaUlang = /no transaction is active|database is locked|busy|SQLITE_BUSY|cannot start a transaction/i.test(pesan);
      if (!bisaUlang) throw e;
      await new Promise((r) => setTimeout(r, 150 * (i + 1) + Math.floor(Math.random() * 120)));
    }
  }
  const asli = String(galatTerakhir?.message ?? galatTerakhir);
  if (/no transaction is active/i.test(asli)) {
    throw new Error("Server sedang sibuk, coba lagi sebentar");
  }
  throw galatTerakhir;
}

// ---------- Verifikasi token login Firebase ----------
let jwks = { keys: [], at: 0 };

// Kunci publik Firebase. Kalau Google lambat atau menolak, kunci lama tetap
// dipakai - lebih baik verifikasi dengan kunci lama daripada semua user
// mendadak dianggap "Sesi tidak sah" dan dompetnya tampil 0.
async function ambilJwks() {
  const now = Date.now();
  if (jwks.keys.length && now - jwks.at < 6 * 3600_000) return jwks;
  try {
    const r = await fetch(
      "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com",
      { signal: AbortSignal.timeout(8000) },
    );
    if (!r.ok) throw new Error("jwks http " + r.status);
    const j = await r.json();
    const keys = j.keys ?? [];
    if (!keys.length) throw new Error("jwks kosong");
    jwks = { keys, at: now };
  } catch (e) {
    jwks = { keys: jwks.keys, at: now - 6 * 3600_000 + 60_000 };
  }
  return jwks;
}

async function kunci(kid) {
  let k = await ambilJwks();
  let found = k.keys.find((x) => x.kid === kid) ?? null;
  if (!found) {
    // Kunci bisa berganti: paksa ambil sekali lagi sebelum menolak token.
    jwks = { keys: [], at: 0 };
    k = await ambilJwks();
    found = k.keys.find((x) => x.kid === kid) ?? null;
  }
  return found;
}

function b64d(s) {
  const n = s.replace(/-/g, "+").replace(/_/g, "/");
  const p = n + "=".repeat((4 - (n.length % 4)) % 4);
  return Uint8Array.from(atob(p), (c) => c.charCodeAt(0));
}

/** Kembalikan {uid, email} kalau token sah, null kalau tidak. */
function klaimUid(token) {
  try {
    const c = String(token || "").split(".")[1];
    if (!c) return "";
    const body = JSON.parse(new TextDecoder().decode(b64d(c)));
    return String(body.sub ?? body.user_id ?? "");
  } catch { return ""; }
}

let sesiAlasan = "";
// Token LiveKit buatan sendiri (HS256), tanpa paket tambahan.
async function jwtLiveKit(klaim, rahasia) {
  const b64u = (x) => Buffer.from(typeof x === "string" ? x : JSON.stringify(x)).toString("base64url");
  const kepala = b64u({ alg: "HS256", typ: "JWT" });
  const isi = b64u(klaim);
  const data = kepala + "." + isi;
  const enc = new TextEncoder();
  const kunci = await globalThis.crypto.subtle.importKey("raw", enc.encode(rahasia), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await globalThis.crypto.subtle.sign("HMAC", kunci, enc.encode(data));
  return data + "." + Buffer.from(sig).toString("base64url");
}

async function sesiDariToken(token) {
  try {
    const [h, c, s] = token.split(".");
    if (!h || !c || !s) { sesiAlasan = "token tidak lengkap"; return null; }
    const head = JSON.parse(new TextDecoder().decode(b64d(h)));
    const jwk = await kunci(head.kid);
    if (!jwk) { sesiAlasan = "kunci kid tidak ada: " + String(head.kid); return null; }
    const key = await crypto.subtle.importKey(
      "jwk",
      { kty: jwk.kty, n: jwk.n, e: jwk.e, alg: "RS256", ext: true },
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["verify"],
    );
    const ok = await crypto.subtle.verify(
      "RSASSA-PKCS1-v1_5",
      key,
      b64d(s),
      new TextEncoder().encode(`${h}.${c}`),
    );
    if (!ok) { sesiAlasan = "tanda tangan tidak cocok"; return null; }
    const body = JSON.parse(new TextDecoder().decode(b64d(c)));
    const now = Math.floor(Date.now() / 1000);
    if (!PROJ_SAH.includes(String(body.aud))) { sesiAlasan = "aud beda: " + String(body.aud); return null; }
    if (String(body.iss) !== `https://securetoken.google.com/${String(body.aud)}`) { sesiAlasan = "iss beda"; return null; }
    if (Number(body.exp ?? 0) <= now) { sesiAlasan = "token kadaluarsa"; return null; }
    const uid = String(body.sub ?? body.user_id ?? "");
    if (!uid) return null;
    return { uid, email: String(body.email ?? "") };
  } catch (e) {
    sesiAlasan = "galat verifikasi: " + String(e?.message ?? e);
    return null;
  }
}

/** uid saja, dipakai jalur dompet. */
const uidDariToken = async (token) => (await sesiDariToken(token))?.uid ?? null;

// ---------- Bentuk jawaban ----------
const ok = (w) => json({ ok: 1, w: w ?? null });
const gagal = (e) => json({ ok: 0, e });
// Panel developer (exbottod.github.io) memanggil dari browser, jadi wajib ada header CORS.
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, content-type, apikey, x-client-info, accept, x-user-id, x-display-name",
  "Access-Control-Max-Age": "86400",
};
const json = (o, status = 200) =>
  new Response(JSON.stringify(o), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });

const KOLOM =
  "uid, coins, diamonds, exp, vip, vip_until, lv_claimed, inv, equip";

function rapikan(r) {
  if (!r) return null;
  let inv = {}, eq = {};
  try { inv = JSON.parse(r.inv || "{}"); } catch { /* biarkan kosong */ }
  try { eq = JSON.parse(r.equip || "{}"); } catch { /* biarkan kosong */ }
  return {
    uid: r.uid,
    coins: r.coins ?? 0,
    diamonds: r.diamonds ?? 0,
    exp: r.exp ?? 0,
    vip: r.vip ?? 0,
    vipUntil: r.vip_until ?? 0,
    lvClaimed: r.lv_claimed ?? 0,
    inv,
    equip: eq,
  };
}

const saldo = (env, uid) =>
  pipe(env, [{ sql: `select ${KOLOM} from wallets where uid = ?`, args: [T(uid)] }]);

async function pastikan(env, uid) {
  const r = await saldo(env, uid);
  if (r[0].rows.length) return rapikan(r[0].rows[0]);
  await pipe(env, [
    { sql: "insert or ignore into wallets (uid) values (?)", args: [T(uid)] },
  ]);
  const r2 = await saldo(env, uid);
  return rapikan(r2[0].rows[0]);
}



// ---------- Coin FAMILY ----------
// Coin family dipisah dari dompet pribadi. Setiap 100 exp family (dari gift)
// menambah 1 coin family. Pemilik/admin bisa mengirim coin family ke member.
// Semua operasi atomik (BEGIN IMMEDIATE) dan memakai penanda req supaya
// permintaan yang terkirim dua kali tidak dihitung dua kali.
const FAM_FILE = "/opt/viza-api/family-cfg.json";
let FAM_CFG = { harga: 200000, exp_per_coin: 100 };
async function famCfgKini() {
  try {
    const fsp = await import("node:fs/promises");
    const a = JSON.parse(await fsp.readFile(FAM_FILE, "utf8"));
    if (a && typeof a === "object") FAM_CFG = { ...FAM_CFG, ...a };
  } catch (e) { /* berkas belum ada: pakai bawaan */ }
  return FAM_CFG;
}
async function famCfgSimpan(a) {
  const baru = {
    harga: Math.max(0, Math.round(Number(a.harga) || 0)),
    exp_per_coin: Math.max(1, Math.round(Number(a.exp_per_coin) || 100)),
  };
  FAM_CFG = baru;
  const fsp = await import("node:fs/promises");
  await fsp.writeFile(FAM_FILE, JSON.stringify(baru), "utf8");
  return baru;
}
// ---- Pengaturan game Bikini (bet & RTP) dari panel developer ----
// Disimpan sebagai berkas JSON supaya game bisa membacanya tanpa login.
const BIKINI_FILE = "/opt/viza-api/data/bikini.json";
let BIKINI_CFG = { bets: [25, 50, 100, 200, 500, 1000, 2000, 5000], rtp: 85 };
async function bikiniCfgKini() {
  try {
    const fsp = await import("node:fs/promises");
    const a = JSON.parse(await fsp.readFile(BIKINI_FILE, "utf8"));
    if (a && typeof a === "object") {
      const bets = Array.isArray(a.bets) ? a.bets.map(Number).filter((x) => x > 0) : [];
      BIKINI_CFG = {
        bets: bets.length > 1 ? bets : BIKINI_CFG.bets,
        rtp: Number.isFinite(Number(a.rtp)) && Number(a.rtp) > 0 ? Number(a.rtp) : BIKINI_CFG.rtp,
      };
    }
  } catch (e) { /* berkas belum ada: pakai bawaan */ }
  return BIKINI_CFG;
}
async function bikiniCfgSimpan(a) {
  const bets = (Array.isArray(a.bets) ? a.bets.map(Number) : []).filter((x) => Number.isFinite(x) && x > 0);
  const rtp = Number(a.rtp);
  if (bets.length < 2) throw new Error("Isi minimal dua nilai bet");
  if (!Number.isFinite(rtp) || rtp <= 0 || rtp > 200) throw new Error("RTP tidak sah");
  const baru = { bets: bets.map((x) => Math.round(x)), rtp: Math.round(rtp), diperbarui: Date.now() };
  BIKINI_CFG = baru;
  const fsp = await import("node:fs/promises");
  await fsp.mkdir("/opt/viza-api/data", { recursive: true });
  await fsp.writeFile(BIKINI_FILE, JSON.stringify(baru), "utf8");
  return baru;
}

let siapFam = false;
async function siapFamily(env) {
  if (siapFam) return;
  await pipe(env, [
    { sql: "create table if not exists fam_coin (fid text primary key, coins integer not null default 0, exp_sisa integer not null default 0, updated_at integer not null default 0)" },
    { sql: "create table if not exists fam_req (req text primary key, uid text, at integer)" },
    { sql: "create table if not exists fam_tx (fid text, uid text, kind text, amount integer, note text, created_at integer)" },
  ]);
  siapFam = true;
}

/** Buat family: potong coin pemilik sebesar harga dari panel. Aman dari dobel. */
async function famBayarBuat(env, uid, p) {
  await siapFamily(env);
  const cfg = await famCfgKini();
  const harga = Math.max(0, Math.trunc(Number(cfg.harga) || 0));
  const req = String(p.req ?? `fc-${uid}-${Date.now()}`);
  const now = Date.now();
  const w0 = await pastikan(env, uid);
  if (harga > 0 && w0.coins < harga) return gagal("Coin tidak cukup untuk membuat family");
  const r = await pipeTrx(env, [
    { sql: "begin immediate" },
    {
      sql: `update wallets set coins = coins - ?, updated_at = ?
            where uid = ? and coins >= ? and not exists (select 1 from fam_req where req = ?)`,
      args: [I(harga), I(now), T(uid), I(harga), T(req)],
    },
    { sql: "insert into fam_req (req, uid, at) select ?, ?, ? where changes() > 0", args: [T(req), T(uid), I(now)] },
    {
      sql: `insert into money_tx (uid, kind, item_id, amount, created_at)
            select ?, 'family_create', 'family', ?, ? where changes() > 0`,
      args: [T(uid), I(harga), I(now)],
    },
    { sql: `select ${KOLOM} from wallets where uid = ?`, args: [T(uid)] },
    { sql: "commit" },
  ]);
  return json({ ok: 1, w: rapikan(r[4].rows[0]), harga });
}

/** Harga buat family + rasio exp -> coin (dibaca aplikasi untuk tampilan). */
async function famInfo(env) {
  const cfg = await famCfgKini();
  return json({ ok: 1, harga: Math.trunc(Number(cfg.harga) || 0), exp_per_coin: Math.trunc(Number(cfg.exp_per_coin) || 100) });
}

/** Tambah exp family dari gift: 100 exp = 1 coin family, sisa pecahan disimpan. */
async function famTambahExp(env, uid, p) {
  await siapFamily(env);
  const fid = String(p.fid ?? "").trim();
  const exp = Math.trunc(Number(p.exp ?? 0));
  if (!/^[A-Za-z0-9_-]{6,64}$/.test(fid)) return gagal("Family tidak valid");
  if (!(exp > 0) || exp > 1e13) return gagal("Exp tidak valid");
  const cfg = await famCfgKini();
  const rasio = Math.max(1, Math.trunc(Number(cfg.exp_per_coin) || 100));
  const req = String(p.req ?? `fe-${fid}-${uid}-${Date.now()}`);
  const now = Date.now();
  const r = await pipeTrx(env, [
    { sql: "begin immediate" },
    { sql: "insert or ignore into fam_coin (fid) values (?)", args: [T(fid)] },
    {
      sql: `update fam_coin set
              coins = coins + ((exp_sisa + ?) / ?),
              exp_sisa = (exp_sisa + ?) % ?,
              updated_at = ?
            where fid = ? and not exists (select 1 from fam_req where req = ?)`,
      args: [I(exp), I(rasio), I(exp), I(rasio), I(now), T(fid), T(req)],
    },
    { sql: "insert into fam_req (req, uid, at) select ?, ?, ? where changes() > 0", args: [T(req), T(uid), I(now)] },
    { sql: "select coins from fam_coin where fid = ?", args: [T(fid)] },
    { sql: "commit" },
  ]);
  return json({ ok: 1, coins: Number(r[4].rows[0]?.coins ?? 0) });
}

async function famSaldo(env, fid) {
  await siapFamily(env);
  const r = await pipe(env, [{ sql: "select coins from fam_coin where fid = ?", args: [T(fid)] }]);
  return Number(r[0].rows[0]?.coins ?? 0);
}

/** Kirim coin family ke member. Hanya pemilik/admin family (dicek di RTDB). */
async function famKirim(env, uid, p) {
  await siapFamily(env);
  const fid = String(p.fid ?? "").trim();
  const to = String(p.to ?? "").trim();
  const coins = Math.trunc(Number(p.coins ?? 0));
  if (!/^[A-Za-z0-9_-]{6,64}$/.test(fid)) return gagal("Family tidak valid");
  if (!/^[A-Za-z0-9_-]{6,64}$/.test(to)) return gagal("Penerima tidak valid");
  if (!(coins > 0) || coins > 1e12) return gagal("Jumlah coin tidak valid");
  const peran = await famPeran(fid, uid);
  if (peran !== "owner" && peran !== "admin") return gagal("Hanya pemilik atau admin family");
  const sasaran = await famPeran(fid, to);
  if (!sasaran) return gagal("Penerima bukan anggota family ini");
  const req = String(p.req ?? `fk-${fid}-${to}-${Date.now()}`);
  const now = Date.now();
  await pastikan(env, to);
  const r = await pipeTrx(env, [
    { sql: "begin immediate" },
    {
      sql: `update fam_coin set coins = coins - ?, updated_at = ?
            where fid = ? and coins >= ? and not exists (select 1 from fam_req where req = ?)`,
      args: [I(coins), I(now), T(fid), I(coins), T(req)],
    },
    { sql: "insert into fam_req (req, uid, at) select ?, ?, ? where changes() > 0", args: [T(req), T(uid), I(now)] },
    { sql: "update wallets set coins = coins + ?, updated_at = ? where uid = ? and changes() > 0", args: [I(coins), I(now), T(to)] },
    {
      sql: `insert into fam_tx (fid, uid, kind, amount, note, created_at)
            select ?, ?, 'kirim', ?, ?, ? where changes() > 0`,
      args: [T(fid), T(to), I(coins), T(`dari ${uid}`), I(now)],
    },
    {
      sql: `insert into money_tx (uid, kind, item_id, amount, created_at)
            select ?, 'family_in', ?, ?, ? where changes() > 0`,
      args: [T(to), T(fid), I(coins), I(now)],
    },
    { sql: "select coins from fam_coin where fid = ?", args: [T(fid)] },
    { sql: "commit" },
  ]);
  if (Number(r[2].affected ?? 0) > 0) return json({ ok: 1, sisa: Number(r[6].rows[0]?.coins ?? 0), terkirim: coins });
  const cek = await pipe(env, [{ sql: "select 1 as ada from fam_req where req = ?", args: [T(req)] }]);
  if (cek[0].rows.length) return json({ ok: 1, sisa: Number(r[6].rows[0]?.coins ?? 0), terkirim: 0, ulang: 1 });
  return gagal(`Coin family tidak cukup. Sisa ${(await famSaldo(env, fid)).toLocaleString("id-ID")}.`);
}

/** Peran uid di family (owner|admin|member), dibaca LANGSUNG dari RTDB tanpa cache.
 *  Gagal baca = null (ditolak), jangan pernah menganggap sah saat ragu. */
async function famPeran(fid, uid) {
  try {
    const r = await fetch(`${RTDB}/fm/${encodeURIComponent(fid)}/members/${encodeURIComponent(uid)}/role.json`);
    if (!r.ok) return null;
    const d = await r.json();
    return typeof d === "string" && d ? d : null;
  } catch { return null; }
}

// ---------- Coin seller ----------
// Penjual coin resmi: didaftarkan developer, punya stok sendiri, dan muncul di
// halaman seller pada Dompet. Stok hanya bisa diisi developer.
let siapSel = false;
async function siapSeller(env) {
  if (siapSel) return;
  await pipe(env, [
    { sql: `create table if not exists coin_seller (
        uid text primary key,
        store text not null default '',
        wa text not null default '',
        wa_link text not null default '',
        photo text not null default '',
        stock integer not null default 0,
        active integer not null default 1,
        urut integer not null default 0,
        created_at integer not null default (unixepoch() * 1000),
        updated_at integer not null default (unixepoch() * 1000))` },
    { sql: `create table if not exists seller_tx (
        id integer primary key autoincrement,
        seller text not null,
        buyer text not null,
        coins integer not null default 0,
        note text not null default '',
        req text not null default '',
        created_at integer not null default (unixepoch() * 1000))` },
    { sql: `create unique index if not exists seller_tx_req on seller_tx(req)` },
    { sql: `create table if not exists seller_req (req text primary key, at integer not null default 0)` },
  ]);
  siapSel = true;
}

// ---------- Agensi ----------
// Agensi mengumpulkan host. Setiap gift yang diterima host dicatat sebagian
// kecil (rate agensi) sebagai komisi agensi. Perhitungan dilakukan di server,
// bukan di aplikasi, supaya tidak bisa dipalsukan dari HP.
let siapAg = false;
async function siapAgency(env) {
  if (siapAg) return;
  await pipe(env, [
    { sql: `create table if not exists agency (
        id text primary key,
        nama text not null default '',
        owner_uid text not null default '',
        kode text not null default '',
        rate integer not null default 10,
        aktif integer not null default 1,
        saldo integer not null default 0,
        created_at integer not null default (unixepoch() * 1000))` },
    { sql: `create unique index if not exists agency_kode on agency(kode)` },
    { sql: `create table if not exists agency_host (
        host_uid text primary key,
        agency_id text not null,
        aktif integer not null default 1,
        sejak integer not null default (unixepoch() * 1000))` },
    { sql: `create table if not exists agency_earn (
        agency_id text not null,
        bulan text not null,
        coins integer not null default 0,
        primary key (agency_id, bulan))` },
    { sql: `create table if not exists agency_req (
        id integer primary key autoincrement,
        agency_id text not null,
        coins integer not null default 0,
        status text not null default 'menunggu',
        at integer not null default (unixepoch() * 1000),
        oleh text not null default '')` },
  ]);
  siapAg = true;
}

/** Bulan berjalan sebagai teks "2026-11" untuk mengelompokkan komisi. */
function bulanIni(t = Date.now()) {
  const d = new Date(t);
  return d.getUTCFullYear() + "-" + String(d.getUTCMonth() + 1).padStart(2, "0");
}

/**
 * Coin yang BENAR-BENAR dibayar user bulan ini (topup manual yang disetujui).
 * Dipakai sebagai dasar batas pencairan agensi, karena coin gratis dari game,
 * hadiah level, invite, dan reward room tidak menghasilkan uang masuk.
 */
async function coinTopupBulan(env, bulan = bulanIni()) {
  const awal = Date.parse(bulan + "-01T00:00:00Z");
  const akhir = Date.parse(bulan + "-01T00:00:00Z") + 32 * 24 * 3600 * 1000;
  try {
    const r = await pipe(env, [
      {
        sql: `select coalesce(sum(coins), 0) as coins from topup_manual
              where status = 'ok' and created_at >= ? and created_at < ?`,
        args: [I(awal), I(akhir)],
      },
    ]);
    return Number(r[0].rows[0]?.coins ?? 0);
  } catch (e) { return 0; }
}

/** Persen komisi agensi yang boleh dicairkan dari coin topup sah bulan ini. */
async function persenCairAgensi(env) {
  try {
    const c = await cfgSemua(env, true);
    const n = Number(c.agency_cair_persen ?? 10);
    return Math.max(0, Math.min(100, Number.isFinite(n) ? n : 10));
  } catch (e) { return 10; }
}

/**
 * Batas pencairan bulan ini dan coin yang sudah diajukan/dibayar.
 * Semua angka dalam coin. Kalau belum ada topup sah, batasnya 0 sehingga
 * pencairan rupiah tidak bisa menguras uang yang belum masuk.
 */
async function batasCairAgensi(env, bulan = bulanIni()) {
  const persen = await persenCairAgensi(env);
  const topup = await coinTopupBulan(env, bulan);
  const batas = Math.floor((topup * persen) / 100);
  const awal = Date.parse(bulan + "-01T00:00:00Z");
  const akhir = awal + 32 * 24 * 3600 * 1000;
  let dipakai = 0;
  try {
    const r = await pipe(env, [
      {
        sql: `select coalesce(sum(coins), 0) as coins from agency_req
              where status in ('menunggu', 'dibayar') and at >= ? and at < ?`,
        args: [I(awal), I(akhir)],
      },
    ]);
    dipakai = Number(r[0].rows[0]?.coins ?? 0);
  } catch (e) { dipakai = 0; }
  return { bulan, persen, topup, batas, dipakai, sisa: Math.max(0, batas - dipakai) };
}

/**
 * Iklan berhadiah (rewarded ads) untuk coin gratis. Hadiah, batas harian, dan
 * ID unit iklan diatur dari panel supaya bisa diubah tanpa build APK.
 * Server tidak bisa memastikan iklan benar-benar ditonton, jadi pengamanannya:
 * batas per hari, jeda antar klaim, dan catatan tiap klaim.
 */
async function siapIklan(env) {
  await pipe(env, [
    { sql: `create table if not exists iklan_klaim (
        id integer primary key autoincrement,
        uid text not null,
        coins integer not null default 0,
        at integer not null default (unixepoch() * 1000))` },
    { sql: `create index if not exists iklan_klaim_uid on iklan_klaim(uid, at)` },
  ]);
}

async function aturIklan(env) {
  const c = await cfgSemua(env, true);
  const aktif = String(c.iklanAktif ?? "0") === "1" || c.iklanAktif === true;
  const coin = Math.max(0, Math.trunc(Number(c.iklanCoin ?? 0) || 0));
  const maxHari = Math.max(0, Math.min(100, Math.trunc(Number(c.iklanMaxHari ?? 10) || 0)));
  const jeda = Math.max(10, Math.trunc(Number(c.iklanCooldown ?? 20) || 20));
  // Unity Ads: Game ID dan Placement Rewarded dipakai APK untuk memuat iklan.
  // Nilai cadangan dipakai bila panel belum diisi, supaya iklan tetap jalan.
  return {
    aktif,
    coin,
    maxHari,
    jeda,
    adUnit: String(c.iklanAdUnit || ""),
    gameId: String(c.iklanGameId || "800448611").trim(),
    placement: String(c.iklanPlacement || "BP_Rewarded_Android").trim(),
    // Mode uji: aplikasi menyalakan log rinci Unity Ads dan menampilkan kode
    // galat apa adanya, supaya masalah iklan bisa dibaca dari layar HP.
    uji: String(c.iklanUji ?? "0") === "1",
    // Gambar banner iklan di tab Party. Kosong = pakai gambar bawaan di APK.
    banner: String(c.iklanBanner || "").trim(),
  };
}

/** Kode undangan agensi: 6 huruf/angka besar, mudah dibaca ulang. */
function kodeAgensi() {
  const abjad = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += abjad[Math.floor(Math.random() * abjad.length)];
  return s;
}

/**
 * Catat komisi agensi untuk satu penerima gift. Gagal mencatat TIDAK boleh
 * menggagalkan gift, jadi semua galat ditelan di sini.
 */
async function catatKomisiAgency(env, hostUid, nilaiCoin, now) {
  try {
    const nilai = Math.trunc(Number(nilaiCoin) || 0);
    if (nilai <= 0) return;
    await siapAgency(env);
    const r = await pipe(env, [
      {
        sql: `select h.agency_id, a.rate from agency_host h
              join agency a on a.id = h.agency_id
              where h.host_uid = ? and h.aktif = 1 and a.aktif = 1`,
        args: [T(hostUid)],
      },
    ]);
    const row = r[0].rows[0];
    if (!row) return;
    const rate = Math.max(0, Math.min(100, Number(row.rate) || 0));
    const komisi = Math.floor((nilai * rate) / 100);
    if (komisi <= 0) return;
    const bulan = bulanIni(now);
    await pipeTrx(env, [
      { sql: "begin immediate" },
      {
        sql: `insert into agency_earn (agency_id, bulan, coins) values (?, ?, ?)
              on conflict (agency_id, bulan) do update set coins = coins + excluded.coins`,
        args: [T(row.agency_id), T(bulan), I(komisi)],
      },
      { sql: "update agency set saldo = saldo + ? where id = ?", args: [I(komisi), T(row.agency_id)] },
      { sql: "commit" },
    ]);
  } catch (e) { /* komisi opsional: jangan ganggu gift */ }
}

// s.stock dikirim juga sebagai "coins": panel lama membaca kolom coins,
// jadi stok seller tampil 0 walau isi stok berhasil.
const KOLOM_SELLER = `s.uid, s.store, s.wa, s.wa_link, s.stock, s.stock as coins, s.urut, s.active,
  coalesce(nullif(s.photo, ''), (select avatar from wave_players w where w.uid = s.uid), '') as photo`;

/**
 * UID yang punya dompet di database Viza ini. Dipakai untuk memisahkan seller
 * milik Viza dari seller lama yang ikut tersalin dari database aplikasi lain
 * (mis. Rezo). Bila tabel wallets belum ada, hasilnya null dan semua seller
 * dianggap milik Viza supaya tidak ada yang terhapus keliru.
 */
async function uidPunyaDompet(env) {
  try {
    const r = await pipe(env, [{ sql: "select uid from wallets limit 20000" }]);
    const set = new Set();
    (r[0].rows || []).forEach((x) => { const u = String(x.uid || ""); if (u) set.add(u); });
    return set;
  } catch (e) { return null; }
}

async function daftarSeller(env, hanyaAktif) {
  await siapSeller(env);
  const batas = Date.now() - 3 * 24 * 3600 * 1000;
  const r = await pipe(env, [
    {
      sql: `select ${KOLOM_SELLER},
                   (select count(*) from seller_tx t
                     where t.seller = s.uid and t.created_at >= ?) as pesanan
            from coin_seller s
            ${hanyaAktif ? "where s.active = 1" : ""}
            order by s.urut desc, s.created_at asc limit 200`,
      args: [I(batas)],
    },
  ]);
  const dompet = await uidPunyaDompet(env);
  return (r[0].rows || []).map((x) => ({
    ...x,
    // viza = 1 seller milik aplikasi Viza, 0 seller lama dari aplikasi lain.
    viza: dompet ? (dompet.has(String(x.uid || "")) ? 1 : 0) : 1,
  }));
}

async function satuSeller(env, uid) {
  await siapSeller(env);
  const batas = Date.now() - 3 * 24 * 3600 * 1000;
  const r = await pipe(env, [
    {
      sql: `select ${KOLOM_SELLER},
                   (select count(*) from seller_tx t
                     where t.seller = s.uid and t.created_at >= ?) as pesanan
            from coin_seller s where s.uid = ?`,
      args: [I(batas), T(uid)],
    },
  ]);
  return r[0].rows[0] ?? null;
}

/** Seller mengirim coin ke user. Stok seller berkurang, saldo user bertambah. */
async function sellerKirim(env, uid, p) {
  await siapSeller(env);
  const to = String(p.to ?? "").trim();
  if (!/^[A-Za-z0-9_-]{6,64}$/.test(to)) return gagal("User ID tujuan tidak valid");
  if (/^[0-9]+$/.test(to)) return gagal("Pakai UID akun, bukan ID angka");
  if (to === uid) return gagal("Tidak bisa mengirim ke diri sendiri");
  const coins = Math.trunc(Number(p.coins ?? 0));
  if (!(coins > 0)) return gagal("Jumlah coin tidak valid");
  if (coins > 10000000000000) return gagal("Jumlah coin terlalu besar");
  const req = String(p.req ?? `s-${uid}-${Date.now()}`);
  const note = String(p.note ?? "").slice(0, 120);
  const now = Date.now();

  const r = await pipe(env, [
    { sql: "begin immediate" },
    { sql: "insert or ignore into wallets (uid) values (?)", args: [T(to)] },
    {
      sql: `update coin_seller set stock = stock - ?, updated_at = ?
            where uid = ? and active = 1 and stock >= ?
              and not exists (select 1 from seller_req where req = ?)`,
      args: [I(coins), I(now), T(uid), I(coins), T(req)],
    },
    { sql: "insert into seller_req (req, at) select ?, ? where changes() > 0", args: [T(req), I(now)] },
    {
      sql: `insert into seller_tx (seller, buyer, coins, note, req, created_at)
            select ?, ?, ?, ?, ?, ? where changes() > 0`,
      args: [T(uid), T(to), I(coins), T(note), T(req), I(now)],
    },
    {
      sql: `update wallets set coins = coins + ?, updated_at = ? where uid = ? and changes() > 0`,
      args: [I(coins), I(now), T(to)],
    },
    {
      sql: `insert into money_tx (uid, kind, amount, created_at)
            select ?, 'seller_in', ?, ? where changes() > 0`,
      args: [T(to), I(coins), I(now)],
    },
    { sql: "select stock from coin_seller where uid = ?", args: [T(uid)] },
    { sql: "select coins from wallets where uid = ?", args: [T(to)] },
    { sql: "commit" },
  ]);
  const sisa = Number(r[7].rows[0]?.stock ?? 0);
  const saldoBaru = Number(r[8].rows[0]?.coins ?? 0);
  if (Number(r[4].affected ?? 0) > 0) {
    return json({ ok: 1, stok: sisa, coins: saldoBaru, terkirim: coins });
  }
  const cek = await pipe(env, [{ sql: "select 1 as ada from seller_req where req = ?", args: [T(req)] }]);
  if (cek[0].rows.length) return json({ ok: 1, stok: sisa, coins: saldoBaru, terkirim: 0, ulang: 1 });
  const s2 = await satuSeller(env, uid);
  if (!s2 || !Number(s2.active)) return gagal("Akun ini bukan coin seller aktif");
  return gagal(`Stok coin habis. Sisa ${Number(s2.stock ?? 0).toLocaleString("id-ID")} coin.`);
}

/** Endpoint /seller: halaman seller di Dompet dan panel seller di Profil. */
async function sellerApi(env, sesi, body) {
  const uid = sesi.uid;
  const p = body.p ?? {};
  const a = String(body.a ?? p.a ?? "");
  if (a === "list") {
    const rows = await daftarSeller(env, true);
    return json({ ok: 1, seller: rows });
  }
  if (a === "me") {
    const foto = String(p.photo ?? "").trim();
    const nama = String(p.nama ?? "").trim();
    if (foto || nama) {
      try {
        await pipe(env, [
          {
            sql: `update coin_seller set
                    photo = case when ? <> '' then ? else photo end,
                    store = case when ? <> '' then ? else store end,
                    updated_at = ?
                  where uid = ?`,
            args: [T(foto), T(foto), T(nama), T(nama), I(Date.now()), T(uid)],
          },
        ]);
      } catch { /* foto gagal disimpan tidak boleh menghalangi panel */ }
    }
    const me = await satuSeller(env, uid);
    if (!me) return json({ ok: 0, e: "Bukan coin seller", seller: null });
    return json({ ok: 1, seller: me });
  }
  if (a === "send") return await sellerKirim(env, uid, p);
  if (a === "hist") {
    await siapSeller(env);
    const r = await pipe(env, [
      {
        sql: `select buyer, coins, note, created_at from seller_tx
              where seller = ? order by created_at desc limit 50`,
        args: [T(uid)],
      },
    ]);
    return json({ ok: 1, riwayat: r[0].rows });
  }
  return gagal(`aksi seller ${a} tidak dikenal`);
}

// ---------- Aksi dompet ----------
async function kirimGift(env, uid, p) {
  await pastikan(env, uid);
  const price = Math.trunc(Number(p.price ?? 0));
  if (price <= 0) return gagal("Gift tidak valid");
  const req = String(p.req ?? `g-${uid}-${Date.now()}`);
  const now = Date.now();
  const item = p.itemId != null ? String(p.itemId) : null;
  const room = p.roomId != null ? String(p.roomId) : null;

  // Penanda cashback dibaca sebelum transaksi supaya diamond pengirim ikut
  // aturan panel: gift cashback hanya 5% (bisa diubah), gift biasa 100%.
  let giftCashback = false;
  try {
    const kat = await katalogGift(env, item);
    giftCashback = !!(kat && kat.cashback);
  } catch (e) { giftCashback = false; }
  const pctDm = await pctDiamond(giftCashback);
  const dmMasuk = Math.max(0, Math.floor((price * pctDm) / 100));

  // Satu transaksi: potong coin, tambah diamond dan exp (bonus VIP),
  // lalu catat. Penanda req membuat pengulangan tidak memotong dua kali.
  const r = await pipeTrx(env, [
    { sql: "begin immediate" },
    {
      sql: `update wallets set
              coins      = coins - ?,
              diamonds   = diamonds + ?,
              exp        = exp + (? * (case when vip between 1 and 9 and vip_until > ?
                                            then 100 + 5 * vip else 100 end)) / 100,
              updated_at = ?
            where uid = ? and coins >= ?
              and not exists (select 1 from gift_req where req_id = ?)`,
      args: [I(price), I(dmMasuk), I(price), I(now), I(now), T(uid), I(price), T(req)],
    },
    {
      sql: "insert into gift_req (req_id, uid, at) select ?, ?, ? where changes() > 0",
      args: [T(req), T(uid), I(now)],
    },
    {
      sql: `insert into money_tx (uid, kind, item_id, amount, room_id, created_at)
            select ?, 'gift', ?, ?, ?, ? where changes() > 0`,
      args: [T(uid), item, I(price), room, I(now)],
    },
    { sql: `select ${KOLOM} from wallets where uid = ?`, args: [T(uid)] },
    { sql: "commit" },
  ]);

  const berubah = r[1].affected > 0;
  const w = rapikan(r[4].rows[0]);
  if (berubah) {
    // PENERIMA: aplikasi mengirim daftar uid penerima (p.to) dan nilai per
    // penerima (p.each). Dulu daftar itu diabaikan, jadi diamond hanya masuk
    // ke pengirim dan penerima tidak pernah menerima apa pun (halaman Tukar
    // Berlian mereka tetap 0, terutama setelah akun direset). Sekarang setiap
    // penerima dicatat sendiri, tetap aman diulang lewat penanda req.
    await kreditPenerima(env, uid, p, price, item, room, now, req, giftCashback);
    // dm = diamond yang benar-benar masuk ke pengirim, dipakai aplikasi untuk
    // teks "Gift terkirim! +X diamond" supaya angkanya tidak menebak.
    return json({ ok: 1, w: w ?? null, dm: dmMasuk, dmPct: pctDm });
  }
  // Tidak berubah: bisa karena coin kurang atau permintaan sudah diproses.
  const cek = await pipeTrx(env, [
    { sql: "select 1 as ada from gift_req where req_id = ?", args: [T(req)] },
  ]);
  if (cek[0].rows.length) return json({ ok: 1, w: w ?? null, dm: dmMasuk, dmPct: pctDm }); // sudah pernah diproses: aman
  return gagal("Coin tidak cukup. Tekan Topup");
}

/**
 * Tambahkan diamond ke setiap penerima gift. Nilai per penerima diambil dari
 * p.each (harga gift x jumlah ketukan); kalau tidak dikirim, dibagi rata.
 * Satu penerima gagal tidak menggagalkan penerima lain maupun pengirim.
 */
/**
 * Diamond penerima gift cashback. Bawaannya 5% dari harga gift dan bisa diubah
 * dari panel ("Diamond penerima gift cashback (%)"). Nilai ini yang membuat
 * penerima punya saldo berlian untuk ditukar, terpisah dari 70% coin.
 */
const DIAMOND_CASHBACK_PCT = 5;

/**
 * Persen diamond penerima dari panel.
 * - Gift cashback: bawaan 5% dari nilai gift.
 * - Gift biasa: bawaan 100% (seluruh nilai gift jadi diamond penerima).
 * Dua angka ini dipisah supaya mengubah yang cashback tidak ikut memotong
 * penghasilan host dari gift biasa.
 */
async function pctDiamond(giftCashback) {
  try {
    const cfg = await cfgRtdb("pub/_cashbackCfg");
    const bawaan = giftCashback ? DIAMOND_CASHBACK_PCT : 100;
    const kunci = giftCashback ? "diamondPct" : "diamondBiasaPct";
    const v = Number(cfg?.[kunci] ?? bawaan);
    if (!Number.isFinite(v)) return bawaan;
    return Math.max(0, Math.min(100, v));
  } catch (e) {
    return giftCashback ? DIAMOND_CASHBACK_PCT : 100;
  }
}

async function kreditPenerima(env, uid, p, price, item, room, now, req, giftCashback = false) {
  const daftar = Array.isArray(p.to) ? p.to.map((x) => String(x ?? "").trim()).filter(Boolean) : [];
  const unik = [...new Set(daftar)].filter((u) => u && u !== uid);
  if (!unik.length) return;
  let each = Math.trunc(Number(p.each ?? 0));
  if (!(each > 0)) each = Math.floor(price / unik.length);
  if (!(each > 0)) return;
  // Gift cashback: penerima tetap dapat BIASA cashback jalan, tapi diamond-nya
  // dihitung 5% dari harga gift (bukan nilai penuh seperti gift biasa).
  // Angka persennya diambil dari panel supaya bisa diubah tanpa build.
  const diamond = Math.floor((each * (await pctDiamond(giftCashback))) / 100);
  for (const r of unik) {
    try {
      await pastikan(env, r);
      const tanda = `${req}:to:${r}`;
      await pipeTrx(env, [
        { sql: "begin immediate" },
        {
          sql: `update wallets set
                  diamonds   = diamonds + ?,
                  exp        = exp + (? * (case when vip between 1 and 9 and vip_until > ?
                                                then 100 + 5 * vip else 100 end)) / 100,
                  updated_at = ?
                where uid = ?
                  and not exists (select 1 from gift_req where req_id = ?)`,
          args: [I(diamond), I(each), I(now), I(now), T(r), T(tanda)],
        },
        {
          sql: "insert into gift_req (req_id, uid, at) select ?, ?, ? where changes() > 0",
          args: [T(tanda), T(r), I(now)],
        },
        {
          sql: `insert into money_tx (uid, kind, item_id, amount, room_id, created_at)
                select ?, 'gift_in', ?, ?, ?, ? where changes() > 0`,
          args: [T(r), item, I(diamond), room, I(now)],
        },
        { sql: "commit" },
      ]);
      // Komisi agensi dihitung dari nilai gift yang diterima host.
      await catatKomisiAgency(env, r, each, now);
    } catch (e) {
      try { await pipe(env, [{ sql: "rollback" }]); } catch (e2) { /* tidak ada transaksi aktif */ }
    }
  }
  // Segarkan profil penerima supaya angka berlian di layar Tukar langsung naik.
  try {
    const pendengar = env.GIFT_PUSH;
    if (typeof pendengar === "function") await pendengar(unik);
  } catch (e) { /* opsional */ }
}

async function topup(env, uid, p) {
  // PENTING: coin tidak boleh dicetak dari aplikasi. Dulu siapa pun yang punya
  // akun bisa memanggil op ini dan menambah coin sesukanya. Sekarang hanya
  // staf/panel yang boleh, sedang reward (jackpot, undangan) punya jalur
  // sendiri yang diperiksa server.
  const peran = await peranStaf(env, uid);
  if (!peran.length) return gagal("Coin hanya bisa ditambah lewat pembayaran atau panel");
  await pastikan(env, uid);
  const coins = Math.trunc(Number(p.coins ?? 0));
  if (coins <= 0) return gagal("Jumlah tidak valid");
  const req = String(p.req ?? `t-${uid}-${Date.now()}`);
  const now = Date.now();
  const r = await pipe(env, [
    { sql: "begin immediate" },
    {
      sql: `update wallets set coins = coins + ?, updated_at = ?
            where uid = ? and not exists (select 1 from topup_req where req_id = ?)`,
      args: [I(coins), I(now), T(uid), T(req)],
    },
    {
      sql: "insert into topup_req (req_id, uid, at) select ?, ?, ? where changes() > 0",
      args: [T(req), T(uid), I(now)],
    },
    {
      sql: `insert into money_tx (uid, kind, amount, created_at)
            select ?, 'topup', ?, ? where changes() > 0`,
      args: [T(uid), I(coins), I(now)],
    },
    { sql: `select ${KOLOM} from wallets where uid = ?`, args: [T(uid)] },
    { sql: "commit" },
  ]);
  return r[1].affected > 0 ? ok(rapikan(r[4].rows[0])) : ok(rapikan(r[4].rows[0]));
}

/** Hadiah cek in harian: sekali per tanggal, tidak bisa dobel. */
async function klaimSignin(env, uid, p) {
  const date = String(p.date ?? "").slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return gagal("Tanggal cek in tidak valid");
  const hari = Math.max(1, Math.min(7, Math.floor(Number(p.day ?? p.hari ?? 1))));
  // Hadiah dibaca dari pengaturan panel (signinCfg/days/{hari}), BUKAN dari
  // angka kiriman aplikasi. Dulu aplikasi mengirim jumlah coin sendiri, jadi
  // siapa pun bisa mengirim angka besar dan mencetak coin tiap hari.
  const cfg = await cfgRtdb("signinCfg");
  const baris = (cfg && cfg.days && (cfg.days[String(hari)] ?? cfg.days[hari])) || null;
  const coins = Math.max(0, Math.min(500000000, Math.floor(Number(baris?.coins ?? 0))));
  await pastikan(env, uid);
  if (!(coins > 0)) {
    // Panel belum mengisi hadiah hari ini: klaim tetap dianggap sah tanpa coin.
    const w = await pipe(env, [{ sql: `select ${KOLOM} from wallets where uid = ?`, args: [T(uid)] }]);
    return ok(rapikan(w[0].rows[0]));
  }
  const req = `signin-${uid}-${date}`;
  const now = Date.now();
  const r = await pipe(env, [
    { sql: "begin immediate" },
    {
      sql: `update wallets set coins = coins + ?, updated_at = ?
            where uid = ? and not exists (select 1 from topup_req where req_id = ?)`,
      args: [I(coins), I(now), T(uid), T(req)],
    },
    {
      sql: "insert into topup_req (req_id, uid, at) select ?, ?, ? where changes() > 0",
      args: [T(req), T(uid), I(now)],
    },
    {
      sql: `insert into money_tx (uid, kind, amount, created_at)
            select ?, 'signin', ?, ? where changes() > 0`,
      args: [T(uid), I(coins), I(now)],
    },
    { sql: `select ${KOLOM} from wallets where uid = ?`, args: [T(uid)] },
    { sql: "commit" },
  ]);
  return ok(rapikan(r[4].rows[0]));
}

async function tukar(env, uid, p) {
  await pastikan(env, uid);
  const d = Math.trunc(Number(p.diamonds ?? 0));
  if (d <= 0) return gagal("Jumlah tidak valid");
  const req = String(p.req ?? `x-${uid}-${Date.now()}`);
  const now = Date.now();
  const gain = Math.floor(d / 2);
  const r = await pipe(env, [
    { sql: "begin immediate" },
    {
      sql: `update wallets set diamonds = diamonds - ?, coins = coins + ?, updated_at = ?
            where uid = ? and diamonds >= ?
              and not exists (select 1 from exchange_req where req_id = ?)`,
      args: [I(d), I(gain), I(now), T(uid), I(d), T(req)],
    },
    {
      sql: "insert into exchange_req (req_id, uid, at) select ?, ?, ? where changes() > 0",
      args: [T(req), T(uid), I(now)],
    },
    {
      sql: `insert into money_tx (uid, kind, amount, created_at)
            select ?, 'tukar', ?, ? where changes() > 0`,
      args: [T(uid), I(gain), I(now)],
    },
    { sql: `select ${KOLOM} from wallets where uid = ?`, args: [T(uid)] },
    { sql: "commit" },
  ]);
  if (r[1].affected > 0) return ok(rapikan(r[4].rows[0]));
  const cek = await pipe(env, [
    { sql: "select 1 as ada from exchange_req where req_id = ?", args: [T(req)] },
  ]);
  if (cek[0].rows.length) return ok(rapikan(r[4].rows[0]));
  return gagal("Diamond tidak cukup");
}

/** Bet/win dari game Hive. kind 1 = bet (potong), 2 = win (tambah). */
async function hiveUang(env, uid, p) {
  await pastikan(env, uid);
  const kind = Math.trunc(Number(p.kind ?? 0));
  const amount = Math.trunc(Number(p.amount ?? 0));
  const oid = String(p.orderId ?? "");
  if (!oid || amount <= 0) return gagal("order tidak valid");
  const delta = kind === 1 ? -amount : amount;
  const now = Date.now();
  const r = await pipe(env, [
    { sql: "begin immediate" },
    {
      sql: `update wallets set coins = coins + ?, updated_at = ?
            where uid = ? and (? > 0 or coins >= ?)
              and not exists (select 1 from hive_order where order_id = ?)`,
      args: [I(delta), I(now), T(uid), I(delta), I(amount), T(oid)],
    },
    {
      sql: `insert into hive_order (order_id, uid, kind, amount, round_id, game, at)
            select ?, ?, ?, ?, ?, ?, ? where changes() > 0`,
      args: [T(oid), T(uid), I(kind), I(amount), T(String(p.roundId ?? "")), T(String(p.game ?? "")), I(now)],
    },
    {
      sql: `insert into money_tx (uid, kind, amount, created_at)
            select ?, ?, ?, ? where changes() > 0`,
      args: [T(uid), kind === 1 ? T("hive_bet") : T("hive_win"), I(delta), I(now)],
    },
    { sql: `select ${KOLOM} from wallets where uid = ?`, args: [T(uid)] },
    { sql: "commit" },
  ]);
  if (r[1].affected > 0) return ok(rapikan(r[4].rows[0]));
  const cek = await pipe(env, [
    { sql: "select 1 as ada from hive_order where order_id = ?", args: [T(oid)] },
  ]);
  if (cek[0].rows.length) return ok(rapikan(r[4].rows[0])); // sudah diproses
  return gagal("Coin tidak cukup");
}


// ---------- Level dan item ----------
const expLevel = (n) => (n <= 1 ? 0 : Math.round((3932550000 * Math.pow(n / 39, 2.5)) / 10000) * 10000);

function levelDariExp(exp) {
  let l = 1;
  while (l < 250 && exp >= expLevel(l + 1)) l++;
  return l;
}

let HARGA_VIP = [0, 500000, 1500000, 3000000, 6000000, 12000000, 25000000, 50000000, 100000000, 250000000];
// Harga VIP bisa diubah dari panel developer. Disimpan di berkas sendiri supaya
// tidak perlu build APK baru; app membaca angkanya dari /vip-harga.
const HARGA_VIP_FILE = "/opt/viza-api/harga-vip.json";
async function hargaVipKini() {
  try {
    const fsp = await import("node:fs/promises");
    const t = await fsp.readFile(HARGA_VIP_FILE, "utf8");
    const a = JSON.parse(t);
    if (Array.isArray(a) && a.length === 10) HARGA_VIP = a.map((x) => Number(x) || 0);
  } catch (e) { /* berkas belum ada: pakai bawaan */ }
  return HARGA_VIP;
}
async function hargaVipSimpan(a) {
  HARGA_VIP = [0, ...a.map((x) => Math.round(Number(x) || 0))];
  const fsp = await import("node:fs/promises");
  await fsp.writeFile(HARGA_VIP_FILE, JSON.stringify(HARGA_VIP), "utf8");
  return HARGA_VIP;
}
const BULAN = 30 * 86400000;
const AWALAN_VIP = ["vipt_", "vipf_", "vipb_", "vipe_", "vipbn_"];

/** Beli VIP: coin dipotong, item VIP 1..tier masuk My Item, level naik kalau lebih tinggi. */
async function beliVip(env, uid, p) {
  const tier = Math.trunc(Number(p.tier ?? 0));
  if (!(tier >= 1 && tier <= 9)) return gagal("Level VIP tidak valid");
  await hargaVipKini();
  const harga = HARGA_VIP[tier];
  const now = Date.now();
  const req = String(p.req ?? `v-${uid}-${tier}-${now}`);
  const w0 = await pastikan(env, uid);
  if (w0.coins < harga) return gagal("Coin tidak cukup. Tekan Topup");

  const aktif = w0.vip >= 1 && w0.vip <= 9 && w0.vipUntil > now;
  const lama = Number(w0.inv?.[`vipt_${tier}`] ?? 0);
  const vuntil = (lama > now ? lama : now) + BULAN;

  const inv = { ...w0.inv };
  for (let i = 1; i <= tier; i++) for (const a of AWALAN_VIP) inv[`${a}${i}`] = vuntil;

  const eq = { ...w0.equip };
  let vip = w0.vip, vipUntil = w0.vipUntil;
  if (tier > w0.vip || !aktif) { vip = tier; vipUntil = vuntil; }
  else if (tier === w0.vip) { vipUntil = vuntil; }
  if (tier >= w0.vip || !aktif) {
    eq.frame = `vipf_${tier}`;
    if (!eq.bubble || /^vipb_/.test(eq.bubble)) eq.bubble = `vipb_${tier}`;
    if (!eq.entry || /^vipe_/.test(eq.entry)) eq.entry = `vipe_${tier}`;
    if (!eq.banner || /^vipbn_/.test(eq.banner)) eq.banner = `vipbn_${tier}`;
  }

  const r = await pipeTrx(env, [
    { sql: "begin immediate" },
    {
      sql: `update wallets set coins = coins - ?, vip = ?, vip_until = ?, inv = ?, equip = ?, updated_at = ?
            where uid = ? and coins >= ? and not exists (select 1 from vip_req where req_id = ?)`,
      args: [I(harga), I(vip), I(vipUntil), T(JSON.stringify(inv)), T(JSON.stringify(eq)), I(now), T(uid), I(harga), T(req)],
    },
    { sql: "insert into vip_req (req_id, uid, at) select ?, ?, ? where changes() > 0", args: [T(req), T(uid), I(now)] },
    {
      sql: `insert into money_tx (uid, kind, item_id, amount, created_at)
            select ?, 'buy_vip', ?, ?, ? where changes() > 0`,
      args: [T(uid), T("vip" + tier), I(harga), I(now)],
    },
    { sql: `select ${KOLOM} from wallets where uid = ?`, args: [T(uid)] },
    { sql: "commit" },
  ]);
  return ok(rapikan(r[4].rows[0]));
}

/** Beli item store: masa aktif ditambah dari sisa yang masih ada. */
async function beliItem(env, uid, p) {
  const id = String(p.itemId ?? "");
  const harga = Math.trunc(Number(p.price ?? 0));
  const hari = Math.trunc(Number(p.days ?? 0));
  if (!id) return gagal("Item tidak valid");
  if (hari <= 0) return gagal("Masa aktif item tidak valid");
  const now = Date.now();
  const w0 = await pastikan(env, uid);
  if (w0.coins < harga) return gagal("Coin tidak cukup. Tekan Topup");
  const lama = Number(w0.inv?.[id] ?? 0);
  const akhir = Math.max(now, lama) + hari * 86400000;
  const inv = { ...w0.inv, [id]: akhir };
  const r = await pipeTrx(env, [
    { sql: "begin immediate" },
    {
      sql: `update wallets set coins = coins - ?, inv = ?, updated_at = ?
            where uid = ? and coins >= ?`,
      args: [I(harga), T(JSON.stringify(inv)), I(now), T(uid), I(harga)],
    },
    {
      sql: `insert into money_tx (uid, kind, item_id, amount, created_at)
            select ?, 'buy_item', ?, ?, ? where changes() > 0`,
      args: [T(uid), T(id), I(harga), I(now)],
    },
    { sql: `select ${KOLOM} from wallets where uid = ?`, args: [T(uid)] },
    { sql: "commit" },
  ]);
  return ok(rapikan(r[3].rows[0]));
}

/** Pasang atau lepas item: id kosong berarti lepas. */
async function pasangItem(env, uid, p) {
  const slot = String(p.slot ?? "");
  const id = String(p.itemId ?? p.id ?? "");
  if (!slot) return gagal("Slot tidak valid");
  const now = Date.now();
  const w0 = await pastikan(env, uid);
  const eq = { ...w0.equip, [slot]: id };
  const r = await pipe(env, [
    {
      sql: "update wallets set equip = ?, updated_at = ? where uid = ?",
      args: [T(JSON.stringify(eq)), I(now), T(uid)],
    },
    { sql: `select ${KOLOM} from wallets where uid = ?`, args: [T(uid)] },
  ]);
  return ok(rapikan(r[1].rows[0]));
}

/** Klaim hadiah level: tiap level baru memberi 243.000 x level. */
async function klaimLevel(env, uid) {
  const now = Date.now();
  const w0 = await pastikan(env, uid);
  const lvl = levelDariExp(w0.exp);
  if (lvl <= w0.lvClaimed) return gagal("Belum ada hadiah level untuk diklaim");
  let gain = 0;
  for (let l = w0.lvClaimed + 1; l <= lvl; l++) gain += l * 243000;
  // Dijaga oleh lv_claimed lama, jadi dua permintaan bersamaan tidak dua kali cair.
  const r = await pipe(env, [
    { sql: "begin immediate" },
    {
      sql: `update wallets set coins = coins + ?, lv_claimed = ?, updated_at = ?
            where uid = ? and lv_claimed = ?`,
      args: [I(gain), I(lvl), I(now), T(uid), I(w0.lvClaimed)],
    },
    {
      sql: `insert into money_tx (uid, kind, amount, created_at)
            select ?, 'claim_level', ?, ? where changes() > 0`,
      args: [T(uid), I(gain), I(now)],
    },
    { sql: `select ${KOLOM} from wallets where uid = ?`, args: [T(uid)] },
    { sql: "commit" },
  ]);
  const w = rapikan(r[3].rows[0]);
  if (r[1].affected > 0) return ok(w);
  return gagal("Hadiah level sudah diklaim");
}

/** Lengkapi item VIP yang belum masuk My Item untuk VIP yang aktif. */
async function backfillVip(env, uid) {
  const now = Date.now();
  const w0 = await pastikan(env, uid);
  if (!(w0.vip >= 1 && w0.vip <= 9 && w0.vipUntil > now)) return ok(w0);
  const inv = { ...w0.inv };
  for (let i = 1; i <= w0.vip; i++)
    for (const a of AWALAN_VIP) {
      const k = `${a}${i}`;
      if (Number(inv[k] ?? 0) < w0.vipUntil) inv[k] = w0.vipUntil;
    }
  const r = await pipe(env, [
    { sql: "update wallets set inv = ?, updated_at = ? where uid = ?", args: [T(JSON.stringify(inv)), I(now), T(uid)] },
    { sql: `select ${KOLOM} from wallets where uid = ?`, args: [T(uid)] },
  ]);
  return ok(rapikan(r[1].rows[0]));
}

/** Siapkan profil pemain untuk game (nama dan avatar dipakai Hive). */
async function wavePrepare(env, uid, p) {
  const nama = String(p.name ?? "").trim();
  const avatar = String(p.avatar ?? "");
  const now = Date.now();
  await pastikan(env, uid);
  const r = await pipe(env, [
    {
      sql: `insert into wave_players (uid, name, avatar, updated_at) values (?, ?, ?, ?)
            on conflict (uid) do update set
              name   = case when excluded.name <> '' then excluded.name else wave_players.name end,
              avatar = case when excluded.avatar <> '' then excluded.avatar else wave_players.avatar end,
              updated_at = excluded.updated_at`,
      args: [T(uid), T(nama || "Player"), T(avatar), I(now)],
    },
    { sql: `select ${KOLOM} from wallets where uid = ?`, args: [T(uid)] },
  ]);
  return ok(rapikan(r[1].rows[0]));
}

// ---------- Pengaturan dari Realtime Database (tanpa build aplikasi) ----------
const RTDB = "https://my-app-e7f8c-default-rtdb.asia-southeast1.firebasedatabase.app";
const ADMIN_EMAIL = "bangexx01@gmail.com";
// Email admin yang boleh memakai panel developer (Rezo dan Viza).
// Akun panel internal (@vizapanel.app) ikut diakui, karena panel admin Viza
// memakai akun sendiri, bukan email pribadi pemilik.
const ADMIN_SEMUA = [ADMIN_EMAIL, "boypanel@vizapanel.app"];
// Panel dan seluruh alat developer hanya untuk email pemilik. Daftar staf dan
// domain @vizapanel.app tidak lagi memberi akses, sesuai permintaan pemilik.
const adalahAdmin = (s) => {
  const e = String(s?.email || "").toLowerCase();
  if (!e) return false;
  return e === String(ADMIN_EMAIL).toLowerCase();
};
// Staf panel (manager/admin) boleh memakai fitur panel. Hanya pengelolaan staf
// dan penghapusan akun yang tetap khusus developer.
// Peran staf panel web disimpan di Firestore panelAdmins/<email>, terpisah dari
// panel_staf (staf panel di dalam APK). Keduanya harus diakui di sini, kalau tidak
// admin panel web selalu ditolak dengan "Hanya admin".
const cachePanelWeb = new Map();
// Sebagian token (login nomor HP / sesi lama) tidak membawa email. Ambil dari
// Firebase Auth lewat service account supaya peran panel web tetap terbaca.
async function emailSesi(env, sesi) {
  const langsung = String(sesi?.email || "").toLowerCase();
  if (langsung) return langsung;
  const uid = String(sesi?.uid || "");
  if (!uid) return "";
  try {
    const token = await tokenLayanan(env);
    if (!token) return "";
    const proyek = String(env.FIREBASE_PROJECT || "my-app-e7f8c").trim();
    const r = await fetch(`https://identitytoolkit.googleapis.com/v1/projects/${proyek}/accounts:lookup`, {
      method: "POST",
      headers: { authorization: "Bearer " + token, "content-type": "application/json" },
      body: JSON.stringify({ localId: [uid] }),
    });
    if (!r.ok) return "";
    const d = await r.json();
    return String(d?.users?.[0]?.email || "").toLowerCase();
  } catch { return ""; }
}

async function peranPanelWeb(env, sesi) {
  const email = await emailSesi(env, sesi);
  if (!email) return "";
  const simpan = cachePanelWeb.get(email);
  if (simpan && simpan.sampai > Date.now()) return simpan.peran;
  let peran = "";
  try {
    const token = await tokenLayanan(env);
    if (token) {
      const proyek = String(env.FIREBASE_PROJECT || "my-app-e7f8c").trim();
      const r = await fetch(
        `https://firestore.googleapis.com/v1/projects/${proyek}/databases/(default)/documents/panelAdmins/${encodeURIComponent(email)}`,
        { headers: { authorization: "Bearer " + token } },
      );
      const baca = async (jalur) => {
        const rr = await fetch(
          `https://firestore.googleapis.com/v1/projects/${proyek}/databases/(default)/documents/${jalur}`,
          { headers: { authorization: "Bearer " + token } },
        );
        if (!rr.ok) return null;
        const d = await rr.json();
        const f = d.fields || {};
        if (f.aktif && f.aktif.booleanValue === false) return "";
        return String(f.peran?.stringValue || f.jabatanApk?.stringValue || "admin").toLowerCase();
      };
      if (r.ok) {
        const d = await r.json();
        const f = d.fields || {};
        const aktif = f.aktif && f.aktif.booleanValue === false ? false : true;
        if (aktif) peran = String(f.peran?.stringValue || "admin").toLowerCase();
      }
      // Cadangan: dokumen berkunci uid, lalu jabatan staf versi APK.
      if (!peran && sesi?.uid) peran = (await baca(`panelAdmins/${encodeURIComponent(sesi.uid)}`)) || "";
      if (!peran && sesi?.uid) peran = (await baca(`stafApk/${encodeURIComponent(sesi.uid)}`)) || "";
    }
  } catch { peran = ""; }
  cachePanelWeb.set(email, { peran, sampai: Date.now() + 60000 });
  return peran;
}

async function bolehPanel(env, sesi) {
  if (!sesi) return false;
  if (adalahAdmin(sesi)) return true;
  // Admin tambahan yang didaftarkan pemilik di menu Staf panel (panelAdmins).
  // Alamat @vizapanel.app tidak lagi otomatis diakui.
  try { return !!(await peranPanelWeb(env, sesi)); } catch { return false; }
}
const cache = new Map();

async function cfgRtdb(path, env) {
  const now = Date.now();
  const lama = cache.get(path);
  if (lama && now - lama.at < 60_000) return lama.data;
  try {
    const r = await fetch(`${RTDB}/${path}.json`);
    if (r.ok) {
      const d = await r.json();
      const data = d && typeof d === "object" ? d : {};
      cache.set(path, { at: now, data });
      return data;
    }
    // Aturan RTDB tidak membuka baca untuk sebagian path (giftCfg misalnya).
    // Dulu kegagalan ini dianggap "kosong", jadi penanda cashback hilang dan
    // diamond dihitung 100%. Sekarang dibaca ulang pakai akun layanan.
    if (env) {
      const data = await cfgRtdbSa(env, path);
      if (Object.keys(data).length) {
        cache.set(path, { at: now, data });
        return data;
      }
    }
    throw new Error("cfg " + r.status);
  } catch {
    return lama?.data ?? {};
  }
}

/** Tulis/hapus simpul RTDB memakai token akun layanan. Dipakai panel supaya
 *  penyimpanan aset tidak bergantung pada aturan tulis RTDB di Firebase (yang
 *  masih memakai email contoh, sehingga panel selalu ditolak PERMISSION_DENIED). */
async function tulisRtdbSa(env, path, nilai) {
  const token = await tokenLayanan(env);
  if (!token) throw new Error("akun layanan belum siap");
  const bersih = String(path || "").replace(/^\/+|\/+$/g, "");
  if (!bersih || bersih.includes("..")) throw new Error("path tidak sah");
  const alamat = `${RTDB}/${bersih}.json?access_token=${encodeURIComponent(token)}`;
  const r = nilai === null
    ? await fetch(alamat, { method: "DELETE" })
    : await fetch(alamat, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(nilai),
      });
  if (!r.ok) throw new Error("RTDB " + r.status + " " + (await r.text()).slice(0, 120));
  return true;
}

/** Baca satu cabang RTDB memakai akun layanan.
 *  Aturan RTDB menolak pembacaan dari browser (Permission denied), jadi panel
 *  membaca katalog aset lewat jalur ini agar daftar frame/medali selalu tampil. */
async function bacaRtdbSa(env, path) {
  const token = await tokenLayanan(env);
  if (!token) throw new Error("akun layanan belum siap");
  const bersih = String(path || "").replace(/^\/+|\/+$/g, "");
  if (!bersih || bersih.includes("..")) throw new Error("path tidak sah");
  const alamat = `${RTDB}/${bersih}.json?access_token=${encodeURIComponent(token)}`;
  const r = await fetch(alamat);
  if (!r.ok) throw new Error("RTDB " + r.status + " " + (await r.text()).slice(0, 120));
  return await r.json();
}

/** Tandai user diblokir di Firestore (dokumen banned/{uid}) memakai akun
 *  layanan, supaya aplikasi benar-benar menolak login walaupun aturan Firestore
 *  tidak mengizinkan panel menulis langsung. */
async function tandaiBannedFs(env, uidTarget, alasan, hapus = false) {
  const token = await tokenLayanan(env);
  if (!token) return false;
  const proyek = String(env.FIREBASE_PROJECT || "my-app-e7f8c").trim();
  const dasar = `https://firestore.googleapis.com/v1/projects/${proyek}/databases/(default)/documents/banned`;
  if (hapus) {
    const r = await fetch(`${dasar}/${encodeURIComponent(uidTarget)}`, {
      method: "DELETE",
      headers: { authorization: "Bearer " + token },
    });
    return r.ok;
  }
  const r = await fetch(`${dasar}?documentId=${encodeURIComponent(uidTarget)}`, {
    method: "POST",
    headers: { authorization: "Bearer " + token, "content-type": "application/json" },
    body: JSON.stringify({
      fields: {
        reason: { stringValue: String(alasan || "").slice(0, 140) },
        at: { integerValue: String(Date.now()) },
      },
    }),
  });
  return r.ok;
}

/** Tulis/ubah dokumen Firestore memakai akun layanan (melewati aturan). */
async function tulisFsSa(env, jalur, data) {
  try {
    const token = await tokenLayanan(env);
    if (!token) return false;
    const proyek = String(env.FIREBASE_PROJECT || "my-app-e7f8c").trim();
    const bersih = String(jalur || "").split("/").filter(Boolean).map((x) => encodeURIComponent(x)).join("/");
    if (!bersih) return false;
    const medan = {};
    for (const k of Object.keys(data || {})) medan[k] = fsNilai(data[k]);
    const kunci = Object.keys(medan);
    const samaran = kunci.length ? "?updateMask.fieldPaths=" + kunci.map((x) => encodeURIComponent(x)).join("&updateMask.fieldPaths=") : "";
    const r = await fetch(
      `https://firestore.googleapis.com/v1/projects/${proyek}/databases/(default)/documents/${bersih}${samaran}`,
      {
        method: "PATCH",
        headers: { authorization: "Bearer " + token, "content-type": "application/json" },
        body: JSON.stringify({ fields: medan }),
      },
    );
    return r.ok;
  } catch {
    return false;
  }
}

/** Nomor ID resmi (mis. 1000) milik sebuah uid, dibaca dari users/{uid}.userId. */
async function idResmiSa(env, uid) {
  try {
    const token = await tokenLayanan(env);
    if (!token) return "";
    const proyek = String(env.FIREBASE_PROJECT || "my-app-e7f8c").trim();
    const r = await fetch(
      `https://firestore.googleapis.com/v1/projects/${proyek}/databases/(default)/documents/users/${encodeURIComponent(uid)}`,
      { headers: { authorization: "Bearer " + token } },
    );
    if (!r.ok) return "";
    const d = await r.json();
    return String(d?.fields?.userId?.stringValue || "").trim();
  } catch {
    return "";
  }
}

/** Baca RTDB memakai token akun layanan (melewati aturan baca publik). */
async function cfgRtdbSa(env, path) {
  try {
    const token = await tokenLayanan(env);
    if (!token) return {};
    const r = await fetch(`${RTDB}/${path}.json?access_token=${encodeURIComponent(token)}`);
    if (!r.ok) return {};
    const d = await r.json();
    return d && typeof d === "object" ? d : {};
  } catch {
    return {};
  }
}

// ---------- Reward Room (Koin banyak) mingguan ----------
// Aturan owner: periode Senin 00:00 - Minggu 23:59 WIB, 20 tingkat aliran koin,
// hadiah untuk pemilik kamar dan Top kontributor, satu hadiah per user per
// minggu (diambil dari level tertinggi), dibagikan otomatis Senin 00:05 WIB,
// dan pemenang mendapat pesan resmi di chat Customer Service.
const TIER_BAWAAN = [
  { aliran: 7200000, pemilik: 836000, top: 2, perOrang: 152000 },
  { aliran: 21000000, pemilik: 2600000, top: 2, perOrang: 330000 },
  { aliran: 43200000, pemilik: 5400000, top: 2, perOrang: 580000 },
  { aliran: 75600000, pemilik: 7600000, top: 3, perOrang: 780000 },
  { aliran: 154800000, pemilik: 14700000, top: 3, perOrang: 1450000 },
  { aliran: 298800000, pemilik: 26200000, top: 4, perOrang: 2250000 },
  { aliran: 612000000, pemilik: 49300000, top: 4, perOrang: 5310000 },
  { aliran: 1010000000, pemilik: 74700000, top: 5, perOrang: 7910000 },
  { aliran: 1470000000, pemilik: 102500000, top: 6, perOrang: 10130000 },
  { aliran: 2010000000, pemilik: 128400000, top: 7, perOrang: 13120000 },
  { aliran: 2700000000, pemilik: 165900000, top: 8, perOrang: 15630000 },
  { aliran: 3850000000, pemilik: 214700000, top: 9, perOrang: 20100000 },
  { aliran: 5400000000, pemilik: 295700000, top: 10, perOrang: 24800000 },
  { aliran: 7720000000, pemilik: 386600000, top: 15, perOrang: 26400000 },
  { aliran: 11520000000, pemilik: 582500000, top: 15, perOrang: 39000000 },
  { aliran: 16200000000, pemilik: 812000000, top: 15, perOrang: 55000000 },
  { aliran: 21600000000, pemilik: 1080000000, top: 15, perOrang: 73000000 },
  { aliran: 28800000000, pemilik: 1440000000, top: 15, perOrang: 97000000 },
  { aliran: 36000000000, pemilik: 1800000000, top: 15, perOrang: 121000000 },
  { aliran: 43200000000, pemilik: 2170000000, top: 15, perOrang: 145000000 },
];
const ATURAN_BAWAAN = `1. Waktu acara dihitung per minggu, Senin 00:00 sampai Minggu 23:59 WIB.
2. Aliran koin dihitung dari coin yang dibelanjakan di dalam room (gift). Top up dan cashback tidak dihitung.
3. Mencapai tingkat aliran koin, pemilik kamar dan Top kontributor mendapat hadiah sesuai tabel.
4. Satu pengguna hanya menerima satu hadiah per minggu, diambil dari tingkat tertinggi.
5. Pelanggaran membatalkan hadiah dan akun dapat dibanned.
6. Hadiah dibagikan otomatis setiap Senin 00:05 WIB dan pemberitahuan muncul di chat Customer Service.`;

/** Periode mingguan WIB yang sedang berjalan. */
function periodeReward(now = Date.now()) {
  const t = now + 7 * 3600 * 1000;
  const d = new Date(t);
  const hari = (d.getUTCDay() + 6) % 7; // 0 = Senin
  const mulaiWib = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() - hari);
  const mulai = mulaiWib - 7 * 3600 * 1000;
  return { key: new Date(mulaiWib).toISOString().slice(0, 10), mulai, selesai: mulai + 7 * 86400000 };
}

async function bacaRtdbNilai(env, path) {
  try {
    const token = await tokenLayanan(env);
    if (!token) return null;
    const r = await fetch(`${RTDB}/${String(path).replace(/^\/+/, "")}.json?access_token=${encodeURIComponent(token)}`);
    if (!r.ok) return null;
    return await r.json();
  } catch { return null; }
}

async function patchRtdbSa(env, path, nilai) {
  const token = await tokenLayanan(env);
  if (!token) throw new Error("akun layanan belum siap");
  const r = await fetch(`${RTDB}/${String(path).replace(/^\/+/, "")}.json?access_token=${encodeURIComponent(token)}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(nilai),
  });
  if (!r.ok) throw new Error("RTDB " + r.status);
  return true;
}

/**
 * Poin kamar per menit (level kamar).
 *
 * Dijalankan dari server VPS tiap menit, bukan dari HP, jadi poin tidak bisa
 * dinaikkan sendiri oleh pengguna. Aturannya mengikuti tabel Metode Poin:
 * - naik mic: 81.000 poin/menit (anggota 162.000), batas 10 menit per user per hari
 * - kamar aktif: 81.000 poin/menit (anggota 162.000), batas 10 menit per user per hari
 * Poin disimpan di roomPoin/{roomId}: total, harian, bulanan, anggota, menit, aktif.
 */
const MENIT_MAKS_PER_HARI = 10;
const POIN_NAIK_MIC = { biasa: 81000, anggota: 162000 };
const POIN_KAMAR_AKTIF = { biasa: 81000, anggota: 162000 };

function kunciTanggalWib() {
  const bagian = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(new Date()).split("-");
  return { hari: bagian[0] + bagian[1] + bagian[2], bulan: bagian[0] + bagian[1] };
}

async function hadiahMenitRoom(env) {
  try {
    const token = await tokenLayanan(env);
    if (!token) return { ok: 0, e: "kunci layanan belum siap" };
    const [rooms, seats, members, pengikut, poinLama] = await Promise.all([
      cfgRtdbSa(env, "roomsPub"),
      cfgRtdbSa(env, "seats"),
      cfgRtdbSa(env, "members"),
      cfgRtdbSa(env, "roomFollowers"),
      cfgRtdbSa(env, "roomPoin"),
    ]);
    const { hari, bulan } = kunciTanggalWib();
    let roomDiproses = 0;
    for (const roomId of Object.keys(rooms || {})) {
      try {
        const seatMap = (seats || {})[roomId] || {};
        const mem = (members || {})[roomId] || {};
        const anggotaRoom = (pengikut || {})[roomId] || {};
        const lama = (poinLama || {})[roomId] || {};
        const menitHari = (lama.menit || {})[hari] || {};
        const aktifHari = (lama.aktif || {})[hari] || {};
        const ubah = {};
        const sumbang = {};
        let tambah = 0;

        const beri = (uid, jenis, menitLama, nilai) => {
          if (menitLama >= MENIT_MAKS_PER_HARI) return 0;
          ubah[jenis + "/" + hari + "/" + uid] = menitLama + 1;
          sumbang[uid] = (sumbang[uid] || 0) + nilai;
          return nilai;
        };

        // Naik mic: hanya user yang duduk di kursi dan masih ada di room.
        for (const kursi of Object.values(seatMap)) {
          const uid = kursi && kursi.uid;
          if (!uid || !mem[uid]) continue;
          const nilai = anggotaRoom[uid] ? POIN_NAIK_MIC.anggota : POIN_NAIK_MIC.biasa;
          tambah += beri(uid, "menit", Number(menitHari[uid] || 0), nilai);
        }
        // Kamar aktif: semua yang ada di room.
        for (const uid of Object.keys(mem)) {
          const nilai = anggotaRoom[uid] ? POIN_KAMAR_AKTIF.anggota : POIN_KAMAR_AKTIF.biasa;
          tambah += beri(uid, "aktif", Number(aktifHari[uid] || 0), nilai);
        }
        if (tambah <= 0) continue;

        // Penambahan ATOMIK di sisi database ({".sv":{"increment":n}}), bukan
        // baca lalu tulis ulang. Cara lama bisa menimpa tambahan poin dari
        // aplikasi (gift) dengan angka yang lebih kecil, sehingga level kamar
        // seperti kembali ke awal. Poin kamar hanya boleh bertambah.
        const naik = (n) => ({ ".sv": { increment: n } });
        ubah.total = naik(tambah);
        ubah["harian/" + hari] = naik(tambah);
        ubah["bulanan/" + bulan] = naik(tambah);
        for (const [uid, nilai] of Object.entries(sumbang)) {
          ubah["anggota/" + uid] = naik(nilai);
        }
        await patchRtdbSa(env, "roomPoin/" + roomId, ubah);
        roomDiproses++;
      } catch (e) {
        // Satu room gagal tidak boleh menghentikan room lain.
      }
    }
    return { ok: 1, room: roomDiproses };
  } catch (e) {
    return { ok: 0, e: String(e?.message || "gagal") };
  }
}

async function rewardCfg(env) {
  const d = (await cfgRtdbSa(env, "rewardRoom/cfg")) || {};
  const mentah = Array.isArray(d.tiers) ? d.tiers : [];
  const tiers = (mentah.length ? mentah : TIER_BAWAAN)
    .map((t) => ({
      aliran: Math.max(0, Math.trunc(Number(t.aliran) || 0)),
      pemilik: Math.max(0, Math.trunc(Number(t.pemilik) || 0)),
      top: Math.max(1, Math.min(15, Math.trunc(Number(t.top) || 1))),
      perOrang: Math.max(0, Math.trunc(Number(t.perOrang) || 0)),
    }))
    .sort((a, b) => a.aliran - b.aliran);
  return {
    aktif: d.aktif === false || d.aktif === 0 ? false : true,
    banner: String(d.banner || ""),
    ikon: String(d.ikon || ""),
    aturan: String(d.aturan || ATURAN_BAWAAN),
    tiers,
  };
}

async function siapReward(env) {
  await pipe(env, [
    { sql: `create table if not exists reward_bagi (
              periode text primary key, at integer, total integer, pemenang integer
            )` },
  ]);
}

/** Hitung aliran koin per room dan pemenangnya (tanpa membayar). */
async function hitungReward(env, periode, cfg) {
  const r = await pipe(env, [
    {
      sql: `select room_id, uid, sum(amount) as v from money_tx
            where kind = 'gift' and room_id is not null and room_id <> ''
              and created_at >= ? and created_at < ?
            group by room_id, uid`,
      args: [I(periode.mulai), I(periode.selesai)],
    },
  ]);
  const per = new Map();
  for (const row of r[0].rows) {
    const rid = String(row.room_id || "");
    if (!rid) continue;
    const v = Math.max(0, Math.trunc(Number(row.v) || 0));
    if (v <= 0) continue;
    let e = per.get(rid);
    if (!e) { e = { roomId: rid, total: 0, users: new Map() }; per.set(rid, e); }
    e.total += v;
    e.users.set(String(row.uid), (e.users.get(String(row.uid)) || 0) + v);
  }
  // roomsPub dibaca sekali per menit: halaman reward sering dibuka, sedangkan
  // simpul ini berisi semua room (berat kalau dibaca tiap permintaan).
  const kiniCache = Date.now();
  if (!globalThis.__vizaRoomsCache || kiniCache - globalThis.__vizaRoomsCache.at > 60000) {
    globalThis.__vizaRoomsCache = { at: kiniCache, data: (await cfgRtdbSa(env, "roomsPub")) || {} };
  }
  const roomsPub = globalThis.__vizaRoomsCache.data || {};
  const tiers = cfg.tiers;
  const rooms = [];
  for (const e of per.values()) {
    const info = roomsPub[e.roomId] || {};
    let idx = -1;
    for (let i = 0; i < tiers.length; i++) if (e.total >= tiers[i].aliran) idx = i;
    const tier = idx >= 0 ? tiers[idx] : null;
    const daftar = [...e.users.entries()]
      .map(([uid, coin]) => ({ uid, coin }))
      .sort((a, b) => b.coin - a.coin);
    rooms.push({
      roomId: e.roomId,
      nama: String(info.name || info.nama || "Room"),
      ownerUid: String(info.ownerUid || info.owner || ""),
      aliran: e.total,
      level: idx + 1,
      tier,
      kontributor: tier ? daftar.slice(0, tier.top) : [],
      semuaKontributor: daftar.slice(0, 15),
    });
  }
  rooms.sort((a, b) => b.aliran - a.aliran);
  return rooms;
}

/** Nama tampilan user dari RTDB pub/{uid}/name. */
async function namaUser(env, uid) {
  const n = await bacaRtdbNilai(env, `pub/${uid}/name`);
  return typeof n === "string" && n.trim() ? n.trim() : String(uid).slice(0, 8);
}

/** Pesan resmi di chat Customer Service milik pemenang. */
async function kabarCs(env, uid, teks) {
  try {
    let cs = await bacaRtdbNilai(env, "_cs/uid");
    if (typeof cs !== "string" || !cs.trim()) cs = await bacaRtdbNilai(env, "_owner/uid");
    if (typeof cs !== "string" || !cs.trim() || cs === uid) return false;
    const id = [String(uid), String(cs)].sort().join("_");
    const now = Date.now();
    await patchRtdbSa(env, `chats/${id}/messages/${now}${Math.floor(Math.random() * 1000)}`, {
      from: String(cs), text: String(teks).slice(0, 500), at: now,
    });
    await patchRtdbSa(env, `chats/${id}`, {
      members: { [String(uid)]: true, [String(cs)]: true },
      names: { [String(uid)]: await namaUser(env, uid), [String(cs)]: "Customer Service" },
      lastText: String(teks).slice(0, 500), lastAt: now,
    });
    await patchRtdbSa(env, `chatsByUser/${uid}/${id}`, {
      otherUid: String(cs), otherName: "Customer Service", otherId: "100001",
      lastText: String(teks).slice(0, 500), lastAt: now, lastFrom: String(cs),
    });
    await patchRtdbSa(env, `chatsByUser/${cs}/${id}`, {
      otherUid: String(uid), otherName: await namaUser(env, uid), otherId: "",
      lastText: String(teks).slice(0, 500), lastAt: now, lastFrom: String(cs),
    });
    return true;
  } catch { return false; }
}

/** Bagikan hadiah satu periode, sekali saja. */
async function bagikanReward(env, periode, paksa = false) {
  await siapReward(env);
  const sudah = await pipe(env, [{ sql: "select periode from reward_bagi where periode = ?", args: [T(periode.key)] }]);
  if (sudah[0].rows.length) return { ok: 1, sudah: 1, key: periode.key };
  const cfg = await rewardCfg(env);
  if (!cfg.aktif && !paksa) return { ok: 1, mati: 1, key: periode.key };
  const rooms = await hitungReward(env, periode, cfg);
  // Satu hadiah per user: ambil nilai terbesar (level tertinggi).
  const hadiah = new Map();
  const tambah = (uid, coin, pos, room, level, jenis) => {
    if (!uid || coin <= 0) return;
    const lama = hadiah.get(uid);
    if (lama && lama.coin >= coin) return;
    hadiah.set(uid, { uid, coin, pos, room, level, jenis });
  };
  for (const rm of rooms) {
    if (!rm.tier) continue;
    tambah(rm.ownerUid, rm.tier.pemilik, "Pemilik kamar", rm.nama, rm.level, "pemilik");
    rm.kontributor.forEach((k, i) => {
      tambah(k.uid, rm.tier.perOrang, `Top ${i + 1} kontributor`, rm.nama, rm.level, "kontributor");
    });
  }
  let total = 0;
  const pemenang = [];
  for (const h of hadiah.values()) {
    total += h.coin;
    pemenang.push(h);
  }
  pemenang.sort((a, b) => b.coin - a.coin);
  for (const h of pemenang) {
    await beriCoin(env, h.uid, h.coin, "reward_room", "reward_room");
    const teks = `Hadiah Koin Banyak periode ${periode.key} sudah masuk.\n`
      + `Kamar: ${h.room}\n`
      + `Posisi: ${h.pos}\n`
      + `Tingkat: ${h.level} (aliran koin tercapai)\n`
      + `Hadiah: ${h.coin.toLocaleString("id-ID")} coin\n\n`
      + `Coin sudah ditambahkan ke dompet Anda.`;
    await kabarCs(env, h.uid, teks);
  }
  await pipe(env, [
    {
      sql: "insert into reward_bagi (periode, at, total, pemenang) values (?, ?, ?, ?)",
      args: [T(periode.key), I(Date.now()), I(total), I(pemenang.length)],
    },
  ]);
  const simpan = {
    key: periode.key,
    mulai: periode.mulai,
    selesai: periode.selesai,
    at: Date.now(),
    total,
    pemenang: [],
    rooms: rooms.slice(0, 100).map((r) => ({
      roomId: r.roomId, nama: r.nama, aliran: r.aliran, level: r.level,
    })),
  };
  const namaPemenang = [];
  for (const h of pemenang) {
    namaPemenang.push({ uid: h.uid, name: await namaUser(env, h.uid), coin: h.coin, pos: h.pos, room: h.room, level: h.level });
  }
  simpan.pemenang = namaPemenang;
  await tulisRtdbSa(env, `rewardRoom/hasil/${periode.key}`, simpan).catch(() => {});
  return { ok: 1, key: periode.key, total, pemenang: pemenang.length };
}

/** Penutupan otomatis: Senin 00:05 WIB bagikan periode yang baru berakhir. */
async function jalanReward(env) {
  if (!env || !env.FIREBASE_SA_JSON && !env.FIREBASE_SA_PATH) {
    // env tanpa kunci layanan tetap boleh: tokenLayanan membacanya dari berkas.
  }
  const cfg = await rewardCfg(env);
  if (!cfg.aktif) return;
  const kini = periodeReward();
  const batas = kini.mulai + 5 * 60000;
  if (Date.now() < batas) return;
  const lalu = { key: periodeReward(kini.mulai - 1000).key, mulai: kini.mulai - 7 * 86400000, selesai: kini.mulai };
  await bagikanReward(env, lalu).catch(() => {});
}

/** API reward room: dipakai aplikasi (info) dan panel (simpan/pemenang). */
// ---------- Banner pemenang game (Greedy King & Crazy Fruit) ----------
async function siapWinFeed(env) {
  await pipe(env, [
    {
      sql: `create table if not exists win_round (
              id integer primary key autoincrement, game text, ronde text, uid text,
              nama text, foto text, win integer, at integer
            )`,
    },
  ]);
}

/** Kirim Top 1/2/3 sebuah ronde langsung ke banner terbang (gameWinFeed).
 *  Dipakai Greedy King dan Crazy Fruit, yang menyelesaikan ronde di server dan
 *  tidak lewat submitFlow, sehingga dulu bannernya tidak pernah terkirim. */
async function kirimBannerRonde(env, namaGame, ronde, baris) {
  try {
    const kini = Date.now();
    const daftar = (baris || []).filter((x) => Number(x.win) > 0).slice(0, 3);
    const sudah = globalThis.__vizaWinKirim || (globalThis.__vizaWinKirim = new Set());
    for (let i = 0; i < daftar.length; i++) {
      const x = daftar[i];
      const pos = i + 1;
      const kunci = namaGame + "|" + ronde + "|" + x.uid + "|" + pos;
      if (sudah.has(kunci)) continue;
      sudah.add(kunci);
      await patchRtdbSa(env, `gameWinFeed/${kini}_${String(x.uid).slice(0, 12)}_${pos}`, {
        name: String(x.nama || "Player").slice(0, 24),
        av: String(x.foto || "").slice(0, 300),
        amount: Math.trunc(Number(x.win) || 0),
        game: namaGame,
        pos,
        ts: kini,
      });
    }
  } catch (e) { /* banner opsional, jangan gagalkan pembayaran */ }
}

/** Catat kemenangan ronde, lalu kirim Top 1/2/3 ke banner terbang semua user. */
async function catatMenangGame(env, { uid, nama, foto, win, game, ronde }) {
  const g = String(game || "").toLowerCase();
  const namaGame = g.includes("fruit") ? "crazyfruit" : g.includes("greedy") ? "greedy" : "";
  const v = Math.trunc(Number(win) || 0);
  if (!namaGame || v <= 0) return;
  const r = String(ronde || "").trim().slice(0, 40) || "harian";
  try {
    await siapWinFeed(env);
    await pipe(env, [
      {
        sql: "insert into win_round (game, ronde, uid, nama, foto, win, at) values (?, ?, ?, ?, ?, ?, ?)",
        args: [T(namaGame), T(r), T(uid), T(String(nama || "Player")), T(String(foto || "")), I(v), I(Date.now())],
      },
    ]);
    const hasil = await pipe(env, [
      {
        sql: `select uid, nama, foto, sum(win) as v from win_round
              where game = ? and ronde = ? group by uid order by v desc limit 3`,
        args: [T(namaGame), T(r)],
      },
    ]);
    const daftar = hasil[0].rows;
    const pos = daftar.findIndex((x) => String(x.uid) === String(uid)) + 1;
    if (pos < 1 || pos > 3) return;
    // Satu banner per pemain per posisi per ronde.
    const kunci = namaGame + "|" + r + "|" + uid + "|" + pos;
    const sudah = (globalThis.__vizaWinKirim || (globalThis.__vizaWinKirim = new Set()));
    if (sudah.has(kunci)) return;
    sudah.add(kunci);
    const ts = Date.now();
    await patchRtdbSa(env, `gameWinFeed/${ts}_${String(uid).slice(0, 12)}_${pos}`, {
      name: String(nama || "Player").slice(0, 24),
      av: String(foto || "").slice(0, 300),
      amount: v,
      game: namaGame,
      pos,
      ts,
    });
    // Bersihkan banner lama, paling sering tiap 5 menit.
    const kapan = Number(globalThis.__vizaWinBersih || 0);
    if (ts - kapan > 5 * 60 * 1000) {
      globalThis.__vizaWinBersih = ts;
      try {
        const semua = (await cfgRtdbSa(env, "gameWinFeed")) || {};
        for (const k of Object.keys(semua)) {
          const t = Number((semua[k] || {}).ts || 0);
          if (t && ts - t > 15 * 60 * 1000) await tulisRtdbSa(env, `gameWinFeed/${k}`, null);
        }
      } catch (e) { /* pembersihan opsional */ }
    }
  } catch (e) { /* banner opsional, jangan gagalkan pembayaran */ }
}

async function rewardRoomApi(env, req) {
  const b = await req.json().catch(() => ({}));
  const do_ = String(b.do || "info").toLowerCase();
  await siapReward(env).catch(() => {});
  const cfg = await rewardCfg(env);
  const sesi = b.t ? await sesiDariToken(String(b.t)) : null;
  const peran = sesi ? await bolehPanel(env, sesi) : false;

  if (do_ === "simpan" || do_ === "pemenang" || do_ === "bagikan") {
    if (!peran) return json({ ok: 0, e: "Hanya admin panel" });
  }
  if (do_ === "simpan") {
    const isi = {};
    if (b.aktif !== undefined) isi.aktif = !!Number(b.aktif);
    if (b.banner !== undefined) isi.banner = String(b.banner || "");
    if (b.ikon !== undefined) isi.ikon = String(b.ikon || "");
    if (b.aturan !== undefined) isi.aturan = String(b.aturan || "").slice(0, 2000);
    if (Array.isArray(b.tiers)) {
      isi.tiers = b.tiers.map((t) => ({
        aliran: Math.max(0, Math.trunc(Number(t.aliran) || 0)),
        pemilik: Math.max(0, Math.trunc(Number(t.pemilik) || 0)),
        top: Math.max(1, Math.min(15, Math.trunc(Number(t.top) || 1))),
        perOrang: Math.max(0, Math.trunc(Number(t.perOrang) || 0)),
      }));
    }
    const lama = (await cfgRtdbSa(env, "rewardRoom/cfg")) || {};
    await tulisRtdbSa(env, "rewardRoom/cfg", { ...lama, ...isi });
    return json({ ok: 1 });
  }
  if (do_ === "pemenang") {
    const periode = b.key ? { key: String(b.key), mulai: 0, selesai: 0 } : periodeReward();
    if (!b.key) {
      const rooms = await hitungReward(env, periode, cfg);
      return json({
        ok: 1,
        periode,
        rooms: rooms.slice(0, 100).map((r) => ({
          roomId: r.roomId, nama: r.nama, aliran: r.aliran, level: r.level,
          pemilik: r.ownerUid, tier: r.tier,
          kontributor: r.kontributor,
        })),
      });
    }
    const hsl = await bacaRtdbNilai(env, `rewardRoom/hasil/${periode.key}`);
    return json({ ok: 1, hasil: hsl || null });
  }
  if (do_ === "bagikan") {
    const p = b.key
      ? { key: String(b.key), mulai: Number(b.mulai) || 0, selesai: Number(b.selesai) || 0 }
      : periodeReward();
    if (b.key && (!p.mulai || !p.selesai)) {
      const mulai = Date.parse(String(b.key) + "T00:00:00+07:00");
      p.mulai = mulai - 7 * 86400000;
      p.selesai = mulai;
    }
    const hasil = await bagikanReward(env, p, true);
    return json({ ok: 1, hasil });
  }
  const uid = String(b.uid || "").trim();
  // mode "lalu" menampilkan data minggu sebelumnya (dihitung ulang dari
  // riwayat gift, jadi tetap ada walau hadiahnya belum pernah dibagikan).
  const kiniKey = periodeReward();
  const pakaiLalu = String(b.mode || "").toLowerCase() === "lalu";
  const periode = pakaiLalu ? periodeReward(kiniKey.mulai - 1000) : kiniKey;
  const rooms = await hitungReward(env, periode, cfg);
  const kamarSaya = [];
  for (const rm of rooms) {
    const sayaOwner = rm.ownerUid && rm.ownerUid === uid;
    const sayaKontributor = rm.semuaKontributor.some((k) => k.uid === uid);
    if (!sayaOwner && !sayaKontributor) continue;
    const posisiSaya = rm.semuaKontributor.findIndex((k) => k.uid === uid) + 1;
    kamarSaya.push({
      roomId: rm.roomId,
      nama: rm.nama,
      aliran: rm.aliran,
      level: rm.level,
      pemilik: sayaOwner,
      hadiahPemilik: rm.tier ? rm.tier.pemilik : 0,
      hadiahKontributor: rm.tier ? rm.tier.perOrang : 0,
      posisiSaya,
      dalamHadiah: posisiSaya > 0 && rm.tier ? posisiSaya <= rm.tier.top : false,
      kontributor: rm.semuaKontributor.map((k, i) => ({
        uid: k.uid, coin: k.coin,
        pos: i + 1,
        hadiah: rm.tier && i < rm.tier.top ? rm.tier.perOrang : 0,
      })),
    });
  }
  const hasilLalu = (await bacaRtdbNilai(env, `rewardRoom/hasil/${periode.key}`)) || null;
  return json({
    ok: 1,
    mode: pakaiLalu ? "lalu" : "kini",
    aktif: cfg.aktif,
    banner: cfg.banner,
    ikon: cfg.ikon,
    aturan: cfg.aturan,
    tiers: cfg.tiers,
    periode,
    kamarSaya,
    peringkat: rooms.slice(0, 100).map((r, i) => ({
      pos: i + 1, roomId: r.roomId, nama: r.nama, aliran: r.aliran, level: r.level,
    })),
    lalu: hasilLalu,
  });
}

// Penutupan otomatis berjalan di proses Node VPS (bukan di Cloudflare Worker).
if (typeof setInterval === "function" && !globalThis.__vizaRewardJam) {
  globalThis.__vizaRewardJam = setInterval(() => {
    const env = globalThis.__vizaEnv;
    if (!env) return;
    jalanReward(env).catch(() => {});
  }, 5 * 60 * 1000);
  if (typeof globalThis.__vizaRewardJam.unref === "function") globalThis.__vizaRewardJam.unref();
}

// ---------- Hadiah: coin, VIP, item VIP ----------
async function beriCoin(env, uid, coins, kind, itemId) {
  const n = Math.trunc(Number(coins) || 0);
  if (n <= 0) return 0;
  const now = Date.now();
  await pastikan(env, uid);
  // pipeTrx mengulang otomatis bila database sedang sibuk (bentrok transaksi),
  // jadi menambah coin tidak gagal hanya karena permintaan lain sedang jalan.
  await pipeTrx(env, [
    { sql: "begin immediate" },
    { sql: "update wallets set coins = coins + ?, updated_at = ? where uid = ?", args: [I(n), I(now), T(uid)] },
    {
      sql: `insert into money_tx (uid, kind, item_id, amount, created_at) values (?, ?, ?, ?, ?)`,
      args: [T(uid), T(kind), itemId == null ? null : T(String(itemId)), I(n), I(now)],
    },
    { sql: "commit" },
  ]);
  return n;
}

async function beriVip(env, uid, tier, days) {
  const t = Math.trunc(Number(tier) || 0);
  if (!(t >= 1 && t <= 9) || days <= 0) return null;
  const now = Date.now();
  const w0 = await pastikan(env, uid);
  const aktif = w0.vip >= 1 && w0.vip <= 9 && w0.vipUntil > now;
  const vuntil = (aktif ? w0.vipUntil : now) + Math.trunc(Number(days)) * 86400000;
  const inv = { ...w0.inv };
  for (let i = 1; i <= t; i++) for (const a of AWALAN_VIP) inv[`${a}${i}`] = vuntil;
  const vip = Math.max(w0.vip, t);
  const r = await pipe(env, [
    {
      sql: "update wallets set vip = ?, vip_until = ?, inv = ?, updated_at = ? where uid = ?",
      args: [I(vip), I(vip >= w0.vip ? vuntil : w0.vipUntil), T(JSON.stringify(inv)), I(now), T(uid)],
    },
    { sql: `select ${KOLOM} from wallets where uid = ?`, args: [T(uid)] },
  ]);
  return rapikan(r[1].rows[0]);
}

// ---------- Roket ----------
const slotHadiah = (node, days) => {
  if (!node || typeof node !== "object") return null;
  const coins = Math.max(0, Math.floor(Number(node.coins ?? 0)));
  const vip = Math.max(0, Math.min(9, Math.floor(Number(node.vip ?? 0))));
  if (coins <= 0 && vip <= 0) return null;
  return { coins, vip, days: vip > 0 ? days : 0 };
};

function undiLevel(cfg, lv, days) {
  const node = cfg["lv" + lv];
  if (!node || typeof node !== "object") return null;
  const isi = ["r1", "r2", "r3", "r4", "r5", "r6"]
    .map((k) => slotHadiah(node[k] ?? node[k.replace("r", "p")], days))
    .filter(Boolean);
  if (!isi.length) return null;
  return isi[Math.floor(Math.random() * isi.length)];
}

function undiAny(cfg, levels, days) {
  for (const lv of levels) {
    const p = undiLevel(cfg, lv, days);
    if (p) return p;
  }
  return null;
}

/** Catatan siapa yang melakukan reset coin/diamond, supaya kalau saldo hilang
 *  ketahuan sumbernya (panel, tombol apa, jam berapa). */
async function catatReset(env, op, oleh, target, jumlah) {
  await pipe(env, [{
    sql: "create table if not exists reset_log (id integer primary key autoincrement, op text, oleh text, target text, jumlah integer, at integer)",
  }]);
  await pipe(env, [{
    sql: "insert into reset_log (op, oleh, target, jumlah, at) values (?, ?, ?, ?, ?)",
    args: [T(op), T(oleh || ""), T(target || ""), I(jumlah || 0), I(Date.now())],
  }]);
}

/** Klaim hadiah roket: peluncur, penonton, atau papan peringkat. */
// ---------- Kartu hadiah (Props) ----------
/** Tabel kartu hadiah roket. Dibuat otomatis kalau belum ada. */
async function tabelProps(env) {
  await pipe(env, [{
    sql: "create table if not exists props (id text primary key, uid text, vip integer, days integer, src text, ts integer, used integer)",
  }]);
}
/** Simpan kartu VIP ke tas pengguna, belum aktif sampai ditekan sendiri. */
async function simpanProp(env, uid, vip, days, src) {
  await tabelProps(env);
  const id = "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
  const now = Date.now();
  await pipe(env, [{
    sql: "insert into props (id, uid, vip, days, src, ts, used) values (?, ?, ?, ?, ?, ?, 0)",
    args: [T(id), T(uid), I(vip), I(days), T(src || "rocket"), I(now)],
  }]);
  return { id: id, vip: Math.trunc(vip), days: Math.trunc(days), src: src || "rocket", ts: now };
}
/** Daftar kartu yang belum dipakai. */
async function daftarProp(env, uid) {
  await tabelProps(env);
  const r = await pipe(env, [{
    sql: "select id, vip, days, src, ts from props where uid = ? and used = 0 order by ts desc limit 100",
    args: [T(uid)],
  }]);
  return r[0].rows;
}
/** Pakai kartu: masa aktif VIP dimulai saat ini. */
async function pakaiProp(env, uid, id) {
  await tabelProps(env);
  const r = await pipe(env, [{
    sql: "select id, vip, days from props where id = ? and uid = ? and used = 0",
    args: [T(id), T(uid)],
  }]);
  const row = r[0].rows[0];
  if (!row) return gagal("Kartu tidak ditemukan atau sudah dipakai");
  const w = await beriVip(env, uid, Number(row.vip), Number(row.days));
  await pipe(env, [{ sql: "update props set used = 1 where id = ?", args: [T(id)] }]);
  return ok(w);
}

async function klaimRoket(env, uid, p) {
  const mode = String(p.mode ?? "launch");
  const cfg = await cfgRtdb("pub/_rocketCfg");
  let hadiah = null;
  if (mode === "rank") {
    const rank = Math.floor(Number(p.rank ?? 99));
    const key = rank >= 1 && rank <= 4 ? "t" + rank : "t4";
    hadiah = slotHadiah((cfg.rank ?? {})[key], 30);
    if (!hadiah) {
      if (rank === 1) hadiah = { coins: 100000000, vip: 9, days: 30 };
      else if (rank === 2) hadiah = { coins: 50000000, vip: 8, days: 30 };
      else if (rank === 3) hadiah = { coins: 10000000, vip: 5, days: 30 };
      else hadiah = { coins: 10000000, vip: 0, days: 0 };
    }
  } else if (mode === "lucky") {
    hadiah = undiAny(cfg, [1, 2, 3], 7) ?? { coins: 500000, vip: 0, days: 0 };
  } else {
    const lv = Math.max(1, Math.min(5, Math.floor(Number(p.lv ?? 5))));
    hadiah = undiLevel(cfg, lv, 30) ?? undiAny(cfg, [5, 4, 3, 2, 1], 30) ?? { coins: 10000000, vip: 0, days: 0 };
  }
  await beriCoin(env, uid, hadiah.coins, "rocket", null);
  // Kartu VIP tidak langsung aktif: disimpan ke Props supaya pengguna sendiri
  // yang memilih kapan memakainya. Coin tetap masuk otomatis.
  let kartu = null;
  if (hadiah.vip > 0 && hadiah.days > 0) {
    if (p.hold) kartu = await simpanProp(env, uid, hadiah.vip, hadiah.days, "rocket");
    else await beriVip(env, uid, hadiah.vip, hadiah.days);
  }
  const w = await pastikan(env, uid);
  return json({ ok: 1, coins: hadiah.coins, vip: hadiah.vip, days: hadiah.days, card: kartu, w, img: "", eff: "", badge: "" });
}

// ---------- Cashback gift ----------
const CB_LADDER = [10000, 9000, 8000, 6000, 4000, 3000, 2000, 1000, 888, 666, 500, 400, 300, 200, 100, 88, 66, 50, 30, 20, 10];

/** Bulatkan ke 2 angka penting (mis. 200.000.000 tetap, 173.456 -> 170.000). */
function bulat2(v) {
  if (!(v > 0)) return 0;
  const p = Math.pow(10, Math.max(0, Math.floor(Math.log10(v)) - 1));
  return Math.round(v / p) * p;
}

/**
 * Pecah total cashback menjadi beberapa angka yang JUMLAHNYA TEPAT sama dengan
 * total (mis. 100.000 x 10.000 = 1.000.000.000). Maksimal 5 pecahan supaya
 * animasinya ringan. Bagian terakhir menutup selisih pembulatan.
 */
function pecahCashback(total) {
  const n = Math.floor(total);
  if (!(n > 0)) return [];
  if (n <= 50000) {
    // Total kecil tetap memakai angka cantik yang tersedia di aplikasi.
    const out = [];
    let sisa = n, jaga = 0;
    while (sisa >= 10 && out.length < 5 && jaga++ < 16) {
      const v = CB_LADDER.find((x) => x <= sisa);
      if (!v) break;
      out.push(v);
      sisa -= v;
    }
    if (sisa > 0 && out.length) out[out.length - 1] += sisa;
    return out;
  }
  const jumlah = n >= 100000000 ? 3 : 5;
  const out = [];
  let sisa = n;
  for (let i = 0; i < jumlah - 1; i++) {
    const v = Math.max(10, bulat2(Math.floor(sisa / (jumlah - i))));
    out.push(v);
    sisa -= v;
  }
  out.push(sisa);
  return out.filter((v) => v > 0);
}

function undiBaris(rows) {
  const total = rows.reduce((a, b) => a + b.w, 0);
  if (total <= 0) return rows[rows.length - 1];
  let x = Math.random() * total;
  for (const r of rows) {
    x -= r.w;
    if (x <= 0) return r;
  }
  return rows[rows.length - 1];
}

function barisTier(cfg, value) {
  let best = [], minBest = -1;
  for (const k of ["t1", "t2", "t3", "t4"]) {
    const node = cfg[k];
    if (!node || typeof node !== "object") continue;
    const min = Math.floor(Number(node.min ?? 0));
    const rows = (Array.isArray(node.rows) ? node.rows : [])
      .map((r) => ({ v: Math.max(0, Number(r?.v ?? 0)), w: Math.max(0, Number(r?.w ?? 0)) }))
      .filter((r) => r.w > 0);
    if (!rows.length) continue;
    if (value >= min && min >= minBest) { best = rows; minBest = min; }
  }
  return best.length ? best : [{ v: 0, w: 100 }];
}

/** Undian cashback: pengirim dapat pengali, penerima dapat persen bonus. */
// Nilai cadangan kalau pengaturan panel tidak terbaca (mis. aturan database
// menolak akses tanpa login). Tanpa ini pengali jadi 0 dan pecahan cashback
// tidak pernah muncul di layar.
const CB_DEFAULT = {
  on: true,
  t1: { min: 0, rows: [{ v: 10, w: 5 }, { v: 0.5, w: 25 }, { v: 0.1, w: 40 }, { v: 0, w: 30 }] },
  recvPct: 5,
  jpMin: 1000,
};

/**
 * Undian cashback gaya contoh: Math.random() * 100 lalu bercabang.
 *   0..5    -> jackpot 10x lipat
 *   5..30   -> cashback 50%
 *   30..70  -> cashback 10%
 *   70..100 -> tidak dapat cashback
 * Peluang dan pengali bisa diubah dari panel (_cashbackCfg: jpPct, p50Pct,
 * p10Pct, jpX, x50, x10). Kalau panel masih memakai tabel tier (t1..t4),
 * tabel itu yang dipakai supaya pengaturan lama tetap jalan.
 */
function undiKaskade(cfg) {
  const node = cfg || {};
  const adaTier = ["t1", "t2", "t3", "t4"].some((k) => typeof node[k] === "object" && node[k]);
  if (adaTier) return undiBaris(barisTier(node, Infinity));
  const jpPct = Math.max(0, Math.min(100, Number(node.jpPct ?? 5)));
  const p50 = Math.max(0, Math.min(100, Number(node.p50Pct ?? 25)));
  const p10 = Math.max(0, Math.min(100, Number(node.p10Pct ?? 40)));
  const jpX = Math.max(1, Math.min(500, Number(node.jpX ?? 10)));
  const x50 = Math.max(0, Math.min(10, Number(node.x50 ?? 0.5)));
  const x10 = Math.max(0, Math.min(10, Number(node.x10 ?? 0.1)));
  const acak = Math.random() * 100; // 0 - 100%
  if (acak <= jpPct) return { v: jpX, w: jpPct };
  if (acak <= jpPct + p50) return { v: x50, w: p50 };
  if (acak <= jpPct + p50 + p10) return { v: x10, w: p10 };
  return { v: 0, w: Math.max(0, 100 - jpPct - p50 - p10) };
}

// ===== Cashback gift: disamakan dengan contoh (Math.random bercabang) =====
// Aturan undian persis seperti contoh yang dikirim pemilik:
//   0 - 5%   -> jackpot 10x harga gift
//   5 - 30%  -> cashback 50% harga gift
//   30 - 70% -> cashback 10% harga gift
//   70 - 100% -> tidak dapat cashback
// Penerima gift dapat 70% dari harga gift; 30% sisanya untuk platform.
// Pengali hasilnya acak (match random), bisa keluar 1000x, 100x, 50x, dan
// seterusnya. Peluang tiap pengali diatur dari panel: "pengali:bobot".
// Bawaan kalau panel belum diisi: 1000x jarang sekali, makin kecil makin sering,
// dan sebagian besar hasilnya ZONK.
// ===== Cashback gift: nominal tetap (sesuai contoh pemilik) =====
// Dua lapis acak seperti contoh: Math.random() memilih kelompok dulu, lalu
// nominal diundi RATA di dalam rentang kelompok itu. Nominal TIDAK dikali harga
// gift, jadi gift 1.000 dan gift 1.000.000 bisa dapat cashback yang sama.
// Bawaan: 70% -> 1.000-5.000 | 25% -> 10.000-20.000 | 5% -> 50.000 (jackpot).
// Semua angka diubah dari panel: pub/_cashbackCfg -> tiers.
const CASHBACK_BAWAAN = [
  { p: 70, min: 1000, max: 5000 },
  { p: 25, min: 10000, max: 20000 },
  { p: 5, min: 50000, max: 50000 },
];
const PLATFORM_FEE_PCT = 30;

/** Kelompok cashback dari panel; kalau panel kosong pakai bawaan di atas. */
function tierCashback(cfg) {
  const sumber = Array.isArray(cfg?.tiers) ? cfg.tiers : [];
  const bersih = sumber
    .map((r) => ({
      p: Math.max(0, Number(r?.p ?? 0)),
      min: Math.max(0, Math.floor(Number(r?.min ?? 0))),
      max: Math.max(0, Math.floor(Number(r?.max ?? 0))),
    }))
    .filter((r) => r.p > 0 && r.max > 0 && r.max >= r.min);
  return bersih.length ? bersih : CASHBACK_BAWAAN;
}

// ===== Cashback model PERSEN (pengali x harga gift) =====
// Sesuai contoh pemilik: hadiah = harga gift x pengali, jadi gift 100.000 dan
// gift 1.000.000 otomatis ikut skala. Bobot menentukan seberapa sering tiap
// pengali muncul. Bawaan di bawah sudah disimulasikan: cashback rata-rata
// sekitar 21% dari harga gift, peluang 5x ke atas ~1,3%, JP 10x ~0,3%.
const PERSEN_BAWAAN = [
  { m: 0, w: 54 },
  { m: 0.1, w: 28 },
  { m: 0.5, w: 13 },
  { m: 1, w: 3.6 },
  { m: 5, w: 1.1 },
  { m: 10, w: 0.2 },
  // Jackpot betulan: 100x harga gift, kira-kira 1 tiap 5.000 kiriman.
  { m: 100, w: 0.02 },
];

/** Tingkatan persen dari panel: [{m: pengali, w: bobot}] -> bersih & terurut. */
function tierPersen(cfg) {
  const sumber = Array.isArray(cfg?.tiersPersen) ? cfg.tiersPersen : [];
  const bersih = sumber
    .map((r) => ({
      m: Math.max(0, Math.min(2000, Number(r?.m ?? 0))),
      w: Math.max(0, Number(r?.w ?? 0)),
    }))
    .filter((r) => r.w > 0)
    .sort((a, b) => a.m - b.m);
  return bersih.length ? bersih : PERSEN_BAWAAN;
}

// Pengali JP menurut JUMLAH kirim. Kiriman kecil boleh pecah besar
// (10x-1000x), kiriman besar dibatasi supaya nilainya tidak meledak.
// Pemilik minta: kirim x10 sering 1000x/500x/100x, kirim x520 cuma 10x-20x.
const JP_KELOMPOK_BAWAAN = [
  {
    // Kirim 1 buah tidak boleh pecah besar: modalnya cuma 1 gift, kalau dapat
    // 1000x platform nombok 1000 kali lipat.
    max: 1,
    tiers: [
      { m: 0.1, w: 30 },
      { m: 0.2, w: 25 },
      { m: 0.5, w: 20 },
      { m: 1, w: 15 },
      { m: 2, w: 8 },
      { m: 5, w: 2 },
    ],
  },
  {
    // Kirim 2-5 buah: masih kecil, maksimal 20x.
    max: 5,
    tiers: [
      { m: 0.5, w: 25 },
      { m: 1, w: 30 },
      { m: 2, w: 20 },
      { m: 5, w: 15 },
      { m: 10, w: 7 },
      { m: 20, w: 3 },
    ],
  },
  {
    max: 20,
    tiers: [
      { m: 10, w: 40 },
      { m: 20, w: 25 },
      { m: 50, w: 18 },
      { m: 100, w: 11 },
      { m: 500, w: 5 },
      { m: 1000, w: 1 },
    ],
  },
  {
    max: 100,
    tiers: [
      { m: 1, w: 40 },
      { m: 5, w: 25 },
      { m: 10, w: 18 },
      { m: 20, w: 11 },
      { m: 50, w: 5 },
      { m: 100, w: 0.9 },
      // Match random: 100x ke atas tetap bisa pecah besar, walau jarang.
      { m: 500, w: 0.08 },
      { m: 1000, w: 0.02 },
    ],
  },
  {
    max: 999,
    tiers: [
      { m: 0.5, w: 45 },
      { m: 1, w: 25 },
      { m: 5, w: 15 },
      { m: 10, w: 9 },
      { m: 20, w: 5.5 },
      { m: 50, w: 0.5 },
      // Kiriman besar pun masih bisa match 100x ke atas, sangat jarang.
      { m: 100, w: 0.1 },
      { m: 500, w: 0.01 },
      { m: 1000, w: 0.002 },
    ],
  },
];

// Peluang JP gaya "1 dari berapa kiriman" (kurva pemilik):
// x3 1:10, x5 1:15, x10 1:25, x20 1:40, x50 1:100, x100 1:150,
// x200 1:300, x500 1:700, x1000 1:1799.
// Versi aman: kirim 10 sekaligus diundi 10 kali, jadi peluangnya dibuat jauh
// lebih jarang supaya rata-rata hadiah tetap di bawah modal.
// Pengali diundi acak dari 1x, 3x, 5x, 10x (peluang sama besar).
// Cashback dasar tetap 1-20% dari nilai gift, lalu dikali pengali yang keluar.
const KURVA_BAWAAN = [
  [1, 4], [3, 4], [5, 4], [10, 4],
];

/** Tabel kurva dari panel: [{m: pengali, n: 1 dari berapa}] */
function tierKurva(cfg) {
  const sumber = Array.isArray(cfg?.jpKurva) ? cfg.jpKurva : [];
  const rows = sumber
    .map((r) => ({
      m: Math.max(0, Math.min(5000, Number(r?.m ?? 0))),
      n: Math.max(1, Math.min(1_000_000, Number(r?.n ?? 0))),
    }))
    .filter((r) => r.m > 0 && r.n > 0)
    .sort((a, b) => a.m - b.m);
  if (rows.length) return rows;
  return KURVA_BAWAAN.map(([m, n]) => ({ m, n }));
}

/** Peluang satu pengali menurut kurva: 1 dibagi N. */
function peluangKurva(rows, m) {
  const tepat = rows.find((r) => r.m === m);
  if (tepat) return 1 / tepat.n;
  // Di antara dua titik: interpolasi log-log supaya kurvanya halus.
  let bawah = null; let atas = null;
  for (const r of rows) {
    if (r.m < m) bawah = r;
    else if (r.m > m && !atas) atas = r;
  }
  if (!bawah || !atas) {
    const dasar = bawah || atas;
    if (!dasar) return 0;
    const b = 0.894; // kemiringan kurva: N ~ m^0.894
    const n = Math.max(1, Math.round(dasar.n * Math.pow(m / dasar.m, b)));
    return 1 / n;
  }
  const t = (Math.log(m) - Math.log(bawah.m)) / (Math.log(atas.m) - Math.log(bawah.m));
  const n = Math.exp(Math.log(bawah.n) + t * (Math.log(atas.n) - Math.log(bawah.n)));
  return 1 / Math.max(1, n);
}

/** Undian memakai kurva 1:N. Sisa peluang = zonk. */
function undiKurva(cfg, count) {
  const rows = tierKurva(cfg);
  // Kalau pemilik mengisi "kurvaKali": jumlah kirim ikut menggeser peluang
  // (kiriman kecil lebih sering dapat), bawaannya mati: satu kurva untuk semua.
  const geser = Math.max(0.1, Number(cfg?.kurvaGeser ?? 1));
  const bobot = rows.map((r) => {
    const p = peluangKurva(rows, r.m);
    const p2 = Number(count) > 1 ? p * Math.pow(Number(count), geser - 1) : p;
    return { m: r.m, w: Math.min(100, p2 * 100) };
  });
  const total = bobot.reduce((a, b) => a + b.w, 0);
  let acak = Math.random() * 100;
  // Peluang dapat sesuatu tetap mengikuti kurva (1:N). Bedanya cuma cara
  // memilih pengalinya:
  // - "acak" (bawaan): sekali klik bisa langsung x10 atau x1000, karena
  //   pengali diundi rata dari daftar kurva.
  // - "kurva": pengali besar makin jarang sesuai 1:N.
  const mode = String(cfg?.kurvaMode || "acak").toLowerCase();
  if (acak >= total) return { mult: 0, zonk: 1, kelompok: -1 };
  if (mode === "acak") {
    const i = Math.floor(Math.random() * bobot.length);
    return { mult: bobot[i].m, kelompok: i };
  }
  for (let i = 0; i < bobot.length; i++) {
    acak -= bobot[i].w;
    if (acak <= 0) return { mult: bobot[i].m, kelompok: i };
  }
  return { mult: 0, zonk: 1, kelompok: -1 };
}

/** Kelompok pengali yang berlaku untuk jumlah kirim tertentu. */
function tierMenurutJumlah(cfg, count) {
  const sumber = Array.isArray(cfg?.tiersJumlah) ? cfg.tiersJumlah : [];
  const pakai = sumber.length ? sumber : JP_KELOMPOK_BAWAAN;
  const n = Math.max(1, Math.floor(Number(count) || 1));
  for (const g of pakai) {
    const batas = Math.max(1, Math.floor(Number(g?.max ?? 0)));
    if (n <= batas) {
      const rows = (Array.isArray(g?.tiers) ? g.tiers : [])
        .map((r) => ({ m: Math.max(0, Number(r?.m ?? 0)), w: Math.max(0, Number(r?.w ?? 0)) }))
        .filter((r) => r.w > 0)
        .sort((a, b) => a.m - b.m);
      if (rows.length) return rows;
    }
  }
  return tierPersen(cfg);
}

/** Undian berbobot: satu angka acak memilih pengali. */
function undiPersen(cfg, count) {
  const tier = tierMenurutJumlah(cfg, count);
  const total = tier.reduce((a, b) => a + b.w, 0);
  if (!(total > 0)) return { mult: 0, kelompok: -1 };
  let acak = Math.random() * total;
  let pilih = tier.length - 1;
  for (let i = 0; i < tier.length; i++) {
    acak -= tier[i].w;
    if (acak <= 0) { pilih = i; break; }
  }
  const t = tier[pilih];
  // Pengali 100x ke atas: bisa ZONK atau bisa pecah besar. Peluang zonknya
  // diatur pemilik lewat "zonkJpPct" (bawaan 50%).
  if (t.m >= 100) {
    const pz = Math.max(0, Math.min(100, Number(cfg?.zonkJpPct ?? 50)));
    if (pz > 0 && Math.random() * 100 < pz) {
      return { mult: 0, kelompok: pilih, zonk: 1, target: t.m };
    }
  }
  return { mult: t.m, kelompok: pilih };
}

/**
 * Peluang dapat cashback menurut JUMLAH yang dikirim dalam satu kali kirim.
 * Contoh panel: 1:70 lalu 520:78 berarti kirim 1-519 dapat peluang 70%, dan
 * kirim 520 ke atas dapat peluang 78%. Sisanya zonk (tidak dapat cashback).
 * Kalau panel kosong, semua jumlah dapat 100% (selalu dapat).
 */
function peluangMenurutJumlah(cfg, jumlah) {
  const sumber = Array.isArray(cfg?.boostJumlah) ? cfg.boostJumlah : [];
  const baris = sumber
    .map((r) => ({
      min: Math.max(0, Math.floor(Number(r?.min ?? 0))),
      p: Math.max(0, Math.min(100, Number(r?.p ?? 0))),
    }))
    .filter((r) => r.p > 0)
    .sort((x, y) => x.min - y.min);
  // Kirim banyak tidak boleh zonk: mulai jumlah tertentu peluang dipaksa 100%.
  // Zonk jarang: peluang zonk kecil diatur dari panel (bawaan 8%).
  const zonkPct = Math.max(0, Math.min(90, Math.floor(Number(cfg?.zonkPct ?? 8))));
  const kena = baris.filter((r) => jumlah >= r.min);
  const dasar = kena.length ? kena[kena.length - 1].p : 100;
  // Angka 100% berarti "sisa setelah zonk", jadi tetap ada peluang zonk tipis.
  return dasar >= 100 ? Math.max(1, 100 - zonkPct) : dasar;
}

/** Undian: satu angka acak memilih kelompok, lalu nominal diundi rata di kelompok. */
function undiCashback(cfg, jumlah = 1) {
  const tier = tierCashback(cfg);
  const total = tier.reduce((a, b) => a + b.p, 0);
  if (!(total > 0)) return { nominal: 0, jackpot: 0, kelompok: -1 };
  // Lapis pertama: apakah kena cashback atau zonk (peluang per jumlah kirim).
  const peluang = peluangMenurutJumlah(cfg, jumlah);
  if (Math.random() * 100 >= peluang) {
    return { nominal: 0, jackpot: 0, kelompok: -1, zonk: 1, peluang };
  }
  // Lapis kedua: kelompok nominal, proporsional terhadap persen di panel.
  let acak = Math.random() * total;
  let pilih = tier.length - 1;
  for (let i = 0; i < tier.length; i++) {
    acak -= tier[i].p;
    if (acak <= 0) { pilih = i; break; }
  }
  const t = tier[pilih];
  const nominal = t.min + Math.floor(Math.random() * (t.max - t.min + 1));
  return { nominal, jackpot: pilih === tier.length - 1 ? 1 : 0, kelompok: pilih, zonk: 0, peluang };
}

async function cashbackGift(env, uid, p) {
  let cfg = await cfgRtdb("pub/_cashbackCfg");
  if (!cfg || typeof cfg !== "object") cfg = {};
  if (cfg.on === false) return json({ ok: 1, amount: 0, off: 1 });

  const price = Math.max(0, Math.floor(Number(p.price ?? 0)));
  const count = Math.max(1, Math.min(999, Math.floor(Number(p.count ?? 1))));
  const nilai = price * count;
  if (nilai <= 0) return gagal("Nilai gift tidak valid");

  // Undian cashback untuk pengirim gift.
  // Aturan pemilik: kalau ZONK harga gift terpotong penuh 100%. Kalau dapat,
  // harga gift TIDAK terpotong (dikembalikan) lalu ditambah keuntungan sesuai
  // pengali. Jadi 100.000 kena 10x: saldo kembali 100.000 dan dapat +1.000.000.
  // Nominal tetap: tidak dikali harga gift, dan harga gift tetap terpakai
  // (tidak dikembalikan seperti model pengali sebelumnya).
  // Nominal cashback DIKALI jumlah kirim: kirim 1 buah dapat nominal dasar,
  // kirim 520 buah dapat 520x nominal dasar (sesuai permintaan pemilik).
  // Batas atas: cashback tidak boleh melebihi nilai gift (harga x jumlah).
  // Bawaannya 106% dari nilai, jadi kirim 52.000.000 paling besar dapat 55.120.000.
  // Nominal di atas batas dipotong ke batas, jadi angka raksasa (miliaran) hilang.
  // Dua model: "persen" (hadiah = harga gift x pengali) dan "nominal tetap"
  // (rentang nominal, tidak ikut harga gift). Bawaannya persen.
  const persenAktif = cfg?.modePersen !== false;
  // Batas atas: model persen butuh batas longgar supaya 10x benar-benar utuh
  // (bawaan 12.000% = 120x nilai gift) supaya JP 100x benar-benar utuh.
  // Model nominal tetap dibatasi 50-300%.
  // Batas tidak boleh lebih kecil dari tingkatan tertinggi. Kalau ada tingkatan
  // x188 tetapi batas diset 50x, hadiahnya terpotong dan pemain merasa rugi
  // walau pengali yang keluar x188. Jadi batas ikut naik sendiri.
  const pengaliTertinggi = persenAktif
    ? Math.max(
        tierMenurutJumlah(cfg, count).reduce((a, t) => Math.max(a, t.m), 0),
        tierKurva(cfg).reduce((a, t) => Math.max(a, t.m), 0),
      )
    : 0;
  const capPct = persenAktif
    ? Math.max(
        100,
        Math.min(100000, Number(cfg?.capPct ?? 12000)),
        Math.min(100000, Math.ceil(pengaliTertinggi * 100)),
      )
    : Math.max(50, Math.min(300, Number(cfg?.capPctTetap ?? cfg?.capPct ?? 106)));
  const batas = Math.floor((nilai * capPct) / 100);
  let untung = 0;
  let undian = { jackpot: 0, kelompok: -1, peluang: 100, mult: 0 };
  let jpZonk = 0;
  let multMaks = 0;
  let zonkMaks = 0;
  let kelompokTerakhir = -1;
  if (persenAktif) {
    // Satu undian per kiriman, lalu dikali jumlah kirim. Kirim 5 buah = 5x
    // hadiah, tetapi tidak diundi lima kali (biar combo besar tidak "rata").
    // Satu kiriman = satu undian, berapa pun jumlahnya. Kalau tiap gift
    // diundi sendiri, kirim 10 jadi 10 undian: dasar 1-20% dibayar 10 kali
    // (>105% nilai gift) dan peluang JP naik jadi ~95%, itu sebabnya kiriman
    // banyak selalu pecah besar.
    const u = cfg?.kurvaAktif === false ? undiPersen(cfg, count) : undiKurva(cfg, count);
    kelompokTerakhir = u.kelompok;
    const nilai = price * count;
    const minPct = Math.max(0, Math.min(100, Number(cfg?.cbMinPct ?? 1)));
    const maxPct = Math.max(minPct, Math.min(100, Number(cfg?.cbMaxPct ?? 20)));
    const dasarPct = minPct + Math.random() * (maxPct - minPct);
    const kaliJp = u.zonk ? 1 : u.mult;
    const untungKasar = nilai * (dasarPct / 100) * kaliJp;
    untung = Math.max(0, Math.min(batas, Math.floor(untungKasar)));
    multMaks = !u.zonk && u.mult > 1 ? u.mult : 0;
    zonkMaks = multMaks ? 0 : 1;
    jpZonk = 0;
    undian = { jackpot: multMaks >= 5 ? 1 : 0, kelompok: kelompokTerakhir, peluang: 100, mult: multMaks };
  } else {
    const u = undiCashback(cfg, count);
    untung = Math.max(0, Math.min(batas, Math.floor(u.nominal * count)));
    undian = { jackpot: u.jackpot, kelompok: u.kelompok, peluang: u.peluang, mult: 0 };
  }
  // Aturan pemilik: yang ZONK harga gift-nya hangus. Yang DAPAT, harga gift
  // dikembalikan utuh lalu ditambah keuntungan sesuai pengali. Jadi gift
  // 100.000 kena 0,5x: saldo kembali 100.000 dan ditambah 50.000.
  // Berapa persen harga gift yang dikembalikan saat menang (panel). Bawaan
  // 100%: harga gift utuh, jadi yang zonk saja yang benar-benar hangus.
  // Di model kurva (dasar 1-20% x JP), harga gift TIDAK dikembalikan: yang
  // dibayar hanya persen cashback-nya. Kalau harga dikembalikan juga, total
  // keluar jadi 100% + 56% dan platform nombok.
  const kembaliPct = cfg?.kurvaAktif === false
    ? Math.max(0, Math.min(100, Number(cfg?.kembaliPct ?? 100)))
    : 0;
  // Kiriman besar (combo) tidak boleh zonk: mulai jumlah tertentu di panel,
  // undian zonk dianggap batal dan harga gift dikembalikan. Kirim 188 atau 520
  // buah jadi tidak bisa hangus 188x / 520x harga gift sekaligus.
  const bebasZonkMulai = Math.max(
    2,
    Math.min(999, Math.floor(Number(cfg?.bebasZonkMulai ?? 100))),
  );
  const zonkBatal = persenAktif && !jpZonk && count >= bebasZonkMulai && !(untung > 0);
  const kembali = untung > 0 || zonkBatal ? Math.floor((nilai * kembaliPct) / 100) : 0;
  const kredit = kembali + untung;
  const parts = kredit > 0 ? [kredit] : [];
  const amount = await beriCoin(env, uid, kredit, "cashback", null);

  // Penerima gift langsung dapat coin 70% dari harga gift (angka diatur dari
  // panel: "Bagian penerima gift (%)"). Sisanya untuk platform.
  const recvPct = Math.max(0, Math.min(100, Number(cfg.recvPct ?? (100 - PLATFORM_FEE_PCT))));
  const to = String(p.to ?? "").trim();
  // Bagian penerima dihitung per satu penerima saja. Waktu gift dikirim ke
  // beberapa orang, jumlah pada "count" sudah dikali jumlah penerima, jadi
  // dipakai countTo (jumlah per penerima) supaya hadiah penerima tidak ikut 10x.
  const countTo = Math.max(1, Math.min(99999, Math.floor(Number(p.countTo ?? count))));
  const nilaiTo = price * countTo;
  const bagianPenerima = to && to !== uid
    ? Math.floor((nilaiTo * recvPct) / 100)
    : 0;
  const recv = bagianPenerima > 0
    ? await beriCoin(env, to, bagianPenerima, "cashback_recv", null)
    : 0;

  // Info tampilan kartu pemenang (gaya "Lucky Gift"): harga satuan, jumlah
  // kirim, total nilai, dan kelipatan menang terhadap harga satuan.
  // Kelipatan per SATU gift. Kirim 66 x 100.000 dengan hadiah 7.260.000 berarti
  // 110.000 per gift = 1,1x, bukan 72,6x (dulu dibagi harga satu saja).
  // Tampilan WIN memakai pengali terbaik yang menang di kiriman ini
  // (mis. kirim 10 buah, satu kena x10 -> tertulis x10), sedangkan nominalnya
  // tetap jumlah seluruh hadiah.
  const klf = untung > 0
    ? (undian.mult > 0
      ? undian.mult
      : Math.round((untung / Math.max(1, price * count)) * 100) / 100)
    : 0;
  const kelipatan = untung > 0 ? Math.round(klf) : 0;
  // Label jenis hadiah untuk badge di aplikasi (Cashback / Lucky / Jackpot).
  const tingkat = zonkBatal ? "DANA KEMBALI" : untung <= 0 ? ""
    : klf >= 100 ? "MEGA JACKPOT 100x"
    : klf >= 10 ? "MEGA JACKPOT"
    : klf >= 5 ? "LUCKY 5x"
    : klf >= 2 ? "LUCKY BONUS"
    : klf >= 1 ? "CASHBACK 1x"
    : "CASHBACK " + Math.round(klf * 100) + "%";

  // Jackpot = kelompok terakhir (bawaan 50.000). Tidak ada pengali lagi.
  return json({
    ok: 1,
    // Saat zonk dibatalkan (kiriman besar), angka yang ditampilkan adalah coin
    // yang kembali supaya aplikasi tetap menampilkan animasinya.
    amount: zonkBatal ? kembali : untung,
    kembali,
    kembaliPct,
    zonkBatal: zonkBatal ? 1 : 0,
    zonk: jpZonk,
    kredit,
    mult: 0,
    multF: 0,
    unit: price,
    cnt: count,
    total: nilai,
    kl: kelipatan,
    klf: klf,
    modePersen: persenAktif ? 1 : 0,
    tkt: tingkat,
    parts: parts.slice(0, 5),
    pecahan: parts[0] ?? 0,
    recv,
    jp: undian.jackpot,
    kelompok: undian.kelompok,
    peluang: undian.peluang,
    asset: "",
  });
}

// ---------- Jackpot gift (diundi server) ----------
/** Harga dan aturan jackpot dibaca dari katalog gift di RTDB (giftCfg/{id}). */
async function katalogGift(env, id) {
  const k = String(id || "").trim();
  if (!k) return null;
  const d = await cfgRtdb("giftCfg/" + k, env);
  const price = Math.max(0, Math.floor(Number(d?.price ?? 0)));
  if (!(price > 0)) return null;
  return {
    id: k,
    price,
    jpRate: Math.max(0, Math.min(100, Math.floor(Number(d?.jpRate ?? 0)))),
    jpMult: Math.max(0, Math.min(100000, Math.floor(Number(d?.jpMult ?? 0)))),
    cashback: !!(d?.cashback || Number(d?.cbRate ?? 0) > 0),
  };
}

/**
 * Undian jackpot untuk satu gift yang SUDAH dibayar. Aplikasi hanya menampilkan
 * hasilnya; coin ditambahkan di sini. Satu baris gift_req hanya bisa diundi
 * sekali, jadi tidak bisa diulang-ulang untuk memancing jackpot.
 */
async function jackpotGift(env, uid, p) {
  const itemId = String(p.itemId ?? p.item_id ?? p.id ?? "").trim();
  const count = Math.max(1, Math.min(999, Math.floor(Number(p.count ?? 1))));
  const g = await katalogGift(env, itemId);
  if (!g || g.jpRate <= 0 || g.jpMult <= 0) return json({ ok: 1, win: 0, mult: 0 });
  const now = Date.now();
  // Klaim satu gift terbaru (maksimal 5 menit lalu) yang belum pernah diundi.
  const r = await pipe(env, [
    {
      sql: `insert into jp_claim (req_id, uid, at)
            select r.req_id, r.uid, ? from gift_req r
             where r.uid = ? and r.at >= ?
               and not exists (select 1 from jp_claim c where c.req_id = r.req_id)
             order by r.at desc limit 1`,
      args: [I(now), T(uid), I(now - 300000)],
    },
  ]);
  if (!((r[0].affected ?? 0) > 0)) return json({ ok: 1, win: 0, mult: 0 });
  if (Math.random() * 100 >= g.jpRate) return json({ ok: 1, win: 0, mult: 0 });
  const menang = Math.max(0, Math.floor(g.price * g.jpMult * count));
  const paid = menang > 0 ? await beriCoin(env, uid, menang, "gift_jp", g.id) : 0;
  return json({ ok: 1, win: paid, mult: g.jpMult });
}

// ---------- Hadiah undangan (sekali per akun) ----------
const INVITE_COINS = 10000000;

/** Hadiah memakai kode undangan. Diperiksa server, sekali per akun. */
async function hadiahUndangan(env, uid) {
  const now = Date.now();
  const kunci = await pipe(env, [
    { sql: "insert or ignore into invite_reward (uid, at) values (?, ?)", args: [T(uid), I(now)] },
  ]);
  if (!((kunci[0].affected ?? 0) > 0)) return json({ ok: 1, win: 0, sudah: 1 });
  // Wajib punya catatan undangan di Firestore (invites/{uid}); tanpa itu bukan
  // pengguna kode undangan dan tidak dapat hadiah.
  let ada = false;
  try {
    const token = await tokenLayanan(env);
    if (token) {
      const proyek = String(env.FIREBASE_PROJECT || "my-app-e7f8c").trim();
      const r = await fetch(
        `https://firestore.googleapis.com/v1/projects/${proyek}/databases/(default)/documents/invites/${encodeURIComponent(uid)}`,
        { headers: { authorization: "Bearer " + token } },
      );
      ada = r.ok;
    }
  } catch (e) { ada = false; }
  if (!ada) {
    await pipe(env, [{ sql: "delete from invite_reward where uid = ?", args: [T(uid)] }]);
    return gagal("Catatan undangan tidak ditemukan");
  }
  const paid = await beriCoin(env, uid, INVITE_COINS, "undangan", null);
  return json({ ok: 1, win: paid });
}

// ---------- Topup manual DANA ----------

// ---- Konfigurasi dari panel developer (disimpan di tabel app_cfg) ----
const CFG_RAHASIA = new Set(["agoraCert", "fcmJson", "stripeSecret", "paystackSecret"]);
const CFG_KUNCI = new Set([
  "agoraAppId", "agoraCert", "fcmJson", "stripeAktif", "stripePub", "stripeSecret",
  "paystackAktif", "paystackPub", "paystackSecret", "versiMin", "versiTerbaru", "apkUrl", "apkCatatan",
  "assetPackage", "assetSha256",
  // Iklan berhadiah untuk coin gratis: diatur dari panel, dibaca aplikasi.
  "iklanAktif", "iklanCoin", "iklanMaxHari", "iklanAdUnit", "iklanCooldown", "iklanUji",
  "iklanGameId", "iklanPlacement", "iklanBanner",
]);
let cfgCache = { at: 0, v: {} };

async function cfgSemua(env, paksa = false) {
  if (!paksa && Date.now() - cfgCache.at < 15000) return cfgCache.v;
  const o = {};
  try {
    const r = await pipe(env, [{ sql: "select kunci, nilai from app_cfg" }]);
    for (const x of r[0].rows) o[x.kunci] = String(x.nilai ?? "");
  } catch { /* tabel belum ada: pakai env */ }
  cfgCache = { at: Date.now(), v: o };
  return o;
}

/** Ambil App ID dan Certificate Agora: panel lebih dulu, lingkungan server sebagai cadangan. */
async function agoraKredensial(env) {
  const c = await cfgSemua(env);
  return {
    appId: String(c.agoraAppId || env.AGORA_APP_ID || ""),
    cert: String(c.agoraCert || env.AGORA_APP_CERTIFICATE || ""),
  };
}

/** Versi tersamar untuk tampilan: rahasia tidak pernah dikirim utuh ke browser. */
function samarkan(v) {
  const t = String(v || "");
  if (!t) return "";
  if (t.length <= 8) return "••••";
  return t.slice(0, 4) + "••••••••" + t.slice(-4);
}

async function infoBayar(env) {
  const r = await pipe(env, [{ sql: "select dana, nama, gopay, qris from pay_info where id = 1" }]);
  const d = r[0].rows[0] ?? {};
  return { dana: d.dana ?? "", name: d.nama ?? "", gopay: d.gopay ?? "", qris: d.qris ?? "" };
}

// Harga cadangan kalau panel belum pernah menyimpan daftar paket.
const PAKET_TOPUP = { 1000000: 6000, 3000000: 18000, 10000000: 58000, 30000000: 170000 };

/** Harga rupiah untuk sejumlah coin, diambil dari daftar paket di panel. */
async function hargaPaket(env, coins) {
  try {
    const r = await pipe(env, [
      { sql: "select harga from coin_paket where coins = ? and aktif = 1", args: [I(coins)] },
    ]);
    const h = Number(r[0].rows[0]?.harga ?? 0);
    if (h > 0) return h;
  } catch (e) { /* tabel belum ada, pakai cadangan */ }
  return PAKET_TOPUP[coins] || 0;
}

/** Daftar paket coin untuk panel. */
async function daftarPaket(env) {
  const r = await pipe(env, [
    { sql: "select coins, harga, aktif from coin_paket order by coins" },
  ]);
  const baris = r[0].rows.map((x) => ({ coins: Number(x.coins), harga: Number(x.harga), aktif: Number(x.aktif) }));
  if (baris.length) return baris;
  return Object.entries(PAKET_TOPUP).map(([c, h]) => ({ coins: Number(c), harga: Number(h), aktif: 1 }));
}

async function topupManualBuat(env, uid, p) {
  const id = String(p.id ?? `TM${Date.now()}${Math.floor(Math.random() * 1000)}`);
  const coins = Math.trunc(Number(String(p.coins ?? "").replace(/[^0-9]/g, "")));
  const amount = await hargaPaket(env, coins);
  const payer = String(p.payer ?? "").trim().slice(0, 60);
  const method = String(p.method ?? "dana").trim() || "dana";
  if (!amount) return gagal("Paket coin tidak dikenal");
  if (payer.length < 3) return gagal("Nama pengirim terlalu pendek");
  const r = await pipe(env, [
    { sql: "select count(*) as n from topup_manual where uid = ? and status = 'pending'", args: [T(uid)] },
  ]);
  if (Number(r[0].rows[0]?.n ?? 0) >= 3) return gagal("Masih ada pengajuan yang menunggu persetujuan");
  await pipe(env, [
    {
      sql: `insert into topup_manual (id, uid, coins, amount, payer, method, status, created_at)
            values (?, ?, ?, ?, ?, ?, 'pending', ?)`,
      args: [T(id), T(uid), I(coins), I(amount), T(payer), T(method), I(Date.now())],
    },
  ]);
  return json({ ok: 1, order: id, id, status: "pending" });
}

async function topupManualRiwayat(env, uid) {
  const r = await pipe(env, [
    {
      sql: `select id, coins, amount, payer, method, status, created_at
            from topup_manual where uid = ? order by created_at desc limit 20`,
      args: [T(uid)],
    },
  ]);
  return json({ ok: 1, list: r[0].rows });
}

// ---------- Panel admin ----------
// ================= PANEL MANAGER & ADMIN =================
// Hak staf disimpan di database supaya bisa dicabut kapan saja dari panel
// developer, dan semua aksi saldo tetap dihitung server.

async function peranStaf(env, uid) {
  if (!uid) return [];
  const r = await pipe(env, [
    { sql: "select uid, role, manager, active, coins from panel_staf where uid = ? order by role desc", args: [T(uid)] },
  ]);
  return r[0].rows
    .filter((x) => Number(x.active) === 1)
    .map((x) => ({
      uid: String(x.uid),
      role: String(x.role),
      manager: String(x.manager ?? ""),
      coins: Math.max(0, Number(x.coins ?? 0)),
    }));
}

// Satu akun bisa punya dua panel sekaligus (manager dan admin).
// Kalau peran tidak disebut, pakai manager lebih dulu, lalu admin.
async function stafDari(env, uid, peran) {
  const semua = await peranStaf(env, uid);
  if (!semua.length) return null;
  if (peran) return semua.find((x) => x.role === peran) ?? null;
  return semua.find((x) => x.role === "manager") ?? semua.find((x) => x.role === "admin") ?? null;
}

async function stokStaf(env, uid) {
  const r = await pipe(env, [
    {
      sql: `select item_id as id, kind, name, days from panel_stock
            where owner_uid = ? order by created_at desc limit 300`,
      args: [T(uid)],
    },
  ]);
  return r[0].rows.map((x) => ({ id: String(x.id), kind: String(x.kind ?? ""), name: String(x.name ?? ""), days: Number(x.days ?? 7) }));
}

/**
 * Unggah aset (gambar frame, lencana, banner) ke repo lewat server ini.
 *
 * Kenapa lewat server: HP yang mengunggah langsung ke api.github.com sering
 * menggantung di jaringan seluler, sampai batas waktu habis. Server ini
 * berada jauh lebih dekat ke HP dan meneruskan ke GitHub dengan koneksi
 * pusat data, jadi unggahan selesai dalam hitungan detik. Hasil akhirnya
 * tetap tautan CDN GitHub (jsDelivr), bukan penyimpanan lain.
 */
const ASET_REPO = "exbottod/viza-chat-voice-room";
const VPS_ASET = "https://viza.43-156-99-4.sslip.io/berkas";
const ASET_CABANG = "main";
/* Penyimpanan aset di VPS. Unggah jadi cepat karena tidak menunggu
   commit ke GitHub; file dilayani langsung lewat /aset/<nama>. */
const ASET_DIR = "/opt/viza-api/aset";
/* Keadaan musik tiap room disimpan di server ini, bukan di database lain,
   supaya semua HP di room menerima lagu yang sama. Isinya hanya lagu yang
   sedang diputar per room; hilang sendiri setelah 12 jam tanpa kabar. */
const musikRoom = new Map();

// ---------- Tautan unduhan APK ----------
const APK_ASLI = "https://github.com/exbottod/rezo-star-voice-chat-room/releases/latest/download/REZO-STAR.apk";
const APK_KEY = "rezo-vn4WOFqxwIWA5c0t";
const HALAMAN_504 = `<!doctype html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>504 Gateway Time-out</title><style>
body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;
background:#f7f7f7;color:#303030;display:flex;min-height:100vh;align-items:center;justify-content:center}
.kotak{text-align:center;padding:24px}
h1{font-size:44px;font-weight:600;margin:0 0 8px}
h2{font-size:22px;font-weight:600;margin:0 0 12px}
p{font-size:15px;color:#666;margin:0}
</style></head><body><div class="kotak">
<h1>504</h1><h2>Gateway Time-out</h2>
<p>The server didn't respond in time.</p>
</div></body></html>`;

/** Simpan/layani file langsung dari disk VPS. Jauh lebih cepat daripada
 *  database dan tidak butuh tabel apa pun. Di lingkungan tanpa disk (Cloudflare)
 *  import fs gagal, jadi pemanggil otomatis lanjut ke cara lain. */
async function asetFs() {
  return await import("node:fs/promises");
}

async function asetSimpanDisk(berkas, b64) {
  const fs = await asetFs();
  await fs.mkdir(ASET_DIR, { recursive: true });
  await fs.writeFile(ASET_DIR + "/" + berkas, Buffer.from(b64, "base64"));
}

async function asetBacaDisk(berkas) {
  const fs = await asetFs();
  return await fs.readFile(ASET_DIR + "/" + berkas);
}

let asetTabelSiap = null;
function asetPastikan(env) {
  if (!asetTabelSiap) {
    asetTabelSiap = pipe(env, [
      { sql: `create table if not exists aset_file (
                nama text primary key,
                mime text,
                b64  text not null,
                created integer
              )`, args: [] },
    ]).catch((e) => { asetTabelSiap = null; throw e; });
  }
  return asetTabelSiap;
}

function mimeDariExt(ext) {
  if (ext === "png") return "image/png";
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  if (ext === "webp") return "image/webp";
  if (ext === "gif") return "image/gif";
  if (ext === "svg") return "image/svg+xml";
  if (ext === "svga") return "application/octet-stream";
  if (ext === "mp3") return "audio/mpeg";
  if (ext === "m4a" || ext === "aac") return "audio/mp4";
  if (ext === "ogg" || ext === "oga" || ext === "opus") return "audio/ogg";
  if (ext === "wav") return "audio/wav";
  if (ext === "flac") return "audio/flac";
  return "application/octet-stream";
}

async function asetUpload(env, b) {
  const b64 = String(b.b64 || "").replace(/^data:[^,]+,/, "").replace(/\s+/g, "");
  if (!b64) throw new Error("Isi file kosong");
  if (b64.length > 15 * 1024 * 1024) throw new Error("File terlalu besar (maks sekitar 11 MB)");
  let ext = (String(b.ext || "png").toLowerCase().replace(/[^a-z0-9]/g, "") || "png").slice(0, 5);
  // Jenis berkas ditentukan dari ISI berkas, bukan hanya nama. Berkas GIF/WebP
  // sering tersimpan dengan nama .jpg (mis. hasil unduhan WhatsApp), dan kalau
  // dipakai nama itu, server mengirim Content-Type yang salah sehingga emot
  // bergerak tidak pernah tampil di aplikasi.
  try {
    const kp = Buffer.from(b64.slice(0, 4000), "base64");
    const isi = (i) => kp.subarray(i, i + 12).toString("latin1");
    if (isi(0).startsWith("GIF8")) ext = "gif";
    else if (kp[0] === 0x89 && isi(1).startsWith("PNG")) ext = "png";
    else if (isi(0).startsWith("RIFF") && kp.subarray(8, 12).toString("latin1") === "WEBP") ext = "webp";
    else if (kp[0] === 0xff && kp[1] === 0xd8) ext = "jpg";
    else if (isi(4).startsWith("ftyp")) ext = "mp4";
    else if (isi(0).startsWith("PK")) ext = "svga";
  } catch (e) { /* pakai ext dari nama kalau isi tidak terbaca */ }
  const nama = (String(b.name || "aset").toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 40) || "aset");
  const berkas = nama + "_" + Date.now().toString(36) + "." + ext;

  // 1) Jalur utama: simpan di VPS. Cepat dan tidak bergantung GitHub.
  let galatVps = "";
  // 0) Paling cepat: tulis ke disk VPS.
  try {
    await asetSimpanDisk(berkas, b64);
    return json({ ok: 1, url: VPS_ASET + "/" + berkas, path: berkas, simpan: "disk" });
  } catch (eDisk) { /* tanpa disk, lanjut ke database */ }
  try {
    await asetPastikan(env);
    await pipe(env, [
      {
        sql: "insert into aset_file (nama, mime, b64, created) values (?, ?, ?, ?)",
        args: [berkas, mimeDariExt(ext), b64, Date.now()],
      },
    ]);
    return json({ ok: 1, url: VPS_ASET + "/" + berkas, path: berkas, simpan: "vps" });
  } catch (e) {
    galatVps = String(e?.message ?? e);
  }

  const gh = String(b.gh || "").trim();
  if (!gh) throw new Error("Penyimpanan VPS gagal (" + galatVps + ") dan token GitHub belum diisi");
  const path = "docs/aset/" + berkas;
  const r = await fetch("https://api.github.com/repos/" + ASET_REPO + "/contents/" + path, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + gh,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "User-Agent": "rezo-panel",
    },
    body: JSON.stringify({ message: "aset: " + nama, content: b64, branch: ASET_CABANG }),
  });
  const out = await r.json().catch(() => ({}));
  if (r.status === 401 || r.status === 403) {
    throw new Error("Token GitHub ditolak atau tidak punya izin Contents: Read and write");
  }
  if (!r.ok) throw new Error("GitHub: " + ((out && out.message) || r.status));
  return json({ ok: 1, url: "https://cdn.jsdelivr.net/gh/" + ASET_REPO + "@" + ASET_CABANG + "/" + path, path: path });
}

async function asetDaftar(env) {
  const hasil = new Map();
  try {
    const fs = await asetFs();
    const nama = await fs.readdir(ASET_DIR);
    for (const n of nama) {
      try {
        const st = await fs.stat(ASET_DIR + "/" + n);
        if (!st.isFile()) continue;
        hasil.set(n, { nama: n, ukuran: Number(st.size), at: Number(st.mtimeMs) || 0, simpan: "disk", url: VPS_ASET + "/" + n });
      } catch (e) { /* berkas lewat, abaikan */ }
    }
  } catch (e) { /* tanpa disk: lanjut baca dari database */ }
  try {
    await asetPastikan(env);
    const r = await pipe(env, [
      { sql: "select nama, mime, created, length(b64) as n from aset_file order by created desc limit 300" },
    ]);
    for (const row of r[0].rows) {
      if (hasil.has(row.nama)) continue;
      hasil.set(row.nama, { nama: row.nama, ukuran: Number(row.n) || 0, at: Number(row.created) || 0, simpan: "vps", url: VPS_ASET + "/" + row.nama });
    }
  } catch (e) { /* tabel belum ada: cukup dari disk */ }
  return [...hasil.values()].sort((a, b) => (b.at || 0) - (a.at || 0)).slice(0, 300);
}

async function asetHapus(env, nama) {
  let ada = false;
  try {
    const fs = await asetFs();
    await fs.unlink(ASET_DIR + "/" + nama);
    ada = true;
  } catch (e) { /* mungkin hanya ada di database */ }
  try {
    await asetPastikan(env);
    const r = await pipe(env, [{ sql: "delete from aset_file where nama = ?", args: [T(nama)] }]);
    if (Number(r[0]?.rows?.length ?? 0) || true) ada = true;
  } catch (e) { /* tabel belum ada */ }
  if (!ada) throw new Error("Berkas tidak ditemukan");
  return true;
}

/** Info iklan untuk aplikasi (dipakai jalur app maupun panel). */
async function iklanInfoPengguna(env, uid) {
  const at = await aturIklan(env);
  let dipakai = 0;
  try {
    await siapIklan(env);
    const awal = Date.parse(bulanIni() + "-01T00:00:00Z");
    const r = await pipe(env, [
      {
        sql: `select count(*) as n from iklan_klaim where uid = ? and at >= ?`,
        args: [T(uid), I(Math.max(awal, Date.now() - 86400000))],
      },
    ]);
    dipakai = Number(r[0].rows[0]?.n ?? 0);
  } catch (e) { dipakai = 0; }
  return json({
    ok: 1,
    aktif: at.aktif ? 1 : 0,
    coin: at.coin,
    maxHari: at.maxHari,
    dipakai,
    sisa: Math.max(0, at.maxHari - dipakai),
    jeda: at.jeda,
    adUnit: at.adUnit,
    gameId: at.gameId,
    placement: at.placement,
    uji: at.uji ? 1 : 0,
    banner: at.banner,
  });
}

/** Klaim coin setelah iklan selesai. Batas harian dan jeda dicek di server. */
async function iklanKlaimPengguna(env, uid) {
  const at = await aturIklan(env);
  if (!at.aktif) return gagal("Coin gratis lewat iklan belum dibuka");
  if (at.coin <= 0) return gagal("Hadiah iklan belum diatur");
  if (at.maxHari <= 0) return gagal("Batas iklan harian masih nol");
  await siapIklan(env);
  const sejak = Date.now() - 86400000;
  const cek = await pipe(env, [
    { sql: `select count(*) as n, coalesce(max(at), 0) as akhir from iklan_klaim where uid = ? and at >= ?`, args: [T(uid), I(sejak)] },
  ]);
  const n = Number(cek[0].rows[0]?.n ?? 0);
  const akhir = Number(cek[0].rows[0]?.akhir ?? 0);
  if (n >= at.maxHari) return gagal("Batas iklan hari ini sudah tercapai (" + at.maxHari + " kali)");
  if (akhir && Date.now() - akhir < at.jeda * 1000) {
    return gagal("Tunggu sebentar sebelum menonton iklan lagi");
  }
  await pipe(env, [
    { sql: "insert into iklan_klaim (uid, coins, at) values (?, ?, ?)", args: [T(uid), I(at.coin), I(Date.now())] },
  ]);
  await beriCoin(env, uid, at.coin, "iklan", null);
  const w = await pastikan(env, uid);
  return json({ ok: 1, coins: at.coin, sisa: Math.max(0, at.maxHari - (n + 1)), w });
}

async function panel(env, body) {
  const sesi = await sesiDariToken(body.t ?? "");
  if (!sesi) return json({ ok: 0, e: "Sesi tidak sah" }, 401);
  const uid = sesi.uid;
  const p = body.p ?? {};
  const aksi = String(body.a ?? p.a ?? p.op ?? "");
  const dev = adalahAdmin(sesi);

  if (aksi === "cek_galat") {
    if (!(await bolehPanel(env, sesi))) return json({ ok: 0, e: "Hanya admin" }, 403);
    const r = await pipe(env, [{ sql: "select uid, aksi, pesan, at from wallet_galat order by at desc limit 30" }]);
    return json({ ok: 1, baris: r[0].rows });
  }

  if (aksi === "me") {
    const semua = await peranStaf(env, uid);
    if (!semua.length) return json({ ok: 0, e: "Bukan staf", role: "" });
    const stok = await stokStaf(env, uid);
    const panels = semua.map((x) => ({
      role: x.role,
      manager: x.manager,
      coins: x.coins,
      stok,
    }));
    const utama = panels.find((x) => x.role === "manager") ?? panels[0];
    // role/coins di level atas dipertahankan untuk APK lama.
    return json({ ok: 1, role: utama.role, manager: utama.manager, coins: utama.coins, stok, panels });
  }

  // ---- Agensi: dipakai pemilik agensi dan host dari dalam aplikasi ----
  // ---- Iklan berhadiah: coin gratis setelah iklan selesai ditonton ----
  if (aksi === "iklan_info") return await iklanInfoPengguna(env, uid);
  if (aksi === "iklan_klaim") return await iklanKlaimPengguna(env, uid);

  if (aksi === "agency_info") {
    await siapAgency(env);
    const bulan = bulanIni();
    const milik = await pipe(env, [
      {
        sql: `select id, nama, kode, rate, aktif, saldo from agency where owner_uid = ? order by created_at limit 1`,
        args: [T(uid)],
      },
    ]);
    const ag = milik[0].rows[0] || null;
    const sbgHost = await pipe(env, [
      {
        sql: `select h.agency_id, h.sejak, a.nama, a.rate from agency_host h
              join agency a on a.id = h.agency_id
              where h.host_uid = ? and h.aktif = 1 and a.aktif = 1`,
        args: [T(uid)],
      },
    ]);
    let host = [];
    let komisiBulan = 0;
    if (ag) {
      const h = await pipe(env, [
        {
          sql: `select h.host_uid, h.sejak from agency_host h
                where h.agency_id = ? and h.aktif = 1 order by h.sejak desc limit 200`,
          args: [T(ag.id)],
        },
      ]);
      host = h[0].rows;
      const e = await pipe(env, [
        { sql: "select coins from agency_earn where agency_id = ? and bulan = ?", args: [T(ag.id), T(bulan)] },
      ]);
      komisiBulan = Number(e[0].rows[0]?.coins ?? 0);
    }
    let cair = null;
    if (ag) {
      try { cair = await batasCairAgensi(env); } catch (e) { cair = null; }
    }
    return json({ ok: 1, bulan, agency: ag, komisiBulan, host, cair, sebagaiHost: sbgHost[0].rows[0] || null });
  }

  if (aksi === "agency_join") {
    await siapAgency(env);
    const kode = String(p.kode ?? "").trim().toUpperCase();
    if (!kode) return gagal("Kode agensi kosong");
    const ag = await pipe(env, [
      { sql: "select id, nama, rate, aktif from agency where kode = ?", args: [T(kode)] },
    ]);
    const row = ag[0].rows[0];
    if (!row || !row.aktif) return gagal("Kode agensi tidak ditemukan");
    const kini = await pipe(env, [
      { sql: "select agency_id, aktif, sejak from agency_host where host_uid = ?", args: [T(uid)] },
    ]);
    const lama = kini[0].rows[0];
    // Pindah agensi baru boleh setelah 30 hari, supaya agensi tidak saling rebut host.
    if (lama && lama.aktif && lama.agency_id !== row.id) {
      const hari = Math.floor((Date.now() - Number(lama.sejak ?? 0)) / 86400000);
      if (hari < 30) return gagal("Baru bisa pindah agensi setelah 30 hari (sekarang " + hari + " hari)");
    }
    await pipe(env, [
      {
        sql: `insert into agency_host (host_uid, agency_id, aktif, sejak) values (?, ?, 1, ?)
              on conflict (host_uid) do update set agency_id = excluded.agency_id, aktif = 1, sejak = excluded.sejak`,
        args: [T(uid), T(row.id), I(Date.now())],
      },
    ]);
    return json({ ok: 1, agency: { id: row.id, nama: row.nama, rate: row.rate } });
  }

  if (aksi === "agency_request") {
    await siapAgency(env);
    const ag = await pipe(env, [
      { sql: "select id, saldo from agency where owner_uid = ? and aktif = 1", args: [T(uid)] },
    ]);
    const row = ag[0].rows[0];
    if (!row) return gagal("Kamu bukan pemilik agensi");
    const minta = Math.trunc(Number(p.coins ?? row.saldo));
    if (!(minta > 0)) return gagal("Tidak ada komisi untuk dicairkan");
    if (minta > Number(row.saldo ?? 0)) return gagal("Saldo komisi tidak cukup");
    // Pengaman: pencairan tidak boleh melebihi porsi dari coin yang benar-benar
    // dibeli bulan ini. Coin gratis (game, hadiah, invite, reward room) tidak
    // dihitung, jadi uang keluar tidak pernah melebihi uang masuk.
    const batas = await batasCairAgensi(env);
    if (batas.batas <= 0) {
      return gagal("Pencairan rupiah belum dibuka bulan ini karena belum ada topup coin yang masuk. Komisi tetap tersimpan dan bisa dicairkan setelah ada topup.");
    }
    if (minta > batas.sisa) {
      return gagal("Melebihi batas pencairan bulan ini. Batas " + batas.persen + "% dari coin topup sah = " + batas.batas + " coin, sisa yang bisa dicairkan " + batas.sisa + " coin.");
    }
    await pipe(env, [
      {
        sql: "insert into agency_req (agency_id, coins, status, at) values (?, ?, 'menunggu', ?)",
        args: [T(row.id), I(minta), I(Date.now())],
      },
    ]);
    return json({ ok: 1, minta });
  }

  if (aksi === "ban_check") {
    const r = await pipe(env, [
      { sql: "select reason, oleh from panel_ban where uid = ?", args: [T(uid)] },
    ]);
    const row = r[0].rows[0];
    return json({ ok: 1, banned: !!row, reason: row ? String(row.reason ?? "") : "" });
  }

  const semuaPeran = await peranStaf(env, uid);
  const diminta = String(p.sebagai ?? "").trim();
  const staf = diminta
    ? semuaPeran.find((x) => x.role === diminta) ?? null
    : semuaPeran.find((x) => x.role === "manager") ?? semuaPeran[0] ?? null;
  if (!staf && !dev) return json({ ok: 0, e: "Hanya manager atau admin" }, 403);
  const peran = dev ? "dev" : staf.role;
  const target = String(p.to ?? p.uid ?? "").trim();
  const butuhTarget = () => {
    if (!/^[A-Za-z0-9_-]{6,64}$/.test(target)) return "ID user tidak valid";
    // ID angka (mis. 100129) BUKAN uid Firebase. Kalau diterima, coin masuk ke
    // dompet palsu dan penerima asli tidak dapat apa pun.
    if (/^\d+$/.test(target)) return "Kirim memakai UID akun, bukan ID angka. Update aplikasi ke versi terbaru.";
    return "";
  };

  if (aksi === "send_coin") {
    if (peran !== "manager" && peran !== "dev") return json({ ok: 0, e: "Hanya manager" }, 403);
    const salah = butuhTarget();
    if (salah) return gagal(salah);
    const coins = Math.trunc(Number(p.coins ?? 0));
    if (!(coins > 0) || coins > 10000000000000) return gagal("Jumlah coin tidak valid");
    // Pemilik akun yang juga developer tetap memakai jalur manager di panel manager,
    // supaya stok coin benar-benar berkurang sesuai jumlah yang dikirim.
    const pakaiStok = staf && staf.role === "manager";
    if (pakaiStok) {
      const sisa = staf.coins;
      if (coins > sisa) {
        return gagal(`Stok coin panel habis. Sisa ${sisa.toLocaleString("id-ID")} coin, minta tambah ke developer.`);
      }
      const potong = await pipe(env, [
        { sql: "update panel_staf set coins = coins - ? where uid = ? and role = 'manager' and coins >= ?", args: [I(coins), T(uid), I(coins)] },
        { sql: "select changes() as n" },
      ]);
      const terpotong = Number(potong[1].rows[0].n);
      if (!terpotong) {
        const s2 = await stafDari(env, uid);
        return gagal(`Stok coin panel habis. Sisa ${Number(s2?.coins ?? 0).toLocaleString("id-ID")} coin.`);
      }
      try {
        await beriCoin(env, target, coins, "panel_coin", null);
      } catch (e) {
        await pipe(env, [
          { sql: "update panel_staf set coins = coins + ? where uid = ? and role = 'manager'", args: [I(coins), T(uid)] },
        ]).catch(() => {});
        throw e;
      }
      const w1 = await pastikan(env, target);
      await pipe(env, [
        { sql: "insert into panel_log (id, oleh, aksi, target, jumlah, at) values (?, ?, 'send_coin', ?, ?, ?)",
          args: [T(`${uid}-${Date.now()}`), T(uid), T(target), I(coins), I(Date.now())] },
      ]).catch(() => {});
      const s3 = await stafDari(env, uid);
      return json({ ok: 1, coins: w1.coins, sisaStok: Number(s3?.coins ?? 0) });
    }
    await beriCoin(env, target, coins, "panel_coin", null);
    const w = await pastikan(env, target);
    await pipe(env, [
      { sql: "insert into panel_log (id, oleh, aksi, target, jumlah, at) values (?, ?, 'send_coin', ?, ?, ?)",
        args: [T(`${uid}-${Date.now()}`), T(uid), T(target), I(coins), I(Date.now())] },
    ]).catch(() => {});
    return json({ ok: 1, coins: w.coins });
  }

  if (aksi === "send_vip") {
    const tier = Math.trunc(Number(p.tier ?? 0));
    const days = Math.trunc(Number(p.days ?? 30));
    if (!(tier >= 1 && tier <= 9)) return gagal("VIP harus 1 sampai 9");
    if (!(days > 0) || days > 3650) return gagal("Durasi VIP tidak valid");
    const salah = butuhTarget();
    if (salah) return gagal(salah);
    await beriVip(env, target, tier, days);
    return json({ ok: 1, vip: tier, days });
  }

  if (aksi === "send_item") {
    const itemId = String(p.itemId ?? "").trim();
    const salah = butuhTarget();
    if (salah) return gagal(salah);
    const stok = await stokStaf(env, uid);
    const ada = stok.find((x) => x.id === itemId);
    if (!ada && !dev) return gagal("Item ini tidak ada di stok panel Anda");
    const hari = Math.trunc(Number(p.days ?? ada?.days ?? 7));
    if (!(hari > 0) || hari > 3650) return gagal("Durasi item tidak valid");
    const w0 = await pastikan(env, target);
    const lama = Number(w0.inv?.[itemId] ?? 0);
    const akhir = Math.max(Date.now(), lama) + hari * 86400000;
    const inv = { ...w0.inv, [itemId]: akhir };
    // Kalau panel mengirim slot (mis. "uid" atau "badge"), item langsung dipakai
    // oleh akun itu tanpa perlu dibeli dulu: ini dipakai item Unique ID custom.
    const slotPakai = String(p.equip ?? "").trim();
    const eqBaru = { ...w0.equip, ...(slotPakai ? { [slotPakai]: itemId } : {}) };
    const langkah = [
      { sql: "update wallets set inv = ?, updated_at = ? where uid = ?", args: [T(JSON.stringify(inv)), I(Date.now()), T(target)] },
    ];
    if (slotPakai) {
      langkah.push({ sql: "update wallets set equip = ?, updated_at = ? where uid = ?", args: [T(JSON.stringify(eqBaru)), I(Date.now()), T(target)] });
    }
    await pipe(env, langkah);
    return json({ ok: 1, itemId, days: hari, equip: slotPakai || null });
  }

  if (aksi === "ban") {
    const salah = butuhTarget();
    if (salah) return gagal(salah);
    if (target === uid) return gagal("Tidak bisa banned diri sendiri");
    const korbanList = await peranStaf(env, target);
    const korban = korbanList.find((x) => x.role === "manager") ?? korbanList[0] ?? null;
    if (peran === "admin") {
      // Admin hanya boleh mengurus user biasa di bawah manajernya.
      if (!staf.manager) return gagal("Admin ini belum punya manager");
      if (korban) return gagal("Admin tidak bisa banned sesama staf atau manager");
    }
    if (korban && korban.role === "manager" && peran !== "dev") return gagal("Hanya developer yang bisa banned manager");
    await pipe(env, [
      {
        sql: `insert into panel_ban (uid, oleh, manager, reason, at) values (?, ?, ?, ?, ?)
              on conflict (uid) do update set oleh = excluded.oleh, manager = excluded.manager,
                reason = excluded.reason, at = excluded.at`,
        args: [T(target), T(uid), T(staf?.manager ?? ""), T(String(p.reason ?? "").slice(0, 140)), I(Date.now())],
      },
    ]);
    // Cermin ke Firestore supaya HP user langsung tertolak (layar blokir).
    let cermin = false;
    try { cermin = await tandaiBannedFs(env, target, String(p.reason ?? "")); } catch { cermin = false; }
    return json({ ok: 1, banned: target, cermin });
  }

  if (aksi === "unban") {
    const salah = butuhTarget();
    if (salah) return gagal(salah);
    await pipe(env, [{ sql: "delete from panel_ban where uid = ?", args: [T(target)] }]);
    let cermin = false;
    try { cermin = await tandaiBannedFs(env, target, "", true); } catch { cermin = false; }
    return json({ ok: 1, unbanned: target, cermin });
  }

  if (aksi === "reset_nama") {
    const salah = butuhTarget();
    if (salah) return gagal(salah);
    if (!(dev || peran === "manager")) return gagal("Hanya manager atau developer yang bisa reset nama");
    // Ditulis dari server memakai akun layanan: aturan RTDB hanya mengizinkan
    // pemilik akun menulis pub/{uid}, jadi dari HP panel selalu "Permission denied".
    // Nama wajib sama di RTDB (pub) dan Firestore (users, userIds): aplikasi
    // membaca Firestore lebih dulu, jadi kalau hanya RTDB yang diubah nama lama
    // tetap tampil.
    const NAMA_BARU = "UNKNOWN";
    await tulisRtdbSa(env, "pub/" + target + "/name", NAMA_BARU);
    await tulisRtdbSa(env, "nameReset/" + target, { at: Date.now(), by: uid });
    const cermin = { rtdb: true, users: false, userIds: false };
    cermin.users = await tulisFsSa(env, "users/" + target, { name: NAMA_BARU, nama: NAMA_BARU });
    const nomor = String(p.id ?? "").trim() || (await idResmiSa(env, target));
    if (nomor) cermin.userIds = await tulisFsSa(env, "userIds/" + nomor, { name: NAMA_BARU });
    return json({ ok: 1, nama: NAMA_BARU, cermin });
  }

  if (aksi === "reset_foto") {
    const salah = butuhTarget();
    if (salah) return gagal(salah);
    if (!(dev || peran === "manager")) return gagal("Hanya manager atau developer yang bisa reset foto");
    // Foto disimpan di tiga tempat: RTDB pub/{uid} (avatarB64 + photo) dan
    // Firestore users/{uid}.photoUrl + userIds/{id}.photo. Semua harus
    // dikosongkan, karena aplikasi memakai Firestore lebih dulu dan akan
    // menampilkan foto lama bila hanya RTDB yang dibersihkan. Setelah kosong,
    // aplikasi otomatis memakai foto bawaan (ic_default_avatar_*).
    await tulisRtdbSa(env, "pub/" + target + "/avatarB64", null);
    await tulisRtdbSa(env, "pub/" + target + "/photo", "");
    await tulisRtdbSa(env, "photoReset/" + target, { at: Date.now(), by: uid });
    const cermin = { rtdb: true, users: false, userIds: false };
    cermin.users = await tulisFsSa(env, "users/" + target, { photoUrl: "", photo: "" });
    const nomor = String(p.id ?? "").trim() || (await idResmiSa(env, target));
    if (nomor) cermin.userIds = await tulisFsSa(env, "userIds/" + nomor, { photo: "" });
    return json({ ok: 1, bawaan: true, cermin });
  }

  if (aksi === "bans") {
    const r = await pipe(env, [
      { sql: "select uid, oleh, reason, at from panel_ban order by at desc limit 100" },
    ]);
    return json({ ok: 1, list: r[0].rows });
  }

  return json({ ok: 0, e: "Aksi panel tidak dikenal: " + aksi });
}


/**
 * Hapus akun login Firebase Auth.
 *
 * Butuh kunci service account di variabel lingkungan FIREBASE_SA_JSON
 * (isi berkas JSON dari Firebase Console > Project settings > Service accounts).
 * Tanpa kunci itu, akun login tidak bisa dihapus dari server.
 */
let saCache = { kunci: "", token: "", exp: 0 };

async function tokenLayanan(env) {
  let mentah = String(env.FIREBASE_SA_JSON || "").trim();
  if (!mentah) {
    // Cara kedua: berkas di server, tanpa mengubah systemd.
    try {
      const fs = await import("node:fs/promises");
      mentah = String(await fs.readFile("/opt/viza-api/firebase-sa.json", "utf8")).trim();
    } catch (e) { mentah = ""; }
  }
  if (!mentah) return "";
  if (saCache.kunci === mentah && saCache.token && Date.now() < saCache.exp - 60000) return saCache.token;
  let sa;
  try { sa = JSON.parse(mentah); } catch (e) { return ""; }
  if (!sa.client_email || !sa.private_key) return "";
  const b64u = (buf) => Buffer.from(buf).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const kepala = b64u(JSON.stringify({ alg: "RS256", typ: "JWT", kid: sa.private_key_id || undefined }));
  const kini = Math.floor(Date.now() / 1000);
  const isi = b64u(JSON.stringify({
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/identitytoolkit https://www.googleapis.com/auth/firebase https://www.googleapis.com/auth/firebase.database https://www.googleapis.com/auth/userinfo.email",
    aud: "https://oauth2.googleapis.com/token",
    iat: kini,
    exp: kini + 3600,
  }));
  const data = kepala + "." + isi;
  const kunci = await crypto.subtle.importKey(
    "pkcs8",
    Buffer.from(sa.private_key.replace(/-----[^-]+-----/g, "").replace(/\s+/g, ""), "base64"),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const ttd = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", kunci, new TextEncoder().encode(data));
  const jwt = data + "." + b64u(new Uint8Array(ttd));
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=" + encodeURIComponent(jwt),
  });
  const j = await r.json().catch(() => ({}));
  if (!j.access_token) return "";
  saCache = { kunci: mentah, token: j.access_token, exp: Date.now() + (Number(j.expires_in || 3600) * 1000) };
  return j.access_token;
}

async function hapusAkunAuth(env, uid) {
  const token = await tokenLayanan(env);
  if (!token) return { ok: 0, alasan: "Kunci layanan belum dipasang" };
  const proyek = String(env.FIREBASE_PROJECT || "my-app-e7f8c").trim();
  const r = await fetch(`https://identitytoolkit.googleapis.com/v1/projects/${proyek}/accounts:delete`, {
    method: "POST",
    headers: { authorization: "Bearer " + token, "content-type": "application/json" },
    body: JSON.stringify({ localId: uid }),
  });
  const j = await r.json().catch(() => ({}));
  if (r.ok) return { ok: 1 };
  const pesan = String(j?.error?.message || "");
  // Akun yang memang sudah tidak ada dianggap berhasil.
  if (pesan.includes("USER_NOT_FOUND") || pesan.includes("EMAIL_NOT_FOUND")) return { ok: 1 };
  return { ok: 0, alasan: pesan || ("HTTP " + r.status) };
}


/** Panel developer disajikan dari server ini: /opt/viza-api/panel. */
async function panelBerkas(jalur) {
  let fs, path;
  try {
    fs = await import("node:fs/promises");
    path = await import("node:path");
  } catch (e) {
    return new Response("Tidak tersedia", { status: 404 });
  }
  const nama = (jalur.replace(/^\/panel\/?/, "") || "index.html").replace(/\.\./g, "").replace(/^\/+/, "");
  const lokasi = path.join("/opt/viza-api/panel", nama);
  const ext = (nama.split(".").pop() || "").toLowerCase();
  const mime = {
    html: "text/html; charset=utf-8", js: "text/javascript; charset=utf-8",
    css: "text/css; charset=utf-8", json: "application/json",
    webmanifest: "application/manifest+json", ico: "image/x-icon",
    png: "image/png", svg: "image/svg+xml", webp: "image/webp",
  }[ext] || "application/octet-stream";
  try {
    const isi = await fs.readFile(lokasi);
    return new Response(isi, { status: 200, headers: { "content-type": mime, "cache-control": "no-cache" } });
  } catch (e) {
    return new Response("Berkas panel tidak ada: " + nama, { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
  }
}

/* ===== Firestore lewat akun layanan (dipakai panel staf) =====
 * Aturan Firestore hanya mengizinkan email developer, jadi manager/admin selalu
 * kena "permission-denied" saat panel membaca koleksi. Fungsi di bawah membaca
 * dan menulis Firestore memakai akun layanan, sama seperti panel-rtdb. */
function fsNilai(v) {
  if (v === null || v === undefined) return { nullValue: null };
  if (typeof v === "boolean") return { booleanValue: v };
  if (typeof v === "number") {
    return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
  }
  if (typeof v === "string") return { stringValue: v };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(fsNilai) } };
  if (typeof v === "object") {
    const f = {};
    for (const k of Object.keys(v)) f[k] = fsNilai(v[k]);
    return { mapValue: { fields: f } };
  }
  return { stringValue: String(v) };
}

function fsBaca(f) {
  if (!f) return null;
  if ("nullValue" in f) return null;
  if ("booleanValue" in f) return !!f.booleanValue;
  if ("integerValue" in f) return Number(f.integerValue);
  if ("doubleValue" in f) return Number(f.doubleValue);
  if ("stringValue" in f) return f.stringValue;
  if ("timestampValue" in f) return f.timestampValue;
  if ("arrayValue" in f) return (f.arrayValue.values || []).map(fsBaca);
  if ("mapValue" in f) {
    const o = {};
    const ff = f.mapValue.fields || {};
    for (const k of Object.keys(ff)) o[k] = fsBaca(ff[k]);
    return o;
  }
  if ("referenceValue" in f) return f.referenceValue;
  if ("geoPointValue" in f) return f.geoPointValue;
  return null;
}

/**
 * Terjemahkan nomor ID angka (mis. 100000) menjadi UID akun.
 * Dua jalur: Firestore userIds/{nomor}, lalu RTDB pub (setiap profil menyimpan
 * "id" berupa nomor resmi). RTDB dipakai cadangan karena Firestore sering kena
 * batas kuota 429 dan dulu membuat pencarian ID gagal padahal akunnya ada.
 */
async function uidDariNomor(env, nomor) {
  const n = String(nomor || "").replace(/[^0-9]/g, "");
  if (!n) return { uid: "", galat: "Nomor ID kosong" };
  const d = await fsSatu(env, "userIds/" + n);
  if (d && String(d.uid || "").trim()) return { uid: String(d.uid).trim(), galat: "" };
  try {
    const token = await tokenLayanan(env);
    if (!token) return { uid: "", galat: "Akun layanan belum siap" };
    const q = `orderBy=${encodeURIComponent('"id"')}&equalTo=${encodeURIComponent(JSON.stringify(n))}`;
    const r = await fetch(`${RTDB}/pub.json?${q}&access_token=${encodeURIComponent(token)}`);
    if (r.ok) {
      const j = await r.json();
      if (j && typeof j === "object") {
        const k = Object.keys(j)[0];
        if (k) return { uid: k, galat: "" };
      }
    }
  } catch (e) { /* lanjut ke pesan di bawah */ }
  return { uid: "", galat: "ID " + n + " tidak ditemukan" };
}

/** Baca satu dokumen Firestore lewat akun layanan (null kalau tidak ada). */
async function fsSatu(env, jalur) {
  try {
    const t = await tokenLayanan(env);
    if (!t) return null;
    const proj = String(env.FIREBASE_PROJECT || "my-app-e7f8c").trim();
    const dasar = `https://firestore.googleapis.com/v1/projects/${proj}/databases/(default)/documents/`;
    const url = dasar + String(jalur || "").split("/").filter(Boolean).map(encodeURIComponent).join("/");
    const r = await fetch(url, { headers: { authorization: "Bearer " + t } });
    if (!r.ok) return null;
    return fsDok(await r.json());
  } catch (e) {
    return null;
  }
}

/** Semua UID pada satu koleksi Firestore (dipenggal 500 per permintaan). */
async function fsSemuaUid(env, koleksi, maks = 20000) {
  const keluar = [];
  try {
    const t = await tokenLayanan(env);
    if (!t) return keluar;
    const proj = String(env.FIREBASE_PROJECT || "my-app-e7f8c").trim();
    const dasar = `https://firestore.googleapis.com/v1/projects/${proj}/databases/(default)/documents/`;
    let token = "";
    while (keluar.length < maks) {
      const url = dasar + encodeURIComponent(koleksi) + "?pageSize=500" + (token ? "&pageToken=" + encodeURIComponent(token) : "");
      const r = await fetch(url, { headers: { authorization: "Bearer " + t } });
      if (!r.ok) break;
      const d = await r.json();
      for (const f of d.documents || []) {
        const nama = String(f.name || "");
        const uid = nama.slice(nama.lastIndexOf("/") + 1);
        if (uid) keluar.push(uid);
      }
      token = String(d.nextPageToken || "");
      if (!token) break;
    }
  } catch (e) { /* kembalikan yang sudah terkumpul */ }
  if (keluar.length) return keluar;
  // Cadangan: daftar kunci di RTDB pub (satu permintaan, tanpa kuota Firestore).
  try {
    const t = await tokenLayanan(env);
    if (t) {
      const r = await fetch(`${RTDB}/pub.json?shallow=true&access_token=${encodeURIComponent(t)}`);
      if (r.ok) {
        const j = await r.json();
        if (j && typeof j === "object") {
          for (const k of Object.keys(j)) if (keluar.length < maks) keluar.push(k);
        }
      }
    }
  } catch (e) { /* tetap kembalikan yang ada */ }
  return keluar;
}

function fsDok(d) {
  const o = {};
  const f = (d && d.fields) || {};
  for (const k of Object.keys(f)) o[k] = fsBaca(f[k]);
  o.id = String((d && d.name) || "").split("/").pop();
  return o;
}

async function admin(env, body) {
  const sesi = await sesiDariToken(body.t ?? "");
  if (!sesi) return json({ ok: 0, e: "Token tidak valid" }, 401);
  // Staf panel (manager/admin) boleh memakai semua fitur panel. Hanya pengelolaan
  // staf itu sendiri dan penghapusan akun yang tetap khusus developer.
  const devPanel = adalahAdmin(sesi);
  let stafPanel = false;
  if (!devPanel) {
    try {
      stafPanel = (await peranStaf(env, sesi.uid)).length > 0;
    } catch {
      stafPanel = false;
    }
    if (!stafPanel) stafPanel = !!(await peranPanelWeb(env, sesi));
  }
  const p = body.p ?? {};
  const op = String(p.op ?? "");

  // Diagnosa mandiri: op "whoami" boleh dipakai sesi sah mana pun, supaya
  // kelihatan server mengenali akun ini sebagai apa.
  if (op === "whoami") {
    let stafList = [];
    try { stafList = (await peranStaf(env, sesi.uid)).map((x) => x.role); } catch { stafList = []; }
    const web = await peranPanelWeb(env, sesi);
    return json({
      ok: 1,
      uid: sesi.uid,
      email: sesi.email || "",
      developer: devPanel ? 1 : 0,
      stafApk: stafList,
      panelWeb: web || "",
      boleh: devPanel || stafPanel || !!web ? 1 : 0,
    });
  }

  if (!devPanel && !stafPanel) {
    const web = await peranPanelWeb(env, sesi);
    return json({
      ok: 0,
      e: `Hanya admin [email=${(await emailSesi(env, sesi)) || "-"} panelWeb=${web || "-"} stafApk=- dev=0]`,
    }, 403);
  }
  const target = String(p.uid ?? "");
  // Admin (staf tingkat atas) boleh memakai semua fitur, termasuk hapus akun.
  // Yang tetap khusus developer hanya memberi/mencabut akses panel itu sendiri.
  let stafAdmin = false;
  if (!devPanel) {
    try { stafAdmin = (await peranStaf(env, sesi.uid)).some((x) => x.role === "admin"); } catch { stafAdmin = false; }
    if (!stafAdmin) {
      const pw = await peranPanelWeb(env, sesi);
      stafAdmin = pw === "admin" || pw === "owner";
    }
  }
  const khususDev = stafAdmin
    ? ["panel_grant", "panel_revoke"]
    : ["panel_grant", "panel_revoke", "delete_user", "delete_users"];
  if (!devPanel && khususDev.includes(op)) {
    return json({ ok: 0, e: `Hanya admin untuk ${op} (khusus developer)` }, 403);
  }

  // ---- Harga VIP (diubah dari panel developer) ----
  if (op === "vip_harga_get") {
    await hargaVipKini();
    return json({ ok: 1, harga: HARGA_VIP.slice(1) });
  }
  if (op === "vip_harga_set") {
    const a = Array.isArray(p.harga) ? p.harga.map(Number) : null;
    if (!a || a.length !== 9 || a.some((x) => !Number.isFinite(x) || x < 0)) {
      return gagal("Harga VIP tidak sah: isi 9 angka");
    }
    try { await hargaVipSimpan(a); }
    catch (e) { return gagal("Gagal menyimpan: " + String(e?.message ?? e)); }
    return json({ ok: 1, harga: HARGA_VIP.slice(1) });
  }

  // ---- Game Bikini: daftar bet & RTP (diubah dari panel developer) ----
  if (op === "bikini_cfg_get") {
    return json({ ok: 1, ...(await bikiniCfgKini()) });
  }
  if (op === "bikini_cfg_set") {
    try { return json({ ok: 1, ...(await bikiniCfgSimpan({ bets: p.bets, rtp: p.rtp })) }); }
    catch (err) { return gagal("Gagal menyimpan: " + String(err?.message ?? err)); }
  }

  // ---- Family: harga buat family & rasio exp->coin (diubah dari panel developer) ----
  if (op === "fam_cfg_get") {
    return json({ ok: 1, ...(await famCfgKini()) });
  }
  if (op === "fam_cfg_set") {
    const h = Number(p.harga), e = Number(p.exp_per_coin);
    if (!Number.isFinite(h) || h < 0) return gagal("Harga tidak sah");
    if (!Number.isFinite(e) || e < 1) return gagal("Rasio exp tidak sah");
    try { return json({ ok: 1, ...(await famCfgSimpan({ harga: h, exp_per_coin: e })) }); }
    catch (err) { return gagal("Gagal menyimpan: " + String(err?.message ?? err)); }
  }

  // ---- Greedy King: chip bet & RTP (disimpan lewat server, kunci layanan) ----
  if (op === "gk_cfg_get") {
    return json({ ok: 1, ...(await gkCfg(env)) });
  }
  if (op === "gk_cfg_set") {
    const bet = (Array.isArray(p.bet) ? p.bet : String(p.bet ?? "").split(","))
      .map((x) => Math.floor(Number(x) || 0)).filter((x) => x > 0).slice(0, 8);
    const rtp = Math.max(40, Math.min(200, Math.floor(Number(p.rtp ?? 75))));
    if (!bet.length) return gagal("Isi minimal satu chip bet");
    const cfgBaru = { bet: bet.sort((a, b) => a - b), rtp };
    const token = await tokenLayanan(env);
    if (!token) return gagal("Kunci layanan belum dipasang di server");
    const q = "?access_token=" + encodeURIComponent(token);
    try {
      const r1 = await fetch(`${RTDB}/pub/_greedyCfg.json${q}`, {
        method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(cfgBaru),
      });
      if (!r1.ok) return gagal("Gagal menyimpan greedy: HTTP " + r1.status);
      // Cermin ke betCfg/greedyking/chips supaya chip di aplikasi ikut berubah.
      const r2 = await fetch(`${RTDB}/betCfg/greedyking/chips.json${q}`, {
        method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(cfgBaru.bet),
      });
      const r3 = await fetch(`${RTDB}/pub/_betCfg/greedyking/chips.json${q}`, {
        method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(cfgBaru.bet),
      });
      if (!r2.ok || !r3.ok) return json({ ok: 1, ...cfgBaru, catatan: "chip tersimpan, cermin betCfg gagal" });
    } catch (e) {
      return gagal("Gagal menyimpan greedy: " + String(e?.message ?? e));
    }
    cache.delete("pub/_greedyCfg");
    return json({ ok: 1, ...cfgBaru });
  }

  // ---- Banner pemenang game (dipakai Greedy King & Crazy Fruit) ----
  if (op === "win_banner_get") {
    const url = (await bacaRtdbNilai(env, "betCfg/gameWinBanner")) || "";
    return json({ ok: 1, url: typeof url === "string" ? url : "" });
  }
  if (op === "win_banner_set") {
    const url = String(p.url ?? "").trim().slice(0, 400);
    try {
      await tulisRtdbSa(env, "betCfg/gameWinBanner", url || null);
      return json({ ok: 1, url });
    } catch (e) {
      return gagal("Gagal menyimpan banner: " + String(e?.message ?? e));
    }
  }

  if (op === "cf_cfg_get") {
    return json({ ok: 1, ...(await cfCfg(env)) });
  }
  if (op === "cf_cfg_set") {
    const bet = (Array.isArray(p.bet) ? p.bet : String(p.bet ?? "").split(","))
      .map((x) => Math.floor(Number(x) || 0)).filter((x) => x > 0).slice(0, 8);
    const rtp = Math.max(50, Math.min(120, Math.floor(Number(p.rtp ?? CF_BAWAAN.rtp))));
    if (!bet.length) return gagal("Isi minimal satu chip bet");
    const cfgBaru = { bet: bet.sort((a, b) => a - b), rtp };
    const token = await tokenLayanan(env);
    if (!token) return gagal("Kunci layanan belum dipasang di server");
    const q = "?access_token=" + encodeURIComponent(token);
    try {
      const r1 = await fetch(`${RTDB}/pub/_cfCfg.json${q}`, {
        method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(cfgBaru),
      });
      if (!r1.ok) return gagal("Gagal menyimpan Crazy Fruit: HTTP " + r1.status);
      // Cermin ke betCfg supaya chip di aplikasi ikut berubah.
      const r2 = await fetch(`${RTDB}/betCfg/crazyfruit/chips.json${q}`, {
        method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(cfgBaru.bet),
      });
      const r3 = await fetch(`${RTDB}/pub/_betCfg/crazyfruit/chips.json${q}`, {
        method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(cfgBaru.bet),
      });
      if (!r2.ok || !r3.ok) return json({ ok: 1, ...cfgBaru, catatan: "chip tersimpan, cermin betCfg gagal" });
    } catch (e) {
      return gagal("Gagal menyimpan Crazy Fruit: " + String(e?.message ?? e));
    }
    cache.delete("pub/_cfCfg");
    return json({ ok: 1, ...cfgBaru });
  }

  // ---- Roket: hadiah tiap level (1-5) dan hadiah peringkat Top 1-3 ----
  if (op === "rocket_cfg_get") {
    const pub = await cfgRtdb("pub/_rocketCfg", env);
    const akar = await cfgRtdb("rocketCfg", env);
    const lv = {};
    for (let n = 1; n <= 5; n++) {
      const a = (akar["lv" + n] && typeof akar["lv" + n] === "object") ? akar["lv" + n] : {};
      const b = (pub["lv" + n] && typeof pub["lv" + n] === "object") ? pub["lv" + n] : {};
      const gab = {};
      for (let k = 1; k <= 6; k++) {
        const x = b["r" + k] ?? b["p" + k] ?? a["r" + k] ?? a["p" + k];
        gab["r" + k] = {
          coins: Math.max(0, Math.floor(Number(x?.coins ?? 0))),
          vip: Math.max(0, Math.min(9, Math.floor(Number(x?.vip ?? 0)))),
          days: Math.max(0, Math.floor(Number(x?.days ?? 30))),
        };
      }
      lv[n] = gab;
    }
    const rank = {};
    for (let k = 1; k <= 4; k++) {
      const x = pub?.rank?.["t" + k] ?? akar?.rank?.["t" + k];
      rank[k] = {
        coins: Math.max(0, Math.floor(Number(x?.coins ?? 0))),
        vip: Math.max(0, Math.min(9, Math.floor(Number(x?.vip ?? 0)))),
        days: Math.max(0, Math.floor(Number(x?.days ?? 30))),
      };
    }
    // Syarat energi (EXP) tiap roket: dibaca aplikasi dari rocketCfg/exp1..exp5.
    const expBaku = [100000000, 500000000, 1000000000, 1500000000, 2000000000];
    const exp = [];
    for (let n = 1; n <= 5; n++) {
      const v = Number(akar["exp" + n] ?? pub["exp" + n]);
      exp.push(Number.isFinite(v) && v > 0 ? Math.floor(v) : expBaku[n - 1]);
    }
    return json({ ok: 1, lv, rank, exp });
  }
  if (op === "rocket_cfg_set") {
    const brt = (x) => {
      const coins = Math.max(0, Math.floor(Number(x?.coins ?? 0)));
      const vip = Math.max(0, Math.min(9, Math.floor(Number(x?.vip ?? 0))));
      const days = Math.max(0, Math.min(3650, Math.floor(Number(x?.days ?? 30))));
      return { coins, vip, days };
    };
    const expBaku = [100000000, 500000000, 1000000000, 1500000000, 2000000000];
    const expMasuk = Array.isArray(p.exp) ? p.exp : [];
    const exp = [];
    for (let n = 1; n <= 5; n++) {
      const v = Math.floor(Number(expMasuk[n - 1]));
      exp.push(Number.isFinite(v) && v > 0 ? v : expBaku[n - 1]);
    }
    const lvMasuk = p.lv && typeof p.lv === "object" ? p.lv : {};
    const rankMasuk = p.rank && typeof p.rank === "object" ? p.rank : {};
    const lv = {};
    for (let n = 1; n <= 5; n++) {
      lv["lv" + n] = {};
      for (let k = 1; k <= 6; k++) lv["lv" + n]["r" + k] = brt(lvMasuk?.[n]?.["r" + k] ?? lvMasuk?.[n]?.[k]);
    }
    const rank = {};
    for (let k = 1; k <= 4; k++) rank["t" + k] = brt(rankMasuk?.[k] ?? rankMasuk?.["t" + k]);
    const token = await tokenLayanan(env);
    if (!token) return gagal("Kunci layanan belum dipasang di server");
    const q = "?access_token=" + encodeURIComponent(token);
    try {
      // Dua tempat: "rocketCfg" dibaca aplikasi, "pub/_rocketCfg" dipakai server
      // saat membagikan hadiah roket dan hadiah peringkat.
      for (const [jalur, isi] of [
        ["rocketCfg", ""],
        ["pub/_rocketCfg", ""],
      ]) {
        for (const kunci of Object.keys(lv)) {
          const r = await fetch(`${RTDB}/${jalur}/${kunci}.json${q}`, {
            method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(lv[kunci]),
          });
          if (!r.ok) return gagal("Gagal menyimpan hadiah roket: HTTP " + r.status);
        }
        const r2 = await fetch(`${RTDB}/${jalur}/rank.json${q}`, {
          method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(rank),
        });
        if (!r2.ok) return gagal("Gagal menyimpan hadiah peringkat: HTTP " + r2.status);
        for (let n = 1; n <= 5; n++) {
          const r3 = await fetch(`${RTDB}/${jalur}/exp${n}.json${q}`, {
            method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(exp[n - 1]),
          });
          if (!r3.ok) return gagal("Gagal menyimpan energi roket: HTTP " + r3.status);
        }
      }
    } catch (e) {
      return gagal("Gagal menyimpan roket: " + String(e?.message ?? e));
    }
    cache.delete("pub/_rocketCfg");
    cache.delete("rocketCfg");
    return json({ ok: 1, lv, rank, exp });
  }

  // ---- Cashback gift: disimpan lewat server supaya tidak kena aturan RTDB ----
  if (op === "cb_cfg_get") {
    return json({ ok: 1, cfg: await cfgRtdb("pub/_cashbackCfg") });
  }
  if (op === "cb_cfg_set") {
    const c = p.cfg && typeof p.cfg === "object" ? p.cfg : null;
    if (!c) return gagal("Pengaturan cashback tidak sah");
    const token = await tokenLayanan(env);
    if (!token) return gagal("Kunci layanan belum dipasang di server");
    try {
      const r = await fetch(
        `${RTDB}/pub/_cashbackCfg.json?access_token=${encodeURIComponent(token)}`,
        { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(c) },
      );
      if (!r.ok) return gagal("Gagal menyimpan cashback: HTTP " + r.status);
    } catch (e) {
      return gagal("Gagal menyimpan cashback: " + String(e?.message ?? e));
    }
    cache.delete("pub/_cashbackCfg");
    return json({ ok: 1, cfg: c });
  }

  // ---- Coin seller: pendaftaran (khusus developer) ----
  if (op === "seller_list") {
    return json({ ok: 1, seller: await daftarSeller(env, false) });
  }
  if (op === "seller_save") {
    const who = String(p.uid ?? "").trim();
    if (!/^[A-Za-z0-9_-]{6,64}$/.test(who)) return gagal("UID tidak valid");
    if (/^[0-9]+$/.test(who)) return gagal("Pakai UID akun, bukan ID angka");
    const store = String(p.store ?? "").trim().slice(0, 60);
    const wa = String(p.wa ?? "").trim().slice(0, 32);
    const link = String(p.link ?? "").trim().slice(0, 300);
    const aktif = p.active === undefined ? 1 : (Number(p.active) ? 1 : 0);
    if (!store) return gagal("Nama toko wajib diisi");
    if (!wa) return gagal("Nomor WhatsApp wajib diisi");
    await siapSeller(env);
    const now = Date.now();
    await pipe(env, [
      {
        sql: `insert into coin_seller (uid, store, wa, wa_link, active, updated_at)
              values (?, ?, ?, ?, ?, ?)
              on conflict (uid) do update set
                store = excluded.store, wa = excluded.wa,
                wa_link = excluded.wa_link, active = excluded.active,
                updated_at = excluded.updated_at`,
        args: [T(who), T(store), T(wa), T(link), I(aktif), I(now)],
      },
    ]);
    return json({ ok: 1, seller: await satuSeller(env, who) });
  }
  if (op === "seller_set_active") {
    const who = String(p.uid ?? "").trim();
    if (!who) return gagal("UID kosong");
    await siapSeller(env);
    const aktif = Number(p.active) ? 1 : 0;
    const r = await pipe(env, [
      { sql: "update coin_seller set active = ?, updated_at = ? where uid = ?", args: [I(aktif), I(Date.now()), T(who)] },
    ]);
    if (!r[0].affected) return gagal("Seller belum terdaftar");
    return json({ ok: 1, seller: await satuSeller(env, who) });
  }
  if (op === "seller_bersih") {
    // Hapus seller yang UID-nya tidak punya dompet di database Viza (sisa
    // salinan dari aplikasi lain). Tidak menyentuh seller milik Viza.
    await siapSeller(env);
    const dompet = await uidPunyaDompet(env);
    if (!dompet) return gagal("Tabel wallets belum ada, tidak ada yang dihapus");
    const r = await pipe(env, [{ sql: "select uid, store from coin_seller" }]);
    const buang = (r[0].rows || []).filter((x) => !dompet.has(String(x.uid || "")));
    if (!buang.length) return json({ ok: 1, hapus: 0, list: [] });
    for (const x of buang) {
      await pipe(env, [{ sql: "delete from coin_seller where uid = ?", args: [T(String(x.uid))] }]);
    }
    return json({ ok: 1, hapus: buang.length, list: buang.map((x) => x.store || x.uid) });
  }
  if (op === "seller_del") {
    const who = String(p.uid ?? "").trim();
    if (!who) return gagal("UID kosong");
    await siapSeller(env);
    await pipe(env, [{ sql: "delete from coin_seller where uid = ?", args: [T(who)] }]);
    return json({ ok: 1, uid: who });
  }
  // ---- Stok coin seller (tab terpisah, khusus developer) ----
  if (op === "seller_stock") {
    const who = String(p.uid ?? "").trim();
    if (!who) return gagal("UID kosong");
    await siapSeller(env);
    const ada = await pipe(env, [{ sql: "select stock from coin_seller where uid = ?", args: [T(who)] }]);
    if (!ada[0].rows.length) return gagal("Seller belum terdaftar");
    const mode = String(p.mode ?? "add");
    const n = Math.trunc(Number(p.coins ?? 0));
    if (!Number.isFinite(n) || n === 0) return gagal("Jumlah coin tidak valid");
    const now = Date.now();
    if (mode === "set") {
      if (n < 0) return gagal("Stok tidak boleh negatif");
      if (n > MAKS_STOK) return gagal("Stok maksimal " + MAKS_STOK.toLocaleString("id-ID") + " coin");
      await pipe(env, [
        { sql: "update coin_seller set stock = ?, updated_at = ? where uid = ?", args: [I(n), I(now), T(who)] },
      ]);
    } else {
      // Penambahan dibatasi MAKS_STOK: dulu stok bisa terus membengkak sampai
      // melewati batas angka JavaScript, lalu seluruh daftar seller gagal dibaca.
      await pipe(env, [
        {
          sql: `update coin_seller set stock = min(?, case when stock + ? < 0 then 0 else stock + ? end),
                  updated_at = ? where uid = ?`,
          args: [I(MAKS_STOK), I(n), I(n), I(now), T(who)],
        },
      ]);
    }
    return json({ ok: 1, seller: await satuSeller(env, who) });
  }

  // ---- Agensi (khusus developer) ----
  if (op === "agency_list") {
    await siapAgency(env);
    const bulan = bulanIni();
    const r = await pipe(env, [
      {
        sql: `select a.id, a.nama, a.owner_uid, a.kode, a.rate, a.aktif, a.saldo,
                     (select count(*) from agency_host h where h.agency_id = a.id and h.aktif = 1) as host,
                     coalesce((select e.coins from agency_earn e where e.agency_id = a.id and e.bulan = ?), 0) as bulan_ini
              from agency a order by a.created_at desc limit 200`,
        args: [T(bulan)],
      },
    ]);
    return json({ ok: 1, bulan, agency: r[0].rows });
  }
  if (op === "agency_save") {
    await siapAgency(env);
    const nama = String(p.nama ?? "").trim().slice(0, 60);
    const owner = String(p.ownerUid ?? p.owner ?? "").trim();
    const rate = Math.max(0, Math.min(100, Math.trunc(Number(p.rate ?? 10))));
    const aktif = p.aktif === undefined ? 1 : (Number(p.aktif) ? 1 : 0);
    if (!nama) return gagal("Nama agensi wajib diisi");
    if (owner && /^[0-9]+$/.test(owner)) return gagal("Pemilik harus UID akun, bukan ID angka. Pilih akunnya lewat kotak cari di panel.");
    if (owner && !/^[A-Za-z0-9_-]{6,64}$/.test(owner)) return gagal("UID pemilik tidak valid");
    const id = String(p.id ?? "").trim() || ("ag-" + Date.now().toString(36));
    const ada = await pipe(env, [{ sql: "select id, kode from agency where id = ?", args: [T(id)] }]);
    const kode = ada[0].rows[0]?.kode || kodeAgensi();
    await pipe(env, [
      {
        sql: `insert into agency (id, nama, owner_uid, kode, rate, aktif) values (?, ?, ?, ?, ?, ?)
              on conflict (id) do update set
                nama = excluded.nama, owner_uid = excluded.owner_uid,
                rate = excluded.rate, aktif = excluded.aktif`,
        args: [T(id), T(nama), T(owner), T(kode), I(rate), I(aktif)],
      },
    ]);
    // Satu akun hanya memiliki satu agensi: agensi lain dengan pemilik yang sama
    // dikosongkan pemiliknya, supaya agency_info di aplikasi tidak memilih yang salah.
    if (owner) {
      await pipe(env, [
        { sql: "update agency set owner_uid = '' where owner_uid = ? and id <> ?", args: [T(owner), T(id)] },
      ]);
    }
    const r = await pipe(env, [
      { sql: "select id, nama, owner_uid, kode, rate, aktif, saldo from agency where id = ?", args: [T(id)] },
    ]);
    return json({ ok: 1, agency: r[0].rows[0] });
  }
  if (op === "agency_del") {
    await siapAgency(env);
    const id = String(p.id ?? "").trim();
    if (!id) return gagal("ID agensi kosong");
    await pipe(env, [
      { sql: "update agency_host set aktif = 0 where agency_id = ?", args: [T(id)] },
      { sql: "delete from agency where id = ?", args: [T(id)] },
    ]);
    return json({ ok: 1, id });
  }
  if (op === "agency_hosts") {
    await siapAgency(env);
    const id = String(p.id ?? "").trim();
    const r = await pipe(env, [
      {
        sql: `select h.host_uid, h.sejak, h.aktif,
                     coalesce((select sum(t.amount) from money_tx t
                               where t.uid = h.host_uid and t.kind = 'gift_in'), 0) as total_gift
              from agency_host h where h.agency_id = ? order by h.sejak desc limit 300`,
        args: [T(id)],
      },
    ]);
    return json({ ok: 1, host: r[0].rows });
  }
  if (op === "agency_attach" || op === "agency_detach") {
    await siapAgency(env);
    const who = String(p.uid ?? "").trim();
    if (!/^[A-Za-z0-9_-]{6,64}$/.test(who)) return gagal("UID host tidak valid");
    if (op === "agency_detach") {
      await pipe(env, [{ sql: "update agency_host set aktif = 0 where host_uid = ?", args: [T(who)] }]);
      return json({ ok: 1, uid: who, agency: null });
    }
    const id = String(p.id ?? "").trim();
    const ada = await pipe(env, [{ sql: "select id from agency where id = ?", args: [T(id)] }]);
    if (!ada[0].rows.length) return gagal("Agensi tidak ditemukan");
    await pipe(env, [
      {
        sql: `insert into agency_host (host_uid, agency_id, aktif, sejak) values (?, ?, 1, ?)
              on conflict (host_uid) do update set agency_id = excluded.agency_id, aktif = 1`,
        args: [T(who), T(id), I(Date.now())],
      },
    ]);
    return json({ ok: 1, uid: who, agency: id });
  }
  if (op === "iklan_stat") {
    await siapIklan(env);
    const at = await aturIklan(env);
    const r = await pipe(env, [
      {
        sql: `select count(*) as n, coalesce(sum(coins), 0) as coins, count(distinct uid) as orang
              from iklan_klaim where at >= ?`,
        args: [I(Date.now() - 86400000)],
      },
    ]);
    const total = await pipe(env, [{ sql: "select count(*) as n, coalesce(sum(coins),0) as coins from iklan_klaim" }]);
    return json({ ok: 1, atur: at, hari: r[0].rows[0], total: total[0].rows[0] });
  }
  if (op === "agency_cair_info") {
    await siapAgency(env);
    return json({ ok: 1, cair: await batasCairAgensi(env) });
  }
  if (op === "agency_cair_set") {
    if (!devPanel) return json({ ok: 0, e: "Hanya developer" }, 403);
    const n = Math.max(0, Math.min(100, Math.trunc(Number(p.persen ?? 10))));
    await pipe(env, [
      {
        sql: `insert into app_cfg (kunci, nilai, updated_at) values ('agency_cair_persen', ?, ?)
              on conflict (kunci) do update set nilai = excluded.nilai, updated_at = excluded.updated_at`,
        args: [T(String(n)), I(Date.now())],
      },
    ]);
    cache.delete("cfg");
    return json({ ok: 1, cair: await batasCairAgensi(env) });
  }
  if (op === "agency_req_list") {
    await siapAgency(env);
    const r = await pipe(env, [
      {
        sql: `select q.id, q.agency_id, q.coins, q.status, q.at, a.nama
              from agency_req q left join agency a on a.id = q.agency_id
              order by q.at desc limit 100`,
      },
    ]);
    return json({ ok: 1, req: r[0].rows });
  }
  if (op === "agency_req_batal") {
    await siapAgency(env);
    const id = Math.trunc(Number(p.reqId ?? 0));
    const r = await pipe(env, [{ sql: "select id, status from agency_req where id = ?", args: [I(id)] }]);
    const row = r[0].rows[0];
    if (!row) return gagal("Pengajuan tidak ditemukan");
    if (row.status !== "menunggu") return gagal("Pengajuan sudah diproses");
    // Saldo komisi tidak dipotong, hanya pengajuannya ditolak.
    await pipe(env, [
      { sql: "update agency_req set status = 'tolak', oleh = ? where id = ?", args: [T(String(p.oleh ?? "panel")), I(id)] },
    ]);
    return json({ ok: 1, id, status: "tolak" });
  }
  if (op === "agency_req_done") {
    await siapAgency(env);
    const id = Math.trunc(Number(p.reqId ?? 0));
    const r = await pipe(env, [{ sql: "select id, agency_id, coins, status from agency_req where id = ?", args: [I(id)] }]);
    const row = r[0].rows[0];
    if (!row) return gagal("Pengajuan tidak ditemukan");
    if (row.status !== "menunggu") return gagal("Pengajuan sudah diproses");
    // Kunci kerugian: pengajuan yang membuat total pencairan bulan ini melewati
    // batas (persen dari coin topup sah) tidak boleh ditandai dibayar. Untuk
    // membayarnya, naikkan persen batas di panel atau batalkan pengajuannya.
    const batas = await batasCairAgensi(env);
    if (batas.batas <= 0) {
      return gagal("Belum ada topup coin bulan ini, jadi pencairan rupiah ditutup. Batalkan pengajuan ini atau tunggu ada topup.");
    }
    if (batas.dipakai > batas.batas) {
      return gagal("Total pengajuan bulan ini " + batas.dipakai + " coin melebihi batas " + batas.batas + " coin (" + batas.persen + "% dari topup sah). Naikkan persen batas di panel atau batalkan pengajuan ini.");
    }
    await pipeTrx(env, [
      { sql: "begin immediate" },
      { sql: "update agency_req set status = 'dibayar', oleh = ? where id = ?", args: [T(String(p.oleh ?? "admin")), I(id)] },
      { sql: "update agency set saldo = max(0, saldo - ?) where id = ?", args: [I(row.coins), T(row.agency_id)] },
      { sql: "commit" },
    ]);
    return json({ ok: 1, id, status: "dibayar" });
  }

  // ---- Panel developer: atur panel manager/admin ----
  // ---- Kirim coin / diamond / VIP ke satu akun (menu "Send coin") ----
  // Hanya developer. Nilai coin & diamond ditambahkan, VIP memakai sisa masa
  // aktif yang masih berjalan supaya perpanjangan tidak memotong hari lama.
  if (op === "hadiah_user") {
    if (!devPanel) return json({ ok: 0, e: "Hanya developer" }, 403);
    const coin = Math.trunc(Number(p.coins ?? 0) || 0);
    const gem = Math.trunc(Number(p.diamonds ?? 0) || 0);
    const vip = Math.max(0, Math.min(9, Math.trunc(Number(p.vip ?? 0) || 0)));
    const hari = Math.max(0, Math.min(3650, Math.trunc(Number(p.hari ?? 0) || 0)));
    if (coin < 0 || gem < 0) return gagal("Jumlah coin/diamond tidak boleh minus");
    if (coin === 0 && gem === 0 && vip === 0) return gagal("Isi coin, diamond, atau VIP dulu");
    const semua = p.semua === true || String(p.semua ?? "") === "1";
    const sekarang = Date.now();

    // ---- Kirim ke semua user ----
    if (semua) {
      const uids = await fsSemuaUid(env, "users", 20000);
      if (!uids.length) return gagal("Daftar user tidak terbaca");
      let n = 0;
      for (let i = 0; i < uids.length; i += 100) {
        const bagian = uids.slice(i, i + 100);
        const stmt = [];
        for (const u of bagian) {
          stmt.push({ sql: "insert or ignore into wallets (uid) values (?)", args: [T(u)] });
          stmt.push({
            sql: "update wallets set coins = coins + ?, diamonds = diamonds + ?, updated_at = ? where uid = ?",
            args: [I(coin), I(gem), I(sekarang), T(u)],
          });
          if (vip > 0) {
            // Masa aktif ditambahkan dari sisa yang masih berjalan.
            stmt.push({
              sql: "update wallets set vip = ?, vip_until = max(coalesce(vip_until, 0), ?) + ?, updated_at = ? where uid = ?",
              args: [I(vip), I(sekarang), I(hari * 86400000), I(sekarang), T(u)],
            });
          }
        }
        await pipe(env, stmt);
        n += bagian.length;
      }
      return json({ ok: 1, semua: 1, jumlah: n, dikirim: { coins: coin, diamonds: gem, vip, hari } });
    }

    // ---- Satu akun: boleh pakai UID atau nomor ID angka ----
    let who = String(p.uid ?? "").trim();
    const nomorId = String(p.id ?? "").replace(/[^0-9]/g, "");
    if (!who && nomorId) {
      const cari = await uidDariNomor(env, nomorId);
      who = cari.uid;
      if (!who) return gagal(cari.galat || ("ID " + nomorId + " tidak ditemukan"));
    }
    if (!/^[A-Za-z0-9_-]{6,64}$/.test(who)) return gagal("Isi UID atau nomor ID user");
    try { await pastikan(env, who); } catch (e) { return gagal("Akun belum punya dompet: " + String(e?.message ?? e)); }
    const kini = await pipe(env, [
      { sql: "select coins, diamonds, vip, vip_until from wallets where uid = ?", args: [T(who)] },
    ]);
    const lama = kini[0].rows[0];
    if (!lama) return gagal("Dompet akun tidak ditemukan");
    let vipBaru = Number(lama.vip ?? 0);
    let sampai = Number(lama.vip_until ?? 0);
    if (vip > 0) {
      vipBaru = vip;
      if (hari > 0) sampai = Math.max(sekarang, sampai) + hari * 86400000;
    }
    const ubah = [];
    if (coin) ubah.push({ sql: "update wallets set coins = coins + ?, updated_at = ? where uid = ?", args: [I(coin), I(sekarang), T(who)] });
    if (gem) ubah.push({ sql: "update wallets set diamonds = diamonds + ?, updated_at = ? where uid = ?", args: [I(gem), I(sekarang), T(who)] });
    if (vip > 0) ubah.push({ sql: "update wallets set vip = ?, vip_until = ?, updated_at = ? where uid = ?", args: [I(vipBaru), I(sampai), I(sekarang), T(who)] });
    if (ubah.length) await pipe(env, ubah);
    const akhir = await pipe(env, [
      { sql: "select coins, diamonds, vip, vip_until from wallets where uid = ?", args: [T(who)] },
    ]);
    const w = akhir[0].rows[0] || {};
    return json({
      ok: 1, uid: who, nomor: nomorId || "",
      coins: Number(w.coins ?? 0), diamonds: Number(w.diamonds ?? 0),
      vip: Number(w.vip ?? 0), vipUntil: Number(w.vip_until ?? 0),
      dikirim: { coins: coin, diamonds: gem, vip, hari },
    });
  }

  if (op === "panel_grant") {
    const who = String(p.uid ?? "").trim();
    const role = String(p.role ?? "").trim();
    if (!/^[A-Za-z0-9_-]{6,64}$/.test(who)) return gagal("UID tidak valid");
    if (role !== "manager" && role !== "admin") return gagal("Peran harus manager atau admin");
    const manager = role === "admin" ? String(p.manager ?? "").trim() : "";
    await pipe(env, [
      {
        sql: `insert into panel_staf (uid, role, manager, active, created_at) values (?, ?, ?, 1, ?)
              on conflict (uid, role) do update set manager = excluded.manager, active = 1`,
        args: [T(who), T(role), T(manager), I(Date.now())],
      },
    ]);
    return json({ ok: 1, uid: who, role, manager });
  }
  if (op === "panel_revoke") {
    const who = String(p.uid ?? "").trim();
    if (!who) return gagal("UID kosong");
    const role = String(p.role ?? "").trim();
    if (role === "manager" || role === "admin") {
      await pipe(env, [
        { sql: "update panel_staf set active = 0 where uid = ? and role = ?", args: [T(who), T(role)] },
      ]);
      return json({ ok: 1, uid: who, role });
    }
    await pipe(env, [{ sql: "update panel_staf set active = 0 where uid = ?", args: [T(who)] }]);
    return json({ ok: 1, uid: who, role: "" });
  }
  if (op === "panel_list") {
    const r = await pipe(env, [
      {
        sql: `select s.uid, s.role, s.manager, s.active, s.created_at, s.coins,
                     (select count(*) from panel_stock k where k.owner_uid = s.uid) as stok
              from panel_staf s order by s.created_at desc limit 300`,
      },
    ]);
    return json({ ok: 1, list: r[0].rows });
  }
  if (op === "panel_coin_add" || op === "panel_coin_set") {
    const who = String(p.uid ?? "").trim();
    if (!/^[A-Za-z0-9_-]{6,64}$/.test(who)) return gagal("UID tidak valid");
    const n = Math.trunc(Number(p.coins ?? 0));
    if (!Number.isFinite(n)) return gagal("Jumlah coin tidak valid");
    const role = String(p.role ?? "manager").trim() === "admin" ? "admin" : "manager";
    if (op === "panel_coin_add") {
      await pipe(env, [
        { sql: "update panel_staf set coins = min(?, max(0, coins + ?)) where uid = ? and role = ?", args: [I(MAKS_STOK), I(n), T(who), T(role)] },
      ]);
    } else {
      await pipe(env, [
        { sql: "update panel_staf set coins = ? where uid = ? and role = ?", args: [I(Math.min(MAKS_STOK, Math.max(0, n))), T(who), T(role)] },
      ]);
    }
    const r = await pipe(env, [
      { sql: "select coins from panel_staf where uid = ? and role = ?", args: [T(who), T(role)] },
    ]);
    return json({ ok: 1, uid: who, role, coins: Number(r[0].rows[0]?.coins ?? 0) });
  }
  if (op === "panel_stock_add") {
    const who = String(p.uid ?? "").trim();
    const itemId = String(p.itemId ?? p.item_id ?? "").trim();
    if (!who || !itemId) return gagal("UID dan item wajib diisi");
    await pipe(env, [
      {
        sql: `insert into panel_stock (owner_uid, item_id, kind, name, days, created_at) values (?, ?, ?, ?, ?, ?)
              on conflict (owner_uid, item_id) do update set kind = excluded.kind,
                name = excluded.name, days = excluded.days`,
        args: [T(who), T(itemId), T(String(p.kind ?? "")), T(String(p.name ?? "")), I(Math.trunc(Number(p.days ?? 7))), I(Date.now())],
      },
    ]);
    return json({ ok: 1, uid: who, itemId });
  }
  if (op === "panel_stock_del") {
    await pipe(env, [
      { sql: "delete from panel_stock where owner_uid = ? and item_id = ?", args: [T(String(p.uid ?? "")), T(String(p.itemId ?? ""))] },
    ]);
    return json({ ok: 1 });
  }
  if (op === "panel_stock_list") {
    const r = await pipe(env, [
      { sql: "select owner_uid, item_id, kind, name, days from panel_stock where owner_uid = ? order by created_at desc", args: [T(String(p.uid ?? ""))] },
    ]);
    return json({ ok: 1, list: r[0].rows });
  }
  if (op === "paket_get") return json({ ok: 1, paket: await daftarPaket(env) });
  if (op === "paket_set") {
    const daftar = Array.isArray(p.paket) ? p.paket : [];
    const bersih = [];
    for (const x of daftar) {
      const c = Math.trunc(Number(x?.coins ?? 0));
      const h = Math.trunc(Number(x?.harga ?? 0));
      const a = x?.aktif === undefined ? 1 : (Number(x.aktif) ? 1 : 0);
      if (!(c > 0) || !(h >= 0)) return gagal("Paket tidak sah: coin dan harga harus angka");
      bersih.push({ c, h, a });
    }
    if (!bersih.length) return gagal("Daftar paket kosong");
    const kini = Date.now();
    await pipe(env, [
      { sql: "delete from coin_paket" },
      ...bersih.map((x) => ({
        sql: "insert into coin_paket (coins, harga, aktif, updated_at) values (?, ?, ?, ?)",
        args: [I(x.c), I(x.h), I(x.a), I(kini)],
      })),
    ]);
    return json({ ok: 1, paket: await daftarPaket(env) });
  }
  // ---- Pengaturan aplikasi dari panel (khusus developer) ----
  if (op === "cfg_get") {
    if (!devPanel) return json({ ok: 0, e: "Hanya developer" }, 403);
    const c = await cfgSemua(env, true);
    const keluar = {};
    for (const k of CFG_KUNCI) {
      const nilai = c[k] ?? "";
      keluar[k] = CFG_RAHASIA.has(k) ? { ada: nilai ? 1 : 0, samar: samarkan(nilai) } : nilai;
    }
    const ag = await agoraKredensial(env);
    keluar.agoraSumber = c.agoraAppId ? "panel" : (env.AGORA_APP_ID ? "server" : "kosong");
    keluar.agoraAppIdAktif = ag.appId;
    return json({ ok: 1, cfg: keluar });
  }
  if (op === "cfg_set") {
    if (!devPanel) return json({ ok: 0, e: "Hanya developer" }, 403);
    const isi = (p.nilai && typeof p.nilai === "object") ? p.nilai : {};
    const tulis = [];
    for (const k of Object.keys(isi)) {
      if (!CFG_KUNCI.has(k)) return gagal("Kunci tidak dikenal: " + k);
      let v = String(isi[k] ?? "").trim();
      // Rahasia yang dikosongkan di formulir berarti "jangan diubah".
      if (CFG_RAHASIA.has(k) && v === "") continue;
      if (v.length > 12000) return gagal("Isian " + k + " terlalu panjang");
      if (k === "agoraAppId" && !/^[0-9a-f]{32}$/i.test(v)) return gagal("App ID Agora harus 32 karakter heksadesimal");
      if (k === "agoraCert" && !/^[0-9a-f]{32}$/i.test(v)) return gagal("App Certificate Agora harus 32 karakter heksadesimal");
      if (k === "fcmJson") {
        try {
          const j = JSON.parse(v);
          if (j.type !== "service_account" || !j.private_key || !j.client_email) return gagal("JSON bukan kunci akun layanan Firebase");
        } catch { return gagal("JSON Firebase tidak bisa dibaca"); }
      }
      if (k === "stripeSecret" && !/^(sk|rk)_(test|live)_/.test(v)) return gagal("Stripe Secret Key harus diawali sk_test_ atau sk_live_");
      if (k === "stripePub" && !/^pk_(test|live)_/.test(v)) return gagal("Stripe Publishable Key harus diawali pk_test_ atau pk_live_");
      if (k === "stripeAktif" || k === "paystackAktif") v = (v === "1" || v === "true") ? "1" : "0";
      if (k === "assetPackage" && v && !/^[A-Za-z][A-Za-z0-9_]*(\.[A-Za-z0-9_]+)+$/.test(v)) return gagal("Nama paket Android tidak sah (mis. com.viza.chat)");
      if (k === "assetSha256" && v) {
        const rapi = v.replace(/\s/g, "").toUpperCase();
        if (!/^([0-9A-F]{2}:){31}[0-9A-F]{2}$/.test(rapi)) return gagal("SHA-256 harus 32 pasang heksadesimal dipisah titik dua");
        v = rapi;
      }
      tulis.push({
        sql: `insert into app_cfg (kunci, nilai, updated_at) values (?, ?, ?)
              on conflict (kunci) do update set nilai = excluded.nilai, updated_at = excluded.updated_at`,
        args: [T(k), T(v), I(Date.now())],
      });
    }
    // App ID dan Certificate harus diganti berpasangan agar suara tidak rusak.
    const baruId = isi.agoraAppId !== undefined && String(isi.agoraAppId).trim() !== "";
    const baruCert = isi.agoraCert !== undefined && String(isi.agoraCert).trim() !== "";
    if (baruId !== baruCert) return gagal("Isi App ID dan App Certificate Agora sekaligus");
    if (tulis.length) await pipe(env, tulis);
    cfgCache = { at: 0, v: {} };
    // Uji langsung: bila Agora diganti, buat satu token percobaan agar ketahuan sah atau tidak.
    let ujiAgora = null;
    if (baruId && baruCert) {
      try {
        const m = await import("agora-token");
        const pk = m.default ?? m;
        const tk = pk.RtcTokenBuilder.buildTokenWithUserAccount(
          String(isi.agoraAppId).trim(), String(isi.agoraCert).trim(), "uji", "uji", pk.RtcRole.PUBLISHER, 600, 600);
        ujiAgora = tk ? 1 : 0;
      } catch { ujiAgora = 0; }
    }
    return json({ ok: 1, disimpan: tulis.length, ujiAgora });
  }
  if (op === "pay_get") return json({ ok: 1, pay: await infoBayar(env) });
  if (op === "pay_set") {
    await pipe(env, [
      {
        sql: `insert into pay_info (id, dana, nama, gopay, qris, updated_at) values (1, ?, ?, ?, ?, ?)
              on conflict (id) do update set dana = excluded.dana, nama = excluded.nama,
                gopay = excluded.gopay, qris = excluded.qris, updated_at = excluded.updated_at`,
        args: [T(p.dana ?? ""), T(p.name ?? ""), T(p.gopay ?? ""), T(p.qris ?? ""), I(Date.now())],
      },
    ]);
    return json({ ok: 1, pay: await infoBayar(env) });
  }
  if (op === "manual_pending" || op === "manual_all") {
    const semua = op === "manual_all";
    const r = await pipe(env, [
      {
        sql: `select id, uid, coins, amount, payer, method, status, created_at
              from topup_manual ${semua ? "" : "where status = 'pending'"}
              order by created_at desc limit ?`,
        args: [I(p.limit ?? 60)],
      },
    ]);
    return json({ ok: 1, list: r[0].rows });
  }
  if (op === "manual_decide") {
    const id = String(p.id ?? "");
    const setuju = p.ok === true || p.ok === "true";
    const cur = await pipe(env, [
      { sql: "select uid, coins, status from topup_manual where id = ?", args: [T(id)] },
    ]);
    const row = cur[0].rows[0];
    if (!row) return gagal("Pengajuan tidak ditemukan");
    if (row.status !== "pending") return gagal("Pengajuan sudah diproses (status sekarang: " + String(row.status) + ")");
    // Kunci baris dulu supaya klik ganda tidak menambah coin dua kali.
    // decided_at hanya penanda waktu. Kalau database lama belum punya kolomnya,
    // status tetap diproses supaya Setujui tidak gagal.
    const kunci = await pipeTrx(env, [
      {
        sql: "update topup_manual set status = ?, decided_at = ? where id = ? and status = 'pending'",
        args: [T(setuju ? "ok" : "tolak"), I(Date.now()), T(id)],
      },
    ]).catch(async (e) => {
      if (!/decided_at/i.test(String(e?.message ?? e))) throw e;
      return pipe(env, [
        {
          sql: "update topup_manual set status = ? where id = ? and status = 'pending'",
          args: [T(setuju ? "ok" : "tolak"), T(id)],
        },
      ]);
    });
    if (kunci[0].affected === 0) return gagal("Pengajuan sudah diproses");
    if (setuju) {
      try {
        await beriCoin(env, String(row.uid), Number(row.coins), "topup", null);
      } catch (e) {
        await logGalat(env, "panel", "manual_decide", String(e?.message ?? e));
        // Coin gagal masuk: kembalikan ke menunggu supaya bisa disetujui lagi
        // dan tidak tercatat "disetujui" padahal saldo pembeli belum bertambah.
        try {
          await pipe(env, [
            { sql: "update topup_manual set status = 'pending', decided_at = null where id = ? and status = 'ok'", args: [T(id)] },
          ]).catch(async () => {
            await pipe(env, [
              { sql: "update topup_manual set status = 'pending' where id = ? and status = 'ok'", args: [T(id)] },
            ]);
          });
        } catch (e2) { /* tetap laporkan galat asli */ }
        return gagal("Coin belum masuk, pengajuan tetap menunggu. Coba Setujui lagi. (" + String(e?.message ?? e).slice(0, 120) + ")");
      }
    }
    return json({ ok: 1, r: { id, uid: row.uid, coins: row.coins, status: setuju ? "ok" : "tolak" } });
  }
  if (op === "get") {
    const w = await pastikan(env, target);
    return json({ ok: 1, w });
  }
  if (op === "topup") {
    if (!target) return gagal("uid kosong");
    const coins = Math.trunc(Number(p.coins ?? 0));
    if (!(coins > 0)) return gagal("Jumlah coin tidak valid");
    await beriCoin(env, target, coins, "topup", null);
    return ok(await pastikan(env, target));
  }
  // Panel: kirim coin / exp, boleh minus untuk mengurangi.
  if (op === "add") {
    if (!target) return gagal("uid kosong");
    const coins = Math.trunc(Number(p.coins ?? 0));
    const exp = Math.trunc(Number(p.exp ?? 0));
    if (!coins && !exp) return gagal("Jumlah kosong");
    await pastikan(env, target);
    await pipe(env, [
      { sql: "begin immediate" },
      {
        sql: "update wallets set coins = max(0, coins + ?), exp = max(0, exp + ?), updated_at = ? where uid = ?",
        args: [I(coins), I(exp), I(Date.now()), T(target)],
      },
      { sql: "commit" },
    ]);
    return ok(await pastikan(env, target));
  }
  // Panel: kirim coin ke SEMUA user sekaligus (mis. bagi-bagi hadiah event).
  if (op === "coin_all") {
    const coins = Math.floor(Number(p.coins ?? 0));
    if (!(coins > 0)) return gagal("Jumlah coin harus lebih dari 0");
    if (coins > 1000000000000) return gagal("Jumlah coin terlalu besar");
    if (String(p.konfirmasi ?? "") !== "KIRIM") {
      return gagal('Kirim coin ke semua user butuh konfirmasi. Kirim konfirmasi "KIRIM"');
    }
    const hitung = await pipe(env, [{ sql: "select count(*) jml from wallets" }]);
    const jumlah = Number(hitung[0].rows[0]?.jml ?? 0);
    await pipe(env, [
      {
        sql: "update wallets set coins = max(0, coins + ?), updated_at = ?",
        args: [I(coins), I(Date.now())],
      },
    ]);
    try { await catatReset(env, "coin_all", uid, "(semua)", coins); } catch { /* log opsional */ }
    return json({ ok: 1, coins, jumlah });
  }

  // Panel: sematkan room dan tag official memakai akun layanan. Aturan RTDB
  // roomsPub hanya mengizinkan pemilik room atau email admin contoh, jadi staf
  // panel (manager/admin) selalu ditolak kalau menulis langsung dari browser.
  if (op === "room_pin" || op === "room_official") {
    const id = String(p.uid ?? p.room ?? "").trim();
    if (!/^[A-Za-z0-9_-]{3,64}$/.test(id)) return gagal("ID room tidak valid");
    const nilai = Number(p.nilai ?? 0) === 1;
    if (op === "room_pin") {
      await tulisRtdbSa(env, `roomsPub/${id}/pinned`, nilai);
      await tulisRtdbSa(env, `roomsPub/${id}/pinnedAt`, nilai ? Date.now() : 0);
      return json({ ok: 1, id, pinned: nilai });
    }
    await tulisRtdbSa(env, `officialRooms/${id}`, nilai ? true : null);
    return json({ ok: 1, id, official: nilai });
  }

  // Panel: baca dan tulis Firestore lewat akun layanan, supaya staf panel
  // (manager/admin) bisa memakai semua halaman walau aturan Firestore hanya
  // mengizinkan email developer.
  if (op === "fs_list" || op === "fs_where" || op === "fs_get" || op === "fs_set" || op === "fs_del") {
    try {
      const tokenFs = await tokenLayanan(env);
      if (!tokenFs) return gagal("Token layanan tidak tersedia");
      const proyekFs = String(env.FIREBASE_PROJECT || "my-app-e7f8c").trim();
      const dasarFs = `https://firestore.googleapis.com/v1/projects/${proyekFs}/databases/(default)/documents/`;
      const jalurFs = (j) => String(j || "").split("/").filter(Boolean).map((x) => encodeURIComponent(x)).join("/");
      const kepalaFs = { authorization: "Bearer " + tokenFs };
      const batasFs = Math.max(1, Math.min(500, Math.trunc(Number(p.batas ?? 200)) || 200));
      if (op === "fs_list") {
        if (!p.koleksi) return gagal("Koleksi kosong");
        const r = await fetch(dasarFs + jalurFs(p.koleksi) + "?pageSize=" + batasFs, { headers: kepalaFs });
        if (!r.ok) return gagal("Firestore " + r.status + " " + (await r.text()).slice(0, 140));
        const d = await r.json();
        return json({ ok: 1, items: (d.documents || []).map(fsDok) });
      }
      if (op === "fs_where") {
        if (!p.koleksi || !p.medan) return gagal("Koleksi atau medan kosong");
        const bodyQ = {
          structuredQuery: {
            from: [{ collectionId: String(p.koleksi) }],
            where: {
              fieldFilter: {
                field: { fieldPath: String(p.medan) },
                op: "EQUAL",
                value: fsNilai(p.nilai),
              },
            },
            limit: batasFs,
          },
        };
        const r = await fetch(dasarFs + ":runQuery", {
          method: "POST",
          headers: { ...kepalaFs, "content-type": "application/json" },
          body: JSON.stringify(bodyQ),
        });
        if (!r.ok) return gagal("Firestore " + r.status + " " + (await r.text()).slice(0, 140));
        const arr = await r.json();
        const items = (Array.isArray(arr) ? arr : [])
          .map((x) => x && x.document)
          .filter(Boolean)
          .map(fsDok);
        return json({ ok: 1, items });
      }
      if (op === "fs_get") {
        if (!p.jalur) return gagal("Jalur kosong");
        const r = await fetch(dasarFs + jalurFs(p.jalur), { headers: kepalaFs });
        if (r.status === 404) return json({ ok: 1, ada: 0, data: null });
        if (!r.ok) return gagal("Firestore " + r.status + " " + (await r.text()).slice(0, 140));
        return json({ ok: 1, ada: 1, data: fsDok(await r.json()) });
      }
      if (op === "fs_set") {
        if (!p.jalur) return gagal("Jalur kosong");
        const dataFs = (p.data && typeof p.data === "object") ? p.data : {};
        const field = {};
        const kunci = Object.keys(dataFs);
        for (const k of kunci) field[k] = fsNilai(dataFs[k]);
        const samaran = kunci.length
          ? "?updateMask.fieldPaths=" + kunci.map((k) => encodeURIComponent(k)).join("&updateMask.fieldPaths=")
          : "";
        const r = await fetch(dasarFs + jalurFs(p.jalur) + samaran, {
          method: "PATCH",
          headers: { ...kepalaFs, "content-type": "application/json" },
          body: JSON.stringify({ fields: field }),
        });
        if (!r.ok) return gagal("Firestore " + r.status + " " + (await r.text()).slice(0, 140));
        return json({ ok: 1 });
      }
      if (!p.jalur) return gagal("Jalur kosong");
      const r = await fetch(dasarFs + jalurFs(p.jalur), { method: "DELETE", headers: kepalaFs });
      if (!r.ok && r.status !== 404) return gagal("Firestore " + r.status + " " + (await r.text()).slice(0, 140));
      return json({ ok: 1 });
    } catch (e) {
      return gagal(String(e?.message ?? e).slice(0, 160));
    }
  }

  // Panel: kirim item (lencana, medali, frame, banner, efek masuk) ke tas user.
  // Aturan RTDB /pub hanya mengizinkan pemilik akun atau email admin contoh,
  // jadi staf panel selalu kena PERMISSION_DENIED kalau menulis dari browser.
  // Di sini ditulis lewat akun layanan, jadi manager/admin ikut bisa.
  if (op === "kirim_item") {
    const uidI = String(p.uid ?? "").trim();
    if (!/^[A-Za-z0-9_-]{4,80}$/.test(uidI)) return gagal("UID penerima tidak valid");
    let itemI = String(p.item ?? "").replace(/[^A-Za-z0-9_-]/g, "").slice(0, 80);
    if (!itemI) return gagal("Item kosong");
    // Awalan sx_ dibuang dulu lalu dipasang sekali saja. Dulu id yang sudah
    // berawalan sx_ ikut diberi awalan lagi (sx_sx_...), akibatnya item tidak
    // ketemu di katalog dan bingkai kiriman panel tidak tampil saat dipasang.
    itemI = itemI.replace(/^(sx_)+/, "");
    if (!itemI) return gagal("Item kosong");
    const hariI = Math.max(1, Math.min(3650, Math.trunc(Number(p.hari ?? 30)) || 30));
    const sampaiI = Date.now() + hariI * 86400000;
    // Item ID unik: nomornya harus ikut didaftarkan ke pencarian SEKARANG, tidak
    // menunggu pemain memasangnya. Nomor yang sudah dipakai akun lain ditolak
    // supaya satu ID tidak pernah menunjuk dua akun.
    let nomorUnik = "";
    try {
      const cfgItem = await cfgRtdbSa(env, `vipCfg/item_${itemI}`);
      nomorUnik = String(cfgItem.customId ?? "").replace(/[^0-9]/g, "").slice(0, 20);
      if (nomorUnik) {
        const pemilik = await cfgRtdbSa(env, `uidCustom/${nomorUnik}`);
        const uidPemilik = String(pemilik.uid ?? "");
        if (uidPemilik && uidPemilik !== uidI) {
          return gagal(`ID ${nomorUnik} sudah dipakai akun lain`);
        }
      }
    } catch { /* tanpa nomor unik, kirim item biasa */ }
    await tulisRtdbSa(env, `pub/${uidI}/svipInv/sx_${itemI}`, sampaiI);
    await tulisRtdbSa(env, `pub/${uidI}/svipInvAt/sx_${itemI}`, Date.now());
    if (nomorUnik) {
      // Alias pencarian: uidCustom/{nomor} = { uid, itemId }, sama dengan yang
      // ditulis aplikasi saat pemain memasang ID, jadi pencarian ID langsung jalan.
      // aktif=false nanti dipakai saat pemain melepas ID unik dari profil:
      // nomornya tetap milik akun ini dan tidak kembali dijual di Store.
      await tulisRtdbSa(env, `uidCustom/${nomorUnik}`, { uid: uidI, itemId: "sx_" + itemI, at: Date.now(), aktif: true });
      await tulisRtdbSa(env, `uidAliasOf/${uidI}`, nomorUnik);
    }
    // Langsung pasang di akun penerima (opsional). Lencana bisa banyak, jadi
    // ditambahkan ke daftar; slot lain cukup diisi satu id.
    const slotPakai = String(p.pakai ?? "").trim().toLowerCase();
    let dipasang = "";
    if (slotPakai) {
      const idPasang = "sx_" + itemI;
      try {
        const w1 = await pastikan(env, uidI);
        const eq = { ...(w1.equip ?? {}) };
        if (slotPakai === "badge") {
          const lama = String(eq.badge ?? "").split(",").map((x) => x.trim()).filter(Boolean);
          if (!lama.includes(idPasang)) lama.push(idPasang);
          eq.badge = lama.join(",");
        } else {
          eq[slotPakai] = idPasang;
        }
        await pipe(env, [{
          sql: "update wallets set equip = ?, updated_at = ? where uid = ?",
          args: [T(JSON.stringify(eq)), I(Date.now()), T(uidI)],
        }]);
        dipasang = slotPakai;
      } catch (e) {
        // Item tetap terkirim walau pemasangan otomatis gagal.
        dipasang = "";
      }
    }
    try { await catatReset(env, "kirim_item", uid, uidI + " " + itemI + " " + hariI + "h"); } catch { /* log opsional */ }
    return json({ ok: 1, uid: uidI, item: itemI, hari: hariI, sampai: sampaiI, dipasang: dipasang || undefined, idUnik: nomorUnik || undefined });
  }

  // Panel: reset coin (dan diamond kalau gem) untuk satu user / semua user.
  if (op === "reset" || op === "reset_all" || op === "reset_gem" || op === "reset_gem_all") {
    const gem = op.includes("gem");
    const semua = op.endsWith("_all");
    if (!semua && !target) return gagal("uid kosong");
    // Reset SEMUA user hanya jalan kalau panel mengirim konfirmasi "HAPUS".
    // Dulu tombolnya bisa terpencet tanpa sengaja dan seluruh saldo coin hilang.
    if (semua && String(p.konfirmasi ?? "") !== "HAPUS") {
      return gagal('Reset semua user butuh konfirmasi. Kirim konfirmasi "HAPUS"');
    }
    const kolom = gem ? "diamonds" : "coins";
    await pipe(env, [
      {
        sql: semua
          ? `update wallets set ${kolom} = 0, updated_at = ?`
          : `update wallets set ${kolom} = 0, updated_at = ? where uid = ?`,
        args: semua ? [I(Date.now())] : [I(Date.now()), T(target)],
      },
    ]);
    try { await catatReset(env, op, uid, target || "(semua)", semua ? -1 : 1); } catch { /* log opsional */ }
    if (semua) return json({ ok: 1 });
    return ok(await pastikan(env, target));
  }

  // Panel: reset aset/level/VIP/coin satu user atau semua user (kecuali akun resmi).
  if (op === "reset_user" || op === "reset_all_assets") {
    const bagian = [];
    if (p.assets) bagian.push("aset");
    if (p.vip) bagian.push("vip");
    if (p.level) bagian.push("level");
    if (p.coins) bagian.push("coin");
    if (p.gems) bagian.push("diamond");
    if (!bagian.length) return gagal("Pilih dulu apa yang mau dibersihkan")
    if (op === "reset_all_assets" && String(p.konfirmasi ?? "") !== "HAPUS") {
      return gagal('Reset aset semua user butuh konfirmasi. Kirim konfirmasi "HAPUS"')
    };
    const set = [];
    const args = [];
    if (p.coins) { set.push("coins = 0"); }
    if (p.gems) { set.push("diamonds = 0"); }
    if (p.vip) { set.push("vip = 0", "vip_until = 0"); }
    if (p.level) { set.push("exp = 0", "lv_claimed = 0"); }
    if (p.assets) { set.push("inv = '{}'", "equip = '{}'"); }
    set.push("updated_at = ?");
    const waktu = Date.now();
    if (op === "reset_user") {
      if (!target) return gagal("uid kosong");
      await pipe(env, [{ sql: `update wallets set ${set.join(", ")} where uid = ?`, args: [I(waktu), T(target)] }]);
      return json({ ok: 1, uid: target, bagian });
    }
    const lindungi = [];
    if (Array.isArray(p.kecuali)) p.kecuali.forEach((x) => { const t = String(x || "").trim(); if (t) lindungi.push(t); });
    const tanda = lindungi.map(() => "?").join(",");
    const sql = lindungi.length
      ? `update wallets set ${set.join(", ")} where uid not in (${tanda})`
      : `update wallets set ${set.join(", ")}`;
    await pipe(env, [{ sql, args: lindungi.length ? [I(waktu), ...lindungi.map(T)] : [I(waktu)] }]);
    return json({ ok: 1, bagian, kecuali: lindungi });
  }

  // Panel: hapus akun. Akun resmi/admin/owner tidak boleh ikut terhapus.
  if (op === "delete_user" || op === "delete_users") {
    const daftar = op === "delete_user" ? [target] : (Array.isArray(p.uids) ? p.uids.map(String) : []);
    const lindungi = new Set(ADMIN_SEMUA.map((x) => String(x).toLowerCase()));
    if (Array.isArray(p.kecuali)) p.kecuali.forEach((x) => lindungi.add(String(x)));
    const hasil = [];
    for (const u of daftar) {
      if (!u) continue;
      if (lindungi.has(u.toLowerCase())) { hasil.push({ uid: u, lewat: 1 }); continue; }
      await pipe(env, [
        { sql: "delete from money_tx where uid = ?", args: [T(u)] },
        { sql: "delete from topup_manual where uid = ?", args: [T(u)] },
        { sql: "delete from hive_order where uid = ?", args: [T(u)] },
        { sql: "delete from wallets where uid = ?", args: [T(u)] },
      ]);
      // Akun login Firebase ikut dihapus, bukan hanya data dompetnya.
      const auth = await hapusAkunAuth(env, u).catch((e) => ({ ok: 0, alasan: String(e?.message ?? e) }));
      hasil.push({ uid: u, hapus: 1, auth: auth.ok ? 1 : 0, auth_alasan: auth.alasan || "" });
    }
    return json({ ok: 1, hasil });
  }

  // Panel: atur VIP (tier 0 = cabut).
  if (op === "vip") {
    if (!target) return gagal("uid kosong");
    const tier = Math.trunc(Number(p.tier ?? 0));
    const until = Math.trunc(Number(p.until ?? 0));
    if (!(tier >= 0 && tier <= 9)) return gagal("VIP harus 0 sampai 9");
    await pastikan(env, target);
    await pipe(env, [
      { sql: "begin immediate" },
      {
        sql: "update wallets set vip = ?, vip_until = ?, updated_at = ? where uid = ?",
        args: [I(tier), I(tier === 0 ? 0 : until), I(Date.now()), T(target)],
      },
      { sql: "commit" },
    ]);
    return ok(await pastikan(env, target));
  }
  return gagal("Perintah panel tidak dikenal");
}


// ================= HIVE PLAY (game pihak ketiga) =================
// Hive memanggil 3 alamat ini setiap pemain membuka game. Keaslian permintaan
// dicek lewat signature md5(signature_nonce + app_key + timestamp), karena Hive
// tidak membawa token login Firebase.
//   /hive/get_sstoken     -> code     => ss_token
//   /hive/get_user_info   -> ss_token => profil + saldo
//   /hive/change_balance  -> taruhan/menang => saldo terbaru
// Tanpa ini game Hive mentok di "error2" karena tidak bisa membaca saldo.
const HIVE_APP_ID = "100198";
const HIVE_KEY = "eb09c56d97454d43ab2698ad548697ab";
const HIVE_CODE_SALT = "rezo-hive-2026";
const HIVE_MAX_SKEW = 300;
const HIVE_MAX_SAFE = 9007199254740991;

function hiveSafe(n) {
  const v = Number(n ?? 0);
  if (!Number.isFinite(v) || v < 0) return 0;
  return v > HIVE_MAX_SAFE ? HIVE_MAX_SAFE : Math.trunc(v);
}

function md5hex(s) {
  const msg = new TextEncoder().encode(s);
  const len = msg.length;
  const words = [];
  for (let i = 0; i < len; i++) words[i >> 2] = (words[i >> 2] ?? 0) | (msg[i] << ((i % 4) * 8));
  words[len >> 2] = (words[len >> 2] ?? 0) | (0x80 << ((len % 4) * 8));
  const total = (((len + 8) >> 6) + 1) * 16;
  while (words.length < total) words.push(0);
  const bits = len * 8;
  words[total - 2] = bits & 0xffffffff;
  words[total - 1] = Math.floor(bits / 4294967296);

  const S = [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
             5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
             4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
             6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21];
  const K = [];
  for (let i = 0; i < 64; i++) K[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296) | 0;

  let a0 = 0x67452301, b0 = 0xefcdab89, c0 = 0x98badcfe, d0 = 0x10325476;
  const rotl = (x, c) => ((x << c) | (x >>> (32 - c))) | 0;

  for (let off = 0; off < total * 4; off += 64) {
    const M = [];
    for (let j = 0; j < 16; j++) M[j] = words[(off >> 2) + j] | 0;
    let A = a0, B = b0, C = c0, D = d0;
    for (let i = 0; i < 64; i++) {
      let F = 0, g = 0;
      if (i < 16) { F = (B & C) | (~B & D); g = i; }
      else if (i < 32) { F = (D & B) | (~D & C); g = (5 * i + 1) % 16; }
      else if (i < 48) { F = B ^ C ^ D; g = (3 * i + 5) % 16; }
      else { F = C ^ (B | ~D); g = (7 * i) % 16; }
      F = (F + A + K[i] + M[g]) | 0;
      A = D;
      D = C;
      C = B;
      B = (B + rotl(F, S[i])) | 0;
    }
    a0 = (a0 + A) | 0; b0 = (b0 + B) | 0; c0 = (c0 + C) | 0; d0 = (d0 + D) | 0;
  }

  const hex = (n) => {
    let out = "";
    for (let i = 0; i < 4; i++) out += ((n >>> (i * 8)) & 0xff).toString(16).padStart(2, "0");
    return out;
  };
  return hex(a0) + hex(b0) + hex(c0) + hex(d0);
}


const hiveOk = (data) =>
  json({ code: 0, message: "succeed", unique_id: "rezo_" + crypto.randomUUID(), data });
const hiveFail = (message, code = 500, data = null) =>
  json({ code, message, unique_id: "rezo_" + crypto.randomUUID(), data });

const b64urlEnc = (s) => btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

function hiveSsToken(uid) {
  return `${b64urlEnc(uid)}.${md5hex(uid + HIVE_KEY)}`;
}

function hiveReadToken(token) {
  const s = String(token ?? "");
  const i = s.lastIndexOf(".");
  if (i < 1) return null;
  const b = s.slice(0, i);
  const sig = s.slice(i + 1);
  let uid = "";
  try {
    const pad = b.length % 4 ? "=".repeat(4 - (b.length % 4)) : "";
    uid = atob(b.replace(/-/g, "+").replace(/_/g, "/") + pad);
  } catch {
    return null;
  }
  if (!uid) return null;
  return md5hex(uid + HIVE_KEY) === sig ? uid : null;
}

function hiveReadCode(code) {
  const s = String(code ?? "").trim();
  if (!s) return null;
  const parts = s.split(".");
  if (parts.length === 1) return parts[0];
  if (parts.length !== 3) return null;
  const [uid, exp, sig] = parts;
  if (!uid || !exp || !sig) return null;
  if (md5hex(`${uid}.${exp}.${HIVE_CODE_SALT}`) !== sig) return null;
  const expMs = Number(exp) * 1000;
  if (Number.isFinite(expMs) && expMs > 0 && Date.now() > expMs) return null;
  return uid;
}


/* ================= WAVEGAMES (userInfo / submitFlow) =================
   WaveGames memanggil Base URL akun REZO (worker ini):
     GET  /wave/game/userInfo   -> profil + saldo coin pemain
     POST /wave/game/submitFlow -> potong coin saat bet (type 1), tambah saat menang (type 2)
   Identitas pemain = token login Firebase yang dikirim app lewat URL game.
   Token boleh datang dari header Authorization, query ?token=, atau body. */
function waveToken(req, url, body) {
  const a = req.headers.get("authorization") || "";
  if (a.toLowerCase().startsWith("bearer ")) return a.slice(7).trim();
  for (const k of ["token", "userToken", "user_token", "ut", "t", "authToken"]) {
    const v = url.searchParams.get(k);
    if (v && v.trim()) return v.trim();
  }
  for (const k of ["token", "userToken", "user_token"]) {
    const v = body?.[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return "";
}

let waveTokSiap = null;
function waveTokPastikan(env) {
  if (!waveTokSiap) {
    waveTokSiap = pipe(env, [
      { sql: `create table if not exists wave_tokens (
          token text primary key,
          uid text not null,
          exp integer not null,
          created integer not null
        )`, args: [] },
    ]).catch(() => {});
  }
  return waveTokSiap;
}

/**
 * Slot Zeus: hanya mengurus uang. Putaran dan hasil tetap dihitung game di
 * dalam APK, lalu selisihnya dicatat di sini. Kemenangan dibatasi agar satu
 * permintaan tidak bisa menguras dompet.
 */
async function slotPlay(req, env, h) {
  const { pipe, json, T, I, uidDariToken } = h;
  if (req.method === "OPTIONS") return new Response(null, { status: 204 });
  const SKALA = 100; // 1 uang game = 100 koin REZO
  const tok = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  // Terima token aplikasi (Firebase) dan token pendek Wave, supaya permainan
  // dan pengujian bisa memakai keduanya.
  let uid = tok ? await uidDariToken(tok) : "";
  if (!uid && tok) {
    try { uid = await waveUidDariToken(env, tok); } catch (e) { uid = ""; }
  }
  if (!uid) return json({ ok: 0, e: "Sesi tidak sah" }, 401);
  const saldoKoin = async () => {
    const r = await pipe(env, [{ sql: "select coins from wallets where uid = ?", args: [T(uid)] }]);
    return Math.max(0, Math.trunc(Number(r[0].rows[0]?.coins ?? 0)));
  };
  const url = new URL(req.url);
  if (url.pathname.toLowerCase().endsWith("/info")) {
    const koin = await saldoKoin();
    return json({ ok: 1, koin, saldo: Math.round((koin / SKALA) * 100) / 100 });
  }
  if (req.method !== "POST") return json({ ok: 0, e: "Gunakan POST" }, 405);
  const b = await req.json().catch(() => ({}));
  let bet = Math.max(0, Math.round(Number(b.bet || 0) * SKALA));
  let win = Math.max(0, Math.round(Number(b.win || 0) * SKALA));
  bet = Math.min(bet, 50000);
  win = Math.min(win, Math.max(1, bet) * 500);
  await pipe(env, [{ sql: "insert or ignore into wallets (uid) values (?)", args: [T(uid)] }]);
  const r = await pipe(env, [
    { sql: "update wallets set coins = max(0, coins - ? + ?) where uid = ?", args: [I(bet), I(win), T(uid)] },
  ]);
  const koin = await saldoKoin();
  return json({ ok: 1, koin, saldo: Math.round((koin / SKALA) * 100) / 100, bet, win });
}

// ---------- Game Bikini Wild Rush (HTML5 milik Viza) ----------
// Saldo memakai dompet Viza yang sama (tabel wallets). Satu koin Viza = satu
// unit game, jadi tidak ada saldo terpisah dan tidak ada pembulatan.
const BW_WILD = 11;
const BW_SCATTER = 10;
const BW_BETS = [25, 50, 100, 200, 500, 1000, 2000, 5000];
const BW_LINES = [
  [0, 0, 0, 0, 0], [1, 1, 1, 1, 1], [2, 2, 2, 2, 2], [3, 3, 3, 3, 3],
  [0, 1, 2, 1, 0], [3, 2, 1, 2, 3], [1, 0, 1, 0, 1], [2, 3, 2, 3, 2],
  [0, 0, 1, 0, 0], [3, 3, 2, 3, 3], [1, 1, 0, 1, 1], [2, 2, 3, 2, 2],
  [0, 1, 1, 1, 0], [3, 2, 2, 2, 3], [1, 2, 2, 2, 1], [2, 1, 1, 1, 2],
  [0, 1, 2, 3, 3], [3, 2, 1, 0, 0], [0, 0, 1, 2, 3], [3, 3, 2, 1, 0],
  [1, 0, 0, 0, 1], [2, 3, 3, 3, 2], [0, 2, 0, 2, 0], [3, 1, 3, 1, 3],
  [1, 2, 1, 2, 1],
];
// Pembayaran diskalakan supaya RTP di bawah 100 persen: koin Viza tidak
// bertambah sendiri hanya karena dipakai berputar.
const BW_FAKTOR = 0.85;
const BW_PAY = [[4, 12, 40], [4, 12, 40], [3, 10, 30], [3, 10, 30], [3, 8, 25], [12, 40, 120], [10, 30, 100], [8, 25, 80], [6, 20, 60], [5, 15, 50], [0, 0, 0], [20, 80, 200]];

function bwHadiahPutaran(scatter) {
  return scatter >= 5 ? 20 : scatter === 4 ? 12 : scatter === 3 ? 8 : 0;
}

function bwNilai(board, bet) {
  const aktif = board.flatMap((reel, i) => reel.length === 4 && reel.every((s) => s === BW_WILD) ? [i] : []);
  const kali = aktif.reduce((m, kol) => m * (kol + 1), 1);
  let menang = 0;
  for (const jalur of BW_LINES) {
    const urutan = jalur.map((baris, kol) => board[kol]?.[baris]);
    let terbaik = 0;
    for (let simbol = 0; simbol <= BW_WILD; simbol++) {
      if (simbol === BW_SCATTER) continue;
      let n = 0;
      for (const isi of urutan) {
        if (isi === simbol || isi === BW_WILD) n++;
        else break;
      }
      if (n < 3) continue;
      const nilai = Math.round((BW_PAY[simbol]?.[n - 3] ?? 0) * bet / 25 * kali);
      if (nilai > terbaik) terbaik = nilai;
    }
    menang += terbaik;
  }
  const scatter = board.filter((reel) => reel.includes(BW_SCATTER)).length;
  return { win: Math.round(menang * BW_FAKTOR), awarded: bwHadiahPutaran(scatter) };
}

function bwAcak() {
  const b = new Uint32Array(1);
  crypto.getRandomValues(b);
  return (b[0] ?? 0) / 4294967296;
}

// Peluang scater per gulungan mengikuti RTP dari panel developer:
// 85% = standar (13%), 95% = scater 4 lebih sering, 100% = scater 5 sering turun.
function bwPeluangScater() {
  const rtp = Number(BIKINI_CFG.rtp) || 85;
  return rtp >= 100 ? 0.42 : rtp >= 95 ? 0.28 : 0.13;
}

function bwBoard(acak, gratis) {
  const peluangSc = bwPeluangScater();
  return Array.from({ length: 5 }, () => {
    const reel = Array.from({ length: 4 }, () => Math.floor(acak() * 10));
    if (acak() < peluangSc) reel[Math.floor(acak() * 4)] = BW_SCATTER;
    if (acak() < 0.25 && !reel.includes(BW_SCATTER)) {
      const mulai = Math.floor(acak() * 3);
      const panjang = 1 + Math.floor(acak() * (4 - mulai));
      for (let r = gratis ? 0 : mulai; r < (gratis ? 4 : mulai + panjang); r++) reel[r] = BW_WILD;
    }
    return reel;
  });
}

/** Jenis isi berkas game, supaya browser tidak menebak-nebak. */
const JENIS_BERKAS = {
  html: "text/html; charset=utf-8",
  js: "text/javascript; charset=utf-8",
  css: "text/css; charset=utf-8",
  json: "application/json; charset=utf-8",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  svg: "image/svg+xml",
  ico: "image/x-icon",
  woff: "font/woff",
  woff2: "font/woff2",
  ttf: "font/ttf",
  mp3: "audio/mpeg",
  ogg: "audio/ogg",
  m4a: "audio/mp4",
  txt: "text/plain; charset=utf-8",
};

/**
 * Jalur /game/... menyajikan berkas game Bikini Wild Rush dari folder GAME_DIR
 * di VPS. Dengan begitu pembaruan game cukup mengganti berkas di VPS, tanpa
 * membangun APK baru.
 */
async function sajikanGame(req, env) {
  const akar = String(env?.GAME_DIR || "").trim();
  if (!akar) return null;
  const url = new URL(req.url);
  let rel = decodeURIComponent(url.pathname.replace(/^\/game\/?/i, ""));
  if (!rel || rel.endsWith("/")) rel += "index.html";
  if (rel.includes("..") || rel.includes("\\")) return new Response("Jalur tidak sah", { status: 400 });
  try {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const penuh = path.join(akar, rel);
    if (!path.resolve(penuh).startsWith(path.resolve(akar))) {
      return new Response("Jalur tidak sah", { status: 400 });
    }
    const isi = await fs.readFile(penuh);
    const ext = (rel.split(".").pop() || "").toLowerCase();
    return new Response(isi, {
      status: 200,
      headers: {
        "content-type": JENIS_BERKAS[ext] || "application/octet-stream",
        "cache-control": "public, max-age=120",
        "access-control-allow-origin": "*",
      },
    });
  } catch (e) {
    return new Response("Tidak ditemukan", { status: 404 });
  }
}

/** Jalur: /bikini/... */
async function bikiniPlay(req, env, h) {
  const { pipe, json, T, I, uidDariToken } = h;
  if (req.method === "OPTIONS") return new Response(null, { status: 204 });
  await pipe(env, [
    { sql: `create table if not exists bikini_tok (
        token text primary key, uid text not null, exp integer not null, created integer not null default 0)` },
    { sql: `create table if not exists bikini_wallet (
        uid text primary key, free_spins integer not null default 0,
        free_bet integer not null default 0, updated integer not null default 0)` },
  ]);
  const url = new URL(req.url);
  const jalur = url.pathname.toLowerCase();
  const kepala = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "").trim();

  // Token pendek untuk alamat game, dibuat dari sesi Firebase pemain.
  if (jalur.endsWith("/token")) {
    const uid = kepala && kepala.split(".").length === 3 ? await uidDariToken(kepala) : "";
    if (!uid) return json({ error: "Sesi tidak sah" }, 401);
    const token = "bw" + crypto.randomUUID().replace(/-/g, "").slice(0, 30);
    const exp = Date.now() + 12 * 3600 * 1000;
    await pipe(env, [
      { sql: "insert into bikini_tok (token, uid, exp, created) values (?, ?, ?, ?)",
        args: [T(token), T(uid), T(exp), T(Date.now())] },
    ]);
    return json({ token, exp });
  }

  // Sesi game: token pendek di atas, atau token Firebase langsung.
  let uid = "";
  if (kepala) {
    if (kepala.split(".").length === 3) uid = await uidDariToken(kepala);
    if (!uid) {
      const r = await pipe(env, [{ sql: "select uid, exp from bikini_tok where token = ?", args: [T(kepala)] }]);
      const baris = r[0].rows[0];
      if (baris && Number(baris.exp) > Date.now()) uid = String(baris.uid);
    }
  }
  if (!uid) return json({ error: "Sesi tidak sah" }, 401);

  await pipe(env, [
    { sql: "insert or ignore into wallets (uid) values (?)", args: [T(uid)] },
    { sql: "insert or ignore into bikini_wallet (uid, updated) values (?, ?)", args: [T(uid), T(Date.now())] },
  ]);

  const baca = async () => {
    const r = await pipe(env, [
      { sql: "select coins from wallets where uid = ?", args: [T(uid)] },
      { sql: "select free_spins, free_bet from bikini_wallet where uid = ?", args: [T(uid)] },
    ]);
    return {
      balance: Math.max(0, Math.trunc(Number(r[0].rows[0]?.coins ?? 0))),
      freeSpins: Math.max(0, Math.trunc(Number(r[1].rows[0]?.free_spins ?? 0))),
      freeBet: Math.max(0, Math.trunc(Number(r[1].rows[0]?.free_bet ?? 0))),
    };
  };

  if (jalur.endsWith("/balance")) {
    const w = await baca();
    return json({ balance: w.balance, freeSpins: w.freeSpins });
  }

  if (!jalur.endsWith("/spin")) return json({ error: "Tidak ditemukan" }, 404);
  if (req.method !== "POST") return json({ error: "Gunakan POST" }, 405);

  const isi = await req.json().catch(() => ({}));
  const bet = Math.trunc(Number(isi?.bet ?? 0));
  const w = await baca();
  const gratis = w.freeSpins > 0;
  const taruhan = gratis ? Math.max(1, w.freeBet) : bet;
  const betSah = (await bikiniCfgKini()).bets;
  if (!gratis && !betSah.includes(bet) && !BW_BETS.includes(bet)) return json({ error: "Taruhan tidak dikenal" }, 400);
  if (!gratis && w.balance < bet) return json({ error: "Koin tidak cukup" }, 402);

  await bikiniCfgKini();
  const board = bwBoard(bwAcak, gratis);
  const hasil = bwNilai(board, taruhan);
  const saldoBaru = Math.max(0, w.balance - (gratis ? 0 : bet) + hasil.win);
  const putaranBaru = Math.max(0, w.freeSpins - (gratis ? 1 : 0) + hasil.awarded);
  const betBaru = hasil.awarded && !gratis ? taruhan : (putaranBaru > 0 ? w.freeBet : 0);
  await pipe(env, [
    { sql: "update wallets set coins = ? where uid = ?", args: [I(saldoBaru), T(uid)] },
    { sql: "update bikini_wallet set free_spins = ?, free_bet = ?, updated = ? where uid = ?",
      args: [I(putaranBaru), I(betBaru), T(Date.now()), T(uid)] },
  ]);
  return json({ board, win: hasil.win, balance: saldoBaru, freeSpins: putaranBaru });
}

async function waveTokenBaru(env, uid, ttlDetik) {
  await waveTokPastikan(env);
  const tok = "wg" + crypto.randomUUID().replace(/-/g, "").slice(0, 30);
  const exp = Date.now() + ttlDetik * 1000;
  await pipe(env, [
    { sql: "insert into wave_tokens (token, uid, exp, created) values (?, ?, ?, ?)",
      args: [T(tok), T(uid), T(exp), T(Date.now())] },
  ]);
  return { token: tok, exp };
}

// Terima dua bentuk token: JWT Firebase (dipakai app) atau token pendek milik kita.
async function waveUidDariToken(env, tok) {
  if (!tok) return null;
  if (tok.split(".").length === 3) return await uidDariToken(tok);
  await waveTokPastikan(env);
  const r = await pipe(env, [
    { sql: "select uid, exp from wave_tokens where token = ?", args: [T(tok)] },
  ]);
  const row = r[0].rows[0];
  if (!row) return null;
  if (Number(row.exp) < Date.now()) return null;
  return String(row.uid);
}

const waveJson = (o, status = 200) =>
  new Response(JSON.stringify(o), {
    status,
    headers: { "content-type": "application/json", "access-control-allow-origin": "*" },
  });

let waveLogSiap = null;
function waveLogPastikan(env) {
  if (!waveLogSiap) {
    waveLogSiap = pipe(env, [
      { sql: `create table if not exists wave_log (
          id integer primary key autoincrement,
          waktu integer not null,
          ep text,
          kode integer,
          alasan text,
          uid text,
          panjang_token integer,
          ua text,
          ip text,
          isi text
        )`, args: [] },
    ]).catch(() => {});
  }
  return waveLogSiap;
}

async function waveLog(env, r) {
  try {
    await waveLogPastikan(env);
    await pipe(env, [
      {
        sql: `insert into wave_log (waktu, ep, kode, alasan, uid, panjang_token, ua, ip, isi)
              values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          T(Date.now()), T(r.ep ?? ""), T(r.kode ?? 0), T(r.alasan ?? ""), T(r.uid ?? ""),
          T(r.panjang ?? 0), T(String(r.ua ?? "").slice(0, 160)), T(r.ip ?? ""), T(String(r.isi ?? "").slice(0, 300)),
        ],
      },
    ]);
  } catch (e) {}
}

// Foto profil HARUS berupa URL pendek. Game menaruh profilePicture di query
// socket, jadi base64 raksasa (puluhan ribu karakter) membuat URL ditolak server
// dan socket langsung putus (kode 1006) -> ronde tidak pernah mulai.
const waveFoto = (uid, a) => {
  const v = String(a ?? "").trim();
  if (!v) return "";
  if (/^https?:\/\//i.test(v)) return v;
  return `https://viza.43-156-99-4.sslip.io/avatar/${encodeURIComponent(String(uid))}`;
};

async function wavePlay(req, env) {
  const url = new URL(req.url);
  const ep = url.pathname.toLowerCase();
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "access-control-allow-origin": "*",
        "access-control-allow-headers": "authorization, content-type, token",
        "access-control-allow-methods": "GET, POST, OPTIONS",
      },
    });
  }
  let body = {};
  if (req.method === "POST") body = await req.json().catch(() => ({}));

  const tok = waveToken(req, url, body);
  let uidLog = "";
  const balas = async (o, status = 200) => {
    await waveLog(env, {
      ep, kode: status, alasan: o?.message ?? "", uid: uidLog,
      panjang: tok.length,
      ua: req.headers.get("user-agent"),
      ip: req.headers.get("cf-connecting-ip") ?? req.headers.get("x-forwarded-for") ?? "",
      isi: JSON.stringify({ method: req.method, body, hasil: o?.data ?? null }),
    });
    return waveJson(o, status);
  };
  if (!tok) return balas({ success: false, message: "Authorization token is required." }, 401);
  const uid = await waveUidDariToken(env, tok);
  if (!uid) return balas({ success: false, message: "Invalid or missing user information in the token." }, 233);
  uidLog = uid;

  if (ep.includes("userinfo")) {
    const pl = await hivePemain(env, uid);
    return balas({
      success: true,
      message: "User info fetched successfully",
      data: { id: uid, name: pl.name, balance: Number(pl.balance), profilePicture: waveFoto(uid, pl.avatar) },
    });
  }

  if (ep.includes("cfronde")) {
    const batasR = Math.min(60, Math.max(1, Number(url.searchParams.get("limit") || 30)));
    try {
      if (req.method === "POST") {
        const winR = Math.max(0, Math.trunc(Number(body.win ?? 0)));
        const betR = Math.max(0, Math.trunc(Number(body.bet ?? 0)));
        // Nomor ronde dihitung dari jam server. Angka dari HP bisa beda
        // (mis. aplikasi versi lama tidak mengirim ronde), jadi tidak dipakai.
        const nomorR = cfRondeSekarang();
        await cfRondeSimpan(env, uid, String(body.cell ?? ""), winR, betR, nomorR);
      }
      const d = await cfRondeHariIni(env, uid, batasR);
      return balas({ success: true, message: "success", data: d });
    } catch (e) {
      return balas({ success: false, message: String(e?.message ?? e), data: null });
    }
  }

  if (ep.includes("cfpola")) {
    try {
      const cfg = await cfCfg(env);
      const nomor = Number(url.searchParams.get("ronde") || cfRondeSekarang());
      const daftar = [];
      for (let i = 0; i < 4; i++) {
        const n = nomor + i;
        daftar.push({ ronde: n, cell: cfPolaRonde(n, cfg.rtp), mulai: n * CF_RONDE_MS, panjang: CF_RONDE_MS });
      }
      return balas({
        success: true,
        message: "success",
        data: { ronde: nomor, panjang: CF_RONDE_MS, sekarang: cfRondeSekarang(), list: daftar, rtp: cfg.rtp },
      });
    } catch (e) {
      return balas({ success: false, message: String(e?.message ?? e), data: null }, 200);
    }
  }

  if (ep.includes("cflive")) {
    try {
      let daftar = await cfRondeLive(env, 12, "https://viza.43-156-99-4.sslip.io");
      // Kotak pemain dan pemenang hanya berisi pemain ronde itu. Peringkat
      // harian tidak pernah dipakai di sini supaya nama pemain lama tidak
      // muncul terus padahal sudah tidak memasang.
      let aku = null;
      if (uidLog) {
        const punya = daftar.find((x) => String(x.id) === String(uidLog));
        aku = punya || { id: String(uidLog) };
        if (!punya) {
          try {
            await cfPastikan(env);
            const rr = await pipe(env, [{ sql: "select name from wave_players where uid = ?", args: [T(uidLog)] }]);
            aku.name = String(rr[0].rows[0]?.name ?? "").trim() || "Player";
          } catch { aku.name = "Player"; }
          const foto = await fotoProfilRtdb(env, uidLog);
          aku.photo = foto ? (/^https?:\/\//i.test(foto) ? foto : `https://viza.43-156-99-4.sslip.io/avatar/${encodeURIComponent(String(uidLog))}`) : "";
          aku.win = 0;
        }
      }
      let pemenang = { ronde: 0, list: [] };
      try {
        pemenang = await cfPemenangRonde(env, 8, "https://viza.43-156-99-4.sslip.io");
      } catch { /* papan pemenang opsional */ }
      return balas({
        success: true,
        message: "success",
        data: { list: daftar, top: pemenang.list.slice(0, 3), pemenang: pemenang.list, ronde: pemenang.ronde, aku, detik: 180 },
      });
    } catch (e) {
      return balas({ success: false, message: String(e?.message ?? e), data: { list: [], top: [], aku: null } }, 200);
    }
  }

  if (ep.includes("cfrank")) {
    const batas = Math.min(20, Math.max(1, Number(url.searchParams.get("limit") || 10)));
    // ?hari=1 -> peringkat hari ini (WIB) saja, dipakai dialog kemenangan.
    const hanyaHari = String(url.searchParams.get("hari") || "") !== "";
    try {
      const daftar = await cfPeringkat(
        env,
        batas,
        "https://viza.43-156-99-4.sslip.io",
        hanyaHari ? cfHariWib().mulai : 0,
      );
      return balas({ success: true, message: "success", data: daftar });
    } catch (e) {
      return balas({ success: false, message: String(e?.message ?? e), data: [] }, 200);
    }
  }

  if (ep.includes("submitflow")) {
    const amount = Math.trunc(Number(body.betAmount ?? 0));
    const kind = Math.trunc(Number(body.type ?? 0));
    const tx = String(body.transactionId ?? body.transaction_id ?? body.txnId ?? "").trim()
      || `${kind}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    if (!Number.isFinite(amount) || amount < 0 || (kind !== 1 && kind !== 2)) {
      return balas({ success: false, message: "Please Provide betAmount and type." }, 422);
    }
    if (amount === 0) {
      const pl = await hivePemain(env, uid);
      return balas({ success: true, message: "success", data: { id: uid, balance: Number(pl.balance), name: pl.name, profilePicture: waveFoto(uid, pl.avatar) } });
    }
    const resp = await hiveUang(env, uid, {
      kind,
      amount,
      orderId: `wave_${tx}`,
      roundId: String(body.roundId ?? body.round ?? ""),
      game: `wave:${String(body.gameName ?? body.gameId ?? "")}`,
    });
    const r = await resp.json().catch(() => null);
    if (!r || r.ok !== 1) {
      const pl = await hivePemain(env, uid);
      const msg = String(r?.e ?? "").toLowerCase().includes("tidak cukup") ? "Saldo coin tidak cukup" : "Transaksi ditolak";
      return balas({ success: false, message: msg, data: { id: uid, balance: Number(pl.balance) } }, 200);
    }
    const plAkhir = await hivePemain(env, uid);
    if (kind === 2 && amount > 0) {
      const namaGame = String(body.gameName ?? body.gameId ?? "").toLowerCase();
      if (namaGame.includes("crazyfruit") || namaGame.includes("fruit")) {
        try {
          await cfPastikan(env);
          await pipe(env, [
            {
              sql: `insert into cf_menang (uid, nama, win, waktu) values (?, ?, ?, ?)`,
              args: [T(uid), T(String(plAkhir.name || "Player")), I(amount), I(Date.now())],
            },
          ]);
        } catch { /* peringkat opsional, jangan gagalkan pembayaran */ }
      }
      // Banner pemenang game: Top 1/2/3 ronde ini tampil terbang untuk semua user.
      catatMenangGame(env, {
        uid,
        nama: plAkhir.name || "Player",
        foto: String(plAkhir.profilePicture || waveFoto(uid, plAkhir.avatar) || ""),
        win: amount,
        game: namaGame,
        ronde: String(
          body.roundId ?? body.round ?? body.ronde
          ?? (namaGame.includes("fruit") ? cfRondeSekarang() : ""),
        ),
      }).catch(() => {});
    }
    return balas({
      success: true,
      message: "success",
      data: {
        id: uid,
        balance: Number(r.w?.coins ?? r.coins ?? 0),
        name: plAkhir.name,
        profilePicture: waveFoto(uid, plAkhir.avatar),
      },
    });
  }

  return balas({ success: false, message: "Endpoint tidak dikenal" }, 404);
}

// Foto profil untuk game: sumber utamanya pub/{uid} di RTDB (field "av" base64
// atau "photo" tautan), sama seperti yang dipakai aplikasi. Dulu hanya tabel
// wave_players yang dibaca, jadi pemain yang belum pernah taruh avatar di sana
// tampil dengan gambar rusak di layar menang. Hasilnya di-cache 10 menit supaya
// tidak menambah satu permintaan RTDB pada setiap taruhan.
const fotoCache = new Map();
async function fotoProfilRtdb(env, uid) {
  const kunci = String(uid);
  const simpan = fotoCache.get(kunci);
  if (simpan && Date.now() - simpan.t < 10 * 60 * 1000) return simpan.v;
  let hasil = "";
  try {
    let tokenSa = "";
    try { tokenSa = await tokenLayanan(env); } catch { tokenSa = ""; }
    const r = await fetch(
      `${RTDB}/pub/${encodeURIComponent(kunci)}.json` +
        (tokenSa ? `?access_token=${encodeURIComponent(tokenSa)}` : ""),
    );
    if (r.ok) {
      const d = await r.json();
      if (d && typeof d === "object") {
        const av = String(d.av ?? "").trim();
        const url = String(d.photo ?? "").trim();
        if (av.startsWith("data:image/")) hasil = av;
        else if (av.length > 100) hasil = "data:image/jpeg;base64," + av.replace(/\s+/g, "");
        else if (/^https?:\/\//i.test(av)) hasil = av;
        else if (/^https?:\/\//i.test(url)) hasil = url;
      }
    }
  } catch { hasil = ""; }
  fotoCache.set(kunci, { t: Date.now(), v: hasil });
  return hasil;
}

// ---------- Peringkat Crazy Fruit ----------
// Kemenangan dicatat saat dompet menerima kemenangan (submitFlow type 2), jadi
// angkanya berasal dari server, bukan dari laporan HP pemain.
let cfSiap = null;
function cfPastikan(env) {
  if (!cfSiap) {
    cfSiap = pipe(env, [
      { sql: `create table if not exists cf_menang (
          uid text not null, nama text not null default '',
          win integer not null default 0, waktu integer not null default 0)`, args: [] },
      { sql: `create index if not exists cf_menang_win on cf_menang (win desc)`, args: [] },
    ]).catch(() => {});
  }
  return cfSiap;
}

async function cfPeringkat(env, batas, asal, mulai = 0) {
  await cfPastikan(env);
  const r = await pipe(env, [
    mulai > 0
      ? {
          sql: `select uid, max(nama) nama, sum(win) win, count(*) kali from cf_menang
                where waktu >= ? group by uid order by win desc limit ?`,
          args: [I(mulai), I(batas)],
        }
      : {
          sql: `select uid, max(nama) nama, sum(win) win, count(*) kali from cf_menang
                group by uid order by win desc limit ?`,
          args: [I(batas)],
        },
  ]);
  const baris = r[0].rows || [];
  const hasil = [];
  for (const x of baris) {
    const foto = await fotoProfilRtdb(env, x.uid);
    let uri = "";
    if (foto) uri = /^https?:\/\//i.test(foto) ? foto : `${asal}/avatar/${encodeURIComponent(String(x.uid))}`;
    hasil.push({
      id: String(x.uid),
      name: String(x.nama ?? "").trim() || "Player",
      win: Number(x.win ?? 0),
      times: Number(x.kali ?? 0),
      photo: uri,
    });
  }
  return hasil;
}

// ---------- Pola ronde Crazy Fruit (satu pola untuk semua pemain) ----------
// Bobotnya sama dengan bobot di dalam game, dan RTP-nya dari panel, jadi pola
// ronde tetap mengikuti RTP yang diatur developer.
const CF_RTP_TITIK = [50, 85, 95, 120];
function cfBobotPola(rtp) {
  // Kolom = RTP 50, 85, 95, 120.
  // RTP 85: semua pola buah dibuat hampir sama besar supaya hasilnya benar-benar
  // diacak (tidak apel 5x lalu stroberi 5x terus), dan JP (lucky/superLucky)
  // tetap jarang. RTP 95 ke atas baru sering mengeluarkan Lucky/Super Lucky.
  const t = {
    orange: [26, 14, 8, 4], lemon: [26, 14, 8, 4], grapes: [26, 14, 8, 4], cherry: [26, 14, 8, 4],
    strawberry: [6, 13, 14, 18], mango: [4, 12, 11, 15], watermelon: [2.5, 11, 8, 12],
    apple: [1.2, 9, 6, 10], lucky: [0.4, 1.0, 18, 28], superLucky: [0.15, 0.35, 16, 26],
  };
  const r = Math.max(50, Math.min(120, Number(rtp) || 92));
  let n = 0;
  while (n < CF_RTP_TITIK.length - 2 && r > CF_RTP_TITIK[n + 1]) n++;
  const a = Math.max(0, Math.min(1, (r - CF_RTP_TITIK[n]) / (CF_RTP_TITIK[n + 1] - CF_RTP_TITIK[n])));
  const out = {};
  for (const k of Object.keys(t)) out[k] = t[k][n] + (t[k][n + 1] - t[k][n]) * a;
  return out;
}

const CF_RONDE_MS = 43000; // satu siklus game 43 detik (taruhan 30 + putar 5 + hasil 5 + jeda 3), sama untuk semua HP
function cfRondeSekarang(kini = Date.now()) {
  return Math.floor(kini / CF_RONDE_MS);
}

/** Pola untuk satu nomor ronde. Selalu sama untuk ronde itu, di HP mana pun. */
function cfPolaRonde(nomor, rtp) {
  const bobot = cfBobotPola(rtp);
  const nama = Object.keys(bobot);
  const total = nama.reduce((a, k) => a + bobot[k], 0);
  // Acak deterministik dari nomor ronde (LCG), bukan dari HP pemain.
  const ambil = (n) => {
    let x = (Number(n) * 1103515245 + 12345) % 2147483648;
    x = (x * 1103515245 + 12345) % 2147483648;
    let r = (x / 2147483648) * total;
    for (const k of nama) {
      r -= bobot[k];
      if (r < 0) return k;
    }
    return "orange";
  };
  let hasil = ambil(nomor);
  // Pola yang sama tidak boleh keluar beruntun: kalau sama dengan ronde
  // sebelumnya, ambil pola berikutnya yang berbeda.
  const sebelum = ambil(Number(nomor) - 1);
  if (hasil === sebelum) {
    const i = nama.indexOf(hasil);
    hasil = nama[(i + 1 + Math.floor(Math.abs(Math.sin(Number(nomor))) * (nama.length - 1))) % nama.length];
    if (hasil === sebelum) hasil = nama[(i + 1) % nama.length];
  }
  return hasil;
}

/** Pemenang ronde yang barusan selesai (seperti papan pemenang Greedy King).
 *  Ronde Crazy Fruit tidak punya nomor ronde di server, jadi ronde dibaca dari
 *  catatan terakhir: semua hasil yang masuk dalam 25 detik terakhir dianggap
 *  satu ronde. */
async function cfPemenangRonde(env, batas, asal) {
  await cfRondePastikan(env);
  // Pemenang ronde ditentukan dari WAKTU ronde itu berjalan, bukan dari nomor
  // ronde yang dikirim HP. Dengan begitu pemenang ronde lama tidak pernah
  // nyangkut di dialog (mis. pemain yang sudah berhenti memasang), dan pemain
  // yang baru menang selalu masuk sebagai Top 1 sesuai nominal menangnya.
  const P = CF_RONDE_MS;
  const kini = Date.now();
  const nomor = cfRondeSekarang(kini);
  const mulaiKini = nomor * P;

  const ambil = async (mulai, selesai) => {
    const r = await pipe(env, [
      {
        sql: `select uid, sum(win) win, count(*) kali, max(at) at from cf_ronde
              where at >= ? and at < ? and win > 0 and bet > 0 group by uid order by win desc limit ?`,
        args: [I(mulai), I(selesai), I(batas)],
      },
    ]);
    return r[0].rows || [];
  };

  // Ronde yang baru selesai. Kalau di ronde itu belum ada yang menang (mis.
  // semua kalah), pakai ronde yang sedang berjalan supaya kotak tidak kosong.
  // Ronde berjalan dulu: kemenangan ditulis tepat saat hasil keluar, jadi
  // pemenang ronde ini ada di jendela ronde yang sedang berjalan. Kalau belum
  // ada (mis. sedang fase taruhan), pakai ronde sebelumnya.
  let mulai = mulaiKini;
  let rows = await ambil(mulai, mulaiKini + P);
  if (!rows.length) {
    mulai = mulaiKini - P;
    rows = await ambil(mulai, mulaiKini);
  }

  const list = [];
  for (const x of rows) {
    let nama = "Player";
    try {
      const rr = await pipe(env, [{ sql: "select name from wave_players where uid = ?", args: [T(x.uid)] }]);
      nama = String(rr[0].rows[0]?.name ?? "").trim() || "Player";
    } catch { /* nama opsional */ }
    const foto = await fotoProfilRtdb(env, x.uid);
    const uri = foto ? (/^https?:\/\//i.test(foto) ? foto : `${asal}/avatar/${encodeURIComponent(String(x.uid))}`) : "";
    list.push({ id: String(x.uid), name: nama, win: Number(x.win ?? 0), times: Number(x.kali ?? 0), at: Number(x.at ?? 0), photo: uri });
  }
  return { ronde: mulai, list };
}

/** Pemain yang SEDANG main sekarang (ronde berjalan) beserta kemenangan
 *  masing-masing di ronde ini. Dipakai dialog hasil supaya TOP 3 berisi pemain
 *  yang benar-benar sedang bermain, bukan papan harian yang lambat berubah. */
async function cfRondeLive(env, batas, asal) {
  await cfRondePastikan(env);
  // Hanya pemain yang benar-benar ikut di ronde berjalan (atau ronde yang baru
  // selesai), supaya nama pemain yang sudah berhenti memasang tidak nyangkut.
  const P = CF_RONDE_MS;
  const nomorKini = cfRondeSekarang();
  const mulai = (nomorKini - 1) * P; // ronde berjalan + ronde yang baru selesai
  const r = await pipe(env, [
    {
      sql: `select uid, sum(win) win, count(*) kali, max(at) terakhir from cf_ronde
            where at >= ? and bet > 0 group by uid order by terakhir desc, win desc limit ?`,
      args: [I(mulai), I(batas)],
    },
  ]);
  const rows = r[0].rows || [];
  const hasil = [];
  for (const x of rows) {
    let nama = "Player";
    try {
      const rr = await pipe(env, [{ sql: "select name from wave_players where uid = ?", args: [T(x.uid)] }]);
      nama = String(rr[0].rows[0]?.name ?? "").trim() || "Player";
    } catch { /* nama opsional */ }
    const foto = await fotoProfilRtdb(env, x.uid);
    const uri = foto ? (/^https?:\/\//i.test(foto) ? foto : `${asal}/avatar/${encodeURIComponent(String(x.uid))}`) : "";
    hasil.push({
      id: String(x.uid),
      name: nama,
      win: Number(x.win ?? 0),
      times: Number(x.kali ?? 0),
      at: Number(x.terakhir ?? 0),
      photo: uri,
    });
  }
  return hasil;
}

// ---------- Ronde Crazy Fruit (Today's Win + riwayat, per hari WIB) ----------
const WIB_MS = 7 * 60 * 60 * 1000;
function cfHariWib(kini = Date.now()) {
  const mulai = Math.floor((kini + WIB_MS) / 86400000) * 86400000 - WIB_MS;
  return { mulai, selesai: mulai + 86400000 };
}

let cfRondeSiap = null;
function cfRondePastikan(env) {
  if (!cfRondeSiap) {
    cfRondeSiap = pipe(env, [
      {
        sql: `create table if not exists cf_ronde (
            uid text not null, cell text not null default '', win integer not null default 0,
            bet integer not null default 0, at integer not null default 0,
            ronde integer not null default 0)`,
        args: [],
      },
      { sql: `alter table cf_ronde add column ronde integer not null default 0`, args: [] },
      { sql: `create index if not exists cf_ronde_uid on cf_ronde (uid, at desc)`, args: [] },
    ]).catch(() => {});
  }
  return cfRondeSiap;
}

async function cfRondeSimpan(env, uid, cell, win, bet, ronde = 0) {
  await cfRondePastikan(env);
  await pipe(env, [
    {
      sql: `insert into cf_ronde (uid, cell, win, bet, at, ronde) values (?, ?, ?, ?, ?, ?)`,
      args: [T(uid), T(String(cell || "")), I(win), I(bet), I(Date.now()), I(ronde)],
    },
  ]);
}

// Riwayat dan total menang hanya untuk hari WIB yang sedang berjalan.
async function cfRondeHariIni(env, uid, batas) {
  await cfRondePastikan(env);
  const { mulai } = cfHariWib();
  const r = await pipe(env, [
    {
      sql: `select cell, win, bet, at from cf_ronde where uid = ? and at >= ? order by at desc limit ?`,
      args: [T(uid), I(mulai), I(batas)],
    },
  ]);
  const rows = r[0].rows || [];
  let today = 0;
  for (const x of rows) today += Number(x.win ?? 0);
  return {
    hari: new Date(mulai + WIB_MS).toISOString().slice(0, 10),
    today,
    list: rows.map((x) => ({
      cell: String(x.cell ?? ""),
      win: Number(x.win ?? 0),
      bet: Number(x.bet ?? 0),
      at: Number(x.at ?? 0),
    })),
  };
}

async function hivePemain(env, uid) {
  const r = await pipe(env, [
    { sql: "select name, avatar from wave_players where uid = ?", args: [T(uid)] },
  ]);
  const row = r[0].rows[0] ?? {};
  const w = await pastikan(env, uid);
  let avatar = String(row.avatar ?? "").trim();
  const foto = await fotoProfilRtdb(env, uid);
  if (foto) {
    avatar = foto;
    // Simpan juga ke wave_players supaya /avatar/{uid} dan game lain ikut benar.
    if (String(row.avatar ?? "").trim() !== foto) {
      try {
        await pipe(env, [
          { sql: "update wave_players set avatar = ?, updated_at = ? where uid = ?", args: [T(foto), I(Date.now()), T(uid)] },
        ]);
      } catch { /* kolom boleh gagal, foto tetap dipakai dari RTDB */ }
    }
  }
  return {
    id: uid,
    name: String(row.name ?? "").trim() || "Player",
    avatar,
    balance: Number(w?.coins ?? 0),
  };
}

/* ================= GAME REZO (HTML5 buatan sendiri) =================
   Game hanya menggambar. Hasil putaran, potong coin, dan kemenangan
   diputuskan di sini supaya tidak bisa diakali dari sisi HP.
   Pemain membuka game dengan ?code=uid.exp.md5(uid.exp.rezo-game-2026) */
const GAME_SALT = "rezo-game-2026";
const GAME_TARUHAN_MIN = 100;
const GAME_TARUHAN_MAX = 50000000;

// [kode, bobot, bayaran untuk 3/4/5 sama x taruhan]
const GAME_SIMBOL = [
  ["zeus", 1, [9.5, 38, 115]],
  ["mahkota", 2, [6.5, 29, 92]],
  ["petir", 4, [5, 19, 58]],
  ["kuil", 6, [4, 14, 38]],
  ["helm", 8, [3, 9.5, 29]],
  ["piala", 10, [2.4, 7, 24]],
  ["cincin", 13, [2, 6, 19]],
  ["permata", 16, [1.4, 4.8, 14]],
];
const GAME_BOBOT = GAME_SIMBOL.reduce((a, s) => a + s[1], 0);
const GAME_WILD = 1;

/** code bertanda tangan dari app: uid.exp.md5(uid.exp.salt) */
function gameUid(code) {
  const p = String(code || "").split(".");
  if (p.length !== 3) return null;
  const uid = p[0], exp = Number(p[1]);
  if (!uid || !Number.isFinite(exp) || exp * 1000 < Date.now()) return null;
  if (md5hex(uid + "." + p[1] + "." + GAME_SALT) !== p[2]) return null;
  return uid;
}

function gameAcak() {
  const b = new Uint32Array(1);
  crypto.getRandomValues(b);
  return b[0] / 4294967296;
}

function gameSimbol() {
  let r = gameAcak() * GAME_BOBOT;
  for (let i = 0; i < GAME_SIMBOL.length; i++) {
    r -= GAME_SIMBOL[i][1];
    if (r <= 0) return i;
  }
  return GAME_SIMBOL.length - 1;
}

/** Satu putaran 5x3: tiga baris ditambah dua diagonal. */
function gamePutaran() {
  const grid = [];
  for (let r = 0; r < 3; r++) {
    const baris = [];
    for (let c = 0; c < 5; c++) baris.push(gameSimbol());
    grid.push(baris);
  }
  const lines = [
    grid[0].slice(),
    grid[1].slice(),
    grid[2].slice(),
    [grid[0][0], grid[1][1], grid[2][2], grid[1][3], grid[0][4]],
    [grid[2][0], grid[1][1], grid[0][2], grid[1][3], grid[2][4]],
  ];
  const dapat = [];
  let kali = 0;
  lines.forEach((ln, idx) => {
    const dasar = ln[0];
    let n = 1;
    for (let c = 1; c < 5; c++) {
      if (ln[c] === dasar || ln[c] === GAME_WILD) n++;
      else break;
    }
    if (n < 3) return;
    const pay = GAME_SIMBOL[dasar][2][n - 3];
    if (pay > 0) {
      kali += pay;
      dapat.push({ line: idx, count: n, pay });
    }
  });
  return { grid, kali, lines: dapat };
}

async function gameState(env, uid) {
  const w = await pastikan(env, uid);
  const pl = await hivePemain(env, uid).catch(() => null);
  return ok({
    uid,
    coins: Number(w.coins),
    name: (pl && pl.name) || "Player",
    avatar: (pl && pl.avatar) || "",
    taruhanMin: GAME_TARUHAN_MIN,
  });
}

async function gameSpin(env, uid, p) {
  const bet = Math.trunc(Number(p.bet ?? 0));
  if (!Number.isFinite(bet) || bet < GAME_TARUHAN_MIN) return gagal("Taruhan minimal " + GAME_TARUHAN_MIN);
  if (bet > GAME_TARUHAN_MAX) return gagal("Taruhan terlalu besar");
  const now = Date.now();
  const put = gamePutaran();
  const menang = Math.floor(bet * put.kali);
  // Satu perintah: potong taruhan, tambah kemenangan, hanya kalau coin cukup.
  const r = await pipe(env, [
    {
      sql: "update wallets set coins = coins - ? + ?, updated_at = ? where uid = ? and coins >= ?",
      args: [I(bet), I(menang), I(now), T(uid), I(bet)],
    },
    { sql: "select changes() as c", args: [] },
  ]);
  if (Number(r[1]?.rows?.[0]?.c ?? 0) === 0) {
    const w0 = await pastikan(env, uid);
    return gagal("Coin tidak cukup. Saldo " + Number(w0.coins));
  }
  const catat = [
    { sql: "insert into money_tx (uid, kind, amount, created_at) values (?,?,?,?)",
      args: [T(uid), T("game_bet"), I(-bet), I(now)] },
  ];
  if (menang > 0) {
    catat.push({ sql: "insert into money_tx (uid, kind, amount, created_at) values (?,?,?,?)",
      args: [T(uid), T("game_win"), I(menang), I(now)] });
  }
  await pipe(env, catat).catch(() => {});
  const w = await pastikan(env, uid);
  return ok({
    uid, bet, kali: put.kali, win: menang, grid: put.grid,
    lines: put.lines, coins: Number(w.coins),
    simbol: GAME_SIMBOL.map((s) => s[0]),
  });
}

async function hivePlay(req, env) {
  const ep = new URL(req.url).pathname.toLowerCase();
  if (ep.includes("version")) {
    return json({ ok: 1, v: "hive-2026-11-03a", md5_abc: md5hex("abc") });
  }
  if (req.method !== "POST") return hiveFail("POST only", 405);
  let body = {};
  try { body = await req.json(); } catch { return hiveFail("body bukan JSON", 400); }

  const nonce = String(body.signature_nonce ?? "");
  const ts = Number(body.timestamp ?? 0);
  const sig = String(body.signature ?? "");
  if (!nonce || !ts || !sig) return hiveFail("signature tidak lengkap", 400);
  if (Math.abs(Date.now() / 1000 - ts) > HIVE_MAX_SKEW) return hiveFail("timestamp kadaluarsa", 400);
  if (md5hex(nonce + HIVE_KEY + ts) !== sig) return hiveFail("signature salah", 400);
  if (String(body.app_id ?? "") !== HIVE_APP_ID) return hiveFail("app_id tidak dikenal", 400);

  if (ep.includes("get_sstoken")) {
    const uid = hiveReadCode(body.code);
    if (!uid) return hiveFail("code tidak valid", 400);
    await pastikan(env, uid);
    return hiveOk({ ss_token: hiveSsToken(uid), expire_date: Date.now() + 365 * 24 * 3600 * 1000 });
  }

  if (ep.includes("get_user_info")) {
    const uid = hiveReadToken(body.ss_token);
    if (!uid) return hiveFail("ss_token tidak valid", 401);
    if (String(body.user_id ?? "") && String(body.user_id) !== uid) {
      return hiveFail("user_id tidak cocok", 401);
    }
    const pl = await hivePemain(env, uid);
    return hiveOk({
      user_id: uid,
      user_name: pl.name,
      user_avatar: pl.avatar,
      balance: hiveSafe(pl.balance),
      currency_balance: hiveSafe(pl.balance),
    });
  }

  if (ep.includes("change_balance")) {
    const uid = hiveReadToken(body.ss_token);
    if (!uid) return hiveFail("ss_token tidak valid", 401);
    const orderId = String(body.order_id ?? "");
    if (!orderId) return hiveFail("order_id kosong", 400);
    const diff = Math.trunc(Number(body.currency_diff ?? 0));
    if (!Number.isFinite(diff)) return hiveFail("currency_diff tidak valid", 400);
    if (diff === 0) {
      const pl = await hivePemain(env, uid);
      return hiveOk({ currency_balance: hiveSafe(pl.balance) });
    }
    const resp = await hiveUang(env, uid, {
      kind: diff < 0 ? 1 : 2,
      amount: Math.abs(diff),
      orderId: `hive_${orderId}`,
      roundId: String(body.game_round_id ?? body.room_id ?? ""),
      game: `hive:${String(body.game_id ?? "")}`,
    });
    // hiveUang mengembalikan Response, jadi hasilnya dibaca sebagai JSON dulu.
    const r = await resp.json().catch(() => null);
    if (!r || r.ok !== 1) {
      // Saldo kurang atau order bermasalah: laporkan angka saldo terbaru.
      const pl = await hivePemain(env, uid);
      return hiveFail(r?.e ?? "gagal memperbarui saldo", 500, { currency_balance: hiveSafe(pl.balance) });
    }
    return hiveOk({ currency_balance: hiveSafe(r.w?.coins ?? r.coins) });
  }

  return hiveFail("endpoint tidak dikenal", 404);
}

/**
 * Katalog game Hive lewat server kita sendiri. HP yang jaringannya memblokir
 * domain katalog Hive tetap bisa mengambil daftar lewat Worker, jadi game yang
 * dihapus/ditambah di console Hive selalu ikut tanpa update APK.
 */
async function hiveKatalog() {
  const ts = String(Date.now());
  const nonce = ts + String(1000 + Math.floor(Math.random() * 9000));
  const sig = md5hex(HIVE_APP_ID + HIVE_KEY + nonce + ts);
  const r = await fetch("https://api2023.duolepoker.com/v1/h5-game/third/game_info", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ appId: HIVE_APP_ID, timestamp: ts, nonce, signature: sig, env: "prod" }),
  });
  const t = await r.text();
  return new Response(t, {
    status: r.ok ? 200 : 502,
    headers: { ...CORS, "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

// ---------- OTP lewat WhatsApp (gateway di VPS Helipod) ----------
// Login nomor tanpa biaya SMS: server membuat 6 angka, mengirimnya lewat
// WhatsApp, lalu app menukarnya dengan membuat/masuk akun email+password
// Firebase yang memakai nomor sebagai nama akun.
const OTP_MASA = 5 * 60 * 1000;      // kode berlaku 5 menit
const OTP_JEDA = 60 * 1000;          // jarak minimal antar kirim
const OTP_MAKS_KIRIM = 5;            // maksimal kirim per nomor per 15 menit
const OTP_MAKS_COBA = 5;             // maksimal salah kode

let siapTabelOtp = false;
async function pastikanTabelOtp(env) {
  if (siapTabelOtp) return;
  await pipe(env, [{
    sql: "create table if not exists otp (nomor text primary key, kode text, exp integer, kirim integer, coba integer, at integer)",
  }]);
  siapTabelOtp = true;
}

function nomorRapi(v) {
  let n = String(v ?? "").replace(/[^0-9]/g, "");
  if (n.startsWith("0")) n = "62" + n.slice(1);
  return n;
}

async function kirimWa(env, nomor, pesan) {
  const url = String(env.WA_OTP_URL || "http://127.0.0.1:8099");
  const secret = String(env.WA_OTP_SECRET || "");
  if (!secret) throw new Error("WA_OTP_SECRET belum diisi di server");
  const r = await fetch(url.replace(/\/$/, "") + "/send", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-secret": secret },
    body: JSON.stringify({ nomor, pesan }),
    signal: AbortSignal.timeout(20000),
  });
  const j = await r.json().catch(() => null);
  if (!r.ok || !j?.ok) throw new Error("Gateway WhatsApp: " + String(j?.e || r.status));
  return true;
}

async function otpMinta(env, b) {
  const nomor = nomorRapi(b?.nomor);
  if (nomor.length < 9 || nomor.length > 15) return json({ ok: 0, e: "Nomor tidak valid" }, 400);
  await pastikanTabelOtp(env);
  const now = Date.now();
  const lama = (await pipe(env, [{ sql: "select kode, exp, kirim, coba, at from otp where nomor = ?", args: [T(nomor)] }]))[0]?.rows?.[0];
  if (lama) {
    const sejak = now - Number(lama.at || 0);
    if (sejak < OTP_JEDA) {
      return json({ ok: 0, e: "Tunggu " + Math.ceil((OTP_JEDA - sejak) / 1000) + " detik sebelum minta kode lagi", tunggu: Math.ceil((OTP_JEDA - sejak) / 1000) }, 429);
    }
    if (sejak < 15 * 60 * 1000 && Number(lama.kirim || 0) >= OTP_MAKS_KIRIM) {
      return json({ ok: 0, e: "Terlalu sering minta kode, coba lagi nanti" }, 429);
    }
  }
  const kirimKe = lama && now - Number(lama.at || 0) < 15 * 60 * 1000 ? Number(lama.kirim || 0) + 1 : 1;
  const kode = String(Math.floor(100000 + Math.random() * 900000));
  const exp = now + OTP_MASA;
  // Kode ditaruh dalam blok monospace: di WhatsApp tinggal diketuk untuk
  // menyalin, tidak perlu tekan-lama dan menyeret seleksi.
  const pesan =
    "Viza\n\nKode masuk Anda ada di pesan berikutnya. Berlaku 5 menit.\n" +
    "Jangan beri kode ini ke siapa pun, termasuk yang mengaku admin.";
  await kirimWa(env, nomor, pesan);
  // Pesan kedua hanya berisi angka: tekan-tahan lalu Salin, atau muncul
  // sebagai saran kode di keyboard banyak HP.
  await kirimWa(env, nomor, String(kode));
  await pipe(env, [{
    sql: "insert into otp (nomor, kode, exp, kirim, coba, at) values (?,?,?,?,0,?) on conflict(nomor) do update set kode=excluded.kode, exp=excluded.exp, kirim=excluded.kirim, coba=0, at=excluded.at",
    args: [T(nomor), T(kode), I(exp), I(kirimKe), I(now)],
  }]);
  return json({ ok: 1, kirim: kirimKe });
}

async function otpCek(env, b) {
  const nomor = nomorRapi(b?.nomor);
  const kode = String(b?.kode ?? "").replace(/[^0-9]/g, "");
  if (!nomor || kode.length !== 6) return json({ ok: 0, e: "Kode harus 6 angka" }, 400);
  await pastikanTabelOtp(env);
  const now = Date.now();
  const row = (await pipe(env, [{ sql: "select kode, exp, coba from otp where nomor = ?", args: [T(nomor)] }]))[0]?.rows?.[0];
  if (!row) return json({ ok: 0, e: "Minta kode dulu" }, 404);
  if (now > Number(row.exp || 0)) return json({ ok: 0, e: "Kode sudah kedaluwarsa" }, 410);
  if (Number(row.coba || 0) >= OTP_MAKS_COBA) return json({ ok: 0, e: "Terlalu banyak salah, minta kode baru" }, 429);
  if (String(row.kode) !== kode) {
    await pipe(env, [{ sql: "update otp set coba = coba + 1 where nomor = ?", args: [T(nomor)] }]);
    return json({ ok: 0, e: "Kode salah" }, 401);
  }
  await pipe(env, [{ sql: "delete from otp where nomor = ?", args: [T(nomor)] }]);
  return json({ ok: 1, nomor });
}


/** Unduhan APK: berkas disimpan di /opt/rezo-api/apk oleh skrip update VPS. */
async function unduhApk(jalur, env) {
  const DIR = "/opt/rezo-api/apk";
  const daftar = {
    "universal": "REZO-STAR-universal.apk",
    "arm64": "REZO-STAR-arm64.apk",
    "armv7": "REZO-STAR-armv7.apk",
  };
  const nama = jalur.replace(/^\/unduh\/?/i, "").replace(/[^A-Za-z0-9_.-]/g, "");
  let fs, path;
  try {
    fs = await import("node:fs/promises");
    path = await import("node:path");
  } catch (e) {
    return null; // bukan Node (mis. Cloudflare): biarkan ditangani jalur lain
  }
  if (!nama) {
    const versi = await fs.readFile(path.join(DIR, "versi.txt"), "utf8").catch(() => "");
    const baris = Object.entries(daftar).map(([k, f]) =>
      `<li><a href="/unduh/${k}">Unduh APK ${k}</a></li>`).join("");
    const html = `<!DOCTYPE html><html lang="id"><head><meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Unduh REZO</title>
<style>body{font-family:system-ui,sans-serif;background:#0a0f1e;color:#eef;margin:0;padding:28px}
h1{font-size:20px}ul{line-height:2.2;padding-left:18px}a{color:#f5c542}</style></head>
<body><h1>Unduh REZO Chat Voice</h1>
<p>Versi terbaru: <b>${versi.trim() || "-"}</b></p><ul>${baris}</ul>
<p style="color:#889">Pilih universal kalau tidak yakin dengan tipe HP.</p></body></html>`;
    return new Response(html, { status: 200, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
  }
  const berkas = daftar[nama] || nama;
  if (!/^REZO-STAR-[A-Za-z0-9_.-]+\.apk$/.test(berkas)) {
    return new Response("Berkas tidak dikenal", { status: 404 });
  }
  const lokasi = path.join(DIR, berkas);
  try {
    const st = await fs.stat(lokasi);
    const isi = await fs.readFile(lokasi);
    return new Response(isi, {
      status: 200,
      headers: {
        "content-type": "application/vnd.android.package-archive",
        "content-length": String(st.size),
        "content-disposition": `attachment; filename="${berkas}"`,
        "cache-control": "public, max-age=3600",
      },
    });
  } catch (e) {
    return new Response("Berkas belum tersedia", { status: 404 });
  }
}

export { hadiahMenitRoom };

export default {
  async fetch(req, env) {
    globalThis.__vizaEnv = env;
    const url = new URL(req.url);
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
    await siapTabel(env).catch(() => {});
    if (url.pathname === "/panel" && req.method === "GET") {
      return Response.redirect(url.origin + "/panel/", 308);
    }
    if (req.method === "GET" && url.pathname.startsWith("/panel/")) {
      return await panelBerkas(url.pathname);
    }
    if (url.pathname === "/panel") {
      const b = await req.json().catch(() => null);
      if (!b) return json({ ok: 0, e: "Body tidak valid" }, 400);
      return await panel(env, b);
    }
    if (url.pathname.toLowerCase() === "/rewardroom") {
      try { return await rewardRoomApi(env, req); }
      catch (e) { return gagal(String(e?.message ?? "Reward room sibuk")); }
    }
    if (url.pathname === "/seller") {
      const b = await req.json().catch(() => null);
      if (!b) return json({ ok: 0, e: "Body tidak valid" }, 400);
      const sesi = await sesiDariToken(b.t ?? "");
      if (!sesi) return json({ ok: 0, e: "Sesi tidak sah" }, 401);
      try { return await sellerApi(env, sesi, b); }
      catch (e) { return gagal(String(e?.message ?? "Server seller sibuk")); }
    }
    if (
      url.pathname.toLowerCase().startsWith("/berkas/") ||
      url.pathname.toLowerCase().startsWith("/aset/")
    ) {
      const awalan = url.pathname.toLowerCase().startsWith("/berkas/") ? "/berkas/" : "/aset/";
      const nm = decodeURIComponent(url.pathname.slice(awalan.length));
      try {
        try {
          const buf = await asetBacaDisk(nm);
          return new Response(buf, {
            status: 200,
            headers: {
              "Content-Type": mimeDariExt((nm.split(".").pop() || "").toLowerCase()),
              "Cache-Control": "public, max-age=31536000, immutable",
              "Access-Control-Allow-Origin": "*",
            },
          });
        } catch (eDisk) { /* bukan di disk, lanjut ke database */ }
        try { await asetPastikan(env); } catch (e0) { /* tabel mungkin belum ada */ }
        const rA = await pipe(env, [
          { sql: "select mime, b64 from aset_file where nama = ?", args: [nm] },
        ]);
        const row = rA[0].rows[0];
        if (!row) return new Response("", { status: 404 });
        const bin = Uint8Array.from(atob(String(row.b64)), (c) => c.charCodeAt(0));
        return new Response(bin, {
          status: 200,
          headers: {
            "Content-Type": String(row.mime || "application/octet-stream"),
            // Nama file unik, jadi aman di-cache lama.
            "Cache-Control": "public, max-age=31536000, immutable",
            "Access-Control-Allow-Origin": "*",
          },
        });
      } catch (e) {
        return new Response("aset tidak ditemukan: " + String(e?.message ?? e), { status: 404 });
      }
    }
    if (url.pathname.toLowerCase() === "/aset-upload") {
      // Jalur cepat: biner mentah (tanpa base64), parameter lewat query string.
      if (url.searchParams.get("raw") === "1") {
        const sesiR = await sesiDariToken(url.searchParams.get("t") ?? "");
        const namaAset = String(url.searchParams.get("name") || "aset").slice(0, 60);
        if (!sesiR) {
          await logGalat(env, "", "aset-upload", "sesi tidak sah: " + namaAset);
          return json({ ok: 0, e: "Sesi tidak sah" }, 401);
        }
        if (!(await bolehPanel(env, sesiR))) {
          await logGalat(env, sesiR.uid, "aset-upload", "bukan admin: " + (sesiR.email || "-") + " / " + namaAset);
          return json({ ok: 0, e: "Hanya admin" }, 403);
        }
        try {
          const buf = Buffer.from(await req.arrayBuffer());
          if (!buf.length) return json({ ok: 0, e: "Isi berkas kosong" }, 400);
          const hasil = await asetUpload(env, {
            b64: buf.toString("base64"),
            name: namaAset,
            ext: url.searchParams.get("ext") || "png",
            gh: url.searchParams.get("gh") || "",
          });
          await logGalat(env, sesiR.uid, "aset-upload-ok", namaAset + " " + Math.round(buf.length / 1024) + " KB");
          return hasil;
        } catch (e) {
          await logGalat(env, sesiR.uid, "aset-upload", String(e?.message ?? e).slice(0, 180));
          return json({ ok: 0, e: String(e?.message ?? e) }, 502);
        }
      }
      const bA = await req.json().catch(() => null);
      if (!bA) return json({ ok: 0, e: "Body tidak valid" }, 400);
      const sesiA = await sesiDariToken(bA.t ?? "");
      if (!sesiA) return json({ ok: 0, e: "Sesi tidak sah" }, 401);
      if (!(await bolehPanel(env, sesiA))) return json({ ok: 0, e: "Hanya admin" }, 403);
      try { return await asetUpload(env, bA); }
      catch (e) { return json({ ok: 0, e: String(e?.message ?? e) }, 502); }
    }
    // Panel menulis aset/konfigurasi lewat server (akun layanan), jadi tidak
    // lagi kena "PERMISSION_DENIED" dari aturan tulis RTDB di Firebase.
    if (url.pathname.toLowerCase() === "/panel-rtdb") {
      if (req.method !== "POST") return json({ ok: 0, e: "Gunakan POST" }, 405);
      const b = await req.json().catch(() => null);
      if (!b) return json({ ok: 0, e: "Body tidak valid" }, 400);
      const sesiP = await sesiDariToken(b.t ?? "");
      if (!sesiP) return json({ ok: 0, e: "Sesi tidak sah" }, 401);
      try {
        if (!(await bolehPanel(env, sesiP))) {
          const emailP = await emailSesi(env, sesiP);
          return json({ ok: 0, e: "Hanya admin [email=" + (emailP || "-") + "]" }, 403);
        }
      } catch (e) {
        return json({ ok: 0, e: "Hanya admin" }, 403);
      }
      const jalur = String(b.path || "");
      // Mode baca: panel perlu melihat katalog aset (vipCfg/giftCfg) yang
      // ditolak aturan RTDB untuk browser.
      if (b.baca) {
        if (!/^(vipCfg|giftCfg|banners|betCfg|signinCfg|cashbackCfg|rewardRoom|_owner|_cs|tabBg|gameCfg)(\/|$)/.test(jalur)) {
          return json({ ok: 0, e: "Path tidak diizinkan" }, 400);
        }
        try {
          return json({ ok: 1, data: await bacaRtdbSa(env, jalur) });
        } catch (e) {
          await logGalat(env, sesiP.uid, "panel-rtdb-baca", jalur + " " + String(e?.message ?? e).slice(0, 140));
          return json({ ok: 0, e: String(e?.message ?? e) }, 502);
        }
      }
      // Batasi: panel hanya boleh menulis cabang pengaturan, bukan data user.
      if (!/^((vipCfg|banners|pengumuman|giftCfg|betCfg|signinCfg|cashbackCfg|_owner|tabBg|gameCfg)\/|_cs(\/[A-Za-z0-9_-]+)?$)/.test(jalur)) {
        return json({ ok: 0, e: "Path tidak diizinkan" }, 400);
      }
      try {
        await tulisRtdbSa(env, jalur, b.hapus ? null : (b.data ?? null));
        return json({ ok: 1 });
      } catch (e) {
        await logGalat(env, sesiP.uid, "panel-rtdb", jalur + " " + String(e?.message ?? e).slice(0, 140));
        return json({ ok: 0, e: String(e?.message ?? e) }, 502);
      }
    }
    if (url.pathname.toLowerCase() === "/aset-cek") {
      const bC = await req.json().catch(() => null);
      if (!bC) return json({ ok: 0, e: "Body tidak valid" }, 400);
      const sesiC = await sesiDariToken(bC.t ?? "");
      if (!sesiC) return json({ ok: 0, e: "Sesi tidak sah" }, 401);
      if (!(await bolehPanel(env, sesiC))) return json({ ok: 0, e: "Hanya admin" }, 403);
      const alamat = String(bC.url || "").trim();
      if (!/^https?:\/\//i.test(alamat)) return json({ ok: 0, e: "Tautan harus http atau https" }, 400);
      try {
        const kendali = AbortSignal.timeout ? AbortSignal.timeout(12000) : undefined;
        let r = await fetch(alamat, { method: "HEAD", signal: kendali });
        if (r.status === 405 || r.status === 501) r = await fetch(alamat, { method: "GET", signal: kendali });
        const panjang = Number(r.headers.get("content-length") || 0);
        return json({
          ok: 1,
          status: r.status,
          hidup: r.status >= 200 && r.status < 400,
          jenis: r.headers.get("content-type") || "",
          ukuran: panjang,
        });
      } catch (e) {
        return json({ ok: 0, e: "Tidak bisa dihubungi: " + String(e?.message ?? e) }, 200);
      }
    }
    if (url.pathname.toLowerCase() === "/aset-list") {
      const sesiL = await sesiDariToken(url.searchParams.get("t") ?? "");
      if (!sesiL) return json({ ok: 0, e: "Sesi tidak sah" }, 401);
      if (!(await bolehPanel(env, sesiL))) return json({ ok: 0, e: "Hanya admin" }, 403);
      try { return json({ ok: 1, list: await asetDaftar(env) }); }
      catch (e) { return json({ ok: 0, e: String(e?.message ?? e) }, 502); }
    }
    if (url.pathname.toLowerCase() === "/aset-hapus") {
      const bH = await req.json().catch(() => null);
      if (!bH) return json({ ok: 0, e: "Body tidak valid" }, 400);
      const sesiH = await sesiDariToken(bH.t ?? "");
      if (!sesiH) return json({ ok: 0, e: "Sesi tidak sah" }, 401);
      if (!(await bolehPanel(env, sesiH))) return json({ ok: 0, e: "Hanya admin" }, 403);
      const nm = String(bH.nama ?? "").replace(/[^A-Za-z0-9._-]/g, "");
      if (!nm) return json({ ok: 0, e: "Nama berkas kosong" }, 400);
      try { await asetHapus(env, nm); return json({ ok: 1, nama: nm }); }
      catch (e) { return json({ ok: 0, e: String(e?.message ?? e) }, 502); }
    }
    // Harga VIP terbaru untuk aplikasi (tanpa perlu build baru).
    if (url.pathname.toLowerCase() === "/vip-harga") {
      await hargaVipKini();
      return json({ ok: 1, harga: HARGA_VIP.slice(1) });
    }
    if (url.pathname.toLowerCase() === "/roomadmin") {
      // Aksi kelola room dari admin room. Aturan Firestore/RTDB di Firebase hanya
      // mengizinkan pemilik room, jadi admin room ditangani di sini memakai akun
      // layanan. Pemilik room juga boleh lewat sini.
      if (req.method !== "POST") return json({ ok: 0, e: "Pakai POST" }, 405);
      let bRa = {};
      try { bRa = await req.json(); } catch { bRa = {}; }
      const sesiRa = await sesiDariToken(String(bRa.t || ""));
      if (!sesiRa) return json({ ok: 0, e: "Sesi tidak sah" }, 401);
      const uidRa = String(sesiRa.uid || "");
      const roomRa = String(bRa.room || "").replace(/[^0-9A-Za-z_-]/g, "").slice(0, 64);
      if (!roomRa) return json({ ok: 0, e: "Room kosong" }, 400);
      const aksiRa = String(bRa.aksi || "").toLowerCase();
      const tokenRa = await tokenLayanan(env);
      if (!tokenRa) return json({ ok: 0, e: "Kunci layanan belum dipasang" }, 503);
      const proyekRa = String(env.FIREBASE_PROJECT || "my-app-e7f8c").trim();
      const alamatDoc = `https://firestore.googleapis.com/v1/projects/${proyekRa}/databases/(default)/documents/rooms/${encodeURIComponent(roomRa)}`;
      let docRa = null;
      try {
        const rDoc = await fetch(alamatDoc, { headers: { authorization: "Bearer " + tokenRa } });
        if (rDoc.ok) docRa = await rDoc.json();
      } catch { docRa = null; }
      // Room bisa belum ada di Firestore (mis. dibuat/diatur dari panel) tetapi
      // sudah ada di RTDB roomsPub. Jangan langsung 404: pakai roomsPub sebagai
      // cadangan supaya Larang Mic tetap jalan.
      let pubRa = null;
      try { pubRa = await cfgRtdbSa(env, "roomsPub/" + roomRa); } catch { pubRa = null; }
      if (!docRa && !pubRa) return json({ ok: 0, e: "Room tidak ditemukan" }, 404);
      const ambilRa = (n) => {
        const f = docRa?.fields?.[n];
        return f ? Object.values(f)[0] : "";
      };
      const pemilikRa = String(ambilRa("ownerUid") || (pubRa && pubRa.ownerUid) || "");
      const adminRa = (docRa?.fields?.admins?.arrayValue?.values || []).map((v) => String(v.stringValue || ""));
      const pemiliknya = pemilikRa === uidRa;
      if (!pemiliknya && !adminRa.includes(uidRa)) return json({ ok: 0, e: "Hanya owner atau admin room" }, 403);

      const patchFs = async (fields) => {
        if (!docRa) throw new Error("Room belum ada di Firestore");
        const mask = Object.keys(fields).map((k) => "updateMask.fieldPaths=" + encodeURIComponent(k)).join("&");
        const isi = { fields: {} };
        for (const [k, v] of Object.entries(fields)) isi.fields[k] = { stringValue: String(v ?? "") };
        const r = await fetch(alamatDoc + "?" + mask, {
          method: "PATCH",
          headers: { authorization: "Bearer " + tokenRa, "content-type": "application/json" },
          body: JSON.stringify(isi),
        });
        if (!r.ok) throw new Error("Firestore " + r.status + " " + (await r.text()).slice(0, 120));
      };
      const patchRtdb = async (path, nilai) => {
        const bersih = String(path).replace(/^\/+|\/+$/g, "");
        const r = await fetch(`${RTDB}/${bersih}.json?access_token=${encodeURIComponent(tokenRa)}`, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(nilai),
        });
        if (!r.ok) throw new Error("RTDB " + r.status + " " + (await r.text()).slice(0, 120));
      };

      try {
        if (aksiRa === "admin") {
          if (!pemiliknya) return json({ ok: 0, e: "Hanya owner room yang bisa mengatur admin" }, 403);
          const uidA = String(bRa.uid || "").replace(/[^0-9A-Za-z_-]/g, "").slice(0, 80);
          if (!uidA) return json({ ok: 0, e: "User tidak sah" }, 400);
          const jadi = bRa.jadi === true || bRa.jadi === 1 || bRa.jadi === "1";
          const baru = jadi ? Array.from(new Set([...adminRa, uidA])) : adminRa.filter((x) => x !== uidA);
          const r = await fetch(alamatDoc + "?updateMask.fieldPaths=admins", {
            method: "PATCH",
            headers: { authorization: "Bearer " + tokenRa, "content-type": "application/json" },
            body: JSON.stringify({
              fields: { admins: { arrayValue: { values: baru.map((x) => ({ stringValue: x })) } } },
            }),
          });
          if (!r.ok) throw new Error("Firestore " + r.status + " " + (await r.text()).slice(0, 120));
          return json({ ok: 1, admins: baru });
        }
        if (aksiRa === "simpan") {
          const isiFs = {};
          if (typeof bRa.name === "string" && bRa.name.trim()) isiFs.name = bRa.name.trim().slice(0, 60);
          if (typeof bRa.announcement === "string") isiFs.announcement = bRa.announcement.slice(0, 300);
          if (isiFs.name || isiFs.announcement !== undefined) {
            const rtdbIsi = {};
            if (isiFs.name) rtdbIsi.name = isiFs.name;
            if (isiFs.announcement !== undefined) rtdbIsi.announcement = isiFs.announcement;
            await patchRtdb("roomsPub/" + roomRa, rtdbIsi);
          }
          const micBaru = Number(bRa.micCount);
          if (Number.isFinite(micBaru) && micBaru >= 1 && micBaru <= 32) {
            const r2 = await fetch(alamatDoc + "?updateMask.fieldPaths=micCount", {
              method: "PATCH",
              headers: { authorization: "Bearer " + tokenRa, "content-type": "application/json" },
              body: JSON.stringify({ fields: { micCount: { integerValue: String(Math.round(micBaru)) } } }),
            });
            if (!r2.ok) throw new Error("Firestore " + r2.status + " " + (await r2.text()).slice(0, 120));
            await patchRtdb("roomsPub/" + roomRa, { micCount: Math.round(micBaru) });
          }
          if (Object.keys(isiFs).length) await patchFs(isiFs);
          return json({ ok: 1 });
        }
        if (aksiRa === "kunci") {
          const h = String(bRa.lockHash || "").slice(0, 80);
          await patchRtdb("roomsPub/" + roomRa, { lockHash: h });
          await patchFs({ lockHash: h });
          return json({ ok: 1 });
        }
        if (aksiRa === "ban") {
          const uidB = String(bRa.uid || "").replace(/[^0-9A-Za-z_-]/g, "").slice(0, 80);
          if (!uidB) return json({ ok: 0, e: "User tidak sah" }, 400);
          if (uidB === pemilikRa) return json({ ok: 0, e: "Owner room tidak bisa dikeluarkan" }, 400);
          const durasi = Math.max(0, Number(bRa.durationMs) || 0);
          const sekarang = Date.now();
          const until = durasi > 0 ? sekarang + durasi : 0;
          try {
            const kursi = await cfgRtdbSa(env, "seats/" + roomRa);
            for (const [k, v] of Object.entries(kursi || {})) {
              if (v && v.uid === uidB) await tulisRtdbSa(env, "seats/" + roomRa + "/" + k, null);
            }
          } catch { }
          await tulisRtdbSa(env, "members/" + roomRa + "/" + uidB, null);
          await tulisRtdbSa(env, "live/" + uidB, null);
          await tulisRtdbSa(env, "blacklist/" + roomRa + "/" + uidB, {
            name: String(bRa.name || "").slice(0, 60), until, at: sekarang,
          });
          return json({ ok: 1 });
        }
        if (aksiRa === "larang") {
          // Larang mic / larang ketik: disimpan di roomBans/{room}/{uid}, dibaca HP.
          const uidL = String(bRa.uid || "").replace(/[^0-9A-Za-z_-]/g, "").slice(0, 80);
          if (!uidL) return json({ ok: 0, e: "User tidak sah" }, 400);
          if (uidL === pemilikRa) return json({ ok: 0, e: "Owner room tidak bisa dilarang" }, 400);
          const aktifL = bRa.aktif !== false;
          if (!aktifL) {
            await tulisRtdbSa(env, "roomBans/" + roomRa + "/" + uidL, null);
            return json({ ok: 1, aktif: false });
          }
          await tulisRtdbSa(env, "roomBans/" + roomRa + "/" + uidL, {
            mic: true, ketik: true, at: Date.now(), oleh: uidRa,
          });
          // Larang mic: kursi user dikosongkan dan mic dimatikan.
          try {
            const kursiL = await cfgRtdbSa(env, "seats/" + roomRa);
            for (const [k, v] of Object.entries(kursiL || {})) {
              if (v && v.uid === uidL) await tulisRtdbSa(env, "seats/" + roomRa + "/" + k, null);
            }
          } catch { }
          return json({ ok: 1, aktif: true });
        }
        if (aksiRa === "unban") {
          const uidB = String(bRa.uid || "").replace(/[^0-9A-Za-z_-]/g, "").slice(0, 80);
          if (!uidB) return json({ ok: 0, e: "User tidak sah" }, 400);
          await tulisRtdbSa(env, "blacklist/" + roomRa + "/" + uidB, null);
          return json({ ok: 1 });
        }
        if (aksiRa === "kursi") {
          const idx = String(Math.max(0, Number(bRa.index) || 0));
          await tulisRtdbSa(env, "seats/" + roomRa + "/" + idx, null);
          try { await tulisRtdbSa(env, "micPoints/" + roomRa + "/" + idx, null); } catch { }
          return json({ ok: 1 });
        }
        if (aksiRa === "chat") {
          await tulisRtdbSa(env, "messages/" + roomRa, null);
          return json({ ok: 1 });
        }
        if (aksiRa === "cfg") {
          // Pengaturan room (mic bebas, kalkulator, bicara publik). Dipakai
          // kalau aturan RTDB menolak tulisan dari HP.
          const kunciCfg = String(bRa.key || "").replace(/[^0-9A-Za-z_]/g, "").slice(0, 40);
          if (!kunciCfg) return json({ ok: 0, e: "Kunci tidak sah" }, 400);
          await tulisRtdbSa(env, "roomCfg/" + roomRa + "/" + kunciCfg, bRa.nilai === true);
          return json({ ok: 1 });
        }
        if (aksiRa === "poin") {
          // Mengatur ulang kalkulator: poin mic di layar publik dikosongkan.
          await tulisRtdbSa(env, "micPoints/" + roomRa, null);
          return json({ ok: 1 });
        }
        return json({ ok: 0, e: "Aksi tidak dikenal" }, 400);
      } catch (e) {
        return json({ ok: 0, e: String(e?.message ?? e).slice(0, 160) }, 500);
      }
    }
    if (url.pathname.toLowerCase() === "/gamewin") {
      // Pemenang game Top 1/2/3 untuk banner terbang di HP.
      // Dibaca lewat server (akun layanan) supaya banner tetap muncul walau
      // aturan baca RTDB untuk simpul gameWinFeed belum diperbarui.
      const sesiW = await sesiDariToken(url.searchParams.get("t") ?? "");
      if (!sesiW) return json({ ok: 0, e: "Sesi tidak sah" }, 401);
      const sejakW = Number(url.searchParams.get("sejak") || 0) || 0;
      try {
        const semuaW = (await cfgRtdbSa(env, "gameWinFeed")) || {};
        const itemsW = [];
        const kiniW = Date.now();
        for (const [kW, vW] of Object.entries(semuaW)) {
          const oW = vW || {};
          const tW = Number(oW.ts || 0);
          if (!tW) continue;
          if (sejakW > 0 && tW <= sejakW) continue;
          // Banner hanya untuk ronde yang sedang/baru berjalan, bukan riwayat lama.
          if (kiniW - tW > 60 * 1000) continue;
          itemsW.push({
            id: kW,
            name: String(oW.name || "Player").slice(0, 24),
            av: String(oW.av || "").slice(0, 300),
            amount: Number(oW.amount || 0),
            game: String(oW.game || ""),
            pos: Number(oW.pos || 0),
            ts: tW,
          });
        }
        itemsW.sort((a, b) => a.ts - b.ts);
        return json({ ok: 1, items: itemsW.slice(-12) });
      } catch (e) {
        return json({ ok: 0, e: String(e?.message ?? e).slice(0, 160) }, 500);
      }
    }
    // ===== API per tab (pola Funi): satu alamat untuk satu tab =====
    // Aplikasi hanya memanggil alamat tab yang sedang dibuka, jadi jelas di
    // HTTP Canary dan tidak ada paket data besar yang diambil terus-menerus.
    if (url.pathname.toLowerCase().startsWith("/api/user/get_profile")) {
      try {
        const sesiU = await sesiDariToken(url.searchParams.get("token") ?? url.searchParams.get("t") ?? "");
        if (!sesiU) return json({ ok: 0, e: "Sesi tidak sah" }, 401);
        const uidU = String(url.searchParams.get("uid") || sesiU.uid || sesiU.user_id || sesiU.sub || "");
        if (!uidU) return json({ ok: 0, e: "uid kosong" }, 400);
        const pub = (await bacaRtdbNilai(env, "pub/" + uidU)) || {};
        const akun = (await bacaRtdbNilai(env, "users/" + uidU)) || {};
        return json({
          ok: 1,
          uid: uidU,
          user_id: pub.userId ?? akun.userId ?? "",
          name: pub.name ?? akun.name ?? "",
          photo: pub.photoUrl ?? pub.photo ?? akun.photoUrl ?? "",
          country_code: pub.countryCode ?? akun.countryCode ?? "",
          gender: pub.gender ?? akun.gender ?? "",
          frame: akun.frame ?? pub.frame ?? "",
          badge: akun.badge ?? pub.badge ?? "",
          vip: akun.vip ?? 0,
          svip: akun.svip ?? 0,
        });
      } catch (e) {
        return json({ ok: 0, e: String(e?.message ?? e).slice(0, 160) }, 500);
      }
    }

    if (url.pathname.toLowerCase().startsWith("/api/svip/get_user_svip")) {
      try {
        const sesiS = await sesiDariToken(url.searchParams.get("token") ?? url.searchParams.get("t") ?? "");
        if (!sesiS) return json({ ok: 0, e: "Sesi tidak sah" }, 401);
        const uidS = String(url.searchParams.get("uid") || sesiS.uid || sesiS.user_id || sesiS.sub || "");
        if (!uidS) return json({ ok: 0, e: "uid kosong" }, 400);
        const punya = (await bacaRtdbNilai(env, "svip/" + uidS)) || (await bacaRtdbNilai(env, "users/" + uidS + "/svip")) || {};
        const items = (await bacaRtdbNilai(env, "svipItems")) || (await bacaRtdbNilai(env, "cfg/svipItems")) || {};
        return json({ ok: 1, uid: uidS, punya, items });
      } catch (e) {
        return json({ ok: 0, e: String(e?.message ?? e).slice(0, 160) }, 500);
      }
    }

    if (url.pathname.toLowerCase().startsWith("/api/room/list")) {
      try {
        const semua = (await bacaRtdbNilai(env, "roomsPub")) || {};
        const daftar = Object.entries(semua).map(([id, r]) => {
          const isi = r && typeof r === "object" ? r : {};
          const dalam = Number(isi.online ?? isi.users ?? isi.jumlah ?? 0) || 0;
          return {
            id,
            name: isi.name ?? isi.title ?? id,
            owner: isi.ownerUid ?? "",
            cover: isi.cover ?? isi.photoUrl ?? "",
            level: Number(isi.level ?? 1) || 1,
            online: dalam,
          };
        // Room kosong tidak ditampilkan: bikin aplikasi lambat dan boros data.
        }).filter((r) => r.online > 0);
        return json({ ok: 1, jumlah: daftar.length, rooms: daftar });
      } catch (e) {
        return json({ ok: 0, e: String(e?.message ?? e).slice(0, 160) }, 500);
      }
    }

    if (url.pathname.toLowerCase().startsWith("/musikroom")) {
      const jalurMr = url.pathname.toLowerCase();
      const ruangParam = String(url.searchParams.get("room") || "").replace(/[^0-9A-Za-z_.:-]/g, "").slice(0, 64);
      if (req.method === "GET") {
        const sesiR = await sesiDariToken(url.searchParams.get("t") ?? "");
        if (!sesiR) return json({ ok: 0, e: "Sesi tidak sah" }, 401);
        if (!ruangParam) return json({ ok: 0, e: "Room kosong" }, 400);
        const d = musikRoom.get(ruangParam);
        if (!d || Date.now() - d.at > 12 * 3600 * 1000) {
          if (d) musikRoom.delete(ruangParam);
          return json({ ok: 1, ada: 0 });
        }
        return json({
          ok: 1, ada: 1, url: d.url, title: d.title,
          playing: d.playing ? 1 : 0, pos: d.pos, lewat: Date.now() - d.at,
        });
      }
      if (req.method !== "POST") return json({ ok: 0, e: "Pakai GET/POST" }, 405);
      let bMr = {};
      try { bMr = await req.json(); } catch { bMr = {}; }
      const sesiMr = await sesiDariToken(String(bMr.t || url.searchParams.get("t") || ""));
      if (!sesiMr) return json({ ok: 0, e: "Sesi tidak sah" }, 401);
      const ruangB = (String(bMr.room || ruangParam).replace(/[^0-9A-Za-z_.:-]/g, "") || "").slice(0, 64);
      if (!ruangB) return json({ ok: 0, e: "Room kosong" }, 400);
      if (jalurMr.endsWith("/hentikan")) { musikRoom.delete(ruangB); return json({ ok: 1 }); }
      const urlMr = String(bMr.url || "").slice(0, 500);
      if (!urlMr.startsWith("http")) return json({ ok: 0, e: "Tautan lagu tidak sah" }, 400);
      const isi = {
        url: urlMr,
        title: String(bMr.title || "").slice(0, 120),
        playing: bMr.playing === true || bMr.playing === 1 || bMr.playing === "1",
        pos: Math.max(0, Math.min(24 * 3600 * 1000, Number(bMr.pos) || 0)),
        at: Date.now(),
        by: String(sesiMr.uid || "").slice(0, 60),
      };
      musikRoom.set(ruangB, isi);
      return json({ ok: 1, at: isi.at });
    }
    if (url.pathname.toLowerCase() === "/musik") {
      // Lagu room disimpan langsung di VPS ini, lalu diputar dari tautan ini
      // oleh semua HP. Tidak lewat storage pihak lain, jadi cepat dan suaranya
      // tidak dikecilkan/diubah.
      if (req.method !== "POST") return json({ ok: 0, e: "Pakai POST" }, 405);
      const sesiM = await sesiDariToken(url.searchParams.get("t") ?? "");
      if (!sesiM) return json({ ok: 0, e: "Sesi tidak sah" }, 401);
      const extM = (url.searchParams.get("ext") || "mp3").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 4) || "mp3";
      if (!/^(mp3|m4a|aac|ogg|oga|opus|wav|flac)$/.test(extM)) return json({ ok: 0, e: "Format lagu tidak didukung" }, 400);
      const panjang = Number(req.headers.get("content-length") || 0);
      if (panjang > 30 * 1024 * 1024) return json({ ok: 0, e: "Lagu lebih dari 30 MB" }, 413);
      let bufM;
      try { bufM = Buffer.from(await req.arrayBuffer()); }
      catch (e) { return json({ ok: 0, e: "Isi lagu tidak terbaca" }, 400); }
      if (!bufM.length) return json({ ok: 0, e: "Isi lagu kosong" }, 400);
      if (bufM.length > 30 * 1024 * 1024) return json({ ok: 0, e: "Lagu lebih dari 30 MB" }, 413);
      const uidM = String(sesiM.uid || "").replace(/[^A-Za-z0-9_-]/g, "").slice(0, 40) || "umum";
      const namaM = "musik_" + uidM + "_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6) + "." + extM;
      try {
        await asetSimpanDisk(namaM, bufM.toString("base64"));
        return json({ ok: 1, url: VPS_ASET + "/" + namaM, ukuran: bufM.length });
      } catch (e) { return json({ ok: 0, e: "Gagal menyimpan lagu: " + String(e?.message ?? e) }, 500); }
    }
    if (url.pathname.toLowerCase() === "/chatimg") {
      // Gambar chat room disimpan di VPS sendiri. Supabase menolak unggahan
      // (402: layanan project dibatasi), jadi tidak dipakai lagi.
      if (req.method !== "POST") return json({ ok: 0, e: "Pakai POST" }, 405);
      const sesiC = await sesiDariToken(url.searchParams.get("t") ?? "");
      if (!sesiC) return json({ ok: 0, e: "Sesi tidak sah" }, 401);
      const extC = (url.searchParams.get("ext") || "jpg").toLowerCase().replace(/[^a-z]/g, "").slice(0, 4) || "jpg";
      if (!/^(jpg|jpeg|png|webp|gif)$/.test(extC)) return json({ ok: 0, e: "Format tidak didukung" }, 400);
      let bufC;
      try { bufC = Buffer.from(await req.arrayBuffer()); }
      catch (e) { return json({ ok: 0, e: "Isi tidak terbaca" }, 400); }
      if (!bufC.length) return json({ ok: 0, e: "Isi kosong" }, 400);
      if (bufC.length > 6 * 1024 * 1024) return json({ ok: 0, e: "Gambar lebih dari 6 MB" }, 413);
      const uidC = String(sesiC.uid || "").replace(/[^A-Za-z0-9_-]/g, "").slice(0, 40) || "umum";
      const namaC = "chat_" + uidC + "_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6) + "." + extC;
      try {
        await asetSimpanDisk(namaC, bufC.toString("base64"));
        return json({ ok: 1, url: VPS_ASET + "/" + namaC });
      } catch (e) { return json({ ok: 0, e: "Gagal menyimpan: " + String(e?.message ?? e) }, 500); }
    }
/** Kirim email lewat Resend. Kunci disimpan di server, bukan di app. */
async function kirimEmail(env, ke, subjek, isiHtml, isiTeks, kunci) {
  const key = kunci || env.RESEND_KEY || env.RESEND_API_KEY || "";
  if (!key) throw new Error("RESEND_KEY belum diisi di server");
  const dari = env.RESEND_DARI || "REZO <onboarding@resend.dev>";
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
    body: JSON.stringify({ from: dari, to: [ke], subject: subjek, html: isiHtml, text: isiTeks || undefined }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error("Resend " + r.status + ": " + String(j?.message || j?.error || "").slice(0, 160));
  return j;
}

    if (url.pathname.toLowerCase() === "/email/uji") {
      // Uji kirim email. Hanya bisa dengan kunci Resend milik server sendiri.
      if (req.method !== "POST") return json({ ok: 0, e: "Pakai POST" }, 405);
      const keyU = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "").trim();
      const keyE = env.RESEND_KEY || env.RESEND_API_KEY || "";
      const pakai = keyE || keyU;
      if (!pakai) return json({ ok: 0, e: "Kunci Resend belum diisi" }, 401);
      if (keyE && keyU && keyE !== keyU) return json({ ok: 0, e: "Kunci tidak cocok" }, 401);
      let bU = {};
      try { bU = await req.json(); } catch (e) { bU = {}; }
      const keU = String(bU.ke || "").trim();
      if (!keU.includes("@")) return json({ ok: 0, e: "Alamat email tidak sah" }, 400);
      try {
        const hasil = await kirimEmail(
          env,
          keU,
          String(bU.subjek || "Uji email REZO"),
          "<p>Email dari server REZO berhasil terkirim. Sistem email sudah aktif.</p>",
          "Email dari server REZO berhasil terkirim.",
          pakai,
        );
        return json({ ok: 1, id: hasil?.id || "", sumber: keyE ? "server" : "kunci-uji" });
      } catch (e) { return json({ ok: 0, e: String(e?.message ?? e) }, 500); }
    }
    if (url.pathname === "/admin") {
      const b = await req.json().catch(() => null);
      if (!b) return json({ ok: 0, e: "Body tidak valid" }, 400);
      // Galat tak terduga di panel dicatat supaya penyebabnya bisa dibaca
      // langsung dari tabel wallet_galat, bukan hanya tampil di layar.
      try {
        return await admin(env, b);
      } catch (e) {
        const op = String(b?.p?.op ?? "?");
        await logGalat(env, "panel", "admin:" + op, String(e?.message ?? e));
        return json({ ok: 0, e: "Server gagal memproses " + op + ": " + String(e?.message ?? e).slice(0, 140) }, 500);
      }
    }
    if (url.pathname === "/hivecatalog") {
      try { return await hiveKatalog(); } catch (e) { return json({ ok: 0, e: String(e?.message ?? e) }, 502); }
    }
    if (url.pathname.toLowerCase().startsWith("/g/")) {
      const epG = url.pathname.toLowerCase();
      const bG = req.method === "POST" ? await req.json().catch(() => ({})) : {};
      const uidGame = gameUid(bG.code);
      if (!uidGame) return gagal("Sesi game tidak sah, buka ulang game dari app");
      await pastikan(env, uidGame);
      if (epG.includes("state")) return await gameState(env, uidGame);
      if (epG.includes("spin")) return await gameSpin(env, uidGame, bG);
      return gagal("Endpoint game tidak dikenal");
    }
    if (url.pathname.toLowerCase() === "/wavelog") {
      try {
        await waveLogPastikan(env);
        const r = await pipe(env, [
          { sql: "select waktu, ep, kode, alasan, uid, panjang_token, ua, ip, isi from wave_log order by id desc limit 40", args: [] },
        ]);
        return json({ ok: 1, w: r[0].rows });
      } catch (e) {
        return json({ ok: 0, e: String(e?.message ?? e) }, 500);
      }
    }
    if (url.pathname.toLowerCase().startsWith("/avatar/")) {
      const uidAv = decodeURIComponent(url.pathname.slice("/avatar/".length));
      try {
        const rAv = await pipe(env, [
          { sql: "select avatar from wave_players where uid = ?", args: [T(uidAv)] },
        ]);
        let av = String(rAv[0].rows[0]?.avatar ?? "").trim();
        if (!av) av = await fotoProfilRtdb(env, uidAv);
        if (!av) return new Response("", { status: 404 });
        if (/^https?:\/\//i.test(av)) return Response.redirect(av, 302);
        av = av.replace(/^data:image\/[a-z]+;base64,/i, "").replace(/\s+/g, "");
        const bin = Uint8Array.from(atob(av), (c) => c.charCodeAt(0));
        const jenis = bin[0] === 0x89 ? "image/png" : bin[0] === 0x47 ? "image/gif" : "image/jpeg";
        return new Response(bin, {
          status: 200,
          headers: {
            "Content-Type": jenis,
            "Cache-Control": "public, max-age=86400",
            "Access-Control-Allow-Origin": "*",
          },
        });
      } catch (e) {
        return new Response("", { status: 404 });
      }
    }
    if (url.pathname.toLowerCase() === "/wave/token") {
      const bTok = req.method === "POST" ? await req.json().catch(() => ({})) : {};
      const t = String(bTok.t ?? url.searchParams.get("t") ?? "");
      const k = String(bTok.k ?? url.searchParams.get("k") ?? "");
      const adminKey = String(env.WAVE_KEY ?? "rezo-wave-2026-admin");
      // 1) app minta token pendek dengan JWT Firebase-nya
      if (t) {
        const uidApp = await uidDariToken(t);
        if (!uidApp) return json({ ok: 0, e: "Sesi tidak sah" }, 401);
        const tk = await waveTokenBaru(env, uidApp, 3 * 3600);
        return json({ ok: 1, w: tk });
      }
      // 2) pembuatan token uji (khusus admin)
      if (k === adminKey && bTok.uid) {
        const hari = Math.max(1, Math.min(90, Number(bTok.hari ?? 30)));
        const tk = await waveTokenBaru(env, String(bTok.uid), hari * 86400);
        return json({ ok: 1, w: tk });
      }
      return json({ ok: 0, e: "Permintaan token tidak sah" }, 400);
    }
    // Game Greedy King milik REZO (server sendiri, chip diatur dari panel).
    // Unduhan APK langsung dari server sendiri. Tautan GitHub membuka aplikasi
    // GitHub di HP pengguna, jadi pengguna mendarat di layar login.
    if (url.pathname === "/unduh" || url.pathname.toLowerCase().startsWith("/unduh/")) {
      const jawab = await unduhApk(url.pathname, env);
      if (jawab) return jawab;
    }

    // Berkas game Bikini Wild Rush dari folder VPS (kalau GAME_DIR diisi).
    if (url.pathname.toLowerCase().startsWith("/game/")) {
      const berkas = await sajikanGame(req, env);
      if (berkas) return berkas;
    }

    // Game slot (Zeus Treasures) memakai saldo dompet yang sama.
    if (url.pathname.toLowerCase().startsWith("/slot/")) {
      const jawab = await slotPlay(req, env, { pipe, json, T, I, uidDariToken });
      const kepala = new Headers(jawab.headers);
      kepala.set("access-control-allow-origin", "*");
      kepala.set("access-control-allow-headers", "authorization, content-type");
      kepala.set("access-control-allow-methods", "GET, POST, OPTIONS");
      return new Response(jawab.body, { status: jawab.status, headers: kepala });
    }
    if (url.pathname.toLowerCase().startsWith("/bikini/")) {
      const asal = req.headers.get("origin") || "*";
      if (req.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: {
            "access-control-allow-origin": asal,
            "access-control-allow-headers": "authorization, content-type",
            "access-control-allow-methods": "GET, POST, OPTIONS",
            "access-control-max-age": "86400",
          },
        });
      }
      const jawab = await bikiniPlay(req, env, { pipe, json, gagal, T, I, uidDariToken });
      const kepala = new Headers(jawab.headers);
      kepala.set("access-control-allow-origin", asal);
      kepala.set("vary", "origin");
      return new Response(jawab.body, { status: jawab.status, headers: kepala });
    }
    if (url.pathname.toLowerCase().startsWith("/greedy/")) {
      const asal = req.headers.get("origin") || "*";
      if (req.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: {
            "access-control-allow-origin": asal,
            "access-control-allow-headers": "authorization, content-type",
            "access-control-allow-methods": "GET, POST, OPTIONS",
            "access-control-max-age": "86400",
          },
        });
      }
      const jawab = await greedyPlay(req, env, { pipe, pipeTrx, json, gagal, T, I, uidDariToken });
      const kepala = new Headers(jawab.headers);
      kepala.set("access-control-allow-origin", asal);
      kepala.set("vary", "origin");
      return new Response(jawab.body, { status: jawab.status, headers: kepala });
    }
    if (url.pathname.toLowerCase().startsWith("/wave/")) {
      return await wavePlay(req, env);
    }
    if (url.pathname.toLowerCase().startsWith("/hive/")) {
      return await hivePlay(req, env);
    }
    if (url.pathname === "/otp/minta") {
      const b = await req.json().catch(() => null);
      if (!b) return json({ ok: 0, e: "Body tidak valid" }, 400);
      try { return await otpMinta(env, b); }
      catch (e) { return json({ ok: 0, e: String(e?.message ?? e) }, 502); }
    }
    if (url.pathname === "/otp/cek") {
      const b = await req.json().catch(() => null);
      if (!b) return json({ ok: 0, e: "Body tidak valid" }, 400);
      try { return await otpCek(env, b); }
      catch (e) { return json({ ok: 0, e: String(e?.message ?? e) }, 502); }
    }
    // Tautan unduhan APK. Tanpa kunci yang benar, pengunjung melihat halaman
    // "504 Gateway Time-out" - jadi tautan ini tidak bisa dibagikan ke orang lain.
    if (url.pathname.toLowerCase() === "/unduh/apk") {
      const kunci = url.searchParams.get("k") || "";
      if (kunci !== APK_KEY) {
        return new Response(HALAMAN_504, {
          status: 504,
          headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
        });
      }
      return new Response(null, { status: 302, headers: { location: APK_ASLI } });
    }
    // Token suara room: LiveKit milik sendiri di VPS. App mengirim token login
    // Firebase, server ini yang menandatangani token LiveKit berumur panjang
    // supaya mikrofon tidak mati saat dipakai di tengah room.
    if (url.pathname.toLowerCase() === "/lktoken") {
      // Cukup izinkan dari app sendiri dan panel.
      const kepalaLk = req.headers.get("authorization") || "";
      const idLk = kepalaLk.toLowerCase().startsWith("bearer ") ? kepalaLk.slice(7).trim() : "";
      const uidLk = idLk ? await uidDariToken(idLk) : null;
      if (!uidLk) return json({ ok: 0, e: "Sesi tidak sah" }, 401);
      const kunciLk = String(env.LIVEKIT_API_KEY || "");
      const rahasiaLk = String(env.LIVEKIT_API_SECRET || "");
      const alamatLk = String(env.LIVEKIT_URL || "");
      if (!kunciLk || !rahasiaLk || !alamatLk) {
        return json({ ok: 0, e: "LiveKit belum diatur di server" }, 503);
      }
      let isiLk = {};
      try { isiLk = await req.json(); } catch { isiLk = {}; }
      // HP mengirim nama room di kolom "channel". Dulu hanya "room" yang dibaca,
      // jadi semua room jatuh ke satu room "umum" dan suara tembus antar room.
      const roomLk = (String(
        isiLk.room || isiLk.channel || url.searchParams.get("room") || url.searchParams.get("channel") || "umum",
      ).replace(/[^0-9A-Za-z_.:-]/g, "") || "umum").slice(0, 64);
      const namaLk = String(isiLk.name || "").slice(0, 40);
      const kiniLk = Math.floor(Date.now() / 1000);
      const klaimLk = {
        iss: kunciLk, sub: uidLk, iat: kiniLk, nbf: kiniLk - 5, exp: kiniLk + 21600,
        jti: uidLk + "-" + kiniLk,
        video: { room: roomLk, roomJoin: true, canPublish: true, canSubscribe: true, canPublishData: true },
      };
      if (namaLk) klaimLk.name = namaLk;
      let tokenLk = "";
      try { tokenLk = await jwtLiveKit(klaimLk, rahasiaLk); }
      catch (e) { return json({ ok: 0, e: "Token suara gagal dibuat" }, 500); }
      return json({ ok: 1, token: tokenLk, url: alamatLk, exp: klaimLk.exp });
    }
    // Token suara room lewat Agora. HP hanya menerima App ID dan token; App
    // Certificate tidak pernah dikirim ke HP. Nilainya diambil dari lingkungan
    // server, jadi ganti akun Agora cukup ganti isian di server tanpa rilis APK.
    if (url.pathname.toLowerCase() === "/agora-lapor") {
      // HP melaporkan sebab suara gagal tersambung (kode Agora & kode server),
      // supaya penyebabnya bisa dibaca dari server tanpa menebak.
      let isiLapor = {};
      try { isiLapor = await req.json(); } catch { isiLapor = {}; }
      const uidLapor = String(isiLapor.uid ?? "").slice(0, 80);
      const pesanLapor = [
        "room=" + String(isiLapor.room ?? "-").slice(0, 40),
        "agora=" + String(isiLapor.kode ?? "-").slice(0, 12),
        "alasan=" + String(isiLapor.alasan ?? "-").slice(0, 12),
        "server=" + String(isiLapor.server ?? "-").slice(0, 12),
        "status=" + String(isiLapor.status ?? "-").slice(0, 80),
        "versi=" + String(isiLapor.versi ?? "-").slice(0, 20),
      ].join(" ");
      await logGalat(env, uidLapor, "agora_app", pesanLapor);
      return json({ ok: 1 });
    }
    if (url.pathname.toLowerCase() === "/agora-token") {
      const kepalaAg = req.headers.get("authorization") || "";
      const idAg = kepalaAg.toLowerCase().startsWith("bearer ") ? kepalaAg.slice(7).trim() : "";
      const uidAg = idAg ? await uidDariToken(idAg) : null;
      if (!uidAg) {
        await logGalat(env, "", "agora_token", "sesi tidak sah (401)");
        return json({ ok: 0, e: "Sesi tidak sah" }, 401);
      }
      const kredAg = await agoraKredensial(env);
      const appIdAg = kredAg.appId;
      const certAg = kredAg.cert;
      if (!appIdAg || !certAg) {
        await logGalat(env, uidAg, "agora_token", "app id/cert kosong di panel");
        return json({ ok: 0, e: "Agora belum diatur di server" }, 503);
      }
      let isiAg = {};
      try { isiAg = await req.json(); } catch { isiAg = {}; }
      const roomAg = (String(
        isiAg.room || isiAg.channel || url.searchParams.get("room") || url.searchParams.get("channel") || "umum",
      ).replace(/[^0-9A-Za-z_.:-]/g, "") || "umum").slice(0, 64);
      // Akun Agora memakai uid login apa adanya (bukan angka), jadi kursi mic
      // dan gelombang suara tetap memakai uid Firebase yang sama.
      const akunAg = String(uidAg).slice(0, 60);
      let modAg = null;
      try { modAg = await import("agora-token"); }
      catch (e) {
        await logGalat(env, uidAg, "agora_token", "pustaka agora-token belum ada");
        return json({ ok: 0, e: "Pustaka token Agora belum terpasang di server" }, 503);
      }
      const pakAg = modAg.default ?? modAg;
      let tokenAg = "";
      try {
        tokenAg = pakAg.RtcTokenBuilder.buildTokenWithUserAccount(
          appIdAg, certAg, roomAg, akunAg, pakAg.RtcRole.PUBLISHER, 21600, 21600,
        );
      } catch (e) {
        await logGalat(env, uidAg, "agora_token", "gagal buat token: " + String(e?.message ?? e));
        return json({ ok: 0, e: "Token suara gagal dibuat" }, 500);
      }
      if (!tokenAg) {
        await logGalat(env, uidAg, "agora_token", "app id/cert tidak sah");
        return json({ ok: 0, e: "App ID atau App Certificate tidak sah" }, 500);
      }
      return json({ ok: 1, appId: appIdAg, token: tokenAg, channel: roomAg, account: akunAg, exp: Math.floor(Date.now() / 1000) + 21600 });
    }
    // Pengaturan game Bikini (bet & RTP). Dibaca game tanpa login, jadi
    // boleh diakses publik dan disajikan dengan izin lintas asal.
    if (url.pathname.toLowerCase() === "/bikini-cfg" || url.pathname.toLowerCase() === "/bikini-cfg.json") {
      const cfgBw = await bikiniCfgKini();
      return new Response(JSON.stringify(cfgBw), {
        status: 200,
        headers: {
          "content-type": "application/json; charset=utf-8",
          "access-control-allow-origin": "*",
          "cache-control": "no-store",
        },
      });
    }
    // Digital Asset Links: menyambungkan domain ini dengan aplikasi Android,
    // sehingga tautan viza langsung membuka APK tanpa dialog pemilih.
    if (url.pathname === "/.well-known/assetlinks.json") {
      const c = await cfgSemua(env);
      const paket = String(c.assetPackage || "");
      const sidik = String(c.assetSha256 || "");
      const isi = paket && sidik
        ? [{ relation: ["delegate_permission/common.handle_all_urls"],
             target: { namespace: "android_app", package_name: paket, sha256_cert_fingerprints: [sidik] } }]
        : [];
      return new Response(JSON.stringify(isi, null, 2), {
        status: 200,
        headers: { "content-type": "application/json; charset=utf-8", "access-control-allow-origin": "*", "cache-control": "no-store" },
      });
    }
    // Pengaturan aplikasi dari panel (versi & link APK) dibaca tanpa login.
    if (url.pathname === "/app-cfg.json") {
      const c = await cfgSemua(env);
      return new Response(JSON.stringify({
        versi: String(c.versiTerbaru || ""),
        versiMin: String(c.versiMin || ""),
        apkUrl: String(c.apkUrl || ""),
        catatan: String(c.apkCatatan || ""),
        assetPackage: String(c.assetPackage || ""),
      }), {
        status: 200,
        headers: { "content-type": "application/json; charset=utf-8", "access-control-allow-origin": "*", "cache-control": "no-store" },
      });
    }
    if (url.pathname === "/health") {
      // Sekaligus buktikan database masih bisa dibaca.
      try {
        await pipe(env, [{ sql: "select 1 as ok" }]);
        const modeDb = dbGalat ? "sqlite bermasalah: " + dbGalat : "sqlite-lokal";
        // Ringkasan data staf: hanya jumlah dan peran, tanpa UID atau nama.
        let staf = 0, stafAktif = 0, peran = [];
        try {
          const r = await pipe(env, [
            { sql: "select count(*) c, coalesce(sum(active), 0) a from panel_staf" },
            { sql: "select role, count(*) n from panel_staf group by role" },
          ]);
          staf = Number(r[0].rows[0]?.c ?? 0);
          stafAktif = Number(r[0].rows[0]?.a ?? 0);
          peran = r[1].rows.map((x) => String(x.role) + ":" + Number(x.n));
        } catch (e) { /* tabel belum ada */ }
        return json({ ok: 1, v: "viza-2026-11-23-agora-lapor", rondeMs: CF_RONDE_MS, db: 1, proj: PROJ_SAH, agora: ((await agoraKredensial(env)).appId && (await agoraKredensial(env)).cert) ? 1 : 0, simpan: modeDb, email: (env.RESEND_KEY || env.RESEND_API_KEY) ? 1 : 0, sa: (await tokenLayanan(env)) ? 1 : 0, staf, stafAktif, peran, node: typeof process !== "undefined" ? process.version : "?" });
      } catch (e) {
        return json({ ok: 0, v: "viza-2026-11-13-mandiri", db: String(e?.message ?? e) }, 500);
      }
    }
    if (req.method !== "POST") return gagal("Gunakan POST");

    let b;
    try { b = await req.json(); } catch { return gagal("Isi permintaan tidak terbaca"); }

    const aksi = String(b.a ?? "");
    const p = b.p ?? {};
    // App mengirim nama bersnake_case; samakan supaya satu jalur.
    p.itemId ??= p.item_id;
    p.roomId ??= p.room_id;

    // Pemanggilan dari app wajib membawa token login Firebase.
    const uidToken = await uidDariToken(String(b.t ?? ""));
    if (!uidToken) {
      await logGalat(env, klaimUid(String(b.t ?? "")), aksi, "token ditolak: " + (sesiAlasan || "-"));
      return json({ ok: 0, e: "Sesi tidak sah" }, 401);
    }

    // uid selalu mengikuti token yang sah. Aplikasi kadang masih membawa uid
    // akun lama (mis. setelah ganti akun atau pulih dari cadangan), dan dulu
    // permintaan seperti itu ditolak "Sesi tidak sah" sehingga gift, pasang
    // bingkai, dan game ikut gagal. Sekarang uid lama hanya dicatat, lalu
    // dipakai uid dari token supaya aksi tetap berjalan pada akun yang login.
    const uidKirim = String(p.uid ?? "").trim();
    const uid = uidToken;
    if (uidKirim && uidKirim !== uidToken) {
      await logGalat(env, uidToken, aksi, "uid app beda dengan token, dipakai uid token: " + uidKirim);
    }

    try {
      switch (aksi) {
        case "get": {
          try {
            return ok(await pastikan(env, uid));
          } catch (e) {
            await logGalat(env, uid, "get", String(e?.message ?? e));
            throw e;
          }
        }
        case "migrate":
          return ok(await pastikan(env, uid));
        case "paket_info": {
          // Daftar paket coin yang aktif, sumber SAMA dengan menu Currency di
          // panel. Dulu aplikasi membaca Firestore lama sehingga harga dan
          // jumlah coin yang diubah di panel tidak pernah ikut berubah.
          const daftar = (await daftarPaket(env)).filter((x) => x.aktif && x.coins > 0);
          return json({ ok: 1, paket: daftar.map((x) => ({ coins: x.coins, harga: x.harga })) });
        }
        case "iklan_info":
          return await iklanInfoPengguna(env, uid);
        case "iklan_klaim":
          return await iklanKlaimPengguna(env, uid);
        case "send_gift":
          return await kirimGift(env, uid, p);
        case "topup":
          return await topup(env, uid, p);
        case "gift_jp":
          return await jackpotGift(env, uid, p);
        case "invite_claim":
          return await hadiahUndangan(env, uid);
        case "signin_claim":
          return await klaimSignin(env, uid, p);
        case "exchange":
          return await tukar(env, uid, p);
        case "buy_vip":
          return await beliVip(env, uid, p);
        case "fam_info":
          return await famInfo(env);
        case "fam_create_pay":
          return await famBayarBuat(env, uid, p);
        case "fam_add_exp":
          return await famTambahExp(env, uid, p);
        case "fam_coins": {
          const f = String(p.fid ?? "").trim();
          return json({ ok: 1, coins: /^[A-Za-z0-9_-]{6,64}$/.test(f) ? await famSaldo(env, f) : 0 });
        }
        case "fam_send":
          return await famKirim(env, uid, p);
        case "buy_item":
          return await beliItem(env, uid, p);
        case "equip":
          return await pasangItem(env, uid, p);
        case "claim_level":
          return await klaimLevel(env, uid);
        case "backfill":
          return await backfillVip(env, uid);
        case "wave_prepare":
          return await wavePrepare(env, uid, p);
        case "gift_cashback":
          return await cashbackGift(env, uid, p);
        case "prop_list":
          return ok(await daftarProp(env, uid));
        case "prop_use":
          return await pakaiProp(env, uid, String(p.id ?? ""));
        case "rocket_claim":
          return await klaimRoket(env, uid, p);
        case "pay_info":
          return json({ ok: 1, pay: await infoBayar(env) });
        case "manual_create":
          return await topupManualBuat(env, uid, p);
        case "topup_status": {
          const id = String(p.order ?? p.id ?? "");
          const r = await pipe(env, [
            { sql: "select status from topup_manual where id = ? and uid = ?", args: [T(id), T(uid)] },
          ]);
          const st = r[0].rows[0]?.status;
          if (!st) return json({ ok: 0, e: "Pesanan tidak ditemukan" });
          const map = { pending: "pending", ok: "paid", tolak: "rejected" };
          return json({ ok: 1, order: { id, status: map[st] ?? st } });
        }
        case "manual_history":
          return await topupManualRiwayat(env, uid);
        case "hive_uang":
          return await hiveUang(env, uid, p);
        default:
          return gagal(`aksi ${aksi} tidak dikenali`);
      }
    } catch (e) {
      return gagal(String(e?.message ?? "Server dompet sibuk"));
    }
  },
};

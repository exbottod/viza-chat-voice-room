// Spesifikasi halaman pengaturan yang dipakai bersama oleh pages/Alat.jsx.
// Setiap halaman cukup menyebut op baca (get) dan op simpan (set) milik server
// dompet, lalu medan yang boleh diubah. Nilai lain yang dikirim server tetap
// dibawa apa adanya saat menyimpan, jadi tidak ada isian yang hilang.
export const ALAT = {
  bet: {
    judul: "Bet game Bikini",
    ket: "Daftar chip bet yang tampil di game Bikini Wild Rush dan RTP-nya. RTP 100% membuat scater 5 sering turun, 95% scater 4, 85% seperti standar biasa. Game membaca nilai ini saat dibuka, tanpa build APK.",
    get: "bikini_cfg_get",
    set: "bikini_cfg_set",
    medan: [
      { k: "bets", label: "Chip bet (pisahkan dengan koma)", jenis: "angkaDaftar" },
      { k: "rtp", label: "RTP", jenis: "pilih", opsi: [[85, "85% (standar)"], [95, "95% (scater 4)"], [100, "100% (scater 5)"]] },
    ],
  },
  greedy: {
    judul: "Greedy King",
    ket: "Chip bet dan RTP game Greedy King.",
    get: "gk_cfg_get", set: "gk_cfg_set",
    medan: [
      { k: "bet", label: "Chip bet (pisahkan dengan koma)", jenis: "angkaDaftar" },
      { k: "rtp", label: "RTP (%)", jenis: "angka" },
    ],
  },
  fruit: {
    judul: "Crazy Fruit",
    ket: "Chip bet dan RTP game Crazy Fruit. Semua pengali buah menyesuaikan agar tidak ada buah yang bisa menembus RTP.",
    get: "cf_cfg_get", set: "cf_cfg_set",
    medan: [
      { k: "bet", label: "Chip bet (pisahkan dengan koma)", jenis: "angkaDaftar" },
      { k: "rtp", label: "RTP (%)", jenis: "angka" },
    ],
  },
  roket: {
    judul: "Hadiah roket",
    ket: "Energi (EXP) tiap level roket 1 sampai 5. Peringkat 1-3 memakai isian coin yang tersimpan di server; ubah di sini bila perlu.",
    get: "rocket_cfg_get", set: "rocket_cfg_set",
    medan: [
      { k: "exp", label: "Energi roket level 1-5 (pisahkan dengan koma)", jenis: "angkaDaftar" },
    ],
  },
  family: {
    judul: "Family",
    ket: "Harga membuat family dalam coin dan rasio exp family ke coin family. Isi 100 berarti setiap 100 exp menjadi 1 coin family.",
    get: "fam_cfg_get", set: "fam_cfg_set",
    medan: [
      { k: "harga", label: "Harga membuat family (coin)", jenis: "angka" },
      { k: "exp_per_coin", label: "Exp per 1 coin family", jenis: "angka" },
    ],
  },
  vipharga: {
    judul: "Plan (harga VIP)",
    ket: "Sembilan harga VIP dari level 1 sampai 9, dalam rupiah.",
    get: "vip_harga_get", set: "vip_harga_set",
    medan: [{ k: "harga", label: "Harga VIP level 1-9 (pisahkan dengan koma)", jenis: "angkaDaftar" }],
  },
  pay: {
    judul: "Payment manual",
    ket: "Nomor dan nama tujuan top-up manual yang tampil di aplikasi.",
    get: "pay_get", set: "pay_set", akar: "pay",
    medan: [
      { k: "dana", label: "Nomor DANA", jenis: "teks" },
      { k: "name", label: "Nama pemilik rekening", jenis: "teks" },
      { k: "gopay", label: "Nomor GoPay", jenis: "teks" },
      { k: "qris", label: "Link atau keterangan QRIS", jenis: "teks" },
    ],
  },
  reward: { judul: "Reward room", ket: "Banner kemenangan room. Ubah isinya dalam bentuk JSON.", get: "win_banner_get", set: "win_banner_set" },
  cashback: { judul: "Cashback gift", ket: "Tingkatan cashback gift, boost, dan zonk. Ubah isinya dalam bentuk JSON.", get: "cb_cfg_get", set: "cb_cfg_set" },
};

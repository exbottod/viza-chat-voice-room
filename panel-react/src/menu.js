// Susunan menu mengikuti panel acuan Rayzi Ultimate: grup berjudul kecil
// (USER MANAGEMENT, FINANCIAL MANAGEMENT, GAMING, ...), ikon garis, panah di
// kanan tiap item, dan item aktif pink dengan garis di tepi kiri menu.
export const MENU = [
  { grup: "DASHBOARD", isi: [["dashboard", "insights", "Dashboard"]] },
  {
    grup: "USER MANAGEMENT",
    isi: [
      ["user", "person", "User"],
      ["room", "mic", "Room"],
      ["staf", "badge", "Host & Agency"],
      ["cs", "support_agent", "Customer Service"],
      ["seller", "storefront", "Coin Seller"],
      ["laporan", "flag", "Laporan user"],
      ["family", "diversity_3", "Family"],
    ],
  },
  {
    grup: "FINANCIAL MANAGEMENT",
    isi: [
      ["vipharga", "workspace_premium", "Plan (harga VIP)"],
      ["vip", "military_tech", "VIP & Medali"],
      ["cekin", "event_available", "Plan history (cek in)"],
      ["wallet", "account_balance_wallet", "Currency (coin & reset)"],
      ["cashback", "savings", "Cashback gift"],
    ],
  },
  {
    grup: "GAMING",
    isi: [
      ["katalog", "sports_esports", "Katalog game"],
      ["pasang", "link", "Pasang game"],
      ["bet", "casino", "Bet game"],
      ["greedy", "toll", "Greedy King"],
      ["fruit", "nutrition", "Crazy Fruit"],
      ["roket", "rocket_launch", "Hadiah roket"],
      ["reward", "emoji_events", "Reward room"],
    ],
  },
  {
    grup: "ENGAGEMENT",
    isi: [
      // Gift punya sub menu: Category (daftar kategori) dan Gift (semua gift).
      ["gift", "redeem", "Gift", [["gift", "Category"], ["giftdaftar", "Gift"]]],
      ["emote", "mood", "Reaction (emote)"],
      ["kirim", "send", "Kirim ke user"],
      ["pengumuman", "campaign", "Broadcast & pengumuman"],
    ],
  },
  {
    grup: "CONTENT MANAGEMENT",
    isi: [
      ["frame", "image", "Frame & banner"],
      ["aset", "auto_awesome", "Aset & VIP"],
      ["asetvps", "folder_open", "Aset di VPS"],
      ["latar", "wallpaper", "Background tab"],
    ],
  },
  {
    grup: "DATA",
    isi: [
      ["database", "storage", "Database"],
      ["log", "history", "Log admin"],
    ],
  },
  { grup: "CONFIG", isi: [["pengaturan", "settings", "Pengaturan"]] },
];

export const JUDUL = MENU.flatMap((g) => g.isi).reduce((a, [id, , nama, anak]) => {
  const b = { ...a, [id]: nama };
  (anak || []).forEach(([cid, cnama]) => { b[cid] = nama + " / " + cnama; });
  return b;
}, {});

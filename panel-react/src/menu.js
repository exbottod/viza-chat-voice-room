// Susunan menu mengikuti panel acuan Rayzi Ultimate: grup berjudul kecil
// (USER MANAGEMENT, FINANCIAL MANAGEMENT, GAMING, ...), ikon garis, panah di
// kanan tiap item, dan item aktif pink dengan garis di tepi kiri menu.
export const MENU = [
  { grup: "DASHBOARD", isi: [["dashboard", "insights", "Dashboard"]] },
  {
    grup: "USER MANAGEMENT",
    isi: [
      ["user", "person", "User"],
      ["reset", "restart_alt", "Reset user"],
      ["room", "mic", "Room"],
      ["momen", "photo_library", "Momen user"],
      ["staf", "badge", "Host & Agency"],
      ["cs", "support_agent", "Customer Service"],
      // Staf aplikasi (bukan staf panel): Coin seller, Manager, dan Admin yang
      // memakai panel di dalam aplikasi. Dibuka ke bawah seperti Gift.
      ["stafapp", "badge", "Staf App", [
        ["coinseller", "Coin seller"],
        ["managerapp", "Manager"],
        ["adminapp", "Admin"],
      ]],
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
      ["sendcoin", "paid", "Send coin"],
      ["cashback", "savings", "Cashback gift"],
      ["pencairan", "payments", "Pencairan agency"],
      ["iklan", "ads_click", "Iklan & coin gratis"],
    ],
  },
  {
    grup: "GAMING",
    isi: [
      // Satu tab Game dengan sub menu ke bawah: bet, RTP, banner, kategori,
      // hadiah roket, dan reward room.
      ["game", "sports_esports", "Game", [
        ["gamebet", "Bet game"],
        ["gamertp", "RTP game"],
        ["gamebanner", "Banner game"],
        ["gamekategori", "Kategori game"],
        ["gameroket", "Hadiah roket"],
        ["gamereward", "Reward room"],
      ]],
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
      ["banner", "image", "Banner"],
      ["store", "storefront", "Store"],
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

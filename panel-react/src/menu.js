// Susunan menu mengikuti panel acuan Rayzi Ultimate: grup berjudul kecil,
// ikon garis (Material Icons), item aktif pink dengan garis di tepi.
export const MENU = [
  { grup: "", isi: [["dashboard", "dashboard", "Dashboard"]] },
  {
    grup: "KELOLA",
    isi: [
      ["user", "group", "User"],
      ["room", "mic", "Room"],
      ["staf", "badge", "Staf & seller"],
      ["cs", "support_agent", "Customer Service"],
      ["laporan", "flag", "Laporan user"],
      ["wallet", "paid", "Coin & reset"],
      ["cekin", "event_available", "Cek in harian"],
      ["vipharga", "workspace_premium", "Harga VIP"],
      ["family", "diversity_3", "Family"],
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
      ["gift", "redeem", "Gift"],
      ["cashback", "savings", "Cashback gift"],
      ["emote", "mood", "Reaction (emote)"],
      ["kirim", "send", "Kirim ke user"],
    ],
  },
  {
    grup: "CONTENT MANAGEMENT",
    isi: [
      ["frame", "image", "Frame & banner"],
      ["aset", "auto_awesome", "Aset & VIP"],
      ["asetvps", "folder_open", "Aset di VPS"],
      ["latar", "wallpaper", "Background tab"],
      ["pengumuman", "campaign", "Pengumuman resmi"],
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

export const JUDUL = MENU.flatMap((g) => g.isi).reduce((a, [id, , nama]) => ({ ...a, [id]: nama }), {});

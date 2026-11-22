// Susunan menu sama dengan panel lama, supaya admin tidak perlu belajar ulang.
export const MENU = [
  { grup: "HOME", isi: [["dashboard", "▦", "Dashboard"]] },
  {
    grup: "KELOLA",
    isi: [
      ["user", "👥", "User"],
      ["room", "🎤", "Room"],
      ["gift", "🎁", "Gift"],
      ["cashback", "🎰", "Cashback gift"],
      ["frame", "🖼️", "Frame & banner"],
      ["aset", "✨", "Aset & VIP"],
      ["asetvps", "🗃️", "Aset di VPS"],
      ["emote", "😀", "Emote room"],
      ["kirim", "🎁", "Kirim ke user"],
      ["staf", "👥", "Staf & seller"],
      ["cs", "💬", "Customer Service"],
      ["laporan", "🚩", "Laporan user"],
      ["wallet", "🪙", "Coin & reset"],
      ["cekin", "📅", "Cek in harian"],
      ["vipharga", "💎", "Harga VIP"],
      ["family", "🏰", "Family"],
    ],
  },
  {
    grup: "GAME",
    isi: [
      ["katalog", "🎮", "Katalog game"],
      ["pasang", "🔗", "Pasang game"],
      ["bet", "🎲", "Bet game"],
      ["greedy", "🎰", "Greedy King"],
      ["fruit", "🍉", "Crazy Fruit"],
      ["roket", "🚀", "Hadiah roket"],
      ["reward", "🏆", "Reward room"],
    ],
  },
  {
    grup: "DATA",
    isi: [
      ["database", "🗄️", "Database"],
      ["latar", "🖼️", "Background tab"],
      ["pengumuman", "📢", "Pengumuman resmi"],
      ["log", "📜", "Log admin"],
    ],
  },
  { grup: "CONFIG", isi: [["pengaturan", "⚙️", "Pengaturan"]] },
];

export const JUDUL = MENU.flatMap((g) => g.isi).reduce((a, [id, , nama]) => ({ ...a, [id]: nama }), {});

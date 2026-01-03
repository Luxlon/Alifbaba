# 🌟 AlifBaBa - Aplikasi Belajar Islam untuk Anak

<div align="center">

![AlifBaBa Logo](public/mascot.svg)

**Belajar Huruf Hijaiyah, Kisah Nabi, dan Hadith dengan Cara yang Menyenangkan!**

[![Next.js](https://img.shields.io/badge/Next.js-14.2.35-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## 📖 Tentang Project

**AlifBaBa** adalah aplikasi web edukasi interaktif yang dirancang khusus untuk anak-anak usia 5-12 tahun untuk belajar dasar-dasar Islam dengan cara yang menyenangkan dan engaging.

### ✨ Fitur Utama

#### 📚 3 Modul Pembelajaran
- **28 Huruf Hijaiyah** - Belajar membaca dan menulis huruf Arab dengan audio
- **7 Kisah Nabi** - Tonton video kisah para nabi dengan quiz interaktif  
- **8 Hadith Pilihan** - Pelajari hadith dengan teks Arab, latin, dan terjemahan

#### 🎮 Sistem Gamifikasi
- **Level & XP System** - Naik level dari 1 sampai 10
- **Hearts System** - 5 nyawa untuk menjawab quiz
- **Points & Shop** - Kumpulkan points untuk beli power-ups
- **Quest System** - Daily quests, weekly quests, dan achievements
- **Streak System** - Login bonus untuk konsistensi belajar
- **Leaderboard** - Kompetisi ranking dengan user lain

#### 🎯 Features Lainnya
- ✅ Responsive design (mobile & desktop)
- ✅ Progress tracking per modul
- ✅ Quiz interaktif dengan feedback instant
- ✅ Audio player untuk pengucapan Arab
- ✅ YouTube integration untuk video
- ✅ Daily login rewards
- ✅ Profile page dengan statistics

---

## 🚀 Quick Start

### Prerequisites
```bash
Node.js >= 18.0.0
npm >= 9.0.0
```

### Installation

```bash
# 1. Clone atau extract project
cd alifbaba

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Open browser
# http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

---

## 🗂️ Struktur Project

```
alifbaba/
├── app/                    # Next.js pages (App Router)
│   ├── (main)/            # Main app routes
│   │   ├── hijaiyah/      # Hijaiyah module
│   │   ├── stories/       # Prophet stories
│   │   ├── hadith/        # Hadith module (20 hadist)
│   │   ├── quests/        # Quest & achievements
│   │   ├── shop/          # Store
│   │   ├── leaderboard/   # Rankings
│   │   └── account/       # Profile
│   └── page.tsx           # Landing page
│
├── components/            # React components
│   ├── ui/               # UI components (buttons, etc)
│   ├── audio-player.tsx  # Custom audio player with speed controls
│   ├── youtube-player.tsx # YouTube embed
│   └── sidebar.tsx       # Navigation

│
├── store/                # State management (Zustand)
│   ├── use-user-progress.tsx
│   ├── use-lesson-progress.tsx
│   └── use-quests.tsx
│
├── public/               # Static assets
│   ├── audio/           # Audio files (MP3)
│   └── icons/           # SVG icons
│
└── constants.ts         # All mock data
```

---

## 🎮 Cara Menggunakan

### 1. **Landing Page**
- Klik tombol "Mulai Belajar" di homepage
- Pilih modul yang ingin dipelajari

### 2. **Belajar Hijaiyah**
- Pilih huruf dari daftar
- Dengarkan audio pengucapan
- Jawab quiz (3 pertanyaan per huruf)
- Dapatkan 50 XP per huruf yang selesai

### 3. **Kisah Nabi**
- Pilih kisah dari daftar
- Tonton video YouTube
- Jawab quiz (5 pertanyaan per story)
- Dapatkan 100 XP per story yang selesai

### 4. **Hadith**
- Pilih hadith dari daftar
- Baca teks Arab, Latin, dan terjemahan
- Dengarkan audio pengucapan
- Tandai jika sudah hafal
- Jawab quiz (5 pertanyaan)
- Dapatkan 75 XP per hadith

### 5. **Quest & Achievements**
- Lihat daily quest (reset setiap hari)
- Lihat weekly quest (reset setiap Senin)
- Unlock achievements
- Claim rewards (points & XP)

### 6. **Shop**
- Gunakan points untuk beli:
  - Refill Hearts (5 hearts) - 100 points
  - Unlimited Hearts (60 menit) - 500 points
  - 2x XP Boost (30 menit) - 300 points

### 7. **Leaderboard**
- Lihat ranking user berdasarkan XP
- Top 10 ditampilkan
- User sendiri di-highlight

### 8. **Profile**
- Edit username
- Lihat level dan progress
- Lihat achievement badges
- Lihat quest statistics

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.2.35 | React framework |
| React | 18.3.1 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.4.1 | Styling |
| Zustand | 4.5.2 | State management |
| lucide-react | 0.344.0 | Icons |
| react-confetti | 6.1.0 | Celebrations |
| sonner | 1.4.3 | Toast notifications |

---

## ⚠️ Catatan Penting

### ⚠️ Yang Masih Kurang

1. **Audio Files** - File audio belum diupload:
   - `public/audio/hijaiyah/*.mp3` (28 files)
   - `public/audio/hadith/*.mp3` (8 files)

2. **YouTube Videos** - Video ID masih placeholder, perlu diganti dengan video yang sesuai

3. **Database** - Saat ini pakai localStorage:
   - ❌ Data hilang jika clear browser cache
   - ❌ Tidak bisa sync antar device
   - ❌ Tidak ada authentication
   - ✅ **Solution**: Migrate ke Supabase (lihat `DOCUMENTATION.md`)

4. **Leaderboard** - Masih mock data, perlu database untuk real leaderboard

### 🔄 Next Steps (Future Work)

- [ ] Upload audio files
- [ ] Setup Supabase database
- [ ] Implement authentication
- [ ] Migrate localStorage to Supabase
- [ ] Add more content (doa, surat pendek, etc)
- [ ] Implement PWA for offline support
- [ ] Add analytics

---

## 📚 Dokumentasi

Untuk informasi lebih detail, baca dokumentasi berikut:

- **[DOCUMENTATION.md](DOCUMENTATION.md)** - Dokumentasi lengkap project (untuk non-developer)
  - Semua fitur yang sudah dibuat
  - Struktur project
  - Panduan migrasi ke Supabase
  - Improvement ideas
  
- **[DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)** - Panduan untuk developer
  - Architecture deep dive
  - Component guide
  - State management
  - Adding new features
  - Testing & deployment
  - Troubleshooting

---

## 🤝 Contributing

Ini adalah project edukasi. Jika ingin contribute:

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 🐛 Bug Reports & Feature Requests

Jika menemukan bug atau ada ide fitur baru:
1. Check existing issues
2. Create new issue dengan deskripsi jelas
3. Attach screenshots jika perlu

---

## 📄 License

MIT License - Feel free to use this project for educational purposes.

---

## 👨‍💻 Developer

**Project**: AlifBaBa - Islamic Learning App for Kids  
**Year**: 2025  
**Framework**: Next.js 14 + React 18 + TypeScript  
**Styling**: Tailwind CSS  
**State**: Zustand (localStorage)

---

## 🙏 Acknowledgments

- Next.js team untuk amazing framework
- Vercel untuk hosting platform
- Tailwind CSS untuk utility-first CSS
- Zustand untuk simple state management
- lucide-react untuk beautiful icons

---

## 📞 Support

Jika butuh bantuan:
- 📖 Baca [DOCUMENTATION.md](DOCUMENTATION.md)
- 👨‍💻 Baca [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)
- 🐛 Create issue di GitHub
- 📧 Email: [your-email]

---

<div align="center">

**Dibuat dengan ❤️ untuk anak-anak Indonesia**

⭐ Star project ini jika bermanfaat!

</div>

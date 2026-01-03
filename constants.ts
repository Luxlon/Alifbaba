// ============================================
// CONSTANTS - Konfigurasi Aplikasi AlifBaBa
// ============================================

import type { HadithData } from "@/types/database";

// Gamifikasi
export const POINTS_TO_REFILL = 10; // Poin yang dibutuhkan untuk isi ulang hearts
export const MAX_HEARTS = 5; // Jumlah maksimal hearts
export const XP_PER_LESSON = 10; // XP per lesson selesai
export const XP_PER_CORRECT_ANSWER = 5; // XP per jawaban benar
export const XP_BONUS_PERFECT = 20; // XP bonus jika semua benar

// Quests
export const quests = [
  { title: "Kumpulkan 20 XP", value: 20 },
  { title: "Kumpulkan 50 XP", value: 50 },
  { title: "Kumpulkan 100 XP", value: 100 },
  { title: "Kumpulkan 500 XP", value: 500 },
  { title: "Kumpulkan 1000 XP", value: 1000 },
];

// ============================================
// DATA HURUF HIJAIYAH
// ============================================
export const HIJAIYAH_LETTERS = [
  { 
    id: 1, letter: "ا", name: "Alif", transliteration: "A", 
    audioFile: "/audio/hijaiyah/alif.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_a.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_i.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/u.mp3"
  },
  { 
    id: 2, letter: "ب", name: "Ba", transliteration: "B", 
    audioFile: "/audio/hijaiyah/ba.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_ba.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_bi.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/bu.mp3"
  },
  { 
    id: 3, letter: "ت", name: "Ta", transliteration: "T", 
    audioFile: "/audio/hijaiyah/ta.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_ta.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_ti.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/tu.mp3"
  },
  { 
    id: 4, letter: "ث", name: "Tsa", transliteration: "Ts", 
    audioFile: "/audio/hijaiyah/tsa.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_tsa.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_tsi.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/tsu.mp3"
  },
  { 
    id: 5, letter: "ج", name: "Jim", transliteration: "J", 
    audioFile: "/audio/hijaiyah/jim.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_ja.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_ji.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/ju.mp3"
  },
  { 
    id: 6, letter: "ح", name: "Ha", transliteration: "H", 
    audioFile: "/audio/hijaiyah/ha.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_ha.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_hi.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/hu.mp3"
  },
  { 
    id: 7, letter: "خ", name: "Kha", transliteration: "Kh", 
    audioFile: "/audio/hijaiyah/kho.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_kho.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_khi.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/khu.mp3"
  },
  { 
    id: 8, letter: "د", name: "Dal", transliteration: "D", 
    audioFile: "/audio/hijaiyah/dal.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_da.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_di.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/du.mp3"
  },
  { 
    id: 9, letter: "ذ", name: "Dzal", transliteration: "Dz", 
    audioFile: "/audio/hijaiyah/dza.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_dza.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_dzi.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/dzu.mp3"
  },
  { 
    id: 10, letter: "ر", name: "Ra", transliteration: "R", 
    audioFile: "/audio/hijaiyah/ro.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_ro.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_ri.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/ru.mp3"
  },
  { 
    id: 11, letter: "ز", name: "Zai", transliteration: "Z", 
    audioFile: "/audio/hijaiyah/zay.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_za.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_zi.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/zu.mp3"
  },
  { 
    id: 12, letter: "س", name: "Sin", transliteration: "S", 
    audioFile: "/audio/hijaiyah/sin.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_sa.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_si.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/su.mp3"
  },
  {
    id: 13, letter: "ش", name: "Syin", transliteration: "Sy", 
    audioFile: "/audio/hijaiyah/syin.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_sya.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_syi.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/syu.mp3"
  },
  { 
    id: 14, letter: "ص", name: "Shad", transliteration: "Sh", 
    audioFile: "/audio/hijaiyah/shod.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_sho.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_shi.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/shu.mp3"
  },
  { 
    id: 15, letter: "ض", name: "Dhad", transliteration: "Dh", 
    audioFile: "/audio/hijaiyah/dhod.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_dho.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_dhi.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/dhu.mp3"
  },
  { 
    id: 16, letter: "ط", name: "Tha", transliteration: "Th", 
    audioFile: "/audio/hijaiyah/tho.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_tho.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_thi.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/thu.mp3"
  },
  { 
    id: 17, letter: "ظ", name: "Zha", transliteration: "Zh", 
    audioFile: "/audio/hijaiyah/dhzo.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_dzo.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_dho.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/dzuu.mp3"
  },
  { 
    id: 18, letter: "ع", name: "Ain", transliteration: "'", 
    audioFile: "/audio/hijaiyah/ain.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_aa.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_ii.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/uu.mp3"
  },
  { 
    id: 19, letter: "غ", name: "Ghain", transliteration: "Gh", 
    audioFile: "/audio/hijaiyah/ghoin.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_gho.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_ghi.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/ghu.mp3"
  },
  { 
    id: 20, letter: "ف", name: "Fa", transliteration: "F", 
    audioFile: "/audio/hijaiyah/fa.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_fa.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_fi.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/fu.mp3"
  },
  { 
    id: 21, letter: "ق", name: "Qaf", transliteration: "Q", 
    audioFile: "/audio/hijaiyah/qof.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_qo.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_qi.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/qu.mp3"
  },
  { 
    id: 22, letter: "ك", name: "Kaf", transliteration: "K", 
    audioFile: "/audio/hijaiyah/kaf.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_ka.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_ki.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/ku.mp3"
  },
  { 
    id: 23, letter: "ل", name: "Lam", transliteration: "L", 
    audioFile: "/audio/hijaiyah/lam.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_la.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_li.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/lu.mp3"
  },
  { 
    id: 24, letter: "م", name: "Mim", transliteration: "M", 
    audioFile: "/audio/hijaiyah/mim.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_ma.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_mi.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/mu.mp3"
  },
  { 
    id: 25, letter: "ن", name: "Nun", transliteration: "N", 
    audioFile: "/audio/hijaiyah/nun.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_na.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_ni.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/nu.mp3"
  },
  { 
    id: 26, letter: "و", name: "Wau", transliteration: "W", 
    audioFile: "/audio/hijaiyah/waw.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_wa.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_wi.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/wu.mp3"
  },
  { 
    id: 27, letter: "ه", name: "Ha'", transliteration: "H", 
    audioFile: "/audio/hijaiyah/Ha (besar).mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_haa.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_hii.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/huu.mp3"
  },
  { 
    id: 28, letter: "ء", name: "Hamzah", transliteration: "'", 
    audioFile: "/audio/hijaiyah/hamzah.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_a.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_i.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/u.mp3"
  },
  { 
    id: 29, letter: "ي", name: "Ya", transliteration: "Y", 
    audioFile: "/audio/hijaiyah/ya.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_ya.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_yi.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/yu.mp3"
  },
];

// Harakat (tanda baca) - hanya fathah, kasrah, dhammah
export const HARAKAT = [
  { id: "fathah", name: "Fathah", symbol: "َ", sound: "a", description: "Bunyi 'a'" },
  { id: "kasrah", name: "Kasrah", symbol: "ِ", sound: "i", description: "Bunyi 'i'" },
  { id: "dhammah", name: "Dhammah", symbol: "ُ", sound: "u", description: "Bunyi 'u'" },
];

// Data Iqro
export const IQRO_DATA = [
  { id: 1, title: "Iqro 1", description: "Pengenalan huruf Hijaiyah berharakat fathah", file: "/iqro/iqra1.pdf", color: "emerald" },
  { id: 2, title: "Iqro 2", description: "Huruf Hijaiyah sambung berharakat fathah", file: "/iqro/iqra2.pdf", color: "blue" },
  { id: 3, title: "Iqro 3", description: "Huruf Hijaiyah berharakat kasrah dan dhammah", file: "/iqro/iqra3.pdf", color: "purple" },
  { id: 4, title: "Iqro 4", description: "Huruf Hijaiyah bertanwin dan qalqalah", file: "/iqro/iqra4.pdf", color: "amber" },
  { id: 5, title: "Iqro 5", description: "Tanda waqaf dan cara berhenti", file: "/iqro/iqra5.pdf", color: "rose" },
  { id: 6, title: "Iqro 6", description: "Tajwid dasar dan praktik bacaan", file: "/iqro/iqra6.pdf", color: "cyan" },
];

// ============================================
// DATA KISAH NABI - TAMBAHKAN VIDEO BARU DI SINI
// ============================================
// Format: { id, title, prophet, youtubeId, description, duration, quizQuestions }
export const PROPHET_STORIES = [
  {
    id: 1,
    title: "Kisah Nabi Adam AS",
    prophet: "Adam AS",
    youtubeId: "EMmPWZMQL68", // Ganti dengan YouTube Video ID
    description: "Nabi Adam AS adalah manusia pertama yang diciptakan Allah SWT dari tanah.",
    duration: "10:30",
    quizQuestions: [
      {
        question: "Nabi Adam AS diciptakan dari apa?",
        options: ["Air", "Tanah", "Api", "Angin"],
        correctAnswer: 1,
      },
      {
        question: "Siapa istri Nabi Adam AS?",
        options: ["Aisyah", "Khadijah", "Hawa", "Maryam"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 2,
    title: "Kisah Nabi Nuh AS",
    prophet: "Nuh AS",
    youtubeId: "VIDEO_ID_2", // Ganti dengan YouTube Video ID
    description: "Kisah Nabi Nuh AS dan bahtera besar yang menyelamatkan umatnya dari banjir.",
    duration: "12:45",
    quizQuestions: [
      {
        question: "Nabi Nuh AS membuat apa untuk menyelamatkan umatnya?",
        options: ["Rumah besar", "Bahtera/Kapal", "Benteng", "Gua"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 3,
    title: "Kisah Nabi Ibrahim AS",
    prophet: "Ibrahim AS",
    youtubeId: "VIDEO_ID_3", // Ganti dengan YouTube Video ID
    description: "Nabi Ibrahim AS yang dilempar ke dalam api namun selamat karena pertolongan Allah.",
    duration: "15:20",
    quizQuestions: [
      {
        question: "Apa yang terjadi ketika Nabi Ibrahim dilempar ke api?",
        options: ["Api menjadi dingin", "Api padam", "Ibrahim terbang", "Ibrahim menghilang"],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 4,
    title: "Kisah Nabi Musa AS",
    prophet: "Musa AS",
    youtubeId: "VIDEO_ID_4", // Ganti dengan YouTube Video ID
    description: "Kisah Nabi Musa AS membelah lautan dengan tongkatnya.",
    duration: "18:00",
    quizQuestions: [
      {
        question: "Apa mukjizat Nabi Musa AS?",
        options: ["Menyembuhkan orang sakit", "Membelah lautan", "Berbicara dengan hewan", "Terbang"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 5,
    title: "Kisah Nabi Yusuf AS",
    prophet: "Yusuf AS",
    youtubeId: "VIDEO_ID_5", // Ganti dengan YouTube Video ID
    description: "Kisah Nabi Yusuf AS yang sangat tampan dan penuh ujian dari saudara-saudaranya.",
    duration: "20:15",
    quizQuestions: [
      {
        question: "Saudara-saudara Nabi Yusuf melemparnya ke mana?",
        options: ["Sungai", "Sumur", "Laut", "Gunung"],
        correctAnswer: 1,
      },
      {
        question: "Nabi Yusuf AS terkenal karena apa?",
        options: ["Kekuatannya", "Ketampanannya", "Suaranya", "Tingginya"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 6,
    title: "Kisah Nabi Isa AS",
    prophet: "Isa AS",
    youtubeId: "VIDEO_ID_6", // Ganti dengan YouTube Video ID
    description: "Kisah Nabi Isa AS yang lahir tanpa ayah dan bisa berbicara sejak bayi.",
    duration: "14:30",
    quizQuestions: [
      {
        question: "Siapa ibu Nabi Isa AS?",
        options: ["Hawa", "Maryam", "Khadijah", "Aisyah"],
        correctAnswer: 1,
      },
      {
        question: "Apa keistimewaan Nabi Isa AS saat bayi?",
        options: ["Bisa berjalan", "Bisa berbicara", "Bisa terbang", "Bisa menulis"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 7,
    title: "Kisah Nabi Muhammad SAW",
    prophet: "Muhammad SAW",
    youtubeId: "VIDEO_ID_7", // Ganti dengan YouTube Video ID
    description: "Kisah Nabi Muhammad SAW, nabi terakhir dan penutup para nabi.",
    duration: "25:00",
    quizQuestions: [
      {
        question: "Di kota mana Nabi Muhammad SAW lahir?",
        options: ["Madinah", "Makkah", "Thaif", "Yaman"],
        correctAnswer: 1,
      },
      {
        question: "Siapa yang merawat Nabi Muhammad SAW setelah ibunya wafat?",
        options: ["Ayahnya", "Kakeknya Abdul Muthalib", "Pamannya Abu Bakar", "Saudaranya"],
        correctAnswer: 1,
      },
      {
        question: "Nabi Muhammad SAW adalah nabi yang keberapa?",
        options: ["Ke-24", "Ke-25", "Pertama", "Ke-10"],
        correctAnswer: 1,
      },
    ],
  },
];

// ============================================
// DATA HADIST - TAMBAHKAN HADIST BARU DI SINI
// ============================================
// Hadist-hadist pilihan yang cocok untuk anak-anak (pendek dan mudah dimengerti)
// Audio files sudah tersedia di public/audio/hadith/
export const HADITH_LIST: HadithData[] = [
  {
    id: 1,
    title: "Kasih Sayang",
    arabicText: "الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ",
    transliteration: "Ar-raahimuuna yarhamuhumu ar-rahmaan",
    translation: "Orang-orang yang penyayang akan disayangi oleh Allah Yang Maha Penyayang.",
    narrator: "HR. Tirmidzi",
    category: "Akhlak",
    audioFile: "/audio/hadith/الرَّاحِمُونَ يَرْحَ.mp3",
    difficulty: "easy" as const,
  },
  {
    id: 2,
    title: "Senyum adalah Sedekah",
    arabicText: "تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ صَدَقَةٌ",
    transliteration: "Tabasumuka fii wajhi akiika shadaqah",
    translation: "Senyummu di hadapan saudaramu adalah sedekah.",
    narrator: "HR. Tirmidzi",
    category: "Akhlak",
    audioFile: "/audio/hadith/تَبَسُّمُكَ فِي وَجْ.mp3",
    difficulty: "easy" as const,
  },
  {
    id: 3,
    title: "Kebersihan",
    arabicText: "الطَّهُورُ شَطْرُ الْإِيمَانِ",
    transliteration: "Ath-thuhuuru syathru al-iimaan",
    translation: "Kebersihan adalah sebagian dari iman.",
    narrator: "HR. Muslim",
    category: "Ibadah",
    audioFile: "/audio/hadith/الطَّهُورُ شَطْرُ ال.mp3",
    difficulty: "easy" as const,
  },
  {
    id: 4,
    title: "Berbuat Baik kepada Orang Tua",
    arabicText: "رِضَا اللَّهِ فِي رِضَا الْوَالِدَيْنِ",
    transliteration: "Ridha allahi fii ridha al-waalidain",
    translation: "Ridha Allah tergantung pada ridha orang tua.",
    narrator: "HR. Tirmidzi",
    category: "Keluarga",
    audioFile: "/audio/hadith/رِضَا اللَّهِ فِي رِ.mp3",
    difficulty: "easy" as const,
  },
  {
    id: 5,
    title: "Malu",
    arabicText: "الْحَيَاءُ شُعْبَةٌ مِنَ الْإِيمَانِ",
    transliteration: "Al-hayaa'u syu'batun min al-iimaan",
    translation: "Malu adalah sebagian dari iman.",
    narrator: "HR. Bukhari & Muslim",
    category: "Akhlak",
    audioFile: "/audio/hadith/الْحَيَاءُ شُعْبَةٌ .mp3",
    difficulty: "easy" as const,
  },
  {
    id: 6,
    title: "Jujur",
    arabicText: "إِنَّ الصِّدْقَ يَهْدِي إِلَى الْبِرِّ",
    transliteration: "Inna ash-shidqa yahdii ila al-birr",
    translation: "Sesungguhnya kejujuran membawa kepada kebaikan.",
    narrator: "HR. Bukhari & Muslim",
    category: "Akhlak",
    audioFile: "/audio/hadith/إِنَّ الصِّدْقَ يَهْ.mp3",
    difficulty: "medium" as const,
  },
  {
    id: 7,
    title: "Tidak Marah",
    arabicText: "لَا تَغْضَبْ",
    transliteration: "Laa taghdab",
    translation: "Janganlah kamu marah.",
    narrator: "HR. Bukhari",
    category: "Akhlak",
    audioFile: "/audio/hadith/لَا تَغْضَبْ.mp3",
    difficulty: "easy" as const,
  },
  {
    id: 8,
    title: "Menyayangi yang di Bumi",
    arabicText: "ارْحَمُوا مَنْ فِي الْأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ",
    transliteration: "Irhamuu man fii al-ardhi yarhamkum man fii as-samaa'",
    translation: "Sayangilah yang di bumi, niscaya yang di langit akan menyayangimu.",
    narrator: "HR. Tirmidzi",
    category: "Akhlak",
    audioFile: "/audio/hadith/ارْحَمُوا مَنْ فِي ا.mp3",
    difficulty: "medium" as const,
  },
  {
    id: 9,
    title: "Mencintai Saudara",
    arabicText: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    transliteration: "Laa yu'minu ahadukum hattaa yuhibba li akhiihi maa yuhibbu li nafsihi",
    translation: "Tidak sempurna iman seseorang sampai ia mencintai untuk saudaranya apa yang ia cintai untuk dirinya sendiri.",
    narrator: "HR. Bukhari & Muslim",
    category: "Akhlak",
    audioFile: "/audio/hadith/لَا يُؤْمِنُ أَحَدُك.mp3",
    difficulty: "medium" as const,
  },
  {
    id: 10,
    title: "Bersyukur",
    arabicText: "مَنْ لَمْ يَشْكُرِ النَّاسَ لَمْ يَشْكُرِ اللَّهَ",
    transliteration: "Man lam yasykuri an-naasa lam yasykuri allaha",
    translation: "Barang siapa yang tidak bersyukur kepada manusia, maka ia tidak bersyukur kepada Allah.",
    narrator: "HR. Tirmidzi",
    category: "Akhlak",
    audioFile: "/audio/hadith/مَنْ لَمْ يَشْكُرِ ا.mp3",
    difficulty: "medium" as const,
  },
  {
    id: 11,
    title: "Niat",
    arabicText: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
    transliteration: "Innama al-a'maalu bin niyyaat",
    translation: "Sesungguhnya setiap amalan tergantung pada niatnya.",
    narrator: "HR. Bukhari & Muslim",
    category: "Ibadah",
    audioFile: "/audio/hadith/إِنَّمَا الْأَعْمَال.mp3",
    difficulty: "easy" as const,
  },
  {
    id: 12,
    title: "Menjaga Lisan",
    arabicText: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
    transliteration: "Man kaana yu'minu billaahi wal yawmi al-aakhiri fal yaqul khairan aw liyashmut",
    translation: "Barang siapa beriman kepada Allah dan hari akhir, hendaklah ia berkata baik atau diam.",
    narrator: "HR. Bukhari & Muslim",
    category: "Akhlak",
    audioFile: "/audio/hadith/مَنْ كَانَ يُؤْمِنُ .mp3",
    difficulty: "medium" as const,
  },
  {
    id: 13,
    title: "Menuntut Ilmu",
    arabicText: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
    transliteration: "Thalabul 'ilmi fariidhatun 'alaa kulli muslim",
    translation: "Menuntut ilmu adalah kewajiban bagi setiap muslim.",
    narrator: "HR. Ibnu Majah",
    category: "Ilmu",
    audioFile: "/audio/hadith/طَلَبُ الْعِلْمِ فَر.mp3",
    difficulty: "easy" as const,
  },
  {
    id: 14,
    title: "Menjaga Kebersihan",
    arabicText: "النَّظَافَةُ مِنَ الْإِيمَانِ",
    transliteration: "An-nadhaafatu min al-iimaan",
    translation: "Kebersihan adalah bagian dari iman.",
    narrator: "Hadist Populer",
    category: "Ibadah",
    audioFile: "/audio/hadith/النَّظَافَةُ مِنَ ال.mp3",
    difficulty: "easy" as const,
  },
  {
    id: 15,
    title: "Berbuat Baik",
    arabicText: "أَحَبُّ النَّاسِ إِلَى اللَّهِ أَنْفَعُهُمْ لِلنَّاسِ",
    transliteration: "Ahabbu an-naasi ilallahi anfa'uhum lin-naas",
    translation: "Manusia yang paling dicintai Allah adalah yang paling bermanfaat bagi manusia lainnya.",
    narrator: "HR. Thabrani",
    category: "Akhlak",
    audioFile: "/audio/hadith/أَحَبُّ النَّاسِ إِل.mp3",
    difficulty: "medium" as const,
  },
  {
    id: 16,
    title: "Sabar",
    arabicText: "الصَّبْرُ ضِيَاءٌ",
    transliteration: "Ash-shabru dhiyaa'",
    translation: "Kesabaran adalah cahaya.",
    narrator: "HR. Muslim",
    category: "Akhlak",
    audioFile: "/audio/hadith/الصَّبْرُ ضِيَاءٌ.mp3",
    difficulty: "easy" as const,
  },
  {
    id: 17,
    title: "Ridho Allah pada Orang Tua",
    arabicText: "رِضَا الرَّبِّ فِي رِضَا الْوَالِدِ",
    transliteration: "Ridha ar-rabbi fii ridha al-waalid",
    translation: "Keridhaan Allah terletak pada keridhaan orang tua.",
    narrator: "HR. Tirmidzi",
    category: "Keluarga",
    audioFile: "/audio/hadith/رِضَا الرَّبِّ فِي ر.mp3",
    difficulty: "easy" as const,
  },
  {
    id: 18,
    title: "Menjaga Tetangga",
    arabicText: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيُكْرِمْ جَارَهُ",
    transliteration: "Man kaana yu'minu billaahi wal yawmi al-aakhiri fal yukrim jaarahu",
    translation: "Barang siapa beriman kepada Allah dan hari akhir, hendaklah ia memuliakan tetangganya.",
    narrator: "HR. Bukhari & Muslim",
    category: "Akhlak",
    audioFile: "/audio/hadith/مَنْ كَانَ يُؤْمِنُ.mp3",
    difficulty: "medium" as const,
  },
  {
    id: 19,
    title: "Bersikap Lemah Lembut",
    arabicText: "إِنَّ الرِّفْقَ لَا يَكُونُ فِي شَيْءٍ إِلَّا زَانَهُ",
    transliteration: "Inna ar-rifqa laa yakuunu fii syai'in illaa zaanahu",
    translation: "Sesungguhnya sikap lemah lembut tidak ada pada sesuatu melainkan menghiasinya.",
    narrator: "HR. Muslim",
    category: "Akhlak",
    audioFile: "/audio/hadith/إِنَّ الرِّفْقَ لَا .mp3",
    difficulty: "medium" as const,
  },
  {
    id: 20,
    title: "Menolong Sesama",
    arabicText: "اللَّهُ فِي عَوْنِ الْعَبْدِ مَا كَانَ الْعَبْدُ فِي عَوْنِ أَخِيهِ",
    transliteration: "Allahu fii 'awni al-'abdi maa kaana al-'abdu fii 'awni akhiihi",
    translation: "Allah akan menolong seorang hamba selama hamba itu menolong saudaranya.",
    narrator: "HR. Muslim",
    category: "Akhlak",
    audioFile: "/audio/hadith/اللَّهُ فِي عَوْنِ ا.mp3",
    difficulty: "medium" as const,
  },
];

// ============================================
// TIPE CHALLENGE
// ============================================
export type ChallengeType = "SELECT" | "LISTENING" | "SELECT_ALL" | "MATCH";

// ============================================
// CONSTANTS - Konfigurasi Aplikasi AlifBaBa
// ============================================

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
  { id: 1, letter: "ا", name: "Alif", transliteration: "A", audioFile: "/audio/hijaiyah/alif.mp3" },
  { id: 2, letter: "ب", name: "Ba", transliteration: "B", audioFile: "/audio/hijaiyah/ba.mp3" },
  { id: 3, letter: "ت", name: "Ta", transliteration: "T", audioFile: "/audio/hijaiyah/ta.mp3" },
  { id: 4, letter: "ث", name: "Tsa", transliteration: "Ts", audioFile: "/audio/hijaiyah/tsa.mp3" },
  { id: 5, letter: "ج", name: "Jim", transliteration: "J", audioFile: "/audio/hijaiyah/jim.mp3" },
  { id: 6, letter: "ح", name: "Ha", transliteration: "H", audioFile: "/audio/hijaiyah/ha.mp3" },
  { id: 7, letter: "خ", name: "Kha", transliteration: "Kh", audioFile: "/audio/hijaiyah/kha.mp3" },
  { id: 8, letter: "د", name: "Dal", transliteration: "D", audioFile: "/audio/hijaiyah/dal.mp3" },
  { id: 9, letter: "ذ", name: "Dzal", transliteration: "Dz", audioFile: "/audio/hijaiyah/dzal.mp3" },
  { id: 10, letter: "ر", name: "Ra", transliteration: "R", audioFile: "/audio/hijaiyah/ra.mp3" },
  { id: 11, letter: "ز", name: "Zai", transliteration: "Z", audioFile: "/audio/hijaiyah/zai.mp3" },
  { id: 12, letter: "س", name: "Sin", transliteration: "S", audioFile: "/audio/hijaiyah/sin.mp3" },
  { id: 13, letter: "ش", name: "Syin", transliteration: "Sy", audioFile: "/audio/hijaiyah/syin.mp3" },
  { id: 14, letter: "ص", name: "Shad", transliteration: "Sh", audioFile: "/audio/hijaiyah/shad.mp3" },
  { id: 15, letter: "ض", name: "Dhad", transliteration: "Dh", audioFile: "/audio/hijaiyah/dhad.mp3" },
  { id: 16, letter: "ط", name: "Tha", transliteration: "Th", audioFile: "/audio/hijaiyah/tha.mp3" },
  { id: 17, letter: "ظ", name: "Zha", transliteration: "Zh", audioFile: "/audio/hijaiyah/zha.mp3" },
  { id: 18, letter: "ع", name: "Ain", transliteration: "'", audioFile: "/audio/hijaiyah/ain.mp3" },
  { id: 19, letter: "غ", name: "Ghain", transliteration: "Gh", audioFile: "/audio/hijaiyah/ghain.mp3" },
  { id: 20, letter: "ف", name: "Fa", transliteration: "F", audioFile: "/audio/hijaiyah/fa.mp3" },
  { id: 21, letter: "ق", name: "Qaf", transliteration: "Q", audioFile: "/audio/hijaiyah/qaf.mp3" },
  { id: 22, letter: "ك", name: "Kaf", transliteration: "K", audioFile: "/audio/hijaiyah/kaf.mp3" },
  { id: 23, letter: "ل", name: "Lam", transliteration: "L", audioFile: "/audio/hijaiyah/lam.mp3" },
  { id: 24, letter: "م", name: "Mim", transliteration: "M", audioFile: "/audio/hijaiyah/mim.mp3" },
  { id: 25, letter: "ن", name: "Nun", transliteration: "N", audioFile: "/audio/hijaiyah/nun.mp3" },
  { id: 26, letter: "و", name: "Wau", transliteration: "W", audioFile: "/audio/hijaiyah/wau.mp3" },
  { id: 27, letter: "ه", name: "Ha'", transliteration: "H", audioFile: "/audio/hijaiyah/ha2.mp3" },
  { id: 28, letter: "ي", name: "Ya", transliteration: "Y", audioFile: "/audio/hijaiyah/ya.mp3" },
];

// Harakat (tanda baca)
export const HARAKAT = [
  { id: "fathah", name: "Fathah", symbol: "َ", sound: "a", description: "Bunyi 'a'" },
  { id: "kasrah", name: "Kasrah", symbol: "ِ", sound: "i", description: "Bunyi 'i'" },
  { id: "dhammah", name: "Dhammah", symbol: "ُ", sound: "u", description: "Bunyi 'u'" },
  { id: "sukun", name: "Sukun", symbol: "ْ", sound: "", description: "Huruf mati" },
  { id: "tanwin_fathah", name: "Tanwin Fathah", symbol: "ً", sound: "an", description: "Bunyi 'an'" },
  { id: "tanwin_kasrah", name: "Tanwin Kasrah", symbol: "ٍ", sound: "in", description: "Bunyi 'in'" },
  { id: "tanwin_dhammah", name: "Tanwin Dhammah", symbol: "ٌ", sound: "un", description: "Bunyi 'un'" },
  { id: "tasydid", name: "Tasydid", symbol: "ّ", sound: "", description: "Huruf ganda" },
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
    youtubeId: "VIDEO_ID_1", // Ganti dengan YouTube Video ID
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
    quizQuestions: [],
  },
  {
    id: 6,
    title: "Kisah Nabi Isa AS",
    prophet: "Isa AS",
    youtubeId: "VIDEO_ID_6", // Ganti dengan YouTube Video ID
    description: "Kisah Nabi Isa AS yang lahir tanpa ayah dan bisa berbicara sejak bayi.",
    duration: "14:30",
    quizQuestions: [],
  },
  {
    id: 7,
    title: "Kisah Nabi Muhammad SAW",
    prophet: "Muhammad SAW",
    youtubeId: "VIDEO_ID_7", // Ganti dengan YouTube Video ID
    description: "Kisah Nabi Muhammad SAW, nabi terakhir dan penutup para nabi.",
    duration: "25:00",
    quizQuestions: [],
  },
];

// ============================================
// DATA HADIST - TAMBAHKAN HADIST BARU DI SINI
// ============================================
export const HADITH_LIST = [
  {
    id: 1,
    title: "Kasih Sayang",
    arabicText: "الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ",
    translation: "Orang-orang yang penyayang akan disayangi oleh Allah Yang Maha Penyayang.",
    narrator: "HR. Tirmidzi",
    category: "Akhlak",
    audioFile: "/audio/hadith/rahimun.mp3",
  },
  {
    id: 2,
    title: "Senyum adalah Sedekah",
    arabicText: "تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ صَدَقَةٌ",
    translation: "Senyummu di hadapan saudaramu adalah sedekah.",
    narrator: "HR. Tirmidzi",
    category: "Akhlak",
    audioFile: "/audio/hadith/tabassum.mp3",
  },
  {
    id: 3,
    title: "Kebersihan",
    arabicText: "الطَّهُورُ شَطْرُ الْإِيمَانِ",
    translation: "Kebersihan adalah sebagian dari iman.",
    narrator: "HR. Muslim",
    category: "Iman",
    audioFile: "/audio/hadith/thahur.mp3",
  },
  {
    id: 4,
    title: "Berbuat Baik kepada Orang Tua",
    arabicText: "رِضَا اللَّهِ فِي رِضَا الْوَالِدَيْنِ",
    translation: "Ridha Allah tergantung pada ridha orang tua.",
    narrator: "HR. Tirmidzi",
    category: "Keluarga",
    audioFile: "/audio/hadith/ridha.mp3",
  },
  {
    id: 5,
    title: "Malu",
    arabicText: "الْحَيَاءُ شُعْبَةٌ مِنَ الْإِيمَانِ",
    translation: "Malu adalah sebagian dari iman.",
    narrator: "HR. Bukhari & Muslim",
    category: "Iman",
    audioFile: "/audio/hadith/haya.mp3",
  },
  {
    id: 6,
    title: "Jujur",
    arabicText: "إِنَّ الصِّدْقَ يَهْدِي إِلَى الْبِرِّ",
    translation: "Sesungguhnya kejujuran membawa kepada kebaikan.",
    narrator: "HR. Bukhari & Muslim",
    category: "Akhlak",
    audioFile: "/audio/hadith/sidq.mp3",
  },
  {
    id: 7,
    title: "Tidak Marah",
    arabicText: "لَا تَغْضَبْ",
    translation: "Janganlah kamu marah.",
    narrator: "HR. Bukhari",
    category: "Akhlak",
    audioFile: "/audio/hadith/la-taghdab.mp3",
  },
  {
    id: 8,
    title: "Menyayangi yang di Bumi",
    arabicText: "ارْحَمُوا مَنْ فِي الْأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ",
    translation: "Sayangilah yang di bumi, niscaya yang di langit akan menyayangimu.",
    narrator: "HR. Tirmidzi",
    category: "Akhlak",
    audioFile: "/audio/hadith/irham.mp3",
  },
];

// ============================================
// TIPE CHALLENGE
// ============================================
export type ChallengeType = "SELECT" | "LISTENING" | "SELECT_ALL" | "MATCH";

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
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/u.mp3",
    quizQuestions: [
      { question: "Huruf apakah ini: ا ?", options: ["Alif", "Ba", "Ta", "Tsa"], correctAnswer: 0 },
      { question: "Bagaimana bunyi huruf Alif dengan harakat Fathah?", options: ["A", "I", "U", "E"], correctAnswer: 0 },
      { question: "Huruf Alif adalah huruf ke berapa dalam hijaiyah?", options: ["Pertama", "Kedua", "Ketiga", "Keempat"], correctAnswer: 0 },
      { question: "Apakah huruf Alif memiliki titik?", options: ["Ya, satu titik", "Ya, dua titik", "Ya, tiga titik", "Tidak ada titik"], correctAnswer: 3 },
      { question: "Jika huruf Alif diberi harakat Kasrah, bunyinya menjadi?", options: ["A", "I", "U", "E"], correctAnswer: 1 },
    ]
  },
  { 
    id: 2, letter: "ب", name: "Ba", transliteration: "B", 
    audioFile: "/audio/hijaiyah/ba.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_ba.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_bi.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/bu.mp3",
    quizQuestions: [
      { question: "Huruf apakah ini: ب ?", options: ["Alif", "Ba", "Ta", "Tsa"], correctAnswer: 1 },
      { question: "Bagaimana bunyi huruf Ba dengan harakat Kasrah?", options: ["Ba", "Bi", "Bu", "Be"], correctAnswer: 1 },
      { question: "Titik pada huruf Ba ada di mana?", options: ["Di atas", "Di bawah", "Di tengah", "Tidak ada titik"], correctAnswer: 1 },
      { question: "Berapa jumlah titik pada huruf Ba?", options: ["Tidak ada", "Satu", "Dua", "Tiga"], correctAnswer: 1 },
      { question: "Huruf Ba dengan harakat Dhammah berbunyi?", options: ["Ba", "Bi", "Bu", "Be"], correctAnswer: 2 },
    ]
  },
  { 
    id: 3, letter: "ت", name: "Ta", transliteration: "T", 
    audioFile: "/audio/hijaiyah/ta.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_ta.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_ti.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/tu.mp3",
    quizQuestions: [
      { question: "Huruf apakah ini: ت ?", options: ["Ba", "Ta", "Tsa", "Jim"], correctAnswer: 1 },
      { question: "Bagaimana bunyi huruf Ta dengan harakat Dhammah?", options: ["Ta", "Ti", "Tu", "Te"], correctAnswer: 2 },
      { question: "Berapa titik pada huruf Ta?", options: ["Satu", "Dua", "Tiga", "Tidak ada"], correctAnswer: 1 },
      { question: "Letak titik pada huruf Ta ada di?", options: ["Atas", "Bawah", "Tengah", "Samping"], correctAnswer: 0 },
      { question: "Apa perbedaan huruf Ta dan Ba?", options: ["Jumlah titik dan letaknya", "Bentuknya berbeda", "Tidak ada perbedaan", "Warnanya berbeda"], correctAnswer: 0 },
    ]
  },
  { 
    id: 4, letter: "ث", name: "Tsa", transliteration: "Ts", 
    audioFile: "/audio/hijaiyah/tsa.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_tsa.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_tsi.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/tsu.mp3",
    quizQuestions: [
      { question: "Huruf apakah ini: ث ?", options: ["Ta", "Tsa", "Jim", "Ha"], correctAnswer: 1 },
      { question: "Berapa titik pada huruf Tsa?", options: ["Satu", "Dua", "Tiga", "Tidak ada"], correctAnswer: 2 },
      { question: "Bagaimana bunyi huruf Tsa dengan harakat Fathah?", options: ["Tsa", "Tsi", "Tsu", "Tse"], correctAnswer: 0 },
      { question: "Huruf Tsa mirip dengan huruf apa?", options: ["Alif", "Ba dan Ta", "Jim", "Ha"], correctAnswer: 1 },
      { question: "Huruf Tsa dengan harakat Kasrah berbunyi?", options: ["Tsa", "Tsi", "Tsu", "Tse"], correctAnswer: 1 },
    ]
  },
  { 
    id: 5, letter: "ج", name: "Jim", transliteration: "J", 
    audioFile: "/audio/hijaiyah/jim.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_ja.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_ji.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/ju.mp3",
    quizQuestions: [
      { question: "Huruf apakah ini: ج ?", options: ["Ha", "Kha", "Jim", "Dal"], correctAnswer: 2 },
      { question: "Titik pada huruf Jim ada di mana?", options: ["Di atas", "Di bawah", "Di tengah", "Tidak ada titik"], correctAnswer: 2 },
      { question: "Bagaimana bunyi huruf Jim dengan harakat Kasrah?", options: ["Ja", "Ji", "Ju", "Je"], correctAnswer: 1 },
      { question: "Berapa jumlah titik pada huruf Jim?", options: ["Tidak ada", "Satu", "Dua", "Tiga"], correctAnswer: 1 },
      { question: "Huruf Jim dengan harakat Dhammah berbunyi?", options: ["Ja", "Ji", "Ju", "Je"], correctAnswer: 2 },
    ]
  },
  { 
    id: 6, letter: "ح", name: "Ha", transliteration: "H", 
    audioFile: "/audio/hijaiyah/ha.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_ha.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_hi.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/hu.mp3",
    quizQuestions: [
      { question: "Huruf apakah ini: ح ?", options: ["Jim", "Ha", "Kha", "Dal"], correctAnswer: 1 },
      { question: "Apakah huruf Ha memiliki titik?", options: ["Ya, satu titik", "Ya, dua titik", "Ya, tiga titik", "Tidak ada titik"], correctAnswer: 3 },
      { question: "Bagaimana bunyi huruf Ha dengan harakat Dhammah?", options: ["Ha", "Hi", "Hu", "He"], correctAnswer: 2 },
      { question: "Huruf Ha mirip dengan huruf apa?", options: ["Ba", "Ta", "Jim dan Kha", "Alif"], correctAnswer: 2 },
      { question: "Huruf Ha dengan harakat Fathah berbunyi?", options: ["Ha", "Hi", "Hu", "He"], correctAnswer: 0 },
    ]
  },
  { 
    id: 7, letter: "خ", name: "Kha", transliteration: "Kh", 
    audioFile: "/audio/hijaiyah/kho.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_kho.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_khi.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/khu.mp3",
    quizQuestions: [
      { question: "Huruf apakah ini: خ ?", options: ["Jim", "Ha", "Kha", "Dal"], correctAnswer: 2 },
      { question: "Titik pada huruf Kha ada di mana?", options: ["Di atas", "Di bawah", "Di tengah", "Tidak ada titik"], correctAnswer: 0 },
      { question: "Bagaimana bunyi huruf Kha dengan harakat Fathah?", options: ["Kha", "Khi", "Khu", "Khe"], correctAnswer: 0 },
      { question: "Apa perbedaan huruf Kha dengan Ha?", options: ["Kha punya titik di atas", "Kha lebih besar", "Tidak ada perbedaan", "Kha berwarna"], correctAnswer: 0 },
      { question: "Huruf Kha dengan harakat Kasrah berbunyi?", options: ["Kha", "Khi", "Khu", "Khe"], correctAnswer: 1 },
    ]
  },
  { 
    id: 8, letter: "د", name: "Dal", transliteration: "D", 
    audioFile: "/audio/hijaiyah/dal.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_da.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_di.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/du.mp3",
    quizQuestions: [
      { question: "Huruf apakah ini: د ?", options: ["Kha", "Dal", "Dzal", "Ra"], correctAnswer: 1 },
      { question: "Apakah huruf Dal memiliki titik?", options: ["Ya, satu titik", "Ya, dua titik", "Ya, tiga titik", "Tidak ada titik"], correctAnswer: 3 },
      { question: "Bagaimana bunyi huruf Dal dengan harakat Kasrah?", options: ["Da", "Di", "Du", "De"], correctAnswer: 1 },
      { question: "Huruf Dal termasuk huruf yang bisa disambung dari?", options: ["Kanan saja", "Kiri saja", "Kanan dan kiri", "Tidak bisa disambung"], correctAnswer: 0 },
      { question: "Huruf Dal dengan harakat Dhammah berbunyi?", options: ["Da", "Di", "Du", "De"], correctAnswer: 2 },
    ]
  },
  { 
    id: 9, letter: "ذ", name: "Dzal", transliteration: "Dz", 
    audioFile: "/audio/hijaiyah/dza.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_dza.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_dzi.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/dzu.mp3",
    quizQuestions: [
      { question: "Huruf apakah ini: ذ ?", options: ["Dal", "Dzal", "Ra", "Zai"], correctAnswer: 1 },
      { question: "Berapa titik pada huruf Dzal?", options: ["Tidak ada", "Satu", "Dua", "Tiga"], correctAnswer: 1 },
      { question: "Bagaimana bunyi huruf Dzal dengan harakat Dhammah?", options: ["Dza", "Dzi", "Dzu", "Dze"], correctAnswer: 2 },
      { question: "Apa perbedaan huruf Dzal dengan Dal?", options: ["Dzal punya titik di atas", "Dzal lebih kecil", "Tidak ada perbedaan", "Dzal berwarna biru"], correctAnswer: 0 },
      { question: "Huruf Dzal dengan harakat Fathah berbunyi?", options: ["Dza", "Dzi", "Dzu", "Dze"], correctAnswer: 0 },
    ]
  },
  { 
    id: 10, letter: "ر", name: "Ra", transliteration: "R", 
    audioFile: "/audio/hijaiyah/ro.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_ro.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_ri.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/ru.mp3",
    quizQuestions: [
      { question: "Huruf apakah ini: ر ?", options: ["Dzal", "Ra", "Zai", "Sin"], correctAnswer: 1 },
      { question: "Apakah huruf Ra memiliki titik?", options: ["Ya, satu", "Ya, dua", "Ya, tiga", "Tidak ada titik"], correctAnswer: 3 },
      { question: "Bagaimana bunyi huruf Ra dengan harakat Fathah?", options: ["Ra", "Ri", "Ru", "Re"], correctAnswer: 0 },
      { question: "Huruf Ra mirip dengan huruf apa?", options: ["Dal", "Zai", "Sin", "Alif"], correctAnswer: 1 },
      { question: "Huruf Ra dengan harakat Kasrah berbunyi?", options: ["Ra", "Ri", "Ru", "Re"], correctAnswer: 1 },
    ]
  },
  { 
    id: 11, letter: "ز", name: "Zai", transliteration: "Z", 
    audioFile: "/audio/hijaiyah/zay.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_za.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_zi.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/zu.mp3",
    quizQuestions: [
      { question: "Huruf apakah ini: ز ?", options: ["Ra", "Zai", "Sin", "Syin"], correctAnswer: 1 },
      { question: "Titik pada huruf Zai ada di mana?", options: ["Di atas", "Di bawah", "Di tengah", "Tidak ada titik"], correctAnswer: 0 },
      { question: "Bagaimana bunyi huruf Zai dengan harakat Kasrah?", options: ["Za", "Zi", "Zu", "Ze"], correctAnswer: 1 },
      { question: "Apa perbedaan huruf Zai dengan Ra?", options: ["Zai punya titik di atas", "Zai lebih panjang", "Tidak ada perbedaan", "Zai berwarna merah"], correctAnswer: 0 },
      { question: "Huruf Zai dengan harakat Dhammah berbunyi?", options: ["Za", "Zi", "Zu", "Ze"], correctAnswer: 2 },
    ]
  },
  { 
    id: 12, letter: "س", name: "Sin", transliteration: "S", 
    audioFile: "/audio/hijaiyah/sin.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_sa.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_si.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/su.mp3",
    quizQuestions: [
      { question: "Huruf apakah ini: س ?", options: ["Zai", "Sin", "Syin", "Shad"], correctAnswer: 1 },
      { question: "Apakah huruf Sin memiliki titik?", options: ["Ya, satu", "Ya, dua", "Ya, tiga", "Tidak ada titik"], correctAnswer: 3 },
      { question: "Bagaimana bunyi huruf Sin dengan harakat Dhammah?", options: ["Sa", "Si", "Su", "Se"], correctAnswer: 2 },
      { question: "Huruf Sin punya berapa gigi/gerigi?", options: ["Satu", "Dua", "Tiga", "Empat"], correctAnswer: 2 },
      { question: "Huruf Sin dengan harakat Fathah berbunyi?", options: ["Sa", "Si", "Su", "Se"], correctAnswer: 0 },
    ]
  },
  {
    id: 13, letter: "ش", name: "Syin", transliteration: "Sy", 
    audioFile: "/audio/hijaiyah/syin.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_sya.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_syi.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/syu.mp3",
    quizQuestions: [
      { question: "Huruf apakah ini: ش ?", options: ["Sin", "Syin", "Shad", "Dhad"], correctAnswer: 1 },
      { question: "Berapa titik pada huruf Syin?", options: ["Tidak ada", "Satu", "Dua", "Tiga"], correctAnswer: 3 },
      { question: "Bagaimana bunyi huruf Syin dengan harakat Fathah?", options: ["Sya", "Syi", "Syu", "Sye"], correctAnswer: 0 },
      { question: "Apa perbedaan huruf Syin dengan Sin?", options: ["Syin punya 3 titik di atas", "Syin lebih kecil", "Tidak ada perbedaan", "Syin tidak punya gerigi"], correctAnswer: 0 },
      { question: "Huruf Syin dengan harakat Dhammah berbunyi?", options: ["Sya", "Syi", "Syu", "Sye"], correctAnswer: 2 },
    ]
  },
  { 
    id: 14, letter: "ص", name: "Shad", transliteration: "Sh", 
    audioFile: "/audio/hijaiyah/shod.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_sho.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_shi.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/shu.mp3",
    quizQuestions: [
      { question: "Huruf apakah ini: ص ?", options: ["Syin", "Shad", "Dhad", "Tha"], correctAnswer: 1 },
      { question: "Apakah huruf Shad memiliki titik?", options: ["Ya, satu", "Ya, dua", "Ya, tiga", "Tidak ada titik"], correctAnswer: 3 },
      { question: "Bagaimana bunyi huruf Shad dengan harakat Kasrah?", options: ["Sha", "Shi", "Shu", "She"], correctAnswer: 1 },
      { question: "Huruf Shad mirip dengan huruf apa?", options: ["Sin", "Dhad", "Ra", "Ba"], correctAnswer: 1 },
      { question: "Huruf Shad dengan harakat Fathah berbunyi?", options: ["Sha", "Shi", "Shu", "She"], correctAnswer: 0 },
    ]
  },
  { 
    id: 15, letter: "ض", name: "Dhad", transliteration: "Dh", 
    audioFile: "/audio/hijaiyah/dhod.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_dho.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_dhi.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/dhu.mp3",
    quizQuestions: [
      { question: "Huruf apakah ini: ض ?", options: ["Shad", "Dhad", "Tha", "Zha"], correctAnswer: 1 },
      { question: "Titik pada huruf Dhad ada di mana?", options: ["Di atas", "Di bawah", "Di tengah", "Tidak ada titik"], correctAnswer: 0 },
      { question: "Bagaimana bunyi huruf Dhad dengan harakat Dhammah?", options: ["Dha", "Dhi", "Dhu", "Dhe"], correctAnswer: 2 },
      { question: "Apa perbedaan huruf Dhad dengan Shad?", options: ["Dhad punya titik di atas", "Dhad lebih besar", "Tidak ada perbedaan", "Dhad berwarna hijau"], correctAnswer: 0 },
      { question: "Bahasa Arab disebut juga bahasa Dhad karena?", options: ["Huruf Dhad hanya ada di bahasa Arab", "Dhad huruf pertama", "Dhad paling mudah", "Tidak ada alasan"], correctAnswer: 0 },
    ]
  },
  { 
    id: 16, letter: "ط", name: "Tha", transliteration: "Th", 
    audioFile: "/audio/hijaiyah/tho.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_tho.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_thi.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/thu.mp3",
    quizQuestions: [
      { question: "Huruf apakah ini: ط ?", options: ["Dhad", "Tha", "Zha", "Ain"], correctAnswer: 1 },
      { question: "Apakah huruf Tha memiliki titik?", options: ["Ya, satu", "Ya, dua", "Ya, tiga", "Tidak ada titik"], correctAnswer: 3 },
      { question: "Bagaimana bunyi huruf Tha dengan harakat Fathah?", options: ["Tha", "Thi", "Thu", "The"], correctAnswer: 0 },
      { question: "Huruf Tha mirip dengan huruf apa?", options: ["Ta", "Zha", "Alif", "Ba"], correctAnswer: 1 },
      { question: "Huruf Tha dengan harakat Kasrah berbunyi?", options: ["Tha", "Thi", "Thu", "The"], correctAnswer: 1 },
    ]
  },
  { 
    id: 17, letter: "ظ", name: "Zha", transliteration: "Zh", 
    audioFile: "/audio/hijaiyah/dhzo.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_dzo.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_dho.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/dzuu.mp3",
    quizQuestions: [
      { question: "Huruf apakah ini: ظ ?", options: ["Tha", "Zha", "Ain", "Ghain"], correctAnswer: 1 },
      { question: "Titik pada huruf Zha ada di mana?", options: ["Di atas", "Di bawah", "Di tengah", "Tidak ada titik"], correctAnswer: 0 },
      { question: "Bagaimana bunyi huruf Zha dengan harakat Kasrah?", options: ["Zha", "Zhi", "Zhu", "Zhe"], correctAnswer: 1 },
      { question: "Apa perbedaan huruf Zha dengan Tha?", options: ["Zha punya titik di atas", "Zha lebih kecil", "Tidak ada perbedaan", "Zha tidak bulat"], correctAnswer: 0 },
      { question: "Huruf Zha dengan harakat Dhammah berbunyi?", options: ["Zha", "Zhi", "Zhu", "Zhe"], correctAnswer: 2 },
    ]
  },
  { 
    id: 18, letter: "ع", name: "Ain", transliteration: "'", 
    audioFile: "/audio/hijaiyah/ain.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_aa.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_ii.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/uu.mp3",
    quizQuestions: [
      { question: "Huruf apakah ini: ع ?", options: ["Zha", "Ain", "Ghain", "Fa"], correctAnswer: 1 },
      { question: "Apakah huruf Ain memiliki titik?", options: ["Ya, satu", "Ya, dua", "Ya, tiga", "Tidak ada titik"], correctAnswer: 3 },
      { question: "Bagaimana bunyi huruf Ain dengan harakat Dhammah?", options: ["'A", "'I", "'U", "'E"], correctAnswer: 2 },
      { question: "Huruf Ain mirip dengan huruf apa?", options: ["Fa", "Ghain", "Alif", "Ba"], correctAnswer: 1 },
      { question: "Huruf Ain dengan harakat Fathah berbunyi?", options: ["'A", "'I", "'U", "'E"], correctAnswer: 0 },
    ]
  },
  { 
    id: 19, letter: "غ", name: "Ghain", transliteration: "Gh", 
    audioFile: "/audio/hijaiyah/ghoin.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_gho.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_ghi.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/ghu.mp3",
    quizQuestions: [
      { question: "Huruf apakah ini: غ ?", options: ["Ain", "Ghain", "Fa", "Qaf"], correctAnswer: 1 },
      { question: "Titik pada huruf Ghain ada di mana?", options: ["Di atas", "Di bawah", "Di tengah", "Tidak ada titik"], correctAnswer: 0 },
      { question: "Bagaimana bunyi huruf Ghain dengan harakat Fathah?", options: ["Gha", "Ghi", "Ghu", "Ghe"], correctAnswer: 0 },
      { question: "Apa perbedaan huruf Ghain dengan Ain?", options: ["Ghain punya titik di atas", "Ghain lebih kecil", "Tidak ada perbedaan", "Ghain berwarna biru"], correctAnswer: 0 },
      { question: "Huruf Ghain dengan harakat Kasrah berbunyi?", options: ["Gha", "Ghi", "Ghu", "Ghe"], correctAnswer: 1 },
    ]
  },
  { 
    id: 20, letter: "ف", name: "Fa", transliteration: "F", 
    audioFile: "/audio/hijaiyah/fa.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_fa.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_fi.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/fu.mp3",
    quizQuestions: [
      { question: "Huruf apakah ini: ف ?", options: ["Ghain", "Fa", "Qaf", "Kaf"], correctAnswer: 1 },
      { question: "Titik pada huruf Fa ada di mana?", options: ["Di atas", "Di bawah", "Di tengah", "Tidak ada titik"], correctAnswer: 0 },
      { question: "Bagaimana bunyi huruf Fa dengan harakat Kasrah?", options: ["Fa", "Fi", "Fu", "Fe"], correctAnswer: 1 },
      { question: "Berapa jumlah titik pada huruf Fa?", options: ["Tidak ada", "Satu", "Dua", "Tiga"], correctAnswer: 1 },
      { question: "Huruf Fa dengan harakat Dhammah berbunyi?", options: ["Fa", "Fi", "Fu", "Fe"], correctAnswer: 2 },
    ]
  },
  { 
    id: 21, letter: "ق", name: "Qaf", transliteration: "Q", 
    audioFile: "/audio/hijaiyah/qof.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_qo.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_qi.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/qu.mp3",
    quizQuestions: [
      { question: "Huruf apakah ini: ق ?", options: ["Fa", "Qaf", "Kaf", "Lam"], correctAnswer: 1 },
      { question: "Berapa titik pada huruf Qaf?", options: ["Tidak ada", "Satu", "Dua", "Tiga"], correctAnswer: 2 },
      { question: "Bagaimana bunyi huruf Qaf dengan harakat Dhammah?", options: ["Qa", "Qi", "Qu", "Qe"], correctAnswer: 2 },
      { question: "Titik pada huruf Qaf ada di mana?", options: ["Di atas", "Di bawah", "Di tengah", "Samping kanan"], correctAnswer: 0 },
      { question: "Huruf Qaf dengan harakat Fathah berbunyi?", options: ["Qa", "Qi", "Qu", "Qe"], correctAnswer: 0 },
    ]
  },
  { 
    id: 22, letter: "ك", name: "Kaf", transliteration: "K", 
    audioFile: "/audio/hijaiyah/kaf.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_ka.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_ki.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/ku.mp3",
    quizQuestions: [
      { question: "Huruf apakah ini: ك ?", options: ["Qaf", "Kaf", "Lam", "Mim"], correctAnswer: 1 },
      { question: "Apakah huruf Kaf memiliki titik?", options: ["Ya, satu", "Ya, dua", "Ya, tiga", "Tidak ada titik"], correctAnswer: 3 },
      { question: "Bagaimana bunyi huruf Kaf dengan harakat Fathah?", options: ["Ka", "Ki", "Ku", "Ke"], correctAnswer: 0 },
      { question: "Huruf Kaf punya tanda khusus seperti?", options: ["Hamzah kecil di dalamnya", "Titik di atas", "Titik di bawah", "Tidak ada tanda"], correctAnswer: 0 },
      { question: "Huruf Kaf dengan harakat Kasrah berbunyi?", options: ["Ka", "Ki", "Ku", "Ke"], correctAnswer: 1 },
    ]
  },
  { 
    id: 23, letter: "ل", name: "Lam", transliteration: "L", 
    audioFile: "/audio/hijaiyah/lam.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_la.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_li.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/lu.mp3",
    quizQuestions: [
      { question: "Huruf apakah ini: ل ?", options: ["Kaf", "Lam", "Mim", "Nun"], correctAnswer: 1 },
      { question: "Apakah huruf Lam memiliki titik?", options: ["Ya, satu", "Ya, dua", "Ya, tiga", "Tidak ada titik"], correctAnswer: 3 },
      { question: "Bagaimana bunyi huruf Lam dengan harakat Kasrah?", options: ["La", "Li", "Lu", "Le"], correctAnswer: 1 },
      { question: "Bentuk huruf Lam seperti huruf apa dalam bahasa Indonesia?", options: ["L", "J", "I", "T"], correctAnswer: 0 },
      { question: "Huruf Lam dengan harakat Dhammah berbunyi?", options: ["La", "Li", "Lu", "Le"], correctAnswer: 2 },
    ]
  },
  { 
    id: 24, letter: "م", name: "Mim", transliteration: "M", 
    audioFile: "/audio/hijaiyah/mim.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_ma.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_mi.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/mu.mp3",
    quizQuestions: [
      { question: "Huruf apakah ini: م ?", options: ["Lam", "Mim", "Nun", "Wau"], correctAnswer: 1 },
      { question: "Apakah huruf Mim memiliki titik?", options: ["Ya, satu", "Ya, dua", "Ya, tiga", "Tidak ada titik"], correctAnswer: 3 },
      { question: "Bagaimana bunyi huruf Mim dengan harakat Dhammah?", options: ["Ma", "Mi", "Mu", "Me"], correctAnswer: 2 },
      { question: "Bentuk huruf Mim seperti?", options: ["Lingkaran dengan ekor", "Segitiga", "Kotak", "Garis lurus"], correctAnswer: 0 },
      { question: "Huruf Mim dengan harakat Fathah berbunyi?", options: ["Ma", "Mi", "Mu", "Me"], correctAnswer: 0 },
    ]
  },
  { 
    id: 25, letter: "ن", name: "Nun", transliteration: "N", 
    audioFile: "/audio/hijaiyah/nun.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_na.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_ni.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/nu.mp3",
    quizQuestions: [
      { question: "Huruf apakah ini: ن ?", options: ["Mim", "Nun", "Wau", "Ha'"], correctAnswer: 1 },
      { question: "Titik pada huruf Nun ada di mana?", options: ["Di atas", "Di bawah", "Di tengah", "Tidak ada titik"], correctAnswer: 0 },
      { question: "Bagaimana bunyi huruf Nun dengan harakat Fathah?", options: ["Na", "Ni", "Nu", "Ne"], correctAnswer: 0 },
      { question: "Berapa jumlah titik pada huruf Nun?", options: ["Tidak ada", "Satu", "Dua", "Tiga"], correctAnswer: 1 },
      { question: "Huruf Nun dengan harakat Kasrah berbunyi?", options: ["Na", "Ni", "Nu", "Ne"], correctAnswer: 1 },
    ]
  },
  { 
    id: 26, letter: "و", name: "Wau", transliteration: "W", 
    audioFile: "/audio/hijaiyah/waw.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_wa.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_wi.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/wu.mp3",
    quizQuestions: [
      { question: "Huruf apakah ini: و ?", options: ["Nun", "Wau", "Ha'", "Hamzah"], correctAnswer: 1 },
      { question: "Apakah huruf Wau memiliki titik?", options: ["Ya, satu", "Ya, dua", "Ya, tiga", "Tidak ada titik"], correctAnswer: 3 },
      { question: "Bagaimana bunyi huruf Wau dengan harakat Kasrah?", options: ["Wa", "Wi", "Wu", "We"], correctAnswer: 1 },
      { question: "Huruf Wau bisa menjadi huruf panjang (mad) jika?", options: ["Diikuti sukun", "Sebelumnya ada dhammah", "Diberi tasydid", "Digabung dengan Alif"], correctAnswer: 1 },
      { question: "Huruf Wau dengan harakat Dhammah berbunyi?", options: ["Wa", "Wi", "Wu", "We"], correctAnswer: 2 },
    ]
  },
  { 
    id: 27, letter: "ه", name: "Ha'", transliteration: "H", 
    audioFile: "/audio/hijaiyah/Ha (besar).mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_haa.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_hii.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/huu.mp3",
    quizQuestions: [
      { question: "Huruf apakah ini: ه ?", options: ["Wau", "Ha'", "Hamzah", "Ya"], correctAnswer: 1 },
      { question: "Apakah huruf Ha' memiliki titik?", options: ["Ya, satu", "Ya, dua", "Ya, tiga", "Tidak ada titik"], correctAnswer: 3 },
      { question: "Bagaimana bunyi huruf Ha' dengan harakat Dhammah?", options: ["Ha", "Hi", "Hu", "He"], correctAnswer: 2 },
      { question: "Huruf Ha' berbeda dengan huruf Ha (ح) karena?", options: ["Ha' lebih kecil dan bulat", "Ha' punya titik", "Ha' lebih panjang", "Tidak ada perbedaan"], correctAnswer: 0 },
      { question: "Huruf Ha' dengan harakat Fathah berbunyi?", options: ["Ha", "Hi", "Hu", "He"], correctAnswer: 0 },
    ]
  },
  { 
    id: 28, letter: "ء", name: "Hamzah", transliteration: "'", 
    audioFile: "/audio/hijaiyah/hamzah.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_a.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_i.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/u.mp3",
    quizQuestions: [
      { question: "Huruf apakah ini: ء ?", options: ["Ha'", "Hamzah", "Ya", "Alif"], correctAnswer: 1 },
      { question: "Apakah huruf Hamzah memiliki titik?", options: ["Ya, satu", "Ya, dua", "Ya, tiga", "Tidak ada titik"], correctAnswer: 3 },
      { question: "Bagaimana bunyi huruf Hamzah dengan harakat Fathah?", options: ["A", "I", "U", "E"], correctAnswer: 0 },
      { question: "Hamzah bisa ditulis di atas atau di bawah huruf apa?", options: ["Alif, Wau, Ya", "Ba, Ta, Tsa", "Sin, Syin", "Kaf, Lam"], correctAnswer: 0 },
      { question: "Huruf Hamzah dengan harakat Kasrah berbunyi?", options: ["A", "I", "U", "E"], correctAnswer: 1 },
    ]
  },
  { 
    id: 29, letter: "ي", name: "Ya", transliteration: "Y", 
    audioFile: "/audio/hijaiyah/ya.mp3",
    audioFathah: "/audio/hijaiyah/Huruf Tanda Baca Fathah/fatah_ya.mp3",
    audioKasrah: "/audio/hijaiyah/Huruf Tanda Baca Kasrah/kasroh_yi.mp3",
    audioDhammah: "/audio/hijaiyah/Huruf Tanda Baca Domah/yu.mp3",
    quizQuestions: [
      { question: "Huruf apakah ini: ي ?", options: ["Hamzah", "Ya", "Alif", "Ba"], correctAnswer: 1 },
      { question: "Berapa titik pada huruf Ya?", options: ["Tidak ada", "Satu", "Dua", "Tiga"], correctAnswer: 2 },
      { question: "Bagaimana bunyi huruf Ya dengan harakat Kasrah?", options: ["Ya", "Yi", "Yu", "Ye"], correctAnswer: 1 },
      { question: "Titik pada huruf Ya ada di mana?", options: ["Di atas", "Di bawah", "Di tengah", "Samping"], correctAnswer: 1 },
      { question: "Huruf Ya adalah huruf ke berapa dalam hijaiyah?", options: ["27", "28", "29", "30"], correctAnswer: 2 },
    ]
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
// ID harus berupa string yang match dengan database (story_id TEXT)
export const PROPHET_STORIES = [
  {
    id: "adam",
    title: "Kisah Nabi Adam AS",
    prophet: "Adam AS",
    youtubeId: "EMmPWZMQL68", // Ganti dengan YouTube Video ID
    description: "Nabi Adam AS adalah manusia pertama yang diciptakan Allah SWT dari tanah.",
    duration: "8:09",
    quizQuestions: [
      {
        question: "Siapakah yang diciptakan Allah sebagai manusia pertama di muka bumi?",
        options: [
          "Nabi Nuh A.S",
          "Nabi Adam A.S",
          "Nabi Musa A.S",
          "Nabi Isa A.S"
        ],
        correctAnswer: 1, // B
      },
      {
        question: "Tujuan utama Allah menciptakan Nabi Adam A.S adalah…",
        options: [
          "Untuk mengisi surga selamanya",
          "Menjadi khalifah di bumi",
          "Menjadi malaikat",
          "Untuk mengalahkan iblis",
        ],
        correctAnswer: 1, // B
      },
      {
        question: "Dari apakah Nabi Adam A.S diciptakan menurut kisah dalam video?",
        options: [
          "Dari api",
          "Dari air",
          "Dari tanah",
          "Dari angin"
        ],
        correctAnswer: 2, // C
      },
      {
        question: "Siapa yang menolak perintah Allah untuk bersujud kepada Nabi Adam A.S?",
        options: [
          "Malaikat Jibril",
          "Semua malaikat",
          "Iblis",
          "Hawa"
        ],
        correctAnswer: 2, // C
      },
      {
        question: "Allah memberikan Nabi Adam A.S dan istrinya larangan untuk…",
        options: [
          "Tidak berbicara",
          "Tidak makan buah tertentu",
          "Tidak tidur di siang hari",
          "Tidak pergi ke bumi"
        ],
        correctAnswer: 1, // B
      },
      {
        question: "Siapakah yang berhasil menggoda Nabi Adam A.S dan Hawa sehingga mereka melanggar larangan Allah?",
        options: [
          "Malaikat",
          "Iblis",
          "Para malaikat",
          "Binatang di surga"
        ],
        correctAnswer: 1, // B
      },
      {
        question: "Akibat melanggar larangan Allah tersebut, Adam dan Hawa akhirnya…",
        options: [
          "Tinggal selamanya di surga",
          "Diturunkan ke bumi",
          "Menjadi malaikat",
          "Kembali ke surga segera"
        ],
        correctAnswer: 1, // B
      },
      {
        question: "Pelajaran utama dari kisah Nabi Adam A.S adalah…",
        options: [
          "Larangan harus ditaati dan kita wajib taat kepada Allah",
          "Kita boleh melanggar larangan jika baik bagi kita",
          "Manusia tidak perlu berhati-hati terhadap godaan",
          "Iblis lebih kuat dari manusia"
        ],
        correctAnswer: 0, // A
      },
      {
        question: "Nabi Adam A.S belajar hidup di bumi setelah diturunkan bersama Hawa untuk…",
        options: [
          "Menjadi raja di bumi",
          "Beribadah kepada Allah dan memulai kehidupan keluarga",
          "Mencari harta kekayaan",
          "Kembali ke surga setelah tiga hari"
        ],
        correctAnswer: 1, // B
      },
      {
        question: "Bagaimana Nabi Adam A.S menanggapi kesalahannya setelah tergoda dan melanggar perintah Allah?",
        options: [
          "Dia menyalahkan Allah",
          "Menyesal dan memohon ampun kepada Allah",
          "Dia menyalahkan Hawa sepenuhnya",
          "Tidak merasa bersalah"
        ],
        correctAnswer: 1, // B
      },
    ],
  },
  {
    id: "nuh",
    title: "Kisah Nabi Nuh AS",
    prophet: "Nuh AS",
    youtubeId: "aw8zlG3KYDc", // Ganti dengan YouTube Video ID
    description: "Kisah Nabi Nuh AS dan bahtera besar yang menyelamatkan umatnya dari banjir.",
    duration: "7:40",
    quizQuestions: [
      {
        question: "Siapakah nabi yang diutus Allah untuk mengajak kaumnya beriman dalam kisah pada video tersebut?",
        options: [
          "Nabi Ibrahim A.S",
          "Nabi Nuh A.S",
          "Nabi Musa A.S",
          "Nabi Isa A.S"
        ],
        correctAnswer: 1,
      },
      {
        question: "Apa perintah Allah kepada Nabi Nuh A.S sebelum datangnya banjir besar?",
        options: [
          "Pergi ke gunung tertinggi",
          "Mengumpulkan seluruh harta",
          "Membuat kapal besar",
          "Meninggalkan kaumnya"
        ],
        correctAnswer: 2,
      },
      {
        question: "Bagaimana sikap sebagian besar kaum Nabi Nuh A.S terhadap dakwah beliau?",
        options: [
          "Menerima dengan senang hati",
          "Menolak dan mengejek",
          "Meminta waktu berpikir",
          "Beriman secara diam-diam"
        ],
        correctAnswer: 1,
      },
      {
        question: "Mengapa pembuatan kapal oleh Nabi Nuh A.S dianggap aneh oleh kaumnya?",
        options: [
          "Karena kapal dibuat dari emas",
          "Karena dibuat di tengah laut",
          "Karena ukurannya terlalu kecil",
          "Karena dibuat di tempat yang tidak biasa"
        ],
        correctAnswer: 3,
      },
      {
        question: "Siapa saja yang diperbolehkan naik ke dalam kapal Nabi Nuh A.S?",
        options: [
          "Semua penduduk kota",
          "Nabi Nuh A.S dan orang-orang beriman",
          "Hanya keluarga Nabi Nuh A.S",
          "Orang-orang kaya saja"
        ],
        correctAnswer: 1,
      },
      {
        question: "Selain manusia beriman, siapa lagi yang ikut diselamatkan di dalam kapal?",
        options: [
          "Binatang yang bisa berenang",
          "Binatang buas saja",
          "Pasangan binatang jantan dan betina",
          "Binatang ternak saja"
        ],
        correctAnswer: 2,
      },
      {
        question: "Apa yang terjadi setelah Allah menurunkan azab kepada kaum Nabi Nuh A.S?",
        options: [
          "Hujan turun sebentar lalu berhenti",
          "Banjir besar menenggelamkan kaum yang durhaka",
          "Air hanya menggenangi desa",
          "Kapal tidak bisa berjalan"
        ],
        correctAnswer: 1,
      },
      {
        question: "Mengapa orang-orang yang tidak beriman tidak selamat dari banjir besar?",
        options: [
          "Karena mereka tidak naik ke kapal",
          "Karena mereka tinggal jauh dari Nabi Nuh",
          "Karena mereka lupa membawa makanan",
          "Karena mereka bersembunyi di rumah"
        ],
        correctAnswer: 0,
      },
      {
        question: "Di manakah kapal Nabi Nuh A.S berhenti setelah banjir surut?",
        options: [
          "Di tengah laut",
          "Di dekat perkampungan",
          "Di puncak sebuah bukit",
          "Di padang pasir"
        ],
        correctAnswer: 2,
      },
      {
        question: "Pelajaran utama yang dapat diambil dari kisah Nabi Nuh A.S adalah…",
        options: [
          "Kekuatan fisik menyelamatkan manusia",
          "Kesabaran dan ketaatan kepada Allah membawa keselamatan",
          "Harta dapat melindungi dari azab",
          "Tidak perlu mendengarkan nasihat"
        ],
        correctAnswer: 1,
      }
    ],
  },
  {
    id: "ibrahim",
    title: "Kisah Nabi Ibrahim AS",
    prophet: "Ibrahim AS",
    youtubeId: "iw8Yibemnh4", // Ganti dengan YouTube Video ID
    description: "Nabi Ibrahim AS yang dilempar ke dalam api namun selamat karena pertolongan Allah.",
    duration: "24:56",
    quizQuestions: [
      {
        question: "Siapakah nabi yang menjadi tokoh utama dalam video ini?",
        options: [
          "Nabi Ismail A.S",
          "Nabi Musa A.S",
          "Nabi Ibrahim A.S",
          "Nabi Nuh A.S"
        ],
        correctAnswer: 2,
      },
      {
        question: "Apa yang diperintahkan Allah kepada Nabi Ibrahim A.S untuk diuji?",
        options: [
          "Bangun sebuah istana",
          "Meninggalkan kampungnya",
          "Menyembelih putranya sendiri",
          "Berpuasa selama setahun"
        ],
        correctAnswer: 2,
      },
      {
        question: "Siapa nama putra Nabi Ibrahim A.S yang akan disembelih sebagai ujian?",
        options: [
          "Nabi Yusuf A.S",
          "Nabi Ismail A.S",
          "Nabi Isa A.S",
          "Nabi Dawud A.S"
        ],
        correctAnswer: 1,
      },
      {
        question: "Bagaimana Nabi Ismail A.S merespon ketika diperintahkan ikut ujian Allah?",
        options: [
          "Dia menolak dan lari",
          "Dia bingung dan takut",
          "Dia bersabar dan ridha mengikuti perintah Allah",
          "Dia membujuk Nabi Ibrahim A.S"
        ],
        correctAnswer: 2,
      },
      {
        question: "Apa makna utama dari ujian Allah kepada Nabi Ibrahim A.S?",
        options: [
          "Bahwa kekayaan adalah tujuan hidup",
          "Ketaatan kepada Allah lebih penting daripada segala hal",
          "Bahwa manusia tidak boleh punya keluarga",
          "Bahwa makanan adalah nikmat terbesar"
        ],
        correctAnswer: 1,
      },
      {
        question: "Siapa yang diganti Allah menjadi domba pada saat Nabi Ibrahim A.S hendak menyembelih putranya?",
        options: [
          "Nabi Yusuf A.S",
          "Seorang malaikat",
          "Seekor domba",
          "Seorang tetangga"
        ],
        correctAnswer: 2,
      },
      {
        question: "Apa sikap Nabi Ibrahim A.S saat Allah memerintahkan beliau menyerahkan putranya?",
        options: [
          "Marah dan menolak",
          "Bingung dan menunda",
          "Taat dan menjalankan perintah Allah",
          "Diam tanpa melakukan apa pun"
        ],
        correctAnswer: 2,
      },
      {
        question: "Pelajaran utama dari kisah Nabi Ibrahim dan Nabi Ismail A.S adalah…",
        options: [
          "Ketaatan kepada Allah membawa keselamatan dan pahala",
          "Manusia harus menghindari ujian hidup",
          "Yang kuat selalu menang",
          "Keluarga lebih penting daripada aturan"
        ],
        correctAnswer: 0,
      },
      {
        question: "Siapakah yang muncul sekaligus menjadi bagian penting dalam kisah ujian Nabi Ibrahim A.S?",
        options: [
          "Nabi Musa A.S",
          "Nabi Daud A.S",
          "Nabi Ismail A.S",
          "Nabi Yunus A.S"
        ],
        correctAnswer: 2,
      },
      {
        question: "Ujian yang diberikan Allah kepada Nabi Ibrahim A.S menunjukkan…",
        options: [
          "Bahwa Allah tidak menyukai Nabi Ibrahim",
          "Bahwa Allah ingin melihat ketaatan hamba-Nya",
          "Bahwa Nabi Ibrahim tidak taat",
          "Bahwa ketaatan tidak penting"
        ],
        correctAnswer: 1,
      }
    ],
  },
  {
    id: "musa",
    title: "Kisah Nabi Musa AS",
    prophet: "Musa AS",
    youtubeId: "tD0xkIaQt_Y", // Ganti dengan YouTube Video ID
    description: "Kisah Nabi Musa AS membelah lautan dengan tongkatnya.",
    duration: "1:19:33",
        quizQuestions: [
      {
        question: "Siapakah tokoh utama dalam video ini?",
        options: [
          "Nabi Nuh A.S",
          "Nabi Musa A.S",
          "Nabi Isa A.S",
          "Nabi Ibrahim A.S"
        ],
        correctAnswer: 1, // B
      },
      {
        question: "Apa yang Allah perintahkan kepada Nabi Musa A.S ketika beliau berada di bukit saat gembala?",
        options: [
          "Berpergi ke negeri lain",
          "Mengangkat tongkat dan melihat mukjizat",
          "Menjadi raja di Mesir",
          "Menjadi pedagang"
        ],
        correctAnswer: 1, // B
      },
      {
        question: "Mukjizat pertama yang diberikan Allah kepada Nabi Musa A.S adalah…",
        options: [
          "Mengubah tongkat menjadi ular",
          "Membelah laut tanpa tongkat",
          "Membuat hujan turun sepanjang tahun",
          "Memperoleh harta emas"
        ],
        correctAnswer: 0, // A
      },
      {
        question: "Siapa yang menjadi raja yang menentang Nabi Musa A.S?",
        options: [
          "Firaun",
          "Raja Babil",
          "Raja Saba",
          "Raja Yamani"
        ],
        correctAnswer: 0, // A
      },
      {
        question: "Apa yang terjadi ketika Nabi Musa A.S dan saudaranya menantang para tukang sihir Firaun?",
        options: [
          "Tukang sihir memenangkan pertarungan",
          "Tongkat Nabi Musa A.S berubah menjadi ular yang lebih besar",
          "Firaun langsung beriman",
          "Nabi Musa A.S mengalami kekalahan"
        ],
        correctAnswer: 1, // B
      },
      {
        question: "Mengapa Bani Israel dipindahkan dari Mesir?",
        options: [
          "Karena mereka ingin berlibur",
          "Karena Firaun membiarkan mereka pergi setelah melihat mukjizat",
          "Karena mereka ingin menjadi pedagang",
          "Karena mereka tidak suka makanan Mesir"
        ],
        correctAnswer: 1, // B
      },
      {
        question: "Apa mukjizat besar yang terjadi saat Nabi Musa A.S memimpin Bani Israel keluar dari Mesir?",
        options: [
          "Gunung berapi meletus menghentikan Firaun",
          "Laut terbelah menjadi dua jalur yang kering",
          "Bani Israel terbang ke udara",
          "Hujan emas turun dari langit"
        ],
        correctAnswer: 1, // B
      },
      {
        question: "Apa yang menimpa Firaun ketika mencoba mengejar Nabi Musa A.S dan Bani Israel?",
        options: [
          "Ia turun dari tahta dan bertobat",
          "Ia tenggelam di laut yang terbelah",
          "Ia mengalah dan menyerah kepada Nabi Musa A.S",
          "Ia naik ke surga"
        ],
        correctAnswer: 1, // B
      },
      {
        question: "Perilaku apa yang harus kita teladani dari Nabi Musa A.S ketika menghadapi tantangan?",
        options: [
          "Takut dan putus asa",
          "Taat kepada perintah Allah dan sabar",
          "Membalas dengan kekerasan",
          "Mengabaikan ajaran Allah"
        ],
        correctAnswer: 1, // B
      },
      {
        question: "Pelajaran utama dari kisah Nabi Musa A.S adalah…",
        options: [
          "Kekuatan manusia lebih penting dari mukjizat",
          "Hanya raja yang punya kuasa",
          "Ketaatan kepada Allah membawa keselamatan",
          "Menyerah saat menghadapi kesulitan"
        ],
        correctAnswer: 2, // C
      }
    ],
  },
  {
    id: "yusuf",
    title: "Kisah Nabi Yusuf AS",
    prophet: "Yusuf AS",
    youtubeId: "LroWr7fE7G4", // Ganti dengan YouTube Video ID
    description: "Kisah Nabi Yusuf AS yang sangat tampan dan penuh ujian dari saudara-saudaranya.",
    duration: "1:16:35",
    quizQuestions: [
      {
        question: "Siapakah ayah Nabi Yusuf AS yang sangat menyayanginya?",
        options: [
          "Nabi Ibrahim AS",
          "Nabi Yaqub AS",
          "Nabi Ishaq AS",
          "Nabi Musa AS"
        ],
        correctAnswer: 1,
      },
      {
        question: "Apa yang membuat saudara-saudara Nabi Yusuf AS merasa iri?",
        options: [
          "Yusuf selalu menang dalam permainan",
          "Yusuf mendapat perhatian lebih dari ayahnya",
          "Yusuf memiliki banyak uang",
          "Yusuf tidak pernah bekerja"
        ],
        correctAnswer: 1,
      },
      {
        question: "Apa yang saudara-saudara Nabi Yusuf AS lakukan kepadanya?",
        options: [
          "Membawanya pergi berkelana",
          "Memasukkan Yusuf ke dalam sumur",
          "Mengajak Yusuf berdagang",
          "Memberinya hadiah"
        ],
        correctAnswer: 1,
      },
      {
        question: "Siapakah yang menemukan Nabi Yusuf AS di sumur dan membawanya ke Mesir?",
        options: [
          "Para musafir atau pedagang",
          "Para malaikat",
          "Raja Mesir sendiri",
          "Saudara-saudaranya yang lain"
        ],
        correctAnswer: 0,
      },
      {
        question: "Nabi Yusuf AS akhirnya dijual di Mesir kepada…",
        options: [
          "Seorang pedagang miskin",
          "Seorang bangsawan Mesir bernama al-Aziz",
          "Raja Mesir secara langsung",
          "Seorang penjahit"
        ],
        correctAnswer: 1,
      },
      {
        question: "Istri majikan Yusuf AS mencoba menggoda beliau, tetapi Yusuf memilih…",
        options: [
          "Menolak godaan tersebut",
          "Turut serta dalam perbuatan itu",
          "Pergi keluar negeri",
          "Berbohong kepada majikannya"
        ],
        correctAnswer: 0,
      },
      {
        question: "Akibat fitnah tersebut, Yusuf AS kemudian…",
        options: [
          "Langsung dibebaskan",
          "Dipenjara",
          "Menjadi raja",
          "Pergi ke negeri lain"
        ],
        correctAnswer: 1,
      },
      {
        question: "Kemampuan khusus yang Allah berikan kepada Yusuf AS adalah…",
        options: [
          "Menjadi sangat kuat secara fisik",
          "Menafsirkan mimpi",
          "Membuat hujan turun",
          "Berbicara dengan binatang"
        ],
        correctAnswer: 1,
      },
      {
        question: "Nabi Yusuf AS diangkat menjadi bendahara Mesir karena…",
        options: [
          "Dia pandai menafsirkan mimpi raja",
          "Dia memenangkan pertarungan",
          "Saudara-saudaranya menjadi penasihat",
          "Dia mempunyai harta banyak"
        ],
        correctAnswer: 0,
      },
      {
        question: "Ketika saudara-saudaranya datang ke Mesir saat paceklik, Yusuf AS akhirnya…",
        options: [
          "Membalas mereka dengan marah",
          "Mengabaikan mereka",
          "Memberi makanan dan akhirnya memaafkan mereka",
          "Menangkap mereka sekali lagi"
        ],
        correctAnswer: 2,
      }
    ],
  },
  {
    id: "isa",
    title: "Kisah Nabi Isa AS",
    prophet: "Isa AS",
    youtubeId: "exl23iWP2v4", // Ganti dengan YouTube Video ID
    description: "Kisah Nabi Isa AS yang lahir tanpa ayah dan bisa berbicara sejak bayi.",
    duration: "31:48",
    quizQuestions: [
      {
        question: "Siapakah ibu dari Nabi Isa A.S?",
        options: ["Siti Khadijah", "Siti Hajar", "Siti Maryam", "Siti Aisyah"],
        correctAnswer: 2,
      },
      {
        question: "Nabi Isa A.S lahir dengan keadaan yang istimewa karena…",
        options: [
          "Dilahirkan di istana raja",
          "Dilahirkan tanpa ayah",
          "Dilahirkan di Mekkah",
          "Dilahirkan bersama saudara kembar"
        ],
        correctAnswer: 1,
      },
      {
        question: "Siapakah malaikat yang menyampaikan kabar kelahiran Nabi Isa A.S kepada Maryam?",
        options: ["Mikail", "Israfil", "Izrail", "Jibril"],
        correctAnswer: 3,
      },
      {
        question: "Mukjizat Nabi Isa A.S yang ditampilkan dalam video adalah…",
        options: [
          "Membelah laut",
          "Menghidupkan orang mati dengan izin Allah",
          "Menurunkan hujan",
          "Mengeluarkan api dari tangan"
        ],
        correctAnswer: 1,
      },
      {
        question: "Nabi Isa A.S dapat menyembuhkan orang sakit atas…",
        options: [
          "Ilmu kedokterannya",
          "Kekuatan fisiknya",
          "Izin Allah SWT",
          "Bantuan para malaikat"
        ],
        correctAnswer: 2,
      },
      {
        question: "Kitab suci yang diturunkan kepada Nabi Isa A.S adalah…",
        options: ["Al-Qur’an", "Taurat", "Zabur", "Injil"],
        correctAnswer: 3,
      },
      {
        question: "Sikap sebagian kaum terhadap Nabi Isa A.S dalam video adalah…",
        options: [
          "Langsung beriman semua",
          "Sebagian menerima, sebagian menolak",
          "Semua menolak tanpa alasan",
          "Tidak ada yang peduli"
        ],
        correctAnswer: 1,
      },
      {
        question: "Nabi Isa A.S mengajarkan manusia untuk…",
        options: [
          "Menyembah dirinya",
          "Menyembah Allah SWT",
          "Mengikuti raja",
          "Mengumpulkan harta"
        ],
        correctAnswer: 1,
      },
      {
        question: "Apa pelajaran utama dari kisah Nabi Isa A.S?",
        options: [
          "Kekuatan lebih penting dari iman",
          "Kesabaran dan ketaatan kepada Allah",
          "Harta membawa kebahagiaan",
          "Kecerdikan mengalahkan segalanya"
        ],
        correctAnswer: 1,
      },
      {
        question: "Nabi Isa A.S termasuk nabi yang memiliki…",
        options: [
          "Mukjizat atas izin Allah",
          "Pasukan besar",
          "Kerajaan luas",
          "Harta berlimpah"
        ],
        correctAnswer: 0,
      }
    ],
  },
  {
    id: "muhammad",
    title: "Kisah Nabi Muhammad SAW",
    prophet: "Muhammad SAW",
    youtubeId: "KLqzfsR30bA", // Ganti dengan YouTube Video ID
    description: "Kisah Nabi Muhammad SAW, nabi terakhir dan penutup para nabi.",
    duration: "1:14:16",
    quizQuestions: [
      {
        question: "Nabi Muhammad SAW lahir di kota…",
        options: ["Madinah", "Thaif", "Mekkah", "Yaman"],
        correctAnswer: 2,
      },
      {
        question: "Ayah Nabi Muhammad SAW bernama…",
        options: ["Abu Thalib", "Abdullah", "Abdul Muthalib", "Abu Lahab"],
        correctAnswer: 1,
      },
      {
        question: "Ibu Nabi Muhammad SAW bernama…",
        options: ["Aminah binti Wahab", "Halimah Sa’diyah", "Aisyah", "Fatimah"],
        correctAnswer: 0,
      },
      {
        question: "Nabi Muhammad SAW diasuh oleh Halimah Sa’diyah ketika…",
        options: [
          "Remaja",
          "Dewasa",
          "Masih bayi",
          "Sudah menikah"
        ],
        correctAnswer: 2,
      },
      {
        question: "Setelah ibunya wafat, Nabi Muhammad SAW diasuh oleh…",
        options: [
          "Pamannya Abu Thalib",
          "Kakeknya Abdul Muthalib",
          "Ibunya Halimah",
          "Saudaranya"
        ],
        correctAnswer: 1,
      },
      {
        question: "Sifat Nabi Muhammad SAW sebelum kenabian dikenal sebagai…",
        options: [
          "Pemarah",
          "Pendiam",
          "Al-Amin (terpercaya)",
          "Keras kepala"
        ],
        correctAnswer: 2,
      },
      {
        question: "Pekerjaan Nabi Muhammad SAW sebelum menjadi nabi adalah…",
        options: [
          "Petani",
          "Pedagang",
          "Nelayan",
          "Prajurit"
        ],
        correctAnswer: 1,
      },
      {
        question: "Masyarakat Mekkah mempercayai Nabi Muhammad SAW karena beliau…",
        options: [
          "Kaya raya",
          "Anak pemimpin",
          "Selalu jujur dan amanah",
          "Memiliki pasukan"
        ],
        correctAnswer: 2,
      },
      {
        question: "Nabi Muhammad SAW sering menyendiri dan bertafakur di…",
        options: [
          "Masjidil Haram",
          "Rumahnya",
          "Gua Hira",
          "Padang pasir"
        ],
        correctAnswer: 2,
      },
      {
        question: "Pelajaran dari masa sebelum kenabian Nabi Muhammad SAW adalah…",
        options: [
          "Kesuksesan datang dari kekuasaan",
          "Kejujuran membawa kepercayaan",
          "Kekayaan adalah tujuan utama",
          "Keberanian lebih penting dari iman"
        ],
        correctAnswer: 1,
      }
    ],
  },
];

// ============================================
// DATA HADIST - TAMBAHKAN HADIST BARU DI SINI
// ============================================
// Hadist-hadist pilihan yang cocok untuk anak-anak (pendek dan mudah dimengerti)
// Audio files sudah tersedia di public/audio/hadith/
// ID harus berupa string yang match dengan database (hadith_id TEXT)
export const HADITH_LIST: HadithData[] = [
  {
    id: "hadith-1",
    title: "Kasih Sayang",
    arabicText: "الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ",
    transliteration: "Ar-raahimuuna yarhamuhumu ar-rahmaan",
    translation: "Orang-orang yang penyayang akan disayangi oleh Allah Yang Maha Penyayang.",
    narrator: "HR. Tirmidzi",
    category: "Akhlak",
    audioFile: "/audio/hadith/الرَّاحِمُونَ يَرْحَ.mp3",
    difficulty: "easy" as const,
    quizQuestions: [
      {
        question: "Siapa yang akan disayangi oleh Allah menurut hadith ini?",
        options: ["Orang kaya", "Orang yang penyayang", "Orang yang pandai", "Orang yang kuat"],
        correctAnswer: 1,
      },
      {
        question: "Hadith ini diriwayatkan oleh?",
        options: ["HR. Bukhari", "HR. Muslim", "HR. Tirmidzi", "HR. Abu Dawud"],
        correctAnswer: 2,
      },
      {
        question: "Apa kategori hadith tentang kasih sayang ini?",
        options: ["Ibadah", "Akhlak", "Keluarga", "Ilmu"],
        correctAnswer: 1,
      },
      {
        question: "Bagaimana cara menerapkan hadith ini dalam kehidupan sehari-hari?",
        options: ["Menyayangi semua makhluk", "Hanya menyayangi keluarga", "Hanya menyayangi teman", "Tidak perlu menyayangi siapapun"],
        correctAnswer: 0,
      },
      {
        question: "Apa hikmah dari hadith ini?",
        options: ["Kasih sayang hanya untuk orang kaya", "Allah menyayangi yang berbuat kasih sayang", "Kasih sayang tidak penting", "Kasih sayang hanya untuk keluarga"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "hadith-2",
    title: "Senyum adalah Sedekah",
    arabicText: "تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ صَدَقَةٌ",
    transliteration: "Tabasumuka fii wajhi akiika shadaqah",
    translation: "Senyummu di hadapan saudaramu adalah sedekah.",
    narrator: "HR. Tirmidzi",
    category: "Akhlak",
    audioFile: "/audio/hadith/تَبَسُّمُكَ فِي وَجْ.mp3",
    difficulty: "easy" as const,
    quizQuestions: [
      {
        question: "Menurut hadith ini, senyum kepada saudara merupakan?",
        options: ["Kewajiban", "Sedekah", "Sunnah biasa", "Makruh"],
        correctAnswer: 1,
      },
      {
        question: "Apa kategori hadith ini?",
        options: ["Ibadah", "Akhlak", "Keluarga", "Ilmu"],
        correctAnswer: 1,
      },
      {
        question: "Siapa yang diriwayatkan hadith tentang senyum ini?",
        options: ["HR. Bukhari", "HR. Muslim", "HR. Tirmidzi", "HR. Abu Dawud"],
        correctAnswer: 2,
      },
      {
        question: "Apa arti kata 'shadaqah' dalam hadith ini?",
        options: ["Puasa", "Sedekah", "Sholat", "Zakat"],
        correctAnswer: 1,
      },
      {
        question: "Mengapa senyum dianggap sebagai sedekah?",
        options: ["Karena sulit dilakukan", "Karena membuat orang lain senang", "Karena mahal", "Karena jarang dilakukan"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "hadith-3",
    title: "Kebersihan",
    arabicText: "الطَّهُورُ شَطْرُ الْإِيمَانِ",
    transliteration: "Ath-thuhuuru syathru al-iimaan",
    translation: "Kebersihan adalah sebagian dari iman.",
    narrator: "HR. Muslim",
    category: "Ibadah",
    audioFile: "/audio/hadith/الطَّهُورُ شَطْرُ ال.mp3",
    difficulty: "easy" as const,
    quizQuestions: [
      {
        question: "Menurut hadith ini, kebersihan adalah sebagian dari?",
        options: ["Kesehatan", "Iman", "Kekayaan", "Ilmu"],
        correctAnswer: 1,
      },
      {
        question: "Hadith tentang kebersihan ini diriwayatkan oleh?",
        options: ["HR. Bukhari", "HR. Muslim", "HR. Tirmidzi", "HR. Ibnu Majah"],
        correctAnswer: 1,
      },
      {
        question: "Apa arti kata 'ath-thuhuuru' dalam hadith ini?",
        options: ["Kejujuran", "Kebersihan", "Kesabaran", "Keberanian"],
        correctAnswer: 1,
      },
      {
        question: "Kategori hadith tentang kebersihan adalah?",
        options: ["Akhlak", "Ibadah", "Keluarga", "Ilmu"],
        correctAnswer: 1,
      },
      {
        question: "Contoh penerapan hadith ini dalam kehidupan adalah?",
        options: ["Mandi dan menjaga kebersihan badan", "Tidak perlu mandi", "Hanya membersihkan pakaian", "Hanya membersihkan rumah"],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: "hadith-4",
    title: "Berbuat Baik kepada Orang Tua",
    arabicText: "رِضَا اللَّهِ فِي رِضَا الْوَالِدَيْنِ",
    transliteration: "Ridha allahi fii ridha al-waalidain",
    translation: "Ridha Allah tergantung pada ridha orang tua.",
    narrator: "HR. Tirmidzi",
    category: "Keluarga",
    audioFile: "/audio/hadith/رِضَا اللَّهِ فِي رِ.mp3",
    difficulty: "easy" as const,
    quizQuestions: [
      {
        question: "Ridha Allah tergantung pada ridha siapa?",
        options: ["Guru", "Orang tua", "Teman", "Tetangga"],
        correctAnswer: 1,
      },
      {
        question: "Kategori hadith ini adalah?",
        options: ["Akhlak", "Ibadah", "Keluarga", "Ilmu"],
        correctAnswer: 2,
      },
      {
        question: "Apa arti kata 'al-waalidain' dalam hadith ini?",
        options: ["Guru", "Orang tua", "Saudara", "Keluarga"],
        correctAnswer: 1,
      },
      {
        question: "Hadith ini diriwayatkan oleh?",
        options: ["HR. Bukhari", "HR. Muslim", "HR. Tirmidzi", "HR. Abu Dawud"],
        correctAnswer: 2,
      },
      {
        question: "Bagaimana cara membuat orang tua ridha menurut hadith ini?",
        options: ["Dengan berbakti dan taat kepada mereka", "Dengan memberikan uang saja", "Dengan tidak mendengarkan mereka", "Dengan pergi dari rumah"],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: "hadith-5",
    title: "Malu",
    arabicText: "الْحَيَاءُ شُعْبَةٌ مِنَ الْإِيمَانِ",
    transliteration: "Al-hayaa'u syu'batun min al-iimaan",
    translation: "Malu adalah sebagian dari iman.",
    narrator: "HR. Bukhari & Muslim",
    category: "Akhlak",
    audioFile: "/audio/hadith/الْحَيَاءُ شُعْبَةٌ .mp3",
    difficulty: "easy" as const,
    quizQuestions: [
      {
        question: "Menurut hadith ini, malu adalah sebagian dari?",
        options: ["Kelemahan", "Iman", "Ketakutan", "Kepribadian"],
        correctAnswer: 1,
      },
      {
        question: "Hadith ini diriwayatkan oleh?",
        options: ["HR. Tirmidzi", "HR. Bukhari & Muslim", "HR. Abu Dawud", "HR. Ibnu Majah"],
        correctAnswer: 1,
      },
      {
        question: "Apa arti kata 'al-hayaa'u' dalam hadith ini?",
        options: ["Kejujuran", "Malu", "Sabar", "Berani"],
        correctAnswer: 1,
      },
      {
        question: "Kategori hadith tentang malu adalah?",
        options: ["Ibadah", "Akhlak", "Keluarga", "Ilmu"],
        correctAnswer: 1,
      },
      {
        question: "Contoh sikap malu yang baik menurut Islam adalah?",
        options: ["Malu berbuat dosa", "Malu belajar", "Malu bertanya", "Malu beribadah"],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: "hadith-6",
    title: "Jujur",
    arabicText: "إِنَّ الصِّدْقَ يَهْدِي إِلَى الْبِرِّ",
    transliteration: "Inna ash-shidqa yahdii ila al-birr",
    translation: "Sesungguhnya kejujuran membawa kepada kebaikan.",
    narrator: "HR. Bukhari & Muslim",
    category: "Akhlak",
    audioFile: "/audio/hadith/إِنَّ الصِّدْقَ يَهْ.mp3",
    difficulty: "medium" as const,
    quizQuestions: [
      {
        question: "Menurut hadith ini, kejujuran membawa kepada?",
        options: ["Kekayaan", "Kebaikan", "Ketenaran", "Kesuksesan"],
        correctAnswer: 1,
      },
      {
        question: "Hadith tentang jujur ini termasuk kategori?",
        options: ["Ibadah", "Keluarga", "Akhlak", "Ilmu"],
        correctAnswer: 2,
      },
      {
        question: "Apa arti kata 'ash-shidq' dalam hadith ini?",
        options: ["Kebohongan", "Kejujuran", "Kesabaran", "Keberanian"],
        correctAnswer: 1,
      },
      {
        question: "Siapa yang meriwayatkan hadith tentang kejujuran ini?",
        options: ["HR. Tirmidzi", "HR. Bukhari & Muslim", "HR. Abu Dawud", "HR. Ibnu Majah"],
        correctAnswer: 1,
      },
      {
        question: "Apa lawan dari kejujuran menurut hadith?",
        options: ["Kebaikan", "Kebohongan", "Kejahatan", "Kesalahan"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "hadith-7",
    title: "Tidak Marah",
    arabicText: "لَا تَغْضَبْ",
    transliteration: "Laa taghdab",
    translation: "Janganlah kamu marah.",
    narrator: "HR. Bukhari",
    category: "Akhlak",
    audioFile: "/audio/hadith/لَا تَغْضَبْ.mp3",
    difficulty: "easy" as const,
    quizQuestions: [
      {
        question: "Apa arti dari 'Laa taghdab'?",
        options: ["Jangan berbohong", "Jangan marah", "Jangan makan", "Jangan tidur"],
        correctAnswer: 1,
      },
      {
        question: "Hadith pendek ini diriwayatkan oleh?",
        options: ["HR. Muslim", "HR. Tirmidzi", "HR. Bukhari", "HR. Ibnu Majah"],
        correctAnswer: 2,
      },
      {
        question: "Hadith ini termasuk kategori?",
        options: ["Ibadah", "Akhlak", "Keluarga", "Ilmu"],
        correctAnswer: 1,
      },
      {
        question: "Mengapa kita tidak boleh marah menurut hadith ini?",
        options: ["Karena marah merusak hati dan hubungan", "Karena marah adalah sunnah", "Karena marah itu baik", "Karena marah itu wajib"],
        correctAnswer: 0,
      },
      {
        question: "Apa yang harus dilakukan saat merasa marah?",
        options: ["Berteriak", "Memukul", "Menahan diri dan berwudhu", "Pergi dari rumah"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "hadith-8",
    title: "Menyayangi yang di Bumi",
    arabicText: "ارْحَمُوا مَنْ فِي الْأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ",
    transliteration: "Irhamuu man fii al-ardhi yarhamkum man fii as-samaa'",
    translation: "Sayangilah yang di bumi, niscaya yang di langit akan menyayangimu.",
    narrator: "HR. Tirmidzi",
    category: "Akhlak",
    audioFile: "/audio/hadith/ارْحَمُوا مَنْ فِي ا.mp3",
    difficulty: "medium" as const,
    quizQuestions: [
      {
        question: "Siapa yang akan menyayangi kita jika kita menyayangi makhluk di bumi?",
        options: ["Manusia", "Malaikat", "Yang di langit (Allah)", "Hewan"],
        correctAnswer: 2,
      },
      {
        question: "Hadith ini mengajarkan tentang?",
        options: ["Kejujuran", "Kasih sayang", "Kesabaran", "Keberanian"],
        correctAnswer: 1,
      },
      {
        question: "Siapa yang meriwayatkan hadith ini?",
        options: ["HR. Bukhari", "HR. Muslim", "HR. Tirmidzi", "HR. Abu Dawud"],
        correctAnswer: 2,
      },
      {
        question: "Apa arti 'man fii al-ardhi' dalam hadith ini?",
        options: ["Yang di langit", "Yang di bumi", "Yang di surga", "Yang di neraka"],
        correctAnswer: 1,
      },
      {
        question: "Siapa saja yang termasuk 'yang di bumi' yang harus kita sayangi?",
        options: ["Hanya manusia", "Hanya keluarga", "Semua makhluk (manusia, hewan, tumbuhan)", "Hanya teman"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "hadith-9",
    title: "Mencintai Saudara",
    arabicText: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    transliteration: "Laa yu'minu ahadukum hattaa yuhibba li akhiihi maa yuhibbu li nafsihi",
    translation: "Tidak sempurna iman seseorang sampai ia mencintai untuk saudaranya apa yang ia cintai untuk dirinya sendiri.",
    narrator: "HR. Bukhari & Muslim",
    category: "Akhlak",
    audioFile: "/audio/hadith/لَا يُؤْمِنُ أَحَدُك.mp3",
    difficulty: "medium" as const,
    quizQuestions: [
      {
        question: "Iman seseorang tidak sempurna sampai ia mencintai untuk saudaranya apa yang ia cintai untuk?",
        options: ["Orang tuanya", "Temannya", "Dirinya sendiri", "Gurunya"],
        correctAnswer: 2,
      },
      {
        question: "Hadith ini membahas tentang?",
        options: ["Ibadah sholat", "Mencintai saudara", "Puasa", "Zakat"],
        correctAnswer: 1,
      },
      {
        question: "Siapa perawi hadith ini?",
        options: ["HR. Tirmidzi", "HR. Bukhari & Muslim", "HR. Abu Dawud", "HR. Ibnu Majah"],
        correctAnswer: 1,
      },
      {
        question: "Apa kategori hadith tentang mencintai saudara ini?",
        options: ["Ibadah", "Akhlak", "Keluarga", "Ilmu"],
        correctAnswer: 1,
      },
      {
        question: "Contoh penerapan hadith ini adalah?",
        options: ["Ingin saudara kita susah", "Ingin saudara kita bahagia seperti kita", "Tidak peduli saudara", "Hanya memikirkan diri sendiri"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "hadith-10",
    title: "Bersyukur",
    arabicText: "مَنْ لَمْ يَشْكُرِ النَّاسَ لَمْ يَشْكُرِ اللَّهَ",
    transliteration: "Man lam yasykuri an-naasa lam yasykuri allaha",
    translation: "Barang siapa yang tidak bersyukur kepada manusia, maka ia tidak bersyukur kepada Allah.",
    narrator: "HR. Tirmidzi",
    category: "Akhlak",
    audioFile: "/audio/hadith/مَنْ لَمْ يَشْكُرِ ا.mp3",
    difficulty: "medium" as const,
    quizQuestions: [
      {
        question: "Menurut hadith ini, siapa yang tidak bersyukur kepada Allah?",
        options: ["Yang tidak sholat", "Yang tidak bersyukur kepada manusia", "Yang tidak puasa", "Yang tidak zakat"],
        correctAnswer: 1,
      },
      {
        question: "Hadith ini mengajarkan kita untuk?",
        options: ["Bersyukur kepada manusia dan Allah", "Bersyukur hanya kepada Allah", "Tidak perlu bersyukur", "Bersyukur hanya kepada manusia"],
        correctAnswer: 0,
      },
      {
        question: "Siapa perawi hadith tentang bersyukur ini?",
        options: ["HR. Bukhari", "HR. Muslim", "HR. Tirmidzi", "HR. Abu Dawud"],
        correctAnswer: 2,
      },
      {
        question: "Apa arti 'yasykuri' dalam hadith ini?",
        options: ["Marah", "Bersyukur", "Sabar", "Berani"],
        correctAnswer: 1,
      },
      {
        question: "Contoh bersyukur kepada manusia adalah?",
        options: ["Mengucapkan terima kasih saat diberi bantuan", "Tidak mengucapkan terima kasih", "Marah-marah", "Tidak peduli"],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: "hadith-11",
    title: "Niat",
    arabicText: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
    transliteration: "Innama al-a'maalu bin niyyaat",
    translation: "Sesungguhnya setiap amalan tergantung pada niatnya.",
    narrator: "HR. Bukhari & Muslim",
    category: "Ibadah",
    audioFile: "/audio/hadith/إِنَّمَا الْأَعْمَال.mp3",
    difficulty: "easy" as const,
    quizQuestions: [
      {
        question: "Menurut hadith ini, amalan tergantung pada?",
        options: ["Hasilnya", "Niatnya", "Waktunya", "Tempatnya"],
        correctAnswer: 1,
      },
      {
        question: "Apa kategori hadith tentang niat ini?",
        options: ["Akhlak", "Keluarga", "Ibadah", "Ilmu"],
        correctAnswer: 2,
      },
      {
        question: "Siapa yang meriwayatkan hadith tentang niat?",
        options: ["HR. Tirmidzi", "HR. Bukhari & Muslim", "HR. Abu Dawud", "HR. Ibnu Majah"],
        correctAnswer: 1,
      },
      {
        question: "Apa arti 'niyyaat' dalam hadith ini?",
        options: ["Amalan", "Niat", "Pahala", "Dosa"],
        correctAnswer: 1,
      },
      {
        question: "Mengapa niat itu penting dalam beribadah?",
        options: ["Karena niat menentukan nilai ibadah", "Karena niat tidak penting", "Karena niat hanya formalitas", "Karena niat tidak perlu ikhlas"],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: "hadith-12",
    title: "Menjaga Lisan",
    arabicText: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
    transliteration: "Man kaana yu'minu billaahi wal yawmi al-aakhiri fal yaqul khairan aw liyashmut",
    translation: "Barang siapa beriman kepada Allah dan hari akhir, hendaklah ia berkata baik atau diam.",
    narrator: "HR. Bukhari & Muslim",
    category: "Akhlak",
    audioFile: "/audio/hadith/مَنْ كَانَ يُؤْمِنُ .mp3",
    difficulty: "medium" as const,
    quizQuestions: [
      {
        question: "Menurut hadith ini, jika tidak bisa berkata baik maka sebaiknya?",
        options: ["Berbicara saja", "Diam", "Pergi", "Marah"],
        correctAnswer: 1,
      },
      {
        question: "Hadith ini mengajarkan tentang menjaga apa?",
        options: ["Mata", "Telinga", "Lisan", "Tangan"],
        correctAnswer: 2,
      },
      {
        question: "Siapa perawi hadith tentang menjaga lisan ini?",
        options: ["HR. Tirmidzi", "HR. Bukhari & Muslim", "HR. Abu Dawud", "HR. Ibnu Majah"],
        correctAnswer: 1,
      },
      {
        question: "Apa arti 'liyashmut' dalam hadith ini?",
        options: ["Hendaklah berbicara", "Hendaklah diam", "Hendaklah pergi", "Hendaklah marah"],
        correctAnswer: 1,
      },
      {
        question: "Mengapa kita harus berkata baik atau diam?",
        options: ["Agar tidak menyakiti orang lain", "Agar terlihat baik", "Agar dipuji", "Agar dapat hadiah"],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: "hadith-13",
    title: "Menuntut Ilmu",
    arabicText: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
    transliteration: "Thalabul 'ilmi fariidhatun 'alaa kulli muslim",
    translation: "Menuntut ilmu adalah kewajiban bagi setiap muslim.",
    narrator: "HR. Ibnu Majah",
    category: "Ilmu",
    audioFile: "/audio/hadith/طَلَبُ الْعِلْمِ فَر.mp3",
    difficulty: "easy" as const,
    quizQuestions: [
      {
        question: "Menurut hadith ini, menuntut ilmu adalah?",
        options: ["Sunnah", "Makruh", "Kewajiban", "Haram"],
        correctAnswer: 2,
      },
      {
        question: "Siapa yang wajib menuntut ilmu menurut hadith ini?",
        options: ["Hanya ulama", "Hanya laki-laki", "Setiap muslim", "Hanya orang kaya"],
        correctAnswer: 2,
      },
      {
        question: "Siapa perawi hadith tentang menuntut ilmu ini?",
        options: ["HR. Bukhari", "HR. Muslim", "HR. Tirmidzi", "HR. Ibnu Majah"],
        correctAnswer: 3,
      },
      {
        question: "Apa arti 'fariidhatun' dalam hadith ini?",
        options: ["Sunnah", "Kewajiban", "Larangan", "Pilihan"],
        correctAnswer: 1,
      },
      {
        question: "Kategori hadith tentang menuntut ilmu adalah?",
        options: ["Akhlak", "Ibadah", "Keluarga", "Ilmu"],
        correctAnswer: 3,
      },
    ],
  },
  {
    id: "hadith-14",
    title: "Menjaga Kebersihan",
    arabicText: "النَّظَافَةُ مِنَ الْإِيمَانِ",
    transliteration: "An-nadhaafatu min al-iimaan",
    translation: "Kebersihan adalah bagian dari iman.",
    narrator: "Hadist Populer",
    category: "Ibadah",
    audioFile: "/audio/hadith/النَّظَافَةُ مِنَ ال.mp3",
    difficulty: "easy" as const,
    quizQuestions: [
      {
        question: "Menurut hadith ini, kebersihan adalah bagian dari?",
        options: ["Kesehatan", "Iman", "Kekayaan", "Kecantikan"],
        correctAnswer: 1,
      },
      {
        question: "Apa arti 'An-nadhaafatu'?",
        options: ["Kejujuran", "Kebersihan", "Kesabaran", "Keberanian"],
        correctAnswer: 1,
      },
      {
        question: "Kategori hadith tentang kebersihan adalah?",
        options: ["Akhlak", "Ibadah", "Keluarga", "Ilmu"],
        correctAnswer: 1,
      },
      {
        question: "Mengapa kebersihan penting dalam Islam?",
        options: ["Karena bagian dari iman", "Karena agar terlihat baik", "Karena agar dipuji", "Karena tidak penting"],
        correctAnswer: 0,
      },
      {
        question: "Contoh menjaga kebersihan dalam Islam adalah?",
        options: ["Tidak pernah mandi", "Berwudhu sebelum sholat", "Tidak mencuci tangan", "Membiarkan sampah berserakan"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "hadith-15",
    title: "Berbuat Baik",
    arabicText: "أَحَبُّ النَّاسِ إِلَى اللَّهِ أَنْفَعُهُمْ لِلنَّاسِ",
    transliteration: "Ahabbu an-naasi ilallahi anfa'uhum lin-naas",
    translation: "Manusia yang paling dicintai Allah adalah yang paling bermanfaat bagi manusia lainnya.",
    narrator: "HR. Thabrani",
    category: "Akhlak",
    audioFile: "/audio/hadith/أَحَبُّ النَّاسِ إِل.mp3",
    difficulty: "medium" as const,
    quizQuestions: [
      {
        question: "Menurut hadith ini, manusia yang paling dicintai Allah adalah?",
        options: ["Yang paling kaya", "Yang paling tampan", "Yang paling bermanfaat", "Yang paling kuat"],
        correctAnswer: 2,
      },
      {
        question: "Hadith ini diriwayatkan oleh?",
        options: ["HR. Bukhari", "HR. Muslim", "HR. Thabrani", "HR. Tirmidzi"],
        correctAnswer: 2,
      },
      {
        question: "Apa arti 'anfa'uhum' dalam hadith ini?",
        options: ["Paling kaya", "Paling bermanfaat", "Paling tinggi", "Paling pintar"],
        correctAnswer: 1,
      },
      {
        question: "Kategori hadith tentang berbuat baik adalah?",
        options: ["Ibadah", "Akhlak", "Keluarga", "Ilmu"],
        correctAnswer: 1,
      },
      {
        question: "Contoh menjadi orang yang bermanfaat adalah?",
        options: ["Membantu orang yang kesusahan", "Hanya memikirkan diri sendiri", "Menyakiti orang lain", "Tidak peduli orang lain"],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: "hadith-16",
    title: "Sabar",
    arabicText: "الصَّبْرُ ضِيَاءٌ",
    transliteration: "Ash-shabru dhiyaa'",
    translation: "Kesabaran adalah cahaya.",
    narrator: "HR. Muslim",
    category: "Akhlak",
    audioFile: "/audio/hadith/الصَّبْرُ ضِيَاءٌ.mp3",
    difficulty: "easy" as const,
    quizQuestions: [
      {
        question: "Menurut hadith ini, kesabaran adalah?",
        options: ["Kelemahan", "Cahaya", "Beban", "Kesulitan"],
        correctAnswer: 1,
      },
      {
        question: "Apa arti 'Ash-shabru'?",
        options: ["Kejujuran", "Kesabaran", "Keberanian", "Kebijaksanaan"],
        correctAnswer: 1,
      },
      {
        question: "Siapa perawi hadith tentang kesabaran ini?",
        options: ["HR. Bukhari", "HR. Muslim", "HR. Tirmidzi", "HR. Abu Dawud"],
        correctAnswer: 1,
      },
      {
        question: "Kategori hadith tentang sabar adalah?",
        options: ["Ibadah", "Akhlak", "Keluarga", "Ilmu"],
        correctAnswer: 1,
      },
      {
        question: "Mengapa kesabaran disebut sebagai cahaya?",
        options: ["Karena sabar menerangi hati dan menguatkan iman", "Karena sabar itu putih", "Karena sabar itu terang", "Karena tidak ada alasan"],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: "hadith-17",
    title: "Ridho Allah pada Orang Tua",
    arabicText: "رِضَا الرَّبِّ فِي رِضَا الْوَالِدِ",
    transliteration: "Ridha ar-rabbi fii ridha al-waalid",
    translation: "Keridhaan Allah terletak pada keridhaan orang tua.",
    narrator: "HR. Tirmidzi",
    category: "Keluarga",
    audioFile: "/audio/hadith/رِضَا الرَّبِّ فِي ر.mp3",
    difficulty: "easy" as const,
    quizQuestions: [
      {
        question: "Keridhaan Allah terletak pada keridhaan siapa?",
        options: ["Guru", "Orang tua", "Teman", "Tetangga"],
        correctAnswer: 1,
      },
      {
        question: "Kategori hadith ini adalah?",
        options: ["Akhlak", "Ibadah", "Keluarga", "Ilmu"],
        correctAnswer: 2,
      },
      {
        question: "Siapa perawi hadith tentang ridho orang tua ini?",
        options: ["HR. Bukhari", "HR. Muslim", "HR. Tirmidzi", "HR. Abu Dawud"],
        correctAnswer: 2,
      },
      {
        question: "Apa arti 'ridha' dalam hadith ini?",
        options: ["Marah", "Keridhaan/kerelaan", "Sedih", "Takut"],
        correctAnswer: 1,
      },
      {
        question: "Bagaimana cara mendapat ridho Allah menurut hadith ini?",
        options: ["Dengan banyak harta", "Dengan mendapat ridho orang tua", "Dengan terkenal", "Dengan kuat"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "hadith-18",
    title: "Menjaga Tetangga",
    arabicText: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيُكْرِمْ جَارَهُ",
    transliteration: "Man kaana yu'minu billaahi wal yawmi al-aakhiri fal yukrim jaarahu",
    translation: "Barang siapa beriman kepada Allah dan hari akhir, hendaklah ia memuliakan tetangganya.",
    narrator: "HR. Bukhari & Muslim",
    category: "Akhlak",
    audioFile: "/audio/hadith/مَنْ كَانَ يُؤْمِنُ.mp3",
    difficulty: "medium" as const,
    quizQuestions: [
      {
        question: "Menurut hadith ini, orang beriman harus memuliakan siapa?",
        options: ["Diri sendiri", "Tetangga", "Hanya keluarga", "Hanya teman"],
        correctAnswer: 1,
      },
      {
        question: "Hadith ini mengajarkan tentang hubungan dengan?",
        options: ["Keluarga", "Tetangga", "Atasan", "Guru"],
        correctAnswer: 1,
      },
      {
        question: "Siapa perawi hadith tentang tetangga ini?",
        options: ["HR. Tirmidzi", "HR. Bukhari & Muslim", "HR. Abu Dawud", "HR. Ibnu Majah"],
        correctAnswer: 1,
      },
      {
        question: "Apa arti 'jaarahu' dalam hadith ini?",
        options: ["Keluarganya", "Tetangganya", "Temannya", "Gurunya"],
        correctAnswer: 1,
      },
      {
        question: "Contoh memuliakan tetangga adalah?",
        options: ["Mengganggu tetangga", "Membantu tetangga yang kesusahan", "Tidak peduli tetangga", "Bertengkar dengan tetangga"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "hadith-19",
    title: "Bersikap Lemah Lembut",
    arabicText: "إِنَّ الرِّفْقَ لَا يَكُونُ فِي شَيْءٍ إِلَّا زَانَهُ",
    transliteration: "Inna ar-rifqa laa yakuunu fii syai'in illaa zaanahu",
    translation: "Sesungguhnya sikap lemah lembut tidak ada pada sesuatu melainkan menghiasinya.",
    narrator: "HR. Muslim",
    category: "Akhlak",
    audioFile: "/audio/hadith/إِنَّ الرِّفْقَ لَا .mp3",
    difficulty: "medium" as const,
    quizQuestions: [
      {
        question: "Menurut hadith ini, sikap lemah lembut akan menghiasi?",
        options: ["Hanya ibadah", "Segala sesuatu", "Hanya pekerjaan", "Hanya perkataan"],
        correctAnswer: 1,
      },
      {
        question: "Apa arti 'ar-rifqu'?",
        options: ["Kekerasan", "Lemah lembut", "Ketegasan", "Kekuatan"],
        correctAnswer: 1,
      },
      {
        question: "Siapa perawi hadith tentang lemah lembut ini?",
        options: ["HR. Bukhari", "HR. Muslim", "HR. Tirmidzi", "HR. Abu Dawud"],
        correctAnswer: 1,
      },
      {
        question: "Kategori hadith tentang lemah lembut adalah?",
        options: ["Ibadah", "Akhlak", "Keluarga", "Ilmu"],
        correctAnswer: 1,
      },
      {
        question: "Contoh sikap lemah lembut adalah?",
        options: ["Berbicara kasar", "Berbicara dengan sopan dan lembut", "Memukul orang", "Marah-marah"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "hadith-20",
    title: "Menolong Sesama",
    arabicText: "اللَّهُ فِي عَوْنِ الْعَبْدِ مَا كَانَ الْعَبْدُ فِي عَوْنِ أَخِيهِ",
    transliteration: "Allahu fii 'awni al-'abdi maa kaana al-'abdu fii 'awni akhiihi",
    translation: "Allah akan menolong seorang hamba selama hamba itu menolong saudaranya.",
    narrator: "HR. Muslim",
    category: "Akhlak",
    audioFile: "/audio/hadith/اللَّهُ فِي عَوْنِ ا.mp3",
    difficulty: "medium" as const,
    quizQuestions: [
      {
        question: "Allah akan menolong hamba yang?",
        options: ["Banyak harta", "Menolong saudaranya", "Pandai berbicara", "Banyak ilmu"],
        correctAnswer: 1,
      },
      {
        question: "Hadith ini mengajarkan tentang?",
        options: ["Ibadah", "Menolong sesama", "Puasa", "Sholat"],
        correctAnswer: 1,
      },
      {
        question: "Siapa perawi hadith tentang menolong sesama ini?",
        options: ["HR. Bukhari", "HR. Muslim", "HR. Tirmidzi", "HR. Abu Dawud"],
        correctAnswer: 1,
      },
      {
        question: "Apa arti ''awni' dalam hadith ini?",
        options: ["Menyakiti", "Menolong", "Membenci", "Mengabaikan"],
        correctAnswer: 1,
      },
      {
        question: "Kategori hadith tentang menolong sesama adalah?",
        options: ["Ibadah", "Akhlak", "Keluarga", "Ilmu"],
        correctAnswer: 1,
      },
    ],
  },
];

// ============================================
// TIPE CHALLENGE
// ============================================
export type ChallengeType = "SELECT" | "LISTENING" | "SELECT_ALL" | "MATCH";

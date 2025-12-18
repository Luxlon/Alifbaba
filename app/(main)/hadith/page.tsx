import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

// Data hadist - ANDA BISA MENAMBAHKAN HADIST BARU DI SINI
// Format: { id, title, arabicText, translation, narrator, category }
const hadithList = [
  {
    id: 1,
    title: "Kasih Sayang",
    arabicText: "الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ",
    translation: "Orang-orang yang penyayang akan disayangi oleh Allah Yang Maha Penyayang.",
    narrator: "HR. Tirmidzi",
    category: "Akhlak",
    completed: true,
  },
  {
    id: 2,
    title: "Senyum adalah Sedekah",
    arabicText: "تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ صَدَقَةٌ",
    translation: "Senyummu di hadapan saudaramu adalah sedekah.",
    narrator: "HR. Tirmidzi",
    category: "Akhlak",
    completed: false,
  },
  {
    id: 3,
    title: "Kebersihan",
    arabicText: "الطَّهُورُ شَطْرُ الْإِيمَانِ",
    translation: "Kebersihan adalah sebagian dari iman.",
    narrator: "HR. Muslim",
    category: "Iman",
    completed: false,
  },
  {
    id: 4,
    title: "Berbuat Baik kepada Orang Tua",
    arabicText: "رِضَا اللَّهِ فِي رِضَا الْوَالِدَيْنِ",
    translation: "Ridha Allah tergantung pada ridha orang tua.",
    narrator: "HR. Tirmidzi",
    category: "Keluarga",
    completed: false,
  },
  {
    id: 5,
    title: "Malu",
    arabicText: "الْحَيَاءُ شُعْبَةٌ مِنَ الْإِيمَانِ",
    translation: "Malu adalah sebagian dari iman.",
    narrator: "HR. Bukhari & Muslim",
    category: "Iman",
    completed: false,
  },
  {
    id: 6,
    title: "Jujur",
    arabicText: "إِنَّ الصِّدْقَ يَهْدِي إِلَى الْبِرِّ",
    translation: "Sesungguhnya kejujuran membawa kepada kebaikan.",
    narrator: "HR. Bukhari & Muslim",
    category: "Akhlak",
    completed: false,
  },
  {
    id: 7,
    title: "Tidak Marah",
    arabicText: "لَا تَغْضَبْ",
    translation: "Janganlah kamu marah.",
    narrator: "HR. Bukhari",
    category: "Akhlak",
    completed: false,
  },
  {
    id: 8,
    title: "Menyayangi yang di Bumi",
    arabicText: "ارْحَمُوا مَنْ فِي الْأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ",
    translation: "Sayangilah yang di bumi, niscaya yang di langit akan menyayangimu.",
    narrator: "HR. Tirmidzi",
    category: "Akhlak",
    completed: false,
  },
];

const HadithPage = () => {
  const completedCount = hadithList.filter(h => h.completed).length;
  const progressPercent = Math.round((completedCount / hadithList.length) * 100);

  const categories = [...new Set(hadithList.map(h => h.category))];

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <div className="bg-purple-500 text-white p-4 rounded-xl">
          <h3 className="font-bold mb-2">Hadist Pilihan</h3>
          <p className="text-sm opacity-90">
            Hadist-hadist pendek yang mudah dipelajari untuk anak-anak.
          </p>
        </div>
        
        <div className="border-2 rounded-xl p-4 space-y-4">
          <h3 className="font-bold text-lg">Progress</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Hadist dipelajari</span>
              <span>{completedCount}/{hadithList.length}</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        </div>

        <div className="border-2 rounded-xl p-4">
          <h3 className="font-bold text-lg mb-3">Kategori</h3>
          <div className="space-y-2">
            {categories.map(cat => (
              <div key={cat} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                <span className="text-sm">{cat}</span>
              </div>
            ))}
          </div>
        </div>
      </StickyWrapper>
      
      <FeedWrapper>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-700 mb-2">
            Hadist untuk Anak 📿
          </h1>
          <p className="text-muted-foreground">
            Pelajari hadist-hadist pendek dengan teks Arab, terjemahan, dan audio.
          </p>
        </div>

        {/* Hadith List */}
        <div className="space-y-4">
          {hadithList.map((hadith, index) => {
            const isLocked = index > 0 && !hadithList[index - 1].completed;
            
            return (
              <Link 
                key={hadith.id}
                href={isLocked ? "#" : `/hadith/${hadith.id}`}
                className={isLocked ? "cursor-not-allowed" : ""}
              >
                <div 
                  className={`
                    border-2 rounded-xl p-5 transition mb-4
                    ${hadith.completed ? "border-purple-300 bg-purple-50" : "border-slate-200"}
                    ${isLocked ? "opacity-60" : "hover:shadow-md hover:border-purple-300"}
                  `}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs font-medium">
                        {hadith.category}
                      </span>
                      {hadith.completed && (
                        <span className="bg-emerald-100 text-emerald-600 px-2 py-1 rounded text-xs font-medium">
                          ✓ Selesai
                        </span>
                      )}
                      {isLocked && (
                        <span className="text-lg">🔒</span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{hadith.narrator}</span>
                  </div>

                  <h3 className="font-bold text-lg mb-3">{hadith.title}</h3>
                  
                  {/* Arabic Text */}
                  <div className="bg-slate-50 rounded-lg p-4 mb-3 text-center">
                    <p className="arabic-text text-2xl text-slate-800">
                      {hadith.arabicText}
                    </p>
                  </div>
                  
                  {/* Translation */}
                  <p className="text-sm text-muted-foreground italic">
                    "{hadith.translation}"
                  </p>

                  {!isLocked && (
                    <div className="mt-4 flex gap-2">
                      <Button variant="hadith" size="sm">
                        🔊 Dengarkan
                      </Button>
                      {!hadith.completed && (
                        <Button variant="hadithOutline" size="sm">
                          Mulai Belajar
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="mt-10 bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
          <h3 className="font-bold text-purple-700 mb-2">💡 Tips</h3>
          <p className="text-sm text-purple-600">
            Dengarkan pengucapan hadist dalam bahasa Arab, lalu uji pemahamanmu dengan quiz singkat.
            Hafal hadist untuk mendapatkan XP bonus!
          </p>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default HadithPage;

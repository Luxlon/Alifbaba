import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ShopPage = () => {
  // Mock shop items
  const shopItems = [
    {
      id: 1,
      name: "Isi Ulang Nyawa",
      description: "Dapatkan 5 nyawa penuh",
      price: 50,
      icon: "❤️",
      type: "hearts",
    },
    {
      id: 2,
      name: "Double XP (1 Jam)",
      description: "XP 2x lipat selama 1 jam",
      price: 100,
      icon: "⚡",
      type: "boost",
    },
    {
      id: 3,
      name: "Streak Freeze",
      description: "Lindungi streak kamu 1 hari",
      price: 75,
      icon: "🛡️",
      type: "protection",
    },
    {
      id: 4,
      name: "Avatar Khusus",
      description: "Avatar karakter lucu",
      price: 200,
      icon: "🎭",
      type: "cosmetic",
    },
  ];

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white p-4 rounded-xl">
          <h3 className="font-bold mb-2">Koin Kamu</h3>
          <div className="flex items-center gap-2">
            <span className="text-3xl">🪙</span>
            <span className="text-3xl font-bold">250</span>
          </div>
        </div>
      </StickyWrapper>
      
      <FeedWrapper>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-700 mb-2">
            Toko 🛒
          </h1>
          <p className="text-muted-foreground">
            Tukarkan koin dengan item menarik!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shopItems.map(item => (
            <div 
              key={item.id}
              className="border-2 rounded-xl p-6 hover:shadow-md transition"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="font-bold text-lg mb-1">{item.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {item.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span>🪙</span>
                  <span className="font-bold text-amber-600">{item.price}</span>
                </div>
                <Button variant="secondary" size="sm">
                  Beli
                </Button>
              </div>
            </div>
          ))}
        </div>
      </FeedWrapper>
    </div>
  );
};

export default ShopPage;

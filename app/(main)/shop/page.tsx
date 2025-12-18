"use client";

import { useState } from "react";
import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useUserProgress } from "@/store/use-user-progress";
import { MOCK_SHOP_ITEMS } from "@/lib/mock-data";
import { POINTS_TO_REFILL, MAX_HEARTS } from "@/constants";
import { formatPoints } from "@/lib/progress";
import { toast } from "sonner";
import { Heart, Zap, Shield, Sparkles, ShoppingCart, Check } from "lucide-react";

const ShopPage = () => {
  const { points, hearts, maxHearts, addHearts, spendPoints } = useUserProgress();
  const [purchasedItems, setPurchasedItems] = useState<string[]>([]);

  const handlePurchase = (item: typeof MOCK_SHOP_ITEMS[0]) => {
    // Check if user has enough points
    if (points < item.price) {
      toast.error("Poin tidak cukup!", {
        description: `Kamu membutuhkan ${item.price} poin, tapi hanya punya ${points} poin.`,
      });
      return;
    }

    // Special handling for hearts refill
    if (item.type === "HEARTS_REFILL") {
      if (hearts === maxHearts) {
        toast.error("Nyawa sudah penuh!", {
          description: "Kamu tidak perlu membeli isi ulang nyawa sekarang.",
        });
        return;
      }
    }

    // Check if cosmetic already purchased
    if (item.type === "COSMETIC" && purchasedItems.includes(item.id)) {
      toast.error("Sudah dibeli!", {
        description: "Kamu sudah memiliki item ini.",
      });
      return;
    }

    // Purchase the item
    const success = spendPoints(item.price);
    
    if (success) {
      // Apply item effect
      if (item.type === "HEARTS_REFILL" && item.value) {
        addHearts(item.value);
        toast.success("Berhasil! ❤️", {
          description: `Nyawa berhasil diisi ulang! +${item.value} nyawa`,
        });
      } else if (item.type === "DOUBLE_XP") {
        toast.success("Berhasil! ⚡", {
          description: `Boost XP 2x aktif selama ${item.duration} menit!`,
        });
      } else if (item.type === "FREEZE_STREAK") {
        toast.success("Berhasil! 🛡️", {
          description: "Streak kamu terlindungi selama 1 hari!",
        });
      } else if (item.type === "COSMETIC") {
        setPurchasedItems([...purchasedItems, item.id]);
        toast.success("Berhasil! 🎭", {
          description: `${item.name} berhasil dibeli!`,
        });
      }
    }
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case "HEARTS_REFILL":
        return <Heart className="h-8 w-8 text-red-500" />;
      case "DOUBLE_XP":
        return <Zap className="h-8 w-8 text-yellow-500" />;
      case "FREEZE_STREAK":
        return <Shield className="h-8 w-8 text-blue-500" />;
      case "COSMETIC":
        return <Sparkles className="h-8 w-8 text-purple-500" />;
      default:
        return <ShoppingCart className="h-8 w-8" />;
    }
  };

  const getItemBg = (type: string) => {
    switch (type) {
      case "HEARTS_REFILL":
        return "bg-red-50 border-red-200 hover:border-red-400";
      case "DOUBLE_XP":
        return "bg-yellow-50 border-yellow-200 hover:border-yellow-400";
      case "FREEZE_STREAK":
        return "bg-blue-50 border-blue-200 hover:border-blue-400";
      case "COSMETIC":
        return "bg-purple-50 border-purple-200 hover:border-purple-400";
      default:
        return "bg-gray-50";
    }
  };

  // Quick buy hearts
  const handleQuickRefill = () => {
    if (hearts === maxHearts) {
      toast.error("Nyawa sudah penuh!");
      return;
    }
    if (points < POINTS_TO_REFILL) {
      toast.error("Poin tidak cukup!", {
        description: `Butuh ${POINTS_TO_REFILL} poin untuk isi ulang.`,
      });
      return;
    }
    const success = spendPoints(POINTS_TO_REFILL);
    if (success) {
      addHearts(MAX_HEARTS - hearts);
      toast.success("Nyawa terisi penuh! ❤️");
    }
  };

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        {/* Points Display */}
        <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white p-5 rounded-xl">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <span className="text-2xl">🪙</span>
            Poin Kamu
          </h3>
          <span className="text-4xl font-bold">{formatPoints(points)}</span>
        </div>

        {/* Hearts Status */}
        <div className="border-2 rounded-xl p-4">
          <h3 className="font-bold mb-3">Status Nyawa</h3>
          <div className="flex items-center gap-2 mb-3">
            {Array.from({ length: maxHearts }).map((_, i) => (
              <Heart
                key={i}
                className={`h-6 w-6 ${
                  i < hearts ? "text-red-500 fill-red-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <Progress value={(hearts / maxHearts) * 100} className="h-2 mb-3" />
          {hearts < maxHearts && (
            <Button
              variant="danger"
              size="sm"
              className="w-full"
              onClick={handleQuickRefill}
            >
              Isi Ulang ({POINTS_TO_REFILL} 🪙)
            </Button>
          )}
        </div>

        {/* Info */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
          <h3 className="font-bold text-blue-700 mb-2">💡 Tips</h3>
          <p className="text-sm text-blue-600">
            Kumpulkan poin dengan menyelesaikan pelajaran dan quest harian!
          </p>
        </div>
      </StickyWrapper>
      
      <FeedWrapper>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-700 mb-2">
            Toko 🛒
          </h1>
          <p className="text-muted-foreground">
            Tukarkan poin dengan item menarik untuk membantu belajarmu!
          </p>
        </div>

        {/* Power-ups Section */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Power-ups
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_SHOP_ITEMS.filter(
              (item) => item.type !== "COSMETIC"
            ).map((item) => (
              <div
                key={item.id}
                className={`
                  border-2 rounded-xl p-6 transition-all cursor-pointer
                  ${getItemBg(item.type)}
                `}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm">
                    {getItemIcon(item.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-xl">🪙</span>
                        <span className="font-bold text-lg">{item.price}</span>
                      </div>
                      <Button
                        variant={points >= item.price ? "primary" : "default"}
                        size="sm"
                        onClick={() => handlePurchase(item)}
                        disabled={points < item.price}
                      >
                        {points < item.price ? "Poin Kurang" : "Beli"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cosmetics Section */}
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Kosmetik
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_SHOP_ITEMS.filter((item) => item.type === "COSMETIC").map(
              (item) => {
                const isPurchased = purchasedItems.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className={`
                      border-2 rounded-xl p-6 transition-all
                      ${isPurchased ? "bg-green-50 border-green-300" : getItemBg(item.type)}
                    `}
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-white p-3 rounded-xl shadow-sm">
                        {getItemIcon(item.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <span className="text-xl">🪙</span>
                            <span className="font-bold text-lg">{item.price}</span>
                          </div>
                          {isPurchased ? (
                            <div className="flex items-center gap-1 text-green-600 font-medium">
                              <Check className="h-4 w-4" />
                              Dimiliki
                            </div>
                          ) : (
                            <Button
                              variant={points >= item.price ? "super" : "default"}
                              size="sm"
                              onClick={() => handlePurchase(item)}
                              disabled={points < item.price}
                            >
                              {points < item.price ? "Poin Kurang" : "Beli"}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </section>
      </FeedWrapper>
    </div>
  );
};

export default ShopPage;

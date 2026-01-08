"use client";

import React, { useState } from "react";
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
  const { points, hearts, setHearts, spendPoints } = useUserProgress();
  const [purchasedItems, setPurchasedItems] = useState<string[]>([]);
  const [isPurchasing, setIsPurchasing] = useState(false);

  // Ensure values are valid numbers
  const safeHearts = typeof hearts === 'number' && !isNaN(hearts) ? hearts : 0;
  const safePoints = typeof points === 'number' && !isNaN(points) ? points : 0;

  const handlePurchase = async (item: typeof MOCK_SHOP_ITEMS[0]) => {
    if (isPurchasing) return;
    
    // Check if user has enough points
    if (safePoints < item.price) {
      toast.error("Poin tidak cukup!", {
        description: `Kamu membutuhkan ${item.price} poin, tapi hanya punya ${safePoints} poin.`,
      });
      return;
    }

    // Special handling for hearts refill
    if (item.type === "HEARTS_REFILL") {
      if (safeHearts >= MAX_HEARTS) {
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

    setIsPurchasing(true);
    
    try {
      // Purchase the item
      const success = await spendPoints(item.price);
      
      if (success) {
        // Apply item effect
        if (item.type === "HEARTS_REFILL") {
          // Always give full 5 hearts
          await setHearts(MAX_HEARTS);
          toast.success("Berhasil! ❤️", {
            description: `Nyawa penuh! Kamu sekarang punya ${MAX_HEARTS} nyawa`,
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
    } catch (error) {
      console.error("Purchase error:", error);
      toast.error("Terjadi kesalahan saat membeli");
    } finally {
      setIsPurchasing(false);
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
  const handleQuickRefill = async () => {
    if (safeHearts >= MAX_HEARTS) {
      toast.error("Nyawa sudah penuh!");
      return;
    }
    if (safePoints < POINTS_TO_REFILL) {
      toast.error("Poin tidak cukup!", {
        description: `Butuh ${POINTS_TO_REFILL} poin untuk isi ulang.`,
      });
      return;
    }
    const success = await spendPoints(POINTS_TO_REFILL);
    if (success) {
      await setHearts(MAX_HEARTS);
      toast.success("Nyawa terisi penuh! ❤️");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row-reverse gap-4 sm:gap-6 lg:gap-[48px] px-3 sm:px-4 lg:px-6">
      {/* Mobile Points & Hearts Bar */}
      <div className="lg:hidden">
        <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white p-3 sm:p-4 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl">🪙</span>
            <span className="text-2xl sm:text-3xl font-bold">{formatPoints(safePoints)}</span>
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: MAX_HEARTS }).map((_, i) => (
              <Heart
                key={i}
                className={`h-4 w-4 sm:h-5 sm:w-5 ${
                  i < safeHearts ? "text-white fill-white" : "text-white/40"
                }`}
              />
            ))}
            {safeHearts < MAX_HEARTS && (
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 h-7 text-xs text-white hover:bg-white/20"
                onClick={handleQuickRefill}
              >
                +
              </Button>
            )}
          </div>
        </div>
      </div>

      <StickyWrapper>
        {/* Points Display */}
        <div className="hidden lg:block bg-gradient-to-r from-amber-400 to-amber-500 text-white p-5 rounded-xl">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <span className="text-2xl">🪙</span>
            Poin Kamu
          </h3>
          <span className="text-4xl font-bold">{formatPoints(safePoints)}</span>
        </div>

        {/* Hearts Status */}
        <div className="hidden lg:block border-2 rounded-xl p-4">
          <h3 className="font-bold mb-3">Status Nyawa</h3>
          <div className="flex items-center gap-2 mb-3">
            {Array.from({ length: MAX_HEARTS }).map((_, i) => (
              <Heart
                key={i}
                className={`h-6 w-6 ${
                  i < safeHearts ? "text-red-500 fill-red-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <Progress value={(safeHearts / MAX_HEARTS) * 100} className="h-2 mb-3" />
          {safeHearts < MAX_HEARTS && (
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
        <div className="hidden lg:block bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
          <h3 className="font-bold text-blue-700 mb-2">💡 Tips</h3>
          <p className="text-sm text-blue-600">
            Kumpulkan poin dengan menyelesaikan pelajaran dan quest harian!
          </p>
        </div>
      </StickyWrapper>
      
      <FeedWrapper>
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-700 mb-1 sm:mb-2">
            Toko 🛒
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Tukarkan poin dengan item menarik untuk membantu belajarmu!
          </p>
        </div>

        {/* Power-ups Section */}
        <section className="mb-6 sm:mb-8 lg:mb-10">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
            <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
            Power-ups
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {MOCK_SHOP_ITEMS.filter(
              (item) => item.type !== "COSMETIC"
            ).map((item) => (
              <div
                key={item.id}
                className={`
                  border-2 rounded-lg sm:rounded-xl p-4 sm:p-6 transition-all cursor-pointer active:scale-[0.98]
                  ${getItemBg(item.type)}
                `}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-white p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-sm">
                    {React.cloneElement(getItemIcon(item.type) as React.ReactElement, {
                      className: "h-6 w-6 sm:h-8 sm:w-8"
                    })}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base sm:text-lg mb-1 truncate">{item.name}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-1">
                        <span className="text-lg sm:text-xl">🪙</span>
                        <span className="font-bold text-base sm:text-lg">{item.price}</span>
                      </div>
                      <Button
                        variant={safePoints >= item.price ? "primary" : "default"}
                        size="sm"
                        className="h-7 sm:h-8 text-xs sm:text-sm"
                        onClick={() => handlePurchase(item)}
                        disabled={safePoints < item.price}
                      >
                        {safePoints < item.price ? "Kurang" : "Beli"}
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
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
            Kosmetik
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {MOCK_SHOP_ITEMS.filter((item) => item.type === "COSMETIC").map(
              (item) => {
                const isPurchased = purchasedItems.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className={`
                      border-2 rounded-lg sm:rounded-xl p-4 sm:p-6 transition-all active:scale-[0.98]
                      ${isPurchased ? "bg-green-50 border-green-300" : getItemBg(item.type)}
                    `}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="bg-white p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-sm">
                        {React.cloneElement(getItemIcon(item.type) as React.ReactElement, {
                          className: "h-6 w-6 sm:h-8 sm:w-8"
                        })}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-base sm:text-lg mb-1 truncate">{item.name}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-1">
                            <span className="text-lg sm:text-xl">🪙</span>
                            <span className="font-bold text-base sm:text-lg">{item.price}</span>
                          </div>
                          {isPurchased ? (
                            <div className="flex items-center gap-1 text-green-600 font-medium text-xs sm:text-sm">
                              <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                              Dimiliki
                            </div>
                          ) : (
                            <Button
                              variant={points >= item.price ? "super" : "default"}
                              size="sm"
                              className="h-7 sm:h-8 text-xs sm:text-sm"
                              onClick={() => handlePurchase(item)}
                              disabled={points < item.price}
                            >
                              {points < item.price ? "Kurang" : "Beli"}
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

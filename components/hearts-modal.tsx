"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { useUserProgress } from "@/store/use-user-progress";
import { Heart, ShoppingBag, Home } from "lucide-react";
import { POINTS_TO_REFILL, MAX_HEARTS } from "@/constants";
import { toast } from "sonner";

export const HeartsModal = () => {
  const router = useRouter();
  const { isOpen, close } = useHeartsModal();
  const { hearts, points, setHearts, spendPoints } = useUserProgress();

  const safeHearts = typeof hearts === 'number' && !isNaN(hearts) ? hearts : 0;
  const safePoints = typeof points === 'number' && !isNaN(points) ? points : 0;

  const handleBuyHearts = async () => {
    if (safePoints < POINTS_TO_REFILL) {
      toast.error("Poin tidak cukup!", {
        description: `Butuh ${POINTS_TO_REFILL} poin untuk membeli 1 nyawa.`,
      });
      return;
    }

    const success = await spendPoints(POINTS_TO_REFILL);
    if (success) {
      // Beli 1 nyawa saja, bukan full refill
      const newHearts = Math.min(safeHearts + 1, MAX_HEARTS);
      await setHearts(newHearts);
      toast.success("Nyawa +1! ❤️");
      close();
    }
  };

  const handleGoToShop = () => {
    close();
    router.push("/shop");
  };

  const handleGoHome = () => {
    close();
    router.push("/learn");
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl flex items-center justify-center gap-2">
            <Heart className="h-6 w-6 text-red-500" />
            Nyawa Habis!
          </DialogTitle>
          <DialogDescription className="text-center">
            Kamu kehabisan nyawa. Beli nyawa untuk melanjutkan belajar atau istirahat sebentar.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          {/* Hearts Display */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {Array.from({ length: MAX_HEARTS }).map((_, i) => (
              <Heart
                key={i}
                className={`h-8 w-8 ${
                  i < safeHearts ? "text-red-500 fill-red-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Info */}
          <div className="bg-amber-50 rounded-xl p-4 mb-6 text-center">
            <p className="text-sm text-amber-800">
              💡 Nyawa akan bertambah 1 setiap 5 menit secara otomatis, atau kamu bisa membelinya dengan poin.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {/* Quick Buy */}
            <Button
              variant="danger"
              size="lg"
              className="w-full"
              onClick={handleBuyHearts}
              disabled={safePoints < POINTS_TO_REFILL}
            >
              <Heart className="h-5 w-5 mr-2 fill-white" />
              Beli 1 Nyawa ({POINTS_TO_REFILL} 🪙)
            </Button>

            {/* Go to Shop */}
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={handleGoToShop}
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Ke Toko
            </Button>

            {/* Go Home */}
            <Button
              variant="ghost"
              size="lg"
              className="w-full"
              onClick={handleGoHome}
            >
              <Home className="h-5 w-5 mr-2" />
              Kembali ke Beranda
            </Button>
          </div>

          {/* Points Display */}
          <div className="text-center mt-4 text-sm text-muted-foreground">
            Poin kamu: <span className="font-bold">{safePoints} 🪙</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

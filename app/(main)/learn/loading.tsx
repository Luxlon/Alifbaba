import { SkeletonCard } from "@/components/ui/loader";

export default function LearnLoading() {
  return (
    <div className="px-4 py-6 sm:px-6">
      {/* Header skeleton */}
      <div className="mb-6 sm:mb-8 animate-pulse">
        <div className="h-8 bg-neutral-200 rounded w-48 mb-2" />
        <div className="h-4 bg-neutral-200 rounded w-64" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}

import { SkeletonList } from "@/components/ui/loader";

export default function QuestsLoading() {
  return (
    <div className="px-4 py-6 sm:px-6">
      {/* Header skeleton */}
      <div className="mb-6 sm:mb-8 animate-pulse">
        <div className="h-8 bg-amber-200 rounded w-32 mb-2" />
        <div className="h-4 bg-neutral-200 rounded w-64" />
      </div>

      {/* Quest progress skeleton */}
      <div className="bg-amber-50 rounded-xl p-4 mb-6 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-amber-200 rounded-full" />
          <div className="flex-1">
            <div className="h-4 bg-amber-200 rounded w-24 mb-2" />
            <div className="h-3 bg-amber-100 rounded w-full" />
          </div>
        </div>
      </div>

      {/* Quest list skeleton */}
      <div className="border-2 rounded-xl p-4">
        <SkeletonList count={5} />
      </div>
    </div>
  );
}

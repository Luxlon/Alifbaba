export default function ShopLoading() {
  return (
    <div className="px-4 py-6 sm:px-6">
      {/* Header skeleton */}
      <div className="mb-6 sm:mb-8 animate-pulse">
        <div className="h-8 bg-amber-200 rounded w-24 mb-2" />
        <div className="h-4 bg-neutral-200 rounded w-56" />
      </div>

      {/* Balance card skeleton */}
      <div className="bg-gradient-to-r from-amber-100 to-amber-50 rounded-xl p-4 mb-6 animate-pulse">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-4 bg-amber-200 rounded w-20 mb-2" />
            <div className="h-8 bg-amber-300 rounded w-24" />
          </div>
          <div className="w-12 h-12 bg-amber-200 rounded-full" />
        </div>
      </div>

      {/* Shop items skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="border-2 rounded-xl p-4 animate-pulse"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-neutral-200 rounded-xl" />
              <div className="flex-1">
                <div className="h-5 bg-neutral-200 rounded w-24 mb-2" />
                <div className="h-4 bg-amber-200 rounded w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

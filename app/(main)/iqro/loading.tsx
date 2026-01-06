export default function IqroLoading() {
  return (
    <div className="px-4 py-6 sm:px-6">
      {/* Header skeleton */}
      <div className="mb-6 sm:mb-8 animate-pulse">
        <div className="h-8 bg-emerald-200 rounded w-24 mb-2" />
        <div className="h-4 bg-neutral-200 rounded w-72" />
      </div>

      {/* Progress card skeleton */}
      <div className="bg-emerald-50 rounded-xl p-4 mb-6 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-200 rounded-full" />
          <div className="flex-1">
            <div className="h-4 bg-emerald-200 rounded w-24 mb-2" />
            <div className="h-2 bg-emerald-100 rounded w-full" />
          </div>
        </div>
      </div>

      {/* Iqro levels grid skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="border-2 rounded-xl p-4 sm:p-6 animate-pulse"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 rounded-xl mx-auto mb-3" />
            <div className="h-5 bg-neutral-200 rounded w-20 mx-auto mb-2" />
            <div className="h-3 bg-neutral-200 rounded w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

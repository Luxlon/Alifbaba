export default function AccountLoading() {
  return (
    <div className="px-4 py-6 sm:px-6">
      {/* Profile header skeleton */}
      <div className="flex flex-col items-center mb-8 animate-pulse">
        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-neutral-200 rounded-full mb-4" />
        <div className="h-6 bg-neutral-200 rounded w-40 mb-2" />
        <div className="h-4 bg-neutral-200 rounded w-32" />
      </div>

      {/* Stats grid skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="border-2 rounded-xl p-4 text-center animate-pulse"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="w-8 h-8 bg-neutral-200 rounded-full mx-auto mb-2" />
            <div className="h-6 bg-neutral-200 rounded w-12 mx-auto mb-1" />
            <div className="h-3 bg-neutral-200 rounded w-16 mx-auto" />
          </div>
        ))}
      </div>

      {/* Settings section skeleton */}
      <div className="border-2 rounded-xl p-4 animate-pulse">
        <div className="h-5 bg-neutral-200 rounded w-24 mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <div className="h-4 bg-neutral-200 rounded w-32" />
              <div className="w-10 h-6 bg-neutral-200 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LeaderboardLoading() {
  return (
    <div className="px-4 py-6 sm:px-6">
      {/* Header skeleton */}
      <div className="mb-6 sm:mb-8 animate-pulse">
        <div className="h-8 bg-sky-200 rounded w-40 mb-2" />
        <div className="h-4 bg-neutral-200 rounded w-64" />
      </div>

      {/* Top 3 podium skeleton */}
      <div className="flex justify-center items-end gap-2 sm:gap-4 mb-8">
        <div className="flex flex-col items-center animate-pulse">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-neutral-200 rounded-full mb-2" />
          <div className="w-16 h-20 bg-neutral-200 rounded-t-xl" />
        </div>
        <div className="flex flex-col items-center animate-pulse">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-200 rounded-full mb-2" />
          <div className="w-20 h-28 bg-amber-100 rounded-t-xl" />
        </div>
        <div className="flex flex-col items-center animate-pulse">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-neutral-200 rounded-full mb-2" />
          <div className="w-16 h-16 bg-neutral-200 rounded-t-xl" />
        </div>
      </div>

      {/* Ranking list skeleton */}
      <div className="border-2 rounded-xl overflow-hidden">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 border-b last:border-b-0 animate-pulse"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="w-8 h-8 bg-neutral-200 rounded-full" />
            <div className="w-10 h-10 bg-neutral-200 rounded-full" />
            <div className="flex-1">
              <div className="h-4 bg-neutral-200 rounded w-32 mb-1" />
              <div className="h-3 bg-sky-100 rounded w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

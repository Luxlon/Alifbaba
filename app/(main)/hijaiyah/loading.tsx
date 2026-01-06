export default function HijaiyahLoading() {
  return (
    <div className="px-4 py-6 sm:px-6">
      {/* Header skeleton */}
      <div className="mb-6 sm:mb-8 animate-pulse">
        <div className="h-8 bg-neutral-200 rounded w-48 mb-2" />
        <div className="h-4 bg-neutral-200 rounded w-72" />
      </div>

      {/* Letter grid skeleton */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2 sm:gap-3">
        {Array.from({ length: 28 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-neutral-200 rounded-xl animate-pulse"
            style={{ animationDelay: `${i * 50}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

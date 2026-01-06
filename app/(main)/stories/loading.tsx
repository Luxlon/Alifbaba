export default function StoriesLoading() {
  return (
    <div className="px-4 py-6 sm:px-6">
      {/* Header skeleton */}
      <div className="mb-6 sm:mb-8 animate-pulse">
        <div className="h-8 bg-amber-200 rounded w-40 mb-2" />
        <div className="h-4 bg-neutral-200 rounded w-72" />
      </div>

      {/* Story cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="border-2 rounded-xl overflow-hidden animate-pulse"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="aspect-video bg-amber-100" />
            <div className="p-4">
              <div className="h-5 bg-neutral-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-neutral-200 rounded w-full mb-1" />
              <div className="h-3 bg-neutral-200 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

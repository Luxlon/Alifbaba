export default function HadithLoading() {
  return (
    <div className="px-4 py-6 sm:px-6">
      {/* Header skeleton */}
      <div className="mb-6 sm:mb-8 animate-pulse">
        <div className="h-8 bg-purple-200 rounded w-32 mb-2" />
        <div className="h-4 bg-neutral-200 rounded w-64" />
      </div>

      {/* Hadith cards skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="border-2 rounded-xl p-4 sm:p-6 animate-pulse"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-200 rounded-full flex-shrink-0" />
              <div className="flex-1">
                <div className="h-5 bg-neutral-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-purple-100 rounded w-full mb-2" />
                <div className="h-3 bg-neutral-200 rounded w-full mb-1" />
                <div className="h-3 bg-neutral-200 rounded w-2/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

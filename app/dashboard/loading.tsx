export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header skeleton */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-pulse">
            <div>
              <div className="h-8 bg-emerald-200 rounded w-48 mb-2" />
              <div className="h-4 bg-neutral-200 rounded w-64" />
            </div>
            <div className="flex gap-2">
              <div className="h-10 bg-neutral-200 rounded-lg w-32" />
              <div className="h-10 bg-neutral-200 rounded-lg w-32" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Stats cards skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-4 border animate-pulse"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-neutral-200 rounded-lg" />
                <div>
                  <div className="h-6 bg-neutral-200 rounded w-12 mb-1" />
                  <div className="h-3 bg-neutral-200 rounded w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search & filter skeleton */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6 animate-pulse">
          <div className="h-10 bg-neutral-200 rounded-lg flex-1" />
          <div className="h-10 bg-neutral-200 rounded-lg w-32" />
        </div>

        {/* Table skeleton */}
        <div className="bg-white rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-neutral-50">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <th key={i} className="p-3 text-left">
                      <div className="h-4 bg-neutral-200 rounded w-20 animate-pulse" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 8 }).map((_, row) => (
                  <tr
                    key={row}
                    className="border-b last:border-b-0"
                    style={{ animationDelay: `${row * 50}ms` }}
                  >
                    {Array.from({ length: 7 }).map((_, col) => (
                      <td key={col} className="p-3">
                        <div className="h-4 bg-neutral-200 rounded w-16 animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

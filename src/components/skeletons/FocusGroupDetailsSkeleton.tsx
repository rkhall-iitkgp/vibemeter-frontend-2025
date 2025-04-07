const FocusGroupDetailsSkeleton = () => {
  return (
    <div className="w-full h-screen overflow-auto">
      {/* Header Skeleton */}
      <header className="bg-gray-100 z-10 p-6 pt-10 pb-4">
        <div className="flex items-center text-sm gap-2">
          <div className="w-24 h-4 bg-gray-200 animate-pulse rounded" />
          <div className="w-4 h-4 bg-gray-200 animate-pulse rounded" />
          <div className="w-32 h-4 bg-gray-200 animate-pulse rounded" />
        </div>
      </header>

      <main className="p-6 pt-0">
        {/* Focus Group Details Card Skeleton */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="w-64 h-8 bg-gray-200 animate-pulse rounded mb-2" />
              <div className="w-48 h-4 bg-gray-200 animate-pulse rounded" />
            </div>
            <div className="w-40 h-4 bg-gray-200 animate-pulse rounded" />
          </div>

          {/* Description Section */}
          <div className="mt-6 border-t border-gray-200 pt-6 -mx-6 px-6">
            <div className="w-32 h-6 bg-gray-200 animate-pulse rounded mb-4" />
            <div className="space-y-2">
              <div className="w-full h-4 bg-gray-200 animate-pulse rounded" />
              <div className="w-full h-4 bg-gray-200 animate-pulse rounded" />
              <div className="w-3/4 h-4 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>

          {/* Target Metrics Section */}
          <div className="mt-6 border-t border-gray-200 pt-6 -mx-6 px-6">
            <div className="w-40 h-6 bg-gray-200 animate-pulse rounded mb-4" />
            <div className="flex gap-4">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="w-24 h-6 bg-gray-200 animate-pulse rounded-full"
                />
              ))}
            </div>
          </div>

          {/* Participants Count Section */}
          <div className="mt-6 border-t border-gray-200 pt-6 -mx-6 px-6">
            <div className="w-48 h-6 bg-gray-200 animate-pulse rounded mb-4" />
            <div className="w-16 h-6 bg-gray-200 animate-pulse rounded" />
          </div>
        </div>

        {/* Action Plans Section Skeleton */}
        <div className="mb-6 w-full">
          <div className="w-full h-[200px] bg-gray-200 animate-pulse rounded-lg" />
        </div>

        {/* Participants Section Skeleton */}
        <div className="mt-8">
          <div className="w-48 h-7 bg-gray-200 animate-pulse rounded mb-4" />

          {/* Search and Actions Bar */}
          <div className="mb-4 flex justify-between items-center">
            <div className="w-95">
              <div className="w-[300px] h-10 bg-gray-200 animate-pulse rounded" />
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 animate-pulse rounded" />
              <div className="w-32 h-10 bg-gray-200 animate-pulse rounded" />
              <div className="w-36 h-10 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>

          {/* Participants Table Skeleton */}
          <div className="mt-4 overflow-hidden border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-12 px-6 py-3" />
                  {[
                    "Employee Name",
                    "Employee ID",
                    "Job Title",
                    "Date Added",
                    "",
                  ].map((_, index) => (
                    <th key={index} className="px-6 py-3">
                      <div className="w-24 h-4 bg-gray-200 animate-pulse rounded" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[...Array(5)].map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="px-6 py-4">
                      <div className="w-4 h-4 bg-gray-200 animate-pulse rounded" />
                    </td>
                    {[...Array(5)].map((_, colIndex) => (
                      <td key={colIndex} className="px-6 py-4">
                        <div className="w-24 h-4 bg-gray-200 animate-pulse rounded" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FocusGroupDetailsSkeleton;

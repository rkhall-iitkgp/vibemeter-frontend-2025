import React from "react";

const EmployeesSkeleton: React.FC = () => {
  return (
    <div className="flex-1 overflow-auto animate-pulse">
      {/* Header Skeleton */}
      <header className="bg-gray-100 z-10 p-6 pt-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200"></div>
          <div className="h-10 w-48 bg-gray-200 rounded"></div>
        </div>
      </header>

      {/* Dashboard content skeleton */}
      <main className="p-6">
        {/* Search bar skeleton */}
        <div className="mb-4">
          <div className="w-full h-10 bg-gray-200 rounded-md"></div>
        </div>

        {/* Three employee tables skeletons */}
        {[...Array(3)].map((_, tableIndex) => (
          <div key={tableIndex} className="mb-6">
            {/* Table header skeleton */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <div className="h-6 w-40 bg-gray-200 rounded"></div>
            </div>
            
            {/* Table skeleton */}
            <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
              {/* Table header row */}
              <div className="flex border-b p-3">
                <div className="w-4/12 h-5 bg-gray-200 rounded mr-2"></div>
                <div className="w-3/12 h-5 bg-gray-200 rounded mr-2"></div>
                <div className="w-2/12 h-5 bg-gray-200 rounded mr-2"></div>
                <div className="w-2/12 h-5 bg-gray-200 rounded mr-2"></div>
                <div className="w-1/12 h-5 bg-gray-200 rounded"></div>
              </div>
              
              {/* Table rows - generate 3 rows per table */}
              {[...Array(3)].map((_, rowIndex) => (
                <div key={rowIndex} className="flex border-b p-3 items-center">
                  <div className="w-4/12 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div>
                    <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
                  </div>
                  <div className="w-3/12 h-5 bg-gray-200 rounded"></div>
                  <div className="w-2/12 h-5 bg-gray-200 rounded"></div>
                  <div className="w-2/12 h-5 bg-gray-200 rounded"></div>
                  <div className="w-1/12">
                    <div className="h-8 w-20 bg-gray-200 rounded-md ml-auto"></div>
                  </div>
                </div>
              ))}
              
              {/* Empty state when no rows are available */}
              <div className="py-6 text-center hidden">
                <div className="h-5 w-48 bg-gray-200 rounded mx-auto"></div>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default EmployeesSkeleton;
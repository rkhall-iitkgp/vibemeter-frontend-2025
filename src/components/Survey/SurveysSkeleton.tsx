import React from "react";

const SurveysSkeleton: React.FC = () => {
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
      <main className="p-6 pt-2">
        <div className="flex justify-between mb-4">
          <div className="flex items-center gap-4">
            {/* Search bar skeleton */}
            <div className="w-96 h-10 bg-gray-200 rounded-md"></div>
            {/* Sort dropdown skeleton */}
            <div className="w-32 h-10 bg-gray-200 rounded-md"></div>
          </div>
          {/* Create button skeleton */}
          <div className="w-36 h-10 bg-gray-200 rounded-md"></div>
        </div>

        {/* Survey cards skeleton */}
        <div className="space-y-4">
          {/* Generate 3 skeleton cards */}
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between">
                <div className="w-full">
                  {/* Title and status skeleton */}
                  <div className="flex items-center mb-3">
                    <div className="h-6 w-48 bg-gray-200 rounded mr-2"></div>
                    <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
                  </div>
                  {/* Date skeleton */}
                  <div className="h-4 w-32 bg-gray-200 rounded mb-3"></div>
                  {/* Description skeleton - two lines */}
                  <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                </div>
                {/* View details button skeleton */}
                <div className="flex justify-end items-end mt-16">
                  <div className="h-8 w-28 bg-gray-200 rounded-md"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SurveysSkeleton;
import React from "react";

interface FocusGroupListSkeletonProps {
  count?: number;
}

const FocusGroupListSkeleton: React.FC<FocusGroupListSkeletonProps> = ({ count = 3 }) => {
  return (
    <div className="mt-6">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="mb-4 rounded-lg border border-gray-200 bg-white p-6 animate-pulse">
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-6 w-48 bg-gray-200 rounded"></div>
                  <div className="ml-2 h-4 w-24 bg-gray-200 rounded"></div>
                </div>
                <div className="flex space-x-2">
                  <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                  <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                </div>
              </div>
              <div className="flex gap-4 mt-2">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="flex gap-2">
                  <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
                  <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
                </div>
              </div>
              <div className="mt-3">
                <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FocusGroupListSkeleton;
import React from "react";

const FocusGroupHeaderSkeleton = () => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 mb-6 animate-pulse">
      <div className="flex justify-between items-center">
        <div>
          <div className="h-8 w-64 bg-gray-100 rounded mb-2"></div>
          <div className="h-4 w-40 bg-gray-100 rounded mt-2"></div>
        </div>
        <div className="h-4 w-48 bg-gray-100 rounded"></div>
      </div>
      <div className="mt-6 border-t border-gray-100 pt-6 -mx-6 px-6">
        <div className="h-6 w-32 bg-gray-100 rounded mb-2"></div>
        <div className="h-4 w-full bg-gray-100 rounded mb-2"></div>
        <div className="h-4 w-full bg-gray-100 rounded mb-2"></div>
        <div className="h-4 w-3/4 bg-gray-100 rounded"></div>
      </div>
      <div className="mt-6 border-t border-gray-100 pt-6 -mx-6 px-6">
        <div className="h-6 w-32 bg-gray-100 rounded mb-2"></div>
        <div className="flex gap-4">
          <div className="h-6 w-24 bg-gray-100 rounded-full"></div>
          <div className="h-6 w-24 bg-gray-100 rounded-full"></div>
          <div className="h-6 w-24 bg-gray-100 rounded-full"></div>
        </div>
      </div>
      <div className="mt-6 border-t border-gray-100 pt-6 -mx-6 px-6">
        <div className="h-6 w-48 bg-gray-100 rounded mb-2"></div>
        <div className="h-6 w-12 bg-gray-100 rounded"></div>
      </div>
    </div>
  );
};

export default FocusGroupHeaderSkeleton;
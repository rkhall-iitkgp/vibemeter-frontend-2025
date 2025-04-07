import FilterButton from "@/components/FilterButton";
import SearchBar from "@/components/ui/search";
import { Plus } from "lucide-react";
import React from "react";

interface FocusGroupSkeletonProps {
  onSearch: (query: string) => void;
  onFilter: () => void;
  onAddGroup: () => void;
  hasActiveFilters: boolean;
}

const FocusGroupSkeleton: React.FC<FocusGroupSkeletonProps> = ({
  onSearch,
  onFilter,
  onAddGroup,
  hasActiveFilters,
}) => {
  return (
    <div className="flex-1 overflow-auto">
      {/* Regular Header */}
      <header className="bg-gray-100 z-10 p-6 pt-8">
        <div className="flex items-center gap-3">
          <span className="text-[#80C342]">
            <img src="/icons/Focus-grops.svg" className="w-[40px] h-[40px]" />
          </span>
          <h1 className="text-4xl font-semibold text-gray-800">Focus Groups</h1>
        </div>
      </header>

      {/* Dashboard content */}
      <main className="p-6 pt-2">
        {/* Regular Search, Filter, and Create button */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center">
            <div className="relative w-95 mr-3">
              <SearchBar
                onSearch={onSearch}
                placeholder="Search Focus Groups"
              />
            </div>
            <FilterButton onClick={onFilter} isActive={hasActiveFilters} />
          </div>
          <button
            type="button"
            className="bg-[#80C342] text-white px-4 py-2 rounded-md flex items-center text-sm whitespace-nowrap hover:cursor-pointer"
            onClick={onAddGroup}
          >
            <Plus size={18} className="mr-2" />
            Add Focus Group
          </button>
        </div>

        {/* Focus Group List Skeleton */}
        <div className="flex flex-col space-y-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 w-full"
            >
              {/* First Row: Name, Members Count, Edit & Delete */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-70 h-6 bg-gray-200 animate-pulse rounded" />{" "}
                  {/* Name */}
                  <div className="w-20 h-6 bg-gray-200 animate-pulse rounded" />{" "}
                  {/* Members count */}
                </div>
                <div className="flex gap-2">
                  <div className="w-6 h-6 bg-gray-200 animate-pulse rounded" />{" "}
                  {/* Delete */}
                  <div className="w-6 h-6 bg-gray-200 animate-pulse rounded" />{" "}
                  {/* Edit */}
                </div>
              </div>

              {/* Second Row: Created Date and Selected Metrics */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-40 h-5 bg-gray-200 animate-pulse rounded" />{" "}
                {/* Created date */}
                <div className="w-36 h-5 bg-gray-200 animate-pulse rounded" />{" "}
                {/* Selected metrics */}
                <div className="w-42 h-5 bg-gray-200 animate-pulse rounded" />
              </div>

              {/* Third Row: Description */}
              <div className="w-full h-4 bg-gray-200 animate-pulse rounded-xl" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default FocusGroupSkeleton;

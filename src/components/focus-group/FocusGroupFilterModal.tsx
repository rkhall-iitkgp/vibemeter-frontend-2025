import { FC, useState } from 'react';
import { FocusGroup } from '../../types';

interface FilterState {
  tags: string[];
  createdDate: string[];
}

interface FocusGroupFilterModalProps {
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  focusGroups: FocusGroup[];
  currentFilters: FilterState;
}

const FocusGroupFilterModal: FC<FocusGroupFilterModalProps> = ({
  onClose,
  onApply,
  focusGroups,
  currentFilters,
}) => {
  // Initialize with current filters
  const [tempTagFilters, setTempTagFilters] = useState<string[]>(currentFilters.tags);
  const [tempDateFilters, setTempDateFilters] = useState<string[]>(currentFilters.createdDate);

  // Get unique tags from all focus groups
  const uniqueTags = ['All', ...new Set(focusGroups.flatMap(group => group.tags))];

  // Get unique dates
  const uniqueDates = ['All', ...new Set(focusGroups.map(group => group.createdDate))].sort();

  const toggleTagFilter = (tag: string) => {
    if (tag === 'All') {
      setTempTagFilters(['All']);
      return;
    }
    
    // If 'All' is currently selected, remove it
    let newFilters = tempTagFilters.filter(t => t !== 'All');
    
    if (newFilters.includes(tag)) {
      // Remove the tag if it's already selected
      newFilters = newFilters.filter(t => t !== tag);
      // If no filters left, select 'All'
      if (newFilters.length === 0) {
        newFilters = ['All'];
      }
    } else {
      // Add the tag if it's not already selected
      newFilters.push(tag);
    }
    
    setTempTagFilters(newFilters);
  };
  
  const toggleDateFilter = (date: string) => {
    if (date === 'All') {
      setTempDateFilters(['All']);
      return;
    }
    
    // If 'All' is currently selected, remove it
    let newFilters = tempDateFilters.filter(d => d !== 'All');
    
    if (newFilters.includes(date)) {
      // Remove the date if it's already selected
      newFilters = newFilters.filter(d => d !== date);
      // If no filters left, select 'All'
      if (newFilters.length === 0) {
        newFilters = ['All'];
      }
    } else {
      // Add the date if it's not already selected
      newFilters.push(date);
    }
    
    setTempDateFilters(newFilters);
  };
  
  const clearAllFilters = () => {
    setTempTagFilters(['All']);
    setTempDateFilters(['All']);
  };
  
  const applyFilters = () => {
    onApply({
      tags: tempTagFilters,
      createdDate: tempDateFilters
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Filter Options</h3>
        </div>
        
        <div className="overflow-y-auto max-h-[450px]">
          {/* Tags Filter Section */}
          <div className="p-4 border-b border-gray-200">
            <h4 className="text-base font-semibold text-gray-900 mb-3">Tags</h4>
            <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2">
              {uniqueTags.map((tag, index) => (
                <div key={index} className="flex items-center">
                  <input
                    id={`tag-filter-${index}`}
                    type="checkbox"
                    className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    checked={tempTagFilters.includes(tag)}
                    onChange={() => toggleTagFilter(tag)}
                  />
                  <label htmlFor={`tag-filter-${index}`} className="ml-2 text-sm text-gray-900">
                    {tag}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Created Date Filter Section */}
          <div className="p-4 border-b border-gray-200">
            <h4 className="text-base font-semibold text-gray-900 mb-3">Created Date</h4>
            <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2">
              {uniqueDates.map((date, index) => (
                <div key={index} className="flex items-center">
                  <input
                    id={`date-filter-${index}`}
                    type="checkbox"
                    className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    checked={tempDateFilters.includes(date)}
                    onChange={() => toggleDateFilter(date)}
                  />
                  <label htmlFor={`date-filter-${index}`} className="ml-2 text-sm text-gray-900">
                    {date}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Filter Action Buttons */}
        <div className="p-4 flex justify-between border-t border-gray-200">
          <button
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            onClick={clearAllFilters}
          >
            Clear All
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            onClick={applyFilters}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FocusGroupFilterModal;
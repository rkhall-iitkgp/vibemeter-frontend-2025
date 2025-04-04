import { FC, useState } from "react";

interface Employee {
  name: string;
  id: string;
  title: string;
  dateAdded: string;
}

interface ParticipantFilterModalProps {
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
  participants: Employee[];
  currentFilters: FilterOptions;
}

interface FilterOptions {
  jobTitles: string[];
  dateAdded: string[];
}

const ParticipantFilterModal: FC<ParticipantFilterModalProps> = ({
  onClose,
  onApply,
  participants,
  currentFilters,
}) => {
  // Initialize with current filters instead of default values
  const [tempJobTitleFilters, setTempJobTitleFilters] = useState<string[]>(
    currentFilters.jobTitles
  );
  const [tempDateAddedFilters, setTempDateAddedFilters] = useState<string[]>(
    currentFilters.dateAdded
  );

  // Get unique job titles and dates from participants
  const uniqueJobTitles = [
    "All",
    ...Array.from(new Set(participants.map((p) => p.title))),
  ];
  const uniqueDates = [
    "All",
    ...Array.from(new Set(participants.map((p) => p.dateAdded))),
  ].sort();

  const toggleJobTitleFilter = (title: string) => {
    if (title === "All") {
      setTempJobTitleFilters(["All"]);
      return;
    }

    // If 'All' is currently selected, remove it
    let newFilters = tempJobTitleFilters.filter((t) => t !== "All");

    if (newFilters.includes(title)) {
      // Remove the title if it's already selected
      newFilters = newFilters.filter((t) => t !== title);
      // If no filters left, select 'All'
      if (newFilters.length === 0) {
        newFilters = ["All"];
      }
    } else {
      // Add the title if it's not already selected
      newFilters.push(title);
    }

    setTempJobTitleFilters(newFilters);
  };

  const toggleDateAddedFilter = (date: string) => {
    if (date === "All") {
      setTempDateAddedFilters(["All"]);
      return;
    }

    // If 'All' is currently selected, remove it
    let newFilters = tempDateAddedFilters.filter((d) => d !== "All");

    if (newFilters.includes(date)) {
      // Remove the date if it's already selected
      newFilters = newFilters.filter((d) => d !== date);
      // If no filters left, select 'All'
      if (newFilters.length === 0) {
        newFilters = ["All"];
      }
    } else {
      // Add the date if it's not already selected
      newFilters.push(date);
    }

    setTempDateAddedFilters(newFilters);
  };

  const clearAllFilters = () => {
    setTempJobTitleFilters(["All"]);
    setTempDateAddedFilters(["All"]);
  };

  const applyFilters = () => {
    onApply({
      jobTitles: tempJobTitleFilters,
      dateAdded: tempDateAddedFilters,
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
          {/* Job Title Filter Section */}
          <div className="p-4 border-b border-gray-200">
            <h4 className="text-base font-semibold text-gray-900 mb-3">
              Job Title
            </h4>
            <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2">
              {uniqueJobTitles.map((title, index) => (
                <div key={index} className="flex items-center">
                  <input
                    id={`job-title-filter-${index}`}
                    type="checkbox"
                    className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    checked={tempJobTitleFilters.includes(title)}
                    onChange={() => toggleJobTitleFilter(title)}
                  />
                  <label
                    htmlFor={`job-title-filter-${index}`}
                    className="ml-2 text-sm text-gray-900"
                  >
                    {title}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Date Added Filter Section */}
          <div className="p-4 border-b border-gray-200">
            <h4 className="text-base font-semibold text-gray-900 mb-3">
              Date Added
            </h4>
            <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2">
              {uniqueDates.map((date, index) => (
                <div key={index} className="flex items-center">
                  <input
                    id={`date-added-filter-${index}`}
                    type="checkbox"
                    className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    checked={tempDateAddedFilters.includes(date)}
                    onChange={() => toggleDateAddedFilter(date)}
                  />
                  <label
                    htmlFor={`date-added-filter-${index}`}
                    className="ml-2 text-sm text-gray-900"
                  >
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

export default ParticipantFilterModal;

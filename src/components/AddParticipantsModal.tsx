import { FC, useState, useEffect } from "react";
import { Employee } from "@/types";

interface AddParticipantsModalProps {
  onClose: () => void;
  onAdd: (selectedIds: string[]) => void;
  existingParticipants?: Employee[];
  allEmployees: Employee[];
}

const AddParticipantsModal: FC<AddParticipantsModalProps> = ({
  onClose,
  onAdd,
  existingParticipants = [],
  allEmployees,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmployees, setFilteredEmployees] =
    useState<Employee[]>(allEmployees);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("Priority");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  // Active filter options (applied to filtering)
  const [jobTitleFilters, setJobTitleFilters] = useState<string[]>(["All"]);
  const [dateAddedFilters, setDateAddedFilters] = useState<string[]>(["All"]);

  // Temporary filter options (for selection in the popup)
  const [tempJobTitleFilters, setTempJobTitleFilters] = useState<string[]>([
    "All",
  ]);
  const [tempDateAddedFilters, setTempDateAddedFilters] = useState<string[]>([
    "All",
  ]);

  // Get unique job titles and dates from all employees
  const uniqueJobTitles = [
    "All",
    ...Array.from(new Set(allEmployees.map((emp) => emp.job_title))),
  ];
  const uniqueDates = [
    "All",
    ...Array.from(new Set(allEmployees.map((emp) => emp.joining_date))),
  ].sort();

  // Initialize temp filters when opening the popup
  useEffect(() => {
    if (showFilterOptions) {
      setTempJobTitleFilters([...jobTitleFilters]);
      setTempDateAddedFilters([...dateAddedFilters]);
    }
  }, [showFilterOptions, dateAddedFilters, jobTitleFilters]);

  // Initial load - filter out existing participants
  useEffect(() => {
    const existingIds = existingParticipants.map((p) => p.employee_id);
    const available = allEmployees.filter(
      (emp) => !existingIds.includes(emp.employee_id)
    );
    setFilteredEmployees(available);
  }, [allEmployees, existingParticipants]);

  // Handle search and filters
  useEffect(() => {
    let filtered = allEmployees.filter(
      (emp) =>
        !existingParticipants
          .map((p) => p.employee_id)
          .includes(emp.employee_id)
    );

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (emp) =>
          emp.name.toLowerCase().includes(query) ||
          emp.employee_id.toLowerCase().includes(query) ||
          emp.job_title.toLowerCase().includes(query)
      );
    }

    // Apply job title filter
    if (!jobTitleFilters.includes("All")) {
      filtered = filtered.filter((emp) =>
        jobTitleFilters.includes(emp.job_title)
      );
    }

    // Apply date added filter
    if (!dateAddedFilters.includes("All")) {
      filtered = filtered.filter((emp) =>
        dateAddedFilters.includes(emp.joining_date)
      );
    }

    setFilteredEmployees(filtered);
  }, [
    searchQuery,
    allEmployees,
    existingParticipants,
    jobTitleFilters,
    dateAddedFilters,
  ]);

  const toggleEmployeeSelection = (id: string) => {
    if (selectedEmployees.includes(id)) {
      setSelectedEmployees(selectedEmployees.filter((empId) => empId !== id));
    } else {
      setSelectedEmployees([...selectedEmployees, id]);
    }
  };

  const handleAddParticipants = () => {
    onAdd(selectedEmployees);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

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
    setJobTitleFilters(tempJobTitleFilters);
    setDateAddedFilters(tempDateAddedFilters);
    setShowFilterOptions(false);
  };

  const sortOptions = ["Priority", "Name", "Date", "Department"];

  const hasActiveFilters = () => {
    return (
      !jobTitleFilters.includes("All") || !dateAddedFilters.includes("All")
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Add Participants</h2>
        </div>

        {/* Search and Filters */}
        <div className="p-4 grid grid-cols-12 gap-4">
          <div className="col-span-7">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search Employee"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={clearSearch}
                >
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          <div className="col-span-2 ml-2 relative">
            <button
              className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white"
              onClick={() => setShowFilterOptions(!showFilterOptions)}
            >
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filter
              </div>
              {hasActiveFilters() && (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
              )}
            </button>

            {/* Filter Options Popup */}
            {showFilterOptions && (
              <div className="absolute z-10 mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-lg right-0 max-h-[450px] flex flex-col">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900">
                    Filter Options
                  </h3>
                </div>

                <div className="overflow-y-auto flex-1">
                  {/* Job Title Filter Section */}
                  <div className="p-4 border-b border-gray-200">
                    <h4 className="text-base font-semibold text-gray-900 mb-3">
                      Job Title
                    </h4>
                    <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2">
                      {uniqueJobTitles.map((title, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            id={`job-title-${index}`}
                            type="checkbox"
                            className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                            checked={tempJobTitleFilters.includes(title)}
                            onChange={() => toggleJobTitleFilter(title)}
                          />
                          <label
                            htmlFor={`job-title-${index}`}
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
                            id={`date-added-${index}`}
                            type="checkbox"
                            className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                            checked={tempDateAddedFilters.includes(date)}
                            onChange={() => toggleDateAddedFilter(date)}
                          />
                          <label
                            htmlFor={`date-added-${index}`}
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
                <div className="p-4 flex justify-between mt-auto border-t border-gray-200">
                  <button
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                    onClick={clearAllFilters}
                  >
                    Clear All
                  </button>
                  <button
                    className="px-4 py-2 bg-[#7CC243] text-white rounded-md hover:bg-green-600"
                    onClick={applyFilters}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="col-span-3 ml-2 relative">
            <button
              className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white"
              onClick={() => setShowSortOptions(!showSortOptions)}
            >
              <div className="flex items-center space-x-2">
                <span>Sort By :</span>
                <span className="font-bold">{sortBy}</span>
              </div>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {showSortOptions && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      option === sortBy ? "bg-gray-50 font-bold" : ""
                    }`}
                    onClick={() => {
                      setSortBy(option);
                      setShowSortOptions(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Employees Table */}
        <div className="px-4 overflow-hidden">
          <div className="border rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 bg-gray-50 py-3 border-b">
              <div className="col-span-1 px-6 flex items-center justify-center">
                {/* Checkbox column header */}
              </div>
              <div className="col-span-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee Name
              </div>
              <div className="col-span-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee ID
              </div>
              <div className="col-span-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job Title
              </div>
              <div className="col-span-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Added
              </div>
            </div>

            {/* Table Body */}
            <div className="bg-white divide-y divide-gray-200 max-h-80 overflow-y-auto">
              {filteredEmployees.length === 0 ? (
                <div className="py-6 text-center text-gray-500">
                  No employees found.
                </div>
              ) : (
                filteredEmployees.map((employee) => (
                  <div
                    key={employee.employee_id}
                    className="grid grid-cols-12 py-3 hover:bg-gray-50"
                  >
                    <div className="col-span-1 px-6 flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedEmployees.includes(
                          employee.employee_id
                        )}
                        onChange={() =>
                          toggleEmployeeSelection(employee.employee_id)
                        }
                      />
                    </div>
                    <div className="col-span-3 px-4 flex items-center">
                      <div className="text-sm font-medium text-gray-900">
                        {employee.name}
                      </div>
                    </div>
                    <div className="col-span-3 px-4 flex items-center">
                      <div className="text-sm text-gray-500">
                        {employee.employee_id}
                      </div>
                    </div>
                    <div className="col-span-3 px-4 flex items-center">
                      <div className="text-sm text-gray-500">
                        {employee.job_title}
                      </div>
                    </div>
                    <div className="col-span-2 px-4 flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        {employee.joining_date}
                      </div>
                      <button className="text-gray-400 hover:text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer with buttons */}
        <div className="p-4 flex justify-end space-x-3">
          <button
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`px-6 py-2 rounded-md text-white ${
              selectedEmployees.length > 0
                ? "bg-[#80C342] hover:bg-[#72b33b]"
                : "bg-[#80C342]/50 cursor-not-allowed"
            }`}
            onClick={handleAddParticipants}
            disabled={selectedEmployees.length === 0}
          >
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddParticipantsModal;

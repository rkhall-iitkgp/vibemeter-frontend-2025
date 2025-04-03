import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, MoreVertical, ChevronLeft, ChevronRight, X } from 'lucide-react';

const EmployeeDirectory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortCriteria, setSortCriteria] = useState('Priority');
  const [filterOptions, setFilterOptions] = useState({
    jobTitle: [],
    dateAdded: []
  });
  const [appliedFilters, setAppliedFilters] = useState({
    jobTitle: null,
    dateAdded: null
  });
  
  // Sample employee data with more variety for filtering and sorting
  const allEmployees = [
    { name: 'Ankan', id: 'EM134332', jobTitle: 'Cool Guy', dateAdded: '01-03-2025', priority: 1 },
    { name: 'Ankan', id: 'EM134332', jobTitle: 'Cool Guy', dateAdded: '01-03-2025', priority: 2 },
    { name: 'Ankan', id: 'EM134332', jobTitle: 'Cool Guy', dateAdded: '01-03-2025', priority: 3 },
    { name: 'Johnson', id: 'EM134335', jobTitle: 'Developer', dateAdded: '02-03-2025', priority: 2 },
    { name: 'Sarah', id: 'EM134336', jobTitle: 'Designer', dateAdded: '03-03-2025', priority: 1 },
    { name: 'Michael', id: 'EM134337', jobTitle: 'Manager', dateAdded: '05-03-2025', priority: 3 },
    { name: 'Emma', id: 'EM134338', jobTitle: 'Developer', dateAdded: '06-03-2025', priority: 2 },
    { name: 'David', id: 'EM134339', jobTitle: 'Designer', dateAdded: '08-03-2025', priority: 1 },
    { name: 'Ankan', id: 'EM134332', jobTitle: 'Cool Guy', dateAdded: '01-03-2025', priority: 1 },
    { name: 'Ankan', id: 'EM134332', jobTitle: 'Cool Guy', dateAdded: '01-03-2025', priority: 2 },
    { name: 'Ankan', id: 'EM134332', jobTitle: 'Cool Guy', dateAdded: '01-03-2025', priority: 3 },
    { name: 'Ankan', id: 'EM134332', jobTitle: 'Cool Guy', dateAdded: '01-03-2025', priority: 1 },
    { name: 'Ankan', id: 'EM134332', jobTitle: 'Cool Guy', dateAdded: '01-03-2025', priority: 2 },
    { name: 'Ankan', id: 'EM134332', jobTitle: 'Cool Guy', dateAdded: '01-03-2025', priority: 3 },
    { name: 'Jessica', id: 'EM134340', jobTitle: 'Manager', dateAdded: '10-03-2025', priority: 2 },
    { name: 'Ryan', id: 'EM134341', jobTitle: 'Developer', dateAdded: '12-03-2025', priority: 1 },
    { name: 'Linda', id: 'EM134342', jobTitle: 'Designer', dateAdded: '15-03-2025', priority: 3 },
    { name: 'Chris', id: 'EM134343', jobTitle: 'Manager', dateAdded: '18-03-2025', priority: 2 },
    { name: 'Alex', id: 'EM134344', jobTitle: 'Developer', dateAdded: '20-03-2025', priority: 1 },
    { name: 'Taylor', id: 'EM134345', jobTitle: 'Designer', dateAdded: '22-03-2025', priority: 3 },
    { name: 'Jordan', id: 'EM134346', jobTitle: 'Manager', dateAdded: '25-03-2025', priority: 1 },
    { name: 'Morgan', id: 'EM134347', jobTitle: 'Developer', dateAdded: '28-03-2025', priority: 2 },
    { name: 'Casey', id: 'EM134348', jobTitle: 'Designer', dateAdded: '30-03-2025', priority: 3 }
  ];

  // Constants for layout consistency
  const ROW_HEIGHT = 60; // Height of each table row in pixels
  const ITEMS_PER_PAGE = 10;
  const TABLE_HEIGHT = ROW_HEIGHT * ITEMS_PER_PAGE; // Fixed height for the table body

  // Initialize filter options
  useEffect(() => {
    const jobTitles = [...new Set(allEmployees.map(emp => emp.jobTitle))];
    const dates = [...new Set(allEmployees.map(emp => emp.dateAdded))];
    
    setFilterOptions({
      jobTitle: jobTitles,
      dateAdded: dates
    });
  }, []);

  // Apply filters and search
  const getFilteredEmployees = () => {
    return allEmployees.filter(employee => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Job title filter
      const matchesJobTitle = !appliedFilters.jobTitle || 
        employee.jobTitle === appliedFilters.jobTitle;
      
      // Date filter
      const matchesDate = !appliedFilters.dateAdded || 
        employee.dateAdded === appliedFilters.dateAdded;
      
      return matchesSearch && matchesJobTitle && matchesDate;
    });
  };

  // Sort employees
  const getSortedEmployees = () => {
    const filtered = getFilteredEmployees();
    
    switch(sortCriteria) {
      case 'Name':
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      case 'Job Title':
        return [...filtered].sort((a, b) => a.jobTitle.localeCompare(b.jobTitle));
      case 'Date Added':
        return [...filtered].sort((a, b) => new Date(a.dateAdded.split('-').reverse().join('-')) - 
                                            new Date(b.dateAdded.split('-').reverse().join('-')));
      case 'Priority':
      default:
        return [...filtered].sort((a, b) => a.priority - b.priority);
    }
  };

  // Pagination
  const sortedEmployees = getSortedEmployees();
  const totalPages = Math.ceil(sortedEmployees.length / ITEMS_PER_PAGE);
  
  const currentEmployees = sortedEmployees.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Handle page change
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setAppliedFilters({
      jobTitle: null,
      dateAdded: null
    });
    setSearchQuery('');
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setFilterOpen(false);
      setSortOpen(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Prevent bubbling for dropdown toggles
  const handleDropdownToggle = (setter, state, e) => {
    e.stopPropagation();
    setter(!state);
  };

  // Generate empty rows to fill table when there are fewer than itemsPerPage items
  const generateEmptyRows = () => {
    const emptyRowsCount = ITEMS_PER_PAGE - currentEmployees.length;
    if (emptyRowsCount > 0) {
      return Array(emptyRowsCount).fill(0).map((_, index) => (
        <div 
          key={`empty-${index}`} 
          className="grid grid-cols-12 items-center border-b border-gray-200 py-4 px-4"
          style={{height: `${ROW_HEIGHT}px`}}
        >
          <div className="col-span-12">&nbsp;</div>
        </div>
      ));
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
            <circle cx="12" cy="8" r="5" />
            <path d="M20 21a8 8 0 0 0-16 0" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold">Employees</h1>
      </div>

      {/* Search and Filter Row */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative grow max-w-md">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search Focus Group"
            className="pl-10 pr-10 py-2 border border-gray-300 rounded w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              className="absolute inset-y-0 right-3 flex items-center"
              onClick={() => setSearchQuery('')}
            >
              <X size={16} className="text-gray-400" />
            </button>
          )}
        </div>
        
        <div className="flex gap-2">
          {/* Filter Button */}
          <div className="relative">
            <button 
              className="px-4 py-2 border border-gray-300 rounded flex items-center gap-2"
              onClick={(e) => handleDropdownToggle(setFilterOpen, filterOpen, e)}
            >
              <Filter size={16} />
              <span>Filter</span>
            </button>
            
            {filterOpen && (
              <div className="absolute right-0 mt-1 w-64 bg-white border border-gray-200 rounded shadow-lg z-10" onClick={(e) => e.stopPropagation()}>
                <div className="p-3 border-b border-gray-200 font-medium">Filter Options</div>
                
                {/* Job Title Filter */}
                <div className="p-3 border-b border-gray-200">
                  <div className="font-medium mb-2">Job Title</div>
                  <div className="space-y-1">
                    {filterOptions.jobTitle.map(title => (
                      <div key={title} className="flex items-center">
                        <input
                          type="radio"
                          id={`job-${title}`}
                          name="jobTitle"
                          className="mr-2"
                          checked={appliedFilters.jobTitle === title}
                          onChange={() => setAppliedFilters({...appliedFilters, jobTitle: title})}
                        />
                        <label htmlFor={`job-${title}`}>{title}</label>
                      </div>
                    ))}
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="job-all"
                        name="jobTitle"
                        className="mr-2"
                        checked={appliedFilters.jobTitle === null}
                        onChange={() => setAppliedFilters({...appliedFilters, jobTitle: null})}
                      />
                      <label htmlFor="job-all">All</label>
                    </div>
                  </div>
                </div>
                
                {/* Date Added Filter */}
                <div className="p-3 border-b border-gray-200">
                  <div className="font-medium mb-2">Date Added</div>
                  <div className="space-y-1">
                    {filterOptions.dateAdded.slice(0, 5).map(date => (
                      <div key={date} className="flex items-center">
                        <input
                          type="radio"
                          id={`date-${date}`}
                          name="dateAdded"
                          className="mr-2"
                          checked={appliedFilters.dateAdded === date}
                          onChange={() => setAppliedFilters({...appliedFilters, dateAdded: date})}
                        />
                        <label htmlFor={`date-${date}`}>{date}</label>
                      </div>
                    ))}
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="date-all"
                        name="dateAdded"
                        className="mr-2"
                        checked={appliedFilters.dateAdded === null}
                        onChange={() => setAppliedFilters({...appliedFilters, dateAdded: null})}
                      />
                      <label htmlFor="date-all">All</label>
                    </div>
                  </div>
                </div>
                
                {/* Filter Actions */}
                <div className="p-3 flex justify-end">
                  <button 
                    className="px-3 py-1 text-sm bg-gray-100 rounded mr-2"
                    onClick={clearFilters}
                  >
                    Clear All
                  </button>
                  <button 
                    className="px-3 py-1 text-sm bg-green-500 text-white rounded"
                    onClick={() => setFilterOpen(false)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Sort Button */}
          <div className="relative">
            <button 
              className="px-4 py-2 border border-gray-300 rounded flex items-center gap-2"
              onClick={(e) => handleDropdownToggle(setSortOpen, sortOpen, e)}
            >
              <span>Sort By : {sortCriteria}</span>
              <ChevronDown size={16} />
            </button>
            
            {sortOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded shadow-lg z-10" onClick={(e) => e.stopPropagation()}>
                <div className="p-3 border-b border-gray-200 font-medium">Sort Options</div>
                {['Priority', 'Name', 'Job Title', 'Date Added'].map(option => (
                  <div 
                    key={option}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSortCriteria(option);
                      setSortOpen(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table with fixed height */}
      <div className="overflow-hidden border border-gray-200 rounded">
        {/* Table Header */}
        <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-200 py-3 px-4">
          <div className="col-span-1"></div>
          <div className="col-span-3 font-medium">Employee Name</div>
          <div className="col-span-3 font-medium">Employee ID</div>
          <div className="col-span-3 font-medium">Job Title</div>
          <div className="col-span-2 font-medium">Date Added</div>
        </div>

        {/* Table Body with fixed height */}
        <div className="bg-white" style={{ height: `${TABLE_HEIGHT}px`, overflowY: 'hidden' }}>
          {currentEmployees.length > 0 ? (
            <>
              {currentEmployees.map((employee, index) => (
                <div 
                  key={index} 
                  className="grid grid-cols-12 items-center border-b border-gray-200 py-4 px-4 hover:bg-gray-50"
                  style={{height: `${ROW_HEIGHT}px`}}
                >
                  <div className="col-span-1">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                  </div>
                  <div className="col-span-3">{employee.name}</div>
                  <div className="col-span-3">{employee.id}</div>
                  <div className="col-span-3">{employee.jobTitle}</div>
                  <div className="col-span-1">{employee.dateAdded}</div>
                  <div className="col-span-1 flex justify-end">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              ))}
              {generateEmptyRows()}
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No employees match your search criteria.
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-1">
        <button 
          className="p-2 rounded hover:bg-gray-100"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={18} className={currentPage === 1 ? "text-gray-300" : ""} />
        </button>
        
        {[...Array(Math.max(1, Math.min(totalPages, 3)))].map((_, index) => (
          <button 
            key={index}
            className={`w-8 h-8 rounded flex items-center justify-center ${currentPage === index + 1 ? 'bg-green-500 text-white' : 'hover:bg-gray-100'}`}
            onClick={() => goToPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        
        <button 
          className="p-2 rounded hover:bg-gray-100"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          <ChevronRight size={18} className={currentPage === totalPages || totalPages === 0 ? "text-gray-300" : ""} />
        </button>
      </div>
    </div>
  );
};

export default EmployeeDirectory;
import React, { useState } from 'react';
import { Search, ChevronRight, ChevronDown, Plus } from 'lucide-react';

interface Survey {
  id: number;
  title: string;
  createdDate: string;
  description: string;
  status: 'Active' | 'Inactive';
}

const SurveysPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('Date');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  // Sample data
  const surveys: Survey[] = [
    {
      id: 1,
      title: 'Employee Engagement Survey 2025',
      createdDate: 'Mar 15, 2025',
      description: 'Annual survey to measure employee satisfaction and engagement across all departments.',
      status: 'Active'
    },
    {
      id: 2,
      title: 'Customer Feedback Survey',
      createdDate: 'Feb 10, 2025',
      description: 'Survey to gather customer feedback on recent product launches.',
      status: 'Active'
    },
    {
      id: 3,
      title: 'Exit Interview Survey',
      createdDate: 'Jan 5, 2025',
      description: 'Survey for employees leaving the organization to understand their reasons and feedback.',
      status: 'Inactive'
    }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Filter surveys based on search term
  const filteredSurveys = surveys.filter((survey) =>
    survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    survey.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center mb-6">
        <div className="flex items-center">
          <div className="bg-green-100 p-2 rounded-md mr-2">
            <svg className="w-6 h-6 text-[#80C342]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="currentColor" />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold">Surveys</h1>
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="relative w-96">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md block w-full pl-10 p-2.5 pr-10"
              placeholder="Search Focus Group"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {searchTerm && (
              <button
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={handleClearSearch}
              >
                <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
          </div>

          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
            <span className="mr-2 text-sm">Sort By : </span>
            <div className="relative">
              <button
                className="flex items-center justify-between text-sm"
                onClick={toggleDropdown}
              >
                <span>{sortBy}</span>
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
              {showDropdown && (
                <div className="absolute z-10 mt-1 w-48 bg-white shadow-lg rounded-md border border-gray-200">
                  <ul className="py-1">
                    <li
                      className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSortBy('Date');
                        setShowDropdown(false);
                      }}
                    >
                      Date
                    </li>
                    <li
                      className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSortBy('Title');
                        setShowDropdown(false);
                      }}
                    >
                      Title
                    </li>
                    <li
                      className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSortBy('Status');
                        setShowDropdown(false);
                      }}
                    >
                      Status
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <button className="flex items-center bg-[#80C342] hover:bg-[#80c342dd] text-white px-4 py-2 rounded-md">
          <Plus className="w-5 h-5 mr-2" />
          Create Survey
        </button>
      </div>

      <div className="space-y-4">
        {filteredSurveys.map((survey) => (
          <div key={survey.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center mb-1">
                  <h2 className="text-lg font-semibold mr-2">{survey.title}</h2>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${survey.status === 'Active' ? 'bg-[#80C342] text-white' : 'bg-gray-100 text-gray-800'
                    }`}>
                    {survey.status}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Created: {survey.createdDate}</span>
                </div>
                <p className="text-gray-700">{survey.description}</p>
              </div>
              <div className="flex justify-end items-end mt-16">
                <button className="text-gray-600 hover:text-gray-800 flex items-center text-sm border border-gray-600 px-3 py-1 rounded-md">
                  View Details
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredSurveys.length === 0 && (
          <div className="text-center text-gray-500">No surveys found.</div>
        )}
      </div>
    </div>
  );
};

export default SurveysPage;

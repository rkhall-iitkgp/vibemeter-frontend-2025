import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

const Questions = () => {
  // Sample question data
  const initialQuestions = [
    {
      id: 1,
      text: "Can you think of a recent situation where you struggled? How did you handle it, and what would you do differently now?",
      tags: ["Morality", "Engagement"],
      severity: "Critical"
    },
    {
      id: 2,
      text: "Can you think of a recent situation where you struggled? How did you handle it, and what would you do differently now?",
      tags: ["Morality", "Engagement"],
      severity: "Moderate"
    },
    {
      id: 3,
      text: "Can you think of a recent situation where you struggled? How did you handle it, and what would you do differently now?",
      tags: ["Morality", "Engagement"],
      severity: "Critical"
    },
    {
      id: 4,
      text: "Can you think of a recent situation where you struggled? How did you handle it, and what would you do differently now?",
      tags: ["Morality", "Engagement"],
      severity: "Critical"
    }
  ];

  // State variables
  const [questions, setQuestions] = useState(initialQuestions);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);

  // Available filters
  const allFilters = [
    "Engagement", "Morality", "Leave Impact", "Cultural Score"
  ];

  // Filter questions based on active filters and search query
  const filteredQuestions = questions.filter(question => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      question.text.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Tag filters
    const matchesTags = activeFilters.length === 0 || 
      activeFilters.some(filter => question.tags.includes(filter));
    
    return matchesSearch && matchesTags;
  });

  // Toggle filter
  const toggleFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="bg-gray-50 min-h-screen p-3 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-medium">Questions</h1>
            <p className="text-gray-500">Some description</p>
          </div>
          <button className="bg-[#80C342] text-white px-3 py-2 rounded-md flex items-center text-sm sm:text-base w-full sm:w-48 justify-center sm:justify-start">
            <Plus size={18} className="mr-2" />
            Create Question
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4 sm:mb-6 max-w-3xl left-1/6">
          <input
            type="text"
            placeholder="Search"
            className="w-full  p-2 pl-8 pr-10 rounded text-sm sm:text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          {searchQuery && (
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              onClick={clearSearch}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filter tags */}
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
          <div className="w-full overflow-x-auto pb-2 -mb-2 flex sm:flex-wrap ">
            {allFilters.map((filter) => (
              <button
                key={filter}
                className={`px-3 sm:px-4 py-1 rounded-md text-xs drop-shadow-sm sm:text-sm whitespace-nowrap mr-2 ${
                  activeFilters.includes(filter)
                    ? 'bg-[#80C342] text-white'
                    : 'bg-white text-gray-700'
                }`}
                onClick={() => toggleFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Questions list */}
        <div className="space-y-3 sm:space-y-4">
          {filteredQuestions.map((question) => (
            <div key={question.id} className="bg-white p-3 sm:p-4 rounded-md shadow-sm border">
              <p className="text-gray-800 mb-3 text-sm sm:text-base">{question.text}</p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {question.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 sm:px-3 py-1 text-xs rounded-full ${
                        tag === "Morality" ? "bg-yellow-100 text-yellow-800" : 
                        tag === "Engagement" ? "bg-teal-100 text-teal-800" : 
                        "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span
                  className={`px-2 sm:px-3 py-1 text-xs rounded-full ${
                    question.severity === "Critical" 
                      ? "bg-red-100 text-red-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  Severity: {question.severity}
                </span>
              </div>
            </div>
          ))}
          {filteredQuestions.length === 0 && (
            <div className="bg-white p-4 rounded-md shadow-sm border text-center text-gray-500">
              No questions match your filters
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questions;
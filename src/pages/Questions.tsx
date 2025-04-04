import { X, Plus } from "lucide-react";
import { useState } from "react";

// Define types for our data structures
interface Question {
  id: number;
  text: string;
  tags: string[];
  severity: "Critical" | "Moderate" | "Low";
}

interface NewQuestion {
  text: string;
  tags: string[];
  severity: "Critical" | "Moderate" | "Low";
}

const Questions = () => {
  // Sample question data
  const initialQuestions: Question[] = [
    {
      id: 1,
      text: "Can you think of a recent situation where you struggled? How did you handle it, and what would you do differently now?",
      tags: ["Morality", "Engagement"],
      severity: "Critical",
    },
    {
      id: 2,
      text: "Can you think of a recent situation where you struggled? How did you handle it, and what would you do differently now?",
      tags: ["Morality", "Engagement"],
      severity: "Moderate",
    },
    {
      id: 3,
      text: "Can you think of a recent situation where you struggled? How did you handle it, and what would you do differently now?",
      tags: ["Morality", "Engagement"],
      severity: "Low",
    },
    {
      id: 4,
      text: "Can you think of a recent situation where you struggled? How did you handle it, and what would you do differently now?",
      tags: ["Morality", "Engagement"],
      severity: "Critical",
    },
  ];

  // State variables with proper typing
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newQuestion, setNewQuestion] = useState<NewQuestion>({
    text: "",
    tags: [],
    severity: "Moderate",
  });

  // Available filters
  const allFilters: string[] = [
    "Engagement",
    "Morality",
    "Leave Impact",
    "Cultural Score",
    "Risk Retention",
  ];

  // Filter questions based on active filters and search query
  const filteredQuestions = questions.filter((question) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      question.text.toLowerCase().includes(searchQuery.toLowerCase());

    // Tag filters
    const matchesTags =
      activeFilters.length === 0 ||
      activeFilters.some((filter) => question.tags.includes(filter));

    return matchesSearch && matchesTags;
  });

  // Toggle filter
  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
  };

  // Toggle tag selection for new question
  const toggleTagSelection = (tag: string) => {
    if (newQuestion.tags.includes(tag)) {
      setNewQuestion({
        ...newQuestion,
        tags: newQuestion.tags.filter((t) => t !== tag),
      });
    } else {
      setNewQuestion({
        ...newQuestion,
        tags: [...newQuestion.tags, tag],
      });
    }
  };

  // Handle severity change
  const handleSeverityChange = (severity: "Critical" | "Moderate" | "Low") => {
    setNewQuestion({
      ...newQuestion,
      severity,
    });
  };

  // Handle question text change
  const handleQuestionTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewQuestion({
      ...newQuestion,
      text: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newQuestion.text.trim() === "") return;

    const newQuestionObj: Question = {
      id: questions.length + 1,
      text: newQuestion.text,
      tags: newQuestion.tags.length > 0 ? newQuestion.tags : ["Engagement"],
      severity: newQuestion.severity,
    };

    setQuestions([...questions, newQuestionObj]);
    setNewQuestion({
      text: "",
      tags: [],
      severity: "Moderate",
    });
    setIsModalOpen(false);
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
          <button
            type="button"
            className="bg-[#80C342] text-white px-5 py-2 rounded-md flex items-center text-sm sm:text-base w-full sm:w-48 justify-center sm:justify-start hover:cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
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
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
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
                    ? "bg-[#80C342] text-white"
                    : "bg-white text-gray-700"
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
            <div
              key={question.id}
              className="bg-white p-3 sm:p-4 rounded-md shadow-sm border"
            >
              <p className="text-gray-800 mb-3 text-sm sm:text-base break-words">
                {question.text}
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {question.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 sm:px-3 py-1 text-xs rounded-full ${
                        tag === "Morality"
                          ? "bg-yellow-100 text-yellow-800"
                          : tag === "Engagement"
                            ? "bg-teal-100 text-teal-800"
                            : tag === "Leave Impact"
                              ? "bg-[#e088c3] text-pink-800"
                              : tag === "Cultural Score"
                                ? "bg-[#80C342] text-green-800"
                                : tag === "Risk Retention"
                                  ? "bg-[#d97a73] text-white"
                                  : "bg-gray-100 text-gray-800"
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
                      : question.severity === "Moderate"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-[#F3FFE1] text-green-800"
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

      {/* Create Question Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Create Question</h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                title="Close Modal"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question Text:
                </label>
                <textarea
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#80C342] focus:border-transparent"
                  rows={4}
                  placeholder="Type your question here..."
                  value={newQuestion.text}
                  onChange={handleQuestionTextChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categories:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {allFilters.map((tag) => (
                    <label key={tag} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="form-checkbox text-[#80C342] rounded"
                        checked={newQuestion.tags.includes(tag)}
                        onChange={() => toggleTagSelection(tag)}
                      />
                      <span className="text-sm text-gray-700">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Severity
                </label>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-[#80C342]"
                      name="severity"
                      checked={newQuestion.severity === "Low"}
                      onChange={() => handleSeverityChange("Low")}
                    />
                    <span className="ml-2 text-sm">Low</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-[#80C342]"
                      name="severity"
                      checked={newQuestion.severity === "Moderate"}
                      onChange={() => handleSeverityChange("Moderate")}
                    />
                    <span className="ml-2 text-sm">Moderate</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-[#80C342]"
                      name="severity"
                      checked={newQuestion.severity === "Critical"}
                      onChange={() => handleSeverityChange("Critical")}
                    />
                    <span className="ml-2 text-sm">Critical</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#80C342] text-white rounded-md hover:bg-[#6ca438]"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Questions;

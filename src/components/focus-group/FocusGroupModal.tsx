import { Employee, FocusGroup } from "../../types";
import { FC, useState, useEffect } from "react";

interface FocusGroupModalProps {
  onClose: () => void;
  onSubmit: (focusGroup: {
    title: string;
    description: string;
    metrics: string[];
    participants: string[];
  }) => void;
  editingFocusGroup?: FocusGroup | null;
}

// Predefined tags with their colors
const PREDEFINED_TAGS = [
  { name: "Engagement", color: "bg-green-100 text-green-800" },
  { name: "Morality", color: "bg-amber-100 text-amber-800" },
  { name: "Cultural Score", color: "bg-pink-100 text-pink-800" },
  { name: "Leave Impact", color: "bg-green-100 text-green-800" },
  { name: "Leadership", color: "bg-blue-100 text-blue-800" },
  { name: "Innovation", color: "bg-purple-100 text-purple-800" },
];

// Mock employee data
const MOCK_EMPLOYEES: Employee[] = [
  // { id: "1", name: "Alex Johnson", department: "Marketing" },
  // { id: "2", name: "Jamie Smith", department: "Finance" },
  // { id: "3", name: "Taylor Brown", department: "HR" },
  // { id: "4", name: "Morgan Lee", department: "IT" },
  // { id: "5", name: "Casey Wilson", department: "Operations" },
  // { id: "6", name: "Jordan Taylor", department: "Sales" },
];

const FocusGroupModal: FC<FocusGroupModalProps> = ({
  onClose,
  onSubmit,
  editingFocusGroup,
}) => {
  // Determine if in edit mode
  const isEditMode = !!editingFocusGroup;

  // Log to help debug
  console.log("Modal opened with editing mode:", isEditMode);
  if (isEditMode) {
    console.log("Editing focus group data:", editingFocusGroup);
  }

  // Custom CSS for hiding scrollbars but keeping functionality
  const hideScrollbarStyle = {
    scrollbarWidth: "none" /* Firefox */,
    msOverflowStyle: "none" /* IE */,
    "::-webkit-scrollbar": {
      display: "none" /* Chrome, Safari, Edge */,
    },
    height: "32px", // Fixed height for single line
  } as React.CSSProperties;

  // Form state
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [metrics, setMetrics] = useState<string[]>([]);
  const [tagSearchQuery, setTagSearchQuery] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);

  // Tag popup state
  const [showTagsPopup, setShowTagsPopup] = useState(false);
  const [filteredTags, setFilteredTags] = useState(PREDEFINED_TAGS);

  // Employee popup state
  const [showEmployeesPopup, setShowEmployeesPopup] = useState(false);
  const [employeeSearchQuery, setEmployeeSearchQuery] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(MOCK_EMPLOYEES);

  // Initialize form data when editing
  useEffect(() => {
    if (editingFocusGroup) {
      console.log("Initializing form with focus group data");
      setGroupName(editingFocusGroup.name || "");
      setDescription(editingFocusGroup.description || "");
      setMetrics(editingFocusGroup.metrics || []);

      // Initialize selected employees
      if (editingFocusGroup.members > 0) {
        // In a real app, you'd fetch the actual participants
        // This is just a simulation for mock data
        const mockSelectedEmployees = MOCK_EMPLOYEES.slice(
          0,
          editingFocusGroup.members
        );
        setSelectedEmployees(mockSelectedEmployees);
      }
    } else {
      // Reset form when not editing
      setGroupName("");
      setDescription("");
      setMetrics([]);
      setSelectedEmployees([]);
    }
  }, [editingFocusGroup]);

  // Check if form is valid to enable the submit button
  const isFormValid = groupName.trim() !== "" && description.trim() !== "";

  // Handle tag search
  useEffect(() => {
    if (tagSearchQuery.trim() === "") {
      setFilteredTags(PREDEFINED_TAGS);
    } else {
      const filtered = PREDEFINED_TAGS.filter((tag) =>
        tag.name.toLowerCase().includes(tagSearchQuery.toLowerCase())
      );
      setFilteredTags(filtered);
    }
  }, [tagSearchQuery]);

  // Handle employee search
  useEffect(() => {
    if (employeeSearchQuery.trim() === "") {
      setFilteredEmployees(MOCK_EMPLOYEES);
    } else {
      const filtered = MOCK_EMPLOYEES.filter((employee) =>
        employee.name.toLowerCase().includes(employeeSearchQuery.toLowerCase())
      );
      setFilteredEmployees(filtered);
    }
  }, [employeeSearchQuery]);

  const toggleTag = (tagName: string) => {
    if (metrics.includes(tagName)) {
      setMetrics(metrics.filter((tag) => tag !== tagName));
    } else {
      setMetrics([...metrics, tagName]);
    }
  };

  const toggleEmployee = (employee: Employee) => {
    const isSelected = selectedEmployees.some(
      (e) => e.employee_id === employee.employee_id
    );

    if (isSelected) {
      setSelectedEmployees(
        selectedEmployees.filter((e) => e.employee_id !== employee.employee_id)
      );
    } else {
      setSelectedEmployees([...selectedEmployees, employee]);
    }
  };

  const getTagColor = (tagName: string) => {
    const tag = PREDEFINED_TAGS.find((t) => t.name === tagName);
    return tag ? tag.color : "bg-gray-100 text-gray-800";
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setMetrics(metrics.filter((tag) => tag !== tagToRemove));
  };

  const handleRemoveEmployee = (employeeId: string) => {
    setSelectedEmployees(
      selectedEmployees.filter(
        (employee) => employee.employee_id !== employeeId
      )
    );
  };

  const handleSubmit = () => {
    if (isFormValid) {
      console.log("Submitting form data:", {
        title: groupName,
        description,
        tags: metrics,
        participants: selectedEmployees.map((emp) => emp.employee_id),
      });

      onSubmit({
        title: groupName,
        description,
        metrics: metrics,
        participants: selectedEmployees.map((emp) => emp.employee_id),
      });
    }
  };

  const handleCancel = () => {
    console.log("Closing modal and resetting state");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        <div className="p-4">
          {/* Header */}
          <div className="mb-3">
            <h2 className="text-xl font-bold text-gray-900">
              {isEditMode ? "Edit Focus Group" : "Create Focus Group"}
            </h2>
            {isEditMode && (
              <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Editing {editingFocusGroup?.name}
              </div>
            )}
          </div>

          {/* Description text */}
          <p className="text-gray-500 mb-4">
            {isEditMode
              ? "Update focus group details and manage participants."
              : "Create a new focus group and add employees to collaborate on specific initiatives."}
          </p>

          {/* Focus Group Name */}
          <div className="mb-4">
            <label
              htmlFor="groupName"
              className="block text-md font-medium text-gray-900 mb-1"
            >
              Focus Group Name
            </label>
            <input
              type="text"
              id="groupName"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter focus group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-md font-medium text-gray-900 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              placeholder="Describe the purpose of this focus group"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Tags */}
          <div className="mb-4 relative">
            <label
              htmlFor="tags"
              className="block text-md font-medium text-gray-900 mb-1"
            >
              Tags
            </label>
            <div
              className="w-full flex items-center justify-between border border-gray-300 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50"
              onClick={() => setShowTagsPopup(true)}
            >
              <div
                className="flex items-center gap-2 w-full overflow-x-auto whitespace-nowrap hide-scrollbar"
                style={hideScrollbarStyle}
              >
                {metrics.length > 0 ? (
                  metrics.map((tag, index) => (
                    <span
                      key={index}
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${getTagColor(tag)}`}
                    >
                      {tag}
                      <button
                        type="button"
                        className="ml-1 inline-flex text-gray-400 hover:text-gray-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveTag(tag);
                        }}
                      >
                        <svg
                          className="h-3 w-3"
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
                    </span>
                  ))
                ) : (
                  <div className="flex items-center text-gray-500">
                    <svg
                      className="mr-2 h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    Add tags
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Participants */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label
                htmlFor="participants"
                className="block text-md font-medium text-gray-900"
              >
                Participants
              </label>
              <span className="text-gray-500 text-sm">
                {selectedEmployees.length} members
              </span>
            </div>

            {selectedEmployees.length > 0 && (
              <div className="mb-2 border border-gray-200 rounded-lg p-2 overflow-x-auto">
                <div
                  className="flex items-center gap-2 w-full whitespace-nowrap"
                  style={hideScrollbarStyle}
                >
                  {selectedEmployees.map((employee) => (
                    <span
                      key={employee.employee_id}
                      className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs shrink-0"
                    >
                      <div className="h-4 w-4 rounded-full bg-gray-200 flex-shrink-0"></div>
                      <span className="mx-1 font-medium">{employee.name}</span>
                      <button
                        type="button"
                        className="ml-1 inline-flex text-blue-400 hover:text-blue-500"
                        onClick={() =>
                          handleRemoveEmployee(employee.employee_id)
                        }
                      >
                        <svg
                          className="h-3 w-3"
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
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              type="button"
              className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg text-left text-gray-500 hover:bg-gray-50"
              onClick={() => setShowEmployeesPopup(true)}
            >
              <div className="flex items-center">
                <svg
                  className="mr-2 h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Add employees
              </div>
            </button>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 text-sm"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-md font-medium text-white text-sm
                ${
                  isFormValid
                    ? "bg-[#80C342] hover:bg-[#72b33b]"
                    : "bg-[#80C342]/50 cursor-not-allowed"
                }`}
              onClick={handleSubmit}
              disabled={!isFormValid}
            >
              {isEditMode ? "Edit Focus Group" : "Create Focus Group"}
            </button>
          </div>
        </div>
      </div>

      {/* Tags Selection Popup */}
      {showTagsPopup && (
        <div
          className="fixed inset-0 z-[60]"
          onClick={() => setShowTagsPopup(false)}
        >
          <div
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="p-3 border-b border-gray-200">
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
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Search tags..."
                  value={tagSearchQuery}
                  onChange={(e) => setTagSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Tag Options */}
            <div className="bg-gray-50 max-h-80 overflow-y-auto">
              {filteredTags.map((tag, index) => (
                <button
                  key={index}
                  className={`w-full text-left px-4 py-4 ${index !== filteredTags.length - 1 ? "border-b border-gray-100" : ""}`}
                  onClick={() => toggleTag(tag.name)}
                >
                  <span
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${tag.color} ${metrics.includes(tag.name) ? "ring-2 ring-offset-1 ring-green-500" : ""}`}
                  >
                    {tag.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Employees Selection Popup */}
      {showEmployeesPopup && (
        <div
          className="fixed inset-0 z-[60]"
          onClick={() => setShowEmployeesPopup(false)}
        >
          <div
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="p-3 border-b border-gray-200">
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
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Search employees..."
                  value={employeeSearchQuery}
                  onChange={(e) => setEmployeeSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Employee Options */}
            <div className="bg-gray-50 max-h-80 overflow-y-auto">
              {filteredEmployees.map((employee, index) => {
                const isSelected = selectedEmployees.some(
                  (e) => e.employee_id === employee.employee_id
                );
                return (
                  <button
                    key={employee.employee_id}
                    className={`w-full text-left px-4 py-3 flex items-center justify-between ${
                      index !== filteredEmployees.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    } ${isSelected ? "bg-green-50" : ""}`}
                    onClick={() => toggleEmployee(employee)}
                  >
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0"></div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {employee.name}
                        </p>
                        <p className="text-xs text-gray-500">Department</p>
                      </div>
                    </div>
                    {isSelected && (
                      <svg
                        className="h-5 w-5 text-green-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FocusGroupModal;

"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type FC, useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import type { FocusGroup } from "../../types";

// Simplified Employee interface - only with employee_id
interface Employee {
  employee_id: string;
}

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
  { name: "Engagement", color: "bg-green-100 text-[#7CC243]" },
  { name: "Morality", color: "bg-amber-100 text-amber-800" },
  { name: "Cultural Score", color: "bg-pink-100 text-pink-800" },
  { name: "Leave Impact", color: "bg-green-100 text-[#7CC243]" },
  { name: "Leadership", color: "bg-blue-100 text-blue-800" },
  { name: "Innovation", color: "bg-purple-100 text-purple-800" },
];

// Our simplified mock employees only need employee_id
const MOCK_FOCUS_GROUPS = [
  { id: "fg1", name: "Focus Group 1" },
  { id: "fg2", name: "Focus Group 2" },
  { id: "fg3", name: "Focus Group 3" },
  { id: "fg4", name: "Focus Group 4" },
  { id: "fg5", name: "Focus Group 5" },
];

// Mock employees by focus group - simplified to only have employee_id
const MOCK_EMPLOYEES_BY_FOCUS_GROUP: Record<string, Employee[]> = {
  fg1: [
    { employee_id: "EMP10071" },
    { employee_id: "EMP10072" },
    { employee_id: "EMP10073" },
    { employee_id: "EMP10074" },
    { employee_id: "EMP10075" },
  ],
  fg2: [
    { employee_id: "EMP20071" },
    { employee_id: "EMP20072" },
    { employee_id: "EMP20073" },
    { employee_id: "EMP20074" },
    { employee_id: "EMP20075" },
  ],
  fg3: [
    { employee_id: "EMP30071" },
    { employee_id: "EMP30072" },
    { employee_id: "EMP30073" },
    { employee_id: "EMP30074" },
    { employee_id: "EMP30075" },
  ],
  fg4: [
    { employee_id: "EMP40071" },
    { employee_id: "EMP40072" },
    { employee_id: "EMP40073" },
    { employee_id: "EMP40074" },
    { employee_id: "EMP40075" },
  ],
  fg5: [
    { employee_id: "EMP50071" },
    { employee_id: "EMP50072" },
    { employee_id: "EMP50073" },
    { employee_id: "EMP50074" },
    { employee_id: "EMP50075" },
  ],
};

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

  // Form state
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [metrics, setMetrics] = useState<string[]>([]);
  const [tagSearchQuery, setTagSearchQuery] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);

  // Tag popup state
  const [showTagsPopup, setShowTagsPopup] = useState(false);
  const [filteredTags, setFilteredTags] = useState(PREDEFINED_TAGS);

  // Focus group and employee selection state
  const [selectedFocusGroup, setSelectedFocusGroup] = useState<string | null>(
    null
  );
  const [focusGroupEmployees, setFocusGroupEmployees] = useState<Employee[]>(
    []
  );
  const [selectedFocusGroupEmployees, setSelectedFocusGroupEmployees] =
    useState<Record<string, boolean>>({});
  const [showEmployeeTable, setShowEmployeeTable] = useState(false);

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
        const mockSelectedEmployees = Object.values(
          MOCK_EMPLOYEES_BY_FOCUS_GROUP
        )
          .flat()
          .slice(0, editingFocusGroup.members);
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

  // Handle focus group selection
  useEffect(() => {
    if (selectedFocusGroup) {
      const employees = MOCK_EMPLOYEES_BY_FOCUS_GROUP[selectedFocusGroup] || [];
      setFocusGroupEmployees(employees);

      // Initialize all employees as selected (checked)
      const initialSelectionState: Record<string, boolean> = {};
      employees.forEach((emp: Employee) => {
        initialSelectionState[emp.employee_id] = true;
      });
      setSelectedFocusGroupEmployees(initialSelectionState);
      setShowEmployeeTable(true);
    } else {
      setFocusGroupEmployees([]);
      setSelectedFocusGroupEmployees({});
      setShowEmployeeTable(false);
    }
  }, [selectedFocusGroup]);

  const toggleTag = (tagName: string) => {
    if (metrics.includes(tagName)) {
      setMetrics(metrics.filter((tag) => tag !== tagName));
    } else {
      setMetrics([...metrics, tagName]);
    }
  };

  const handleEmployeeCheckboxChange = (
    employeeId: string,
    checked: boolean
  ) => {
    setSelectedFocusGroupEmployees((prev) => ({
      ...prev,
      [employeeId]: checked,
    }));
  };

  const addSelectedEmployeesFromFocusGroup = () => {
    // Get all selected employees from the current focus group
    const employeesToAdd = focusGroupEmployees.filter(
      (emp) => selectedFocusGroupEmployees[emp.employee_id]
    );

    // Add only employees that aren't already selected
    const newSelectedEmployees = [...selectedEmployees];
    employeesToAdd.forEach((emp) => {
      if (
        !newSelectedEmployees.some((e) => e.employee_id === emp.employee_id)
      ) {
        newSelectedEmployees.push(emp);
      }
    });

    setSelectedEmployees(newSelectedEmployees);
    setSelectedFocusGroup(null);
    setShowEmployeeTable(false);
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
      const submissionData = {
        title: groupName,
        description,
        metrics: metrics,
        participants: selectedEmployees.map((emp) => emp.employee_id),
      };

      console.log("Focus Group Submission Data:", submissionData);

      onSubmit(submissionData);
    }
  };

  const handleCancel = () => {
    console.log("Closing modal and resetting state");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full my-6 mx-auto">
        <div className="h-full max-h-[80vh] overflow-y-auto">
          <div className="p-4">
            {/* Header with Close Button */}
            <div className="mb-3 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {isEditMode ? "Edit Focus Group" : "Create Focus Group"}
                </h2>
                {isEditMode && (
                  <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Editing {editingFocusGroup?.name}
                  </div>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
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
                {metrics.length > 0 ? (
                  <ScrollArea className="w-full h-8">
                    <div className="flex items-center gap-2 py-0.5">
                      {metrics.map((tag, index) => (
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
                      ))}
                    </div>
                  </ScrollArea>
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
                <div className="mb-2 border border-gray-200 rounded-lg p-2">
                  <ScrollArea className="w-full h-10">
                    <div className="flex items-center gap-2 py-0.5">
                      {selectedEmployees.map((employee) => (
                        <span
                          key={employee.employee_id}
                          className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs shrink-0"
                        >
                          <span className="mx-1 font-medium">
                            {employee.employee_id}
                          </span>
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
                  </ScrollArea>
                </div>
              )}

              {/* Focus Group Dropdown */}
              <div className="space-y-4">
                <Select
                  onValueChange={(value) => setSelectedFocusGroup(value)}
                  value={selectedFocusGroup || undefined}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a focus group" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_FOCUS_GROUPS.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Employee Table */}
                {showEmployeeTable && (
                  <div className="border rounded-md mt-2">
                    <div className="max-h-[200px] overflow-y-auto">
                      <div className="w-full max-w-md mx-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[70%]">
                                Employee ID
                              </TableHead>
                              <TableHead className="w-[30%] text-right">
                                Select
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {focusGroupEmployees.map((employee) => (
                              <TableRow key={employee.employee_id}>
                                <TableCell className="font-medium">
                                  {employee.employee_id}
                                </TableCell>
                                <TableCell className="text-right">
                                  <Checkbox
                                    checked={
                                      selectedFocusGroupEmployees[
                                        employee.employee_id
                                      ] || false
                                    }
                                    onCheckedChange={(checked) =>
                                      handleEmployeeCheckboxChange(
                                        employee.employee_id,
                                        checked as boolean
                                      )
                                    }
                                    className="data-[state=checked]:bg-[#80C342] data-[state=checked]:border-[#80C342]"
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>

                    <div className="p-3 flex justify-end border-t">
                      <Button
                        onClick={addSelectedEmployeesFromFocusGroup}
                        className="bg-[#80C342] hover:bg-[#72b33b] text-white"
                      >
                        Add Selected Employees
                      </Button>
                    </div>
                  </div>
                )}
              </div>
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
                  ${isFormValid ? "bg-[#80C342] hover:bg-[#72b33b]" : "bg-[#80C342]/50 cursor-not-allowed"}`}
                onClick={handleSubmit}
                disabled={!isFormValid}
              >
                {isEditMode ? "Edit Focus Group" : "Create Focus Group"}
              </button>
            </div>
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
    </div>
  );
};

export default FocusGroupModal;

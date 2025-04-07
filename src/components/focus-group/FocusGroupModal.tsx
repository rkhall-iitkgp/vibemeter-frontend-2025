"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { type FC, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

// Simplified Employee interface - only with employee_id
interface Employee {
  employee_id: string
}

// Add a new interface for employees with scores
interface EmployeeWithScore extends Employee {
  score: number
}

// Updated MetrixSelection interface for multiple metrix data
interface MetrixSelection {
  metrixId: string | null
  minRange: string
  maxRange: string
}

// Updated FocusGroup interface to support multiple metrix selections
interface FocusGroup {
  name: string
  description: string
  metrics: string[]
  members: number
  focus_group_id: string
  // Add metrixSelections array for multiple metrix data
  metrixSelections?: MetrixSelection[]
  // Keep old properties for backward compatibility
  metrixId: string | null
  minRange: string
  maxRange: string
  created_at?: string
}

interface FocusGroupModalProps {
  onClose: () => void
  onSubmit: (focusGroup: {
    title: string
    description: string
    metrics: string[]
    participants: string[]
    // Add metrixSelections for multiple metrix data
    metrixSelections: MetrixSelection[]
    // Keep old properties for backward compatibility
    metrixId: string | null
    minRange: string
    maxRange: string
  }) => void
  editingFocusGroup?: FocusGroup | null
}

// Predefined tags with their colors
const PREDEFINED_TAGS = [
  { name: "Engagement", color: "bg-green-100 text-[#7CC243]" },
  { name: "Morality", color: "bg-amber-100 text-amber-800" },
  { name: "Cultural Score", color: "bg-pink-100 text-pink-800" },
  { name: "Leave Impact", color: "bg-green-100 text-[#7CC243]" },
  { name: "Leadership", color: "bg-blue-100 text-blue-800" },
  { name: "Innovation", color: "bg-purple-100 text-purple-800" },
]

// Our simplified mock data
const MOCK_MATRICES = [
  { metrixId: "m1", name: "Metrix 1" },
  { metrixId: "m2", name: "Metrix 2" },
  { metrixId: "m3", name: "Metrix 3" },
  { metrixId: "m4", name: "Metrix 4" },
  { metrixId: "m5", name: "Metrix 5" },
]

// Mock employees by focus group - simplified to only have employee_id
const MOCK_EMPLOYEES_BY_metrix: Record<string, EmployeeWithScore[]> = {
  m1: [
    { employee_id: "EMP10071", score: 75 },
    { employee_id: "EMP10072", score: 45 },
    { employee_id: "EMP10073", score: 90 },
    { employee_id: "EMP10074", score: 30 },
    { employee_id: "EMP10075", score: 60 },
  ],
  m2: [
    { employee_id: "EMP20071", score: 85 },
    { employee_id: "EMP20072", score: 55 },
    { employee_id: "EMP20073", score: 40 },
    { employee_id: "EMP20074", score: 70 },
    { employee_id: "EMP20075", score: 25 },
  ],
  m3: [
    { employee_id: "EMP30071", score: 65 },
    { employee_id: "EMP30072", score: 35 },
    { employee_id: "EMP30073", score: 80 },
    { employee_id: "EMP30074", score: 50 },
    { employee_id: "EMP30075", score: 95 },
  ],
  m4: [
    { employee_id: "EMP40071", score: 20 },
    { employee_id: "EMP40072", score: 60 },
    { employee_id: "EMP40073", score: 75 },
    { employee_id: "EMP40074", score: 45 },
    { employee_id: "EMP40075", score: 85 },
  ],
  m5: [
    { employee_id: "EMP50071", score: 55 },
    { employee_id: "EMP50072", score: 70 },
    { employee_id: "EMP50073", score: 30 },
    { employee_id: "EMP50074", score: 90 },
    { employee_id: "EMP50075", score: 40 },
  ],
}

// Add a function to get filtered employees count
const getFilteredEmployeesCount = (metrixId: string | null, min: number, max: number): number => {
  if (!metrixId) return 0

  const employees = MOCK_EMPLOYEES_BY_metrix[metrixId] || []
  return employees.filter((emp) => emp.score >= min && emp.score <= max).length
}

const FocusGroupModal: FC<FocusGroupModalProps> = ({ onClose, onSubmit, editingFocusGroup }) => {
  // Debug log for metrix selections
  const [metrixSelections, setmetrixSelections] = useState<MetrixSelection[]>([
    { metrixId: null, minRange: "0", maxRange: "100" },
  ])
  useEffect(() => {
    console.log("Current metrixSelections state:", metrixSelections)
  }, [metrixSelections])
  // Determine if in edit mode
  const isEditMode = !!editingFocusGroup

  console.log("metrixSelections: ", editingFocusGroup?.metrixSelections)

  // Log to help debug
  console.log("Modal opened with editing mode:", isEditMode)
  if (isEditMode) {
    console.log("Editing focus group data:", editingFocusGroup)
  }

  // Form state
  const [groupName, setGroupName] = useState("")
  const [description, setDescription] = useState("")
  const [metrics, setMetrics] = useState<string[]>([])
  const [tagSearchQuery, setTagSearchQuery] = useState("")
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([])
  const [minRange, setMinRange] = useState<string>("0")
  const [maxRange, setMaxRange] = useState<string>("100")

  // Tag popup state
  const [showTagsPopup, setShowTagsPopup] = useState(false)
  const [filteredTags, setFilteredTags] = useState(PREDEFINED_TAGS)

  // Focus group and employee selection state
  const [selectedFocusGroup, setSelectedFocusGroup] = useState<string | null>(null)
  const [focusGroupEmployees, setFocusGroupEmployees] = useState<EmployeeWithScore[]>([])
  const [selectedFocusGroupEmployees, setSelectedFocusGroupEmployees] = useState<Record<string, boolean>>({})

  // Initialize form data when editing
  // Initialize form data when editing
  useEffect(() => {
    if (editingFocusGroup) {
      console.log("Initializing form with focus group data", editingFocusGroup)

      // Set basic group information
      setGroupName(editingFocusGroup.name || "")
      setDescription(editingFocusGroup.description || "")
      setMetrics(editingFocusGroup.metrics || [])

      // Initialize metrix selections based on the data
      let initialMetrixSelections: MetrixSelection[] = []

      // Check if we have metrics array data to convert to metrixSelections
      if (
        Array.isArray(editingFocusGroup.metrics) &&
        editingFocusGroup.metrics.length > 0 &&
        editingFocusGroup.metrixId
      ) {
        // Create a metrixSelection for the existing metrixId
        initialMetrixSelections.push({
          metrixId: editingFocusGroup.metrixId,
          minRange: editingFocusGroup.minRange || "0",
          maxRange: editingFocusGroup.maxRange || "100",
        })
      }
      // If metrixSelections already exists, use it
      else if (Array.isArray(editingFocusGroup.metrixSelections) && editingFocusGroup.metrixSelections.length > 0) {
        initialMetrixSelections = [...editingFocusGroup.metrixSelections]
      }
      // Fallback to single metrix format
      else if (editingFocusGroup.metrixId) {
        initialMetrixSelections = [
          {
            metrixId: editingFocusGroup.metrixId,
            minRange: editingFocusGroup.minRange || "0",
            maxRange: editingFocusGroup.maxRange || "100",
          },
        ]
      }

      // If we still have no selections, add a default one
      if (initialMetrixSelections.length === 0) {
        initialMetrixSelections = [{ metrixId: null, minRange: "0", maxRange: "100" }]
      }

      console.log("Setting initial metrix selections:", initialMetrixSelections)
      setmetrixSelections(initialMetrixSelections)

      // Set the first metrix as selected for the UI
      if (initialMetrixSelections[0]?.metrixId) {
        setSelectedFocusGroup(initialMetrixSelections[0].metrixId)
        setMinRange(initialMetrixSelections[0].minRange)
        setMaxRange(initialMetrixSelections[0].maxRange)
      }

      // Initialize selected employees
      if (editingFocusGroup.members > 0) {
        // In a real app, you'd fetch the actual participants
        // This is just a simulation for mock data
        const mockSelectedEmployees = Object.values(MOCK_EMPLOYEES_BY_metrix).flat().slice(0, editingFocusGroup.members)
        setSelectedEmployees(mockSelectedEmployees)
      }
    } else {
      // Reset form when not editing
      setGroupName("")
      setDescription("")
      setMetrics([])
      setSelectedEmployees([])
      setmetrixSelections([{ metrixId: null, minRange: "0", maxRange: "100" }])
      setSelectedFocusGroup(null)
      setMinRange("0")
      setMaxRange("100")
    }
  }, [editingFocusGroup])

  // Check if form is valid to enable the submit button
  const isFormValid = groupName.trim() !== "" && description.trim() !== ""

  // Handle tag search
  useEffect(() => {
    if (tagSearchQuery.trim() === "") {
      setFilteredTags(PREDEFINED_TAGS)
    } else {
      const filtered = PREDEFINED_TAGS.filter((tag) => tag.name.toLowerCase().includes(tagSearchQuery.toLowerCase()))
      setFilteredTags(filtered)
    }
  }, [tagSearchQuery])

  // Handle metrix selection
  useEffect(() => {
    if (selectedFocusGroup) {
      const employees = MOCK_EMPLOYEES_BY_metrix[selectedFocusGroup] || []
      setFocusGroupEmployees(employees)

      // Initialize all employees as selected (checked)
      const initialSelectionState: Record<string, boolean> = {}
      employees.forEach((emp: EmployeeWithScore) => {
        initialSelectionState[emp.employee_id] = true
      })
      setSelectedFocusGroupEmployees(initialSelectionState)
    } else {
      setFocusGroupEmployees([])
      setSelectedFocusGroupEmployees({})
    }
  }, [selectedFocusGroup])

  const toggleTag = (tagName: string) => {
    if (metrics.includes(tagName)) {
      setMetrics(metrics.filter((tag) => tag !== tagName))
    } else {
      setMetrics([...metrics, tagName])
    }
  }

  const getTagColor = (tagName: string) => {
    const tag = PREDEFINED_TAGS.find((t) => t.name === tagName)
    return tag ? tag.color : "bg-gray-100 text-gray-800"
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setMetrics(metrics.filter((tag) => tag !== tagToRemove))
  }

  const handleRemoveEmployee = (employeeId: string) => {
    setSelectedEmployees(selectedEmployees.filter((employee) => employee.employee_id !== employeeId))
  }

  // Helper function to get the metrix name by ID
  const getmetrixNameById = (metrixId: string | null) => {
    if (!metrixId) return "Select a metrix"
    const metrix = MOCK_MATRICES.find((m) => m.metrixId === metrixId)
    return metrix ? metrix.name : "Select a metrix"
  }

  // Update the handleSubmit function to include the filtered employees from all metrix selections
  const handleSubmit = () => {
    if (isFormValid) {
      // Get filtered employees from all metrix selections
      let participants: string[] = []

      if (metrixSelections.some((selection) => selection.metrixId)) {
        // Collect participants from all metrix selections
        metrixSelections.forEach((selection) => {
          if (selection.metrixId) {
            const min = Number.parseInt(selection.minRange) || 0
            const max = Number.parseInt(selection.maxRange) || 100

            const filteredEmployees = MOCK_EMPLOYEES_BY_metrix[selection.metrixId]
              .filter((emp) => emp.score >= min && emp.score <= max)
              .map((emp) => emp.employee_id)

            // Add to participants without duplicates
            filteredEmployees.forEach((empId) => {
              if (!participants.includes(empId)) {
                participants.push(empId)
              }
            })
          }
        })
      } else {
        participants = selectedEmployees.map((emp) => emp.employee_id)
      }

      // Clean up metrix selections to remove any with null metrixId
      const validMetrixSelections = metrixSelections
        .filter((selection) => selection.metrixId !== null)
        .map((selection) => ({
          metrixId: selection.metrixId,
          minRange: selection.minRange,
          maxRange: selection.maxRange,
        }))

      const submissionData = {
        title: groupName,
        description,
        metrics: metrics,
        participants: participants,
        // Include all metrix selections
        metrixSelections: validMetrixSelections,
        // Keep the old properties for backward compatibility
        metrixId: validMetrixSelections.length > 0 ? validMetrixSelections[0].metrixId : null,
        minRange: validMetrixSelections.length > 0 ? validMetrixSelections[0].minRange : "0",
        maxRange: validMetrixSelections.length > 0 ? validMetrixSelections[0].maxRange : "100",
      }

      console.log("Metrix Submission Data:", submissionData)

      onSubmit(submissionData)
    }
  }

  const handleCancel = () => {
    console.log("Closing modal and resetting state")
    onClose()
  }

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
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
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
              <label htmlFor="groupName" className="block text-md font-medium text-gray-900 mb-1">
                Focus Group
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
              <label htmlFor="description" className="block text-md font-medium text-gray-900 mb-1">
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
              <label htmlFor="tags" className="block text-md font-medium text-gray-900 mb-1">
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
                              e.stopPropagation()
                              handleRemoveTag(tag)
                            }}
                          >
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    <svg className="mr-2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                <label htmlFor="participants" className="block text-md font-medium text-gray-900">
                  Participants
                </label>
                <span className="text-gray-500 text-sm">
                  {metrixSelections.reduce((total, selection) => {
                    if (selection.metrixId) {
                      return (
                        total +
                        getFilteredEmployeesCount(
                          selection.metrixId,
                          Number.parseInt(selection.minRange) || 0,
                          Number.parseInt(selection.maxRange) || 100,
                        )
                      )
                    }
                    return total
                  }, 0)}{" "}
                  members
                </span>
              </div>

              {/* metrix Selection and Range Filter */}
              <div className="space-y-4">
                {metrixSelections.map((selection, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <div className="w-1/2">
                      <Select
                        onValueChange={(value) => {
                          const newSelections = [...metrixSelections]
                          newSelections[index].metrixId = value
                          setmetrixSelections(newSelections)
                          if (index === 0) {
                            setSelectedFocusGroup(value)
                          }
                        }}
                        value={selection.metrixId || ""}
                        defaultValue={selection.metrixId || ""}
                      >
                        <SelectTrigger className="w-full h-10">
                          <SelectValue placeholder="Select a metrix">
                            {getmetrixNameById(selection.metrixId)}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {MOCK_MATRICES.map((metrix) => (
                            <SelectItem key={metrix.metrixId} value={metrix.metrixId}>
                              {metrix.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center ml-auto gap-2">
                      <input
                        type="number"
                        className="w-17 h-10 px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        value={selection.minRange}
                        onChange={(e) => {
                          const newSelections = [...metrixSelections]
                          newSelections[index].minRange = e.target.value
                          setmetrixSelections(newSelections)
                          if (index === 0) {
                            setMinRange(e.target.value)
                          }
                        }}
                        min="0"
                        max="100"
                      />
                      <input
                        type="number"
                        className="w-17 h-10 px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="100"
                        value={selection.maxRange}
                        onChange={(e) => {
                          const newSelections = [...metrixSelections]
                          newSelections[index].maxRange = e.target.value
                          setmetrixSelections(newSelections)
                          if (index === 0) {
                            setMaxRange(e.target.value)
                          }
                        }}
                        min="0"
                        max="100"
                      />
                    </div>
                    {/* Display filtered employee count */}
                    {selection.metrixId && (
                      <div className="w-1/10 p-2 border rounded-md bg-gray-50 ml-3">
                        <p className="text-center">
                          <span className="font-medium">
                            {getFilteredEmployeesCount(
                              selection.metrixId,
                              Number.parseInt(selection.minRange) || 0,
                              Number.parseInt(selection.maxRange) || 100,
                            )}
                          </span>{" "}
                        </p>
                      </div>
                    )}
                    {/* Delete button - only show for rows after the first one */}
                    {index > 0 && (
                      <button
                        type="button"
                        className="text-gray-500 hover:text-red-500 ml-2"
                        onClick={() => {
                          const newSelections = [...metrixSelections]
                          newSelections.splice(index, 1)
                          setmetrixSelections(newSelections)
                        }}
                        aria-label="Delete metrix selection"
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
                    )}
                  </div>
                ))}

                {/* Add button for new metrix selection */}
                <div className="flex justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-2"
                    onClick={() => {
                      setmetrixSelections([...metrixSelections, { metrixId: null, minRange: "0", maxRange: "100" }])
                    }}
                  >
                    Add metrix Selection
                  </Button>
                </div>
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
        <div className="fixed inset-0 z-[60]" onClick={() => setShowTagsPopup(false)}>
          <div
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="p-3 border-b border-gray-200">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
  )
}

export default FocusGroupModal


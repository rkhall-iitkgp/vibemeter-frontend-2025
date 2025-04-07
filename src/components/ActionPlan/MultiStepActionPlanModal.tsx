import { X, ArrowRight, Edit, Check } from "lucide-react";
import { ActionPlan, FocusGroup } from "@/types";
import { useState, useEffect } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

// Step components
enum FormStep {
  BasicInfo = 0,
  TargetGroupsMetrics = 1,
  ActionSteps = 2,
}

interface Step {
  title: string;
  description: string;
}

interface ActionPlanFormValues {
  title: string;
  purpose: string;
  is_completed: boolean;
  target_groups: { focus_group_id: string }[];
  metric: string[];
  steps: Step[];
}

interface MultiStepActionPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ActionPlanFormValues) => Promise<void>;
  plan?: ActionPlan;
  focusGroups?: FocusGroup[];
  metrics?: string[];
  isSubmitting: boolean;
  onAfterClose?: () => void; // Optional prop for triggering reload
}

const MultiStepActionPlanModal = ({
  isOpen,
  onClose,
  onSubmit,
  plan,
  focusGroups = [],
  metrics = [],
  isSubmitting,
  onAfterClose,
}: MultiStepActionPlanModalProps) => {
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.BasicInfo);
  const [newStep, setNewStep] = useState<{
    title: string;
    description: string;
  }>({
    title: "",
    description: "",
  });
  const [newGroupInput, setNewGroupInput] = useState("");
  const [editingStepIndex, setEditingStepIndex] = useState<number | null>(null);

  const [formValues, setFormValues] = useState<ActionPlanFormValues>({
    title: "",
    purpose: "",
    is_completed: false,
    target_groups: [],
    metric: [],
    steps: [],
  });

  // For the UI components
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [currentStepNumber, setCurrentStepNumber] = useState(1);

  // Determine if we're editing or creating new
  const isEditing = !!plan;
  const modalTitle = isEditing ? "Edit Initiative" : "Create Initiative";
  const modalSubtitle = "Design your next big impact";

  const handleClose = () => {
    // Call the onClose function passed from parent
    onClose();

    // After closing, trigger the reload callback if provided
    if (onAfterClose) {
      // Small delay to ensure modal is closed before reload
      setTimeout(() => {
        onAfterClose();
      }, 100);
    }
  };

  // Extract focus_group_ids from target_groups
  const extractFocusGroupIds = (targetGroups: FocusGroup[]): string[] => {
    return targetGroups
      .map((group) => {
        if (typeof group === "string") return group;
        if (typeof group === "object") {
          return group.focus_group_id || "";
        }
        return "";
      })
      .filter((id) => id !== "");
  };

  // Reset form when modal opens or plan changes
  useEffect(() => {
    if (isOpen && plan) {
      // If editing, populate with existing data
      const targetGroups = Array.isArray(plan.target_groups)
        ? plan.target_groups
        : [];

      // Extract IDs for the UI
      const groupIds = extractFocusGroupIds(targetGroups);
      setSelectedGroupIds(groupIds);

      // Extract group names for display
      const groupNames = targetGroups
        .map((group) =>
          typeof group === "object" && group.name ? group.name : ""
        )
        .filter((name) => name !== "");
      setSelectedGroups(groupNames);

      // Set form values
      setFormValues({
        title: plan.title || "",
        purpose: plan.purpose || "",
        is_completed: plan.is_completed || false,
        target_groups: groupIds.map((id) => ({ focus_group_id: id })),
        metric: plan.metric || [],
        steps: plan.steps || [],
      });
    } else if (isOpen) {
      // If creating new, reset form
      setFormValues({
        title: "",
        purpose: "",
        is_completed: false,
        target_groups: [],
        metric: [],
        steps: [],
      });
      setSelectedGroupIds([]);
      setSelectedGroups([]);
      setCurrentStep(FormStep.BasicInfo);
      setCurrentStepNumber(1);
      setEditingStepIndex(null);
    }
  }, [isOpen, plan]);

  // Validation functions for each step
  const validateBasicInfo = () => {
    return !!formValues.title && !!formValues.purpose;
  };

  const validateTargetGroups = () => {
    return formValues.target_groups.length > 0;
  };

  const validateMetrics = () => {
    return formValues.metric.length > 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleStepInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    const { value } = e.target;
    setNewStep((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddStep = () => {
    if (newStep.description) {
      setFormValues((prev) => ({
        ...prev,
        steps: [
          ...prev.steps,
          {
            title: newStep.title || `Step ${prev.steps.length + 1}`,
            description: newStep.description,
          },
        ],
      }));
      setNewStep({ title: "", description: "" });
    }
  };

  const handleRemoveStep = (index: number) => {
    setFormValues((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index),
    }));
  };

  // Edit step functions
  const handleStartEditStep = (index: number) => {
    const stepToEdit = formValues.steps[index];
    setNewStep({
      title: stepToEdit.title || `Step ${index + 1}`,
      description: stepToEdit.description,
    });
    setEditingStepIndex(index);
  };

  const handleSaveEditStep = () => {
    if (editingStepIndex === null || !newStep.description) return;

    setFormValues((prev) => ({
      ...prev,
      steps: prev.steps.map((step, index) =>
        index === editingStepIndex
          ? {
              title: newStep.title || `Step ${index + 1}`,
              description: newStep.description,
            }
          : step
      ),
    }));

    // Reset editing state
    setNewStep({ title: "", description: "" });
    setEditingStepIndex(null);
  };

  const handleCancelEditStep = () => {
    setNewStep({ title: "", description: "" });
    setEditingStepIndex(null);
  };

  const handleAddGroup = () => {
    if (newGroupInput) {
      // Find if the input matches any existing focus group
      const matchedGroups = focusGroups.filter((group) =>
        group.name.toLowerCase().includes(newGroupInput.toLowerCase())
      );

      // If there's an exact match, add it
      const exactMatch = matchedGroups.find(
        (group) => group.name.toLowerCase() === newGroupInput.toLowerCase()
      );

      if (exactMatch && !selectedGroupIds.includes(exactMatch.focus_group_id)) {
        setSelectedGroupIds((prev) => [...prev, exactMatch.focus_group_id]);
        setSelectedGroups((prev) => [...prev, exactMatch.name]);
        setFormValues((prev) => ({
          ...prev,
          target_groups: [
            ...prev.target_groups,
            { focus_group_id: exactMatch.focus_group_id },
          ],
        }));
      }

      // Reset input field (this will now filter back to showing all groups)
      setNewGroupInput("");
    }
  };

  const handleRemoveGroup = (groupName: string) => {
    // Find the group to remove
    const indexToRemove = selectedGroups.indexOf(groupName);
    if (indexToRemove !== -1) {
      // Get the ID to remove
      const idToRemove = selectedGroupIds[indexToRemove];

      // Update selected groups
      setSelectedGroups((prev) => prev.filter((_, i) => i !== indexToRemove));
      setSelectedGroupIds((prev) => prev.filter((_, i) => i !== indexToRemove));

      // Update form values
      setFormValues((prev) => ({
        ...prev,
        target_groups: prev.target_groups.filter(
          (group) => group.focus_group_id !== idToRemove
        ),
      }));
    }
  };

  const handleMetricChange = (metric: string) => {
    // Toggle metric selection
    setFormValues((prev) => {
      if (prev.metric.includes(metric)) {
        return {
          ...prev,
          metric: prev.metric.filter((m) => m !== metric),
        };
      } else {
        return {
          ...prev,
          metric: [...prev.metric, metric],
        };
      }
    });
  };

  const handleContinue = () => {
    if (currentStep === FormStep.BasicInfo && validateBasicInfo()) {
      setCurrentStep(FormStep.TargetGroupsMetrics);
      setCurrentStepNumber(2);
    } else if (
      currentStep === FormStep.TargetGroupsMetrics &&
      validateTargetGroups() &&
      validateMetrics()
    ) {
      setCurrentStep(FormStep.ActionSteps);
      setCurrentStepNumber(3);
    }
  };

  const handleBack = () => {
    if (currentStep === FormStep.TargetGroupsMetrics) {
      setCurrentStep(FormStep.BasicInfo);
      setCurrentStepNumber(1);
    } else if (currentStep === FormStep.ActionSteps) {
      setCurrentStep(FormStep.TargetGroupsMetrics);
      setCurrentStepNumber(2);
    }
  };

  const handleSubmit = async () => {
    try {
      // Determine if we're editing or creating new
      if (isEditing && plan) {
        // Format data according to the ActionData model for editing
        const formattedData = {
          action_id: plan.action_id,
          title: formValues.title,
          purpose: formValues.purpose,
          metric: formValues.metric,
          target_groups: formValues.target_groups.map(
            (group) => group.focus_group_id
          ),
          steps: formValues.steps,
          is_completed: formValues.is_completed,
          created_at: plan.created_at,
        };

        console.log(
          "Updating action plan:",
          JSON.stringify(formattedData, null, 2)
        );
        await onSubmit(formattedData);

        // Close the modal and trigger reload
        handleClose();
      } else {
        // Format data according to the ActionCreate model for new action
        const formattedData = {
          title: formValues.title,
          purpose: formValues.purpose,
          metric: formValues.metric,
          target_groups: formValues.target_groups.map(
            (group) => group.focus_group_id
          ),
          steps: formValues.steps,
          is_completed: formValues.is_completed,
        };

        console.log(
          "Creating action plan:",
          JSON.stringify(formattedData, null, 2)
        );
        await onSubmit(formattedData);

        // Close the modal and trigger reload
        handleClose();
      }
    } catch (error) {
      console.error("Error submitting action plan:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // If text is entered, try to add as a group
      if (newGroupInput.trim()) {
        handleAddGroup();
      } else {
        // If no text, do nothing
        return;
      }
    }
  };

  // Filter groups based on search input
  const filteredGroups = newGroupInput
    ? focusGroups.filter((group) =>
        group.name.toLowerCase().includes(newGroupInput.toLowerCase())
      )
    : focusGroups;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-[#86BC25] rounded-full flex items-center justify-center">
              <div className="text-white">
                <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                  <path
                    d="M12 2v6m0 8v6M4.93 4.93l4.24 4.24m5.66 5.66l4.24 4.24M2 12h6m8 0h6M4.93 19.07l4.24-4.24m5.66-5.66l4.24-4.24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {modalTitle}
              </h2>
              <p className="text-sm text-gray-500">{modalSubtitle}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
            disabled={isSubmitting}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation tabs - Redesigned to match screenshots */}
        <div className="flex border-b">
          <button
            className={`flex-1 py-4 text-center ${
              currentStep === FormStep.BasicInfo
                ? "border-b-2 border-[#86BC25] text-[#86BC25] font-medium"
                : "text-gray-500"
            }`}
            onClick={() => {
              setCurrentStep(FormStep.BasicInfo);
              setCurrentStepNumber(1);
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path
                  d="M12 8v4m0 4h.01"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span>Basic Info</span>
            </div>
          </button>
          <button
            className={`flex-1 py-4 text-center ${
              currentStep === FormStep.TargetGroupsMetrics
                ? "border-b-2 border-[#86BC25] text-[#86BC25] font-medium"
                : !validateBasicInfo()
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-500"
            }`}
            onClick={() => {
              if (validateBasicInfo()) {
                setCurrentStep(FormStep.TargetGroupsMetrics);
                setCurrentStepNumber(2);
              }
            }}
            disabled={!validateBasicInfo()}
          >
            <div className="flex items-center justify-center gap-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Target Groups & Metrics</span>
            </div>
          </button>
          <button
            className={`flex-1 py-4 text-center ${
              currentStep === FormStep.ActionSteps
                ? "border-b-2 border-[#86BC25] text-[#86BC25] font-medium"
                : !validateBasicInfo() ||
                    !validateTargetGroups() ||
                    !validateMetrics()
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-500"
            }`}
            onClick={() => {
              if (
                validateBasicInfo() &&
                validateTargetGroups() &&
                validateMetrics()
              ) {
                setCurrentStep(FormStep.ActionSteps);
                setCurrentStepNumber(3);
              }
            }}
            disabled={
              !validateBasicInfo() ||
              !validateTargetGroups() ||
              !validateMetrics()
            }
          >
            <div className="flex items-center justify-center gap-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Action Steps</span>
            </div>
          </button>
        </div>

        <div className="p-6 max-h-[calc(100vh-240px)] overflow-y-auto">
          {/* Basic Info Step */}
          {currentStep === FormStep.BasicInfo && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <span className="bg-gray-200 w-6 h-6 rounded-full flex items-center justify-center mr-2">
                    1
                  </span>
                  Title
                </label>
                <Input
                  name="title"
                  value={formValues.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter a catchy initiative title"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <span className="bg-gray-200 w-6 h-6 rounded-full flex items-center justify-center mr-2">
                    2
                  </span>
                  Purpose
                </label>
                <Textarea
                  name="purpose"
                  value={formValues.purpose}
                  onChange={handleInputChange}
                  required
                  placeholder="What impact will this initiative create? Be specific and inspiring."
                  className="w-full min-h-[120px]"
                />
              </div>
            </div>
          )}

          {/* Target Groups & Metrics Step */}
          {currentStep === FormStep.TargetGroupsMetrics && (
            <div className="space-y-8">
              {/* Target Groups */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <span className="bg-gray-200 w-6 h-6 rounded-full flex items-center justify-center mr-2">
                    3
                  </span>
                  Target Groups
                </label>

                <div className="rounded-md border border-gray-200 p-4">
                  {/* Display selected groups */}
                  {selectedGroups.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {selectedGroups.map((group, index) => (
                        <div
                          key={index}
                          className="bg-green-100 rounded-full px-3 py-1 flex items-center gap-1"
                        >
                          <span className="text-sm text-green-800">
                            {group}
                          </span>
                          <button
                            onClick={() => handleRemoveGroup(group)}
                            className="text-green-800 hover:text-green-900"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <Input
                    value={newGroupInput}
                    onChange={(e) => setNewGroupInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add target group and press Enter"
                    className="w-full"
                  />

                  {/* List of available groups */}
                  <div className="h-36 overflow-y-auto bg-white border border-gray-100 rounded-md mt-3">
                    {filteredGroups.map((group) => (
                      <div
                        key={group.focus_group_id}
                        className="py-2 px-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between border-b border-gray-100 last:border-b-0"
                        onClick={() => {
                          if (
                            !selectedGroupIds.includes(group.focus_group_id)
                          ) {
                            // Add to selected IDs and names for UI
                            setSelectedGroupIds((prev) => [
                              ...prev,
                              group.focus_group_id,
                            ]);
                            setSelectedGroups((prev) => [...prev, group.name]);

                            // Add to form values in format expected by API
                            setFormValues((prev) => ({
                              ...prev,
                              target_groups: [
                                ...prev.target_groups,
                                { focus_group_id: group.focus_group_id },
                              ],
                            }));
                          }
                        }}
                      >
                        <span>{group.name}</span>
                        {selectedGroupIds.includes(group.focus_group_id) && (
                          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white">
                            <Check size={12} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <span className="bg-gray-200 w-6 h-6 rounded-full flex items-center justify-center mr-2">
                    4
                  </span>
                  Metrics
                </label>

                <div className="rounded-md border border-gray-200 p-2">
                  <div className="flex flex-wrap gap-2 p-2">
                    {metrics.map((metric) => (
                      <button
                        key={metric}
                        type="button"
                        onClick={() => handleMetricChange(metric)}
                        className={`rounded-full px-3 py-1 text-sm border flex items-center gap-1 ${
                          formValues.metric.includes(metric)
                            ? "bg-[#eef7e2] border-[#86BC25] text-[#86BC25]"
                            : "bg-white border-gray-200 text-gray-600"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            formValues.metric.includes(metric)
                              ? "bg-[#86BC25]"
                              : "bg-gray-300"
                          }`}
                        />
                        <span>{metric}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Steps */}
          {currentStep === FormStep.ActionSteps && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <span className="bg-gray-200 w-6 h-6 rounded-full flex items-center justify-center mr-2">
                    5
                  </span>
                  Steps
                </label>

                {/* Display existing steps */}
                {formValues.steps.length > 0 && (
                  <div className="mb-6 space-y-4">
                    {formValues.steps.map((step, index) => (
                      <div
                        key={index}
                        className={`border rounded-md bg-white p-4 relative ${
                          editingStepIndex === index
                            ? "border-[#86BC25] bg-[#f9fcf5]"
                            : "border-green-200"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-[#86BC25] rounded-full flex items-center justify-center text-white mr-3">
                              {index + 1}
                            </div>
                            <h3 className="font-medium">
                              {step.title || `Step ${index + 1}`}
                            </h3>
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              className={`${
                                editingStepIndex === index
                                  ? "text-[#86BC25]"
                                  : "text-gray-400 hover:text-gray-600"
                              }`}
                              onClick={() => handleStartEditStep(index)}
                              disabled={
                                editingStepIndex !== null &&
                                editingStepIndex !== index
                              }
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              type="button"
                              className="text-gray-400 hover:text-red-500"
                              onClick={() => handleRemoveStep(index)}
                              disabled={editingStepIndex !== null}
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                        <p className="mt-2 text-gray-600 pl-11">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add/Edit step form */}
                <div className="border border-gray-200 rounded-md bg-white p-4">
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {editingStepIndex !== null
                        ? `Edit Step ${editingStepIndex + 1}`
                        : `Step ${formValues.steps.length + 1}`}
                      : Title
                    </label>
                    <Input
                      value={newStep.title}
                      onChange={(e) => handleStepInputChange(e, "title")}
                      placeholder="Enter step title"
                      className="w-full"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <Textarea
                      value={newStep.description}
                      onChange={(e) => handleStepInputChange(e, "description")}
                      placeholder="Outline the key steps required for this initiative. Be clear and actionable."
                      className="w-full min-h-[100px]"
                    />
                  </div>

                  <div className="flex gap-2">
                    {editingStepIndex !== null ? (
                      <>
                        <button
                          type="button"
                          onClick={handleCancelEditStep}
                          className="px-4 py-2 rounded-md text-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleSaveEditStep}
                          disabled={!newStep.description}
                          className={`px-4 py-2 rounded-md text-sm ${
                            !newStep.description
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-[#86BC25] text-white hover:bg-[#75a621]"
                          }`}
                        >
                          Save Changes
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={handleAddStep}
                        disabled={!newStep.description}
                        className={`px-4 py-2 rounded-md text-sm ${
                          !newStep.description
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        Add Step
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with progress indicator and buttons */}
        <div className="flex justify-between items-center p-6 border-t">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step <= currentStepNumber
                      ? "bg-[#86BC25] text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-8 h-0.5 ${
                      step < currentStepNumber ? "bg-[#86BC25]" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            {currentStep > 0 && (
              <Button
                type="button"
                onClick={handleBack}
                className="bg-white border hover:bg-gray-50 text-gray-700"
                disabled={isSubmitting}
              >
                Back
              </Button>
            )}

            {currentStep < FormStep.ActionSteps && (
              <Button
                type="button"
                onClick={handleContinue}
                className="bg-[#86BC25] hover:bg-[#75a621] text-white"
                disabled={
                  (currentStep === FormStep.BasicInfo &&
                    !validateBasicInfo()) ||
                  (currentStep === FormStep.TargetGroupsMetrics &&
                    (!validateTargetGroups() || !validateMetrics()))
                }
              >
                Continue <ArrowRight size={16} className="ml-1" />
              </Button>
            )}

            {currentStep === FormStep.ActionSteps && (
              <Button
                type="button"
                onClick={handleSubmit}
                className="bg-[#86BC25] hover:bg-[#75a621] text-white"
                disabled={
                  isSubmitting ||
                  !validateBasicInfo() ||
                  !validateTargetGroups() ||
                  !validateMetrics()
                }
              >
                {isSubmitting ? "Saving..." : "Apply Initiative"}{" "}
                <ArrowRight size={16} className="ml-1" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepActionPlanModal;

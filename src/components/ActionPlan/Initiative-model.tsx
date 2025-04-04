import { FC, useState, useRef, useEffect, KeyboardEvent, useMemo } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

interface ActionStep {
  id: number;
  title: string;
  description: string;
}

interface InitiativeModalProps {
  onClose: () => void;
}

const InitiativeModal: FC<InitiativeModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<
    "basicInfo" | "targetGroups" | "actionSteps"
  >("basicInfo");
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: "0%",
    width: "33.333%",
  });

  // Basic Info state
  const [title, setTitle] = useState("");
  const [purpose, setPurpose] = useState("");

  // Target Groups state
  const [targetGroups, setTargetGroups] = useState<string[]>([]);
  const [targetGroupInput, setTargetGroupInput] = useState("");
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(["Morale"]);
  const [isMetricDropdownOpen, setIsMetricDropdownOpen] = useState(false);

  // Action Steps state
  const [actionSteps, setActionSteps] = useState<ActionStep[]>([]);
  const [stepTitle, setStepTitle] = useState("");
  const [stepDescription, setStepDescription] = useState("");
  const [editingStepId, setEditingStepId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Validation state
  const [showBasicInfoError, setShowBasicInfoError] = useState(false);
  const [showTargetGroupsError, setShowTargetGroupsError] = useState(false);

  // Track completed tabs
  const [completedTabs, setCompletedTabs] = useState<string[]>([]);

  const metrics = [
    "Morale",
    "Engagement",
    "Cultural Score",
    "Leave Impact",
    "Team Collaboration",
    "Innovation",
    "Customer Satisfaction",
    "Productivity",
    "Leadership",
    "Professional Growth",
    "Work-Life Balance",
    "Retention Rate",
  ];

  const basicInfoRef = useRef<HTMLButtonElement>(null);
  const targetGroupsRef = useRef<HTMLButtonElement>(null);
  const actionStepsRef = useRef<HTMLButtonElement>(null);

  const tabRefs = useMemo(
    () => ({
      basicInfo: basicInfoRef,
      targetGroups: targetGroupsRef,
      actionSteps: actionStepsRef,
    }),
    []
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const currentTabRef = tabRefs[activeTab]?.current;
    if (currentTabRef) {
      const parentWidth = currentTabRef.parentElement?.clientWidth || 0;
      const tabWidth = currentTabRef.clientWidth;
      const tabLeft = currentTabRef.offsetLeft;

      setIndicatorStyle({
        left: `${(tabLeft / parentWidth) * 100}%`,
        width: `${(tabWidth / parentWidth) * 100}%`,
      });
    }
  }, [activeTab, tabRefs]);

  const submitInitiativeData = () => {
    // Format the data according to the required structure
    const formattedData = {
      title: title,
      purpose: purpose,
      metric: selectedMetrics,
      target_groups: targetGroups,
      steps: actionSteps.map(step => step.title),
      is_completed: false
    };
  
    // Log the formatted data (for testing)
    console.log('Submitting initiative data:', formattedData);
  
    // Here you would typically send this data to your API
    // Example using fetch:
    fetch(`${BACKEND_URL}:8000/api/actions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // Close the modal or show success message
        onClose();
        window.location.reload()
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error (show error message, etc.)
      });
  };

  const isBasicInfoValid = () => {
    return title.trim() !== "" && purpose.trim() !== "";
  };

  const isTargetGroupsValid = () => {
    return targetGroups.length > 0 && selectedMetrics.length > 0;
  };

  const goToNextTab = () => {
    if (activeTab === "basicInfo") {
      if (isBasicInfoValid()) {
        if (!completedTabs.includes("basicInfo")) {
          setCompletedTabs([...completedTabs, "basicInfo"]);
        }
        setShowBasicInfoError(false);
        setActiveTab("targetGroups");
      } else {
        setShowBasicInfoError(true);
      }
    } else if (activeTab === "targetGroups") {
      if (isTargetGroupsValid()) {
        if (!completedTabs.includes("targetGroups")) {
          setCompletedTabs([...completedTabs, "targetGroups"]);
        }
        setShowTargetGroupsError(false);
        setActiveTab("actionSteps");
      } else {
        setShowTargetGroupsError(true);
      }
    }
  };

  const goToPrevTab = () => {
    if (activeTab === "targetGroups") {
      setActiveTab("basicInfo");
    } else if (activeTab === "actionSteps") {
      setActiveTab("targetGroups");
    }
  };

  const addTargetGroup = () => {
    if (
      targetGroupInput.trim() !== "" &&
      !targetGroups.includes(targetGroupInput.trim())
    ) {
      setTargetGroups([...targetGroups, targetGroupInput.trim()]);
      setTargetGroupInput("");
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const removeTargetGroup = (group: string) => {
    setTargetGroups(targetGroups.filter((g) => g !== group));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTargetGroup();
    }
  };

  const toggleMetricDropdown = () => {
    setIsMetricDropdownOpen(!isMetricDropdownOpen);
  };

  const toggleMetric = (metric: string) => {
    if (selectedMetrics.includes(metric)) {
      setSelectedMetrics(selectedMetrics.filter((m) => m !== metric));
    } else {
      setSelectedMetrics([...selectedMetrics, metric]);
    }
  };

  const addActionStep = () => {
    if (stepTitle.trim() !== "") {
      const newStep: ActionStep = {
        id: actionSteps.length + 1,
        title: stepTitle.trim(),
        description: stepDescription.trim(),
      };

      setActionSteps([...actionSteps, newStep]);
      setStepTitle("");
      setStepDescription("");

      if (titleInputRef.current) {
        titleInputRef.current.focus();
      }
    }
  };

  const updateActionStep = () => {
    if (editingStepId !== null && stepTitle.trim() !== "") {
      setActionSteps((prev) =>
        prev.map((step) =>
          step.id === editingStepId
            ? {
                ...step,
                title: stepTitle.trim(),
                description: stepDescription.trim(),
              }
            : step
        )
      );
      setStepTitle("");
      setStepDescription("");
      setEditingStepId(null);
      setIsEditing(false);
    }
  };

  const startEditingStep = (step: ActionStep) => {
    setStepTitle(step.title);
    setStepDescription(step.description);
    setEditingStepId(step.id);
    setIsEditing(true);

    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  };

  const cancelEditing = () => {
    setStepTitle("");
    setStepDescription("");
    setEditingStepId(null);
    setIsEditing(false);
  };

  const removeActionStep = (id: number) => {
    setActionSteps(actionSteps.filter((step) => step.id !== id));

    // Reorder remaining steps
    setActionSteps((prev) =>
      prev.map((step, index) => ({
        ...step,
        id: index + 1,
      }))
    );
  };

  // Helper function to determine progress bar status
  //   const getProgressStatus = (tabName: string) => {
  //     if (completedTabs.includes(tabName)) return "completed";
  //     if (activeTab === tabName) return "active";
  //     return "pending";
  //   };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/50">
      <div className="w-full max-w-5xl rounded-lg bg-white shadow-xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div className="flex items-center">
            <div className="mr-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#80C342]">
              <svg
                className="h-8 w-8 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Create Initiative
              </h2>
              <p className="text-gray-600">Design your next big impact</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <svg
              className="h-6 w-6"
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
        </div>

        {/* Tabs Navigation */}
        <div className="relative flex w-full border-b border-gray-200">
          <button
            ref={tabRefs.basicInfo}
            className={`flex flex-1 items-center justify-center px-6 py-4 text-base font-medium transition-colors duration-200 ${
              activeTab === "basicInfo"
                ? "text-[#80C342]"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("basicInfo")}
          >
            <svg
              className="mr-2 h-5 w-5"
              
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                stroke={activeTab === "basicInfo" ? "#80C342" : "#6b7280"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Basic Info
          </button>
          <button
            ref={tabRefs.targetGroups}
            className={`flex flex-1 items-center justify-center px-6 py-4 text-base font-medium transition-colors duration-200 ${
              activeTab === "targetGroups"
                ? "text-[#80C342]"
                : completedTabs.includes("basicInfo")
                  ? "text-gray-500 hover:text-gray-700"
                  : "text-gray-300 cursor-not-allowed"
            }`}
            onClick={() => {
              if (completedTabs.includes("basicInfo")) {
                setActiveTab("targetGroups");
              }
            }}
          >
            <svg
              className="mr-2 h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 21C19.6569 21 21 19.6569 21 18C21 16.3431 19.6569 15 18 15C16.3431 15 15 16.3431 15 18C15 19.6569 16.3431 21 18 21Z"
                stroke={
                  activeTab === "targetGroups"
                    ? "#80C342"
                    : completedTabs.includes("basicInfo")
                      ? "#6b7280"
                      : "#d1d5db"
                }
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 9C7.65685 9 9 7.65685 9 6C9 4.34315 7.65685 3 6 3C4.34315 3 3 4.34315 3 6C3 7.65685 4.34315 9 6 9Z"
                stroke={
                  activeTab === "targetGroups"
                    ? "#80C342"
                    : completedTabs.includes("basicInfo")
                      ? "#6b7280"
                      : "#d1d5db"
                }
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13 6H16C16.5304 6 17.0391 6.21071 17.4142 6.58579C17.7893 6.96086 18 7.46957 18 8V15"
                stroke={
                  activeTab === "targetGroups"
                    ? "#80C342"
                    : completedTabs.includes("basicInfo")
                      ? "#6b7280"
                      : "#d1d5db"
                }
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 9V21"
                stroke={
                  activeTab === "targetGroups"
                    ? "#80C342"
                    : completedTabs.includes("basicInfo")
                      ? "#6b7280"
                      : "#d1d5db"
                }
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Target Groups & Metrics
          </button>
          <button
            ref={tabRefs.actionSteps}
            className={`flex flex-1 items-center justify-center px-6 py-4 text-base font-medium transition-colors duration-200 ${
              activeTab === "actionSteps"
                ? "text-[#80C342]"
                : completedTabs.includes("targetGroups")
                  ? "text-gray-500 hover:text-gray-700"
                  : "text-gray-300 cursor-not-allowed"
            }`}
            onClick={() => {
              if (completedTabs.includes("targetGroups")) {
                setActiveTab("actionSteps");
              }
            }}
          >
            <svg
              className="mr-2 h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01"
                stroke={
                  activeTab === "actionSteps"
                    ? "#80C342"
                    : completedTabs.includes("targetGroups")
                      ? "#6b7280"
                      : "#d1d5db"
                }
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Action Steps
          </button>

          {/* Animated Tab Indicator */}
          <div
            className="absolute bottom-0 h-0.5 bg-[#80C342] transition-all duration-300 ease-in-out"
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
            }}
          />
        </div>

        {/* Tab Content */}
        <div className="p-6 min-h-[320px] overflow-y-auto max-h-[60vh]">
          <div
            className={`transition-opacity duration-300 ${activeTab === "basicInfo" ? "opacity-100" : "opacity-0 hidden"}`}
          >
            <div className="mb-6">
              <div className="mb-1 flex items-baseline">
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">
                  1
                </span>
                <h3 className="text-xl font-semibold text-gray-900">Title</h3>
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a catchy initiative title"
                className={`mt-2 w-full rounded-md border ${showBasicInfoError && !title.trim() ? "border-red-500" : "border-gray-300"} p-3 text-gray-700 focus:border-[#80C342] focus:outline-none`}
              />
              {showBasicInfoError && !title.trim() && (
                <p className="mt-1 text-sm text-red-500">Title is required</p>
              )}
            </div>

            <div className="mb-6">
              <div className="mb-1 flex items-baseline">
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">
                  2
                </span>
                <h3 className="text-xl font-semibold text-gray-900">Purpose</h3>
              </div>
              <textarea
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="What impact will this initiative create? Be specific and inspiring."
                className={`mt-2 h-32 w-full rounded-md border ${showBasicInfoError && !purpose.trim() ? "border-red-500" : "border-gray-300"} p-3 text-gray-700 focus:border-[#80C342] focus:outline-none`}
              />
              {showBasicInfoError && !purpose.trim() && (
                <p className="mt-1 text-sm text-red-500">Purpose is required</p>
              )}
            </div>
          </div>

          <div
            className={`transition-opacity duration-300 ${activeTab === "targetGroups" ? "opacity-100" : "opacity-0 hidden"}`}
          >
            <div className="mb-6">
              <div className="mb-1 flex items-baseline">
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">
                  3
                </span>
                <h3 className="text-xl font-semibold text-gray-900">
                  Target Groups
                </h3>
              </div>

              <div
                className={`mt-3 rounded-lg border ${showTargetGroupsError && targetGroups.length === 0 ? "border-red-500" : "border-dashed border-gray-300"} p-4`}
              >
                {/* Selected Target Groups */}
                {targetGroups.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {targetGroups.map((group, index) => (
                      <div
                        key={index}
                        className="flex items-center rounded-full bg-[#80C342]/10 px-3 py-1.5 text-sm text-[#80C342] border border-[#80C342]/20"
                      >
                        <span>{group}</span>
                        <button
                          onClick={() => removeTargetGroup(group)}
                          className="ml-2 text-[#80C342] hover:text-[#6ba238]"
                        >
                          <svg
                            className="h-4 w-4"
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
                      </div>
                    ))}
                  </div>
                )}

                {/* Input for new target group */}
                <div className="flex">
                  <input
                    ref={inputRef}
                    type="text"
                    value={targetGroupInput}
                    onChange={(e) => setTargetGroupInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add target group and press Enter"
                    className="flex-1 rounded-l-md border border-gray-300 p-2 text-gray-700 focus:border-[#80C342] focus:outline-none"
                  />
                  <button
                    onClick={addTargetGroup}
                    className="flex items-center justify-center rounded-r-md bg-gray-100 px-4 text-gray-700 hover:bg-gray-200 ml-0"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {showTargetGroupsError && targetGroups.length === 0 && (
                  <p className="mt-2 text-sm text-red-500">
                    At least one target group is required
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="mb-1 flex items-baseline">
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">
                  4
                </span>
                <h3 className="text-xl font-semibold text-gray-900">Metrics</h3>
              </div>

              <div className="relative mt-3">
                <button
                  onClick={toggleMetricDropdown}
                  className={`flex w-full items-center justify-between rounded-md border ${showTargetGroupsError && selectedMetrics.length === 0 ? "border-red-500" : "border-gray-300"} p-3 text-left text-gray-700 focus:border-[#80C342] focus:outline-none`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    {selectedMetrics.length > 0 ? (
                      selectedMetrics.map((metric, index) => (
                        <span
                          key={index}
                          className="flex items-center rounded-full bg-[#80C342]/10 px-2 py-0.5 text-xs text-[#80C342] border border-[#80C342]/20"
                        >
                          <div className="mr-1 h-1.5 w-1.5 rounded-full bg-[#80C342]"></div>
                          {metric}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">Select metrics</span>
                    )}
                  </div>
                  <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {isMetricDropdownOpen && (
                  <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
                    onClick={() => setIsMetricDropdownOpen(false)}
                  >
                    <div
                      className="relative mx-auto w-full max-w-lg rounded-lg bg-white p-4 shadow-xl"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                        <h3 className="text-lg font-medium text-gray-900">
                          Select Metrics
                        </h3>
                        <button
                          onClick={() => setIsMetricDropdownOpen(false)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <svg
                            className="h-5 w-5"
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
                      </div>

                      <div className="mt-4 max-h-60 overflow-y-auto pr-1">
                        {metrics.map((metric, index) => (
                          <button
                            key={index}
                            onClick={() => toggleMetric(metric)}
                            className={`flex w-full items-center px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md mb-1 ${selectedMetrics.includes(metric) ? "bg-[#80C342]/10" : ""}`}
                          >
                            <div
                              className={`mr-2 h-5 w-5 flex items-center justify-center rounded border ${selectedMetrics.includes(metric) ? "bg-[#80C342] border-[#80C342]" : "border-gray-300"}`}
                            >
                              {selectedMetrics.includes(metric) && (
                                <svg
                                  className="h-3 w-3 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </div>
                            {metric}
                          </button>
                        ))}
                      </div>

                      <div className="mt-4 flex justify-end space-x-2 border-t border-gray-200 pt-3">
                        <button
                          onClick={() => setIsMetricDropdownOpen(false)}
                          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {showTargetGroupsError && selectedMetrics.length === 0 && (
                  <p className="mt-1 text-sm text-red-500">
                    At least one metric is required
                  </p>
                )}
              </div>
            </div>
          </div>

          <div
            className={`transition-opacity duration-300 ${activeTab === "actionSteps" ? "opacity-100" : "opacity-0 hidden"}`}
          >
            <div className="mb-6 flex items-baseline">
              <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">
                5
              </span>
              <h3 className="text-xl font-semibold text-gray-900">Steps</h3>
            </div>

            {/* Added Action Steps List */}
            {actionSteps.length > 0 && (
              <div className="mb-8 space-y-4">
                {actionSteps.map((step) => (
                  <div
                    key={step.id}
                    className="rounded-lg border border-gray-200 bg-white p-5 shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden relative"
                  >
                    {editingStepId === step.id ? (
                      /* In-place editing form */
                      <div className="pl-3">
                        <div className="mb-3">
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Step {step.id}: Title
                          </label>
                          <input
                            type="text"
                            value={stepTitle}
                            onChange={(e) => setStepTitle(e.target.value)}
                            className="w-full rounded-md border border-gray-300 p-2 text-gray-700 focus:border-[#80C342] focus:outline-none"
                            autoFocus
                          />
                        </div>

                        <div className="mb-3">
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Description
                          </label>
                          <textarea
                            value={stepDescription}
                            onChange={(e) => setStepDescription(e.target.value)}
                            className="h-24 w-full rounded-md border border-gray-300 p-2 text-gray-700 focus:border-[#80C342] focus:outline-none"
                          />
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={updateActionStep}
                            disabled={!stepTitle.trim()}
                            className={`rounded-md px-4 py-2 text-white transition-colors ${
                              stepTitle.trim()
                                ? "bg-[#80C342] hover:bg-[#6ba238]"
                                : "bg-gray-300 cursor-not-allowed"
                            }`}
                          >
                            Update
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Normal display */
                      <>
                        {/* Green accent stripe */}
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#80C342]"></div>

                        <div className="flex items-start justify-between pl-3">
                          <div className="flex items-start">
                            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#80C342]/10 text-[#80C342] font-semibold text-sm mr-3 border border-[#80C342]/20">
                              {step.id}
                            </div>
                            <div>
                              <h4 className="text-lg font-medium text-gray-900">
                                {step.title}
                              </h4>
                              <p className="mt-2 text-gray-600 whitespace-pre-line">
                                {step.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex space-x-1">
                            <button
                              onClick={() => startEditingStep(step)}
                              className="p-1.5 rounded-full text-gray-400 hover:text-[#80C342] hover:bg-[#80C342]/10 transition-colors"
                              aria-label="Edit step"
                            >
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => removeActionStep(step.id)}
                              className="p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                              aria-label="Delete step"
                            >
                              <svg
                                className="h-5 w-5"
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
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Add New Action Step - Only show if not editing */}
            {!isEditing && (
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="mb-3">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Step {actionSteps.length + 1}: Title
                  </label>
                  <input
                    ref={titleInputRef}
                    type="text"
                    value={stepTitle}
                    onChange={(e) => setStepTitle(e.target.value)}
                    placeholder="Enter step title"
                    className="w-full rounded-md border border-gray-300 p-2 text-gray-700 focus:border-[#80C342] focus:outline-none"
                  />
                </div>

                <div className="mb-3">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={stepDescription}
                    onChange={(e) => setStepDescription(e.target.value)}
                    placeholder="Outline the key steps required for this initiative. Be clear and actionable."
                    className="h-24 w-full rounded-md border border-gray-300 p-2 text-gray-700 focus:border-[#80C342] focus:outline-none"
                  />
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={addActionStep}
                    disabled={!stepTitle.trim()}
                    className={`rounded-md px-4 py-2 text-white transition-colors ${
                      stepTitle.trim()
                        ? "bg-[#80C342] hover:bg-[#6ba238]"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    Add Step
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between border-t border-gray-200 p-6">
          {/* Small stepper in footer */}
          <div className="w-40">
            <div className="relative flex items-center justify-between">
              {/* Colored connector line from circle edge to edge */}
              <div className="absolute top-1/2 left-4 right-4 h-0.5 -translate-y-1/2">
                <div className="relative h-full w-full">
                  <div className="absolute h-full w-full bg-gray-200"></div>
                  <div
                    className="absolute h-full bg-[#80C342] transition-all duration-300"
                    style={{
                      width:
                        activeTab === "basicInfo"
                          ? "0%"
                          : activeTab === "targetGroups"
                            ? "50%"
                            : "100%",
                    }}
                  ></div>
                </div>
              </div>

              {/* Step circles */}
              {["basicInfo", "targetGroups", "actionSteps"].map(
                (step, index) => {
                  const isActive = activeTab === step;
                  const isCompleted = completedTabs.includes(step);
                  const nextStepCompleted =
                    index < 2 &&
                    (completedTabs.includes(
                      ["targetGroups", "actionSteps"][index]
                    ) ||
                      activeTab === ["targetGroups", "actionSteps"][index]);

                  return (
                    <div key={step} className="relative z-10 flex items-center">
                      {/* Circle */}
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                          isActive
                            ? "bg-[#80C342] text-white"
                            : isCompleted
                              ? "bg-[#80C342] text-white"
                              : "border border-gray-300 bg-white text-gray-500"
                        }`}
                      >
                        {index + 1}
                      </div>

                      {/* Connector line to next circle (only for first 2 circles) */}
                      {index < 2 && (
                        <div className="w-11 h-0.5 ml-1">
                          <div
                            className={`h-full ${nextStepCompleted ? "bg-[#80C342]" : "bg-gray-200"}`}
                          ></div>
                        </div>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </div>

          <div className="flex space-x-3">
            {(activeTab === "targetGroups" || activeTab === "actionSteps") && (
              <button
                onClick={goToPrevTab}
                className="flex items-center rounded-md border border-gray-300 bg-white px-6 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                <svg
                  className="mr-2 inline-block h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Back
              </button>
            )}
            {activeTab === "actionSteps" ? (
              <button
                onClick={submitInitiativeData}
                className="flex items-center rounded-md bg-[#80C342] hover:bg-[#6ba238] px-6 py-2 font-medium text-white transition-colors"
              >
                Apply Initiative
              </button>
            ) : (
              <button
                onClick={goToNextTab}
                className={`flex items-center rounded-md ${
                  (activeTab === "basicInfo" && !isBasicInfoValid()) ||
                  (activeTab === "targetGroups" && !isTargetGroupsValid())
                    ? "bg-[#80C342]/60 cursor-pointer"
                    : "bg-[#80C342] hover:bg-[#6ba238]"
                } px-6 py-2 font-medium text-white transition-colors`}
              >
                Continue
                <svg
                  className="ml-2 inline-block h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitiativeModal;

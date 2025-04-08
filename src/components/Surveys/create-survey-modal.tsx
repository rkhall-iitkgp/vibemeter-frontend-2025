import React, { useEffect, useRef, useState, KeyboardEvent } from "react";
import { RefreshCcw, X } from "lucide-react";

interface FocusGroups {
  name: string;
  focus_group_id: string;
}
interface CreateSurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (surveyData: {
    survey_id: string;
    title: string;
    description: string;
    target_groups: { focus_group_id: string }[];
    ends_at: string;
    questions: { id: string | number; text: string }[];
    is_active: boolean;
    created_at: string;
  }) => void;
}

const CreateSurveyModal: React.FC<CreateSurveyModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [surveyName, setSurveyName] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<string[]>([""]);
  const [date, setDate] = useState<string>(() => {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
  });
  const [targetGroups, setTargetGroups] = useState<string[]>([]);
  const [targetGroupInput, setTargetGroupInput] = useState("");
  const [suggestedTargetGroups, setSuggestedTargetGroups] = useState<
    FocusGroups[]
  >([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showTargetGroupsError, setShowTargetGroupsError] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchFocusGroups = async () => {
      try {
        const responseData = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/groups/minified`
        );
        // console.log(responseData)
        setSuggestedTargetGroups((await responseData.json()).data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFocusGroups();
  }, []);

  if (!isOpen) return null;

  const addTargetGroup = (group: FocusGroups) => {
    if (showTargetGroupsError) setShowTargetGroupsError(false);
    if (group && !targetGroups.includes(group.focus_group_id)) {
      setTargetGroups([...targetGroups, group.focus_group_id]);
      setTargetGroupInput(""); // Clear the input after adding
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const removeTargetGroup = (groupId: string) => {
    setTargetGroups(targetGroups.filter((id) => id !== groupId));
  };

  const filterSuggestions = (input: string) => {
    return suggestedTargetGroups.filter(
      (group) =>
        group.name.toLowerCase().includes(input.toLowerCase()) &&
        !targetGroups.includes(group.focus_group_id) // Exclude already selected groups by id
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // addTargetGroup();
    }
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetGroups.length) {
      setShowTargetGroupsError(true);
      return;
    }
    const submitData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/survey`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: surveyName,
              description,
              questions: questions.map((question, i) => ({
                id: i + 1,
                text: question,
              })),
              ends_at: date,
              target_groups: targetGroups,
            }),
          }
        );
        const data = await response.json();
        if (data.status === "success") {
          onSuccess(data.data);
          setSurveyName("");
          setDescription("");
          setQuestions([""]);
          setDate(() => {
            const now = new Date();
            return new Date(now.getTime() - now.getTimezoneOffset() * 60000)
              .toISOString()
              .slice(0, 16);
          });
          setTargetGroups([]);
          onClose();
        }
      } catch (error) {
        console.error("Error creating survey:", error);
      } finally {
        setLoading(false);
      }

      // Add the new survey to the surveys array
    };
    submitData();
    // Reset form
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Create New Survey</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <p className="text-gray-500 mb-6">
            Design your survey and collect responses from your audience.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="surveyName"
                className="block text-lg font-medium mb-2"
              >
                Survey Name
              </label>
              <input
                id="surveyName"
                type="text"
                placeholder="Enter survey name"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={surveyName}
                onChange={(e) => setSurveyName(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-lg font-medium mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                placeholder="Briefly describe the purpose of this survey"
                className="w-full p-3 border border-gray-300 rounded-lg min-h-[120px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-lg font-medium mb-2"
              >
                End Date
              </label>
              <input
                id="date"
                className="w-full p-2 border border-gray-300 rounded"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                type="datetime-local"
                placeholder="Select date and time"
              />
            </div>
            <div>
              <label className="block text-lg font-medium mb-2">
                Target Groups
              </label>
              <div
                className={`mt-3 rounded-lg border ${showTargetGroupsError && targetGroups.length === 0 ? "border-red-500" : "border-dashed border-gray-300"} p-4`}
              >
                {/* Selected Target Groups */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {targetGroups.map((groupId, index) => {
                    const group = suggestedTargetGroups.find(
                      (g) => g.focus_group_id === groupId
                    );
                    return group ? (
                      <div
                        key={index}
                        className="flex items-center rounded-full bg-[#80C342]/10 px-3 py-1.5 text-sm text-[#80C342] border border-[#80C342]/20"
                        style={{ whiteSpace: "nowrap" }} // Prevent text from wrapping inside the item
                      >
                        <span>{group.name}</span>
                        <button
                          onClick={() => removeTargetGroup(groupId)}
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
                    ) : null;
                  })}
                </div>

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
                </div>

                {
                  <ul className="mt-2 border border-gray-200 rounded-lg max-h-40 overflow-y-auto">
                    {filterSuggestions(targetGroupInput).map(
                      (suggestion, index) => (
                        <li
                          key={index}
                          onClick={() => addTargetGroup(suggestion)}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                        >
                          {suggestion.name}
                        </li>
                      )
                    )}
                  </ul>
                }

                {showTargetGroupsError && targetGroups.length === 0 && (
                  <p className="mt-2 text-sm text-red-500">
                    At least one target group is required
                  </p>
                )}
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2">
                Questions
              </label>
              {questions.map((question, index) => (
                <div key={index} className="flex items-center mb-4">
                  <input
                    type="text"
                    placeholder={`Question ${index + 1}`}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={question}
                    onChange={(e) =>
                      handleQuestionChange(index, e.target.value)
                    }
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddQuestion}
                className="px-4 py-2 bg-[#80C342] text-white rounded-lg hover:bg-[#74b13c]"
              >
                Add Question
              </button>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-[#80C342] disabled:bg-[#aeec75] text-white rounded-lg hover:bg-[#74b13c] flex items-center"
              >
                {loading ? (
                  <RefreshCcw className="animate-spin h-5 w-5 mr-3 text-white" />
                ) : null}
                Create Survey
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSurveyModal;

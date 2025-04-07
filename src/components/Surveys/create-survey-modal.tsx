"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { RefreshCcw, X, Trash2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type React from "react";

interface FocusGroups {
  name: string;
  focus_group_id: string;
}

export interface CreateSurvey {
  survey_id: string;
  title: string;
  description: string;
  target_groups: { focus_group_id: string }[];
  ends_at: string;
  questions: { id: string | number; text: string }[];
  is_active: boolean;
  created_at: string;
}

interface QuestionData {
  id: string;
  text: string;
}
export interface Survey {
  survey_id: string;
  title: string;
  description: string;
  target_groups: FocusGroups[];
  ends_at: string;
  questions: QuestionData[];
  is_active: boolean;
  created_at: string;
}

interface CreateSurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (surveyData: Survey) => void;
}

const CreateSurveyModal: React.FC<CreateSurveyModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [surveyName, setSurveyName] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<string[]>([""]);
  const [questionErrors, setQuestionErrors] = useState<boolean[]>([false]);
  const [showEmptyQuestionAlert, setShowEmptyQuestionAlert] = useState(false);
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
    // Check if the last question is empty
    if (questions[questions.length - 1].trim() === "") {
      // Show error for the last question
      const newErrors = [...questionErrors];
      newErrors[questions.length - 1] = true;
      setQuestionErrors(newErrors);

      // Show alert
      setShowEmptyQuestionAlert(true);

      // Hide alert after 3 seconds
      setTimeout(() => {
        setShowEmptyQuestionAlert(false);
      }, 3000);

      return;
    }

    // Add new question and corresponding error state
    setQuestions([...questions, ""]);
    setQuestionErrors([...questionErrors, false]);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);

    // Clear error for this question if it has content
    if (value.trim() !== "") {
      const newErrors = [...questionErrors];
      newErrors[index] = false;
      setQuestionErrors(newErrors);
    }
  };

  const handleDeleteQuestion = (index: number) => {
    // Don't allow deleting if there's only one question
    if (questions.length <= 1) return;

    const updatedQuestions = questions.filter((_, i) => i !== index);
    const updatedErrors = questionErrors.filter((_, i) => i !== index);

    setQuestions(updatedQuestions);
    setQuestionErrors(updatedErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check for empty questions
    const hasEmptyQuestions = questions.some((q) => q.trim() === "");

    if (hasEmptyQuestions) {
      // Mark all empty questions with errors
      const newErrors = questions.map((q) => q.trim() === "");
      setQuestionErrors(newErrors);

      // Show alert
      setShowEmptyQuestionAlert(true);

      // Hide alert after 3 seconds
      setTimeout(() => {
        setShowEmptyQuestionAlert(false);
      }, 3000);

      return;
    }

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
          setQuestionErrors([false]);
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
    };
    submitData();
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

          {showEmptyQuestionAlert && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Questions cannot be empty. Please enter text for all questions.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Label htmlFor="surveyName" className="text-lg font-medium">
                Survey Name
              </Label>
              <Input
                id="surveyName"
                type="text"
                placeholder="Enter survey name"
                className="mt-2"
                value={surveyName}
                onChange={(e) => setSurveyName(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <Label htmlFor="description" className="text-lg font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Briefly describe the purpose of this survey"
                className="mt-2 min-h-[120px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <Label htmlFor="date" className="text-lg font-medium">
                End Date
              </Label>
              <Input
                id="date"
                className="mt-2"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                type="datetime-local"
                placeholder="Select date and time"
              />
            </div>
            <div>
              <Label className="text-lg font-medium">Target Groups</Label>
              <div
                className={`mt-3 rounded-lg border ${
                  showTargetGroupsError && targetGroups.length === 0
                    ? "border-red-500"
                    : "border-dashed border-gray-300"
                } p-4`}
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
                        style={{ whiteSpace: "nowrap" }}
                      >
                        <span>{group.name}</span>
                        <button
                          onClick={() => removeTargetGroup(groupId)}
                          className="ml-2 text-[#80C342] hover:text-[#6ba238]"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : null;
                  })}
                </div>

                {/* Input for new target group */}
                <div className="flex">
                  <Input
                    ref={inputRef}
                    type="text"
                    value={targetGroupInput}
                    onChange={(e) => setTargetGroupInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add target group and press Enter"
                    className="flex-1"
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
              <Label className="block text-lg font-medium mb-2">
                Questions
              </Label>
              {questions.map((question, index) => (
                <div key={index} className="flex items-start mb-4 gap-2">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder={`Question ${index + 1}`}
                      className={`w-full ${questionErrors[index] ? "border-red-500" : ""}`}
                      value={question}
                      onChange={(e) =>
                        handleQuestionChange(index, e.target.value)
                      }
                    />
                    {questionErrors[index] && (
                      <p className="text-sm text-red-500 mt-1">
                        Question cannot be empty
                      </p>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleDeleteQuestion(index)}
                    disabled={questions.length <= 1}
                    className="flex-shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={handleAddQuestion}
                className="bg-[#80C342] hover:bg-[#74b13c]"
              >
                Add Question
              </Button>
            </div>

            <div className="flex justify-between">
              <Button type="button" onClick={onClose} variant="outline">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-[#80C342] hover:bg-[#74b13c]"
              >
                {loading ? (
                  <RefreshCcw className="animate-spin h-5 w-5 mr-3" />
                ) : null}
                Create Survey
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSurveyModal;

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import React, { useState } from "react";
import { FocusGroup } from "@/types";
import { useEffect } from "react";

interface SurveyDetailsProps {
  survey_id: string;
}

interface Question {
  id: string;
  text: string;
  average: number;
  delta: number;
  options: Array<{
    value: string;
    label: string;
  }>;
  responses: Array<{
    count: number;
    percentage: number;
  }>;
}

interface Survey {
  survey_id: string;
  title: string;
  description: string;
  target_groups: FocusGroup[];
  ends_at: string;
  questions: Question[];
  is_active: boolean;
  created_at: string;
  survey_status: { total_responses: number; responses_filled: number };
}

interface QuestionProps {
  question: Question;
}

const TagColors: Record<string, string> = {
  Morality: "bg-amber-100 text-amber-800",
  Engagement: "bg-teal-100 text-teal-800",
  "Cultural Score": "bg-pink-100 text-pink-800",
  "Leave Impact": "bg-green-100 text-green-800",
};

const QuestionAccordion: React.FC<QuestionProps> = ({ question }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <button className="p-1 w-full" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center justify-between py-2">
          <div>
            <div className="font-medium text-left">{question.text}</div>
            <div className="text-sm text-gray-500">
              Average Score: {question.average}/5
              <span className="text-green-500">+{question.delta}</span>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out`}
        style={{ maxHeight: isExpanded ? "100vh" : "0px" }}
      >
        <div className="pt-4">
          {question.options.map((option, rIndex) => (
            <div key={rIndex} className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>
                  {option.value}: {option.label}
                </span>
                <span>
                  {question.responses[rIndex].count} (
                  {question.responses[rIndex].percentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#80C342] h-2 rounded-full"
                  style={{ width: `${question.responses[rIndex].percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SurveyDetails: React.FC<SurveyDetailsProps> = ({ survey_id }) => {
  // Mock data for the survey details view
  const [survey, setSurvey] = useState<Survey>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch surveys from the API (replace with your actual API endpoint)
    const fetchSurveys = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/survey/${survey_id}`
        );
        const data: { status: string; data: Survey } = await response.json();
        if (data.status === "success") {
          setSurvey(data.data);
        }
      } catch (error) {
        console.error("Error fetching surveys:", error);
      }
      setLoaded(true);
    };

    fetchSurveys();
  }, [survey_id]);

  if (!loaded) {
    return (
      <div className="bg-white p-4 rounded-md shadow-sm border text-center flex-1 overflow-auto flex flex-col items-center justify-center">
        <div className="animate-pulse flex justify-center">
          <div className="h-4 w-4 bg-[#80C342] rounded-full mx-1"></div>
          <div className="h-4 w-4 bg-[#80C342] rounded-full mx-1 animate-pulse delay-100"></div>
          <div className="h-4 w-4 bg-[#80C342] rounded-full mx-1 animate-pulse delay-200"></div>
        </div>
        <p className="text-gray-500 mt-2">Loading Details...</p>
      </div>
    );
  }

  // Calculate start and end dates based on the created date
  const createdDate = new Date(survey?.created_at || "");
  const startDate = new Date(createdDate);
  startDate.setDate(startDate.getDate() + 5);
  const endDate = new Date(survey?.ends_at || "");
  endDate.setDate(startDate.getDate() + 30);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="flex-1 overflow-auto h-screen bg-gray-50">
      {/* Header with back button */}
      <header className="bg-gray-100 z-10 p-6 pt-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Surveys
          </button>
        </div>
      </header>

      <main className="p-6 pt-2">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full mt-2">
          <div className="p-6">
            <div className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold">{survey?.title}</h1>
                  <p className="text-gray-500">
                    Group ID: {survey?.target_groups[0].focus_group_id}
                  </p>
                </div>
                <div className="text-right text-gray-500">
                  Created at:{" "}
                  {new Date(survey?.created_at || "").toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    }
                  )}
                </div>
              </div>
            </div>

            <div className="border-b py-4">
              <h2 className="text-lg font-semibold mb-2">Description:</h2>
              <p className="text-gray-700">
                {survey?.description ||
                  "The Workplace Stress & Well-being Group is a focus group formed by employees who share similar challenges regarding stress management and overall well-being at work. This group aims to discuss the common causes of workplace stress, explore potential solutions, and collaborate on strategies to improve mental health, work-life balance, and support structures."}
              </p>
            </div>

            <div className="border-b py-4">
              <h2 className="text-lg font-semibold mb-3">Survey Status</h2>
              <div className="mb-2">
                <div className="flex justify-between mb-1">
                  <span>Response Rate</span>
                  <span className="font-medium">
                    {Math.floor(
                      ((survey?.survey_status?.responses_filled || 0) *
                        100 *
                        100) /
                        (survey?.survey_status?.total_responses || 1)
                    ) / 100}
                    % ({survey?.survey_status?.responses_filled || 0}/
                    {survey?.survey_status?.total_responses || 0})
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-[#80C342] h-2.5 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${((survey?.survey_status?.responses_filled || 0) * 100) / (survey?.survey_status?.total_responses || 1)}%`,
                      animation: "growWidth 600ms ease",
                    }}
                  ></div>
                  <style>{`
										@keyframes growWidth {
											from { width: 0%; }
											to { width: ${((survey?.survey_status?.responses_filled || 0) * 100) / (survey?.survey_status?.total_responses || 1)}%; }
										}
									`}</style>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <div>Start: {formatDate(startDate)}</div>
                <div>End: {formatDate(endDate)}</div>
              </div>
            </div>

            <div className="border-b py-4">
              <h2 className="text-lg font-semibold mb-3">
                Target Focus Groups:
              </h2>
              <div className="space-y-4">
                {survey?.target_groups.map((group) => (
                  <div
                    className="mb-4 rounded-lg border border-gray-200 bg-white p-6 cursor-pointer hover:shadow-md transition-shadow relative"
                    onClick={() =>
                      navigate(`/focus-groups/${group.focus_group_id}`)
                    }
                    key={group.focus_group_id}
                  >
                    <div className="absolute bottom-4 right-10 flex items-center gap-2 text-[#80C342] font-semibold cursor-pointer">
                      <div>View Details</div>
                      <ArrowRight />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {group.name}
                        </h3>
                      </div>
                      <div className="flex gap-4">
                        <p className="mt-2 text-sm text-gray-500">
                          Created on{" "}
                          {new Date(group.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "2-digit",
                            }
                          )}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-2">
                          {group.metrics.map((metric, index) => (
                            <span
                              key={index}
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${TagColors[metric] || "bg-gray-100 text-gray-800"}`}
                            >
                              {metric}
                            </span>
                          ))}
                        </div>
                      </div>

                      <p className="mt-3 text-sm text-gray-700">
                        {group.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="py-4">
              <h2 className="text-lg font-semibold mb-3">Survey Questions</h2>
              {/* <div className="mb-4">
								<input
									type="text"
									placeholder="Search questions..."
									className="w-full p-2 border rounded-lg"
									onChange={(e) => {
										const searchTerm = e.target.value.toLowerCase();
										survey.questions.forEach((question) => {
											question.expanded = question.text.toLowerCase().includes(searchTerm);
										});
									}}
								/>
							</div> */}
              <div className="flex gap-4 flex-col">
                {survey?.questions.map((question, index) => (
                  <QuestionAccordion
                    key={`${index}-${question.id}`}
                    question={question}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SurveyDetails;

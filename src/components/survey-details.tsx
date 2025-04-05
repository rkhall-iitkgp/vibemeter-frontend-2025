import type React from "react"
import { ArrowLeft } from "lucide-react"

interface SurveyDetailsProps {
    survey: {
        id: number
        title: string
        createdDate: string
        description: string
        status: "Active" | "Inactive"
    } | null
    onBack: () => void
}

const SurveyDetails: React.FC<SurveyDetailsProps> = ({ survey, onBack }) => {
    if (!survey) return null

    // Mock data for the survey details view
    const groupId = `FG-${new Date().getFullYear()}-${String(survey.id).padStart(3, "0")}`
    const responseRate = Math.floor(Math.random() * 100)
    const totalResponses = Math.floor(Math.random() * 500)

    // Focus groups data
    const focusGroups = [
        {
            id: 1,
            title: "Employee Engagement Task Force",
            createdDate: "March 17, 2025",
            tags: [
                { name: "Morality", color: "yellow" },
                { name: "Engagement", color: "blue" }
            ],
            participants: 12,
            description: "A group dedicated to developing leadership skills and strategic decision-making among employees."
        },
        {
            id: 2,
            title: "Employee Engagement Task Force",
            createdDate: "March 17, 2025",
            tags: [
                { name: "Morality", color: "yellow" },
                { name: "Engagement", color: "blue" }
            ],
            participants: 12,
            description: "A group dedicated to developing leadership skills and strategic decision-making among employees."
        }
    ]

    // Survey questions data
    const surveyQuestions = [
        {
            id: 1,
            question: "How satisfied are you with your current role?",
            averageScore: 3.8,
            trend: 0.2,
            expanded: true,
            ratings: [
                { label: "1 - Very Dissatisfied", count: 5, percentage: 2 },
                { label: "2 - Dissatisfied", count: 15, percentage: 6 },
                { label: "3 - Neutral", count: 45, percentage: 19 },
                { label: "4 - Satisfied", count: 120, percentage: 51 },
                { label: "5 - Very Satisfied", count: 49, percentage: 21 }
            ]
        },
        {
            id: 2,
            question: "How satisfied are you with your current role?",
            averageScore: 3.8,
            trend: 0.2,
            expanded: false
        },
        {
            id: 3,
            question: "How satisfied are you with your current role?",
            averageScore: 3.8,
            trend: 0.2,
            expanded: false
        },
        {
            id: 4,
            question: "How satisfied are you with your current role?",
            averageScore: 3.8,
            trend: 0.2,
            expanded: false
        },
        {
            id: 5,
            question: "How satisfied are you with your current role?",
            averageScore: 3.8,
            trend: 0.2,
            expanded: false
        }
    ]

    // Calculate start and end dates based on the created date
    const createdDate = new Date(survey.createdDate)
    const startDate = new Date(createdDate)
    startDate.setDate(startDate.getDate() + 5)
    const endDate = new Date(startDate)
    endDate.setDate(startDate.getDate() + 30)

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    }

    return (
        <div className="flex-1 overflow-auto h-auto min-h-screen bg-gray-50">
            {/* Header with back button */}
            <header className="bg-gray-100 z-10 p-4 sticky top-0">
            <div className="flex items-center gap-3">
                <button onClick={onBack} className="flex items-center text-gray-600 hover:text-gray-800">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Surveys
                </button>
            </div>
            </header>

            <main className="p-4 flex justify-center">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full max-w-7xl mt-2">
                <div className="p-6">
                <div className="border-b pb-4">
                    <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold">{survey.title}</h1>
                        <p className="text-gray-500">Group ID: {groupId}</p>
                    </div>
                    <div className="text-right text-gray-500">Created on {survey.createdDate}</div>
                    </div>
                </div>

                <div className="border-b py-4">
                    <h2 className="text-lg font-semibold mb-2">Description:</h2>
                    <p className="text-gray-700">
                    {survey.description ||
                        "The Workplace Stress & Well-being Group is a focus group formed by employees who share similar challenges regarding stress management and overall well-being at work. This group aims to discuss the common causes of workplace stress, explore potential solutions, and collaborate on strategies to improve mental health, work-life balance, and support structures."}
                    </p>
                </div>

                <div className="border-b py-4">
                    <h2 className="text-lg font-semibold mb-3">Survey Status</h2>
                    <div className="mb-2">
                    <div className="flex justify-between mb-1">
                        <span>Response Rate</span>
                        <span className="font-medium">
                        {responseRate}% ({totalResponses}/300)
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-[#80C342] h-2.5 rounded-full" style={{ width: `${responseRate}%` }}></div>
                    </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <div>Start: {formatDate(startDate)}</div>
                    <div>End: {formatDate(endDate)}</div>
                    </div>
                </div>

                <div className="border-b py-4">
                    <h2 className="text-lg font-semibold mb-3">Target Focus Groups:</h2>
                    <div className="space-y-4">
                      {focusGroups.map(group => (
                        <div key={group.id} className="border rounded-lg p-4">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium">{group.title}</h3>
                              <div className="text-sm text-gray-500">Created on {group.createdDate}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-[#80C342]">Participants</div>
                              <div className="text-sm">{group.participants} Members</div>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-2">
                            {group.tags.map((tag, index) => (
                              <span 
                                key={index} 
                                className={`px-2 py-1 bg-${tag.color}-100 text-${tag.color}-800 text-xs rounded`}
                              >
                                {tag.name}
                              </span>
                            ))}
                          </div>
                          <p className="mt-2 text-gray-700">{group.description}</p>
                        </div>
                      ))}
                    </div>
                </div>

                <div className="py-4">
                    <h2 className="text-lg font-semibold mb-3">Survey Questions</h2>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search questions..."
                            className="w-full p-2 border rounded-lg"
                            onChange={(e) => {
                                const searchTerm = e.target.value.toLowerCase();
                                surveyQuestions.forEach((question) => {
                                    question.expanded = question.question.toLowerCase().includes(searchTerm);
                                });
                            }}
                        />
                    </div>
                    <div className="border rounded-lg p-4">
                      {surveyQuestions.map((question, index) => (
                        <div key={question.id} className={index < surveyQuestions.length - 1 ? "border-b pb-4" : ""}>
                          <div className="flex items-center justify-between py-4">
                            <div>
                              <div className="font-medium">{question.question}</div>
                              <div className="text-sm text-gray-500">
                                Average Score: {question.averageScore}/5 
                                <span className="text-green-500">+{question.trend}</span>
                              </div>
                            </div>
                            <button className="p-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </button>
                          </div>
                          
                          {question.expanded && question.ratings && (
                            <div className="mt-4 mb-4 space-y-3">
                              {question.ratings.map((rating, rIndex) => (
                                <div key={rIndex}>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>{rating.label}</span>
                                    <span>{rating.count} ({rating.percentage}%)</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-[#80C342] h-2 rounded-full" style={{ width: `${rating.percentage}%` }}></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                </div>
                </div>
            </div>
            </main>
        </div>
    )
}

export default SurveyDetails
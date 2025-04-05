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
        <div className="flex-1 overflow-auto h-screen bg-gray-50">
            {/* Header with back button */}
            <header className="bg-gray-100 z-10 p-4">
            <div className="flex items-center gap-3">
                <button onClick={onBack} className="flex items-center text-gray-600 hover:text-gray-800">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Surveys
                </button>
            </div>
            </header>

            <main className="p-4 h-full flex justify-center items-center">
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
                    <div className="border rounded-lg p-6 text-center text-gray-500">
                    <p>Focus groups will appear here</p>
                    <p className="text-sm mt-2">This is a placeholder for the focus group content</p>
                    </div>
                </div>

                <div className="py-4">
                    <h2 className="text-lg font-semibold mb-3">Survey Questions</h2>
                    <div className="border rounded-lg p-6 text-center text-gray-500">
                    <p>Survey questions will appear here</p>
                    <p className="text-sm mt-2">This is a placeholder for the survey content</p>
                    </div>
                </div>
                </div>
            </div>
            </main>
        </div>
    )
}

export default SurveyDetails

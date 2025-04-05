// "use client"

import React from "react"
import { X } from "lucide-react"

interface CreateSurveyModalProps {
    isOpen: boolean
    onClose: () => void
    onCreateSurvey: (surveyData: {
        title: string
        description: string
        questions: string[]
    }) => void
}

const CreateSurveyModal: React.FC<CreateSurveyModalProps> = ({ isOpen, onClose, onCreateSurvey }) => {
    const [surveyName, setSurveyName] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [questions, setQuestions] = React.useState<string[]>([""])

    if (!isOpen) return null

    const handleAddQuestion = () => {
        setQuestions([...questions, ""])
    }

    const handleQuestionChange = (index: number, value: string) => {
        const updatedQuestions = [...questions]
        updatedQuestions[index] = value
        setQuestions(updatedQuestions)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onCreateSurvey({
            title: surveyName,
            description,
            questions,
        })
        // Reset form
        setSurveyName("")
        setDescription("")
        setQuestions([""])
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Create New Survey</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <p className="text-gray-500 mb-6">Design your survey and collect responses from your audience.</p>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="surveyName" className="block text-lg font-medium mb-2">
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
                            <label htmlFor="description" className="block text-lg font-medium mb-2">
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
                            <label className="block text-lg font-medium mb-2">Questions</label>
                            {questions.map((question, index) => (
                                <div key={index} className="flex items-center mb-4">
                                    <input
                                        type="text"
                                        placeholder={`Question ${index + 1}`}
                                        className="w-full p-3 border border-gray-300 rounded-lg"
                                        value={question}
                                        onChange={(e) => handleQuestionChange(index, e.target.value)}
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
                            <button type="submit" className="px-6 py-3 bg-[#80C342] text-white rounded-lg hover:bg-[#74b13c]">
                                Create Survey
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateSurveyModal

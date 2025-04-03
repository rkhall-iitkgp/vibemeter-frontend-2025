import { ArrowRight, Trophy } from "lucide-react"

interface RecognitionCardProps {
  title: string
  priority: string
  description: string
  targetGroup: string
  tags: string[]
}

export function RecognitionCard({
  title = "Recognition Program",
  priority = "High Priority",
  description = "Implement a monthly employee recognition program to celebrate achievements and boost morale.",
  targetGroup = "All Departments",
  tags = ["Team Building", "Morale"],
}: RecognitionCardProps) {
  return (
    <div className="bg-white rounded-md border border-gray-200 p-4 shadow-sm w-[350px]">
      <div className="flex items-start mb-2">
        <div className="bg-amber-50 p-2 rounded-full mr-3">
          <Trophy className="h-5 w-5 text-amber-500" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-rose-600 font-sm bg-rose-100 px-2 py-1 rounded-full inline-block mt-1">{priority}</p>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-3">{description}</p>

      <div className="flex items-center mb-3 text-sm text-gray-500">
        <svg className="h-5 w-5 mr-2 text-[#86BC25]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17 20H22V18C22 16.3431 20.6569 15 19 15C18.0444 15 17.1931 15.4468 16.6438 16.1429M17 20H7M17 20V18C17 17.3438 16.8736 16.717 16.6438 16.1429M7 20H2V18C2 16.3431 3.34315 15 5 15C5.95561 15 6.80686 15.4468 7.35625 16.1429M7 20V18C7 17.3438 7.12642 16.717 7.35625 16.1429M7.35625 16.1429C8.0935 14.301 9.89482 13 12 13C14.1052 13 15.9065 14.301 16.6438 16.1429M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7ZM21 10C21 11.1046 20.1046 12 19 12C17.8954 12 17 11.1046 17 10C17 8.89543 17.8954 8 19 8C20.1046 8 21 8.89543 21 10ZM7 10C7 11.1046 6.10457 12 5 12C3.89543 12 3 11.1046 3 10C3 8.89543 3.89543 8 5 8C6.10457 8 7 8.89543 7 10Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Target Group: {targetGroup}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className={`px-2 py-1 text-xs rounded ${
                tag === "Team Building" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <button className="text-blue-600 text-sm font-medium flex items-center hover:underline">
          View Details
          <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  )
}


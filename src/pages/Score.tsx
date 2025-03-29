import type React from "react"
import { cn } from "@/lib/utils"

// Custom SVG icons to match exactly what's in the image
const MoraleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
      stroke="#64748B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M12 4V2" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 22V20" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4.93 4.93L6.34 6.34" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17.66 17.66L19.07 19.07" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 12H4" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 12H22" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.34 17.66L4.93 19.07" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19.07 4.93L17.66 6.34" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const EngagementIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
      stroke="#64748B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
      stroke="#64748B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const RetentionIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
      stroke="#64748B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
      stroke="#64748B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const CulturalIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
      stroke="#64748B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
      stroke="#64748B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
      stroke="#64748B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
      stroke="#64748B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const LeaveIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
      stroke="#64748B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M14 2V8H20" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 13H8" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 17H8" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 9H9H8" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const HRIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
      stroke="#64748B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z"
      stroke="#64748B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M20 8V14" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M23 11H17" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

type ScoreCardProps = {
  score: number
  change: number
  label: string
  icon: React.ReactNode
  maxScore?: number
}

const ScoreCard = ({ score, change, label, icon, maxScore = 100 }: ScoreCardProps) => {
  const isPositive = change > 0
  const progressWidth = `${(score / maxScore) * 100}%`

  return (
    <div className="bg-white rounded-md border border-gray-200 p-6 flex flex-col">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold">{score}</span>
            <span className={cn("text-sm font-medium", isPositive ? "text-green-500" : "text-red-500")}>
              {isPositive ? "↑" : "↓"} {Math.abs(change)}%
            </span>
          </div>
          <p className="text-sm text-gray-700">{label}</p>
        </div>
        <div className="text-gray-500">{icon}</div>
      </div>
      <div className="mt-auto pt-2">
        <div className="h-1 w-full bg-gray-100 rounded-full mt-2">
          <div
            className={cn("h-1 rounded-full", isPositive ? "bg-green-500" : "bg-red-500")}
            style={{ width: progressWidth }}
          />
        </div>
      </div>
    </div>
  )
}

const  MonthlyScores : React.FC = ()=> {
  const scoreData = [
    {
      score: 78,
      change: 6.4,
      label: "Morale Score",
      icon: <MoraleIcon />,
    },
    {
      score: 48,
      change: -6.4,
      label: "Engagement Score",
      icon: <EngagementIcon />,
    },
    {
      score: 19,
      change: -6.4,
      label: "Retention Risk Score",
      icon: <RetentionIcon />,
    },
    {
      score: 78,
      change: 6.4,
      label: "Overall Cultural Score",
      icon: <CulturalIcon />,
    },
    {
      score: 78,
      change: 6.4,
      label: "Leave Impact Score",
      icon: <LeaveIcon />,
    },
    {
      score: 48,
      change: -6.4,
      label: "HR Interventions",
      icon: <HRIcon />,
    },
  ]

  return (
    <div className="border border-blue-200 rounded-lg p-6 bg-white">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Monthly Scores</h2>
        <p className="text-sm text-gray-500">Average Cumulative scores of employees</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scoreData.map((item, index) => (
          <ScoreCard key={index} score={item.score} change={item.change} label={item.label} icon={item.icon} />
        ))}
      </div>
    </div>
  )
}

export default MonthlyScores;
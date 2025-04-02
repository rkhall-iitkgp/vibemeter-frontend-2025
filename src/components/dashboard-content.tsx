'use client'
import Navbar from "./Navbar"
import { Clock } from "lucide-react"
import { AttendanceCard } from "@/components/attendence-card"
import CalendarBox from "@/components/CalendarBox"
import { ChecklistCard } from "@/components/checklist-card"
import HeatMap from "@/components/HeatMap"
import { useEffect, useState } from "react"

const data = {
    data: {
      employee_id: "EMP0015",
      work_hours: [
        {
          "date": "2023-01-10",
          "hours": 4.61
        },
        {
          "date": "2023-08-29",
          "hours": 9.1
        },
        {
          "date": "2023-10-11",
          "hours": 6.95
        }
      ],
      leave_info: {
        leave_balance: 30,
        total_allocation: 30,
        leaves_used: 0,
        upcoming_leaves: [],
        past_leave_history: [
          {
            id: 355,
            leave_type: "Annual Leave",
            leave_days: 14,
            start_date: "2023-12-21",
            end_date: "2023-12-22"
          },
          {
            id: 216,
            leave_type: "Casual Leave",
            leave_days: 9,
            start_date: "2023-08-04",
            end_date: "2023-08-05"
          },
          {
            id: 210,
            leave_type: "Unpaid Leave",
            leave_days: 8,
            start_date: "2023-07-29",
            end_date: "2023-07-30"
          }
        ]
      },
      attendance_stats: {
        avg_work_hours: 6.9,
        total_days_present: 20,
        total_days_absent: 10,
        punctuality_score: 5,
        period: "2025-03-04 to 2025-04-03"
      },
      task_data: [
        {
          "id": 5,
          "title": "Submit weekly report",
          "description": "Summarize progress and blockers",
          "due_date": "2025-03-22",
          "is_completed": true
        },
        {
          "id": 4,
          "title": "Complete onboarding presentation",
          "description": "Finish the company intro slides",
          "due_date": "2025-03-24",
          "is_completed": false
        },
        {
          "id": 6,
          "title": "Team meeting with manager",
          "description": "Discuss quarterly goals",
          "due_date": "2025-03-26",
          "is_completed": true
        }
      ]
    },
    status: "success"
  };
  

export function DashboardContent() {
  const [time, setTime] = useState('');
  const [name, setName] = useState('Tridibesh');
  const [dashboardData, setDashboardData] = useState(data.data);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
      setTime(`${hours}:${minutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col">
      <Navbar name={name} />

      <main className="flex-1 p-6 overflow-auto">
        {/* Greeting Section */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Good afternoon, {name}!</h1>
            <p className="text-gray-600">You have 12 tasks pending.</p>
          </div>
          <div className="bg-white rounded-lg p-3 flex items-center gap-3 shadow-sm">
            <div>
              <p className="text-xs text-gray-500">Current time</p>
              <p className="text-2xl font-bold">{time}</p>
            </div>
            <Clock className="h-6 w-6 text-gray-400" />
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column (spans 2 columns) */}
          <div className="col-span-2 flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-6">
              <AttendanceCard stats={dashboardData.attendance_stats} />
              <CalendarBox leaveInfo={dashboardData.leave_info} />
            </div>
            <HeatMap workHours={dashboardData.work_hours} />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            <ChecklistCard tasks={dashboardData.task_data} />
          </div>
        </div>
      </main>
    </div>
  );
}

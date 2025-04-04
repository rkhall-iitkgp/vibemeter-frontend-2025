import AdminBubbleChart, {
  BubbleData,
} from "@/components/Admin/AdminBubbleChart";
import EmployeeSatisfactionGauge from "@/components/Admin/employee-satisfaction";
import HighConcernEmployees from "@/components/Admin/new-high-concern-employee";
import VibemeterChart from "@/components/Admin/average-vibemeter-score";
import Sidebar from "@/components/Admin/sidenav";
import { FaChartBar } from "react-icons/fa";

export default function AdminDashboard() {
  // Demo data for the AdminBubbleChart component
  const bubbleDemoData: BubbleData[] = [
    { name: "Workload", value: 80, description: "High workload for employees" },
    {
      name: "Engagement",
      value: 65,
      description: "Moderate engagement levels",
    },
    { name: "Team Morale", value: 30, description: "Low team morale observed" },
    { name: "Stress", value: 15, description: "Very low stress levels" },
    {
      name: "Communication",
      value: 50,
      description: "Average communication between teams",
    },
    { name: "Collaboration", value: 70, description: "Good collaboration" },
    { name: "Feedback", value: 90, description: "High feedback scores" },
    { name: "Recognition", value: 20, description: "Very low recognition" },
    { name: "Growth", value: 40, description: "Moderate growth opportunities" },
    { name: "Retention", value: 60, description: "Good retention rates" },
    { name: "Diversity", value: 75, description: "High diversity scores" },
    { name: "Inclusion", value: 85, description: "Very high inclusion scores" },
    {
      name: "Innovation",
      value: 55,
      description: "Moderate innovation levels",
    },
    {
      name: "Leadership",
      value: 45,
      description: "Average leadership quality",
    },
    { name: "Culture", value: 25, description: "Low cultural alignment" },
    { name: "Values", value: 35, description: "Moderate values alignment" },
    { name: "Vision", value: 95, description: "Very high vision alignment" },
    { name: "Mission", value: 10, description: "Very low mission alignment" },
    { name: "Strategy", value: 5, description: "Very low strategic alignment" },
    { name: "Execution", value: 55, description: "Moderate execution quality" },
    { name: "Performance", value: 65, description: "Good performance levels" },
    { name: "Accountability", value: 75, description: "High accountability" },
    { name: "Trust", value: 85, description: "Very high trust levels" },
    { name: "Transparency", value: 95, description: "Excellent transparency" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - fixed on desktop, toggleable on mobile */}
      <div className="fixed inset-y-0 left-0 z-50 md:relative md:flex">
        <Sidebar activeTab="Overview" />
      </div>
      {/* Main content area */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-gray-100 z-10 py-6 px-6">
          <div className="flex items-center gap-3">
            <span className="text-[#80C342]">
              <FaChartBar size={44} />
            </span>
            <h1 className="text-4xl font-semibold text-gray-800">Overview</h1>
          </div>
        </header>
        {/* Dashboard content */}
        <main className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left column */}
            <div className="space-y-4">
              {/* Employee Satisfaction Gauge */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <EmployeeSatisfactionGauge />
              </div>
              {/* Average Vibemeter Score */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <VibemeterChart />
              </div>
            </div>
            {/* Right column - High Concern Employees */}
            <div className="bg-white rounded-lg shadow overflow-hidden h-full">
              <HighConcernEmployees />
            </div>
          </div>
          {/* Bubble Chart */}
          <div className="mt-4">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <AdminBubbleChart data={bubbleDemoData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

import EmployeeSatisfactionGauge from "@/components/Admin/employee-satisfaction";
import HighConcernEmployees from "@/components/Admin/new-high-concern-employee";
import VibemeterChart from "@/components/Admin/average-vibemeter-score";
import BubbleChartPreview from "@/components/Admin/bubble-chart";
import Sidebar from "@/components/Admin/sidenav";
import { FaChartBar } from "react-icons/fa";
import { useState } from "react";

export default function AdminDashboard() {
  // For responsive sidebar toggling on mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - fixed on desktop, toggleable on mobile */}
      <div className="fixed inset-y-0 left-0 z-50 md:relative md:flex">
        <Sidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          activeTab="Overview"
        />
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-auto">
        {/* Header - now in gray area */}
        <header className=" bg-gray-100 z-10 py-4 px-6">
          <div className="flex items-center gap-3">
            <span className="text-[#80C342]">
              <FaChartBar size={44} />
            </span>
            <h1 className="text-4xl font-semibold text-gray-800">Overview</h1>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column - contains both charts stacked vertically */}
            <div className="space-y-6">
              {/* Employee Satisfaction Gauge */}
              <div className="bg-white rounded-lg shadow">
                <EmployeeSatisfactionGauge />
              </div>

              {/* Average Vibemeter Score */}
              <div className="bg-white rounded-lg shadow">
                <VibemeterChart />
              </div>
            </div>

            {/* Right column - contains only High Concern Employees */}
            <div className="md:flex md:flex-col">
              {/* High Concern Employees - full height */}
              <div className="bg-white rounded-lg shadow h-full">
                <HighConcernEmployees />
              </div>
            </div>
          </div>

          {/* Bubble Chart - spans the entire row */}
          <div className="mt-6">
            <div className="bg-white rounded-lg shadow">
              <BubbleChartPreview />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

import { useState } from "react";
import VibemeterChart from "@/components/average-vibemeter-score";
import HighConcernEmployees from "@/components/high-concern-employees";
import Sidebar from "@/components/sidenav";
import EmployeeSatisfactionGauge from "@/components/employee-satisfaction";

export default function AdminDashboard() {
  // For responsive sidebar toggling on mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - fixed on desktop, toggleable on mobile */}
      <div className="fixed inset-y-0 left-0 z-50 md:relative md:flex">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 bg-white shadow z-10 py-4 px-6">
          <div className="flex justify-between items-center">
            <button
              className="md:hidden text-gray-500"
              onClick={() => setSidebarOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Admin User</span>
              <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                A
              </div>
            </div>
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
        </main>
      </div>
    </div>
  );
}

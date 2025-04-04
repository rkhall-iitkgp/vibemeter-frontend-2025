import EmployeeSatisfactionGauge from "@/components/Admin/employee-satisfaction";
import HighConcernEmployees from "@/components/Admin/new-high-concern-employee";
import VibemeterChart from "@/components/Admin/average-vibemeter-score";
import BubbleChartPreview from "@/components/Admin/bubble-chart";
import { FaChartBar } from "react-icons/fa";

export default function AdminDashboard() {
	return (
		<div className="flex-1 overflow-auto">
			{/* Header - consistent padding with main content */}
			<header className="bg-gray-100 z-10 p-6 pt-8">
				<div className="flex items-center gap-3">
					<span className="text-[#80C342]">
						<FaChartBar size={40} />
					</span>
					<h1 className="text-4xl font-semibold text-gray-800">Overview</h1>
				</div>
			</header>

			{/* Dashboard content - consistent padding with smaller gaps */}
			<main className="p-6 pt-4">
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

				{/* Bubble Chart - consistent top margin */}
				<div className="mt-4">
					<div className="bg-white rounded-lg shadow overflow-hidden">
						<BubbleChartPreview />
					</div>
				</div>
			</main>
		</div>
	);
}

import { FaChartBar } from "react-icons/fa";

export default function EmployeeList() {
  return (
    <div className="flex-1 overflow-auto">
      {/* Header - now in gray area */}
      <header className=" bg-gray-100 z-10 py-4 px-6">
        <div className="flex items-center gap-3">
          <span className="text-[#80C342]">
            <FaChartBar size={44} />
          </span>
          <h1 className="text-4xl font-semibold text-gray-800">Employee</h1>
        </div>
      </header>

      {/* Dashboard content */}
      <main className="p-6">Under Construction</main>
    </div>
  );
}

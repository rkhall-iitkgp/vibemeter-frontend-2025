import { EmployeeDetailsSheet } from "@/components/Employees/employee-details-sheet";
import { DataTable, type Employee } from "@/components/Employees/DataTable";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";

// Mock data for High Concern Employees - using exact data from image
const highConcernEmployees: Employee[] = [
  {
    id: "EMP34522",
    name: "Arhan",
    jobTitle: "Support Agent",
    dateAdded: "02/15/2023",
  },
  {
    id: "EMP34932",
    name: "Meera",
    jobTitle: "Sales Associate",
    dateAdded: "03/10/2023",
  },
  {
    id: "EMP34562",
    name: "Rohan",
    jobTitle: "Tech Support",
    dateAdded: "04/05/2023",
  },
  {
    id: "EMP34512",
    name: "Sanya",
    jobTitle: "HR Specialist",
    dateAdded: "05/20/2023",
  },
  {
    id: "EMP34582",
    name: "Dev",
    jobTitle: "Marketing Executive",
    dateAdded: "06/18/2023",
  },
];

// Mock data for Mid Concern Employees
const midConcernEmployees: Employee[] = [
  {
    id: "EMP34522",
    name: "Arhan",
    jobTitle: "Support Agent",
    dateAdded: "02/15/2023",
  },
  {
    id: "EMP34532",
    name: "Meera",
    jobTitle: "Operations Manager",
    dateAdded: "07/12/2023",
  },
  {
    id: "EMP34542",
    name: "Kunal",
    jobTitle: "Software Engineer",
    dateAdded: "08/30/2023",
  },
  {
    id: "EMP34552",
    name: "Tina",
    jobTitle: "Recruiter",
    dateAdded: "09/25/2023",
  },
  {
    id: "EMP34562",
    name: "Rohan",
    jobTitle: "Tech Support",
    dateAdded: "04/05/2023",
  },
];

// Mock data for All Employees
const allEmployees: Employee[] = [
  {
    id: "EMP34512",
    name: "Sanya",
    jobTitle: "HR Specialist",
    dateAdded: "05/20/2023",
  },
  {
    id: "EMP34522",
    name: "Arhan",
    jobTitle: "Support Agent",
    dateAdded: "02/15/2023",
  },
  {
    id: "EMP34532",
    name: "Meera",
    jobTitle: "Operations Manager",
    dateAdded: "07/12/2023",
  },
  {
    id: "EMP34542",
    name: "Kunal",
    jobTitle: "Software Engineer",
    dateAdded: "08/30/2023",
  },
  {
    id: "EMP34552",
    name: "Tina",
    jobTitle: "Recruiter",
    dateAdded: "09/25/2023",
  },
];

export default function EmployeesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleViewDetails = (employee: Employee) => {
    console.log(`View details for employee ${employee.id}`);
    setSelectedEmployee(employee);
    setSheetOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex-1 overflow-auto">
      {/* Header - now in gray area */}
      <header className=" bg-gray-100 z-10 p-6 pt-8">
        <div className="flex items-center gap-3">
          <span className="text-[#80C342]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </span>
          <h1 className="text-4xl font-semibold text-gray-800">Employees</h1>
        </div>
      </header>

      {/* Dashboard content */}
      <main className="p-6">
        <div className="mb-4">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="space-y-0">
          <DataTable
            title="High Concern Employees"
            data={highConcernEmployees}
            iconColor="#ff0000"
            searchQuery={searchQuery}
            handleViewDetails={handleViewDetails}
          />

          <DataTable
            title="Mid Concern Employees"
            data={midConcernEmployees}
            iconColor="#ffa500"
            searchQuery={searchQuery}
            handleViewDetails={handleViewDetails}
          />

          <DataTable
            title="All Employees"
            data={allEmployees}
            iconColor="#00ff00"
            searchQuery={searchQuery}
            handleViewDetails={handleViewDetails}
          />
        </div>
        {selectedEmployee && (
          <EmployeeDetailsSheet
            employee={{
              ...selectedEmployee,
              email:
                selectedEmployee.email ||
                `${selectedEmployee.name.toLowerCase()}@deloitte.com`,
              phone: selectedEmployee.phone || "+1 (555) 123-4567",
              employeeId: selectedEmployee.id,
              avatar: "/placeholder.svg?height=80&width=80",
              recentAchievements: [
                { title: "Top Contributor", date: "March 2025" },
                { title: "Innovation Award", date: "February 2025" },
              ],
              chatInteractionSummary:
                "The employee inquires about requesting vacation time and provides preferred dates. The HR chatbot checks availability and confirms that the requested dates are available.",
              focusGroups: [
                {
                  title: "Employee Engagement Task Force",
                  date: "March 17, 2025",
                  description:
                    "A group dedicated to developing leadership skills and strategic decision-making among employees.",
                  memberCount: 12,
                },
              ],
              actionPlans: [
                {
                  title: "Employee Engagement Task Force",
                  date: "March 17, 2025",
                  description:
                    "A group dedicated to developing leadership skills and strategic decision-making among employees.",
                  memberCount: 12,
                },
              ],
            }}
            open={sheetOpen}
            onOpenChange={setSheetOpen}
          />
        )}
      </main>
    </div>
  );
}

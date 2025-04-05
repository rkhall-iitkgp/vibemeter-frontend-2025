import { EmployeeDetailsSheet } from "@/components/Employees/employee-details-sheet";
import { DataTable, type Employee } from "@/components/Employees/DataTable";
import SearchBar from "@/components/SearchBar";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Updated Employee type to match backend format
type BackendEmployee = {
  employee_id: string;
  email: string;
  is_verified: boolean;
  risk_score: number;
  job_title: string;
  date_added: string;
};

// New type for the detailed employee data from API
type EmployeeDetail = {
  name: string;
  job_title: string;
  email: string;
  phone_number: string;
  created_at: string | null;
  employee_id: string;
  awards: {
    award_type: string;
    award_date: string;
    reward_points: number;
  }[];
  vibemeter: {
    average_vibe_score: number;
    score_change: {
      percentage: number;
      direction: string;
    };
    monthly_scores: {
      month: string;
      score: number;
    }[];
  };
  chat_summary: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  focus_groups: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action_plans: any[];
};

// Function to convert backend employee format to frontend Employee format
const convertToFrontendFormat = (employee: BackendEmployee): Employee => {
  return {
    id: employee.employee_id,
    name: employee.email.split("@")[0].replace("_", " "), // Extracting name from email
    jobTitle: employee.job_title,
    dateAdded: formatDate(employee.date_added),
    email: employee.email,
    riskScore: employee.risk_score,
    isVerified: employee.is_verified,
  };
};

// Function to format date from YYYY-MM-DD to MM/DD/YYYY
const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}/${date.getFullYear()}`;
};

export default function EmployeesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { employee_id } = useParams<{ employee_id: string }>();
  const [highRiskEmployees, setHighRiskEmployees] = useState<Employee[]>([]);
  const [mediumRiskEmployees, setMediumRiskEmployees] = useState<Employee[]>(
    []
  );
  const [lowRiskEmployees, setLowRiskEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [selectedEmployeeDetails, setSelectedEmployeeDetails] =
    useState<EmployeeDetail | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const handleViewDetails = async (employee: Employee) => {
    console.log(`View details for employee ${employee.id}`);
    setSelectedEmployee(employee);
    setSheetOpen(true);

    // Fetch detailed employee information
    await fetchEmployeeDetails(employee.id);
  };

  const fetchEmployeeDetails = async (employeeId: string) => {
    setIsLoadingDetails(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/employee/${employeeId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch employee details");
      }
      const data = await response.json();
      setSelectedEmployeeDetails(data);
    } catch (error) {
      console.error("Error fetching employee details:", error);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const fetchEmployeeData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BACKEND_URL}/api/employee`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Convert backend data to frontend format
        setHighRiskEmployees(
          data.high_risk_employees.map(convertToFrontendFormat)
        );
        setMediumRiskEmployees(
          data.medium_risk_employees.map(convertToFrontendFormat)
        );
        setLowRiskEmployees(
          data.low_risk_employees.map(convertToFrontendFormat)
        );
      } catch (error) {
        console.error("Error fetching employee data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  // If employee_id is provided in URL params, fetch details for that employee
  useEffect(() => {
    if (employee_id) {
      // Find the employee in our lists
      const employee = [
        ...highRiskEmployees,
        ...mediumRiskEmployees,
        ...lowRiskEmployees,
      ].find((emp) => emp.id === employee_id);

      if (employee) {
        setSelectedEmployee(employee);
        setSheetOpen(true);
        fetchEmployeeDetails(employee_id);
      }
    }
  }, [employee_id, highRiskEmployees, mediumRiskEmployees, lowRiskEmployees]);

  // Map detailed employee data to the format expected by EmployeeDetailsSheet
  const mapEmployeeDetailsToSheetFormat = () => {
    if (!selectedEmployee || !selectedEmployeeDetails) return null;

    // Ensure we're handling all focus groups and action plans correctly
    const mappedFocusGroups = Array.isArray(
      selectedEmployeeDetails.focus_groups
    )
      ? selectedEmployeeDetails.focus_groups.map((fg) => ({
        title: fg.title || fg.name || "Unnamed Group",
        date:
          fg.date || fg.created_at || formatDate(new Date().toISOString()),
        description:
          fg.description || fg.summary || "No description available",
        memberCount:
          fg.memberCount || fg.member_count || fg.members?.length || 0,
      }))
      : [];

    const mappedActionPlans = Array.isArray(
      selectedEmployeeDetails.action_plans
    )
      ? selectedEmployeeDetails.action_plans.map((ap) => ({
        title: ap.title || ap.name || "Unnamed Plan",
        date:
          ap.date || ap.created_at || formatDate(new Date().toISOString()),
        description:
          ap.description || ap.summary || "No description available",
        memberCount:
          ap.memberCount || ap.member_count || ap.members?.length || 0,
      }))
      : [];

    return {
      ...selectedEmployee,
      name: selectedEmployeeDetails.name || selectedEmployee.name,
      jobTitle: selectedEmployeeDetails.job_title || selectedEmployee.jobTitle,
      email: selectedEmployeeDetails.email || selectedEmployee.email,
      phone:
        selectedEmployeeDetails.phone_number ||
        selectedEmployee.phone ||
        "+1 (555) 123-4567",
      dateAdded:
        formatDate(selectedEmployeeDetails.created_at) ||
        selectedEmployee.dateAdded,
      employeeId: selectedEmployeeDetails.employee_id || selectedEmployee.id,
      avatar: "/placeholder.svg?height=80&width=80",
      recentAchievements: Array.isArray(selectedEmployeeDetails.awards)
        ? selectedEmployeeDetails.awards.map((award) => ({
          title: award.award_type,
          date: formatDate(award.award_date),
          points: award.reward_points,
        }))
        : [],
      chatInteractionSummary:
        selectedEmployeeDetails.chat_summary ||
        "No chat interactions recorded.",
      focusGroups: mappedFocusGroups,
      actionPlans: mappedActionPlans,
      vibeScore: selectedEmployeeDetails.vibemeter
        ? {
          average: selectedEmployeeDetails.vibemeter.average_vibe_score,
          change: {
            percentage:
              selectedEmployeeDetails.vibemeter.score_change.percentage,
            direction:
              selectedEmployeeDetails.vibemeter.score_change.direction,
          },
          monthlyScores: selectedEmployeeDetails.vibemeter.monthly_scores,
        }
        : undefined,
    };
  };

  return (
    <div className="flex-1 overflow-auto">
      {/* Header - now in gray area */}
      <header className="bg-gray-100 z-10 p-6 pt-8">
        <div className="flex items-center gap-3">
          <span className="text-[#80C342]">
            <img src="/icons/Employees.svg" className="w-[40px] h-[40px]" />
          </span>
          <h1 className="text-4xl font-semibold text-gray-800">Employees</h1>
        </div>
      </header>

      {/* Dashboard content */}
      <main className="p-6 pt-2">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center">
            <div className="relative w-128 mr-3">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search Focus groups"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading employee data...</p>
          </div>
        ) : (
          <div className="space-y-0">
            <DataTable
              title="High Risk Employees"
              data={highRiskEmployees}
              iconColor="#ff0000"
              searchQuery={searchQuery}
              handleViewDetails={handleViewDetails}
            />

            <DataTable
              title="Medium Risk Employees"
              data={mediumRiskEmployees}
              iconColor="#ffa500"
              searchQuery={searchQuery}
              handleViewDetails={handleViewDetails}
            />

            <DataTable
              title="Low Risk Employees"
              data={lowRiskEmployees}
              iconColor="#00ff00"
              searchQuery={searchQuery}
              handleViewDetails={handleViewDetails}
            />
          </div>
        )}

        {selectedEmployee && (
          <EmployeeDetailsSheet
            employee={
              selectedEmployeeDetails
                ? mapEmployeeDetailsToSheetFormat()
                : {
                  ...selectedEmployee,
                  email:
                    selectedEmployee.email ||
                    `${selectedEmployee.name.toLowerCase()}@deloitte.com`,
                  phone: selectedEmployee.phone || "+1 (555) 123-4567",
                  employeeId: selectedEmployee.id,
                  avatar: "/placeholder.svg?height=80&width=80",
                  recentAchievements: [],
                  chatInteractionSummary: isLoadingDetails
                    ? "Loading..."
                    : "",
                  focusGroups: [],
                  actionPlans: [],
                }
            }
            isLoading={isLoadingDetails}
            open={sheetOpen}
            onOpenChange={setSheetOpen}
          />
        )}
      </main>
    </div>
  );
}

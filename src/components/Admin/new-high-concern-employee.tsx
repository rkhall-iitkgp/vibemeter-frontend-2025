import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import MeetingScheduler from "@/pages/MeetingScheduler";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { Employee } from "@/store";
import { useState } from "react";
// import { Calendar } from "lucide-react";

// Types for better export readiness

type HighConcernEmployeesProps = {
  className?: string;
  employees?: Employee[];
  month?: string;
  loading?: boolean;
};

// New Intervention Card Component
const InterventionEmployeeCard = ({ employee }: { employee: Employee }) => {
  const [showMeetingScheduler, setShowMeetingScheduler] = useState(false);
  const getInitials = (name: string) => name.charAt(0).toUpperCase();
  const navigate = useNavigate();

  return (
    <>
      <Card className="border-2 border-red-500 rounded-lg mb-2 overflow-hidden">
        <div className="p-3 sm:p-2">
          <div className="flex items-start gap-3 sm:gap-4">
            {/* Avatar with notification badge */}
            <div className="relative shrink-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-teal-700">
                <Avatar className="w-14 h-14 sm:w-16 sm:h-16">
                  <AvatarImage src={employee.avatar} alt={employee.name} />
                  <AvatarFallback className="bg-teal-700 text-white text-base sm:text-lg">
                    {getInitials(employee.name)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold border-2 border-white">
                !
              </div>
            </div>

            {/* Employee details */}
            <div className="flex-grow min-w-0">
              <div className="flex justify-between items-start w-full">
                <div className="min-w-0 pr-2">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate">
                    {employee.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5 truncate">
                    {employee.focus_groups}
                  </p>
                  <p className="text-red-500 font-medium text-xs sm:text-sm mt-1">
                    Needs Immediate Intervention!
                  </p>
                </div>
                <p className="text-xs text-gray-400 whitespace-nowrap">
                  #{employee.employee_id}
                </p>
              </div>

              <Button
                className="bg-[#80C342] hover:bg-[#5A9027] mr-2 text-white text-xs sm:text-sm px-2 sm:px-4 py-2 mt-2 rounded-md font-medium h-auto"
                onClick={() => setShowMeetingScheduler(true)}
              >
                Schedule a Meet
              </Button>
              <Button
                className="bg-white hover:bg-gray-100 text-black border w-24 text-xs sm:text-sm px-2 sm:px-4 py-2 mt-2 rounded-md font-medium h-auto"
                onClick={() => navigate(`/employees/${employee.employee_id}`)}
              >
                View
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {showMeetingScheduler && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <MeetingScheduler
            participantName={employee.name}
            participantId={employee.employee_id}
            participantGroup={employee.focus_groups}
            onCancel={() => setShowMeetingScheduler(false)}
            onClose={() => setShowMeetingScheduler(false)}
          />
        </div>
      )}
    </>
  );
};

// Standard Employee Card Component
const EmployeeCard = ({ employee }: { employee: Employee }) => {
  const getInitials = (name: string) => name.charAt(0).toUpperCase();

  return (
    <Card className="border border-gray-200 rounded-lg  mb-2">
      <CardContent className="py-2 px-3 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-2">
          <Avatar className="w-8 h-8 sm:w-9 sm:h-9 ring-1 ring-gray-100 shrink-0">
            <AvatarImage src={employee.avatar} alt={employee.name} />
            <AvatarFallback className="bg-gray-200 text-gray-700 text-xs">
              {getInitials(employee.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow min-w-0">
            <div className="flex justify-between items-baseline">
              <p className="font-semibold text-gray-900 text-sm truncate max-w-[120px] sm:max-w-[200px]">
                {employee.name}
              </p>
              <p className="text-xs text-gray-400 whitespace-nowrap">
                {employee.employee_id}
              </p>
            </div>
            <p className="text-xs text-gray-500 truncate">
              {employee.focus_groups}
            </p>
          </div>
        </div>
        <div className="mt-1 flex gap-1 flex-wrap">
          {/* {employee.metrics.map((metric, idx) => (
            <span
              key={idx}
              className={`text-xs px-2 py-1 mt-1 rounded-sm font-medium ${metric.color}`}
            >
              {metric.label} {metric.value}
            </span>
          ))} */}
        </div>
      </CardContent>
    </Card>
  );
};

const EmployeeCardSkeleton = () => {
  return (
    <Card className="border border-gray-200 rounded-lg mb-2 animate-pulse">
      <CardContent className="py-2 px-3 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-2">
          <Avatar className="w-8 h-8 sm:w-9 sm:h-9 ring-1 ring-gray-100 shrink-0 bg-gray-200" />
          <div className="flex-grow min-w-0 flex gap-1 flex-col">
            <div className="flex justify-between items-baseline">
              <p className="bg-gray-200 h-[14px] w-[120px] sm:w-[200px] rounded-md" />
              <p className="bg-gray-200 h-[14px] w-[50px] rounded-md" />
            </div>
            <p className="text-xs text-gray-500 truncate bg-gray-200 h-[14px] w-[150px] rounded-md" />
          </div>
        </div>
        <div className="mt-1 flex gap-1.5 flex-wrap">
          <p className="bg-gray-200 h-[24px] w-[120px] rounded-sm" />
          <p className="bg-gray-200 h-[24px] w-[200px] rounded-sm" />
        </div>
      </CardContent>
    </Card>
  );
};

// Main Component
export default function HighConcernEmployees({
  className = "",
  employees,
  loading,
}: HighConcernEmployeesProps) {
  // const [currentMonth, setCurrentMonth] = useState(month);

  // Intervention employees
  const interventionEmployees =
    employees?.filter((emp) => emp.escalated && !emp.meet_scheduled) || [];
  // Regular high concern employees
  const regularEmployees =
    employees
      ?.filter((emp) => !(emp.escalated && !emp.meet_scheduled))
      .slice(0, 6 - interventionEmployees.length) || [];

  return (
    <div className={`rounded-md bg-white h-full flex flex-col ${className}`}>
      {/* Header section */}
      <div className="flex justify-between items-center mb-4 px-3 sm:px-4 pt-4">
        <div className="min-w-0 pr-2">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            High Concern Employees
          </h2>
          <p className="text-xs text-gray-500">
            Employees who need most attention
          </p>
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-1.5 py-1 sm:py-1.5 px-2 sm:px-3 h-auto border border-gray-300 rounded bg-white whitespace-nowrap"
        >
          <span className="text-sm font-normal">≡</span>
          <span className="text-sm">{"March"}</span>
        </Button>
      </div>

      {/* Employee cards section */}
      {loading ? (
        <div className="overflow-y-auto px-3 sm:px-4 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {Array.from({ length: 5 }).map((_, index) => (
            <EmployeeCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="overflow-y-auto px-3 sm:px-4 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {/* First display intervention cards */}
          {interventionEmployees.length > 0 && (
            <div>
              {interventionEmployees.map((employee) => (
                <InterventionEmployeeCard
                  key={employee.employee_id}
                  employee={employee}
                />
              ))}
            </div>
          )}

          {/* Then display regular cards */}
          {regularEmployees.length > 0 && (
            <div>
              {regularEmployees.map((employee) => (
                <EmployeeCard key={employee.employee_id} employee={employee} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {employees?.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-gray-500 mb-2">
                No high concern employees at this time
              </p>
              <p className="text-sm text-gray-400">
                All employees are doing well!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

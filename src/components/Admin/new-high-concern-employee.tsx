import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Types for better export readiness
type Metric = {
  label: string;
  value: string;
  color: string;
};

type Employee = {
  id: string;
  name: string;
  avatar: string;
  group: string;
  needsIntervention: boolean;
  metrics: Metric[];
};

type HighConcernEmployeesProps = {
  className?: string;
  employees?: Employee[];
  month?: string;
};

// Default employee data
const defaultEmployees: Employee[] = [
  {
    id: "EM1234543",
    name: "Ankan",
    avatar: "/avatars/ankan.png",
    group: "Leadership Training",
    needsIntervention: true,
    metrics: [],
  },
  {
    id: "EM1234564",
    name: "Ankan",
    avatar: "/avatars/ankan.png",
    group: "Leadership Training #GRP12345",
    needsIntervention: false,
    metrics: [
      { label: "Morality", value: "-28%", color: "bg-yellow-200 text-yellow-800" },
      { label: "Engagement", value: "-40%", color: "bg-blue-200 text-blue-800" },
    ],
  },
  {
    id: "EM4567890",
    name: "Ankan",
    avatar: "/avatars/ankan.png",
    group: "Leadership Training #GRP12345",
    needsIntervention: false,
    metrics: [
      { label: "Morality", value: "-28%", color: "bg-yellow-200 text-yellow-800" },
      { label: "Engagement", value: "-40%", color: "bg-blue-200 text-blue-800" },
    ],
  },
  {
    id: "EM7890123",
    name: "Ankan",
    avatar: "/avatars/ankan.png",
    group: "Leadership Training #GRP12345",
    needsIntervention: false,
    metrics: [
      { label: "Leave Impact", value: "+38%", color: "bg-green-200 text-green-800" },
      { label: "Morality", value: "-18%", color: "bg-yellow-200 text-yellow-800" },
    ],
  },
];

// New Intervention Card Component
const InterventionEmployeeCard = ({ employee }: { employee: Employee }) => {
  const getInitials = (name: string) => name.charAt(0).toUpperCase();
  
  return (
    <Card className="border border-red-500 rounded-lg mb-4 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-3 sm:p-4">
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
            <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold border-2 border-white">!</div>
          </div>
          
          {/* Employee details */}
          <div className="flex-grow min-w-0">
            <div className="flex justify-between items-start w-full">
              <div className="min-w-0 pr-2">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate">{employee.name}</h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-0.5 truncate">{employee.group}</p>
                <p className="text-red-500 font-medium text-xs sm:text-sm mt-1">Needs Immediate Intervention!</p>
              </div>
              <p className="text-xs text-gray-400 whitespace-nowrap">#{employee.id}</p>
            </div>
            
            <Button 
              className="bg-[#80C342] hover:bg-green-600 text-white text-xs sm:text-sm px-2 sm:px-4 py-1 mt-2 rounded-md font-medium h-auto"
            >
              <Calendar size={14} className="mr-1.5 hidden sm:inline" />
              Schedule a Meet
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Standard Employee Card Component
const EmployeeCard = ({ employee }: { employee: Employee }) => {
  const getInitials = (name: string) => name.charAt(0).toUpperCase();

  return (
    <Card className="border border-gray-200 rounded-lg shadow-sm mb-2 hover:shadow transition-shadow duration-200">
      <CardContent className="py-1 px-3 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <Avatar className="w-8 h-8 sm:w-9 sm:h-9 ring-1 ring-gray-100 shrink-0">
            <AvatarImage src={employee.avatar} alt={employee.name} />
            <AvatarFallback className="bg-gray-200 text-gray-700 text-xs">
              {getInitials(employee.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow min-w-0">
            <div className="flex justify-between items-baseline">
              <p className="font-semibold text-gray-900 text-sm truncate max-w-[120px] sm:max-w-[200px]">{employee.name}</p>
              <p className="text-xs text-gray-400 whitespace-nowrap">{employee.id}</p>
            </div>
            <p className="text-xs text-gray-500 truncate">{employee.group}</p>
          </div>
        </div>
        <div className="mt-1 flex gap-1 flex-wrap">
          {employee.metrics.map((metric, idx) => (
            <span
              key={idx}
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${metric.color}`}
            >
              {metric.label} {metric.value}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Main Component
export default function HighConcernEmployees({ 
  className = "", 
  employees = defaultEmployees,
  month = "March" 
}: HighConcernEmployeesProps) {
  const [currentMonth, setCurrentMonth] = useState(month);
  
  // Intervention employees
  const interventionEmployees = employees.filter(emp => emp.needsIntervention);
  // Regular high concern employees
  const regularEmployees = employees.filter(emp => !emp.needsIntervention);

  return (
    <div className={`bg-white h-full flex flex-col ${className}`}>
      {/* Header section */}
      <div className="flex justify-between items-center mb-4 px-3 sm:px-4 pt-4">
        <div className="min-w-0 pr-2">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">High Concern Employees</h2>
          <p className="text-xs text-gray-500">Employees who need most attention</p>
        </div>
        <Button variant="outline" className="flex items-center gap-1.5 py-1 sm:py-1.5 px-2 sm:px-3 h-auto border border-gray-300 rounded bg-white whitespace-nowrap">
          <span className="text-sm font-normal">≡</span>
          <span className="text-sm">{currentMonth}</span>
        </Button>
      </div>

      {/* Employee cards section */}
      <div className="overflow-y-auto px-3 sm:px-4 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {/* First display intervention cards */}
        {interventionEmployees.length > 0 && (
          <div>
            {interventionEmployees.map(employee => (
              <InterventionEmployeeCard key={employee.id} employee={employee} />
            ))}
          </div>
        )}
        
        {/* Then display regular cards */}
        {regularEmployees.length > 0 && (
          <div>
            {regularEmployees.map(employee => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
          </div>
        )}
        
        {/* Empty state */}
        {employees.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-gray-500 mb-2">No high concern employees at this time</p>
            <p className="text-sm text-gray-400">All employees are doing well!</p>
          </div>
        )}
      </div>
    </div>
  );
}
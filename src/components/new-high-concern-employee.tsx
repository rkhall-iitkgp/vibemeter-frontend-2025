import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Updated employee data with intervention flag
const employees = [
  {
    id: "EM1234543",
    name: "Ankan",
    avatar: "/avatars/ankan.png",
    group: "Leadership Training",
    needsIntervention: true,
    metrics: [
      { label: "Morality", value: "-28%", color: "bg-yellow-200 text-yellow-800" },
      { label: "Engagement", value: "-40%", color: "bg-blue-200 text-blue-800" },
    ],
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
      { label: "Leave Impact", value: "+38%", color: "bg-green-200 text-green-800" },
      { label: "Morality", value: "-18%", color: "bg-yellow-200 text-yellow-800" },
    ],
  },
  {
    id: "EM7890123",
    name: "Ankan",
    avatar: "/avatars/ankan.png",
    group: "Leadership Training #GRP12345",
    needsIntervention: false,
    metrics: [
      { label: "Cultural Score", value: "+22%", color: "bg-red-200 text-red-800" },
      { label: "Risk Retention", value: "-12%", color: "bg-pink-200 text-pink-800" },
    ],
  }
];

// Standard Employee Card Component (reused from original)
const EmployeeCard = ({ employee }) => {
  const getInitials = (name) => name.charAt(0).toUpperCase();

  return (
    <Card className="border border-gray-200 rounded-lg shadow-sm mb-3 hover:shadow transition-shadow duration-200">
      <CardContent className="py-3 px-4 sm:px-5">
        <div className="flex items-center gap-3 sm:gap-4">
          <Avatar className="w-10 h-10 ring-1 ring-gray-100 border border-gray-100">
            <AvatarImage src={employee.avatar} alt={employee.name} />
            <AvatarFallback className="bg-gray-200 text-gray-700 text-xs">
              {getInitials(employee.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <div className="flex justify-between items-baseline">
              <p className="font-semibold text-gray-900 text-sm">{employee.name}</p>
              <p className="text-xs text-gray-400 font-medium">#{employee.id}</p>
            </div>
            <p className="text-xs text-gray-500 truncate max-w-[200px] sm:max-w-none">{employee.group}</p>
          </div>
        </div>
        <div className="mt-2 flex gap-2 flex-wrap">
          {employee.metrics.map((metric, idx) => (
            <span
              key={idx}
              className={`text-xs px-2.5 py-1 rounded-full font-medium ${metric.color}`}
            >
              {metric.label} {metric.value}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// New Intervention Card Component
const InterventionEmployeeCard = ({ employee }) => {
  const getInitials = (name) => name.charAt(0).toUpperCase();
  
  const handleScheduleMeet = () => {
    alert(`Scheduling meeting with ${employee.name}`);
  };

  return (
    <Card className="border border-gray-200 rounded-xl shadow-md mb-6 overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Avatar with notification badge */}
          <div className="relative shrink-0">
            <Avatar className="w-24 h-24 ring-2 ring-gray-100 border border-gray-200">
              <AvatarImage src={employee.avatar} alt={employee.name} />
              <AvatarFallback className="bg-gray-200 text-gray-700 text-xl">
                {getInitials(employee.name)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold border-2 border-white shadow-sm animate-pulse">!</div>
          </div>
          
          {/* Employee details */}
          <div className="flex-grow text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 mb-2">
              <h3 className="text-xl font-bold text-gray-900">{employee.name}</h3>
              <p className="text-sm text-gray-500 font-medium">#{employee.id}</p>
            </div>
            <p className="text-sm text-gray-600 mb-3">{employee.group}</p>
            <p className="text-red-600 font-semibold text-base mb-4 bg-red-50 py-1 px-3 rounded-md inline-block">Needs Immediate Intervention!</p>
            
            <Button 
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-medium shadow-sm hover:shadow transition-all duration-200"
              onClick={handleScheduleMeet}
            >
              <Calendar size={16} className="mr-2" />
              Schedule a Meet
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Component
export default function HighConcernEmployees({ className = "" }) {
  const [month, setMonth] = useState("March");

  return (
    <div className={`p-6 sm:p-8 bg-white rounded-xl shadow-sm h-full flex flex-col ${className}`}>
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">High Concern Employees</h2>
          <p className="text-sm text-gray-500 mt-1">Employees who need most attention</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2 self-start sm:self-auto py-2 px-4 h-auto border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
          <Calendar size={16} className="text-gray-700" />
          <span className="text-gray-700 font-medium">{month}</span>
        </Button>
      </div>

      {/* Employee cards section */}
      <div className="overflow-y-auto max-h-[calc(100vh-220px)] pr-2 flex-grow custom-scrollbar">
        {/* First display intervention cards */}
        <div className="mb-6">
          {employees
            .filter(emp => emp.needsIntervention)
            .map(employee => (
              <InterventionEmployeeCard key={employee.id} employee={employee} />
            ))}
        </div>
        
        {/* Then display regular cards */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4 pl-1">Other High Concern Employees</h3>
          {employees
            .filter(emp => !emp.needsIntervention)
            .map(employee => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
}
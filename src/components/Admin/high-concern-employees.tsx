import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Dummy employee data
const employees = [
  {
    id: "EM1234564",
    name: "Ankan",
    avatar: "/avatars/ankan.png",
    group: "Leadership Training #GRP12345",
    metrics: [
      { label: "Morality", value: "-28%", color: "bg-yellow-200 text-yellow-800" },
      { label: "Engagement", value: "-40%", color: "bg-blue-200 text-blue-800" },
    ],
  },
  {
    id: "EM4567890",
    name: "Rohit",
    avatar: "/avatars/rohit.png",
    group: "Leadership Training #GRP12345",
    metrics: [
      { label: "Leave Impact", value: "+38%", color: "bg-green-200 text-green-800" },
      { label: "Morality", value: "-18%", color: "bg-yellow-200 text-yellow-800" },
    ],
  },
  {
    id: "EM7890123",
    name: "Priya",
    avatar: "/avatars/priya.png",
    group: "Leadership Training #GRP12345",
    metrics: [
      { label: "Cultural Score", value: "+22%", color: "bg-red-200 text-red-800" },
      { label: "Risk Retention", value: "-12%", color: "bg-pink-200 text-pink-800" },
    ],
  },
  {
    id: "EM3456789",
    name: "Suresh",
    avatar: "/avatars/suresh.png",
    group: "Leadership Training #GRP12345",
    metrics: [
      { label: "Morality", value: "-28%", color: "bg-yellow-200 text-yellow-800" },
      { label: "Engagement", value: "-40%", color: "bg-blue-200 text-blue-800" },
    ],
  },
  // {
  //   id: "EM2345678",
  //   name: "Aditi",
  //   avatar: "/avatars/aditi.png",
  //   group: "Leadership Training #GRP12345",
  //   metrics: [
  //     { label: "Morality", value: "-28%", color: "bg-yellow-200 text-yellow-800" },
  //     { label: "Engagement", value: "-40%", color: "bg-blue-200 text-blue-800" },
  //   ],
  // }
];

// EmployeeCard Component
const EmployeeCard = ({ employee }: { employee: typeof employees[0] }) => {
  const getInitials = (name: string) => name.charAt(0).toUpperCase();

  return (
    <Card className="border border-gray-200 rounded-lg shadow-sm mb-2">
      <CardContent className="py-1 px-3 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <Avatar className="w-8 h-8 sm:w-9 sm:h-9 ring-1 ring-gray-100">
            <AvatarImage src={employee.avatar} alt={employee.name} />
            <AvatarFallback className="bg-gray-200 text-gray-700 text-xs">
              {getInitials(employee.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <div className="flex justify-between items-baseline">
              <p className="font-semibold text-gray-900 text-sm">{employee.name}</p>
              <p className="text-xs text-gray-400">{employee.id}</p>
            </div>
            <p className="text-xs text-gray-500 truncate max-w-[180px] sm:max-w-none">{employee.group}</p>
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

export default function HighConcernEmployees({ className = "" }) {
  const [month, setMonth] = useState("March");

  return (
    <div className={`p-4 sm:p-5 bg-white rounded-lg h-full flex flex-col ${className}`}>
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">High Concern Employees</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Employees who need most attention</p>
        </div>
        <Button variant="outline" size="sm" className="flex items-center gap-2 self-start sm:self-auto py-1.5 px-2.5 h-auto">
          <Calendar size={14} className="text-gray-700" />
          <span className="text-gray-700 font-medium">{month}</span>
        </Button>
      </div>

      {/* Employee cards section */}
      <div className="overflow-y-auto max-h-[calc(100vh-200px)] pr-1 flex-grow">
        {employees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  );
}

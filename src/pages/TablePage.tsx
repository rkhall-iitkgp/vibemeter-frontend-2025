import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown, Clock, MessageSquare, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CiSearch } from "react-icons/ci";

type Employee = {
  id: number;
  name: string;
  moraleScore: number;
  engagementScore: number;
  retentionRisk: number;
  cultureScore: number;
  hrIntervention: "Low" | "Medium" | "High";
  date: string;
  employeeId?: string;
  team?: string;
};

type SortDirection = "asc" | "desc" | null;
type SortKey = keyof Employee | null;

const TablePage: React.FC = () => {
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const employees: Employee[] = [
    {
      id: 1,
      name: "Annette Black",
      moraleScore: 72,
      engagementScore: 85,
      retentionRisk: 15,
      cultureScore: 78,
      hrIntervention: "Low",
      date: "12 Jan 2023",
      employeeId: "EMP0007",
      team: "People's Experience Team"
    },
  ];

  // Sorting logic
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      if (sortDirection === "asc") setSortDirection("desc");
      else if (sortDirection === "desc") {
        setSortDirection(null);
        setSortKey(null);
      } else setSortDirection("asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (key: SortKey) => {
    if (sortKey !== key) return <ArrowUpDown className="ml-2 h-4 w-4" />;
    if (sortDirection === "asc") return <ArrowUp className="ml-2 h-4 w-4" />;
    if (sortDirection === "desc") return <ArrowDown className="ml-2 h-4 w-4" />;
    return <ArrowUpDown className="ml-2 h-4 w-4" />;
  };

  const sortedEmployees = [...employees].sort((a, b) => {
    if (!sortKey || !sortDirection) return 0;
    let aValue = a[sortKey], bValue = b[sortKey];
    if (sortKey === "hrIntervention") {
      const priority = { Low: 1, Medium: 2, High: 3 };
      aValue = priority[a.hrIntervention];
      bValue = priority[b.hrIntervention];
    }
    return sortDirection === "asc" ? (aValue! > bValue! ? 1 : -1) : (aValue! < bValue! ? 1 : -1);
  });

  // UI Components
  const getHrInterventionBadge = (status: "Low" | "Medium" | "High") => {
    const colorMap = {
      Low: "bg-[#80C342] text-black",
      Medium: "bg-yellow-400 text-black",
      High: "bg-[#F36D65] text-black"
    };
    return <Badge className={`font-normal ${colorMap[status]}`} variant="outline">{status}</Badge>;
  };

  const ScoreBar = ({ value, color = "bg-green-500" }: { value: number, color?: string }) => (
    <div className="flex items-center gap-2 w-full">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className={`${color} h-2 rounded-full`} style={{ width: `${value}%` }}></div>
      </div>
      <span className="font-medium">{value}</span>
    </div>
  );

  // Handle employee name click
  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDialogOpen(true);
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className='w-1/5 bg-gray-200 p-4'>
        <h1 className="text-3xl font-semibold">
          <span className="text-black font-bold">Deloitte</span>
          <span className="text-green-500">.</span>
        </h1>
      </div>

      <div className='w-4/5 bg-white p-4'>
        <h2 className="text-2xl font-semibold">High-Concern Employee({employees.length})</h2>
        <div className="flex items-center mt-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <CiSearch size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search Employee"
              className="border border-gray-300 rounded-sm p-2 pl-10 focus:outline-none focus:ring-blue-500 search-input"
            />
          </div>
        </div>

        <div className="flex mt-6 w-full text-[#74828F]">
          <div className="rounded-md border w-full">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[200px]">
                    <Button variant="ghost" onClick={() => handleSort("name")} className="font-medium p-3 h-auto">
                      Name {getSortIcon("name")}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("moraleScore")} className="font-medium p-3 h-auto">
                      Morale Score {getSortIcon("moraleScore")}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("engagementScore")} className="font-medium p-3 h-auto">
                      Engagement Score {getSortIcon("engagementScore")}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("retentionRisk")} className="font-medium p-3 h-auto">
                      Retention Risk {getSortIcon("retentionRisk")}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("cultureScore")} className="font-medium p-3 h-auto">
                      Culture Score {getSortIcon("cultureScore")}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("hrIntervention")} className="font-medium p-3 h-auto">
                      HR Intervention {getSortIcon("hrIntervention")}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("date")} className="font-medium p-3 h-auto">
                      Date {getSortIcon("date")}
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell 
                      className="font-medium cursor-pointer text-blue-600 hover:underline" 
                      onClick={() => handleEmployeeClick(employee)}
                    >
                      {employee.name}
                    </TableCell>
                    <TableCell>{employee.moraleScore}</TableCell>
                    <TableCell>{employee.engagementScore}</TableCell>
                    <TableCell>{employee.retentionRisk}</TableCell>
                    <TableCell>{employee.cultureScore}</TableCell>
                    <TableCell>{getHrInterventionBadge(employee.hrIntervention)}</TableCell>
                    <TableCell>{employee.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablePage;
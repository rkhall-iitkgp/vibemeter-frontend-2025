import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type Employee = {
  id: number
  name: string
  moraleScore: number
  engagementScore: number
  retentionRisk: number
  cultureScore: number
  hrIntervention: "Low" | "Medium" | "High"
  date: string
}

type SortDirection = "asc" | "desc" | null
type SortKey = keyof Employee | null

const TablePage: React.FC = () => {
  const [sortKey, setSortKey] = useState<SortKey>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

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
    },
    {
      id: 2,
      name: "Floyd Miles",
      moraleScore: 65,
      engagementScore: 90,
      retentionRisk: 20,
      cultureScore: 74,
      hrIntervention: "Medium",
      date: "4 Feb 2023",
    },
    {
      id: 3,
      name: "Robert Fox",
      moraleScore: 80,
      engagementScore: 88,
      retentionRisk: 10,
      cultureScore: 82,
      hrIntervention: "High",
      date: "18 Mar 2023",
    },
    {
      id: 4,
      name: "Darlene Robertson",
      moraleScore: 55,
      engagementScore: 70,
      retentionRisk: 30,
      cultureScore: 60,
      hrIntervention: "High",
      date: "27 Apr 2023",
    },
    {
      id: 5,
      name: "Marvin McKinney",
      moraleScore: 68,
      engagementScore: 75,
      retentionRisk: 18,
      cultureScore: 72,
      hrIntervention: "High",
      date: "19 May 2023",
    },
    {
      id: 6,
      name: "Bessie Cooper",
      moraleScore: 90,
      engagementScore: 95,
      retentionRisk: 5,
      cultureScore: 88,
      hrIntervention: "High",
      date: "21 Jun 2023",
    },
    {
      id: 7,
      name: "Guy Hawkins",
      moraleScore: 60,
      engagementScore: 68,
      retentionRisk: 25,
      cultureScore: 65,
      hrIntervention: "High",
      date: "28 Jul 2023",
    },
    {
      id: 8,
      name: "Darrell Steward",
      moraleScore: 75,
      engagementScore: 82,
      retentionRisk: 12,
      cultureScore: 80,
      hrIntervention: "High",
      date: "22 Aug 2023",
    },
    {
      id: 9,
      name: "Jacob Jones",
      moraleScore: 50,
      engagementScore: 60,
      retentionRisk: 35,
      cultureScore: 55,
      hrIntervention: "High",
      date: "13 Sep 2023",
    },
  ];
  

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      // Toggle direction if same key
      if (sortDirection === "asc") {
        setSortDirection("desc")
      } else if (sortDirection === "desc") {
        setSortDirection(null)
        setSortKey(null)
      } else {
        setSortDirection("asc")
      }
    } else {
      // New sort key
      setSortKey(key)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (key: SortKey) => {
    if (sortKey !== key) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />
    }

    if (sortDirection === "asc") {
      return <ArrowUp className="ml-2 h-4 w-4" />
    }

    if (sortDirection === "desc") {
      return <ArrowDown className="ml-2 h-4 w-4" />
    }

    return <ArrowUpDown className="ml-2 h-4 w-4" />
  }

  const sortedEmployees = [...employees].sort((a, b) => {
    if (!sortKey || !sortDirection) return 0;
  
    let aValue = a[sortKey];
    let bValue = b[sortKey];
  
    if (sortKey === "hrIntervention") {
      const priority = { Low: 1, Medium: 2, High: 3 };
      aValue = priority[a.hrIntervention];
      bValue = priority[b.hrIntervention];
    }
  
    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getHrInterventionBadge = (status: "Low" | "Medium" | "High") => {
    const colorMap = {
      Low: "bg-green-100 text-green-800 hover:bg-green-100",
      Medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      High: "bg-red-100 text-red-800 hover:bg-red-100",
    }

    return (
      <Badge className={`font-normal ${colorMap[status]}`} variant="outline">
        {status}
      </Badge>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[200px]">
              <Button variant="ghost" onClick={() => handleSort("name")} className="font-medium p-0 h-auto">
                Name {getSortIcon("name")}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("moraleScore")} className="font-medium p-0 h-auto">
                Morale Score {getSortIcon("moraleScore")}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("engagementScore")} className="font-medium p-0 h-auto">
                Engagement Score {getSortIcon("engagementScore")}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("retentionRisk")} className="font-medium p-0 h-auto">
                Retention Risk {getSortIcon("retentionRisk")}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("cultureScore")} className="font-medium p-0 h-auto">
                Culture Score {getSortIcon("cultureScore")}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("hrIntervention")} className="font-medium p-0 h-auto">
                HR Intervention {getSortIcon("hrIntervention")}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("date")} className="font-medium p-0 h-auto">
                Date {getSortIcon("date")}
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedEmployees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell className="font-medium">{employee.name}</TableCell>
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
  )
}

export default TablePage;
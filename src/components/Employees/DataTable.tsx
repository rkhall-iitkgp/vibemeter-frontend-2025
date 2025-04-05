import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export type Employee = {
  id: string;
  name: string;
  jobTitle: string;
  dateAdded: string;
  email?: string;
  phone?: string;
  avatar?: string;
  employeeId?: string;
  recentAchievements?: {
    title: string;
    date: string;
  }[];
  chatInteractionSummary?: string;
  focusGroups?: {
    title: string;
    date: string;
    description: string;
    memberCount: number;
  }[];
  actionPlans?: {
    title: string;
    date: string;
    description: string;
    memberCount: number;
  }[];
};

type DataTableProps = {
  title: string;
  data: Employee[];
  iconColor: string;
  searchQuery: string;
  handleViewDetails: (employee: Employee) => void;
};

export function DataTable({
  title,
  data,
  iconColor,
  searchQuery,
  handleViewDetails,
}: DataTableProps) {
  const [sortBy, setSortBy] = useState("priority");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // Filter data based on search query
  const filteredData = data.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort data based on sort option
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === "priority") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "date") {
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers for row actions
  const handleScheduleMeet = (employeeId: string) => {
    console.log(`Schedule meeting with employee ${employeeId}`);
    // Implement your scheduling logic here
  };

  return (
    <div className="w-full border rounded-lg mb-8 bg-white">
      <div className="p-4 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: iconColor }}
          />
          <h2 className="text-lg font-medium">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-1 rounded-md"
              >
                Sort By: <span className="font-medium">Priority</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                <DropdownMenuRadioItem value="priority">
                  Priority
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]"></TableHead>
            <TableHead>Employee Name</TableHead>
            <TableHead>Employee ID</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Date Added</TableHead>
            <TableHead className="w-[40px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length > 0 ? (
            paginatedData.map((employee) => (
              <TableRow
                key={employee.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleViewDetails(employee)}
              >
                <TableCell></TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.jobTitle}</TableCell>
                <TableCell>{employee.dateAdded}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full  border-none"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      side="left"
                      className="w-[180px]"
                    >
                      <DropdownMenuItem
                        onClick={() => handleScheduleMeet(employee.id)}
                        className="cursor-pointer"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Meet
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click from triggering
                          handleViewDetails(employee);
                        }}
                        className="cursor-pointer"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                No results found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Always show pagination */}
      <div className="flex items-center justify-center p-4 border-t">
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-md"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {Array.from({ length: Math.max(totalPages, 1) }).map((_, index) => (
            <Button
              key={index}
              variant={currentPage === index + 1 ? "default" : "outline"}
              size="icon"
              className={`h-8 w-8 rounded-md ${currentPage === index + 1 ? "bg-[#7CC243] hover:bg-[#7CC243]/80" : ""}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-md"
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.max(totalPages, 1))
              )
            }
            disabled={currentPage === Math.max(totalPages, 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronLeft, ChevronRight, MoreVertical } from "lucide-react"

export type Employee = {
  id: string
  name: string
  jobTitle: string
  dateAdded: string
}

type DataTableProps = {
  title: string
  data: Employee[]
  iconColor: string
  searchQuery: string
}

export function DataTable({ title, data, iconColor, searchQuery }: DataTableProps) {
  const [sortBy, setSortBy] = useState("priority")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const itemsPerPage = 5

  // Filter data based on search query
  const filteredData = data.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Sort data based on sort option
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === "priority") {
      return a.name.localeCompare(b.name)
    } else if (sortBy === "date") {
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name)
    }
    return 0
  })

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Handle checkbox selection for this table only
  const handleSelectRow = (id: string) => {
    setSelectedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]))
  }

  // Handle select all for this table only
  const handleSelectAll = () => {
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(paginatedData.map((employee) => employee.id))
    }
  }

  return (
    <div className="w-full border rounded-lg mb-8">
      <div className="p-4 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: iconColor }} />
          <h2 className="text-lg font-medium">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1 rounded-md">
                Sort By: <span className="font-medium">Priority</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                <DropdownMenuRadioItem value="priority">Priority</DropdownMenuRadioItem>
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
            <TableHead className="w-[40px]">
            </TableHead>
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
              <TableRow key={employee.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(employee.id)}
                    onCheckedChange={() => handleSelectRow(employee.id)}
                    className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                </TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.jobTitle}</TableCell>
                <TableCell>{employee.dateAdded}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
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
              className={`h-8 w-8 rounded-md ${currentPage === index + 1 ? "bg-green-500 hover:bg-green-600" : ""}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-md"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.max(totalPages, 1)))}
            disabled={currentPage === Math.max(totalPages, 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}


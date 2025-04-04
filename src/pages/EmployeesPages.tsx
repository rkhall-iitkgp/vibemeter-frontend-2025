"use client";

import { DataTable, type Employee } from "@/components/DataTable";
import { SearchBar } from "@/components/SearchBar";
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

export default function TestPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Employees</h1>
        </div>

        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="space-y-0">
        <DataTable
          title="High Concern Employees"
          data={highConcernEmployees}
          iconColor="#ff0000"
          searchQuery={searchQuery}
        />

        <DataTable
          title="Mid Concern Employees"
          data={midConcernEmployees}
          iconColor="#ffa500"
          searchQuery={searchQuery}
        />

        <DataTable
          title="All Employees"
          data={allEmployees}
          iconColor="#00ff00"
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
}

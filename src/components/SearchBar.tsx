"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"

interface SearchBarProps {
  onSearch: (query: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    onSearch(value)
  }

  return (
    <div className="relative w-full max-w-xs">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Search Employees"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-10 pr-8 py-2 rounded-md w-full"
      />
      {searchQuery && (
        <button onClick={() => handleSearch("")} className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <X className="h-4 w-4 text-gray-400" />
        </button>
      )}
    </div>
  )
}


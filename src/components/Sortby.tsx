// components/SortBy.tsx
"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronDown } from "lucide-react"

interface SortByProps {
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  sortOpen: boolean;
  setSortOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SortBy: React.FC<SortByProps> = ({ sortBy, setSortBy, sortOpen, setSortOpen }) => {
  return (
    <Popover open={sortOpen} onOpenChange={setSortOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 bg-white rounded-[0.3rem]">
          <span>Sort By : {sortBy}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-3" align="end" >
        <RadioGroup
          defaultValue="Priority"
          onValueChange={(value: React.SetStateAction<string>) => {
            setSortBy(value)
            setSortOpen(false)
          }}
        >
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value="Priority" id="priority" />
            <Label htmlFor="priority">Priority</Label>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value="Date" id="date" />
            <Label htmlFor="date">Date</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Alphabetical" id="alphabetical" />
            <Label htmlFor="alphabetical">Alphabetical</Label>
          </div>
        </RadioGroup>
      </PopoverContent>
    </Popover>
  )
}

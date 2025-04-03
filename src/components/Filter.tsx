"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export interface FilterProps {
  filterOpen: boolean;
  setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export const FilterComponent: React.FC<FilterProps> = ({ filterOpen, setFilterOpen }) => {
  return (
    <Popover open={filterOpen} onOpenChange={setFilterOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 bg-white w-25 rounded-[0.3rem]">
        <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
        <path 
        d="M3 6h18M5 12h14M7 18h10" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        />
        </svg>
          <span>Filter</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-3" align="end" >
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Priority:</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="high" defaultChecked />
                <Label htmlFor="high">High</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="medium" />
                <Label htmlFor="medium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="low" />
                <Label htmlFor="low">Low</Label>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Department:</h4>
            <Select defaultValue="all">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <h4 className="font-medium mb-2">Tags:</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="team-building" defaultChecked />
                <Label htmlFor="team-building">Team Building</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="morale" defaultChecked />
                <Label htmlFor="morale">Morale</Label>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
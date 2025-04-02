"use client"

import React from "react"
import { RecognitionCard } from "@/components/recog-component"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown, Filter } from "lucide-react"

export default function TestPage() {
  const [sortOpen, setSortOpen] = React.useState(false)
  const [filterOpen, setFilterOpen] = React.useState(false)
  const [sortBy, setSortBy] = React.useState("Priority")

  // Sample data for multiple cards
  const recognitionPrograms = [
    {
      title: "Recognition Program",
      priority: "High Priority",
      description: "Implement a monthly employee recognition program to celebrate achievements and boost morale.",
      targetGroup: "All Departments",
      tags: ["Team Building", "Morale"],
    },
    {
      title: "Recognition Program",
      priority: "High Priority",
      description: "Implement a monthly employee recognition program to celebrate achievements and boost morale.",
      targetGroup: "All Departments",
      tags: ["Team Building", "Morale"],
    },
    {
      title: "Recognition Program",
      priority: "High Priority",
      description: "Implement a monthly employee recognition program to celebrate achievements and boost morale.",
      targetGroup: "All Departments",
      tags: ["Team Building", "Morale"],
    },
    {
      title: "Recognition Program",
      priority: "High Priority",
      description: "Implement a monthly employee recognition program to celebrate achievements and boost morale.",
      targetGroup: "All Departments",
      tags: ["Team Building", "Morale"],
    },
    {
      title: "Recognition Program",
      priority: "High Priority",
      description: "Implement a monthly employee recognition program to celebrate achievements and boost morale.",
      targetGroup: "All Departments",
      tags: ["Team Building", "Morale"],
    },
    {
      title: "Recognition Program",
      priority: "High Priority",
      description: "Implement a monthly employee recognition program to celebrate achievements and boost morale.",
      targetGroup: "All Departments",
      tags: ["Team Building", "Morale"],
    },
  ]

  return (
    <div className="p-5 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div></div>
        <div className="flex gap-2">
          <Popover open={sortOpen} onOpenChange={setSortOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 bg-white">
                <span>Sort By : {sortBy}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-3" align="end">
              <RadioGroup
                defaultValue="Priority"
                onValueChange={(value) => {
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

          <Popover open={filterOpen} onOpenChange={setFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 bg-white">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-3" align="end">
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
        </div>
      </div>

      <div className="w-[1100px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-100">
        {recognitionPrograms.map((program, index) => (
          <RecognitionCard
            key={index}
            title={program.title}
            priority={program.priority}
            description={program.description}
            targetGroup={program.targetGroup}
            tags={program.tags}
          />
        ))}
      </div>
    </div>
  )
}


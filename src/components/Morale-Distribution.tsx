"use client"

import React, { useState, useRef, useEffect } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define the data structure
interface MoraleData {
  name: string
  value: number
  color: string
}

// Sample data
const moraleData: MoraleData[] = [
  { name: "Very Low", value: 30, color: "#f0f8c9" },
  { name: "Low", value: 50, color: "#e6f5a3" },
  { name: "Medium", value: 60, color: "#c5e26c" },
  { name: "High", value: 34, color: "#97c93d" },
  { name: "Very High", value: 34, color: "#6b9a31" },
]

// Available metrics for filtering
const metrics = ["Morale Score", "Engagement Score", "Risk Retention Score", "Cultural Score", "Leave Impact"]

// Available months for filtering
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export default function MoraleDistribution() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState("Morale Score")
  const [selectedMonth, setSelectedMonth] = useState("March")
  const filterButtonRef = useRef<HTMLButtonElement>(null)
  const filterPopupRef = useRef<HTMLDivElement>(null) // Ref for the filter popup

  const handleOpenFilter = () => setIsFilterOpen((prev) => !prev)

  // Close the filter popup if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterPopupRef.current && !filterPopupRef.current.contains(event.target as Node) && !filterButtonRef.current?.contains(event.target as Node)) {
        setIsFilterOpen(false)
      }
    }

    // Adding the event listener
    document.addEventListener("click", handleClickOutside)

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  return (
    <Card className="w-full max-w-sm mx-auto border shadow-sm relative max-h-md">
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <div>
          <CardTitle className="text-xl font-bold">Morale Distribution</CardTitle>
          <CardDescription className="text-xsm text-muted-foreground">
            Share of employees by morale score category.
          </CardDescription>
        </div>
        <div className="relative">
          <Button
            ref={filterButtonRef}
            variant="outline"
            className="h-10 text-md border"
            onClick={handleOpenFilter}
          >
            <img src="filter.svg" alt="Filter" width="15" height="15" className="mr-3"/>
            Filter
          </Button>

          {/* Custom Filter Popup */}
          {isFilterOpen && (
            <div
              ref={filterPopupRef}
              className="absolute right-0 top-full mt-1 w-[200px] bg-white border border-gray-300 rounded-lg shadow-sm z-50 p-4 space-y-2"
            >
              <div>
                <h3 className="text-md font-medium mb-4">Metric :</h3>
                <RadioGroup value={selectedMetric} onValueChange={setSelectedMetric} className="">
                  {metrics.map((metric) => (
                    <div key={metric} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={metric}
                        id={metric}
                        className={`  
                          ${selectedMetric === metric ? " h-4 w-4 bg-[#80C342] border-grey-500 border-3" : "h-4 w-4 bg-grey-500 border-grey-500 border-8"} 
                          rounded-full relative`}
                      />
                      <Label htmlFor={metric} className="text-sm text-gray-500">
                        {metric}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <h3 className="text-md font-medium mb-4">Month:</h3>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-full border-gray-300 rounded-md h-12 text-sm text-gray-500">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={moraleData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                cornerRadius={8}
              >
                {moraleData.map((entry, index) => (
                   <Cell
                   key={`cell-${index}`}
                   fill={entry.color}
                   style={{ pointerEvents: "none" }} 
                 />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className=" grid grid-cols-2 gap-y-1">
          <div className="text-md font-medium pl-15">Division</div>
          <div className="text-md font-medium text-right pr-15">%</div>

          {moraleData.map((item, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 ml-10" style={{ backgroundColor: item.color }} />
                <span className="text-sm">{item.name}</span>
              </div>
              <div className="text-right pr-15 text-sm">{item.value}</div>
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useState, useMemo } from "react"

const HeatmapPreview = () => {
  const sampleData = [
    { date: "2025-01-05", hours: 8 },
    { date: "2025-01-06", hours: 6 },
    { date: "2025-01-07", hours: 3 },
    { date: "2025-01-08", hours: 9 },
    { date: "2025-01-09", hours: 4 },
    { date: "2025-01-10", hours: 2 },
    { date: "2025-01-11", hours: 0 },
    { date: "2025-01-12", hours: 7 },
    { date: "2025-01-13", hours: 10 },
    { date: "2025-01-15", hours: 8 },
    { date: "2025-01-17", hours: 5 },
    { date: "2025-01-19", hours: 4 },
    { date: "2025-01-20", hours: 9 },
    { date: "2025-01-22", hours: 3 },
    { date: "2025-01-24", hours: 7 },
    { date: "2025-02-03", hours: 8 },
    { date: "2025-02-05", hours: 5 },
    { date: "2025-02-07", hours: 9 },
    { date: "2025-02-10", hours: 4 },
    { date: "2025-02-12", hours: 7 },
    { date: "2025-02-14", hours: 2 },
    { date: "2025-03-03", hours: 7 },
    { date: "2025-03-05", hours: 4 },
    { date: "2025-03-07", hours: 10 },
    { date: "2025-06-03", hours: 7 },
    { date: "2025-03-05", hours: 4 },
    { date: "2025-03-07", hours: 3 },
    { date: "2025-08-03", hours: 7 },
    { date: "2025-12-05", hours: 4 },
    { date: "2025-09-07", hours: 6 },
  ]

  const getIntensityLevel = (hours: number) => {
    if (hours === 0) return "none"
    if (hours < 4) return "low"
    if (hours < 8) return "medium"
    return "high"
  }

  const getIntensityColor = (level: string) => {
    switch (level) {
      case "none":
        return "bg-white border border-gray-200"
      case "low":
        return "bg-green-100"
      case "medium":
        return "bg-green-400"
      case "high":
        return "bg-green-700"
      default:
        return "bg-white border border-gray-200"
    }
  }

  const processedData = sampleData.map((day) => ({
    date: new Date(day.date),
    hours: day.hours,
    intensityLevel: getIntensityLevel(day.hours),
  }))

  const [selectedPosition, setSelectedPosition] = useState<null | {
    month: number
    day: number
    week: number
  }>(null)

  const getDateForPosition = (month: number, day: number, week: number) => {
    const date = new Date(2025, month, 1)
    const firstDayOfWeek = day
    const firstDayDate = new Date(date)
    while (firstDayDate.getDay() !== firstDayOfWeek) {
      firstDayDate.setDate(firstDayDate.getDate() + 1)
    }
    const targetDate = new Date(firstDayDate)
    targetDate.setDate(targetDate.getDate() + week * 7)
    return targetDate
  }

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const dayLabels = ["", "M", "", "W", "", "F", ""]

  const organizedData: Record<
    number,
    Record<number, Record<number, { date: Date; hours: number; intensityLevel: string }>>
  > = useMemo(() => {
    const data: Record<
      number,
      Record<number, Record<number, { date: Date; hours: number; intensityLevel: string }>>
    > = {}
    processedData.forEach((day) => {
      const month = day.date.getMonth()
      const dayOfWeek = day.date.getDay()
      const weekOfMonth = Math.floor((day.date.getDate() - 1) / 7)
      if (!data[month]) data[month] = {}
      if (!data[month][dayOfWeek]) data[month][dayOfWeek] = {}
      data[month][dayOfWeek][weekOfMonth] = day
    })
    return data
  }, [processedData])

  const formatSelectedDate = (date: Date) =>
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)

  const getCurrentDateInfo = () => {
    const today = new Date()
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(today)
  }

  const formatTooltipContent = (dayData: { date: Date; hours: number } | null) => {
    if (dayData) {
      return (
        <div className="px-3 py-2 flex items-center gap-2">
          <div className={`w-3 h-3 ${getIntensityColor(getIntensityLevel(dayData.hours))}`}></div>
          <Label className="font-medium text-sm text-gray-800">
            {dayData.hours} {dayData.hours === 1 ? "hour" : "hours"}
          </Label>
        </div>
      )
    } else {
      return (
        <div className="px-3 py-2 flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-100"></div>
          <Label className="font-medium text-sm text-gray-500">No activity</Label>
        </div>
      )
    }
  }

  return (
    <TooltipProvider>
      <Card className="w-full shadow-md">
        <CardContent className="p-3 overflow-x-auto max-w-full">
          <div className="overflow-x-auto">
            {/* Adjusted Month Headers to align with heatmap */}
            <div className="flex gap-6 px-19">
              {monthNames.map((month, index) => (
                <Label key={index} className="flex-1 text-center text-xs font-medium text-gray-600 mb-2">
                  {month}
                </Label>
              ))}
            </div>

            {/* Heatmap Grid */}
            <div className="flex flex-col gap-1">
              {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                <div key={day} className="flex items-center mx-auto">
                  <Label className="w-6 text-xs font-medium text-gray-600">{dayLabels[day]}</Label>
                  <div className="flex gap-0.5">
                    {monthNames.map((_, monthIndex) => (
                      <div key={monthIndex} className="flex gap-0.5">
                        {Array.from({ length: 4 }).map((_, weekIndex) => {
                          const dayData = organizedData[monthIndex]?.[day]?.[weekIndex]

                          return (
                            <Tooltip key={weekIndex}>
                              <TooltipTrigger asChild>
                                <div
                                  className={`w-3.5 h-3.5 cursor-pointer transition-all duration-200 hover:scale-110 hover:ring-1 hover:ring-offset-1 hover:ring-gray-300 ${dayData ? getIntensityColor(dayData.intensityLevel) : "bg-gray-100"}`}
                                  onClick={() => {
                                    setSelectedPosition({
                                      month: monthIndex,
                                      day,
                                      week: weekIndex,
                                    })
                                  }}
                                />
                              </TooltipTrigger>
                              <TooltipContent className="bg-white shadow-md border border-gray-200 rounded-lg z-50 animate-in fade-in-50 duration-200">
                                {formatTooltipContent(dayData)}
                              </TooltipContent>
                            </Tooltip>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="w-full flex justify-between mt-3 items-center text-xs ">
              <Label className="text-sm font-medium text-gray-700 px-19 ">{selectedPosition
                  ? formatSelectedDate(getDateForPosition(selectedPosition.month, selectedPosition.day, selectedPosition.week))
                  : getCurrentDateInfo()}</Label>
              <div className="flex items-center gap-1 px-13">
                <Label className="text-sm text-gray-600">Less</Label>
                <div className="w-3 h-3 bg-white border border-gray-200" />
                <div className="w-3 h-3 bg-green-100" />
                <div className="w-3 h-3 bg-green-400" />
                <div className="w-3 h-3 bg-green-700" />
                <Label className="text-sm text-gray-600">More</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}

export default HeatmapPreview

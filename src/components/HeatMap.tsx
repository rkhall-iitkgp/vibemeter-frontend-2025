import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState, useMemo } from "react";

const HeatmapPreview = () => {
  // Sample data in JSON format with days spanning all days of the week
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
  ];

  // Get intensity level based on hours
  const getIntensityLevel = (hours: number) => {
    if (hours === 0) return "none";
    if (hours < 4) return "low";
    if (hours < 8) return "medium";
    return "high";
  };

  // Get color based on intensity level
  const getIntensityColor = (level: string) => {
    switch (level) {
      case "none":
        return "bg-white border border-gray-200";
      case "low":
        return "bg-green-100";
      case "medium":
        return "bg-green-400";
      case "high":
        return "bg-green-700";
      default:
        return "bg-white border border-gray-200";
    }
  };

  // Process data to include intensity level
  const processedData = sampleData.map((day) => ({
    date: new Date(day.date),
    hours: day.hours,
    intensityLevel: getIntensityLevel(day.hours),
  }));

  // Track selected position even if there's no data
  const [selectedPosition, setSelectedPosition] = useState<null | {
    month: number;
    day: number;
    week: number;
  }>(null);

  // Get date for a position (regardless of data availability)
  const getDateForPosition = (month: number, day: number, week: number) => {
    // Create a date for the first day of the selected month
    const date = new Date(2025, month, 1);
    
    // Get days in month
    const daysInMonth = new Date(2025, month + 1, 0).getDate();
    
    // Get the day of week of the first day of the month (0-6)
    const firstDayOfMonth = date.getDay();
    
    // Calculate the date from week and day position
    const dayOffset = day - firstDayOfMonth + (week * 7);
    
    if (dayOffset < 0 || dayOffset >= daysInMonth) {
      // This position doesn't exist in this month
      return new Date(2025, month, 1); // Return first day as fallback
    }
    
    // Set the actual date
    const targetDate = new Date(2025, month, 1 + dayOffset);
    
    return targetDate;
  };

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayLabels = ["", "M", "", "W", "", "F", ""];

  // Organize data by month and day using useMemo to prevent infinite re-renders
  const organizedData: Record<
    number,
    Record<
      number,
      Record<number, { date: Date; hours: number; intensityLevel: string }>
    >
  > = useMemo(() => {
    const data: Record<
      number,
      Record<
        number,
        Record<number, { date: Date; hours: number; intensityLevel: string }>
      >
    > = {};
    processedData.forEach((day) => {
      const month = day.date.getMonth();
      const dayOfWeek = day.date.getDay();
      
      // Calculate the position of the day within the month's grid
      const firstDayOfMonth = new Date(2025, month, 1).getDay();
      const dayOfMonth = day.date.getDate();
      const dayPosition = dayOfMonth - 1 + (firstDayOfMonth - 0); 
      const weekOfMonth = Math.floor(dayPosition / 7);

      if (!data[month]) data[month] = {};
      if (!data[month][dayOfWeek]) data[month][dayOfWeek] = {};
      data[month][dayOfWeek][weekOfMonth] = day;
    });
    return data;
  }, [processedData]);

  // Format date for display (without day name)
  const formatSelectedDate = (date: Date) =>
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);

  // Get current date info for display when no day is selected (without day name)
  const getCurrentDateInfo = () => {
    const today = new Date();
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(today);
  };

  // Format tooltip to show working hours or no activity message
  const formatTooltipContent = (
    dayData: { date: Date; hours: number } | null
  ) => {
    if (dayData) {
      return (
        <div className="px-3 py-2 flex items-center gap-2">
          <div
            className={`w-3 h-3 ${getIntensityColor(getIntensityLevel(dayData.hours))}`}
          ></div>
          <Label className="font-medium text-sm text-gray-800">
            {dayData.hours} {dayData.hours === 1 ? "hour" : "hours"}
          </Label>
        </div>
      );
    } else {
      return (
        <div className="px-3 py-2 flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-100"></div>
          <Label className="font-medium text-sm text-gray-500">
            No activity
          </Label>
        </div>
      );
    }
  };

  return (
    <TooltipProvider>
      <Card className="w-254 mx-auto my-5 shadow-md">
        <CardContent className="p-6">
          <div>
            {/* Month Headers */}
            {/* Month Headers - Two-section approach */}
            <div className="flex items-end mb-2">
              {/* January header - positioned directly above first square */}
              <div className="flex">
                <Label className="w-8 text-sm font-medium text-gray-600"></Label>
                <Label className="text-center text-sm font-medium text-gray-600 w-20 ml-1">
                  {monthNames[0]}
                </Label>
              </div>
              
              {/* Other months with uniform spacing */}
              <div className="flex ml-1">
                {monthNames.slice(1).map((month, index) => (
                  <Label
                    key={index}
                    className="text-center text-sm font-medium text-gray-600 w-20 mx-0.3"
                  >
                    {month}
                  </Label>
                ))}
              </div>
            </div>

            {/* Heatmap Grid */}
            <div className="flex flex-col gap-1">
              {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                <div key={day} className="flex items-center mx-auto">
                  <Label className="w-8 text-sm font-medium text-gray-600">
                    {dayLabels[day]}
                  </Label>
                  <div className="flex gap-0.5">
                    {/* Reduced gap between grid items */}
                    {monthNames.map((_, monthIndex) => (
                      <div key={monthIndex} className="flex gap-0.5 items-start">
                        {/* Reduced gap between months */}
                        {(() => {
                          const daysInMonth = new Date(2025, monthIndex + 1, 0).getDate();
                          const firstDayOfMonth = new Date(2025, monthIndex, 1).getDay();
                          const weeksInMonth = Math.ceil((daysInMonth + firstDayOfMonth) / 7);
                          
                          // Create an array of valid day positions for this day of week
                          const validDayPositions = [];
                          for (let week = 0; week < weeksInMonth; week++) {
                            const dayPosition = (week * 7) + day - firstDayOfMonth;
                            if (dayPosition >= 0 && dayPosition < daysInMonth) {
                              // Calculate the actual date for this position
                              const date = new Date(2025, monthIndex, 1 + dayPosition);
                              
                              // Skip December 31st
                              if (date.getMonth() === 11 && date.getDate() === 31) {
                                continue;
                              }
                              
                              validDayPositions.push({ week, dayPosition });
                            }
                          }
                          
                          // Return only the valid day positions
                          return validDayPositions.map(({ week }) => {
                            const dayData = organizedData[monthIndex]?.[day]?.[week];
                            
                            return (
                              <Tooltip key={week}>
                                <TooltipTrigger asChild>
                                  <div
                                    className={`w-4 h-4 cursor-pointer transition-all duration-200 hover:scale-110 hover:ring-2 hover:ring-offset-1 hover:ring-gray-300 ${
                                      dayData ? getIntensityColor(dayData.intensityLevel) : "bg-gray-100"
                                    }`}
                                    onClick={() => {
                                      setSelectedPosition({
                                        month: monthIndex,
                                        day,
                                        week,
                                      });
                                    }}
                                  />
                                </TooltipTrigger>
                                <TooltipContent className="bg-white shadow-md border border-gray-200 rounded-lg z-50 animate-in fade-in-50 duration-200">
                                  {formatTooltipContent(dayData)}
                                </TooltipContent>
                              </Tooltip>
                            );
                          });
                        })()}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="w-250 px-6 flex justify-between mt-6 items-center">
              <Label className="text-sm font-medium text-gray-700">
                {selectedPosition
                  ? formatSelectedDate(
                      getDateForPosition(
                        selectedPosition.month,
                        selectedPosition.day,
                        selectedPosition.week
                      )
                    )
                  : getCurrentDateInfo()}
              </Label>
              <div className="px-3 flex items-center gap-1">
                <Label className="text-sm text-gray-600">Less</Label>
                <div className="w-4 h-4 bg-white border border-gray-200" />
                <div className="w-4 h-4 bg-green-100" />
                <div className="w-4 h-4 bg-green-400" />
                <div className="w-4 h-4 bg-green-700" />
                <Label className="text-sm text-gray-600">More</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default HeatmapPreview;
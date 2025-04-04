"use client";

import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  eachDayOfInterval,
  isSameMonth,
  isToday,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

// Sample events (Add more as needed)
const events: { date: string; type: "meeting" | "deadline" | "workout" }[] = [
  { date: "2025-03-05", type: "meeting" },
  { date: "2025-03-12", type: "deadline" },
  { date: "2025-03-18", type: "workout" },
  { date: "2025-03-25", type: "meeting" },
];

const getEventType = (date: Date) => {
  const formattedDate = format(date, "yyyy-MM-dd");
  return events.find((event) => event.date === formattedDate)?.type;
};

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Get the first and last day of the month
  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);

  // Get the first and last day of the calendar grid (including previous & next month days)
  const firstDayOfGrid = startOfWeek(firstDayOfMonth);
  const lastDayOfGrid = endOfWeek(lastDayOfMonth);

  // Generate the dates for the calendar grid
  const days = eachDayOfInterval({ start: firstDayOfGrid, end: lastDayOfGrid });

  return (
    <div className="w-full max-w-md p-4 bg-white shadow-md rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 text-center text-gray-600 font-medium mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid - Fixed Height to Prevent Layout Shift */}
      <div className="grid grid-cols-7 gap-1 min-h-[280px]">
        {days.map((day) => {
          const eventType = getEventType(day);

          return (
            <div
              key={day.toString()}
              className={`relative flex flex-col items-center justify-center p-2 h-10 w-10 rounded-md text-sm transition 
                ${isSameMonth(day, currentMonth) ? "text-gray-900" : "text-gray-400"} 
                ${isToday(day) ? "bg-[#80C342] text-white font-semibold" : "hover:bg-gray-200"}
              `}
            >
              {format(day, "d")}

              {/* Colored Dots for Events */}
              {eventType && (
                <span
                  className={`
                    absolute bottom-1 w-5 h-1 rounded-full
                    ${eventType === "meeting" ? "bg-blue-500" : ""}
                    ${eventType === "deadline" ? "bg-red-500" : ""}
                    ${eventType === "workout" ? "bg-green-500" : ""}
                  `}
                ></span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;

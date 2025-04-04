import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Coffee, LogOut, Timer } from "lucide-react";
import { format, differenceInMinutes } from "date-fns";
import { cn } from "@/lib/utils";

// Define TypeScript interfaces for better type safety and export readiness
interface ClockInOutProps {
  className?: string;
  onClockIn?: (time: Date) => void;
  onClockOut?: (time: Date, totalHours: number) => void;
  onBreakStart?: (time: Date) => void;
  onBreakEnd?: (time: Date, breakMinutes: number) => void;
}

/**
 * ClockInOut component - Allows users to track their work time
 */
const ClockInOut: React.FC<ClockInOutProps> = ({
  className,
  onClockIn,
  onClockOut,
  onBreakStart,
  onBreakEnd
}) => {
  // Time tracking states
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [clockOutTime, setClockOutTime] = useState<Date | null>(null);
  const [breakStartTime, setBreakStartTime] = useState<Date | null>(null);
  const [totalBreakMinutes, setTotalBreakMinutes] = useState<number>(0);
  const [isOnBreak, setIsOnBreak] = useState<boolean>(false);
  
  // Working time calculations
  const [workingTime, setWorkingTime] = useState<string>("0h 0m");

  // Update the current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      
      // Calculate working time if clocked in
      if (clockInTime && !clockOutTime) {
        let workMinutes = differenceInMinutes(
          new Date(), 
          clockInTime
        ) - totalBreakMinutes;
        
        if (isOnBreak && breakStartTime) {
          // Subtract ongoing break time
          workMinutes -= differenceInMinutes(new Date(), breakStartTime);
        }
        
        const hours = Math.floor(workMinutes / 60);
        const minutes = workMinutes % 60;
        setWorkingTime(`${hours}h ${minutes}m`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [clockInTime, clockOutTime, breakStartTime, totalBreakMinutes, isOnBreak]);

  // Handle clock-in
  const handleClockIn = () => {
    const now = new Date();
    setClockInTime(now);
    onClockIn?.(now);
  };

  // Handle clock-out
  const handleClockOut = () => {
    const now = new Date();
    setClockOutTime(now);
    
    // Calculate total hours worked
    if (clockInTime) {
      let totalMinutes = differenceInMinutes(now, clockInTime) - totalBreakMinutes;
      const totalHours = totalMinutes / 60;
      onClockOut?.(now, totalHours);
    }
  };

  // Handle break toggle
  const handleBreakToggle = () => {
    if (!isOnBreak) {
      // Start break
      const now = new Date();
      setBreakStartTime(now);
      setIsOnBreak(true);
      onBreakStart?.(now);
    } else if (breakStartTime) {
      // End break
      const now = new Date();
      const breakDuration = differenceInMinutes(now, breakStartTime);
      setTotalBreakMinutes(prev => prev + breakDuration);
      setIsOnBreak(false);
      setBreakStartTime(null);
      onBreakEnd?.(now, breakDuration);
    }
  };

  // Format time for display
  const formatTime = (date: Date | null): string => {
    if (!date) return "-";
    return format(date, "h:mm:ss a");
  };

  return (
    <Card className={cn("w-full mx-auto border shadow-md", className)}>
      <CardHeader className="pb-2 px-4 sm:px-6">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Clock In / Out
          </CardTitle>
          <span className="text-xs sm:text-sm text-[#80C342] font-medium">
            {clockOutTime ? "Completed" : clockInTime ? "Active" : "Not started"}
          </span>
        </div>
        <div className="flex items-center text-xs sm:text-sm text-gray-500 mt-1">
          <Calendar className="mr-2 h-4 w-4 text-[#80C342]" />
          <span>{format(currentTime, "EEEE, MMMM d, yyyy")}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 px-4 sm:px-6">
        {/* Clock In / Out Times */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          <div className="bg-gray-50 p-2 sm:p-3 rounded-md text-center">
            <p className="text-xs sm:text-sm text-gray-500">Clock In</p>
            <p className="text-sm sm:text-base font-semibold text-gray-800 truncate">
              {formatTime(clockInTime)}
            </p>
          </div>
          <div className="bg-gray-50 p-2 sm:p-3 rounded-md text-center">
            <p className="text-xs sm:text-sm text-gray-500">Clock Out</p>
            <p className="text-sm sm:text-base font-semibold text-gray-800 truncate">
              {formatTime(clockOutTime)}
            </p>
          </div>
        </div>

        {/* Current Time and Working Time */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          <div className="text-center p-2">
            <p className="text-lg sm:text-2xl font-bold text-gray-800">
              {format(currentTime, "h:mm:ss a")}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">Current time</p>
          </div>
          <div className="text-center p-2">
            <p className="text-lg sm:text-2xl font-bold text-[#80C342]">
              {clockOutTime ? workingTime : clockInTime ? workingTime : "-"}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">Working time</p>
          </div>
        </div>

        {/* Break Status */}
        {clockInTime && !clockOutTime && (
          <div className={`text-center p-2 rounded-md ${isOnBreak ? "bg-amber-50 border border-amber-200" : "bg-gray-50"}`}>
            <p className="text-xs sm:text-sm text-gray-500">
              {isOnBreak 
                ? `On break: ${formatTime(breakStartTime)}` 
                : totalBreakMinutes > 0 
                  ? `Total break: ${Math.floor(totalBreakMinutes / 60)}h ${totalBreakMinutes % 60}m`
                  : "No breaks taken"
              }
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-wrap sm:flex-nowrap gap-2 justify-between px-4 sm:px-6 pb-4">
        {!clockInTime && (
          <Button
            onClick={handleClockIn}
            className="bg-[#80C342] hover:bg-[#6ca438] text-white w-full"
          >
            <Clock className="h-4 w-4 mr-2" /> Clock In
          </Button>
        )}
        
        {clockInTime && !clockOutTime && (
          <>
            <Button
              onClick={handleBreakToggle}
              variant={isOnBreak ? "default" : "outline"}
              className={cn(
                "flex items-center gap-2 w-full sm:flex-1",
                isOnBreak && "bg-amber-500 hover:bg-amber-600 text-white"
              )}
            >
              <Coffee className="h-4 w-4" />
              {isOnBreak ? "End Break" : "Start Break"}
            </Button>
            
            <Button
              onClick={handleClockOut}
              className="bg-[#80C342] hover:bg-[#6ca438] text-white w-full sm:flex-1"
              disabled={isOnBreak}
            >
              <LogOut className="h-4 w-4 mr-2" /> Clock Out
            </Button>
          </>
        )}
        
        {clockOutTime && (
          <div className="w-full text-center text-sm text-gray-500">
            <Timer className="inline h-4 w-4 mr-2 text-[#80C342]" />
            You've completed your work day!
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ClockInOut;
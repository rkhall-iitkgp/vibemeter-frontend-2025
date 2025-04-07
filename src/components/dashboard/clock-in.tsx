import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, Coffee, LogOut, Timer } from "lucide-react";
import { setShowVibemeter } from "@/store";
import { format, differenceInMinutes } from "date-fns";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { cn } from "@/lib/utils";
import Vibemeter from "@/components/Vibemeter";

interface ClockInOutProps {
  className?: string;
  onClockIn?: (time: Date) => void;
  onClockOut?: (time: Date, totalHours: number) => void;
  onBreakStart?: (time: Date) => void;
  onBreakEnd?: (time: Date, breakMinutes: number) => void;
}

const ClockInOut: React.FC<ClockInOutProps> = ({
  onClockIn,
  onClockOut,
  onBreakStart,
  onBreakEnd,
}) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [clockOutTime, setClockOutTime] = useState<Date | null>(null);
  const [breakStartTime, setBreakStartTime] = useState<Date | null>(null);
  const [totalBreakMinutes, setTotalBreakMinutes] = useState<number>(0);
  const [isOnBreak, setIsOnBreak] = useState<boolean>(false);
  const [workingTime, setWorkingTime] = useState<string>("0h 0m");
  const [showToastVibemeter, setShowToastVibemeter] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());

      if (clockInTime && !clockOutTime) {
        let workMinutes =
          differenceInMinutes(new Date(), clockInTime) - totalBreakMinutes;

        if (isOnBreak && breakStartTime) {
          workMinutes -= differenceInMinutes(new Date(), breakStartTime);
        }

        const hours = Math.floor(workMinutes / 60);
        const minutes = workMinutes % 60;
        setWorkingTime(`${hours}h ${minutes}m`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [clockInTime, clockOutTime, breakStartTime, totalBreakMinutes, isOnBreak]);

  const handleClockIn = () => {
    const now = new Date();
    // Show the toast vibemeter instead of the chat
    setShowToastVibemeter(true);
    setClockInTime(now);
    onClockIn?.(now);
  };

  const handleClockOut = () => {
    const now = new Date();
    setClockOutTime(now);

    if (clockInTime) {
      const totalMinutes =
        differenceInMinutes(now, clockInTime) - totalBreakMinutes;
      const totalHours = totalMinutes / 60;
      onClockOut?.(now, totalHours);
    }
  };

  const handleBreakToggle = () => {
    if (!isOnBreak) {
      const now = new Date();
      setBreakStartTime(now);
      setIsOnBreak(true);
      onBreakStart?.(now);
    } else if (breakStartTime) {
      const now = new Date();
      const breakDuration = differenceInMinutes(now, breakStartTime);
      setTotalBreakMinutes((prev) => prev + breakDuration);
      setIsOnBreak(false);
      setBreakStartTime(null);
      onBreakEnd?.(now, breakDuration);
    }
  };

  const formatTime = (date: Date | null): string => {
    if (!date) return "-";
    return format(date, "h:mm:ss a");
  };

  const handleMoodSelect = (mood: string) => {
    // Handle the mood selection
    console.log(`User mood: ${mood}`);
    // You can add your logic to store or process the mood here
    
    // Hide the vibemeter
    setShowToastVibemeter(false);
    
    // Optionally, you can also set Redux state if needed
    // dispatch(setMood(mood));
  };

  const handleCloseVibemeter = () => {
    setShowToastVibemeter(false);
  };

  return (
    <>
      <Card className="w-full mx-auto border shadow-sm py-4">
        <CardHeader className="px-6 py-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Clock In / Out
            </CardTitle>
            <span className="text-xs sm:text-sm text-[#80C342] font-medium">
              {clockOutTime
                ? "Completed"
                : clockInTime
                  ? "Active"
                  : "Not started"}
            </span>
          </div>
          <div className="flex items-center text-xs sm:text-sm text-gray-500 mt-1">
            <Calendar className="mr-2 h-4 w-4 text-[#80C342]" />
            <span>{format(currentTime, "EEEE, MMMM d, yyyy")}</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 px-6">
          {/* Clock In / Out Times */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 py-4 px-4 rounded-md text-left border flex flex-col gap-0.5">
              <p className="text-xs sm:text-sm text-gray-500">Clock In</p>
              <p className="text-xl font-semibold text-gray-800 truncate">
                {formatTime(clockInTime)}
              </p>
            </div>
            <div className="bg-gray-50 py-4 px-4 rounded-md text-left border flex flex-col gap-0.5">
              <p className="text-xs sm:text-sm text-gray-500">Clock Out</p>
              <p className="text-xl font-semibold text-gray-800 truncate">
                {formatTime(clockOutTime)}
              </p>
            </div>
          </div>

          {/* Current Time and Working Time */}
          <div className="grid grid-cols-2 gap-4 pt-4 text-center">
            <div className="text-left px-4">
              <p className="text-lg sm:text-2xl font-bold text-gray-800 text-center">
                {format(currentTime, "h:mm:ss a")}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 text-center">
                Current time
              </p>
            </div>
            <div className="text-left px-4">
              <p className="text-lg sm:text-2xl font-bold text-[#80C342] text-center">
                {clockOutTime ? workingTime : clockInTime ? workingTime : "-"}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 text-center">
                Working time
              </p>
            </div>
          </div>

          {/* Break Status */}
          {clockInTime && !clockOutTime && (
            <div
              className={`text-left p-4 rounded-md ${isOnBreak ? "bg-amber-50 border border-amber-200" : "bg-gray-50"}`}
            >
              <p className="text-xs sm:text-sm text-gray-500">
                {isOnBreak
                  ? `On break: ${formatTime(breakStartTime)}`
                  : totalBreakMinutes > 0
                    ? `Total break: ${Math.floor(totalBreakMinutes / 60)}h ${totalBreakMinutes % 60}m`
                    : "No breaks taken"}
              </p>
            </div>
          )}
        </CardContent>

        <CardFooter className="px-6 pb-3">
          {!clockInTime && (
            <Button
              onClick={handleClockIn}
              className="bg-[#80C342] hover:bg-[#6ca438] text-white w-full"
            >
              <Clock className="h-4 w-4 mr-2" /> Clock In
            </Button>
          )}

          {clockInTime && !clockOutTime && (
            <div className="grid grid-cols-2 gap-4 w-full">
              <Button
                onClick={handleBreakToggle}
                variant={isOnBreak ? "default" : "outline"}
                className={cn(
                  "flex items-center gap-2",
                  isOnBreak && "bg-amber-500 hover:bg-amber-600 text-white"
                )}
              >
                <Coffee className="h-4 w-4" />
                {isOnBreak ? "End Break" : "Start Break"}
              </Button>

              <Button
                onClick={handleClockOut}
                className="bg-[#80C342] hover:bg-[#6ca438] text-white"
                disabled={isOnBreak}
              >
                <LogOut className="h-4 w-4 mr-2" /> Clock Out
              </Button>
            </div>
          )}

          {clockOutTime && (
            <div className="w-full text-left text-sm text-gray-500">
              <Timer className="inline h-4 w-4 mr-2 text-[#80C342]" />
              You've completed your work day!
            </div>
          )}
        </CardFooter>
      </Card>

      {/* Toast Vibemeter */}
      {showToastVibemeter && (
        <div className="fixed bottom-4 right-4 z-60 w-128 animate-in slide-in-from-right-5 fade-in duration-300">
          <Vibemeter
            onMoodSelect={handleMoodSelect}
            onClose={handleCloseVibemeter}
          />
        </div>
      )}
    </>
  );
};

export default ClockInOut;
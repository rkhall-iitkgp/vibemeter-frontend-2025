"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageSquare, Phone } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface TimeSlot {
  id: string;
  time: string;
  date: string;
  selected: boolean;
}

export default function EmployeeModal() {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { id: "1", time: "2pm - 3pm", date: "24/03/25", selected: true },
    { id: "2", time: "2pm - 3pm", date: "24/03/25", selected: false },
    { id: "3", time: "2pm - 3pm", date: "24/03/25", selected: false },
    { id: "4", time: "2pm - 3pm", date: "24/03/25", selected: false },
  ]);

  const handleTimeSlotChange = (id: string) => {
    setTimeSlots(
      timeSlots.map((slot) => ({
        ...slot,
        selected: slot.id === id,
      }))
    );
  };

  const handleCancel = () => {
    setTimeSlots(
      timeSlots.map((slot) => ({
        ...slot,
        selected: false,
      }))
    );
  };

  return (
    <Card className="w-full max-w-xl mx-auto rounded-lg shadow-lg overflow-auto">
      <CardHeader className="px-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 bg-gray-200">
            <div className="text-gray-400">A</div>
          </Avatar>
          <div>
            <h2 className="text-lg font-medium">Ankan</h2>
            <p className="text-sm text-gray-500">EMP0007</p>
            <p className="text-xs text-gray-500">People's Experience Team</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Employee Stats</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  HR Intervention Score
                </span>
                <span className="text-sm">10</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-400 rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Retention Risk Score
                </span>
                <span className="text-sm">10</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-400 rounded-full"
                  style={{ width: "40%" }}
                ></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Morale Score</span>
                <span className="text-sm">10</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-400 rounded-full"
                  style={{ width: "70%" }}
                ></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Overall Cultural Score
                </span>
                <span className="text-sm">10</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-400 rounded-full"
                  style={{ width: "50%" }}
                ></div>
              </div>
            </div>

            <div className="space-y-1 col-span-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Engagement Score</span>
                <span className="text-sm">10</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-400 rounded-full"
                  style={{ width: "30%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-1">Suggestive Action</h3>
          <p className="text-sm text-gray-600">
            Talk to the employee regarding lorem epsum dolar epmit Talk to the
            employee regarding lorem epsum dolar epmit Talk to the employee
            regarding lorem epsum dolar epmit
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Employee availability</h3>
          <div className="space-y-2">
            {timeSlots.map((slot) => (
              <div
                key={slot.id}
                className={`border rounded-lg ${
                  slot.selected
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 5V10L13 13"
                          stroke={slot.selected ? "#4ADE80" : "#6B7280"}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="10"
                          cy="10"
                          r="7.5"
                          stroke={slot.selected ? "#4ADE80" : "#6B7280"}
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                    <span className="text-sm">{slot.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm">{slot.date}</span>
                    <Checkbox
                      checked={slot.selected}
                      onCheckedChange={() => handleTimeSlotChange(slot.id)}
                      className={`h-5 w-5`}
                      style={{
                        color: slot.selected ? "#4ADE80" : undefined,
                      }}
                    />
                  </div>
                </div>

                {slot.selected && (
                  <div className="flex justify-end gap-2 px-2 pb-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-sm"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      className="text-sm bg-green-500 hover:bg-green-600 text-white"
                    >
                      Confirm Meet
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end gap-4">
        <Button
          variant="outline"
          className="flex items-center gap-2 hover:bg-green-50 hover:text-green-500 hover:border-green-500 transition-colors"
        >
          <MessageSquare className="h-5 w-5" />
          Message
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 hover:bg-green-50 hover:text-green-500 hover:border-green-500 transition-colors"
        >
          <Phone className="h-5 w-5" />
          Phone Call
        </Button>
      </CardFooter>
    </Card>
  );
}

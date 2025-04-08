import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export default function Vibemeter({ onMoodSelect }) {
  // Mood options with emojis and labels
  const moods = [
    [
      { emoji: "😊", label: "Excellent", color: "#F9A825" },
      { emoji: "🙂", label: "Good", color: "#8BC34A" },
      { emoji: "😐", label: "Neutral", color: "#29B6F6" },
    ],
    [
      { emoji: "😕", label: "Not Great", color: "#FB8C00" },
      { emoji: "😫", label: "Tired", color: "#E53935" },
      { emoji: "😤", label: "Frustrated", color: "#9575CD" },
    ],
  ];

  return (
    <Card className="w-full border-t border-b shadow-none rounded-sm">
      <CardContent className="p-4">
        <h3 className="text-base font-medium mb-4">
          How are you feeling today?
        </h3>

        {moods.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-between mb-4">
            {row.map((mood) => (
              <div
                key={mood.label}
                className="flex flex-col items-center cursor-pointer transition-transform hover:scale-110 active:scale-95"
                onClick={() => onMoodSelect(mood.label)}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full mb-1"
                  style={{
                    color: mood.color,
                    border: `2px solid ${mood.color}`,
                  }}
                >
                  <span className="text-xl">{mood.emoji}</span>
                </div>
                <span className="text-xs text-center">{mood.label}</span>
              </div>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

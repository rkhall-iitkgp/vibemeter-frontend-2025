"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

type Mood = "Frustrated" | "Sad" | "Okay" | "Happy" | "Excited";

interface MoodItem {
  label: Mood;
  imagePath?: string;
}

const moods: MoodItem[] = [
  { label: "Frustrated" },
  { label: "Sad" },
  { label: "Okay" },
  { label: "Happy" },
  { label: "Excited" },
];

interface MoodSelectorProps {
  useImages?: boolean;
}

export default function MoodSelector({ useImages = false }: MoodSelectorProps) {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-[32px] font-bold text-green-600 mb-0 leading-tight">
          How are you feeling today?
        </h2>
        <p className="text-[20px] text-gray-600">
          Whether it's sunshine high or cozy low, we'd love to know!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {moods.map((mood) => (
          <Card
            key={mood.label}
            className={`cursor-pointer transition-all hover:shadow-md rounded-none ${
              selectedMood === mood.label
                ? "border-2 border-green-500 shadow-md"
                : "border border-gray-200"
            }`}
            onClick={() => setSelectedMood(mood.label)}
          >
            <CardContent className="p-6 flex flex-col items-center justify-center">
              {useImages && mood.imagePath ? (
                <div className="w-24 h-24 mb-4 relative">
                  <img
                    src={mood.imagePath}
                    alt={mood.label}
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-400 text-xs">Image</span>
                </div>
              )}
              <span className="font-light text-center">{mood.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

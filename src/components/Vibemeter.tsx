import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function Vibemeter({
  onMoodSelect,
  onClose,
}: {
  onMoodSelect: (mood: string) => void;
  onClose: () => void;
}) {
  // Mood options with emojis and labels
  const moods = [
    { emoji: "😊", label: "Excellent", color: "#FFD700" }, // Gold
    { emoji: "🙂", label: "Good", color: "#4CAF50" }, // Green
    { emoji: "😐", label: "Neutral", color: "#2196F3" }, // Blue
    { emoji: "😕", label: "Not Great", color: "#FF9800" }, // Orange
    { emoji: "😫", label: "Tired", color: "#9C27B0" }, // Purple
    { emoji: "😤", label: "Frustrated", color: "#F44336" }, // Red
  ];

  return (
    <Card className="w-full border shadow-2xl rounded-lg relative">
      <div className="absolute top-3 right-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-gray-100"
          onClick={onClose}
        >
          <X className="h-8 w-8" />
        </Button>
      </div>

      <CardContent className="p-6">
        <h3 className="text-xl font-medium mb-6">How are you feeling today?</h3>
        <div className="grid grid-cols-3 gap-6">
          {moods.map((mood) => (
            <div
              key={mood.label}
              className="flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 p-3 rounded-md"
              style={{
                backgroundColor: `rgba(${parseInt(mood.color.slice(1, 3), 16)}, ${parseInt(mood.color.slice(3, 5), 16)}, ${parseInt(mood.color.slice(5, 7), 16)}, 0.1)`,
              }}
              onClick={() => onMoodSelect(mood.label)}
            >
              <div
                className="w-14 h-14 flex items-center justify-center rounded-full mb-2"
                style={{
                  color: mood.color,
                  border: `3px solid ${mood.color}`,
                }}
              >
                <span className="text-3xl">{mood.emoji}</span>
              </div>
              <span className="text-sm text-center font-medium">
                {mood.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent } from "@/components/ui/card";

export default function Vibemeter({
  onMoodSelect,
}: {
  onMoodSelect: (mood: string) => void;
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
    <Card className="w-full border-t border-b shadow-none rounded-sm">
      <CardContent className="p-4">
        <h3 className="text-base font-medium mb-4">
          How are you feeling today?
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {moods.map((mood) => (
            <div
              key={mood.label}
              className="flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 p-2 rounded-md"
              style={{
                backgroundColor: `rgba(${parseInt(mood.color.slice(1, 3), 16)}, ${parseInt(mood.color.slice(3, 5), 16)}, ${parseInt(mood.color.slice(5, 7), 16)}, 0.1)`,
              }}
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
        {/* {moods.map((row, rowIndex) => (
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
        ))} */}
      </CardContent>
    </Card>
  );
}

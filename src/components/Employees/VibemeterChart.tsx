import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import React from "react";

interface MonthlyScore {
  month: string;
  score: number;
}

interface VibemeterChartProps {
  monthlyScores?: MonthlyScore[];
}

// Default data in case no scores are provided
const defaultData = [
  { month: "Month1", score: 65 },
  { month: "Month2", score: 68 },
  { month: "Month3", score: 72 },
  { month: "Month4", score: 70 },
  { month: "Month5", score: 75 },
];

const VibemeterChart: React.FC<VibemeterChartProps> = ({
  monthlyScores = defaultData,
}) => {
  const data = monthlyScores.map((item) => ({
    name: item.month,
    score: item.score,
  }));

  return (
    <div className="mt-2">
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} tickMargin={10} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} tickCount={5} />
            <Tooltip
              formatter={(value) => [`${value}`, "Vibe Score"]}
              contentStyle={{
                borderRadius: "4px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#80C342"
              strokeWidth={2}
              dot={{ r: 4, fill: "#80C342", strokeWidth: 0 }}
              activeDot={{
                r: 6,
                fill: "#80C342",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VibemeterChart;

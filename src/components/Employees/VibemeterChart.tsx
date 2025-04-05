import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  TooltipProps,
} from "recharts";
import React, { useEffect, useState } from "react";

// Define types for our data
interface ScoreData {
  month: string;
  score: number;
}

interface ChartData {
  scores: ScoreData[];
  average: number;
  percentageChange: number;
}

// Define props for VibemeterChart
interface VibemeterChartProps {
  fetchData?: () => Promise<ChartData>;
  className?: string;
}

const dummyData: ChartData = {
  scores: [
    { month: "Jan", score: 65 },
    { month: "Feb", score: 67 },
    { month: "Mar", score: 72 },
    { month: "Apr", score: 78 },
    { month: "May", score: 75 },
    { month: "Jun", score: 85 },
  ],
  average: 78,
  percentageChange: 5.3,
};

// Custom tooltip component for better styling with proper typing
const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md text-sm">
        <p className="font-medium">{label}</p>
        <p className="text-green-600 font-semibold">{`Score: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const VibemeterChart: React.FC<VibemeterChartProps> = ({
  fetchData,
  className = "",
}) => {
  const [data, setData] = useState<ScoreData[]>([]);
  const [averageScore, setAverageScore] = useState<number>(0);
  const [percentageChange, setPercentageChange] = useState<number>(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (fetchData) {
          const response = await fetchData();
          setData(response.scores);
          setAverageScore(response.average);
          setPercentageChange(response.percentageChange);
        } else {
          setData(dummyData.scores);
          setAverageScore(dummyData.average);
          setPercentageChange(dummyData.percentageChange);
        }
      } catch (error) {
        console.error("Error loading vibemeter data:", error);
        // Fall back to dummy data on error
        setData(dummyData.scores);
        setAverageScore(dummyData.average);
        setPercentageChange(dummyData.percentageChange);
      }
    };
    loadData();
  }, [fetchData]);

  return (
    <div className={`px-4 pt-4 pb-3 w-full h-full ${className}`}>
      {/* Header section */}
      <div className="mb-2">
        <h2 className="text-lg font-semibold text-gray-800">
          Average Vibemeter Scores
        </h2>
        <p className="text-sm text-gray-500">Average Vibe Scores per month</p>
      </div>

      {/* Stats section */}
      <div className="flex items-baseline mb-6">
        <div className="text-3xl font-bold text-gray-800">{averageScore}</div>
        <div className="ml-3 flex items-center">
          <span
            className={`text-sm font-medium ${percentageChange >= 0 ? "text-green-600" : "text-red-600"}`}
          >
            {percentageChange >= 0 ? "↑" : "↓"}
            {Math.abs(percentageChange)}%
          </span>
          <span className="text-gray-500 text-xs ml-1">in past 1 month</span>
        </div>
      </div>

      {/* Chart section */}
      <div className="mt-2 h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barSize={30}
            margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#6b7280" }}
              axisLine={{ stroke: "#e5e7eb" }}
              tickLine={false}
            />
            <YAxis
              hide={true}
              domain={[0, (dataMax: number) => dataMax + 10]} // Add some padding to top with proper typing
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(243, 244, 246, 0.5)" }}
            />
            <Bar
              dataKey="score"
              fill="#8BC34A"
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VibemeterChart;

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
import React from "react";

// Define types for our data
interface ScoreData {
  month: string;
  score: number;
}

export interface ChartData {
  scores: ScoreData[];
  average: number;
  percentageChange: number;
}

// Define props for VibemeterChart
interface VibemeterChartProps {
  data: ChartData; // Optional data prop to fetch data from parent component
  className?: string;
}

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
        <p className="text-[#7CC243]-600 font-semibold">{`Score: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const VibemeterChart: React.FC<VibemeterChartProps> = ({
  data,
  className = "",
}) => {
  // Calculate responsive bar width based on number of data points
  const calculateBarSize = () => {
    const dataLength = data.scores.length;
    if (dataLength <= 0) return 40;
    return Math.min(50, 280 / dataLength); // Ensure bars aren't too wide with few data points
  };

  return (
    <div className={`px-4 pt-4 pb-9 w-full ${className}`}>
      {/* Header section */}
      <div className="mb-2">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          Average Vibemeter Scores
        </h2>
        <p className="text-xs text-gray-500">Average Vibe Scores per month</p>
      </div>

      {/* Stats section */}
      <div className="flex items-baseline mb-6">
        <div className="text-3xl font-bold text-gray-800">{data.average}</div>
        <div className="ml-3 flex items-center">
          <span
            className={`text-sm font-medium ${data.percentageChange >= 0 ? "text-[#7CC243]-600" : "text-red-600"}`}
          >
            {data.percentageChange >= 0 ? "↑" : "↓"}
            {Math.abs(data.percentageChange)}%
          </span>
          <span className="text-gray-500 text-xs ml-1">in past 1 month</span>
        </div>
      </div>

      {/* Chart section - removed border and adjusted container */}
      <div className="mt-2 h-[180px] w-full flex justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data.scores}
            barSize={calculateBarSize()}
            margin={{ top: 10, right: 30, left: 30, bottom: 5 }}
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

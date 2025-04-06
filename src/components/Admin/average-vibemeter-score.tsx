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
import React, { useState, useEffect } from "react";

interface ScoreData {
	month: string;
	score: number;
}

export interface ChartData {
	scores: ScoreData[];
	average: number;
	percentageChange: number;
}

interface VibemeterChartProps {
	data?: ChartData; // Making data optional to handle loading state
	className?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
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

const VibemeterChart: React.FC<VibemeterChartProps> = ({ data, className = "" }) => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
	if (data) setLoading(false);
	}, [data]);

	const calculateBarSize = () => {
		const dataLength = data?.scores.length || 0;
		if (dataLength <= 0) return 40;
		return Math.min(50, 280 / dataLength);
	};

	// Skeleton Component
	const renderSkeleton = () => (
		<div className={`px-4 pt-4 pb-9 w-full animate-pulse ${className}`}>
			<div className="mb-2">
				<div className="h-6 bg-gray-200 rounded w-3/5 mb-2"></div>
				<div className="h-4 bg-gray-200 rounded w-1/3"></div>
			</div>
			<div className="flex items-baseline mb-6">
				<div className="h-8 bg-gray-200 rounded w-20"></div>
				<div className="ml-3 h-6 bg-gray-200 rounded w-24"></div>
			</div>
			<div className="mt-2 h-[180px] w-full flex justify-between items-end">
				{[...Array(6)].map((_, i) => (
					<div key={i} className="bg-gray-200 w-[12%] rounded-t h-[50%]"></div>
				))}
			</div>
		</div>
	);

	return loading || !data ? (
		renderSkeleton()
	) : (
		<div className={`px-4 pt-4 pb-9 w-full ${className}`}>
			<div className="mb-2">
				<h2 className="text-lg sm:text-xl font-semibold text-gray-900">
					Average Vibemeter Scores
				</h2>
				<p className="text-xs text-gray-500">Average Vibe Scores per month</p>
			</div>

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

			<div className="mt-2 h-[180px] w-full flex justify-center">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						data={data.scores}
						barSize={calculateBarSize()}
						margin={{ top: 10, right: 30, left: 30, bottom: 5 }}
					>
						<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
						<XAxis
							dataKey="month"
							tick={{ fontSize: 11, fill: "#6b7280" }}
							axisLine={{ stroke: "#e5e7eb" }}
							tickLine={false}
						/>
						<YAxis hide domain={[0, (dataMax: number) => dataMax + 10]} />
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

import React, { useMemo, useState } from "react";

export interface BubbleData {
  name: string;
  value: number;
  description: string;
}

interface PreparedBubbleData extends BubbleData {
  x: number;
  y: number;
  category: string;
  radius: number;
}

interface TooltipInfo {
  x: number;
  y: number;
  data: PreparedBubbleData;
}

interface AdminBubbleChartProps {
  data: BubbleData[];
}

// Determine category based on value
const getCategory = (value: number): string => {
  if (value >= 70) return "High";
  if (value >= 40) return "Moderate";
  if (value >= 20) return "Low";
  return "Very Low";
};

// Colors for each category
const categoryColorMap: Record<string, string> = {
  High: "#7CC243", // green
  Moderate: "#8DDCFF", // light blue
  Low: "#E9F58C", // light green
  "Very Low": "#E0E0E0", // gray
};

// Text colors for each category
const categoryTextColorMap: Record<string, string> = {
  High: "#2C5234", // dark green for green bubbles
  Moderate: "#0076A8", // dark blue for light blue bubbles
  Low: "#BC8725", // brown/gold for light green bubbles
  "Very Low": "#393939", // dark gray for gray bubbles
};

// Fixed scaling factors for each category's radius (based on value)
const getDynamicRadius = (value: number): number => {
  const maxValue = 100; // Max value you can scale to
  const minValue = 0; // Min value for scaling
  const minRadius = 10; // Minimum radius for small values
  const maxRadius = 50; // Maximum radius for large values

  // Scale the radius proportionally to the value
  return (
    minRadius +
    ((maxRadius - minRadius) * (value - minValue)) / (maxValue - minValue)
  );
};

const AdminBubbleChart: React.FC<AdminBubbleChartProps> = ({ data }) => {
  // Chart dimensions
  const chartWidth = 600;
  const chartHeight = 400;

  // Cluster circles so that they touch but never overlap, forming one contiguous cluster.
  const packedData: PreparedBubbleData[] = useMemo(() => {
    // Prepare circles with category and dynamic radius
    const circles = data
      .map((item) => {
        const category = getCategory(item.value);
        const radius = getDynamicRadius(item.value); // Dynamically calculate radius
        return { ...item, category, radius };
      })
      .sort((a, b) => b.radius - a.radius);

    const centerX = chartWidth / 2;
    const centerY = chartHeight / 2;
    const placed: PreparedBubbleData[] = [];

    for (let i = 0; i < circles.length; i++) {
      if (i === 0) {
        // Place the first (largest) circle in the center.
        placed.push({ ...circles[i], x: centerX, y: centerY });
        continue;
      }
      let bestCandidate: PreparedBubbleData | null = null;
      let bestDistance = Infinity;
      const newRadius = circles[i].radius;

      // Try to attach the new circle to each already placed circle.
      for (const placedCircle of placed) {
        // Generate candidate positions every 15° around the placed circle.
        for (let angle = 0; angle < 360; angle += 15) {
          const rad = (angle * Math.PI) / 180;
          const candidateX =
            placedCircle.x + (placedCircle.radius + newRadius) * Math.cos(rad);
          const candidateY =
            placedCircle.y + (placedCircle.radius + newRadius) * Math.sin(rad);

          // Verify that candidate does not overlap any previously placed circle.
          let valid = true;
          for (const other of placed) {
            const dx = candidateX - other.x;
            const dy = candidateY - other.y;
            const dist = Math.hypot(dx, dy);
            if (dist < other.radius + newRadius - 0.1) {
              valid = false;
              break;
            }
          }
          if (valid) {
            // Select the candidate closest to the overall center to maintain one cluster.
            const distToCenter = Math.hypot(
              candidateX - centerX,
              candidateY - centerY
            );
            if (distToCenter < bestDistance) {
              bestDistance = distToCenter;
              bestCandidate = { ...circles[i], x: candidateX, y: candidateY };
            }
          }
        }
      }
      // If a valid candidate was found, place the circle there.
      if (bestCandidate) {
        placed.push({ ...bestCandidate, radius: newRadius });
      } else {
        // Fallback (rare): place at the center.
        placed.push({ ...circles[i], x: centerX, y: centerY });
      }
    }
    return placed;
  }, [data, chartWidth, chartHeight]);

  // Tooltip state and handlers
  const [tooltip, setTooltip] = useState<TooltipInfo | null>(null);

  const handleMouseEnter = (
    event: React.MouseEvent<SVGCircleElement, MouseEvent>,
    bubble: PreparedBubbleData
  ) => {
    const svgElement = event.currentTarget.ownerSVGElement;
    if (svgElement) {
      const svgRect = svgElement.getBoundingClientRect();
      setTooltip({
        x: event.clientX - svgRect.left,
        y: event.clientY - svgRect.top,
        data: bubble,
      });
    }
  };

  const handleMouseMove = (
    event: React.MouseEvent<SVGCircleElement, MouseEvent>,
    bubble: PreparedBubbleData
  ) => {
    const svgElement = event.currentTarget.ownerSVGElement;
    if (svgElement) {
      const svgRect = svgElement.getBoundingClientRect();
      setTooltip({
        x: event.clientX - svgRect.left,
        y: event.clientY - svgRect.top,
        data: bubble,
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4">
      <div className="w-full mb-2 mt-2">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          Major Employee Concerns
        </h2>
        <p className="text-xs text-gray-500">Major issues faced by employees</p>
      </div>
      <div className="relative" style={{ width: chartWidth, margin: "0 auto" }}>
        <svg width={chartWidth} height={chartHeight} className="bg-white">
          {packedData.map((bubble, index) => (
            <React.Fragment key={index}>
              <circle
                cx={bubble.x}
                cy={bubble.y}
                r={bubble.radius}
                fill={categoryColorMap[bubble.category]}
                onMouseEnter={(e) => handleMouseEnter(e, bubble)}
                onMouseMove={(e) => handleMouseMove(e, bubble)}
                onMouseLeave={handleMouseLeave}
              />
              <text
                x={bubble.x}
                y={bubble.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={categoryTextColorMap[bubble.category]}
                className="pointer-events-none"
                style={{ fontSize: Math.max(bubble.radius / 3, 10) }}
              >
                {bubble.name}
              </text>
            </React.Fragment>
          ))}
        </svg>
        {/* Tooltip */}
        {tooltip && (
          <div
            style={{
              left: tooltip.x + 10,
              top: tooltip.y + 10,
            }}
            className="absolute bg-white border border-gray-300 rounded p-2 shadow-md whitespace-nowrap pointer-events-none"
          >
            <strong>{tooltip.data.name}</strong>
            <div>Value: {tooltip.data.value}</div>
            <div>{tooltip.data.description}</div>
          </div>
        )}
        {/* Legend */}
        <div className="flex justify-center mt-4">
          {Object.entries(categoryColorMap).map(([category, color]) => (
            <div key={category} className="flex items-center mx-2">
              <div
                style={{ backgroundColor: color }}
                className="w-4 h-4 rounded-full mr-1"
              />
              <span style={{ color: categoryTextColorMap[category] }}>
                {category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminBubbleChart;
"use client"

import React, { useMemo, useState } from "react"

export interface BubbleData {
  name: string
  value: number
  description: string
}

interface PreparedBubbleData extends BubbleData {
  x: number
  y: number
  category: string
  radius: number
}

interface TooltipInfo {
  x: number
  y: number
  data: PreparedBubbleData
}

interface AdminBubbleChartProps {
  data: BubbleData[]
  isLoading?: boolean // Added isLoading prop
}

// Determine category based on value
const getCategory = (value: number): string => {
  if (value >= 70) return "High"
  if (value >= 40) return "Moderate"
  if (value >= 20) return "Low"
  return "Very Low"
}

// Colors for each category
const categoryColorMap: Record<string, string> = {
  High: "#7CC243", // green
  Moderate: "#8DDCFF", // light blue
  Low: "#E9F58C", // light green
  "Very Low": "#E0E0E0", // gray
}

// Text colors for each category
const categoryTextColorMap: Record<string, string> = {
  High: "#2C5234", // dark green for green bubbles
  Moderate: "#0076A8", // dark blue for light blue bubbles
  Low: "#BC8725", // brown/gold for light green bubbles
  "Very Low": "#393939", // dark gray for gray bubbles
}

// Fixed scaling factors for each category's radius (based on value)
const getDynamicRadius = (value: number): number => {
  const maxValue = 100 // Max value you can scale to
  const minValue = 0 // Min value for scaling
  const minRadius = 10 // Minimum radius for small values
  const maxRadius = 50 // Maximum radius for large values

  // Scale the radius proportionally to the value
  return minRadius + ((maxRadius - minRadius) * (value - minValue)) / (maxValue - minValue)
}

// Skeleton data for loading state
const generateSkeletonData = (): PreparedBubbleData[] => {
  // Non-overlapping positions for bubble distribution
  const positions = [
    { x: 300, y: 200, r: 55 }, // Large central
    { x: 120, y: 130, r: 45 }, // Top left
    { x: 480, y: 130, r: 42 }, // Top right
    { x: 120, y: 280, r: 38 }, // Bottom left
    { x: 480, y: 280, r: 35 }, // Bottom right
    { x: 210, y: 80, r: 32 },  // Top
    { x: 390, y: 80, r: 30 },  // Top
    { x: 210, y: 330, r: 28 }, // Bottom
    { x: 390, y: 330, r: 25 }, // Bottom
    { x: 180, y: 200, r: 23 }, // Middle left
    { x: 420, y: 200, r: 20 }, // Middle right
    { x: 300, y: 100, r: 18 }, // Middle top
    { x: 300, y: 300, r: 15 }, // Middle bottom
    { x: 240, y: 170, r: 12 }, // Minor fill
    { x: 360, y: 170, r: 10 }  // Minor fill
  ];
  
  return positions.map(pos => ({
    name: "",
    value: pos.r * 2, // Just for consistency
    description: "",
    x: pos.x,
    y: pos.y,
    category: "skeleton",
    radius: pos.r
  }));
}

const AdminBubbleChart: React.FC<AdminBubbleChartProps> = ({
  data,
  isLoading = false, // Default to false if not provided
}) => {
  // Chart dimensions
  const chartWidth = 600
  const chartHeight = 400

  // Cluster circles so that they touch but never overlap, forming one contiguous cluster.
  const packedData: PreparedBubbleData[] = useMemo(() => {
    // If loading, return skeleton data instead
    if (isLoading) {
      return generateSkeletonData()
    }

    // Prepare circles with category and dynamic radius
    const circles = data
      .map((item) => {
        const category = getCategory(item.value)
        const radius = getDynamicRadius(item.value) // Dynamically calculate radius
        return { ...item, category, radius }
      })
      .sort((a, b) => b.radius - a.radius)

    const centerX = chartWidth / 2
    const centerY = chartHeight / 2
    const placed: PreparedBubbleData[] = []

    for (let i = 0; i < circles.length; i++) {
      if (i === 0) {
        // Place the first (largest) circle in the center.
        placed.push({ ...circles[i], x: centerX, y: centerY })
        continue
      }
      let bestCandidate: PreparedBubbleData | null = null
      let bestDistance = Number.POSITIVE_INFINITY
      const newRadius = circles[i].radius

      // Try to attach the new circle to each already placed circle.
      for (const placedCircle of placed) {
        // Generate candidate positions every 15° around the placed circle.
        for (let angle = 0; angle < 360; angle += 15) {
          const rad = (angle * Math.PI) / 180
          const candidateX = placedCircle.x + (placedCircle.radius + newRadius) * Math.cos(rad)
          const candidateY = placedCircle.y + (placedCircle.radius + newRadius) * Math.sin(rad)

          // Verify that candidate does not overlap any previously placed circle.
          let valid = true
          for (const other of placed) {
            const dx = candidateX - other.x
            const dy = candidateY - other.y
            const dist = Math.hypot(dx, dy)
            if (dist < other.radius + newRadius - 0.1) {
              valid = false
              break
            }
          }
          if (valid) {
            // Select the candidate closest to the overall center to maintain one cluster.
            const distToCenter = Math.hypot(candidateX - centerX, candidateY - centerY)
            if (distToCenter < bestDistance) {
              bestDistance = distToCenter
              bestCandidate = { ...circles[i], x: candidateX, y: candidateY }
            }
          }
        }
      }
      // If a valid candidate was found, place the circle there.
      if (bestCandidate) {
        placed.push({ ...bestCandidate, radius: newRadius })
      } else {
        // Fallback (rare): place at the center.
        placed.push({ ...circles[i], x: centerX, y: centerY })
      }
    }
    return placed
  }, [data, chartWidth, chartHeight, isLoading])

  // Tooltip state and handlers
  const [tooltip, setTooltip] = useState<TooltipInfo | null>(null)

  const handleMouseEnter = (event: React.MouseEvent<SVGCircleElement, MouseEvent>, bubble: PreparedBubbleData) => {
    // Don't show tooltip for skeleton bubbles
    if (isLoading || bubble.category === "skeleton") return

    const svgElement = event.currentTarget.ownerSVGElement
    if (svgElement) {
      const svgRect = svgElement.getBoundingClientRect()
      setTooltip({
        x: event.clientX - svgRect.left,
        y: event.clientY - svgRect.top,
        data: bubble,
      })
    }
  }

  const handleMouseMove = (event: React.MouseEvent<SVGCircleElement, MouseEvent>, bubble: PreparedBubbleData) => {
    // Don't update tooltip for skeleton bubbles
    if (isLoading || bubble.category === "skeleton") return

    const svgElement = event.currentTarget.ownerSVGElement
    if (svgElement) {
      const svgRect = svgElement.getBoundingClientRect()
      setTooltip({
        x: event.clientX - svgRect.left,
        y: event.clientY - svgRect.top,
        data: bubble,
      })
    }
  }

  const handleMouseLeave = () => {
    setTooltip(null)
  }

  // Get bubble fill color based on category and loading state
  const getBubbleFill = (bubble: PreparedBubbleData) => {
    if (isLoading || bubble.category === "skeleton") {
      return "#E2E8F0" // Skeleton color (equivalent to gray-200)
    }
    return categoryColorMap[bubble.category]
  }

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4">
      <div className="w-full mb-2 mt-2">
        {isLoading ? (
          <>
            <div className="h-7 w-64 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-48 bg-gray-100 rounded animate-pulse"></div>
          </>
        ) : (
          <>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Major Employee Concerns</h2>
            <p className="text-xs text-gray-500">Major issues faced by employees</p>
          </>
        )}
      </div>
      <div className="relative" style={{ width: chartWidth, margin: "0 auto" }}>
        <svg width={chartWidth} height={chartHeight} className="bg-white">
          {/* Horizontal grid lines for skeleton */}
          {isLoading && (
            <>
              {[1, 2, 3, 4, 5].map((i) => (
                <line
                  key={`grid-${i}`}
                  x1="0"
                  y1={i * (chartHeight / 6)}
                  x2={chartWidth}
                  y2={i * (chartHeight / 6)}
                  stroke="#EEEEEE"
                  strokeWidth="1"
                />
              ))}
            </>
          )}

          {packedData.map((bubble, index) => (
            <React.Fragment key={index}>
              <circle
                cx={bubble.x}
                cy={bubble.y}
                r={bubble.radius}
                fill={getBubbleFill(bubble)}
                opacity={isLoading || bubble.category === "skeleton" ? 0.7 : 1}
                className={isLoading ? "animate-pulse" : ""}
                onMouseEnter={(e) => handleMouseEnter(e, bubble)}
                onMouseMove={(e) => handleMouseMove(e, bubble)}
                onMouseLeave={handleMouseLeave}
              />
              {!isLoading && (
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
              )}
            </React.Fragment>
          ))}
        </svg>
        {/* Tooltip */}
        {tooltip && !isLoading && (
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
          {isLoading ? (
            // Skeleton legend
            <>
              {[1, 2, 3].map((i) => (
                <div key={`legend-${i}`} className="flex items-center mx-2">
                  <div className="w-4 h-4 rounded-full mr-1 bg-gray-200 animate-pulse"></div>
                  <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </>
          ) : (
            // Actual legend
            Object.entries(categoryColorMap).map(([category, color]) => (
              <div key={category} className="flex items-center mx-2">
                <div style={{ backgroundColor: color }} className="w-4 h-4 rounded-full mr-1" />
                <span style={{ color: categoryTextColorMap[category] }}>{category}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminBubbleChart
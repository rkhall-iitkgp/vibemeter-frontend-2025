import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const BubbleChartPreview = ({ className = "" }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Function to update dimensions
  const updateDimensions = () => {
    if (chartRef.current) {
      const { width, height } = chartRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  };

  useEffect(() => {
    // Initialize dimensions
    updateDimensions();

    // Use ResizeObserver instead of window event for better performance
    const resizeObserver = new ResizeObserver(updateDimensions);
    const currentRef = chartRef.current; // Capture the current value

    if (currentRef) {
      resizeObserver.observe(currentRef);
    }

    // Cleanup
    return () => {
      if (currentRef) {
        resizeObserver.unobserve(currentRef);
      }
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!chartRef.current || dimensions.width === 0) return;

    // Clear any existing content
    d3.select(chartRef.current).selectAll("svg").remove();

    // Also remove any existing tooltips
    d3.select(containerRef.current).selectAll(".bubble-tooltip").remove();

    // Chart dimensions - responsive
    const width = dimensions.width;
    const height = Math.min(600, Math.max(350, width * 0.6)); // Responsive height

    // Data for our bubble chart - employee-related concerns
    const data = [
      // Larger bubbles
      {
        name: "Workload",
        value: 15,
        color: "#8BC34A",
        category: "High Impact",
        description: "Heavy workload affecting wellness",
      },
      {
        name: "Recognition",
        value: 12,
        color: "#A5D6A7",
        category: "Medium Impact",
        description: "Insufficient recognition systems",
      },
      {
        name: "Compensation",
        value: 14,
        color: "#66BB6A",
        category: "High Impact",
        description: "Concerns about fair compensation",
      },
      {
        name: "Work-Life",
        value: 11,
        color: "#81C784",
        category: "Medium Impact",
        description: "Work-life balance issues",
      },
      {
        name: "Career Growth",
        value: 13,
        color: "#4CAF50",
        category: "High Impact",
        description: "Limited career advancement",
      },
      {
        name: "Team Culture",
        value: 10,
        color: "#C8E6C9",
        category: "Medium Impact",
        description: "Team dynamic challenges",
      },
      {
        name: "Leadership",
        value: 12,
        color: "#7CB342",
        category: "High Impact",
        description: "Leadership effectiveness",
      },

      // Medium bubbles
      {
        name: "Communication",
        value: 8,
        color: "#AED581",
        category: "Medium Impact",
        description: "Communication clarity",
      },
      {
        name: "Resources",
        value: 7,
        color: "#DCEDC8",
        category: "Low Impact",
        description: "Access to resources",
      },
      {
        name: "Training",
        value: 6,
        color: "#F1F8E9",
        category: "Low Impact",
        description: "Professional development",
      },

      // Small bubbles
      {
        name: "Tech",
        value: 4,
        color: "#E8F5E9",
        category: "Low Impact",
        description: "Technology issues",
      },
      {
        name: "Cafeteria",
        value: 3,
        color: "#E0F2F1",
        category: "Low Impact",
        description: "Cafeteria options",
      },
      {
        name: "Parking",
        value: 2,
        color: "#F1F8E9",
        category: "Low Impact",
        description: "Parking facilities",
      },
      {
        name: "Office Space",
        value: 3,
        color: "#E0F2F1",
        category: "Low Impact",
        description: "Office environment",
      },
      {
        name: "Benefits",
        value: 5,
        color: "#DCEDC8",
        category: "Low Impact",
        description: "Employee benefits package",
      },
    ];

    // Create SVG element with responsive sizing
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    // Add horizontal grid lines
    const numLines = 8;
    const lineSpacing = height / numLines;

    for (let i = 1; i < numLines; i++) {
      svg
        .append("line")
        .attr("x1", 0)
        .attr("y1", i * lineSpacing)
        .attr("x2", width)
        .attr("y2", i * lineSpacing)
        .style("stroke", "#f0f0f0")
        .style("stroke-width", 1);
    }

    // Calculate center position (adjusted for title space at top)
    const centerX = width / 2;
    const centerY = height / 2;

    // Create bubble layout group - perfectly centered
    const bubbleGroup = svg
      .append("g")
      .attr("transform", `translate(${centerX}, ${centerY})`);

    // Create tooltip div that's contained within the component
    const tooltip = d3
      .select(containerRef.current)
      .append("div")
      .attr("class", "bubble-tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("color", "#333")
      .style("padding", "10px")
      .style("border-radius", "6px")
      .style("font-size", "14px")
      .style("box-shadow", "0 4px 12px rgba(0, 0, 0, 0.15)")
      .style("max-width", "220px")
      .style("pointer-events", "none")
      .style("z-index", "100");

    // Create bubble layout - sized to fit within the center area
    const packSize = Math.min(width, height) * 0.75;
    const pack = d3.pack().size([packSize, packSize]).padding(3);

    // Process data into hierarchy
    const root = d3
      .hierarchy({ children: data })
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value);

    // Apply pack layout
    const bubbleData = pack(root).descendants().slice(1);

    // Create nodes - position directly from d.x and d.y (already centered by pack layout)
    const nodes = bubbleGroup
      .selectAll(".node")
      .data(bubbleData)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr(
        "transform",
        (d) => `translate(${d.x - packSize / 2}, ${d.y - packSize / 2})`
      );

    // Calculate font size based on circle radius
    const calculateFontSize = (radius) => {
      if (radius < 15) return Math.max(6, radius * 0.4);
      if (radius < 25) return 8;
      if (radius < 35) return 10;
      return Math.min(14, radius * 0.3);
    };

    // Add circles with hover effects
    nodes
      .append("circle")
      .attr("r", (d) => d.r)
      .style("fill", (d) => d.data.color)
      .style("opacity", 0.9)
      .style("stroke", "white")
      .style("stroke-width", 1)
      .style("cursor", "pointer")
      .on("mouseover", function (event, d) {
        // Stop event propagation to prevent other elements from reacting
        event.stopPropagation();

        d3.select(this)
          .style("stroke", "#333")
          .style("stroke-width", 2)
          .style("opacity", 1);

        // Get container's position for proper tooltip positioning
        const containerRect = containerRef.current.getBoundingClientRect();
        const [mouseX, mouseY] = d3.pointer(event);

        // Get chart's position
        const chartRect = chartRef.current.getBoundingClientRect();

        // Calculate position relative to the container
        const x = chartRect.left - containerRect.left + mouseX;
        const y = chartRect.top - containerRect.top + mouseY;

        tooltip
          .html(
            `
            <div>
              <strong style="font-size: 15px; display: block; margin-bottom: 4px;">${d.data.name}</strong>
              <span style="color: #666; font-size: 12px;">${d.data.category}</span>
              <div style="margin-top: 6px;">Impact Score: <strong>${d.data.value}</strong></div>
              <p style="margin: 6px 0 0; font-size: 12px; color: #555;">${d.data.description}</p>
            </div>
          `
          )
          .style("visibility", "visible")
          .style("left", `${x + 10}px`)
          .style("top", `${y + 10}px`);

        // Ensure tooltip stays within container bounds
        const tooltipRect = tooltip.node().getBoundingClientRect();

        // Check right boundary
        if (x + tooltipRect.width > containerRect.width - 20) {
          tooltip.style("left", `${x - tooltipRect.width - 10}px`);
        }

        // Check bottom boundary
        if (y + tooltipRect.height > containerRect.height - 20) {
          tooltip.style("top", `${y - tooltipRect.height - 10}px`);
        }
      })
      .on("mousemove", function (event) {
        // Stop event propagation
        event.stopPropagation();

        // Get container's position
        const containerRect = containerRef.current.getBoundingClientRect();
        const chartRect = chartRef.current.getBoundingClientRect();

        // Calculate mouse position relative to the chart
        const [mouseX, mouseY] = d3.pointer(event);

        // Calculate position relative to the container
        const x = chartRect.left - containerRect.left + mouseX;
        const y = chartRect.top - containerRect.top + mouseY;

        let tooltipX = x + 10;
        let tooltipY = y + 10;

        // Check boundaries and adjust if necessary
        const tooltipRect = tooltip.node().getBoundingClientRect();
        if (tooltipX + tooltipRect.width > containerRect.width - 20) {
          tooltipX = x - tooltipRect.width - 10;
        }

        if (tooltipY + tooltipRect.height > containerRect.height - 20) {
          tooltipY = y - tooltipRect.height - 10;
        }

        tooltip.style("left", `${tooltipX}px`).style("top", `${tooltipY}px`);
      })
      .on("mouseout", function (event) {
        // Stop event propagation
        event.stopPropagation();

        d3.select(this)
          .style("stroke", "white")
          .style("stroke-width", 1)
          .style("opacity", 0.9);

        tooltip.style("visibility", "hidden");
      });

    // Helper function to wrap text
    function wrapText(text, width) {
      text.each(function () {
        const text = d3.select(this);
        const words = text.text().split(/\s+/).reverse();
        const lineHeight = 1.1; // ems
        const y = text.attr("y") || 0;
        const dy = parseFloat(text.attr("dy") || 0);

        let word;
        let line = [];
        let lineNumber = 0;
        let tspan = text
          .text(null)
          .append("tspan")
          .attr("x", 0)
          .attr("y", y)
          .attr("dy", dy + "em");

        while ((word = words.pop())) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text
              .append("tspan")
              .attr("x", 0)
              .attr("y", y)
              .attr("dy", ++lineNumber * lineHeight + dy + "em")
              .text(word);
          }
        }
      });
    }

    // Add text for names with word wrapping
    nodes
      .append("text")
      .attr("dy", "-0.2em")
      .style("text-anchor", "middle")
      .style("font-size", (d) => `${calculateFontSize(d.r)}px`)
      .style("fill", "#333")
      .style("font-weight", "600")
      .text((d) => d.data.name)
      .each(function (d) {
        // Only wrap text if the circle is large enough
        if (d.r > 30) {
          wrapText(d3.select(this), d.r * 1.8);
        } else if (d.r <= 30 && d.data.name.length > 7) {
          // For smaller circles with long names, truncate with ellipsis
          const truncatedName = d.data.name.substring(0, 6) + "...";
          d3.select(this).text(truncatedName);
        }
        // For very small bubbles, don't show text at all
        if (d.r < 15) {
          d3.select(this).text("");
        }
      });

    // Add text for values with adjusted positioning - don't show values for small bubbles
    nodes
      .append("text")
      .attr("dy", (d) => {
        // Adjust the position based on whether text was wrapped
        if (d.r > 30) {
          // For wrapped text in larger bubbles, position the value lower
          return `${calculateFontSize(d.r) * 1.8}px`;
        } else {
          // For smaller bubbles or unwrapped text
          return `${calculateFontSize(d.r) * 1.2}px`;
        }
      })
      .style("text-anchor", "middle")
      .style("font-size", (d) => `${calculateFontSize(d.r) * 0.9}px`)
      .style("fill", "#555")
      .text((d) => (d.r > 15 ? d.data.value : "")); // Only show value for bubbles larger than 15px radius

    // Add click event listener to the container to hide tooltip when clicking outside
    d3.select("body").on("click.bubble-tooltip-hide", () => {
      tooltip.style("visibility", "hidden");
    });
  }, [dimensions]);

  // Clean up global event listener when component unmounts
  useEffect(() => {
    return () => {
      d3.select("body").on("click.bubble-tooltip-hide", null);
    };
  }, []);

  return (
    <div ref={containerRef} className={`w-full relative ${className}`}>
      {/* Header directly inside component for layout consistency */}
      <div className="p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Major Issues
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Primary concerns reported by employees
        </p>

        {/* Responsive chart container with proper height to ensure bubbles are centered */}
        <div
          ref={chartRef}
          className="w-full h-[400px] sm:h-[450px] mt-6 bg-white rounded flex items-center justify-center"
        />

        {/* Legend positioned at bottom right */}
        <div className="flex flex-wrap justify-end mt-4 gap-4 pr-4">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-[#4CAF50] mr-2"></span>
            <span className="text-sm text-gray-700">High Impact</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-[#81C784] mr-2"></span>
            <span className="text-sm text-gray-700">Medium Impact</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-[#DCEDC8] mr-2"></span>
            <span className="text-sm text-gray-700">Low Impact</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BubbleChartPreview;

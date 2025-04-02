import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BubbleChartPreview = () => {
  const chartRef = useRef(null);
  
  useEffect(() => {
    if (!chartRef.current) return;
    
    // Clear any existing content
    d3.select(chartRef.current).selectAll('*').remove();
    
    // Chart dimensions
    const fullWidth = 1000; // Define the width of the chart
    const width = fullWidth;
    const fullHeight = 600; // Define the height of the chart
    const height = fullHeight;
    
    // Data for our bubble chart
    const data = [
      { name: 'Content', value: 12, color: '#4472C4', category: 'Content', description: 'Content management and creation tools' },
      { name: 'Front End', value: 6, color: '#8FAADC', category: 'Front End', description: 'User interface technologies and frameworks' },
      { name: 'Languages / Frameworks', value: 16, color: '#A9CCE3', category: 'Languages / Frameworks', description: 'Programming languages and development frameworks' },
      { name: 'JavaScript', value: 10, color: '#D6EAF8', category: 'Javascript', description: 'JavaScript libraries and tools' },
      { name: 'DevOps', value: 2, color: '#D85A27', category: 'DevOps', description: 'Development operations tools and practices' },
      { name: 'Databases', value: 15, color: 'grey', category: 'Databases', description: 'Database technologies and management systems' },
      { name: 'Misc', value: 5, color: '#F4B183', category: 'Misc', description: 'Miscellaneous technologies and tools' },
      { name: 'Mobile', value: 8, color: '#FADBC8', category: 'Mobile', description: 'Mobile development platforms and tools' },
      { name: 'Conversion', value: 9, color: '#4CAF50', category: 'Conversion', description: 'Conversion optimization technologies' },
      { name: 'Testing', value: 6, color: '#81C784', category: 'Testing', description: 'Testing tools and frameworks' },
      { name: 'Management', value: 5, color: '#A5D6A7', category: 'Management', description: 'Project and product management tools' },
      { name: 'AI', value: 3, color: '#C8E6C9', category: 'AI', description: 'Artificial intelligence and machine learning technologies' },
      { name: 'API', value: 1, color: '#673AB7', category: 'API', description: 'API development and management tools' },
      { name: 'Commerce', value: 2, color: '#9575CD', category: 'Commerce', description: 'E-commerce platforms and tools' },
      { name: 'Data', value: 1, color: '#D1C4E9', category: 'Data', description: 'Data processing and analytics tools' },
      { name: 'CRM', value: 1, color: '#E9E3F4', category: 'CRM', description: 'Customer relationship management systems' }
    ];

    // Create SVG element
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('background-color', 'white');
      
    // Add horizontal grid lines first (before appending the group for bubbles)
    const numLines = 10;
    const lineSpacing = height / numLines;
    
    for (let i = 1; i < numLines; i++) {
      svg.append('line')
        .attr('x1', 1)
        .attr('y1', i * lineSpacing)
        .attr('x2', width)
        .attr('y2', i * lineSpacing)
        .style('stroke', '#e5e5e5')
        .style('stroke-width', 1);
    }
    
    // Add a light gray border to the chart
    svg.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', width)
      .attr('height', height)
      .style('fill', 'none')
      .style('stroke', '#d0d0d0')
      .style('stroke-width', 1);
    
    // Create bubble layout group
    const bubbleGroup = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);
      
    // Create tooltip div
    const tooltip = d3.select(chartRef.current)
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'rgba(0, 0, 0, 0.8)')
      .style('color', 'white')
      .style('padding', '10px')
      .style('border-radius', '5px')
      .style('font-size', '14px')
      .style('max-width', '250px')
      .style('pointer-events', 'none')
      .style('z-index', '10');
      
    // Create bubble layout
    const pack = d3.pack()
      .size([width-20, height-20])
      .padding(3);
      
    // Process data into hierarchy
    const root = d3.hierarchy({ children: data })
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);
      
    // Apply pack layout
    const bubbleData = pack(root).descendants().slice(1);
    
    // Create nodes
    const nodes = bubbleGroup.selectAll('.node')
      .data(bubbleData)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x - (width-20) / 2 }, ${d.y - (height-20) / 2 })`);
      
    // Calculate font size based on circle radius
    const calculateFontSize = (radius) => {
        if (radius < 2) return 0;
        if (radius < 5) return 4;
        if (radius < 10) return 6;
      if (radius < 20) return 8;
      if (radius < 40) return 10;
      if (radius < 60) return 12;
      if (radius < 80) return 14;
      return 16;
    };
    
    // Add circles with hover effects
    nodes.append('circle')
      .attr('r', d => d.r)
      .style('fill', d => d.data.color)
      .style('opacity', 0.9)
      .style('stroke', 'white')
      .style('stroke-width', 1)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        d3.select(this)
          .style('stroke', '#333')
          .style('stroke-width', 2)
          .style('opacity', 1);
          
        const [x, y] = d3.pointer(event, chartRef.current);
        
        tooltip
          .html(`
            <strong>${d.data.name}</strong><br/>
            Value: ${d.data.value}<br/>
            ${d.data.description || ''}
          `)
          .style('visibility', 'visible')
          .style('left', `${x + 10}px`)
          .style('top', `${y + 10}px`);
      })
      .on('mousemove', function(event) {
        const [x, y] = d3.pointer(event, chartRef.current);
        tooltip
          .style('left', `${x + 10}px`)
          .style('top', `${y + 10}px`);
      })
      .on('mouseout', function() {
        d3.select(this)
          .style('stroke', 'white')
          .style('stroke-width', 1)
          .style('opacity', 0.9);
          
        tooltip.style('visibility', 'hidden');
      });
      
    // Helper function to wrap text
    function wrapText(text, width) {
      text.each(function() {
        const text = d3.select(this);
        const words = text.text().split(/\s+/).reverse();
        const lineHeight = 1.1; // ems
        const y = text.attr("y");
        const dy = parseFloat(text.attr("dy"));
        
        let word;
        let line = [];
        let lineNumber = 0;
        let tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        
        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
          }
        }
      });
    }
    
    // Add text for names with word wrapping
    nodes.append('text')
      .attr('dy', '-0.2em')
      .style('text-anchor', 'middle')
      .style('font-size', d => `${calculateFontSize(d.r)}px`)
      .style('fill', 'black')
      .style('font-weight', 'bold')
      .text(d => d.data.name)
      .each(function(d) {
        // Only wrap text if the circle is large enough
        if (d.r > 30) {
          wrapText(d3.select(this), d.r * 1.8);
        } else if (d.r <= 30 && d.data.name.length > 8) {
          // For smaller circles with long names, truncate with ellipsis
          const truncatedName = d.data.name.substring(0, 7) + '...';
          d3.select(this).text(truncatedName);
        }
      });
      
    // Add text for values with adjusted positioning
    nodes.append('text')
      .attr('dy', d => {
        // Adjust the position based on whether text was wrapped
        if (d.r > 30) {
          // For wrapped text in larger bubbles, position the value lower
          return `${calculateFontSize(d.r) * 1.8}px`;
        } else {
          // For smaller bubbles or unwrapped text
          return `${calculateFontSize(d.r) * 1.2}px`;
        }
      })
      .style('text-anchor', 'middle')
      .style('font-size', d => `${calculateFontSize(d.r) * 0.9}px`)
      .style('fill', 'black')
      .text(d => d.data.value);
      
    // Add title
    svg.append('text')
      .attr('x', 20)
      .attr('y', 40)
      .text('Technology Categories')
      .style('font-size', '24px')
      .style('font-weight', 'bold');
      
    svg.append('text')
      .attr('x', 20)
      .attr('y', 65)
      .text('Distribution of technologies by category')
      .style('font-size', '16px')
      .style('fill', '#666');

    // Create legend
    const legendData = [
      { label: 'High', color: '#4CAF50' },
      { label: 'Medium', color: '#90CAF9' },
      { label: 'Low', color: '#E6EE9C' }
    ];
    
    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${width - 120}, ${height - 100})`);

    legend.selectAll('rect')
      .data(legendData)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', (d, i) => i * 25)
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', d => d.color);

    legend.selectAll('text')
      .data(legendData)
      .enter()
      .append('text')
      .attr('x', 25)
      .attr('y', (d, i) => i * 25 + 12)
      .style('font-size', '14px')
      .text(d => d.label);
  }, []);
  
  return (
    <div className="flex flex-col items-center w-full bg-white rounded-lg shadow-lg " >
      <div 
        ref={chartRef} 
        className="flex relative w-full bg-white rounded-lg shadow-lg items-center justify-center" 
        style={{ height: '600px', width: 'w' }}
      />
    </div>
  );
};

export default BubbleChartPreview;
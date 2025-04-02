import React, { useState, useEffect, useRef } from "react";

export default function EmployeeSatisfactionGauge({
  title = "Employee Satisfaction",
  subtitle = "Employees who need most attention",
  satisfactionValue = 68, 
  monthlyChange = 5.3,   
  monthLabel = "in past 1 month",
  className = "", // Add className prop for custom styling
}) {
  const [animatedAngle, setAnimatedAngle] = useState(-90); 
  const [animatedRatio, setAnimatedRatio] = useState(0); 

  const ratio = Math.min(Math.max(satisfactionValue / 100, 0), 1); 
  const targetNeedleAngle = -90 + 180 * ratio;
  
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const startTime = Date.now();
    const duration = 1500; 
    const startAngle = -90; 
    const startRatio = 0;
    const angleChange = targetNeedleAngle - startAngle;
    const ratioChange = ratio - startRatio;

    // Animation function
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3); 
      
      const currentAngle = startAngle + angleChange * easeOut;
      const currentRatio = startRatio + ratioChange * easeOut;
      
      setAnimatedAngle(currentAngle);
      setAnimatedRatio(currentRatio);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [ratio, targetNeedleAngle]);

  // Format monthly change display
  const changeSign = monthlyChange >= 0 ? "+" : "";
  const changeColor = monthlyChange >= 0 ? "text-green-600" : "text-red-600";

  // Arc properties
  const centerX = 100;
  const centerY = 100;
  const radius = 90;
  const arcLength = Math.PI * radius; // Length of a semicircle arc

  return (
    <div className={`w-full text-center bg-white rounded-lg ${className}`}>
      <div className="px-4 pt-4">
        <div className="text-lg font-semibold mb-1">{title}</div>
        <div className="text-sm text-gray-500 mb-3">{subtitle}</div>
      </div>

      <div className="px-2 pb-4">
        <div className="relative max-w-xs mx-auto aspect-[2/1]">
          <svg
            className="w-full h-auto"
            viewBox="0 0 200 105"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Tick marks and labels */}
            
            
            {/* Background arc */}
            <path
              d="M 10,100 A 90,90 0 0 1 190,100"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="20"
            />
            
            {/* Filled arc - animated */}
            <path
              d="M 10,100 A 90,90 0 0 1 190,100"
              fill="none"
              stroke="#8BC34A"
              strokeWidth="20"
              strokeDasharray={arcLength}
              strokeDashoffset={arcLength - arcLength * animatedRatio}
              strokeLinecap="round"
            />

            {/* Needle/Arrow - animated */}
            <g transform={`rotate(${animatedAngle}, 100, 100)`}>
              {/* Enhanced indicator */}
              <defs>
                <linearGradient id="needleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8BC34A" stopOpacity="1" />
                  <stop offset="100%" stopColor="#7CB342" stopOpacity="1" />
                </linearGradient>
              </defs>
              
              {/* Main needle shape with thicker base */}
              <path
                d="M 92,100 L 100,30 L 108,100 Z"
                fill="url(#needleGradient)"
                stroke="#7CB342"
                strokeWidth="0.5"
              />
              
              {/* Center pivot */}
              <circle cx="100" cy="100" r="8" fill="#ffffff" stroke="#8BC34A" strokeWidth="2" />
            </g>
          </svg>
        </div>

        {/* Animated percentage display */}
        <div className="text-2xl font-bold mt-2">
          {Math.round(animatedRatio * 100 * 10) / 10}%
        </div>

        <div className={`mt-1 text-sm ${changeColor}`}>
          {changeSign}
          {monthlyChange.toFixed(1)}%{" "}
          <span className="text-gray-400">({monthLabel})</span>
        </div>
      </div>
    </div>
  );
}

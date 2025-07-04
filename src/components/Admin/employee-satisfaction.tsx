import { useState, useEffect, useRef } from "react";

export interface EmployeeSatisfaction {
  percentage: number;
  change: number;
  period: string;
}

interface EmployeeSatisfactionGaugeProps {
  title?: string;
  subtitle?: string;
  percentage?: number; // Satisfaction percentage value
  change?: number; // Monthly change percentage
  period?: string; // Label for the month
  className?: string; // Additional class name for custom styling
}

export default function EmployeeSatisfactionGauge({
  title = "Employee Satisfaction",
  subtitle = "Employees who need most attention",
  percentage,
  change,
  period,
  className = "", // Add className prop for custom styling
}: EmployeeSatisfactionGaugeProps) {
  const [animatedAngle, setAnimatedAngle] = useState(-90);
  const [animatedRatio, setAnimatedRatio] = useState(0);

  const ratio = 0.85;
  const targetNeedleAngle = 63;

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
  const changeSign = (change || 0) >= 0 ? "+" : "";
  const changeColor =
    (change || 0) >= 0 ? "text-[#7CC243]-600" : "text-red-600";

  // Arc properties
  const radius = 90;
  const arcLength = Math.PI * radius; // Length of a semicircle arc

  return (
    <div className={`w-full bg-white rounded-lg shadow-sm ${className}`}>
      <div className="pt-4 pl-4">
        <div className="text-lg sm:text-xl font-semibold text-gray-900">
          {title}
        </div>
        <div className="text-xs text-gray-500">{subtitle}</div>
      </div>

      <div className="px-2 pb-4">
        <div className="relative max-w-xs mx-auto">
          <svg
            className="w-full h-48"
            viewBox="0 0 200 105"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Concentric half circles - just two as requested */}
            <path
              d="M 30,100 A 70,70 0 0 1 170,100"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="1"
              strokeDasharray="2,2"
            />

            <path
              d="M 60,100 A 40,40 0 0 1 140,100"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="1"
              strokeDasharray="2,2"
            />

            {/* Background arc */}
            <path
              d="M 10,100 A 90,90 0 0 1 190,100"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="20"
              strokeLinecap="round"
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
                <linearGradient
                  id="needleGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
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
              <circle
                cx="100"
                cy="100"
                r="8"
                fill="#ffffff"
                stroke="#8BC34A"
                strokeWidth="2"
              />
            </g>
          </svg>
        </div>

        {/* Animated percentage display */}
        <div className="text-2xl font-bold mt-2 text-center">
          {Math.round(85)}%
        </div>

        <div className={`mt-1 text-sm text-center ${changeColor}`}>
          {changeSign}
          {(change || 0).toFixed(1)}%{" "}
          <span className="text-gray-400">({period})</span>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useRef } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, Calendar } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils"; 

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

// Updated to match the filter options
interface DataPoint {
  day: number;
  month: string;
  date: string; // For full date representation
  morale: number;
  engagement: number;
  risk: number; 
  cultural: number;
  leave: number;
  hr: number;
}

interface MoraleChartProps {
  data?: DataPoint[];
  title?: string;
  subtitle?: string;
}

interface FilterCheckboxProps {
  id: string;
  label: string;
  defaultChecked?: boolean;
  onChange: (id: string, checked: boolean) => void;
}

const filterOptions = [
  { id: 'morale', label: 'Morale Score', defaultChecked: true },
  { id: 'engagement', label: 'Engagement Score', defaultChecked: true },
  { id: 'risk', label: 'Risk Retention Score', defaultChecked: true },
  { id: 'cultural', label: 'Cultural Score', defaultChecked: true },
  { id: 'leave', label: 'Leave Impact', defaultChecked: false },
  { id: 'hr', label: 'HR Interventions', defaultChecked: false },
];

const months = [
  { value: 'january', label: 'January' },
  { value: 'february', label: 'February' },
  { value: 'march', label: 'March' },
  { value: 'april', label: 'April' },
  { value: 'may', label: 'May' },
  { value: 'june', label: 'June' },
  { value: 'july', label: 'July' },
  { value: 'august', label: 'August' },
  { value: 'september', label: 'September' },
  { value: 'october', label: 'October' },
  { value: 'november', label: 'November' },
  { value: 'december', label: 'December' },
];

// Create realistic dummy data for all months
const generateDummyData = (): DataPoint[] => {
  const data: DataPoint[] = [];
  
  months.forEach((month, monthIndex) => {
    const daysInMonth = new Date(2025, monthIndex + 1, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
      // Format date as YYYY-MM-DD
      const dateStr = `2025-${(monthIndex + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      
      data.push({
        day,
        month: month.value,
        date: dateStr,
        morale: 50 + Math.floor(Math.random() * 50), // Higher baseline for morale (50-100)
        engagement: 40 + Math.floor(Math.random() * 60), // Various ranges to create visual distinction
        risk: 30 + Math.floor(Math.random() * 70),
        cultural: 60 + Math.floor(Math.random() * 40),
        leave: Math.floor(Math.random() * 30), // Lower values for leave impact
        hr: Math.floor(Math.random() * 20), // Lowest values for HR interventions
      });
    }
  });
  
  return data;
};

// Generate once at component initialization
const allDummyData = generateDummyData();

const FilterCheckbox: React.FC<FilterCheckboxProps> = ({ id, label, defaultChecked, onChange }) => {
  // Remove the internal state that's causing the sync issue
  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id={id} 
        defaultChecked={defaultChecked}
        onCheckedChange={(checked) => onChange(id, checked as boolean)}
        className="border-[#80C342] data-[state=checked]:bg-[#80C342] data-[state=checked]:border-[#80C342]"
      />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none text-gray-700"
      >
        {label}
      </label>
    </div>
  );
};

const MoraleChart: React.FC<MoraleChartProps> = ({
  data = allDummyData,
  title = `Day by Day Scores - March 2025`,
  subtitle = "Daily variation in team performance metrics",
}) => {
  // State for selected metrics
  const [selectedMetrics, setSelectedMetrics] = useState<Record<string, boolean>>(
    filterOptions.reduce((acc, option) => ({
      ...acc,
      [option.id]: option.defaultChecked || false
    }), {})
  );
 
  // Set default date range for last 30 days (assuming current date is in 2025)
  const defaultEndDate = '2025-03-31'; // March 31, 2025
  const defaultStartDate = '2025-03-01'; // March 1, 2025
  
  // State for filter selections
  const [filterBy, setFilterBy] = useState("month");
  const [selectedMonth, setSelectedMonth] = useState("march");
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
   title = `Day by Day Scores - ${selectedMonth}  2025`
  // Add state for popover control
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Handle metric selection changes
  const handleMetricChange = (id: string, checked: boolean) => {
    setSelectedMetrics(prev => ({
      ...prev,
      [id]: checked
    }));
  };
  
  // Handle filter type change
  const handleFilterByChange = (value: string) => {
    setFilterBy(value);
    // When switching to "day" view, ensure default dates are set
    if (value === "day" && (!startDate || !endDate)) {
      setStartDate(defaultStartDate);
      setEndDate(defaultEndDate);
    }
  };
  
  // Filter data based on selections
  const filteredData = data.filter(point => {
    if (filterBy === "month") {
      return point.month === selectedMonth;
    } else {
      // Use the date range
      return point.date >= startDate && point.date <= endDate;
    }
  });
  
  // Colors for different metrics
  const metricColors: Record<string, string> = {
    morale: "#0088FE",
    engagement: "#00C49F",
    risk: "#FFBB28", 
    cultural: "#FF8042",
    leave: "#8884d8",
    hr: "#82ca9d"
  };
  
  const FilterOverlay = () => {
    return (
      <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} /> Filter
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-64 p-4 shadow-md bg-white rounded-lg" 
          align="end" 
          alignOffset={0}
          sideOffset={5}
        >
          {/* Line Graphs Section */}
          <h3 className="text-md font-semibold mb-3">Line Graphs:</h3>
          <div className="flex flex-col gap-3">
            {filterOptions.map((option) => (
              <div 
                key={option.id} 
                className="flex items-center space-x-2"
                onClick={(e) => e.stopPropagation()} // Prevent clicks from bubbling up
              >
                <Checkbox 
                  id={option.id}
                  checked={selectedMetrics[option.id]}
                  onCheckedChange={(checked) => handleMetricChange(option.id, checked as boolean)}
                  className="border-[#80C342] data-[state=checked]:bg-[#80C342] data-[state=checked]:border-[#80C342]"
                />
                <label
                  htmlFor={option.id}
                  className="text-sm font-medium leading-none text-[#949494]"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>

          {/* Rest of the component stays the same */}
          <h3 className="text-md font-semibold mt-4 mb-3">Filter By:</h3>
          <RadioGroup
            value={filterBy}
            onValueChange={handleFilterByChange}
            className="flex flex-col gap-3"
          >
            {['month', 'day'].map((value) => (
              <label key={value} className="flex items-center gap-2">
                <RadioGroupItem 
                  value={value}
                  className="border-[#80C342] data-[state=checked]:bg-[#80C342] data-[state=checked]:border-[#80C342]"
                />
                <span className="text-sm font-medium text-[#949494] capitalize"> {/* Updated color */}
                  {value}
                </span>
              </label>
            ))}
          </RadioGroup>
  
          {/* Conditional Inputs */}
          {filterBy === "month" ? (
            <Select value={selectedMonth} onValueChange={setSelectedMonth} onClick={(e) => e.stopPropagation()}>
              <SelectTrigger className="mt-2 text-[#949494]"> {/* Updated color */}
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value} className="text-[#949494]"> {/* Updated color */}
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="flex flex-col gap-2 mt-2">
              {/* Start Date with Calendar Dropdown */}
              <Popover>
                <PopoverTrigger asChild>
                  <div className="relative cursor-pointer" onClick={(e) => e.stopPropagation()}>
                    <Input 
                      readOnly
                      placeholder="Start Date"
                      value={startDate ? format(new Date(startDate), "PPP") : ""}
                      className="text-[#949494] pr-8"
                    />
                    <Calendar 
                      size={16} 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#949494]" 
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={startDate ? new Date(startDate) : undefined}
                    onSelect={(date) => date && setStartDate(format(date, "yyyy-MM-dd"))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              {/* End Date with Calendar Dropdown */}
              <Popover>
                <PopoverTrigger asChild>
                  <div className="relative cursor-pointer" onClick={(e) => e.stopPropagation()}>
                    <Input 
                      readOnly
                      placeholder="End Date"
                      value={endDate ? format(new Date(endDate), "PPP") : ""}
                      className="text-[#949494] pr-8"
                    />
                    <Calendar 
                      size={16} 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#949494]" 
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={endDate ? new Date(endDate) : undefined}
                    onSelect={(date) => date && setEndDate(format(date, "yyyy-MM-dd"))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </PopoverContent>
      </Popover>
    );
  };
  
  return (
    <Card className="p-6 shadow-md relative">
      <CardHeader className="flex justify-between items-center">
        <div>
          <CardTitle className="text-xl font-bold text-gray-800">{title}</CardTitle>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <FilterOverlay />
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 15 }}>
              <XAxis
                dataKey="day"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={true}
                label={{
                  value: "Days →",
                  position: "insideBottom",
                  dy: 10,
                  fill: "#80C342",
                  fontSize: 14,
                }}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={true}
                tickFormatter={(value) => `${value}`}
                label={{
                  value: "Score →",
                  angle: -90,
                  position: "insideLeft",
                  dx: -10,
                  fill: "#80C342",
                  fontSize: 14,
                }}
              />
              <Tooltip />
              
              <Legend 
              wrapperStyle={{ paddingTop: 15 }} 
              verticalAlign="bottom"
              height={36}/>
              
              {/* Dynamically render lines based on selected metrics */}
              {Object.entries(selectedMetrics).map(([metric, isSelected]) => 
                isSelected && (
                  <Line 
                    key={metric}
                    type="monotone" 
                    dataKey={metric}
                    stroke={metricColors[metric]} 
                    strokeWidth={2}
                    name={filterOptions.find(opt => opt.id === metric)?.label || metric}
                    dot={false}
                    activeDot={{ r: 5 }}
                  />
                )
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoraleChart;

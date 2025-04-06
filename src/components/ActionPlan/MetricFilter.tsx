import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TagIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type MetricOption = {
  label: string;
  value: string;
  checked: boolean;
};

interface MetricFilterProps {
  metrics: string[];
  onFilterChange: (filters: string[]) => void;
}

export function MetricFilter({ metrics, onFilterChange }: MetricFilterProps) {
  const [metricOptions, setMetricOptions] = useState<MetricOption[]>([]);

  // Initialize metric options when metrics prop changes
  useEffect(() => {
    const options = metrics.map(metric => ({
      label: metric,
      value: metric,
      checked: false
    }));
    setMetricOptions(options);
  }, [metrics]);

  const handleCheckedChange = (value: string, checked: boolean) => {
    const updatedOptions = metricOptions.map((option) =>
      option.value === value ? { ...option, checked } : option
    );
    
    setMetricOptions(updatedOptions);
    
    // Pass active filters to parent component
    const activeFilters = updatedOptions
      .filter(option => option.checked)
      .map(option => option.value);
    
    onFilterChange(activeFilters);
  };

  // Count checked options
  const checkedCount = metricOptions.filter(option => option.checked).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className={`flex items-center gap-2 ${
            checkedCount > 0 ? 'bg-[#eef7e2] border-[#86BC25] text-[#86BC25]' : ''
          }`}
        >
          <TagIcon className="h-4 w-4" />
          Metrics {checkedCount > 0 && `(${checkedCount})`}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {metricOptions.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={option.checked}
            onCheckedChange={(checked) =>
              handleCheckedChange(option.value, checked)
            }
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
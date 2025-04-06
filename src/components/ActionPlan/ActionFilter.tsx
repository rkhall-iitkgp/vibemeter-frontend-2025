import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type FilterOption = {
  label: string;
  value: string;
  checked: boolean;
};

interface ActionFilterProps {
  onFilterChange: (filters: string[]) => void;
}

export function ActionFilter({ onFilterChange }: ActionFilterProps) {
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([
    { label: "Completed", value: "completed", checked: false },
    { label: "In Progress", value: "in_progress", checked: false },
    { label: "Not Started", value: "not_started", checked: false },
  ]);

  const handleCheckedChange = (value: string, checked: boolean) => {
    const updatedOptions = filterOptions.map((option) =>
      option.value === value ? { ...option, checked } : option
    );
    
    setFilterOptions(updatedOptions);
    
    // Pass active filters to parent component
    const activeFilters = updatedOptions
      .filter(option => option.checked)
      .map(option => option.value);
    
    onFilterChange(activeFilters);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <FilterIcon className="h-4 w-4" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {filterOptions.map((option) => (
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
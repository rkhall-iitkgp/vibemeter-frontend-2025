import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";

type SortOption = {
  label: string;
  value: string;
};

interface ActionSortProps {
  onSortChange: (sortValue: string) => void;
}

export function ActionSort({ onSortChange }: ActionSortProps) {
  const [sortValue, setSortValue] = useState("newest");

  const sortOptions: SortOption[] = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Alphabetical (A-Z)", value: "alpha_asc" },
    { label: "Alphabetical (Z-A)", value: "alpha_desc" },
  ];

  const handleSortChange = (value: string) => {
    setSortValue(value);
    onSortChange(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4" />
          Sort
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuRadioGroup
          value={sortValue}
          onValueChange={handleSortChange}
        >
          {sortOptions.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

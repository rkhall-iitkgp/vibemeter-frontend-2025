import React, { useState, useRef, useEffect } from "react";
import { X, Check, ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selected,
  onChange,
  placeholder = "Select options",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const removeOption = (e: React.MouseEvent, value: string) => {
    e.stopPropagation();
    onChange(selected.filter((item) => item !== value));
  };

  return (
    <div className={`relative ${className}`} ref={ref}>
      <div
        className="flex flex-wrap min-h-10 items-center gap-1 p-2 border rounded-md cursor-pointer bg-white hover:border-gray-400"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.length > 0 ? (
          selected.map((value) => {
            const option = options.find((opt) => opt.value === value);
            return (
              <div
                key={value}
                className="flex items-center gap-1 bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm"
              >
                {option?.label || value}
                <button
                  onClick={(e) => removeOption(e, value)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={14} />
                </button>
              </div>
            );
          })
        ) : (
          <span className="text-gray-500">{placeholder}</span>
        )}
        <div className="ml-auto">
          <ChevronDown size={18} className="text-gray-500" />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                selected.includes(option.value) ? "bg-gray-50" : ""
              }`}
              onClick={() => toggleOption(option.value)}
            >
              <span>{option.label}</span>
              {selected.includes(option.value) && (
                <Check size={16} className="text-[#80C342]" />
              )}
            </div>
          ))}
          {options.length === 0 && (
            <div className="px-4 py-2 text-gray-500">No options available</div>
          )}
        </div>
      )}
    </div>
  );
};
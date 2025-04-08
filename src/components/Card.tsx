"use client";

import { Card as ShadcnCard, CardContent } from "@/components/ui/card";
import { Trophy, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CardProps {
  title: string;
  description: string;
  priorityLevel: "high" | "medium" | "low";
  targetGroup: string;
  categories: string[];
  className?: string;
  onViewDetails?: () => void;
}

export function Card({
  title,
  description,
  priorityLevel,
  targetGroup,
  categories,
  className,
  onViewDetails,
}: CardProps) {
  // Helper function to get priority badge color
  const getPriorityBadgeColor = () => {
    switch (priorityLevel.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-600";
      case "medium":
        return "bg-amber-100 text-amber-600";
      case "low":
        return "bg-green-100 text-[#7CC243]-600";
      default:
        return "bg-red-100 text-red-600";
    }
  };

  // Helper function to get category badge color
  const getCategoryBadgeColor = (category: string) => {
    if (category.toLowerCase().includes("team building")) {
      return "bg-purple-100 text-purple-600";
    } else if (category.toLowerCase().includes("morale")) {
      return "bg-blue-100 text-blue-600";
    } else {
      return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <ShadcnCard className={cn("border border-gray-200 shadow-sm", className)}>
      <CardContent className="p-5">
        {/* Trophy icon and title */}
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-amber-100 p-2.5 rounded-full">
            <Trophy className="h-5 w-5 text-amber-600" />
          </div>

          <div>
            <h3 className="text-base font-medium text-gray-900">{title}</h3>
            <span
              className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 ${getPriorityBadgeColor()}`}
            >
              {priorityLevel.charAt(0).toUpperCase() + priorityLevel.slice(1)}{" "}
              Priority
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-5">{description}</p>

        {/* Target group */}
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-4 w-4 text-gray-400" />
          <span className="text-xs text-gray-500">
            Target Group: {targetGroup}
          </span>
        </div>

        {/* Categories and View Details in the same row */}
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <span
                key={index}
                className={`text-xs px-3 py-1 rounded-md ${getCategoryBadgeColor(category)}`}
              >
                {category}
              </span>
            ))}
          </div>

          <button
            onClick={onViewDetails}
            className="text-blue-600 text-sm hover:text-blue-800 transition-colors flex items-center ml-2"
          >
            View Details <span className="ml-1">→</span>
          </button>
        </div>
      </CardContent>
    </ShadcnCard>
  );
}

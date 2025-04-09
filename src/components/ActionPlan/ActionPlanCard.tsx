import { ChevronRight, Users, Edit, Trash2 } from "lucide-react";
import { ActionPlan } from "@/types";
import React from "react";

interface ActionPlanCardProps {
  plan: ActionPlan;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ActionPlanCard({
  plan,
  onClick,
  onEdit,
  onDelete,
}: ActionPlanCardProps) {
  const formattedDate = new Date(plan.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const tags = plan.metric;

  return (
    <div className="mt-2 mx-0 border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow relative">
      {/* Edit and Delete Icons */}
      <div className="absolute top-4 right-4 flex space-x-2">
        <button
          onClick={onEdit}
          className="text-gray-500 hover:text-green-600 transition-colors"
          aria-label="Edit"
        >
          <Edit className="h-5 w-5" />
        </button>
        <button
          onClick={onDelete}
          className="text-gray-500 hover:text-red-600 transition-colors"
          aria-label="Delete"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-gray-900">{plan.title}</h3>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">
            Created on {formattedDate}
          </span>

          {tags && tags.length > 0 && (
            <div className="flex items-center space-x-2 ml-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 text-xs rounded-[0.5vw] ${
                    index % 2 === 0
                      ? "bg-amber-100 text-amber-800"
                      : "bg-teal-100 text-teal-800"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <p className="text-sm text-gray-600 max-w-[80%]">{plan.purpose}</p>

        {plan.target_groups && plan.target_groups.length > 0 && (
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="font-medium">Target Group:</span>
              <span>
                {plan.target_groups
                  .slice(0, 2)
                  .map(
                    (
                      group: { focus_group_id: string; name: string },
                      index: number
                    ) => (
                      <React.Fragment key={index}>
                        {group.name}
                        {index < plan.target_groups.slice(0, 2).length - 1 &&
                          ", "}
                      </React.Fragment>
                    )
                  )}
                {plan.target_groups.length > 2 &&
                  ` (+${plan.target_groups.length - 2} more)`}
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={onClick}
                className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Details
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

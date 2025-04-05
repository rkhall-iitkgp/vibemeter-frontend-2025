import { ArrowRight, Trash2 } from "lucide-react";

interface FocusGroups {
  name: string;
  focus_group_id: string;
}
import { useNavigate } from "react-router";

interface HorizontalRecognitionCardProps {
  title: string;
  created_at: string;
  purpose: string;
  target_groups: FocusGroups[];
  metrics: string[];
  action_id: string;
  is_completed?: boolean;
  onDelete: (actionId: string) => void;
}

export function HorizontalRecognitionCard(
  props: HorizontalRecognitionCardProps
) {
  // Function to determine metric color based on metric content with proper typing
  const getTagColor = (metric: string): string => {
    const tagLower = metric.toLowerCase();
    if (tagLower.includes("moral") || tagLower === "morality") {
      return "bg-amber-100 text-amber-700";
    } else if (tagLower.includes("engage") || tagLower === "engagement") {
      return "bg-teal-100 text-teal-700";
    } else if (tagLower.includes("perform") || tagLower === "performance") {
      return "bg-purple-100 text-purple-700";
    } else if (tagLower.includes("commun") || tagLower === "communication") {
      return "bg-blue-100 text-blue-700";
    } else if (tagLower.includes("lead") || tagLower === "leadership") {
      return "bg-indigo-100 text-indigo-700";
    } else if (tagLower.includes("innov") || tagLower === "innovation") {
      return "bg-pink-100 text-pink-700";
    } else if (tagLower.includes("well") || tagLower === "wellbeing") {
      return "bg-green-100 text-green-700";
    } else {
      return "bg-gray-100 text-gray-700";
    }
  };

  const navigate = useNavigate();
  const handleClick = () => { 
    // Redirect to the action plan details page with action_id as a parameter
    navigate(`/action-plan/${props.action_id}`);
  }

  return (
    <div className="bg-white rounded-md border border-gray-200 p-6 shadow-sm w-full mb-4" onClick={handleClick}>
      <h3 className="font-semibold text-gray-900 text-lg mb-1">
        {props.title}
      </h3>

      <div className="flex items-center flex-wrap gap-2 mb-3">
        <p className="text-sm text-gray-500">
          Created on{" "}
          {new Date(props.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          })}
        </p>
        {Array.isArray(props.metrics) && props.metrics.length > 0 ? (
          props.metrics.map((metric, tagIndex) => (
            <span
              key={tagIndex}
              className={`px-3 py-1 text-xs rounded-sm ${getTagColor(metric)}`}
            >
              {metric}
            </span>
          ))
        ) : (
          <span className="px-3 py-1 text-xs rounded-sm bg-gray-100 text-gray-700">
            General
          </span>
        )}
      </div>

      <div className="text-gray-600 text-sm mb-4">{props.purpose}</div>

      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-600">
          <svg
            className="h-5 w-5 mr-2 text-[#86BC25]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 20H22V18C22 16.3431 20.6569 15 19 15C18.0444 15 17.1931 15.4468 16.6438 16.1429M17 20H7M17 20V18C17 17.3438 16.8736 16.717 16.6438 16.1429M7 20H2V18C2 16.3431 3.34315 15 5 15C5.95561 15 6.80686 15.4468 7.35625 16.1429M7 20V18C7 17.3438 7.12642 16.717 7.35625 16.1429M7.35625 16.1429C8.0935 14.301 9.89482 13 12 13C14.1052 13 15.9065 14.301 16.6438 16.1429M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7ZM21 10C21 11.1046 20.1046 12 19 12C17.8954 12 17 11.1046 17 10C17 8.89543 17.8954 8 19 8C20.1046 8 21 8.89543 21 10ZM7 10C7 11.1046 6.10457 12 5 12C3.89543 12 3 11.1046 3 10C3 8.89543 3.89543 8 5 8C6.10457 8 7 8.89543 7 10Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[#005587] font-semibold">Target Group:</span>
          {props.target_groups?.map((targetGroup) => {
            return (
              <span className="ml-1 font-semibold text-[#000]">
                {targetGroup.name} ({targetGroup.focus_group_id})
              </span>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => props.onDelete(props.action_id)}
            className="text-red-600 text-sm font-medium flex items-center hover:text-red-800 transition-colors"
            aria-label="Delete action plan"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </button>
          <button className="text-[#012169] text-sm font-medium flex items-center hover:underline">
            View Details
            <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

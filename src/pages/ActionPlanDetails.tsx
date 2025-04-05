import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Badge color mapping
const getBadgeColor = (tag) => {
  const colorMap = {
    "Cultural Score": "bg-pink-100 text-pink-800",
    Morale: "bg-violet-100 text-violet-800",
    Engagement: "bg-sky-100 text-sky-800",
  };
  return colorMap[tag] || "bg-gray-100 text-gray-800";
};

// Header Component
const ActionPlanHeader = ({ plan }) => {
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center text-sm">
          <Link
            to="/action-plan"
            className="text-gray-600 hover:text-gray-900"
          >
            Action Plans
          </Link>
          <svg
            className="mx-2 h-5 w-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-blue-600 font-medium">
            {plan?.title || ""}
          </span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 pb-3">
        <div>
          <h1 className="text-xl font-bold pb-2">{plan?.title || ""}</h1>
          <div className="flex items-center text-gray-500 text-xs px-1">
            <span>Group ID: {plan?.action_id || ""}</span>
          </div>
        </div>
        <span className="text-sm text-gray-500">
          Created on {" "}
          {new Date(plan.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          })}
        </span>
      </div>
      <div className="border-t border-b py-4">
        <h2 className="font-semibold">Description:</h2>
        <p className="text-sm text-gray-700 mt-1">{plan?.purpose || ""}</p>
      </div>
    </div>
  );
};

// Target Metrics Component - Made to match the image with inline badges
const TargetMetrics = ({ metrics }) => {
  if (!metrics || metrics.length === 0) {
    return (
      <div className="my-4">
        <h2 className="font-semibold mb-2">Target Metrics:</h2>
      </div>
    );
  }

  return (
    <div className="my-4">
      <h2 className="font-semibold mb-2">Target Metrics:</h2>
      <div className="flex flex-wrap gap-2">
        {metrics.map((metric, index) => (
          <span
            key={index}
            className={`px-2 py-1 rounded-md text-xs ${getBadgeColor(metric)}`}
          >
            {metric}
          </span>
        ))}
      </div>
    </div>
  );
};

// Focus Groups Component with Sort
const FocusGroups = ({ groups }) => { 
  const navigate = useNavigate();
  const [sortedGroups, setSortedGroups] = useState([]);
  const [sortBy, setSortBy] = useState("priority");

  useEffect(() => {
    // Simple sorting logic
    if (groups && groups.length > 0) {
      const sorted = [...groups];
      setSortedGroups(sorted);
    }
  }, [groups, sortBy]);

  if (!groups || groups.length === 0) {
    return (
      <div className="my-6">
        <h2 className="font-semibold mb-3">Target Focus Groups:</h2>
      </div>
    );
  }

  return (
    <div className="my-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold">Target Focus Groups:</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm">Sort By :</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32 h-8 text-sm">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {sortedGroups?.map((group) => (
          <div
            key={group.focus_group_id}
            className="border rounded-md overflow-hidden bg-white shadow-sm"
            onClick = {() => navigate(`/focus-groups/${group.focus_group_id}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="p-4">
              <div className="flex flex-col md:flex-row justify-between items-start gap-3">
                <div>
                  <h3 className="font-medium">{group.name}</h3>
                  <p className="text-xs text-gray-500">
                    Created on{" "}
                    {new Date(group.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    })}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {group?.metrics?.map((metric, index) => (
                      <span
                        key={index}
                        className={`px-2 py-0.5 rounded-md text-xs ${getBadgeColor(
                          metric
                        )}`}
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm mt-2">{group.description}</p>
                </div>
                <div className="text-right mt-2 md:mt-0">
                  <div className="text-xs text-gray-500">Participants:</div>
                  <div className="font-semibold text-green-600">
                    {group.users?.length || 0} Members
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Steps Component - Fixed to have the line pass through the center of the circles
const ActionSteps = ({ steps }) => {
  if (!steps || steps.length === 0) {
    return (
      <div className="my-6">
        <h2 className="font-semibold mb-4">Steps:</h2>
      </div>
    );
  }

  return (
    <div className="my-6">
      <h2 className="font-semibold mb-4">Steps:</h2>
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <div className="flex">
              {/* Circle and line container with proper centering */}
              <div className="relative flex items-center justify-center">
                {/* The vertical line - positioned to go through circle center */}
                {index < steps.length - 1 && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-0.5 h-[calc(100%+1.5rem)] bg-[#80C342] opacity-30"></div>
                )}

                {/* Number circle - z-index ensures it appears above the line */}
                <div className="w-8 h-8 rounded-full bg-[#80C342] flex items-center justify-center text-white font-bold relative z-10">
                  {index + 1}
                </div>
              </div>

              {/* Card content */}
              <div className="ml-4 flex-grow">
                <div className="border rounded-md overflow-hidden bg-white shadow-sm border-l-4 border-l-[#80C342]">
                  <div className="p-3 border-b">
                    <h3 className="text-base font-medium">{`Step ${index + 1}`}</h3>
                  </div>
                  <div className="p-3 text-sm">{step}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Component
const ActionPlanDetails = () => {
  const navigate = useNavigate();
  const { actionId } = useParams(); // Get id from URL params
  const [plan, setPlan] = useState({}); // State to hold the action plan data

  useEffect(() => {
    // Fetch the action plan data from the backend using the id from URL params
    const fetchActionPlan = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/actions/${actionId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPlan(data.data); // Set the plan data
      } catch (error) {
        console.error("Error fetching action plan:", error);
      }
    };
    fetchActionPlan();
  }, [actionId]);

  return (
    <div className="w-full mx-auto p-4 sm:p-6 bg-gray-50 overflow-auto">
      <div className="bg-white p-5 rounded-lg shadow-sm">
        <ActionPlanHeader plan={plan} />
        <TargetMetrics metrics={plan.metric} />
        <FocusGroups groups={plan.target_groups} />
        <ActionSteps steps={plan.steps} />
      </div>
    </div>
  );
};

export default ActionPlanDetails;
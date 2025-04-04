import { useState, useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useNavigate, useParams,Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

// Dummy data that exactly matches the image
const actionPlanData = {
  id: "ap-1",
  groupId: "FG-2023-001",
  title: "A Really Cool Action Plan",
  createdOn: "Jan 15th, 2025",
  description:
    "The Workplace Stress & Well-being Group is a focus group formed by employees who share similar challenges regarding stress management and overall well-being at work. This group aims to discuss the common causes of workplace stress, explore potential solutions, and collaborate on strategies to improve mental health, work-life balance, and support structures.",
  targetMetrics: [
    { id: 1, name: "Cultural Score", color: "pink" },
    { id: 2, name: "Morale", color: "violet" },
    { id: 3, name: "Engagement", color: "sky" },
  ],
  focusGroups: [
    {
      id: 1,
      name: "Employee Engagement Task Force",
      createdOn: "March 17, 2025",
      tags: ["Morale", "Engagement"],
      description:
        "A group dedicated to developing leadership skills and strategic decision-making among employees.",
      participants: 12,
    },
    {
      id: 2,
      name: "Employee Engagement Task Force",
      createdOn: "March 17, 2025",
      tags: ["Morale", "Engagement"],
      description:
        "A group dedicated to developing leadership skills and strategic decision-making among employees.",
      participants: 12,
    },
    {
      id: 3,
      name: "Employee Engagement Task Force",
      createdOn: "March 17, 2025",
      tags: ["Morale", "Engagement"],
      description:
        "A group dedicated to developing leadership skills and strategic decision-making among employees.",
      participants: 12,
    },
  ],
  steps: [
    {
      id: 1,
      title: "Title of the Step",
      description:
        "A group dedicated to developing leadership skills and strategic decision-making among employees. A group dedicated to developing leadership skills and strategic decision-making among employees.",
    },
    {
      id: 2,
      title: "Title of the Step",
      description:
        "A group dedicated to developing leadership skills and strategic decision-making among employees. A group dedicated to developing leadership skills and strategic decision-making among employees.",
    },
    {
      id: 3,
      title: "Title of the Step",
      description:
        "A group dedicated to developing leadership skills and strategic decision-making among employees. A group dedicated to developing leadership skills and strategic decision-making among employees.",
    },
  ],
};

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
  const navigate = useNavigate();

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
                {plan.title}
              </span>

            </div>
          </div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 pb-3">
        <div>
        <h1 className="text-xl font-bold pb-2">{plan.title}</h1>
        <div className="flex items-center text-gray-500 text-xs px-1">
          <span>Group ID: {plan.groupId}</span>
        </div>
        </div>
        <span className="text-sm text-gray-500">
          Created on {plan.createdOn}
        </span>
      </div>
      <div className="border-t border-b py-4">
        <h2 className="font-semibold">Description:</h2>
        <p className="text-sm text-gray-700 mt-1">{plan.description}</p>
      </div>
    </div>
  );
};

// Target Metrics Component - Made to match the image with inline badges
const TargetMetrics = ({ metrics }) => {
  return (
    <div className="my-4">
      <h2 className="font-semibold mb-2">Target Metrics:</h2>
      <div className="flex flex-wrap gap-2">
        {metrics.map((metric) => (
          <span
            key={metric.id}
            className={`px-2 py-1 rounded-md text-xs ${getBadgeColor(metric.name)}`}
          >
            {metric.name}
          </span>
        ))}
      </div>
    </div>
  );
};

// Focus Groups Component with Sort
const FocusGroups = ({ groups }) => {
  const [sortedGroups, setSortedGroups] = useState(groups);
  const [sortBy, setSortBy] = useState("priority");

  useEffect(() => {
    // Simple sorting logic
    const sorted = [...groups];
    setSortedGroups(sorted);
  }, [groups, sortBy]);

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
        {sortedGroups.map((group) => (
          <div
            key={group.id}
            className="border rounded-md overflow-hidden bg-white shadow-sm"
          >
            <div className="p-4">
              <div className="flex flex-col md:flex-row justify-between items-start gap-3">
                <div>
                  <h3 className="font-medium">{group.name}</h3>
                  <p className="text-xs text-gray-500">
                    Created on {group.createdOn}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {group.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-2 py-0.5 rounded-md text-xs ${getBadgeColor(tag)}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm mt-2">{group.description}</p>
                </div>
                <div className="text-right mt-2 md:mt-0">
                  <div className="text-xs text-gray-500">Participants:</div>
                  <div className="font-semibold text-green-600">
                    {group.participants} Members
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
  return (
    <div className="my-6">
      <h2 className="font-semibold mb-4">Steps:</h2>
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={step.id} className="relative">
            <div className="flex">
              {/* Circle and line container with proper centering */}
              <div className="relative flex items-center justify-center">
                {/* The vertical line - positioned to go through circle center */}
                {index < steps.length - 1 && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-0.5 h-[calc(100%+1.5rem)] bg-[#80C342] opacity-30"></div>
                )}

                {/* Number circle - z-index ensures it appears above the line */}
                <div className="w-8 h-8 rounded-full bg-[#80C342] flex items-center justify-center text-white font-bold relative z-10">
                  {step.id}
                </div>
              </div>

              {/* Card content */}
              <div className="ml-4 flex-grow">
                <div className="border rounded-md overflow-hidden bg-white shadow-sm border-l-4 border-l-[#80C342]">
                  <div className="p-3 border-b">
                    <h3 className="text-base font-medium">{step.title}</h3>
                  </div>
                  <div className="p-3 text-sm">{step.description}</div>
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
  const { id } = useParams(); // Get id from URL params
  // For demo purposes, we're using the dummy data directly
  const plan = actionPlanData;

  return (
    <div className=" mx-auto p-4 sm:p-6 bg-gray-50">
      <div className="bg-white p-5 rounded-lg shadow-sm">

        <ActionPlanHeader plan={plan} />
        <TargetMetrics metrics={plan.targetMetrics} />
        <FocusGroups groups={plan.focusGroups} />
        <ActionSteps steps={plan.steps} />
      </div>
    </div>
  );
};

export default ActionPlanDetails;

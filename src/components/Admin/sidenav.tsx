import { FaUsers, FaChevronRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import { Employee, RootState } from "@/store";
import { useSelector } from "react-redux";
import React from "react";

// Extend MenuItem to include a disabled flag
type MenuItem = {
  name: string;
  img_src: string; // Path to icon image
  link: string;
  notifications?: number; // Optional notifications count
  disabled?: boolean; // New property to disable the item
};

type MenuSection = {
  title: string;
  items: MenuItem[];
};

type SidebarProps = {
  menuSections?: MenuSection[];
  activeTab?: string; // Make it optional
  onTabChange?: (tab: string) => void; // Make it optional
};

// Complete menuIcons object with all paths
const menuIcons: Record<string, string> = {
  Overview: "/icons/Overview.svg",
  Employees: "/icons/Employees.svg",
  "Focus Groups": "/icons/Focus-grops.svg",
  Surveys: "/icons/Survey.svg",
  Questions: "/icons/Questions.svg",
  "Action Plans": "/icons/Action-plans.svg",
  Initiatives: "/icons/Initiatives.svg",
  "Help Center": "/icons/Help-center.svg",
  "HR Policies": "/icons/HR-policies.svg",
};

// Update defaultMenuSections to mark the items to disable

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const highRiskEmployees = useSelector(
    (state: RootState) => state.highRiskEmployees.highRiskEmployees
  );
  const menuSections: MenuSection[] = [
    {
      title: "Main",
      items: [
        {
          name: "Overview",
          img_src: menuIcons["Overview"],
          link: "admin",
          notifications:
            (
              highRiskEmployees?.filter(
                (emp: Employee) => emp.escalated && !emp.meet_scheduled
              ) || []
            ).length || undefined,
        },
        {
          name: "Employees",
          img_src: menuIcons["Employees"],
          link: "employees",
        },
        {
          name: "Focus Groups",
          img_src: menuIcons["Focus Groups"],
          link: "focus-groups",
        },
      ],
    },
    {
      title: "Engagement",
      items: [
        { name: "Surveys", img_src: menuIcons["Surveys"], link: "surveys" },
        {
          name: "Questions",
          img_src: menuIcons["Questions"],
          link: "questions",
        },
      ],
    },
    {
      title: "Improvement",
      items: [
        {
          name: "Action Plans",
          img_src: menuIcons["Action Plans"],
          link: "action-plan",
        },
        {
          name: "Initiatives",
          img_src: menuIcons["Initiatives"],
          link: "initiatives",
          disabled: true, // Disabled item
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          name: "Help Center",
          img_src: menuIcons["Help Center"],
          link: "help-center",
          disabled: true, // Disabled item
        },
        {
          name: "HR Policies",
          img_src: menuIcons["HR Policies"],
          link: "hr-policies",
          disabled: true, // Disabled item
        },
      ],
    },
  ];

  // Handle the click on menu items
  const handleItemClick = (item: MenuItem) => {
    if (item.disabled) {
      return; // Do nothing if the item is disabled
    }
    if (onTabChange) {
      onTabChange(item.name);
    }
    navigate(`/${item.link}`);
  };

  return (
    <div className="w-64 h-screen bg-white shadow-md flex flex-col">
      {/* Logo Section */}
      <div className="flex items-center text-2xl font-bold mb-4 px-4 pt-4">
        <span className="text-black">Deloitte</span>
        <span className="text-[#80C342]">.</span>
      </div>

      {/* Menu Sections */}
      <div className="flex-grow overflow-y-auto">
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-4">
            {/* Section Title */}
            <p className="text-gray-500 text-sm font-semibold px-4">
              {section.title}
            </p>
            {/* Section Items */}
            <ul>
              {section.items.map((item, itemIndex) => {
                // Determine if item is active based on either activeTab prop or current location
                const isActive = activeTab
                  ? activeTab === item.name
                  : location.pathname.split("/")[1] === item.link;

                // Additional styling if the item is disabled
                const disabledClasses = item.disabled
                  ? "cursor-not-allowed" // Disabled styling
                  : "cursor-pointer"; // Default styling

                return (
                  <li
                    key={itemIndex}
                    onClick={() => handleItemClick(item)}
                    className={`relative flex items-center p-3 rounded-lg ${disabledClasses} ${
                      isActive
                        ? "bg-green-50 text-[#80C342]"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    {/* Solid green bar for active tab */}
                    {isActive && (
                      <div className="select-none absolute left-0 top-0 h-full w-1 bg-[#80C342] rounded-r-md"></div>
                    )}

                    {/* Icon as image with proper size */}
                    <div className="flex items-center justify-center min-w-[32px] ml-3 mr-4">
                      <img
                        src={item.img_src}
                        alt={`${item.name} icon`}
                        className={`w-5 h-5 ${isActive ? "filter-green" : ""}`}
                      />
                    </div>

                    {/* Name and notification in same area */}
                    <div className="flex-1 flex items-center">
                      <span
                        className={`text-sm font-medium ${
                          isActive ? "text-[#80C342]" : "text-gray-500"
                        }`}
                      >
                        {item.name}
                      </span>

                      {/* Notifications badge - positioned after text with a small gap */}
                      {item.notifications && (
                        <span className="ml-2 bg-[#80C342] text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                          {item.notifications}
                        </span>
                      )}
                    </div>

                    {/* Arrow icon at the end */}
                    <FaChevronRight
                      size={12}
                      className={isActive ? "text-[#80C342]" : "text-gray-400"}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            <FaUsers />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Alex</p>
            <p className="text-xs text-gray-500">People Experience Team</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

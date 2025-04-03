import React from "react";
import {
  FaChartBar,
  FaUsers,
  FaComments,
  FaClipboardList,
  FaSearch,
  FaQuestionCircle,
  FaRocket,
  FaLifeRing,
  FaFileAlt,
} from "react-icons/fa";

type MenuItem = {
  name: string;
  icon: JSX.Element;
  link: string;
  notifications?: number; // Optional notifications count
};

type MenuSection = {
  title: string;
  items: MenuItem[];
};

type SidebarProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
  menuSections?: MenuSection[];
};

const defaultMenuSections: MenuSection[] = [
  {
    title: "Main",
    items: [
      { name: "Overview", icon: <FaChartBar />, link: "#", notifications: 1 },
      { name: "Employees", icon: <FaUsers />, link: "#" },
      { name: "Focus Groups", icon: <FaComments />, link: "#" },
    ],
  },
  {
    title: "Engagement",
    items: [
      { name: "Surveys", icon: <FaClipboardList />, link: "#" },
      { name: "Questions", icon: <FaQuestionCircle />, link: "#" },
    ],
  },
  {
    title: "Improvement",
    items: [
      { name: "Action Plans", icon: <FaSearch />, link: "#" },
      { name: "Initiatives", icon: <FaRocket />, link: "#" },
    ],
  },
  {
    title: "Support",
    items: [
      { name: "Help Center", icon: <FaLifeRing />, link: "#" },
      { name: "HR Policies", icon: <FaFileAlt />, link: "#" },
    ],
  },
];

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  menuSections = defaultMenuSections,
}) => {
  return (
    <div className="w-64 h-screen bg-white shadow-md flex flex-col">
      {/* Logo Section */}
      <div className="flex items-center text-2xl font-bold mb-4 px-4 pt-4">
        <span className="text-black">Deloitte</span>
        <span className="text-[#80C342]">.</span>
      </div>

      {/* Menu Sections */}
      <div className="flex-grow overflow-y-auto px-4">
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-4">
            {/* Section Title */}
            <p className="text-gray-500 text-sm font-semibold">{section.title}</p>
            {/* Section Items */}
            <ul>
              {section.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  onClick={() => onTabChange(item.name)}
                  className={`relative flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
                    activeTab === item.name
                      ? "bg-green-50 text-[#80C342]"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {/* Solid green bar for active tab */}
                  {activeTab === item.name && (
                    <div className="absolute left-0 top-0 h-full w-1 bg-[#80C342] rounded-r-md"></div>
                  )}
                  <span
                    className={`text-lg ${
                      activeTab === item.name ? "text-[#80C342]" : "text-gray-500"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="flex-1 text-sm font-medium">{item.name}</span>
                  {/* Notifications badge */}
                  {item.notifications && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {item.notifications}
                    </span>
                  )}
                </li>
              ))}
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
            <p className="text-sm font-medium text-gray-900">Ankan</p>
            <p className="text-xs text-gray-500">People Experience Team</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

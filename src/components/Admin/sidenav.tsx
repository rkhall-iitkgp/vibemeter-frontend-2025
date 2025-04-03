import React, { useState } from "react";
import { FaChartBar, FaUsers, FaComments, FaClipboardList, FaSearch, FaQuestionCircle, FaRocket, FaLifeRing, FaFileAlt } from "react-icons/fa";

const menuSections = [
  {
    title: "Main",
    items: [
      { name: "Overview", icon: <FaChartBar />, link: "#" },
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

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Overview");

  const handleItemClick = (name: string) => {
    setActiveItem(name);
  };

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
                  onClick={() => handleItemClick(item.name)}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
                    activeItem === item.name
                      ? "bg-green-50 text-[#80C342]"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <span className={`text-lg ${activeItem === item.name ? "text-[#80C342]" : "text-[#80C342]"}`}>
                    {item.icon}
                  </span>
                  <span className="flex-1 text-sm font-medium">{item.name}</span>
                  <span className={`text-sm ${activeItem === item.name ? "text-green-600" : "text-gray-400"}`}>&gt;</span>
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

"use client";

import type React from "react";

import { AlertTriangle, User, Users, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

type MenuItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
};

export default function SidebarNavigation() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: "high-concern",
      label: "High Concern Employees",
      icon: <AlertTriangle className="h-5 w-5" />,
      isActive: true,
    },
    {
      id: "user-analytics",
      label: "User Analytics",
      icon: <User className="h-5 w-5" />,
      isActive: false,
    },
    {
      id: "cumulative-analytics",
      label: "Cumulative Analytics",
      icon: <Users className="h-5 w-5" />,
      isActive: false,
    },
  ]);

  const handleMenuItemClick = (id: string) => {
    setMenuItems(
      menuItems.map((item) => ({
        ...item,
        isActive: item.id === id,
      }))
    );
  };

  return (
    <div className="flex flex-col h-screen border-r border-gray-200 bg-white w-64">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <img
          src="/deloitte-logo.svg"
          alt="Deloitte"
          className="h-6"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjMwIiB2aWV3Qm94PSIwIDAgMTIwIDMwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoIGQ9Ik0xMC4yNSAyLjVIMzAuNzVWMjcuNUgxMC4yNVYyLjVaIiBmaWxsPSIjODZCQzI1Ii8+CiAgPHBhdGggZD0iTTQwLjUgMi41SDQ4QzUxLjMgMi41IDUzLjggMi45IDU1LjUgMy43QzU3LjIgNC41IDU4LjUgNS42IDU5LjQgNy4xQzYwLjMgOC42IDYwLjcgMTAuNCA2MC43IDEyLjVDNjAuNyAxNC42IDYwLjMgMTYuNCA1OS40IDE3LjlDNTguNSAxOS40IDU3LjIgMjAuNSA1NS41IDIxLjNDNTMuOCAyMi4xIDUxLjMgMjIuNSA0OCAyMi41SDQwLjVWMi41Wk00Ny44IDYuNUg0NS41VjE4LjVINDcuOEM0OS45IDE4LjUgNTEuNCAxOC4xIDUyLjQgMTcuM0M1My40IDE2LjUgNTMuOSAxNC44IDUzLjkgMTIuNUM1My45IDEwLjIgNTMuNCA4LjUgNTIuNCA3LjdDNTEuNCA2LjkgNDkuOSA2LjUgNDcuOCA2LjVaIiBmaWxsPSJibGFjayIvPgogIDxwYXRoIGQ9Ik02NC4yIDIuNUg3OC4yVjYuNUg2OS4yVjEwLjVINzcuMlYxNC41SDY5LjJWMTguNUg3OC4yVjIyLjVINjQuMlYyLjVaIiBmaWxsPSJibGFjayIvPgogIDxwYXRoIGQ9Ik04Mi4yIDIuNUg4Ny4yTDk0LjIgMTQuNVYyLjVIOTkuMlYyMi41SDk0LjJMODcuMiAxMC41VjIyLjVIODIuMlYyLjVaIiBmaWxsPSJibGFjayIvPgogIDxwYXRoIGQ9Ik0xMDMuMiAyLjVIMTA4LjJWMTguNUgxMTYuMlYyMi41SDEwMy4yVjIuNVoiIGZpbGw9ImJsYWNrIi8+CiAgPHBhdGggZD0iTTAgMi41SDVWMjIuNUgwVjIuNVoiIGZpbGw9ImJsYWNrIi8+CiAgPHBhdGggZD0iTTEyMCAyLjVIMTE1VjIyLjVIMTIwVjIuNVoiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo=";
          }}
        />
      </div>

      {/* Menu Label */}
      <div className="px-4 py-2 font-semibold text-gray-900">Menu</div>

      {/* Menu Items */}
      <nav className="flex-1">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleMenuItemClick(item.id)}
                className={cn(
                  "flex items-center w-full px-2 py-2 text-sm rounded-md group",
                  item.isActive
                    ? "bg-[#e1f4c3] text-[#80c342]"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <span
                  className={cn(
                    "mr-3",
                    item.isActive ? "text-[#80c342]" : "text-[#80c342]"
                  )}
                >
                  {item.icon}
                </span>
                <span className="flex-1 text-left">{item.label}</span>
                <ChevronRight
                  className={cn(
                    "h-4 w-4",
                    item.isActive ? "text-[#80c342]" : "text-gray-400"
                  )}
                />
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="border-t border-gray-200 p-4 mt-auto flex items-center">
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 mr-3">
          <User className="h-5 w-5 text-gray-500" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">Ankan</p>
          <p className="text-xs text-gray-500">People's Experience Team</p>
        </div>
      </div>
    </div>
  );
}

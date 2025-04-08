// import Link from "next/link"
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  HelpCircle,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type React from "react";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
}

function SidebarItem({ icon: Icon, label, href, active }: SidebarItemProps) {
  return (
    <a
      href={href}
      className={cn(
        "flex flex-col items-center justify-center p-3 text-gray-500 hover:text-[#80C342] transition-colors",
        active && "text-[#80C342] bg-[#F9FEF1]"
      )}
    >
      <Icon className="h-5 w-5 mb-1" />
      <span className="text-xs">{label}</span>
    </a>
  );
}

export function Sidebar() {
  return (
    <div className="w-20 bg-white border-r flex flex-col">
      <div className="p-4 border-b">
        <div className="h-12 w-12 text-white flex items-center justify-center rounded">
          <img src="/deloitte.svg" alt="Deloitte Logo" className="h-12 w-12" />
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <SidebarItem
          icon={LayoutDashboard}
          label="Dashboard"
          href="/dashboard"
          active
        />
        <SidebarItem icon={CheckSquare} label="Checklist" href="/dashboard" />
        <SidebarItem icon={Calendar} label="Calendar" href="/dashboard" />
        <SidebarItem icon={HelpCircle} label="Help" href="/dashboard" />
        <SidebarItem icon={Settings} label="Settings" href="/dashboard" />
      </div>
    </div>
  );
}

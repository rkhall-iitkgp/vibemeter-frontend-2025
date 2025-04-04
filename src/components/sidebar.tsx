// import Link from "next/link"
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Calendar,
  Car,
  UserPlus,
  MessageSquare,
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
        "flex flex-col items-center justify-center p-3 text-gray-500 hover:text-teal-500 transition-colors",
        active && "text-teal-500 bg-blue-50"
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
        <div className="h-10 w-10 bg-teal-500 text-white flex items-center justify-center rounded">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/" active />
        <SidebarItem icon={Users} label="Users" href="/users" />
        <SidebarItem icon={CheckSquare} label="Checklist" href="/checklist" />
        <SidebarItem icon={Calendar} label="Calendar" href="/calendar" />
        <SidebarItem icon={Car} label="Parkings" href="/parkings" />
        <SidebarItem icon={UserPlus} label="Recruit" href="/recruit" />
        <SidebarItem icon={MessageSquare} label="Messages" href="/messages" />
        <SidebarItem icon={HelpCircle} label="Help" href="/help" />
        <SidebarItem icon={Settings} label="Settings" href="/settings" />
      </div>
    </div>
  );
}

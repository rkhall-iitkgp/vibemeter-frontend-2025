"use client";

import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTitle,
  SheetDescription,
  SheetHeader,
  SheetFooter,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Calendar, FileText, User, Trophy } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ActionPlanCard } from "./action-plan-card";
import { useState, useRef, useEffect } from "react";
import { TaskForceCard } from "./task-force-card";
import { Button } from "@/components/ui/button";
import VibemeterChart from "./VibemeterChart"; // This is your existing component

// Sample employee data
const employeeData = {
  id: "1",
  name: "Arkan",
  jobTitle: "Job Title",
  avatar: "/placeholder.svg?height=80&width=80",
  email: "arkan@deloitte.com",
  phone: "+1 (555) 123-4567",
  dateAdded: "01-03-2025",
  employeeId: "EM134332",
  recentAchievements: [
    { title: "Top Contributor", date: "March 2025" },
    { title: "Innovation Award", date: "February 2025" },
  ],
  chatInteractionSummary:
    "The employee inquires about requesting vacation time and provides preferred dates (May 10th to May 17th). The HR chatbot checks availability and confirms that the requested dates are available. It then submits the vacation request on behalf of the employee and informs them that a confirmation email will be sent. The employee also asks about their remaining vacation days, which the chatbot provides.",
  focusGroups: [
    {
      title: "Employee Engagement Task Force",
      date: "March 17, 2025",
      description:
        "A group dedicated to developing leadership skills and strategic decision-making among employees.",
      memberCount: 12,
    },
    {
      title: "Employee Engagement Task Force",
      date: "March 17, 2025",
      description:
        "A group dedicated to developing leadership skills and strategic decision-making among employees.",
      memberCount: 12,
    },
  ],
  actionPlans: [
    {
      title: "Employee Engagement Task Force",
      date: "March 17, 2025",
      description:
        "A group dedicated to developing leadership skills and strategic decision-making among employees.",
      memberCount: 12,
    },
    {
      title: "Employee Engagement Task Force",
      date: "March 17, 2025",
      description:
        "A group dedicated to developing leadership skills and strategic decision-making among employees.",
      memberCount: 12,
    },
  ],
};

interface EmployeeDetailsSheetProps {
  employee?: {
    id: string;
    name: string;
    jobTitle: string;
    avatar?: string;
    email: string;
    phone: string;
    dateAdded: string;
    employeeId: string;
    recentAchievements: {
      title: string;
      date: string;
    }[];
    chatInteractionSummary: string;
    focusGroups: {
      title: string;
      date: string;
      description: string;
      memberCount: number;
    }[];
    actionPlans: {
      title: string;
      date: string;
      description: string;
      memberCount: number;
    }[];
  };
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function EmployeeDetailsSheet({
  employee = employeeData,
  open,
  onOpenChange,
}: EmployeeDetailsSheetProps) {
  const [localOpen, setLocalOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Use controlled or uncontrolled state based on props
  const isOpen = open !== undefined ? open : localOpen;
  const setOpen = onOpenChange || setLocalOpen;

  // Handle click outside to close the sheet
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sheetRef.current &&
        !sheetRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="!w-[30%] !max-w-full p-0 border-l"
        ref={sheetRef}
      >
        {/* Adding the required SheetHeader with SheetTitle and SheetDescription for accessibility */}
        <SheetHeader className="sr-only">
          <SheetTitle>Employee Details for {employee.name}</SheetTitle>
          <SheetDescription>
            View and manage details for employee {employee.name}
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100%-56px)]">
          <div className="p-6">
            {/* Header with close button */}
            <div className="relative flex items-center mb-6">
              <User className="h-5 w-5 mr-2 text-green-500" />
              <h2 className="text-xl font-bold">Employee Details</h2>
              <SheetClose className="absolute right-0 top-0 rounded-full p-1 hover:bg-muted">
                <span className="sr-only">Close</span>
              </SheetClose>
            </div>

            {/* Profile Section - Updated to match Figma design */}
            <div className="flex mb-6 ">
              {/* Left side with avatar and name */}
              <div className="bg-gray-50 p-10 flex flex-col items-center justify-center mb-1 mr-8 rounded-md">
                <Avatar className="h-20 w-20 mb-3 rounded-full overflow-hidden ">
                  <AvatarImage
                    className="h-20 w-20 object-cover"
                    src={employee.avatar}
                    alt={employee.name}
                  />
                  <AvatarFallback className="h-20 w-20">
                    {employee.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-medium">{employee.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {employee.jobTitle}
                </p>
              </div>

              {/* Right side with contact information in a card */}
              <div className="bg-white p-4 border rounded-md">
                <h4 className="font-medium mb-3">Contact Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{employee.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>Added on {employee.dateAdded}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span>ID: {employee.employeeId}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="mb-6 bg-white p-4 rounded-md border">
              <h3 className="text-lg font-medium mb-3">Recent Achievements</h3>
              <ul className="space-y-2">
                {employee.recentAchievements.map((achievement, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-amber-500" />
                    <span className="text-sm">
                      {achievement.title} ({achievement.date})
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Average Vibemeter Scores */}
            <div className="mb-6 bg-white p-4 rounded-md border">
              <VibemeterChart />
            </div>

            {/* Chat Interaction Summary */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-1">
                Chat Interaction Summary
              </h3>
              <p className="text-xs text-muted-foreground mb-2">
                Summary of the Chat Interactions the employee has participated
                in
              </p>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-muted-foreground">
                  {employee.chatInteractionSummary}
                </p>
              </div>
            </div>

            {/* Focus Groups */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-1">Focus Groups</h3>
              <p className="text-xs text-muted-foreground mb-3">
                Employee's participation in Focus groups
              </p>
              <div className="bg-white rounded-md ">
                {employee.focusGroups.map((group, index) => (
                  <TaskForceCard
                    key={index}
                    title={group.title}
                    date={group.date}
                    description={group.description}
                    memberCount={group.memberCount}
                  />
                ))}
              </div>
            </div>

            {/* Action Plans */}
            <div className="mb-6 rounded-md " id="final-section">
              <h3 className="text-lg font-medium mb-1">Action Plans</h3>
              <p className="text-xs text-muted-foreground mb-3">
                The Action Plans that the employee was part of
              </p>
              <div className="bg-white rounded-md ">
                {employee.actionPlans.map((plan, index) => (
                  <ActionPlanCard
                    key={index}
                    title={plan.title}
                    date={plan.date}
                    description={plan.description}
                  />
                ))}
              </div>
            </div>

            {/* Space at the bottom to prevent content from being hidden behind sticky button */}
            <div className="h-[18px] mb-2"></div>
          </div>
        </ScrollArea>

        {/* Schedule Meet Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t z-10">
          <SheetFooter className="w-full">
            <Button className="w-full bg-[#80c342] hover:bg-[#80c342] text-white h-12">
              Schedule Meet
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}

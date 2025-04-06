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
import { EmployeeDetail } from "@/types";



interface EmployeeDetailsSheetProps {
  employee: EmployeeDetail;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function EmployeeDetailsSheet({
  employee,
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
        className="w-full sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] !max-w-full p-0 border-l"
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
          <div className="p-4 sm:p-6">
            {/* Header with close button */}
            <div className="abcdef relative flex items-center mb-4 sm:mb-6">
              <User className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-500" />
              <h2 className="text-lg sm:text-xl font-bold">Employee Details</h2>
              <SheetClose asChild
                className="absolute right-0 top-0 rounded-full p-1 hover:bg-muted hidden"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close</span>
              </SheetClose>
            </div>

            {/* Profile Section - Updated for responsiveness */}
            <div className="grid grid-cols-2 mb-4 sm:mb-6 gap-6">
              {/* Left side with avatar and name */}
              <div className="bg-gray-50 p-6 sm:p-10 flex flex-col items-center justify-center rounded-md w-full sm:w-auto sm:flex-1">
                <Avatar className="h-16 w-16 sm:h-20 sm:w-20 mb-3 rounded-full overflow-hidden">
                  <AvatarImage
                    className="object-cover"
                    src="\icons\Avatar.png"
                    alt={employee.name}
                  />
                  <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-base sm:text-lg font-medium text-center">
                  {employee.name}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground text-center">
                  {employee.job_title}
                </p>
              </div>

              {/* Right side with contact information in a card */}
              <div className="bg-white p-4 border rounded-md w-full sm:flex-1">
                <h4 className="font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                  Contact Information
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 flex-shrink-0" />
                    <span className="truncate">{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 flex-shrink-0" />
                    <span>{employee.phone_number}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 flex-shrink-0" />
                    <span>Added on {employee.created_at}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 flex-shrink-0" />
                    <span>ID: {employee.employee_id}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="mb-4 sm:mb-6 bg-white p-4 rounded-md border">
              <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-3">
                Recent Achievements
              </h3>
              <ul className="space-y-2">
                {employee.awards.map((achievement, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-amber-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">
                      {achievement.award_type} ({achievement.award_date})
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Average Vibemeter Scores */}
            <div className="mb-4 sm:mb-6 bg-white p-4 rounded-md border">
              <VibemeterChart />
            </div>

            {/* Chat Interaction Summary */}
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-medium mb-1">
                Chat Interaction Summary
              </h3>
              <p className="text-xs text-muted-foreground mb-2">
                Summary of the Chat Interactions the employee has participated
                in
              </p>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {employee.chat_summary}
                </p>
              </div>
            </div>

            {/* Focus Groups */}
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-medium mb-1">
                Focus Groups
              </h3>
              <p className="text-xs text-muted-foreground mb-2 sm:mb-3">
                Employee's participation in Focus groups
              </p>
              <div className="bg-white rounded-md">
                {employee.focus_groups.map((group, index) => {
                  return (
                  <TaskForceCard
                    key={index}
                    title={group.name}
                    date={new Date(group.created_at).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    })}
                    description={group.description}
                    members={group.members}
                    focus_group_id={group.focus_group_id}
                  />
                  );
                })}
              </div>
            </div>

            {/* Action Plans */}
            <div className="mb-4 sm:mb-6 rounded-md" id="final-section">
              <h3 className="text-base sm:text-lg font-medium mb-1">
                Action Plans
              </h3>
              <p className="text-xs text-muted-foreground mb-2 sm:mb-3">
                The Action Plans that the employee was part of
              </p>
              <div className="bg-white rounded-md">
                {employee.action_plans.map((plan, index) => (
                  <ActionPlanCard
                    key={index}
                    title={plan.title}
                    date={new Date(plan.created_at).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      })}
                    description={plan.description}
                    action_id={plan.action_id}
                  />
                ))}
              </div>
            </div>

            {/* Space at the bottom to prevent content from being hidden behind sticky button */}
            <div className="h-[56px]"></div>
          </div>
        </ScrollArea>

        {/* Schedule Meet Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t z-10">
          <SheetFooter className="w-full">
            <Button className="w-full bg-[#80c342] hover:bg-[#80c342] text-white h-10 sm:h-12">
              Schedule Meet
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}

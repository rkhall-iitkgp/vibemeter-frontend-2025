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
import { Mail, Phone, Calendar, FileText, User, Award } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ActionPlanCard } from "./action-plan-card";
import { useState, useRef, useEffect } from "react";
import { TaskForceCard } from "./task-force-card";
import { Button } from "@/components/ui/button";
import VibemeterChart from "./VibemeterChart"; // This is your existing component
import { ReportModal } from "./report-modal";

// Updated employee interface with new data structure
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
    recentAchievements?: {
      title: string;
      date: string;
      points?: number;
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
    vibeScore?: {
      average: number;
      change: {
        percentage: number;
        direction: string;
      };
      monthlyScores: {
        month: string;
        score: number;
      }[];
    };
    // Allow for any additional properties
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  isLoading?: boolean;
}

interface Report {
  report_id: string;
  generated_at: string;
  content: {
    full_report: string;
    conversation_summary: {
      issues_discussed: string[];
      root_causes: {
        [key: string]: string[];
      };
      themes: string[];
    };
    recommendations: string[];
    metrics: {
      vibe_trend: string;
      performance_rating?: number | null;
      avg_work_hours?: number | null;
    };
  };
}

// Sample employee data for fallback
const employeeData = {
  id: "1",
  name: "Employee",
  jobTitle: "Job Title",
  avatar: "/placeholder.svg?height=80&width=80",
  email: "employee@example.com",
  phone: "+1 (555) 123-4567",
  dateAdded: "01-03-2025",
  employeeId: "EMP0000",
  recentAchievements: [{ title: "Top Contributor", date: "March 2025" }],
  chatInteractionSummary: "No chat interactions found.",
  focusGroups: [],
  actionPlans: [],
};

export function EmployeeDetailsSheet({
  employee = employeeData,
  open,
  onOpenChange,
  isLoading = false,
}: EmployeeDetailsSheetProps) {
  const [localOpen, setLocalOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isLoadingReports, setIsLoadingReports] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use controlled or uncontrolled state based on props
  const isOpen = open !== undefined ? open : localOpen;
  const setOpen = onOpenChange || setLocalOpen;

  const fetchReports = async () => {
    if (!employee?.id) return;

    setIsLoadingReports(true);
    setError(null);

    try {
      // Use the correct employee ID from props
      const employeeId = employee.employeeId;
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/profile/employee/EMP0014/reports`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch reports: ${response.statusText}`);
      }

      const data = await response.json();

      // Check for the correct data structure
      if (
        data.status === "success" &&
        data.data &&
        Array.isArray(data.data.reports)
      ) {
        setReports(data.data.reports);
      } else {
        setReports([]);
        console.warn("Unexpected response format:", data);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
      setError("Failed to load reports. Please try again later.");
    } finally {
      setIsLoadingReports(false);
    }
  };

  // Modified to completely disable outside clicks when modal is open
  useEffect(() => {
    // Skip the entire effect if the report modal is open
    if (isReportModalOpen) {
      return;
    }

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
  }, [isOpen, setOpen, isReportModalOpen]);

  // Custom handler for modal close that prevents event propagation
  const handleModalClose = (value: boolean) => {
    setIsReportModalOpen(value);
  };

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
            <div className="relative flex items-center mb-4 sm:mb-6">
              <User className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-[#7CC243]" />
              <h2 className="text-lg sm:text-xl font-bold">Employee Details</h2>
              <SheetClose className="absolute right-0 top-0 rounded-full p-1 hover:bg-muted">
                <span className="sr-only">Close</span>
              </SheetClose>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center p-8">
                <p className="text-gray-500">Loading employee details...</p>
              </div>
            ) : (
              <>
                {/* Profile Section - Updated for responsiveness */}
                <div className="grid grid-cols-2 mb-4 sm:mb-6 gap-6">
                  {/* Left side with avatar and name */}
                  <div className="bg-gray-50 p-6 sm:p-10 flex flex-col items-center justify-center rounded-md w-full sm:w-auto sm:flex-1">
                    <Avatar className="h-16 w-16 sm:h-20 sm:w-20 mb-3 rounded-full overflow-hidden">
                      <AvatarImage
                        className="object-cover"
                        src={employee.avatar}
                        alt={employee.name}
                      />
                      <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-base sm:text-lg font-medium text-center">
                      {employee.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground text-center">
                      {employee.jobTitle}
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
                        <span>{employee.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 flex-shrink-0" />
                        <span>Added on {employee.dateAdded}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 flex-shrink-0" />
                        <span>ID: {employee.employeeId}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Achievements / Awards */}
                <div className="mb-4 sm:mb-6 bg-white p-4 rounded-md border">
                  <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-3">
                    Awards & Achievements
                  </h3>
                  {employee.recentAchievements &&
                  employee.recentAchievements.length > 0 ? (
                    <ul className="space-y-2">
                      {employee.recentAchievements.map((achievement, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <Award className="h-4 w-4 text-amber-500 flex-shrink-0" />
                          <div className="flex-1">
                            <span className="text-xs sm:text-sm font-medium block">
                              {achievement.title}
                            </span>
                            <span className="text-xs text-gray-500">
                              {achievement.date}
                              {achievement.points &&
                                ` • ${achievement.points} points`}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      No awards or achievements yet.
                    </p>
                  )}
                </div>

                {/* Vibemeter Scores */}
                {employee.vibeScore ? (
                  <div className="mb-4 sm:mb-6 bg-white p-4 rounded-md border">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base sm:text-lg font-medium">
                        Employee Vibe Score
                      </h3>
                      <div className="flex items-center">
                        <span className="text-lg font-bold mr-2">
                          {employee.vibeScore.average}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            employee.vibeScore.change.direction === "increase"
                              ? "bg-green-100 text-[#7CC243]"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {employee.vibeScore.change.direction === "increase"
                            ? "+"
                            : "-"}
                          {employee.vibeScore.change.percentage}%
                        </span>
                      </div>
                    </div>

                    {/* Render the VibemeterChart with the monthly scores data */}
                    <VibemeterChart
                      monthlyScores={employee.vibeScore.monthlyScores}
                    />
                  </div>
                ) : (
                  <div className="mb-4 sm:mb-6 bg-white p-4 rounded-md border">
                    <h3 className="text-base sm:text-lg font-medium mb-2">
                      Employee Vibe Score
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      No vibe score data available.
                    </p>
                  </div>
                )}

                {/* Chat Interaction Summary */}
                <div className="mb-4 sm:mb-6">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-base sm:text-lg font-medium">
                      Chat Interaction Summary
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Summary of the Chat Interactions the employee has
                    participated in
                  </p>
                  <Button
                    onClick={() => {
                      fetchReports();
                      setIsReportModalOpen(true);
                    }}
                    variant="outline"
                    size="sm"
                    className="text-[#80c342] border-[#80c342] hover:bg-[#80c342] hover:text-white"
                  >
                    View Chat Summary
                  </Button>
                </div>

                {/* Report Modal */}
                <ReportModal
                  isOpen={isReportModalOpen}
                  onClose={handleModalClose}
                  reports={reports}
                />

                {/* Focus Groups */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-medium mb-1">
                    Focus Groups
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2 sm:mb-3">
                    Employee's participation in Focus groups
                  </p>
                  <div className="bg-white rounded-md">
                    {employee.focusGroups && employee.focusGroups.length > 0 ? (
                      employee.focusGroups.map((group, index) => (
                        <div key={index} className="cursor-pointer">
                          <TaskForceCard
                            title={group.title || "Unnamed Group"}
                            date={group.date || "No date provided"}
                            description={
                              group.description || "No description available"
                            }
                            memberCount={group.memberCount || 0}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="p-4 border rounded-md">
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Not a member of any focus groups.
                        </p>
                      </div>
                    )}
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
                    {employee.actionPlans && employee.actionPlans.length > 0 ? (
                      employee.actionPlans.map((plan, index) => (
                        <ActionPlanCard
                          key={index}
                          title={plan.title || "Unnamed Plan"}
                          date={plan.date || "No date provided"}
                          description={
                            plan.description || "No description available"
                          }
                        />
                      ))
                    ) : (
                      <div className="p-4 border rounded-md">
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          No action plans assigned.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Space at the bottom to prevent content from being hidden behind sticky button */}
                <div className="h-[56px]"></div>
              </>
            )}
          </div>
        </ScrollArea>

        {/* Schedule Meet Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t z-10">
          <SheetFooter className="w-full">
            <Button
              className="w-full bg-[#80c342] hover:bg-[#80c342] text-white h-10 sm:h-12"
              disabled={isLoading}
            >
              Schedule Meet
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}

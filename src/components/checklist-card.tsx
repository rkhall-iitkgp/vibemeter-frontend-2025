import {
  Clock,
  FileText,
  CalendarDays,
  Building,
  LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type TaskType = "lunch" | "event" | "meeting" | "email";

interface Task {
  id: string;
  title: string;
  description: string;
  time: string;
  type: TaskType;
  status: "pending" | "completed";
}

const taskTypeConfig: Record<
  TaskType,
  {
    icon: LucideIcon;
    bgColor: string;
    iconBgColor: string;
    iconColor: string;
  }
> = {
  lunch: {
    icon: Clock,
    bgColor: "bg-blue-50",
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-500",
  },
  event: {
    icon: CalendarDays,
    bgColor: "bg-green-50",
    iconBgColor: "bg-green-100",
    iconColor: "text-[#7CC243]",
  },
  meeting: {
    icon: Building,
    bgColor: "bg-purple-50",
    iconBgColor: "bg-purple-100",
    iconColor: "text-purple-500",
  },
  email: {
    icon: FileText,
    bgColor: "bg-gray-50",
    iconBgColor: "bg-gray-100",
    iconColor: "text-gray-500",
  },
};

const tasks: Task[] = [
  {
    id: "1",
    title: "Lunch slot pending",
    description: "You have not booked your lunch slot yet",
    time: "09:00",
    type: "lunch",
    status: "pending",
  },
  {
    id: "2",
    title: "Team Sync Meeting",
    description: "Daily standup with development team",
    time: "10:30 AM",
    type: "meeting",
    status: "pending",
  },
  {
    id: "3",
    title: "Product Review",
    description: "Monthly product review with stakeholders",
    time: "02:00 PM",
    type: "meeting",
    status: "pending",
  },
  {
    id: "4",
    title: "Diwali Celebration",
    description: "Office-wide Diwali celebration event",
    time: "Tomorrow, 11:00 AM",
    type: "event",
    status: "pending",
  },
  {
    id: "5",
    title: "Project Deadline",
    description: "Submit quarterly project report",
    time: "Today, 05:00 PM",
    type: "email",
    status: "pending",
  },
  {
    id: "6",
    title: "Client Meeting",
    description: "Discussion about new requirements",
    time: "04:00 PM",
    type: "meeting",
    status: "pending",
  },
  {
    id: "7",
    title: "Team Lunch",
    description: "Monthly team lunch at Cafeteria",
    time: "Tomorrow, 01:00 PM",
    type: "lunch",
    status: "pending",
  },
];

function TaskItem({ task }: { task: Task }) {
  const config = taskTypeConfig[task.type];
  const Icon = config.icon;

  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg ${config.bgColor}`}>
      <div className={`${config.iconBgColor} p-2 rounded-lg`}>
        <Icon className={`h-5 w-5 ${config.iconColor}`} />
      </div>
      <div className="flex-1">
        <h4 className="font-medium">{task.title}</h4>
        <p className="text-sm text-gray-600">{task.description}</p>
      </div>
      <div className="text-sm text-gray-500">{task.time}</div>
    </div>
  );
}

export function ChecklistCard() {
  const pendingTasks = tasks.filter((task) => task.status === "pending");

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6 px-6">
        <CardTitle className="text-lg font-semibold">Checklist</CardTitle>
        <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          {pendingTasks.length} Pending
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
          <Button
            variant="ghost"
            className="w-full text-teal-500 hover:text-teal-600 hover:bg-teal-50"
          >
            View All Tasks
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

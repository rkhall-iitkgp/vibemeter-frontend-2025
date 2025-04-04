import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// type TaskType = "lunch" | "event" | "meeting" | "email";

interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;
  is_completed: boolean;
}

interface ChecklistCardProps {
  tasks: Task[];
}

export function ChecklistCard({ tasks }: ChecklistCardProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6 px-6">
        <CardTitle className="text-lg font-semibold">Checklist</CardTitle>
        <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          {tasks.filter((task) => !task.is_completed).length} Pending
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start gap-3 p-3 rounded-lg"
            >
              <div className={`p-2 rounded-lg`}>
                {task.is_completed ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Clock className="h-5 w-5 text-blue-500" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{task.title}</h4>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>
              <div className="text-sm text-gray-500">{task.due_date}</div>
            </div>
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

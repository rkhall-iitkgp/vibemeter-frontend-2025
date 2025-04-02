import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define the type for the stats prop
interface AttendanceStats {
  avg_work_hours: number;
  total_days_present: number;
  total_days_absent: number;
  punctuality_score: number;
  period: string;
}

// Define the props for AttendanceCard
interface AttendanceCardProps {
  stats: AttendanceStats;
}

export function AttendanceCard({ stats }: AttendanceCardProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6 px-6">
        <CardTitle className="text-lg font-semibold">Attendance</CardTitle>
        <Button variant="link" className="text-teal-500 p-0 h-auto font-medium">
          View Stats
        </Button>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="flex">
          <div className="flex-1">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-teal-500"></div>
                <span className="font-medium">{stats.total_days_present}</span>
                <span className="text-gray-500 text-sm">Days Present</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                <span className="font-medium">{stats.total_days_absent}</span>
                <span className="text-gray-500 text-sm">Days Absent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-gray-400"></div>
                <span className="font-medium">{stats.avg_work_hours}</span>
                <span className="text-gray-500 text-sm">Average Work Hours</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <div className="w-1 h-4 bg-teal-500 rounded"></div>
              <span className="text-sm text-gray-600">{stats.punctuality_score}% more than last period</span>
            </div>
          </div>

          <div className="relative w-32 h-32">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.total_days_present + stats.total_days_absent}</div>
                <div className="text-xs text-gray-500">Total</div>
              </div>
            </div>
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" stroke="#f0f0f0" strokeWidth="3"></circle>
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                strokeDasharray="100"
                strokeDashoffset={100 - (stats.total_days_present / (stats.total_days_present + stats.total_days_absent)) * 100}
                strokeLinecap="round"
                transform="rotate(-90 18 18)"
              ></circle>
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

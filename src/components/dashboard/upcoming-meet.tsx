
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock } from "lucide-react";

const meetings = [
  {
    title: "Weekly Team Sync",
    time: "09:30 AM - 10:30 AM",
    date: "Friday, April 4, 2025",
    attendees: 8,
    isVirtual: true,
  },
  {
    title: "Project Review",
    time: "02:00 PM - 03:00 PM",
    date: "Friday, April 4, 2025",
    attendees: 5,
    isVirtual: true,
  },
];

export default function UpcomingMeetings() {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md p-4 space-y-4">
      <h2 className="text-lg font-semibold">Upcoming Meetings</h2>
      <div className="text-sm text-muted-foreground">Friday, April 4, 2025</div>

      {meetings.map((meeting, idx) => (
        <Card key={idx} className="border p-4">
          <CardContent className="p-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-base mb-1">{meeting.title}</h3>
                <div className="flex items-center text-sm text-muted-foreground gap-1">
                  <Clock className="h-4 w-4" />
                  {meeting.time}
                </div>
                <div className="flex items-center text-sm text-muted-foreground gap-1 mt-1">
                  <CalendarDays className="h-4 w-4" />
                  Today, April 4, 2025
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {meeting.attendees} attendees
                </div>
              </div>
              {meeting.isVirtual && (
                <span className="text-xs font-medium bg-green-100 text-green-800 rounded px-2 py-0.5">
                  Virtual
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      <Button className="w-full bg-lime-500 hover:bg-lime-600">View All</Button>
    </div>
  );
}

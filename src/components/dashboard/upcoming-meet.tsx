import { CalendarDays, Clock, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useState } from "react";

interface MeetingData {
  meeting_id: string;
  title: string;
  time: string;
  date: string;
  duration: number;
  meeting_type: string;
  created_by_id: string;
  created_at: string;
}

export default function UpcomingMeetings({ id }: { id?: string }) {
  const [meetings, setMeetings] = useState<MeetingData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeetings = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/meetings/${id}`
        );
        const data = await response.json();
        setMeetings(data.data || []);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchMeetings();

    const socket = new WebSocket(`${import.meta.env.VITE_WS_URL}/api/ws/${id}`);
    socket.onopen = () => {
      console.log("WebSocket connection established");
    };
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.event === "meeting_update") {
        fetchMeetings();
      }
    };

    return () => {
      socket.close();
    };
  }, [id]);

  return (
    <div className="w-full h-full bg-white rounded-xl py-4 space-y-4 relative">
      <div className="flex justify-between items-center px-4">
        <h2 className="text-lg font-semibold">Upcoming Meetings</h2>
        {loading && <Loader2 className="h-5 w-5 text-lime-500 animate-spin" />}
      </div>
      <div className="text-sm text-muted-foreground px-4">
        Friday, April 4, 2025
      </div>

      {loading && meetings.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center w-full"
          style={{ height: "calc(100vh - 496px)" }}
        >
          <Loader2 className="h-8 w-8 text-lime-500 animate-spin mb-2" />
          <p className="text-sm text-muted-foreground">Loading meetings...</p>
        </div>
      ) : meetings.length > 0 ? (
        <div
          style={{ height: "calc(100vh - 496px)" }}
          className="overflow-hidden"
        >
          <ScrollArea className="h-full px-4">
            {meetings.map(
              (meeting, idx) =>
                meeting.title && (
                  <Card key={idx} className="border p-4 mb-3 last:mb-0">
                    <CardContent className="p-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-base mb-1">
                            {meeting.title}
                          </h3>
                          <div className="flex items-center text-sm text-muted-foreground gap-1">
                            <Clock className="h-4 w-4" />
                            {meeting.time}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground gap-1 mt-1">
                            <CalendarDays className="h-4 w-4" />
                            Today, April 4, 2025
                          </div>
                        </div>
                        <span className="text-xs font-medium bg-green-100 text-[#7CC243] rounded px-2 py-0.5">
                          {meeting.meeting_type}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )
            )}
          </ScrollArea>
        </div>
      ) : (
        <div className="text-center py-6 text-muted-foreground">
          No upcoming meetings
        </div>
      )}

      <div className="px-4 absolute bottom-4 w-full">
        <Button className="w-full bg-lime-500 hover:bg-lime-600">
          View All
        </Button>
      </div>
    </div>
  );
}

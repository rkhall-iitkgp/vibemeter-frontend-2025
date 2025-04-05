import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

const notices = [
  {
    title: "Company Picnic",
    description:
      "Join us for the annual company picnic on Saturday, May 15th at Central Park.",
    posted: "Posted 2 days ago",
  },
  {
    title: "New Health Benefits",
    description:
      "We've updated our health benefits package. Check your email for details.",
    posted: "Posted 1 week ago",
  },
  {
    title: "Office Closure",
    description:
      "The office will be closed on Monday, May 31st for Memorial Day.",
    posted: "Posted 1 week ago",
  },
  {
    title: "Office Closure",
    description:
      "The office will be closed on Monday, May 31st for Memorial Day.",
    posted: "Posted 1 week ago",
  },
];

export default function NoticeBoard() {
  return (
    <Card className="w-full max-w-md rounded-xl border p-4 shadow-sm">
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <Bell className="h-5 w-5 text-lime-600" />
          Notice board
        </div>
        <div className="space-y-4">
          {notices.map((notice, index) => (
            <div key={index} className="border-l-4 border-lime-600 pl-2">
              <div className="font-semibold text-gray-900">{notice.title}</div>
              <div className="text-sm text-gray-600">{notice.description}</div>
              <div className="text-xs text-lime-600 mt-1">{notice.posted}</div>
            </div>
          ))}
        </div>
        <Button className="w-full bg-lime-500 hover:bg-lime-600 text-white text-sm font-medium">
          View All
        </Button>
      </CardContent>
    </Card>
  );
}

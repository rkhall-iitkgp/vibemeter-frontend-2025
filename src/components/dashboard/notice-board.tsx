import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="w-full rounded-xl border py-4 shadow-sm gap-2">
      <CardHeader className="py-2">
        <CardTitle className="text-2xl font-semibold text-gray-800 flex gap-2 items-center">
          <Bell className="text-2xl text-lime-600" />
          Notice Board
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-4">
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

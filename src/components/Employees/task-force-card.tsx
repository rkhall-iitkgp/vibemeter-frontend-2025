import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Using shadcn Button component
import Badge from "@/components/ui/badge";
import { Users } from "lucide-react";

interface TaskForceCardProps {
  title: string;
  date: string;
  description: string;
  memberCount: number;
}

export function TaskForceCard({
  title,
  date,
  description,
  memberCount,
}: TaskForceCardProps) {
  return (
    <Card className="mb-4 border-2 shadow-none hover:bg-gray-50 transition-colors py-2">
      <CardContent className="p-4">
        <h4 className="font-medium text-lg mb-1">{title}</h4>
        <p className="text-xs text-muted-foreground mb-3">Created on {date}</p>

        <div className="flex gap-2 mb-3">
          <Badge
            variant="outline"
            className="bg-amber-100 text-amber-800 border-0 rounded-sm"
          >
            Morality
          </Badge>
          <Badge
            variant="outline"
            className="bg-teal-100 text-teal-800 border-0 rounded-sm"
          >
            Engagement
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground mb-3">{description}</p>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-sm text-[#7CC243]-600">
            <Users size={16} />
            <span>{memberCount} Members</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="text-sm font-medium"
            onClick={() => console.log("View details clicked")}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Users, Star, BookOpen, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

// TypeScript interface for award data
interface Award {
  id: number;
  title: string;
  icon: string;
  date: string;
}

interface AwardsCardProps {
  awards?: Award[];
  onViewAll?: () => void;
  className?: string;
}

const dummyAwards = [
  {
    id: 1,
    title: "Innovation Champion",
    icon: "lightbulb",
    date: "03/2025",
  },
  {
    id: 2,
    title: "Leadership Excellence",
    icon: "award",
    date: "02/2025",
  },
  {
    id: 3,
    title: "Best Team Player",
    icon: "users",
    date: "01/2025",
  },
];

const AwardsCard: React.FC<AwardsCardProps> = ({
  awards = dummyAwards,
  onViewAll = () => {},
  className = "",
}) => {
  // Function to render the appropriate icon based on the award type
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case "lightbulb":
        return (
          <div className="bg-blue-100 p-3 rounded-full">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
            >
              <line x1="9" x2="15" y1="18" y2="18" />
              <line x1="10" x2="14" y1="22" y2="22" />
              <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
            </svg>
          </div>
        );
      case "award":
        return (
          <div className="bg-yellow-100 p-3 rounded-full">
            <Award className="h-6 w-6 text-yellow-600" />
          </div>
        );
      case "users":
        return (
          <div className="bg-green-100 p-3 rounded-full">
            <Users className="h-6 w-6 text-green-600" />
          </div>
        );
      case "star":
        return (
          <div className="bg-yellow-100 p-3 rounded-full">
            <Star className="h-6 w-6 text-yellow-600" />
          </div>
        );
      case "book":
        return (
          <div className="bg-indigo-100 p-3 rounded-full">
            <BookOpen className="h-6 w-6 text-indigo-600" />
          </div>
        );
      case "target":
        return (
          <div className="bg-red-100 p-3 rounded-full">
            <Target className="h-6 w-6 text-red-600" />
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 p-3 rounded-full">
            <Award className="h-6 w-6 text-gray-600" />
          </div>
        );
    }
  };

  return (
    <Card className={`mb-4 py-4 gap-2 shadow-sm ${className}`}>
      <CardHeader className="py-0">
        <div className="flex justify-between items-center ">
          <CardTitle className="text-lg ">Awards</CardTitle>
          <Button
            variant="link"
            className="text-sm text-[#8CC427] p-0"
            onClick={onViewAll}
          >
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="py-0">
        <div className="grid grid-cols-3 gap-1 px-4 py-4">
          {awards.slice(0, 6).map((award) => (
            <div
              key={award.id}
              className="flex flex-col items-center text-cente"
            >
              {renderIcon(award.icon)}
              <h4
                className="mt-2 text-xs font-medium overflow-hidden text-ellipsis whitespace-normal max-w-full"
                style={{ minWidth: "120px", wordBreak: "break-word" }}
              >
                {award.title}
              </h4>
              <p className="text-xs text-gray-400 mt-1">{award.date}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AwardsCard;

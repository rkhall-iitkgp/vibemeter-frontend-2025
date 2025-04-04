import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const userData = {
  name: "Ankan",
  jobTitle: "Job Title",
  avatarUrl: "", // You can add a dummy avatar image URL here if needed
};

export default function ProfileCard() {
  return (
    <Card className="w-48 h-52 rounded-2xl bg-muted flex flex-col items-center justify-center shadow-sm">
      <CardContent className="flex flex-col items-center justify-center text-center space-y-2">
        <Avatar className="w-16 h-16">
          <AvatarImage src={userData.avatarUrl} alt={userData.name} />
          <AvatarFallback>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M16 16a4 4 0 0 0-8 0" />
            </svg>
          </AvatarFallback>
        </Avatar>
        <div className="font-semibold text-base">{userData.name}</div>
        <div className="text-sm text-muted-foreground">{userData.jobTitle}</div>
      </CardContent>
    </Card>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export interface UserData {
  employee_id: string;
  employee_name: string;
  profile_picture: string;
  email: string;
  created_at: string;
}

export default function ProfileCard({
  userData,
}: {
  userData: UserData | undefined;
}) {
  return (
    <Card className="rounded-2xl shadow-sm w-full">
      <CardContent className="py-4 px-6">
        <div className="flex flex-row items-center gap-8">
          {/* Left side - Profile info */}
          <div className="flex flex-col items-center justify-center text-center min-w-max w-28 h-full">
            <Avatar className="w-20 h-20 bg-gray-100 mb-3">
              <AvatarImage
                src={userData?.profile_picture}
                alt={userData?.employee_name}
              />
              <AvatarFallback>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-10 h-10"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M16 16a4 4 0 0 0-8 0" />
                </svg>
              </AvatarFallback>
            </Avatar>
            {userData?.employee_name ? (
              <div className="font-semibold text-lg">
                {userData?.employee_name}
              </div>
            ) : (
              <div className="h-4 w-24 rounded-md bg-gray-300 animate-pulse mb-1"></div>
            )}
            {userData?.employee_name ? (
              <div className="text-sm text-muted-foreground">
                Software Engineer
              </div>
            ) : (
              <div className="h-4 w-36 rounded-md bg-gray-300 animate-pulse"></div>
            )}
          </div>

          {/* Right side - Contact information */}
          <div className="flex-1 border-l pl-6">
            <h2 className="text-lg font-semibold mb-2">Contact Information</h2>

            <div className="space-y-3">
              {/* Email */}
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                {userData?.email ? (
                  <span>{userData?.email}</span>
                ) : (
                  <div className="h-4 w-36 rounded-md bg-gray-300 animate-pulse"></div>
                )}
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {userData?.employee_name ? (
                  <span>+1 (555) 123-4567</span>
                ) : (
                  <div className="h-4 w-24 rounded-md bg-gray-300 animate-pulse"></div>
                )}
              </div>

              {/* Added Date */}
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                </svg>
                {userData?.employee_name ? (
                  <span>Added on 03-01-2024</span>
                ) : (
                  <div className="h-4 w-30 rounded-md bg-gray-300 animate-pulse"></div>
                )}
              </div>

              {/* ID */}
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {userData?.employee_id ? (
                  <span>{userData?.employee_id}</span>
                ) : (
                  <div className="h-4 w-28 rounded-md bg-gray-300 animate-pulse"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

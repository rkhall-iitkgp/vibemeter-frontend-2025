import UpcomingMeetings from "./dashboard/upcoming-meet";
import NoticeBoard from "./dashboard/notice-board";
import ProfileCard from "./dashboard/profile-card";
import AwardsCard from "./dashboard/award-card";
import ClockInOut from "./dashboard/clock-in";
import ContactCard from "./dashboard/contact";
import Navbar from "./Navbar";
import { FloatingChat } from "./floating-chat";

export function DashboardContent() {
  // const [name, setName] = useState("Tridibesh");
  const name = "Tridibesh";
  const userProfileData = {
    name: "Ankan",
    jobTitle: "Job Title",
    avatarUrl: "", // Optional: URL for profile image
    email: "dummy@example.com",
    phone: "+1 (123) 456-7890",
    addedDate: "01-03-2025",
    id: "EM000000"
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <Navbar name={name} />

      <main className="flex-1 p-4 md:p-4 overflow-auto">
        {/* Main Grid - Fixed width columns on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4">
          {/* COLUMN 1: ProfileCard, ContactCard, AwardsCard */}
          <div className="w-full space-y-4 md:space-y-2 order-1 md:order-1">
            {/* Profile Card - Full width, content-based height */}
            <div className="flex flex-row space-y-4 md:space-x-1">
              <div className="w-full">
                <ProfileCard userData={userProfileData}/>
              </div>

              {/* Contact Card - Full width, content-based height */}
              {/* <div className="w-full">
                <ContactCard />
              </div> */}
            </div>

            {/* Awards Card - Full width, content-based height */}
            <div className="w-full">
              <UpcomingMeetings />
            </div>
          </div>

          {/* COLUMN 2: ClockInOut, UpcomingMeetings */}
          <div className="w-full space-y-4 md:space-y-4 order-2 md:order-2">
            {/* Clock In/Out Component - Full width, content-based height */}
            <div className="w-full">
              <ClockInOut className="w-full" />
            </div>

            {/* Upcoming Meetings - Full width, fills remaining space */}
            <div className="w-full flex-grow">
              <AwardsCard className="w-full" />
            </div>
          </div>

          {/* COLUMN 3: NoticeBoard - Full width and height */}
          <div className="w-full order-3 md:order-3 h-full">
            {/* Notice Board Component - Full height */}
            <NoticeBoard />
          </div>
        </div>

        {/* Mobile-only quick actions */}
        <div className="fixed bottom-4 right-4 sm:hidden">
          <button className="bg-[#80C342] hover:bg-[#6ca438] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
        </div>
      </main>
        
        {/* Floating chat button */}
        <FloatingChat />
    </div>
  );
}

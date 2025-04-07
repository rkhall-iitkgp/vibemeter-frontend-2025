import ProfileCard, { UserData } from "./dashboard/profile-card";
import AwardsCard, { Award } from "./dashboard/award-card";
import UpcomingMeetings from "./dashboard/upcoming-meet";
import NoticeBoard from "./dashboard/notice-board";
import { FloatingChat } from "./floating-chat";
import ClockInOut from "./dashboard/clock-in";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Navbar from "./Navbar";

interface DashboardData {
  awards: Award[];
  user_data: UserData;
}

export function DashboardContent() {
  const [data, setData] = useState<DashboardData | undefined>();
  const selectedPersona = useSelector(
    (state: RootState) => state.persona.persona_id
  );
  const navigate = useNavigate();
  console.log("Selected Persona ID:", selectedPersona);

  useEffect(() => {
    if (!selectedPersona) {
      navigate("/");
    }
  }, [selectedPersona, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/dashboard/employee/${selectedPersona}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log("Fetched data:", result);
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedPersona]);

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <Navbar name={data?.user_data?.name || ""} />

      <main className="flex-1 p-4 md:p-4 overflow-hidden">
        {/* Main Grid - Fixed width columns on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4 h-full">
          {/* COLUMN 1: ProfileCard, ContactCard, AwardsCard */}
          <div className="w-full flex flex-col space-y-4 md:space-y-4 order-1 md:order-1 h-full overflow-hidden">
            {/* Profile Card - Full width, content-based height */}
            <div className="flex flex-row md:space-x-1">
              <div className="w-full">
                <ProfileCard userData={data?.user_data} />
              </div>

              {/* Contact Card - Full width, content-based height */}
              {/* <div className="w-full">
				<ContactCard />
			  </div> */}
            </div>

            {/* Awards Card - Takes remaining height */}
            <div
              className="w-full rounded-xl shadow-md border"
              style={{ height: "calc(100vh - 332px)" }}
            >
              <UpcomingMeetings />
            </div>
          </div>

          {/* COLUMN 2: ClockInOut, UpcomingMeetings */}
          <div className="w-full space-y-4 md:space-y-4 order-2 md:order-2">
            {/* Clock In/Out Component - Full width, content-based height */}
            <div className="w-full">
              <ClockInOut className="w-full"/>
            </div>

            {/* Upcoming Meetings - Full width, fills remaining space */}
            <div className="w-full flex-grow">
              <AwardsCard className="w-full" awards={data?.awards} />
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

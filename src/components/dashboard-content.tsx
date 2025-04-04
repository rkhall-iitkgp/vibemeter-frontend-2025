'use client'
import Navbar from "./Navbar"
import { Clock, Briefcase } from "lucide-react"
import ContactCard from "./dashboard/contact"
import ClockInOut from "./dashboard/clock-in"
import UpcomingMeetings from "./dashboard/upcoming-meet"
import NoticeBoard from "./dashboard/notice-board"
import AwardsCard from "./dashboard/award-card"
import { useEffect, useState } from "react"
import ProfileCard from "./dashboard/profile-card"

export function DashboardContent() {
  const [name, setName] = useState('Tridibesh');

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <Navbar name={name} />

      <main className="flex-1 p-4 md:p-6 overflow-auto">
        {/* Main Grid - Fixed width columns on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          
          {/* COLUMN 1: ProfileCard, ContactCard, AwardsCard */}
          <div className="w-full space-y-4 md:space-y-6 order-1 md:order-1">
            {/* Profile Card - Full width, content-based height */}
            <div className="w-full">
              <ProfileCard className="w-full" />
            </div>
            
            {/* Contact Card - Full width, content-based height */}
            <div className="w-full">
              <ContactCard className="w-full" />
            </div>
            
            {/* Awards Card - Full width, content-based height */}
            <div className="w-full">
              <AwardsCard className="w-full" />
            </div>
          </div>
          
          {/* COLUMN 2: ClockInOut, UpcomingMeetings */}
          <div className="w-full space-y-4 md:space-y-6 order-2 md:order-2">
            {/* Clock In/Out Component - Full width, content-based height */}
            <div className="w-full">
              <ClockInOut className="w-full" />
            </div>
            
            {/* Upcoming Meetings - Full width, fills remaining space */}
            <div className="w-full flex-grow">
              <UpcomingMeetings className="w-full h-full" />
            </div>
          </div>
          
          {/* COLUMN 3: NoticeBoard - Full width and height */}
          <div className="w-full order-3 md:order-3 h-full">
            {/* Notice Board Component - Full height */}
            <NoticeBoard 
              className="w-full h-full"
              maxHeight="calc(100vh - 12rem)"
            />
          </div>
        </div>
        
        {/* Mobile-only quick actions */}
        <div className="fixed bottom-4 right-4 sm:hidden">
          <button className="bg-[#80C342] hover:bg-[#6ca438] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
}

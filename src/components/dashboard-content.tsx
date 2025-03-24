'use client'
import { Search, Command, Bell, Clock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AttendanceCard } from "@/components/attendence-card"
import { DocumentsCard } from "@/components/documents-card"
import { ChecklistCard } from "@/components/checklist-card"
import { ParkingSection } from "@/components/parking-section"
import { MeetingRoomsCard } from "@/components/meeting-rooms-card"
import { useEffect,useState } from "react"
export function DashboardContent() {
const [time, setTime] = useState('');

useEffect(() => {
const updateTime = () => {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    setTime(`${hours}:${minutes} ${ampm}`);
};

updateTime();
const interval = setInterval(updateTime, 1000);
return () => clearInterval(interval);
}, []);
return (
    <div className="h-full flex flex-col">
    {/* Header */}
    <header className="bg-white border-b px-6 py-3">
        <div className="flex items-center justify-between">
        <Tabs defaultValue="dashboard">
            <TabsList className="bg-transparent p-0 h-auto">
            <TabsTrigger
                value="dashboard"
                className="text-sm font-medium px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:text-teal-500 data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-teal-500 rounded-none"
            >
                Dashboard
            </TabsTrigger>
            <TabsTrigger
                value="bookings"
                className="text-sm font-medium px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:text-teal-500 data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-teal-500 rounded-none"
            >
                Bookings
            </TabsTrigger>
            <TabsTrigger
                value="newsroom"
                className="text-sm font-medium px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:text-teal-500 data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-teal-500 rounded-none"
            >
                Newsroom
            </TabsTrigger>
            <TabsTrigger
                value="documents"
                className="text-sm font-medium px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:text-teal-500 data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-teal-500 rounded-none"
            >
                Documents
            </TabsTrigger>
            </TabsList>
        </Tabs>

        <div className="flex items-center gap-4">
            <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input type="search" placeholder="Search anything..." className="pl-9 w-64 bg-gray-50 border-gray-200" />
            </div>
            <div className="flex items-center gap-1 text-gray-500">
            <Command className="h-4 w-4" />
            <span className="text-sm">F</span>
            </div>
            <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon">
            <div className="relative">
                <Bell className="h-5 w-5 text-gray-500" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center">
                3
                </span>
            </div>
            </Button>
            <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback className="bg-teal-500 text-white">A</AvatarFallback>
            </Avatar>
        </div>
        </div>
    </header>

    {/* Main Content */}
    <main className="flex-1 p-6 overflow-auto">
        {/* Greeting Section */}
        <div className="flex justify-between items-start mb-6">
        <div>
            <h1 className="text-2xl font-bold text-gray-800">Good afternoon, Anakin!</h1>
            <p className="text-gray-600">You have 12 tasks pending.</p>
        </div>
        <div className="bg-white rounded-lg p-3 flex items-center gap-3 shadow-sm">
            <div>
            <p className="text-xs text-gray-500">Current time</p>
            <p className="text-2xl font-bold">{time}</p>
            </div>
            <Clock className="h-6 w-6 text-gray-400" />
        </div>
        </div>

        {/* Cards Row */}
        <div className="grid grid-cols-3 gap-6 mb-6">
        <AttendanceCard />
        <DocumentsCard />
        <ChecklistCard />
        </div>

        {/* Parking and Meeting Rooms Row */}
        <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3">
            <ParkingSection />
        </div>
        <div className="col-span-1">
            <MeetingRoomsCard className="h-full" />
        </div>
        </div>
    </main>
    </div>
)
}
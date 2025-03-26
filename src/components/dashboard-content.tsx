'use client'
import Navbar from "./Navbar"
import { Clock } from "lucide-react"
import { AttendanceCard } from "@/components/attendence-card"
import { DocumentsCard } from "@/components/documents-card"
import { ChecklistCard } from "@/components/checklist-card"
import { ParkingSection } from "@/components/parking-section"
import { MeetingRoomsCard } from "@/components/meeting-rooms-card"
import { useEffect,useState } from "react"
export function DashboardContent() {
const [time, setTime] = useState('');
const [name, setName] = useState('Tridibesh');

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
        <Navbar name={name}/>

        <main className="flex-1 p-6 overflow-auto">
            {/* Greeting Section */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Good afternoon, {name}!</h1>
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

            {/* Main Grid */}
            <div className="grid grid-cols-3 gap-6">
                {/* Left Column (spans 2 columns) */}
                <div className="col-span-2 flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-6">
                        <AttendanceCard />
                        <DocumentsCard />
                    </div>
                    <ParkingSection />
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-6">
                    <ChecklistCard />
                </div>
            </div>
        </main>
    </div>
)
}
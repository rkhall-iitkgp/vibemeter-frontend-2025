import { Search, Command, Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface NavbarProps {
    name: string;
}

const Navbar = ({ name }: NavbarProps) => {
    return(
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
            <AvatarFallback className="bg-teal-500 text-white">{name.charAt(0)}</AvatarFallback>
            </Avatar>
        </div>
        </div>
    </header>
    )
}

export default Navbar;

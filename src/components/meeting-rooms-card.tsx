import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building2 } from "lucide-react"

export function MeetingRoomsCard({ className }: { className?: string }) {
  return (
    <Card className={`shadow-sm ${className || ""}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Meeting rooms</h3>
          <div className="bg-teal-500 text-white text-xs px-2 py-1 rounded-full">Available</div>
        </div>

        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-4 rounded-lg">
            <Building2 className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="flex justify-between mb-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold">24</h2>
            <p className="text-sm text-gray-500">Total</p>
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold">12</h2>
            <p className="text-sm text-gray-500">Available</p>
          </div>
        </div>

        <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">Book a Meeting Room</Button>
      </CardContent>
    </Card>
  )
}


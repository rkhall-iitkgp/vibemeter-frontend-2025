import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, FileText } from "lucide-react"

export function ChecklistCard() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6 px-6">
        <CardTitle className="text-lg font-semibold">Checklist</CardTitle>
        <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">12 Pending</div>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Clock className="h-5 w-5 text-blue-500" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">Lunch slot pending</h4>
              <p className="text-sm text-gray-600">You have not booked your lunch slot yet</p>
            </div>
            <div className="text-sm text-gray-500">09:00</div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
            <div className="bg-green-100 p-2 rounded-lg">
              <FileText className="h-5 w-5 text-green-500" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">Diwali incoming!</h4>
              <p className="text-sm text-gray-600">Compose an email to send.</p>
            </div>
            <div className="text-sm text-gray-500">Yesterday, 22:00</div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="bg-gray-100 p-2 rounded-lg">
              <FileText className="h-5 w-5 text-gray-500" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">BOAT event upcoming!</h4>
              <p className="text-sm text-gray-600">3 days to go!</p>
            </div>
            <div className="text-sm text-gray-500">9:00 AM</div>
          </div>

          <Button variant="ghost" className="w-full text-teal-500 hover:text-teal-600 hover:bg-teal-50">
            View All Tasks
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DocumentsCard() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6 px-6">
        <CardTitle className="text-lg font-semibold">Documents status</CardTitle>
        <Button variant="link" className="text-teal-500 p-0 h-auto font-medium">
          View Stats
        </Button>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="flex">
          <div className="flex-1">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-teal-500"></div>
                <span className="font-medium">221</span>
                <span className="text-gray-500 text-sm">signed by all</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-gray-400"></div>
                <span className="font-medium">23</span>
                <span className="text-gray-500 text-sm">documents unsigned by all</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                <span className="font-medium">149</span>
                <span className="text-gray-500 text-sm">users have not signed</span>
              </div>
            </div>
          </div>

          <div className="relative w-32 h-32">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold">244</div>
                <div className="text-xs text-gray-500">Total</div>
              </div>
            </div>
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" stroke="#f0f0f0" strokeWidth="2"></circle>
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                strokeDasharray="100"
                strokeDashoffset="10"
                strokeLinecap="round"
                transform="rotate(-90 18 18)"
              ></circle>
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


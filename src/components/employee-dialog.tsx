import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check, Clock, MessageSquare, Phone } from "lucide-react"

type EmployeeDialogProps = {
  isOpen: boolean
  onClose: () => void
  employee: Employee | null
}

type Employee = {
  id: number
  name: string
  moraleScore: number
  engagementScore: number
  retentionRisk: number
  cultureScore: number
  hrIntervention: "Low" | "Medium" | "High"
  date: string
  employeeId?: string
  team?: string
  suggestedAction?: string
  availability?: Array<{
    id: number
    time: string
    date: string
    confirmed?: boolean
  }>
}

const EmployeeDialog: React.FC<EmployeeDialogProps> = ({ isOpen, onClose, employee }) => {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  
  if (!employee) return null

  const getScoreColor = (score: number, isRisk = false) => {
    if (isRisk) {
      // For retention risk, lower is better
      if (score > 70) return "bg-[#F36D65]"
      if (score > 40) return "bg-yellow-400"
      return "bg-[#80C342]"
    }
    // For other scores, higher is better
    if (score > 70) return "bg-[#80C342]"
    if (score > 40) return "bg-yellow-400"
    return "bg-[#F36D65]"
  }

  const getHRInterventionColor = (status: "Low" | "Medium" | "High") => {
    const colorMap = {
      Low: "bg-[#80C342]",
      Medium: "bg-yellow-400",
      High: "bg-[#F36D65]",
    }
    return colorMap[status]
  }

  const getHRInterventionWidth = (status: "Low" | "Medium" | "High") => {
    const widthMap = {
      Low: "20%",
      Medium: "50%",
      High: "80%",
    }
    return widthMap[status]
  }
  
  const handleSlotClick = (slotId: number) => {
    setSelectedSlot(selectedSlot === slotId ? null : slotId);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto p-4">
      <DialogHeader className="flex flex-row items-center gap-4 pb-2 border-b">
        <div className="h-16 w-16 rounded-full bg-gray-200 flex-shrink-0"></div>
        <div>
        <DialogTitle className="text-xl font-bold">{employee.name}</DialogTitle>
        <p className="text-gray-500">{employee.employeeId}</p>
        <p className="text-gray-500">{employee.team}</p>
        </div>
      </DialogHeader>

      <div className="py-4">
        <h3 className="text-lg font-bold mb-4">Employee Stats</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="flex justify-between items-center">
          <span className="text-gray-700">HR Intervention Score</span>
          <span className="font-medium text-red-500">10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
          <div
        className="bg-red-500 h-2 rounded-full"
        style={{ width: getHRInterventionWidth(employee.hrIntervention) }}
          ></div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
          <span className="text-gray-700">Retention Risk Score</span>
          <span className="font-medium">10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
          <div
        className="bg-green-500 h-2 rounded-full"
        style={{ width: `${100 - employee.retentionRisk}%` }}
          ></div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
          <span className="text-gray-700">Morale Score</span>
          <span className="font-medium">10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
          <div
        className="bg-green-500 h-2 rounded-full"
        style={{ width: `${employee.moraleScore}%` }}
          ></div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
          <span className="text-gray-700">Overall Cultural Score</span>
          <span className="font-medium">10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
          <div
        className="bg-green-500 h-2 rounded-full"
        style={{ width: `${employee.cultureScore}%` }}
          ></div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
          <span className="text-gray-700">Engagement Score</span>
          <span className="font-medium">10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
          <div
        className="bg-green-500 h-2 rounded-full"
        style={{ width: `${employee.engagementScore}%` }}
          ></div>
          </div>
        </div>
        </div>
      </div>

      <div className="py-4 border-t">
        <h3 className="text-lg font-bold mb-2">Suggestive Action</h3>
        <p className="text-gray-500">
        {employee.suggestedAction ||
          "Talk to the employee regarding performance concerns and discuss potential improvement strategies. Schedule a follow-up meeting to track progress."}
        </p>
      </div>

      <div className="py-4 border-t">
        <h3 className="text-lg font-bold mb-4">Employee availability</h3>
        <div className="space-y-3">
        {(
          employee.availability || [
          { id: 1, time: "2pm - 3pm", date: "24/03/25" },
          { id: 2, time: "2pm - 3pm", date: "24/03/25" },
          { id: 3, time: "2pm - 3pm", date: "24/03/25" },
          { id: 4, time: "2pm - 3pm", date: "24/03/25" },
          ]
        ).map((slot) => (
          <div
          key={slot.id}
          className={`flex justify-between items-center p-4 border rounded-md cursor-pointer ${
        slot.confirmed ? "border-green-500 bg-green-50" : "border-gray-200"
          }`}
          onClick={() => !slot.confirmed && handleSlotClick(slot.id)}
          >
          <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-gray-500" />
        <span>{slot.time}</span>
          </div>
          <div className="flex items-center gap-4">
        <span>{slot.date}</span>
        {slot.confirmed ? (
        <Check className="h-5 w-5 text-green-500" />
        ) : selectedSlot === slot.id ? (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8">
          Cancel
          </Button>
          <Button size="sm" className="h-8 bg-green-500 hover:bg-green-600">
          Confirm Meet
          </Button>
        </div>
        ) : null}
          </div>
          </div>
        ))}
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t gap-4">
        <Button variant="outline" className="border-green-500 text-black hover:bg-green-50">
        <MessageSquare className="mr-2 h-5 w-5" />
        Message
        </Button>
        <Button variant="outline" className="border-green-500 text-black hover:bg-green-50">
        <Phone className="mr-2 h-5 w-5" />
        Phone Call
        </Button>
      </div>
      </DialogContent>
    </Dialog>
  )
}

export default EmployeeDialog
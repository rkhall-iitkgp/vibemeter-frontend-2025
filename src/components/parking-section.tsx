import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Car } from "lucide-react"

function ParkingSpot({ status }: { status: "available" | "occupied" | "empty" }) {
  if (status === "empty") {
    return <div className="h-4 w-4 rounded-sm bg-gray-200"></div>
  }

  if (status === "available") {
    return (
      <div className="h-4 w-4 rounded-sm border border-teal-500">
        <div className="h-full w-full bg-teal-500 opacity-30 rounded-sm"></div>
      </div>
    )
  }

  return <div className="h-4 w-4 rounded-sm border border-teal-500 bg-teal-500"></div>
}

function ParkingGrid({ grid }: { grid: ("available" | "occupied" | "empty")[][] }) {
  return (
    <div className="grid gap-y-3">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1.5">
          {row.map((status, colIndex) => (
            <ParkingSpot key={`${rowIndex}-${colIndex}`} status={status} />
          ))}
        </div>
      ))}
    </div>
  )
}

function BasementSection({
  name,
  capacity,
  used,
  grid,
}: {
  name: string
  capacity: string
  used: string
  grid: ("available" | "occupied" | "empty")[][]
}) {
  const color =
    name === "Basement 01" ? "border-yellow-400" : name === "Basement 02" ? "border-blue-400" : "border-red-400"

  return (
    <div className="mb-6 last:mb-0">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">{name}</h3>
        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <Car className="h-4 w-4" />
          <span>
            {used}/{capacity}
          </span>
        </div>
      </div>
      <div className={`border-t-2 ${color} mb-3`}></div>
      <ParkingGrid grid={grid} />
    </div>
  )
}

// Create more realistic parking grids that match the image
function createParkingGrid(occupancyRate: number, pattern: string): ("available" | "occupied" | "empty")[][] {
  // Create a grid with the specified pattern
  const grid: ("available" | "occupied" | "empty")[][] = []

  for (let i = 0; i < 2; i++) {
    const row: ("available" | "occupied" | "empty")[] = []
    for (let j = 0; j < 40; j++) {
      // Use pattern to determine if this should be a parking spot or empty space
      if (pattern === "basement1" && ((i === 0 && j > 4) || (i === 1 && j < 5))) {
        row.push("empty")
      } else if (pattern === "basement2" && ((i === 3 && j > 7) || (i === 4 && j < 3))) {
        row.push("empty")
      } else if (pattern === "basement3" && ((i > 5 && j < 3) || (i > 5 && j > 7))) {
        row.push("empty")
      } else {
        // Determine if spot is available or occupied based on occupancy rate
        row.push(Math.random() > occupancyRate ? "available" : "occupied")
      }
    }
    grid.push(row)
  }

  return grid
}

export function ParkingSection() {
  // Create more realistic parking grids
  const basement01Grid = createParkingGrid(0.7, "basement1")
  const basement02Grid = createParkingGrid(0.5, "basement2")
  const basement03Grid = createParkingGrid(0.9, "basement3")

  return (
    <Card className="shadow-sm h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6 px-6">
        <CardTitle className="text-lg font-semibold">Live Parking</CardTitle>
        <Button variant="link" className="text-teal-500 p-0 h-auto font-medium">
          View Stats
        </Button>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <BasementSection name="Basement 01" capacity="40" used="25" grid={basement01Grid} />
        <BasementSection name="Basement 02" capacity="64" used="39" grid={basement02Grid} />
        <BasementSection name="Basement 03" capacity="40" used="38" grid={basement03Grid} />
      </CardContent>
    </Card>
  )
}


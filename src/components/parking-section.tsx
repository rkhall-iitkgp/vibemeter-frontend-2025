import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";

function ParkingSpot({
  status,
}: {
  status: "available" | "occupied" | "empty";
}) {
  if (status === "empty") {
    return <div className="h-4 w-4 rounded-sm bg-gray-200"></div>;
  }

  if (status === "available") {
    return (
      <div className="h-4 w-4 rounded-sm border border-teal-500">
        <div className="h-full w-full bg-teal-500 opacity-30 rounded-sm"></div>
      </div>
    );
  }

  return (
    <div className="h-4 w-4 rounded-sm border border-teal-500 bg-teal-500"></div>
  );
}

function ParkingGrid({
  grid,
}: {
  grid: ("available" | "occupied" | "empty")[];
}) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(1rem,1fr))] gap-1.5">
      {grid.map((status, index) => (
        <ParkingSpot key={index} status={status} />
      ))}
    </div>
  );
}

function createParkingGrid(
  totalSpots: number,
  occupancyRate: number
): ("available" | "occupied" | "empty")[] {
  return Array.from({ length: totalSpots }, () =>
    Math.random() > occupancyRate ? "available" : "occupied"
  );
}

export function ParkingSection() {
  const totalSpots = 365;
  const occupiedSpots = 275;
  const parkingGrid = createParkingGrid(totalSpots, occupiedSpots / totalSpots);

  return (
    <Card className="shadow-sm h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6 px-6">
        <CardTitle className="text-lg font-semibold">Live Parking</CardTitle>
        <Button variant="link" className="text-teal-500 p-0 h-auto font-medium">
          View Stats
        </Button>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Main Parking Area</h3>
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <Car className="h-4 w-4" />
              <span>
                {occupiedSpots}/{totalSpots}
              </span>
            </div>
          </div>
          <div className="border-t-2 border-teal-500 mb-3"></div>
          <ParkingGrid grid={parkingGrid} />
        </div>
      </CardContent>
    </Card>
  );
}

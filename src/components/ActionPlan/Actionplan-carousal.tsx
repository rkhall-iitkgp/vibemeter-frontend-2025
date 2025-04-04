"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";
import { Card } from "./Card";

// Use the same data structure as your original component
const actionPlans = [
  {
    id: 1,
    title: "Recognition Program",
    description:
      "Implement a monthly employee recognition program to celebrate achievements and boost morale.",
    priorityLevel: "high",
    targetGroup: "All Departments",
    categories: ["Team Building", "Morale"],
  },
  {
    id: 2,
    title: "Recognition Program",
    description:
      "Implement a monthly employee recognition program to celebrate achievements and boost morale.",
    priorityLevel: "high",
    targetGroup: "All Departments",
    categories: ["Team Building", "Morale"],
  },
  {
    id: 3,
    title: "Recognition Program",
    description:
      "Implement a monthly employee recognition program to celebrate achievements and boost morale.",
    priorityLevel: "high",
    targetGroup: "All Departments",
    categories: ["Team Building", "Morale"],
  },
  {
    id: 4,
    title: "Recognition Program",
    description:
      "Implement a monthly employee recognition program to celebrate achievements and boost morale.",
    priorityLevel: "high",
    targetGroup: "All Departments",
    categories: ["Team Building", "Morale"],
  },
];

export function ActionPlansCarousel() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-slate-100 rounded-sm p-6 px-10 relative mx-auto max-w-7xl">
      <div className="flex justify-between items-center mb-5 pt-1">
        <h2 className="text-lg font-semibold">Suggested Action Plans</h2>
      </div>

      <Carousel
        className="w-full"
        opts={{
          align: "start",
          containScroll: "trimSnaps",
          loop: false,
          dragFree: true,
          slidesToScroll: 1,
        }}
      >
        <CarouselContent className="-ml-4">
          {actionPlans.map((plan) => (
            <CarouselItem
              key={plan.id}
              className="pl-4 w-full sm:basis-1/2 lg:basis-1/3"
            >
              <Card
                title={plan.title}
                description={plan.description}
                priorityLevel={plan.priorityLevel as "high" | "medium" | "low"}
                targetGroup={plan.targetGroup}
                categories={plan.categories}
                onViewDetails={() =>
                  console.log(`View details for plan ${plan.id}`)
                }
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute inset-y-0 left-0 flex items-center">
          <CarouselPrevious className="!h-9 !w-9 -ml-7 bg-white text-black shadow-none border-0 " />
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <CarouselNext className="!h-9 !w-9 -mr-7 bg-white text-black shadow-none border-0" />
        </div>
      </Carousel>
    </div>
  );
}

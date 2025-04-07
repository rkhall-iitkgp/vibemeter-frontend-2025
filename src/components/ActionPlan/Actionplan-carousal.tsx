import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/store/store";
import { fetchSuggestions } from '../../store/slices/suggestionsSlice';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "./Card";

export function ActionPlansCarousel() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state : RootState) => state.suggestions);

  useEffect(() => {
    dispatch(fetchSuggestions());
  }, [dispatch]);
  
  
  const isVisible = true;

  if (!isVisible) return null;
  if (loading) return <div>Loading suggestions...</div>;
  if (error) return <div>Error: {error}</div>;
  if (items.length === 0) return <div>No suggestions available.</div>;

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
          {items.map((plan : any,index : number) => (
            <CarouselItem
              key={index}
              className="pl-4 w-full sm:basis-1/2 lg:basis-1/3"
            >
              <Card
                title={plan.title}
                description={plan.purpose}
                priorityLevel={"high"}
                targetGroup={plan.targetGroup}
                categories={plan.metric}
                onViewDetails={() =>
                  console.log(`View details for plan ${index}`)
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

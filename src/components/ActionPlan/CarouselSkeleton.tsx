import { Skeleton } from "@/components/ui/skeleton"

export function CarouselCardSkeleton() {
  return (
    <div className="bg-white rounded-lg p-7 shadow-sm min-w-[350px] h-[250px] flex flex-col">
      <div className="flex items-center gap-5 mb-3">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-6 w-40" />
      </div>
      <div className="mb-3">
        <Skeleton className="h-5 w-24 rounded-full" />
      </div>
      <div className="space-y-2 mb-4 flex-grow">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="mt-auto">
        <div className="flex items-center gap-2 mb-3">
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Skeleton className="h-8 w-28 rounded-full" />
            <Skeleton className="h-8 w-20 rounded-full" />
          </div>
          <Skeleton className="h-5 w-24" />
        </div>
      </div>
    </div>
  )
}

export function CarouselSkeleton() {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <Skeleton className="h-7 w-48 mb-6" />
      <div className="flex gap-4 overflow-hidden">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <CarouselCardSkeleton key={index} />
          ))}
      </div>
    </div>
  )
}


import { Skeleton } from "@/components/ui/skeleton"

export function ActionPlanCardSkeleton() {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    </div>
  )
}

export function ActionPlanListSkeleton() {
  return (
    <div className="space-y-4">
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <ActionPlanCardSkeleton key={index} />
        ))}
    </div>
  )
}


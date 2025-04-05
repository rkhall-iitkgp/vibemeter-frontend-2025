import type React from "react"
import { CarouselSkeleton } from "./CarouselSkeleton"

interface ActionPlansCarouselContentProps {
  isLoading: boolean
  children: React.ReactNode
}

export function ActionPlansCarouselContent({ isLoading, children }: ActionPlansCarouselContentProps) {
  if (isLoading) {
    return <CarouselSkeleton />
  }

  return <>{children}</>
}


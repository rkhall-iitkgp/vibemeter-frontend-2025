"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Badge, BadgeProps } from "@/components/ui/badge"

// Define the types for our component
interface Tag {
  id: string
  name: string
  type: string
}

interface TaskCardProps {
  id: string
  title: string
  description: string
  isCompleted: boolean
  tags: Tag[]
  onToggleComplete?: (id: string) => void
}

// Map of tag types to their respective variant classes
const tagVariantMap: Record<string, BadgeProps["variant"]> = {
  overdue: "warning",
  urgent: "default",
  important: "destructive",
  low: "secondary",
  medium: "outline",
  high: "destructive",
  completed: "success",
  inProgress: "secondary",
  pending: "outline",
}

// Custom colors for specific tags
// const tagCustomColorMap: Record<string, string> = {
//   overdue: "bg-amber-500 hover:bg-amber-600 text-white border-none",
// }

export default function TaskCard({ id, title, description, isCompleted, tags, onToggleComplete }: TaskCardProps) {
  return (
    <Card >
      <CardContent >
        <div className="flex items-start gap-3">
          <div className="pt-1">
            <Checkbox id={`task-${id}`} checked={isCompleted} onCheckedChange={() => onToggleComplete?.(id)} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-muted-foreground mt-1">{description}</p>
          </div>
          <div className="flex flex-wrap gap-2 justify-end">
            {tags.map((tag) => {
              const tagType = tag.type.toLowerCase();
              return (
                <Badge
                  key={tag.id}
                  variant={tagVariantMap[tagType] || "secondary"}
                //   customClass={tagVariantMap[tagType]}
                >
                  {tag.name}
                </Badge>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

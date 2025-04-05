import { HorizontalRecognitionCard } from "./Action-plan-component2"

interface ActionStep {
  title: string
  description: string
}

interface ActionPlan {
  action_id: string
  title: string
  purpose: string
  metric: string[]
  steps: ActionStep[]
  is_completed: boolean
  target_groups: any[]
  created_at: string
}

interface ActionPlanContentProps {
  isLoading: boolean
  error: string | null
  displayPlans: ActionPlan[]
  openDeleteModal: (actionId: string) => void
}

import { ActionPlanListSkeleton } from "./ActionPlanSkeleton"

export function ActionPlanContent({ isLoading, error, displayPlans, openDeleteModal }: ActionPlanContentProps) {
  if (isLoading) {
    return <ActionPlanListSkeleton />
  }

  if (error) {
    return <div className="bg-red-50 p-4 rounded-md text-red-700 mb-4">{error}</div>
  }

  if (displayPlans.length === 0) {
    return (
      <p className="text-center py-8 text-gray-500">
        No action plans found. Try adjusting your search or create a new one.
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {displayPlans.map((plan, index) => (
        <HorizontalRecognitionCard
          key={index}
          action_id={plan.action_id}
          title={plan.title}
          created_at={plan.created_at}
          purpose={plan.purpose}
          target_groups={plan.target_groups}
          metrics={plan.metric}
          onDelete={openDeleteModal}
        />
      ))}
    </div>
  )
}


import { Suggestion, ActionPlan, SuggestedActions } from "@/types";
import { ActionPlanFormValues } from "./MultiStepActionPlanModal";

export type FormData = {
  title: string;
  purpose: string;
  metric: string[];
  target_groups: Array<{
    name: string;
    focus_group_id: string;
  }>;
  steps: Array<{
    title: string;
    description: string;
  }>;
  is_completed?: boolean;
};
/**
 * Converts a Suggestion object from the carousel to an ActionPlan object
 * compatible with the MultiStepActionPlanModal
 */
export function adaptSuggestionToActionPlan(
  suggestion: Suggestion
): SuggestedActions {
  return {
    action_id: suggestion.id || "",
    title: suggestion.title,
    purpose: suggestion.purpose,
    created_at: new Date().toISOString(),
    metric: Array.isArray(suggestion.metric)
      ? suggestion.metric
      : [suggestion.metric].filter(Boolean),
    target_groups: suggestion.target_group
      ? [
          {
            name: suggestion.target_group,
            focus_group_id: suggestion.focus_group_id || "",
          },
        ]
      : [],
    is_completed: false,
    steps: suggestion.steps
      ? suggestion.steps.map((step, index) => ({
          title: `Step ${index + 1}`,
          description: String(step),
        }))
      : [],
  };
}

/**
 * Prepares the submission data from the action plan form for the API
 */
export function prepareSubmissionData(
  formData: ActionPlanFormValues,
  isEditing: boolean,
  originalPlan?: ActionPlan
) {
  if (isEditing && originalPlan) {
    return {
      action_id: originalPlan.action_id,
      title: formData.title,
      purpose: formData.purpose,
      metric: formData.metric,
      target_groups: formData.target_groups,
      steps: formData.steps,
      is_completed: formData.is_completed || false,
      created_at: originalPlan.created_at,
    };
  } else {
    return {
      title: formData.title,
      purpose: formData.purpose,
      metric: formData.metric,
      target_groups: formData.target_groups,
      steps: formData.steps,
      is_completed: formData.is_completed || false,
    };
  }
}

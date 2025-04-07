export interface FocusGroup {
  focus_group_id: string;
  name: string;
  created_at: string;
  description: string;
  metrics: string[];
  members: number;
}

export interface Employee {
  name: string;
  employee_id: string;
  job_title: string;
  joining_date: string;
}

export interface ActionStep {
  title: string;
  description: string;
}

export interface ActionPlan {
  action_id: string;
  title: string;
  purpose: string;
  metric: string[];
  steps: ActionStep[];
  is_completed: boolean;
  target_groups: FocusGroup[];
  created_at: string;
}

export interface Step {
  title: string;
  description: string;
}

export interface Suggestion {
  title: string;
  purpose: string;
  metric: string[];
  steps: Step[];
  target_group: string;
}

export interface SuggestionsState {
  items: Suggestion[];
  loading: boolean;
  error: string | null;
}

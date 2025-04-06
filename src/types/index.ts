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

export type EmployeeDetail = {
  name: string;
  job_title: string;
  email: string;
  phone_number: string;
  created_at: string | null;
  employee_id: string;
  awards: {
    award_type: string;
    award_date: string;
    reward_points: number;
  }[];
  vibemeter: {
    average_vibe_score: number;
    score_change: {
      percentage: number;
      direction: string;
    };
    monthly_scores: {
      month: string;
      score: number;
    }[];
  };
  chat_summary: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  focus_groups: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action_plans: any[];
};

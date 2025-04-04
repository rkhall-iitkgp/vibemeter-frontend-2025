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

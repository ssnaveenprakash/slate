export type StepStatus = 'completed' | 'active' | 'error' | 'pending';

export interface StepConfig {
  label: string;
  description?: string;
  optional?: boolean;
  disabled?: boolean;
}

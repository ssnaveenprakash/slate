import { DropdownOption } from '../../molecules/dropdown/dropdown.component';

export type FormFieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'textarea'
  | 'dropdown'
  | 'checkbox'
  | 'radio'
  | 'toggle';

export interface FormFieldValidator {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  custom?: (value: unknown) => string | null;
}

export interface FormFieldSchema {
  key: string;
  type: FormFieldType;
  label: string;
  placeholder?: string;
  helperText?: string;
  disabled?: boolean;
  options?: DropdownOption[];
  defaultValue?: unknown;
  validators?: FormFieldValidator;
  colSpan?: 1 | 2;
}

export interface FormSchema {
  fields: FormFieldSchema[];
  submitLabel?: string;
  cancelLabel?: string;
  successMessage?: string;
  layout?: 'single' | 'two-column';
}

export type FormValue = Record<string, unknown>;

import type { Meta, StoryObj } from '@storybook/angular';
import { DatePickerComponent } from './date-picker.component';

type Args = Partial<DatePickerComponent> & { showPrefix: boolean; showSuffix: boolean; showDefaultIcon: boolean };

const meta: Meta<Args> = {
  title: 'Organisms/DatePicker',
  component: DatePickerComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    helperText: { control: 'text' },
    validationMessage: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    min: { control: 'text' },
    max: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    variant: { control: 'radio', options: ['default', 'filled', 'ghost'] },
    size: { control: 'radio', options: ['small', 'medium', 'large'] },
      showPrefix: { control: 'boolean' },
      showSuffix: { control: 'boolean' },
      showDefaultIcon: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<Args>;

const render = (args: Args) => ({
  props: args,
  template: `
    <slt-date-picker
      [label]="label"
      [helperText]="helperText"
      [validationMessage]="validationMessage"
      [placeholder]="placeholder"
      [value]="value"
      [min]="min"
      [max]="max"
      [disabled]="disabled"
      [readonly]="readonly"
      [required]="required"
      [variant]="variant"
      [size]="size"
      [showDefaultIcon]="showDefaultIcon"
    >
      <span *ngIf="showSuffix" suffix>⏰</span>
    </slt-date-picker>
  `,
});

export const Default: Story = {
  args: {
    label: 'Date',
    placeholder: 'Select a date',
    helperText: '',
    validationMessage: '',
    value: '',
    min: '',
    max: '',
    disabled: false,
    readonly: false,
    required: false,
    variant: 'default',
    size: 'medium',
    showPrefix: false,
    showSuffix: false,
    showDefaultIcon: true,
  },
  render,
};

export const Filled: Story = { args: { ...Default.args, variant: 'filled' }, render };
export const Ghost: Story = { args: { ...Default.args, variant: 'ghost' }, render };
export const Small: Story = { args: { ...Default.args, size: 'small' }, render };
export const Large: Story = { args: { ...Default.args, size: 'large' }, render };
export const Disabled: Story = { args: { ...Default.args, disabled: true }, render };
export const Readonly: Story = { args: { ...Default.args, readonly: true, value: '2023-01-01' }, render };
export const WithMinMax: Story = { args: { ...Default.args, min: '2023-01-01', max: '2023-12-31' }, render };
export const WithPrefix: Story = { args: {
  ...Default.args,
  showPrefix: false,
  showDefaultIcon: false
}, render };
export const WithSuffix: Story = { args: { ...Default.args, showSuffix: true }, render };

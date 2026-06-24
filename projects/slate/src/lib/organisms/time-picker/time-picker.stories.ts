import type { Meta, StoryObj } from '@storybook/angular';
import { TimePickerComponent } from './time-picker.component';

type Args = Partial<TimePickerComponent> & { showPrefix: boolean; showSuffix: boolean; showDefaultIcon: boolean };

const meta: Meta<Args> = {
  title: 'Organisms/TimePicker',
  component: TimePickerComponent,
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
    <slt-time-picker
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
      <span *ngIf="showPrefix" prefix>🕒</span>
      <span *ngIf="showSuffix" suffix>⏱️</span>
    </slt-time-picker>
  `,
});

export const Default: Story = {
  args: {
    label: 'Time',
    placeholder: 'Select time',
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
export const Readonly: Story = { args: { ...Default.args, readonly: true, value: '12:00' }, render };
export const WithMinMax: Story = { args: { ...Default.args, min: '09:00', max: '17:00' }, render };

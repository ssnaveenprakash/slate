import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { CheckboxComponent } from './checkbox.component';

const meta: Meta<CheckboxComponent> = {
  title: 'Atoms/Checkbox',
  component: CheckboxComponent,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    onChange: fn(),
  },
};

export default meta;

type Story = StoryObj<CheckboxComponent>;

export const Default: Story = {
  args: {
    label: 'Checkbox',
    checked: false,
  },
};
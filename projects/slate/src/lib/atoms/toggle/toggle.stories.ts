import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { ToggleComponent } from './toggle.component';

const meta: Meta<ToggleComponent> = {
  title: 'Atoms/Toggle',
  component: ToggleComponent,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    onChange: fn(),
  },
};

export default meta;

type Story = StoryObj<ToggleComponent>;

export const Default: Story = {
  args: {
    label: 'Toggle',
    checked: false,
  },
};

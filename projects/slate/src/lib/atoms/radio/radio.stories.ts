import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { RadioComponent } from './radio/radio.component';

const meta: Meta<RadioComponent> = {
  title: 'Example/Radio',
  component: RadioComponent,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  }
};

export default meta;

type Story = StoryObj<RadioComponent>;

export const Default: Story = {
  args: {
    label: 'Radio',
    checked: false,
    name: 'radio-group',
    onClick: fn()
  },
};

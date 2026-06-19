import type { Meta, StoryObj } from '@storybook/angular';
import { SlateComponent } from './slate.component'; // Adjust path as needed

const meta: Meta<SlateComponent> = {
  title: 'Components/Slate',
  component: SlateComponent,
};

export default meta;
type Story = StoryObj<SlateComponent>;

export const Primary: Story = {
  args: {},
};
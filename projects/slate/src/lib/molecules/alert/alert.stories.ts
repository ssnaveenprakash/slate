import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { AlertComponent } from './alert.component';

const meta: Meta<AlertComponent> = {
  title: 'Molecules/Alert',
  component: AlertComponent,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'The type of notification state to represent',
    },
    message: {
      control: 'text',
      description: 'The primary message header text',
    },
    description: {
      control: 'text',
      description: 'Secondary, detailed description text',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the close button is displayed',
    },
    duration: {
      control: 'number',
      description: 'Auto-dismiss timeout duration in ms (0 to disable)',
    },
  },
  args: {
    onClose: fn(),
  },
};

export default meta;
type Story = StoryObj<AlertComponent>;

export const Playground: Story = {
  args: {
    type: 'info',
    message: 'Check out this notification!',
    description: 'This alert is customizable and interactive.',
    dismissible: true,
    duration: 0,
  },
};

export const Types: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; width: 100%; max-width: 600px;">
        <storybook-alert
          type="info"
          message="Info Alert"
          description="This is some general informative text for the user."
        ></storybook-alert>

        <storybook-alert
          type="success"
          message="Success Alert"
          description="Your operation completed successfully without any errors."
        ></storybook-alert>

        <storybook-alert
          type="warning"
          message="Warning Alert"
          description="Attention required! Please verify the credentials before completing the task."
        ></storybook-alert>

        <storybook-alert
          type="error"
          message="Error Alert"
          description="A critical failure occurred. Please contact the systems administrator."
        ></storybook-alert>
      </div>
    `,
  }),
};

export const WithoutDescription: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 600px;">
        <storybook-alert type="info" message="Standard informative message header."></storybook-alert>
        <storybook-alert type="success" message="Successfully saved settings."></storybook-alert>
        <storybook-alert type="warning" message="Database space is getting low."></storybook-alert>
        <storybook-alert type="error" message="Invalid credentials entered."></storybook-alert>
      </div>
    `,
  }),
};

export const AutoDismiss: Story = {
  args: {
    type: 'success',
    message: 'Auto-Timeout Alert',
    description: 'This alert will automatically fade out and dismiss after 3 seconds (3000ms).',
    dismissible: true,
    duration: 3000,
  },
};

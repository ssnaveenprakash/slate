import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Atoms/Button',
  component: ButtonComponent,
  tags: ['autodocs'],

  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },

    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },

    disabled: {
      control: 'boolean',
    },

    loading: {
      control: 'boolean',
    },

    label: {
      control: 'text',
    },
  },

  args: {
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<ButtonComponent>;

export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    label: 'Button',
    disabled: false,
    loading: false,
  },
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:12px;">
        <storybook-button
          variant="primary"
          label="Primary">
        </storybook-button>

        <storybook-button
          variant="secondary"
          label="Secondary">
        </storybook-button>

        <storybook-button
          variant="ghost"
          label="Ghost">
        </storybook-button>

        <storybook-button
          variant="danger"
          label="Danger">
        </storybook-button>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:12px; align-items:center;">
        <storybook-button
          size="small"
          label="Small">
        </storybook-button>

        <storybook-button
          size="medium"
          label="Medium">
        </storybook-button>

        <storybook-button
          size="large"
          label="Large">
        </storybook-button>
      </div>
    `,
  }),
};

export const States: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:12px;">
        <storybook-button
          label="Default">
        </storybook-button>

        <storybook-button
          [disabled]="true"
          label="Disabled">
        </storybook-button>

        <storybook-button
          [loading]="true"
          label="Loading">
        </storybook-button>
      </div>
    `,
  }),
};
import type { Meta, StoryObj } from '@storybook/angular';
import { FieldComponent } from './field.component';

type FieldStoryArgs = FieldComponent & {
  showPrefix: boolean;
  showSuffix: boolean;
};

const meta: Meta<FieldStoryArgs> = {
  title: 'Atoms/Field',
  component: FieldComponent,
  tags: ['autodocs'],

  argTypes: {
    fieldType: {
      control: 'radio',
      options: ['input', 'textarea'],
    },
    label: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },

    showPrefix: {
      control: 'boolean',
    },
    showSuffix: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<FieldStoryArgs>;

export const Playground: Story = {
  args: {
    fieldType: 'input',
    label: 'Name',
    placeholder: 'Enter your name',
    helperText: 'This is helper text',
    error: '',
    disabled: false,
    showPrefix: false,
    showSuffix: false,
  },

  render: (args) => ({
    props: args,
    template: `
      <storybook-field
        [fieldType]="fieldType"
        [label]="label"
        [placeholder]="placeholder"
        [helperText]="helperText"
        [error]="error"
        [disabled]="disabled"
      >
        <span *ngIf="showPrefix" prefix>🔍</span>
        <span *ngIf="showSuffix" suffix>⌘K</span>
      </storybook-field>
    `,
  }),
};

export const Textarea: Story = {
  args: {
    fieldType: 'textarea',
    label: 'Description',
    placeholder: 'Enter description',
    helperText: 'Write a short description',
    error: '',
    disabled: false,
    showPrefix: false,
    showSuffix: false,
  },
  render: Playground.render,
};

export const WithError: Story = {
  args: {
    fieldType: 'input',
    label: 'Email',
    placeholder: 'Enter email',
    helperText: '',
    error: 'Email is required',
    disabled: false,
    showPrefix: false,
    showSuffix: false,
  },
  render: Playground.render,
};

export const WithPrefixAndSuffix: Story = {
  args: {
    fieldType: 'input',
    label: 'Search',
    placeholder: 'Search...',
    helperText: 'Search by name or email',
    error: '',
    disabled: false,
    showPrefix: true,
    showSuffix: true,
  },
  render: Playground.render,
};

export const Disabled: Story = {
  args: {
    fieldType: 'input',
    label: 'Username',
    placeholder: '',
    helperText: '',
    error: '',
    disabled: true,
    showPrefix: false,
    showSuffix: false,
  },
  render: Playground.render,
};
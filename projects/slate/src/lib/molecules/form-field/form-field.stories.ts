import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { FormFieldComponent } from './form-field.component';

const meta: Meta<FormFieldComponent> = {
  title: 'Molecules/FormField',
  component: FormFieldComponent,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'HTML input type — built-in validation fires automatically on blur',
    },
    label: { control: 'text' },
    helperText: { control: 'text', description: 'Shown when there is no error' },
    validationMessage: {
      control: 'text',
      description: 'External override — replaces built-in validation message when set',
    },
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    valueChange: fn(),
    blur: fn(),
  },
};

export default meta;
type Story = StoryObj<FormFieldComponent>;

export const Playground: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your name',
    helperText: 'As it appears on your ID',
    validationMessage: '',
    required: false,
    disabled: false,
    type: 'text',
  },
};

export const EmailValidation: Story = {
  name: 'Email — built-in validation',
  args: {
    label: 'Email Address',
    placeholder: 'you@example.com',
    type: 'email',
    required: true,
    helperText: 'Type an invalid email then click outside to see the error.',
  },
};

export const UrlValidation: Story = {
  name: 'URL — built-in validation',
  args: {
    label: 'Website',
    placeholder: 'https://example.com',
    type: 'url',
    helperText: 'Type an invalid URL then click outside to see the error.',
  },
};

export const NumberValidation: Story = {
  name: 'Number — built-in validation',
  args: {
    label: 'Age',
    placeholder: '18',
    type: 'number',
    required: true,
    helperText: 'Type letters or leave empty then click outside.',
  },
};

export const RequiredValidation: Story = {
  name: 'Required — empty blur',
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    type: 'text',
    required: true,
    helperText: 'Leave empty and click outside to trigger the required error.',
  },
};

export const AllStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
        <slt-form-field
          label="Default"
          placeholder="Enter value"
          helperText="This is helper text."
        ></slt-form-field>

        <slt-form-field
          label="Required"
          placeholder="Enter value"
          [required]="true"
          helperText="Leave empty and blur to see required error."
        ></slt-form-field>

        <slt-form-field
          label="Email"
          placeholder="you@example.com"
          type="email"
          [required]="true"
          helperText="Type an invalid email then blur."
        ></slt-form-field>

        <slt-form-field
          label="External Error"
          placeholder="Enter value"
          validationMessage="This error was set externally."
        ></slt-form-field>

        <slt-form-field
          label="Disabled"
          placeholder="Not editable"
          [disabled]="true"
          helperText="This field is currently disabled."
        ></slt-form-field>
      </div>
    `,
  }),
};

export const PasswordField: Story = {
  args: {
    label: 'Password',
    placeholder: '••••••••',
    type: 'password',
    required: true,
    helperText: 'Leave empty and blur to see required error.',
  },
};

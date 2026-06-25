import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { FormComponent } from './form.component';
import { FormSchema } from './form.types';

const meta: Meta<FormComponent> = {
  title: 'Organisms/Form',
  component: FormComponent,
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'boolean', description: 'Shows loading state on submit button' },
  },
  args: {
    formSubmit: fn(),
    formCancel: fn(),
    formChange: fn(),
  },
};

export default meta;
type Story = StoryObj<FormComponent>;

// ─── Schemas ─────────────────────────────────────────────────────────────────

const contactSchema: FormSchema = {
  submitLabel: 'Send Message',
  cancelLabel: 'Cancel',
  successMessage: 'Your message has been sent successfully!',
  fields: [
    {
      key: 'name',
      type: 'text',
      label: 'Full Name',
      placeholder: 'Jane Doe',
      validators: { required: true, minLength: 2 },
    },
    {
      key: 'email',
      type: 'email',
      label: 'Email Address',
      placeholder: 'jane@example.com',
      validators: { required: true },
    },
    {
      key: 'message',
      type: 'text',
      label: 'Message',
      placeholder: 'Write your message here…',
      validators: { required: true, minLength: 10 },
    },
  ],
};

const registrationSchema: FormSchema = {
  layout: 'two-column',
  submitLabel: 'Create Account',
  cancelLabel: 'Back to Login',
  successMessage: 'Account created! Welcome aboard.',
  fields: [
    {
      key: 'firstName',
      type: 'text',
      label: 'First Name',
      placeholder: 'Jane',
      validators: { required: true },
    },
    {
      key: 'lastName',
      type: 'text',
      label: 'Last Name',
      placeholder: 'Doe',
      validators: { required: true },
    },
    {
      key: 'email',
      type: 'email',
      label: 'Email Address',
      placeholder: 'jane@example.com',
      validators: { required: true },
      colSpan: 2,
    },
    {
      key: 'password',
      type: 'password',
      label: 'Password',
      placeholder: '••••••••',
      helperText: 'Minimum 8 characters.',
      validators: { required: true, minLength: 8 },
    },
    {
      key: 'role',
      type: 'dropdown',
      label: 'Role',
      placeholder: 'Select a role',
      validators: { required: true },
      options: [
        { label: 'Developer', value: 'developer' },
        { label: 'Designer', value: 'designer' },
        { label: 'Product Manager', value: 'pm' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      key: 'newsletter',
      type: 'checkbox',
      label: 'Subscribe to newsletter',
      colSpan: 2,
    },
    {
      key: 'terms',
      type: 'checkbox',
      label: 'I agree to the Terms and Conditions',
      validators: { required: true },
      colSpan: 2,
    },
  ],
};

const profileSchema: FormSchema = {
  layout: 'two-column',
  submitLabel: 'Save Changes',
  successMessage: 'Profile updated successfully.',
  fields: [
    {
      key: 'displayName',
      type: 'text',
      label: 'Display Name',
      placeholder: 'jane_doe',
      validators: { required: true },
    },
    {
      key: 'website',
      type: 'url',
      label: 'Website',
      placeholder: 'https://example.com',
      helperText: 'Must start with https://',
    },
    {
      key: 'theme',
      type: 'radio',
      label: 'Theme',
      validators: { required: true },
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
        { label: 'System', value: 'system' },
      ],
    },
    {
      key: 'notifications',
      type: 'toggle',
      label: 'Enable email notifications',
      helperText: 'We will email you about important updates.',
      defaultValue: true,
    },
  ],
};

const allFieldsSchema: FormSchema = {
  submitLabel: 'Submit',
  cancelLabel: 'Reset',
  successMessage: 'Form submitted successfully!',
  fields: [
    { key: 'text', type: 'text', label: 'Text', placeholder: 'Plain text', validators: { required: true } },
    { key: 'email', type: 'email', label: 'Email', placeholder: 'you@example.com', validators: { required: true } },
    { key: 'password', type: 'password', label: 'Password', placeholder: '••••••••', validators: { required: true, minLength: 8 } },
    { key: 'number', type: 'number', label: 'Number', placeholder: '42', validators: { required: true } },
    { key: 'tel', type: 'tel', label: 'Phone', placeholder: '+1 555 000 0000' },
    { key: 'url', type: 'url', label: 'URL', placeholder: 'https://example.com' },
    {
      key: 'country',
      type: 'dropdown',
      label: 'Country',
      placeholder: 'Select country',
      validators: { required: true },
      options: [
        { label: 'United States', value: 'us' },
        { label: 'United Kingdom', value: 'uk' },
        { label: 'Canada', value: 'ca' },
        { label: 'India', value: 'in' },
      ],
    },
    {
      key: 'plan',
      type: 'radio',
      label: 'Plan',
      validators: { required: true },
      options: [
        { label: 'Free', value: 'free' },
        { label: 'Pro', value: 'pro' },
        { label: 'Enterprise', value: 'enterprise' },
      ],
    },
    { key: 'agree', type: 'checkbox', label: 'I accept the terms', validators: { required: true } },
    { key: 'darkMode', type: 'toggle', label: 'Enable dark mode', defaultValue: false },
  ],
};

// ─── Stories ──────────────────────────────────────────────────────────────────

export const ContactForm: Story = {
  args: {
    schema: contactSchema,
    loading: false,
  },
};

export const RegistrationForm: Story = {
  args: {
    schema: registrationSchema,
    loading: false,
  },
};

export const ProfileSettings: Story = {
  args: {
    schema: profileSchema,
    loading: false,
    initialValues: { theme: 'system', notifications: true },
  },
};

export const AllFieldTypes: Story = {
  name: 'All Field Types',
  args: {
    schema: allFieldsSchema,
    loading: false,
  },
};

export const LoadingState: Story = {
  args: {
    schema: contactSchema,
    loading: true,
  },
};

export const PrePopulated: Story = {
  args: {
    schema: registrationSchema,
    loading: false,
    initialValues: {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      role: 'designer',
      newsletter: true,
    },
  },
};

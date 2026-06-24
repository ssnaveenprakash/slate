import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { StepperComponent } from './stepper.component';
import { StepConfig } from './stepper.types';

const basicSteps: StepConfig[] = [
  { label: 'Account', description: 'Create your account' },
  { label: 'Profile', description: 'Set up your profile' },
  { label: 'Payment', description: 'Add payment details' },
  { label: 'Review', description: 'Confirm and submit' },
];

const meta: Meta<StepperComponent> = {
  title: 'Organisms/Stepper',
  component: StepperComponent,
  tags: ['autodocs'],
  argTypes: {
    activeStep: { control: { type: 'number', min: 0 } },
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
    linear: { control: 'boolean', description: 'Prevent skipping steps when true' },
    loading: { control: 'boolean' },
    nextLabel: { control: 'text' },
    backLabel: { control: 'text' },
    finishLabel: { control: 'text' },
  },
  args: {
    stepChange: fn(),
    finish: fn(),
    cancel: fn(),
  },
};

export default meta;
type Story = StoryObj<StepperComponent>;

export const Playground: Story = {
  args: {
    steps: basicSteps,
    activeStep: 1,
    linear: true,
    orientation: 'horizontal',
    loading: false,
    nextLabel: 'Next',
    backLabel: 'Back',
    finishLabel: 'Finish',
    errorSteps: [],
  },
  render: (args) => ({
    props: args,
    template: `
      <slt-stepper
        [steps]="steps"
        [activeStep]="activeStep"
        [linear]="linear"
        [orientation]="orientation"
        [loading]="loading"
        [nextLabel]="nextLabel"
        [backLabel]="backLabel"
        [finishLabel]="finishLabel"
        [errorSteps]="errorSteps"
        (stepChange)="activeStep = $event"
        (finish)="finish($event)"
        (cancel)="cancel($event)"
      >
        <p>Step {{ activeStep + 1 }} content goes here.</p>
      </slt-stepper>
    `,
  }),
};

export const LinearFlow: Story = {
  render: () => ({
    props: {
      steps: basicSteps,
      active: 0,
      contents: [
        'Fill in your email and password to create an account.',
        'Tell us a bit about yourself — name, avatar, bio.',
        'Add a credit or debit card to complete your subscription.',
        'Double-check your details and hit Finish to submit.',
      ],
    },
    template: `
      <slt-stepper
        [steps]="steps"
        [activeStep]="active"
        [linear]="true"
        (stepChange)="active = $event"
        (finish)="active = 0"
        (cancel)="active = 0"
      >
        <p>{{ contents[active] }}</p>
      </slt-stepper>
    `,
  }),
};

export const NonLinearFlow: Story = {
  render: () => ({
    props: {
      steps: basicSteps,
      active: 0,
    },
    template: `
      <div style="margin-bottom: 12px; font-size: 13px; color: #6b7280;">
        Non-linear: click any step header to jump directly to it.
      </div>
      <slt-stepper
        [steps]="steps"
        [activeStep]="active"
        [linear]="false"
        (stepChange)="active = $event"
        (finish)="active = 0"
        (cancel)="active = 0"
      >
        <p>Step {{ active + 1 }} — freely navigate between steps.</p>
      </slt-stepper>
    `,
  }),
};

export const WithOptionalStep: Story = {
  render: () => ({
    props: {
      steps: [
        { label: 'Account', description: 'Create your account' },
        { label: 'Profile', description: 'Set up your profile', optional: true },
        { label: 'Payment', description: 'Add payment details' },
        { label: 'Review', description: 'Confirm and submit' },
      ] as StepConfig[],
      active: 0,
    },
    template: `
      <slt-stepper
        [steps]="steps"
        [activeStep]="active"
        [linear]="true"
        (stepChange)="active = $event"
        (finish)="active = 0"
        (cancel)="active = 0"
      >
        <p>Step {{ active + 1 }} content. The Profile step is optional.</p>
      </slt-stepper>
    `,
  }),
};

export const WithErrorStep: Story = {
  render: () => ({
    props: {
      steps: basicSteps,
      active: 2,
      errors: [1],
    },
    template: `
      <slt-stepper
        [steps]="steps"
        [activeStep]="active"
        [linear]="false"
        [errorSteps]="errors"
        (stepChange)="active = $event"
        (finish)="active = 0"
        (cancel)="active = 0"
      >
        <p>Step 2 (Profile) has a validation error — indicated in the track above.</p>
      </slt-stepper>
    `,
  }),
};

export const VerticalOrientation: Story = {
  render: () => ({
    props: {
      steps: basicSteps,
      active: 1,
    },
    template: `
      <div style="max-width: 480px;">
        <slt-stepper
          [steps]="steps"
          [activeStep]="active"
          [linear]="true"
          orientation="vertical"
          (stepChange)="active = $event"
          (finish)="active = 0"
          (cancel)="active = 0"
        >
          <p>Step {{ active + 1 }} content in vertical layout.</p>
        </slt-stepper>
      </div>
    `,
  }),
};

export const LastStep: Story = {
  args: {
    steps: basicSteps,
    activeStep: 3,
    linear: true,
    errorSteps: [],
  },
  render: Playground.render,
};

export const LoadingState: Story = {
  args: {
    steps: basicSteps,
    activeStep: 2,
    linear: true,
    loading: true,
    errorSteps: [],
  },
  render: Playground.render,
};

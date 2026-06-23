import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { ModalComponent } from './modal.component';
import { ButtonComponent } from '../../atoms/button/button.component';

const meta: Meta<ModalComponent> = {
  title: 'Organisms/Modal',
  component: ModalComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ModalComponent, ButtonComponent],
    }),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'full'],
      description: 'Size of the modal container',
    },
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is visible',
    },
    title: {
      control: 'text',
      description: 'Modal title text',
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Close the modal when clicking outside',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show or hide the close button in the header',
    },
  },
  args: {
    isOpen: false,
    title: 'Modal Title',
    size: 'medium',
    closeOnBackdropClick: true,
    showCloseButton: true,
    onClose: fn(),
  },
};

export default meta;
type Story = StoryObj<ModalComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div>
        <storybook-button label="Open Modal" (onClick)="isOpen = true"></storybook-button>
        <storybook-modal
          [isOpen]="isOpen"
          (isOpenChange)="isOpen = $event"
          [title]="title"
          [size]="size"
          [closeOnBackdropClick]="closeOnBackdropClick"
          [showCloseButton]="showCloseButton"
          (onClose)="onClose()"
        >
          <p>This is the main body content of the modal. You can place any HTML elements or other components here.</p>
          <div modalFooter>
            <storybook-button variant="ghost" label="Cancel" (onClick)="isOpen = false"></storybook-button>
            <storybook-button label="Confirm" (onClick)="isOpen = false"></storybook-button>
          </div>
        </storybook-modal>
      </div>
    `,
  }),
  args: {
    isOpen: true,
    title: 'Interactive Modal',
    size: 'medium',
  },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 12px;">
        <storybook-button label="Open Small" (onClick)="smallOpen = true"></storybook-button>
        <storybook-button label="Open Medium" (onClick)="medOpen = true"></storybook-button>
        <storybook-button label="Open Large" (onClick)="largeOpen = true"></storybook-button>
        <storybook-button label="Open Full Screen" (onClick)="fullOpen = true"></storybook-button>

        <!-- Small Modal -->
        <storybook-modal [(isOpen)]="smallOpen" title="Small Modal" size="small">
          <p>This is a small size modal, best for alerts or quick confirmations.</p>
          <div modalFooter>
            <storybook-button label="Close" (onClick)="smallOpen = false"></storybook-button>
          </div>
        </storybook-modal>

        <!-- Medium Modal -->
        <storybook-modal [(isOpen)]="medOpen" title="Medium Modal" size="medium">
          <p>This is a medium size modal. It is the default size and works well for most general content.</p>
          <div modalFooter>
            <storybook-button label="Close" (onClick)="medOpen = false"></storybook-button>
          </div>
        </storybook-modal>

        <!-- Large Modal -->
        <storybook-modal [(isOpen)]="largeOpen" title="Large Modal" size="large">
          <p>This is a large size modal, suitable for displaying data tables, forms, or media content.</p>
          <div modalFooter>
            <storybook-button label="Close" (onClick)="largeOpen = false"></storybook-button>
          </div>
        </storybook-modal>

        <!-- Full Screen Modal -->
        <storybook-modal [(isOpen)]="fullOpen" title="Full Screen Modal" size="full">
          <p>This is a full screen modal. It takes up the entire viewport, ideal for rich experiences or multi-step wizard processes.</p>
          <div modalFooter>
            <storybook-button label="Close" (onClick)="fullOpen = false"></storybook-button>
          </div>
        </storybook-modal>
      </div>
    `,
  }),
};

export const StaticBackdrop: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div>
        <storybook-button label="Open Modal (Static Backdrop)" (onClick)="isOpen = true"></storybook-button>
        <storybook-modal
          [(isOpen)]="isOpen"
          [title]="title"
          [closeOnBackdropClick]="closeOnBackdropClick"
          (onClose)="onClose()"
        >
          <p>This modal cannot be closed by clicking the background overlay. You must click the close icon or actions below.</p>
          <div modalFooter>
            <storybook-button label="Understood" (onClick)="isOpen = false"></storybook-button>
          </div>
        </storybook-modal>
      </div>
    `,
  }),
  args: {
    isOpen: true,
    title: 'Static Backdrop Modal',
    closeOnBackdropClick: false,
  },
};

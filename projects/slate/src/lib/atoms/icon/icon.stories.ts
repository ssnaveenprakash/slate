import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';
import { IconComponent } from './icon.component';
import { CommonModule } from '@angular/common';

const meta: Meta<any> = {
  title: 'Atoms/Icon',
  component: IconComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, IconComponent]
    })
  ],
  argTypes: {
    type: { control: 'text' },
    theme: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'twoTone']
    },
    spin: { control: 'boolean' },
    dark: { control: 'boolean' }
  }
};

export default meta;

type Story = StoryObj<any>;

export const Playground: Story = {
  args: {
    type: 'user',
    theme: 'outlined',
    spin: false,
    dark: false
  },
  render: (args: any) => {
    if (args.dark) document.body.classList.add('theme-dark');
    else document.body.classList.remove('theme-dark');

    // Don't pass `dark` into component props
    const { dark: _d, ...componentProps } = args;

    return {
      props: componentProps,
      template: `
        <div style="padding: 24px; background: var(--slt-background-color); color: var(--slt-text-color);">
          <slt-icon [type]="type" [theme]="theme" [spin]="spin"></slt-icon>
        </div>
      `
    };
  }
};

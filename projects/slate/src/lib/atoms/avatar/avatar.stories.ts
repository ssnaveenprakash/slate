import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';
import { AvatarComponent } from './avatar.component';
import { IconComponent } from '../icon/icon.component';
import { CommonModule } from '@angular/common';

const meta: Meta<any> = {
  title: 'Atoms/Avatar',
  component: AvatarComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, AvatarComponent, IconComponent]
    })
  ],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['large', 'small', 'default']
    },
    shape: {
      control: { type: 'select' },
      options: ['circle', 'square']
    },
    src: { control: 'text' },
    alt: { control: 'text' },
    status: {
      control: { type: 'select' },
      options: [null, 'online', 'offline', 'away', 'busy']
    },
    dark: { control: 'boolean' },
    showIcon: { control: 'boolean' },
    iconType: { control: 'text' }
  }
};

export default meta;

type Story = StoryObj<any>;

export const Playground: Story = {
  args: {
    size: 'default',
    shape: 'circle',
    src: '',
    alt: 'John Doe',
    status: null,
    dark: false,
    showIcon: false,
    iconType: 'user'
  },
  render: (args: any) => {
    // toggle theme class
    if (args.dark) document.body.classList.add('theme-dark');
    else document.body.classList.remove('theme-dark');

    const iconTemplate = args.showIcon
      ? `<ng-template #myIcon><slt-icon [type]="iconType" [theme]="'outlined'"></slt-icon></ng-template>`
      : '';

    const iconBinding = args.showIcon ? `[icon]="myIcon"` : '';

    // remove non-component args from props to avoid Angular input warnings
    const { dark: _d, showIcon: _s, iconType: _i, ...componentProps } = args;
    return {
      props: { ...componentProps, iconType: args.iconType },
      template: `
          ${iconTemplate}
          <div style="padding: 24px; background: var(--slt-background-color);">
            <slt-avatar ${iconBinding} [size]="size" [shape]="shape" [src]="src" [alt]="alt" [status]="status"></slt-avatar>
          </div>
        `
    };
  }
};

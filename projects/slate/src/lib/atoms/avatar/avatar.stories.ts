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

// Grouped Size Stories
export const SizesLarge: Story = {
  args: { size: 'large', shape: 'circle', src: '', alt: 'Large Avatar', status: null, dark: false, showIcon: false, iconType: 'user' },
  render: (args: any) => {
    if (args.dark) document.body.classList.add('theme-dark');
    else document.body.classList.remove('theme-dark');
    const { dark: _d, showIcon: _s, iconType: _i, ...componentProps } = args;
    return {
      props: { ...componentProps },
      template: `<div style="padding:24px;background:var(--slt-background-color)"><slt-avatar [size]="size" [shape]="shape" [src]="src" [alt]="alt" [status]="status"></slt-avatar></div>`
    };
  }
};
(SizesLarge as any).storyName = 'Sizes/Large';

export const SizesDefault: Story = {
  args: { size: 'default', shape: 'circle', src: '', alt: 'Default Avatar', status: null, dark: false, showIcon: false, iconType: 'user' },
  render: (args: any) => {
    if (args.dark) document.body.classList.add('theme-dark');
    else document.body.classList.remove('theme-dark');
    const { dark: _d, showIcon: _s, iconType: _i, ...componentProps } = args;
    return {
      props: { ...componentProps },
      template: `<div style="padding:24px;background:var(--slt-background-color)"><slt-avatar [size]="size" [shape]="shape" [src]="src" [alt]="alt" [status]="status"></slt-avatar></div>`
    };
  }
};
(SizesDefault as any).storyName = 'Sizes/Default';

export const SizesSmall: Story = {
  args: { size: 'small', shape: 'circle', src: '', alt: 'Small Avatar', status: null, dark: false, showIcon: false, iconType: 'user' },
  render: (args: any) => {
    if (args.dark) document.body.classList.add('theme-dark');
    else document.body.classList.remove('theme-dark');
    const { dark: _d, showIcon: _s, iconType: _i, ...componentProps } = args;
    return {
      props: { ...componentProps },
      template: `<div style="padding:24px;background:var(--slt-background-color)"><slt-avatar [size]="size" [shape]="shape" [src]="src" [alt]="alt" [status]="status"></slt-avatar></div>`
    };
  }
};
(SizesSmall as any).storyName = 'Sizes/Small';

// Grouped Shape Stories
export const ShapeCircle: Story = {
  args: { size: 'default', shape: 'circle', src: '', alt: 'Circle Avatar', status: null, dark: false, showIcon: false, iconType: 'user' },
  render: (args: any) => {
    const { dark: _d, showIcon: _s, iconType: _i, ...componentProps } = args;
    return { props: { ...componentProps }, template: `<div style="padding:24px;background:var(--slt-background-color)"><slt-avatar [shape]="shape" [size]="size"></slt-avatar></div>` };
  }
};
(ShapeCircle as any).storyName = 'Shape/Circle';

export const ShapeSquare: Story = {
  args: { size: 'default', shape: 'square', src: '', alt: 'Square Avatar', status: "online", dark: false, showIcon: false, iconType: 'user' },
  render: (args: any) => {
    const { dark: _d, showIcon: _s, iconType: _i, ...componentProps } = args;
    return { props: { ...componentProps }, template: `<div style="padding:24px;background:var(--slt-background-color)"><slt-avatar [shape]="shape" [size]="size"></slt-avatar></div>` };
  }
};
(ShapeSquare as any).storyName = 'Shape/Square';

// Grouped Status Stories
export const StatusOnline: Story = {
  args: { size: 'default', shape: 'circle', status: 'online', dark: false, showIcon: false, iconType: 'user' },
  render: (args: any) => ({ props: args, template: `<div style="padding:24px;background:var(--slt-background-color)"><slt-avatar [status]="status"></slt-avatar></div>` }),
};
(StatusOnline as any).storyName = 'Status/Online';

export const StatusOffline: Story = {
  args: { size: 'default', shape: 'circle', status: 'offline', dark: false, showIcon: false, iconType: 'user' },
  render: (args: any) => ({ props: args, template: `<div style="padding:24px;background:var(--slt-background-color)"><slt-avatar [status]="status"></slt-avatar></div>` }),
};
(StatusOffline as any).storyName = 'Status/Offline';

export const StatusAway: Story = {
  args: { size: 'default', shape: 'circle', status: 'away', dark: false, showIcon: false, iconType: 'user' },
  render: (args: any) => ({ props: args, template: `<div style="padding:24px;background:var(--slt-background-color)"><slt-avatar [status]="status"></slt-avatar></div>` }),
};
(StatusAway as any).storyName = 'Status/Away';

export const StatusBusy: Story = {
  args: { size: 'default', shape: 'circle', status: 'busy', dark: false, showIcon: false, iconType: 'user' },
  render: (args: any) => ({ props: args, template: `<div style="padding:24px;background:var(--slt-background-color)"><slt-avatar [status]="status"></slt-avatar></div>` }),
};
(StatusBusy as any).storyName = 'Status/Busy';

// With Icon and Dark Theme Examples
export const WithIcon: Story = {
  args: { size: 'default', shape: 'circle', showIcon: true, iconType: 'user', dark: false },
  render: (args: any) => {
    if (args.dark) document.body.classList.add('theme-dark'); else document.body.classList.remove('theme-dark');
    const iconTemplate = args.showIcon ? `<ng-template #myIcon><slt-icon [type]="iconType" [theme]="'outlined'"></slt-icon></ng-template>` : '';
    const iconBinding = args.showIcon ? `[icon]="myIcon"` : '';
    const { dark: _d, showIcon: _s, iconType: _i, ...componentProps } = args;
    return { props: { ...componentProps }, template: `${iconTemplate}<div style="padding:24px;background:var(--slt-background-color)"><slt-avatar ${iconBinding} [size]="size"></slt-avatar></div>` };
  }
};
(WithIcon as any).storyName = 'Variants/With Icon';

export const DarkExample: Story = {
  args: { size: 'default', shape: 'circle', dark: true },
  render: (args: any) => {
    if (args.dark) document.body.classList.add('theme-dark'); else document.body.classList.remove('theme-dark');
    const { dark: _d, ...componentProps } = args;
    return { props: { ...componentProps }, template: `<div style="padding:24px;background:var(--slt-background-color)"><slt-avatar [size]="size"></slt-avatar></div>` };
  }
};
(DarkExample as any).storyName = 'Variants/Dark Theme';

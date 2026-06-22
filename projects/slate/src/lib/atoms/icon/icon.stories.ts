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
    size: { control: { type: 'select' }, options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    color: { control: { type: 'select' }, options: ['inherit', 'primary', 'secondary', 'success', 'warning', 'danger', 'muted'] },
    spin: { control: 'boolean' },
    svgContent: { control: 'text' },
    decorative: { control: 'boolean' },
    ariaLabel: { control: 'text' },
    dark: { control: 'boolean' }
  }
};

export default meta;

type Story = StoryObj<any>;

export const Playground: Story = {
  args: {
    type: 'user',
    theme: 'outlined',
    size: 'md',
    color: 'inherit',
    spin: false,
    decorative: true,
    ariaLabel: undefined,
    svgContent: undefined,
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
          <slt-icon [type]="type" [theme]="theme" [size]="size" [color]="color" [spin]="spin" [svgContent]="svgContent" [decorative]="decorative" [ariaLabel]="ariaLabel"></slt-icon>
        </div>
      `
    };
  }
};

// Grouped Theme Stories
export const ThemeOutlined: Story = {
  args: { type: 'user', theme: 'outlined', spin: false, dark: false },
  render: (args: any) => {
    if (args.dark) document.body.classList.add('theme-dark'); else document.body.classList.remove('theme-dark');
    const { dark: _d, ...componentProps } = args;
    return { props: componentProps, template: `<div style="padding:24px;background:var(--slt-background-color);color:var(--slt-text-color)"><slt-icon [type]="type" [theme]="theme" [size]="size" [color]="color"></slt-icon></div>` };
  }
};
(ThemeOutlined as any).storyName = 'Themes/Outlined';

export const ThemeFilled: Story = {
  args: { type: 'user', theme: 'filled', spin: false, dark: false, size: 'md', color: 'inherit' },
  render: (args: any) => {
    if (args.dark) document.body.classList.add('theme-dark'); else document.body.classList.remove('theme-dark');
    const { dark: _d, ...componentProps } = args;
    return { props: componentProps, template: `<div style="padding:24px;background:var(--slt-background-color);color:var(--slt-text-color)"><slt-icon [type]="type" [theme]="theme" [size]="size" [color]="color"></slt-icon></div>` };
  }
};
(ThemeFilled as any).storyName = 'Themes/Filled';

export const ThemeTwoTone: Story = {
  args: { type: 'user', theme: 'twoTone', spin: false, dark: false, size: 'md', color: 'primary' },
  render: (args: any) => {
    if (args.dark) document.body.classList.add('theme-dark'); else document.body.classList.remove('theme-dark');
    const { dark: _d, ...componentProps } = args;
    return { props: componentProps, template: `<div style="padding:24px;background:var(--slt-background-color);color:var(--slt-text-color)"><slt-icon [type]="type" [theme]="theme" [size]="size" [color]="color"></slt-icon></div>` };
  }
};
(ThemeTwoTone as any).storyName = 'Themes/TwoTone';

// Spin stories
export const SpinOff: Story = {
  args: { type: 'loading', theme: 'outlined', spin: false, dark: false },
  render: (args: any) => {
    const { dark: _d, ...componentProps } = args;
    return { props: componentProps, template: `<div style="padding:24px;background:var(--slt-background-color)"><slt-icon [type]="type" [theme]="theme" [spin]="spin"></slt-icon></div>` };
  }
};
(SpinOff as any).storyName = 'Spin/Off';

export const SpinOn: Story = {
  args: { type: 'loading', theme: 'outlined', spin: true, dark: false },
  render: (args: any) => {
    const { dark: _d, ...componentProps } = args;
    return { props: componentProps, template: `<div style="padding:24px;background:var(--slt-background-color)"><slt-icon [type]="type" [theme]="theme" [spin]="spin"></slt-icon></div>` };
  }
};
(SpinOn as any).storyName = 'Spin/On';

// Dark theme example
export const DarkExample: Story = {
  args: { type: 'user', theme: 'outlined', spin: false, dark: true },
  render: (args: any) => {
    if (args.dark) document.body.classList.add('theme-dark'); else document.body.classList.remove('theme-dark');
    const { dark: _d, ...componentProps } = args;
    return { props: componentProps, template: `<div style="padding:24px;background:var(--slt-background-color);color:var(--slt-text-color)"><slt-icon [type]="type" [theme]="theme"></slt-icon></div>` };
  }
};
(DarkExample as any).storyName = 'Variants/Dark Theme';

// Sizes showcase
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="padding:24px; display:flex; gap:16px; align-items:center; background:var(--slt-background-color); color:var(--slt-text-color)">
        <slt-icon type="user" size="xs"></slt-icon>
        <slt-icon type="user" size="sm"></slt-icon>
        <slt-icon type="user" size="md"></slt-icon>
        <slt-icon type="user" size="lg"></slt-icon>
        <slt-icon type="user" size="xl"></slt-icon>
      </div>
    `
  })
};
(Sizes as any).storyName = 'Variants/Sizes';

// Color token showcase
export const Colors: Story = {
  render: () => ({
    template: `
      <div style="padding:24px; display:flex; gap:20px; align-items:center; background:var(--slt-background-color); color:var(--slt-text-color)">
        <slt-icon type="user" color="inherit"></slt-icon>
        <slt-icon type="user" color="primary"></slt-icon>
        <slt-icon type="user" color="secondary"></slt-icon>
        <slt-icon type="user" color="success"></slt-icon>
        <slt-icon type="user" color="warning"></slt-icon>
        <slt-icon type="user" color="danger"></slt-icon>
        <slt-icon type="user" color="muted"></slt-icon>
      </div>
    `
  })
};
(Colors as any).storyName = 'Variants/Colors';

// svgContent override example
export const SvgOverride: Story = {
  args: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="currentColor"/></svg>`,
    size: 'lg'
  },
  render: (args: any) => {
    const { svgContent, ...props } = args;
    return { props: { svgContent, ...props }, template: `<div style="padding:24px;background:var(--slt-background-color)"><slt-icon [svgContent]="svgContent" [size]="size"></slt-icon></div>` };
  }
};
(SvgOverride as any).storyName = 'Override/SVG Content';

// Accessibility examples
export const Accessibility: Story = {
  render: () => ({
    template: `
      <div style="padding:24px;background:var(--slt-background-color);color:var(--slt-text-color);display:flex;flex-direction:column;gap:12px">
        <div>Decorative (default): <slt-icon type="user"></slt-icon></div>
        <div>Informative (non-decorative): <slt-icon type="close" [decorative]="false" aria-label="Close"></slt-icon></div>
      </div>
    `
  })
};
(Accessibility as any).storyName = 'Accessibility/Examples';

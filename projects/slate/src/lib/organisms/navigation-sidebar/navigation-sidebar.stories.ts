import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';
import { NavigationSidebarComponent, NavigationSidebarItem } from './navigation-sidebar.component';

const navigationItems: NavigationSidebarItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: 'home' },
  { label: 'Projects', href: '/projects', icon: 'folder' },
  { label: 'Teams', href: '/teams', icon: 'team' },
  { label: 'Settings', href: '/settings', icon: 'setting', disabled: true },
];

const meta: Meta<NavigationSidebarComponent> = {
  title: 'Organisms/Navigation Sidebar',
  component: NavigationSidebarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NavigationSidebarComponent],
    }),
  ],
  args: {
    items: navigationItems,
    activeHref: '/dashboard',
    collapsed: false,
  },
  argTypes: {
    items: { control: false },
    activeHref: { control: 'text' },
    collapsed: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<NavigationSidebarComponent>;

export const Default: Story = {
  args: {
    activeHref: '/dashboard',
    collapsed: false,
  },
};

export const Collapsed: Story = {
  args: {
    activeHref: '/dashboard',
    collapsed: true,
  },
};

export const ActiveRouteExample: Story = {
  args: {
    activeHref: '/projects',
    collapsed: false,
  },
};

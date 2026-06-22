import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { SearchBarComponent } from './search-bar.component';

const meta: Meta<SearchBarComponent> = {
  title: 'Molecules/SearchBar',
  component: SearchBarComponent,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text', description: 'Current search value' },
    placeholder: { control: 'text', description: 'Placeholder text' },
    disabled: { control: 'boolean' },
    ariaLabel: { control: 'text', description: 'Accessible label for the input' },
  },
  args: {
    valueChange: fn(),
    cleared: fn(),
  },
};

export default meta;
type Story = StoryObj<SearchBarComponent>;

export const Playground: Story = {
  args: {
    value: '',
    placeholder: 'Search…',
    disabled: false,
  },
};

export const WithValue: Story = {
  args: {
    value: 'Angular components',
    placeholder: 'Search…',
  },
};

export const Disabled: Story = {
  args: {
    value: '',
    placeholder: 'Search unavailable',
    disabled: true,
  },
};

export const CustomPlaceholder: Story = {
  args: {
    value: '',
    placeholder: 'Search by name, email, or role…',
  },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="width: 240px;">
          <slt-search-bar placeholder="Compact (240px)"></slt-search-bar>
        </div>
        <div style="width: 400px;">
          <slt-search-bar placeholder="Medium (400px)"></slt-search-bar>
        </div>
        <div style="width: 100%;">
          <slt-search-bar placeholder="Full width"></slt-search-bar>
        </div>
      </div>
    `,
  }),
};

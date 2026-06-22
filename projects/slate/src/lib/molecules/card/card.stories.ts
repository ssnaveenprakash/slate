import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { CardComponent } from './card.component';

const meta: Meta<CardComponent> = {
  title: 'Molecules/Card',
  component: CardComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['flat', 'raised'],
      description: 'Visual surface variant',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Internal spacing density',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the card container',
    },
  },
  args: {
    variant: 'flat',
    size: 'medium',
  },
};

export default meta;
type Story = StoryObj<CardComponent>;

export const Playground: Story = {
  args: {
    variant: 'flat',
    size: 'medium',
    ariaLabel: 'Example card',
  },
  render: (args) => ({
    props: args,
    template: `
      <storybook-card [variant]="variant" [size]="size" [ariaLabel]="ariaLabel">
        <div cardHeader>
          <h3 style="margin:0">Card Header</h3>
        </div>

        <p style="margin:0">This is the main body content of the card. It accepts arbitrary projection.</p>

        <div cardFooter>
          <div style="display:flex;justify-content:flex-end;gap:8px">
            <button>Cancel</button>
            <button>Save</button>
          </div>
        </div>
      </storybook-card>
    `,
  }),
};

/* Variant and Size examples are provided in separate grouped story files:
   - card.variants.stories.ts
   - card.sizes.stories.ts
   This keeps the sidebar organized under "Molecules/Card/Variants" and
   "Molecules/Card/Sizes" while retaining other examples here.
*/

export const HeaderOnly: Story = {
  render: () => ({
    template: `
      <storybook-card>
        <div cardHeader>
          <strong>Only Header</strong>
        </div>
      </storybook-card>
    `,
  }),
};

export const FooterOnly: Story = {
  render: () => ({
    template: `
      <storybook-card>
        <div cardFooter>
          <small>Footer content</small>
        </div>
      </storybook-card>
    `,
  }),
};

export const HeaderBodyFooter: Story = {
  render: () => ({
    template: `
      <storybook-card>
        <div cardHeader>
          <strong>Header</strong>
        </div>
        <p>Body content goes here. Use atoms like <code>&lt;storybook-typography&gt;</code> inside.</p>
        <div cardFooter>
          <small>Footer</small>
        </div>
      </storybook-card>
    `,
  }),
};

export const LongContent: Story = {
  render: () => ({
    template: `
      <storybook-card>
        <div cardHeader>
          <strong>Long Content</strong>
        </div>
        <div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
          <p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.</p>
        </div>
      </storybook-card>
    `,
  }),
};

export const DarkTheme: Story = {
  render: () => ({
    template: `
      <div class="theme-dark" style="padding:24px">
        <storybook-card variant="raised">
          <ng-container cardHeader><strong>Dark Theme</strong></ng-container>
          <div>Card adapts via design tokens.</div>
        </storybook-card>
      </div>
    `,
  }),
};

export const TokenShowcase: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:16px;flex-direction:column;max-width:600px">
        <div style="display:flex;gap:12px;align-items:center">
          <div style="width:56px;height:40px;border-radius:4px;border:1px solid var(--slt-border-color-base);background:var(--slt-background-color)"></div>
          <div>
            <div style="font-weight:600">Surface</div>
            <div style="font-size:12px;color:var(--slt-text-color-secondary)"><code>var(--slt-background-color)</code></div>
          </div>
        </div>

        <div style="display:flex;gap:12px;align-items:center">
          <div style="width:120px;padding:8px;border-radius:6px;background:var(--slt-background-color);box-shadow:var(--slt-box-shadow-base)">Elevated</div>
          <div>
            <div style="font-weight:600">Elevation</div>
            <div style="font-size:12px;color:var(--slt-text-color-secondary)"><code>var(--slt-box-shadow-base)</code></div>
          </div>
        </div>
      </div>
    `,
  }),
};

// Grouped Variant stories (appear under the same component; storyName uses a
// slash so docs/ordering tools show hierarchical labels in some Storybook UIs.)
export const VariantsFlat: Story = {
  args: { variant: 'flat', size: 'medium' },
  render: (args) => ({
    props: args,
    template: `
      <storybook-card [variant]="variant" [size]="size">
        <div cardHeader><strong>Flat</strong></div>
        <div>Simple flat surface example</div>
      </storybook-card>
    `,
  }),
};
(VariantsFlat as any).storyName = 'Variants/Flat';

export const VariantsRaised: Story = {
  args: { variant: 'raised', size: 'medium' },
  render: (args) => ({
    props: args,
    template: `
      <storybook-card [variant]="variant" [size]="size">
        <div cardHeader><strong>Raised</strong></div>
        <div>Elevated surface using tokenized shadow</div>
      </storybook-card>
    `,
  }),
};
(VariantsRaised as any).storyName = 'Variants/Raised';

// Grouped Size stories
export const SizesSmall: Story = {
  args: { size: 'small', variant: 'flat' },
  render: (args) => ({
    props: args,
    template: `
      <storybook-card [variant]="variant" [size]="size">
        <div cardHeader><strong>Small</strong></div>
        <div>Compact content</div>
      </storybook-card>
    `,
  }),
};
(SizesSmall as any).storyName = 'Sizes/Small';

export const SizesMedium: Story = {
  args: { size: 'medium', variant: 'flat' },
  render: (args) => ({
    props: args,
    template: `
      <storybook-card [variant]="variant" [size]="size">
        <div cardHeader><strong>Medium</strong></div>
        <div>Standard content</div>
      </storybook-card>
    `,
  }),
};
(SizesMedium as any).storyName = 'Sizes/Medium';

export const SizesLarge: Story = {
  args: { size: 'large', variant: 'flat' },
  render: (args) => ({
    props: args,
    template: `
      <storybook-card [variant]="variant" [size]="size">
        <div cardHeader><strong>Large</strong></div>
        <div>Spacious content with more padding</div>
      </storybook-card>
    `,
  }),
};
(SizesLarge as any).storyName = 'Sizes/Large';

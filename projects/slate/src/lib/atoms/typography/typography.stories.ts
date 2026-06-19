import type { Meta, StoryObj } from '@storybook/angular';
import { TypographyComponent } from './typography.component';

const meta: Meta<TypographyComponent> = {
  title: 'Atoms/Typography',
  component: TypographyComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['title', 'text', 'paragraph', 'link'],
      description: 'The type of element to render',
    },
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 5],
      description: 'Heading level (only applies to variant: "title")',
    },
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Semantic color styles for the text',
    },
    strong: {
      control: 'boolean',
      description: 'Applies bold text styling',
    },
    italic: {
      control: 'boolean',
      description: 'Applies italic text styling',
    },
    underline: {
      control: 'boolean',
      description: 'Applies underlined text styling',
    },
    delete: {
      control: 'boolean',
      description: 'Applies line-through text styling',
    },
    code: {
      control: 'boolean',
      description: 'Wraps content in semantic <code> block styling',
    },
    mark: {
      control: 'boolean',
      description: 'Wraps content in high-visibility mark highlighting',
    },
    disabled: {
      control: 'boolean',
      description: 'Mutes and disables interaction (only link variant)',
    },
    href: {
      control: 'text',
      description: 'Hyperlink path (only applies to variant: "link")',
    },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
      description: 'Hyperlink target behavior (only applies to variant: "link")',
    },
  },
};

export default meta;
type Story = StoryObj<TypographyComponent>;

export const Playground: Story = {
  args: {
    variant: 'text',
    level: 1,
    type: 'primary',
    strong: false,
    italic: false,
    underline: false,
    delete: false,
    code: false,
    mark: false,
    disabled: false,
    href: '',
    target: '_self',
  },
  render: (args) => ({
    props: args,
    template: `
      <storybook-typography
        [variant]="variant"
        [level]="level"
        [type]="type"
        [strong]="strong"
        [italic]="italic"
        [underline]="underline"
        [delete]="delete"
        [code]="code"
        [mark]="mark"
        [disabled]="disabled"
        [href]="href"
        [target]="target"
      >
        Typography Content
      </storybook-typography>
    `,
  }),
};

export const Titles: Story = {
  render: () => ({
    template: `
      <div>
        <storybook-typography variant="title" [level]="1">H1. Slate Heading</storybook-typography>
        <storybook-typography variant="title" [level]="2">H2. Slate Heading</storybook-typography>
        <storybook-typography variant="title" [level]="3">H3. Slate Heading</storybook-typography>
        <storybook-typography variant="title" [level]="4">H4. Slate Heading</storybook-typography>
        <storybook-typography variant="title" [level]="5">H5. Slate Heading</storybook-typography>
      </div>
    `,
  }),
};

export const Types: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <storybook-typography type="primary">Primary text color (default)</storybook-typography>
        <storybook-typography type="secondary">Secondary description text color</storybook-typography>
        <storybook-typography type="success">Success state text color</storybook-typography>
        <storybook-typography type="warning">Warning status warning text color</storybook-typography>
        <storybook-typography type="danger">Danger error text color</storybook-typography>
      </div>
    `,
  }),
};

export const Modifiers: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <storybook-typography [strong]="true">Strong text (bold)</storybook-typography>
        <storybook-typography [italic]="true">Italicized text</storybook-typography>
        <storybook-typography [underline]="true">Underlined text</storybook-typography>
        <storybook-typography [delete]="true">Strikethrough text</storybook-typography>
        <div>
          <storybook-typography [code]="true">npm install slate-ui</storybook-typography>
        </div>
        <div>
          <storybook-typography [mark]="true">Highlighted text (mark)</storybook-typography>
        </div>
        <storybook-typography [disabled]="true">Disabled read-only text</storybook-typography>
        <storybook-typography [strong]="true" [italic]="true" [underline]="true">
          Multiple formatting combined (Bold + Italic + Underlined)
        </storybook-typography>
      </div>
    `,
  }),
};

export const ParagraphAndLinks: Story = {
  render: () => ({
    template: `
      <div>
        <storybook-typography variant="title" [level]="3">Paragraphs and Links</storybook-typography>
        
        <storybook-typography variant="paragraph" type="secondary">
          This is a paragraph variant which creates vertical margins. You can nest other custom styling elements within it or mix links directly. Below you will find interactive hyperlink components.
        </storybook-typography>

        <storybook-typography variant="paragraph">
          For more information, please visit our documentation or checkout the 
          <storybook-typography variant="link" href="https://github.com" target="_blank">external GitHub repository</storybook-typography> 
          for open-source contributions.
        </storybook-typography>

        <div style="display: flex; gap: 16px;">
          <storybook-typography variant="link" href="#">Internal Page Link</storybook-typography>
          <storybook-typography variant="link" href="#" [disabled]="true">Disabled Link</storybook-typography>
        </div>
      </div>
    `,
  }),
};

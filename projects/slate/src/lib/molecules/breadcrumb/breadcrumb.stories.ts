import type { Meta, StoryObj } from '@storybook/angular';
import { BreadcrumbComponent } from './breadcrumb.component';

const meta: Meta<BreadcrumbComponent> = {
    title: 'Molecules/Breadcrumb',
    component: BreadcrumbComponent,
    tags: ['autodocs'],
    argTypes: {
        separator: {
            control: 'text',
            description: 'Character or text displayed between breadcrumb items',
        },
        ariaLabel: {
            control: 'text',
            description: 'Accessible label for the breadcrumb navigation',
        },
    },
};

export default meta;

type Story = StoryObj<BreadcrumbComponent>;

export const Playground: Story = {
    args: {
        separator: '/',
        ariaLabel: 'Breadcrumb',
        items: [
            { label: 'Home', href: '#' },
            { label: 'Products', href: '#' },
            { label: 'Headphones' },
        ],
    },
};

export const LongLabels: Story = {
    render: () => ({
        template: `
            <storybook-breadcrumb
                ariaLabel="Breadcrumb"
                separator="›"
                [items]="[
                    { label: 'Dashboard', href: '#' },
                    { label: 'Analytics workspace', href: '#' },
                    { label: 'Quarterly report with longer text' }
                ]"
            ></storybook-breadcrumb>
        `,
    }),
};

export const DisabledStep: Story = {
    render: () => ({
        template: `
            <storybook-breadcrumb
                ariaLabel="Breadcrumb"
                [items]="[
                    { label: 'Library', href: '#' },
                    { label: 'Collections', disabled: true },
                    { label: 'Featured set' }
                ]"
            ></storybook-breadcrumb>
        `,
    }),
};
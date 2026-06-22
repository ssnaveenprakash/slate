import type { Meta, StoryObj } from '@storybook/angular';
import { PaginationComponent } from './pagination.component';

const meta: Meta<PaginationComponent> = {
    title: 'Molecules/Pagination',
    component: PaginationComponent,
    tags: ['autodocs'],
    argTypes: {
        currentPage: {
            control: { type: 'number', min: 1 },
            description: 'Current active page number',
        },
        totalPages: {
            control: { type: 'number', min: 0 },
            description: 'Total number of pages available',
        },
        boundaryCount: {
            control: { type: 'number', min: 0 },
            description: 'Number of pages to always show at the start and end',
        },
        siblingCount: {
            control: { type: 'number', min: 0 },
            description: 'Number of neighboring pages to show around the current page',
        },
        disabled: {
            control: 'boolean',
            description: 'Disables navigation controls and page selection',
        },
        ariaLabel: {
            control: 'text',
            description: 'Accessible label for the pagination navigation',
        },
        pageChange: {
            action: 'pageChange',
            description: 'Emitted when the user selects a new page',
        },
    },
};

export default meta;

type Story = StoryObj<PaginationComponent>;

export const Playground: Story = {
    args: {
        currentPage: 4,
        totalPages: 12,
        boundaryCount: 1,
        siblingCount: 1,
        disabled: false,
        ariaLabel: 'Pagination',
    },
};

export const Compact: Story = {
    args: {
        currentPage: 2,
        totalPages: 4,
        boundaryCount: 1,
        siblingCount: 0,
        disabled: false,
        ariaLabel: 'Pagination',
    },
};

export const ManyPages: Story = {
    render: () => ({
        template: `
            <storybook-pagination
                [currentPage]="10"
                [totalPages]="42"
                [boundaryCount]="2"
                [siblingCount]="2"
                ariaLabel="Pagination"
            ></storybook-pagination>
        `,
    }),
};
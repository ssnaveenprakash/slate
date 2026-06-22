import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { DropdownComponent, DropdownOptionOrGroup } from './dropdown.component';

const flatOptions: DropdownOptionOrGroup[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
    { label: 'Orange', value: 'orange' },
    { label: 'Lime', value: 'lime' },
    { label: 'Strawberry', value: 'strawberry' },
    { label: 'Blueberry', value: 'blueberry' },
    { label: 'Raspberry', value: 'raspberry' },
];

const groupedOptions: DropdownOptionOrGroup[] = [
    {
        label: 'Citrus',
        options: [
            { label: 'Orange', value: 'orange' },
            { label: 'Lemon', value: 'lemon', disabled: true },
            { label: 'Lime', value: 'lime' },
        ]
    },
    {
        label: 'Berries',
        options: [
            { label: 'Strawberry', value: 'strawberry' },
            { label: 'Blueberry', value: 'blueberry' },
            { label: 'Raspberry', value: 'raspberry' },
        ]
    }
];

const meta: Meta<any> = {
    title: 'Molecules/Dropdown',
    component: DropdownComponent,
    decorators: [
        moduleMetadata({
            imports: [CommonModule, DropdownComponent],
        }),
    ],
    argTypes: {
        multiple: { control: 'boolean' },
        searchable: { control: 'boolean' },
        disabled: { control: 'boolean' },
        allowClear: { control: 'boolean' },
        placeholder: { control: 'text' },
        notFoundText: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj<any>;

export const SingleSelect: Story = {
    args: {
        options: flatOptions,
        multiple: false,
        searchable: true,
        placeholder: 'Select a fruit',
    },
};

export const MultiSelect: Story = {
    args: {
        options: flatOptions,
        multiple: true,
        searchable: true,
        placeholder: 'Select fruits',
    },
};

export const GroupedSingleSelect: Story = {
    args: {
        options: groupedOptions,
        multiple: false,
        searchable: true,
        placeholder: 'Choose grouped fruit',
    },
};

export const GroupedMultiSelect: Story = {
    args: {
        options: groupedOptions,
        multiple: true,
        searchable: true,
        placeholder: 'Choose grouped fruits',
    },
};

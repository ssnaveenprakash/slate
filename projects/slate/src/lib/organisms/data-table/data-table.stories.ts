import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { DataTableComponent, TableCellTemplateDirective } from './data-table.component';
import { AvatarComponent } from '../../atoms/avatar/avatar.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { DropdownComponent } from '../../molecules/dropdown/dropdown.component';
import { SearchBarComponent } from '../../molecules/search-bar/search-bar.component';
import { PaginationComponent } from '../../molecules/pagination/pagination.component';
import { DataTableColumn, DataTableAction } from './data-table.types';

const mockData = [
  { id: 1, name: 'Alice Johnson', email: 'alice.j@example.com', age: 28, joinDate: '2023-01-15', status: 'active', role: 'Developer' },
  { id: 2, name: 'Bob Smith', email: 'bob.smith@example.com', age: 34, joinDate: '2022-06-20', status: 'inactive', role: 'Designer' },
  { id: 3, name: 'Charlie Brown', email: 'charlie.b@example.com', age: 22, joinDate: '2024-03-01', status: 'active', role: 'Intern' },
  { id: 4, name: 'Diana Prince', email: 'diana.p@example.com', age: 29, joinDate: '2021-11-10', status: 'pending', role: 'Manager' },
  { id: 5, name: 'Evan Wright', email: 'evan.w@example.com', age: 41, joinDate: '2020-04-05', status: 'active', role: 'Director' },
  { id: 6, name: 'Fiona Gallagher', email: 'fiona.g@example.com', age: 25, joinDate: '2023-08-12', status: 'active', role: 'Support' },
  { id: 7, name: 'George Costanza', email: 'george.c@example.com', age: 39, joinDate: '2022-09-30', status: 'inactive', role: 'Administrator' },
  { id: 8, name: 'Helen Parr', email: 'helen.p@example.com', age: 31, joinDate: '2021-02-28', status: 'active', role: 'Consultant' },
  { id: 9, name: 'Ian Malcolm', email: 'ian.m@example.com', age: 45, joinDate: '2019-07-15', status: 'warning', role: 'Scientist' },
  { id: 10, name: 'Julia Roberts', email: 'julia.r@example.com', age: 36, joinDate: '2020-12-01', status: 'active', role: 'Marketing' },
  { id: 11, name: 'Kevin Bacon', email: 'kevin.b@example.com', age: 52, joinDate: '2018-05-20', status: 'active', role: 'Sales' },
  { id: 12, name: 'Lois Lane', email: 'lois.l@example.com', age: 30, joinDate: '2022-10-15', status: 'active', role: 'Journalist' },
];

const defaultColumns: DataTableColumn[] = [
  { key: 'name', label: 'Name', sortable: true, width: '200px' },
  { key: 'email', label: 'Email', width: '250px' },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'age', label: 'Age', sortable: true, align: 'right', type: 'number', width: '80px' },
  { key: 'joinDate', label: 'Join Date', sortable: true, type: 'date', width: '120px' },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    type: 'badge',
    width: '120px',
    badgeMap: {
      active: { label: 'Active', variant: 'success' },
      inactive: { label: 'Inactive', variant: 'neutral' },
      pending: { label: 'Pending', variant: 'warning' },
      warning: { label: 'Review Required', variant: 'error' },
    },
  },
  { key: 'actions', label: 'Actions', type: 'actions', align: 'center', width: '150px' },
];

const defaultActions: DataTableAction[] = [
  { id: 'edit', label: 'Edit', variant: 'secondary' },
  { id: 'delete', label: 'Delete', variant: 'danger' },
];

const meta: Meta<DataTableComponent> = {
  title: 'Organisms/Data Table',
  component: DataTableComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        DataTableComponent,
        TableCellTemplateDirective,
        AvatarComponent,
        ButtonComponent,
        DropdownComponent,
        SearchBarComponent,
        PaginationComponent,
      ],
    }),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Density of the table rows and cells',
    },
    striped: {
      control: 'boolean',
      description: 'Zebra stripe rows for alternate lines',
    },
    bordered: {
      control: 'boolean',
      description: 'Adds grid borders to the table cells',
    },
    hover: {
      control: 'boolean',
      description: 'Highlight rows on mouse hover',
    },
    showSelection: {
      control: 'boolean',
      description: 'Show checkbox column for row selection',
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading spinner overlay and disables sorting',
    },
  },
  args: {
    columns: defaultColumns,
    data: mockData,
    actions: defaultActions,
    pageSize: 5,
    currentPage: 1,
    pageSizeOptions: [5, 10, 20],
    striped: false,
    bordered: false,
    hover: true,
    showSelection: false,
    loading: false,
    actionClick: fn(),
    selectionChange: fn(),
    sortChange: fn(),
    pageChange: fn(),
    pageSizeChange: fn(),
  },
};

export default meta;
type Story = StoryObj<DataTableComponent>;

export const Default: Story = {
  args: {},
};

export const Selection: Story = {
  args: {
    showSelection: true,
  },
};

export const VisualVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div>
          <h3 style="margin-bottom: 8px;">Striped</h3>
          <slt-data-table [columns]="columns" [data]="data" [actions]="actions" [pageSize]="5" [striped]="true"></slt-data-table>
        </div>
        <div>
          <h3 style="margin-bottom: 8px;">Bordered</h3>
          <slt-data-table [columns]="columns" [data]="data" [actions]="actions" [pageSize]="5" [bordered]="true"></slt-data-table>
        </div>
        <div>
          <h3 style="margin-bottom: 8px;">Small Density</h3>
          <slt-data-table [columns]="columns" [data]="data" [actions]="actions" [pageSize]="5" size="small"></slt-data-table>
        </div>
      </div>
    `,
  }),
  args: {
    columns: defaultColumns,
    data: mockData,
    actions: defaultActions,
  },
};

export const CustomTemplates: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div>
        <slt-data-table
          [columns]="columns"
          [data]="data"
          [actions]="actions"
          [pageSize]="5"
          (actionClick)="actionClick($event)"
        >
          <!-- Custom template for name column incorporating slt-avatar -->
          <ng-template sltTableCell="name" let-value let-row="row">
            <div style="display: flex; align-items: center; gap: 8px;">
              <slt-avatar [alt]="value" size="small" [status]="row.status === 'active' ? 'online' : 'offline'"></slt-avatar>
              <div style="display: flex; flex-direction: column;">
                <span style="font-weight: 600;">{{ value }}</span>
                <span style="font-size: 11px; color: #888;">ID: {{ row.id }}</span>
              </div>
            </div>
          </ng-template>

          <!-- Custom template for email column to render clickable link -->
          <ng-template sltTableCell="email" let-value>
            <a href="mailto:{{value}}" style="color: var(--slt-primary-color); text-decoration: none;">
              {{ value }}
            </a>
          </ng-template>
        </slt-data-table>
      </div>
    `,
  }),
  args: {
    columns: defaultColumns,
    data: mockData,
    actions: defaultActions,
    actionClick: fn(),
  },
};

export const LoadingState: Story = {
  args: {
    loading: true,
  },
};

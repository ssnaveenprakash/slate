export type DataTableColumnType = 'text' | 'number' | 'date' | 'badge' | 'actions';

export interface DataTableBadgeConfig {
  label: string;
  variant: 'success' | 'warning' | 'error' | 'info' | 'neutral';
}

export interface DataTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string;
  type?: DataTableColumnType;
  badgeMap?: Record<string, DataTableBadgeConfig>;
}

export interface DataTableSort {
  column: string;
  direction: 'asc' | 'desc' | '';
}

export interface DataTableAction {
  id: string;
  label: string;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  disabled?: boolean;
}

export interface DataTableActionClickEvent {
  actionId: string;
  row: any;
}

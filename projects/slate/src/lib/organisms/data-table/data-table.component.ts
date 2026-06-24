import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
  Directive,
  TemplateRef,
  ContentChildren,
  QueryList,
  AfterContentInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../molecules/search-bar/search-bar.component';
import { PaginationComponent } from '../../molecules/pagination/pagination.component';
import { DropdownComponent, DropdownOption } from '../../molecules/dropdown/dropdown.component';
import { IconComponent } from '../../atoms/icon/icon.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import {
  DataTableColumn,
  DataTableSort,
  DataTableAction,
  DataTableActionClickEvent,
  DataTableBadgeConfig,
} from './data-table.types';

@Directive({
  selector: '[sltTableCell]',
  standalone: true,
})
export class TableCellTemplateDirective {
  @Input('sltTableCell') columnName!: string;
  constructor(public template: TemplateRef<any>) {}
}

@Component({
  selector: 'slt-data-table',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    PaginationComponent,
    DropdownComponent,
    IconComponent,
    ButtonComponent,
    TableCellTemplateDirective,
  ],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit, OnChanges, AfterContentInit {
  @Input() columns: DataTableColumn[] = [];
  @Input() data: any[] = [];
  @Input() loading = false;
  @Input() totalItems = 0; // Required for server-side pagination
  @Input() pageSize = 10;
  @Input() currentPage = 1;
  @Input() pageSizeOptions: number[] = [5, 10, 20, 50];
  @Input() serverSide = false;
  @Input() showSelection = false;
  @Input() striped = false;
  @Input() bordered = false;
  @Input() hover = true;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() actions: DataTableAction[] = [];
  @Input() searchPlaceholder = 'Search table...';

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<DataTableSort>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() selectionChange = new EventEmitter<any[]>();
  @Output() actionClick = new EventEmitter<DataTableActionClickEvent>();

  @ContentChildren(TableCellTemplateDirective)
  templateList!: QueryList<TableCellTemplateDirective>;

  // Map to store custom cell templates by column key
  customTemplates: Record<string, TemplateRef<any>> = {};

  // Internal states
  searchTerm = '';
  sortState: DataTableSort = { column: '', direction: '' };
  selectedRows = new Set<any>();

  // Processed data cache (client-side only)
  processedData: any[] = [];
  paginatedData: any[] = [];

  // Dropdown options for page size selector
  pageSizeDropdownOptions: DropdownOption[] = [];

  ngOnInit(): void {
    this.updatePageSizeOptions();
    this.processData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pageSizeOptions']) {
      this.updatePageSizeOptions();
    }
    if (changes['data'] || changes['pageSize'] || changes['currentPage']) {
      // Clear selection if data changes completely (optional safeguard)
      if (changes['data']) {
        this.selectedRows.clear();
        this.selectionChange.emit([]);
      }
      this.processData();
    }
  }

  ngAfterContentInit(): void {
    this.updateTemplatesMap();
    this.templateList.changes.subscribe(() => {
      this.updateTemplatesMap();
    });
  }

  private updateTemplatesMap(): void {
    this.customTemplates = {};
    this.templateList.forEach((item) => {
      this.customTemplates[item.columnName] = item.template;
    });
  }

  private updatePageSizeOptions(): void {
    this.pageSizeDropdownOptions = this.pageSizeOptions.map((size) => ({
      label: `${size} rows`,
      value: size,
    }));
  }

  // Master method to process client-side filtering, sorting, and pagination
  processData(): void {
    if (this.serverSide) {
      this.paginatedData = this.data;
      return;
    }

    // 1. Filter
    let filtered = [...this.data];
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter((row) => {
        return this.columns.some((col) => {
          const val = row[col.key];
          return val !== null && val !== undefined && String(val).toLowerCase().includes(term);
        });
      });
    }

    // 2. Sort
    if (this.sortState.column && this.sortState.direction) {
      const col = this.columns.find((c) => c.key === this.sortState.column);
      const key = this.sortState.column;
      const dir = this.sortState.direction === 'asc' ? 1 : -1;

      filtered.sort((a, b) => {
        const valA = a[key];
        const valB = b[key];

        if (valA === undefined || valA === null) return 1 * dir;
        if (valB === undefined || valB === null) return -1 * dir;

        if (col?.type === 'number') {
          return (Number(valA) - Number(valB)) * dir;
        }

        if (col?.type === 'date') {
          return (new Date(valA).getTime() - new Date(valB).getTime()) * dir;
        }

        // Default text sorting
        return String(valA).localeCompare(String(valB), undefined, { numeric: true, sensitivity: 'base' }) * dir;
      });
    }

    this.processedData = filtered;

    // 3. Paginate
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedData = this.processedData.slice(startIndex, startIndex + this.pageSize);
  }

  get totalRecords(): number {
    return this.serverSide ? this.totalItems : this.processedData.length;
  }

  get totalPages(): number {
    if (this.pageSize <= 0) return 0;
    return Math.ceil(this.totalRecords / this.pageSize);
  }

  get showingStart(): number {
    if (this.totalRecords === 0) return 0;
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get showingEnd(): number {
    const end = this.currentPage * this.pageSize;
    return Math.min(end, this.totalRecords);
  }

  // Row Selection logic
  isRowSelected(row: any): boolean {
    return this.selectedRows.has(row);
  }

  toggleRowSelection(row: any): void {
    if (this.selectedRows.has(row)) {
      this.selectedRows.delete(row);
    } else {
      this.selectedRows.add(row);
    }
    this.selectionChange.emit(Array.from(this.selectedRows));
  }

  get isAllPageSelected(): boolean {
    if (this.paginatedData.length === 0) return false;
    return this.paginatedData.every((row) => this.selectedRows.has(row));
  }

  toggleAllPageSelection(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.paginatedData.forEach((row) => this.selectedRows.add(row));
    } else {
      this.paginatedData.forEach((row) => this.selectedRows.delete(row));
    }
    this.selectionChange.emit(Array.from(this.selectedRows));
  }

  // Sorting handlers
  onSort(col: DataTableColumn): void {
    if (!col.sortable || this.loading) return;

    let direction: 'asc' | 'desc' | '' = 'asc';
    if (this.sortState.column === col.key) {
      if (this.sortState.direction === 'asc') {
        direction = 'desc';
      } else if (this.sortState.direction === 'desc') {
        direction = ''; // clear sort
      }
    }

    this.sortState = {
      column: direction ? col.key : '',
      direction: direction,
    };

    if (this.serverSide) {
      this.sortChange.emit(this.sortState);
    } else {
      this.processData();
    }
  }

  // Global search input handler
  onSearch(value: string): void {
    this.searchTerm = value;
    if (this.serverSide) {
      this.searchChange.emit(value);
    } else {
      this.currentPage = 1; // Reset to page 1 on filter
      this.processData();
    }
  }

  // Pagination page change
  onPageChange(page: number): void {
    this.currentPage = page;
    if (this.serverSide) {
      this.pageChange.emit(page);
    } else {
      this.processData();
    }
  }

  // Pagination page size change
  onPageSizeChange(size: string | number | Array<string | number> | null): void {
    if (!size || Array.isArray(size)) return;
    const parsedSize = Number(size);
    this.pageSize = parsedSize;
    this.currentPage = 1; // reset page to 1
    if (this.serverSide) {
      this.pageSizeChange.emit(parsedSize);
    } else {
      this.processData();
    }
  }

  // Action clicks handler
  onActionClick(actionId: string, row: any): void {
    this.actionClick.emit({ actionId, row });
  }

  // Visual classes computation
  get tableClasses(): string[] {
    return [
      'slt-data-table',
      this.striped ? 'slt-data-table--striped' : '',
      this.bordered ? 'slt-data-table--bordered' : '',
      this.hover ? 'slt-data-table--hover' : '',
      `slt-data-table--${this.size}`,
    ].filter(Boolean);
  }

  // Badge utility
  getBadgeConfig(col: DataTableColumn, value: any): DataTableBadgeConfig {
    const defaultVal: DataTableBadgeConfig = { label: String(value), variant: 'neutral' };
    if (!col.badgeMap) return defaultVal;
    return col.badgeMap[value] || defaultVal;
  }
}

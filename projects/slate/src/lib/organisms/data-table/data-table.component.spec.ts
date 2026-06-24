import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTableComponent } from './data-table.component';
import { DataTableColumn } from './data-table.types';

describe('DataTableComponent', () => {
  let fixture: ComponentFixture<DataTableComponent>;
  let component: DataTableComponent;

  const mockColumns: DataTableColumn[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'age', label: 'Age', sortable: true, type: 'number' },
  ];

  const mockData = [
    { name: 'Charlie', age: 30 },
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 35 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    component.columns = mockColumns;
    component.data = mockData;
    component.pageSize = 2;
    component.currentPage = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate pagination properties correctly', () => {
    component.processData();
    expect(component.totalRecords).toBe(3);
    expect(component.totalPages).toBe(2);
    expect(component.showingStart).toBe(1);
    expect(component.showingEnd).toBe(2);
  });

  it('should slice data based on pagination', () => {
    component.processData();
    expect(component.paginatedData.length).toBe(2);
    // On page 2
    component.onPageChange(2);
    expect(component.paginatedData.length).toBe(1);
    expect(component.showingStart).toBe(3);
    expect(component.showingEnd).toBe(3);
  });

  it('should sort data in ascending order', () => {
    component.onSort(mockColumns[0]); // Sort by name (Charlie, Alice, Bob) -> Alice, Bob, Charlie
    fixture.detectChanges();
    expect(component.sortState.column).toBe('name');
    expect(component.sortState.direction).toBe('asc');
    expect(component.paginatedData[0].name).toBe('Alice');
    expect(component.paginatedData[1].name).toBe('Bob');
  });

  it('should sort data in descending order on second click', () => {
    component.onSort(mockColumns[0]); // asc
    component.onSort(mockColumns[0]); // desc
    fixture.detectChanges();
    expect(component.sortState.column).toBe('name');
    expect(component.sortState.direction).toBe('desc');
    expect(component.paginatedData[0].name).toBe('Charlie');
    expect(component.paginatedData[1].name).toBe('Bob');
  });

  it('should filter data when searching', () => {
    component.onSearch('Ali'); // matches Alice
    fixture.detectChanges();
    expect(component.totalRecords).toBe(1);
    expect(component.paginatedData[0].name).toBe('Alice');
  });

  it('should manage row selection', () => {
    spyOn(component.selectionChange, 'emit');
    component.toggleRowSelection(mockData[0]); // select Charlie
    expect(component.isRowSelected(mockData[0])).toBe(true);
    expect(component.selectionChange.emit).toHaveBeenCalledWith([mockData[0]]);

    component.toggleRowSelection(mockData[0]); // deselect
    expect(component.isRowSelected(mockData[0])).toBe(false);
  });
});

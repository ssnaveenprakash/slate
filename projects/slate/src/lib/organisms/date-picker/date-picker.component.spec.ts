import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePickerComponent } from './date-picker.component';

describe('DatePickerComponent', () => {
  let fixture: ComponentFixture<DatePickerComponent>;
  let component: DatePickerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DatePickerComponent] }).compileComponents();
    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input[type=date] and bind value', () => {
    component.value = '2023-01-01';
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input[type="date"]') as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.value).toBe('2023-01-01');
  });

  it('should emit valueChange on input', () => {
    spyOn(component.valueChange, 'emit');
    const input = fixture.nativeElement.querySelector('input[type="date"]') as HTMLInputElement;
    input.value = '2023-02-02';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.valueChange.emit).toHaveBeenCalledWith('2023-02-02');
  });

  it('should reflect min and max attributes', () => {
    component.min = '2023-01-01';
    component.max = '2023-12-31';
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input[type="date"]') as HTMLInputElement;
    expect(input.min).toBe('2023-01-01');
    expect(input.max).toBe('2023-12-31');
  });
});

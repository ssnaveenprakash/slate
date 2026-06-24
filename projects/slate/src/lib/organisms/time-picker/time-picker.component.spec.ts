import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TimePickerComponent } from './time-picker.component';

describe('TimePickerComponent', () => {
  let fixture: ComponentFixture<TimePickerComponent>;
  let component: TimePickerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TimePickerComponent] }).compileComponents();
    fixture = TestBed.createComponent(TimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input[type=time] and bind value', () => {
    component.value = '12:34';
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input[type="time"]') as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.value).toBe('12:34');
  });

  it('should emit valueChange on input', () => {
    spyOn(component.valueChange, 'emit');
    const input = fixture.nativeElement.querySelector('input[type="time"]') as HTMLInputElement;
    input.value = '09:15';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.valueChange.emit).toHaveBeenCalledWith('09:15');
  });
});

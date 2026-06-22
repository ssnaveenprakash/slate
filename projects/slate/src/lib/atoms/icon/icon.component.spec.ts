import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from './icon.component';
import { IconRegistryService } from './icon-registry.service';
import { DomSanitizer } from '@angular/platform-browser';

describe('IconComponent', () => {
  let fixture: ComponentFixture<IconComponent>;
  let component: IconComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconComponent],
      providers: [IconRegistryService, DomSanitizer]
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('is aria-hidden by default (decorative)', () => {
    component.decorative = true;
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.getAttribute('aria-hidden')).toBe('true');
  });

  it('exposes role and aria-label when not decorative', () => {
    component.decorative = false;
    component.ariaLabel = 'Close';
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.getAttribute('role')).toBe('img');
    expect(el.getAttribute('aria-label')).toBe('Close');
  });
});

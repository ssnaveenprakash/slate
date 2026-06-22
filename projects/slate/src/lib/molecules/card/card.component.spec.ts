import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders header and footer projections', () => {
    fixture.nativeElement.innerHTML = `
      <storybook-card>
        <div cardHeader>Header Slot</div>
        <div>Body</div>
        <div cardFooter>Footer Slot</div>
      </storybook-card>
    `;
    // Recreate component because we replaced innerHTML
    fixture = TestBed.createComponent(CardComponent);
    fixture.detectChanges();

    const header = fixture.debugElement.query(By.css('.storybook-card__header'));
    const body = fixture.debugElement.query(By.css('.storybook-card__body'));
    const footer = fixture.debugElement.query(By.css('.storybook-card__footer'));

    expect(header).toBeTruthy();
    expect(body).toBeTruthy();
    expect(footer).toBeTruthy();
  });

  it('applies variant and size classes', () => {
    component.variant = 'raised';
    component.size = 'small';
    fixture.detectChanges();

    const host = fixture.debugElement.query(By.css('.storybook-card'));
    expect(host.classes['storybook-card--raised']).toBeTrue();
    expect(host.classes['storybook-card--sm']).toBeTrue();
  });
});

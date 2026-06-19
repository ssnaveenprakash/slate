import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'storybook-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      [disabled]="disabled || loading"
      (click)="onClick.emit($event)"
      [ngClass]="classes"
    >
      {{ loading ? 'Loading...' : label }}
    </button>
  `,
  styleUrls: ['./button.css'],
})
export class ButtonComponent {
  @Input()
  variant: 'primary' | 'secondary' | 'ghost' | 'danger' = 'primary';

  @Input()
  size: 'small' | 'medium' | 'large' = 'medium';

  @Input()
  disabled = false;

  @Input()
  loading = false;

  @Input()
  label = 'Button';

  @Output()
  onClick = new EventEmitter<Event>();

  public get classes(): string[] {
    return [
      'storybook-button',
      `storybook-button--${this.variant}`,
      `storybook-button--${this.size}`,
      this.disabled ? 'storybook-button--disabled' : '',
      this.loading ? 'storybook-button--loading' : '',
    ].filter(Boolean);
  }
}
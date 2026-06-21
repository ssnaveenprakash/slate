import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'storybook-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="visible"
      [ngClass]="classes"
      role="alert"
    >
      <!-- Icon Wrapper -->
      <div class="storybook-alert__icon-wrapper">
        <svg
          *ngIf="type === 'info'"
          class="storybook-alert__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>

        <svg
          *ngIf="type === 'success'"
          class="storybook-alert__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>

        <svg
          *ngIf="type === 'warning'"
          class="storybook-alert__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>

        <svg
          *ngIf="type === 'error'"
          class="storybook-alert__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      </div>

      <!-- Content -->
      <div class="storybook-alert__content">
        <span class="storybook-alert__message">{{ message }}</span>
        <span *ngIf="description" class="storybook-alert__description">{{ description }}</span>
      </div>

      <!-- Close Button -->
      <button
        *ngIf="dismissible"
        type="button"
        class="storybook-alert__close"
        aria-label="Close alert"
        (click)="dismiss()"
      >
        <svg
          class="storybook-alert__close-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  `,
  styleUrls: ['./alert.css'],
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input()
  type: 'info' | 'success' | 'warning' | 'error' = 'info';

  @Input()
  message = '';

  @Input()
  description = '';

  @Input()
  dismissible = true;

  @Input()
  duration = 0;

  @Output()
  onClose = new EventEmitter<void>();

  visible = true;
  dismissing = false;

  private timeoutId: any;

  ngOnInit(): void {
    if (this.duration > 0) {
      this.timeoutId = setTimeout(() => {
        this.dismiss();
      }, this.duration);
    }
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  dismiss(): void {
    if (this.dismissing) return;
    this.dismissing = true;
    setTimeout(() => {
      this.visible = false;
      this.onClose.emit();
    }, 200); // matches the CSS transition length for smooth fade out
  }

  public get classes(): string[] {
    return [
      'storybook-alert',
      `storybook-alert--${this.type}`,
      this.dismissing ? 'storybook-alert--dismissing' : '',
    ].filter(Boolean);
  }
}

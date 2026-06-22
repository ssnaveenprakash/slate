import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'slt-search-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="classes">
      <!-- Search icon -->
      <svg
        class="slt-search-bar__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>

      <input
        class="slt-search-bar__input"
        type="search"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [attr.aria-label]="ariaLabel"
        (input)="onInput($event)"
        (keydown.escape)="clear()"
      />

      <!-- Clear button -->
      <button
        *ngIf="value && !disabled"
        type="button"
        class="slt-search-bar__clear"
        aria-label="Clear search"
        (click)="clear()"
      >
        <svg
          class="slt-search-bar__clear-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  `,
  styleUrls: ['./search-bar.css'],
})
export class SearchBarComponent {
  @Input() value = '';
  @Input() placeholder = 'Search…';
  @Input() disabled = false;
  @Input() ariaLabel = 'Search';

  @Output() valueChange = new EventEmitter<string>();
  @Output() cleared = new EventEmitter<void>();

  public get classes(): string[] {
    return [
      'slt-search-bar',
      this.disabled ? 'slt-search-bar--disabled' : '',
    ].filter(Boolean);
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.valueChange.emit(target.value);
  }

  clear(): void {
    if (this.disabled) return;
    this.value = '';
    this.valueChange.emit('');
    this.cleared.emit();
  }
}

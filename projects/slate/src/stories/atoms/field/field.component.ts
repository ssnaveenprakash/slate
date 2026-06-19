import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'storybook-field',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="classes">
      <label *ngIf="label" class="storybook-field__label">
        {{ label }}
      </label>

      <div class="storybook-field__control">
        <span class="storybook-field__slot">
          <ng-content select="[prefix]"></ng-content>
        </span>

        <input
          *ngIf="fieldType === 'input'"
          class="storybook-field__input"
          [placeholder]="placeholder"
          [value]="value"
          [disabled]="disabled"
          (input)="onInputChange($event)"
        />

        <textarea
          *ngIf="fieldType === 'textarea'"
          class="storybook-field__input storybook-field__textarea"
          [placeholder]="placeholder"
          [value]="value"
          [disabled]="disabled"
          (input)="onInputChange($event)"
        ></textarea>

        <span class="storybook-field__slot">
          <ng-content select="[suffix]"></ng-content>
        </span>
      </div>

      <p *ngIf="error" class="storybook-field__error">
        {{ error }}
      </p>

      <p *ngIf="!error && helperText" class="storybook-field__helper">
        {{ helperText }}
      </p>
    </div>
  `,
  styleUrls: ['./field.css'],
})
export class FieldComponent {
  @Input()
  fieldType: 'input' | 'textarea' = 'input';

  @Input()
  label = '';

  @Input()
  helperText = '';

  @Input()
  error = '';

  @Input()
  placeholder = '';

  @Input()
  value = '';

  @Input()
  disabled = false;

  @Output()
  valueChange = new EventEmitter<string>();

  public get classes(): string[] {
    return [
      'storybook-field',
      this.error ? 'storybook-field--error' : '',
      this.disabled ? 'storybook-field--disabled' : '',
    ].filter(Boolean);
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.valueChange.emit(target.value);
  }
}
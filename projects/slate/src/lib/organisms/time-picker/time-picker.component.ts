import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconComponent } from '../../atoms/icon/icon.component';

@Component({
  selector: 'slt-time-picker',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div [ngClass]="classes">
      <label *ngIf="label" [for]="fieldId" class="slt-form-field__label">
        {{ label }}
        <span *ngIf="required" class="slt-form-field__required" aria-hidden="true">*</span>
      </label>

      <div
        class="slt-form-field__control"
        [class.slt-form-field__control--error]="showError"
        [class.slt-form-field__control--filled]="variant === 'filled'"
        [class.slt-form-field__control--ghost]="variant === 'ghost'"
        [class.slt-form-field__control--sm]="size === 'small'"
        [class.slt-form-field__control--lg]="size === 'large'"
      >
        <span *ngIf="prefixIcon" class="slt-form-field__slot">
          <ng-content select="[prefix]"></ng-content>
        </span>

        <slt-icon *ngIf="showDefaultIcon && !prefixIcon" class="slt-form-field__slot" type="clock" [decorative]="true"></slt-icon>

        <input
          id="{{ fieldId }}"
          class="slt-form-field__input"
          type="time"
          [placeholder]="placeholder"
          [value]="value"
          [disabled]="disabled"
          [required]="required"
          [readonly]="readonly"
          [attr.min]="min || null"
          [attr.max]="max || null"
          [attr.aria-describedby]="showError ? fieldId + '-msg' : null"
          [attr.aria-invalid]="showError || null"
          (input)="onInput($event)"
          (blur)="onBlur($event)"
        />

        <span *ngIf="suffixIcon" class="slt-form-field__slot">
          <ng-content select="[suffix]"></ng-content>
        </span>
      </div>

      <p *ngIf="showError" [id]="fieldId + '-msg'" class="slt-form-field__validation" role="alert">
        <svg class="slt-form-field__validation-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        {{ activeError }}
      </p>

      <p *ngIf="!showError && helperText" class="slt-form-field__helper">{{ helperText }}</p>
    </div>
  `,
  styleUrls: ['./time-picker.css'],
})
export class TimePickerComponent {
  private static _idCounter = 0;

  @Input() label = '';
  @Input() helperText = '';
  @Input() validationMessage = '';
  @Input() placeholder = '';
  @Input() value = '';
  @Input() required = false;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() min = '';
  @Input() max = '';
  @Input() prefixIcon = false;
  @Input() suffixIcon = false;
  @Input() variant: 'default' | 'filled' | 'ghost' = 'default';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  /** Show a built-in decorative icon when no prefix is projected */
  @Input() showDefaultIcon = false;

  @Output() valueChange = new EventEmitter<string>();
  @Output() blur = new EventEmitter<void>();

  touched = false;
  private _internalError = '';

  readonly fieldId = `slt-time-picker-${++TimePickerComponent._idCounter}`;

  get activeError(): string {
    return this.validationMessage || this._internalError;
  }

  get showError(): boolean {
    return this.touched && !!this.activeError;
  }

  public get classes(): string[] {
    return [
      'slt-form-field',
      this.disabled ? 'slt-form-field--disabled' : '',
      this.showError ? 'slt-form-field--error' : '',
    ].filter(Boolean);
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.valueChange.emit(target.value);
    if (this.touched) {
      this._internalError = this._validate(target);
    }
  }

  onBlur(_: Event): void {
    this.touched = true;
    const input = document.getElementById(this.fieldId) as HTMLInputElement | null;
    if (input) {
      this._internalError = this._validate(input);
    }
    this.blur.emit();
  }

  private _validate(input: HTMLInputElement): string {
    const v = input.validity;
    if (v.valueMissing) return `${this.label || 'This field'} is required.`;
    if (v.rangeUnderflow) return `Time must be at or after ${input.min}.`;
    if (v.rangeOverflow) return `Time must be at or before ${input.max}.`;
    return '';
  }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'slt-form-field',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="classes">
      <label *ngIf="label" [for]="fieldId" class="slt-form-field__label">
        {{ label }}
        <span *ngIf="required" class="slt-form-field__required" aria-hidden="true">*</span>
      </label>

      <div class="slt-form-field__control" [class.slt-form-field__control--error]="showError">
        <span *ngIf="prefixIcon" class="slt-form-field__slot">
          <ng-content select="[prefix]"></ng-content>
        </span>

        <input
          class="slt-form-field__input"
          [id]="fieldId"
          [type]="type"
          [placeholder]="placeholder"
          [value]="value"
          [disabled]="disabled"
          [required]="required"
          [attr.aria-describedby]="showError ? fieldId + '-msg' : null"
          [attr.aria-invalid]="showError || null"
          (input)="onInput($event)"
          (blur)="onBlur($event)"
        />

        <span *ngIf="suffixIcon" class="slt-form-field__slot">
          <ng-content select="[suffix]"></ng-content>
        </span>
      </div>

      <p
        *ngIf="showError"
        [id]="fieldId + '-msg'"
        class="slt-form-field__validation"
        role="alert"
      >
        <svg class="slt-form-field__validation-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        {{ activeError }}
      </p>

      <p *ngIf="!showError && helperText" class="slt-form-field__helper">
        {{ helperText }}
      </p>
    </div>
  `,
  styleUrls: ['./form-field.css'],
})
export class FormFieldComponent {
  private static _idCounter = 0;

  @Input() label = '';
  @Input() helperText = '';
  /** Optional external validation message. When set, overrides built-in type validation. */
  @Input() validationMessage = '';
  @Input() placeholder = '';
  @Input() value = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' = 'text';
  @Input() required = false;
  @Input() disabled = false;
  @Input() prefixIcon = false;
  @Input() suffixIcon = false;

  @Output() valueChange = new EventEmitter<string>();
  @Output() blur = new EventEmitter<void>();

  touched = false;
  private _internalError = '';

  readonly fieldId = `slt-form-field-${++FormFieldComponent._idCounter}`;

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

  onBlur(event: Event): void {
    this.touched = true;
    const target = event.target as HTMLInputElement;
    this._internalError = this._validate(target);
    this.blur.emit();
  }

  private _validate(input: HTMLInputElement): string {
    const v = input.validity;

    if (v.valueMissing) return `${this.label || 'This field'} is required.`;

    switch (this.type) {
      case 'email':
        if (v.typeMismatch) return 'Please enter a valid email address.';
        break;
      case 'url':
        if (v.typeMismatch) return 'Please enter a valid URL.';
        break;
      case 'number':
        if (v.badInput) return 'Please enter a valid number.';
        if (v.rangeUnderflow) return `Value must be at least ${input.min}.`;
        if (v.rangeOverflow) return `Value must be at most ${input.max}.`;
        break;
      case 'tel':
        if (v.patternMismatch) return 'Please enter a valid phone number.';
        break;
    }

    if (v.tooShort) return `Minimum ${input.minLength} characters required.`;
    if (v.tooLong) return `Maximum ${input.maxLength} characters allowed.`;
    if (v.patternMismatch) return 'Value does not match the required format.';

    return '';
  }
}

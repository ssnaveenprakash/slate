import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { ButtonComponent } from '../../atoms/button/button.component';
import { CheckboxComponent } from '../../atoms/checkbox/checkbox.component';
import { RadioComponent } from '../../atoms/radio/radio.component';
import { ToggleComponent } from '../../atoms/toggle/toggle.component';
import { AlertComponent } from '../../molecules/alert/alert.component';
import { DropdownComponent } from '../../molecules/dropdown/dropdown.component';
import { FormFieldComponent } from '../../molecules/form-field/form-field.component';
import { FormFieldSchema, FormSchema, FormValue } from './form.types';

@Component({
  selector: 'slt-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldComponent,
    DropdownComponent,
    CheckboxComponent,
    RadioComponent,
    ToggleComponent,
    ButtonComponent,
    AlertComponent,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnChanges {
  @Input() schema!: FormSchema;
  @Input() loading = false;
  @Input() initialValues: FormValue = {};

  @Output() formSubmit = new EventEmitter<FormValue>();
  @Output() formCancel = new EventEmitter<void>();
  @Output() formChange = new EventEmitter<FormValue>();

  form!: FormGroup;
  submitted = false;
  submitSuccess = false;

  ngOnInit(): void {
    this._buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['schema'] && !changes['schema'].firstChange) {
      this._buildForm();
    }
    if (changes['initialValues'] && this.form) {
      this.form.patchValue(this.initialValues);
    }
  }

  private _buildForm(): void {
    const controls: Record<string, FormControl> = {};

    for (const field of this.schema.fields) {
      const defaultValue = this.initialValues[field.key] ?? field.defaultValue ?? this._defaultForType(field);
      controls[field.key] = new FormControl(
        { value: defaultValue, disabled: !!field.disabled },
        this._buildValidators(field),
      );
    }

    this.form = new FormGroup(controls);
    this.form.valueChanges.subscribe((v) => this.formChange.emit(v));
  }

  private _defaultForType(field: FormFieldSchema): unknown {
    switch (field.type) {
      case 'checkbox':
      case 'toggle':
        return false;
      case 'radio':
      case 'dropdown':
        return null;
      default:
        return '';
    }
  }

  private _buildValidators(field: FormFieldSchema): ValidatorFn[] {
    const v = field.validators;
    if (!v) return [];

    const fns: ValidatorFn[] = [];
    if (v.required) fns.push(Validators.required);
    if (v.minLength) fns.push(Validators.minLength(v.minLength));
    if (v.maxLength) fns.push(Validators.maxLength(v.maxLength));
    if (v.pattern) fns.push(Validators.pattern(v.pattern));

    if (field.type === 'email') fns.push(Validators.email);
    if (field.type === 'url') fns.push(Validators.pattern(/^https?:\/\/.+/));

    if (v.custom) {
      fns.push((ctrl: AbstractControl) => {
        const msg = v.custom!(ctrl.value);
        return msg ? { custom: msg } : null;
      });
    }

    return fns;
  }

  getControl(key: string): FormControl {
    return this.form.get(key) as FormControl;
  }

  getError(key: string): string {
    const ctrl = this.getControl(key);
    if (!ctrl || !(ctrl.touched || this.submitted) || ctrl.valid) return '';

    const field = this.schema.fields.find((f) => f.key === key)!;
    const errors = ctrl.errors!;

    if (errors['required']) return `${field.label} is required.`;
    if (errors['email']) return 'Please enter a valid email address.';
    if (errors['minlength']) return `Minimum ${errors['minlength'].requiredLength} characters required.`;
    if (errors['maxlength']) return `Maximum ${errors['maxlength'].requiredLength} characters allowed.`;
    if (errors['pattern']) return 'Value does not match the required format.';
    if (errors['custom']) return errors['custom'];

    return 'Invalid value.';
  }

  isTouched(key: string): boolean {
    const ctrl = this.getControl(key);
    return ctrl.touched || this.submitted;
  }

  onDropdownChange(key: string, value: unknown): void {
    this.getControl(key).setValue(value);
    this.getControl(key).markAsTouched();
  }

  onCheckboxChange(key: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.getControl(key).setValue(checked);
    this.getControl(key).markAsTouched();
  }

  onRadioChange(key: string, value: string | number, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.getControl(key).setValue(value);
      this.getControl(key).markAsTouched();
    }
  }

  onToggleChange(key: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.getControl(key).setValue(checked);
    this.getControl(key).markAsTouched();
  }

  onFieldBlur(key: string): void {
    this.getControl(key).markAsTouched();
  }

  onSubmit(): void {
    this.submitted = true;
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    this.submitSuccess = true;
    this.formSubmit.emit(this.form.getRawValue());
  }

  onCancel(): void {
    this.submitted = false;
    this.submitSuccess = false;
    this.form.reset();
    this.formCancel.emit();
  }

  isTextType(type: string): boolean {
    return ['text', 'email', 'password', 'number', 'tel', 'url', 'textarea'].includes(type);
  }

  colSpanClass(field: FormFieldSchema): string {
    return field.colSpan === 2 ? 'slt-form__field--span-2' : '';
  }
}

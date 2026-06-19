import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-checkbox',
  standalone: true,
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css'
})

export class CheckboxComponent {
  @Input()
  label = 'Checkbox';

  @Input()
  checked = false;

  @Input()
  disabled = false;

  @Input()
  backgroundColor?: string;

  @Output()
  onChange = new EventEmitter<Event>();

  handleCheckboxChange(event: Event): void {
    console.log('Checkbox state changed');
    this.onChange.emit(event);
  }
}

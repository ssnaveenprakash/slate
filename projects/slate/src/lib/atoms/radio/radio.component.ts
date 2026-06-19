import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-radio',
  standalone: true,
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.css'
})
export class RadioComponent {
  @Input()
  label = 'Radio';

  @Input()
  checked = false;

  @Input()
  disabled = false;

  @Input()
  name = 'radio-group';

  @Input()
  backgroundColor?: string;

  @Output()
  onClick = new EventEmitter<Event>();

  handleRadioChange(event: Event): void {
    console.log('Radio state changed');
    this.onClick.emit(event);
  }
}

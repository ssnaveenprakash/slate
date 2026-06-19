import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-toggle',
  standalone: true,
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.css'
})
export class ToggleComponent {
  @Input()
  label = 'Toggle';

  @Input()
  checked = false;

  @Input()
  disabled = false;

  @Input()
  backgroundColor?: string;

  @Output()
  onChange = new EventEmitter<Event>();

  handleToggleChange(event: Event): void {
    console.log('Toggle state changed');
    this.onChange.emit(event);
  }
}

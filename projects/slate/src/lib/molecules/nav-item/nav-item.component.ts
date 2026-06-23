import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { IconComponent } from '../../atoms/icon/icon.component';

@Component({
  selector: 'li[slt-nav-item]',
  standalone: true,
  imports: [CommonModule, IconComponent],
  host: {
    class: 'nav-item',
  },
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
})
export class NavItemComponent {
  @Input() item: any;

  @Input()
  @HostBinding('class.collapsed')
  collapsed = false;

  @Input()
  @HostBinding('class.active')
  active = false;

  @HostBinding('class.disabled')
  get disabled(): boolean {
    return !!this.item?.disabled;
  }

  @Output() select = new EventEmitter<any>();

  onClick(event: Event): void {
    event.preventDefault();
    if (this.item?.disabled) return;
    this.select.emit(this.item);
  }
}

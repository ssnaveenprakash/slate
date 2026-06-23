import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IconComponent } from '../../atoms/icon/icon.component';
import { NavItemComponent } from '../../molecules/nav-item/nav-item.component';

export interface NavigationSidebarItem {
  label: string;
  href: string;
  icon?: string;
  disabled?: boolean;
  children?: NavigationSidebarItem[];
  ariaLabel?: string;
}

@Component({
  selector: 'storybook-navigation-sidebar',
  standalone: true,
  imports: [CommonModule, IconComponent, NavItemComponent],
  templateUrl: './navigation-sidebar.component.html',
  styleUrls: ['./navigation-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationSidebarComponent {
  @Input() items: NavigationSidebarItem[] = [];

  @Input()
  set activeHref(value: string) {
    this._activeHref = value;
    this.selectedHref = value;
  }
  get activeHref(): string {
    return this._activeHref;
  }
  private _activeHref = '';

  @Input() collapsed = false;
  @Input() ariaLabel = 'Primary navigation';

  @Output() collapsedChange = new EventEmitter<boolean>();
  @Output() itemSelected = new EventEmitter<NavigationSidebarItem>();

  selectedHref = '';

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
  }

  isActive(item: NavigationSidebarItem): boolean {
    return item.href === this.selectedHref;
  }

  onItemClick(item: NavigationSidebarItem): void {
    if (item.disabled) {
      return;
    }

    this.selectedHref = item.href;
    this.itemSelected.emit(item);
  }

  trackByItem(index: number, item: NavigationSidebarItem): string {
    return item.href ?? `${item.label}-${index}`;
  }
}

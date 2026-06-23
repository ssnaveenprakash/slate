import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
export class NavigationSidebarComponent implements OnInit, OnDestroy {
  @Input() items: NavigationSidebarItem[] = [];

  @Input()
  set activeHref(value: string) {
    this._activeHref = value;
    if (value) {
      this.selectedHref = value;
    } else {
      this.updateSelectedHrefFromRoute();
    }
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
  private routerSubscription?: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateSelectedHrefFromRoute();
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && !this._activeHref) {
        this.updateSelectedHrefFromRoute();
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  private updateSelectedHrefFromRoute(): void {
    if (this._activeHref) {
      this.selectedHref = this._activeHref;
      return;
    }

    const path = this.router.url.split(/[?#]/)[0];
    const matchedItem = this.items.find((item) => item.href === path);
    this.selectedHref = matchedItem ? matchedItem.href : path;
  }

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

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface BreadcrumbItem {
    label: string;
    href?: string;
    disabled?: boolean;
    ariaLabel?: string;
}

@Component({
    selector: 'storybook-breadcrumb',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent {
    @Input()
    items: BreadcrumbItem[] = [];

    @Input()
    separator = '/';

    @Input()
    ariaLabel = 'Breadcrumb';

    trackByItem(index: number, item: BreadcrumbItem): string {
        return item.href ?? `${item.label}-${index}`;
    }
}
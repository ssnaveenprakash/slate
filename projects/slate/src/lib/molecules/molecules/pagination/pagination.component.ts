import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

type PaginationDisplayItem = number | 'ellipsis';

@Component({
    selector: 'storybook-pagination',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
    @Input()
    ariaLabel = 'Pagination';

    @Input()
    disabled = false;

    @Input()
    boundaryCount = 1;

    @Input()
    siblingCount = 1;

    @Input()
    set totalPages(value: number) {
        this._totalPages = this.normalizePositiveInteger(value);
        this._currentPage = this.clampPage(this._currentPage);
    }
    get totalPages(): number {
        return this._totalPages;
    }

    @Input()
    set currentPage(value: number) {
        this._currentPage = this.clampPage(value);
    }
    get currentPage(): number {
        return this._currentPage;
    }

    @Output()
    pageChange = new EventEmitter<number>();

    private _totalPages = 0;
    private _currentPage = 1;

    get canGoPrevious(): boolean {
        return !this.disabled && this.currentPage > 1 && this.totalPages > 0;
    }

    get canGoNext(): boolean {
        return !this.disabled && this.currentPage < this.totalPages;
    }

    get displayItems(): PaginationDisplayItem[] {
        if (this.totalPages <= 0) {
            return [];
        }

        const pages = new Set<number>();
        const startBoundary = Math.max(1, this.boundaryCount);
        const endBoundary = Math.max(1, this.boundaryCount);
        const current = this.currentPage;
        const siblings = Math.max(0, this.siblingCount);

        for (let page = 1; page <= Math.min(startBoundary, this.totalPages); page += 1) {
            pages.add(page);
        }

        for (let page = Math.max(1, current - siblings); page <= Math.min(this.totalPages, current + siblings); page += 1) {
            pages.add(page);
        }

        for (let page = Math.max(1, this.totalPages - endBoundary + 1); page <= this.totalPages; page += 1) {
            pages.add(page);
        }

        const orderedPages = [...pages].sort((left, right) => left - right);
        const items: PaginationDisplayItem[] = [];

        orderedPages.forEach((page, index) => {
            const previous = orderedPages[index - 1];
            if (index > 0 && page - previous > 1) {
                items.push('ellipsis');
            }
            items.push(page);
        });

        return items;
    }

    trackByPage(index: number, item: PaginationDisplayItem): string {
        return item === 'ellipsis' ? `ellipsis-${index}` : String(item);
    }

    goToPrevious(): void {
        this.goToPage(this.currentPage - 1);
    }

    goToNext(): void {
        this.goToPage(this.currentPage + 1);
    }

    goToPage(page: number): void {
        if (this.disabled) {
            return;
        }

        const nextPage = this.clampPage(page);
        if (nextPage === this.currentPage || nextPage < 1 || nextPage > this.totalPages) {
            return;
        }

        this._currentPage = nextPage;
        this.pageChange.emit(nextPage);
    }

    private clampPage(page: number): number {
        if (this.totalPages <= 0) {
            return 0;
        }

        const normalizedPage = this.normalizePositiveInteger(page);
        return Math.min(Math.max(normalizedPage || 1, 1), this.totalPages);
    }

    private normalizePositiveInteger(value: number): number {
        const normalized = Number.isFinite(value) ? Math.floor(value) : 0;
        return Math.max(0, normalized);
    }
}
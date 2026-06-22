import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

export interface DropdownOption {
    label: string;
    value: string | number;
    disabled?: boolean;
    description?: string;
}

export interface DropdownGroup {
    label: string;
    options: DropdownOption[];
    disabled?: boolean;
}

export type DropdownOptionOrGroup = DropdownOption | DropdownGroup;

export function isDropdownOption(item: DropdownOptionOrGroup): item is DropdownOption {
    return (item as DropdownOption).value !== undefined;
}

@Component({
    selector: 'slt-dropdown',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
    @Input()
    options: DropdownOptionOrGroup[] = [];

    @Input()
    placeholder = 'Select';

    @Input()
    multiple = false;

    @Input()
    searchable = false;

    @Input()
    disabled = false;

    @Input()
    allowClear = true;

    @Input()
    notFoundText = 'No options';

    @Input()
    set value(v: string | number | Array<string | number> | null) {
        this._value = v ?? undefined;
        this.syncSelectedFromValue();
    }
    get value(): string | number | Array<string | number> | undefined {
        return this._value;
    }

    @Output()
    valueChange = new EventEmitter<string | number | Array<string | number> | null>();

    isOpen = false;
    searchTerm = '';
    selectedValues = new Set<string | number>();
    selectedOption?: DropdownOption;

    private _value?: string | number | Array<string | number>;

    constructor(private host: ElementRef<HTMLElement>) { }

    private syncSelectedFromValue(): void {
        this.selectedValues.clear();
        this.selectedOption = undefined;

        if (this.multiple) {
            if (Array.isArray(this._value)) {
                this._value.forEach((value) => this.selectedValues.add(value));
            }
        } else if (this._value !== undefined && this._value !== null && typeof this._value !== 'object') {
            this.selectedOption = this.findOption(this._value);
        }
    }

    private flattenOptions(): DropdownOption[] {
        return this.options.reduce<DropdownOption[]>((acc, item) => {
            if ('options' in item && Array.isArray(item.options)) {
                return acc.concat(item.options);
            }
            if (isDropdownOption(item)) {
                acc.push(item);
            }
            return acc;
        }, []);
    }

    private findOption(value: string | number): DropdownOption | undefined {
        return this.flattenOptions().find((option) => option.value === value);
    }

    @HostListener('document:click', ['$event.target'])
    onDocumentClick(target: HTMLElement): void {
        if (!this.host.nativeElement.contains(target)) {
            this.isOpen = false;
        }
    }

    toggleOpen(): void {
        if (this.disabled) {
            return;
        }
        this.isOpen = !this.isOpen;
        if (this.isOpen && this.searchable) {
            this.searchTerm = '';
        }
    }

    selectOption(option: DropdownOption): void {
        if (this.disabled || option.disabled) {
            return;
        }

        if (this.multiple) {
            this.toggleMultiple(option);
        } else {
            this.selectedOption = option;
            this._value = option.value;
            this.emitValue(option.value);
            this.isOpen = false;
        }
    }

    private toggleMultiple(option: DropdownOption): void {
        if (this.selectedValues.has(option.value)) {
            this.selectedValues.delete(option.value);
        } else {
            this.selectedValues.add(option.value);
        }
        const value = [...this.selectedValues];
        this._value = value;
        this.emitValue(value);
    }

    removeTag(value: string | number): void {
        if (this.disabled) {
            return;
        }
        this.selectedValues.delete(value);
        const newValue = [...this.selectedValues];
        this._value = newValue;
        this.emitValue(newValue);
    }

    clearSelection(event: Event): void {
        event.stopPropagation();
        if (this.disabled) {
            return;
        }
        this.selectedOption = undefined;
        this.selectedValues.clear();
        this._value = this.multiple ? [] : undefined;
        this.emitValue(this.multiple ? [] : null);
    }

    onSearch(value: string): void {
        this.searchTerm = value;
    }

    isSelected(option: DropdownOption): boolean {
        return this.multiple ? this.selectedValues.has(option.value) : this.selectedOption?.value === option.value;
    }

    get selectedItems(): DropdownOption[] {
        return this.flattenOptions().filter((option) => this.selectedValues.has(option.value));
    }

    get showClear(): boolean {
        return this.multiple ? this.selectedItems.length > 0 : !!this.selectedOption;
    }

    get displayLabel(): string {
        return this.selectedOption?.label ?? '';
    }

    get optionBlocks(): Array<{ group?: string; options: DropdownOption[] }> {
        return this.options.reduce<Array<{ group?: string; options: DropdownOption[] }>>((blocks, item) => {
            if ('options' in item && Array.isArray(item.options)) {
                const filteredOptions = item.options.filter((option) => this.filterOption(option));
                if (filteredOptions.length) {
                    blocks.push({ group: item.label, options: filteredOptions });
                }
            } else if (isDropdownOption(item) && this.filterOption(item)) {
                const lastBlock = blocks[blocks.length - 1];
                if (lastBlock && !lastBlock.group) {
                    lastBlock.options.push(item);
                } else {
                    blocks.push({ options: [item] });
                }
            }
            return blocks;
        }, []);
    }

    private filterOption(option: DropdownOption): boolean {
        if (!this.searchable || !this.searchTerm.trim()) {
            return true;
        }
        const term = this.searchTerm.toLowerCase();
        return option.label.toLowerCase().includes(term) || String(option.value).toLowerCase().includes(term);
    }

    private emitValue(value: string | number | Array<string | number> | null): void {
        this.valueChange.emit(value);
    }
}

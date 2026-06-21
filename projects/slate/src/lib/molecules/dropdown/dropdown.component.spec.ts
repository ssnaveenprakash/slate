import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DropdownComponent, DropdownOptionOrGroup } from './dropdown.component';

describe('DropdownComponent', () => {
    let component: DropdownComponent;
    let fixture: ComponentFixture<DropdownComponent>;
    let options: DropdownOptionOrGroup[];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DropdownComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(DropdownComponent);
        component = fixture.componentInstance;

        options = [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
            { label: 'Cherry', value: 'cherry' },
            {
                label: 'Citrus',
                options: [
                    { label: 'Orange', value: 'orange' },
                    { label: 'Lemon', value: 'lemon', disabled: true },
                ]
            }
        ];

        component.options = options;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open the dropdown panel when clicked', () => {
        const dropdown = fixture.debugElement.query(By.css('.slt-dropdown'));
        dropdown.nativeElement.click();
        fixture.detectChanges();

        expect(component.isOpen).toBeTrue();
        expect(fixture.debugElement.query(By.css('.slt-dropdown__panel'))).toBeTruthy();
    });

    it('should select single option and emit valueChange', () => {
        const emittedValues: Array<string | number | Array<string | number> | null> = [];
        component.valueChange.subscribe((value) => emittedValues.push(value));

        component.toggleOpen();
        fixture.detectChanges();

        const optionButton = fixture.debugElement.queryAll(By.css('.slt-dropdown__option'))[0];
        optionButton.nativeElement.click();
        fixture.detectChanges();

        expect(component.displayLabel).toBe('Apple');
        expect(emittedValues).toEqual(['apple']);
        expect(component.isOpen).toBeFalse();
    });

    it('should filter options when searchable', () => {
        component.searchable = true;
        component.toggleOpen();
        fixture.detectChanges();

        const input = fixture.debugElement.query(By.css('.slt-dropdown__search input'));
        input.nativeElement.value = 'ora';
        input.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        const optionButtons = fixture.debugElement.queryAll(By.css('.slt-dropdown__option'));
        expect(optionButtons.length).toBe(1);
        expect(optionButtons[0].nativeElement.textContent).toContain('Orange');
    });

    it('should support multiple selection and render selected tags', () => {
        component.multiple = true;
        component.toggleOpen();
        fixture.detectChanges();

        const optionButtons = fixture.debugElement.queryAll(By.css('.slt-dropdown__option'));
        optionButtons[0].nativeElement.click();
        optionButtons[1].nativeElement.click();
        fixture.detectChanges();

        expect(component.selectedItems.length).toBe(2);
        const tags = fixture.debugElement.queryAll(By.css('.slt-dropdown__tag'));
        expect(tags.length).toBe(2);
        expect(tags[0].nativeElement.textContent).toContain('Apple');
        expect(tags[1].nativeElement.textContent).toContain('Banana');
    });

    it('should clear selection when clear button is clicked', () => {
        component.value = 'banana';
        fixture.detectChanges();

        component.toggleOpen();
        fixture.detectChanges();

        const clearButton = fixture.debugElement.query(By.css('.slt-dropdown__clear'));
        expect(clearButton).toBeTruthy();

        clearButton.nativeElement.click();
        fixture.detectChanges();

        expect(component.displayLabel).toBe('');
        expect(component.value).toBeUndefined();
    });

    it('should not open or select anything when disabled', () => {
        component.disabled = true;
        fixture.detectChanges();

        const dropdown = fixture.debugElement.query(By.css('.slt-dropdown'));
        dropdown.nativeElement.click();
        fixture.detectChanges();
        expect(component.isOpen).toBeFalse();

        component.toggleOpen();
        component.selectOption({ label: 'Apple', value: 'apple' });
        expect(component.selectedOption).toBeUndefined();
    });
});
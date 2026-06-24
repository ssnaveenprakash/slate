import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ButtonComponent } from '../../atoms/button/button.component';
import { StepConfig, StepStatus } from './stepper.types';

@Component({
  selector: 'slt-stepper',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
})
export class StepperComponent implements OnChanges {
  @Input() steps: StepConfig[] = [];
  @Input() activeStep = 0;
  @Input() linear = true;
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() nextLabel = 'Next';
  @Input() backLabel = 'Back';
  @Input() finishLabel = 'Finish';
  @Input() loading = false;
  @Input() errorSteps: number[] = [];

  @Output() stepChange = new EventEmitter<number>();
  @Output() finish = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  private _completedSteps = new Set<number>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeStep']) {
      const prev = changes['activeStep'].previousValue;
      if (prev !== undefined && prev < this.activeStep) {
        this._completedSteps.add(prev);
      }
    }
  }

  get isFirst(): boolean {
    return this.activeStep === 0;
  }

  get isLast(): boolean {
    return this.activeStep === this.steps.length - 1;
  }

  stepStatus(index: number): StepStatus {
    if (this.errorSteps.includes(index)) return 'error';
    if (index === this.activeStep) return 'active';
    if (this._completedSteps.has(index)) return 'completed';
    return 'pending';
  }

  canNavigateTo(index: number): boolean {
    if (!this.linear) return !this.steps[index]?.disabled;
    return this._completedSteps.has(index) || index === this.activeStep;
  }

  goTo(index: number): void {
    if (!this.canNavigateTo(index) || index === this.activeStep) return;
    this.stepChange.emit(index);
  }

  next(): void {
    if (this.isLast) {
      this.finish.emit();
      return;
    }
    this._completedSteps.add(this.activeStep);
    const next = this.activeStep + 1;
    this.stepChange.emit(next);
  }

  back(): void {
    if (this.isFirst) return;
    this.stepChange.emit(this.activeStep - 1);
  }

  markError(index: number): void {
    if (!this.errorSteps.includes(index)) {
      this.errorSteps = [...this.errorSteps, index];
    }
  }

  clearError(index: number): void {
    this.errorSteps = this.errorSteps.filter((i) => i !== index);
  }
}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'storybook-typography',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Template definitions to avoid repeating content projection logic -->
    <ng-template #textTemplate>
      <ng-content></ng-content>
    </ng-template>

    <ng-template #contentTemplate>
      @if (code) {
        <code class="storybook-typography--code">
          @if (mark) {
            <mark class="storybook-typography--mark">
              <ng-container *ngTemplateOutlet="textTemplate"></ng-container>
            </mark>
          } @else {
            <ng-container *ngTemplateOutlet="textTemplate"></ng-container>
          }
        </code>
      } @else if (mark) {
        <mark class="storybook-typography--mark">
          <ng-container *ngTemplateOutlet="textTemplate"></ng-container>
        </mark>
      } @else {
        <ng-container *ngTemplateOutlet="textTemplate"></ng-container>
      }
    </ng-template>

    <!-- Outer wrappers based on variant and level -->
    @if (variant === 'title') {
      @if (level === 1) {
        <h1 [ngClass]="classes"><ng-container *ngTemplateOutlet="contentTemplate"></ng-container></h1>
      } @else if (level === 2) {
        <h2 [ngClass]="classes"><ng-container *ngTemplateOutlet="contentTemplate"></ng-container></h2>
      } @else if (level === 3) {
        <h3 [ngClass]="classes"><ng-container *ngTemplateOutlet="contentTemplate"></ng-container></h3>
      } @else if (level === 4) {
        <h4 [ngClass]="classes"><ng-container *ngTemplateOutlet="contentTemplate"></ng-container></h4>
      } @else if (level === 5) {
        <h5 [ngClass]="classes"><ng-container *ngTemplateOutlet="contentTemplate"></ng-container></h5>
      }
    } @else if (variant === 'paragraph') {
      <p [ngClass]="classes"><ng-container *ngTemplateOutlet="contentTemplate"></ng-container></p>
    } @else if (variant === 'link') {
      <a [attr.href]="disabled ? null : href" [attr.target]="target" [ngClass]="classes">
        <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
      </a>
    } @else {
      <span [ngClass]="classes"><ng-container *ngTemplateOutlet="contentTemplate"></ng-container></span>
    }
  `,
  styleUrls: ['./typography.css'],
})
export class TypographyComponent {
  @Input()
  variant: 'title' | 'text' | 'paragraph' | 'link' = 'text';

  @Input()
  level: 1 | 2 | 3 | 4 | 5 = 1;

  @Input()
  type: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' = 'primary';

  @Input()
  strong = false;

  @Input()
  italic = false;

  @Input()
  underline = false;

  @Input()
  delete = false;

  @Input()
  code = false;

  @Input()
  mark = false;

  @Input()
  disabled = false;

  @Input()
  href = '';

  @Input()
  target = '_self';

  public get classes(): string[] {
    return [
      'storybook-typography',
      `storybook-typography--${this.variant}`,
      this.variant === 'title' ? `storybook-typography--h${this.level}` : '',
      `storybook-typography--${this.type}`,
      this.strong ? 'storybook-typography--strong' : '',
      this.italic ? 'storybook-typography--italic' : '',
      this.underline ? 'storybook-typography--underline' : '',
      this.delete ? 'storybook-typography--delete' : '',
      this.disabled ? 'storybook-typography--disabled' : '',
    ].filter(Boolean);
  }
}

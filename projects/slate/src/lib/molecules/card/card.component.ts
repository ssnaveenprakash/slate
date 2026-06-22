import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'storybook-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.css'],
})
export class CardComponent {
  @Input()
  variant: 'flat' | 'raised' = 'flat';

  @Input()
  size: 'small' | 'medium' | 'large' = 'medium';

  @Input()
  ariaLabel?: string;

  public get classes(): string[] {
    return [
      'storybook-card',
      this.variant === 'raised' ? 'storybook-card--raised' : 'storybook-card--flat',
      this.size === 'small' ? 'storybook-card--sm' : this.size === 'large' ? 'storybook-card--lg' : 'storybook-card--md',
    ];
  }
}

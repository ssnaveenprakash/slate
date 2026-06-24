
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  TemplateRef
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type AvatarSize = 'large' | 'small' | 'default' | number;
export type AvatarShape = 'circle' | 'square';

@Component({
  selector: 'slt-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None, // Allow global styles to affect component
  host: {
    'class': 'slt-avatar',
    '[class.slt-avatar-lg]': `size === 'large'`,
    '[class.slt-avatar-sm]': `size === 'small'`,
    '[class.slt-avatar-square]': `shape === 'square'`,
    '[class.slt-avatar-circle]': `shape === 'circle'`,
    '[style.width.px]': `(isNumberSize) ? size : null`,
    '[style.height.px]': `(isNumberSize) ? size : null`,
    '[style.line-height.px]': `(isNumberSize) ? size : null`,
    '[attr.aria-label]': 'alt',
    // '[class.slt-avatar-has-status]': `status != null`,
    '[class.slt-avatar-status-online]': `status === 'online'`,
    '[class.slt-avatar-status-offline]': `status === 'offline'`,
    '[class.slt-avatar-status-away]': `status === 'away'`,
    '[class.slt-avatar-status-busy]': `status === 'busy'`,
    'role': 'img'
  }
})
export class AvatarComponent implements OnInit, OnChanges {
  @Input() size: AvatarSize = 'default';
  @Input() shape: AvatarShape = 'circle';
  @Input() src: string | null = null;
  @Input() icon: TemplateRef<void> | string | null = null; // Can be a TemplateRef or a string for an icon class
  @Input() alt: string = 'avatar';
  @Input() status: 'online' | 'offline' | 'away' | 'busy' | null = null;

  public isImgBroken: boolean = false;
  public textStyles: { [key: string]: string } = {};
  public isTemplateIcon: boolean = false;

  get iconTemplate(): TemplateRef<void> | null {
    return this.icon instanceof TemplateRef ? this.icon : null;
  }

  ngOnInit(): void {
    this.updateTextStyles();
    this.isTemplateIcon = this.icon instanceof TemplateRef;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['src']) {
      this.isImgBroken = false; // Reset on src change
    }
    if (changes['size'] || changes['icon']) {
      this.updateTextStyles();
      this.isTemplateIcon = this.icon instanceof TemplateRef;
    }
  }

  public imgError(): void {
    this.isImgBroken = true;
  }

  /** Return initials (1-2 chars) derived from the `alt` text for fallback */
  public getInitials(): string {
    if (!this.alt) return '';
    const words = this.alt.trim().split(/\s+/).filter(Boolean);
    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  }

  private updateTextStyles(): void {
    if (typeof this.size === 'number') {
      const fontSize = this.size / 2; // Rough estimation for text size
      this.textStyles = {
        'font-size': `${fontSize}px`,
        'transform': `translate(-50%,-50%) scale(${this.getTextScale()})`,
      };
    } else {
      this.textStyles = {}; // Reset for string sizes
    }
  }

  // A very basic text scaling logic. Design uses more sophisticated calculations
  // based on content width, which would require a ViewChild and ResizeObserver.
  private getTextScale(): number {
    if (typeof this.size === 'number') {
      if (this.icon || this.src) {
        return 1; // Don't scale if there's an image or icon
      }
      // Assuming a default text width relative to size. This is a simplification.
      const baseTextWidth = 14; // px, assumed base font size
      const avatarWidth = this.size;
      const textContentLength = (this.alt || '').length;
      if (textContentLength > 0 && avatarWidth > 0) {
        const assumedTextWidth = baseTextWidth * textContentLength * 0.6; // Adjust factor as needed
        if (assumedTextWidth > avatarWidth - 8) { // -8 for some padding
          return (avatarWidth - 8) / assumedTextWidth;
        }
      }
    }
    return 1;
  }

  get isNumberSize(): boolean {
    return typeof this.size === 'number';
  }
}

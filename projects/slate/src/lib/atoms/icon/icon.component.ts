
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
  ElementRef,
  Renderer2,
  HostBinding
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconRegistryService } from './icon-registry.service';
import type { IconSize, IconColor, IconTheme } from './icon.types';

@Component({
  selector: 'slt-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'slt-icon',
    '[class.slt-icon-spin]': 'spin',
    '[class.slt-icon-outlined]': `theme === 'outlined'`,
    '[class.slt-icon-filled]': `theme === 'filled'`,
    '[class.slt-icon-two-tone]': `theme === 'twoTone'`,
  }
})
export class IconComponent implements OnChanges {
  /** Backwards-compatible inputs */
  @Input() type: string = '';
  @Input() theme: IconTheme = 'outlined';
  @Input() spin: boolean = false;

  /** New, recommended inputs */
  @Input() size: IconSize = 'md';
  @Input() color: IconColor = 'inherit';
  @Input() svgContent?: string; // direct svg markup string (overrides registry)
  @Input() decorative: boolean = true; // if true, icon is aria-hidden by default
  @Input() ariaLabel?: string; // used when decorative === false

  @HostBinding('class') hostClass = 'slt-icon';
  @HostBinding('attr.aria-hidden') get ariaHidden(): string | null {
    return this.decorative ? 'true' : null;
  }
  @HostBinding('attr.role') get roleAttr(): string | null {
    return this.decorative ? null : 'img';
  }
  @HostBinding('attr.aria-label') get ariaLabelAttr(): string | null {
    return this.decorative ? null : (this.ariaLabel || null);
  }

  public svgHtml: SafeHtml | null = null;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private sanitizer: DomSanitizer,
    private registry: IconRegistryService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    // update classes and content on changes
    this.updateHostClass();
    if (changes['svgContent'] || changes['type'] || changes['theme']) {
      this.loadSvgIcon();
    }
    if (!this.decorative && !this.ariaLabel) {
      // best-effort accessibility reminder in runtime dev only
      // keep lightweight: do not throw, but warn in console so consumers can fix.
      // eslint-disable-next-line no-console
      console.warn('slt-icon: non-decorative icons should provide an `ariaLabel`.');
    }
  }

  private updateHostClass(): void {
    const classes = new Set<string>();
    classes.add('slt-icon');
    classes.add(`slt-icon--size-${this.size}`);
    if (this.color && this.color !== 'inherit') {
      classes.add(`slt-icon--color-${this.color}`);
    }
    if (this.spin) classes.add('slt-icon-spin');
    // theme class compatibility
    classes.add(this.theme === 'outlined' ? 'slt-icon-outlined' : '');
    classes.add(this.theme === 'filled' ? 'slt-icon-filled' : '');
    classes.add(this.theme === 'twoTone' ? 'slt-icon-two-tone' : '');

    this.hostClass = Array.from(classes).filter(Boolean).join(' ');
  }

  private loadSvgIcon(): void {
    // If svgContent provided explicitly, use it first.
    if (this.svgContent) {
      this.svgHtml = this.sanitizer.bypassSecurityTrustHtml(this.svgContent);
      return;
    }

    // Use registry to fetch SVG content and sanitize it for insertion.
    const svg = this.registry.getSvg(this.type, this.theme);
    if (svg) {
      this.svgHtml = this.sanitizer.bypassSecurityTrustHtml(svg);
      return;
    }

    // Fallback: simple placeholder SVG
    const fallback = `
      <svg viewBox="0 0 1024 1024" focusable="false" width="1em" height="1em" fill="currentColor" aria-hidden="true">
        <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32z" />
      </svg>
    `;
    this.svgHtml = this.sanitizer.bypassSecurityTrustHtml(fallback);
  }
}

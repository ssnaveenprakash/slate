
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
  ElementRef,
  Renderer2,
  Inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconRegistryService } from './icon-registry.service';

export type IconTheme = 'outlined' | 'filled' | 'twoTone';

@Component({
  selector: 'slt-icon',
  standalone: true,
  imports: [CommonModule],
  template: `<span class="slt-icon-graphic" [innerHTML]="svgHtml"></span>`,
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
  @Input() type: string = ''; // Name of the icon
  @Input() theme: IconTheme = 'outlined';
  @Input() spin: boolean = false;

  public svgHtml: SafeHtml | null = null;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private sanitizer: DomSanitizer,
    private registry: IconRegistryService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type'] || changes['theme']) {
      this.loadSvgIcon();
    }
  }

  private loadSvgIcon(): void {
    // Use registry to fetch SVG content and sanitize it for insertion.
    const svg = this.registry.getSvg(this.type, this.theme);
    if (svg) {
      // Bypass here because registry should contain trusted SVG strings only.
      // In production, ensure the registry sources are trusted and/or sanitized.
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

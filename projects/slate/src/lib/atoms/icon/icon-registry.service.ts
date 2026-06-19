import { Injectable } from '@angular/core';

/**
 * Simple icon registry mapping `type` + `theme` to SVG strings.
 * For a real library, populate this from SVG files at build-time
 * or expose methods to register icons dynamically.
 */
@Injectable({ providedIn: 'root' })
export class IconRegistryService {
  private icons: Record<string, string> = {
    // key: `${type}::${theme}`
    'user::outlined': `
      <svg viewBox="0 0 1024 1024" focusable="false" data-icon="user" width="1em" height="1em" fill="currentColor" aria-hidden="true">
        <path d="M512 512a128 128 0 1 0 0-256 128 128 0 0 0 0 256zm0 64c-141.4 0-256 114.6-256 256h512c0-141.4-114.6-256-256-256z" />
      </svg>
    `,
    'user::filled': `
      <svg viewBox="0 0 1024 1024" focusable="false" data-icon="user" width="1em" height="1em" fill="currentColor" aria-hidden="true">
        <path d="M512 512a128 128 0 1 0 0-256 128 128 0 0 0 0 256zM256 768a256 256 0 0 1 512 0H256z" />
      </svg>
    `
  };

  getSvg(type: string, theme: string = 'outlined'): string | null {
    const key = `${type}::${theme}`;
    return this.icons[key] || null;
  }

  // Allow runtime registration
  register(type: string, theme: string, svg: string): void {
    const key = `${type}::${theme}`;
    this.icons[key] = svg;
  }
}

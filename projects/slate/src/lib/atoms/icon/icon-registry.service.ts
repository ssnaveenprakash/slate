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
    'menu::outlined': `
      <svg viewBox="0 0 1024 1024" focusable="false" data-icon="menu" width="1em" height="1em" fill="currentColor" aria-hidden="true">
        <path d="M128 256h768v85.3H128V256zm0 213.3h768v85.3H128V469.3zm0 213.4h768v85.3H128V682.7z" />
      </svg>
    `,
    'arrow-right::outlined': `
      <svg viewBox="0 0 1024 1024" focusable="false" data-icon="arrow-right" width="1em" height="1em" fill="currentColor" aria-hidden="true">
        <path d="M640 176l56.6 56.6L395.2 534H896v85.3H395.2l301.4 301.4L640 848 240 448 640 176z" />
      </svg>
    `,
    'arrow-left::outlined': `
      <svg viewBox="0 0 1024 1024" focusable="false" data-icon="arrow-left" width="1em" height="1em" fill="currentColor" aria-hidden="true">
        <path d="M384 176l-56.6 56.6L628.8 534H128v85.3h500.8L327.4 916.4 384 976 784 576 384 176z" />
      </svg>
    `,
    'home::outlined': `
      <svg viewBox="0 0 1024 1024" focusable="false" data-icon="home" width="1em" height="1em" fill="currentColor" aria-hidden="true">
        <path d="M512 128L128 448h96v384h224V640h192v192h224V448h96L512 128z" />
      </svg>
    `,
    'folder::outlined': `
      <svg viewBox="0 0 1024 1024" focusable="false" data-icon="folder" width="1em" height="1em" fill="currentColor" aria-hidden="true">
        <path d="M868 256H512l-80-96H156c-30.9 0-56 25.1-56 56v576c0 30.9 25.1 56 56 56h712c30.9 0 56-25.1 56-56V312c0-30.9-25.1-56-56-56z" />
      </svg>
    `,
    'team::outlined': `
      <svg viewBox="0 0 1024 1024" focusable="false" data-icon="team" width="1em" height="1em" fill="currentColor" aria-hidden="true">
        <path d="M544 256a128 128 0 1 0 0 256 128 128 0 0 0 0-256zm-192 64a96 96 0 1 1 0 192 96 96 0 0 1 0-192zm448 0a96 96 0 1 1 0 192 96 96 0 0 1 0-192zM256 640c0-92.8 75.2-168 168-168h176c92.8 0 168 75.2 168 168v72H256v-72z" />
      </svg>
    `,
    'setting::outlined': `
      <svg viewBox="0 0 1024 1024" focusable="false" data-icon="setting" width="1em" height="1em" fill="currentColor" aria-hidden="true">
        <path d="M512 312c110.5 0 200 89.5 200 200s-89.5 200-200 200-200-89.5-200-200 89.5-200 200-200zm0-162c-29.7 0-53.8 24.1-53.8 53.8S482.3 257.6 512 257.6s53.8-24.1 53.8-53.8S541.7 150 512 150zM844 512c0 183-149 332-332 332S180 695 180 512 329 180 512 180 844 329 844 512z" />
      </svg>
    `,
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

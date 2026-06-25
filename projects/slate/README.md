# Slate UI

Slate UI is an Angular component library for building consistent product interfaces with composable atoms, molecules, and organisms.

## Installation

```bash
npm install @wissen-angular-lib/slate-ui @angular/core @angular/common @angular/forms
```

## Quick start

Import the root entry point in your Angular application:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SlateModule } from '@wissen-angular-lib/slate-ui';

@NgModule({
  imports: [BrowserModule, SlateModule],
  bootstrap: []
})
export class AppModule {}
```

You can also import grouped entry points for tree-shaking:

```ts
import { ButtonComponent, IconComponent } from '@wissen-angular-lib/slate-ui/atoms';
import { CardComponent, SearchBarComponent } from '@wissen-angular-lib/slate-ui/molecules';
import { NavigationSidebarComponent } from '@wissen-angular-lib/slate-ui/organisms';
```

## Styles

Add the design tokens and theme stylesheet to your app styles:

```scss
@use '@wissen-angular-lib/slate-ui/styles';
```

## Development

```bash
npm install
npm run build
```

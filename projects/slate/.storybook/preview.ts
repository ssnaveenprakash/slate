import type { Preview } from '@storybook/angular'
import { setCompodocJson } from "@storybook/addon-docs/angular";

// Ensure Storybook's Angular integration has a default options object available.
// Some environments expect `STORYBOOK_ANGULAR_OPTIONS` to exist on the global
// object; define a safe no-op object to avoid runtime ReferenceErrors.
declare const globalThis: any;
if (typeof globalThis !== 'undefined') {
  if (!globalThis.STORYBOOK_ANGULAR_OPTIONS) {
    globalThis.STORYBOOK_ANGULAR_OPTIONS = {};
  }
}
// Inject a minimal token CSS into the Storybook preview iframe so variables
// are available without requiring a CSS loader in the Storybook webpack config.
const _sltTokens = `
:root {
  --slt-primary-color: #1890ff;
  --slt-success-color: #52c41a;
  --slt-warning-color: #faad14;
  --slt-error-color: #ff4d4f;
  --slt-info-color: #1677ff;
  --slt-text-color: #000000d9;
  --slt-text-color-secondary: #00000073;
  --slt-background-color: #ffffff;
  --slt-border-color-base: #d9d9d9;

  --slt-font-size-base: 14px;
  --slt-font-size-lg: 16px;
  --slt-font-size-sm: 12px;
  --slt-line-height-base: 1.57142857;
  --slt-heading-color: #000000d9;

  --slt-padding-lg: 24px;
  --slt-padding-md: 16px;
  --slt-padding-sm: 12px;
  --slt-padding-xs: 8px;
  --slt-padding-xxs: 4px;

  --slt-border-radius-base: 6px;
  --slt-border-radius-sm: 4px;

  --slt-box-shadow-base: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
  --slt-box-shadow-hover: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
}

body.theme-dark {
  --slt-primary-color: #1765ad;
  --slt-text-color: #ffffffd9;
  --slt-text-color-secondary: #ffffff73;
  --slt-background-color: #001529;
  --slt-border-color-base: #434343;
  --slt-heading-color: #ffffffd9;
}
`;

if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.setAttribute('data-slate-tokens', 'true');
  styleEl.innerHTML = _sltTokens;
  document.head.appendChild(styleEl);
}

// Attempt to load the generated Compodoc JSON used by the addon-docs.
// Guard with try/catch because the file may be absent in some workflows
// (e.g. local dev without generated docs). Falling back to an empty
// object avoids breaking Storybook rendering.
let docJson: any = {};
try {
  // Use require here so bundlers that resolve JSON at build-time can load it,
  // and so TypeScript doesn't error when `resolveJsonModule` is not enabled.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  // @ts-ignore
  docJson = require('../documentation.json');
} catch (err) {
  // no-op — documentation JSON not available
}

setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;
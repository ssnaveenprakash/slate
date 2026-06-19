import type { Preview } from '@storybook/angular'
import { setCompodocJson } from "@storybook/addon-docs/angular";

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
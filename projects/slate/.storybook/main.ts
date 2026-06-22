import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  "framework": "@storybook/angular",
  // Ensure webpack does not include multiple DefinePlugin instances that set
  // conflicting values for `process.env.NODE_ENV`. Some Angular builders and
  // Storybook internals may both add a DefinePlugin; filter duplicates here.
  webpackFinal: async (config: any) => {
    if (config && Array.isArray(config.plugins)) {
      let seenDefine = false;
      config.plugins = config.plugins.filter((p: any) => {
        const name = p && p.constructor && p.constructor.name;
        if (name === 'DefinePlugin') {
          if (seenDefine) return false; // drop subsequent DefinePlugin instances
          seenDefine = true;
          return true; // keep the first one
        }
        return true;
      });
    }
    return config;
  }
};
export default config;
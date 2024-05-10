/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-actions',
    '@storybook/preset-create-react-app',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  esbuild: {
    loader: { '.js': '.jsx' },
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: (config, { configType }) => {
    config.css = config.css || {};
    config.css.postcss = {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    };
    return config;
  },
};
export default config;

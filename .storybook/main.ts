import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import type { StorybookConfig } from '@storybook/core-common';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import getProjCfg from '../webpack.config';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-dark-mode',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  features: {
    storyStoreV7: true,
  },
  webpackFinal: (cfg, { configType }) => {
    const isDev = configType === 'DEVELOPMENT';
    const projCfg = getProjCfg(
      isDev ? { WEBPACK_SERVE: 'true' } : { WEBPACK_BUILD: 'true' }
    );

    cfg.module ??= { rules: [] };
    cfg.module.rules ??= [];
    cfg.module.rules = cfg.module.rules.filter((rule) => {
      if (typeof rule !== 'object') return true;
      return !/(css|svg|mp4)/.test(String(rule.test));
    });
    cfg.module.rules.push(...(projCfg.module?.rules ?? []));
    cfg.module.rules.push({
      test: /\.html$/i,
      loader: 'html-loader',
    });

    cfg.resolve = projCfg.resolve;
    isDev && cfg.plugins?.push(new ReactRefreshWebpackPlugin());
    !isDev &&
      cfg.plugins?.push(
        new MiniCssExtractPlugin({
          filename: 'bundle-[hash].css',
        })
      );

    return cfg;
  },
};

module.exports = config;

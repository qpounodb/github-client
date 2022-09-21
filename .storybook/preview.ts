import React from 'react';
import { DecoratorFn, Parameters } from '@storybook/react';
import { themes } from '@storybook/theming';

import '~/styles/index.css';

export const parameters: Parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: { disable: true },
  darkMode: {
    current: 'dark',
    stylePreview: true,
    darkClass: 'theme-dark',
    lightClass: 'theme-light',
    dark: { ...themes.dark, appBg: '#333' },
    light: { ...themes.normal, appBg: '#f8f8f8' },
  },
};

const decorator: DecoratorFn = (Story) => {
  return Story();
};

export const decorators: DecoratorFn[] = [decorator];

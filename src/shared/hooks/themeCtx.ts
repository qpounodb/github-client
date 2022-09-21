import React from 'react';

import { createLocalStorageCtx } from './createLocalStorageCtx';

export enum Theme {
  dark = 'dark',
  light = 'light',
}

const toggleTheme = (theme: Theme): Theme =>
  theme === Theme.dark ? Theme.light : Theme.dark;

const getClassName = (theme: Theme): string => `theme-${theme}`;

const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
const defaultTheme = darkThemeMq.matches ? Theme.dark : Theme.light;

const { useCtx, Provider } = createLocalStorageCtx(
  'global-theme',
  defaultTheme
);

export const ThemeProvider = Provider;

export const useTheme = () => {
  const { state: theme, setState: setTheme } = useCtx();

  React.useEffect(() => {
    const html = document.documentElement;
    html.classList.remove(getClassName(toggleTheme(theme)));
    html.classList.add(getClassName(theme));
  }, [theme]);

  return {
    theme,
    toggleTheme: () => setTheme((prev) => toggleTheme(prev)),
  };
};

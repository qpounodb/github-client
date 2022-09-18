import React from 'react';

import { IconMoon, IconSun } from '~assets/icons';
import { Theme, useTheme } from '~hooks';

import { Switcher } from '../Switcher';

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Switcher
      labelA={Theme.light}
      labelB={Theme.dark}
      IconA={IconSun}
      IconB={IconMoon}
      stateA={theme === Theme.light}
      onChange={toggleTheme}
    />
  );
};

export default React.memo(ThemeSwitcher);

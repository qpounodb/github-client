import React from 'react';

import { Logo } from '~assets/icons';
import { Block } from '~layout';

import { ThemeSwitcher } from './components';
import styles from './Header.module.scss';

const LOGO_TITLE = 'Github Client';

const Header: React.FC = () => {
  return (
    <Block className={styles.block}>
      <header className={styles.root}>
        <div className={styles.root__logo}>
          <Logo /> {LOGO_TITLE}
        </div>
        <div className={styles.root__switch}>
          <ThemeSwitcher />
        </div>
      </header>
    </Block>
  );
};

export default React.memo(Header);

import React from 'react';

import { Logo } from '~assets/icons';

import { ThemeSwitcher } from '../ThemeSwitcher';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.root}>
      <div className={styles.root__content}>
        <div className={styles.root__logo}>
          <Logo /> Github Client
        </div>
        <div className={styles.root__switch}>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);

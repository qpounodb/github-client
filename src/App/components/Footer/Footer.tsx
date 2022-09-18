import React from 'react';

import { Logo, LogoKts } from '~/App/assets/icons';
import { joinClassName } from '~/shared/utils';

import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.root}>
      <div className={styles.root__content}>
        <div className={styles.root__item}>
          <time dateTime="2022-09-01">09.2022</time>
        </div>
        <div
          className={joinClassName(styles.root__item, styles.root__item_kts)}
        >
          <a
            href="https://metaclass.kts.studio/beginner_react"
            target="_blank"
            rel="noopener noreferrer"
            title="KTS Beginner React Course"
          >
            <LogoKts />
          </a>
        </div>
        <div className={styles.root__item}>
          <a
            href="https://github.com/qpounodb/github-client"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Logo /> qpounodb
          </a>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);

import React from 'react';

import { Block } from '~layout';
import { joinClassName as join } from '~utils';

import { Link } from './components';
import { config } from './config';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <Block className={styles.block}>
      <footer className={styles.root}>
        <div className={styles.root__item}>
          <time dateTime="2022-09-01">09.2022</time>
        </div>
        <div className={join(styles.root__item, styles.root__item_school)}>
          <Link {...config.school} />
        </div>
        <div className={styles.root__item}>
          <Link {...config.student} />
        </div>
      </footer>
    </Block>
  );
};

export default React.memo(Footer);

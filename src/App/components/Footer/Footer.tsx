import React from 'react';

import { Block } from '~layout';
import { joinClassName as join } from '~utils';

import { ExternalLink } from '../ExternalLink';

import { config } from './config';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <Block className={styles.block}>
      <footer className={styles.root}>
        <div className={styles.root__item}>
          <time dateTime="2022-09-01">09.2022</time>
        </div>
        <div className={styles.root__item}>
          <ExternalLink {...config.school} className={styles.root__link}>
            <config.school.Logo
              className={join(styles.root__logo, styles.root__logo_school)}
            />
          </ExternalLink>
        </div>
        <div className={styles.root__item}>
          <ExternalLink {...config.student} className={styles.root__link}>
            <config.student.Logo className={styles.root__logo} />{' '}
            {config.student.text}
          </ExternalLink>
        </div>
      </footer>
    </Block>
  );
};

export default React.memo(Footer);

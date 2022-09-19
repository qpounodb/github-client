import React from 'react';

import { Block } from '~layout';
import { joinClassName as join } from '~utils';

import { ExternalLink } from '../ExternalLink';

import { config } from './config';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  const { Logo: SchoolLogo, ...schoolProps } = config.school;
  const { Logo: StudentLogo, ...studentProps } = config.student;

  return (
    <Block className={styles.block}>
      <footer className={styles.root}>
        <div className={styles.root__item}>
          <time dateTime="2022-09-01">09.2022</time>
        </div>
        <div className={styles.root__item}>
          <ExternalLink {...schoolProps} className={styles.root__link}>
            <SchoolLogo
              className={join(styles.root__logo, styles.root__logo_school)}
            />
          </ExternalLink>
        </div>
        <div className={styles.root__item}>
          <ExternalLink {...studentProps} className={styles.root__link}>
            <StudentLogo className={styles.root__logo} /> {studentProps.text}
          </ExternalLink>
        </div>
      </footer>
    </Block>
  );
};

export default React.memo(Footer);

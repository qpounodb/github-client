import React from 'react';

import { PropsWithClassName } from '~/shared/types';
import { getLangLogo, joinClassName } from '~utils';

import styles from './Lang.module.scss';

export type LangProps = PropsWithClassName<{
  lang: string;
  fraction: number;
}>;

const Lang: React.FC<LangProps> = ({ lang, fraction, className }) => {
  return (
    <div className={joinClassName(styles.root, className)}>
      <img src={getLangLogo(lang)} alt={lang} />
      <span className={styles.lang}>{lang}</span> {fraction}%
    </div>
  );
};

export default React.memo(Lang);

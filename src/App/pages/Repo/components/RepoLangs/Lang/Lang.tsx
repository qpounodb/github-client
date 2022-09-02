import React from 'react';
import { getLangLogo } from '~/shared/utils';
import styles from './Lang.module.scss';

export type LangPrpos = {
  lang: string;
  count: number;
  total: number;
};

export const Lang: React.FC<LangPrpos> = ({ lang, count, total }) => {
  const fraction = Math.round((count / total) * 10000) / 100;
  return (
    <div className={styles.root}>
      <img src={getLangLogo(lang)} alt={lang} />
      <span className={styles.lang}>{lang}</span> {fraction}%
    </div>
  );
};

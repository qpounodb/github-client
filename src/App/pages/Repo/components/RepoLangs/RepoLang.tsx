import React from 'react';
import { getLangLogo } from '~/shared/utils';
import styles from './RepoLang.module.scss';

export type RepoLangPrpos = {
  lang: string;
  count: number;
  total: number;
};

export const RepoLang: React.FC<RepoLangPrpos> = ({ lang, count, total }) => {
  const fraction = Math.round((count / total) * 10000) / 100;
  return (
    <div className={styles.main}>
      <img src={getLangLogo(lang)} alt={lang} />
      <span className={styles.lang}>{lang}</span> {fraction}%
    </div>
  );
};

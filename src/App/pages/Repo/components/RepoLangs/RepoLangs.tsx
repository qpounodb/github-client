import React from 'react';
import { Languages } from '~/shared/GithubAPI';
import { isNone, Nullable } from '~/shared/utils';
import { RepoLang } from './RepoLang';
import styles from './RepoLangs.module.scss';

export type RepoLangsProps = {
  langs: Nullable<Languages>;
};

const getTotal = (langs: Languages) => {
  return Object.values(langs).reduce((acc, x) => acc + x, 0);
};

export const RepoLangs: React.FC<RepoLangsProps> = ({ langs }) => {
  if (isNone(langs)) return null;

  const total = getTotal(langs);
  return (
    <div className={styles.main}>
      <h2>Project Programming Languages</h2>
      <div className={styles.list}>
        {Object.entries(langs).map(([lang, count]) => (
          <RepoLang key={lang} {...{ lang, count, total }} />
        ))}
      </div>
    </div>
  );
};

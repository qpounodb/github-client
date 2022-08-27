import React from 'react';
import { Languages } from '~/shared/GithubAPI';
import { RepoLang } from './RepoLang';
import styles from './RepoLangs.module.scss';

export type RepoLangsProps = {
  langs: Languages;
};

const getTotal = (langs: Languages) => {
  return Object.values(langs).reduce((acc, x) => acc + x, 0);
};

export const RepoLangs: React.FC<RepoLangsProps> = ({ langs: data }) => {
  const total = getTotal(data);
  return (
    <div className={styles.main}>
      <h2>Project Programming Languages</h2>
      <div className={styles.list}>
        {Object.entries(data).map(([lang, count]) => (
          <RepoLang key={lang} {...{ lang, count, total }} />
        ))}
      </div>
    </div>
  );
};

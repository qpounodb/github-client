import React from 'react';

import { RepoLangsModel } from '~models/github';

import { RepoBlock, RepoBlockProps, withRepoBlock } from '../withRepoBlock';

import { Lang, LangProps } from './components';
import styles from './RepoLangs.module.scss';

const getFraction = (count: number, total: number): number => {
  return Math.round((count / total) * 10000) / 100;
};

const MIN_FRACTION = 0.1;

const withFractions = (langs: RepoLangsModel): LangProps[] => {
  const total = Object.values(langs).reduce((acc, x) => acc + x, 0);
  const items = Object.entries(langs)
    .map(([lang, count]) => ({ lang, fraction: getFraction(count, total) }))
    .filter(({ fraction }) => fraction >= MIN_FRACTION);
  return items;
};

const RepoLangs: RepoBlock<RepoLangsModel> = ({
  data,
}: RepoBlockProps<RepoLangsModel>) => {
  const items = React.useMemo(() => withFractions(data), [data]);

  return (
    <>
      <h2>Project Programming Languages</h2>
      <div className={styles.list}>
        {items.map((props) => (
          <Lang key={props.lang} className={styles.list__item} {...props} />
        ))}
      </div>
    </>
  );
};

export default withRepoBlock('', RepoLangs);

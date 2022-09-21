import React from 'react';

import { IconStar } from '~assets/icons';
import { RepoModel } from '~models/github';
import { formatCount } from '~utils';

import { MONTHS } from './constants';
import styles from './Stats.module.scss';

type Props = {
  data: RepoModel;
};

const handleDate = (date: Date): string => {
  const currentYear = new Date().getFullYear();
  const year = date.getFullYear();
  const dayMonth = `${date.getDate()} ${MONTHS[date.getMonth()]}`;
  return year < currentYear ? `${dayMonth} ${year}` : dayMonth;
};

const Stats: React.FC<Props> = ({ data }) => {
  const updatedAt = React.useMemo(
    () => handleDate(data.updatedAt),
    [data.updatedAt]
  );

  return (
    <div className={styles.root}>
      <div className={styles.root__stats}>
        <span className={styles.root__stat}>
          <IconStar />
          <span>{formatCount(data.stargazersCount)}</span>
        </span>
        <span className={styles.root__stat}>Updated {updatedAt}</span>
      </div>
    </div>
  );
};

export default React.memo(Stats);

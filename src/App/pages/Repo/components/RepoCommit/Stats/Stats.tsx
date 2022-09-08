import React from 'react';
import styles from './Stats.module.scss';

export type StatsProps = {
  stats: { additions: number; deletions: number };
};

const Stats: React.FC<StatsProps> = ({ stats: { additions, deletions } }) => {
  return (
    <div className={styles.root}>
      {additions > 0 && <span className={styles.plus}>++{additions}</span>}
      {deletions > 0 && <span className={styles.minus}>--{deletions}</span>}
    </div>
  );
};

export default React.memo(Stats);

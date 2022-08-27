import React from 'react';
import styles from './Stats.module.scss';

export const Stats: React.FC<{
  stats: { additions: number; deletions: number };
}> = ({ stats: { additions, deletions } }) => {
  return (
    <div className={styles.main}>
      {additions > 0 && <span className={styles.plus}>++{additions}</span>}
      {deletions > 0 && <span className={styles.minus}>--{deletions}</span>}
    </div>
  );
};

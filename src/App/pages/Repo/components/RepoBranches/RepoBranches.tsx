import React from 'react';
import { IconBranch } from '~/App/assets/icons';
import { Branch } from '~/shared/GithubAPI';
import styles from './RepoBranches.module.scss';

export type RepoBranchesProps = {
  branches: Branch[];
};

const noVersionNum = ({ name }: Branch): boolean => !/\d/.test(name);

export const RepoBranches: React.FC<RepoBranchesProps> = ({ branches }) => {
  return (
    <div className={styles.main}>
      <h2>Branches</h2>
      <div className={styles.list}>
        {branches.filter(noVersionNum).map(({ name }) => (
          <div className={styles.item} key={name}>
            <IconBranch /> {name}
          </div>
        ))}
      </div>
    </div>
  );
};

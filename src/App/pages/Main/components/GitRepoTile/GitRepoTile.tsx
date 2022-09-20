import React from 'react';

import { Card } from '~components/Card';
import { ExternalLink } from '~components/ExternalLink';
import { RepoModel } from '~models/github';

import { Stats } from './components';
import styles from './GitRepoTile.module.scss';

export type GitRepoTileProps = {
  data: RepoModel;
  placeholder?: string;
  onClick?: React.MouseEventHandler;
};

const GitRepoTile: React.FC<GitRepoTileProps> = ({
  data,
  placeholder,
  onClick,
}) => {
  return (
    <Card
      className={styles.card}
      onClick={onClick}
      imageUrl={data.owner.avatarUrl}
      placeholder={placeholder || data.owner.login}
      title={data.name}
      subtitle={
        <ExternalLink url={data.owner.htmlUrl}>{data.owner.login}</ExternalLink>
      }
      content={<Stats data={data} />}
    />
  );
};

export default React.memo(GitRepoTile);

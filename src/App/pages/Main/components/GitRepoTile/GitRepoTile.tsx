import React from 'react';
import { IconStar } from '~/App/assets/icons';
import { Card } from '~/App/components/Card';
import { RepoModel } from '~/App/models/GitHub';
import { MONTHS } from '~/shared/constants';
import { formatCount } from '~/shared/utils';
import styles from './GitRepoTile.module.scss';

export type GitRepoTileProps = {
  data: RepoModel;
  placeholder?: string;
  onClick?: React.MouseEventHandler;
};

export const GitRepoTile: React.FC<GitRepoTileProps> = ({
  data,
  placeholder,
  onClick,
}) => {
  const updatedAt = React.useMemo(() => {
    const date = data.updatedAt;
    const currentYear = new Date().getFullYear();
    const dayMonth = `${date.getDate()} ${MONTHS[date.getMonth()]}`;
    const year = date.getFullYear();
    return year < currentYear ? `${dayMonth} ${year}` : dayMonth;
  }, [data.updatedAt]);

  const link = (
    <a
      className={styles.link}
      href={data.owner.htmlUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      {data.owner.login}
    </a>
  );

  const content = (
    <div className={styles.content}>
      <span className={styles.stars}>
        <IconStar />
        <span>{formatCount(data.stargazersCount)}</span>
      </span>
      <span>Updated {updatedAt}</span>
    </div>
  );

  return (
    <Card
      className={styles.card}
      onClick={onClick}
      image={data.owner.avatarUrl}
      placeholder={placeholder || data.owner.login}
      title={data.name}
      subtitle={link}
      content={content}
    />
  );
};

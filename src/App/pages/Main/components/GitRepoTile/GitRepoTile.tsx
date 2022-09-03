import React from 'react';
import { IconStar } from '~/App/assets/icons';
import { Card } from '~/App/components/Card';
import { MONTHS } from '~/shared/constants';
import { Repository } from '~/shared/GithubAPI';
import { formatCount } from '~/shared/utils';
import styles from './GitRepoTile.module.scss';

export type GitRepoTileProps = {
  data: Repository;
  placeholder?: string;
  onClick?: React.MouseEventHandler;
};

export const GitRepoTile: React.FC<GitRepoTileProps> = ({
  data,
  placeholder,
  onClick,
}) => {
  const updatedAt = React.useMemo(() => {
    const date = new Date(data.updated_at);
    const dayMonth = `${date.getDate()} ${MONTHS[date.getMonth()]}`;
    const year = date.getFullYear();
    return year < new Date().getFullYear() ? `${dayMonth} ${year}` : dayMonth;
  }, [data.updated_at]);

  const link = (
    <a
      className={styles.link}
      href={data.owner.html_url}
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
        <span>{formatCount(data.stargazers_count)}</span>
      </span>
      <span>Updated {updatedAt}</span>
    </div>
  );

  return (
    <Card
      className={styles.card}
      onClick={onClick}
      image={data.owner.avatar_url}
      placeholder={placeholder || data.owner.login}
      title={data.name}
      subtitle={link}
      content={content}
    />
  );
};

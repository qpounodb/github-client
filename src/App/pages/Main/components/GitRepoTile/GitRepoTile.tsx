import React from 'react';
import { Card } from '~/App/components/Card';
import { SvgStar } from '~/App/components/Svg';
import { MONTHS } from '~/shared/constants';
import { Owner, Repository } from '~/shared/GithubAPI';
import styles from './GitRepoTile.module.scss';

export type ApiData = Pick<
  Repository,
  'id' | 'name' | 'html_url' | 'updated_at' | 'stargazers_count'
> & {
  owner: Pick<Owner, 'login' | 'html_url' | 'avatar_url'>;
};

export type GitRepoTileProps = {
  apiData: ApiData;
  placeholder?: string;
  onClick?: React.MouseEventHandler;
};

export const GitRepoTile: React.FC<GitRepoTileProps> = ({
  apiData,
  placeholder,
  onClick,
}) => {
  const updatedAt = React.useMemo(() => {
    const date = new Date(apiData.updated_at);
    const dayMonth = `${date.getDate()} ${MONTHS[date.getMonth()]}`;
    const year = date.getFullYear();
    return year < new Date().getFullYear() ? `${dayMonth} ${year}` : dayMonth;
  }, [apiData.updated_at]);

  const link = (
    <a
      className={styles.link}
      href={apiData.owner.html_url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {apiData.owner.login}
    </a>
  );

  const content = (
    <div className={styles.content}>
      <span className={styles.stars}>
        <SvgStar />
        <span>{apiData.stargazers_count}</span>
      </span>
      <span>Updated {updatedAt}</span>
    </div>
  );

  return (
    <Card
      className={styles.card}
      onClick={onClick}
      image={apiData.owner.avatar_url}
      placeholder={placeholder || apiData.owner.login}
      title={apiData.name}
      subtitle={link}
      content={content}
    />
  );
};

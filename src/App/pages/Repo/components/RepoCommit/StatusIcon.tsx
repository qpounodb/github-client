import React from 'react';
import {
  IconAdded,
  IconIssue,
  IconModified,
  IconRemoved,
  IconRenamed,
} from '~/App/assets/icons';
import { CommitFile } from '~/shared/GithubAPI';
import { classname } from '~/shared/utils';
import styles from './StatusIcon.module.scss';

type Icon = React.FC<React.SVGProps<SVGSVGElement> & { title?: string }>;

const getIcon = (Icon: Icon, className: string, title: string) => {
  const cls = classname(styles.icon, className);
  return <Icon className={cls} title={title} />;
};

export const StatusIcon: React.FC<{ file: CommitFile }> = ({
  file: { status },
}) => {
  switch (status) {
    case 'added':
      return getIcon(IconAdded, styles.added, status);
    case 'modified':
      return getIcon(IconModified, styles.modified, status);
    case 'removed':
      return getIcon(IconRemoved, styles.removed, status);
    case 'renamed':
      return getIcon(IconRenamed, styles.renamed, status);
    default:
      return getIcon(IconIssue, styles.unknown, status);
  }
};
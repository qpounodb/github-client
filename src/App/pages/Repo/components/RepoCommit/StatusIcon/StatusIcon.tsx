import React from 'react';
import {
  IconAdded,
  IconIssue,
  IconModified,
  IconRemoved,
  IconRenamed,
} from '~/App/assets/icons';
import { CommitFileModel } from '~/App/models/github';
import { joinClassName } from '~/shared/utils';
import styles from './StatusIcon.module.scss';

const getIcon = (Icon: typeof IconAdded, className: string, title: string) => (
  <Icon className={joinClassName(styles.icon, className)} title={title} />
);

export type StatusIconProps = { file: CommitFileModel };

const StatusIcon: React.FC<StatusIconProps> = ({ file: { status } }) => {
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

export default React.memo(StatusIcon);

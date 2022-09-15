import React from 'react';

import { Message } from '~/App/stores/RootStore/NotifyStore';

import { MessageView } from '../MessageView';

import styles from './NotifyView.module.scss';

export type NotifyViewProps = {
  messages: Message[];
  onClose?: (id: number) => void;
};

const NotifyView: React.FC<NotifyViewProps> = ({ messages, onClose }) => {
  return (
    <div className={styles.root}>
      <div className={styles.root__queue}>
        {messages.map((message) => (
          <div className={styles.root__item} key={message.id}>
            <MessageView message={message} onClose={onClose} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(NotifyView);

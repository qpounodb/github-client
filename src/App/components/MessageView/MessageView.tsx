import React from 'react';
import { Level, Message } from '~/App/stores/RootStore/NotifyStore';
import { joinClassName } from '~/shared/utils';
import styles from './MessageView.module.scss';

export type MessageViewProps = {
  message: Message;
  onClose?: () => void;
};

const getTite = (level: Level): string => {
  switch (level) {
    case Level.error:
      return `⛔ ${level}`;
    case Level.warn:
      return `⚠️ ${level}`;
    case Level.info:
      return `\u2139\uFE0F ${level}`;
    default:
      return level;
  }
};

const MessageView: React.FC<MessageViewProps> = ({ message, onClose }) => {
  return (
    <div
      className={joinClassName(
        styles.root,
        styles[`root_${message.level.toLowerCase() as keyof typeof Level}`]
      )}
    >
      <div className={styles.root__title}>
        <span>{getTite(message.level)}</span>
      </div>
      <div className={styles.root__text}>{message.text}</div>
      <div className={styles.root__time}>
        {message.time.toLocaleTimeString()}
      </div>
      <div className={styles.root__close} onClick={onClose}></div>
    </div>
  );
};

export default React.memo(MessageView);

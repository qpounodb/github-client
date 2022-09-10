import React from 'react';
import { Level, Message } from '~/App/stores/RootStore/NotifyStore';
import { joinClassName } from '~/shared/utils';
import styles from './MessageView.module.scss';

export type MessageViewProps = {
  message: Message;
  onClose?: (id: number) => void;
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

const MessageView: React.FC<MessageViewProps> = ({
  message: { id, level, text, time },
  onClose,
}) => {
  const handleClose = React.useCallback(() => onClose?.(id), [id, onClose]);

  const rootClassName = React.useMemo(
    () =>
      joinClassName(
        styles.root,
        styles[`root_${level.toLowerCase() as keyof typeof Level}`]
      ),
    [level]
  );

  const title = React.useMemo(() => getTite(level), [level]);
  const LocaleTime = React.useMemo(() => time.toLocaleTimeString(), [time]);

  return (
    <div className={rootClassName}>
      <div className={styles.root__title}>
        <span>{title}</span>
      </div>
      <div className={styles.root__text}>
        <code>
          <pre>{text}</pre>
        </code>
      </div>
      <div className={styles.root__time}>{LocaleTime}</div>
      <div className={styles.root__close} onClick={handleClose}></div>
    </div>
  );
};

export default React.memo(MessageView);

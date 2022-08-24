import React from 'react';
import { classname } from '~/shared/utils';
import styles from './Card.module.scss';

export type CardProps = {
  image: string;
  placeholder?: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  content?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  className?: string;
};

const DEFAULT_AVATAR_ALT = 'avatar';
const DEFAULT_PLACEHOLDER = '🍥';

export const Card: React.FC<CardProps> = ({
  image,
  placeholder = DEFAULT_PLACEHOLDER,
  title,
  subtitle,
  content,
  onClick,
  className,
}) => {
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  React.useEffect(() => {
    if (!imgRef.current) return;
    const img = imgRef.current;
    const onLoad = () => img.classList.remove(styles.avatar_hidden);
    img.addEventListener('load', onLoad);
    return () => img.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className={classname(styles.card, className)} onClick={onClick}>
      <div className={styles.side}>
        <div className={styles.placeholder}>
          {placeholder.at(0)?.toUpperCase() || DEFAULT_PLACEHOLDER}
        </div>
        <img
          ref={imgRef}
          className={classname(styles.avatar, styles.avatar_hidden)}
          src={image}
          alt={DEFAULT_AVATAR_ALT}
        />
      </div>
      <div className={styles.main}>
        <div className={classname(styles.item, styles.title)}>{title}</div>
        <div className={styles.item}>{subtitle}</div>
        <div className={styles.item}>{content}</div>
      </div>
    </div>
  );
};

import React from 'react';

import { joinClassName } from '~/shared/utils';

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

const Card: React.FC<CardProps> = ({
  image,
  placeholder = DEFAULT_PLACEHOLDER,
  title,
  subtitle,
  content,
  onClick,
  className,
}) => {
  const placeholderRef = React.useRef<HTMLDivElement | null>(null);
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  React.useEffect(() => {
    const img = imgRef.current;
    const placeholder = placeholderRef.current;
    const onLoad = () => {
      placeholder?.classList.add(styles.hidden);
      img?.classList.remove(styles.hidden);
    };
    img?.addEventListener('load', onLoad);
    return () => img?.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className={joinClassName(styles.root, className)} onClick={onClick}>
      <div className={styles.root__side}>
        <div ref={placeholderRef} className={styles.root__placeholder}>
          {placeholder.at(0)?.toUpperCase() || DEFAULT_PLACEHOLDER}
        </div>
        <img
          ref={imgRef}
          className={joinClassName(styles.root__avatar, styles.hidden)}
          src={image}
          alt={DEFAULT_AVATAR_ALT}
        />
      </div>
      <div className={styles.root__main}>
        <div className={joinClassName(styles.root__item, styles.root__title)}>
          {title}
        </div>
        <div className={styles.root__item}>{subtitle}</div>
        <div className={styles.root__item}>{content}</div>
      </div>
    </div>
  );
};

export default React.memo(Card);

import React from 'react';

import { useImagePlaceholder } from '~hooks';
import { joinClassName as join } from '~utils';

import styles from './Card.module.scss';

export type CardProps = {
  imageUrl: string;
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
  imageUrl,
  placeholder = DEFAULT_PLACEHOLDER,
  title,
  subtitle,
  content,
  onClick,
  className,
}) => {
  const { placeholderRef, imgRef } = useImagePlaceholder(
    imageUrl,
    styles.hidden
  );

  const placeholderText = React.useMemo(() => {
    return placeholder.at(0)?.toUpperCase() || DEFAULT_PLACEHOLDER;
  }, [placeholder]);

  return (
    <div className={join(styles.root, className)} onClick={onClick}>
      <div className={styles.root__side}>
        <div ref={placeholderRef} className={styles.root__placeholder}>
          {placeholderText}
        </div>
        <img
          ref={imgRef}
          alt={DEFAULT_AVATAR_ALT}
          className={styles.root__avatar}
        />
      </div>
      <div className={styles.root__main}>
        <div className={join(styles.root__item, styles.root__title)}>
          {title}
        </div>
        <div className={styles.root__item}>{subtitle}</div>
        <div className={styles.root__item}>{content}</div>
      </div>
    </div>
  );
};

export default React.memo(Card);

import React from 'react';

type ResultRefs = {
  placeholderRef: React.MutableRefObject<HTMLDivElement | null>;
  imgRef: React.MutableRefObject<HTMLImageElement | null>;
};

export const useImagePlaceholder = (
  imageUrl: string,
  classNameHidden: string
): ResultRefs => {
  const placeholderRef = React.useRef<HTMLDivElement | null>(null);
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  React.useEffect(() => {
    const img = imgRef.current;
    const placeholder = placeholderRef.current;

    if (!img) return;

    const onInit = () => {
      placeholder?.classList.remove(classNameHidden);
      img?.classList.add(classNameHidden);
    };

    const onLoad = () => {
      placeholder?.classList.add(classNameHidden);
      img?.classList.remove(classNameHidden);
    };

    onInit();
    img.src = imageUrl;

    if (img?.complete) {
      onLoad();
    } else {
      img?.addEventListener('load', onLoad);
      return () => img?.removeEventListener('load', onLoad);
    }
  }, [classNameHidden, imageUrl]);

  return { placeholderRef, imgRef };
};

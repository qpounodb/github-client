import React from 'react';

export type LinkProps = {
  url: string;
  title?: string;
  text?: string;
  Logo: SvgComponent;
};

const Link: React.FC<LinkProps> = ({ url, title, text, Logo }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" title={title}>
      <Logo /> {text}
    </a>
  );
};

export default React.memo(Link);

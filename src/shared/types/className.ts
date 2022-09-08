export type PropsWithClassName<P = unknown> = P & { className?: string };

export type PropsWithChildrenAndClassname<P = unknown> =
  React.PropsWithChildren<PropsWithClassName<P>>;

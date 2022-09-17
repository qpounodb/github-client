export type PropsWithClassName<P = unknown> = P & { className?: string };

export type PropsWithChildrenAndClassName<P = unknown> =
  React.PropsWithChildren<PropsWithClassName<P>>;

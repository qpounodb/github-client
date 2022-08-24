export type Styles = {
  avatar: string;
  avatar_hidden: string;
  card: string;
  item: string;
  main: string;
  placeholder: string;
  side: string;
  title: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

export type Styles = {
  autor: string;
  avatar: string;
  changes: string;
  commit: string;
  list: string;
  main: string;
  sign: string;
  title: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

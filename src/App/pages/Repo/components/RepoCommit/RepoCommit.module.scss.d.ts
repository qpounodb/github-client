export type Styles = {
  author: string;
  avatar: string;
  changes: string;
  commit: string;
  filename: string;
  list: string;
  sign: string;
  title: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

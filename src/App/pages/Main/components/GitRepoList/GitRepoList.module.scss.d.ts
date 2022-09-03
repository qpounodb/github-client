export type Styles = {
  code: string;
  list: string;
  note: string;
  root: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

export type Styles = {
  code: string;
  list: string;
  main: string;
  note: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

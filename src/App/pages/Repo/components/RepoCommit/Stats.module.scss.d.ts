export type Styles = {
  main: string;
  minus: string;
  plus: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

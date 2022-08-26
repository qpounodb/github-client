export type Styles = {
  main: string;
  size_l: string;
  size_m: string;
  size_s: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

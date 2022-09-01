export type Styles = {
  loader: string;
  loading: string;
  main: string;
  primary: string;
  secondary: string;
  size_l: string;
  size_m: string;
  size_s: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

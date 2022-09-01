export type Styles = {
  loader: string;
  loading: string;
  primary: string;
  secondary: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

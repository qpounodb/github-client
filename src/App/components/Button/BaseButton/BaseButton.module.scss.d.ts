export type Styles = {
  button: string;
  primary: string;
  secondary: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

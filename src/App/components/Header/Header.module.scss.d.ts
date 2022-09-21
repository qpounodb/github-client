export type Styles = {
  block: string;
  root: string;
  root__logo: string;
  root__switch: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

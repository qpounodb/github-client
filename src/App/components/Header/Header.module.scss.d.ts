export type Styles = {
  root: string;
  root__content: string;
  root__logo: string;
  root__switch: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

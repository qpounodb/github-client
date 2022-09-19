export type Styles = {
  block: string;
  root: string;
  root__item: string;
  root__link: string;
  root__logo: string;
  root__logo_school: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

export type Styles = {
  root: string;
  root__hero: string;
  root__picture: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

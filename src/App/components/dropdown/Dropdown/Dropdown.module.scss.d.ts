export type Styles = {
  root: string;
  root__input: string;
  root__list: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

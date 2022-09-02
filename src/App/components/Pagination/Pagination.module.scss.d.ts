export type Styles = {
  root: string;
  root__counter: string;
  root__input: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

export type Styles = {
  root: string;
  root__counter: string;
  root__icon: string;
  root__icon_first: string;
  root__icon_last: string;
  root__icon_next: string;
  root__icon_prev: string;
  root__input: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

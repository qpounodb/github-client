export type Styles = {
  root: string;
  root__input: string;
  root__list: string;
  root_disabled: string;
  root_open: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

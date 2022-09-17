export type Styles = {
  root: string;
  root__checkbox: string;
  root_disabled: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

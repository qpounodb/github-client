export type Styles = {
  root: string;
  root__close: string;
  root__text: string;
  root__time: string;
  root__title: string;
  root_error: string;
  root_info: string;
  root_warn: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

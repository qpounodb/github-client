export type Styles = {
  block: string;
  root: string;
  root__item: string;
  root__item_school: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

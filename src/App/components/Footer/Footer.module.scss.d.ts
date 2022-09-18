export type Styles = {
  root: string;
  root__content: string;
  root__item: string;
  root__item_kts: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

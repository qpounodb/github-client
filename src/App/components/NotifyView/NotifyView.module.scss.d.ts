export type Styles = {
  root: string;
  root__item: string;
  root__queue: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

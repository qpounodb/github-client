export type Styles = {
  root: string;
  root__content: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

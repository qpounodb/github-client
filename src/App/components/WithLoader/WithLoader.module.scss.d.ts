export type Styles = {
  root: string;
  root__cover: string;
  root__message: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

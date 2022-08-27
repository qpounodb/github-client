export type Styles = {
  container: string;
  cover: string;
  message: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

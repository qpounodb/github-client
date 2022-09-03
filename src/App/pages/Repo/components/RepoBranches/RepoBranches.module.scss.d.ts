export type Styles = {
  item: string;
  list: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

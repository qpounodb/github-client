export type Styles = {
  input: string;
  item: string;
  item_selected: string;
  list: string;
  main: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

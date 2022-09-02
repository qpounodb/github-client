export type Styles = {
  root: string;
  'root_size-l': string;
  'root_size-m': string;
  'root_size-s': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

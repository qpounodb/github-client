export type Styles = {
  root: string;
  root__dates: string;
  root__stat: string;
  root__stats: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

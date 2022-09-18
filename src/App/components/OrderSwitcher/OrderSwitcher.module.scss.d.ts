export type Styles = {
  root: string;
  root__arrow: string;
  root__arrow_asc: string;
  root__arrow_desc: string;
  root__arrow_small: string;
  root_disabled: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

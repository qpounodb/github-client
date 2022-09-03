export type Styles = {
  root: string;
  root__cover: string;
  root__cover_loading: string;
  root__message: string;
  root__message_loading: string;
  root_loading: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;

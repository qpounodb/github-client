export type PaginationProps = {
  onSubmit: (page: number) => void;
  page?: number;
  count: number;
  disabled?: boolean;
};

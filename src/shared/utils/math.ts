export const getPagesCount = (total: number, perPage: number): number => {
  return total > 1 ? Math.ceil(total / perPage) : total;
};

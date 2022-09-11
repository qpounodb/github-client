export const formatCount = (count: number): string =>
  count < 1000 ? String(count) : `${Math.round(count / 100) / 10}k`;

export const formatCode = (x: unknown): string => JSON.stringify(x, null, 4);

export const capitalize = (from: string): string => {
  const str = from.trim();
  const head = str.slice(0, 1).toUpperCase();
  const tail = str.slice(1).toLowerCase();
  return `${head}${tail}`;
};

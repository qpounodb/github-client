export const removeUndefined = <T extends object>(obj: T): T =>
  Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  ) as T;

export const remapRecord = <
  RA extends Record<K, A>,
  RB extends Record<K, B>,
  K extends keyof RA,
  A = RA[K],
  B = RB[K]
>(
  record: RA,
  remap: (a: A) => B
): RB => {
  return Object.fromEntries(
    Object.entries<A>(record).map(([k, a]) => [k, remap(a)])
  ) as RB;
};

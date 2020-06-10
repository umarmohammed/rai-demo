export interface Range {
  max: number;
  min: number;
}

export function range(arr: number[]): Range {
  return arr.reduce(
    (acc, curr) => ({
      max: curr > acc.max ? curr : acc.max,
      min: curr < acc.min ? curr : acc.min,
    }),
    { max: 0, min: Number.MAX_VALUE }
  );
}

const items = {} as const;

export const itemStyle = (x: string) => {
  return x;
};

type Keys = keyof typeof items;
export type Item = (typeof items)[Keys];

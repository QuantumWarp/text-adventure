const characters = {} as const;

export const characterStyle = (x: string) => {
  return x;
};

type Keys = keyof typeof characters;
export type Character = (typeof characters)[Keys];

import chalk from "chalk";

const characters = {

} as const;

export const characterStyle = (x: string) => {
  return chalk.yellow(x);
};

type Keys = keyof typeof characters;
export type Character = typeof characters[Keys];
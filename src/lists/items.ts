import chalk from "chalk";

const items = {

};

export const itemStyle = (x: string) => {
  return chalk.yellow(x);
};

type Keys = keyof typeof items;
export type Item = typeof items[Keys];

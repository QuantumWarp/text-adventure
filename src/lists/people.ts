import chalk from "chalk";
import { copyObjStrings } from "../helpers/utils.js";

const peopleUnstyled = {
  barry: 'Barry',
};

export const peopleStyle = (x: string) => {
  chalk.yellow(x);
};

export const people = copyObjStrings(
  peopleUnstyled,
  peopleStyle,
);

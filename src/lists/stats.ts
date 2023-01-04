import chalk from "chalk";
import { copyObjStrings } from "../helpers/utils.js";

const statsUnstyled = {

};

export const statsStyle = (x: string) => {
  chalk.green(x);
};

export const stats = copyObjStrings(
  statsUnstyled,
  statsStyle,
);

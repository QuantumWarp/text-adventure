import chalk from "chalk";
import { copyObjStrings } from "../helpers/utils.js";

const itemsUnstyled = {

};

export const itemsStyle = (x: string) => {
  chalk.yellow(x);
};

export const items = copyObjStrings(
  itemsUnstyled,
  itemsStyle,
);

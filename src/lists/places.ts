import chalk from "chalk";
import { copyObjStrings } from "../helpers/utils.js";

const placesUnstyled = {

};

export const placesStyle = (x: string) => {
  chalk.magenta(x);
};

export const places = copyObjStrings(
  placesUnstyled,
  placesStyle,
);

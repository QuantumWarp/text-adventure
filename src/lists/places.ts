import chalk from "chalk";
import { copyObjStrings } from "../helpers/utils.js";

const placesUnstyled = {
  theMountains: 'The Mountains',
  forestOfNithe: 'Forest of Nithe',
  diseasedLands: 'Diseased Lands',
  athos: 'Athos',
  athosCityOfSails: 'Athos, City of Sails',
};

export const placesStyle = (x: string) => {
  return chalk.magenta(x);
};

export const places = copyObjStrings(
  placesUnstyled,
  placesStyle,
);

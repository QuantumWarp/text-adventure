import chalk from "chalk";
import { copyObjStrings } from "../helpers/utils.js";

const placesUnstyled = {
  village: 'Village',
  theMountains: 'The Mountains',
  forestOfNithe: 'Forest of Nithe',
  diseasedLands: 'Diseased Lands',
  athos: 'Athos',
  athosCityOfSails: 'Athos, City of Sails',
  northernPath: 'Northern Path to The Mountains',
  easternPath: 'Eastern Path to the Forest of Nithe',
  southernPath: 'Southern Path to the Diseased Lands',
  westernPath: 'Western Path to Athos, City of Sails',
};

export const placesStyle = (x: string) => {
  return chalk.magenta(x);
};

export const places = copyObjStrings(
  placesUnstyled,
  placesStyle,
);

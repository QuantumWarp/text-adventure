import styles from "ansi-styles";

export const places = {
  village: "Village",
  theMountains: "The Mountains",
  forestOfNithe: "Forest of Nithe",
  diseasedLands: "Diseased Lands",
  athos: "Athos",
  athosCityOfSails: "Athos, City of Sails",
  northernPath: "Northern Path to The Mountains",
  easternPath: "Eastern Path to the Forest of Nithe",
  southernPath: "Southern Path to the Diseased Lands",
  westernPath: "Western Path to Athos, City of Sails",
} as const;

export const generalPaths = [
  places.northernPath,
  places.easternPath,
  places.southernPath,
  places.westernPath,
];

export const placeStyle = (x: string) => {
  return styles.magenta.open + x + styles.magenta.close;
};

type Keys = keyof typeof places;
export type Place = (typeof places)[Keys];

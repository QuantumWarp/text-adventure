import { State } from "../state/state.js";

export enum ChanceVal {
  Certain = Infinity,
  AlmostCertain = 100,
  VeryLikely = 20,
  Likely = 5,
  Standard = 1,
  Unlikely = 0.5,
  VeryUnlikely =  0.1,
  AlmostImpossible = 0.02,
  Impossible = 0,
}

export type Chance = undefined | number | ((state: State) => number);

export const chanceSelect = <T extends { chance?: Chance }>(
  objects: T[], state: State,
) => {
  let chances = objects.map((x) => ({
    result: x,
    chance: resolveChance(x.chance, state) 
  }));

  const allImpossible = !chances.find((x) => x.chance !== ChanceVal.Impossible);
  const anyCertain = !!chances.find((x) => x.chance === ChanceVal.Certain);
  
  if (anyCertain) {
    chances = chances
      .filter((x) => x.chance === Infinity)
      .map((x) => ({ ...x, chance: ChanceVal.Standard }));
  } else if (allImpossible) {
    chances = chances
      .map((x) => ({ ...x, chance: ChanceVal.Standard }));
  } else {
    chances = chances.filter((x) => x.chance !== ChanceVal.Impossible);
  }
  
  return checkComparableChances(chances);
};

const resolveChance = (chance: Chance, state: State): number => {
  if (chance === undefined) return ChanceVal.Standard;
  if (typeof chance === "number") return chance;
  return chance(state);
};

const checkComparableChances = <T>(chances: { chance: number, result: T }[]) => {
  const chanceTotal = chances.reduce((sum, x) => sum + x.chance, 0);
  const rand = Math.random() * chanceTotal;

  let cumulative = 0;
  const selected = chances.find((x) => {
    cumulative += x.chance;
    return cumulative > rand;
  });

  return selected.result;
};

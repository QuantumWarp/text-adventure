import { State } from "../state/state.js";

export type Chance = undefined | number | ((state: State) => number);

export const chanceSelect = <T extends { chance?: Chance }>(
  objects: T[], state: State,
) => {
  let chances = objects.map((x) => ({
    result: x,
    chance: resolveChance(x.chance, state) 
  }));

  const allZero = !chances.find((x) => x.chance !== 0);
  const anyInfinite = !!chances.find((x) => x.chance === Infinity);
  
  if (anyInfinite) {
    chances = chances
      .filter((x) => x.chance === Infinity)
      .map((x) => ({ ...x, chance: 1 }));
  } else if (allZero) {
    chances = chances
      .map((x) => ({ ...x, chance: 1 }));
  } else {
    chances = chances.filter((x) => x.chance !== 0);
  }
  
  return checkComparableChances(chances);
};

const resolveChance = (chance: Chance, state: State): number => {
  if (chance === undefined) return 1;
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

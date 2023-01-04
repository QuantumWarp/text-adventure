export async function sleep(delayMs: number) {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

export const copyObjStrings = <T>(obj: T, propFunc: (value: any) => any) => {
  const copy = { ...obj };
  const keys = Object.keys(copy) as (keyof typeof copy)[];
  keys.forEach((x) => {
    copy[x] = propFunc(obj[x])
  })
  return copy;
}
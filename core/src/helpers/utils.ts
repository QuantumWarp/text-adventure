import ansiRegex from "ansi-regex";

export async function sleep(delayMs: number) {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

export const removeAnsi = (text: string): string => {
  return text.replace(ansiRegex(), "");
};

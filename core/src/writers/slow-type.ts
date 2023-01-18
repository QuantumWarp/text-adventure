import ansiRegex from "ansi-regex";
import { GameInterface } from "../game-interface.js";
import { sleep } from "../helpers/utils.js";

export async function slowType(
  gameInterface: GameInterface,
  message: string,
  characterDelay = 10,
  eolDelay = 500
): Promise<void> {
  let leftToType = message + "\r\n";
  let skipped = false;

  const writeRemainder = () => {
    gameInterface.write(leftToType);
    leftToType = "";
    skipped = true;
  };

  const subscription = gameInterface.onKey.subscribe(() => writeRemainder());

  while (leftToType.length > 0) {
    leftToType = writeAnsiChars(gameInterface, leftToType);

    const nextCharacter = leftToType[0];
    leftToType = leftToType.slice(1);
    gameInterface.write(nextCharacter);
    await sleep(characterDelay);

    leftToType = writeAnsiChars(gameInterface, leftToType);
  }

  subscription.unsubscribe();

  if (!skipped) {
    await sleep(eolDelay);
  }
}

function writeAnsiChars(gameInterface: GameInterface, message: string): string {
  let leftToType = message;
  let start = "";

  do {
    start = startingCharacters(leftToType);
    leftToType = leftToType.slice(start.length);
    gameInterface.write(start);
  } while (start !== "");

  return leftToType;
}

function startingCharacters(message: string): string {
  const regex = ansiRegex({ onlyFirst: true });
  const result = message.match(regex);
  if (!result || result.length === 0) return "";

  const firstAnsi = result[0];
  if (!message.startsWith(firstAnsi)) return "";

  return firstAnsi;
}

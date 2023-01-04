import chalk from "chalk";
import ansiRegex from 'ansi-regex';
import { sleep } from "./utils.js";

export async function slowType(message: string, characterDelay = 4, eolDelay = 500): Promise<void> {
  let leftToType = chalk.blue.bold(message + '\r\n');
  let skipped = false;

  const writeRemainder = () => {
    process.stdout.write(leftToType);
    leftToType = '';
    skipped = true;
  };

  process.stdin.resume();
  process.stdin.setRawMode(true);
  process.stdin.once('data', writeRemainder);
  
  while (leftToType.length > 0) {
    leftToType = writeAnsiChars(leftToType);

    const nextCharacter = leftToType[0];
    leftToType = leftToType.slice(1);
    process.stdout.write(nextCharacter);
    await sleep(characterDelay);

    leftToType = writeAnsiChars(leftToType);
  }

  if (!skipped) {
    await sleep(eolDelay);
  }
}

function writeAnsiChars(message: string): string {
  let leftToType = message;
  let start = '';

  do {
    start = startingCharacters(leftToType);
    leftToType = leftToType.slice(start.length);
    process.stdout.write(start);
  } while (start !== '')

  return leftToType;
}

function startingCharacters(message: string): string {
  const regex = ansiRegex({ onlyFirst: true });
  const result = message.match(regex);
  if (!result || result.length === 0) return '';

  const firstAnsi = result[0];
  if (!message.startsWith(firstAnsi)) return '';

  return firstAnsi;
}

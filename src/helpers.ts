import chalk from "chalk";
import MuteStream from "mute-stream";
import readline, { createInterface, emitKeypressEvents } from "readline";

async function sleep(delayMs: number) {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

export async function slowType(message: string, characterDelay = 100): Promise<void> {
  let leftToType = chalk.bold.blue(message + '\r\n');

  const writeRemainder = () => {
    process.stdout.write(leftToType);
    leftToType = '';
  };

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  // rl.prompt();
  // //rl.resume();
  // rl.on('line', writeRemainder);

  // process.stdin.once("data", writeRemainder);
  process.stdin.resume();
  await new Promise(resolve => rl.question('Test', resolve));

  process.stdin.setRawMode(true);
  process.stdin.on('data', writeRemainder);
  
  while (leftToType.length > 0) {
    const nextCharacter = leftToType[0];
    leftToType = leftToType.slice(1);
    process.stdout.write(nextCharacter);
    await sleep(characterDelay);
  }
  process.stdin.setRawMode(false);

  rl.close();
}

import { GameInterface } from "./game-interface.js";
import { Game } from "./game.js";

async function run() {
  const gameInterface = new GameInterface();

  gameInterface.onWrite.subscribe((x) => process.stdout.write(x));

  process.stdin.setRawMode(true);
  process.stdin.on("data", (chunk) => {
    if (chunk.toString() === "\u0003") {
      process.exit(0);
    }
    gameInterface.keypress(chunk.toString());
  });

  const game = new Game(gameInterface);
  await game.run();
}

run();

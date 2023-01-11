import { Game } from "./game.js";

export { Game };

async function run() {
  const game = new Game();
  await game.run();
  process.exit(0);
}

run();

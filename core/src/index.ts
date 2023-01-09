import { Game } from "./game.js";

async function run() {
  const game = new Game();
  await game.run();
  process.exit(0);
}

run();

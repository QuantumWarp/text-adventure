import { Game } from "./game.js";

export { Game };

async function run() {
  const game = new Game({
    interface: {
      write: (x) => process.stdout.write(x),
      handler: (x) => x,
    },
  });
  await game.run();
  process.exit(0);
}

run();

import { State } from "./state/state.js";
import { events } from "./lists/events.js";
import { chanceSelect } from "./helpers/chance.js";
import { Write } from "./helpers/write.js";

export class Game {
  state = new State();

  async run() {
    Write.clear();

    while (!this.state.ended) {
      const event = chanceSelect(events, this.state);
      const outcome = await event.run(this.state);
      this.state.journey.add(event, outcome);
    }
  }
}
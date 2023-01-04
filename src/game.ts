import { Event } from "./event.js";
import { State } from "./state/state.js";
import events from "./lists/events.js";

export class Game {
  state = new State();

  async run() {
    while (!this.state.ended) {
      const event = this.selectEvent();
      const outcome = await event.run(this.state);
      this.state.journey.add(event, outcome);
    }
  }

  private selectEvent(): Event {
    return events[0];
  }
}
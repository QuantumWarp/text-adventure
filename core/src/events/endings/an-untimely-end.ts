import { State } from "../../state/state.js";
import { Event } from "../../event.js";

export class AnUntimelyEnd extends Event {
  name = "An Untimely End";

  chance = (state: State): number => {
    if (state.journey.visited(this.name)) return 0;
    return Infinity;
  };
}

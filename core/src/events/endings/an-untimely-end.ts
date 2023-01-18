import { State } from "../../state/state.js";
import { GameEvent } from "../../game-event.js";

export class AnUntimelyEnd extends GameEvent {
  name = "An Untimely End";

  chance = (state: State): number => {
    if (state.journey.visited(this.name)) return 0;
    return Infinity;
  };
}

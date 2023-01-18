import { Writer } from "../writers/writer.js";
import { GameEvent } from "../game-event.js";
import { BrokenDownCart } from "../events/general/broken-down-cart.js";
import { Introduction } from "../events/introduction.js";
import { State } from "../state/state.js";
import { AnInnOnTheRoad } from "../events/general/an-inn-on-the-road.js";

export const events: (new (writer: Writer, state: State) => GameEvent)[] = [
  Introduction,
  AnInnOnTheRoad,
  BrokenDownCart,
];

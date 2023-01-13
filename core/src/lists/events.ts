import { Writer } from "../writers/writer.js";
import { Event } from "../event.js";
import { BrokenDownCart } from "../events/general/broken-down-cart.js";
import { Introduction } from "../events/introduction.js";
import { State } from "../state/state.js";

export const events: (new (writer: Writer, state: State) => Event)[] = [
  Introduction,
  BrokenDownCart,
];

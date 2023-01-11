import { Writer } from "../writers/writer.js";
import { Event } from "../event.js";
import { BrokenDownCart } from "../events/general/broken-down-cart.js";
import { Introduction } from "../events/introduction.js";

export const events: (new (writer: Writer) => Event)[] = [
  Introduction,
  BrokenDownCart,
];

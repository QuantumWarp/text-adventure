import { Tavern } from "../events/tavern.js";
import { Event } from "../event.js";
import { BrokenDownCart } from "../events/broken-down-cart.js";

export const events: Event[] = [
  new BrokenDownCart(),
  new Tavern(),
];
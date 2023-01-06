import { Tavern } from "../events/tavern.js";
import { Event } from "../event.js";
import { BrokenDownCart } from "../events/broken-down-cart.js";
import { Introduction } from "../events/introduction.js";

export const events: Event[] = [
  new Introduction(),
  new BrokenDownCart(),
  new Tavern(),
];
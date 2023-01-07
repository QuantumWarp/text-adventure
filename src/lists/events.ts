import { Tavern } from "../events/general/an-inn-on-the-road.js";
import { Event } from "../event.js";
import { BrokenDownCart } from "../events/general/broken-down-cart.js";
import { Introduction } from "../events/introduction.js";

export const events: Event[] = [
  new Introduction(),
  new BrokenDownCart(),
  new Tavern(),
];
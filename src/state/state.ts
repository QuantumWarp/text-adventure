import { Item } from "../lists/items.js";
import { Journey } from "./journey.js";
import { Location } from "./location.js";
import { Stat } from "./stat.js";

export class State {
  journey = new Journey();
  location = new Location();

  basics = {
    name: "",
    gender: "",
    background: "",
  };

  stats = {
    health: new Stat(100, 0, 100),
    sanity: new Stat(10, 0, 15),
    money: new Stat(50, 0),
  };

  items: Item[] = [];

  ended = false;
}

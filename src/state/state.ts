import { Journey } from "./journey.js";
import { Stat } from "./stat.js";

export class State {
  journey = new Journey();

  basics = {
    name: '',
    gender: '',
    background: '',
  };

  stats = {
    health: new Stat(100, 0, 100),
    mana: new Stat(100, 0, 100),
    sanity: new Stat(10, 0, 15),
    money: new Stat(50, 0),
    speed: new Stat(15, 0),
  };

  items: string[] = [];

  ended = false;
}
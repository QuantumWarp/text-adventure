import { Subject } from "rxjs";
import { Event } from "./event.js";

export class GameInterface {
  onGameEvent = new Subject<Event>();
  onWrite = new Subject<string>();
  onKey = new Subject<string>();
}

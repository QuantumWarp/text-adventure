import { Subject } from "rxjs";
import { Event, EventOutcome } from "./event.js";

export class GameInterface {
  onGameEvent = new Subject<{ event: Event; outcome?: EventOutcome }>();
  onWrite = new Subject<string>();
  onKey = new Subject<string>();
}

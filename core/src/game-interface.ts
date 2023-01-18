import { Subject } from "rxjs";
import { GameEvent } from "./game-event.js";

export class GameInterface {
  onGameEvent = new Subject<string>();
  onWrite = new Subject<string>();
  onKey = new Subject<string>();

  write(text: string) {
    this.onWrite.next(text);
  }

  keypress(key: string) {
    this.onKey.next(key);
  }

  sendEvent(gameEvent: GameEvent, name: string) {
    const lowerGameEventName = gameEvent.name.toLowerCase().replace(/\s/g, "-");
    const lowerName = name.toLowerCase().replace(/\s/g, "-");
    const fullEvent = `${lowerGameEventName}-${lowerName}`;
    this.onGameEvent.next(fullEvent);
  }
}

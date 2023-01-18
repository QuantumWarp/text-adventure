import { Place } from "../lists/places.js";
import { GameEvent } from "../game-event.js";
import { State } from "../state/state.js";

export class Checker {
  static isRepeat(state: State, event: GameEvent): boolean {
    return state.journey.visited(event.name);
  }

  static isLocation(state: State, ...places: Place[]): boolean {
    if (places.includes(state.location.current)) return true;
    if (!state.location.subLocation) return false;
    if (places.includes(state.location.subLocation)) return true;
    return false;
  }
}

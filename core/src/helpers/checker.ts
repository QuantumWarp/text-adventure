import { Place } from "src/lists/places.js";
import { Event } from "../event.js";
import { State } from "../state/state.js";

export class Checker {
  static isRepeat(state: State, event: Event): boolean {
    return state.journey.visited(event.name);
  }

  static isLocation(state: State, ...places: Place[]): boolean {
    return (
      places.includes(state.location.current) ||
      places.includes(state.location.subLocation)
    );
  }
}

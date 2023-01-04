import { Event, EventOutcome } from "./event";

export class State {
  journey: { event: Event, outcome: EventOutcome }[] = [];

  ended = false;
}
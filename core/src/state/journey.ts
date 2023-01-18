import { GameEvent, EventOutcome } from "../game-event.js";

export class Journey {
  history: { event: GameEvent; outcome: EventOutcome }[] = [];

  add(event: GameEvent, outcome: EventOutcome): void {
    this.history.push({ event, outcome });
  }

  visited(name: string): boolean {
    return Boolean(this.history.find((x) => x.event.name === name));
  }

  search(name: string): EventOutcome[] {
    return this.history
      .filter((x) => x.event.name === name)
      .map((x) => x.outcome);
  }
}

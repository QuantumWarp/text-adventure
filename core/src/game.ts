import { State } from "./state/state.js";
import { GameEvent } from "./game-event.js";
import { events } from "./lists/events.js";
import { chanceSelect } from "./helpers/chance.js";
import { Writer } from "./writers/writer.js";
import { Format } from "./helpers/formatter.js";
import { GameInterface } from "./game-interface.js";

export class Game {
  events: GameEvent[];
  state: State;
  writer: Writer;

  constructor(gameInterface: GameInterface) {
    this.state = new State();
    this.writer = new Writer(gameInterface);
    this.events = events.map((E) => new E(this.writer, this.state));
  }

  async run() {
    this.writer.clear();

    while (!this.state.ended) {
      this.writeStatus();

      const event = chanceSelect(this.events, this.state);
      const outcome = await event.run();
      this.state.journey.add(event, outcome);
    }

    this.writeSummary();
  }

  private writeStatus(): void {
    const nameField = Format.fixedWidth(`Name: ${this.state.basics.name}`);
    const backgroundField = Format.fixedWidth(
      `Background: ${this.state.basics.background}`
    );
    const locationField = Format.fixedWidth(
      `Location: ${this.state.location.current}`
    );
    const healthField = Format.fixedWidth(
      `Health: ${this.state.stats.health.value}/${this.state.stats.health.maximum}`
    );
    const moneyField = Format.fixedWidth(
      `Money: ${this.state.stats.money.value}`
    );

    this.writer.instant(
      nameField + backgroundField + locationField,
      healthField + moneyField
    );
    this.writer.gap();
  }

  private writeSummary(): void {
    this.writer.standard("Dummy summary");
  }
}

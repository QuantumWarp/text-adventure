import { State } from "./state/state.js";
import { Event } from "./event.js";
import { events } from "./lists/events.js";
import { chanceSelect } from "./helpers/chance.js";
import { Writer } from "./writers/writer.js";
import { Format } from "./helpers/formatter.js";
import { GameOptions } from "./options.js";

export class Game {
  events: Event[];
  state: State;
  writer: Writer;

  constructor(options: GameOptions) {
    this.state = new State();
    this.writer = new Writer(options.interface);
    this.events = events.map((E) => new E(this.writer));
  }

  async run() {
    this.writer.clear();

    while (!this.state.ended) {
      this.writeStatus();

      const event = chanceSelect(this.events, this.state);
      const outcome = await event.run(this.state);
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

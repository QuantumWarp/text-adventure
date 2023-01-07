import { State } from "./state/state.js";
import { events } from "./lists/events.js";
import { chanceSelect } from "./helpers/chance.js";
import { Write } from "./helpers/write.js";
import { Format } from "./helpers/formatter.js";

export class Game {
  state = new State();

  async run() {
    Write.clear();

    while (!this.state.ended) {
      this.writeStatus();

      const event = chanceSelect(events, this.state);
      const outcome = await event.run(this.state);
      this.state.journey.add(event, outcome);
    }
  }

  private writeStatus(): void {
    const nameField = Format.fixedWidth(`Name: ${this.state.basics.name}`);
    const backgroundField = Format.fixedWidth(`Background: ${this.state.basics.background}`);
    const healthField = Format.fixedWidth(`Health: ${this.state.stats.health.value}/${this.state.stats.health.maximum}`);
    const moneyField = Format.fixedWidth(`Money: ${this.state.stats.money.value}`);

    Write.instant(nameField + backgroundField);
    Write.instant(healthField + moneyField);
    Write.gap()
  }

  private writeSummary(): void {

  }
}
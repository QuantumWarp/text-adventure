/* eslint-disable prettier/prettier */
import inquirer from "inquirer";
import { Chance, chanceSelect } from "./helpers/chance.js";
import { Format } from "./helpers/formatter.js";
import { Writer } from "./writers/writer.js";
import { State } from "./state/state.js";

export abstract class Event {
  name: string;

  chance?: Chance = 1;
  selectPrompt?: string = '';
  choices?: EventChoice[] = [];
  defaultOutcomes?: EventOutcome[] = [];

  intro?(): Promise<void>;
  outro?(outcome: EventOutcome): Promise<void>;

  constructor(
    protected writer: Writer,
    protected state: State,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.name = (this.constructor as any).Name;
    if (!this.name) throw new Error("Provide instance with a static 'Name' property");
  }

  async run(): Promise<EventOutcome> {
    this.writer.instant(Format.title(this.name));
    this.writer.gap();

    if (this.intro) {
      await this.intro();
      this.writer.gap();
    }

    const validOutcomes = [...this.defaultOutcomes];

    if (this.choices.length > 0) {
      const choice = await this.presentChoice();
      validOutcomes.push(...choice.outcomes);
    }

    const outcome = chanceSelect(validOutcomes, this.state);
    this.writer.gap();

    await outcome.run();

    if (this.outro) {
      await this.outro(outcome);
      this.writer.gap();
    }

    await this.writer.waitForUser();
    this.writer.clear();

    return outcome;
  }

  private async presentChoice(): Promise<EventChoice> {
    const answer = await inquirer.prompt([
      {
        name: this.selectPrompt,
        type: "list",
        choices: this.choices
          .filter((x) => !x.condition || x.condition())
          .map((x) => x.name),
      },
    ]);

    return this.choices.find((x) => x.name === answer[this.selectPrompt]);
  }
}

export class EventChoice {
  name: string;
  condition?: () => boolean;
  outcomes: EventOutcome[];
}

export class EventOutcome {
  name: string;
  run: () => Promise<void>;
  chance?: Chance;
}

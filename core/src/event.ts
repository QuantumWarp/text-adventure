/* eslint-disable prettier/prettier */
import inquirer from "inquirer";
import { Chance, chanceSelect } from "./helpers/chance.js";
import { Format } from "./helpers/formatter.js";
import { Writer } from "./writers/writer.js";
import { State } from "./state/state.js";

export interface Event {
  chance: Chance;
  intro?(state: State): Promise<void>;
  outro?(state: State, outcome: EventOutcome): Promise<void>;
}

export abstract class Event {
  abstract name: string;

  abstract selectPrompt: string;
  abstract choices: EventChoice[];

  defaultOutcomes: EventOutcome[] = [];

  constructor(protected writer: Writer) {}

  async run(state: State): Promise<EventOutcome> {
    this.writer.instant(Format.title(this.name));
    this.writer.gap();

    if (this.intro) {
      await this.intro(state);
      this.writer.gap();
    }

    const validOutcomes = [...this.defaultOutcomes];

    if (this.choices.length > 0) {
      const choice = await this.presentChoice(state);
      validOutcomes.push(...choice.outcomes);
    }

    const outcome = chanceSelect(validOutcomes, state);
    this.writer.gap();

    await outcome.run(state);

    if (this.outro) {
      await this.outro(state, outcome);
      this.writer.gap();
    }

    await this.writer.waitForUser();
    this.writer.clear();

    return outcome;
  }

  private async presentChoice(state: State): Promise<EventChoice> {
    const answer = await inquirer.prompt([
      {
        name: this.selectPrompt,
        type: "list",
        choices: this.choices
          .filter((x) => !x.condition || x.condition(state))
          .map((x) => x.name),
      },
    ]);

    return this.choices.find((x) => x.name === answer[this.selectPrompt]);
  }
}

export interface EventChoice {
  name: string;
  condition?(state: State): boolean;
  outcomes: EventOutcome[];
}

interface IEventOutcome {
  name: string;
  chance?: Chance;
  run: (state: State) => Promise<void>;
}

export class EventOutcome {

  constructor(
    public name: string,
    public run: (state: State) => Promise<void>,
    public chance?: Chance,
  ) { }
}

const test = new EventOutcome(
  'test',
  (state: State) => {
    writ
  },
);

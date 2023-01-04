import inquirer from "inquirer";
import { Chance, chanceSelect } from "./helpers/chance.js";
import { Write } from "./helpers/write.js";
import { State } from "./state/state.js";

export interface Event {
  chance: Chance;
  test: string;
}

export abstract class Event {
  abstract name: string;

  abstract selectPrompt: string;
  abstract choices: EventChoice[];

  abstract intro(state: State): Promise<void>;
  
  defaultOutcomes: EventOutcome[] = [];

  async run(state: State): Promise<EventOutcome> {
    await this.intro(state);
    Write.gap();

    const validOutcomes = [...this.defaultOutcomes];

    if (this.choices.length > 0) {
      const choice = await this.presentChoice(state);
      validOutcomes.push(...choice.outcomes);
    }

    const outcome = chanceSelect(validOutcomes, state);
    Write.gap();
    await outcome.run(state);
    await Write.waitForUser();
    Write.clear();

    return outcome;
  }

  private async presentChoice(state: State): Promise<EventChoice> {
    const answer = await inquirer.prompt([{
      name: this.selectPrompt,
      type: "list",
      choices: this.choices
        .filter((x) => !x.condition || x.condition(state))
        .map((x) => x.name),
    }]);

    return this.choices.find((x) => x.name === answer[this.selectPrompt]);
  }
}

export interface EventChoice {
  name: string;
  outcomes: EventOutcome[];
  condition?(state: State): boolean;
}

export interface EventOutcome {
  name: string;
  run(state: State): Promise<void>;
  chance?: Chance;
}


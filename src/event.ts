import inquirer from "inquirer";
import prompts from 'prompts'
import { State } from "./state";

export abstract class Event {
  abstract name: string;

  abstract selectPrompt: string;
  abstract choices: EventChoice[];

  abstract chance(state: State): number;
  abstract intro(state: State): Promise<void>;
  
  defaultOutcomes: EventOutcome[] = [];

  async run(state: State): Promise<EventOutcome> {
    await this.intro(state);

    const validOutcomes = [...this.defaultOutcomes];

    if (this.choices.length > 0) {
      const choice = await this.presentChoice(state);
      validOutcomes.push(...choice.outcomes);
    }

    const outcome = await this.selectOutcome(validOutcomes);
    await outcome.run(state);

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

  private async selectOutcome(outcomes: EventOutcome[]): Promise<EventOutcome> {
    return outcomes[0];
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
  chance?(state: State): number;
}


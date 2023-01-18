import { Chance, chanceSelect } from "./helpers/chance.js";
import { Format } from "./helpers/formatter.js";
import { Writer } from "./writers/writer.js";
import { State } from "./state/state.js";
import Prompt from "./writers/prompt.js";

export abstract class GameEvent {
  name: string;

  chance: Chance = 1;
  selectPrompt = "";
  choices: EventChoice[] = [];
  defaultOutcomes: EventOutcome[] = [];

  intro?(): Promise<void>;
  outro?(outcome: EventOutcome): Promise<void>;

  constructor(protected writer: Writer, protected state: State) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.name = (this.constructor as any).Name;
    if (!this.name) {
      throw new Error("Provide instance with a static 'Name' property");
    }
  }

  async run(): Promise<EventOutcome> {
    this.writer.instant(Format.title(this.name));
    this.writer.gap();

    if (this.intro) {
      this.writer.gameInterface.sendEvent(this, "intro");
      await this.intro();
      this.writer.gap();
    }

    const validOutcomes = [...this.defaultOutcomes];

    if (this.choices.length > 0) {
      this.writer.gameInterface.sendEvent(this, "choice");
      const choice = await this.presentChoice();
      validOutcomes.push(...choice.outcomes);
    }

    const outcome = chanceSelect(validOutcomes, this.state);
    this.writer.gap();
    this.writer.gameInterface.sendEvent(this, outcome.name);
    await outcome.run();

    if (this.outro) {
      this.writer.gameInterface.sendEvent(this, "outro");
      await this.outro(outcome);
      this.writer.gap();
    }

    await this.writer.waitForUser();
    this.writer.clear();

    return outcome;
  }

  private async presentChoice(): Promise<EventChoice> {
    const prompt = new Prompt(
      this.writer,
      this.selectPrompt,
      this.choices
        .filter((x) => !x.condition || x.condition())
        .map((x) => x.name)
    );
    const answer = await prompt.run();

    const choice = this.choices.find((x) => x.name === answer);
    if (!choice) throw new Error("Invalid choice");
    return choice;
  }
}

export interface EventChoice {
  name: string;
  condition?: () => boolean;
  outcomes: EventOutcome[];
}

export interface EventOutcome {
  name: string;
  run: () => Promise<void>;
  chance?: Chance;
}

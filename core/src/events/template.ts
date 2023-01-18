import { State } from "../state/state.js";
import { GameEvent } from "../game-event.js";
import { Checker } from "../helpers/checker.js";
import { ChanceVal } from "../helpers/chance.js";

export class Template extends GameEvent {
  static Name = "Template to Copy";
  static Choice = {
    DoSomething: "Do Something",
    Leave: "Leave",
  };
  static Outcome = {
    DoSomethingSuccess: "Do Something - Success",
    DoSomethingFailure: "Do Something - Failure",
    Leave: "Leave",
  };

  chance = (state: State): number => {
    if (Checker.isRepeat(state, this)) {
      return ChanceVal.Impossible;
    }
    return ChanceVal.Impossible;
  };

  async intro() {
    await this.writer.standard("Intro info.");
  }

  async outro() {
    await this.writer.standard("Outro steps.");
  }

  selectPrompt = "An interesting choice";

  choices = [
    {
      name: Template.Choice.DoSomething,
      outcomes: [
        {
          name: Template.Outcome.DoSomethingSuccess,
          run: async () => {
            await this.writer.standard("You succeed at doing something.");
          },
        },
        {
          name: Template.Outcome.DoSomethingFailure,
          run: async () => {
            await this.writer.standard("You fail at doing something.");
          },
        },
      ],
    },
    {
      name: Template.Choice.Leave,
      outcomes: [
        {
          name: Template.Outcome.Leave,
          run: async () => {
            await this.writer.standard("You simply leave.");
          },
        },
      ],
    },
  ];
}

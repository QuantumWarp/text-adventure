import { State } from "../state/state.js";
import { Event, EventChoice } from "../event.js";
import { Write } from "../helpers/write.js";
import { Checker } from "../helpers/checker.js";
import { ChanceVal } from "../helpers/chance.js";

export class Template extends Event {
  name = "Template to Copy";

  chance = (state: State): number => {
    if (Checker.isRepeat(state, this)) {
      return ChanceVal.Impossible;
    }
    return ChanceVal.Impossible;
  };

  async intro(state: State) {
    if (state) return;
    await Write.standard("Intro info.");
  }

  selectPrompt = "An interesting choice";
  choices = [doSomething, leave];

  async outro() {
    await Write.standard("Outro steps.");
  }
}

const doSomething: EventChoice = {
  name: "Do Something",
  outcomes: [
    {
      name: "Success",
      async run(state: State) {
        if (state) return;
        await Write.standard("You succeed at doing something.");
      },
    },
    {
      name: "Fail",
      async run(state: State) {
        if (state) return;
        await Write.standard("You fail at doing something.");
      },
    },
  ],
};

const leave: EventChoice = {
  name: "Leave",
  outcomes: [
    {
      name: "Leave",
      async run(state: State) {
        if (state) return;
        await Write.standard("You simply leave.");
      },
    },
  ],
};

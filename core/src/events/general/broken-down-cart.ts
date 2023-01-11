import { State } from "../../state/state.js";
import { Event, EventChoice } from "../../event.js";
import { Checker } from "../../helpers/checker.js";
import { ChanceVal } from "../../helpers/chance.js";
import { generalPaths } from "../../lists/places.js";

export class BrokenDownCart extends Event {
  name = "Broken Down Cart";

  chance = (state: State): number => {
    if (Checker.isLocation(state, ...generalPaths)) {
      return ChanceVal.Standard;
    }
    if (Checker.isRepeat(state, this)) {
      return ChanceVal.AlmostImpossible;
    }
    return ChanceVal.Standard;
  };

  async intro() {
    await this.writer.standard(
      "In the distance a shape begins to come into view.",
      "Upon getting closer you see a man standing beside a broken down cart."
    );
  }

  selectPrompt = "Will you choose to assist a fellow traveller?";
  choices = [helpFix, leave];
}

const helpFix: EventChoice = {
  name: "Help Fix",
  outcomes: [
    {
      name: "Success",
      async run() {
        await this.writer.standard("You help fix the cart");
      },
    },
    {
      name: "Failure",
      async run() {
        await this.writer.standard("You are bad at fixing things");
      },
    },
  ],
};

const leave: EventChoice = {
  name: "Leave",
  outcomes: [
    {
      name: "Leave",
      async run() {
        await this.writer.standard("You leave");
      },
    },
  ],
};

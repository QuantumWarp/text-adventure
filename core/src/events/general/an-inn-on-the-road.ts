import { State } from "../../state/state.js";
import { GameEvent } from "../../game-event.js";
import { Checker } from "../../helpers/checker.js";
import { ChanceVal } from "../../helpers/chance.js";
import { generalPaths } from "../../lists/places.js";

export class AnInnOnTheRoad extends GameEvent {
  static Name = "An Inn on the Road";
  static Choice = {
    RestOvernight: "Rest Overnight",
    BuyAMeal: "Buy a Meal",
    Leave: "Leave",
  };
  static Outcome = {
    WellRested: "Well Rested",
    WellFed: "Well Fed",
    Leave: "Leave",
  };

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
      "Lights appear in the distamnce.",
      "An inviting tavern with a number of lights on is by the side of the road."
    );
  }

  selectPrompt = "Do you go in, or choose to press on?";

  choices = [
    {
      name: AnInnOnTheRoad.Choice.RestOvernight,
      outcomes: [
        {
          name: AnInnOnTheRoad.Outcome.WellRested,
          run: async () => {
            this.state.stats.money.remove(1);
            await this.writer.standard(
              "You spend the night in one of their beds.",
              "Waking up in the morning you feel refreshed and ready for the day ahead."
            );
          },
        },
      ],
    },
    {
      name: AnInnOnTheRoad.Choice.BuyAMeal,
      outcomes: [
        {
          name: AnInnOnTheRoad.Outcome.WellFed,
          run: async () => {
            await this.writer.standard(
              "You go in and purchase a meal.",
              "Is is very standard, using local produce, but a warm meal is always welcome"
            );
          },
        },
      ],
    },
    {
      name: AnInnOnTheRoad.Choice.Leave,
      outcomes: [
        {
          name: AnInnOnTheRoad.Outcome.Leave,
          run: async () => {
            await this.writer.standard("You opt to press on.");
          },
        },
      ],
    },
  ];
}

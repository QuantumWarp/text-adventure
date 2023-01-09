import inquirer from "inquirer";
import { State } from "../state/state.js";
import { Event, EventChoice } from "../event.js";
import { Write } from "../helpers/write.js";
import { places, placeStyle } from "../lists/places.js";
import { Checker } from "../helpers/checker.js";
import { ChanceVal } from "../helpers/chance.js";

export class Introduction extends Event {
  name = "The Road to Adventure";

  chance = (state: State): number => {
    if (Checker.isRepeat(state, this)) {
      return ChanceVal.Impossible;
    }
    return ChanceVal.Certain;
  };

  async intro(state: State) {
    await Write.standard(
      "A unremarkable person, from a village like any other, ventures forth, taking their first steps towards adventure."
    );
    Write.gap();

    const { name, gender, background } = await inquirer.prompt([
      {
        name: "name",
        message: "What is your name?",
        type: "input",
      },
      {
        name: "gender",
        type: "list",
        message: "What is your gender?",
        choices: ["Male", "Female", "Other"],
      },
      {
        name: "background",
        type: "list",
        message: "What is your background?",
        choices: ["Archer", "Spellcaster", "Swordsman"],
      },
    ]);

    state.basics.name = name;
    state.basics.gender = gender;
    state.basics.background = background;

    Write.gap();
    await Write.standard(
      "All you have managed to hear of the outside world, has been from bedtime stories and the occasional traveller passing through.",
      "Now setting out, the idea of leaving into the unknown is all the more intimidating. Standing at the crossroads outside the village you have to make the first decision of your journey.",
      "As with all choices, in this moment it may seem insignificant, but the first steps of a new chapter in ones life, can dictate the years to come."
    );
    Write.gap();

    await Write.standard(
      `To the North lie ${placeStyle(places.theMountains)}.`,
      `To the East the ${placeStyle(places.forestOfNithe)}.`,
      `To the South the ${placeStyle(places.diseasedLands)}.`,
      `To the West is ${placeStyle(places.athosCityOfSails)}.`
    );
  }

  selectPrompt = "Choose your starting path";
  choices = [north, east, south, west];

  async outro() {
    Write.gap();
    await Write.standard(
      "You take your first step.",
      "Immediately you feel a sense of purpose.",
      "This is what you were born to do."
    );
  }
}

const north: EventChoice = {
  name: "North",
  outcomes: [
    {
      name: "North",
      async run(state: State) {
        state.location.set(places.northernPath, places.theMountains);
        await Write.standard(
          "You choose the Northern path.",
          "You have heard stories of dwarves and dragons dwelling within snow capped mountains.",
          "Maybe one day you will see them up close."
        );
      },
    },
  ],
};

const east: EventChoice = {
  name: "East",
  outcomes: [
    {
      name: "East",
      async run(state: State) {
        state.location.set(places.easternPath, places.forestOfNithe);
        await Write.standard(
          "You choose the Eastern path.",
          "Tales of all manner of creatures within the forest have piqued your interest."
        );
      },
    },
  ],
};

const south: EventChoice = {
  name: "South",
  outcomes: [
    {
      name: "South",
      async run(state: State) {
        state.location.set(places.southernPath, places.theMountains);
        await Write.standard(
          "You choose the Southern path.",
          "The death and decay from the South seems to edge ever closer each day.",
          "Maybe you will be the one to unravel the cause of the affliction."
        );
      },
    },
  ],
};

const west: EventChoice = {
  name: "West",
  outcomes: [
    {
      name: "West",
      async run(state: State) {
        state.location.set(places.westernPath, places.athosCityOfSails);
        await Write.standard(
          "You choose the Western path.",
          "The City has always been intriguing, you are sure you will find the bustling port to your liking."
        );
      },
    },
  ],
};

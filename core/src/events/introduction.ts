import { State } from "../state/state.js";
import { GameEvent } from "../game-event.js";
import { places, placeStyle } from "../lists/places.js";
import { Checker } from "../helpers/checker.js";
import { ChanceVal } from "../helpers/chance.js";
import { Prompt } from "../writers/prompt.js";
import { Input } from "../writers/input.js";

export class Introduction extends GameEvent {
  static Name = "The Road to Adventure";
  static Choice = {
    North: "North",
    East: "East",
    South: "South",
    West: "West",
  };
  static Outcome = Introduction.Choice;

  chance = (state: State): number => {
    if (Checker.isRepeat(state, this)) {
      return ChanceVal.Impossible;
    }
    return ChanceVal.Certain;
  };

  async intro() {
    await this.writer.standard(
      "A unremarkable person, from a village like any other, ventures forth, taking their first steps towards adventure."
    );
    this.writer.gap();

    const namePrompt = new Input(this.writer, "What is your name?");
    const genderPrompt = new Prompt(this.writer, "What is your gender?", [
      "Male",
      "Female",
      "Other",
    ]);
    const backgroundPrompt = new Prompt(
      this.writer,
      "What is your background?",
      ["Archer", "Spellcaster", "Swordsman"]
    );

    this.state.basics.name = await namePrompt.run();
    this.state.basics.gender = await genderPrompt.run();
    this.state.basics.background = await backgroundPrompt.run();

    this.writer.gap();
    await this.writer.standard(
      "All you have managed to hear of the outside world, has been from bedtime stories and the occasional traveller passing through.",
      "Now setting out, the idea of leaving into the unknown is all the more intimidating. Standing at the crossroads outside the village you have to make the first decision of your journey.",
      "As with all choices, in this moment it may seem insignificant, but the first steps of a new chapter in ones life, can dictate the years to come."
    );
    this.writer.gap();

    await this.writer.standard(
      `To the North lie ${placeStyle(places.theMountains)}.`,
      `To the East the ${placeStyle(places.forestOfNithe)}.`,
      `To the South the ${placeStyle(places.diseasedLands)}.`,
      `To the West is ${placeStyle(places.athosCityOfSails)}.`
    );
  }

  async outro() {
    this.writer.gap();
    await this.writer.standard(
      "You take your first step.",
      "Immediately you feel a sense of purpose.",
      "This is what you were born to do."
    );
  }

  selectPrompt = "Choose your starting path";

  choices = [
    {
      name: Introduction.Choice.North,
      outcomes: [
        {
          name: Introduction.Outcome.North,
          run: async () => {
            this.state.location.set(places.northernPath, places.theMountains);
            await this.writer.standard(
              "You choose the Northern path.",
              "You have heard stories of dwarves and dragons dwelling within snow capped mountains.",
              "Maybe one day you will see them up close."
            );
          },
        },
      ],
    },
    {
      name: Introduction.Choice.East,
      outcomes: [
        {
          name: Introduction.Outcome.East,
          run: async () => {
            this.state.location.set(places.easternPath, places.forestOfNithe);
            await this.writer.standard(
              "You choose the Eastern path.",
              "Tales of all manner of creatures within the forest have piqued your interest."
            );
          },
        },
      ],
    },
    {
      name: Introduction.Choice.South,
      outcomes: [
        {
          name: Introduction.Outcome.South,
          run: async () => {
            this.state.location.set(places.southernPath, places.theMountains);
            await this.writer.standard(
              "You choose the Southern path.",
              "The death and decay from the South seems to edge ever closer each day.",
              "Maybe you will be the one to unravel the cause of the affliction."
            );
          },
        },
      ],
    },
    {
      name: Introduction.Choice.West,
      outcomes: [
        {
          name: Introduction.Outcome.West,
          run: async () => {
            this.state.location.set(
              places.westernPath,
              places.athosCityOfSails
            );
            await this.writer.standard(
              "You choose the Western path.",
              "The City has always been intriguing, you are sure you will find the bustling port to your liking."
            );
          },
        },
      ],
    },
  ];
}

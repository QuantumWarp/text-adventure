import inquirer from "inquirer";
import { State } from "../../state/state.js";
import { Event, EventChoice } from "../../event.js";
import { Write } from "../../helpers/write.js";
import { places } from "../../lists/places.js";
import { peopleStyle } from "../../lists/people.js";

export class AnUntimelyEnd extends Event {
  name = 'An Untimely End';

  chance = (state: State): number =>  {
    if (state.journey.visited(this.name)) return 0;
    return Infinity;
  }

  async intro(state: State) {
    await Write.standard('A unremarkable person, from a village like any other, ventures forth, taking their first steps towards adventure.');
    Write.gap();

    const { name, gender, background } = await inquirer.prompt([{
      name: 'name',
      message: 'What is your name?',
      type: 'input',
    }, {
      name: 'gender',
      type: 'list',
      message: 'What is your gender?',
      choices: ['Male', 'Female', 'Other'],
    }, {
      name: 'background',
      type: 'list',
      message: 'What is your background?',
      choices: [ 'Archer', 'Spellcaster', 'Swordsman'],
    }]);

    state.basics.name = peopleStyle(name);
    state.basics.gender = gender;
    state.basics.background = background;

    Write.gap();
    await Write.standard('All you have managed to hear of the outside world, has been from bedtime stories and the occasional traveller passing through.');
    await Write.standard('Now setting out, the idea of leaving into the unknown is all the more intimidating. Standing at the crossroads outside the village you have to make the first decision of your journey.');
    await Write.standard('As with all choices, in this moment it may seem insignificant, but the first steps of a new chapter in ones life, can dictate the years to come.');
    Write.gap();

    await Write.standard(`To the North lie ${places.theMountains}.`);
    await Write.standard(`To the East the ${places.forestOfNithe}.`);
    await Write.standard(`To the South the ${places.diseasedLands}.`);
    await Write.standard(`To the West is ${places.athosCityOfSails}.`);
  }

  selectPrompt = 'Choose your starting path';
  choices = [north, east, south, west];

  async outro() {
    Write.gap();
    await Write.standard('You take your first step.');
    await Write.standard('Immediately you feel a sense of purpose.');
    await Write.standard('This is what you were born to do.');
  }
}

const north: EventChoice = {
  name: 'North',
  outcomes: [{
    name: 'North',
    run: async () => {
      await Write.standard('You choose the Northern path.');
      await Write.standard('You have heard stories of dwarves and dragons dwelling within snow capped mountains.');
      await Write.standard('Maybe one day you will see them up close.');
    },
  }],
};

const east: EventChoice = {
  name: 'East',
  outcomes: [{
    name: 'East',
    run: async () => {
      await Write.standard('You choose the Eastern path.');
      await Write.standard('Tales of all manner of creatures within the forest have piqued your interest.');
    },
  }],
};

const south: EventChoice = {
  name: 'South',
  outcomes: [{
    name: 'South',
    run: async () => {
      await Write.standard('You choose the Southern path.');
      await Write.standard('The death and decay from the South seems to edge ever closer each day.');
      await Write.standard('Maybe you will be the one to unravel the cause of the affliction.');
    },
  }],
};

const west: EventChoice = {
  name: 'West',
  outcomes: [{
    name: 'West',
    run: async () => {
      await Write.standard('You choose the Western path.');
      await Write.standard('The City has always been intriguing, you are sure you will find the bustling port to your liking.');
    },
  }],
};

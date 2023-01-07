import { Event, EventChoice } from "../../event.js";
import { Write } from "../../helpers/write.js";

export class Tavern extends Event {
  name = 'Tavern';

  async intro() {
    await Write.standard('You find a tavern.');
  }

  selectPrompt = 'Go in for a spell?';
  choices = [goIn, leave];
}

const goIn: EventChoice = {
  name: 'Go In',
  outcomes: [{
    name: 'Success',
    run: async () => {
      await Write.standard('You buy many drinks');
    },
  }, {
    name: 'Failure',
    run: async () => {
      await Write.standard('You cant find the door');
    },
  }],
};

const leave: EventChoice = {
  name: 'Leave',
  outcomes: [{
    name: 'Leave',
    run: async () => {
      await Write.standard('You leave');
    },
  }],
};

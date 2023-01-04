import { Event, EventChoice } from "../event.js";
import { slowType } from "../helpers.js";

export class BrokenDownCart extends Event {
  name = 'Broken Down Cart';
  chance: () => 1;

  async intro() {
    await slowType('In the distance a shape begins to come into view.');
    await slowType('Upon getting closer you see a man standing beside a broken down cart.');
  }

  selectPrompt = 'Will you choose to assist a fellow traveller?';
  choices = [helpFix, leave];
}

const helpFix: EventChoice = {
  name: 'Help Fix',
  outcomes: [{
    name: 'Success',
    run: async () => {
      await slowType('You help fix the cart');
    },
  }, {
    name: 'Failure',
    run: async () => {
      await slowType('You are bad at fixing things');
    },
  }],
};

const leave: EventChoice = {
  name: 'Leave',
  outcomes: [{
    name: 'Leave',
    run: async () => {
      await slowType('You leave');
    },
  }],
};

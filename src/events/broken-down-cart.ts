import { Event, EventChoice } from "../event.js";
import { Write } from "../helpers/write.js";

export class BrokenDownCart extends Event {
  name = 'Broken Down Cart';

  async intro() {
    await Write.standard('In the distance a shape begins to come into view.');
    await Write.standard('Upon getting closer you see a man standing beside a broken down cart.');
  }

  selectPrompt = 'Will you choose to assist a fellow traveller?';
  choices = [helpFix, leave];
}

const helpFix: EventChoice = {
  name: 'Help Fix',
  outcomes: [{
    name: 'Success',
    run: async () => {
      await Write.standard('You help fix the cart');
    },
  }, {
    name: 'Failure',
    run: async () => {
      await Write.standard('You are bad at fixing things');
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

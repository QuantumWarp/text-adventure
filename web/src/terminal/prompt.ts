import { Terminal } from "xterm";
import ansi from 'ansi-escape-sequences';

export default class Prompt {
  private selectedIndex = 0;

  constructor (
    private terminal: Terminal,
    private message: string,
    private choices: string[]
  ) {}

  run() {
    this.terminal.writeln(this.message);
    this.choices.forEach((_x, index) => {
      this.writeOption(index);
      this.terminal.writeln('');
    });
    this.terminal.write(ansi.cursor.up(this.choices.length));

    return new Promise((resolve) => {
      const disposable = this.terminal.onKey((data) => {
        if (data.key === '\x1B[A') this.up();
        if (data.key === '\x1B[B') this.down();
        if (data.key === '\r') {
          disposable.dispose();
        }
      });
    })
  }

  up() {
    if (this.selectedIndex === 0) return;
    this.selectedIndex -= 1;
    this.writeOption(this.selectedIndex + 1);
    this.terminal.write(ansi.cursor.up());
    this.writeOption(this.selectedIndex);
  }

  down() {
    if (this.selectedIndex === this.choices.length - 1) return;
    this.selectedIndex += 1;
    this.writeOption(this.selectedIndex - 1);
    this.terminal.write(ansi.cursor.down());
    this.writeOption(this.selectedIndex);
  }
  
  enter() {

  }

  private writeOption(index: number) {
    this.terminal.write(ansi.erase.inLine(2));
    this.terminal.write(ansi.cursor.horizontalAbsolute(0));
    if (this.selectedIndex === index) {
      this.terminal.write('> ');
    } else {
      this.terminal.write('  ');
    }
    this.terminal.write(this.choices[index]);
  }
}
import readline from "readline";
import ansi from "ansi-escape-sequences";
import { GameInterface } from "src/options.js";
// import { slowType } from "./slow-type.js";

export class Writer {
  constructor(private gameInterface: GameInterface) {}

  async standard(...messages: string[]): Promise<void> {
    const text = messages.join("\r");
    this.gameInterface.write(text);
    // for (const message of messages) {
    //   await slowType(message);
    // }
  }

  instant(...messages: string[]): void {
    const text = messages.join("\r");
    this.gameInterface.write(text);
  }

  gap(amount = 1): void {
    const text = "\r".repeat(amount);
    this.gameInterface.write(text);
  }

  clear(): void {
    this.gameInterface.write(ansi.erase.display(2));
  }

  async waitForUser() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise<void>((resolve) =>
      rl.question("", () => {
        rl.close();
        resolve();
      })
    );
  }
}

import readline from "readline";
import { slowType } from "./slow-type.js";

export class Write {
  static async standard(...messages: string[]): Promise<void> {
    for (const message of messages) {
      await slowType(message);
    }
  }

  static instant(...messages: string[]): void {
    for (const message of messages) {
      console.log(message);
    }
  }

  static gap(amount = 1): void {
    for (let i = 0; i < amount; i++) {
      console.log("");
    }
  }

  static clear(): void {
    console.clear();
  }

  static async waitForUser() {
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

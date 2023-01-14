import ansi from "ansi-escape-sequences";
import { GameInterface } from "../game-interface.js";
import { slowType } from "./slow-type.js";

export class Writer {
  constructor(public gameInterface: GameInterface) {
    this.write(ansi.cursor.hide);
  }

  write(text: string): void {
    this.gameInterface.onWrite.next(text);
  }

  async standard(...messages: string[]): Promise<void> {
    for (const message of messages) {
      await slowType(this.gameInterface, message);
    }
  }

  instant(...messages: string[]): void {
    const text = messages.join("\r\n");
    this.write(`${text}\r\n`);
  }

  gap(amount = 1): void {
    const text = "\r\n".repeat(amount);
    this.write(text);
  }

  clear(): void {
    this.gameInterface.onWrite.next(ansi.erase.display(2));
    this.gameInterface.onWrite.next(ansi.cursor.position());
  }

  async waitForUser() {
    return new Promise<void>((resolve) => {
      const subscription = this.gameInterface.onKey.subscribe(() => {
        resolve();
        subscription.unsubscribe();
      });
    });
  }
}

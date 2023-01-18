import ansi from "ansi-escape-sequences";
import styles from "ansi-styles";
import { Writer } from "./writer.js";

export class Input {
  private static validCharacters = "abcdefghijklmnopqrstuvwxyz- ";
  private text = "";

  constructor(
    private writer: Writer,
    private message: string,
    private maxLength = 10,
    private required = true
  ) {}

  async run() {
    this.writer.write(this.message + " -> " + styles.blue.open);
    const result = await this.onKeySubscription();
    return result;
  }

  private async onKeySubscription(): Promise<string> {
    return new Promise((resolve) => {
      const subscription = this.writer.gameInterface.onKey.subscribe(
        (key: string) => {
          if (
            Input.validCharacters.includes(key.toLowerCase()) &&
            this.text.length < this.maxLength
          ) {
            this.writer.write(key);
            this.text += key;
          }
          if (key === "\u0008") {
            this.writer.gameInterface.write(ansi.cursor.back());
            this.writer.gameInterface.write(ansi.erase.inLine());
            this.text = this.text.substring(0, this.text.length - 1);
          }
          if (
            key === "\r" &&
            (this.text.replace(/\s/g, "") !== "" || !this.required)
          ) {
            this.writer.instant(styles.blue.close);
            resolve(this.text);
            subscription.unsubscribe();
          }
        }
      );
    });
  }
}

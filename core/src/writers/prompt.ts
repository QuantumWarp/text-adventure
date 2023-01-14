import ansi from "ansi-escape-sequences";
import styles from "ansi-styles";
import { Writer } from "./writer.js";

export default class Prompt {
  private selectedIndex = 0;

  constructor(
    private writer: Writer,
    private message: string,
    private choices: string[]
  ) {}

  async run() {
    this.writer.instant(this.message);
    this.choices.forEach((_x, index) => {
      this.writeOption(index);
      this.writer.write("\r\n");
    });
    this.writer.write(ansi.cursor.up(this.choices.length));

    const result = await this.onKeySubscription();
    return result;
  }

  private up() {
    if (this.selectedIndex === 0) return;
    this.selectedIndex -= 1;
    this.writeOption(this.selectedIndex + 1);
    this.writer.write(ansi.cursor.up());
    this.writeOption(this.selectedIndex);
  }

  private down() {
    if (this.selectedIndex === this.choices.length - 1) return;
    this.selectedIndex += 1;
    this.writeOption(this.selectedIndex - 1);
    this.writer.write(ansi.cursor.down());
    this.writeOption(this.selectedIndex);
  }

  private select() {
    this.writer.write(
      ansi.cursor.down(this.choices.length - this.selectedIndex)
    );
    const clearAndUp = ansi.erase.inLine(2) + ansi.cursor.up();
    const clearPrompt = clearAndUp.repeat(this.choices.length + 1);
    this.writer.write(clearPrompt);

    const selectedOption = this.choices[this.selectedIndex];
    const styledOption = styles.blue.open + selectedOption + styles.blue.close;

    this.writer.instant(`${this.message} -> ${styledOption}`);
    return selectedOption;
  }

  private async onKeySubscription(): Promise<string> {
    return new Promise((resolve) => {
      const subscription = this.writer.gameInterface.onKey.subscribe(
        (key: string) => {
          if (key === "\x1B[A") this.up();
          if (key === "\x1B[B") this.down();
          if (key === "\r") {
            const result = this.select();
            resolve(result);
            subscription.unsubscribe();
          }
        }
      );
    });
  }

  private writeOption(index: number) {
    this.writer.write(ansi.erase.inLine(2));
    this.writer.write(ansi.cursor.horizontalAbsolute(0));

    const prefix = this.selectedIndex === index ? "> " : "  ";
    const text = `${prefix}${this.choices[index]}\r`;

    this.writer.write(text);
  }
}

import chalk from "chalk";

export class Format {
  static speech(name: string, text: string): string {
    return `${name}: ${text}`;
  }

  static title(text: string): string {
    return chalk.bold.blue(`---------- ${text} ----------`);
  }
}

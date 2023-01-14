import styles from "ansi-styles";
import { removeAnsi } from "./utils.js";

export class Format {
  static speech(name: string, text: string): string {
    return `${name}: ${text}`;
  }

  static title(text: string, width = 50): string {
    const length = removeAnsi(text).length;
    let title = ` ${text} `;
    if (length <= width - 8) {
      const space = width - length;
      const odd = space % 2 === 1;
      const dashCount = Math.floor(space / 2);
      title =
        "-".repeat(dashCount + (odd ? 1 : 0)) + title + "-".repeat(dashCount);
    }
    return styles.blue.open + `---${title}---` + styles.blue.close;
  }

  static fixedWidth(text: string, width = 20): string {
    const length = removeAnsi(text).length;
    if (length >= width) return text;
    return text + " ".repeat(width - length);
  }
}

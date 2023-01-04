import readline from 'readline';
import { slowType } from "./slow-type.js";

export class Write {
  static async standard(message: string): Promise<void> {
    await slowType(message)
  }

  static instant(message: string): void {
    console.log(message);
  }

  static gap(amount: number = 1): void {
    for(var i = 0; i < amount; i++){
      console.log('');
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
    
    return new Promise<void>((resolve) => rl.question('', () => {
      rl.close();
      resolve();
    }));
  }
}